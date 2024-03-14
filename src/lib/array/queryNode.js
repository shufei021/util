/*
 * @Description: 查询树节点
 * @Author: shufei
 * @Date: 2021-08-17 21:01:51
 * @LastEditTime: 2021-08-17 21:02:39
 * @LastEditors: shufei
 */

const queryNode = function(list, id, idKey = 'id',children='children'){
    let item = null
    let fn = function(list,id){
      for(let i=0;i<list.length;i++){
          if(list[i][idKey] === id){
              item = list[i]
              break
          }
          if(list[i][children] && list[i][children].length){
              fn(list[i][children],id)
          }
      } 
    }
    fn(list,id)
    return item 
}
export default queryNode
