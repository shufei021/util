

import calc from '../calc'

// 除法
const divide = function (a, b, digit) {
    // 如果 a 是数组，则递归处理多个数的除法
    return Array.isArray(a) ? 
        (a.length >= 2 ? a.reduce((p, c) => divide(p, c, b)) : '') : 
        !a || !b ? 0 : calc(3, a, b, digit);
}

