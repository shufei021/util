/**
 * 参数格式化
 * @param {Object} o 参数对象
 * @param {Object} opt 选项对象
 * @param {Boolean} opt.isNull 是否排除 null，默认为 false
 * @param {Boolean} opt.isEmptyArray 是否排除空数组，默认为 false
 * @param {Boolean} opt.isEmptyObject 是否排除空对象，默认为 false
 * @param {Boolean} opt.isEmptyZero 是否排除零，默认为 false
 * @param {Boolean} opt.isEmptyString 是否排除空字符串，默认为 true
 * @returns {Object} 格式化后的参数对象
 */
const paramFormat = function (o, opt = {}) {
    return Object.keys(o).reduce((p, c) => {
      if (opt.isEmptyZero) { // 排除零
        if (o[c] === 0) return p
      }
  
      if (opt.isEmptyObject) { // 排除空对象
        if (Object.prototype.toString.call(o[c]) === '[object Object]' && !Object.keys(o[c]).length) return p
      }
  
      if (opt.isEmptyArray) { // 排除空数组
        if (Array.isArray(o[c]) && !o[c].length) return p
      }
  
      if (opt.isNull) { // 排除 null
        if (o[c] === null) return p
      }
  
      if (opt.isEmptyString === undefined || opt.isEmptyString === true) { // 默认排除空字符串
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