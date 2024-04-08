
const emitter = {
    _events: {},
    count: 0,
    on(eventName, callback){
        //判断是有已经有对应的事件名
        if (!this._events[eventName]) {
            this._events[eventName] = [callback];
        } else {
            this._events[eventName].push(callback);
        }
    },
    emit(eventName, ...args){
        this._events[eventName]?.forEach(event => event(...args));
    },
    off(eventName) {
        if (this._events[eventName]) {
            delete this._events[eventName]
        }
    }
}
/**
 * @description 提供了一种机制来处理异步任务的结果缓存和等待逻辑，使得在多次请求相同任务时可以有效地减少重复请求，提高性能
 * @param { Function } getResult   获取结果的函数返回是Promise
 * @param { String }  localKey     缓存到本地的key
 * @returns Promise
 */
export default async function repeatOnce(getResult, localKey) {
    // 本地缓存
    const localResult = localStorage.getItem(localKey)
    // 如果本地缓存存在
    if (localResult) {
        // 返回本地缓存
        return Promise.resolve(localResult)
    } else { // 如果本地缓存不存在
        return new Promise(async (resolve) => {
            if (!emitter.count) {
                emitter.count = 1
                const request_result = await getResult()
                localStorage.setItem(localKey, request_result)
                resolve(request_result)
                emitter.emit('ok', request_result)
                emitter.off('ok')
            } else {
                emitter.count++
                emitter.on('ok',(result) => {
                    emitter.count = 0
                    resolve(result)
                })
            }
        })
    }
}
/**
 * 
 * 
function getToken(){
    console.log('%c [ getToken 参数 ]-1204', 'font-size:13px; background:pink; color:#bf2c9f;', arguments)
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('我是请求的结果数据 - token')
        }
        ,1000)
    })
}
const token = repeatOnce.bind(null, getToken.bind(null, 'getToken 传入的参数'), 'Access_Token')


// 页面有3个方法，每个方法里面都调用了同个接口，类似token
async function request1(){
    const res= await token()
    console.log('%c [ request1 ]-1226', 'font-size:13px; background:pink; color:#bf2c9f;', res)
}
async function request2(){
    const res= await token()
    console.log('%c [ request2 ]-1226', 'font-size:13px; background:pink; color:#bf2c9f;', res)
}
async function request3(){
    const res= await token()
    console.log('%c [ request3 ]-1226', 'font-size:13px; background:pink; color:#bf2c9f;', res)
}

request1()
request2()
request3()
 * 
 * 
 * 
 */