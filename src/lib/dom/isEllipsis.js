
/**
 * @description: 内容是否超出省略
 * @param {Element} el
 */
const isEllipsis = function (el) {
    try{
        el = typeof el === 'string' ? document.querySelector(el):el
        return el && (el.scrollHeight !== el.offsetHeight || el.scrollWidth !== el.offsetWidth);
    }catch(e){}
};

export default isEllipsis;
