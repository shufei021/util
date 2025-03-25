# ImgHot 使用文档

`ImgHot` 是一个用于创建和管理图片热区的编辑器类，支持图片上传、热区添加、拖拽、缩放等功能。

## 核心功能

- 支持图片上传和缩放适配
- 支持热区的添加、删除
- 支持热区的拖拽移动
- 支持热区的8个方向调整大小
- 支持热区重叠检测
- 支持自定义样式配置

## 优点

- 功能完整，覆盖了热区编辑的主要需求
- 支持自定义样式配置，灵活性好
- 有基本的边界检查和最小尺寸限制
- 支持图片自适应缩放 

## 安装

确保在项目中引入 `ImgHot` 类的 JavaScript 文件。

```html
<script src="path/to/ImgHot.js"></script>
```

## 初始化

创建 `ImgHot` 实例时需要传入配置选项。

```javascript
const imgHot = new ImgHot({
  el: '#container', // 容器元素的选择器或 DOM 元素
  customUpload: true, // 是否自定义上传图片
  addMode: 'default', // 热区添加模式：'default' 或 'manual'
  scaleMode: 'auto', // 缩放模式：'auto' 或 'fit'
  handle: {
    size: '8px', // 手柄大小
    borderColor: '#1447FF', // 手柄边框颜色
    backgroundColor: '#1447FF' // 手柄背景颜色
  },
  style: {
    canvas: {
      border: '1px dashed red' // 画布样式
    },
    square: {
      backgroundColor: 'rgba(20, 71, 255, 0.2)' // 热区样式
    }
  },
  beforeAdd: () => {
    console.log('Before adding a hot area');
  },
  beforeDel: (index, element, callback) => {
    console.log(`Before deleting hot area ${index}`);
    callback(); // 执行删除
  },
  overlapCallback: (isOverlapping) => {
    console.log(`Hot areas are ${isOverlapping ? '' : 'not '}overlapping`);
  }
});
```

## 方法

### `addHotArea(options)`

添加一个热区。

- **参数**: 
  - `options` (Object): 热区配置选项
    - `x` (string): 热区 X 坐标
    - `y` (string): 热区 Y 坐标
    - `w` (string): 热区宽度
    - `h` (string): 热区高度

- **返回**: `Promise<{index: number, square: HTMLElement}>`

### `uploadHotImg(src)`

上传并显示热区图片。

- **参数**: 
  - `src` (string): 图片的 URL 或 Base64 编码

- **返回**: `Promise<void>`

### `delHotArea(element)`

删除指定的热区。

- **参数**: 
  - `element` (HTMLElement): 要删除的热区元素

### `destroy()`

销毁 `ImgHot` 实例，清理所有热区和事件监听。

### `getHotAreaData(mode)`

获取热区数据。

- **参数**: 
  - `mode` (string): 返回数据的格式，'array' 或 'object'

- **返回**: `Array` 或 `Object`


## 事件

- **`beforeAdd`**: 添加热区前的回调
- **`beforeDel`**: 删除热区前的回调
- **`overlapCallback`**: 热区重叠检测的回调

## 示例

```javascript
document.querySelector('#addHotArea').onclick = () => {
  imgHot.addHotArea({ x: '10px', y: '10px', w: '100px', h: '100px' });
};

document.querySelector('#uploadImage').onchange = function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    imgHot.uploadHotImg(reader.result);
  };
  reader.readAsDataURL(file);
};
```

## 注意事项

- 确保容器元素在 DOM 中存在。
- 确保图片资源可访问。
- 使用 `destroy()` 方法清理实例，避免内存泄漏。
