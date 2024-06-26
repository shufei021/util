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
export declare function queryNode(tree: object | Array<any>, id: string, { idAlias, childrenAlias }: queryNodeProps): object | undefined;
export {};
