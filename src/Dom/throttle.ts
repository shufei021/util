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


interface ThrottleOptions {
    leading?: boolean
    trailing?: boolean
}

interface resultType {
    cancel: Function
}
export function throttle(func: Function, wait: number, options: ThrottleOptions): resultType {
    let timeout: string | number | NodeJS.Timeout | null | undefined

    let old = 0 //之前的时间

    if (!options) options = {}

    let throttled = function (...args:any[]) {
        // 获取当前的时间戳
        let now = +new Date()
        if (options.leading === false && !old) {
            old = now
        }
        if (now - old > wait) {
            // 第一次会立即执行
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            // @ts-ignore
            func.apply(this, args)
            old = now
        } else if (!timeout && options.trailing !== false) {
            // 最后一次也会执行
            timeout = setTimeout(() => {
                old = +new Date()
                timeout = null
                // @ts-ignore
                func.apply(this, args)
            }, wait)
        }
    }
    // @ts-ignore
    throttled.cancel = function () {
        if(timeout) clearTimeout(timeout)
        // @ts-ignore
        timeout = undefined 
        old = 0
    }
    // @ts-ignore
    return throttled
}