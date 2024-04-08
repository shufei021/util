# getRepeat

> 获取json数组中的所有重复项和非重复项


## 示例

```js
let a2 = [
    { id: 1, name: '张三', age: 20 },
    { id: 1, age: 20, name: '张三' },
    { id: 1, name: '李四', age: 20 },
    { id: 3, name: '小明', age: 23 },
    { id: 3, name: '小明', age: 23 },
    { id: 2, name: '大卫', age: 21 },
    { id: 22, name: '大卫1', age: 22 },
]
getRepeat(a2)
 // {repeatArr: Array(2), notRepeatArr: Array(3)}

```