/**
 * 元素是否滚动到最底部
 * @param {Element|String} el 需要检测的元素
 * @return {Boolean} true: 是，false: 否
 * @return {Number} offset 偏差
 */
const isScrollBottom = (el, offset) => {
    el = typeof el === "string" ? document.querySelector(el) : el;
    if(el){
        const diff = el.scrollHeight - el.scrollTop - el.clientHeight
        return offset ? diff < offset : diff === 0;
    } else {
        return false
    }
};

export default isScrollBottom;
