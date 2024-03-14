/*
 * @Author: shufei 1017981699@qq.com
 * @Date: 2022-12-05 17:15:44
 * @LastEditors: shufei 1017981699@qq.com
 * @LastEditTime: 2022-12-05 17:19:49
 * @FilePath: \zztx_utils\src\lib\obj\paramFormat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 参数格式化
 * @param {Object} o 参数对象
 * @param {Boolean} isNull 是否排除 null
 * @param {Boolean} isEmptyArray 是否排除 空数组
 * @param {Boolean} isEmptyObject 是否排除 空对象
 * @param {Boolean} isEmptyZero 是否排除 零
 * @param {Boolean} isEmptyString 是否排除 空字符串，默认是排除
 */
const paramFormat = function (o, opt = {}) {
    return Object.keys(o).reduce((p, c) => {
      if (opt.isEmptyZero) { // 排除 零
        if (o[c] === 0) return p
      }
  
      if (opt.isEmptyObject) { // 排除 空对象
        if (Object.prototype.toString.call(o[c]) === '[object Object]' && !Object.keys(o[c]).length) return p
      }
  
      if (opt.isEmptyArray) { // 排除 空数组
        if (Array.isArray(o[c]) && !o[c].length) return p
      }
  
      if (opt.isNull) { // 排除 null
        if (o[c] === null) return p
      }
  
      if (opt.isEmptyString === undefined || opt.isEmptyString === true) { // 默认排除 ''
        if (o[c] === '') return p
      }
  
      p[c] = o[c]
  
      return p
    }, {})
  }
  export default paramFormat


  /**
   * 
   * paramFormat( {a:1, b:0, c:null, d:99, e:[], f:{}},{isEmptyZero:true,isEmptyObject:true,isEmptyArray:true,isNull:true })
   * // { a: 1, d: 99 }
   * 
   * 
   * 
   */