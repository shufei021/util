/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2021-09-28 10:44:21
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-03-17 13:51:22
 * @FilePath: \zztx_utils\src\lib\dom\throttle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description:节流
 * @param { Function } func : 节流的事件响应函数
 * @param { Number } wait ：事件响应函数执行需求的频率时间
 * @param { Object } options ：配置对象，包含两个值 immediate（是否立即执行）和 trailing（最后是否还执行一次）
 */
// leading ：false trailing：true 第一次不会立即调用 离开了还会执行一次
// leading ：true  trailing：true 第一次会立即调用 离开了还会执行一次
// leading ：true  trailing：false 第一次会立即调用 离开了不会执行一次
// 默认 是 options = { leading:true, trailing:true }
const throttle = function (func, wait, options) {
    let timeout
    let old = 0 //之前的时间
    if (!options) options = {}
    let throttled = function () {
        let context = this
        let args = arguments
        // 获取当前的时间戳
        let now = new Date().valueOf()
        if (options.leading === false && !old) {
            old = now
        }
        if (now - old > wait) {
            // 第一次会立即执行
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            func.apply(context, args)
            old = now
        } else if (!timeout && options.trailing !== false) {
            // 最后一次也会执行
            timeout = setTimeout(() => {
                old = new Date().valueOf()
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }
    throttled.cancel = function () {
        if(timeout) clearTimeout(timeout)
        throttled = timeout = undefined 
        old = 0
    }
    return throttled
}
export default throttle
