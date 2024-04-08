class Local {
    // 静态属性，用于引用localStorage对象
    static local = window.localStorage;

    // 静态方法，用于设置localStorage
    static set = Local.local.setItem.bind(Local.local);

    // 静态方法，用于获取localStorage
    static get = Local.local.getItem.bind(Local.local);

    // 静态方法，用于移除localStorage中的项
    static remove = Local.local.removeItem.bind(Local.local);

    // 静态方法，用于解析存储的JSON字符串
    static parse = v => JSON.parse(Local.get(v));

    // 静态方法，用于将对象转换为JSON字符串
    static toStr = JSON.stringify;

    // 静态方法，用于检查是否为字符串类型
    static isStr = v => typeof v === 'string';

    // 静态方法，用于检查是否为对象类型
    static isObj = v => Object.prototype.toString.call(v) === '[object Object]';

    // 静态方法，用于检查是否为数字类型
    static isNum = n => Number.isInteger(n) && /^[+-]?\d+(\.\d+)?$/.test(String(n));

    // 静态方法，用于检查localStorage中是否包含指定键名的项
    static hasOwn = a => Object.prototype.hasOwnProperty.call(Local.local, a);

    constructor() {}

    /**
     * @description 设置本地存储
     * @param {...*} args - 可变参数，支持多种参数格式
     */
    set(...args) {
        // 检测参数格式
        if (args.length === 1) {
            const o = args[0];
            if (Local.isObj(o)) {
                // 参数为对象时，遍历设置每个键值对
                for (let k in o) Local.set(k, Local.toStr(o[k]));
            } else {
                console.error('Local Error(1 parameter): there is only one parameter, it must be a pure object');
            }
        } else if (args.length === 2) {
            const [a, b] = args;
            if (Local.isObj(a) && Local.isNum(b)) {
                // 第一个参数为对象且第二个参数为数字时，设置带过期时间的值
                for (let k in a) Local.set(k, Local.toStr({ value: a[k], createTime: Date.now(), expireTime: Date.now() + b, _ISLOCAL: 1 }));
            } else if (!Local.isObj(a)) {
                // 参数为非对象时，设置单个值
                Local.set(a, Local.toStr(b));
            } else {
                console.error('Local Error(2 parameter): When there are two parameters, if the first is an object, the second parameter must be the expiration time');
            }
        } else if (args.length >= 3) {
            const [a, b, c] = args;
            if (Local.isStr(a) && Local.isNum(c)) {
                // 第一个参数为字符串且第三个参数为数字时，设置带过期时间的值
                Local.set(a, Local.toStr({ value: b, createTime: Date.now(), expireTime: Date.now() + c, _ISLOCAL: 1 }));
            } else {
                console.error('Local Error(3 parameter): The parameter is incorrect. The parameter format must be key-value-time');
            }
        }
    }

    /**
     * @description 获取本地存储
     * @param {*} a - 键名或键名数组
     * @param {*} d - 默认值
     * @returns {*} - 获取到的值或默认值
     */
    get(a, d) {
        // 如果单个键名不存在，返回默认值
        if (!Array.isArray(a) && !Local.hasOwn(a)) return d === undefined ? null : d;

        // 如果键名数组中的键名都不存在或数组为空，返回默认值
        if (Array.isArray(a) && (!a.some(i => Local.hasOwn(i)) || !a.length)) return d === undefined ? {} : d;

        if (Array.isArray(a)) {
            // 获取多个缓存数据
            const arr = a.filter(i => Local.hasOwn(i)); // 过滤出存在的键名
            return arr.reduce((p, c) => { // 遍历获取每个键名对应的值
                p[c] = this.get(c, d);
                return p;
            }, {});
        } else if (Local.hasOwn(a)) {
            // 获取单个缓存数据
            let ret = null;
            try {
                // 尝试解析JSON字符串
                ret = Local.parse(a);
            } catch (e) {
                ret = Local.get(a);
            }
            if (Local.isObj(ret) && ret._ISLOCAL) {
                // 如果是带过期时间的值，检查是否过期
                if (ret.expireTime && ret.expireTime < Date.now()) {
                    Local.remove(a);
                    return d === undefined ? null : d; // 如果过期，返回默认值
                } else {
                    return ret.value; // 如果未过期，返回值
                }
            } else {
                return ret; // 返回值
            }
        }
    }

    /**
     * @description 删除本地存储
     * @param {*} k - 键名或键名数组
     */
    del(k) {
        if (Local.isStr(k)) {
            Local.remove(k); // 删除单个键名对应的值
        } else if (Array.isArray(k)) {
            for (let i = 0, len = k.length; i < len; i++) {
                Local.hasOwn(k[i]) && Local.remove(k[i]); // 遍历删除键名数组中存在的项
            }
        }
    }

    /**
     * @description 清空本地存储
     */
    clear() {
        Local.clear(); // 清空所有本地存储
    }
}

export default new Local(); // 创建本地存储对象实例
