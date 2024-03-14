/*
 * @Author: shufei 1017981699@qq.com
 * @Date: 2022-04-12 09:01:20
 * @LastEditors: shufei 1017981699@qq.com
 * @LastEditTime: 2022-05-17 13:36:43
 * @FilePath: \util\src\lib\extend\bfs.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description 广度遍历 (bfs)
 * @param {Object | Array} data : 树节点 或 children 数组
 * @param {Function | Object} cb : 每个节点的回调函数 或 一个对象（包含children的别名 children 属性和 每项回调函数cb属性）
 */

export default function bfs(data, cb) {
    const list = Array.isArray(data) ? [...data] : [data];
    const aliasChidren = cb.children || "children";
    while (list.length) {
        const item = list.shift();
        cb.cb ? cb.cb(item,bfs) : cb ? cb(item,bfs) : null;
        item &&
            item[aliasChidren] &&
            item[aliasChidren].length &&
            item[aliasChidren].forEach((child) => list.push(child));
    }
}

/**
 *
 * bfs(list,cb(item){})
 * bfs(list,{chidlren:'child',cb(item){}})
 *
 * bfs(root,cb(item){})
 * bfs(root,{chidlren:'child',cb(item){}})
 *
 *
 *
 */
