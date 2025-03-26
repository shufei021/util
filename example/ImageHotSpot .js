class ImageHotSpot {
  constructor(options) {
    this.options = options;
    this.init();
  }

  // Initialize instance
  init() {
    this.container = typeof this.options.el === "string" ? document.querySelector(this.options.el): this.options.el;
    if (!this.container) {
      throw new Error(`${this.options.el || ""} container is not found`);
    }
    this.options.addMode = this.options.addMode || "default";
    this.initDefaultProps()
    this.initSquarePos();
    if (this.options.customUpload !== true) {
      this.resetInit();
    }
  }

  initDefaultProps(){
    // size 存在就使用size，否则使用width和height
    const {size, width='8px', height='8px', borderColor='#1447FF', backgroundColor='#1447FF'} = this.options?.handle || {}
    const handleCommonStyle = `position: absolute;border: 1px solid ${borderColor};background-color: ${backgroundColor};box-sizing: border-box;width: ${size || width};height: ${size || height};`
    this.defaultProps = {
      canvas: {
        className: "hot-container",
        cssText: `width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;`
      },
      // 热区最外层容器默认样式
      container: {
        className: "hot-container",
        cssText: `width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;`,
        ...(this.options.container || {}),
      },
      // 热区包裹默认样式
      square:{
        className: "hot-square",
        cssText: `width: 88px; height: 88px; background-color: rgba(20, 71, 255, 0.2); border: 1px dashed ${borderColor}; cursor: move; position: absolute; left: 0px; top: 0px; opacity: 1; box-sizing: border-box;`,
        ...(this.options.square || {})
      },
      // 热区内容元素默认样式
      content: {
        className: "hot-content",
        cssText:`display:none`,
        ...(this.options.content || {}),
      },
      lt:{
        className: "lt",
        cssText:`${handleCommonStyle}cursor: nw-resize;top: -4px;left: -4px;`,
        ...(this.options.lt || {}),
      },
      lm:{
        className: "lm",
        cssText:`${handleCommonStyle}cursor: e-resize;top: 50%;left: -4px;transform: translateY(-50%);`,
        ...(this.options.lm || {}),
      },
      lb:{
        className: "lb",
        cssText:`${handleCommonStyle}cursor: ne-resize;bottom: -4px;left: -4px;`,
        ...(this.options.lb || {}),
      },
      bm:{
        className: "bm",
        cssText:`${handleCommonStyle}cursor: n-resize;bottom: -4px;left: 50%;transform: translateX(-50%);`,
        ...(this.options.bm || {}),
      },
      br:{
        className: "br",
        cssText:`${handleCommonStyle}cursor: se-resize;bottom: -4px;right: -4px;`,
        ...(this.options.br || {}),
      },
      rm:{
        className: "rm",
        cssText:`${handleCommonStyle}cursor: e-resize;top: 50%;right: -4px;transform: translateY(-50%);`,
        ...(this.options.rm || {}),
      },
      tm:{
        className: "tm",
        cssText:`${handleCommonStyle}cursor: n-resize;top: -4px;left: 50%;transform: translateX(-50%);`,
        ...(this.options.tm || {}),
      },
      rt:{
        className: "rt",
        cssText:`${handleCommonStyle}cursor: ne-resize;top: -4px;right: -4px;`,
        ...(this.options.rt || {}),
      },
      // 热区里面元素默认样式
      seq: {
        className: "hot-seq",
        cssText: `min-width: 14px; min-height: 14px; text-align: center; color: #fff; line-height: 14px; position: absolute; top: 0px; left: 0px; background-color: red; font-size: 10px;z-index:-1;cursor:default`,
        ...(this.options.seq || {}),
      },
      del: {
        className: "hot-del",
        cssText: `width: 16px; height: 16px; position: absolute; right: -20px; top: -20px; z-index: 2; cursor: pointer;`,
      }
    }
  }

  initSquarePos(){
    this.squarePos = {
      x: '0px',
      y: '0px',
      w: '80px',
      h: '80px',
      ...(this.options.squarePos || {}),
    };
  }

  resetInit() {
    this.isInit = true;
    this.generateContainer();
    this.handleMouseDownFunc = this.handleMouseDown.bind(this);
    this.canvas.addEventListener("mousedown", this.handleMouseDownFunc);
  }

  // Generate hot area container
  generateContainer() {
    const canvas = this.createElement("div", {...this.defaultProps.canvas });
    this.container.appendChild(canvas);
    this.canvas = canvas;
  }

  // Add hot area
  addHotArea({ x = this.squarePos.x, y = this.squarePos.y, w = this.squarePos.w, h = this.squarePos.h } = {},isForceAdd) {
   if(this.options.addMode === 'default' || isForceAdd){
     // 添加热区先检测热区画布容器存在不
     if (!this.canvas) {
       this.options?.beforeAdd?.();
       return Promise.reject(new Error("Please initialize the instance first"));
     }
     const seq = this.container.querySelectorAll(".hot-square").length + 1;
     const square = this.createHotSquare(seq,{style:{ left: x , top: y, width: w, height:h }});
     this.canvas.appendChild(square);
     this.options?.afterAdd?.({ index: seq, square });
     return Promise.resolve({ index: seq, square });
   }else{
     return Promise.reject(new Error("options addMode is not default"));
   }
  }

  // Create hot square element
  createHotSquare(seq, props) {
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

  createElement(tagName, ...args) {
      // 处理参数解析（支持省略props）
      const props = typeof args[0] === 'object' && !Array.isArray(args[0]) 
        ? args.shift() 
        : {};
    let children = args.flat(Infinity);

    const element = document.createElement(tagName);

    // 新增 cssText 处理逻辑
    const handleStyleAttributes = (element, props) => {
        // 先处理 cssText
        if (props.cssText) {
            element.style.cssText = props.cssText;
            delete props.cssText; // 处理完就删除避免重复处理
        }

        // 处理常规 style 属性
        if (props.style) {
            if (typeof props.style === 'string') {
                element.style.cssText = props.style;
            } else if (typeof props.style === 'object') {
                Object.assign(element.style, props.style);
            }
            delete props.style;
        }
    };

    // 在属性处理前先处理样式相关属性
    handleStyleAttributes(element, props);

      // 处理属性配置
      for (const [key, value] of Object.entries(props)) {
          // 处理className
          if (key === 'className') {
              element.className = value;
              continue;
          }

          // 处理htmlFor
          if (key === 'htmlFor') {
              element.setAttribute('for', value);
              continue;
          }

          // 处理事件监听器（onClick等形式）
          if (/^on[A-Z]/.test(key) && typeof value === 'function') {
              const eventType = key.slice(2).toLowerCase();
              element.addEventListener(eventType, value);
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
          element.setAttribute(key, value);
      }

      // 处理子节点
      children = children.flat(Infinity).filter(child => {
          // 过滤无效节点
          return child !== null && child !== undefined && child !== false;
      }).map(child => {
          // 转换原始值为文本节点
          return typeof child === 'string' || typeof child === 'number'
              ? document.createTextNode(child)
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
  delHotArea(el) {
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
  resetHotSeq(idx) {
    const squares = this.container.querySelectorAll(".hot-square");
    squares.forEach((item) => {
      const indexContent = item.querySelector(".hot-seq");
      if (indexContent) {
        const itemIndex = indexContent.innerText * 1;
        if (itemIndex > idx) {
          indexContent.innerText = itemIndex - 1;
        }
      }
    });
  }

  // Mouse down event
  handleMouseDown(e) {
    e.preventDefault(); // Prevent default behavior
    const { target } = e;
    const className = target.className;
    const delItem = target.closest(".hot-del");
    if (delItem) return this.delHotArea(delItem);
    let content = null;
    if (
      ["lt", "lm", "lb", "bm", "br", "rm", "rt", "tm", "hot-square"].includes(
        className
      )
    ) {
      const square =
        className === "hot-square" ? target : target.closest(".hot-square");
      const existContent = this.canvas.querySelector(".hot-active");
      if (existContent && existContent.parentElement !== square) {
        existContent.classList.remove("hot-active");
        existContent.style.display = "none";
      }
      content = square.querySelector(".hot-content");
      if (content && !content.classList.contains("hot-active")) {
        content.classList.add("hot-active");
        content.style.display = "block";
        square.style.zIndex = this.getMaxZIndex() + 1;
      }
      this.startDrag(e, square, className, content);
    } else if(className === "hot-container" && this.options.addMode === 'manual'){
      const pos = this.canvas.getBoundingClientRect()
      const dix =  pos.left;
      const diy =  pos.top;
      let recordX = e.clientX - dix;
      let recordY =e.clientY - diy;
      const square = this.createElement("div", {className:"hot-line",style:{left:recordX + "px",top:recordY + "px",width:"0px",height:"0px",border:"1px solid red", boxSizing:'border-box',position:'absolute'} });
      this.canvas.appendChild(square);
      let width = 0;
      let height = 0;
      const maxWidth = this.canvas.offsetWidth - square.offsetLeft;
      const maxHeight = this.canvas.offsetHeight -  square.offsetTop;
      const maxWidth1 = square.offsetLeft;
      const maxHeight1 = square.offsetTop;
      const squareWidth = square.offsetWidth - 2
      const squareHeight = square.offsetHeight - 2
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
          _w = _w > maxWidth1 ? maxWidth1 : _w
          // left
          recordX = clientX - dix
          recordX = recordX < 0 ? 0 : recordX
        } else{
          _w = w > maxWidth ? maxWidth : w
        }
        if(clientY < e.clientY){
           _h = squareHeight + deltaY
           _h = _h > maxHeight1 ? maxHeight1 : _h
           // top
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
        const creat= ()=> this.addHotArea({
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
  startDrag(e, square, className, content) {
    const { clientX: startX, clientY: startY } = e;
    const startWidth = square.offsetWidth;
    const startHeight = square.offsetHeight;
    const startLeft = parseInt(square.style.left) || 0;
    const startTop = parseInt(square.style.top) || 0;
    const containerWidth = this.canvas.offsetWidth;
    const containerHeight = this.canvas.offsetHeight;
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
      if (content) content.style.opacity = 1;
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  // Handle mouse move event
  handleMouseMove(
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
  moveSquare(square, startLeft, startTop, deltaX, deltaY, maxLeft, maxTop) {
    const newLeft = Math.max(0, Math.min(startLeft + deltaX, maxLeft));
    const newTop = Math.max(0, Math.min(startTop + deltaY, maxTop));
    square.style.left = `${newLeft}px`;
    square.style.top = `${newTop}px`;
  }

  // Resize functions for each handle
  resizeLT(
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

  resizeLM(square, startWidth, startLeft, deltaX, minSize, containerWidth) {
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

  resizeRM(square, startWidth, startLeft, deltaX, minSize, containerWidth) {
    let newWidth = startWidth + deltaX;

    if (newWidth < minSize) {
      newWidth = minSize;
    }
    if (startLeft + newWidth > containerWidth) {
      newWidth = containerWidth - startLeft;
    }

    square.style.width = `${newWidth}px`;
  }

  resizeTM(square, startHeight, startTop, deltaY, minSize, containerHeight) {
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

  resizeBM(square, startHeight, startTop, deltaY, minSize, containerHeight) {
    let newHeight = startHeight + deltaY;

    if (newHeight < minSize) newHeight = minSize;
    if (startTop + newHeight > containerHeight) {
      newHeight = containerHeight - startTop;
    }

    square.style.height = `${newHeight}px`;
  }

  // Upload hot area image
  uploadHotImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.style.cssText = "position:absolute;left:0;top:0;opacity:0";
      this.container.appendChild(img);
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
  scaleCalc(w, h, src, resolve) {
    if (!this.isInit) this.resetInit();
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
    Object.keys(canvasStyle).forEach((k) => {
      this.canvas.style[k] = canvasStyle[k];
    });
    resolve({ w: w * scale, h: h * scale, scale });
    this.scale = scale;
    this.hotImgWidth = w * scale;
    this.hotImgHeight = h * scale;
  }

  // Destroy instance
  destroy() {
    this.container.querySelectorAll(".hot-square").forEach((i) => i.remove());
    this.canvas.remove();
    this.canvas = null;
    this.isInit = false;
    this.container.removeEventListener("mousedown", this.handleMouseDownFunc);
  }

  // Get maximum z-index
  getMaxZIndex() {
    const divs = this.container.querySelectorAll(".hot-square");
    return Math.max(
      ...Array.from(divs).map((i) => parseInt(getComputedStyle(i).zIndex) || 1)
    );
  }
  /***
   * @description: 校验热区之间是否重叠
   */
  areElementsOverlapping(container = this.canvas) {
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


  getHotAreaData(mode = "array") {
    // mode: array | object
    const hotSquares = Array.from(
      this.container.querySelectorAll(".hot-square")
    );
    // eslint-disable-next-line no-return-assign
    return hotSquares.reduce(
      (p, c) => {
        const index = c.querySelector(".hot-seq").innerText * 1 - 1;
        p[index] = {
          x: parseFloat(c.style.left),
          y: parseFloat(c.style.top),
          w: c.offsetWidth,
          h: c.offsetHeight,
          index: index,
        };
        return p;
      },
      mode === "array" ? [] : {}
    );
  }
}

window.ImageHotSpot = ImageHotSpot