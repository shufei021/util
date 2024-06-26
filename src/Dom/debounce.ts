
/**
 * @description 防抖函数
 * @param {Function} fn 
 * @param {Number} delay 
 * @param {Boolean} immerdate 
 * @return {Function}
 */

export function debounce(fn: Function, delay: number, immerdate: boolean): Function {
    let timer: any = null
    return function (...args: any[]): void {
        if (immerdate) {
            const is = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)
            // @ts-ignore
            if (is) fn.apply(this, args)
        } else {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                // @ts-ignore
                fn.apply(this, args)
            }, delay)
        }
    }
}
