/**
 * @description: json数组项筛选指定键值留下，其余键值去掉
 * @param {Array} arr 
 * @param {Array} keys 键数组
 */
export function pick(arr:Array<{[key:string]:string}>, keys: string[]) {
    return arr.reduce((p:any[], c:{[key:string]:string}) => [...p, keys.reduce((p1:{}, c1:string) => ({ ...p1, [c1]: c[c1] }), {})], [])
}