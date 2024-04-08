# arrayRestore


> 有时候，我们需要还原数组 改变顺序之前的顺序状态，因此，我们需要一个 数组顺序状态还原方法来帮我解决这个问题

参数

```js
/**
 * @description: 数组状态还原
 * @param { Array } list: 有两值交换后的数组
 * @param { Number } oldIndex: 交换项索引
 * @param { Number } newIndex：被交换项索引
 * @param { Boolean } isDeep：是否给改变原数组
 */
```

示例

```js
const oldArr = [1, 2, 3, 4, 5, 6, 7]
const oldIndex = 5
const newIndex = 2
// 在拖拽排序中，我们把 数组 的索引 5的值 6 拖到索引 2的位置，之前的顺势往下排，得到 [1, 2, 6, 3, 4, 5,  7]

// 现在，你想借助 改变后的数组 [1, 2, 6, 3, 4, 5,  7] 和 改变时的 新旧索引 还原数组改变之前的状态，我们这样做

arrayRestore([1, 2, 6, 3, 4, 5, 7], oldIndex, newIndex) // [1, 2, 3, 4, 5, 6, 7]
```