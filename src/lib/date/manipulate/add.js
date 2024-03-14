
import format from '../display/format'
import { FORMAT_DEFAULT } from '../utils'
import daysInMonth from "../display/daysInMonth"
/**
 * @description:
 * @param {*} value
 * @param {*} unit
 * @param {*} dt
 * @param {*} ft
 */
const add = function (value, unit, dt = new Date(), ft = FORMAT_DEFAULT) {
    let d = new Date(dt)

    unit = typeof unit === 'string' && unit.length > 1 ? unit.toLowerCase() : unit
    switch (unit) {
        case 'day':
        case 'd':
            d.setDate(d.getDate() + value)
            break
        case 'week':
        case 'w':
            d.setDate(d.getDate() + 7 * value)
            break
        case 'month':
        case 'M':
            // 原来的月份
            const oldMonth = d.getMonth()
            // 设置的月份
            const setMonth = oldMonth + value
            // 原来的日期
            const oldDate = d.getDate()
            const cloneDate = new Date(format(d,'YYYY/MM/01 HH:mm:ss'))
            cloneDate.setMonth(setMonth)
            d.setMonth(setMonth)
            const nowMonth = d.getMonth()
            if(setMonth !== nowMonth){
                const setDate = Math.min(daysInMonth(cloneDate), oldDate)
                d = new Date(cloneDate)
                d.setDate(setDate)
            }
            break
        case 'quarter':
        case 'Q':
            d.setMonth(d.getMonth() + 3 * value)
            break
        case 'year':
        case 'y':
            d.setFullYear(d.getFullYear() + value)
            break
        case 'hour':
        case 'h':
            d.setHours(d.getHours() + value)
            break
        case 'minute':
        case 'm':
            d.setMinutes(d.getMinutes() + value)
            break
        case 'second':
        case 's':
            d.setSeconds(d.getSeconds() + value)
            break
        case 'millisecond':
        case 'ms':
            d.setMilliseconds(d.getMilliseconds() + value)
    }
    return format(d, ft)
}
export default add
