!function(n){var e={};function t(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return n[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,a){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:a})},t.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=4)}([function(n,e){n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",a=n[3];if(!a)return t;if(e&&"function"==typeof btoa){var o=(i=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),r=a.sources.map(function(n){return"/*# sourceURL="+a.sourceRoot+n+" */"});return[t].concat(r).concat([o]).join("\n")}var i;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var a={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(a[r]=!0)}for(o=0;o<n.length;o++){var i=n[o];"number"==typeof i[0]&&a[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),e.push(i))}},e}},function(n,e,t){var a,o,r={},i=(a=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=a.apply(this,arguments)),o}),s=function(n){var e={};return function(n){if("undefined"==typeof e[n]){var t=function(n){return document.querySelector(n)}.call(this,n);if(t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(a){t=null}e[n]=t}return e[n]}}(),l=null,c=0,d=[],f=t(12);function u(n,e){for(var t=0;t<n.length;t++){var a=n[t],o=r[a.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](a.parts[i]);for(;i<a.parts.length;i++)o.parts.push(v(a.parts[i],e))}else{var s=[];for(i=0;i<a.parts.length;i++)s.push(v(a.parts[i],e));r[a.id]={id:a.id,refs:1,parts:s}}}}function m(n,e){for(var t=[],a={},o=0;o<n.length;o++){var r=n[o],i=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};a[i]?a[i].parts.push(s):t.push(a[i]={id:i,parts:[s]})}return t}function p(n,e){var t=s(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=d[d.length-1];if("top"===n.insertAt)a?a.nextSibling?t.insertBefore(e,a.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),d.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(n.insertInto+" "+n.insertAt.before);t.insertBefore(e,o)}}function h(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=d.indexOf(n);e>=0&&d.splice(e,1)}function g(n){var e=document.createElement("style");return n.attrs.type="text/css",b(e,n.attrs),p(n,e),e}function b(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function v(n,e){var t,a,o,r;if(e.transform&&n.css){if(!(r=e.transform(n.css)))return function(){};n.css=r}if(e.singleton){var i=c++;t=l||(l=g(e)),a=x.bind(null,t,i,!1),o=x.bind(null,t,i,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(n){var e=document.createElement("link");return n.attrs.type="text/css",n.attrs.rel="stylesheet",b(e,n.attrs),p(n,e),e}(e),a=function(n,e,t){var a=t.css,o=t.sourceMap,r=e.convertToAbsoluteUrls===undefined&&o;(e.convertToAbsoluteUrls||r)&&(a=f(a));o&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([a],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,t,e),o=function(){h(t),t.href&&URL.revokeObjectURL(t.href)}):(t=g(e),a=function(n,e){var t=e.css,a=e.media;a&&n.setAttribute("media",a);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),o=function(){h(t)});return a(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;a(n=e)}else o()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=i()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=m(n,e);return u(t,e),function(n){for(var a=[],o=0;o<t.length;o++){var i=t[o];(s=r[i.id]).refs--,a.push(s)}n&&u(m(n,e),e);for(o=0;o<a.length;o++){var s;if(0===(s=a[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete r[s.id]}}}};var w,y=(w=[],function(n,e){return w[n]=e,w.filter(Boolean).join("\n")});function x(n,e,t,a){var o=t?"":a.css;if(n.styleSheet)n.styleSheet.cssText=y(e,o);else{var r=document.createTextNode(o),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(r,i[e]):n.appendChild(r)}}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function n(n,e){for(var t=0;t<e.length;t++){var a=e[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(n,a.key,a)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}();var o=function(){function n(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"fa-link",t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2e4,a=this,o=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"slide",r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"view";function i(n){var e=document.createElement("div");return e.classList.add("button"),e.classList.add("button-"+n),e}function s(n,e){var t=i(n),a=document.createElement("i");return a.classList.add("fa"),a.classList.add(String(e)),t.appendChild(a),t}!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.slideId=0,this.view=document.getElementById(r),this.slides=this.view.getElementsByClassName(o),window.timer=null,this.inAnimation=!1,this.interval=t,this.timerReset();var l=s("next","fa-angle-right");l.onclick=function(){a.next()};var c=s("prev","fa-angle-left");c.onclick=function(){a.prev()},this.view.appendChild(l),this.view.appendChild(c);for(var d=0;d<this.slides.length;d+=1){var f=i("indicator");f.textContent=String(d+1)+" / "+String(this.slides.length),this.slides[d].appendChild(f)}for(var u=function(n){var t=a.slides[n].getAttribute("data-link"),o=s("action",String(e));o.onclick=function(){window.location.href=t},a.slides[n].appendChild(o)},m=0;m<this.slides.length;m+=1)u(m);this.goto(this.slideId,this.slides.length-1)}return a(n,[{key:"timerReset",value:function(){var n=this;window.timer&&clearInterval(window.timer),window.timer=setInterval(function(){n.slideshow()},this.interval)}},{key:"slideshow",value:function(){this.next(!1)}},{key:"next",value:function(){var n=!(arguments.length>0&&arguments[0]!==undefined)||arguments[0];if(!this.inAnimation){var e=this.slideId;this.slideId+=1,this.slideId>this.slides.length-1&&(this.slideId=0),this.goto(this.slideId,e),n&&this.timerReset()}}},{key:"prev",value:function(){var n=!(arguments.length>0&&arguments[0]!==undefined)||arguments[0];if(!this.inAnimation){var e=this.slideId;this.slideId-=1,this.slideId<0&&(this.slideId=this.slides.length-1),this.goto(this.slideId,e),n&&this.timerReset()}}},{key:"goto",value:function(n,e){for(var t=this,a=0;a<this.slides.length;a+=1)this.slides[a].style.display="none";this.inAnimation=!0,this.slides[n].style.zIndex=0,this.slides[n].style.display="block",this.slides[e].style.display="block",this.slides[e].classList.add("fade-out");setTimeout(function(){t.slides[e].classList.remove("fade-out"),t.slides[e].style.display="none",t.slides[n].style.zIndex=1,t.inAnimation=!1},200)}}]),n}();e["default"]=o},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(n,e){var t=document.querySelectorAll("#"+e);t[t.length-1].setAttribute("src",n)}},function(n,e,t){"use strict";var a,o=t(5),r=(a=o)&&a.__esModule?a:{"default":a},i=t(6);var s=t(7),l=t(9),c=t(13),d=t(19),f=t(22),u=t(25),m=t(26),p=t(27),h=t(28),g=t(29);t(30);var b=[["home","ISAAC LO"],["resume","RESUME"],["projects","PROJECTS"],["music","MUSIC"],["contact","CONTACT ME"]],v=[["fa-facebook fa","https://www.facebook.com/isaaclo123"],["fa-linkedin fa","https://www.linkedin.com/in/isaac-lo-325587124/"],["fa-github fa","https://github.com/isaaclo123"]],w={"":{page:u,load:s},home:{page:u,load:s},resume:{page:m,load:l},projects:{page:p,load:c},music:{page:h,load:d},contact:{page:g,load:f}};window.onload=function(){(0,i.menuInit)(b,v),(0,r["default"])(w)},window.onhashchange=function(){setTimeout(function(){(0,r["default"])(w)},400)},window.onbeforeunload=function(){(0,r["default"])(w)}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(n){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"view",t=window.location.hash.slice(2,window.location.hash.length);if(t in n){var a=document.getElementById(e);a.id=e+"-old";var o=document.createElement("div");o.id=e,o.style.opacity=0,document.body.appendChild(o),o.innerHTML=n[t].page,document.createElement("script").onload=function(){load()};var r=0,i=setInterval(function(){r>=1?(o.style.opacity=1,clearInterval(i),a.parentNode.removeChild(a)):(r+=.05,o.style.opacity=r)},.1);"load"in n[t]&&n[t].load["default"]()}else window.location=""}},function(n,e,t){"use strict";function a(n){window.location.href=n}function o(n){window.location.hash="/"+n}function r(n){for(var e=n.classList.item(0),t=document.getElementsByClassName(e),a=0;a<t.length;a+=1)t[a].classList.toggle("highlight-hover"),t[a].classList.toggle("highlight-click",!1)}function i(n){for(var e=n.classList.item(0),t=document.getElementsByClassName(e),a=0;a<t.length;a+=1)t[a].classList.toggle("highlight-click")}Object.defineProperty(e,"__esModule",{value:!0}),e.gotoUrl=a,e.gotoHash=o,e.hover=r,e.menuInit=function(n,e){function t(n,e,t){var a=document.createElement("span");a.classList.add("char"+n.toString());var s=document.createElement("p");s.classList.add(e),"seperator"!==e&&(s.onclick=function(){o(e)},s.onmouseover=function(){r(s)},s.onmouseout=function(){r(s)},s.onmousedown=function(){i(s)},s.onmouseup=function(){i(s)});var l=document.createTextNode(t);return s.appendChild(l),a.appendChild(s),a}function s(n,e){var a=t(n,"seperator"," ");e.appendChild(a);var o=t(n+1,"seperator","|");e.appendChild(o);var r=t(n+2,"seperator"," ");e.appendChild(r)}for(var l=document.getElementsByTagName("nav")[0],c=1,d=0;d<n.length;d+=1){for(var f=0;f<n[d][1].length;f+=1){var u=t(c,n[d][0],n[d][1][f]);l.appendChild(u),c+=1}s(c,l),c+=3}c-=1;for(var m=function(n){var o=t(c,"seperator"," ");l.appendChild(o),c+=1;var s=document.createElement("span");s.classList.add("char"+c.toString());var d=document.createElement("i");d.className+=e[n][0],d.setAttribute("aria-hidden","true"),d.onclick=function(){a(e[n][1])},d.onmouseover=function(){r(d)},d.onmouseout=function(){r(d)},d.onmousedown=function(){i(d)},d.onmouseup=function(){i(d)},s.appendChild(d),l.appendChild(s),c+=1},p=0;p<e.length;p+=1)m(p);s(c,l)}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(t(3)),o=r(t(8));function r(n){return n&&n.__esModule?n:{"default":n}}e["default"]=function(){(0,a["default"])(o["default"],"image")}},function(n,e,t){n.exports=t.p+"public/df0f287cde96908a6ac347161ab798c0.jpg"},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,o=t(2),r=(a=o)&&a.__esModule?a:{"default":a};t(10),e["default"]=function(){window.slides=new r["default"]("fa-arrow-down")}},function(n,e,t){var a=t(11);"string"==typeof a&&(a=[[n.i,a,""]]);var o={hmr:!0,transform:void 0};t(1)(a,o);a.locals&&(n.exports=a.locals)},function(n,e,t){(n.exports=t(0)(!1)).push([n.i,".resume-page {\n  background-color: #0d47a1; }\n  .resume-page .content {\n    margin-bottom: 1.1rem;\n    color: #fafafa; }\n",""])},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,a=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var o,r=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r)?n:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?t+r:a+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l(t(2)),o=l(t(3)),r=l(t(14)),i=l(t(15)),s=l(t(16));function l(n){return n&&n.__esModule?n:{"default":n}}t(17),e["default"]=function(){window.slides=new a["default"],(0,o["default"])(r["default"],"fastflow"),(0,o["default"])(i["default"],"leaflet"),(0,o["default"])(s["default"],"kanetus")}},function(n,e,t){n.exports=t.p+"public/5e8949b3fa02c93504efc5649a43f2bb.png"},function(n,e,t){n.exports=t.p+"public/2d91a6ef0ec79733d73d5b6e4479d9d0.png"},function(n,e,t){n.exports=t.p+"public/fde1a6f301e210a846086723b1d80c0d.png"},function(n,e,t){var a=t(18);"string"==typeof a&&(a=[[n.i,a,""]]);var o={hmr:!0,transform:void 0};t(1)(a,o);a.locals&&(n.exports=a.locals)},function(n,e,t){(n.exports=t(0)(!1)).push([n.i,".projects-page .content {\n  margin-bottom: 0;\n  color: #fafafa; }\n  .projects-page .content h1 {\n    margin-bottom: 0.65625rem !important; }\n    .projects-page .content h1 span {\n      font-size: inherit;\n      font-weight: inherit;\n      font-family: inherit;\n      background-color: rgba(0, 0, 0, 0.6);\n      padding: 0.4375rem; }\n  .projects-page .content p {\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 0.4375rem; }\n",""])},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,o=t(2),r=(a=o)&&a.__esModule?a:{"default":a};t(20),e["default"]=function(){window.slides=new r["default"]("fa-play")}},function(n,e,t){var a=t(21);"string"==typeof a&&(a=[[n.i,a,""]]);var o={hmr:!0,transform:void 0};t(1)(a,o);a.locals&&(n.exports=a.locals)},function(n,e,t){(n.exports=t(0)(!1)).push([n.i,".music-page {\n  background-color: #263238;\n  border-radius: 50%; }\n  .music-page .label {\n    position: absolute;\n    height: 1rem;\n    font-weight: bold;\n    font-family: Roboto, sans-serif;\n    text-align: center;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .music-page .label-top {\n      width: 11.5rem;\n      height: 5.75rem;\n      top: calc(50% - 5.75rem);\n      left: calc(50% - 5.75rem);\n      font-family: Anonymous Pro, monospace;\n      font-size: 1.8rem;\n      line-height: 1.62rem; }\n    .music-page .label-left {\n      font-size: 1rem;\n      width: 5.75rem;\n      left: calc(50% - 5.75rem);\n      top: calc(50% - 0.5rem); }\n    .music-page .label-right {\n      font-size: 1rem;\n      width: 5.75rem;\n      left: calc(50%);\n      top: calc(50% - 0.5rem); }\n    .music-page .label-bottom {\n      line-height: 1.1rem;\n      height: 5.75rem;\n      width: 11.5rem;\n      top: calc(50% - 0.5rem);\n      left: calc(50% - 5.75rem); }\n  .music-page #stone-free .record {\n    z-index: -1;\n    width: 10.5rem;\n    height: 10.5rem;\n    background-color: #e65100;\n    box-shadow: 0 0 0 0.4rem #fbe9e7, 0 0 0 0.7rem #e65100, 0 0 0 2.3rem #202a2f;\n    border-radius: 50%;\n    position: absolute;\n    top: calc(50% - 5.25rem);\n    left: calc(50% - 5.25rem); }\n    .music-page #stone-free .record::before {\n      position: absolute;\n      content: '';\n      top: inherit;\n      left: inherit;\n      width: 10.5rem;\n      height: 4.45rem;\n      background-color: #fbe9e7;\n      border-radius: 5.25rem 5.25rem 0 0; }\n    .music-page #stone-free .record::after {\n      position: absolute;\n      content: '';\n      width: 0.5rem;\n      height: 0.5rem;\n      top: calc(50% - 0.4rem);\n      left: calc(50% - 0.4rem);\n      background-color: #202a2f;\n      border: 0.15rem solid #fbe9e7;\n      border-radius: 50%; }\n  .music-page #stone-free .label {\n    color: #fbe9e7;\n    /*\n    &-left {\n    }\n    &-right {\n    }\n    &-bottom{\n    }\n  */ }\n    .music-page #stone-free .label-top {\n      font-size: 1.8rem;\n      color: #e65100; }\n  .music-page #crossroads .record {\n    z-index: -1;\n    width: 10.5rem;\n    height: 10.5rem;\n    background-color: #283593;\n    box-shadow: 0 0 0 0.4rem #e8eaf6, 0 0 0 0.7rem #283593, 0 0 0 2.3rem #202a2f;\n    border-radius: 50%;\n    position: absolute;\n    top: calc(50% - 5.25rem);\n    left: calc(50% - 5.25rem); }\n    .music-page #crossroads .record::before {\n      position: absolute;\n      content: '';\n      top: inherit;\n      left: inherit;\n      width: 10.5rem;\n      height: 4.45rem;\n      background-color: #e8eaf6;\n      border-radius: 5.25rem 5.25rem 0 0; }\n    .music-page #crossroads .record::after {\n      position: absolute;\n      content: '';\n      width: 0.5rem;\n      height: 0.5rem;\n      top: calc(50% - 0.4rem);\n      left: calc(50% - 0.4rem);\n      background-color: #202a2f;\n      border: 0.15rem solid #e8eaf6;\n      border-radius: 50%; }\n  .music-page #crossroads .label {\n    color: #e8eaf6;\n    /*\n    &-left {\n    }\n    &-right {\n    }\n    &-bottom{\n    }\n  */ }\n    .music-page #crossroads .label-top {\n      font-size: 1.8rem;\n      color: #283593; }\n",""])},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t(23),e["default"]=function(){}},function(n,e,t){var a=t(24);"string"==typeof a&&(a=[[n.i,a,""]]);var o={hmr:!0,transform:void 0};t(1)(a,o);a.locals&&(n.exports=a.locals)},function(n,e,t){(n.exports=t(0)(!1)).push([n.i,".contact-page {\n  background-color: #263238;\n  border-radius: 50%; }\n  .contact-page .dial-label {\n    z-index: -1;\n    width: 10.8rem;\n    height: 10.8rem;\n    background-color: #fafafa;\n    box-shadow: 0 0 0 0.3rem #37474f, 0 0 0 3.5rem #fafafa;\n    border-radius: 50%;\n    position: absolute;\n    top: calc(50% - 5.4rem);\n    left: calc(50% - 5.4rem); }\n    .contact-page .dial-label::before {\n      position: absolute;\n      content: '';\n      top: inherit;\n      left: inherit;\n      width: 10.8rem;\n      height: 4.65rem;\n      background-color: #37474f;\n      border-radius: 5.4rem 5.4rem 0 0; }\n    .contact-page .dial-label::after {\n      box-shadow: 0 0 0 0.3rem #263238;\n      position: absolute;\n      content: '';\n      top: inherit;\n      left: inherit;\n      width: 10.8rem;\n      height: 10.8rem;\n      border-radius: 50%; }\n  .contact-page .dial-hook {\n    z-index: 3;\n    background-color: none;\n    font: 2rem Anonymous Pro, monospace;\n    font-weight: bold;\n    height: 6rem;\n    width: 0.8rem;\n    position: absolute;\n    text-align: center;\n    transform-origin: top center;\n    top: calc(50%);\n    left: calc(50% - 0.4rem);\n    pointer-events: none;\n    transform: rotate(-62deg);\n    border-bottom: solid 4rem #90a4ae; }\n  .contact-page .label {\n    position: absolute;\n    height: 0.9rem;\n    font-weight: bold;\n    font-family: Roboto, sans-serif;\n    text-align: center;\n    color: #fafafa;\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n    .contact-page .label-top {\n      width: 11.7rem;\n      height: 5.85rem;\n      top: calc(50% - 5.85rem);\n      left: calc(50% - 5.85rem);\n      color: #fafafa;\n      font-family: Anonymous Pro, monospace;\n      font-size: 1.7rem;\n      line-height: 1.53rem;\n      margin-top: 0.36rem; }\n    .contact-page .label-bottom {\n      font-size: 0.9rem;\n      line-height: 1.08rem;\n      color: #37474f;\n      height: 5.85rem;\n      width: 11.7rem;\n      top: calc(50% - 0.45rem);\n      left: calc(50% - 5.85rem);\n      margin-top: -0.99rem; }\n    .contact-page .label a {\n      color: #37474f;\n      outline: 0; }\n      .contact-page .label a:hover {\n        color: #2962ff; }\n      .contact-page .label a:active {\n        color: #448aff; }\n      .contact-page .label a:visited {\n        color: #37474f; }\n\n.dot1 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - -3.82652rem);\n  left: calc(50% - -3.82652rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot2 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - -5.70296rem);\n  left: calc(50% - -0.57644rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot3 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - -5.70296rem);\n  left: calc(50% - 3.17644rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot4 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - -3.82652rem);\n  left: calc(50% - 6.42652rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot5 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - -0.57644rem);\n  left: calc(50% - 8.30296rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot6 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - 3.17644rem);\n  left: calc(50% - 8.30296rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot7 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - 6.42652rem);\n  left: calc(50% - 6.42652rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot8 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - 8.30296rem);\n  left: calc(50% - 3.17644rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot9 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - 8.30296rem);\n  left: calc(50% - -0.57644rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n\n.dot10 {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  top: calc(50% - 6.42652rem);\n  left: calc(50% - -3.82652rem);\n  background-color: #fafafa;\n  border: 1.1rem solid #263238;\n  border-radius: 50%;\n  margin: 0;\n  padding: 0; }\n",""])},function(n,e){n.exports='<div class="page">\n  <img id="image" class="page page-background page-no-border"></img>\n</div>\n'},function(n,e){n.exports='<div class="page page-border resume-page">\n  <div class="content slide" data-link="/public/resume.pdf">\n    <h1>Education</h1>\n    <ul>\n      <li>\n        <b>University of Minnesota</b>\n        <br>\n        <b>Twin Cities (CSci)</b>\n        <br>\n        <u>CSE Dean\'s List Awardee</u>\n        <br>GPA: <u>3.78</u>\n      </li>\n      <li>\n        <b>Leland High School</b>\n        <br><u>National Merit Finalist</u>\n        <br>GPA: <u>3.84</u>\n      </li>\n    </ul>\n  </div>\n\n  <div class="content slide" data-link="/public/resume.pdf">\n    <h1>Work<br>Experience</h1>\n    <p>\n      <b>Interim Software Developer</b>\n      <br>\n      <b>(21st Century Education)</b>\n      <br>\n      Installed a company <u>server</u>\n      <br>\n      Set up a company <u>event page</u>\n      <br>\n      Wrote <u>Javacript</u> code for app.\n    </p>\n  </div>\n\n  <div class="content slide" data-link="/public/resume.pdf">\n    <h1>Teaching<br>Experience</h1>\n    <ul>\n      <li>\n        <b>Math and Coding</b> (2015-16)\n        <br>\n        Taught <u>Tkinter</u> to children\n        <br>\n        at San Jose Almaden Library.\n      </li>\n      <li>\n        <b>Coding for Fun</b> (Fall 2015)\n        <br>\n        Taught <u>Scratch</u>, <u>Python</u>, and\n        <br>\n        <u>HTML</u> to children at Carden\n        <br>\n        Academy Almaden.\n      </li>\n    </ul>\n  </div>\n\n  <div class="content slide" data-link="/public/resume.pdf">\n    <h1>Activities</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Vice President</b> (2016-17)\n          <br>\n          Leland Congressional Debate\n        </li>\n        <li>\n          <b>Chair</b> (2015-16)\n          <br>\n          Leland Congressional Debate\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <div class="content slide" data-link="/public/resume.pdf">\n    <h1>Skills</h1>\n    <ul>\n      <li>\n        <b>Backend</b>: Python, Django\n        <br>\n        Java, SQL</li>\n      <li>\n        <b>Frontend</b>: HTML, CSS/SASS,\n        <br>\n        JS, AngularJS, Vue.js, Jekyll\n      </li>\n      <li>\n        <b>Misc</b>: Linux, Git, GPG\n        <br>\n        SSH, Pandoc, LATEX\n      </li>\n    </ul>\n  </div>\n\n</div>\n'},function(n,e){n.exports='<div class="page projects-page">\n\n  <div class="content slide" data-link="http://www.kanetus.com">\n    <img id="kanetus" class="page page-background page-border"></img>\n    <h1><span>Kanetus</span></h1>\n    <p>\n      <b>Audio-based exploration\n      <br>\n      app for a seamless location\n      <br>\n      discovery experience</b>\n      <br>\n      A <u>progressive webapp</u> written\n      <br>\n      with <u>Amazon AWS</u> and <u>Vue.js</u>\n    </p>\n  </div>\n\n  <div class="content slide" data-link="https://github.com/Zarkoix/LeafletServer">\n    <img id="leaflet" class="page page-background page-border"></img>\n    <h1><span>Leaflet</span></h1>\n    <p>\n      <b>Minimalistic and\n      <br>\n      effective notetaking.</b>\n      <br>\n      Wrote a <u>GraphQL</u> API\n      <br>\n      with <u>Django</u> and <u>Python</u>.\n    </p>\n  </div>\n\n  <div class="content slide" data-link="https://flow.fastflowdebate.com/">\n    <img id="fastflow" class="page page-background page-border"></img>\n    <h1><span>FastFlow</span></h1>\n    <p>\n      <b>Software for better\n      <br>\n      and faster debate.</b>\n      <br>\n      Wrote <u>interface</u> code\n      <br>\n      and <u>project website</u>.\n    </p>\n  </div>\n\n</div>\n'},function(n,e){n.exports='<div class="page music-page page-border">\n\n  <div id="stone-free" class="content slide" data-link="https://www.facebook.com/isaaclo123/videos/1625041427552454/">\n    <div class="record"></div>\n    <span class="label label-top">STONE<br>FREE</span>\n    <span class="label label-left">Jimi</span>\n    <span class="label label-right">Hendrix</span>\n    <span class="label label-bottom">\n      covered by\n      <br>\n      Isaac Lo\n    </span>\n  </div>\n\n  <div id="crossroads" class="content slide" data-link="https://www.facebook.com/isaaclo123/videos/1543546355701962/">\n    <div class="record"></div>\n    <span class="label label-top">CROSS<br>ROADS</span>\n    <span class="label label-left">Eric</span>\n    <span class="label label-right">Clapton</span>\n    <span class="label label-bottom">\n      covered by\n      <br>\n      Isaac Lo\n    </span>\n  </div>\n\n</div>\n'},function(n,e){n.exports='<div class="page contact-page page-border">\n\n  <div id="dial" class="content slide" data-link="https://www.facebook.com/isaaclo123/videos/1625041427552454/">\n    <div class="dial-label"></div>\n    <div class="dial-hook"></div>\n    <span class="label label-top">CONTACT</span>\n    <span class="label label-bottom">\n      <span>\n        email:\n        <br>\n        <a href="mailto:isaaclo123@gmail.com">\n          isaaclo123@gmail.com\n        </a>\n        <br>\n        phone:\n        <br>\n        <a href="tel:1-650-503-1253">\n          1(650)-503-1253\n        </a>\n      </span>\n    </span>\n  </div>\n  <div class="dot1"></div>\n  <div class="dot2"></div>\n  <div class="dot3"></div>\n  <div class="dot4"></div>\n  <div class="dot5"></div>\n  <div class="dot6"></div>\n  <div class="dot7"></div>\n  <div class="dot8"></div>\n  <div class="dot9"></div>\n  <div class="dot10"></div>\n\n  \x3c!--\n  <div class="num1">0</div>\n  <div class="num2">9</div>\n  <div class="num3">8</div>\n  <div class="num4">7</div>\n  <div class="num5">6</div>\n  <div class="num6">5</div>\n  <div class="num7">4</div>\n  <div class="num8">3</div>\n  <div class="num9">2</div>\n  <div class="num10">1</div>\n  --\x3e\n\n</div>\n'},function(n,e,t){var a=t(31);"string"==typeof a&&(a=[[n.i,a,""]]);var o={hmr:!0,transform:void 0};t(1)(a,o);a.locals&&(n.exports=a.locals)},function(n,e,t){(n.exports=t(0)(!1)).push([n.i,"html, body {\n  padding: 0 auto;\n  margin: 0 auto;\n  overflow: hidden;\n  height: 100%;\n  width: 100%; }\n\n/* Large screens ----------- */\n/*some CSS*/\n@media only screen and (min-device-width: 1825px) {\n  html, body {\n    font-size: 28px; } }\n\n@media only screen and (min-device-height: 1825px) {\n  html, body {\n    font-size: 28px; } }\n\n/* Desktops and laptops ----------- */\n@media only screen and (max-device-width: 1824px) {\n  html, body {\n    font-size: 2.6vmin; } }\n\n@media only screen and (max-device-height: 1824px) {\n  html, body {\n    font-size: 2.6vmin; } }\n\n/* iPads (landscape) ----------- */\n@media only screen and (max-device-width: 1224px) {\n  html, body {\n    font-size: 3vmin; } }\n\n@media only screen and (max-device-height: 1224px) {\n  html, body {\n    font-size: 3vmin; } }\n\n/* Smartphones (landscape) ----------- */\n@media only screen and (max-device-width: 768px) {\n  html, body {\n    font-size: 3.3vmin; } }\n\n@media only screen and (max-device-height: 768px) {\n  html, body {\n    font-size: 3.3vmin; } }\n\n/* Smartphones (smaller) ----------- */\n@media only screen and (max-device-width: 640px) {\n  html, body {\n    font-size: 3.4vmin; } }\n\n@media only screen and (max-device-height: 640px) {\n  html, body {\n    font-size: 3.4vmin; } }\n\n/*\n@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg) !important; } }\n@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg) !important; } }\n@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg) !important; } }\n*/\nnav {\n  z-index: 2;\n  position: absolute;\n  top: calc(50% - 13.75rem);\n  right: calc(50% - 13.75rem);\n  /*\n  -webkit-animation:spin 10s linear infinite;\n  -moz-animation:spin 10s linear infinite;\n  animation:spin 10s linear infinite;\n  animation-name: spin;\n*/\n  pointer-events: none;\n  width: 27.5rem;\n  height: 27.5rem;\n  -moz-user-select: none; }\n  nav span {\n    color: #0d47a1;\n    font: 2rem Anonymous Pro, monospace;\n    font-weight: bold;\n    height: 13.75rem;\n    width: 2rem;\n    position: absolute;\n    text-align: center;\n    transform-origin: bottom center;\n    top: 0;\n    left: 12.75rem;\n    pointer-events: none; }\n  nav p {\n    cursor: pointer;\n    padding: 0;\n    margin: 0;\n    font-weight: bold;\n    pointer-events: auto; }\n  nav i {\n    font-size: 1.7rem !important;\n    cursor: pointer;\n    pointer-events: auto; }\n  nav .highlight-hover, nav .highlight-page {\n    color: #2962ff; }\n  nav .highlight-click {\n    color: #448aff; }\n  nav .char1 {\n    transform: rotate(-20.4deg); }\n  nav .char2 {\n    transform: rotate(-14.4deg); }\n  nav .char3 {\n    transform: rotate(-8.4deg); }\n  nav .char4 {\n    transform: rotate(-2.4deg); }\n  nav .char5 {\n    transform: rotate(3.6deg); }\n  nav .char6 {\n    transform: rotate(9.6deg); }\n  nav .char7 {\n    transform: rotate(15.6deg); }\n  nav .char8 {\n    transform: rotate(21.6deg); }\n  nav .char9 {\n    transform: rotate(27.6deg); }\n  nav .char10 {\n    transform: rotate(33.6deg); }\n  nav .char11 {\n    transform: rotate(39.6deg); }\n  nav .char12 {\n    transform: rotate(45.6deg); }\n  nav .char13 {\n    transform: rotate(51.6deg); }\n  nav .char14 {\n    transform: rotate(57.6deg); }\n  nav .char15 {\n    transform: rotate(63.6deg); }\n  nav .char16 {\n    transform: rotate(69.6deg); }\n  nav .char17 {\n    transform: rotate(75.6deg); }\n  nav .char18 {\n    transform: rotate(81.6deg); }\n  nav .char19 {\n    transform: rotate(87.6deg); }\n  nav .char20 {\n    transform: rotate(93.6deg); }\n  nav .char21 {\n    transform: rotate(99.6deg); }\n  nav .char22 {\n    transform: rotate(105.6deg); }\n  nav .char23 {\n    transform: rotate(111.6deg); }\n  nav .char24 {\n    transform: rotate(117.6deg); }\n  nav .char25 {\n    transform: rotate(123.6deg); }\n  nav .char26 {\n    transform: rotate(129.6deg); }\n  nav .char27 {\n    transform: rotate(135.6deg); }\n  nav .char28 {\n    transform: rotate(141.6deg); }\n  nav .char29 {\n    transform: rotate(147.6deg); }\n  nav .char30 {\n    transform: rotate(153.6deg); }\n  nav .char31 {\n    transform: rotate(159.6deg); }\n  nav .char32 {\n    transform: rotate(165.6deg); }\n  nav .char33 {\n    transform: rotate(171.6deg); }\n  nav .char34 {\n    transform: rotate(177.6deg); }\n  nav .char35 {\n    transform: rotate(183.6deg); }\n  nav .char36 {\n    transform: rotate(189.6deg); }\n  nav .char37 {\n    transform: rotate(195.6deg); }\n  nav .char38 {\n    transform: rotate(201.6deg); }\n  nav .char39 {\n    transform: rotate(207.6deg); }\n  nav .char40 {\n    transform: rotate(213.6deg); }\n  nav .char41 {\n    transform: rotate(219.6deg); }\n  nav .char42 {\n    transform: rotate(225.6deg); }\n  nav .char43 {\n    transform: rotate(231.6deg); }\n  nav .char44 {\n    transform: rotate(237.6deg); }\n  nav .char45 {\n    transform: rotate(243.6deg); }\n  nav .char46 {\n    transform: rotate(249.6deg); }\n  nav .char47 {\n    transform: rotate(255.6deg); }\n  nav .char48 {\n    transform: rotate(261.6deg); }\n  nav .char49 {\n    transform: rotate(267.6deg); }\n  nav .char50 {\n    transform: rotate(273.6deg); }\n  nav .char51 {\n    transform: rotate(279.6deg); }\n  nav .char52 {\n    transform: rotate(285.6deg); }\n  nav .char53 {\n    transform: rotate(291.6deg); }\n  nav .char54 {\n    transform: rotate(297.6deg); }\n  nav .char55 {\n    transform: rotate(303.6deg); }\n  nav .char56 {\n    transform: rotate(309.6deg); }\n  nav .char57 {\n    transform: rotate(315.6deg); }\n  nav .char58 {\n    transform: rotate(321.6deg); }\n  nav .char59 {\n    transform: rotate(327.6deg); }\n  nav .char60 {\n    transform: rotate(333.6deg); }\n\n/*\n.pointer {\n  z-index: 2;\n  font-size: $menu-font-size !important;\n  font-family: $serif-font;\n  color: $primary;\n  position: absolute;\n  top: calc(50% - 13.75rem - 2.5rem); left: calc(50% - 1rem);\n}\n*/\n.slide {\n  position: absolute; }\n\n.button {\n  z-index: 2;\n  position: fixed;\n  font-family: Anonymous Pro, monospace;\n  color: #fafafa;\n  width: 2rem;\n  height: 2rem;\n  top: calc(50% - 1rem);\n  left: calc(50% - 1rem);\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  -moz-user-select: none; }\n  .button:hover {\n    color: #bbdefb; }\n  .button-prev {\n    font-size: 2rem !important;\n    left: calc(50% - 11rem); }\n  .button-next {\n    font-size: 2rem !important;\n    left: calc(50% - -9rem); }\n  .button-action {\n    font-size: 1.2rem !important;\n    top: calc(50% - -9rem); }\n  .button-indicator {\n    width: auto;\n    font-family: Roboto, sans-serif;\n    font-weight: bold;\n    font-size: 1.2rem !important;\n    top: calc(50% - 11rem);\n    left: calc(50% - 1.33rem); }\n    .button-indicator:hover {\n      color: #fafafa; }\n\n.page {\n  position: absolute;\n  height: 22.5rem;\n  width: 22.5rem;\n  top: calc(50% - 22.5rem/2);\n  left: calc(50% - 22.5rem/2);\n  box-sizing: border-box;\n  border-radius: 50%;\n  z-index: 0;\n  font-family: Anonymous Pro, monospace;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n  .page .content {\n    height: auto;\n    width: auto;\n    /*\n    span {\n      padding: 0;\n      margin: 0;\n      margin-top: ($page-font-size*0.3);\n      line-height: ($page-font-size*1.2);\n      font-size: $page-font-size;\n      font-family: $sans-serif-font;\n    }\n*/ }\n    .page .content h1 {\n      text-align: center;\n      margin-bottom: 0.55rem;\n      font-weight: bold;\n      font-size: 2rem;\n      font-family: Anonymous Pro, monospace;\n      line-height: 1.8rem; }\n    .page .content ul {\n      padding: 0;\n      margin: 0; }\n    .page .content li {\n      margin-top: 0.55rem;\n      font-family: Roboto, sans-serif; }\n    .page .content p {\n      margin-top: 0.55rem;\n      font-family: Roboto, sans-serif; }\n  .page-border {\n    border: 0.1875rem #fafafa solid;\n    box-shadow: 0 0 0 0.25rem #0d47a1; }\n  .page-no-border {\n    box-shadow: 0 0 0 0.25rem #0d47a1; }\n  .page-background {\n    z-index: -1; }\n\n.fade-out {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.2s, opacity 0.2s linear; }\n\n.fade-in {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 2s linear; }\n",""])}]);