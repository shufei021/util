import rounded from "./rounded"
/**
 * @description  字符串超小数相减
 * @param {String} a 
 * @param {String} b 
 * @returns String
 */

 export default  function subtractDecimalNumber(a, b,dight) {
    /** 
     * 一律转换成8位小数字符串
     */
    a = Number(a).toFixed(8)
    b = Number(b).toFixed(8)

    /** 
     * 解构整数 小数
    */
    const [ a_int, a_decimal ] = a.split('.')
    const [ b_int, b_decimal ] = b.split('.')
    // 小数部分绝对值
    const decimal_diff = Math.abs(Number(a_decimal.replace(/^0+/,'')) - Number(b_decimal.replace(/^0+/,'')))
    // 整数部分绝对值
    const int_diff = Math.abs(Number(a_int) - Number(b_int))
    // 结果是否返回正数
    const is = Number(a) >= Number(b)
    // 小数部分相减是否是正数( >=0 )
    const decimal_is = Number(a_decimal.replace(/^0+/,'')) >=  Number(b_decimal.replace(/^0+/,''))

    if(is){//结果返回正数
        // 两种情况
        if(decimal_is){// >=
            // 小数前面补0，然后去除后面的连续0
            const decimal = String(decimal_diff).padStart(8,0).replace(/0+$/,'')
            const r = int_diff + (decimal ? '.' + decimal : '')
            return rounded(r,dight)
        }else{// 向整数借1
            const decimal = String(Number('1'+a_decimal) - Number(b_decimal)).padStart(8,0)
            const int = int_diff - 1
            const r = int + (decimal.length ? '.' + String(decimal).replace(/0+$/,''): '')
            return rounded(r,dight)
        }
    }else{// 负数
        return  rounded( '-'+subtractDecimalNumber(b,a), dight)
    }
}

