
type O = {[key: string]:any}

interface Opt {
    isEmptyZero?: boolean
    isEmptyObject?: boolean
    isEmptyArray?: boolean
    isNull?: boolean
    isEmptyString?: boolean
    isFalse?: boolean
}
export const attrFilter: Function = function (o: O, opt: Opt = {}): object {
    return Object.keys(o).reduce((p:O, c:string) => {
        // 排除零
        if (opt.isEmptyZero && o[c] === 0)return p

        // 排除空对象
        if (opt.isEmptyObject && Object.prototype.toString.call(o[c]) === '[object Object]' && !Object.keys(o[c]).length) return p

        // 排除空数组
        if (opt.isEmptyArray && Array.isArray(o[c]) && !o[c].length) return p

        // 排除 null
        if (opt.isNull && o[c] === null) return p

        // 默认排除空字符串
        if (opt.isEmptyString&& o[c] === '' ) return p
        
        // 排除 false
        if(opt.isFalse === true && o[c] === false)return p

        p[c] = o[c]

        return p
    }, {})
  }