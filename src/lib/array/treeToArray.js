/*
 * @Description: tree to array 树扁平化
 * @Author: shufei
 * @Date: 2021-08-17 20:30:54
 * @LastEditTime: 2021-10-22 18:55:46
 * @LastEditors: Please set LastEditors
 */

/**
 * @description: 树扁平化方法
 * @param { Array } list
 * @param { String } children
 */
const treeToArray = function(list,children='children') {
    return (Array.isArray(list)?list:[list]).reduce((arr, item) =>[...arr,...[item], ...treeToArray(item[children] || []) ],[])
}
export default treeToArray

/**
另外一种
const treeFlat = function (arr,children="children",isDelChildren=false){
  let ret = []
  let fn = function(list){
      for(let i=0; i<list.length; i++){
          ret.push(list[i])
          list[i][children] && 
          list[i][children].length && 
          fn(list[i][children])
          isDelChildren && delete list[i][children]
      }  
  }
  fn(Array.isArray(arr)?arr:[arr])
  return ret
}

*/