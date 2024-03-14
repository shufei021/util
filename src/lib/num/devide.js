/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2021-09-28 10:44:21
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-07-20 14:25:33
 * @FilePath: \zztx_utils\src\lib\num\devide.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import calc from './calc'
/**
 * 两数相除
 * @param {Number} a :除数
 * @param {Number} b ：被除数
 * @param {Number} digit ：结果保留位数
 */
const devide = function (a, b, digit) {
    return Array.isArray(a) ? (a.length >= 2 ? a.reduce((p, c) => devide(p, c, b)) : '') : !a || !b ? 0 : calc(3, a, b, digit)
}
export default devide

/**
 * 示例：
 *
 * devide() // ""
 * devide(1) // ""
 * devide(1,3) // 0.3333333333333333
 * devide(1,3,1) // "0.3"
 * devide(1,3,2) // "0.33"
 *
 *
 *
 *
 */
/***
 * 示例：
 *
 * devide() // ""
 * devide([]) // ""
 * devide([1,3]) // 0.3333333333333333
 * devide([1,3,3]) // 0.1111111111111111
 * devide([1,9]) // 0.1111111111111111
 * devide([1,9],0) // 0
 * devide([1,9],1) // "0.1"
 * devide([1,9],2) // "0.11"
 * devide([1,9],3) // "0.111"
 *
 *
 *
 *
 *
 */
