/**
 * @description URL模板参数格式化（GET请求URL模板）
 * @param {String} urlTmp 模板路径，例如：'/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}' 或 '/uap/msg/announcementRecord'
 * @param {Object} params 传入的参数，包含路径参数或不包含
 * @param {Boolean} isCompose 是否拼接路径和查询参数
 * @returns {String} 格式化后的URL
 */
export declare function urlTmtFmt(urlTmp: string, params?: {
    [key: string]: string;
}, isCompose?: boolean): string;
