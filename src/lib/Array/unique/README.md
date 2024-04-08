# unique（数组去重）


```js
/**  
 * 去除数组中的重复项。  
 * 如果提供了第二个参数k，则根据对象的k属性值进行去重。  
 *  
 * @param {Array} a - 需要去重的数组。  
 * @param {string} [k] - 对象数组中去重的属性名。  
 * @returns {Array} - 去重后的数组。  
 * @throws {Error} - 如果第一个参数不是数组，或第二个参数不是字符串且已提供。  
 */
const unique = function (a, k) {
    if (!Array.isArray(a)) {
        throw new Error('传入的第一个参数必须为数组类型');
    }
    if (k !== undefined && typeof k !== 'string') {  
        throw new Error('传入的第二个参数（如果提供）必须为字符串类型');  
    }
    if (!k) {  
        // 如果没有提供k参数，直接根据元素的值去重  
        return [...new Set(a)];  
    } 
    // 基于对象属性值的去重  
    const seen = new Map();  
    return a.filter(item => {  
        if (item && typeof item === 'object' && item.hasOwnProperty(k)) {  
            const key = item[k];  
            // 如果还没见过这个属性值，则加入Map  
            if (!seen.has(key)) {  
                seen.set(key, true);  
                return true;  
            }  
        }  
        // 非对象或没有指定属性，或者属性值已见过，都排除在外  
        return false;  
    });  
}
```

这段 JavaScript 代码定义了一个名为 `unique` 的函数，用于去除数组中的重复项。它接受两个参数：

1.  `a`：一个数组，这是需要去重的目标。
1.  `k`：一个可选的字符串，代表对象数组中某个属性的名称。当数组中的元素是对象时，函数会根据这个属性的值进行去重。

函数的逻辑如下：

1.  **检查输入**：

    -   首先，它检查第一个参数 `a` 是否为数组，如果不是，则抛出一个错误。
    -   然后，它检查第二个参数 `k` 是否已定义且为字符串类型。如果 `k` 提供了但不是字符串，也抛出一个错误。

1.  **无 `k` 参数的去重**：

    -   如果 `k` 未定义（即没有提供），则函数直接对数组 `a` 使用 `Set` 对象来去重。`Set` 对象只能存储唯一的值，因此这种方法会移除数组中的所有重复项。最后，使用展开运算符 `...` 将 `Set` 对象转回数组。

1.  **基于 `k` 参数的去重**：

    -   如果 `k` 被定义了，那么函数假定数组 `a` 中的元素是对象，并且每个对象都有一个名为 `k` 的属性。函数使用 `Map` 对象来跟踪已经出现过的属性值。
    -   对于数组 `a` 中的每个元素，函数检查它是否是一个对象，并且是否有一个名为 `k` 的属性。如果满足这些条件，它会检查 `Map` 是否已经包含该属性值。
    -   如果 `Map` 中还没有这个属性值，函数将其添加到 `Map` 中，并返回 `true`，表示这个元素应该被保留在最终的数组中。
    -   如果 `Map` 中已经包含了这个属性值，或者元素不是对象，或者没有 `k` 属性，函数返回 `false`，表示这个元素应该被排除。

最后，函数返回一个新的数组，其中只包含不重复的元素（基于原始数组的值，或者如果提供了 `k` 参数，则基于 `k` 属性的值）。

这种去重方式在处理对象数组时特别有用，尤其是当你想根据对象的某个特定属性来去除重复项时。

下面是一些使用示例：

```js
const arr1 = [1, 2, 2, 3, 4, 4, 5];  

console.log(unique(arr1)); // 输出: [1, 2, 3, 4, 5]  

const arr2 = [  

    { id: 1, name: 'Alice' },  

    { id: 2, name: 'Bob' },  

    { id: 1, name: 'Charlie' }  

];  
console.log(unique(arr2, 'id')); // 输出: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

在第一个示例中，`unique`函数去除了数组`arr1`中的重复数字。在第二个示例中，`unique`函数按照`id`属性去除了数组`arr2`中的重复对象。