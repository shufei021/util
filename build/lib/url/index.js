!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).url=t()}(this,function(){"use strict";return{getQuery:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.location.href;try{return e.includes("?")?e.split("?")[1].match(/([^&=]*)=([^&]*)/g).reduce(function(e,t){return e[t.split("=")[0]]=decodeURIComponent(t.split("=")[1]),e},{}):{}}catch(e){return{}}},urlSerialize:function(n){var o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(o).reduce(function(e,t){return e+((e===n?"?":"&")+"".concat(t,"=").concat(encodeURIComponent(o[t])))},n)},urlTmtFmt:function(e){var o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=/\{(\w+)\}/g.test(e)?e.replace(/\{(\w+)\}/g,function(e,t){var n=o[t];return delete o[t],n}):e;return Object.keys(o).length?Object.keys(o).reduce(function(e,t){return e+((e===n?"?":"&")+"".concat(t,"=").concat(o[t]))},n):n}}});