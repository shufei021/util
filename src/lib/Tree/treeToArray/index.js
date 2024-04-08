
/**
 * @description: 树扁平化方法
 * @param { Array } list
 * @param { String } children
 */
const treeToArray = function(list,children='children') {
    return (Array.isArray(list)?list:[list]).reduce((arr, item) =>[...arr,...[item], ...treeToArray(item[children] || []) ],[])
}
export default treeToArray
