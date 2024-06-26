
// https://regexr.com/
export const reg = {
    // 验证不能包含字母
    isNoWord: (value:string) : boolean => /^[^A-Za-z]*$/g.test(value),
    // 验证中文和数字
    isCHNAndEN: (value:string) : boolean =>/^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value),
    // 验证邮政编码(中国)
    isPostcode: (value:string) : boolean => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value),
    // 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
    isWeChatNum: (value:string) : boolean => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value),
    // 验证16进制颜色
    isColor16: (value:string) : boolean=> /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value),
    //验证火车车次
    isTrainNum: (value:string) : boolean => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value),
    //  验证必须带端口号的网址(或ip)
    isHttpAndPort: (value:string) : boolean => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value),
    //验证网址(支持端口和"?+参数"和"#+参数)
    isRightWebsite: (value:string) : boolean => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value),
    //验证统一社会信用代码
    isCreditCode: (value:string) : boolean => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value),
    //验证版本号格式必须为X.Y.Z
    isVersion: (value:string) : boolean => /^\d+(?:\.\d+){2}$/g.test(value),
    //验证图片链接地址（图片格式可按需增删）
    isImageUrl: (value:string) : boolean => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value),
    //验证中文姓名
    isChineseName: (value:string) : boolean => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value),
    //验证英文姓名
    isEnglishName: (value:string) : boolean => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value),
    //验证车牌号(新能源)
    isLicensePlateNumberNER: (value:string) : boolean => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value),
    // 验证车牌号(非新能源)
    isLicensePlateNumberNNER: (value:string) : boolean => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value),
    //验证车牌号(新能源+非新能源)
    isLicensePlateNumber: (value:string) : boolean =>/^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(value),
    //验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
    isMPStrict: (value:string) : boolean => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value),
    //验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
    isMPRelaxed: (value:string) : boolean => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value),
    // 验证email(邮箱) 收录自 有赞 vant 的 https://github.com/youzan/vant/blob/2.x/src/utils/validate/email.ts
    isEmail: (value:string) : boolean => /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value),
    //验证座机电话(国内),如: 0341-86091234
    isLandlineTelephone: (value:string) : boolean => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value),
    //验证护照（包含香港、澳门）
    isPassport: (value:string) : boolean => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value),
    //验证中文/汉字
    isChineseCharacter: (value:string) : boolean =>/^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(value),
    //验证小数
    isDecimal: (value:string) : boolean => /^\d+\.\d+$/g.test(value),
    //是否为整数
    isInteger:  (value:string) : boolean=>typeof value === 'number' && !isNaN(value) && value % 1 === 0,
    //验证数字
    isNumberStr: (value:string) : boolean => /^\d{1,}$/g.test(value),
    //验证qq号格式
    isQQNum: (value:string) : boolean => /^[1-9][0-9]{4,10}$/g.test(value),
    //验证数字和字母组成
    isNumAndStr: (value:string) : boolean => /^[A-Za-z0-9]+$/g.test(value),
    //验证英文字母
    isEnglish: (value:string) : boolean => /^[a-zA-Z]+$/g.test(value),
    // 验证大写英文字母
    isCapital: (value:string) : boolean => /^[A-Z]+$/g.test(value),
    //验证小写英文字母
    isLowercase: (value:string) : boolean => /^[a-z]+$/g.test(value),
    //验证是否包含 字母、中文、数字
    isNumEnglishChinese: (value:string) : boolean => /^[0-9a-zA-Z\u4e00-\u9fa5]+$/g.test(value),
    // 验证手机或座机
    isContactNumber: (value:string) : boolean=>/^((\d{3,4}-\d{7,8})|(((13[0-9])|(14[5-9])|(16[5-6])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|(19[1,8-9]))\d{8}))$/.test(value),
    // 是否包含表情
    isContainFace: (val:string) : boolean => {
        const regs = [
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
        /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
        /[\uE000-\uF8FF]/g
        ]
        return regs.some(reg=>reg.test(val))
    }
}