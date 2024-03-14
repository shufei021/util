/**
 * @description: 顺滑的滚动到当前元素
 * @param {Element} element
 * @param {Number} index: -1 倒数第一个
 */
 const smoothScroll = function (element, index) {
     try {
         let el = null
         if (typeof element === 'string') {
           if (index === undefined) {
             el = document.querySelector(element)
           } else {
             el = document.querySelectorAll(element)
             index = index === -1 ? el.length - 1 : index
             el && (el = el[index])
           }
         } else {
           if (element instanceof Element) {
             el = element
           } else if (element instanceof NodeList) {
             el = element[index===undefined?element.length - 1:index]
           }
         }
         el && el.scrollIntoView({ behavior: 'smooth' })
     } catch (e) {}
}
export default smoothScroll
