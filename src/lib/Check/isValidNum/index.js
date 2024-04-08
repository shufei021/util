/**
 * 检查给定的值是否为有效数字。
 * @param {any} val - 要检查的值。
 * @param {boolean} isExp - 可选参数，指定是否允许指数表示法（科学计数法）。
 * @returns {boolean} 如果值是数字，则返回 true；否则返回 false。
 */
const isValidNum = function(val, isExp) {
    // 构造一个正则表达式来匹配数字
    // 如果 isExp 为 true，则包括对指数表示法的支持
    // 否则，它只匹配标准的十进制表示法
    var regex = isExp ? /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/ : /^[+-]?\d+(\.\d+)?$/;
    
    // 检测 val 的字符串表示是否与构造的正则表达式匹配
    return regex.test(String(val));
}
export default isValidNum

