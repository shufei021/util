/**
 * @description: 查询满足条件的所有索引 - findIndexs
 * @param {*} arr 
 * @param {*} cb 
 * @returns 
 */
export const findIndexs:Function = function (arr:any[], cb:Function) {
    const ret:number[] = []
    for (let i:number = 0; i < arr.length; i++) {
        if (cb(arr[i])) {
            ret.push(i)
        }
    }
    return ret
}