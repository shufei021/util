/*
 * @Author: your name
 * @Date: 2021-09-28 10:44:21
 * @LastEditTime: 2022-02-22 10:28:32
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \util\src\lib\dom\bottomVisible.js
 */
/**
 * @description: 底部是否可见
 * @return {Boolean}
 */
const bottomVisible = function () {
    return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
}
export default bottomVisible

