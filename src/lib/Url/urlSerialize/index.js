/**
 * 将参数对象序列化成 URL 查询字符串
 * @param {String} baseURL - URL 地址
 * @param {Object} params - 参数对象
 * @returns {String} - 参数序列化后的字符串
 */
const urlSerialize = function (baseURL, params = {}) {
    return Object.keys(params).reduce((p, c) => (p += (p === baseURL ? '?' : '&') + `${c}=${encodeURIComponent(params[c])}`), baseURL)
}

export default urlSerialize

/**
 *
 *
 * urlSerialize('https://juejin.cn/search',{query:'javascript'}) // "https://juejin.cn/search?query=javascript"
 *
 */
