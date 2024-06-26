
/**
 * @description 计算两个数组的并集 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @param {string} key - 对象属性的键名（可选）
 * @returns {Array} 并集数组
 */
export function union(arr1: any[], arr2: any[], key: string): Array<any> {
  if (key) {
    return [
      ...arr1,
      ...arr2.filter((item2: any) => arr1.find((item1: any) => item1[key] !== item2[key])),
    ];
  } else {
    return Array.from(new Set([...arr1, ...arr2]));
  }
}
