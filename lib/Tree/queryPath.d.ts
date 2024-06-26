/**
 * @description: 查找树节点路径
 * @param { Object | Array } tree 树
 * @param { Function } func：回调函数
 * @param { Array<string | number> } path：路径
 * @return { Array<string | number> }
 */
export declare function queryPath(tree: Array<any>, // 传入树数组
func: Function, // 回调函数
childrenAlias?: string, //孩子字段别名
path?: Array<string | number>): Array<string | number>;
