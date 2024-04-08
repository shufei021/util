import calc from './calc'


// 加法
const add = function (a, b, digit) {
    // 如果 a 是数组，则递归处理多个数的加法
    return Array.isArray(a) ? 
        (a.length ? a.reduce((p, c) => add(p, c, b), 0) : 0) : 
        calc(0, a, b, digit);
}

export default add;