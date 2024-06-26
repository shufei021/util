
import {deepClone} from '../Object/deepClone'
/**
 * @description: 根据条件删除数组中的值
 * @param {Array} arr：被操作的数组
 * @param {Function | any[] | {[key:string]:any}} o：条件
 * @param {Boolean} isChangeOldArr：是否改变原数组
 * @return {Array} 返回处理后的数组
 */
export const delBy:Function = function (arr:any[], o:Function | any[] | {[key:string]:any}, isChangeOldArr:boolean = false): Array<any> {
    // 检查参数类型  
    if (!Array.isArray(arr)) {  
        throw new Error('First argument must be an array.');  
    }  
    if (typeof o !== 'function' && !Array.isArray(o) && (typeof o !== 'object' || o === null)) {  
        throw new Error('Second argument must be a function, array, or object.');  
    }  
    if (typeof isChangeOldArr !== 'boolean') {  
        throw new Error('Third argument must be a boolean.');  
    }  
    const a:any[] = isChangeOldArr ? arr : deepClone(arr)
    for (let i = a.length - 1; i >= 0; i--) {
        if (typeof o === 'function') {
            o(a[i]) && a.splice(i, 1)
        } else if (Array.isArray(o)) {
            o.indexOf(a[i]) > -1 && a.splice(i, 1)
        } else if (a[i] === o) {
            a.splice(i, 1)
        } else if (Object.prototype.toString.call(o).slice(8, -1) === 'Object') {
            let item = a[i]
            for (let k in o) {
                Array.isArray(o[k]) ? o[k].indexOf(item[k]) > -1 && a.splice(i, 1) : o[k] === item[k] && a.splice(i, 1)
            }
        }
    }
    return a
}