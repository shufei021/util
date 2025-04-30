/**
 * 去除数组中的重复项。
 * 如果提供了第二个参数k，则根据对象的k属性值进行去重。
 *
 * @param {Array} a - 需要去重的数组。
 * @param {string} [k] - 对象数组中去重的属性名。
 * @returns {Array} - 去重后的数组。
 * @throws {Error} - 如果第一个参数不是数组，或第二个参数不是字符串且已提供。
 */
const unique = function (a, k) {
    if (!Array.isArray(a))
        throw new Error('传入的第一个参数必须为数组类型');
    if (k !== undefined && typeof k !== 'string')
        throw new Error('传入的第二个参数必须为字符串类型');
    const seen = new Map();
    return a.filter((item) => {
        const hash = k ? item[k] : JSON.stringify(item);
        if (!seen.has(hash)) {
            seen.set(hash, true);
            return true;
        }
        return false;
    });
};

/**
 * bfs 函数用于实现广度优先搜索算法遍历数据结构，并根据提供的回调函数执行相应的操作
 * @param {Object|Array} data - 要遍历的数据结构，可以是对象或数组
 * @param {Function} cb - 回调函数，用于处理每个节点的操作
 */
const bfs = function (data, cb) {
    // 将数据转换为数组形式，便于进行广度优先搜索
    const list = Array.isArray(data) ? [...data] : [data];
    // 获取子节点的别名，默认为 "children"
    const aliasChildren = cb.children || "children";
    // 使用 while 循环实现广度优先搜索
    while (list.length) {
        const item = list.shift(); // 取出队列中的第一个节点
        // 如果回调函数中定义了 cb 属性，则执行 cb.cb 方法；否则执行 cb 方法
        cb.cb ? cb.cb(item, bfs) : cb ? cb(item, bfs) : null;
        // 判断当前节点是否存在子节点，存在则将子节点加入到队列中
        item &&
            item[aliasChildren] &&
            item[aliasChildren].length &&
            item[aliasChildren].forEach((child) => list.push(child));
    }
};

/**
 * @description: 生成 起止数字间（包含起止数字）的升序数组
 * @param {Number} min : 最小值
 * @param {Number} max ：最大值
 * @param {Number} n：指定生成的个数，默认1
 * @param {Boolean} isRepeat：是否重复,默认重复
 */
const range = function (min, max, n = 0, isRepeat) {
    if (isRepeat === undefined && n === 0) {
        return Array.from({ length: max - min + 1 }, (_, i) => i + min);
    }
    else {
        if (isRepeat) {
            return Array.from({ length: n || 0 }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        }
        else {
            const arr = Array.from({ length: max - min + 1 }, (_, i) => i + min);
            const num = n > arr.length ? arr.length : n;
            const ret = [];
            while (ret.length != num) {
                const random = arr[Math.floor(Math.random() * arr.length)];
                !ret.includes(random) && ret.push(random);
            }
            return ret;
        }
    }
};

/**
 * 生成指定范围内指定步长的数组
 * @param {Number} start : 起始值
 * @param {Number} stop : 结束值
 * @param {Number} step : 步长
 */
const rangeStep = function (start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
};

/**
 * @description: 查询满足条件的所有索引 - findIndexs
 * @param {*} arr
 * @param {*} cb
 * @returns
 */
const findIndexs = function (arr, cb) {
    const ret = [];
    for (let i = 0; i < arr.length; i++) {
        if (cb(arr[i])) {
            ret.push(i);
        }
    }
    return ret;
};

function deepCloneFunction(func) {
    // 创建一个新的函数，复制原函数的代码体
    const clonedFunc = new Function('return ' + func.toString())();
    // 复制原函数的原型链
    clonedFunc.prototype = Object.create(func.prototype);
    // 复制原函数的属性
    for (let key in func) {
        if (func.hasOwnProperty(key)) {
            clonedFunc[key] = func[key];
        }
    }
    return clonedFunc;
}
const deepClone = function (parent) {
    // 判断类型函数
    const isType = (o, t) => Object.prototype.toString.call(o).slice(8, -1).toLowerCase() === t;
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
    // 克隆函数
    const clone = (parent) => {
        if (parent === null)
            return null;
        if (typeof parent !== 'object' && typeof parent !== 'function')
            return parent;
        // 对象处理
        let child, proto;
        // 数组处理
        if (isType(parent, 'array')) {
            // 对数组做特殊处理
            child = [];
        }
        else if (isType(parent, 'regexp')) { // 正则处理
            // 对正则对象做特殊处理
            child = new parent.constructor(parent.source, /\w*$/.exec(parent));
            if (parent.lastIndex)
                child.lastIndex = parent.lastIndex;
        }
        else if (isType(parent, 'date')) { // 日期处理
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        }
        else if (isType(parent, 'function')) {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            child = deepCloneFunction(parent);
        }
        else { // 纯对象
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }
        // 处理循环引用
        const index = parents.indexOf(parent);
        if (index !== -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);
        for (const i in parent) { // 递归
            child[i] = clone(parent[i]);
        }
        // 返回克隆的值
        return child;
    };
    return clone(parent);
};

/**
 * @description: 根据条件删除数组中的值
 * @param {Array} arr：被操作的数组
 * @param {Function | any[] | {[key:string]:any}} o：条件
 * @param {Boolean} isChangeOldArr：是否改变原数组
 * @return {Array} 返回处理后的数组
 */
const delBy = function (arr, o, isChangeOldArr = false) {
    // 检查参数类型  
    if (!Array.isArray(arr)) {
        throw new Error('First argument must be an array.');
    }
    if (typeof o !== 'function' && !Array.isArray(o) && (typeof o !== 'object' || o === null)) {
        throw new Error('Second argument must be a function, array, or object.');
    }
    if (typeof isChangeOldArr !== 'boolean') {
        throw new Error('Third argument must be a boolean.');
    }
    const a = isChangeOldArr ? arr : deepClone(arr);
    for (let i = a.length - 1; i >= 0; i--) {
        if (typeof o === 'function') {
            o(a[i]) && a.splice(i, 1);
        }
        else if (Array.isArray(o)) {
            o.indexOf(a[i]) > -1 && a.splice(i, 1);
        }
        else if (a[i] === o) {
            a.splice(i, 1);
        }
        else if (Object.prototype.toString.call(o).slice(8, -1) === 'Object') {
            let item = a[i];
            for (let k in o) {
                Array.isArray(o[k]) ? o[k].indexOf(item[k]) > -1 && a.splice(i, 1) : o[k] === item[k] && a.splice(i, 1);
            }
        }
    }
    return a;
};

/**
 * @description: 数组按标识进行分组 （分组后顺序不变）
 * @param {Array} list：分组的数组
 * @param {String} typeStr：分组的标识
 * @return {Array}
 */
const arrayGroup = function (list, typeStr) {
    if (list.length === 0)
        return []; // 如果数组为空，返回空数组  
    const ret = [];
    let startIndex = 0;
    for (let i = 1, len = list.length; i < len; i++) {
        const pre = list[i - 1];
        const cur = list[i];
        if (pre[typeStr] !== cur[typeStr]) {
            ret.push(list.slice(startIndex, i));
            startIndex = i;
        }
    }
    // 添加最后一个分组（如果有剩余元素）  
    ret.push(list.slice(startIndex));
    return ret;
};

/**
 * @description: 数组状态还原
 * @param { Array } list: 有两值交换后的数组
 * @param { Number } oldIndex: 交换项索引
 * @param { Number } newIndex：被交换项索引
 * @param { Boolean } isDeep：是否给改变原数组
 */
const arrayRestore = function (list, oldIndex, newIndex, isDeep = false) {
    if (!isDeep)
        list = deepClone(list);
    list.splice(oldIndex, 0, list.splice(newIndex, 1)[0]);
    return list;
};

/**
 * @description 计算两个数组的差集 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @param {string} key - 对象属性的键名（可选）
 * @returns {Array} 差集数组
 */
function difference(arr1, arr2, key) {
    if (key) {
        return arr1.filter((item1) => !arr2.some((item2) => item1[key] === item2[key]));
    }
    else {
        return arr1.filter((item) => !arr2.includes(item));
    }
}

/**
 * @description 计算两个数组的交集 对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @param {string} key - 对象属性的键名（可选）
 * @returns {Array} 交集数组
 */
function intersection(arr1, arr2, key) {
    if (key) {
        return arr1.filter((item1) => arr2.some((item2) => item1[key] === item2[key]));
    }
    else {
        return arr1.filter((item) => arr2.includes(item));
    }
}

/**
 * @description 计算两个数组的并集 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @param {string} key - 对象属性的键名（可选）
 * @returns {Array} 并集数组
 */
function union(arr1, arr2, key) {
    if (key) {
        return [
            ...arr1,
            ...arr2.filter((item2) => arr1.find((item1) => item1[key] !== item2[key])),
        ];
    }
    else {
        return Array.from(new Set([...arr1, ...arr2]));
    }
}

function getRepeat(arr = []) {
    return arr.reduce((prve, cur, i, a) => {
        cur = Object.keys(cur).sort().reduce((p, c) => (p[c] = cur[c], p), {});
        const k = JSON.stringify(cur);
        prve.countMap[k] ? prve.countMap[k]++ : (prve.countMap[k] = 1);
        if (i === a.length - 1) {
            Object.keys(prve.countMap).forEach(key => prve[prve.countMap[key] > 1 ? 'repeatArr' : 'notRepeatArr'].push(JSON.parse(key)));
            delete prve.countMap;
        }
        return prve;
    }, {
        repeatArr: [],
        notRepeatArr: [],
        countMap: {}
    });
}

/**
 * 对数组进行分组，分组依据是数组中对象的某个属性
 * @param {Array} groups - 要分组的数组
 * @param {String} key - 属性名，用于分组
 * @returns {Array} - 分组后的数组
 */
function groupBy(groups, key) {
    // 使用 reduce 方法对数组进行分组
    return groups.reduce((acc, item, idx, a) => {
        // 检查是否已存在当前属性值的分组，若存在则将当前对象添加到该分组中，否则创建新分组
        if (acc[item[key]]) {
            acc[item[key]].push(item);
        }
        else {
            acc[item[key]] = [item];
        }
        // 如果已遍历到数组末尾，则将分组结果转换为数组形式返回
        if (idx === a.length - 1)
            return Object.values(acc);
        return acc;
    }, {});
}

/**
 * @description: json 数组项键值 随意重组，比如数组项的 某个值作为key，某个键作为值
 * @param {Array} arr
 * @param {String} k1
 * @param {String} k2
 * @return {Array}
 */
function make(arr, k1, k2) {
    return arr.reduce((p, c) => [...p, { [c[k1]]: c[k2] }], []);
}

/**
 * @description: json数组项筛选指定键值留下，其余键值去掉
 * @param {Array} arr
 * @param {Array} keys 键数组
 */
function pick(arr, keys) {
    return arr.reduce((p, c) => [...p, keys.reduce((p1, c1) => (Object.assign(Object.assign({}, p1), { [c1]: c[c1] })), {})], []);
}

const u = window.navigator.userAgent;
const isChrome = !!u.match(/Chrome/i);
const isMobile = !!(u.match(/(iPhone|iPad|iPod)/i) || u.match(/Android/i) || u.match(/Windows Phone/i) || u.match(/IEMobile/i));
const isPC = !(u.match(/(iPhone|iPad|iPod)/i) || u.match(/Android/i) || u.match(/Windows Phone/i) || u.match(/IEMobile/i));
const isIos = !!u.match(/(iPhone|iPad|iPod)/i);
const isAndroid = !!u.match(/Android/i);
// @ts-ignore
const isTencentAgent = u.match(/MicroMessenger/i) == 'MicroMessenger'; //MicroMessenger是微信的关键字。
// @ts-ignore
const isWx = isTencentAgent && u.match(/wxwork/i) != 'wxwork';
// @ts-ignore
const isWxMobile = isTencentAgent && u.match(/wxwork/i) != 'wxwork' && u.match(/Mobile/i) == 'Mobile';
// @ts-ignore
const isWxPc = isTencentAgent && u.match(/wxwork/i) != 'wxwork' && u.match(/Mobile/i) != 'Mobile';
// @ts-ignore
const isWxWork = isTencentAgent && u.match(/wxwork/i) == 'wxwork'; // wxwork是企业微信关键字
// @ts-ignore
const isWxWorkMobile = isTencentAgent && u.match(/wxwork/i) == 'wxwork' && u.match(/Mobile/i) == 'Mobile';
// @ts-ignore
const isWxWorkPc = isTencentAgent && u.match(/wxwork/i) == 'wxwork' && u.match(/Mobile/i) != 'Mobile' && !isMobile();
const isFirefox = u.includes('Firefox');
const isSafari = /Safari/.test(u) && !/Chrome/.test(u);
const isMac = /macintosh|mac os x/i.test(u);
const isWindow = ['win32', 'wow32', 'win64', 'wow64'].some(i => u.toLowerCase().includes(i));
const isWindow32 = ['win32', 'wow32'].some(i => u.toLowerCase().includes(i));
const isWindow64 = ['win64', 'wow64'].some(i => u.toLowerCase().includes(i));
/**
 * 浏览器环境
 */
const browser = {
    isChrome, // 是否Chrome浏览器
    isMobile, // 是否移动端
    isPC, // 是否 PC
    isIos, // 是否IOS
    isAndroid, // 是否安卓
    isWx, // 是否微信
    isWxMobile, // 是否微信移动端
    isWxPc, // 是否微信PC端
    isWxWork, // 是否企业微信
    isWxWorkMobile, // 是否企业微信移动端
    isWxWorkPc, // 是否企业微信PC端
    isFirefox, // 是否是火狐浏览器
    isSafari, // 是否是isSafari浏览器
    isMac, // 是否MAC
    isWindow, // 是否Window
    isWindow32, // 是否
    isWindow64
};

/**
 * @description 添加css
 * @param {*} styleId
 * @param {*} arr
 * @returns
 */
function addStyleCss(styleId, arr) {
    // @ts-ignore
    const targetCss = [...document.styleSheets].find((i) => { var _a; return ((_a = i.ownerNode) === null || _a === void 0 ? void 0 : _a.id) === styleId; });
    if (targetCss) {
        for (let i = 0; i < arr.length; i++)
            targetCss.insertRule(arr[i]);
        return targetCss;
    }
    else {
        const style = document.createElement('style');
        style.id = 'add_style_css_' + Date.now();
        document.body.appendChild(style);
        style.onload = () => {
            // @ts-ignore
            const targetCss = [...document.styleSheets].find((i) => { var _a; return ((_a = i.ownerNode) === null || _a === void 0 ? void 0 : _a.id) === style.id; });
            // @ts-ignore
            for (let i = 0; i < arr.length; i++)
                targetCss.insertRule(arr[i]);
        };
        return style;
    }
}

/**
 * @description 复制文本内容
 * @param {String} text
 */
function copyText(text) {
    const input = document.createElement('input');
    input.value = text; // 修改文本框的内容
    document.body.appendChild(input);
    input.select(); // 选中文本
    document.execCommand('copy'); // 执行浏览器复制命令
    document.body.removeChild(input);
}

/**
 * @description 防抖函数
 * @param {Function} fn
 * @param {Number} delay
 * @param {Boolean} immerdate
 * @return {Function}
 */
function debounce(fn, delay, immerdate) {
    let timer = null;
    return function (...args) {
        if (immerdate) {
            const is = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            // @ts-ignore
            if (is)
                fn.apply(this, args);
        }
        else {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(() => {
                // @ts-ignore
                fn.apply(this, args);
            }, delay);
        }
    };
}

/**
 * @description:节流
 * @param { Function } func : 节流的事件响应函数
 * @param { Number } wait ：事件响应函数执行需求的频率时间
 * @param { Object } options ：配置对象，包含两个值 immediate（是否立即执行）和 trailing（最后是否还执行一次）
 */
// leading ：false trailing：true 第一次不会立即调用 离开了还会执行一次
// leading ：true  trailing：true 第一次会立即调用 离开了还会执行一次
// leading ：true  trailing：false 第一次会立即调用 离开了不会执行一次
// 默认 是 options = { leading:true, trailing:true }
function throttle(func, wait, options) {
    let timeout;
    let old = 0; //之前的时间
    if (!options)
        options = {};
    let throttled = function (...args) {
        // 获取当前的时间戳
        let now = +new Date();
        if (options.leading === false && !old) {
            old = now;
        }
        if (now - old > wait) {
            // 第一次会立即执行
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            // @ts-ignore
            func.apply(this, args);
            old = now;
        }
        else if (!timeout && options.trailing !== false) {
            // 最后一次也会执行
            timeout = setTimeout(() => {
                old = +new Date();
                timeout = null;
                // @ts-ignore
                func.apply(this, args);
            }, wait);
        }
    };
    // @ts-ignore
    throttled.cancel = function () {
        if (timeout)
            clearTimeout(timeout);
        // @ts-ignore
        timeout = undefined;
        old = 0;
    };
    // @ts-ignore
    return throttled;
}

const trigger = function (Node, EventType) {
    // 创建事件类型
    const evt = document.createEvent('Events');
    // 初始化对应类型的事件
    evt.initEvent(EventType, true, true);
    // 如果该节点身上已有该事件类型，则直接触发即可，blur, scroll, select三个不会触发监听的回调函数特殊处理
    if (EventType in Node) {
        Node[EventType]();
        if (['blur', 'scroll', 'select'].includes(EventType)) {
            // 保证监听的回调函数能够触发
            Node.dispatchEvent(evt);
        }
    }
    else {
        // 手动触发 自定义事件
        Node.dispatchEvent(evt);
    }
};

/**
 *  @description JSON 转 FormData 对象
 *  @param { Object } o 需要转成formData 的对象
 *  @return { FormData }
 */
function formData(o) {
    return Object.keys(o).reduce((p, c) => {
        p.append(c, o[c]);
        return p;
    }, new FormData());
}

/**
 * @description: 获取html页面dom中最大的层级数
 * @return {Number}
 */
function getMaxZIndex() {
    // 获取HTML中所有的DOM
    const divs = document.querySelectorAll('*');
    return Math.max(...Array.from(divs).map(i => parseInt(getComputedStyle(i).zIndex) || 1));
}

/**
 * @description 获取滚动方向
 * @param { Element | HTMLElement | Window | String} scroller 滚动容器元素
 * @returns Object {x,y}
 */
function getScrollDirection(scroller = window) {
    // 兼容 window 和 DOM 
    // @ts-ignore
    scroller = scroller === window ? window : typeof scroller === 'string' ? document.querySelector(scroller) : scroller;
    // @ts-ignore
    const scrollLeft = scroller === window ? scroller.scrollX : scroller.scrollLeft;
    // @ts-ignore
    const scrollTop = scroller === window ? scroller.scrollY : scroller.scrollTop;
    // @ts-ignore
    scroller = scroller === window ? getScrollDirection : scroller;
    // 兼容 页面刷新 window scroll 的 x和y轴的滚动情况
    // @ts-ignore
    if (scroller.oldScrollLeft === undefined && scroller.oldScrollTop === undefined && scrollTop && scrollLeft) {
        // @ts-ignore
        scroller.oldScrollLeft = 0;
        // @ts-ignore
        scroller.oldScrollTop = 0;
        // @ts-ignore
        scroller.oldScrollLeft = scrollLeft;
        // @ts-ignore
        scroller.oldScrollTop = scrollTop;
        return { x: true, y: true };
    }
    // @ts-ignore
    if (scroller.oldScrollLeft === undefined)
        scroller.oldScrollLeft = 0;
    // @ts-ignore
    if (scroller.oldScrollTop === undefined)
        scroller.oldScrollTop = 0;
    // @ts-ignore
    const is = scroller.oldScrollTop !== scrollTop;
    // @ts-ignore
    scroller.oldScrollLeft = scrollLeft;
    // @ts-ignore
    scroller.oldScrollTop = scrollTop;
    return { x: !is, y: is };
}

/**
 * @description 设置元素里面文字呈选中状态
 * @param {Element | String} element
 */
function selectTextByElement(element) {
    const text = typeof element === 'string' ? document.querySelector(element) : element;
    // @ts-ignore
    if (document.body.createTextRange) {
        // @ts-ignore
        const range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    }
    else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        // @ts-ignore
        range.selectNodeContents(text);
        // @ts-ignore
        selection.removeAllRanges();
        // @ts-ignore
        selection.addRange(range);
    }
}

