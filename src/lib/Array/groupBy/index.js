/**
 * 对数组进行分组，分组依据是数组中对象的某个属性
 * @param {Array} arr - 要分组的数组
 * @param {String} key - 属性名，用于分组
 * @returns {Array} - 分组后的数组
 */
const groupBy = function(groups, key) {
    // 使用 reduce 方法对数组进行分组
    return groups.reduce((acc, item, idx, a) => {
        // 检查是否已存在当前属性值的分组，若存在则将当前对象添加到该分组中，否则创建新分组
        if (acc[item[key]]) {
            acc[item[key]].push(item);
        } else {
            acc[item[key]] = [item];
        }
        // 如果已遍历到数组末尾，则将分组结果转换为数组形式返回
        if (idx === a.length - 1) return Object.values(acc);
        return acc;
    }, {});
}
export default groupBy;