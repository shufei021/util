/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2021-09-28 10:44:21
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-02-21 12:43:37
 * @FilePath: \zztx_utils\src\lib\obj\deepClone.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import isType from '../base/isType'

/**
 * deep clone
 * @param  {[type]} parent object 需要进行克隆的对象
 * @return {[type]}        深克隆后的对象
 */
const clone = parent => {
    // 维护两个储存循环引用的数组
    const parents = []
    const children = []
    const _clone = parent => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent

        let child, proto

        if (isType(parent, 'array')) {
            // 对数组做特殊处理
            child = []
        } else if (isType(parent, 'regexp')) {
            // 对正则对象做特殊处理
            child = new parent.constructor(parent.source, /\w*$/.exec(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime())
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent)
            // 利用Object.create切断原型链
            child = Object.create(proto)
        }

        // 处理循环引用
        const index = parents.indexOf(parent)

        if (index !== -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index]
        }
        parents.push(parent)
        children.push(child)

        for (const i in parent) {
            // 递归
            child[i] = _clone(parent[i])
        }

        return child
    }
    return _clone(parent)
}

/**
 * 对象深度克隆,
 * JSON.stringify深度克隆对象
 * 无法对函数 、RegExp等特殊对象的克隆,
 * 会抛弃对象的constructor,所有的构造函数会指向Object
 * 对象有循环引用,会报错
 * @param {Object}  obj 克隆的对象
 */
const deepClone = obj => {
    return clone(obj)
}
export default deepClone