/**
 *
 * @param element 要计算宽度的文本元素
 * @param maxWidth 最大宽度
 * @param maxLines 超出的行数就省略
 * @param fontSize 字体大小
 * @returns 合适的文本 + ...
 */
function truncateTextToFit(element, maxWidth, maxLines, fontSize) {
    const text = element.textContent || element.innerText;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // 设置字体大小
    const fontStyle = window.getComputedStyle(element).font;
    context.font = fontStyle.replace(/\d+px/, `${fontSize}px`);
    let truncatedText = '';
    let currentLine = '';
    let lineCount = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth) {
            lineCount++;
            if (lineCount >= maxLines) {
                truncatedText += currentLine.trim() + '...';
                break;
            }
            else {
                truncatedText += currentLine.trim() + '';
                currentLine = char;
            }
        }
        else {
            currentLine = testLine;
        }
    }
    if (lineCount < maxLines) {
        truncatedText += currentLine;
    }
    return truncatedText;
}

/**
 * @description: Base64 to Blob
 * @param { string } base64 : file base64
 * @return { Blob }
 */
function base64ToBlob(base64) {
    let mime = base64.split(",")[0].split(":")[1].split(";")[0]; //mime type
    let byte = window.atob(base64.split(",")[1]); //base64 decode
    let arrayBuffer = new ArrayBuffer(byte.length); // create buffer array
    let intArray = new Uint8Array(arrayBuffer); // create view
    for (let i = 0, len = byte.length; i < len; i++) {
        intArray[i] = byte.charCodeAt(i);
    }
    return new Blob([intArray], { type: mime });
}

/**
 * @description: Base64 to File
 * @param  {String}  base64
 * @param  {String}  fileName
 * @return {File}
 */
function base64ToFile(base64, fileName) {
    let arr = base64.split(','), mimeType = arr[0].match(/:(.*?);/)[1], //base64文件类型
    bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mimeType });
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            resolve(e.target.result);
        };
        reader.onerror = function (e) {
            reject(e);
        };
        reader.readAsDataURL(blob);
    });
}

/**
 * @description: Blob  to  File
 * @param  { Blob } blob
 * @param { String } filename : file name
 * @return { File } File
 */
function blobToFile(blob, filename) {
    return new File([blob], filename, { type: blob.type, lastModified: Date.now() });
}

/**
 * @description: File to Base64
 * @param { File } file :  File
 * @return { Promise }
 */
function fileToBase64(file) {
    return new Promise((resole) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resole(this.result);
        };
    });
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @description: File to Blob
 * @param  { File } file: File object
 * @return { Promise }
 */
function fileToBlob(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const r = yield fileToBase64(file);
        return base64ToBlob(r);
    });
}

/**
 * @description: (bytes)字节数自动转换
 * @param {Number} bytes: 字节数
 * @return {String} 转换后的字符串
 * @example: bytesFormat(1024) => 1.00 KB
 */
function bytesFormat(bytes) {
    if (bytes === 0)
        return '0 B';
    if (!bytes)
        return '';
    let k = 1024;
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    let num = bytes / Math.pow(k, i);
    return num.toFixed(2) + ' ' + sizes[i];
}

/**
 * @description Buffer下载文件
 * @param {Buffer} buffer
 * @param {String} fileName
 */
