/**
 * @description 数组转换为树形结构
 * @param {Array} arr 需要转换为树形结构的 JSON 数组
 * @param {Number | String | Null} id 树节点的 id
 * @param {String} link 父节点 id 的字段名，默认为 'pid'
 * @returns {Array} 转换后的树形结构数组
 */
export function arrayToTree(
    arr: Array<any>,
    id: number | string | null = null,
    idAlias: string = 'id',
    pidAlias: string = 'pid',
    childrenAlias = 'children'
): Array<any> {
    // 使用 filter 方法过滤出当前节点的子节点，并使用 map 方法将子节点转换为树形结构
    return arr
        .filter((i: any) => i[pidAlias] === id)
        .map((i: any) => ({ ...i, [childrenAlias]: arrayToTree(arr, i[idAlias],idAlias, pidAlias,childrenAlias) }));
}
