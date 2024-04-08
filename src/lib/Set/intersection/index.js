const intersection = function(arr1, arr2, key) {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
        throw new Error('传入的参数都必须为数组类型');
    }
    if(key){
        return arr1.filter(item1 => arr2.some(item2 => item1[key] === item2[key]));
    } else {
        return arr1.filter(item => arr2.includes(item));
    }
}
export default intersection;