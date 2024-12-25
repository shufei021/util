/**
 * @description: 获取html页面dom中最大的层级数
 * @return {Number}
 */
export function getMaxZIndex(): number {
    // 获取HTML中所有的DOM
    const divs = document.querySelectorAll('*')
    return Math.max(...Array.from(divs).map(i => parseInt(getComputedStyle(i).zIndex) || 1))
}