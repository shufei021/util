import { deepClone } from "../Object/deepClone"
/**
 * @description: 数组状态还原
 * @param { Array } list: 有两值交换后的数组
 * @param { Number } oldIndex: 交换项索引
 * @param { Number } newIndex：被交换项索引
 * @param { Boolean } isDeep：是否给改变原数组
 */
export const arrayRestore = function (list:any[], oldIndex:number, newIndex:number,isDeep:boolean = false) {
    if(!isDeep) list = deepClone(list)
    list.splice(oldIndex, 0, list.splice(newIndex, 1)[0])
    return list
}