function bufferFileDownload(buffer, fileName) {
    const blob = new Blob([buffer], { type: 'charset=utf-8' });
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(a);
    a.click();
    body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

/**
 * @description: base64数据导出文件下载
 * @param {string} filename - 下载时的文件名
 * @param {dataURL} base64 - base64字符串
 */
function downloadByBase64(base64, filename = 'default') {
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.download = filename;
    a.href = base64;
    if (document.createEvent) {
        const downloadEvt = document.createEvent('MouseEvents');
        downloadEvt.initEvent('click', true, false);
        a.dispatchEvent(downloadEvt);
    }
    else if (document.createEventObject) {
        a.fireEvent('onclick');
    }
    else if (typeof a.onclick == 'function') {
        a.onclick();
    }
    document.body.removeChild(a);
}

const isEqual = function (a, b, checked = new Set()) {
    // 提前返回不同类型的值
    if (typeof a !== typeof b)
        return false;
    // 处理循环引用
    if (typeof a === 'object' && typeof b === 'object') {
        if (checked.has(a) && checked.has(b))
            return true;
        checked.add(a);
        checked.add(b);
    }
    // 基本类型的值直接比较
    if (a === b || (Number.isNaN(a) && Number.isNaN(b)))
        return true;
    // 检查引用类型的值
    if (typeof a === 'object') {
        // 如果是日期对象，比较时间戳
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();
        // 如果是正则表达式，比较字符串形式
        if (a instanceof RegExp && b instanceof RegExp)
            return a.toString() === b.toString();
        // 如果是 Map，转换为普通对象进行比较
        if (a instanceof Map && b instanceof Map) {
            const objA = Object.fromEntries(a.entries());
            const objB = Object.fromEntries(b.entries());
            return isEqual(objA, objB, checked);
        }
        // 如果是数组或对象，递归比较属性
        if (Array.isArray(a) && Array.isArray(b) || Object.prototype.toString.call(a) === '[object Object]' && Object.prototype.toString.call(b) === '[object Object]') {
            const keysA = Object.keys(a).sort(); // 对属性排序
            const keysB = Object.keys(b).sort(); // 对属性排序
            // 检查属性数量是否相同
            if (keysA.length !== keysB.length)
                return false;
            // 检查每个属性是否相等
            return keysA.every((key, index) => key === keysB[index] && isEqual(a[key], b[key], checked));
        }
    }
    // 其他情况直接返回 false
    return false;
};

/**
 * @description: 数组内是否有重复值
 * @param {Array} arr: 被检测的数组
 * @param {Boolean} isGetData: 是否对象形式返回结果
 * @return Boolean | Object
 */
const isRepeat = function (arr, isGetData) {
    const len = arr.length;
    if (len === 0 || len === 1)
        return isGetData ? { repeatIndex: -1, repeatItem: null, isRepeat: false } : false;
    try {
        for (let i = 0; i < len; i++) {
            for (let k = i + 1; k < len; k++) {
                if (isEqual(arr[i], arr[k])) {
                    return isGetData
                        ? { repeatIndex: i, repeatItem: arr[i], isRepeat: true }
                        : true;
                }
            }
        }
        return isGetData
            ? { repeatIndex: -1, repeatItem: null, isRepeat: false }
            : false;
    }
    catch (e) {
        return isGetData
            ? {
                repeatIndex: -1,
                repeatItem: null,
                isRepeat: len !== unique(arr).length,
            }
            : len !== unique(arr).length;
    }
};

/**
 * 检查给定的值是否为有效数字。
 * @param {any} val - 要检查的值。
 * @param {boolean} isExp - 可选参数，指定是否允许指数表示法（科学计数法）。
 * @returns {boolean} 如果值是数字，则返回 true；否则返回 false。
 */
const isValidNum = function (val, isExp) {
    // 构造一个正则表达式来匹配数字
    // 如果 isExp 为 true，则包括对指数表示法的支持
    // 否则，它只匹配标准的十进制表示法
    var regex = isExp ? /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/ : /^[+-]?\d+(\.\d+)?$/;
    // 检测 val 的字符串表示是否与构造的正则表达式匹配
    return regex.test(String(val));
};

/**
 * @description  字符串超大数相加
 * @param {String} a
 * @param {String} b
 * @returns String
 */
const sumBigNumber = function (a, b) {
    let res = '', //结果
    temp = 0; //按位加的结果及进位
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || temp) {
        //~~按位非 1.类型转换，转换成数字 2.~~undefined==0 
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
};

/**
 * 对数字进行四舍五入，并支持科学计数法和自定义精度。
 * @param {number|string} n - 要处理的数字，可以是数字或字符串形式的数字。
 * @param {number} dight - 要保留的小数位数，可以是整数或 undefined（表示保留所有小数位）。
 * @returns {number|string} - 返回处理后的数字，如果是科学计数法表示的数字，则返回字符串形式的结果。
 */
const round = function (n, dight) {
    // 将输入的数字转换为字符串
    n = Number(n).toString();
    // 如果是科学计算法
    if (n.includes('e')) {
        // 分离系数和指数
        let [coefficient, exponent] = n.split('e');
        // 如果系数是小数进行抹平
        if (coefficient.includes('.')) {
            const arr = coefficient.split('.');
            const dotLen = arr[1].length;
            exponent = exponent - dotLen;
            coefficient = coefficient.replace('.', '');
        }
        // 处理指数大于0的情况（整数部分）
        if (exponent > 0) {
            // 构造补零部分
            const end = '0'.repeat(exponent);
            // 合并系数和补零部分
            const rt = coefficient + end;
            // 如果指定保留小数位数，则返回带小数的结果
            if (dight)
                return rt + '.' + '0'.repeat(dight);
            // 如果补零位数大于系数位数，直接返回结果
            if (exponent > coefficient.length || dight === undefined)
                return rt;
            // 补零位数小于等于系数位数，截取结果
            return (rt + '0'.repeat(dight)).slice(0, -1 * dight);
        }
        else if (exponent < 0) { // 处理指数小于0的情况（小数部分）
            // 补零形成小数
            n = '0.' + coefficient.padStart(-exponent, 0);
            // 如果未指定小数位数，直接返回结果
            if (dight === undefined)
                return n;
            // 四舍五入
            const r = (Math.round(n * Math.pow(10, exponent) / (Math.pow(10, (exponent - dight)))) / Math.pow(10, dight)).toString();
            // 处理科学计数法结果
            if (r.includes('e')) {
                let [coefficient, exponent] = r.split('e');
                if (coefficient.includes('.')) {
                    const arr = coefficient.split('.');
                    const dotLen = arr[1].length;
                    exponent = exponent - dotLen;
                    coefficient = coefficient.replace('.', '');
                }
                // 返回补零形成的小数
                return '0.' + coefficient.padStart(-exponent, 0);
            }
            else {
                // 返回四舍五入后的结果
                return r;
            }
        }
    }
    else { // 非科学计算法
        if (n.includes('.')) { // 处理小数
            // 如果未指定小数位数，直接返回结果
            if (dight === undefined)
                return n;
            const arr = n.split('.');
            let dotLen = arr[1].length;
            // 补零保留小数位数
            if (dight > dotLen)
                return n.padEnd(n.length + dight - dotLen, '0');
            // 四舍五入
            const r = Math.round((n * (Math.pow(10, dotLen))) / (Math.pow(10, (dotLen - dight)))) / (Math.pow(10, dight));
            return Number.isInteger(r) ? r.toFixed(dight) : r;
        }
        else { // 处理整数
            // 保留小数位数
            return Number(n).toFixed(dight);
        }
    }
    return n;
};

/**
 * 数字格式化
 * @param { String | Number } val : 有效数数字
 * @param { Boolean } isThousands : 整数部分是否进行千分位,默认值 false
 * @param { Number } digit : 小数部分四舍五入保留到的位数
 * @param { Boolean } isCalc : 计算结果是否 数字化
 */
const fmtNum = function (val, isThousands, digit, isCalc) {
    // 无效值处理，，不符合传入规则的值一律返回空字符串
    if (val === undefined || val == null)
        return '';
    // 无论数字还是字符串数字，最终都转换成字符串数字
    let str = round(val, digit) + '';
    // 进行检测str是否是有效的数字,不是有效直接返回空字符串,不包含科学计数法
    if (!/^[+-]?\d+(\.\d+)?$/.test(String(str)))
        return '';
    // 如果结果需要数字化，直接返回数字化
    if (isCalc)
        return Number(str);
    // 如果不需要千分位处理
    if (!isThousands)
        return str;
    // 如果需要千分位
    const [int, dot = ''] = str.split('.');
    // 整数部分千分位处理
    return int.replace(/(?=(?!\b)(\d{3})+$)/g, ',') + (dot ? '.' + dot : dot);
};

/**
 * 计算方法 calc
 * @param { number } type ：0 加  1 减 2 乘 3 除
 * @param { String | Number } a ：计算数a
 * @param { String | Number } b ：计算数b
 * @param { Number } digit  ：结果保留的位数
 * @return Number | String
 */
const calc = function (type, a, b, digit) {
    var _a, _b;
    if (a === undefined || b === undefined)
        throw new Error('The parameter are required !');
    // 获取 a 和 b 的小数位数
    const aLen = ((_a = a.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    const bLen = ((_b = b.toString().split('.')[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
    // 计算最大位数，用于保留计算结果的精度
    const maxLen = Math.pow(10, Math.max(aLen, bLen));
    // 检查计算类型是否合法
    if (![0, 1, 2, 3].includes(type))
        throw new Error('type参数错误');
    // 根据计算类型进行相应的运算
    const result = type === 0 ?
        (a * maxLen + b * maxLen) / maxLen : type === 1 ?
        (a * maxLen - b * maxLen) / maxLen : type === 2 ?
        (a * maxLen * b * maxLen) / (maxLen * maxLen) :
        (a * maxLen) / (b * maxLen);
    // 调用四舍五入函数对结果进行精度控制
    return round(result, digit);
};

// 加法
const add = function (a, b, digit) {
    if (Array.isArray(a)) {
        if (!a.length)
            return round(0, digit);
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result = add(result, a[i], digit);
        }
        return result;
    }
    else {
        return calc(0, a, b, digit);
    }
};

// 减法
const sub = function (a, b, digit) {
    if (Array.isArray(a)) {
        if (!a.length)
            return round(0, digit);
        let result = a[0];
        for (let i = 1; i < a.length; i++) {
            result = sub(result, a[i], digit);
        }
        return result;
    }
    else {
        return calc(1, a, b, digit);
    }
};

// 乘法
const mul = function (a, b, digit) {
    if (Array.isArray(a) && a.length) {
        return a.reduce((p, c) => mul(p, c, digit), 1);
    }
    else {
        return calc(2, a, b, digit);
    }
};

// 除法
const div = function (a, b, digit) {
    if (a === 0 || a === '0')
        return 0;
    if (b === 0 || b === '0')
        throw new Error('除数不能为0');
    if (Array.isArray(a) && a.length >= 2 && a.every((i) => Number(i) > 0)) {
        let result = a[0];
        for (let i = 1; i < a.length; i++) {
            result = div(result, a[i], digit);
        }
        return result;
    }
    else if (!Array.isArray(a) && a && b) {
        return calc(3, a, b, digit);
    }
    else {
        throw new Error('The first two parameters are required');
    }
};

/**
 * pluckDeep 函数用于从对象中提取指定深度的属性值，并提供默认值
 * @param {string} key - 要提取的属性的路径，可以是多层嵌套的属性，用点号（.）分隔
 * @returns {Function} - 返回一个函数，该函数接受两个参数：目标对象和默认值，返回提取的属性值或默认值
 */
const pluckDeep = (key) => (obj, defaultVal) => {
    try {
        return key.split('.').reduce((accum, key) => accum === null || accum === void 0 ? void 0 : accum[key], obj) || defaultVal;
    }
    catch (e) {
        return defaultVal;
    }
};

const attrFilter = function (o, opt = {}) {
    return Object.keys(o).reduce((p, c) => {
        // 排除零
        if (opt.isEmptyZero && o[c] === 0)
            return p;
        // 排除空对象
        if (opt.isEmptyObject && Object.prototype.toString.call(o[c]) === '[object Object]' && !Object.keys(o[c]).length)
            return p;
        // 排除空数组
        if (opt.isEmptyArray && Array.isArray(o[c]) && !o[c].length)
            return p;
        // 排除 null
        if (opt.isNull && o[c] === null)
            return p;
        // 默认排除空字符串
        if (opt.isEmptyString && o[c] === '')
            return p;
        // 排除 false
        if (opt.isFalse === true && o[c] === false)
            return p;
        p[c] = o[c];
        return p;
    }, {});
};

// https://regexr.com/
const reg = {
    // 验证不能包含字母
    isNoWord: (value) => /^[^A-Za-z]*$/g.test(value),
    // 验证中文和数字
    isCHNAndEN: (value) => /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value),
    // 验证邮政编码(中国)
    isPostcode: (value) => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value),
    // 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
    isWeChatNum: (value) => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value),
    // 验证16进制颜色
    isColor16: (value) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value),
    //验证火车车次
    isTrainNum: (value) => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value),
    //  验证必须带端口号的网址(或ip)
    isHttpAndPort: (value) => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value),
    //验证网址(支持端口和"?+参数"和"#+参数)
    isRightWebsite: (value) => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value),
    //验证统一社会信用代码
    isCreditCode: (value) => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value),
    //验证版本号格式必须为X.Y.Z
    isVersion: (value) => /^\d+(?:\.\d+){2}$/g.test(value),
    //验证图片链接地址（图片格式可按需增删）
    isImageUrl: (value) => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value),
    //验证中文姓名
    isChineseName: (value) => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value),
    //验证英文姓名
    isEnglishName: (value) => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value),
    //验证车牌号(新能源)
    isLicensePlateNumberNER: (value) => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value),
    // 验证车牌号(非新能源)
    isLicensePlateNumberNNER: (value) => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value),
    //验证车牌号(新能源+非新能源)
    isLicensePlateNumber: (value) => /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(value),
    //验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
    isMPStrict: (value) => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value),
    //验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
    isMPRelaxed: (value) => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value),
    // 验证email(邮箱) 收录自 有赞 vant 的 https://github.com/youzan/vant/blob/2.x/src/utils/validate/email.ts
    isEmail: (value) => /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value),
    //验证座机电话(国内),如: 0341-86091234
    isLandlineTelephone: (value) => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value),
    //验证护照（包含香港、澳门）
    isPassport: (value) => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value),
    //验证中文/汉字
    isChineseCharacter: (value) => /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(value),
    //验证小数
    isDecimal: (value) => /^\d+\.\d+$/g.test(value),
    //是否为整数
    isInteger: (value) => typeof value === 'number' && !isNaN(value) && value % 1 === 0,
    //验证数字
    isNumberStr: (value) => /^\d{1,}$/g.test(value),
    //验证qq号格式
    isQQNum: (value) => /^[1-9][0-9]{4,10}$/g.test(value),
    //验证数字和字母组成
    isNumAndStr: (value) => /^[A-Za-z0-9]+$/g.test(value),
    //验证英文字母
    isEnglish: (value) => /^[a-zA-Z]+$/g.test(value),
    // 验证大写英文字母
    isCapital: (value) => /^[A-Z]+$/g.test(value),
    //验证小写英文字母
    isLowercase: (value) => /^[a-z]+$/g.test(value),
    //验证是否包含 字母、中文、数字
    isNumEnglishChinese: (value) => /^[0-9a-zA-Z\u4e00-\u9fa5]+$/g.test(value),
    // 验证手机或座机
    isContactNumber: (value) => /^((\d{3,4}-\d{7,8})|(((13[0-9])|(14[5-9])|(16[5-6])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|(19[1,8-9]))\d{8}))$/.test(value),
    // 是否包含表情
    isContainFace: (val) => {
        const regs = [
            /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
            /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
            /[\uE000-\uF8FF]/g
        ];
        return regs.some(reg => reg.test(val));
    }
};

