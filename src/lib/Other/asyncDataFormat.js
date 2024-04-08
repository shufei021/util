/**
 * @description 异步数据处理
 * @param {Object | Array} data 需要处理的数据
 * @param {String | Array} promiseKey 需要处理的json的key
 * @version 1.0.50 开始支持
 */

 export default function asyncDataFormat(data,promiseKey){
    return new Promise(async function(resolve){
        if(Array.isArray(data)){
            const asyncKeys = typeof promiseKey === 'string' ? [promiseKey] : promiseKey
            for(const item of data){
                for(let i = 0;i<asyncKeys.length;i++){
                    if(item[asyncKeys[i]]){
                        item[asyncKeys[i]] =  await item[asyncKeys[i]]
                    }
                }
            }
            resolve(data)
        } else if(Object.prototype.toString.call(data) === '[object Object]'){
            const asyncKeys = typeof promiseKey === 'string' ? [promiseKey] : promiseKey
            for(const key of asyncKeys){
                data[key] =  await data[key]
            }
            resolve(data)
        }
       
    })
}
/**
 * 场景：传入后端的数据中有的值是 需要异步获取的
 * 
 * 
function getAge(num){
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            resolve(num || parseInt(Math.random()*100))
        },3000)
    })
}
const jsonArr = [
    { 'name':'11','age':getAge(1)},
    { 'name':'12','age':getAge(3)},
    { 'name':'13','age':getAge()},
    { 'name':'14','age':getAge()},
]

const json = { 
    name:'11',
    age:getAge(),
    age1:getAge(),
}

asyncJsonArrFormat(jsonArr,'age').then(data=>{
    console.log('%c [ data ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', data)
})

asyncJsonArrFormat(jsonArr,['age','age1']).then(data=>{
    console.log('%c [ data ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', data)
})


asyncJsonArrFormat(json, 'age').then(data=>{
    console.log('%c [ data ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', data)
})

asyncJsonArrFormat(json, ['age','age1']).then(data=>{
    console.log('%c [ data ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', data)
})
 * 
 */

