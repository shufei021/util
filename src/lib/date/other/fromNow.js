import diff from '../display/diff'
/**
 * @description 获取距离现在多久了
 * @param {*} date 传入的日期
 * @param {*} format 
 */
const fromNow = function (date) {
    // 获取秒数
    const second  = diff(new Date(), date, 'second',true)
    const convert = (unit='month')=>diff(new Date(), date, unit)
    let res = ''
    if(second<60){ //  小于60秒，返回几秒前
        res = '几秒前'
    } else if(parseInt(second/60)<60){ // 大于等于60秒，由秒换算成分钟后，分钟数小于60，返回N分钟前
        res = parseInt(second/60)+'分钟前'
    }else if(parseInt(second/60)<60*24){ // 如果分钟数大于等于60，同时又小于24小时✖60分钟的 分钟数，返回 N小时前
        res = parseInt(second/3600)+'小时前' 
    } else if(!convert()){ // 相差不满一个月，则返回 N天前
        res = convert('day')+'天前'
    }else if(convert()<12){ // 相差月大于等于1 同时小于12个月，则返回 N 月前
        res = convert()+'个月前'
    } else { // 大于等于12个月 ，返回 N 年前 
        res = parseInt(convert()/12)+'年前'
    }
    return res
}
export default fromNow