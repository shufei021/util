// 操作类型枚举
enum OperationType {
    ADD = 1,
    GET = 2,
    DELETE = 3,
    UPDATE = 4,
    CLEAR = 5,
    CURSOR = 6,
    REFRESH = 7
}

// 构造函数参数接口
interface IndexDBProps {
    dbName: string;
    dbVersion: number;
    storeName: string;
    keyPath: string | string[];
    indexes?: IndexConfig[];
    handleVersionUpgrade?: (db: IDBDatabase, oldVersion: number, newVersion: number, transaction: IDBTransaction) => void;
}

// 操作参数接口
interface ActionOptions {
    type?: OperationType;
    data?: any;
    key?: IDBValidKey;
    cb?: (cursor: IDBCursorWithValue) => void;
}

// 自定义错误类
class IndexDBError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = 'IndexDBError';
    }
}

// 索引配置接口
interface IndexConfig {
    name: string;
    keyPath: string | string[];
    options?: IDBIndexParameters;
}

class IndexDB {
    private dbName: string;
    private dbVersion: number;
    private storeName: string;
    private indexes: IndexConfig[];
    private keyPath: string | string[];
    private db: IDBDatabase | null;
    private readonly connectionTimeout: number = 5000;
    private readonly retryAttempts: number = 3;
    private handleVersionUpgrade?: (db: IDBDatabase, oldVersion: number, newVersion: number, transaction: IDBTransaction) => void;
    private cache = new Map<string, any>();
    private listeners = new Map<string, Set<Function>>();

