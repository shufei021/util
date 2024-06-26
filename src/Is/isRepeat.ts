import { isEqual } from './isEqual';
import { unique } from '../Array/unique';
/**
 * @description: 数组内是否有重复值
 * @param {Array} arr: 被检测的数组
 * @param {Boolean} isGetData: 是否对象形式返回结果
 * @return Boolean | Object
 */
export const isRepeat:Function = function (arr:any[], isGetData?:boolean) {
  const len = arr.length;
  if (len === 0 || len === 1) return isGetData ? { repeatIndex: -1, repeatItem: null, isRepeat: false } : false;
  try {
    for (let i = 0; i < len; i++) {
      for (let k = i + 1; k < len; k++) {
        if (isEqual(arr[i], arr[k])) {
          return isGetData
            ? { repeatIndex: i, repeatItem: arr[i], isRepeat: true }
            : true;
        }
      }
    }
    return isGetData
      ? { repeatIndex: -1, repeatItem: null, isRepeat: false }
      : false;
  } catch (e) {
    return isGetData
      ? {
          repeatIndex: -1,
          repeatItem: null,
          isRepeat: len !== unique(arr).length,
        }
      : len !== unique(arr).length;
  }
};
