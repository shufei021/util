#arrayToTree

这段代码定义了一个名为 arrayToTree 的 JavaScript 函数，用于将数组转换为树形结构。以下是对这段代码的说明和注释：

```js
/**
 * @description 数组转换为树形结构
 * @param {Array} arr 需要转换为树形结构的 JSON 数组
 * @param {Number | String} id 树节点的 id
 * @param {String} link 父节点 id 的字段名，默认为 'pid'
 * @returns {Array} 转换后的树形结构数组
 */
const arrayToTree = function (arr, id = null, link = 'pid') {
    // 使用 filter 方法过滤出当前节点的子节点，并使用 map 方法将子节点转换为树形结构
    return arr.filter(i => i[link] === id).map(i => ({ ...i, children: arrayToTree(arr, i.id, link) }));
}
```
这个函数接收一个 JSON 数组 arr，根据参数 id 和 link 将其转换为树形结构。其中，id 表示树节点的 id，link 表示父节点 id 的字段名，默认为 'pid'。

函数首先使用 filter 方法过滤出当前节点的子节点，然后使用 map 方法将子节点转换为树形结构，形成树的层级关系。最终返回一个包含树形结构的数组。

如果您对这段代码有任何疑问或需要进一步解释，请告诉我！


以下是针对 arrayToTree 函数的一些测试用例场景，并附上每个测试用例的说明：

基本情况：

```js
const data = [
    { id: 1, name: 'Node 1', pid: null },
    { id: 2, name: 'Node 2', pid: 1 },
    { id: 3, name: 'Node 3', pid: 1 },
    { id: 4, name: 'Node 4', pid: 2 },
    { id: 5, name: 'Node 5', pid: null },
];
arrayToTree(data);
```
期望结果：根据 pid 字段将数组转换为树形结构，其中节点 1 包含节点 2 和节点 3，节点 2 包含节点 4，节点 5 作为独立节点。

自定义 id 字段和 link 字段：

```js
const data = [
    { nodeId: 1, nodeName: 'Node 1', parentId: null },
    { nodeId: 2, nodeName: 'Node 2', parentId: 1 },
    { nodeId: 3, nodeName: 'Node 3', parentId: 1 },
    { nodeId: 4, nodeName: 'Node 4', parentId: 2 },
    { nodeId: 5, nodeName: 'Node 5', parentId: null },
];
arrayToTree(data, null, 'parentId');
```
期望结果：根据自定义的 id 字段 nodeId 和 link 字段 parentId 将数组转换为树形结构。

空数组：

```js
const data = [];
arrayToTree(data);
```
期望结果：空数组不会影响函数运行，返回空数组作为树形结构的根节点。

单个节点：

```js
    
const data = [{ id: 1, name: 'Node 1', pid: null }];
arrayToTree(data);
```
期望结果：只有一个节点的数组会被转换成只包含该节点的树形结构。

循环引用的情况：

```js
const data = [
    { id: 1, name: 'Node 1', pid: null },
    { id: 2, name: 'Node 2', pid: 1 },
    { id: 3, name: 'Node 3', pid: 2 },
    { id: 4, name: 'Node 4', pid: 3 },
    { id: 5, name: 'Node 5', pid: 4 },
    { id: 1, name: 'Node 6', pid: 5 }, // 循环引用，节点 1 的父节点是节点 5，同时节点 5 的子节点是节点 1
];
arrayToTree(data);


期望结果：在存在循环引用的情况下，函数应该能够处理并返回正确的树形结构。