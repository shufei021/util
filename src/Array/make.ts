
/**
 * @description: json 数组项键值 随意重组，比如数组项的 某个值作为key，某个键作为值
 * @param {Array} arr
 * @param {String} k1
 * @param {String} k2
 * @return {Array}
 */
export function make(arr: Array<any>, k1: string, k2: string): Array<any> {
    return arr.reduce((p:any[], c:any) => [...p, { [c[k1]]: c[k2] }], [])
}