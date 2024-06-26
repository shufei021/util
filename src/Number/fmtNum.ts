import { round } from './round'
/**
 * 数字格式化
 * @param { String | Number } val : 有效数数字
 * @param { Boolean } isThousands : 整数部分是否进行千分位,默认值 false
 * @param { Number } digit : 小数部分四舍五入保留到的位数
 * @param { Boolean } isCalc : 计算结果是否 数字化
 */
export const fmtNum = function (val:any, isThousands?:boolean, digit?:number, isCalc?:boolean) {

    // 无效值处理，，不符合传入规则的值一律返回空字符串
    if (val === undefined || val == null) return ''

    // 无论数字还是字符串数字，最终都转换成字符串数字
    let str = round(val, digit) + ''

    // 进行检测str是否是有效的数字,不是有效直接返回空字符串,不包含科学计数法
    if (!/^[+-]?\d+(\.\d+)?$/.test(String(str))) return ''

    // 如果结果需要数字化，直接返回数字化
    if(isCalc) return Number(str)

    // 如果不需要千分位处理
    if(!isThousands) return str

    // 如果需要千分位
    const [ int, dot='' ] = str.split('.')

    // 整数部分千分位处理
    return  int.replace(/(?=(?!\b)(\d{3})+$)/g, ',') + (dot ? '.'+ dot : dot)
}