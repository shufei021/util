
/**
 * @description: 数据类型 的获取与判断
 * @param {*} value : 传入的值
 * @param {*} type : 传入的值类型
 */
const type = function getType(value, type) {
    const t = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
    return type? type === t : t
}
export default type

/**
 * 
 * 

type("test"); // "string"
type(20220314); // "number"
type(true); // "boolean"
type([], "array"); // true
type({}, "array"); // false

 * 
 * 
 * 
 * 
 */