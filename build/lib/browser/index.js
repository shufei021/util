!function(i,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):(i="undefined"!=typeof globalThis?globalThis:i||self).browser=o()}(this,function(){"use strict";function i(){return!!M.match(/Chrome/i)}function o(){return!!(M.match(/(iPhone|iPad|iPod)/i)||M.match(/Android/i)||M.match(/Windows Phone/i)||M.match(/IEMobile/i))}function n(){return!(M.match(/(iPhone|iPad|iPod)/i)||M.match(/Android/i)||M.match(/Windows Phone/i)||M.match(/IEMobile/i))}function e(){return!!M.match(/(iPhone|iPad|iPod)/i)}function t(){return!!M.match(/Android/i)}function r(){return b&&"wxwork"!=M.match(/wxwork/i)}function s(){return b&&"wxwork"!=M.match(/wxwork/i)&&"Mobile"==M.match(/Mobile/i)}function c(){return b&&"wxwork"!=M.match(/wxwork/i)&&"Mobile"!=M.match(/Mobile/i)}function u(){return b&&"wxwork"==M.match(/wxwork/i)}function w(){return b&&"wxwork"==M.match(/wxwork/i)&&"Mobile"==M.match(/Mobile/i)}function a(){return b&&"wxwork"==M.match(/wxwork/i)&&"Mobile"!=M.match(/Mobile/i)&&!o()}function f(){return M.includes("Firefox")}function d(){return/Safari/.test(M)&&!/Chrome/.test(M)}function h(){return/macintosh|mac os x/i.test(M)}function m(){return["win32","wow32","win64","wow64"].some(function(i){return M.toLowerCase().includes(i)})}function l(){return["win32","wow32"].some(function(i){return M.toLowerCase().includes(i)})}function x(){return["win64","wow64"].some(function(i){return M.toLowerCase().includes(i)})}var M=window.navigator.userAgent,b="MicroMessenger"==M.match(/MicroMessenger/i);return i.is=i(),o.is=o(),n.is=n(),e.is=e(),t.is=t(),r.is=r(),s.is=s(),c.is=c(),u.is=u(),w.is=w(),a.is=a(),f.is=f(),d.is=d(),h.is=h(),m.is=m(),l.is=l(),x.is=x(),{isChrome:i,isMobile:o,isPC:n,isIos:e,isAndroid:t,isWx:r,isWxMobile:s,isWxPc:c,isWxWork:u,isWxWorkMobile:w,isWxWorkPc:a,isFirefox:f,isSafari:d,isMac:h,isWindow:m,isWindow32:l,isWindow64:x}});