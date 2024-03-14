/*
 * @Author: your name
 * @Date: 2021-09-28 10:44:21
 * @LastEditTime: 2023-07-11 15:53:43
 * @LastEditors: yangshaolong
 * @Description: In User Settings Edit
 * @FilePath: \util\src\index.js
 */
import '../polyfill'
// base
import base from './base'
// array
import array from './array'
// dom
import dom from './dom'
// number
import num from './num'
// browser
import browser from './browser'
// object
import obj from './obj'
// string
import string from './str'
// regExp
import reg from './reg'
// url
import url from './url'
// file
import file from './file'
// local
import local from './local'
// seesion
import session from './session'
// date
import date from './date'
// extend
import * as extend from './extend'
// storage
import storage from './storage'
// indexdb 注释
import indexdb from './indexdb'
export default {
    ...base,
    ...array,
    ...dom,
    ...num,
    ...browser,
    ...obj,
    ...string,
    ...url,
    ...file,
    ...extend,
    ...indexdb,
    local,
    session,
    reg,
    date,
    version: packageVersion,
    build_date: __buildDate__,
    storage
}