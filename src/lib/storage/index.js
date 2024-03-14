class Storage {
    constructor(){
        this._p = JSON.parse
        this._s = JSON.stringify
        this._set = localStorage.setItem.bind(localStorage)
        this._get = localStorage.getItem.bind(localStorage)
        this._del =localStorage.removeItem.bind(localStorage)
    }
    _parse(k){
        return this._p(this._get(k))
    }
    isObject(v){
        return Object.prototype.toString.call(v).slice(8,-1).toLowerCase() === 'object'
    }
    HAS(p,o=localStorage){
        return Object.prototype.hasOwnProperty.call(o,p)
    }
    _e(k, v, t) {
        this._set(
            k,
            this._s({
                startTime: +new Date(), //创建并存入时间戳
                expiredTime: t, //过期时间
                value: v,
                STOREFLAG:true
            })
        )
    }
    set(...args){
        const len = args.length
        if(len){
            const [a,b,c] = args
            if(this.isObject(a)){
                if(Object.keys(a).length) {
                    for(const k in a){
                        len>=2 && b!==undefined ? this._e(k,a[k],b) : this.set(k,a[k])
                    }
                } 
            }else{
                if(len===1)return
                len>=3 && c!==undefined ?
                this._e(a,b,c) : 
                this._set(a, this.isObject(b) || Array.isArray(b)? this._s(b) : b)
            }
        }
    }
    get(...args){
        if(!args.length)return
        // 参数长度
        const len = args.length
        // 参数
        const [a,b] = args
        // 第二个参数是否是数组
        const a_is_array = Array.isArray(a)
        // 第二个参数是否是对象
        const b_is_object = this.isObject(b)
        // 第二个参数是否是对象只有 default 属性配置
        const b_has_default = b_is_object && this.HAS('default',b)
        // 第二个参数是否是对象有 expired 属性配置
        const b_has_expired = b_is_object && this.HAS('expired',b)

        // 如果传入的第一个参数是数组
        if(a_is_array){
            // 如果传入第一个参数传入的是空数组就直接返回空对象
            if(!a.length) return len >= 2 ? b :  {}
            const ret = {}
            for(let i = 0; i < a.length; i++){
                const k = a[i]
                if(this.HAS(k)) ret[k] = this.get(k)
            }
            if(!Object.keys(ret).length){// ret = {}
                return len >= 2 && b_has_default ? 
                b.default :  
                len >= 2 && !b_is_object?
                b:
                {}
            }else{
                if(len >= 2 && b_has_expired){
                    return b.expired === true ? Object.keys(ret).reduce((p,c)=>{
                        const expiredVal = this.getExpired(c)
                        if(expiredVal) p[c] = this.isObject(ret[c]) && this.HAS('STOREFLAG',ret[c])?expiredVal:ret[c]
                        return p
                    },{}) : ret
                }else{
                    return ret
                }
            }
        } else {
            let ret = null
            const _p2 = this._get(a) 
            try {
                ret =  /^[+-]?\d+(\.\d+)?$/.test(_p2)? _p2: this._parse(a)// object
            } catch (e) {
                ret = _p2 // string , 'false' 'undefined'
            }
            if(len===1){// len = 1
                return this.isObject(ret) || Array(ret) ? ret : typeof ret === 'boolean'? ret : _p2
            }else {// len >=2
                if(b_is_object){
                    if(ret===null){
                        return b_has_default ? b.default : ret
                    }else {
                        return b_has_expired && b.expired === true && this.isObject(ret) && this.HAS('STOREFLAG',ret)?this.getExpired(a) : ret
                    }
                } else {
                    return ret===null? b : ret
                }
            }
        }
    }
    del(key) {
        if(typeof key === 'string') {
            this._del(key)
        }else if(Array.isArray(key)) {
            for (let i = 0, len = key.length; i < len; i++) {
                const k = key[i]
                if (typeof k === 'string') this._del(k)
            }
        }
    }

    clear(isClearExpired) {
        if(isClearExpired){
            const keys = Object.keys(localStorage)
            const len = keys.length
            for (let i = 0; i < len; i++) {
                this.getExpired(keys[i])
            }
        }else {
            localStorage.clear()
        }
    }

    getExpired(key){
        const o = this._parse(key)
        if(this.isObject(o) && this.HAS('STOREFLAG',o)) {
            // 如果大于就是过期了，如果小于或等于就还没过期
            if (new Date() - o.startTime > o.expiredTime) {
                this._del(key)
                return null
            }else{
                return o.value
            }
        }else{
            return null
        }
    }

    each(cb){
        let a = Object.keys(localStorage)
        for (let i = 0, len = a.length; i < len; i++) {
            const k = a[i]
            const v = this._parse(k)
            cb(k, v)
        }
    }
    once(k,d) {
        const ret = this._get(k,d)
        if(typeof k==='string' && this.HAS(k)){
            this._del(k)
        }else if(Array.isArray(k) && k.length){
            for(let i=0; i < k.length; i++){
                this.HAS(k[i]) && this._del(k[i])
            }
        }
        return ret
    }
}

export default new Storage()