# isEquals 



```js
const isEquals = function(a, b, checked = new Set()) {
    // 提前返回不同类型的值
    if (typeof a !== typeof b) return false;

    // 处理循环引用
    if (typeof a === 'object' && typeof b === 'object') {
        if (checked.has(a) && checked.has(b)) return true;
        checked.add(a);
        checked.add(b);
    }

    // 基本类型的值直接比较
    if (a === b || (Number.isNaN(a) && Number.isNaN(b))) return true;

    // 检查引用类型的值
    if (typeof a === 'object') {
        // 如果是日期对象，比较时间戳
        if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
        // 如果是正则表达式，比较字符串形式
        if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();
        // 如果是 Map，转换为普通对象进行比较
        if (a instanceof Map && b instanceof Map) {
            const objA = Object.fromEntries(a.entries());
            const objB = Object.fromEntries(b.entries());
            return isEquals(objA, objB, checked);
        }
        // 如果是数组或对象，递归比较属性
        if (Array.isArray(a) && Array.isArray(b) || Object.prototype.toString.call(a) === '[object Object]' && Object.prototype.toString.call(b) === '[object Object]') {
            const keysA = Object.keys(a).sort(); // 对属性排序
            const keysB = Object.keys(b).sort(); // 对属性排序
            // 检查属性数量是否相同
            if (keysA.length !== keysB.length) return false;
            // 检查每个属性是否相等
            return keysA.every((key, index) => key === keysB[index] && isEquals(a[key], b[key], checked));
        }
    }

    // 其他情况直接返回 false
    return false;
}
```

以下是一些测试用例，可以用来验证 `isEquals` 函数的功能：

1.  基本类型的比较：

    ```js
    console.log(isEquals(5, 5)); // true
    console.log(isEquals("hello", "world")); // false
    ```

1.  对象类型的比较：

    ```js
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { a: 1, b: 3 };
    console.log(isEquals(obj1, obj2)); // true
    console.log(isEquals(obj1, obj3)); // false
    ```

1.  数组类型的比较：

    ```js
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const arr3 = [1, 2, 4];
    console.log(isEquals(arr1, arr2)); // true
    console.log(isEquals(arr1, arr3)); // false
    ```

1.  混合类型的比较：

    ```js
    const mixed1 = { a: 1, b: [1, 2, 3] };
    const mixed2 = { a: 1, b: [1, 2, 3] };
    const mixed3 = { a: 1, b: [1, 2, 4] };
    console.log(isEquals(mixed1, mixed2)); // true
    console.log(isEquals(mixed1, mixed3)); // false
    ```

1.  日期对象的比较：

    ```js
    const date1 = new Date("2022-01-01");
    const date2 = new Date("2022-01-01");
    const date3 = new Date("2022-01-02");
    console.log(isEquals(date1, date2)); // true
    console.log(isEquals(date1, date3)); // false
    ```

1.  正则表达式对象的比较：

    ```js
    const regex1 = /\w+/;
    const regex2 = /\w+/;
    const regex3 = /\d+/;
    console.log(isEquals(regex1, regex2)); // true
    console.log(isEquals(regex1, regex3)); // false
    ```

1.  不同类型的比较：

    ```js
    console.log(isEquals(5, "5")); // false
    console.log(isEquals(null, undefined)); // false
    ```

这些测试用例覆盖了函数的不同方面，包括基本类型、对象类型、数组类型、日期对象、正则表达式对象以及不同类型之间的比较。

以下是一些深层级对象的测试用例，用于验证 `isEquals` 函数在比较深层级对象时的功能：

```js
const deepObj1 = {
    a: {
        b: {
            c: 1,
            d: {
                e: [1, 2, 3]
            }
        }
    }
};

const deepObj2 = {
    a: {
        b: {
            c: 1,
            d: {
                e: [1, 2, 3]
            }
        }
    }
};

const deepObj3 = {
    a: {
        b: {
            c: 1,
            d: {
                e: [1, 2, 4]
            }
        }
    }
};

console.log(isEquals(deepObj1, deepObj2)); // true
console.log(isEquals(deepObj1, deepObj3)); // false
```

这些测试用例包含了具有多层嵌套结构的对象，用于验证函数在深层级对象比较时的正确性。

以下是一些复杂的 JSON 数组测试用例，用于验证 `isEquals` 函数在比较深层级、复杂结构的 JSON 数组时的功能：

