/**
 * @description 获取滚动方向
 * @param { Element | HTMLElement | Window | String} scroller 滚动容器元素
 * @returns Object {x,y}
 */
export function getScrollDirection(scroller: Element | HTMLElement | Window | string=window) {
    // 兼容 window 和 DOM 
    // @ts-ignore
    scroller = scroller === window ? window : typeof scroller ==='string'? document.querySelector(scroller) : scroller
    // @ts-ignore
    const scrollLeft = scroller === window ? scroller.scrollX : scroller.scrollLeft;
    // @ts-ignore
    const scrollTop = scroller === window ? scroller.scrollY : scroller.scrollTop;
    // @ts-ignore
    scroller = scroller === window ? getScrollDirection:scroller
    // 兼容 页面刷新 window scroll 的 x和y轴的滚动情况
    // @ts-ignore
    if(scroller.oldScrollLeft === undefined&&scroller.oldScrollTop === undefined && scrollTop && scrollLeft ){
       // @ts-ignore
        scroller.oldScrollLeft = 0;
        // @ts-ignore
        scroller.oldScrollTop = 0
        // @ts-ignore
        scroller.oldScrollLeft = scrollLeft;
        // @ts-ignore
        scroller.oldScrollTop = scrollTop;
        return { x: true, y: true}
    }
    // @ts-ignore
    if (scroller.oldScrollLeft === undefined) scroller.oldScrollLeft = 0;
    // @ts-ignore
    if (scroller.oldScrollTop === undefined) scroller.oldScrollTop = 0;
    // @ts-ignore
    const is = scroller.oldScrollTop !== scrollTop;
    // @ts-ignore
    scroller.oldScrollLeft = scrollLeft;
    // @ts-ignore
    scroller.oldScrollTop = scrollTop;
    return { x: !is, y: is };
}