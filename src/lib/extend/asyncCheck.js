/**
 * @description 同步验证多个条件函数
 * @param { Array } vaildList 验证列表
 * @param { Object } commonParamMap 公共参数对象
 * @param { Function } errCallBack 错误时的回调
 * @returns function
 */
export default function asyncCheck(vaildList = [], commonParamMap = {}, errCallBack){
    return function (successCallBack){
        let ret = null
        for (let i = 0; i < vaildList.length; i++) {
            const item = vaildList[i]
            if( typeof item === 'function'){
                const result = item(commonParamMap)
                if(result) {
                    ret = result
                    break
                }
            } else {
                if(item) {
                    ret=item
                    break
                }
            }
        }
        if(ret){
            errCallBack && errCallBack(ret)
        } else {
            successCallBack && successCallBack()
           
        }
    }
}

