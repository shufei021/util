/**
 * @description 获取json数组中的所有重复项和非重复项
 * @param { Array } arr 
 * @returns Object
 */
export default function getRepeat(arr=[]) {
    return arr.reduce((prve, cur, i, a) => {
        cur = Object.keys(cur).sort().reduce((p, c) => (p[c] = cur[c], p), {})
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

/**
 * 
 * 
 * let a2 = [
    { id: 1, name: '张三', age: 20 },
    { id: 1, age: 20, name: '张三' },
    { id: 1, name: '李四', age: 20 },
    { id: 3, name: '小明', age: 23 },
    { id: 3, name: '小明', age: 23 },
    { id: 2, name: '大卫', age: 21 },
    { id: 22, name: '大卫1', age: 22 },
]
getRepeat(a2)
{repeatArr: Array(2), notRepeatArr: Array(3)}
 * 
 * 
 * 
 * 
 * 
 */