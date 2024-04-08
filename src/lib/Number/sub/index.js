
import calc from '../calc'

// 减法
const sub = function (a, b, digit) {
    // 如果 a 是数组，则递归处理多个数的减法
    return Array.isArray(a) ? 
        (a.length ? a.reduce((p, c) => sub(p, c, b)) : 0) : 
        calc(1, a, b, digit);
}
export default sub