# round（四舍五入）

最新round函数


```js
// 四舍五入到指定位数的函数
const round = function (n, dight) {
    // 将输入的数字转换为字符串
    n = Number(n).toString();

    // 如果是科学计算法
    if (n.includes('e')) {
        // 分离系数和指数
        let [coefficient, exponent] = n.split('e');

        // 如果系数是小数进行抹平
        if (coefficient.includes('.')) {
            const arr = coefficient.split('.');
            const dotLen = arr[1].length;
            exponent = exponent - dotLen;
            coefficient = coefficient.replace('.', '');
        }

        // 处理指数大于0的情况（整数部分）
        if (exponent > 0) {
            // 构造补零部分
            const end = '0'.repeat(exponent);
            // 合并系数和补零部分
            const rt = coefficient + end;
            // 如果指定保留小数位数，则返回带小数的结果
            if (dight) return rt + '.' + '0'.repeat(dight);
            // 如果补零位数大于系数位数，直接返回结果
            if (exponent > coefficient.length) return rt;
            // 补零位数小于等于系数位数，截取结果
            return (rt + '0'.repeat(dight)).slice(0, -1 * dight);
        } else if (exponent < 0) { // 处理指数小于0的情况（小数部分）
            // 补零形成小数
            n = '0.' + coefficient.padStart(-exponent, 0);
            // 如果未指定小数位数，直接返回结果
            if (dight === undefined) return n;
            // 四舍五入
            const r = (Math.round(n * 10 ** exponent / (10 ** (exponent - dight))) / 10 ** dight).toString();
            // 处理科学计数法结果
            if (r.includes('e')) {
                let [coefficient, exponent] = r.split('e'); 
                if (coefficient.includes('.')) {
                    const arr = coefficient.split('.');
                    const dotLen = arr[1].length;
                    exponent = exponent - dotLen;
                    coefficient = coefficient.replace('.', '');
                }
                // 返回补零形成的小数
                return '0.' + coefficient.padStart(-exponent, 0);
            } else {
                // 返回四舍五入后的结果
                return r;
            }
        }
    } else { // 非科学计算法
        if (n.includes('.')) { // 处理小数
            const arr = n.split('.');
            let dotLen = arr[1].length;
            // 补零保留小数位数
            if (dight > dotLen) return n.padEnd(n.length + dight - dotLen, '0');
            // 如果未指定小数位数，直接返回结果
            if (dight === undefined) return n;
            // 四舍五入
            return Math.round(n * 10 ** dotLen / (10 ** (dotLen - dight))) / 10 ** dight;
        } else { // 处理整数
            // 保留小数位数
            return Number(n).toFixed(dight);
        }
    }
}

```

测试用例

```js
console.log(round(11));
// 输出：11

console.log(round(11,2));
// 输出：11.00

console.log(round(1e20));
// 输出：100000000000000000000

console.log(round(1e-20));
// 输出：0.00000000000000000001

console.log(round(1.222e50));
// 输出：122200000000000000000000000000000000000000000000000

console.log(round(1.222e-20));
// 输出：0.00000000000000000001222

console.log(round(123.456));
// 输出：123.456

console.log(round(123.456, 0));
// 输出：123

console.log(round(123.456, 1));
// 输出：123.5

console.log(round(123.456, 2));
// 输出：123.46

console.log(round(123.456, 3));
// 输出：123.456

console.log(round(123.456, 4));
// 输出：123.4560

console.log(round(123.456, 5));
// 输出：123.45600

console.log(round(1e-8));
// 输出：0.00000001

console.log(round(1.23e5));
// 输出：123000.00

console.log(round(1.23e5,1));
// 输出：123000.0

console.log(round('1.23e5',2));
// 输出：123000.00

console.log(round(1.234567891234567e-16,20));
// 输出：0.00000000000000012346

console.log(round(123e+25,20));
// 输出：1230000000000000000000000000.00000000000000000000

```

```js
/**
 * 获取四舍五入到指定位数
 * @param {Number} n: 小数
 * @param {Number} decimals: 四舍五入到指定位数
 */
const round = function(n, decimals) {
    // 如果未提供要四舍五入到的位数，则直接返回原始数值
    if (decimals === undefined) return n;
    
    // 使用数学运算将数字四舍五入到指定的位数
    return Number(Math.round(n + 'e' + decimals) + 'e-' + decimals);
}
```
这段代码是一个 JavaScript 函数，用于将给定的小数四舍五入到指定的位数。下面是函数的解释：
>该函数接受两个参数：`n` 表示要进行四舍五入的小数，`decimals` 表示要保留的小数位数。如果 `decimals` 未提供，则返回原始数值 `n`。否则，使用数学运算将 `n` 四舍五入到指定的位数，并返回结果。

以下是一些测试用例，涵盖了各种场景：

1.  测试正常四舍五入：

```js
console.log(round(3.14159, 2)); // 3.14
console.log(round(10.567, 1));  // 10.6
console.log(round(123.456, 0)); // 123
```

2.  测试无需四舍五入的情况：

```js
console.log(round(5.0, 1));  // 5
console.log(round(100, 2));  // 100
console.log(round(7.89, 2)); // 7.89
```

3.  测试负数的情况：

```js
console.log(round(-3.14159, 2)); // -3.14
console.log(round(-10.567, 1));  // -10.6
console.log(round(-123.456, 0)); // -123
```

4.  测试不同位数的四舍五入：

```js
console.log(round(1234.5678, 3)); // 1234.568
console.log(round(987.654321, 5)); // 987.65432
```

5.  测试未提供要四舍五入到的位数的情况：

```js
console.log(round(3.14159)); // 3.14159
console.log(round(10.567));  // 10.567
console.log(round(123.456)); // 123.456
```

6.  测试非数字输入的情况：

```js
console.log(round('abc', 2)); // NaN
console.log(round(NaN, 2));    // NaN
console.log(round(undefined, 2)); // NaN
```

这些测试用例覆盖了正数、负数、整数、小数、不同的精度以及边界条件等情况，可以验证函数的正确性。



测试用例
```js
console.log(round(123.456))
console.log(round(123.456, 0))
console.log(round(123.456, 1))
console.log(round(123.456, 2))
console.log(round(123.456, 3))
console.log(round(123.456, 4))
console.log(round(123.456, 5))
console.log(round(1e-8))
console.log(round(1.23e5))
console.log(round(1.23e5,1))
console.log(round('1.23e5',2))
console.log(round(1.234567891234567e-16,20))
console.log(round(123e+25,20))

console.log(round(1.235, 2)); // 输出：1.24
console.log(round(1.234, 2)); // 输出：1.23
console.log(round(1.235e5, 2)); // 输出：1235000
console.log(round(1.234e5, 2)); // 输出：1234000
```
