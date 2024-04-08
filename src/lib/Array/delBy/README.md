# delBy

> 根据条件删除数组中某个值

```js
/**
 * 用法1：
 * let a1 = [1, 2, 3, 4, 5, 6]
 * rutils.delBy(a1, 2)// [1, 3, 4, 5, 6]
 * a1 // [1, 2, 3, 4, 5, 6]
 * let a1 = [1, 2, 3, 4, 5, 6]
 * rutils.delBy(a1, 2, true)// [1, 3, 4, 5, 6]
 * a1 // [1, 3, 4, 5, 6]
 *
 *
 *
 */

/**
 * 用法2：
 * let a1 = [
 *   { id: 1, name: '罗老板', age: 18 },
 *   { id: 2, name: '帆老板', age: 19 },
 *   { id: 3, name: '全老板', age: 20 },
 *    { id: 2, name: '帆老板', age: 19 }
 * ]
 * // 删除 a1 数组中 id 为 2的值
 * rutils.delBy(a1, item => item.id === 2) //  等价于 handday.arr.delBy(a1, { id: 2 })
 * console.log(a1)
 * //
 * [
 *     { id: 1, name: '罗老板', age: 18 },
 *    { id: 3, name: '全老板', age: 20 },
 * ]
 *
 *
 *
 *
 *
 */

/**
 * 用法3：
 *
 *
 * let a1 = [
 *    { id: 1, name: '罗老板', age: 18 },
 *     { id: 2, name: '帆老板', age: 19 },
 *     { id: 3, name: '全老板', age: 20 },
 *     { id: 2, name: '帆老板', age: 19 }
 * ]
 * // 删除 只要 id 是 1 或 2的值
 * rutils.delBy(a1, { id: [1, 2] })
 * console.log(a1)
 * //
 * [
 *     { id: 3, name: '全老板', age: 20 },
 * ]
 *
 *
 *
 */

/**
 * 用法4：
 *
 *
 * let a1 = [
 *     { id: 1, name: '罗老板', age: 18 },
 *     { id: 2, name: '帆老板', age: 19 },
 *     { id: 3, name: '全老板', age: 20 },
 *     { id: 2, name: '帆老板', age: 19 }
 * ]
 * // 删除 a1 数组中 id值为 2，或 name值为 全老板  PS：注意是或的关系
 * rutils.delBy(a1, { id: 2, name: '全老板' })
 * console.log(a1)
 *
 *
 *
 *
 */

/**
 * 用法5：
 *
 *
 * let a1 = [
 *     { id: 1, name: '罗老板', age: 18 },
 *     { id: 2, name: '帆老板', age: 19 },
 *     { id: 3, name: '全老板', age: 20 },
 *     { id: 2, name: '帆老板', age: 19 },
 *     { id: 4, name: '卫老板', age: 22 },
 *     { id: 5, name: '卓老板', age: 21 },
 *     { id: 6, name: '黄老板', age: 23 }
 * ]
 * // 只要 id值为 2 ，name值 是 全老板 或 卫老板，age值是23 ，对应的值都从数组中删除掉
 * rutils.delBy(a1, { id: 2, name: ['全老板', '卫老板'], age: 23 })
 * console.log(a1)
 * //
 * [
 * {id: 1, name: "罗老板", age: 18}
 * {id: 5, name: "卓老板", age: 21}
 * ]
 *
 *
 *
 */

/***
 * 用法6：
 *
 * let a1 = [1, 2, 3, 4, 5, 2]
 * // 删除 给出的数组范围的值
 * rutils.delBy(a1, [2, 3, 4])
 * console.log(a1) //[1,5]
 *
 *
 *
 */
```