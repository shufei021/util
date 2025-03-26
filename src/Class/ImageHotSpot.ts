// 定义一个接口，用于处理选项
interface HandleOptions {
    // 尺寸
    size?: string;
    // 宽度
    width?: string;
    // 高度
    height?: string;
    // 边框颜色
    borderColor?: string;
    // 背景颜色
    backgroundColor?: string;
}


// 定义一个接口PropsOptions，用于定义组件的属性选项
interface PropsOptions {
    // 类名
    className?: string;
    // 可选的CSS文本
    cssText?: string;
}

// 定义一个接口StyleOptions，用于定义样式选项
interface StyleOptions {
    // 画布样式选项
    canvas?: PropsOptions;
    // 容器样式选项
    container?: PropsOptions;
    // 方块样式选项
    square?: PropsOptions;
    // 内容样式选项
    content?: PropsOptions;
    // 左上角样式选项
    lt?: PropsOptions;
    // 左中样式选项
    lm?: PropsOptions;
    // 左下角样式选项
    lb?: PropsOptions;
    // 下中样式选项
    bm?: PropsOptions;
    // 右下角样式选项
    br?: PropsOptions;
    // 右中样式选项
    rm?: PropsOptions;
    // 上中样式选项
    tm?: PropsOptions;
    // 右上角样式选项
    rt?: PropsOptions;
    // 序列样式选项
    seq?: PropsOptions;
    // 删除样式选项
    del?: PropsOptions;
  }
  // 定义一个接口SquarePos，用于定义方块的位置
  interface SquarePos {
    // 方块的x坐标
    x?: string;
    // 方块的y坐标
    y?: string;
    // 方块的宽度
    w?: string;
    // 方块的高度
    h?: string;
}

// 定义一个接口ImgHotOptions，用于配置图片热区插件
interface ImgHotOptions {
   
