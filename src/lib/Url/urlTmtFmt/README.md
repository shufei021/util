# urlTmtFmt

## 说明

urlTmtFmt 是一个用于格式化 url 的函数。

## 参数解析

```js
/**
 * @description URL模板参数格式化（GET请求URL模板）
 * @param {String} urlTmp 模板路径，例如：'/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}' 或 '/uap/msg/announcementRecord'
 * @param {Object} params 传入的参数，包含路径参数或不包含
 * @param {Boolean} isCompose 是否拼接路径和查询参数
 * @returns {String} 格式化后的URL
 */
```

## 使用

```js
 // 场景1：模板路径包含路径参数，传入参数包含所有路径参数和额外查询参数，拼接路径和查询参数
const a = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', { sysId: '123', tenantId: '456', userId: '789', query: 'test' }, true);
// 期望结果：'/uap/msg/announcementRecord/123/456/789?query=test'

// 场景2：模板路径包含路径参数，传入参数包含所有路径参数但不包含额外查询参数，拼接路径
const a1 = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', { sysId: '123', tenantId: '456', userId: '789' }, true);
// 期望结果：'/uap/msg/announcementRecord/123/456/789'

// 场景3：模板路径包含路径参数，传入参数不包含所有路径参数但包含额外查询参数，拼接路径和查询参数
const a2 = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', { sysId: '123', query: 'test' }, true);
// 期望结果：' /uap/msg/announcementRecord/123/undefined/undefined?query=test'

// 场景4：模板路径包含路径参数，传入参数为空对象，不拼接路径和查询参数
const a3 = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', {}, true);
// 期望结果：'/uap/msg/announcementRecord/undefined/undefined/undefined'

// 场景5：模板路径不包含路径参数，传入参数包含额外查询参数，拼接查询参数
const a4 = urlTmtFmt('/uap/msg/announcementRecord', { query: 'test' }, true);
// 期望结果：'/uap/msg/announcementRecord?query=test'

// 场景6：模板路径不包含路径参数，传入参数为空对象，不拼接路径和查询参数
const a5 = urlTmtFmt('/uap/msg/announcementRecord', {}, true);
// 期望结果：'/uap/msg/announcementRecord'

// 场景7：模板路径包含路径参数，传入参数包含所有路径参数和额外查询参数，不拼接路径和查询参数
const a6 = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', { sysId: '123', tenantId: '456', userId: '789', query: 'test' }, false);
// 期望结果：'/uap/msg/announcementRecord/123/456/789'

// 场景8：模板路径包含路径参数，传入参数不包含所有路径参数但包含额外查询参数，不拼接路径和查询参数
const a7 = urlTmtFmt('/uap/msg/announcementRecord/{sysId}/{tenantId}/{userId}', { sysId: '123', query: 'test' }, false);
// 期望结果：'/uap/msg/announcementRecord/123/undefined/undefined'   
```
