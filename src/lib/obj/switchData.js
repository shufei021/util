/*
 * @Author: 舒飞 1017981699@qq.com
 * @Date: 2023-08-28 09:19:14
 * @LastEditors: 舒飞 1017981699@qq.com
 * @LastEditTime: 2023-08-30 13:53:55
 * @FilePath: \zztx_utils\src\lib\obj\switchData.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @description 数据类型互转
 * @param {Object} param0 data 需要转换的数据源
 * @param {Object} param1 sortAlias 排序别名 默认 index
 * @param {Object} param2 typeAlias 默认 type 
 * @param {Object} param3 switchType 默认 object
 * @returns 
 */
export default function switchData({data = null, sortAlias = 'index', typeAlias = 'type', switchType = 'object', cb = null, mapValueName = '', types = [] }){
    if(!data) return
    if(Array.isArray(data) || switchType === 'array'){ // 数组 转 对象
        return data.filter(i=> !types.length || (types.length && types.includes(i[typeAlias]*1))).reduce((p,c)=>{
            p[c[typeAlias]] = typeof cb ==="function" ? cb(c) : mapValueName ? c[mapValueName] : c
            return p
        },{})
    } else { // 对象 转 数组
        return Object.keys(data).filter(i=> !types.length || (types.length && types.includes(i*1))).reduce((p,c)=>{
            const val = {...data[c],[typeAlias]:c*1}
            p[data[c][sortAlias]] = typeof cb ==="function" ? cb(val) : val
            return p
        },[]).filter(Boolean)
    }
}
/**
 * 应用场景：
 * 前端存入很多静态映射对象枚举，类似
 * const 
 */