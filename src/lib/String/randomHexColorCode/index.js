/**
 * @description 生成随机的十六进制颜色代码
 * @returns {String} 随机生成的十六进制颜色代码
 */
const randomHexColorCode = function () {
    // 生成一个随机数，并将其转换为十六进制字符串
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    // 返回格式化后的十六进制颜色代码，以 '#' 开头，取字符串的前6位作为颜色值
    return '#' + n.slice(0, 6);
}
export default randomHexColorCode
