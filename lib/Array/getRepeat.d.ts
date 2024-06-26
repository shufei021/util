/**
 * @description 获取json数组中的所有重复项和非重复项
 * @param { Array } arr
 * @returns Object
 */
interface GetRepeat {
    repeatArr: any[];
    notRepeatArr: any[];
    countMap: {
        [key: string]: any;
    };
}
export declare function getRepeat(arr?: any[]): GetRepeat;
export {};
