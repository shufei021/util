/**
 * @description: 传入日期是否就是当天
 * @param {Date | String | Number} dt：
 * @return {Boolean}
 */
// isToday 极短代码片段
const isToday =  (dt = new Date())=>['getFullYear', 'getMonth', 'getDate'].every(i => new Date()[i]() === new Date(typeof dt === 'string'&&dt.includes('-')?dt.replace(/-/g,'/'):dt)[i]())

export default isToday
