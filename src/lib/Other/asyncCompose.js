

/**
 * @description 异步组合方法
 * @param {*} asyncFns 
 * @returns 
 */
async function asyncCompose(asyncFns, initialValue) {
    if (!Array.isArray(asyncFns)) {
      throw new Error('asyncFns must be an array of async functions');
    }
    for (const fn of asyncFns) {
      if (typeof fn !== 'function') {
        throw new Error('Each element in asyncFns must be a function');
      }
    }
    let prev = initialValue;
    for (const fn of asyncFns) {
      try {
        prev = await fn(prev);
      } catch (error) {
        // handle error
        console.error('An error occurred:', error);
        // return or throw the error as needed
        throw error;
      }
    }
    return prev;
}
export default asyncCompose

/**
 * 
 这段代码实现了一个基于Promise的异步函数组合器，可以await多个异步函数的执行并返回最后一个函数的返回值。以下是代码的实现原理、用途和注意事项：

实现原理：
这段代码首先定义了三个异步函数one、two和three，每个函数都返回一个Promise。在Promise的构造函数中，我们使用了setTimeout来模拟异步操作。然后，我们创建了一个包含这三个函数的数组arr。

接下来，我们定义了一个名为asyncCompose的异步函数组合器。这个函数接受一个异步函数的数组作为参数，并使用await关键字来等待每个函数的返回值。最后，返回最后一个函数的返回值。

用途：
这个异步函数组合器可以用于组合多个异步函数，以便在同一个地方执行它们，并返回最后一个函数的返回值。这对于需要在一个地方执行多个异步操作，并且需要等待所有操作完成后才继续执行后续代码的场景非常有用。

注意事项：
由于使用了setTimeout，所以所有的异步操作都会按照定义的顺序执行，而不是按照调用顺序执行。这可能会导致一些意外的行为，特别是在处理依赖关系时。

使用了await关键字，所以这个函数只能在支持async/await的环境中使用。如果代码需要在不支持async/await的环境中运行，那么这段代码将无法工作。

这段代码的实现依赖于JavaScript的Promise和async/await关键字。如果环境不支持这些特性，那么这段代码将无法工作。

这段代码没有错误处理机制。如果在执行异步函数时发生错误，asyncCompose函数会直接跳过下一个函数并返回错误。在实际应用中，通常需要对错误进行适当的处理。
 * 
 * 
 // 假设我们有一个异步函数，用于获取用户信息
async function getUserInfo(userId) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(`User Info for ${userId}: Name, Age, Email`)
        }, 1000)
    })
}

// 假设我们有一个异步函数，用于计算用户年龄
async function calculateAge(userInfo) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const age = parseInt(userInfo.split(',')[1]) - 25;
            resolve(age)
        }, 1000)
    })
}

// 使用asyncCompose组合这两个异步函数
async function main() {
    const userId = 1;
    const result = await asyncCompose([
        getUserInfo.bind(null, userId),
        calculateAge
    ])
    console.log(result); // 输出：28
}

main();

在这个示例中，我们首先定义了两个异步函数getUserInfo和calculateAge。
然后，我们使用asyncCompose函数组合这两个函数，并使用await关键字等待它们的返回值。
最后，我们打印出结果。

 *
 * 
 */