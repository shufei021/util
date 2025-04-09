interface HandleOptions {
    size?: string;
    width?: string;
    height?: string;
    borderColor?: string;
    backgroundColor?: string;
}
interface PropsOptions {
    className?: string;
    cssText?: string;
}
interface StyleOptions {
    canvas?: PropsOptions;
    container?: PropsOptions;
    square?: PropsOptions;
    content?: PropsOptions;
    lt?: PropsOptions;
    lm?: PropsOptions;
    lb?: PropsOptions;
    bm?: PropsOptions;
    br?: PropsOptions;
    rm?: PropsOptions;
    tm?: PropsOptions;
    rt?: PropsOptions;
    seq?: PropsOptions;
    del?: PropsOptions;
}
interface SquarePos {
    x?: string;
    y?: string;
    w?: string;
    h?: string;
}
interface ImgHotOptions {
    upperLimit: string | number;
    el: string | HTMLElement;
    customUpload?: boolean;
    addMode?: 'default' | 'manual';
    scaleMode?: 'auto' | 'fit';
    handle?: HandleOptions;
    style?: StyleOptions;
    squarePos?: SquarePos;
    beforeAdd?: (is: boolean) => void;
    afterAdd(arg0: {
        seq: number;
        square: HTMLElement;
    }): unknown;
    beforeDel?: (index: number, element: HTMLElement, callback: () => void) => void;
    overlapCallback?: (isOverlapping: boolean) => void;
    manualAdd?: (create: Function) => boolean;
    afterInit(): () => void;
}
declare class ImageHotSpot {
    private options;
    private container;
    private canvas;
    private isInit;
    private handleMouseDownFunc;
    private scale;
    private hotImgWidth;
    private hotImgHeight;
    private defaultProps;
    private squarePos;
    constructor(options: ImgHotOptions);
    init(): void;
    initDefaultProps(): void;
    initSquarePos(): void;
    resetInit(): void;
    generateContainer(): void;
    isNum(n: string | number): boolean;
    addHotArea({ x, y, w, h }: {
        x?: any;
        y?: any;
        w?: any;
        h?: any;
    } | undefined, isForceAdd: boolean): Promise<{
        index: number;
        square: HTMLElement;
    }>;
    createHotSquare(seq: number, props: {
        style: {
            left: any;
            top: any;
            width: any;
            height: any;
        };
    }): HTMLElement;
    createElement(tagName: string, ...args: any[]): HTMLElement;
    delHotArea(el: {
        closest: (arg0: string) => any;
    }): void;
    resetHotSeq(seq: number): void;
    handleMouseDown(e: MouseEvent): void;
    startDrag(e: {
        clientX: any;
        clientY: any;
    }, square: {
        offsetWidth: any;
        offsetHeight: any;
        style: {
            left: string;
            top: string;
        };
    }, className: any, content: HTMLElement | null): void;
    handleMouseMove(ev: MouseEvent, className: any, square: {
        offsetWidth: any;
        offsetHeight: any;
        style: {
            left: string;
            top: string;
        };
    }, startX: number, startY: number, startWidth: any, startHeight: any, startLeft: number, startTop: number, maxLeft: number, maxTop: number, minSize: number, containerWidth: number, containerHeight: number): void;
    moveSquare(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startLeft: number, startTop: number, deltaX: number, deltaY: number, maxLeft: number, maxTop: number): void;
    resizeLT(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: any, startHeight: any, startLeft: number, startTop: number, deltaX: number, deltaY: number, minSize: number, containerWidth: number, containerHeight: number): void;
    resizeLB(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: number, startHeight: any, startLeft: number, startTop: number, deltaX: number, deltaY: number, minSize: number, containerWidth: number, containerHeight: number): void;
    resizeRT(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: any, startHeight: any, startLeft: number, startTop: number, deltaX: number, deltaY: number, minSize: number, containerWidth: number, containerHeight: number): void;
    resizeBR(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: any, startHeight: any, startLeft: number, startTop: number, deltaX: number, deltaY: number, minSize: number, containerWidth: number, containerHeight: number): void;
    resizeLM(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: number, startLeft: number, deltaX: number, minSize: number, containerWidth: number): void;
    resizeRM(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startWidth: any, startLeft: number, deltaX: number, minSize: number, containerWidth: number): void;
    resizeTM(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startHeight: any, startTop: number, deltaY: number, minSize: number, containerHeight: number): void;
    resizeBM(square: {
        offsetWidth?: any;
        offsetHeight?: any;
        style: any;
    }, startHeight: any, startTop: number, deltaY: number, minSize: number, containerHeight: number): void;
    uploadHotImg(src: string): Promise<unknown>;
    scaleCalc(w: number, h: number, src: string, resolve: {
        (value: unknown): void;
        (arg0: {
            w: number;
            h: number;
            scale: number;
        }): void;
    }): void;
    hasBackgroundImage(): boolean;
    delImage(): void;
    destroy(): void;
    getMaxZIndex(): number;
    /***
     * @description: 校验热区之间是否重叠
     */
    areElementsOverlapping(container?: HTMLElement | null): boolean;
    getHotAreaData(mode?: "array" | "object"): Record<number, {
        x: number;
        y: number;
        w: number;
        h: number;
        index: number;
    }>;
}
export default ImageHotSpot;
