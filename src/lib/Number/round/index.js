/**
 * 对数字进行四舍五入，并支持科学计数法和自定义精度。
 * @param {number|string} n - 要处理的数字，可以是数字或字符串形式的数字。
 * @param {number} dight - 要保留的小数位数，可以是整数或 undefined（表示保留所有小数位）。
 * @returns {number|string} - 返回处理后的数字，如果是科学计数法表示的数字，则返回字符串形式的结果。
 */
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
            const r = Math.round((n * (10 ** dotLen)) / (10 ** (dotLen - dight))) / (10 ** dight);
            return Number.isInteger(r) ?  r.toFixed(dight) : r;
        } else { // 处理整数
            // 保留小数位数
            return Number(n).toFixed(dight);
        }
    }
}
export default round