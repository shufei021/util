/**
 * @description: 查找树节点路径
 * @param { Object | Array } tree 树
 * @param { Function } func：回调函数
 * @param { Array<string | number> } path：路径
 * @return { Array<string | number> }
 */
export function queryPath(
    tree: Array<any>, // 传入树数组
    func: Function, // 回调函数
    childrenAlias: string = 'children', //孩子字段别名
    path: Array<string | number> = [] // 内部使用的路径
): Array<string | number> {
    if (!tree) return [];
    tree = Array.isArray(tree) ? tree : [tree];
    for (const item of tree) {
        path.push(item);
        if (func(item)) return path;
        if (item[childrenAlias]?.length) {
            const paths = queryPath(
                item[childrenAlias],
                func,
                childrenAlias,
                path
            );
            if (paths.length) return paths;
        }
        path.pop();
    }
    return [];
}
