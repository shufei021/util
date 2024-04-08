/**
 * @description 组合过滤函数，适合N个按钮的显示隐藏组合
 * @param {Object} btnsMap 按钮全量显示与否函数的映射对象，键为对应按钮的标识，值为对应按钮标识的按钮是否显示的条件函数
 * @param {Object} param 传给条件函数的参数，主要是用于条件函数方便解构
 * @returns 返回需要显示按钮的标识数组
 */
export default function combinFliter (btnsMap = {}, param = {}) {
    return Object.keys(btnsMap).flatMap(k=> btnsMap[k](param) ? [k] :[])       
}