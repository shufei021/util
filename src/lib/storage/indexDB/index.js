class IndexDB { 
    constructor({dbName, dbVersion, storeName, indexName, keyPath}) {
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
     action ({ type, dbName = this.dbName, data={}, keyPath =this.keyPath, cb } = {}) {
        return new Promise(async (resolve, reject) => {
            const map = {
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
                let request = window.indexedDB.open(this.dbName, this.dbVersion); // 打开数据库
                request.onsuccess = function(event) {
                    let refreshedDB = event.target.result;
                    this.db= refreshedDB
                    resolve(refreshedDB)
                    // 可以进行其他操作，如获取对象存储空间等
                };
                request.onerror = function(event) {
                    reject(event)
                    console.error('Error refreshing database: ' + event.target.errorCode);
                };
            } else {
                if(!this.db){
                    this.db = await this.open(dbName);
                }
                const transaction = this.db.transaction([dbName], map[type]);
                const objectStore = transaction.objectStore(dbName);
                if (type === 1) {
                    objectStore.add(data);
                    resolve(data)
                } else if (type === 2) {
                    const request = objectStore.get(keyPath);
                    request.onsuccess = function(event) {
                        resolve(event.target.result);
                    }
                } else if(type === 3){
                    objectStore.delete(keyPath);
                    resolve()
                } else if(type === 4){
                    objectStore.put(data);
                    resolve()
                } else if(type === 5){
                     // 清空对象存储空间中的所有数据
                     let clearRequest = objectStore.clear();
                    
                    clearRequest.onsuccess = function(event) {
                        resolve(event);
                    };
                    
                    clearRequest.onerror = function(event) {
                        console.error('Error clearing data: ' + event.target.errorCode);
                        reject(event)
                    };
                } else if(type === 6){
                    let request = objectStore.openCursor();
                    request.onsuccess = function(event) {
                        let cursor = event.target.result;
                        if (cursor) {
                            cb(cursor)
                            cursor.continue();
                        } else {
                            console.log('No more entries.');
                        }
                    };
                }
            }
        })
    }

    // 打开数据库
    open (dbName = this.dbName, dbVersion = this.dbVersion, keyPath = this.keyPath) {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(dbName, dbVersion); // 第一个参数是数据库名称，第二个参数是版本号
            request.onerror = function(event) {
                console.error('Database error: ' + event.target.errorCode);
                reject(event)
            };
            request.onsuccess = function(event) {
                let db = event.target.result;
                // 数据库打开成功后的操作
                resolve(db)
                
            };
            request.onupgradeneeded = function(event) {
                let db = event.target.result;
                // 数据库版本更新时的操作，比如创建对象存储空间
                if (!db.objectStoreNames.contains(dbName)) {
                    db.createObjectStore(dbName, { keyPath }); // 创建对象存储空间
                    resolve(db)
                }
            };
        })
    }
    // 添加数据 1
    add (data) { 
       return this.action({type:1, data})
    }
    // 获取数据 2
    get (keyPath) { 
        return this.action({type:2, keyPath})
    }
    // 删除数据 3
    del (keyPath) { 
        return this.action({type:3, keyPath})
    }
    // 更新数据 4
    put (data) { 
        return this.action({type:4, data})
    }
    // 清空数据 5
    clear () {
        return this.action({type:5})
    }
    refresh(){
        return this.action({type:7})
    }
    each(cb){
        return this.action({type:6, cb})
    }
    delDB (dbName) { 
        window.indexedDB.deleteDatabase(dbName)
    }
}


export default function indexdb (opt={}) {
    return new IndexDB(opt)
}