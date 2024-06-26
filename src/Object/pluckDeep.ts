/**
 * pluckDeep 函数用于从对象中提取指定深度的属性值，并提供默认值
 * @param {string} key - 要提取的属性的路径，可以是多层嵌套的属性，用点号（.）分隔
 * @returns {Function} - 返回一个函数，该函数接受两个参数：目标对象和默认值，返回提取的属性值或默认值
 */
export const pluckDeep: Function = (key:string): Function => (obj:object, defaultVal:any) => {
    try {
       return key.split('.').reduce((accum:any, key:string) => accum?.[key], obj) || defaultVal;
    } catch (e) {
        return defaultVal;
    }
}

