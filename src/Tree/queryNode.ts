import { deepClone } from '../Object/deepClone';
/**
 * @description: 查询树节点
 * @param { Object | Array } tree:树
 * @param { String } id：id
 * @param { String } opt.idAlias：id别名
 * @param { String } opt.children：children：别名
 * @return { Object | undefined }
 */

interface queryNodeProps {
    idAlias?: string;
    childrenAlias?: string;
}
export function queryNode(
    tree: object | Array<any>,
    id: string,
    { idAlias = 'id', childrenAlias = 'children' }: queryNodeProps
): object | undefined {
    tree = deepClone(tree);
    const q = Array.isArray(tree) ? tree : [tree];
    while (q.length) {
        const top = q.shift();
        if (top[idAlias] === id) return top;
        top?.[childrenAlias]?.forEach((child: any) => q.push(child));
    }
}
