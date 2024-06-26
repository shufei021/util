/**
 * @description: 生成 起止数字间（包含起止数字）的升序数组
 * @param {Number} min : 最小值
 * @param {Number} max ：最大值
 * @param {Number} n：指定生成的个数，默认1
 * @param {Boolean} isRepeat：是否重复,默认重复
 */
export const range: Function = function (min: number, max: number, n:number=0, isRepeat?: boolean) {
    if (isRepeat === undefined && n === 0) {
        return Array.from({ length: max - min + 1 }, (_, i) => i + min)
    } else {
        if (isRepeat) {
            return Array.from({ length: n ||  0 }, () => Math.floor(Math.random() * (max - min + 1)) + min)
        } else  {
            const arr = Array.from({ length: max - min + 1 }, (_, i) => i + min)
            const num = n > arr.length ? arr.length : n
            const ret:number[] = []
            while (ret.length != num) {
                const random:number = arr[Math.floor(Math.random() * arr.length)]
                !ret.includes(random) && ret.push(random)
            }
            return ret
        } 
    }
}