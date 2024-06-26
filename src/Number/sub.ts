import { calc } from './calc'
import { round } from './round'
// 减法
export const sub:Function = function (a:number | string, b:number | string, digit?:number):number | string {
    if(Array.isArray(a)){
        if(!a.length) return round(0, digit)
        let result:number | string = a[0]
        for(let i = 1; i < a.length; i++){
            result = sub(result, a[i], digit)
        }
        return result
    } else{
        return calc(1, a, b, digit)
    }
}