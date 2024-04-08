const deepClone = parent => {
    // 判断类型函数
    const isType = (o, t)=> Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === t
    // 维护两个储存循环引用的数组
    const parents = []
    const children = []
    // 克隆函数
    const clone = parent => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent
        // 对象处理
        let child, proto
        // 数组处理
        if (isType(parent, 'array')) {
            // 对数组做特殊处理
            child = []
        } else if (isType(parent, 'regexp')) { // 正则处理
            // 对正则对象做特殊处理
            child = new parent.constructor(parent.source, /\w*$/.exec(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'date')) { // 日期处理
            // 对Date对象做特殊处理
            child = new Date(parent.getTime())
        } else if(isType(parent, 'function')) {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent)
            child = deepCloneFunction(parent)
        } else { // 纯对象
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

        for (const i in parent) { // 递归
            child[i] = clone(parent[i])
        }
        // 返回克隆的值
        return child
    }
    return clone(parent)
}

export default deepClone