```js
const complexArray1 = [
    {
        id: 1,
        name: "John",
        children: [
            {
                id: 11,
                name: "Alice",
                hobbies: ["reading", "painting"]
            },
            {
                id: 12,
                name: "Bob",
                hobbies: ["music", "sports"]
            }
        ]
    },
    {
        id: 2,
        name: "Jane",
        children: [
            {
                id: 21,
                name: "Charlie",
                hobbies: ["swimming", "gardening"]
            }
        ]
    }
];

const complexArray2 = [
    {
        id: 1,
        name: "John",
        children: [
            {
                id: 11,
                name: "Alice",
                hobbies: ["reading", "painting"]
            },
            {
                id: 12,
                name: "Bob",
                hobbies: ["music", "sports"]
            }
        ]
    },
    {
        id: 2,
        name: "Jane",
        children: [
            {
                id: 21,
                name: "Charlie",
                hobbies: ["swimming", "gardening"]
            }
        ]
    }
];

const complexArray3 = [
    {
        id: 1,
        name: "John",
        children: [
            {
                id: 11,
                name: "Alice",
                hobbies: ["reading", "painting"]
            },
            {
                id: 12,
                name: "Bob",
                hobbies: ["music", "dance"]
            }
        ]
    },
    {
        id: 2,
        name: "Jane",
        children: [
            {
                id: 21,
                name: "Charlie",
                hobbies: ["swimming", "gardening"]
            }
        ]
    }
];

console.log(isEquals(complexArray1, complexArray2)); // true
console.log(isEquals(complexArray1, complexArray3)); // false
```

这些测试用例包含了具有复杂结构的 JSON 数组，其中包含对象的嵌套和数组。它们可以验证函数在处理深层级、复杂结构的 JSON 数组时的准确性。

虽然这个函数在许多情况下可能运行良好，但也存在一些情况下可能不准确的情况。以下是一些可能导致函数不满足预期的情况：

1.  对象属性的顺序不同：即使两个对象包含相同的属性和值，但如果它们的属性顺序不同，函数也会认为它们不相等。这是因为 `Object.keys()` 返回的属性顺序可能会不同，但这并不影响两个对象是否应被视为相等。

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 2, a: 1 };

console.log(isEquals(obj1, obj2)); // false，即使属性和值相同
```

2.  对于循环引用的对象，函数可能陷入无限递归的循环中，导致堆栈溢出或程序崩溃。

```js
const obj1 = {};
const obj2 = {};
obj1.circularReference = obj1;
obj2.circularReference = obj2;

console.log(isEquals(obj1, obj2)); // 可能导致堆栈溢出或程序崩溃
```

3.  函数在处理 `NaN` 值时的行为可能不一致。因为 `NaN` 与任何其他值都不相等，即使是自身。

```js
console.log(isEquals(NaN, NaN)); // false
```

4.  函数在处理特殊对象（例如 `Map`、`Set`、`WeakMap`、`WeakSet` 等）时的行为未定义，因为这些对象可能具有不同的比较语义。

```js
const map1 = new Map([[1, 'a'], [2, 'b']]);
const map2 = new Map([[1, 'a'], [2, 'b']]);

console.log(isEquals(map1, map2)); // undefined
```

综上所述，虽然这个函数在许多情况下可能表现良好，但在处理某些情况时可能会出现问题。因此，在特定情况下，可能需要使用更精确的方法来比较对象。

> 判断两个值是否相同

**语法：**

```js
rutils.isEquals(value1, value2)
```

**示例：**

```js
isEquals(1, '1')// => false

isEquals({ userName: 'zhangsan' }, { userName: 'lisi' })// => false

let a1 = { user: 'zhangsan', info: { age: 22, ad: { name: '十里店' } } }
let b1 = { user: 'zhangsan', info: { age: 22, ad: { name: '十里店' } } }

rutils.isEquals(a1, b1)// => true

let a = { user: 'zhangsan', info: { age: 22, ad: { name: '十里店', time: new Date('2022/1/1') } } }
let b = { user: 'zhangsan', info: { age: 22, ad: { name: '十里店', time: new Date('2022/1/1') } } }

isEquals(a, b)// => true

let arr1 = [{ user: 'zhangsan', info: { age: 22, ad: { name: '十里店', time: new Date('2022/1/1') } } }]
let arr2 = [{ user: 'zhangsan', info: { age: 22, ad: { name: '十里店', time: new Date('2022/1/1') } } }]

isEquals(arr1, arr2)// => true
```