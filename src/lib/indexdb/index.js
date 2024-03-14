/*
 * @Description: 
 * @Author: yangshaolong
 * @Date: 2023-05-05 10:14:06
 * @LastEditTime: 2023-07-11 15:37:38
 * @LastEditors: yangshaolong
 */

// 默认配置
const dbConfig = {
    dbName: 'zztx_crm',
    storeName: 'store_crm',
    version: 1,
    keyPath: 'key'
}

// 获取indexdb
function getIdxDB () {
    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
}

// 创建并打开数据库
function openIdxDB ({ dbName = 'zztx_crm', storeName = 'store_crm', version = 1, keyPath = 'key' } = dbConfig) {
    return new Promise((resolve, reject) => {
        const indexedDB = getIdxDB()
        const request = indexedDB.open(dbName, version)
        request.onsuccess = (event) => resolve(event.target.result)
        request.onerror = (event) => reject(event)

        // 数据库创建或升级的时候会触发
        request.onupgradeneeded = function (event) {
            const db = event.target.result
            // console.log('onupgradeneeded', db)
            // db.deleteObjectStore(db.objectStoreNames[0]);//del表
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath }) // 创建表
            }
        }
    })
}

// 增加数据
function addData () {
    return action('add', ...arguments)
}

//   删除数据
function delData () {
    return action('delete', ...arguments)
}

//  查找数据
function getData () {
    return action('get', ...arguments)
}

//  修改数据
function putData () {
    return action('put', ...arguments)
}

// 清空表数据
function clearData () {
    return action('clear', ...arguments)
}

// 获取表格下所有的key
function getAllKeys () {
    return action('getAllKeys', ...arguments)
}

// 获取表格下所有的数据
function getAllData () {
    return action('getAll', ...arguments)
}

// 删库跑路
function delDB (dbName) {
    getIdxDB().deleteDatabase(dbName)
}

// db-action
function action (name, db, storeName, data) {
    return new Promise((resolve, reject) => {
        const store = db.transaction(storeName, 'readwrite').objectStore(storeName)
        const request = store[name](data)
        request.onsuccess = (evt) => resolve(evt.target.result, evt)
        request.onerror = (evt) => reject(evt)
    })
}

// storage-action
const storageConfig = {
    dbName: '__crmIdxDBStorage',
    storeName: '__crmDBstore'
}
async function storage (type, key, val) {
    const { dbName, storeName } = storageConfig
    const db = await openIdxDB({ dbName, storeName })

    return new Promise((resolve, reject) => {
        const typeMap = {
            set: 'putData',
            get: 'getData',
            del: 'delData',
            clear: 'clearData'
        }
        const param = type === 'set' ? { key, val } : key
        idxDB[typeMap[type]](db, storeName, param).then(res => {
            resolve(type === 'get' ? res?.val : res)
            type === 'clear' && key && delDB(dbName)
        }, err => {
            reject(err)
        })
    })
}
const idxDB = { openIdxDB, addData, delData, getData, putData, clearData, getAllKeys, getAllData, delDB }
const idxDBStorage = {
    set: (key, val) => storage('set', key, val),
    get: (key) => storage('get', key),
    del: (key) => storage('del', key),
    clear: (runAway) => storage('clear', runAway)
}
export default { idxDB, idxDBStorage }