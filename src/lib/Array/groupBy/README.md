# groupBy（按key分组归档）

> 一个对数组进行分组的函数，分组的依据是数组中对象的某个属性。具体的参数和返回值如下：

-   `arr`：要分组的数组。
-   `key`：属性名，用于分组。
-   返回值：分组后的数组。

代码中使用了数组的 `reduce` 方法来进行分组操作，最终返回分组后的数组。在每次迭代中，根据对象的某个属性值将对象进行分组，并将结果存储在一个对象中，最后将该对象转换为数组形式返回。
```js
/**
 * 对数组进行分组，分组依据是数组中对象的某个属性
 * @param {Array} arr - 要分组的数组
 * @param {String} key - 属性名，用于分组
 * @returns {Array} - 分组后的数组
 */
 function groupBy(groups, key) {
    // 使用 reduce 方法对数组进行分组
    return groups.reduce((acc, item, idx, a) => {
        // 检查是否已存在当前属性值的分组，若存在则将当前对象添加到该分组中，否则创建新分组
        if (acc[item[key]]) {
            acc[item[key]].push(item);
        } else {
            acc[item[key]] = [item];
        }
        // 如果已遍历到数组末尾，则将分组结果转换为数组形式返回
        if (idx === a.length - 1) return Object.values(acc);
        return acc;
    }, {});
}

const data = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Alice' },
    { id: 4, name: 'Charlie' },
];

const result = groupBy(data, 'name');
console.log(result);
// [
[
{"id":1,"name":"Alice"},
{"id":3,"name":"Alice"}
],

[{"id":2,"name":"Bob"}],

[{"id":4,"name":"Charlie"}]
]
```

以下是一些测试用例和对应的说明，用于测试上面提供的 `groupBy` 函数：

1.  **基本用例**：

    ```js
    const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Alice' },
        { id: 4, name: 'Charlie' },
    ];

    const result = groupBy(data, 'name');
    console.log(result);
    ```

    -   这个测试用例包含了一个数组，数组中的对象有 `id` 和 `name` 两个属性。
    -   使用 `groupBy` 函数对数组进行分组，分组依据是对象的 `name` 属性。
    -   预期输出结果为一个以 `name` 属性值作为键的对象，每个键对应的值为具有相同 `name` 属性值的对象组成的数组。

1.  **空数组**：

    ```js
    const data = [];
    const result = groupBy(data, 'name');
    console.log(result);
    ```

    -   这个测试用例针对空数组进行分组操作。
    -   由于数组为空，预期输出结果应为一个空数组 `[]`。

1.  **无重复属性值**：

    ```js
    const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    const result = groupBy(data, 'name');
    console.log(result);
    ```

    -   这个测试用例中数组的对象没有重复的 `name` 属性值。
    -   预期输出结果应为一个包含三个分组的数组，每个分组中只有一个对象。

1.  **属性值为数字**：

    ```js
    const data = [
        { id: 1, category: 1 },
        { id: 2, category: 2 },
        { id: 3, category: 1 },
    ];
    const result = groupBy(data, 'category');
    console.log(result);
    ```

    -   这个测试用例中对象的属性值为数字。
    -   使用 `groupBy` 函数按照数字属性 `category` 进行分组，预期输出结果为两个分组，每个分组包含具有相同 `category` 属性值的对象。

这些测试用例覆盖了基本情况、边界情况和特殊情况，可以验证 `groupBy` 函数的正确性和鲁棒性。