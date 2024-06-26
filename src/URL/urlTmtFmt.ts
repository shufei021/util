
/**
 * @description URL模板参数格式化（GET请求URL模板）
 * @param {String} urlTmp 模板路径，例如：'/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}' 或 '/uap/msg/announcementRecord'
 * @param {Object} params 传入的参数，包含路径参数或不包含
 * @param {Boolean} isCompose 是否拼接路径和查询参数
 * @returns {String} 格式化后的URL
 */
export function urlTmtFmt(urlTmp: string, params: {[key: string]: string} = {}, isCompose?: boolean ): string {
    // 判断模板路径中是否包含花括号 {}
    let url = /\{(\w+)\}/g.test(urlTmp) ?
        // 如果包含，替换为对应的参数值
        urlTmp.replace(/\{(\w+)\}/g, (_, b) => {
            let tmp = params[b];
            // 删除已替换的参数
            delete params[b];
            return tmp;
        }) :
        // 如果不包含，则直接使用模板路径
        urlTmp;
    // 根据 isCompose 判断是否拼接路径和查询参数
    return isCompose && Object.keys(params).length ?
        // 如果需要拼接，并且还有剩余的参数，则拼接路径和查询参数
        Object.keys(params).reduce((pre, cur) => (pre += (pre === url ? '?' : '&') + `${cur}=${params[cur]}`), url) :
        // 否则，返回处理后的URL
        url;
}