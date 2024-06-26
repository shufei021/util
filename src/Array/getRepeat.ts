/**
 * @description 获取json数组中的所有重复项和非重复项
 * @param { Array } arr 
 * @returns Object
 */
interface GetRepeat {
    repeatArr: any[],
    notRepeatArr: any[],
    countMap: {[key:string]: any}
}
export function getRepeat(arr:any[]=[]):GetRepeat {
    return arr.reduce((prve, cur, i, a) => {
        cur = Object.keys(cur).sort().reduce((p:{[key:string]:any}, c:string) => (p[c] = cur[c], p), {})
        const k = JSON.stringify(cur)
        prve.countMap[k] ? prve.countMap[k]++ : (prve.countMap[k] = 1)
        if (i === a.length - 1) {
            Object.keys(prve.countMap).forEach(key => prve[prve.countMap[key] > 1 ? 'repeatArr' : 'notRepeatArr'].push(JSON.parse(key)))
            delete prve.countMap
        }
        return prve
    }, {
        repeatArr: [],
        notRepeatArr: [],
        countMap: {}
    })
}