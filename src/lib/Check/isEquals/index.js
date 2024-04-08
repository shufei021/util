const isEquals = function(a, b, checked = new Set()) {
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
        if (Array.isArray(a) && Array.isArray(b) || Object.prototype.toString.call(a) === '[object Object]' && Object.prototype.toString.call(b) === '[object Object]') {
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
export default isEquals;