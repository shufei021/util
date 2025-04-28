
import { calc } from './calc'
// 除法
export const div:Function = function (a: number | string | any[], b: number | string, digit?:number):number | string {
    if(a === 0 || a === '0') return 0
    if(b === 0 || b === '0') throw new Error('除数不能为0')
    if(Array.isArray(a) && a.length >= 2 && a.every((i:number | string)=> Number(i) > 0)){
        let result: number | string = a[0]
        for(let i = 1; i < a.length; i++){
            result = div(result, a[i], digit)
        }
        return result
    } else if(!Array.isArray(a) && a && b){
        return calc(3, a, b, digit)
    } else{
        throw new Error('The first two parameters are required')
    }
}