/**
 * @description 过滤表情
 * @param { string } val 传入的带字体表情的字符串
 * @return { string } 过滤后的字符串
 */
function filterEmoji(val) {
    val = val.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, "");
    val = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
    val = val.replace(/[\uE000-\uF8FF]/g, "");
    return val;
}

function moneyToChinese(value) {
    let numberValue = String(Math.round(value * 100)), chineseValue = "", String1 = "零壹贰叁肆伍陆柒捌玖", String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分", len = numberValue.length, Ch1, Ch2, nZero = 0, String3;
    if (len > 15)
        return alert("超出计算范围"), "";
    if (value == 0)
        return chineseValue = "零元整", chineseValue;
    numberValue.indexOf("-") != -1 ? (String2 = String2.substr(String2.length - len + 1, len - 1),
        numberValue = numberValue.substr(1, len - 1),
        len = numberValue.length,
        chineseValue = "负") : String2 = String2.substr(String2.length - len, len);
    for (let i = 0; i < len; i++)
        String3 = parseInt(numberValue.substr(i, 1), 10),
            i != len - 3 && i != len - 7 && i != len - 11 && i != len - 15 ? String3 == 0 ? (Ch1 = "",
                Ch2 = "",
                nZero = nZero + 1) : String3 != 0 && nZero != 0 ? (Ch1 = "零" + String1.substr(String3, 1),
                Ch2 = String2.substr(i, 1),
                nZero = 0) : (Ch1 = String1.substr(String3, 1),
                Ch2 = String2.substr(i, 1),
                nZero = 0) : (String3 != 0 && nZero != 0 ? (Ch1 = "零" + String1.substr(String3, 1),
                Ch2 = String2.substr(i, 1),
                nZero = 0) : String3 != 0 && nZero == 0 ? (Ch1 = String1.substr(String3, 1),
                Ch2 = String2.substr(i, 1),
                nZero = 0) : String3 == 0 && nZero >= 3 ? (Ch1 = "",
                Ch2 = "",
                nZero = nZero + 1) : (Ch1 = "",
                Ch2 = String2.substr(i, 1),
                nZero = nZero + 1),
                (i == len - 11 || i == len - 3) && (Ch2 = String2.substr(i, 1))),
            chineseValue = chineseValue + Ch1 + Ch2;
    return String3 == 0 && (chineseValue = chineseValue + "整"), chineseValue;
}

/**
 * 生成一个 GUID（Globally Unique Identifier）
 * @returns {string} 生成的 GUID 字符串
 */
function guid() {
    return Array.from({ length: 8 }, // 创建包含 8 个元素的数组，每个元素用于生成 4 位的十六进制字符串
    (_, i) => ((((1 + Math.random()) * 0x10000) | 0) // 生成一个随机数，乘以 0x10000 并向下取整，得到一个 0 到 0xffff 之间的整数
        .toString(16) // 将整数转换为十六进制字符串
        .substring(1) // 截取字符串，保留从第二位开始的字符
        + ([1, 2, 3, 4].includes(i) ? '-' : '') // 在第 2、4、6、8 位插入短横线
    )).join(''); // 将数组中的元素连接成一个字符串，得到最终的 GUID 字符串
}

/**
 * @description: 树扁平化方法
 * @param { Array<object> } list
 * @param { String } children: 别名，默认 'children'
 * @return { Array<object> }
 */
function treeToArray(list, childrenAlias = 'children') {
    return (Array.isArray(list) ? list : [list]).reduce((arr, item) => [
        ...arr,
        item,
        ...treeToArray(item[childrenAlias] || [], childrenAlias),
    ], []);
}

/**
 * @description 数组转换为树形结构
 * @param {Array} arr 需要转换为树形结构的 JSON 数组
 * @param {Number | String | Null} id 树节点的 id
 * @param {String} link 父节点 id 的字段名，默认为 'pid'
 * @returns {Array} 转换后的树形结构数组
 */
function arrayToTree(arr, id = null, idAlias = 'id', pidAlias = 'pid', childrenAlias = 'children') {
    // 使用 filter 方法过滤出当前节点的子节点，并使用 map 方法将子节点转换为树形结构
    return arr
        .filter((i) => i[pidAlias] === id)
        .map((i) => (Object.assign(Object.assign({}, i), { [childrenAlias]: arrayToTree(arr, i[idAlias], idAlias, pidAlias, childrenAlias) })));
}

function queryNode(tree, id, { idAlias = 'id', childrenAlias = 'children' }) {
    var _a;
    tree = deepClone(tree);
    const q = Array.isArray(tree) ? tree : [tree];
    while (q.length) {
        const top = q.shift();
        if (top[idAlias] === id)
            return top;
        (_a = top === null || top === void 0 ? void 0 : top[childrenAlias]) === null || _a === void 0 ? void 0 : _a.forEach((child) => q.push(child));
    }
}

/**
 * @description: 查找树节点路径
 * @param { Object | Array } tree 树
 * @param { Function } func：回调函数
 * @param { Array<string | number> } path：路径
 * @return { Array<string | number> }
 */
function queryPath(tree, // 传入树数组
func, // 回调函数
childrenAlias = 'children', //孩子字段别名
path = [] // 内部使用的路径
) {
    var _a;
    if (!tree)
        return [];
    tree = Array.isArray(tree) ? tree : [tree];
    for (const item of tree) {
        path.push(item);
        if (func(item))
            return path;
        if ((_a = item[childrenAlias]) === null || _a === void 0 ? void 0 : _a.length) {
            const paths = queryPath(item[childrenAlias], func, childrenAlias, path);
            if (paths.length)
                return paths;
        }
        path.pop();
    }
    return [];
}

/**
 * @description 解析URL中的查询参数，并返回一个包含所有参数的对象。
 * @param { string } link
 * @return {object}
 */
function getQuery(link = window.location.href) {
    try {
        const params = {};
        const map = Object.fromEntries(new URLSearchParams(window.location.search).entries());
        for (const key in map) {
            params[key] = decodeURIComponent(map[key]);
        }
        return params;
    }
    catch (e) {
        try {
            return link.includes('?') ?
                link
                    .split('?')[1]
                    .split('&')
                    .map(param => param.split('='))
                    .reduce((params, [key, value]) => {
                    // 对参数进行解码并存入params对象
                    params[decodeURIComponent(key)] = decodeURIComponent(value);
                    return params;
                }, {})
                : {};
        }
        catch (e) {
            // 如果解析查询字符串出现异常，则返回空对象
            return {};
        }
    }
}

/**
 * 将参数对象序列化成 URL 查询字符串
 * @param {String} baseURL - URL 地址
 * @param {Object} params - 参数对象
 * @returns {String} - 参数序列化后的字符串
 */
function urlSerialize(baseURL, params = {}) {
    return Object.keys(params).reduce((p, c) => (p += (p === baseURL ? '?' : '&') + `${c}=${encodeURIComponent(params[c])}`), baseURL);
}

/**
 * @description URL模板参数格式化（GET请求URL模板）
 * @param {String} urlTmp 模板路径，例如：'/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}' 或 '/uap/msg/announcementRecord'
 * @param {Object} params 传入的参数，包含路径参数或不包含
 * @param {Boolean} isCompose 是否拼接路径和查询参数
 * @returns {String} 格式化后的URL
 */
function urlTmtFmt(urlTmp, params = {}, isCompose) {
    // 判断模板路径中是否包含花括号 {}
    let url = /\{(\w+)\}/g.test(urlTmp) ?
        // 如果包含，替换为对应的参数值
        urlTmp.replace(/\{(\w+)\}/g, (_, b) => {
            let tmp = params[b];
            // 删除已替换的参数
            delete params[b];
            return tmp;
        }) :
        // 如果不包含，则直接使用模板路径
        urlTmp;
    // 根据 isCompose 判断是否拼接路径和查询参数
    return isCompose && Object.keys(params).length ?
        // 如果需要拼接，并且还有剩余的参数，则拼接路径和查询参数
        Object.keys(params).reduce((pre, cur) => (pre += (pre === url ? '?' : '&') + `${cur}=${params[cur]}`), url) :
        // 否则，返回处理后的URL
        url;
}

class Emitter {
    constructor() {
        this.events = {};
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((callback) => {
                callback(...args);
            });
        }
    }
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
        }
    }
    once(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        const onceCallbackFuntion = (...args) => {
            callback(...args);
            this.off(eventName, onceCallbackFuntion);
        };
        this.events[eventName].push(onceCallbackFuntion);
    }
}

class Countdown {
    constructor(opt) {
        this.timer = null;
        this.ft = opt.format || 'dd天hh时mm分ss秒';
        this.list = opt.list || [];
        this.key = opt.timeKey;
        this.type = opt.type;
        this.update();
    }
    update() {
        this.operation(1);
    }
    cancel() {
        this.operation(0);
    }
    calc(item) {
        const time = item[this.key];
        const e = (new Date(String(time).replace(/-/g, "/")).getTime() - +new Date()) / 1e3;
        const t = Math.floor(e % 86400 / 3600);
        const t1 = t / 60;
        const t2 = e % 60;
        const date = {
            d: Math.floor(e / 86400) <= 0 ? '00' : Math.floor(e / 86400), //还剩多少天
            h: parseInt(String(t)) <= 0 ? '00' : String(parseInt(String(t))).padStart(2, '0'), // 还剩多少时
            m: parseInt(String(t1)) <= 0 ? '00' : String(parseInt(String(t1))).padStart(2, '0'), //还剩多少分
            s: parseInt(String(t2)) <= 0 ? '00' : String(parseInt(String(t2))).padStart(2, '0'), //还剩多少秒
        };
        if (this.type == 1) {
            // @ts-ignore
            return this.ft.replace(/d|h{1,2}|m{1,2}|s{1,2}|S/g, (a) => a[0] === 'd' || a.length === 2 ? date[a[0]] : Number(date[a[0]]));
        }
        else {
            item['d'] = date.d;
            item['h'] = date.h;
            item['m'] = date.m;
            item['s'] = date.s;
        }
    }
    operation(type) {
        if (type == 0) { //cancel
            clearInterval(this.timer);
            this.timer = null;
        }
        else if (type == 1) { //update
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(() => {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.type === 1) {
                        this.list[i].end = this.calc(this.list[i]);
                    }
                    else {
                        this.calc(this.list[i]);
                    }
                }
            }, 1000);
        }
    }
}

