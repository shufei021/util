/**
 * 生成一个 GUID（Globally Unique Identifier）
 * @returns {string} 生成的 GUID 字符串
 */
const guid = function () {
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
export default guid

  