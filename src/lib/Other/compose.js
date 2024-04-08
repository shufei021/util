/*
 * @Author: shufei 1017981699@qq.com
 * @Date: 2022-12-05 15:37:15
 * @LastEditors: shufei 1017981699@qq.com
 * @LastEditTime: 2022-12-05 15:38:59
 * @FilePath: \zztx_utils\src\lib\extend\compose.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)
export default compose

/**
 * 
 * 
 * 
function firstFn(n){
    console.log('%c [ firstFn ]-1033', 'font-size:13px; background:pink; color:#bf2c9f;', n)
    return n+99
}
function secondFn(n){
    console.log('%c [ secondFn ]-1036', 'font-size:13px; background:pink; color:#bf2c9f;', n)
    return n+1
}
function threeFn(n){
    console.log('%c [ threeFn ]-1040', 'font-size:13px; background:pink; color:#bf2c9f;', n)
    return n+1
}

console.log(compose(firstFn,secondFn,threeFn)(1))
 * 
 * 
 * 
 * 
 * 
 */