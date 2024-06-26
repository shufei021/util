/**
 * @description 数组转换为树形结构
 * @param {Array} arr 需要转换为树形结构的 JSON 数组
 * @param {Number | String | Null} id 树节点的 id
 * @param {String} link 父节点 id 的字段名，默认为 'pid'
 * @returns {Array} 转换后的树形结构数组
 */
export declare function arrayToTree(arr: Array<any>, id?: number | string | null, idAlias?: string, pidAlias?: string, childrenAlias?: string): Array<any>;