class AsyncSource {
    constructor() {
        this.map = new Map; // 任务对象
        this.waitMap = new Map; // 等待map对象
    }
    // 缓存中是否有该任务
    has(name) {
        return this.map.has(name);
    }
    // 从缓存中获取该任务的结果
    get(name) {
        return this.map.get(name);
    }
    // 缓存该任务的结果
    set(name, value) {
        this.map.set(name, value);
    }
    // 删除该任务的结果
    delete(name) {
        this.map.delete(name);
    }
    // 添加等待该任务结果的函数
    wait(name, resolve, reject) {
        const waits = this.waitMap.get(name) || [];
        waits.push({ resolve, reject });
        this.waitMap.set(name, waits);
    }
    // 派发等待该任务结果的函数
    dispatchWait(name, val, isError) {
        if (this.waitMap.has(name)) {
            const waits = this.waitMap.get(name);
            for (let i = 0; i < waits.length; i++) {
                const wait = waits[i];
                isError ? wait.reject(val) : wait.resolve(val);
            }
        }
    }
    // 获取结果函数
    getResult(name, // 任务名字，字符串类型
    requestApi, // 请求接口，返回是一个promise
    cache // 是否缓存结果
    ) {
        // 任务名字
        const TaskName = `${name}TaskName`;
        // 出错任务名字
        const TaskErrName = `${name}TaskErrName`;
        // 如果缓存中没有这个任务，同时这个任务也没有出错
        if (!this.has(name) && !this.has(TaskName)) {
            // 那么对该次任务进行状态标记，关闭 if 入口，让后面相同任务进入 else 入口
            this.set(TaskName, true);
            // 开始请求数据
            return requestApi()
                .then((result) => {
                // 将成功返回的数据结果设置到缓存中
                this.set(name, result);
                // 触发等待任务列表，进行通知，当然是成功的通知，一对都对
                this.dispatchWait(name, result);
                // 返回结果
                return result;
            })
                .catch((err) => {
                // 缓存错误任务
                this.set(TaskErrName, err);
                // 触发等待任务列表，进行通知， 当然是失败的通知，一错都错
                this.dispatchWait(name, err, true);
                // 抛出错误
                throw err;
            }).finally(() => {
                // 成功失败与否，都已经出了结果，就把缓存标记状态删除，任务结束
                this.delete(TaskName);
                // 如果不缓存结果， 缓存1秒后删除 任务 和 错误任务
                if (!cache) {
                    setTimeout(() => {
                        this.delete(name);
                        this.delete(TaskErrName);
                    }, 1000);
                }
            });
        }
        else {
            // 如果同个任务已经在在缓存中了，就走到这里
            return new Promise((resolve, reject) => {
                // 先判断缓存中是否有任务结果
                if (this.has(name)) {
                    // 有就直接返回结果
                    resolve(this.get(name));
                }
                else if (this.has(TaskErrName)) { // 再判断缓存中是否有该次任务的错误任务
                    // 有就直接返回错误
                    reject(this.get(TaskErrName));
                }
                else {
                    // 没有就缓存等待任务，等待任务列表中，有结果了，就通知等待任务列表
                    this.wait(name, resolve, reject);
                }
            });
        }
    }
    // 清空任务列表
    clear() {
        this.map.clear();
    }
}

// 操作类型枚举
var OperationType;
(function (OperationType) {
    OperationType[OperationType["ADD"] = 1] = "ADD";
    OperationType[OperationType["GET"] = 2] = "GET";
    OperationType[OperationType["DELETE"] = 3] = "DELETE";
    OperationType[OperationType["UPDATE"] = 4] = "UPDATE";
    OperationType[OperationType["CLEAR"] = 5] = "CLEAR";
    OperationType[OperationType["CURSOR"] = 6] = "CURSOR";
    OperationType[OperationType["REFRESH"] = 7] = "REFRESH";
})(OperationType || (OperationType = {}));
// 自定义错误类
class IndexDBError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'IndexDBError';
    }
}
class IndexDB {
    constructor({ dbName, dbVersion, storeName, keyPath, indexes = [], handleVersionUpgrade }) {
        this.connectionTimeout = 5000;
        this.retryAttempts = 3;
        this.cache = new Map();
        this.listeners = new Map();
        this.dbName = dbName;
        this.dbVersion = dbVersion;
        this.storeName = storeName;
        this.indexes = indexes;
        this.keyPath = keyPath;
        this.db = null;
        this.handleVersionUpgrade = handleVersionUpgrade;
        this.ensureConnection();
    }
    on(event, callback) {
        var _a;
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.add(callback);
    }
    emit(event, data) {
        var _a;
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(callback => callback(data));
    }
    getWithCache(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }
            const value = yield this.get(key);
            this.cache.set(key, value);
            return value;
        });
    }
    ensureConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                this.db = yield this.connectWithRetry();
            return this.db;
        });
    }
    connectWithRetry() {
        return __awaiter(this, arguments, void 0, function* (attempts = 0) {
            try {
                return (yield Promise.race([
                    this.open(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), this.connectionTimeout))
                ]));
            }
            catch (error) {
                if (attempts < this.retryAttempts) {
                    console.warn(`Connection attempt ${attempts + 1} failed, retrying...`);
                    return this.connectWithRetry(attempts + 1);
                }
                throw new IndexDBError('Failed to connect to database', 500);
            }
        });
    }
    withTransaction(mode, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.ensureConnection();
            const transaction = db.transaction([this.storeName], mode);
            const store = transaction.objectStore(this.storeName);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                transaction.oncomplete = () => resolve(result);
                transaction.onerror = () => reject(transaction.error);
                let result;
                try {
                    result = yield callback(store);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    open() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (event) => {
                const error = event.target.error;
                reject(new IndexDBError('Failed to open database', (error === null || error === void 0 ? void 0 : error.code) || 500));
            };
            request.onsuccess = (event) => {
                const db = event.target.result;
                this.db = db;
                resolve(db);
            };
            request.onblocked = (event) => {
                console.warn('Database upgrade blocked. Please close other tabs/windows.');
                reject(new IndexDBError('Database upgrade blocked', 409));
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const oldVersion = event.oldVersion;
                const newVersion = event.newVersion || this.dbVersion;
                const transaction = event.target.transaction; // 获取事务对象
                try {
                    let store;
                    if (!db.objectStoreNames.contains(this.storeName)) {
                        store = db.createObjectStore(this.storeName, { keyPath: this.keyPath });
                    }
                    else {
                        store = transaction.objectStore(this.storeName);
                    }
                    this.indexes.forEach(({ name, keyPath: indexKeyPath, options = {} }) => {
                        if (!store.indexNames.contains(name)) {
                            store.createIndex(name, indexKeyPath, options);
                        }
                        else {
                            // 处理已存在索引的更新逻辑
                            const existingIndex = store.index(name);
                            if (existingIndex.keyPath !== indexKeyPath ||
                                existingIndex.unique !== options.unique ||
                                existingIndex.multiEntry !== options.multiEntry) {
                                store.deleteIndex(name);
                                store.createIndex(name, indexKeyPath, options);
                            }
                        }
                    });
                    if (this.handleVersionUpgrade) {
                        // 传递所有必要参数（关键修正）
                        this.handleVersionUpgrade(db, oldVersion, newVersion, transaction);
                    }
                }
                catch (error) {
                    console.error('Database upgrade failed:', error);
                    reject(new IndexDBError('Database upgrade failed', 500));
                }
            };
        });
    }
    action() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const { type = OperationType.ADD, data = {}, key, cb = () => { } } = options;
            try {
                const mode = type === OperationType.GET ? 'readonly' : 'readwrite';
                return yield this.withTransaction(mode, (store) => __awaiter(this, void 0, void 0, function* () {
                    switch (type) {
                        case OperationType.ADD:
                            return new Promise((resolve, reject) => {
                                const request = store.add(data);
                                request.onsuccess = () => {
                                    const itemKey = Array.isArray(this.keyPath)
                                        ? this.keyPath.map(k => data[k]).join('|')
                                        : data[this.keyPath];
                                    this.cache.set(itemKey, data);
                                    this.emit('add', data);
                                    resolve(request.result);
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.GET:
                            return new Promise((resolve, reject) => {
                                const request = store.get(key);
                                request.onsuccess = () => {
                                    const itemKey = String(key);
                                    this.cache.set(itemKey, request.result);
                                    resolve(request.result);
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.DELETE:
                            return new Promise((resolve, reject) => {
                                const request = store.delete(key);
                                request.onsuccess = () => {
                                    this.cache.delete(String(key));
                                    this.emit('delete', key);
                                    resolve(undefined);
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.UPDATE:
                            return new Promise((resolve, reject) => {
                                const request = store.put(data);
                                request.onsuccess = () => {
                                    const itemKey = Array.isArray(this.keyPath)
                                        ? this.keyPath.map(k => data[k]).join('|')
                                        : data[this.keyPath];
                                    this.cache.set(itemKey, data);
                                    this.emit('update', data);
                                    resolve(request.result);
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.CLEAR:
                            return new Promise((resolve, reject) => {
                                const request = store.clear();
                                request.onsuccess = () => {
                                    this.cache.clear();
                                    this.emit('clear');
                                    resolve(undefined);
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.CURSOR:
                            return new Promise((resolve, reject) => {
                                const request = store.openCursor();
                                request.onsuccess = (event) => {
                                    const cursor = event.target.result;
                                    if (cursor) {
                                        cb(cursor);
                                        cursor.continue();
                                    }
                                    else {
                                        resolve(undefined);
                                    }
                                };
                                request.onerror = () => reject(request.error);
                            });
                        case OperationType.REFRESH:
                            this.closeConnection();
                            this.db = yield this.open();
                            return this.db;
                        default:
                            throw new IndexDBError('Invalid operation type', 400);
                    }
                }));
            }
            catch (error) {
                console.error('IndexDB operation failed:', error);
                throw new IndexDBError(error.message || 'Operation failed', error.code || 500);
            }
        });
    }
    // 添加数据 1
    add(data) {
        return this.action({ type: OperationType.ADD, data });
    }
    // 获取数据 2
    get(key) {
        return this.action({ type: OperationType.GET, key });
    }
    // 删除数据 3
    del(key) {
        return this.action({ type: OperationType.DELETE, key });
    }
    // 更新数据 4
    put(data) {
        return this.action({ type: OperationType.UPDATE, data });
    }
    // 清空数据 5
    clear() {
        return this.action({ type: OperationType.CLEAR });
    }
    refresh() {
        return this.action({ type: OperationType.REFRESH });
    }
    each(cb) {
        return this.action({ type: OperationType.CURSOR, cb });
    }
    delDB(dbName) {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.deleteDatabase(dbName);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new IndexDBError('Failed to delete database', 500));
        });
    }
    // 批量操作方法
    bulkAdd(items) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.withTransaction('readwrite', (store) => __awaiter(this, void 0, void 0, function* () {
                yield Promise.all(items.map(item => new Promise((resolve, reject) => {
                    const request = store.add(item);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                })));
            }));
        });
    }
    bulkGet(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(keys.map(key => this.get(key)));
        });
    }
    // 添加通过索引查询的方法
    getByIndex(indexName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withTransaction('readonly', (store) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    try {
                        const index = store.index(indexName);
                        const request = index.getAll(value);
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(new Error('Failed to query by index'));
                    }
                    catch (error) {
                        reject(new Error('Index not found'));
                    }
                });
            }));
        });
    }
    /**
     * 范围查询
     * @param indexName 索引名称
     * @param range 范围条件
     * @param direction 查询方向
     */
    rangeQuery(indexName_1, range_1) {
        return __awaiter(this, arguments, void 0, function* (indexName, range, direction = 'next') {
            return this.withTransaction('readonly', (store) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    try {
                        const index = store.index(indexName);
                        let keyRange;
                        // 如果不是 IDBKeyRange 对象，则创建一个
                        if (!(range instanceof IDBKeyRange)) {
                            const { start, end, includes = true } = range;
                            if (start !== undefined && end !== undefined) {
                                keyRange = IDBKeyRange.bound(start, end, !includes, !includes);
                            }
                            else if (start !== undefined) {
                                keyRange = IDBKeyRange.lowerBound(start, !includes);
                            }
                            else if (end !== undefined) {
                                keyRange = IDBKeyRange.upperBound(end, !includes);
                            }
                        }
                        else {
                            keyRange = range;
                        }
                        const results = [];
                        const request = index.openCursor(keyRange, direction);
                        request.onsuccess = (event) => {
                            const cursor = event.target.result;
                            if (cursor) {
                                results.push(cursor.value);
                                cursor.continue();
                            }
                            else {
                                resolve(results);
                            }
                        };
                        request.onerror = () => reject(new Error('Range query failed'));
                    }
                    catch (error) {
                        reject(new Error('Index not found or query failed'));
                    }
                });
            }));
        });
    }
    /**
    * 删除存储空间（表）
    * @param storeName 要删除的表名
    */
    deleteStore(storeName) {
        return __awaiter(this, void 0, void 0, function* () {
            // 重要：关闭现有连接
            this.closeConnection();
            // 获取当前数据库版本
            const currentVersion = yield this.getCurrentDBVersion();
            const newVersion = currentVersion + 1;
            return new Promise((resolve, reject) => {
                // 关闭现有连接
                this.closeConnection();
                const request = window.indexedDB.open(this.dbName, newVersion);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (db.objectStoreNames.contains(storeName)) {
                        db.deleteObjectStore(storeName);
                    }
                };
                request.onsuccess = (event) => {
                    // 正确获取数据库实例
                    const db = event.target.result;
                    db.close(); // 关闭新连接
                    resolve();
                };
                request.onerror = () => reject(new Error('删除失败'));
            });
        });
    }
    // 获取数据库当前版本
    getCurrentDBVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const request = indexedDB.open(this.dbName);
                request.onsuccess = () => {
                    const db = request.result;
                    const version = db.version;
                    db.close();
                    resolve(version);
                };
            });
        });
    }
    // 添加关闭连接的方法
    closeConnection() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
    destroy() {
        this.closeConnection();
        this.cache.clear();
        this.listeners.clear();
    }
}
const indexdb = (config) => new IndexDB(config);

