# findIndexs

> 查询满足条件的所有索引 - findIndexs


## 示例

```js
 
const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]

findIndexs(list, i => [2, 4, 7].includes(i.id)) // [1, 3, 6]   
```