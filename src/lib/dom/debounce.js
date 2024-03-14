/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2021-09-28 10:44:21
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-03-17 13:49:13
 * @FilePath: \zztx_utils\src\lib\dom\debounce.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description:防抖
 * @param { Function } func : 防抖的事件响应函数
 * @param { Number } wait ：事件响应函数执行需求的单位时间
 * @param { Boolean } immediate ：是否立即执行
 * @return 内部函数执行结果（返回的对象身上可以调用取消功能）
 */
const debounce = function (func, wait, immediate) {
    let timeout
    let debounced = function () {
        // 保存参数
        let arg = arguments
        // 保存 this
        let context = this
        // 如果 定时器 timeout 存在，就清除
        if (timeout) clearTimeout(timeout)
        // 如果立即触发
        if (immediate) {
            // callNow 变量 // true
            let callNow = !timeout
            // 定时器 wait 时间后 timeout 赋值为null
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            // 此时 callNow 为 true，直接只需回调函数 func
            if (callNow) func.apply(context, arg)
        } else {
            // 正常触发
            timeout = setTimeout(function () {
                func.apply(context, arg)
            }, wait)
        }
    }
    debounced.cancel = function () {
        if(timeout) clearTimeout(timeout)
        debounced = null
        timeout = null
    }
    return debounced
}
export default debounce