class Local {
    constructor() { }
    /**
     * @description 设置本地存储
     * @param {...*} args - 可变参数，支持多种参数格式
     */
    set(...args) {
        // 检测参数格式
        if (args.length === 1) {
            const o = args[0];
            if (Local.isObj(o)) {
                // 参数为对象时，遍历设置每个键值对
                for (let k in o)
                    Local.set(k, Local.toStr(o[k]));
            }
            else {
                console.error('Local Error(1 parameter): there is only one parameter, it must be a pure object');
            }
        }
        else if (args.length === 2) {
            const [a, b] = args;
            if (Local.isObj(a) && Local.isNum(b)) {
                // 第一个参数为对象且第二个参数为数字时，设置带过期时间的值
                for (let k in a)
                    Local.set(k, Local.toStr({ value: a[k], createTime: Date.now(), expireTime: Date.now() + b, _ISLOCAL: 1 }));
            }
            else if (!Local.isObj(a)) {
                // 参数为非对象时，设置单个值
                Local.set(a, Local.toStr(b));
            }
            else {
                console.error('Local Error(2 parameter): When there are two parameters, if the first is an object, the second parameter must be the expiration time');
            }
        }
        else if (args.length >= 3) {
            const [a, b, c] = args;
            if (Local.isStr(a) && Local.isNum(c)) {
                // 第一个参数为字符串且第三个参数为数字时，设置带过期时间的值
                Local.set(a, Local.toStr({ value: b, createTime: Date.now(), expireTime: Date.now() + c, _ISLOCAL: 1 }));
            }
            else {
                console.error('Local Error(3 parameter): The parameter is incorrect. The parameter format must be key-value-time');
            }
        }
    }
    /**
     * @description 获取本地存储
     * @param {*} a - 键名或键名数组
     * @param {*} d - 默认值
     * @returns {*} - 获取到的值或默认值
     */
    get(a, d) {
        // 如果单个键名不存在，返回默认值
        if (!Array.isArray(a) && !Local.hasOwn(a))
            return d === undefined ? null : d;
        // 如果键名数组中的键名都不存在或数组为空，返回默认值
        if (Array.isArray(a) && (!a.some(i => Local.hasOwn(i)) || !a.length))
            return d === undefined ? {} : d;
        if (Array.isArray(a)) {
            // 获取多个缓存数据
            const arr = a.filter(i => Local.hasOwn(i)); // 过滤出存在的键名
            return arr.reduce((p, c) => {
                p[c] = this.get(c, d);
                return p;
            }, {});
        }
        else if (Local.hasOwn(a)) {
            // 获取单个缓存数据
            let ret = null;
            try {
                // 尝试解析JSON字符串
                ret = Local.parse(a);
            }
            catch (e) {
                ret = Local.get(a);
            }
            if (Local.isObj(ret) && ret._ISLOCAL) {
                // 如果是带过期时间的值，检查是否过期
                if (ret.expireTime && ret.expireTime < Date.now()) {
                    Local.remove(a);
                    return d === undefined ? null : d; // 如果过期，返回默认值
                }
                else {
                    return ret.value; // 如果未过期，返回值
                }
            }
            else {
                return ret; // 返回值
            }
        }
    }
    /**
     * @description 删除本地存储
     * @param {string | string[]} k - 键名或键名数组
     */
    del(k) {
        if (typeof k === 'string') {
            Local.remove(k); // 删除单个键名对应的值
        }
        else if (Array.isArray(k)) {
            for (let i = 0, len = k.length; i < len; i++) {
                Local.hasOwn(k[i]) && Local.remove(k[i]); // 遍历删除键名数组中存在的项
            }
        }
    }
    /**
     * @description 清空本地存储
     */
    clear() {
        Local.local.clear(); // 清空所有本地存储
    }
}
// 静态属性，用于引用localStorage对象
Local.local = window.localStorage;
// 静态方法，用于设置localStorage
Local.set = Local.local.setItem.bind(Local.local);
// 静态方法，用于获取localStorage
Local.get = Local.local.getItem.bind(Local.local);
// 静态方法，用于移除localStorage中的项
Local.remove = Local.local.removeItem.bind(Local.local);
// 静态方法，用于解析存储的JSON字符串
Local.parse = (v) => JSON.parse(Local.get(v) || '{}');
// 静态方法，用于将对象转换为JSON字符串
Local.toStr = JSON.stringify;
// 静态方法，用于检查是否为字符串类型
Local.isStr = (v) => typeof v === 'string';
// 静态方法，用于检查是否为对象类型
Local.isObj = (v) => Object.prototype.toString.call(v) === '[object Object]';
// 静态方法，用于检查是否为数字类型
Local.isNum = (n) => Number.isInteger(n) && /^[+-]?\d+(\.\d+)?$/.test(String(n));
// 静态方法，用于检查localStorage中是否包含指定键名的项
Local.hasOwn = (a) => Object.prototype.hasOwnProperty.call(Local.local, a);
const local = new Local(); // 导出实例

