/**
 * @description 四舍五入到指定位数
 * @param {*} str 
 * @param {*} n 
 * @returns 
 */
export default function (str,n){
    if(Number.isInteger(Number(str)) && n=== undefined) return str 
    // 传入的数字字符串 或是 数字不能超过范围
    str = Number(str).toFixed(8).replace(/0+$/,'')
    // 如果n没有传直接返回
    if(n===undefined) return str
    // 整数
    const int = str.match(/\d+/)[0]
    // 小数
    const decimal = str.match(/\d+?$/)[0]
    // 截取小数部分的 四舍五入前半部分
    const subFirst = decimal.slice(0,n) // n = 0=> '' 表示 n 传入的是 0
    // 小数部分小数点的移动后进行四舍五入，并用 1 插入到小数部分最前方，兼容进 1 的情形
    const dec =  Math.round(Number('1'+ subFirst +'.'+ decimal.slice(n)))
    // 结果进行拼接
    const result =`${str.includes('-') ? '-' : ''}${String(dec)[0] == 2 ? +int + 1 : int}${subFirst ? '.' : ''}${subFirst ? String(dec).slice(1).padStart(n, 0): ''}`
    // 兼容-0 情形处理
    return result == 0 ? result.replace('-','') : result
}