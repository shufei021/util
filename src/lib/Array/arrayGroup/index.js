/**  
 * @description: 数组按标识进行分组 （分组后顺序不变）  
 * @param {Array} list：分组的数组  
 * @param {String} typeStr：分组的标识  
 * @return {Array}  
 */  
const arrayGroup = function(list, typeStr) {  
    if (list.length === 0) return []; // 如果数组为空，返回空数组  
    const ret = [];  
    let startIndex = 0;  
    for (let i = 1, len = list.length; i < len; i++) {  
        const pre = list[i - 1];  
        const cur = list[i];  
        if (pre[typeStr] !== cur[typeStr]) {  
            ret.push(list.slice(startIndex, i));  
            startIndex = i;  
        }  
    }  
    // 添加最后一个分组（如果有剩余元素）  
    ret.push(list.slice(startIndex));  
    return ret;  
};  
  
export default arrayGroup