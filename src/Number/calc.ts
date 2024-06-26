import { round } from './round'

/**
 * 计算方法 calc
 * @param { number } type ：0 加  1 减 2 乘 3 除
 * @param { String | Number } a ：计算数a
 * @param { String | Number } b ：计算数b
 * @param { Number } digit  ：结果保留的位数
 * @return Number | String
 */
export const calc:Function = function (type:number, a:number, b:number, digit?:number):number | string{
    if(a === undefined || b === undefined) throw new Error('The parameter are required !')
    // 获取 a 和 b 的小数位数
    const aLen:number = a.toString().split('.')[1]?.length || 0;
    const bLen:number = b.toString().split('.')[1]?.length || 0;
    // 计算最大位数，用于保留计算结果的精度
    const maxLen:number = Math.pow(10, Math.max(aLen, bLen));
    // 检查计算类型是否合法
    if (![0, 1, 2, 3].includes(type)) throw new Error('type参数错误');
    // 根据计算类型进行相应的运算
    const result = type === 0 ? 
                    (a * maxLen + b * maxLen) / maxLen : type === 1 ? 
                    (a * maxLen - b * maxLen) / maxLen : type === 2 ?  
                    (a * maxLen * b * maxLen) / (maxLen * maxLen) : 
                    (a * maxLen) / (b * maxLen);
    // 调用四舍五入函数对结果进行精度控制
    return round(result, digit);
}