class Session {
    set(...args) {
        if (Object.prototype.toString.call(args[0])) { // 设置多个值
            for (let key in args[0]) {
                Session.storage.setItem(key, JSON.stringify(args[0][key]));
            }
        }
        else if (args.length >= 2) { // 设置单个值
            Session.storage.setItem(args[0], JSON.stringify(args[1]));
        }
        else {
            console.error("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
        }
    }
    get(k) {
        if (Array.isArray(k)) {
            k = k.filter(i => Object.prototype.hasOwnProperty.call(Session.storage, i));
            return k.reduce((p, c) => {
                let value = Session.storage.getItem(c);
                try {
                    value = JSON.parse(value);
                }
                catch (e) { }
                p[c] = value;
                return p;
            }, {});
        }
        else {
            try {
                // @ts-ignore
                return JSON.parse(Session.storage.getItem(k));
            }
            catch (e) {
                return Session.storage.getItem(k);
            }
        }
    }
    del(k) {
        Session.storage.removeItem(k);
    }
    clear() {
        Session.storage.clear();
    }
}
// 静态属性，用于引用sessionStorage对象  
Session.storage = window.sessionStorage;
const session = new Session();

class Num {
    constructor(a) {
        this.a = 0;
        // 初始化计算器，如果没有提供初始值，则默认为0
        this.a = a || 0;
    }
    // 四舍五入到指定位数
    round(dight) {
        // 将输入的数字转换为字符串
        let n = Number(this.a).toString();
        // 结果
        let result = n;
        // 如果是科学计数法
        if (n.includes('e')) {
            // 分离系数和指数
            let [coefficient, exponent] = n.split('e');
            // 如果系数是小数进行抹平
            if (coefficient.includes('.')) {
                const arr = coefficient.split('.');
                const dotLen = arr[1].length;
                exponent = exponent - dotLen;
                coefficient = coefficient.replace('.', '');
            }
            // 处理指数大于0的情况（整数部分）
            if (exponent > 0) {
                // 构造补零部分
                const end = '0'.repeat(exponent);
                // 合并系数和补零部分
                const rt = coefficient + end;
                // 如果指定保留小数位数，则返回带小数的结果
                if (dight) {
                    result = rt + '.' + '0'.repeat(dight);
                }
                else if (exponent > coefficient.length || dight === undefined) { //  // 如果补零位数大于系数位数，直接返回结果
                    result = rt;
                }
                else { // 补零位数小于等于系数位数，截取结果 
                    result = (rt + '0'.repeat(dight)).slice(0, -1 * dight);
                }
            }
            else if (exponent < 0) { // 处理指数小于0的情况（小数部分）
                // 补零形成小数
                n = '0.' + coefficient.padStart(-exponent, 0);
                // 如果未指定小数位数，直接返回结果
                if (dight === undefined) {
                    result = n;
                }
                else {
                    // 四舍五入
                    const r = (Math.round(n * Math.pow(10, exponent) / (Math.pow(10, (exponent - dight)))) / Math.pow(10, dight)).toString();
                    // 处理科学计数法结果
                    if (r.includes('e')) {
                        let [coefficient, exponent] = r.split('e');
                        if (coefficient.includes('.')) {
                            const arr = coefficient.split('.');
                            const dotLen = arr[1].length;
                            exponent = exponent - dotLen;
                            coefficient = coefficient.replace('.', '');
                        }
                        // 返回补零形成的小数
                        result = '0.' + coefficient.padStart(-exponent, 0);
                    }
                    else {
                        // 返回四舍五入后的结果
                        result = r;
                    }
                }
            }
        }
        else { // 非科学计数法
            if (n.includes('.')) { // 处理小数
                // 如果未指定小数位数，直接返回结果
                if (dight === undefined) {
                    this.a = n;
                    return this;
                }
                const arr = n.split('.');
                let dotLen = arr[1].length;
                // 补零保留小数位数
                if (dight > dotLen) {
                    result = n.padEnd(n.length + dight - dotLen, '0');
                }
                else if (dight === undefined) { // 如果未指定小数位数，直接返回结果 
                    result = n;
                }
                else { // 四舍五入
                    const r = Math.round((n * (Math.pow(10, dotLen))) / (Math.pow(10, (dotLen - dight)))) / (Math.pow(10, dight));
                    if (Number.isInteger(r)) {
                        result = r.toFixed(dight);
                    }
                    else {
                        result = r;
                    }
                }
            }
            else { // 处理整数
                // 保留小数位数
                result = Number(n).toFixed(dight);
            }
        }
        // 更新计算器的值
        this.a = result;
        return this;
    }
    // 计算函数
    calc(type, a = 0, b = 0, digit) {
        var _a, _b;
        // 获取 a 和 b 的小数位数
        const aLen = ((_a = a.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const bLen = ((_b = b.toString().split('.')[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
        // 计算最大位数，用于保留计算结果的精度
        let maxLen = Math.pow(10, Math.max(aLen, bLen));
        // 检查计算类型是否合法
        if (![0, 1, 2, 3].includes(type))
            throw new Error('type参数错误');
        // 根据计算类型进行相应的运算
        const result = type === 0 ?
            (a * maxLen + b * maxLen) / maxLen : type === 1 ?
            (a * maxLen - b * maxLen) / maxLen : type === 2 ?
            (a * maxLen) * (b * maxLen) / (maxLen * maxLen) :
            (a * maxLen) / (b * maxLen);
        // 调用四舍五入函数对结果进行精度控制
        this.a = result;
        return this.round(digit).toValue();
    }
    // 加法
    add(b, digit) {
        let a = this.a;
        // 如果 a 是数组，则递归处理多个数的加法
        if (Array.isArray(b)) {
            this.a = b.length ? b.reduce((p, c) => (this.add(c, digit), this.a), a) : a;
        }
        else {
            this.a = this.calc(0, Number(a), Number(b), digit);
        }
        return this;
    }
    // 减法
    sub(b, digit) {
        let a = this.a;
        // 如果 a 是数组，则递归处理多个数的减法
        if (Array.isArray(b)) {
            this.a = b.length ? b.reduce((p, c) => (this.sub(c, digit), this.a), a) : a;
        }
        else {
            this.a = this.calc(1, Number(a), Number(b), digit);
        }
        return this;
    }
    // 乘法
    mul(b, digit) {
        let a = this.a;
        // 如果 a 是数组，则递归处理多个数的乘法
        if (Array.isArray(b)) {
            this.a = b.length ? b.reduce((p, c) => (this.mul(c, digit), this.a), a) : a;
        }
        else {
            this.a = this.calc(2, Number(a), Number(b), digit);
        }
        return this;
    }
    // 除法
    div(b, digit) {
        let a = this.a;
        // 如果 a 是数组，则递归处理多个数的除法
        if (Array.isArray(b)) {
            if (!a) {
                this.a = 0;
            }
            else {
                this.a = b.length ? b.reduce((p, c) => (this.div(c, digit), this.a), a) : a;
            }
        }
        else {
            if (!a || !b) {
                this.a = 0;
            }
            else {
                this.a = this.calc(3, Number(a), Number(b), digit);
            }
        }
        return this;
    }
    // 获取当前值
    toValue() {
        return this.a;
    }
}
const num = function (a) {
    return new Num(a);
};

class ImageHotSpot {
    constructor(options) {
        // 定义一个私有变量container，类型为HTMLElement或null
        this.container = null;
        // 定义一个私有变量canvas，类型为HTMLElement或null
        this.canvas = null;
        // 定义一个私有变量isInit，类型为boolean，默认值为false
        this.isInit = false;
        // 定义一个私有变量handleMouseDownFunc，类型为(e: MouseEvent) => void
        this.handleMouseDownFunc = (event) => { };
        // 定义一个私有变量scale，类型为number，默认值为1
        this.scale = 1;
        // 定义一个私有变量hotImgWidth，类型为number
        this.hotImgWidth = 0;
        // 定义一个私有变量hotImgHeight，类型为number
        this.hotImgHeight = 0;
        // 构造函数，接收一个参数options
        this.options = options;
        // 调用init方法
        this.init();
    }
    // Initialize instance
    // 初始化方法
    init() {
        // 如果options.el是字符串，则获取该字符串对应的DOM元素，否则直接赋值给container
        this.container = typeof this.options.el === "string" ? document.querySelector(this.options.el) : this.options.el;
        // 如果container不存在，则抛出错误
        if (!this.container) {
            throw new Error(`${this.options.el || ""} container is not found`);
        }
        // 如果options.addMode不存在，则默认为"default"
        this.options.addMode = this.options.addMode || "default";
        // 初始化默认属性
        this.initDefaultProps();
        // 初始化正方形位置
        this.initSquarePos();
        // 如果options.customUpload不等于true，则重置初始化
        if (this.options.customUpload !== true) {
            this.resetInit();
        }
    }
    // 初始化默认配置属性
    initDefaultProps() {
        var _a, _b, _c, _d, _e, _f, _g, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        // size 存在就使用size，否则使用width和height
        // 从this.options?.handle中解构出size、width、height、borderColor、backgroundColor
        const { size, width = '8px', height = '8px', borderColor = '#1447FF', backgroundColor = '#1447FF' } = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.handle) || {};
        // 定义handleCommonStyle，包含position、border、background-color、box-sizing、width、height
        const handleCommonStyle = `position: absolute;border: 1px solid ${borderColor};background-color: ${backgroundColor};box-sizing: border-box;width: ${size || width};height: ${size || height};`;
        // 定义this.defaultProps，包含canvas、container、square、content、lt、lm、lb、bm、br、rm、tm、rt、seq、del
        this.defaultProps = {
            canvas: Object.assign({ className: "hot-container", cssText: `width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;` }, (((_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.style) === null || _c === void 0 ? void 0 : _c.canvas) || {})),
            // 热区最外层容器默认样式
            container: Object.assign({ className: "hot-container", cssText: `width: 100%; height: 100%; position: relative;` }, (((_e = (_d = this.options) === null || _d === void 0 ? void 0 : _d.style) === null || _e === void 0 ? void 0 : _e.container) || {})),
            // 热区包裹默认样式
            square: Object.assign({ className: "hot-square", cssText: `width: 88px; height: 88px; background-color: rgba(20, 71, 255, 0.2); border: 1px dashed ${borderColor}; cursor: move; position: absolute; left: 0px; top: 0px; opacity: 1; box-sizing: border-box;` }, (((_g = (_f = this.options) === null || _f === void 0 ? void 0 : _f.style) === null || _g === void 0 ? void 0 : _g.square) || {})),
            // 热区内容元素默认样式
            content: Object.assign({ className: "hot-content", cssText: `display:none` }, (((_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.style) === null || _k === void 0 ? void 0 : _k.content) || {})),
            lt: Object.assign({ className: "lt", cssText: `${handleCommonStyle}cursor: nw-resize;top: -4px;left: -4px;` }, (((_m = (_l = this.options) === null || _l === void 0 ? void 0 : _l.style) === null || _m === void 0 ? void 0 : _m.lt) || {})),
            lm: Object.assign({ className: "lm", cssText: `${handleCommonStyle}cursor: e-resize;top: 50%;left: -4px;transform: translateY(-50%);` }, (((_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.style) === null || _p === void 0 ? void 0 : _p.lm) || {})),
            lb: Object.assign({ className: "lb", cssText: `${handleCommonStyle}cursor: ne-resize;bottom: -4px;left: -4px;` }, (((_r = (_q = this.options) === null || _q === void 0 ? void 0 : _q.style) === null || _r === void 0 ? void 0 : _r.lb) || {})),
            bm: Object.assign({ className: "bm", cssText: `${handleCommonStyle}cursor: n-resize;bottom: -4px;left: 50%;transform: translateX(-50%);` }, (((_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.style) === null || _t === void 0 ? void 0 : _t.bm) || {})),
            br: Object.assign({ className: "br", cssText: `${handleCommonStyle}cursor: se-resize;bottom: -4px;right: -4px;` }, (((_v = (_u = this.options) === null || _u === void 0 ? void 0 : _u.style) === null || _v === void 0 ? void 0 : _v.br) || {})),
            rm: Object.assign({ className: "rm", cssText: `${handleCommonStyle}cursor: e-resize;top: 50%;right: -4px;transform: translateY(-50%);` }, (((_y = (_x = this.options) === null || _x === void 0 ? void 0 : _x.style) === null || _y === void 0 ? void 0 : _y.rm) || {})),
            tm: Object.assign({ className: "tm", cssText: `${handleCommonStyle}cursor: n-resize;top: -4px;left: 50%;transform: translateX(-50%);` }, (((_0 = (_z = this.options) === null || _z === void 0 ? void 0 : _z.style) === null || _0 === void 0 ? void 0 : _0.tm) || {})),
            rt: Object.assign({ className: "rt", cssText: `${handleCommonStyle}cursor: ne-resize;top: -4px;right: -4px;` }, (((_2 = (_1 = this.options) === null || _1 === void 0 ? void 0 : _1.style) === null || _2 === void 0 ? void 0 : _2.rt) || {})),
            // 热区里面元素默认样式
            seq: Object.assign({ className: "hot-seq", cssText: `min-width: 14px; min-height: 14px; text-align: center; color: #fff; line-height: 14px; position: absolute; top: 0px; left: 0px; background-color: red; font-size: 10px;cursor:default` }, (((_4 = (_3 = this.options) === null || _3 === void 0 ? void 0 : _3.style) === null || _4 === void 0 ? void 0 : _4.seq) || {})),
            del: Object.assign({ className: "hot-del", cssText: `width: 16px; height: 16px; position: absolute; right: -20px; top: -20px; z-index: 2; cursor: pointer;` }, (((_6 = (_5 = this.options) === null || _5 === void 0 ? void 0 : _5.style) === null || _6 === void 0 ? void 0 : _6.del) || {}))
        };
    }
    // 初始化正方形位置
    initSquarePos() {
        // 将正方形位置初始化为一个对象，包含x、y、w、h四个属性
        this.squarePos = Object.assign({ x: 0, y: 0, w: 80, h: 80 }, (this.options.squarePos || {}));
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
        this.canvas.addEventListener("mousedown", this.handleMouseDownFunc);
        setTimeout(() => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.afterInit) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
    }
    // Generate hot area container
    // 生成热区容器
    generateContainer() {
        var _a;
        // 创建一个div元素，并设置其属性为this.defaultProps.canvas
        const canvas = this.createElement("div", Object.assign({}, this.defaultProps.canvas));
        // 将canvas元素添加到this.container中
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(canvas);
        // 将canvas元素赋值给this.canvas
        this.canvas = canvas;
    }
    isNum(n) {
        const str = String(n);
        return typeof n == 'symbol' ? false : !isNaN(parseFloat(str)) && isFinite(Number(str));
    }
    // Add hot area
    addHotArea({ x = this.squarePos.x, y = this.squarePos.y, w = this.squarePos.w, h = this.squarePos.h } = {}, isForceAdd) {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.beforeAdd) === null || _b === void 0 ? void 0 : _b.call(_a, this.hasBackgroundImage())) {
            return Promise.reject(new Error("beforeAdd return false"));
        }
        // 添加热区先检测热区画布容器存在不
        if (!this.canvas || !this.container) {
            return Promise.reject(new Error("Please initialize the instance first"));
        }
        if (this.options.addMode === 'default' || isForceAdd) {
            if (this.isNum(this.options.upperLimit) && this.container.querySelectorAll(".hot-square").length >= Number(this.options.upperLimit)) {
                return Promise.reject(new Error("upperLimit is exceeded"));
            }
            const seq = this.container.querySelectorAll(".hot-square").length + 1;
            const square = this.createHotSquare(seq, { style: { left: parseFloat(x) + "px", top: parseFloat(y) + "px", width: parseFloat(w) + "px", height: parseFloat(h) + "px" } });
            this.canvas.appendChild(square);
            (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.afterAdd) === null || _d === void 0 ? void 0 : _d.call(_c, { seq, square });
            return Promise.resolve({ index: seq - 1, square });
        }
        else {
            return Promise.reject(new Error("options addMode is not default"));
        }
    }
    // Create hot square element
    createHotSquare(seq, props) {
        return this.createElement("div", Object.assign(Object.assign({}, this.defaultProps.square), props), [this.createElement('div', Object.assign({}, this.defaultProps.content), this.createElement('div', Object.assign({}, this.defaultProps.lt)), this.createElement('div', Object.assign({}, this.defaultProps.lm)), this.createElement('div', Object.assign({}, this.defaultProps.lb)), this.createElement('div', Object.assign({}, this.defaultProps.bm)), this.createElement('div', Object.assign({}, this.defaultProps.br)), this.createElement('div', Object.assign({}, this.defaultProps.rm)), this.createElement('div', Object.assign({}, this.defaultProps.rt)), this.createElement('div', Object.assign({}, this.defaultProps.tm)), this.createElement('div', Object.assign({}, this.defaultProps.del), this.createElement('div', { className: 'lines', cssText: ` width: 16px;height: 16px;position: relative;cursor: pointer;border-radius: 50%;background: #ff4b4b;transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);display: flex;align-items: center;justify-content: center;` }, [
                this.createElement('div', { className: 'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(45deg);` }),
                this.createElement('div', { className: 'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(-45deg);` }),
            ]))),
            this.createElement('div', Object.assign({}, this.defaultProps.seq), seq),
        ]);
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
                Reflect.deleteProperty(props, 'cssText'); // 处理完就删除避免重复处理
            }
            // 处理常规 style 属性
            if (props.style) {
                if (typeof props.style === 'string') {
                    element.style.cssText = props.style;
                }
                else if (typeof props.style === 'object') {
                    Object.assign(element.style, props.style);
                }
                Reflect.deleteProperty(props, 'style');
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
                const eventType = key.slice(2).toLowerCase();
                element.addEventListener(eventType, value);
                continue;
            }
            // 处理style对象
            if (key === 'style') {
                if (typeof value === 'object') {
                    Object.assign(element.style, value);
                }
                else if (typeof value === 'string') {
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
        children = children.flat(Infinity).filter((child) => {
            // 过滤无效节点
            return child !== null && child !== undefined && child !== false;
        }).map((child) => {
            // 转换原始值为文本节点
            return typeof child === 'string' || typeof child === 'number'
                ? document.createTextNode(String(child))
                : child;
        });
        // 添加子节点
        children.forEach((child) => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
            else {
                console.warn('Invalid child element:', child);
            }
        });
        return element;
    }
    // Delete hot area
    delHotArea(el) {
        const squareItem = el.closest(".hot-square");
        if (squareItem) {
            const seq = squareItem.querySelector(".hot-seq").innerText * 1;
            const delFunc = () => {
                squareItem.remove();
                this.resetHotSeq(seq);
            };
            if (typeof this.options.beforeDel === "function") {
                this.options.beforeDel(seq, squareItem, delFunc);
            }
            else {
                delFunc();
            }
        }
    }
    // Reset hot area index
    resetHotSeq(seq) {
        if (!this.container)
            return;
        const squares = this.container.querySelectorAll(".hot-square");
        squares.forEach((item) => {
            const indexContent = item.querySelector(".hot-seq");
            if (indexContent) {
                const itemIndex = Number(indexContent.innerText);
                if (itemIndex > seq) {
                    indexContent.innerText = String(itemIndex - 1);
                }
            }
        });
    }
    // Mouse down event
    handleMouseDown(e) {
        e.preventDefault(); // Prevent default behavior
        if (!this.canvas)
            return;
        const { target } = e;
        const className = target.className;
        const delItem = target.closest(".hot-del");
        if (delItem)
            return this.delHotArea(delItem);
        let content = null;
        if (["lt", "lm", "lb", "bm", "br", "rm", "rt", "tm", "hot-square"].includes(className)) {
            const square = className === "hot-square" ? target : target.closest(".hot-square");
            const existContent = this.canvas.querySelector(".hot-active");
            if (existContent && existContent.parentElement !== square) {
                existContent.classList.remove("hot-active");
                existContent.style.display = "none";
            }
            content = square.querySelector(".hot-content");
            if (content && !content.classList.contains("hot-active")) {
                content.classList.add("hot-active");
                content.style.display = "block";
                square.style.zIndex = String(this.getMaxZIndex() + 1);
            }
            this.startDrag(e, square, className, content);
        }
        else if (className === "hot-container" && this.options.addMode === 'manual') {
            const pos = this.canvas.getBoundingClientRect();
            const dix = pos.left;
            const diy = pos.top;
            let recordX = e.clientX - dix;
            let recordY = e.clientY - diy;
            const square = this.createElement("div", { className: "hot-line", style: { left: recordX + "px", top: recordY + "px", width: "0px", height: "0px", border: "1px solid red", boxSizing: 'border-box', position: 'absolute' } });
            this.canvas.appendChild(square);
            let width = 0;
            let height = 0;
            const squareLeft = square.offsetLeft;
            const squareTop = square.offsetTop;
            const maxWidth = this.canvas.offsetWidth - squareLeft;
            const maxHeight = this.canvas.offsetHeight - squareTop;
            const squareWidth = square.offsetWidth;
            const squareHeight = square.offsetHeight;
            document.onmousemove = (ev) => {
                const { clientX, clientY } = ev;
                const deltaX = e.clientX - clientX;
                const deltaY = e.clientY - clientY;
                const w = clientX - dix - recordX;
                const h = clientY - diy - recordY;
                let _w = w;
                let _h = h;
                if (clientX < e.clientX) {
                    _w = squareWidth + deltaX;
                    _w = _w > squareLeft ? squareLeft : _w;
                    recordX = clientX - dix;
                    recordX = recordX < 0 ? 0 : recordX;
                }
                else {
                    _w = w > maxWidth ? maxWidth : w;
                }
                if (clientY < e.clientY) {
                    _h = squareHeight + deltaY;
                    _h = _h > squareTop ? squareTop : _h;
                    recordY = clientY - diy;
                    recordY = recordY < 0 ? 0 : recordY;
                }
                else {
                    _h = h > maxHeight ? maxHeight : h;
                }
                square.style.left = recordX + "px";
                square.style.top = recordY + "px";
                square.style.width = _w + "px";
                square.style.height = _h + "px";
                width = _w;
                height = _h;
            };
            document.onmouseup = (e) => {
                var _a, _b;
                square && ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.removeChild(square));
                const creat = () => this.addHotArea({
                    x: recordX + 'px',
                    y: recordY + 'px',
                    w: width + 'px',
                    h: height + 'px',
                }, true);
                // 手动触发
                if (((_b = this.options) === null || _b === void 0 ? void 0 : _b.addMode) === 'manual') {
                    // 满足绘制条件尺寸
                    if (width > 16 && height > 16) {
                        // 有传入手动新增函数
                        if (typeof this.options.manualAdd === 'function') {
                            const hasBackgroundImage = this.hasBackgroundImage();
                            // 不需要上传图片
                            if (this.options.customUpload !== true) {
                                this.options.manualAdd(creat) && creat();
                            }
                            else if (this.options.customUpload === true && hasBackgroundImage) {
                                this.options.manualAdd(creat) && creat();
                            }
                        }
                        else {
                            creat();
                        }
                    }
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
    // Start drag event
    startDrag(e, square, className, content) {
        var _a, _b;
        const { clientX: startX, clientY: startY } = e;
        const startWidth = square.offsetWidth;
        const startHeight = square.offsetHeight;
        const startLeft = parseInt(square.style.left) || 0;
        const startTop = parseInt(square.style.top) || 0;
        const containerWidth = ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        const containerHeight = ((_b = this.canvas) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        const maxLeft = containerWidth - startWidth;
        const maxTop = containerHeight - startHeight;
        const minSize = 20;
        document.onmousemove = (ev) => {
            this.handleMouseMove(ev, className, square, startX, startY, startWidth, startHeight, startLeft, startTop, maxLeft, maxTop, minSize, containerWidth, containerHeight);
        };
        document.onmouseup = () => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.overlapCallback) === null || _b === void 0 ? void 0 : _b.call(_a, this.areElementsOverlapping(this.canvas));
            if (content)
                content.style.opacity = '1';
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
    // Handle mouse move event
    handleMouseMove(ev, className, square, startX, startY, startWidth, startHeight, startLeft, startTop, maxLeft, maxTop, minSize, containerWidth, containerHeight) {
        const deltaX = ev.clientX - startX;
        const deltaY = ev.clientY - startY;
        switch (className) {
            case "hot-square":
                this.moveSquare(square, startLeft, startTop, deltaX, deltaY, maxLeft, maxTop);
                break;
            case "lt":
                this.resizeLT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "lb":
                this.resizeLB(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "rt":
                this.resizeRT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "br":
                this.resizeBR(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "lm":
                this.resizeLM(square, startWidth, startLeft, deltaX, minSize, containerWidth);
                break;
            case "rm":
                this.resizeRM(square, startWidth, startLeft, deltaX, minSize, containerWidth);
                break;
            case "tm":
                this.resizeTM(square, startHeight, startTop, deltaY, minSize, containerHeight);
                break;
            case "bm":
                this.resizeBM(square, startHeight, startTop, deltaY, minSize, containerHeight);
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
    resizeLT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
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
    resizeLB(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
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
    resizeRT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
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
    resizeBR(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
        let newWidth = startWidth + deltaX;
        let newHeight = startHeight + deltaY;
        if (newWidth < minSize)
            newWidth = minSize;
        if (startLeft + newWidth > containerWidth) {
            newWidth = containerWidth - startLeft;
        }
        if (newHeight < minSize)
            newHeight = minSize;
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
        if (newHeight < minSize)
            newHeight = minSize;
        if (startTop + newHeight > containerHeight) {
            newHeight = containerHeight - startTop;
        }
        square.style.height = `${newHeight}px`;
    }
    // Upload hot area image
    uploadHotImg(src) {
        return new Promise((resolve, reject) => {
            var _a;
            const img = new Image();
            img.src = src;
            img.style.cssText = "position:absolute;left:0;top:0;opacity:0";
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(img);
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
        var _a, _b;
        if (!this.isInit)
            this.resetInit();
        if (!this.container || !this.canvas)
            return;
        const { offsetWidth: containerWidth, offsetHeight: containerHeight } = this.container;
        const imageAspectRatio = w / h;
        const containerAspectRatio = containerWidth / containerHeight;
        let scale;
        if (this.options.scaleMode === "auto" &&
            w < containerWidth &&
            h < containerHeight) {
            scale = 1;
        }
        else {
            if (imageAspectRatio > containerAspectRatio) {
                scale = containerWidth / w;
            }
            else {
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
        const canvasStyle = ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.canvas) || {};
        // 覆盖默认的画布样式
        Object.keys(canvasStyle).forEach((k) => {
            if (this.canvas) {
                this.canvas.style[k] = canvasStyle[k];
            }
        });
        this.scale = scale;
        this.hotImgWidth = w * scale;
        this.hotImgHeight = h * scale;
        resolve({ w: this.hotImgWidth, h: this.hotImgHeight, scale: this.scale });
    }
    hasBackgroundImage() {
        if (!this.canvas)
            return false;
        const style = getComputedStyle(this.canvas);
        const bgImage = style.backgroundImage;
        // 检查 backgroundImage 是否为有效图片路径
        return bgImage !== 'none' && bgImage.includes('url(');
    }
    delImage() {
        var _a;
        if (!this.canvas)
            return;
        this.canvas.style.backgroundImage = 'none';
        this.canvas.style.display = 'none';
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square").forEach((i) => i.remove());
    }
    // Destroy instance
    destroy() {
        var _a, _b, _c;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square").forEach((i) => i.remove());
        (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this.container) === null || _c === void 0 ? void 0 : _c.removeEventListener("mousedown", this.handleMouseDownFunc);
        this.canvas = null;
        this.isInit = false;
        this.container = null;
    }
    // Get maximum z-index
    getMaxZIndex() {
        var _a;
        const divs = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square");
        if (divs === null || divs === void 0 ? void 0 : divs.length) {
            return Math.max(...Array.from(divs).map((i) => parseInt(getComputedStyle(i).zIndex) || 1));
        }
        return 1;
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
                if (!(rect2.left > rect1.right ||
                    rect2.right < rect1.left ||
                    rect2.top > rect1.bottom ||
                    rect2.bottom < rect1.top)) {
                    return true; // 有重叠
                }
            }
        }
        return false; // 无重叠
    }
    // mode: array | object
    getHotAreaData(mode = "array") {
        const container = this.container;
        const list = container.querySelectorAll(".hot-square");
        const hotSquares = Array.from(list);
        const map = hotSquares.reduce((acc, current) => {
            const seqElement = current.querySelector(".hot-seq");
            if (!seqElement)
                return acc;
            const index = parseInt(seqElement.innerText) - 1;
            const x = parseFloat(current.style.left || "0");
            const y = parseFloat(current.style.top || "0");
            // 类型保护：确保在对象模式下操作
            const objAcc = acc;
            objAcc[index] = { x, y, w: current.offsetWidth, h: current.offsetHeight, index };
            return objAcc;
        }, {});
        if (mode === "array") {
            return Object.values(map);
        }
        else {
            return map;
        }
    }
}

class JumpWithParameters {
    constructor() {
        this.mapKey = 'JUMPWITHPARAMETERS';
        this.initCachedData();
    }
    // 获取会话窗口的缓存数据
    initCachedData() {
        const cache = session.get(this.mapKey);
        if (cache) {
            this.cachedData = cache;
        }
        else {
            session.set(this.mapKey, {});
            this.cachedData = {};
        }
    }
    getCachedData(key) {
        return this.cachedData[key];
    }
    setCachedData(sessionKey, data, callbaclk) {
        this.cachedData[sessionKey] = data;
        session.set(this.mapKey, this.cachedData);
        callbaclk && callbaclk(sessionKey);
    }
    clearCachedData(sessionKey) {
        if (this.cachedData[sessionKey]) {
            delete this.cachedData[sessionKey];
            session.set(this.mapKey, this.cachedData);
        }
    }
}

export { AsyncSource, Countdown, Emitter, ImageHotSpot, JumpWithParameters, add, addStyleCss, arrayGroup, arrayRestore, arrayToTree, attrFilter, base64ToBlob, base64ToFile, bfs, blobToBase64, blobToFile, browser, bufferFileDownload, bytesFormat, calc, copyText, debounce, deepClone, delBy, difference, div, downloadByBase64, fileToBase64, fileToBlob, filterEmoji, findIndexs, fmtNum, formData, getMaxZIndex, getQuery, getRepeat, getScrollDirection, groupBy, guid, indexdb, intersection, isEqual, isRepeat, isValidNum, local, make, moneyToChinese, mul, num, pick, pluckDeep, queryNode, queryPath, range, rangeStep, reg, round, selectTextByElement, session, sub, sumBigNumber, throttle, treeToArray, trigger, truncateTextToFit, union, unique, urlSerialize, urlTmtFmt };
