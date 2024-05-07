/**
 * @description 数组转换为树形结构
 * @param {Array} arr 需要转换为树形结构的 JSON 数组
 * @param {Number | String} id 树节点的 id
 * @param {String} link 父节点 id 的字段名，默认为 'pid'
 * @returns {Array} 转换后的树形结构数组
 */
const arrayToTree = function (arr, id = null, link = 'pid',childrenKey = 'children') {
    // 使用 filter 方法过滤出当前节点的子节点，并使用 map 方法将子节点转换为树形结构
    return arr.filter(i => i[link] === id).map(i => ({ ...i, [childrenKey]: arrayToTree(arr, i.id, link) }));
}
