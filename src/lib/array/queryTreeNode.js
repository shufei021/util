/*
 * @Description: 
 * @Author: shufei
 * @Date: 2021-09-22 20:20:01
 * @LastEditTime: 2021-09-22 20:24:04
 * @LastEditors: shufei
 */
import deepClone from "../obj/deepClone"
/**
 * @description: 查询树节点
 * @param { Object | Array } tree:树
 * @param { String } id：id
 * @param { String } idAlias：id别名
 * @param { String } children：children：别名
 */
const queryTreeNode = function(tree,id,{idAlias = 'id',  children = 'children'}){
    tree = deepClone(tree)
    const q = Array.isArray(tree) ? tree : [tree]
    while (q.length) {
        let top = q.shift()
        if (top[idAlias] === id) return top
        top[children] &&
            top[children].length &&
            top[children].forEach(child => {
                q.push(child)
            })
    }
}

export default queryTreeNode