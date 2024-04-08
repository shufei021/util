# 广度遍历（bfs）

> 树节点广度遍历,`bfs` 的函数，用于实现广度优先搜索（BFS）算法遍历数据结构，并根据提供的回调函数执行相应的操作。该函数接受两个参数：`data` 表示要遍历的数据结构，`cb` 表示回调函数，用于处理每个节点的操作。

**源码**
```js
/**
 * bfs 函数用于实现广度优先搜索算法遍历数据结构，并根据提供的回调函数执行相应的操作
 * @param {Object|Array} data - 要遍历的数据结构，可以是对象或数组
 * @param {Function} cb - 回调函数，用于处理每个节点的操作
 */
function bfs(data, cb) {
    // 将数据转换为数组形式，便于进行广度优先搜索
    const list = Array.isArray(data) ? [...data] : [data];
    // 获取子节点的别名，默认为 "children"
    const aliasChildren = cb.children || "children";

    // 使用 while 循环实现广度优先搜索
    while (list.length) {
        const item = list.shift(); // 取出队列中的第一个节点

        // 如果回调函数中定义了 cb 属性，则执行 cb.cb 方法；否则执行 cb 方法
        cb.cb ? cb.cb(item, bfs) : cb ? cb(item, bfs) : null;

        // 判断当前节点是否存在子节点，存在则将子节点加入到队列中
        item &&
            item[aliasChildren] &&
            item[aliasChildren].length &&
            item[aliasChildren].forEach((child) => list.push(child));
    }
}

```

**语法**

```js
bfs(data, cb)
```

**参数**

`@param {Object | Array} data :` 树节点 或 children 数组  
`@param {Function | Object} cb :` 每个节点的回调函数 或 一个对象（包含children的别名 children 属性和 每项回调函数cb属性）

**示例**
```js
const data = {
    name:"data",
    children:[
        {
            name:"converters",
            children:[
                {
                    name:"TextConverters",
                    value:721
                },
                {
                    name:"DelimitedTextConverter",
                    value:4294
                },
                {
                    name:"GraphMLConverter",
                    value:9800
                },
                {
                    name:"IDataConverter",
                    value:1314
                },
                {
                    name:"JSONConverter",
                    value:2220
                }
            ]
        }
    ]
}

// 给树(没有 children 或 children数组为空数组的)节点添加一个leaf叶子属性
bfs(data,{
    cb(item){
        if(!item.children || !item.children.length){
            item.leaf = true
        }
    }
})
// 等价于
bfs(data,(item)=>{
    if(!item.children || !item.children.length){
        item.leaf = true
    }
})

const list = [
    {
        name:"converters",
        child:[
            {
                name:"TextConverters",
                value:721
            },
            {
                name:"DelimitedTextConverter",
                value:4294
            },
            {
                name:"GraphMLConverter",
                value:9800
            },
            {
                name:"IDataConverter",
                value:1314
            },
            {
                name:"JSONConverter",
                value:2220
            }
        ]
    }
]
// 给树(没有 child 或 child 数组为空数组的)节点添加一个leaf叶子属性
bfs(list,{
    children:'child',// children 别名
    cb(item){
        if(!item.child || !item.child.length){
            item.leaf = true
        }
    }
})
console.log(list)
```

这段代码定义了一个名为 `bfs` 的函数，用于实现广度优先搜索（BFS）算法遍历数据结构，并根据提供的回调函数执行相应的操作。该函数接受两个参数：`data` 表示要遍历的数据结构，`cb` 表示回调函数，用于处理每个节点的操作。

下面是对这个函数的解释和示例用法：

```js
/**
 * bfs 函数用于实现广度优先搜索算法遍历数据结构，并根据提供的回调函数执行相应的操作
 * @param {Object|Array} data - 要遍历的数据结构，可以是对象或数组
 * @param {Function} cb - 回调函数，用于处理每个节点的操作
 */
function bfs(data, cb) {
    // 将数据转换为数组形式，便于进行广度优先搜索
    const list = Array.isArray(data) ? [...data] : [data];
    // 获取子节点的别名，默认为 "children"
    const aliasChildren = cb.children || "children";

    // 使用 while 循环实现广度优先搜索
    while (list.length) {
        const item = list.shift(); // 取出队列中的第一个节点

        // 如果回调函数中定义了 cb 属性，则执行 cb.cb 方法；否则执行 cb 方法
        cb.cb ? cb.cb(item, bfs) : cb ? cb(item, bfs) : null;

        // 判断当前节点是否存在子节点，存在则将子节点加入到队列中
        item &&
            item[aliasChildren] &&
            item[aliasChildren].length &&
            item[aliasChildren].forEach((child) => list.push(child));
    }
}
```

示例用法：

```js
// 示例数据
const tree = {
    value: 'A',
    children: [
        {
            value: 'B',
            children: [
                { value: 'D' },
                { value: 'E' }
            ]
        },
        {
            value: 'C',
            children: [
                { value: 'F' }
            ]
        }
    ]
};

// 定义回调函数，用于打印节点值
const printValue = (node) => console.log(node.value);

// 使用 bfs 函数进行广度优先搜索遍历并打印节点值
bfs(tree, printValue);
```

在上面的示例中，我们使用 `bfs` 函数对示例数据 `tree` 进行广度优先搜索遍历，并使用回调函数 `printValue` 打印每个节点的值。通过这种方式可以实现对任意数据结构的广度优先搜索遍历，并根据需要执行相应的操作。