    constructor({ dbName, dbVersion, storeName, keyPath, indexes = [], handleVersionUpgrade }: IndexDBProps) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
        this.storeName = storeName;
        this.indexes = indexes;
        this.keyPath = keyPath;
        this.db = null;
        this.handleVersionUpgrade = handleVersionUpgrade;
        this.ensureConnection();
    }

    public on(event: string, callback: Function): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)?.add(callback);
    }

    private emit(event: string, data?: any): void {
        this.listeners.get(event)?.forEach(callback => callback(data));
    }

    private async getWithCache(key: string): Promise<any> {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const value = await this.get(key);
        this.cache.set(key, value);
        return value;
    }
    
    private async ensureConnection(): Promise<IDBDatabase> {
        if (!this.db) this.db = await this.connectWithRetry();
        return this.db;
    }

    private async connectWithRetry(attempts: number = 0): Promise<IDBDatabase> {
        try {
            return (await Promise.race([
                this.open(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Connection timeout')),
                        this.connectionTimeout)
                )
            ])) as IDBDatabase;
        } catch (error) {
            if (attempts < this.retryAttempts) {
                console.warn(`Connection attempt ${attempts + 1} failed, retrying...`);
                return this.connectWithRetry(attempts + 1);
            }
            throw new IndexDBError('Failed to connect to database', 500);
        }
    }

    private async withTransaction<T>(
        mode: IDBTransactionMode,
        callback: (store: IDBObjectStore) => Promise<T>
    ): Promise<T> {
        const db = await this.ensureConnection();
        const transaction = db.transaction([this.storeName], mode);
        const store = transaction.objectStore(this.storeName);
        
        return new Promise(async (resolve, reject) => {
            transaction.oncomplete = () => resolve(result);
            transaction.onerror = () => reject(transaction.error);
            
            let result: T;
            try {
                result = await callback(store);
            } catch (error) {
                reject(error);
            }
        });
    }

    public open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (event: Event) => {
                const error = (event.target as IDBOpenDBRequest).error;
                reject(new IndexDBError('Failed to open database', error?.code || 500));
            };
            request.onsuccess = (event: Event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                this.db = db;
                resolve(db);
            };
            request.onblocked = (event: Event) => {
                console.warn('Database upgrade blocked. Please close other tabs/windows.');
                reject(new IndexDBError('Database upgrade blocked', 409));
            };
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const oldVersion = event.oldVersion;
                const newVersion = event.newVersion || this.dbVersion;
                const transaction = (event.target as IDBOpenDBRequest).transaction; // 获取事务对象
            
                try {
                    let store: IDBObjectStore;
                    if (!db.objectStoreNames.contains(this.storeName)) {
                        store = db.createObjectStore(this.storeName, { keyPath: this.keyPath });
                    } else {
                        store = transaction!.objectStore(this.storeName);
                    }
            
                    this.indexes.forEach(({ name, keyPath: indexKeyPath, options = {} }) => {
                        if (!store.indexNames.contains(name)) {
                            store.createIndex(name, indexKeyPath, options);
                        } else {
                            // 处理已存在索引的更新逻辑
                            const existingIndex = store.index(name);
                            if (existingIndex.keyPath !== indexKeyPath || 
                                existingIndex.unique !== options.unique ||
                                existingIndex.multiEntry !== options.multiEntry) {
                                store.deleteIndex(name);
                                store.createIndex(name, indexKeyPath, options);
                            }
                        }
                    });
            
                    if (this.handleVersionUpgrade) {
                        // 传递所有必要参数（关键修正）
                        this.handleVersionUpgrade(db, oldVersion, newVersion, transaction!);
                    }
                } catch (error) {
                    console.error('Database upgrade failed:', error);
                    reject(new IndexDBError('Database upgrade failed', 500));
                }
            };
        });
    }

    public async action(options: ActionOptions = {}): Promise<any> {
        const { type = OperationType.ADD, data = {}, key, cb = () => {} } = options;
        try {
            const mode = type === OperationType.GET ? 'readonly' : 'readwrite';

            return await this.withTransaction(mode, async (store) => {
                switch (type) {
                    case OperationType.ADD:
                        return new Promise((resolve, reject) => {
                            const request = store.add(data);
                            request.onsuccess = () => {
                                const itemKey = Array.isArray(this.keyPath)
                                    ? this.keyPath.map(k => data[k]).join('|')
                                    : data[this.keyPath];
                                this.cache.set(itemKey, data);
                                this.emit('add', data);
                                resolve(request.result);
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.GET:
                        return new Promise((resolve, reject) => {
                            const request = store.get(key!);
                            request.onsuccess = () => {
                                const itemKey = String(key);
                                this.cache.set(itemKey, request.result);
                                resolve(request.result);
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.DELETE:
                        return new Promise((resolve, reject) => {
                            const request = store.delete(key!);
                            request.onsuccess = () => {
                                this.cache.delete(String(key));
                                this.emit('delete', key);
                                resolve(undefined);
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.UPDATE:
                        return new Promise((resolve, reject) => {
                            const request = store.put(data);
                            request.onsuccess = () => {
                                const itemKey = Array.isArray(this.keyPath)
                                    ? this.keyPath.map(k => data[k]).join('|')
                                    : data[this.keyPath];
                                this.cache.set(itemKey, data);
                                this.emit('update', data);
                                resolve(request.result);
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.CLEAR:
                        return new Promise((resolve, reject) => {
                            const request = store.clear();
                            request.onsuccess = () => {
                                this.cache.clear();
                                this.emit('clear');
                                resolve(undefined);
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.CURSOR:
                        return new Promise((resolve, reject) => {
                            const request = store.openCursor();
                            request.onsuccess = (event) => {
                                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                                if (cursor) {
                                    cb(cursor);
                                    cursor.continue();
                                } else {
                                    resolve(undefined);
                                }
                            };
                            request.onerror = () => reject(request.error);
                        });

                    case OperationType.REFRESH:
                        this.closeConnection();
                        this.db = await this.open();
                        return this.db;

                    default:
                        throw new IndexDBError('Invalid operation type', 400);
                }
            });
        } catch (error: any) {
            console.error('IndexDB operation failed:', error);
            throw new IndexDBError(error.message || 'Operation failed', error.code || 500);
        }
    }

    // 添加数据 1
    public add(data:any): Promise<any> {
        return this.action({ type: OperationType.ADD, data })
    }
    // 获取数据 2
    public get(key: IDBValidKey): Promise<any> {
        return this.action({ type: OperationType.GET, key })
    }
    // 删除数据 3
    public del(key: IDBValidKey): Promise<void> {
        return this.action({ type: OperationType.DELETE, key })
    }
    // 更新数据 4
    public put(data:any): Promise<void>  {
        return this.action({ type: OperationType.UPDATE, data })
    }
    // 清空数据 5
    public clear(): Promise<void>  {
        return this.action({ type:  OperationType.CLEAR })
    }
    public refresh(): Promise<IDBDatabase> {
        return this.action({ type: OperationType.REFRESH })
    }
    public each(cb: (cursor: IDBCursorWithValue) => void): Promise<boolean> {
        return this.action({ type: OperationType.CURSOR, cb})
    }
    public delDB(dbName: string): Promise<void>  {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.deleteDatabase(dbName);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new IndexDBError('Failed to delete database', 500));
        });
    }
    // 批量操作方法
    public async bulkAdd(items: any[]): Promise<void> {
        await this.withTransaction('readwrite', async (store) => {
            await Promise.all(items.map(item => 
                new Promise((resolve, reject) => {
                    const request = store.add(item);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                })
            ));
        });
    }

    public async bulkGet(keys: string[]): Promise<any[]> {
        return Promise.all(keys.map(key => this.get(key)));
    }
    // 添加通过索引查询的方法
    public async getByIndex(indexName: string, value: any): Promise<any[]> {
        return this.withTransaction('readonly', async (store) => {
            return new Promise((resolve, reject) => {
                try {
                    const index = store.index(indexName);
                    const request = index.getAll(value);
                    
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(new Error('Failed to query by index'));
                } catch (error) {
                    reject(new Error('Index not found'));
                }
            });
        });
    }
    /**
     * 范围查询
     * @param indexName 索引名称
     * @param range 范围条件
     * @param direction 查询方向
     */
    public async rangeQuery(
        indexName: string,
        range: {
            start?: any,
            end?: any,
            includes?: boolean // 是否包含边界值
        } | IDBKeyRange,
        direction: IDBCursorDirection = 'next'
    ): Promise<any[]> {
        return this.withTransaction('readonly', async (store) => {
            return new Promise((resolve, reject) => {
                try {
                    const index = store.index(indexName);
                    let keyRange: IDBKeyRange | undefined;

                    // 如果不是 IDBKeyRange 对象，则创建一个
                    if (!(range instanceof IDBKeyRange)) {
                        const { start, end, includes = true } = range;
                        if (start !== undefined && end !== undefined) {
                            keyRange = IDBKeyRange.bound(start, end, !includes, !includes);
                        } else if (start !== undefined) {
                            keyRange = IDBKeyRange.lowerBound(start, !includes);
                        } else if (end !== undefined) {
                            keyRange = IDBKeyRange.upperBound(end, !includes);
                        }
                    } else {
                        keyRange = range;
                    }

                    const results: any[] = [];
                    const request = index.openCursor(keyRange, direction);

                    request.onsuccess = (event: Event) => {
                        const cursor = (event.target as any).result;
                        if (cursor) {
                            results.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(results);
                        }
                    };

                    request.onerror = () => reject(new Error('Range query failed'));
                } catch (error) {
                    reject(new Error('Index not found or query failed'));
                }
            });
        });
    }

     /**
     * 删除存储空间（表）
     * @param storeName 要删除的表名
     */
     public async deleteStore(storeName: string): Promise<void> {
        // 重要：关闭现有连接
        this.closeConnection();
         // 获取当前数据库版本
        const currentVersion = await this.getCurrentDBVersion();
        const newVersion = currentVersion + 1;
        return new Promise((resolve, reject) => {
            // 关闭现有连接
            this.closeConnection();
            
            const request = window.indexedDB.open(this.dbName, newVersion);

           request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (db.objectStoreNames.contains(storeName)) {
                    db.deleteObjectStore(storeName);
                }
            };

            request.onsuccess = (event) => {
                // 正确获取数据库实例
                const db = (event.target as IDBOpenDBRequest).result;
                db.close(); // 关闭新连接
                resolve();
            };

            request.onerror = () => reject(new Error('删除失败'));
        });
    }
    // 获取数据库当前版本
    private async getCurrentDBVersion(): Promise<number> {
        return new Promise((resolve) => {
            const request = indexedDB.open(this.dbName);
            request.onsuccess = () => {
                const db = request.result;
                const version = db.version;
                db.close();
                resolve(version);
            };
        });
    }
    // 添加关闭连接的方法
    private closeConnection(): void {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
    public destroy(): void {
        this.closeConnection();
        this.cache.clear();
        this.listeners.clear();
    }
}
export const indexdb: Function = (config: IndexDBProps): IndexDB => new IndexDB(config);