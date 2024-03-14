/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2023-08-28 17:23:09
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-08-28 17:51:20
 * @FilePath: \zztx_utils\src\lib\obj\$$.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * @description 
 * @param {*} target 
 * @param {*} cb 
 * @returns 转换
 */
export default function $$(target, defaultVal, cb){
    if(Array.isArray(target) && typeof cb === 'function'){
        target = target.find(i=>cb(i)) || {}
    }
    return new Proxy(target, {
        get: (target, propKey) => {
            const proKeyArr = propKey.split('.')
            return proKeyArr.reduce((a, b) => a?.[b] || defaultVal, target)
        }
    })
}