/**
 * @description 获取滚动方向
 * @param { Element | HTMLElement | Window | String} scroller 滚动容器元素
 * @returns Object {x,y}
 */
export declare function getScrollDirection(scroller?: Element | HTMLElement | Window | string): {
    x: boolean;
    y: boolean;
};
