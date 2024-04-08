/**
 * @description 将字符串中的特殊字符转义为 HTML 实体
 * @param {String} string 要转义的字符串
 * @returns {String} 转义后的字符串
 */
const escape = function (string) {
    // 定义 HTML 实体转义映射表
    const htmlEscapes = {
        '&': '&amp',
        '<': '&lt',
        '>': '&gt',
        '"': '&quot',
        "'": '&#39'
    };

    // 定义匹配未转义 HTML 实体的正则表达式
    const reUnescapedHtml = /[&<>"']/g;
    // 创建检查是否包含未转义 HTML 实体的正则表达式
    const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    // 如果字符串不为空且包含未转义 HTML 实体，则进行转义
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr]) : string;
}


export default escape