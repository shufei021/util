type Name = string;
export declare class AsyncSource {
    private map;
    private waitMap;
    has(name: Name): boolean;
    get(name: Name): any;
    set(name: Name, value: any): void;
    delete(name: Name): void;
    wait(name: Name, resolve: Function, reject: Function): void;
    dispatchWait(name: Name, val: any, isError?: boolean): void;
    getResult(name: Name, // 任务名字，字符串类型
    requestApi: Function, // 请求接口，返回是一个promise
    cache?: boolean): any;
    clear(): void;
}
export {};