    // el：图片热区插件的容器，可以是字符串或HTMLElement类型
    el: string | HTMLElement;
    // customUpload：是否自定义上传，默认为false
    customUpload?: boolean;
    // addMode：添加模式，默认为'default'，可选值为'default'或'manual'
    addMode?: 'default' | 'manual';
    // scaleMode：缩放模式，默认为'auto'，可选值为'auto'或'fit'
    scaleMode?: 'auto' | 'fit';
    // handle：拖拽手柄的配置，类型为HandleOptions
    handle?: HandleOptions;
    // style：样式配置，类型为StyleOptions
    style?: StyleOptions;
    // squarePos：正方形位置，类型为SquarePos
    squarePos?: SquarePos;
    // beforeAdd：添加前的回调函数
    beforeAdd?: () => void;
    // afterAdd：添加后的回调函数，参数为索引、元素和回调函数
    afterAdd(arg0: { index: number; square: HTMLElement; }): unknown;
    // beforeDel：删除前的回调函数，参数为索引、元素和回调函数
    beforeDel?: (index: number, element: HTMLElement, callback: () => void) => void;
    // overlapCallback：重叠时的回调函数，参数为是否重叠
    overlapCallback?: (isOverlapping: boolean) => void;
    // 手动添加函数
    manualAdd?: (create:Function) => void;
}

 class ImageHotSpot {
    // 定义一个私有变量options，类型为ImgHotOptions
    private options: ImgHotOptions;
    // 定义一个私有变量container，类型为HTMLElement或null
    private container: HTMLElement | null = null;
    // 定义一个私有变量canvas，类型为HTMLElement或null
    private canvas: HTMLElement | null = null;
    // 定义一个私有变量isInit，类型为boolean，默认值为false
    private isInit: boolean = false;
    // 定义一个私有变量handleMouseDownFunc，类型为(e: MouseEvent) => void
    private handleMouseDownFunc: (event: MouseEvent) => void = (event) => {};
    // 定义一个私有变量scale，类型为number，默认值为1
    private scale: number = 1;
    // 定义一个私有变量hotImgWidth，类型为number
    private hotImgWidth: number = 0;
    // 定义一个私有变量hotImgHeight，类型为number
    private hotImgHeight: number = 0;
    // 定义一个私有变量defaultProps，类型为any
    private defaultProps: any;
    // 定义一个私有变量squarePos，类型为any
    private squarePos: any;
    constructor(options: ImgHotOptions) {
      // 构造函数，接收一个参数options
      this.options = options;
      // 调用init方法
      this.init();
    }
  
    // Initialize instance
    // 初始化方法
    init() {
      // 如果options.el是字符串，则获取该字符串对应的DOM元素，否则直接赋值给container
      this.container = typeof this.options.el === "string" ? document.querySelector(this.options.el): this.options.el;
      // 如果container不存在，则抛出错误
      if (!this.container) {
        throw new Error(`${this.options.el || ""} container is not found`);
      }
      // 如果options.addMode不存在，则默认为"default"
      this.options.addMode = this.options.addMode || "default";
      // 初始化默认属性
      this.initDefaultProps()
      // 初始化正方形位置
      this.initSquarePos();
      // 如果options.customUpload不等于true，则重置初始化
      if (this.options.customUpload !== true) {
        this.resetInit();
      }
    }
  
    // 初始化默认配置属性
    initDefaultProps(){
      // size 存在就使用size，否则使用width和height
      // 从this.options?.handle中解构出size、width、height、borderColor、backgroundColor
      const {size, width='8px', height='8px', borderColor='#1447FF', backgroundColor='#1447FF'} = this.options?.handle || {}
      // 定义handleCommonStyle，包含position、border、background-color、box-sizing、width、height
      const handleCommonStyle = `position: absolute;border: 1px solid ${borderColor};background-color: ${backgroundColor};box-sizing: border-box;width: ${size || width};height: ${size || height};`
      // 定义this.defaultProps，包含canvas、container、square、content、lt、lm、lb、bm、br、rm、tm、rt、seq、del
      this.defaultProps = {
        canvas: {
          className: "hot-container",
          cssText: `width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;`,
          ...(this.options?.style?.canvas || {}),
        },
        // 热区最外层容器默认样式
        container: {
          className: "hot-container",
          cssText: `width: 100%; height: 100%; position: relative;`,
          ...(this.options?.style?.container || {}),
        },
        // 热区包裹默认样式
        square:{
          className: "hot-square",
          cssText: `width: 88px; height: 88px; background-color: rgba(20, 71, 255, 0.2); border: 1px dashed ${borderColor}; cursor: move; position: absolute; left: 0px; top: 0px; opacity: 1; box-sizing: border-box;`,
          ...(this.options?.style?.square || {})
        },
        // 热区内容元素默认样式
        content: {
          className: "hot-content",
          cssText:`display:none`,
          ...(this.options?.style?.content || {}),
        },
        lt:{
          className: "lt",
          cssText:`${handleCommonStyle}cursor: nw-resize;top: -4px;left: -4px;`,
          ...(this.options?.style?.lt || {}),
        },
        lm:{
          className: "lm",
          cssText:`${handleCommonStyle}cursor: e-resize;top: 50%;left: -4px;transform: translateY(-50%);`,
          ...(this.options?.style?.lm || {}),
        },
        lb:{
          className: "lb",
          cssText:`${handleCommonStyle}cursor: ne-resize;bottom: -4px;left: -4px;`,
          ...(this.options?.style?.lb || {}),
        },
        bm:{
          className: "bm",
          cssText:`${handleCommonStyle}cursor: n-resize;bottom: -4px;left: 50%;transform: translateX(-50%);`,
          ...(this.options?.style?.bm || {}),
        },
        br:{
          className: "br",
          cssText:`${handleCommonStyle}cursor: se-resize;bottom: -4px;right: -4px;`,
          ...(this.options?.style?.br || {}),
        },
        rm:{
          className: "rm",
          cssText:`${handleCommonStyle}cursor: e-resize;top: 50%;right: -4px;transform: translateY(-50%);`,
          ...(this.options?.style?.rm || {}),
        },
        tm:{
          className: "tm",
          cssText:`${handleCommonStyle}cursor: n-resize;top: -4px;left: 50%;transform: translateX(-50%);`,
          ...(this.options?.style?.tm || {}),
        },
        rt:{
          className: "rt",
          cssText:`${handleCommonStyle}cursor: ne-resize;top: -4px;right: -4px;`,
          ...(this.options?.style?.rt || {}),
        },
        // 热区里面元素默认样式
        seq: {
          className: "hot-seq",
          cssText: `min-width: 14px; min-height: 14px; text-align: center; color: #fff; line-height: 14px; position: absolute; top: 0px; left: 0px; background-color: red; font-size: 10px;z-index:-1;cursor:default`,
          ...(this.options?.style?.seq || {}),
        },
        del: {
          className: "hot-del",
          cssText: `width: 16px; height: 16px; position: absolute; right: -20px; top: -20px; z-index: 2; cursor: pointer;`,
          ...(this.options?.style?.del || {}),
        }
      }
    }
  
    // 初始化正方形位置
    initSquarePos(){
      // 将正方形位置初始化为一个对象，包含x、y、w、h四个属性
      this.squarePos = {
        x: 0,
        y: 0,
        w: 80,
        h: 80,
        // 如果options中存在squarePos属性，则将其合并到squarePos对象中
        ...(this.options.squarePos || {}),
      };
    }
  
    // 重置初始化
    resetInit() {
      // 将isInit设置为true
      this.isInit = true;
      // 生成容器
      this.generateContainer();
      // 绑定handleMouseDown函数
      this.handleMouseDownFunc = this.handleMouseDown.bind(this);
      // 添加mousedown事件监听器
      this.canvas!.addEventListener("mousedown", this.handleMouseDownFunc);
    }
  
    // Generate hot area container
    // 生成热区容器
    generateContainer() {
      // 创建一个div元素，并设置其属性为this.defaultProps.canvas
      const canvas = this.createElement("div", {...this.defaultProps.canvas });
      // 将canvas元素添加到this.container中
      this.container?.appendChild(canvas);
      // 将canvas元素赋值给this.canvas
      this.canvas = canvas;
    }
  
    // Add hot area
    addHotArea({ x = this.squarePos.x, y = this.squarePos.y, w = this.squarePos.w, h = this.squarePos.h } = {},isForceAdd: boolean) {
     if(this.options.addMode === 'default' || isForceAdd){
       // 添加热区先检测热区画布容器存在不
       if (!this.canvas) {
         this.options?.beforeAdd?.();
         return Promise.reject(new Error("Please initialize the instance first"));
       }
       if(!this.container) return Promise.reject(new Error("Please initialize the instance first"));
       const seq = this.container.querySelectorAll(".hot-square").length + 1;
       const square = this.createHotSquare(seq,{style:{ left: parseFloat(x) + "px" , top: parseFloat(y) + "px", width: parseFloat(w) + "px", height: parseFloat(h) + "px" }});
       this.canvas.appendChild(square);
       this.options?.afterAdd?.({ index: seq, square });
       return Promise.resolve({ index: seq, square });
     }else{
       return Promise.reject(new Error("options addMode is not default"));
     }
    }
  
    // Create hot square element
    createHotSquare(seq: number, props: { style: { left: any; top: any; width: any; height: any; }; }) {
      return this.createElement("div", {...this.defaultProps.square, ...props },
        [this.createElement('div',{...this.defaultProps.content},
          this.createElement('div',{...this.defaultProps.lt}),
          this.createElement('div',{...this.defaultProps.lm}),
          this.createElement('div',{...this.defaultProps.lb}),
          this.createElement('div',{...this.defaultProps.bm}),
          this.createElement('div',{...this.defaultProps.br}),
          this.createElement('div',{...this.defaultProps.rm}),
          this.createElement('div',{...this.defaultProps.rt}),
          this.createElement('div',{...this.defaultProps.tm}),
          this.createElement('div',{...this.defaultProps.del},  this.createElement('div',{className:'lines', cssText: ` width: 16px;height: 16px;position: relative;cursor: pointer;border-radius: 50%;background: #ff4b4b;transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);display: flex;align-items: center;justify-content: center;`}, [
            this.createElement('div',{className:'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(45deg);`}),
            this.createElement('div',{className:'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(-45deg);`}),
          ]))
        ),
        this.createElement('div',{...this.defaultProps.seq}, seq),
      ])
    }
  
    createElement(tagName:string, ...args:any[]) {
        // 处理参数解析（支持省略props）
        const props = typeof args[0] === 'object' && !Array.isArray(args[0]) 
          ? args.shift() 
          : {};
      let children = args.flat(Infinity);
  
      const element = document.createElement(tagName);
  
      // 新增 cssText 处理逻辑
      const handleStyleAttributes = (element: HTMLElement, props: { cssText: string; style: object; }) => {
          // 先处理 cssText
          if (props.cssText) {
              element.style.cssText = props.cssText;
              Reflect.deleteProperty(props, 'cssText'); // 处理完就删除避免重复处理
          }
  
          // 处理常规 style 属性
          if (props.style) {
              if (typeof props.style === 'string') {
                  element.style.cssText = props.style;
              } else if (typeof props.style === 'object') {
                  Object.assign(element.style, props.style);
              }
              Reflect.deleteProperty(props, 'style')
          }
      };
  
      // 在属性处理前先处理样式相关属性
      handleStyleAttributes(element, props);
  
        // 处理属性配置
        for (const [key, value] of Object.entries(props)) {
            // 处理className
            if (key === 'className' && typeof value === 'string') {
                element.className = value;
                continue;
            }
  
            // 处理htmlFor
            if (key === 'htmlFor' && typeof value === 'string') {
                element.setAttribute('for', value);
                continue;
            }
  
            // 处理事件监听器（onClick等形式）
            if (/^on[A-Z]/.test(key) && typeof value === 'function') {
                const eventType = key.slice(2).toLowerCase() as keyof HTMLElementEventMap;;
                element.addEventListener(eventType, value as EventListener);
                continue;
            }
  
            // 处理style对象
            if (key === 'style') {
                if (typeof value === 'object') {
                    Object.assign(element.style, value);
                } else if (typeof value === 'string') {
                    element.style.cssText = value;
                }
                continue;
            }
  
            // 处理布尔属性
            if (typeof value === 'boolean') {
                value ? element.setAttribute(key, '') : element.removeAttribute(key);
                continue;
            }
  
            // 默认属性处理
            element.setAttribute(key, value as any);
        }
  
        // 处理子节点
        children = children.flat(Infinity).filter(child => {
            // 过滤无效节点
            return child !== null && child !== undefined && child !== false;
        }).map(child => {
            // 转换原始值为文本节点
            return typeof child === 'string' || typeof child === 'number'
                ? document.createTextNode(String(child))
                : child;
        });
  
        // 添加子节点
        children.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else {
                console.warn('Invalid child element:', child);
            }
        });
  
        return element;
    }
  
    // Delete hot area
    delHotArea(el: { closest: (arg0: string) => any; }) {
      const squareItem = el.closest(".hot-square");
      if (squareItem) {
        const index = squareItem.querySelector(".hot-seq").innerText * 1;
        const delFunc = () => {
          squareItem.remove();
          this.resetHotSeq(index);
        };
        if (typeof this.options.beforeDel === "function") {
          this.options.beforeDel(index, squareItem, delFunc);
        } else {
          delFunc();
        }
      }
    }
  
    // Reset hot area index
    resetHotSeq(idx: number) {
        if(!this.container) return
        const squares = this.container.querySelectorAll(".hot-square");
        squares.forEach((item) => {
            const indexContent: HTMLElement | null = item.querySelector(".hot-seq");
            if (indexContent) {
                const itemIndex = Number(indexContent.innerText);
                if (itemIndex > idx) {
                    indexContent.innerText = String(itemIndex - 1);
                }
            }
        });
    }
  
    // Mouse down event
    handleMouseDown(e: MouseEvent) {
      e.preventDefault(); // Prevent default behavior
      if(!this.canvas) return 
      const { target } = e;
      const className = (target as HTMLElement).className;
      const delItem = (target as HTMLElement).closest(".hot-del");
      if (delItem) return this.delHotArea(delItem);
      let content: HTMLElement | null = null;
      if (
        ["lt", "lm", "lb", "bm", "br", "rm", "rt", "tm", "hot-square"].includes(
          className
        )
      ) {
        const square =
          className === "hot-square" ? target : (target as HTMLElement).closest(".hot-square");
        const existContent: HTMLElement | null = this.canvas.querySelector(".hot-active");
        if (existContent && existContent.parentElement !== square) {
          existContent.classList.remove("hot-active");
          existContent.style.display = "none";
        }
        
        content= (square as HTMLElement).querySelector(".hot-content");
        if (content && !content.classList.contains("hot-active")) {
          content.classList.add("hot-active");
          content.style.display = "block";
          (square as HTMLElement).style.zIndex = String(this.getMaxZIndex() + 1);
        }
        this.startDrag(e, (square as HTMLElement), className, content);
      } else if(className === "hot-container" && this.options.addMode === 'manual'){
        const pos = this.canvas.getBoundingClientRect()
        const dix =  pos.left;
        const diy =  pos.top;
        let recordX = e.clientX - dix;
        let recordY = e.clientY - diy;
        const square = this.createElement("div", {className:"hot-line",style:{left:recordX + "px",top:recordY + "px",width:"0px",height:"0px",border:"1px solid red", boxSizing:'border-box',position:'absolute'} });
        this.canvas.appendChild(square);
        let width = 0;
        let height = 0;
        const squareLeft = square.offsetLeft;
        const squareTop = square.offsetTop;
        const maxWidth = this.canvas.offsetWidth - squareLeft;
        const maxHeight = this.canvas.offsetHeight -  squareTop;
        const squareWidth = square.offsetWidth
        const squareHeight = square.offsetHeight
        document.onmousemove = (ev) => {
          const { clientX, clientY } = ev;
          const deltaX = e.clientX - clientX;
          const deltaY = e.clientY - clientY;
          const w = clientX - dix - recordX;
          const h = clientY - diy - recordY;
          let _w = w
          let _h = h
          if(clientX < e.clientX){
            _w = squareWidth + deltaX
            _w = _w > squareLeft ? squareLeft : _w
            recordX = clientX - dix
            recordX = recordX < 0 ? 0 : recordX
          } else{
            _w = w > maxWidth ? maxWidth : w
          }
          if(clientY < e.clientY){
             _h = squareHeight + deltaY
             _h = _h > squareTop ? squareTop : _h
            recordY = clientY - diy
            recordY = recordY < 0 ? 0 : recordY
          } else{
            _h = h > maxHeight? maxHeight: h
          }
          square.style.left = recordX + "px";
          square.style.top = recordY + "px";
          square.style.width = _w + "px";
          square.style.height = _h + "px";
          width = _w
          height = _h
        };
        document.onmouseup = (e) => {
          square && this.canvas?.removeChild(square);
          const creat: Function = ()=> this.addHotArea({
            x: recordX + 'px',
            y: recordY+ 'px',
            w: width+ 'px',
            h: height+ 'px',
          },true)
          if(width> 16 && height > 16 && this.options?.manualAdd?.(creat)){
            creat()
          }
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  
    // Start drag event
    startDrag(e: { clientX: any; clientY: any; }, square: { offsetWidth: any; offsetHeight: any; style: { left: string; top: string; }; }, className: any, content: HTMLElement | null) {
      const { clientX: startX, clientY: startY } = e;
      const startWidth = square.offsetWidth;
      const startHeight = square.offsetHeight;
      const startLeft = parseInt(square.style.left) || 0;
      const startTop = parseInt(square.style.top) || 0;
      const containerWidth = this.canvas?.offsetWidth || 0;
      const containerHeight = this.canvas?.offsetHeight || 0;
      const maxLeft = containerWidth - startWidth;
      const maxTop = containerHeight - startHeight;
      const minSize = 20;
  
      document.onmousemove = (ev) => {
        this.handleMouseMove(
          ev,
          className,
          square,
          startX,
          startY,
          startWidth,
          startHeight,
          startLeft,
          startTop,
          maxLeft,
          maxTop,
          minSize,
          containerWidth,
          containerHeight
        );
      };
  
      document.onmouseup = () => {
        this.options?.overlapCallback?.(this.areElementsOverlapping(this.canvas));
        if (content) (content as HTMLElement).style.opacity = '1';
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  
    // Handle mouse move event
    handleMouseMove(
      ev: MouseEvent,
      className: any,
      square: { offsetWidth: any; offsetHeight: any; style: { left: string; top: string; }; },
      startX: number,
      startY: number,
      startWidth: any,
      startHeight: any,
      startLeft: number,
      startTop: number,
      maxLeft: number,
      maxTop: number,
      minSize: number,
      containerWidth: number,
      containerHeight: number
    ) {
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;
  
      switch (className) {
        case "hot-square":
          this.moveSquare(
            square,
            startLeft,
            startTop,
            deltaX,
            deltaY,
            maxLeft,
            maxTop
          );
          break;
        case "lt":
          this.resizeLT(
            square,
            startWidth,
            startHeight,
            startLeft,
            startTop,
            deltaX,
            deltaY,
            minSize,
            containerWidth,
            containerHeight
          );
          break;
        case "lb":
          this.resizeLB(
            square,
            startWidth,
            startHeight,
            startLeft,
            startTop,
            deltaX,
            deltaY,
            minSize,
            containerWidth,
            containerHeight
          );
          break;
        case "rt":
          this.resizeRT(
            square,
            startWidth,
            startHeight,
            startLeft,
            startTop,
            deltaX,
            deltaY,
            minSize,
            containerWidth,
            containerHeight
          );
          break;
        case "br":
          this.resizeBR(
            square,
            startWidth,
            startHeight,
            startLeft,
            startTop,
            deltaX,
            deltaY,
            minSize,
            containerWidth,
            containerHeight
          );
          break;
        case "lm":
          this.resizeLM(
            square,
            startWidth,
            startLeft,
            deltaX,
            minSize,
            containerWidth
          );
          break;
        case "rm":
          this.resizeRM(
            square,
            startWidth,
            startLeft,
            deltaX,
            minSize,
            containerWidth
          );
          break;
        case "tm":
          this.resizeTM(
            square,
            startHeight,
            startTop,
            deltaY,
            minSize,
            containerHeight
          );
          break;
        case "bm":
          this.resizeBM(
            square,
            startHeight,
            startTop,
            deltaY,
            minSize,
            containerHeight
          );
          break;
      }
    }
  
    // Move square
    moveSquare(square: { offsetWidth?: any; offsetHeight?: any; style: any; }, startLeft: number, startTop: number, deltaX: number, deltaY: number, maxLeft: number, maxTop: number) {
      const newLeft = Math.max(0, Math.min(startLeft + deltaX, maxLeft));
      const newTop = Math.max(0, Math.min(startTop + deltaY, maxTop));
      square.style.left = `${newLeft}px`;
      square.style.top = `${newTop}px`;
    }
  
    // Resize functions for each handle
    resizeLT(
      square: { offsetWidth?: any; offsetHeight?: any; style: any; },
      startWidth: any,
      startHeight: any,
      startLeft: number,
      startTop: number,
      deltaX: number,
      deltaY: number,
      minSize: number,
      containerWidth: number,
      containerHeight: number
    ) {
      deltaY = -deltaY;
      deltaX = -deltaX;
      let newWidth = startWidth + deltaX;
      let newLeft = startLeft - deltaX;
      let newHeight = startHeight + deltaY;
      let newTop = startTop - deltaY;
  
      if (newWidth < minSize) {
        newWidth = minSize;
        newLeft = startLeft + startWidth - minSize;
      }
      if (newLeft < 0) {
        newLeft = 0;
        newWidth = startWidth + startLeft;
      }
      if (newLeft + newWidth > containerWidth) {
        newWidth = containerWidth - newLeft;
      }
  
      if (newHeight < minSize) {
        newHeight = minSize;
        newTop = startTop + startHeight - minSize;
      }
      if (newTop < 0) {
        newTop = 0;
        newHeight = startHeight + startTop;
      }
      if (newTop + newHeight > containerHeight) {
        newHeight = containerHeight - newTop;
      }
  
      square.style.width = `${newWidth}px`;
      square.style.height = `${newHeight}px`;
      square.style.left = `${newLeft}px`;
      square.style.top = `${newTop}px`;
    }
  
    resizeLB(
      square: { offsetWidth?: any; offsetHeight?: any; style: any; },
      startWidth: number,
      startHeight: any,
      startLeft: number,
      startTop: number,
      deltaX: number,
      deltaY: number,
      minSize: number,
      containerWidth: number,
      containerHeight: number
    ) {
      let newWidth = startWidth - deltaX;
      let newLeft = startLeft + deltaX;
      let newHeight = startHeight + deltaY;
  
      if (newWidth < minSize) {
        newWidth = minSize;
        newLeft = startLeft + (startWidth - minSize);
      }
      if (newLeft < 0) {
        newLeft = 0;
        newWidth = startWidth + startLeft;
      }
      if (newLeft + newWidth > containerWidth) {
        newWidth = containerWidth - newLeft;
      }
  
      if (newHeight < minSize) {
        newHeight = minSize;
      }
      if (startTop + newHeight > containerHeight) {
        newHeight = containerHeight - startTop;
      }
  
      square.style.width = `${newWidth}px`;
      square.style.left = `${newLeft}px`;
      square.style.height = `${newHeight}px`;
    }
  
    resizeRT(
      square: { offsetWidth?: any; offsetHeight?: any; style: any; },
      startWidth: any,
      startHeight: any,
      startLeft: number,
      startTop: number,
      deltaX: number,
      deltaY: number,
      minSize: number,
      containerWidth: number,
      containerHeight: number
    ) {
      deltaY = -deltaY;
      let newWidth = startWidth + deltaX;
      let newHeight = startHeight + deltaY;
      let newTop = startTop - deltaY;
  
      if (newWidth < minSize) {
        newWidth = minSize;
      }
      if (startLeft + newWidth > containerWidth) {
        newWidth = containerWidth - startLeft;
      }
  
      if (newHeight < minSize) {
        newHeight = minSize;
        newTop = startTop + startHeight - minSize;
      }
      if (newTop < 0) {
        newTop = 0;
        newHeight = startHeight + startTop;
      }
      if (newTop + newHeight > containerHeight) {
        newHeight = containerHeight - newTop;
      }
  
      square.style.width = `${newWidth}px`;
      square.style.height = `${newHeight}px`;
      square.style.top = `${newTop}px`;
    }
  
    resizeBR(
      square: { offsetWidth?: any; offsetHeight?: any; style: any; },
      startWidth: any,
      startHeight: any,
      startLeft: number,
      startTop: number,
      deltaX: number,
      deltaY: number,
      minSize: number,
      containerWidth: number,
      containerHeight: number
    ) {
      let newWidth = startWidth + deltaX;
      let newHeight = startHeight + deltaY;
  
      if (newWidth < minSize) newWidth = minSize;
      if (startLeft + newWidth > containerWidth) {
        newWidth = containerWidth - startLeft;
      }
  
      if (newHeight < minSize) newHeight = minSize;
      if (startTop + newHeight > containerHeight) {
        newHeight = containerHeight - startTop;
      }
  
      square.style.width = `${newWidth}px`;
      square.style.height = `${newHeight}px`;
    }
  
    resizeLM(square: { offsetWidth?: any; offsetHeight?: any; style: any; }, startWidth: number, startLeft: number, deltaX: number, minSize: number, containerWidth: number) {
      let newWidth = startWidth - deltaX;
      let newLeft = startLeft + deltaX;
  
      if (newWidth < minSize) {
        newWidth = minSize;
        newLeft = startLeft + (startWidth - minSize);
      }
      if (newLeft < 0) {
        newLeft = 0;
        newWidth = startWidth + startLeft;
      }
      if (newLeft + newWidth > containerWidth) {
        newWidth = containerWidth - newLeft;
      }
  
      square.style.width = `${newWidth}px`;
      square.style.left = `${newLeft}px`;
    }
  
    resizeRM(square: { offsetWidth?: any; offsetHeight?: any; style: any; }, startWidth: any, startLeft: number, deltaX: number, minSize: number, containerWidth: number) {
      let newWidth = startWidth + deltaX;
  
      if (newWidth < minSize) {
        newWidth = minSize;
      }
      if (startLeft + newWidth > containerWidth) {
        newWidth = containerWidth - startLeft;
      }
  
      square.style.width = `${newWidth}px`;
    }
  
    resizeTM(square: { offsetWidth?: any; offsetHeight?: any; style: any; }, startHeight: any, startTop: number, deltaY: number, minSize: number, containerHeight: number) {
      deltaY = -deltaY;
      let newHeight = startHeight + deltaY;
      let newTop = startTop - deltaY;
  
      if (newHeight < minSize) {
        newHeight = minSize;
        newTop = startTop + startHeight - minSize;
      }
      if (newTop < 0) {
        newTop = 0;
        newHeight = startHeight + startTop;
      }
      if (newTop + newHeight > containerHeight) {
        newHeight = containerHeight - newTop;
      }
  
      square.style.height = `${newHeight}px`;
      square.style.top = `${newTop}px`;
    }
  
    resizeBM(square: { offsetWidth?: any; offsetHeight?: any; style: any; }, startHeight: any, startTop: number, deltaY: number, minSize: number, containerHeight: number) {
      let newHeight = startHeight + deltaY;
  
      if (newHeight < minSize) newHeight = minSize;
      if (startTop + newHeight > containerHeight) {
        newHeight = containerHeight - startTop;
      }
  
      square.style.height = `${newHeight}px`;
    }
  
    // Upload hot area image
    uploadHotImg(src: string) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.style.cssText = "position:absolute;left:0;top:0;opacity:0";
        this.container?.appendChild(img);
        img.onload = () => {
          this.scaleCalc(img.offsetWidth, img.offsetHeight, src, resolve);
  
          img.remove();
        };
        img.onerror = () => {
          img.remove();
          reject(new Error("Image load error"));
        };
      });
    }
  
    // Scale calculation
    scaleCalc(w: number, h: number, src: string, resolve: { (value: unknown): void; (arg0: { w: number; h: number; scale: number; }): void; }) {
      if (!this.isInit) this.resetInit();
      if(!this.container || !this.canvas) return
      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        this.container;
      const imageAspectRatio = w / h;
      const containerAspectRatio = containerWidth / containerHeight;
      let scale;
  
      if (
        this.options.scaleMode === "auto" &&
        w < containerWidth &&
        h < containerHeight
      ) {
        scale = 1;
      } else {
        if (imageAspectRatio > containerAspectRatio) {
          scale = containerWidth / w;
        } else {
          scale = containerHeight / h;
        }
      }
  
      this.canvas.style.cssText = `
        position: absolute;
        width: ${w * scale}px;
        height: ${h * scale}px;
        background-image: url(${src});
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        box-sizing: border-box;
        border: 1px dashed #ccc;
      `;
      const canvasStyle = this.options?.style?.canvas || {};
      
      // 覆盖默认的画布样式
      Object.keys(canvasStyle).forEach((k:string) => {
        if( this.canvas){
            (this.canvas.style as any)[k] = (canvasStyle as any)[k]
        }
      });
      this.scale = scale;
      this.hotImgWidth = w * scale;
      this.hotImgHeight = h * scale;
      resolve({ w: this.hotImgWidth, h: this.hotImgHeight, scale: this.scale });
    }
  
    // Destroy instance
    destroy() {
      this.container?.querySelectorAll(".hot-square").forEach((i) => i.remove());
      this.canvas?.remove();
      this.canvas = null;
      this.isInit = false;
      this.container?.removeEventListener("mousedown", this.handleMouseDownFunc);
    }
  
    // Get maximum z-index
    getMaxZIndex() {
      const divs = this.container?.querySelectorAll(".hot-square");
      if(divs?.length){
          return Math.max(
            ...Array.from(divs).map((i) => parseInt(getComputedStyle(i).zIndex) || 1)
          );
      }
      return 1
    }
    /***
     * @description: 校验热区之间是否重叠
     */
    areElementsOverlapping(container = this.canvas) {
        if(!container) return false
      // 获取容器的所有子元素
      const children = container.querySelectorAll(".hot-square");
      const length = children.length;
  
      // 遍历每个子元素
      for (let i = 0; i < length; i++) {
        const rect1 = children[i].getBoundingClientRect();
  
        // 遍历剩余的子元素进行比较
        for (let j = i + 1; j < length; j++) {
          const rect2 = children[j].getBoundingClientRect();
  
          // 检查是否有重叠
          if (
            !(
              rect2.left > rect1.right ||
              rect2.right < rect1.left ||
              rect2.top > rect1.bottom ||
              rect2.bottom < rect1.top
            )
          ) {
            return true; // 有重叠
          }
        }
      }
      return false; // 无重叠
    }
  
  
    // mode: array | object
    getHotAreaData(mode: "array" | "object" = "array") {
        const container = this.container as HTMLElement;
        const list = container.querySelectorAll<HTMLElement>(".hot-square");
        const hotSquares = Array.from(list);
      
        return hotSquares.reduce(
          (acc, current) => {
            const seqElement = current.querySelector<HTMLElement>(".hot-seq");
            if (!seqElement) return acc;
      
            const index = parseInt(seqElement.innerText) - 1;
            const x = parseFloat(current.style.left || "0");
            const y = parseFloat(current.style.top || "0");
      
            if (mode === "array") {
              // 类型保护：确保在数组模式下操作
              const arrAcc = acc as { x: number; y: number; w: number; h: number; index: number }[];
              if (index < arrAcc.length) {
                arrAcc[index] = { x, y, w: current.offsetWidth, h: current.offsetHeight, index };
              } else {
                console.warn(`Index ${index} exceeds array length`);
              }
              return arrAcc;
            } else {
              // 类型保护：确保在对象模式下操作
              const objAcc = acc as Record<number, { x: number; y: number; w: number; h: number; index: number }>;
              objAcc[index] = { x, y, w: current.offsetWidth, h: current.offsetHeight, index };
              return objAcc;
            }
          },
          mode === "array" 
            ? ([] as { x: number; y: number; w: number; h: number; index: number }[])
            : ({} as Record<number, { x: number; y: number; w: number; h: number; index: number }>)
        );
    }
}

export default ImageHotSpot