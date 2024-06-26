
import { calc } from './calc'

// 乘法
export const mul:Function = function (a:number | string, b:number | string, digit?: number): number | string{
    if(Array.isArray(a) && a.length){
        return a.reduce((p:number | string, c:number | string) => mul(p, c, digit), 1)
    } else {
        return calc(2, a, b, digit)
    }
}