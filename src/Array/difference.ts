/**
 * @description 计算两个数组的差集 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @param {string} key - 对象属性的键名（可选）
 * @returns {Array} 差集数组
 */
export function difference(arr1: any[], arr2: any[], key?: string): Array<any> {
    if (key) {
        return arr1.filter((item1: any) => !arr2.some((item2: any) => item1[key] === item2[key]));
    } else {
        return arr1.filter((item: any) => !arr2.includes(item));
    }
}