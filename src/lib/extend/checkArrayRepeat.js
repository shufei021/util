
import allKeysFilterValid from './allKeysFilterValid'
import isEquals from '../base/isEquals'

export default function checkArrayRepeat (arr, { isDelInvalidProp = false, InvalidPropArr = [],excludeProp = []} = {}, errCallBack) {
    return function(successCallBack){
        // 数组无值，返回无重复
        if (!arr.length){
            return new Error('数组不能为空')
        }

        // 格式胡 arr数组每项值，去除无效属性
        if(isDelInvalidProp && InvalidPropArr.length) allKeysFilterValid(arr, InvalidPropArr)

        // 进一步 去除 arr数组每项值 选定的属性
        const list = arr.map((item) => {
            excludeProp.forEach(key => {
                delete item[key]
            })
            return item
        })

        // 外层索引
        let fistIndex = -1
        // 找到重复的内层索引
        let relativeIndex = -1
        // 内层是否退出循环
        let innerBreak = false
        // 重复项
        let repeatItem = null
        // 双层遍历寻找第一个重复项 索引
        for (let i = 0; i < list.length; i++) {
            if (innerBreak) break
            for (let j = i + 1; j < list.length; j++) {
                if (isEquals(list[i], list[j])) {
                    fistIndex = i
                    relativeIndex = j
                    repeatItem = arr[i]
                    innerBreak = true
                    break
                }
            }
        }
        // 有重复项
        if (repeatItem) {
            errCallBack({
                repeatItem,
                fistIndex,
                relativeIndex,
            })
        } else {
            successCallBack()
        }
    }
}