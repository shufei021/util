type EventName = string;
interface CallbackFuntion {
    (...args: any[]): void;
}
export declare class Emitter {
    private events;
    on(eventName: EventName, callback: CallbackFuntion): void;
    emit(eventName: EventName, ...args: any[]): void;
    off(eventName: EventName, callback: CallbackFuntion): void;
    once(eventName: EventName, callback: CallbackFuntion): void;
}
export {};
