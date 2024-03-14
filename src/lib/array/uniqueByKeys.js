/**
 * @description 通过keys数组去重
 * @param {*} arr 
 * @param {*} arrKeys 
 * @returns 
 */
export default function uniqueByKeys(arr, arrKeys) {
    return arr.reduce((p, c, i) => {
        if (i) {
            !p.find((item) => arrKeys.every((k) => item[k] === c[k])) &&
                p.push(c);
        } else {
            p.push(c);
        }
        return p;
    }, []);
}