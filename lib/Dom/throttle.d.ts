/**
 * @description:节流
 * @param { Function } func : 节流的事件响应函数
 * @param { Number } wait ：事件响应函数执行需求的频率时间
 * @param { Object } options ：配置对象，包含两个值 immediate（是否立即执行）和 trailing（最后是否还执行一次）
 */
interface ThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}
interface resultType {
    cancel: Function;
}
export declare function throttle(func: Function, wait: number, options: ThrottleOptions): resultType;
export {};
