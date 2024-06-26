/**  
 * 去除数组中的重复项。  
 * 如果提供了第二个参数k，则根据对象的k属性值进行去重。  
 *  
 * @param {Array} a - 需要去重的数组。  
 * @param {string} [k] - 对象数组中去重的属性名。  
 * @returns {Array} - 去重后的数组。  
 * @throws {Error} - 如果第一个参数不是数组，或第二个参数不是字符串且已提供。  
 */
export const unique: Function = function (a:any, k:any) {  
    if (!Array.isArray(a)) throw new Error('传入的第一个参数必须为数组类型');
    if (k !== undefined && typeof k !== 'string') throw new Error('传入的第二个参数必须为字符串类型'); 
    const seen = new Map();  
    return a.filter((item:any) => {  
        const hash = k? item[k] : JSON.stringify(item);  
        if (!seen.has(hash)) {  
            seen.set(hash, true);  
            return true;  
        }  
        return false;  
    });  
};