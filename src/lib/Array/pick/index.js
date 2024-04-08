/**
 * @description: json数组项属性筛选
 * @param {*} arr 
 * @param {*} keys
 */
const pick = function pick(arr, keys) {
    return arr.reduce((p, c) => [...p, keys.reduce((p1, c1) => ({ ...p1, [c1]: c[c1] }), {})], [])
}
export default pick
