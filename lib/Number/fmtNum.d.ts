/**
 * 数字格式化
 * @param { String | Number } val : 有效数数字
 * @param { Boolean } isThousands : 整数部分是否进行千分位,默认值 false
 * @param { Number } digit : 小数部分四舍五入保留到的位数
 * @param { Boolean } isCalc : 计算结果是否 数字化
 */
export declare const fmtNum: (val: any, isThousands?: boolean, digit?: number, isCalc?: boolean) => string | number;
