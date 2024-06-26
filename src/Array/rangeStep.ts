/**
 * 生成指定范围内指定步长的数组
 * @param {Number} start : 起始值
 * @param {Number} stop : 结束值
 * @param {Number} step : 步长
 */
export const rangeStep = function (start: number, stop: number, step: number) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
}