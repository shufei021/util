# guid （生成唯一标识符）

```js
/**
 * 生成一个 GUID（Globally Unique Identifier）
 * @returns {string} 生成的 GUID 字符串
 */
function guid () {
  return Array.from(
    { length: 8 }, // 创建包含 8 个元素的数组，每个元素用于生成 4 位的十六进制字符串
    (_, i) => (
      (((1 + Math.random()) * 0x10000) | 0) // 生成一个随机数，乘以 0x10000 并向下取整，得到一个 0 到 0xffff 之间的整数
      .toString(16) // 将整数转换为十六进制字符串
      .substring(1) // 截取字符串，保留从第二位开始的字符
      + ([1, 2, 3, 4].includes(i) ? '-' : '') // 在第 2、4、6、8 位插入短横线
    )
  ).join(''); // 将数组中的元素连接成一个字符串，得到最终的 GUID 字符串
}

// 示例用法
const myGUID = guid();
console.log(myGUID); // 输出生成的 GUID
```
> 这个函数是一个生成 GUID（Globally Unique Identifier）的方法。GUID是一种全局唯一标识符，通常由数字和字母组成，用于唯一标识对象或实体。

这个函数的实现使用了数组的 `from` 方法，结合了随机数和位运算来生成唯一的标识符。具体的步骤如下：

1.  `{ length: 8 }` 表示创建一个包含 8 个元素的数组。
1.  `(_, i)` 表示忽略第一个参数，使用第二个参数作为索引。
1.  `(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)` 生成一个随机的十六进制字符串，长度为 4。
1.  `([1, 2, 3, 4].includes(i) ? '-' : '')` 根据索引位置在第 2、4、6、8 位插入短横线。
1.  `join('')` 将数组中的元素连接成一个字符串，最终得到一个符合 GUID 标准的字符串。

