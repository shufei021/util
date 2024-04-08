/**
 * bfs 函数用于实现广度优先搜索算法遍历数据结构，并根据提供的回调函数执行相应的操作
 * @param {Object|Array} data - 要遍历的数据结构，可以是对象或数组
 * @param {Function} cb - 回调函数，用于处理每个节点的操作
 */
const  bfs = function(data, cb) {
    // 将数据转换为数组形式，便于进行广度优先搜索
    const list = Array.isArray(data) ? [...data] : [data];
    // 获取子节点的别名，默认为 "children"
    const aliasChildren = cb.children || "children";

    // 使用 while 循环实现广度优先搜索
    while (list.length) {
        const item = list.shift(); // 取出队列中的第一个节点

        // 如果回调函数中定义了 cb 属性，则执行 cb.cb 方法；否则执行 cb 方法
        cb.cb ? cb.cb(item, bfs) : cb ? cb(item, bfs) : null;

        // 判断当前节点是否存在子节点，存在则将子节点加入到队列中
        item &&
            item[aliasChildren] &&
            item[aliasChildren].length &&
            item[aliasChildren].forEach((child) => list.push(child));
    }
}
export default bfs