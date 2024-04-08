import isEquals from '../../common/isEquals';
import unique from '../../Array/unique'
/**
 * @description: 数组内是否有重复值
 * @param {Array} arr: 被检测的数组
 * @return Boolean
 */
const isRepeat = function (arr, isGetData) {
    let len = arr.length
    try {
        for (let i = 0; i < len; i++) {
            for (let k = i + 1; k < len; k++) {
                if (isEquals(arr[i], arr[k])) {
                    return isGetData ? { repeatIndex: i, repeatItem:arr[i], isRepeat:true }  : true
                }
            }
        }
        return isGetData ? { repeatIndex: -1, repeatItem: null, isRepeat: false } : false
    } catch (e) {
        return isGetData ? { repeatIndex: -1, repeatItem: null, isRepeat: len !== unique(arr).length } : len !== unique(arr).length
    }
}
export default isRepeat

/**
 *
 * 示例：
 *
 * let a1 = [
 *   { id: 1, name: '张三', age: 20 },
 *   { id: 1, name: '李四', age: 20 },
 *   { id: 3, name: '小明', age: 23 },
 *    { id: 2, name: '大卫', age: 21 },
 *   1,
 *   3,
 *   2,
 *   { 0: 1, 1: 2, 2: 3 },
 *   [1, 2, 3]
 * ]
 * isHasRepeat(a1) // false
 * let a2 = [
 *   { id: 1, name: '张三', age: 20 },
 *   { id: 1, name: '张三', age: 20 },
 *   { id: 1, name: '李四', age: 20 },
 *   { id: 3, name: '小明', age: 23 },
 *   { id: 2, name: '大卫', age: 21 },
 *   1,
 *   3,
 *   2,
 *   { 0: 1, 1: 2, 2: 3 },
 *   [1, 2, 3]
 * ]
 * isHasRepeat(a2) // true
 *
 *
 *
 *
 */
