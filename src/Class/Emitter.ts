// 定义事件名称类型 为字符串类型
type EventName = string

// 定义回调函数
interface CallbackFuntion {
    (...args: any[]): void, // 定义回调函数类型
}

export class Emitter {
    private events: { [eventName: string]: CallbackFuntion[] } = {}
    on(eventName: EventName, callback: CallbackFuntion): void {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }
    emit(eventName: EventName, ...args: any[]) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((callback: CallbackFuntion) => {
                callback(...args)
            })
        }
    }
    off(eventName: EventName, callback: CallbackFuntion) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((cb: CallbackFuntion) => cb !== callback)
        }
    }
    once(eventName: EventName, callback: CallbackFuntion) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        const onceCallbackFuntion = (...args: any[]) => {
            callback(...args)
            this.off(eventName, onceCallbackFuntion)
        }
        this.events[eventName].push(onceCallbackFuntion)
    }
}