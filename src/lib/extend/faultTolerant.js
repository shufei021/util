/*
 * @Author: your name
 * @Date: 2021-10-12 14:22:39
 * @LastEditTime: 2021-10-12 14:25:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \util\src\lib\extend\try.js
 */
export default function faultTolerant(success, fail) {
  try {
    success && success()
  } catch (e) {
    fail && fail(e)
  }
}