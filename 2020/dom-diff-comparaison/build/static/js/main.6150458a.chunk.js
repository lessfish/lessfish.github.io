(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var c=function(e,t){for(var n=0;n<e.length;n++)t(e[n],n,e)},a=[].indexOf,i=[].slice;function r(e){var t,n={childList:!0,subtree:!0,characterData:!0},r=[],u=new MutationObserver(function(e){console.log("dom \u66f4\u65b0\u4e86\uff01\uff08\u5305\u62ec\u79fb\u52a8/\u65b0\u589e/\u5220\u9664\uff0cinnerHTML \u6570\u636e\u7684\u53d8\u5316\uff0c\u7b49\uff09");var o=t.childNodes,s=[];e.forEach(function(e){u.disconnect(),"childList"===e.type&&(e.addedNodes&&e.addedNodes.length&&(console.log("\u6709\u65b0\u589e dom"),console.log(e.addedNodes)),c(e.addedNodes,function(e){return s.push(e)}))}),u.disconnect(),c(r,function(e){e.classList.toggle("inserted",!1),e.classList.toggle("moved",!1),e.classList.toggle("old",!0),e.classList.toggle("lcs",!0)}),c(s,function(e){1===e.nodeType&&(a.call(r,e)<0?e.classList.toggle("inserted",!0):(e.classList.toggle("moved",!0),e.classList.toggle("lcs",!1)))}),r=i.call(o),u.observe(t,n)});return function(){t=document.querySelector(e),u.observe(t,n)}}},17:function(e,t,n){e.exports=n(18)},18:function(e,t,n){"use strict";n.r(t);var c=n(0),a=[],i=-1,r="",u="",o=!0,s=!1,d=["36","3678","7836","3678","123678","12345678","a0123456789b","12345678","12378456","12345678","6ab127cd8","1278","890"],l=h();function f(){s=!0,b()}function b(){var e=l;l=h(),Object(c.c)(l,e);var t=u.split("").filter(function(e){return e}).map(function(e){return e.trim()});a.forEach(function(e){var n=e.render,c=e.node;n(t,o,c)}),r=u}function v(){i>=0?(i=-1,u=""):u=d[i=0],b()}function p(){i<d.length-1&&(u=d[++i]),b()}function h(){var e=i>=0,t=u!==r?"'".concat(r,"' \u2794 '").concat(u,"'"):"No edit";return Object(c.a)("div",null,Object(c.a)("p",null,"Add the `key` for dom diff:",Object(c.a)("input",{type:"checkbox",checked:o,onchange:function(e){return o=e.target.checked}}),Object(c.a)("button",{onclick:f},"Click to make sure and start!")),s?Object(c.a)("div",null,Object(c.a)("input",{placeholder:"e.g. 12345",disabled:e,value:u,oninput:function(e){return u=e.target.value}}),Object(c.a)("button",{disabled:e,onclick:b},"Patch!"),Object(c.a)("button",{onclick:v},e?"Abort predefined test":"Start predefined test"),Object(c.a)("p",null,"Current step : ",t),e?Object(c.a)("button",{disabled:i>=d.length-1,onclick:p},"Next"):null):"")}document.querySelector(".app").appendChild(Object(c.b)(l));var O=document.querySelector(".libs");function m(e,t){var n={name:e,render:t};a.push(n);var c=document.createElement("div");c.id=e,O.appendChild(c),n.node=c}m("react",n(19).default),m("preact",n(24).default),m("vue",n(25).default),m("snabbdom",n(29).default)},19:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return b});var c=n(5),a=n(6),i=n(8),r=n(7),u=n(9),o=n(2),s=n.n(o),d=n(14),l=n(1),f=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.diffObs=Object(l.a)(".react-seq"),this.diffObs()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h2",null,"react"),s.a.createElement("div",{className:"seq react-seq"},this.props.sequence.map(function(t){var n={"data-key":t,className:"box"};return e.props.isAddKey&&(n.key=t),s.a.createElement("div",n,t)})))}}]),t}(s.a.Component);function b(e,t,n){Object(d.render)(s.a.createElement(f,{sequence:e,isAddKey:t}),n)}},24:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return f});var c,a=n(5),i=n(6),r=n(8),u=n(7),o=n(9),s=n(3),d=n(1),l=function(e){function t(){return Object(a.a)(this,t),Object(r.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.diffObs=Object(d.a)(".preact-seq"),this.diffObs()}},{key:"render",value:function(){var e=this;return Object(s.b)("div",null,Object(s.b)("h2",null,"preact"),Object(s.b)("div",{className:"seq preact-seq"},this.props.sequence.map(function(t){var n={"data-key":t,className:"box"};return e.props.isAddKey&&(n.key=t),Object(s.b)("div",n,t)})))}}]),t}(s.a);function f(e,t,n){c=Object(s.c)(Object(s.b)(l,{sequence:e,isAddKey:t}),n,c)}},25:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return u});var c=n(1),a=n(16),i=n(15);var r=n.n(i)()(function(e){return new a.a({data:function(){return{sequence:[]}},mounted:function(){this.diffObs=Object(c.a)(".vue-seq"),this.diffObs()},render:function(t){return t("div",{},[t("h2",{},"vue"),t("div",{class:{seq:!0,"vue-seq":!0}},this.sequence.map(function(n){return t("div",e?{class:{box:!0},key:n,dataset:{key:n}}:{class:{box:!0},dataset:{key:n}},n)}))])}})});function u(e,t,n){var c=r(t);c.sequence=e,c.$mount(n)}},29:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return o});var c,a=n(1),i=n(30).init([n(33).default,n(34).default,n(35).default,n(36).default,n(37).default]),r=n(10).default;function u(e,t){return r("div",{},[r("h2",{},"snabbdom"),r("div.seq.snabbdom-seq",{},e.map(function(e){return r("div.box",t?{key:e,dataset:{key:e}}:{dataset:{key:e}},e)}))])}function o(e,t,n){if(c)c=i(c,u(e,t));else{c=u(e,t);var r=document.createElement("div");n.appendChild(r),c=i(r,c),Object(a.a)(".snabbdom-seq")()}}}},[[17,1,2]]]);
//# sourceMappingURL=main.6150458a.chunk.js.map