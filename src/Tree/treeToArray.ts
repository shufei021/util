/**
 * @description: 树扁平化方法
 * @param { Array<object> } list
 * @param { String } children: 别名，默认 'children'
 * @return { Array<object> }
 */

type Item = { [key: string]: any };

export function treeToArray(
    list: Array<object>,
    childrenAlias: string = 'children'
): Array<object> {
    return (Array.isArray(list) ? list : [list]).reduce(
        (arr: Array<object>, item: Item) => [
            ...arr,
            item,
            ...treeToArray(item[childrenAlias] || [], childrenAlias),
        ],
        []
    );
}
