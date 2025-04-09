# ImgHotSpot

ImgHotSpot 是一个基于 JavaScript 和 div 实现的图片热区编辑工具类插件，支持动态上传图片、热区交互编辑与自适应缩放，适用于复杂图片标注场景。




[codesandbox](https://codesandbox.io/p/sandbox/image-hotspot-tu-pian-re-qu-lkczjc)
![GIF 2025-3-28 14-55-20.gif](https://p26-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/9039eaa8f3b34bab88cbd8a0bd93e670~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6:q75.awebp?rk3s=bb34011d&x-expires=1744267667&x-signature=yQ6ifytiHClRCtGDW4osNfsLtRo%3D)


[codesandbox](https://codesandbox.io/p/sandbox/qx8n4t)
![GIF 2025-3-28 13-56-30.gif](https://p26-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/0af482617a2d46258fd69247b8ffdd36~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6:q75.awebp?rk3s=bb34011d&x-expires=1744267667&x-signature=ajbI78OcC87KK3iLlF7RpEO1T90%3D)

## 快速开始

 **1.引入类库**

```js
npm i img-hotspot
```


**2. 基础用法**

```js
import ImageHotSpot from 'img-hotspot'

// 初始化实例
const hotSpot = new ImgHotSpot({
  el: "#container", // 容器元素
  addMode: "default", // 热区添加模式：default（直接添加）或 manual（手动绘制）
  scaleMode: "auto", // 图片缩放模式：auto（自动适应容器）或自定义
  style: { /* 自定义样式 */ },
});

// 上传图片并设置热区背景
hotSpot.uploadHotImg("image.jpg").then(() => {
  // 添加热区
  hotSpot.addHotArea({ x: 10, y: 10, w: 80, h: 80 });
});

// 获取热区数据
const data = hotSpot.getHotAreaData("array"); // 返回数组或对象
```

## 初始化配置

>构造函数参数 options 的完整配置：

|参数名	|类型	|默认值	|说明|
| :-------- | :-------------- | :------- | :------- |
|el	|String/HTMLElement	|必填	|容器元素 ID 或 DOM 对象|
|addMode|	String|	"default"|	热区添加模式：default（直接添加）或 manual（鼠标拖拽绘制）|
|scaleMode|	String	|"auto"|	图片缩放模式，auto 表示根据容器自动适配, fit 放大 |
|customUpload|	Boolean|false	|是否必须上传热区图片（若为 true，需手动调用 uploadHotImg）|
|style|	Object|	{}	|覆盖默认样式（详见 样式自定义）|
|beforeAdd|	Function|	-	|添加热区前的回调，返回 Promise 可控制是否继续|
|afterAdd|	Function|	-	|添加热区后的回调，参数为 { index, square }|
|beforeDel|	Function|	-	|删除热区前的回调，需手动调用 delFunc 执行删除|
|overlapCallback|	Function|	-	|热区拖动结束时触发，返回是否重叠的布尔值|
|delImage|	Function|	-	|删除上传的热区图片|

## 方法说明

**1. 核心方法**

|方法名|	参数|	返回值|	说明|
| :-------- | :-------------- | :------- | :------- |
|addHotArea()|	{ x, y, w, h }, isForceAdd（可选）|	Promise|	添加热区，isForceAdd 强制覆盖 addMode 限制|
|delHotArea(el)|	el（热区元素）|	-	|删除指定热区|
|uploadHotImg(src)|	src（图片路径）|	Promise	|上传图片并自动缩放|
|getHotAreaData(mode)|	mode（"array" 或 "object"）|	Array/Object|	获取热区数据，包含 x, y, w, h, index|
|destroy()	|-	|-|	销毁实例，清理 DOM 和事件监听|

**2. 辅助方法**

|方法名|	说明|
| :-------- | :-------------- |
|getMaxZIndex()|	获取当前最大热区最大的 z-index 值|
|areElementsOverlapping()|	检测热区是否重叠，返回 true/false|

**1. beforeAdd**

在添加热区前触发，可用于校验：

```js
new ImgHotSpot({
  beforeAdd: () => {
    if (condition) return Promise.resolve();
    else return Promise.reject("拒绝添加");
  }
});
```
**2. afterAdd**

> 热区添加成功后触发：

```js
new ImgHotSpot({
  afterAdd: ({ index, square }) => {
    console.log(`热区 ${index} 已添加`, square);
  }
});
```

**3. beforeDel**

>删除热区前触发，需手动执行删除操作：

```js
new ImgHotSpot({
  beforeDel: (index, square, delFunc) => {
    if (confirm("确认删除？")) delFunc();
  }
});
```

**样式自定义**
通过 options.style 覆盖默认样式：

```js
new ImgHotSpot({
  style: {
    canvas: { cssText: "border: 2px solid red;" }, // 画布样式
    square: { cssText: "background: rgba(255,0,0,0.1);" }, // 热区容器
    lt: { cssText: "cursor: crosshair;" }, // 左上角调整手柄
    del: { cssText: "right: -10px;" } // 删除按钮
  }
});
```

### 示例代码

**1. 手动绘制热区**

```js
const hotSpot = new ImgHotSpot({
  el: "#container",
  addMode: "manual",
  afterAdd: ({ seq }) => console.log(`新增热区 ${seq}`),
});

// 上传图片后，用户可通过鼠标拖拽绘制热区
hotSpot.uploadHotImg("image.jpg");
```
**2. 导出数据并校验重叠**

```js
// 获取热区数据（数组格式）
const data = hotSpot.getHotAreaData("array");

// 检测重叠
if (hotSpot.areElementsOverlapping()) {
  alert("存在重叠热区！");
}
```

## 注意事项
+ 容器尺寸：确保容器有明确宽高（如 width: 500px; height: 300px）。

+ 图片缩放：scaleMode: "auto" 时，图片会根据容器自动缩放，热区坐标需基于缩放后的尺寸。

+ 事件监听：销毁实例时需调用 destroy()，避免内存泄漏。

+ 浏览器兼容：推荐现代浏览器（支持 ES6+）。

有疑问请加wx

![企业微信截图_17431466959447.png](https://p26-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/04b23ef0b326474582e274fd073db8d4~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6:q75.awebp?rk3s=bb34011d&x-expires=1744267667&x-signature=ooiHObPeSszuX1U17VbbMY7di1I%3D)
