

// 构造函数实例化传入的参数对象类型
interface IndexDBProps {
    dbName: string, // 数据库名称
    dbVersion: number, // 数据库版本
    storeName: string, // 存储空间名称
    indexName: string, // 数据库索引名称
    keyPath: string // 数据库索引键名
}

interface ActionType {
    type: number,
    dbName?: string,
    data?: any,
    keyPath?: string,
    cb?: Function
}




interface EventType extends Event {
    target: any
}

class IndexDB {
     dbName: string;
     dbVersion: number;
     storeName: string;
     indexName: string;
     keyPath: string;
     db: any;
    constructor({ dbName, dbVersion, storeName, indexName, keyPath }: IndexDBProps) {
        // 数据库名称
        this.dbName = dbName;
        // 数据库版本
        this.dbVersion = dbVersion;
        // 存储空间名称
        this.storeName = storeName;
        // 索引名称
        this.indexName = indexName;
        //
        this.keyPath = keyPath
        //
        this.db = null
    }
    public action({ type=1, dbName = this.dbName, data = {}, keyPath = this.keyPath, cb=(cursor?: any)=>{} }={}) {
        return new Promise(async (resolve: Function, reject: Function) => {
            const map:{[key: string]:any} = {
                1: 'readwrite', // 新增
                2: 'readonly', // 获取
                3: 'readwrite',
                4: 'readwrite',
                5: 'readwrite'
            }
            if (type === 7) {
                this.db && this.db.close();
                this.db = await this.open(dbName);
                // 重新打开数据库
                const request = window.indexedDB.open(this.dbName, this.dbVersion); // 打开数据库
                request.onsuccess =  (event:EventType)=> {
                    const refreshedDB = event.target.result;
                    this.db = refreshedDB
                    resolve(refreshedDB)
                    // 可以进行其他操作，如获取对象存储空间等
                };
                request.onerror = function (event:EventType) {
                    reject(event)
                    console.error('Error refreshing database: ' + event.target.errorCode);
                };
            } else {
                if (!this.db) {
                    this.db = await this.open(dbName);
                }
                const transaction = this.db.transaction([dbName], map[type]);
                const objectStore = transaction.objectStore(dbName);
                if (type === 1) {
                    objectStore.add(data);
                    resolve(data)
                } else if (type === 2) {
                    const request = objectStore.get(keyPath);
                    request.onsuccess = function (event:EventType) {
                        resolve(event.target.result);
                    }
                } else if (type === 3) {
                    objectStore.delete(keyPath);
                    resolve()
                } else if (type === 4) {
                    objectStore.put(data);
                    resolve()
                } else if (type === 5) {
                    // 清空对象存储空间中的所有数据
                    let clearRequest = objectStore.clear();

                    clearRequest.onsuccess = function (event:EventType) {
                        resolve(event);
                    };

                    clearRequest.onerror = function (event:EventType) {
                        console.error('Error clearing data: ' + event.target.errorCode);
                        reject(event)
                    };
                } else if (type === 6) {
                    let request = objectStore.openCursor();
                    request.onsuccess = function (event:EventType) {
                        const cursor = event.target.result;
                        if (cursor) {
                            cb(cursor)
                            cursor.continue();
                            resolve(event)
                        } else {
                            console.error('No more entries.');
                        }
                    };
                }
            }
        })
    }

    // 打开数据库
    public open(dbName = this.dbName, dbVersion = this.dbVersion, keyPath = this.keyPath) {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, dbVersion); // 第一个参数是数据库名称，第二个参数是版本号
            request.onerror = function (event:EventType) {
                console.error('Database error: ' + event.target.errorCode);
                reject(event)
            };
            request.onsuccess = function (event:EventType) {
                const db = event.target.result;
                // 数据库打开成功后的操作
                resolve(db)

            };
            request.onupgradeneeded = function (event:EventType) {
                const db = event.target.result;
                // 数据库版本更新时的操作，比如创建对象存储空间
                if (!db.objectStoreNames.contains(dbName)) {
                    db.createObjectStore(dbName, { keyPath }); // 创建对象存储空间
                    resolve(db)
                }
            };
        })
    }
    // 添加数据 1
    public add(data:any) {
        return this.action({ type: 1, data })
    }
    // 获取数据 2
    public get(keyPath:any) {
        return this.action({ type: 2, keyPath })
    }
    // 删除数据 3
    public del(keyPath:any) {
        return this.action({ type: 3, keyPath })
    }
    // 更新数据 4
    public put(data:any) {
        return this.action({ type: 4, data })
    }
    // 清空数据 5
    public clear() {
        return this.action({ type: 5 })
    }
    public refresh() {
        return this.action({ type: 7 })
    }
    public each(cb: Function) {
        return this.action({ type: 6, cb:cb as any})
    }
    public delDB(dbName: string) {
        window.indexedDB.deleteDatabase(dbName)
    }
}
export const indexdb: Function = function (a: IndexDBProps):object{
    return new IndexDB(a)
}
