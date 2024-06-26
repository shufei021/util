declare class Local {
    static local: Storage;
    static set: (key: string, value: string) => void;
    static get: (key: string) => string | null;
    static remove: (key: string) => void;
    static parse: (v: any) => any;
    static toStr: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
    };
    static isStr: (v: any) => boolean;
    static isObj: (v: any) => boolean;
    static isNum: (n: any) => boolean;
    static hasOwn: (a: string) => boolean;
    constructor();
    /**
     * @description 设置本地存储
     * @param {...*} args - 可变参数，支持多种参数格式
     */
    set(...args: any[]): void;
    /**
     * @description 获取本地存储
     * @param {*} a - 键名或键名数组
     * @param {*} d - 默认值
     * @returns {*} - 获取到的值或默认值
     */
    get(a: any[], d: undefined): any;
    /**
     * @description 删除本地存储
     * @param {string | string[]} k - 键名或键名数组
     */
    del(k: string | string[]): void;
    /**
     * @description 清空本地存储
     */
    clear(): void;
}
export declare const local: Local;
export {};
