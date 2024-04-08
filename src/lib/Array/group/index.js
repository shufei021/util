/**
 * @description: 一维数组转二维数组 (分组)
 * @param {Array} arr:数组
 * @param {Number} num: 平分基数（num 个为一组进行分组（归档））
 */
const group = function (arr, num) {
    return [...Array(Math.ceil(arr.length / num)).keys()].reduce((p, _, i) => [...p, arr.slice(i * num, (i + 1) * num)], [])
}
export default group

/**
 * 目的：如何快速讲一个数组拆分成几个小数组
 * 示例：
 *
 * group([1,2,3,4,5,6,7,8,9,10],2) // [[1,2],[3,4],[5,6],[7,8],[9.10]]
 *
 * group([1,2,3,4,5,6,7,8,9,10],3) // [[1,2,3],[4,5,6],[7,8,9],[10]]
 *
 *
 *
 *
 *
 */
