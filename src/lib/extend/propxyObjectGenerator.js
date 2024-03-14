/**
 * @description 一个代理对象生产器，用于生成代理对象。代理对象可以拦截对目标对象属性的读取操作，并进行一些额外的处理。
 * @param { Object } propxyObject 代理对象
 * @param { Function } interceptor 拦截函数
 * @param { Number } attempts 拦截函数请求失败尝试再次请求的次数
 * @param { Number } delay 拦截函数请求失败尝试再次请求的时间间隔
 * @returns 代理对象
 */
export default function propxyObjectGenerator(propxyObject, interceptor, { attempts = 3, delay = 1000 }={}) {
    // 返回代理对象
    return new Proxy(propxyObject, {
        // 拦截对象属性的读取操作
        get(target, propKey, receiver) {
            return (...args) => interceptor(propKey)
            .then((data) => Reflect.get(target, propKey, receiver)(...args,data))
            .catch(async e => {
                if ((interceptor.count || 0) < attempts) {
                    interceptor.count = (interceptor.count || 0) + 1
                    return new Promise((resolve) =>{
                        setTimeout(()=>{
                            resolve(receiver[propKey](...args))
                        }, delay)
                    })
                } else {
                    return Promise.reject(e)
                }
            })
        }
    })
}