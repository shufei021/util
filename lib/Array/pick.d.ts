/**
 * @description: json数组项筛选指定键值留下，其余键值去掉
 * @param {Array} arr
 * @param {Array} keys 键数组
 */
export declare function pick(arr: Array<{
    [key: string]: string;
}>, keys: string[]): any[];
