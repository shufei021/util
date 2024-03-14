/*
 * @Author: shufei 1017981699@qq.com
 * @Date: 2022-12-05 17:07:56
 * @LastEditors: shufei 1017981699@qq.com
 * @LastEditTime: 2022-12-05 17:09:54
 * @FilePath: \zztx_utils\src\lib\obj\pluckDeep.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const pluckDeep = key => obj => {
    try {
       return key.split('.').reduce((accum, key) => accum[key], obj)
    } catch (e) {}
}

export default pluckDeep

/**
 * 
 * pluckDeep('a.b.c')({a:{b:{c:1}}}) // 1
 * pluckDeep('a.b')({a:{b:{c:1}}}) // {c:1}
 * pluckDeep('a')({a:{b:{c:1}}}) // {a:{b:{c:1}}}
 * 
 * 
 */