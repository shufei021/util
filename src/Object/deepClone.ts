

function deepCloneFunction(func:any): Function{
    // 创建一个新的函数，复制原函数的代码体
    const clonedFunc = new Function('return ' + func.toString())();

    // 复制原函数的原型链
    clonedFunc.prototype = Object.create(func.prototype);

    // 复制原函数的属性
    for (let key in func) {
        if (func.hasOwnProperty(key)) {
            clonedFunc[key] = func[key];
        }
    }

    return clonedFunc;
}

export const deepClone:Function = function(parent:any | []):any{
    // 判断类型函数
    const isType = (o:any, t:string)=> Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === t
    // 维护两个储存循环引用的数组
    const parents:any[] = []
    const children:any[] = []
    // 克隆函数
    const clone: Function = (parent:any) => {
        if (parent === null) return null
        if (typeof parent !== 'object' && typeof parent !== 'function') return parent
        // 对象处理
        let child:any, proto:any
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
        const index:number = parents.indexOf(parent)

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