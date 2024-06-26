import { calc } from './calc'
import { round } from './round'
// 加法
export const add: Function = function (a: number | string | any[], b:number | string, digit?: number): number | string {
    if(Array.isArray(a)){
        if(!a.length) return round(0, digit)
        let result: number | string = 0;
        for(let i = 0; i < a.length; i++){
            result = add(result, a[i], digit);
        }
        return result
    }else{
        return calc(0, a, b, digit);
    }
}