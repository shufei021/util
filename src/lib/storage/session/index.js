class Session {
    constructor() { }
    set(...args) {
        if(Object.prototype.toString.call(args[0])) { // 设置多个值
           for(let key in args[0]) {
               sessionStorage.setItem(key, JSON.stringify(args[0][key]))
           }
        }else if(args.length >= 2) { // 设置单个值
            sessionStorage.setItem(args[0], JSON.stringify(args[1]))
        } else {
            console.error("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.")
        }   
    }
    get(k) {
       if(Array.isArray(k)) {
           k = k.filter(i=> Object.prototype.hasOwnProperty.call(sessionStorage, i))
           return k.reduce((p, c) => {
               let value = sessionStorage.getItem(c)
               try {
                value = JSON.parse(value)
               } catch (e) { }
               p[c] = value
               return p
           },{})
       } else {
            try {
                return JSON.parse(sessionStorage.getItem(k))
            } catch (e) {
                return sessionStorage.getItem(k)
            }
        }
    }
    del (k) {
        sessionStorage.removeItem(k)
    }
    clear() {
        sessionStorage.clear()
    }
}

export default new Session()