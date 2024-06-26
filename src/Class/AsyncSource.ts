// 定义事件名称类型 为字符串类型
type Name = string

export class AsyncSource {
    private map = new Map  // 任务对象
    private waitMap = new Map  // 等待map对象
    // 缓存中是否有该任务
    has (name: Name) {
        return this.map.has(name)
      }
      // 从缓存中获取该任务的结果
      get (name: Name) {
        return this.map.get(name)
      }
      // 缓存该任务的结果
      set (name:Name, value:any) {
        this.map.set(name, value)
      }
      // 删除该任务的结果
      delete (name: Name) {
        this.map.delete(name)
      }
      // 添加等待该任务结果的函数
      wait (name:Name, resolve:Function, reject:Function) {
        const waits = this.waitMap.get(name) || []
        waits.push({ resolve, reject })
        this.waitMap.set(name, waits)
      }
      // 派发等待该任务结果的函数
      dispatchWait (name: Name, val: any, isError?:boolean) {
        if (this.waitMap.has(name)) {
          const waits = this.waitMap.get(name)
          for (let i = 0; i < waits.length; i++) {
            const wait = waits[i]
            isError ? wait.reject(val) : wait.resolve(val)
          }
        }
      }
      // 获取结果函数
      getResult (
        name:Name, // 任务名字，字符串类型
        requestApi: Function, // 请求接口，返回是一个promise
        cache?:boolean // 是否缓存结果
      ) {
        // 任务名字
        const TaskName = `${name}TaskName`
        // 出错任务名字
        const TaskErrName = `${name}TaskErrName`
        // 如果缓存中没有这个任务，同时这个任务也没有出错
        if (!this.has(name) && !this.has(TaskName)) {
            // 那么对该次任务进行状态标记，关闭 if 入口，让后面相同任务进入 else 入口
            this.set(TaskName, true)
            // 开始请求数据
            return requestApi()
                .then((result: any) => {   // 成功请求数据后
                    // 将成功返回的数据结果设置到缓存中
                    this.set(name, result)
                    // 触发等待任务列表，进行通知，当然是成功的通知，一对都对
                    this.dispatchWait(name, result)
                    // 返回结果
                    return result
                })
                .catch((err: any) => { // 失败
                    // 缓存错误任务
                    this.set(TaskErrName, err)
                    // 触发等待任务列表，进行通知， 当然是失败的通知，一错都错
                    this.dispatchWait(name, err, true)
                    // 抛出错误
                    throw err
                }).finally(() => {
                    // 成功失败与否，都已经出了结果，就把缓存标记状态删除，任务结束
                    this.delete(TaskName)
                    // 如果不缓存结果， 缓存1秒后删除 任务 和 错误任务
                    if (!cache) {
                        setTimeout(() => {
                        this.delete(name)
                        this.delete(TaskErrName)
                        }, 1000)
                    }
                })
        } else {
            // 如果同个任务已经在在缓存中了，就走到这里
            return new Promise((resolve:Function, reject:Function) => {
                // 先判断缓存中是否有任务结果
                if (this.has(name)) {
                    // 有就直接返回结果
                    resolve(this.get(name))
                } else if (this.has(TaskErrName)) { // 再判断缓存中是否有该次任务的错误任务
                    // 有就直接返回错误
                    reject(this.get(TaskErrName))
                } else {
                    // 没有就缓存等待任务，等待任务列表中，有结果了，就通知等待任务列表
                    this.wait(name, resolve, reject)
                }
            })
        }
      }
      // 清空任务列表
      clear () {
        this.map.clear()
      }
}