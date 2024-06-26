const u = window.navigator.userAgent
const isChrome = !!u.match(/Chrome/i)
const isMobile = !!(u.match(/(iPhone|iPad|iPod)/i) || u.match(/Android/i) || u.match(/Windows Phone/i) || u.match(/IEMobile/i))
const isPC = !(u.match(/(iPhone|iPad|iPod)/i) || u.match(/Android/i) || u.match(/Windows Phone/i) || u.match(/IEMobile/i))
const isIos = !!u.match(/(iPhone|iPad|iPod)/i)
const isAndroid = !!u.match(/Android/i)
// @ts-ignore
const isTencentAgent = u.match(/MicroMessenger/i) == 'MicroMessenger' //MicroMessenger是微信的关键字。
// @ts-ignore
const isWx = isTencentAgent && u.match(/wxwork/i) != 'wxwork'
// @ts-ignore
const isWxMobile = isTencentAgent && u.match(/wxwork/i) != 'wxwork' && u.match(/Mobile/i) == 'Mobile'
// @ts-ignore
const isWxPc = isTencentAgent && u.match(/wxwork/i) != 'wxwork' && u.match(/Mobile/i) != 'Mobile'
// @ts-ignore
const isWxWork = isTencentAgent && u.match(/wxwork/i) == 'wxwork' // wxwork是企业微信关键字
// @ts-ignore
const isWxWorkMobile = isTencentAgent && u.match(/wxwork/i) == 'wxwork' && u.match(/Mobile/i) == 'Mobile'
// @ts-ignore
const isWxWorkPc = isTencentAgent && u.match(/wxwork/i) == 'wxwork' && u.match(/Mobile/i) != 'Mobile' && !isMobile()

const isFirefox = u.includes('Firefox')
const isSafari = /Safari/.test(u) && !/Chrome/.test(u)
const isMac = /macintosh|mac os x/i.test(u)
const isWindow = ['win32','wow32','win64','wow64'].some(i=>u.toLowerCase().includes(i))
const isWindow32 = ['win32','wow32'].some(i=>u.toLowerCase().includes(i))
const isWindow64 = ['win64','wow64'].some(i=>u.toLowerCase().includes(i))

/**
 * 浏览器环境
 */
export const browser = {
    isChrome, // 是否Chrome浏览器
    isMobile, // 是否移动端
    isPC,// 是否 PC
    isIos, // 是否IOS
    isAndroid, // 是否安卓
    isWx, // 是否微信
    isWxMobile, // 是否微信移动端
    isWxPc, // 是否微信PC端
    isWxWork, // 是否企业微信
    isWxWorkMobile, // 是否企业微信移动端
    isWxWorkPc, // 是否企业微信PC端
    isFirefox, // 是否是火狐浏览器
    isSafari, // 是否是isSafari浏览器
    isMac, // 是否MAC
    isWindow, // 是否Window
    isWindow32, // 是否
    isWindow64
}