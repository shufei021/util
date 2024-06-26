/**
 * 手动触发Node已有和自定义事件类型函数
 * @param {Element} Node :：触发对象
 * @param {String} EventType : 触发事件类型
 */
interface Nodetype extends Element {
    [key: string]: any;
}
export declare const trigger: (Node: Nodetype, EventType: string) => void;
export {};
