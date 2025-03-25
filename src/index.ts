

/**
 * Array 数组操作
 */
export { unique } from './Array/unique' // 数组去重
export { bfs } from './Array/bfs' // 数组 广度优先遍历
export { range } from './Array/range' // 数字数组生成器
export { rangeStep } from './Array/rangeStep' // 生成指定范围内指定步长的数组
export { findIndexs } from './Array/findIndexs' // 查询满足条件的所有索引
export { delBy } from './Array/delBy' // 根据条件删除数组中的值
export { arrayGroup } from './Array/arrayGroup' // 数组按标识进行分组 （分组后顺序不变）
export { arrayRestore } from './Array/arrayRestore' // 数组按标识进行数组状态还原
export { difference } from './Array/difference' // 计算两个数组的差集 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
export { intersection } from './Array/intersection' // 计算两个数组的交集 对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
export { union } from './Array/union' // 计算两个数组的并集 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
export { getRepeat } from './Array/getRepeat' // 获取json数组中的所有重复项和非重复项
export { groupBy } from './Array/groupBy' // 对数组进行分组，分组依据是数组中对象的某个属性
export { make } from './Array/make' // 数组项键值 随意重组，比如数组项的 某个值作为key，某个键作为值
export { pick } from './Array/pick' // json数组项筛选指定键值留下，其余键值去掉


/**
 * Browser 浏览器环境
 */

export { browser } from './Browser'


/**
 * Dom 对象操作
 */
export { addStyleCss } from './Dom/addStyleCss' // 添加 css
export { copyText } from './Dom/copyText' // 复制文本内容
export { debounce } from './Dom/debounce' // 防抖
export { throttle } from './Dom/throttle' // 节流
export { trigger } from './Dom/trigger' // 手动触发Dom事件
export { formData } from './Dom/formData' // 对象转 FormData
export { getMaxZIndex } from './Dom/getMaxZIndex' // 获取页面最高层级 z-index
export { getScrollDirection } from './Dom/getScrollDirection' // 获取滚动方向
export { selectTextByElement } from './Dom/selectTextByElement' // 设置元素里面文字呈选中状态

/**
 * File 对象操作
 */

export { base64ToBlob } from './File/base64ToBlob'
export { base64ToFile } from './File/base64ToFile'
export { blobToBase64 } from './File/blobToBase64'
export { blobToFile } from './File/blobToFile'
export { fileToBase64 } from './File/fileToBase64'
export { fileToBlob } from './File/fileToBlob'
export { bytesFormat } from './File/bytesFormat' 
export { bufferFileDownload } from './File/bufferFileDownload' // Buffer下载文件
export { downloadByBase64 } from './File/downloadByBase64' // base64数据导出文件下载


/**
 * Is 判断
 */
export { isEqual } from './Is/isEqual'
export { isRepeat } from './Is/isRepeat'
export { isValidNum } from './Is/isValidNum'

/**
 * Number 数字操作
 */
export { sumBigNumber } from './Number/sumBigNumber' // 超大字符串数字求和
export { fmtNum } from './Number/fmtNum' // 数字格式化
export { round } from './Number/round' // 四舍五入函数
export { calc } from './Number/calc' // 加减乘除函数
export { add } from './Number/add' // 加法
export { sub } from './Number/sub' // 减法
export { mul } from './Number/mul' // 乘法
export { div } from './Number/div' // 除法

/**
 * Object 对象操作
 */

export { pluckDeep } from './Object/pluckDeep'
export { deepClone } from './Object/deepClone'
export { attrFilter } from './Object/attrFilter'

/**
 * Reg 对象操作
 */

export { reg } from './Reg'

/**
 * String 对象操作
 */

export { filterEmoji } from './String/filterEmoji'
export { moneyToChinese } from './String/moneyToChinese'
export { guid } from './String/guid'

/**
 * Tree 树操作
 */
export { treeToArray } from './Tree/treeToArray' //树转数组
export { arrayToTree } from './Tree/arrayToTree' // 数组转树
export { queryNode } from './Tree/queryNode' // 查询树节点
export { queryPath } from './Tree/queryPath' // 查询数路径


/**
 * URL 对象操作
 */

export { getQuery } from './URL/getQuery'
export { urlSerialize } from './URL/urlSerialize'
export { urlTmtFmt } from './URL/urlTmtFmt'

/**
 * Class 类
 */
export { Emitter } from './Class/Emitter'
export { Countdown } from './Class/Countdown'
export { AsyncSource } from './Class/AsyncSource'
export { indexdb } from './Class/IndexDB'
export { local } from './Class/Local'
export { session } from './Class/Session'
export { num } from './Class/Num'
export { default as ImageHotSpot } from './Class/ImageHotSpot'



