# pluckDeep

> 从`对象`/`数组`中提取指定深度的属性值，该函数接受一个键（`key`）作为参数，并返回一个函数，该返回的函数接受两个参数：目标对象（`obj`）和默认值（`defaultVal`）。该函数的作用是从目标对象中提取指定深度的属性值，并在属性不存在或提取出错时返回默认值。

```js
// 示例用法：
const person = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        zipCode: '10001'
    }
};

// 创建一个提取深层属性的函数
const getName = pluckDeep('name');

// 使用提取函数获取属性值，提供默认值 'N/A'，避免属性不存在时返回 undefined
console.log(getName(person, 'N/A')); // 输出: 'John'

// 属性不存在时返回默认值 'N/A'
const getLastName = pluckDeep('lastName')(person, 'N/A');
console.log(getLastName); // 输出: 'N/A'
```
下面是针对 `pluckDeep` 函数的各种场景用例，并进行说明：

1.  **正常使用场景：**

    ```js
    const obj = {
        person: {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                zipCode: '10001'
            }
        }
    };

    const getName = pluckDeep('person.name');
    console.log(getName(obj)); // 输出: 'John'
    ```

1.  **属性不存在的情况：**

    ```js
    const obj = {
        person: {
            age: 30,
            address: {
                city: 'New York',
                zipCode: '10001'
            }
        }
    };

    const getLastName = pluckDeep('person.lastName');
    console.log(getLastName(obj)); // 输出: undefined，因为属性不存在
    ```

1.  **对象为空的情况：**

    ```js
    const obj = null;

    const getName = pluckDeep('person.name');
    console.log(getName(obj)); // 抛出错误: Invalid object provided
    ```

1.  **键值非字符串的情况：**

    ```js
    const obj = {
        person: {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                zipCode: '10001'
            }
        }
    };

    const getName = pluckDeep(123); // 键值为数字
    console.log(getName(obj)); // 抛出错误: Invalid key provided
    ```

1.  **动态属性路径的情况：**

    ```js
    const obj = {
        person: {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                zipCode: '10001'
            }
        },
        company: {
            name: 'Tech Corp',
            location: 'Silicon Valley'
        }
    };

    const getKey = pluckDeep('person.name');
    console.log(getKey(obj)); // 输出: 'John'

    const getKeyDynamic = pluckDeep('company.name');
    console.log(getKeyDynamic(obj)); // 输出: 'Tech Corp'
    ```

这些场景用例覆盖了函数在不同情况下的使用方式，并且验证了优化改进版的 `pluckDeep` 函数在这些情况下的表现是否符合预期。通过这些测试，可以确保函数的健壮性和灵活性。

当提取数组中对象的深层属性时，可以考虑多种情况来进行测试，以确保函数的健壮性和适用性。以下是一些可能的测试用例和说明：

1.  **单层属性提取：**

    ```js
    const arr = [{ name: 'Alice' }, { name: 'Bob' }];

    const getName = pluckDeep('0.name');
    console.log(getName(arr)); // 输出: 'Alice'
    ```

    这个测试用例用于验证函数在提取数组中对象的单层属性时的表现。函数应该可以正确地提取数组中第一个对象的 `name` 属性值，输出为 `'Alice'`。

1.  **多层属性提取：**

    ```js
    const arr = [{ a: { b: { c: 'Hello' } } }, { a: { b: { c: 'World' } } }];

    const getText = pluckDeep('0.a.b.c');
    console.log(getText(arr)); // 输出: 'Hello'
    ```

    这个测试用例用于验证函数在提取数组中对象的多层嵌套属性时的表现。函数应该可以正确地提取数组中第一个对象的 `a.b.c` 属性值，输出为 `'Hello'`。

1.  **属性不存在的情况：**

    ```js
    const arr = [{ a: 1 }, { b: 2 }];

    const getValue = pluckDeep('0.c');
    console.log(getValue(arr)); // 输出: undefined
    ```

    这个测试用例用于验证函数在提取不存在的属性时的表现。函数应该返回 `undefined`，表示属性不存在。

1.  **动态索引的情况：**

    ```js
    const arr = [{ data: 'One' }, { data: 'Two' }, { data: 'Three' }];

    const getIndex = pluckDeep('2.data');
    console.log(getIndex(arr)); // 输出: 'Three'
    ```

    这个测试用例用于验证函数在动态索引的情况下的表现。函数应该可以根据传入的动态索引提取数组中相应位置对象的属性值。

1.  **空数组和空对象的情况：**

    ```js
    const emptyArr = [];
    const emptyObj = {};

    const getValueFromEmpty = pluckDeep('0.name');
    console.log(getValueFromEmpty(emptyArr)); // 输出: undefined
    console.log(getValueFromEmpty(emptyObj)); // 输出: undefined
    ```

    这个测试用例用于验证函数在空数组或空对象上提取属性值时的表现。函数应该返回 `undefined`，表示无法提取属性值。

这些测试用例覆盖了函数在不同场景下提取数组中对象深层属性的情况，并且可以验证函数的健壮性和适用性。通过这些测试，可以确保函数在实际应用中能够正确地提取所需的属性值。