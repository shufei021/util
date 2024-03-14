!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).obj=t()}(this,function(){"use strict";var i=function(){return Array.from(arguments).reduce(function(e,t){var r,n=e,o=t;for(r in o)n[r]=n[r]&&"[object Object]"===n[r].toString()?i(n[r],o[r]):n[r]=o[r];return n},{})};function n(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach(function(e){y(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t,r){return(t=function(e){e=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"==typeof e?e:String(e)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function o(t,r){var e,n;return t===r||(t instanceof Date&&r instanceof Date?t.getTime()===r.getTime():!t||!r||"object"!==u(t)&&"object"!==u(r)?t===r:t.prototype===r.prototype&&(e=Object.keys(t)).length===Object.keys(r).length&&(n=function(e){return Object.prototype.toString.call(e).slice(8,-1)},Array.isArray(t)&&Array.isArray(r)&&t.length===r.length||"Object"==n(t)&&"Object"==n(r))&&e.every(function(e){return o(t[e],r[e])}))}var l=function(e,t){return f(e)===t};return{merge:i,clone:function(e){var t,r={};for(t in e)r[t]=e[t];return r},deepClone:function(e){return i=[],c=[],function e(t){if(null===t)return null;if("object"!==u(t))return t;l(t,"array")?r=[]:l(t,"regexp")?(r=new t.constructor(t.source,/\w*$/.exec(t)),t.lastIndex&&(r.lastIndex=t.lastIndex)):r=l(t,"date")?new Date(t.getTime()):(o=Object.getPrototypeOf(t),Object.create(o));var r,n,o=i.indexOf(t);if(-1!==o)return c[o];for(n in i.push(t),c.push(r),t)r[n]=e(t[n]);return r}(e);var i,c},findKey:function(e,t){for(var r in e)if("function"==typeof t&&t(e[r])||Array.isArray(t)&&e[r][t[0]]===t[1]||"string"==typeof t&&t in e[r]||o(e[r],t))return r},convertKey:function e(t,r,n){if(!["array","object"].includes(f(t)))throw new TypeError("The first argument should be either an object or an array！");if("[object Object]"!==Object.prototype.toString.call(r))throw new TypeError("The parameter keyMap should be an object!");var o=Array.isArray(t)?[]:{};if(t instanceof Object)for(var i in t){var c=Object.keys(r).includes(i)?r[i]:i;o[c]=t[i],n&&["array","object"].includes(f(t[i]))&&Object.keys(t[i]).length&&(o[c]=e(t[i],r,n))}return o},objectRebuild:function(r,n){return n?Array.isArray(n)?n.reduce(function(e,t){return e[t]=r[t],e},{}):Object.keys(r).reduce(function(e,t){return n[t]&&(e[n[t]]=r[t]),e},{}):r},pluckDeep:function(t){return function(e){try{return t.split(".").reduce(function(e,t){return e[t]},e)}catch(e){}}},paramFormat:function(r){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(r).reduce(function(e,t){return n.isEmptyZero&&0===r[t]||n.isEmptyObject&&"[object Object]"===Object.prototype.toString.call(r[t])&&!Object.keys(r[t]).length||n.isEmptyArray&&Array.isArray(r[t])&&!r[t].length||n.isNull&&null===r[t]||(void 0!==n.isEmptyString&&!0!==n.isEmptyString||""!==r[t])&&(e[t]=r[t]),e},{})},switchData:function(e){var n=void 0===(t=e.data)?null:t,o=void 0===(t=e.sortAlias)?"index":t,i=void 0===(t=e.typeAlias)?"type":t,t=void 0===(t=e.switchType)?"object":t,r=e.cb,c=void 0===r?null:r,u=void 0===(r=e.mapValueName)?"":r,f=void 0===(r=e.types)?[]:r;if(n)return Array.isArray(n)||"array"===t?n.filter(function(e){return!f.length||f.length&&f.includes(+e[i])}).reduce(function(e,t){return e[t[i]]="function"==typeof c?c(t):u?t[u]:t,e},{}):Object.keys(n).filter(function(e){return!f.length||f.length&&f.includes(+e)}).reduce(function(e,t){var r=a(a({},n[t]),{},y({},i,+t));return e[n[t][o]]="function"==typeof c?c(r):r,e},[]).filter(Boolean)},$$:function(e,r,t){return Array.isArray(e)&&"function"==typeof t&&(e=e.find(function(e){return t(e)})||{}),new Proxy(e,{get:function(e,t){return t.split(".").reduce(function(e,t){return(null==e?void 0:e[t])||r},e)}})}}});