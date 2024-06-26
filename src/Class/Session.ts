class Session {
    // 静态属性，用于引用sessionStorage对象  
    static storage = window.sessionStorage;
    set(...args: any[]) {
        if(Object.prototype.toString.call(args[0])) { // 设置多个值
           for(let key in args[0]) {
               Session.storage.setItem(key, JSON.stringify(args[0][key]))
           }
        }else if(args.length >= 2) { // 设置单个值
            Session.storage.setItem(args[0], JSON.stringify(args[1]))
        } else {
            console.error("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.")
        }   
    }
    get(k:string[] | string) {
       if(Array.isArray(k)) {
           k = k.filter(i=> Object.prototype.hasOwnProperty.call(Session.storage, i))
           return k.reduce((p:{[key:string]:any}, c:string) => {
               let value:any = Session.storage.getItem(c)
               try {
                value = JSON.parse(value)
               } catch (e) { }
               p[c] = value
               return p
           },{})
       } else {
            try {
                // @ts-ignore
                return JSON.parse(Session.storage.getItem(k))
            } catch (e) {
                return Session.storage.getItem(k)
            }
        }
    }
    del (k:string) {
        Session.storage.removeItem(k)
    }
    clear() {
        Session.storage.clear()
    }
}

export const session = new Session()