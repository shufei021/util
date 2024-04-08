# 交集：intersection

> 对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。

![企业微信截图_17113473525771.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57f3e03d512341368b60efd3d33adc78~tplv-k3u1fbpfcp-watermark.image?)
**函数**

> A ∩ B

```js
const intersection = function(arr1, arr2, key) {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
        throw new Error('传入的参数都必须为数组类型');
    }
    if(key){
        return arr1.filter(item1 => arr2.some(item2 => item1[key] === item2[key]));
    } else {
        return arr1.filter(item => arr2.includes(item));
    }
}
```
这段代码定义了一个名为 `intersection` 的函数，它的作用是找出两个数组之间的交集。具体实现如下：

1.  **参数**：

    -   `arr1` 和 `arr2`：这是两个待比较的数组。
    -   `key`：这是一个可选参数，用于指定数组中对象的某个属性，基于这个属性来找出交集。

1.  **函数开始**：

    -   首先，函数检查 `arr1` 和 `arr2` 是否都是数组。如果不是，则抛出一个错误，说明传入的参数都必须是数组类型。

1.  **当有 `key` 参数时**：

    -   使用 `filter` 方法遍历 `arr1`。对于 `arr1` 中的每个元素（称为 `item1`），使用 `some` 方法检查 `arr2` 中是否有某个元素（称为 `item2`）的 `key` 属性值与 `item1` 的 `key` 属性值相同。
    -   如果找到了这样的 `item2`，那么 `item1` 会被包含在返回的结果中。
    -   这种方式适用于两个数组中包含对象，并且你想基于对象的某个属性来找出交集的情况。

1.  **当没有 `key` 参数时**：

    -   使用 `filter` 方法遍历 `arr1`。对于 `arr1` 中的每个元素，使用 `includes` 方法检查它是否存在于 `arr2` 中。
    -   如果存在，那么该元素会被包含在返回的结果中。
    -   这种方式适用于两个数组包含基本数据类型（如数字、字符串等）或相同的对象引用的情况。

**示例**：

1.  **使用 `key`**：

假设你有两个对象数组，并且你想基于每个对象的 `id` 属性来找出交集：

```js
const arr1 = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];  

const arr2 = [{id: 2, name: 'Robert'}, {id: 3, name: 'Charlie'}];  

console.log(intersection(arr1, arr2, 'id'));  // 输出: [{id: 2, name: 'Bob'}]
```

2.  **不使用 `key`**：

假设你有两个数字数组，并想找出它们之间的交集：

```js
const arr1 = [1, 2, 3];  

const arr2 = [2, 3, 4];  

console.log(intersection(arr1, arr2));  // 输出: [2, 3]
```

> 这个函数为找出两个数组之间的交集提供了灵活的方式，既可以基于对象的某个属性，也可以基于整个元素。

**示例**


```js
const A = [1 ,2, 3, 4]  
    
const B  = [3, 4, 5, 6]  

let a1 = [
    { id: 1, name: '张三', age: 20 },
    { id: 2, name: '李四', age: 21 },
    { id: 3, name: '小二', age: 23 },
    { id: 4, name: '熊大', age: 23 },
]
let b1 = [
    { id: 3, name: '小二', age: 23 },
    { id: 4, name: '熊大', age: 23 },
    { id: 5, name: '小明', age: 24 },
    { id: 6, name: '小红', age: 25 }
]

intersection(A,B) // [3, 4]

intersection(a1,b1, 'id') // [ { id: 3, name: '小二', age: 23 },{id: 4, name: '熊大', age: 23}]
```