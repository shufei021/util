
import calc from '../calc'

// 乘法
const mul = function (a, b, digit) {
    // 如果 a 是数组，则递归处理多个数的乘法
    return Array.isArray(a) ? 
        (a.length ? a.reduce((p, c) => mul(p, c, b), 1) : 0) : 
        calc(2, a, b, digit);
}

export default mul;