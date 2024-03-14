

// 判断值类型是否是给出的类型
export const is = (val, type) => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type

// 是否是 array
export const isArray = (val) => is(val, 'array')

// 是否是 undfined
export const isUndefined = (val) => is(val, 'undefined')

// 是否是 null
export const isNull = (val) => is(val, 'null')

// 是否是 number
export const isNumber = (val) => is(val, 'number')

// 是否是 date
export const isDate = (val) => is(val, 'date')

// 是否是 regExp
export const isRegExp = (val) => is(val, 'regExp')

// 是否是 function
export const isFunction = (val) => is(val, 'function')

// 是否是 string
export const isString = (val) => is(val, 'string')

// 是否是 object
export const isObject = (val) => is(val, 'object')

// 是否是 boolean
export const isBoolean = (val) => is(val, 'boolean')

// 两个值是否值相等
export const isEquals = function(a, b, checked = new Set()) {
    // 提前返回不同类型的值
    if (typeof a !== typeof b) return false;

    // 处理循环引用
    if (typeof a === 'object' && typeof b === 'object') {
        if (checked.has(a) && checked.has(b)) return true;
        checked.add(a);
        checked.add(b);
    }

    // 基本类型的值直接比较
    if (a === b || (Number.isNaN(a) && Number.isNaN(b))) return true;

    // 检查引用类型的值
    if (typeof a === 'object') {
        // 如果是日期对象，比较时间戳
        if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
        // 如果是正则表达式，比较字符串形式
        if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();
        // 如果是 Map，转换为普通对象进行比较
        if (a instanceof Map && b instanceof Map) {
            const objA = Object.fromEntries(a.entries());
            const objB = Object.fromEntries(b.entries());
            return isEquals(objA, objB, checked);
        }
        // 如果是数组或对象，递归比较属性
        if (isArray(a) && isArray(b) || isObject(a) && isObject(b)) {
            const keysA = Object.keys(a).sort(); // 对属性排序
            const keysB = Object.keys(b).sort(); // 对属性排序
            // 检查属性数量是否相同
            if (keysA.length !== keysB.length) return false;
            // 检查每个属性是否相等
            return keysA.every((key, index) => key === keysB[index] && isEquals(a[key], b[key], checked));
        }
    }

    // 其他情况直接返回 false
    return false;
}

// const isEmpty = function (value, exclude = []) {
//     // includes [0, false, '',null, undefined, new Map(),new Set(),{},[],arguments]
//     if (value == null) return true
//     if (isArrayLike(value)) {
//         try {
//             return !value.length
//         } catch (e) {}
//     }

//     if (['map', 'set'].includes(getType(value))) return !value.size
//     if (isPrototype(value)) return !Object.keys(value).length
//     const hasOwnProperty = Object.prototype.hasOwnProperty
//     for (const key in value) {
//         if (hasOwnProperty.call(value, key)) return false
//     }
//     return true
// }
//检查 `value` 是否可能是原型对象。
export const isPrototype = function (value) {
    const objectProto = Object.prototype
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto
    return value === proto
}
// 是否有长度
export const isLength = function (value) {
    const MAX_SAFE_INTEGER = 9007199254740991 // 2**53-1
    return typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
export const isArrayLike = function (value) {
    return value != null && typeof value !== 'function' && isLength(value.length)
}
export const getType = function (o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}
export const isObjectLike = function (value) {
    return typeof value === 'object' && value !== null
}
export const isArguments = function (value) {
    return isObjectLike(value) && is(value, 'arguments')
}

// 检查的值
export const isEmpty = function (value) {
    if (value == null) return true
    if (isArrayLike(value)) {
        try {
            return !value.length
        } catch (e) {}
    }
    if (['map', 'set'].some(i=>is(value, i))) return !value.size
    if (isPrototype(value)) return !Object.keys(value).length
    const hasOwnProperty = Object.prototype.hasOwnProperty
    for (const key in value) {
        if (hasOwnProperty.call(value, key)) return false
    }
}