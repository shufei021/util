!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(n="undefined"!=typeof globalThis?globalThis:n||self).array=r()}(this,function(){"use strict";function e(r,n){var t,e=Object.keys(r);return Object.getOwnPropertySymbols&&(t=Object.getOwnPropertySymbols(r),n&&(t=t.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),e.push.apply(e,t)),e}function i(r){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?e(Object(t),!0).forEach(function(n){o(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):e(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function c(n){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function o(n,r,t){return(r=function(n){n=function(n,r){if("object"!=typeof n||null===n)return n;var t=n[Symbol.toPrimitive];if(void 0===t)return("string"===r?String:Number)(n);t=t.call(n,r||"default");if("object"!=typeof t)return t;throw new TypeError("@@toPrimitive must return a primitive value.")}(n,"string");return"symbol"==typeof n?n:String(n)}(r))in n?Object.defineProperty(n,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[r]=t,n}function u(n){return function(n){if(Array.isArray(n))return f(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||a(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(n,r){var t;if(n)return"string"==typeof n?f(n,r):"Map"===(t="Object"===(t=Object.prototype.toString.call(n).slice(8,-1))&&n.constructor?n.constructor.name:t)||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(n,r):void 0}function f(n,r){(null==r||r>n.length)&&(r=n.length);for(var t=0,e=new Array(r);t<r;t++)e[t]=n[t];return e}function l(n,r){return void 0===r?n:Number(Math.round(n+"e"+(r||0))+"e-"+(r||0))}function s(n,t,r){return Array.isArray(n)?n.length?n.reduce(function(n,r){return s(n,r,t)},0):0:g(0,n,t,r)}function d(t,e){var n=[];if(e)n=t.reduce(function(n,r){return n.map(function(n){return n[e]}).includes(r[e])?n:[].concat(u(n),[r])},[]);else for(var r=0,o=t.length;r<o;r++)!function(r){0!=r&&n.some(function(n){return v(n,t[r])})||n.push(t[r])}(r);return n}function h(n,r){return Object.prototype.toString.call(n).slice(8,-1).toLowerCase()===r}function p(n){return r(n)}function y(n,r){for(var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"id",e=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"children",o=4<arguments.length?arguments[4]:void 0,i=0,u=n.length;i<u;i++){var c=n[i];if(o.push(c),c[t]===r)return o;if(c[e]&&c[e].length)if(y(c[e],r,t,e="children",o))return o;o.pop()}}var g=function(n,r,t,e){try{o=r.toString().split(".")[1].length}catch(n){o=0}try{i=t.toString().split(".")[1].length}catch(n){i=0}var o=Math.pow(10,Math.max(o,i)),i=[l((Math.round(o*r)+Math.round(o*t))/o,e),l((Math.round(o*r)-Math.round(o*t))/o,e),l(Math.round(o*r)*Math.round(o*t)/(o*o),e),l(Math.round(o*r)/Math.round(o*t),e)],r=String(l(i[n],e||0));return e?r.includes(".")?r.split(".")[0]+"."+r.split(".")[1].padEnd(e,0):(r+".").padEnd((r+".").length+e,0):i[n]},v=function r(t,e){var n,o;return t===e||(t instanceof Date&&e instanceof Date?t.getTime()===e.getTime():!t||!e||"object"!==c(t)&&"object"!==c(e)?t===e:t.prototype===e.prototype&&(n=Object.keys(t)).length===Object.keys(e).length&&(o=function(n){return Object.prototype.toString.call(n).slice(8,-1)},Array.isArray(t)&&Array.isArray(e)&&t.length===e.length||"Object"==o(t)&&"Object"==o(e))&&n.every(function(n){return r(t[n],e[n])}))},r=function(n){var i=[],u=[];return function n(r){if(null===r)return null;if("object"!==c(r))return r;h(r,"array")?t=[]:h(r,"regexp")?(t=new r.constructor(r.source,/\w*$/.exec(r)),r.lastIndex&&(t.lastIndex=r.lastIndex)):t=h(r,"date")?new Date(r.getTime()):(o=Object.getPrototypeOf(r),Object.create(o));var t,e,o=i.indexOf(r);if(-1!==o)return u[o];for(e in i.push(r),u.push(t),r)t[e]=n(r[e]);return t}(n)};return{union:function(r,n,t){return r.concat(n.filter(function(n){return t?!r.map(function(n){return n[t]}).includes(n[t]):!r.includes(n)}))},intersection:function(n,r,t){return n.filter(function(n){return t?r.map(function(n){return n[t]}).includes(n[t]):r.includes(n)})},archive:function(t,e){return Array.from(new Set(t.map(function(n){return n[e]}))).reduce(function(n,r){return n.push(t.filter(function(n){return n[e]===r})),n},[])},arrayFill:function(n,r){return Array(n).fill(r)},arrayToObject:function(n){return Array.from(n.entries()).reduce(function(n,r){return n[r[0]]=r[1],n},{})},arrayToTree:function r(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"pid";return t.filter(function(n){return n[o]===e}).map(function(n){return i(i({},n),{},{children:r(t,n.id,o)})})},delBy:function(n,r){for(var t=2<arguments.length&&void 0!==arguments[2]&&arguments[2]?n:JSON.parse(JSON.stringify(n)),e=t.length-1;0<=e;e--)if("function"==typeof r)r(t[e])&&t.splice(e,1);else if(Array.isArray(r))-1<r.indexOf(t[e])&&t.splice(e,1);else if(t[e]===r)t.splice(e,1);else if("Object"===Object.prototype.toString.call(r).slice(8,-1)){var o,i=t[e];for(o in r)Array.isArray(r[o])?-1<r[o].indexOf(i[o])&&t.splice(e,1):r[o]===i[o]&&t.splice(e,1)}return t},except:function(n,t,e){return[].concat(u(n),u(t)).filter(function(r){return![n,t].every(function(n){return e?n.map(function(n){return n[e]}).includes(r[e]):n.includes(r)})})},exchangePostion:function(n,r,t){n=3<arguments.length&&void 0!==arguments[3]&&arguments[3]?n:JSON.parse(JSON.stringify(n));return n.splice(r,1,n.splice(t,1,n[r])[0]),n},flatten:function t(n){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;return n.reduce(function(n,r){return n.concat(1<e&&Array.isArray(r)?t(r,e-1):r)},[])},group:function(e,o){return u(Array(Math.ceil(e.length/o)).keys()).reduce(function(n,r,t){return[].concat(u(n),[e.slice(t*o,(t+1)*o)])},[])},indexOfAll:function(n,e,o){return"function"==typeof e?n.reduce(function(n,r,t){return e(r)&&n.push(t),n},[]):n.reduce(function(n,r,t){return(o?r[e]===o:r===e)?[].concat(u(n),[t]):n},[])},insetPostion:function(n,r,t){n=3<arguments.length&&void 0!==arguments[3]&&arguments[3]?n:JSON.parse(JSON.stringify(n));return n.splice(t,0,n.splice(r,1)[0]),n},isRepeat:function(r,t){var e=r.length;try{for(var n=0;n<e;n++)for(var o=n+1;o<e;o++)if(v(r[n],r[o]))return!t||{repeatIndex:n,repeatItem:r[n],isRepeat:!0};return!!t&&{repeatIndex:-1,repeatItem:null,isRepeat:!1}}catch(n){return t?{repeatIndex:-1,repeatItem:null,isRepeat:e!==d(r).length}:e!==d(r).length}},mean:function(n,r){return(r?n.map("function"==typeof r?r:function(n){return n[r]}):n).reduce(function(n,r){return n+ +r},0)/n.length},range:function(t,n){return Array.from({length:n-t+1},function(n,r){return r+t})},rangeRandom:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1;if(!(3<arguments.length&&void 0!==arguments[3])||arguments[3])return Array.from({length:r},function(){return Math.floor(Math.random()*(n-t+1))+t});for(var e=Array.from({length:n-t+1},function(n,r){return r+t}),o=r>e.length?e.length:r,i=[];i.length!=o;){var u=e[Math.floor(Math.random()*e.length)];i.includes(u)||i.push(u)}return i},rangeScopeStartZore:function(n){return u(Object.keys(n).keys())},rangeStep:function(t,n,e){return Array.from({length:(n-t)/e+1},function(n,r){return t+r*e})},sample:function(n){return n[Math.floor(Math.random()*n.length)]},sum:function(n,t){var e="function"==typeof t;return n.reduce(function(n,r){return s(n,e?t(r):t?r[t]||0:r)},0)},timesTotal:function(n,t,e){return n.reduce(function(n,r){return(e?r[t]===e:r===t)?n+1:n},0)},unique:d,make:function(n,t,e){return n.reduce(function(n,r){return[].concat(u(n),[o({},r[t],r[e])])},[])},pick:function(n,r){return n.reduce(function(n,t){return[].concat(u(n),[r.reduce(function(n,r){return i(i({},n),{},o({},r,t[r]))},{})])},[])},treeToArray:function t(n){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"children";return(Array.isArray(n)?n:[n]).reduce(function(n,r){return[].concat(u(n),[r],u(t(r[e]||[])))},[])},queryNode:function(n,r){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"id",i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:"children",u=null;return function n(r,t){for(var e=0;e<r.length;e++){if(r[e][o]===t){u=r[e];break}r[e][i]&&r[e][i].length&&n(r[e][i],t)}}(n,r),u},getTreeNode:function n(r,t){for(var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"id",o=0,i=r.length;o<i;o++){var u=r[o];if(u[e]===t)return u;if(u.children&&u.children.length){u=n(u.children,t,e);if(u)return u}}},arrayGroup:function(n,r){if(1===n.length)return n;for(var t=[],e=0,o=1,i=n.length;o<i;o++){var u=n[o-1],c=n[o];u[r]!==c[r]&&(u=o,t.push(n.slice(e,u)),e=o),o===i-1&&t.push(n.slice(e))}return t},arrayAt:function(n){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return r<0?n[n.length+r]:n[r]},arrayRepeat:function(n){for(var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,t=0,e=n;t<r;)e=e.concat(n),t++;return e},arraySubstr:function(n,r,t){return n.slice(r,r+t)},delByIndexs:function(n,r){2<arguments.length&&void 0!==arguments[2]&&!arguments[2]||(n=JSON.Parse(JSON.stringify(n))),r=r.sort(function(n,r){return r-n});for(var t=0;t<r.length;t++)n.splice(r[t],1);return n},findIndexs:function(n,r){for(var t=[],e=0;e<n.length;e++)r(n[e])&&t.push(e);return t},groupArchive:function(t,e){return u(new Set(t.map(function(n){return n[e]}))).reduce(function(n,r){return[].concat(u(n),[t.filter(function(n){return n[e]===r})])},[])},groupState:function(n,r){for(var t,e=[],o=0,i=1,u=n.length;i<u;i++)n[i-1][r]!==n[i][r]&&(t=i,e.push(n.slice(o,t)),o=i),i===u-1&&e.push(n.slice(o));return e},lastFind:function(n,r){for(var t=n.length-1;0<=t;t--)if(r(n[t]))return n[t]},lastFindIndex:function(n,r){for(var t=n.length-1;0<=t;t--)if(r(n[t]))return t;return-1},rangeGenerater:function(t,n){return Array.from({length:n-t+1},function(n,r){return r+t})},arrayRestore:function(n,r,t){return(n=3<arguments.length&&void 0!==arguments[3]&&arguments[3]?n:p(n)).splice(r,0,n.splice(t,1)[0]),n},getTreePath:function(n,r,t){for(var e=t.idAlias,o=void 0===e?"id":e,e=t.nameAlias,i=void 0===e?"name":e,e=t.children,u=void 0===e?"children":e,c=!(3<arguments.length&&void 0!==arguments[3])||arguments[3],a=0,f=n.length;a<f;a++){var l=n[a],s=[];if(l[o]===r)return c?[l[i]]:[l];if(l[u]&&l[u].length&&(y(l[u],r,o,u,s),s.length))return s.unshift(l),c?s.map(function(n){return n[i]}):s}return[]},queryTreeNode:function(n,r,t){for(var e=t.idAlias,o=void 0===e?"id":e,e=t.children,i=void 0===e?"children":e,u=(n=p(n),Array.isArray(n)?n:[n]);u.length;){var c=u.shift();if(c[o]===r)return c;c[i]&&c[i].length&&c[i].forEach(function(n){u.push(n)})}},queryTreePath:function n(r,t){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:[];if(r){var o,i=function(n,r){var t,e,o,i,u="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(u)return e=!(t=!0),{s:function(){u=u.call(n)},n:function(){var n=u.next();return t=n.done,n},e:function(n){e=!0,o=n},f:function(){try{t||null==u.return||u.return()}finally{if(e)throw o}}};if(Array.isArray(n)||(u=a(n))||r&&n&&"number"==typeof n.length)return u&&(n=u),i=0,{s:r=function(){},n:function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}},e:function(n){throw n},f:r};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(r=Array.isArray(r)?r:[r]);try{for(i.s();!(o=i.n()).done;){var u=o.value;if(e.push(u),t(u))return e;if(u.children&&u.children.length){var c=n(u.children,t,e);if(c.length)return c}e.pop()}}catch(n){i.e(n)}finally{i.f()}}return[]},uniqueByKeys:function(n,e){return n.reduce(function(n,t,r){return r&&n.find(function(r){return e.every(function(n){return r[n]===t[n]})})||n.push(t),n},[])},getRepeat:function(){return(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(r,t,n,e){t=Object.keys(t).sort().reduce(function(n,r){return n[r]=t[r],n},{});var o=JSON.stringify(t);return r.countMap[o]?r.countMap[o]++:r.countMap[o]=1,n===e.length-1&&(Object.keys(r.countMap).forEach(function(n){return r[1<r.countMap[n]?"repeatArr":"notRepeatArr"].push(JSON.parse(n))}),delete r.countMap),r},{repeatArr:[],notRepeatArr:[],countMap:{}})}}});