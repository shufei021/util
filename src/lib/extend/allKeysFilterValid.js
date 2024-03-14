// 判断目标对象为object||array
export const isObj = (target) => {
    return !!target && typeof target === 'object'
  }
  
  /**
   * 遍历对象所有key的值，将"非法值"替换为"合法值"
   * @param {Object} obj 需要遍历的对象
   * @param {Array} invalids 自定义“非法值”
   * @param {Array} val 自定义“合法值”
   */
  export default function allKeysFilterValid(target, invalids = [null, undefined], opt= { isSwitch: false}){
    if(Array.isArray(target)){
        return target.map(item => allKeysFilterValid(item, invalids, opt))
    } else {
        if (!isObj(target)) {
          return target
        }
        for (const k in target) {
          if (isObj(target[k])) {
            target[k] = allKeysFilterValid(target[k])
          } else if (invalids.includes(target[k])) {
            if(opt.isSwitch){
                target[k] = opt.valid || ''
            } else {
                delete target[k]
            }
          }
        }
        return target
    }
}
