/**
 * 将参数对象序列化成 URL 查询字符串
 * @param {String} baseURL - URL 地址
 * @param {Object} params - 参数对象
 * @returns {String} - 参数序列化后的字符串
 */
export function urlSerialize(baseURL: string, params:  Record<string, any> = {}): string {
    return Object.keys(params).reduce((p, c) => (p += (p === baseURL ? '?' : '&') + `${c}=${encodeURIComponent(params[c])}`), baseURL)
}