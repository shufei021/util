
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
    dbName: string, // 数据库名称
    dbVersion: number, // 数据库版本
    storeName: string, // 存储空间名称
    indexName: string, // 数据库索引名称
    keyPath: string, // 数据库索引键名
    indexes?: IndexConfig[], // 改为数组，支持多个索引
    handleVersionUpgrade?:Function // 数据库版本升级处理函数
}
// 操作参数接口
interface ActionOptions {
    type?: OperationType,
    dbName?: string,
    data?: any,
    keyPath?: string,
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
    options?: IDBIndexParameters;  // { unique?: boolean, multiEntry?: boolean }
}

class IndexDB {
    private dbName: string;
    private dbVersion: number;
    private storeName: string;
    private indexes: IndexConfig[];
    private keyPath: string;
    private db: IDBDatabase | null;
    private readonly connectionTimeout: number = 5000;
    private readonly retryAttempts: number = 3;
    private handleVersionUpgrade: Function | undefined;
    private cache = new Map<string, any>();
    private listeners = new Map<string, Set<Function>>();
    constructor({ dbName, dbVersion, storeName, keyPath, indexes = [],handleVersionUpgrade }: IndexDBProps) {
        // 数据库名称
        this.dbName = dbName;
        // 数据库版本
        this.dbVersion = dbVersion;
        // 存储空间名称
        this.storeName = storeName;
        // 索引数组
        this.indexes = indexes;
        this.keyPath = keyPath
        this.db = null
        this.handleVersionUpgrade = handleVersionUpgrade
        this.ensureConnection()
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
     // 确保数据库连接
     private async ensureConnection(): Promise<IDBDatabase> {
        if (!this.db) this.db = await this.connectWithRetry();
        return this.db;
    }

     // 带重试的连接
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

    // 事务包装器
    private async withTransaction<T>(
        mode: IDBTransactionMode,
        callback: (store: IDBObjectStore) => Promise<T>
    ): Promise<T> {
        const db = await this.ensureConnection();
        const transaction = db.transaction([this.storeName], mode);
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            const result = callback(store);
            transaction.oncomplete = () => resolve(result);
            transaction.onerror = () => reject(transaction.error);
            transaction.onabort = () => reject(transaction.error);
        });
    }

    // 核心操作方法
    public async action(options: ActionOptions = {}): Promise<any> {
        const { 
            type = OperationType.ADD, 
            dbName = this.dbName, 
            data = {}, 
            keyPath = this.keyPath, 
            cb = () => {} 
        } = options;
        try {
            // 根据操作类型执行相应的方法
            const mode = type === OperationType.GET ? 'readonly' : 'readwrite';
            
            return await this.withTransaction(mode, async (store) => {
                switch (type) {
                    case OperationType.ADD:
                        return store.add(data);
                    
                    case OperationType.GET:
                        return new Promise((resolve) => {
                            const request = store.get(keyPath);
                            request.onsuccess = () => resolve(request.result);
                        });
                    
                    case OperationType.DELETE:
                        return store.delete(keyPath);
                    
                    case OperationType.UPDATE:
                        return store.put(data);
                    
                    case OperationType.CLEAR:
                        return store.clear();
                    
                    case OperationType.CURSOR:
                        return new Promise((resolve) => {
                            const request = store.openCursor();
                            request.onsuccess = (event: Event) => {
                                const cursor = (event.target as any).result;
                                if (cursor) {
                                    cb(cursor);
                                    cursor.continue();
                                }
                                resolve(true);
                            };
                        });
                    
                    case OperationType.REFRESH:
                        this.db?.close();
                        this.db = await this.open(dbName);
                        return this.db;
                    
                    default:
                        throw new IndexDBError('Invalid operation type', 400);
                }
            });
        } catch (error:any) {
            console.error('IndexDB operation failed:', error);
            throw new IndexDBError(
                error.message || 'Operation failed',
                error.code || 500
            );
        }
    }

    // 打开数据库
    public open(dbName = this.dbName, dbVersion = this.dbVersion, keyPath = this.keyPath): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, dbVersion); // 第一个参数是数据库名称，第二个参数是版本号
            request.onerror =  (event:Event)=> {
                const error = (event.target as any).error;
                reject(new IndexDBError('Failed to open database', error?.code || 500))
            };
            request.onsuccess =  (event:Event)=> {
                const db = (event.target as any).result;
                this.db = db;
                // 数据库打开成功后的操作
                resolve(db)

            };
            // 添加 onblocked 处理
            request.onblocked = (event: Event) => {
                console.warn('Database upgrade blocked. Please close other tabs/windows.');
                reject(new IndexDBError('Database upgrade blocked', 409));
            };
            // onupgradeneeded 只在版本号增加时触发
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as any).result;
                const oldVersion = event.oldVersion;  // 获取旧版本号
                try {
                    // 只创建一次存储空间，使用 storeName
                    if (!db.objectStoreNames.contains(this.storeName)) {
                        const store = db.createObjectStore(this.storeName, { keyPath });
                        
                        // 创建索引
                        this.indexes.forEach(({ name, keyPath: indexKeyPath, options = {} }) => {
                            if (!store.indexNames.contains(name)) {
                                store.createIndex(name, indexKeyPath, options);
                            }
                        });
                        // 版本升级时的处理
                        if (oldVersion < dbVersion && this.handleVersionUpgrade)  {
                            this.handleVersionUpgrade(db, oldVersion, dbVersion);
                        }
                    }
                    resolve(db)
                } catch (error) {
                    console.error('Database upgrade failed:', error);
                    reject(new IndexDBError('Database upgrade failed', 500));
                }
            };
        })
    }
    // 添加数据 1
    public add(data:any): Promise<any> {
        return this.action({ type: OperationType.ADD, data })
    }
    // 获取数据 2
    public get(keyPath:string): Promise<any> {
        return this.action({ type: OperationType.GET, keyPath })
    }
    // 删除数据 3
    public del(keyPath:string): Promise<void> {
        return this.action({ type: OperationType.DELETE, keyPath })
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
            items.forEach(item => store.add(item));
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
        // 增加版本号
        this.dbVersion += 1;
        
        return new Promise((resolve, reject) => {
            // 关闭现有连接
            this.closeConnection();
            
            const request = window.indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event: Event) => {
                const db = (event.target as any).result;
                try {
                    // 检查表是否存在
                    if (db.objectStoreNames.contains(storeName)) {
                        db.deleteObjectStore(storeName);
                    }
                } catch (error) {
                    console.error('Failed to delete store:', error);
                    reject(new IndexDBError('Failed to delete store', 500));
                }
            };

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: Event) => {
                const error = (event.target as any).error;
                reject(new IndexDBError('Failed to delete store', error?.code || 500));
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
