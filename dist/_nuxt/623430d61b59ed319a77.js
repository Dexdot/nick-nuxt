(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{340:function(t,e,n){var content=n(345);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("44804ef1",content,!0,{sourceMap:!1})},341:function(t,e,n){"use strict";n(347);var o={props:{to:{type:[String,Object],default:"/"},duration:{type:Number,default:5e3},isCase:{type:Boolean,default:!1},isPageDark:{type:Boolean,default:!0},isDark:{type:Boolean,default:!0}},data:function(){return{isAnimating:!1,timer:0}},mounted:function(){this.observe()},beforeDestroy:function(){this.stopCount(),this.observer.unobserve(this.$el)},methods:{startCount:function(){var t=this;this.isAnimating=!0,this.timer=setTimeout((function(){t.isAnimating=!1,t.$router.push(t.to)}),this.duration)},stopCount:function(){clearTimeout(this.timer),this.isAnimating=!1},observe:function(){var t=this;this.observer=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting?t.$emit("intersect",e):t.$emit("notintersect",e);var n=t.$store;if(n.getters["dom/isRouteAnimating"])return!1;e.intersectionRatio>=.4?(n.dispatch("dom/toggleDark",t.isDark),t.isAnimating||t.startCount()):(n.dispatch("dom/toggleDark",t.isPageDark),t.stopCount())}))}),{threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}),this.observer.observe(this.$el)}}},r=(n(344),n(6)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{class:["next",{"next--case":t.isCase}]},[n("div",{staticClass:"next-container"},[n("nuxt-link",{staticClass:"next-title",attrs:{to:t.to}},[n("h2",{staticClass:"t-h1"},[t._t("title")],2)]),t._v(" "),n("div",{staticClass:"next-row"},[n("p",{staticClass:"next-text"},[t._t("text")],2),t._v(" "),n("nuxt-link",{staticClass:"next-img",attrs:{to:t.to}},[t._t("image")],2)],1)],1)])}),[],!1,null,"0004da64",null);e.a=component.exports},342:function(t,e,n){"use strict";n(8);var o=n(339);e.a={enter:function(t){var e=t.el;return new Promise((function(t){var n=e.querySelectorAll(".case li");o.a.set(n,{opacity:0,willChange:"transform, opacity"}),o.a.fromTo(n,{opacity:0,y:"60%"},{opacity:1,y:"0%",duration:1.2,ease:"power4.inOut",onComplete:function(){o.a.set(n,{willChange:""}),t()}})}))},leave:function(t){var e=t.el;return new Promise((function(t){var n=[e.querySelector("h1"),e.querySelector(".next"),e.querySelector(".cases"),e.querySelector(".toggler").parentElement];o.a.to(n,{opacity:0,duration:1,ease:"power1.inOut"});var r=e.querySelector(".main-cover");o.a.to(r,{backdropFilter:"blur(16px)",duration:1,ease:"power1.inOut"}),setTimeout(t,900)}))}}},343:function(t,e,n){"use strict";n(85),n(29);var o=n(3),r=(n(21),n(12),n(10),n(8),n(17),n(4)),c=n(339),d={enter:function(t){var e=t.el,n=t.cb;return new Promise((function(t){c.a.fromTo(e,{opacity:0},{opacity:1,duration:.8,ease:"power2.inOut",onComplete:function(){t(),n&&n()}})}))},leave:function(t){var e=t.el,n=t.cb;return new Promise((function(t){c.a.fromTo(e,{opacity:1},{opacity:0,duration:.6,ease:"power2.inOut",onComplete:function(){t(),n&&n()}})}))}},main=n(342),l={enter:function(t){t.el;var e=t.cb;return new Promise((function(t){c.a.fromTo(".case__title--main span",{translateY:"100%",opacity:0},{translateY:"0%",opacity:1,duration:.9,ease:"power2.inOut",onStart:function(){c.a.set(".case__title--main",{overflow:"hidden"})},onComplete:function(){c.a.set(".case__title--main",{overflow:"unset"})}}),c.a.fromTo(".case__subtitle, .case__cover",{opacity:0},{opacity:1,duration:.9,ease:"power2.inOut",onComplete:function(){t(),e&&e()}})}))},leave:function(t){var e=t.el,n=t.cb;return new Promise((function(t){c.a.fromTo(e,{opacity:1},{opacity:0,duration:.6,ease:"power2.inOut",onComplete:function(){t(),n&&n()}})}))}},m=(n(57),{enter:function(t){t.ctx,t.el;var e=t.cb;return new Promise((function(t){t(),e&&e()}))},leave:function(t){var e=t.ctx,n=t.el,r=t.cb;return new Promise(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(o){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$store.dispatch("dom/toggleDark",!1),x(),t.next=4,animate(n);case 4:o(),r&&r();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}});function animate(t){return new Promise((function(e){!function(t){new Promise((function(e){var n=t.querySelector(".case");c.a.to(n,{opacity:0,duration:.3,ease:"power4.inOut",onComplete:e})}))}(t);var title=function(t){return new Promise((function(e){var n=t.querySelector(".movable-title"),o=t.querySelector(".next-title"),r=t.querySelector(".nextcase .case__title"),d=(o.querySelector("span"),r.querySelector("span")),l=v(o),m=v(d);c.a.set(n,{translateX:l.x,translateY:l.y}),c.a.set(n,{opacity:1}),c.a.set(o,{opacity:0}),c.a.to(n,{translateX:m.x,translateY:m.y,onComplete:e,duration:1,ease:"power4.inOut"})}))}(t),img=function(t){return new Promise((function(e){var n=t.querySelector(".movable-image"),o=t.querySelector(".next-img"),r=t.querySelector(".nextcase .case__img"),d=n.querySelector("img").src,l=v(o),m=v(r);c.a.set(n,{translateX:l.x,translateY:l.y,width:l.width,height:l.height}),c.a.set(n,{opacity:1}),c.a.set(o,{opacity:0}),c.a.to(n,{width:m.width,height:m.height,translateX:m.x,translateY:m.y,onComplete:function(){!function(t){var e=t.src,n=t.to,o=t.resolve,div=document.createElement("div");div.classList.add("case-cover-placeholder"),div.style.width="".concat(n.width,"px"),div.style.height="".concat(n.height,"px"),div.style.left="".concat(n.x,"px"),div.style.top="".concat(n.y,"px");var img=document.createElement("img");img.onload=o,img.src=e,div.appendChild(img),document.body.appendChild(div)}({src:d,to:m,resolve:e})},duration:1,ease:"power4.inOut"})}))}(t);Promise.all([title,img]).then(e)}))}function v(title){var t=title.getBoundingClientRect(),e=t.top;return{x:t.left,y:e,width:t.width,height:t.height}}function x(){if(!window.lmS)return!1;window.lmS.stop(),document.body.classList.add("no-scroll")}function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var w={index:h({},main.a),black:h({},main.a),cases:h({},m),"case-id":h({},l),about:h({},d),vision:h({},d),inspire:h({},d)};function _(){return(_=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=this.$store.getters["dom/routeDir"],r=o.from.name===o.to.name?"cases":o.to.name,t.next=4,w[r].enter({el:e,ctx:this});case 4:this.$store.dispatch("dom/setRouteAnimating",!1),n();case 6:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}var y={mode:"out-in",enter:function(t,e){return _.apply(this,arguments)},leave:function(t,e){var n=this;this.$store.dispatch("dom/setRouteAnimating",!0);var r,c,d,l,m=this.$store.getters["dom/routeDir"],v=(c=(r=this).$store.getters["dom/isModalActive"],d=r.$store.getters["dom/modalName"],(l=c&&"menu"===d)&&r.$store.dispatch("dom/toggleModal",""),l?1040:0);setTimeout(Object(o.a)(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r=m.from.name===m.to.name?"cases":m.from.name,o.next=3,w[r].leave({el:t,ctx:n});case 3:document.querySelector(".scroll-container").style.transform="",window.scrollTo(0,0),e();case 5:case"end":return o.stop()}}),o)}))),v)}};function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var O="",S={mounted:function(){var t=this;this.$nextTick((function(){t.lmS=new t.locoscroll({el:document.querySelector(".scroll-container"),smooth:!0,getDirection:!0}),window.lmS=t.lmS,t.lmS.on("scroll",(function(e){t.scroll=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},e,{lmS:t.lmS}),t.$root.$emit("locoscroll",t.scroll)})),t.lmS.update(),t.lmS.setScroll(0,0),t.toggleScrollbar(!1),t.subscribe()}))},destroyed:function(){this.unsubscribe(),this.lmS.destroy()},data:function(){return{isScrolling:!1,scroll:{scroll:{x:0,y:0},lmS:{smooth:!1}},lmS:null}},computed:{translateY:function(){if(this.lmS){var t=this.lmS.isMobile?"smoothMobile":"smooth",e=this.lmS[t]?this.scrollY:0;return{transform:"translate3d(0, ".concat(e,"px, 0)")}}return{}},scrollY:function(){return this.scroll.scroll.y}},methods:{subscribe:function(){var t=this;O=this.$store.watch((function(t,e){return e["dom/scrollDisabled"]}),(function(e){e?window.removeEventListener("keydown",t.lmS.scroll.checkKey,!1):window.addEventListener("keydown",t.lmS.scroll.checkKey,!1)})),this.$root.$on("update-scroll",this.updateScroll),window.addEventListener("resize",this.onLmsResize)},unsubscribe:function(){O&&O(),this.$root.$off("update-scroll",this.updateScroll),window.removeEventListener("resize",this.onLmsResize)},onLmsResize:function(){this.updateScroll()},updateScroll:function(){this.lmS&&this.lmS.update()},stopScroll:function(){this.lmS&&this.lmS.stop()},startScroll:function(){this.lmS&&this.lmS.start()},toggleScrollbar:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this.lmS.scroll.scrollbar||document.querySelector(".".concat(this.lmS.scrollbarClass));if(!e)return!1;e.style.display=t?"block":"none"}},watch:{$route:function(){this.updateScroll()}}},j=n(341);e.a={transition:y,mixins:[S],components:{Next:j.a}}},344:function(t,e,n){"use strict";var o=n(340);n.n(o).a},345:function(t,e,n){(e=n(18)(!1)).push([t.i,'[data-v-0004da64]:root{--unit:24px;--grid-width:1872;--grid-column-width:355;--grid-columns:5;--grid-gutters:calc(var(--grid-columns) - 1);--column-proportion:calc(var(--grid-column-width)/var(--grid-width));--gutter-proportion:calc((1 - var(--grid-columns)*var(--column-proportion))/var(--grid-gutters));--column-unit:calc(var(--column-proportion)*var(--container-width));--gutter-unit:calc(var(--gutter-proportion)*var(--container-width));--column-and-gutter-unit:calc(var(--column-unit) + var(--gutter-unit));--container-width:calc(100vw - var(--unit)*2)}@media (max-width:500px){[data-v-0004da64]:root{--unit:8px}}.container[data-v-0004da64]{margin-left:auto;margin-right:auto;padding:0 24px;padding:0 var(--unit)}.next[data-v-0004da64]{position:relative;width:100vw;height:100vh;height:calc(var(--vh, 1vh)*100)}@media (max-width:768px){.next-container[data-v-0004da64]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%;padding:42vh 8px 24px}}.next-title[data-v-0004da64]{display:block}@media (max-width:768px){.next-title[data-v-0004da64]{margin:0 0 24px auto}}.next-row[data-v-0004da64]{display:-webkit-box;display:flex}@media (min-width:769px){.next-row[data-v-0004da64]{-webkit-box-align:end;align-items:flex-end}}@media (max-width:768px){.next-row[data-v-0004da64]{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1}}.next-img[data-v-0004da64]{display:block;width:calc(18.964vw - 9.10272px);width:calc(1*var(--column-unit));position:relative}@media (max-width:768px){.next-img[data-v-0004da64]{width:56vw;margin:auto 0 0 auto}}.next-img[data-v-0004da64]:before{content:"";display:block;width:100%;padding-top:56.25%}.next-img[data-v-0004da64] img,.next-img video[data-v-0004da64]{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.next-text[data-v-0004da64]{opacity:.6;max-width:calc(18.964vw - 9.10272px);max-width:calc(1*var(--column-unit))}@media (max-width:768px){.next-text[data-v-0004da64]{max-width:13.5em}}@media (min-width:769px){.next:not(.next--case) .next-img[data-v-0004da64]{display:none}}@media (max-width:768px){.next:not(.next--case) .next-row[data-v-0004da64]{padding-left:72px}}@media (min-width:769px){.next:not(.next--case) .next-row[data-v-0004da64]{bottom:6.66%;right:24px;right:var(--unit);position:absolute}}@media (min-width:769px){.next:not(.next--case) .next-title[data-v-0004da64]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:calc(40.518vw - 19.44864px - 18.964vw + 9.10272px);left:calc(2*var(--column-and-gutter-unit) - var(--column-unit))}}@media (max-width:900px){.next:not(.next--case) .next-text[data-v-0004da64]{max-width:calc(37.928vw - 18.20544px);max-width:calc(2*var(--column-unit))}}@media (max-width:768px){.next:not(.next--case) .next-text[data-v-0004da64]{max-width:13.5em}}@media (min-width:769px){.next--case .next-container[data-v-0004da64]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:end;align-items:flex-end;-webkit-box-pack:end;justify-content:flex-end;height:100%;padding:0 24px 40px;padding:0 var(--unit) 40px}}@media (min-width:769px){.next--case .next-row[data-v-0004da64]{width:calc(81.036vw - 38.89728px - 1.295vw + .6216px);width:calc(4*var(--column-and-gutter-unit) - var(--gutter-unit));-webkit-box-pack:justify;justify-content:space-between}}@media (min-width:769px){.next--case .next-title[data-v-0004da64]{margin-bottom:72px}}@media (min-width:769px){.next--case .next-text[data-v-0004da64]{padding-bottom:24px}}',""]),t.exports=e},346:function(t,e,n){"use strict";n(45),n(58);var o=n(4),r=(n(171),n(348)),c=n(349),d=n(14),l={renderNode:Object(o.a)({},r.INLINES.HYPERLINK,(function(t,e){var data=t.data,content=t.content,n=data.uri.startsWith("http")?'target="_blank"':"";return"<a ".concat(n,' href="').concat(data.uri,'">').concat(e(content),"</a>")}))};e.a={methods:{render:function(t){return Object(c.documentToHtmlString)(t,l)},isH1:function(t){return"heading-1"===t.nodeType},isH2:function(t){return"heading-2"===t.nodeType},isH3:function(t){return"heading-3"===t.nodeType},isH4:function(t){return"heading-4"===t.nodeType},isH5:function(t){return"heading-5"===t.nodeType},isH6:function(t){return"heading-6"===t.nodeType},isText:function(t){return"paragraph"===t.nodeType},isQuote:function(t){return"blockquote"===t.nodeType},isOL:function(t){return"ordered-list"===t.nodeType},isUL:function(t){return"unordered-list"===t.nodeType},isHR:function(t){return"hr"===t.nodeType},isJPG:function(t){return"embedded-asset-block"===t.nodeType&&Object(d.h)(t.data.target)},isImage:function(t){return"embedded-asset-block"===t.nodeType&&Object(d.g)(t.data.target)},isVideo:function(t){return"embedded-asset-block"===t.nodeType&&Object(d.i)(t.data.target)},isBlock:function(t){return"embedded-entry-block"===t.nodeType&&["row","box","mobileBox"].includes(t.data.target.sys.contentType.sys.id)},isRow:function(t){return"embedded-entry-block"===t.nodeType&&"row"===t.data.target.sys.contentType.sys.id},isBox:function(t){return"embedded-entry-block"===t.nodeType&&"box"===t.data.target.sys.contentType.sys.id},isMobileBox:function(t){return"embedded-entry-block"===t.nodeType&&"mobileBox"===t.data.target.sys.contentType.sys.id},isWideslider:function(t){return"embedded-entry-block"===t.nodeType&&"wideslider"===t.data.target.sys.contentType.sys.id}}}},350:function(t,e,n){var content=n(363);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(19).default)("2b230644",content,!0,{sourceMap:!1})},362:function(t,e,n){"use strict";var o=n(350);n.n(o).a},363:function(t,e,n){(e=n(18)(!1)).push([t.i,'[data-v-564627a3]:root{--unit:24px;--grid-width:1872;--grid-column-width:355;--grid-columns:5;--grid-gutters:calc(var(--grid-columns) - 1);--column-proportion:calc(var(--grid-column-width)/var(--grid-width));--gutter-proportion:calc((1 - var(--grid-columns)*var(--column-proportion))/var(--grid-gutters));--column-unit:calc(var(--column-proportion)*var(--container-width));--gutter-unit:calc(var(--gutter-proportion)*var(--container-width));--column-and-gutter-unit:calc(var(--column-unit) + var(--gutter-unit));--container-width:calc(100vw - var(--unit)*2)}@media (max-width:500px){[data-v-564627a3]:root{--unit:8px}}.container[data-v-564627a3]{margin-left:auto;margin-right:auto;padding:0 24px;padding:0 var(--unit)}.about-container[data-v-564627a3]{min-height:100vh;padding-top:8px;color:hsla(0,0%,100%,.6)}@media (max-width:768px){.about-container[data-v-564627a3]{padding:32px 0 24px}}.about-container[data-v-564627a3] a{opacity:.6;-webkit-transition:opacity .25s ease;transition:opacity .25s ease}.about-container[data-v-564627a3] a:hover{opacity:1}.about__date[data-v-564627a3]{--delay:0.8s;position:absolute;left:24px;left:var(--unit);top:16.875vw;-webkit-transform:translateY(-50%);transform:translateY(-50%)}@media (max-width:768px){.about__date[data-v-564627a3]{font-size:18px;width:2.5em;top:100%;-webkit-transform:translateY(-100%);transform:translateY(-100%)}}.about__text-wrap[data-v-564627a3]{margin-bottom:160px}@media (max-width:900px) and (min-width:769px){.about__text-wrap[data-v-564627a3]{margin-bottom:80px}}.about__text-wrap[data-v-564627a3]{position:relative}@media (max-width:768px){.about__text-wrap[data-v-564627a3]{margin-bottom:40px}}.about__text[data-v-564627a3]{padding:0 24px;padding:0 var(--unit)}.about__text[data-v-564627a3] u{-webkit-text-stroke-width:1px;-webkit-text-stroke-color:hsla(0,0%,100%,.6)}.about__text[data-v-564627a3] u,.about__text[data-v-564627a3] u:active,.about__text[data-v-564627a3] u:focus,.about__text[data-v-564627a3] u:visited{color:transparent}@media (min-width:769px){.about__text--mob[data-v-564627a3]{display:none}}.about__text--mob p[data-v-564627a3]:nth-child(n+3){padding-left:80px}@media (max-width:768px){.about__text--desktop[data-v-564627a3]{display:none}}.about__text--desktop p[data-v-564627a3]:first-child{max-width:22.9em}.about__text--desktop p[data-v-564627a3]:not(:first-child){padding-left:calc(18.964vw - 9.10272px + 1.295vw - .6216px);padding-left:calc(1*var(--column-unit) + 1*var(--gutter-unit))}.about__text--desktop p[data-v-564627a3]:nth-child(n+3){padding-right:calc(18.964vw - 9.10272px + 1.295vw - .6216px);padding-right:calc(1*var(--column-unit) + 1*var(--gutter-unit))}.about__text p[data-v-564627a3]{font-family:TT Hoves;font-weight:300;letter-spacing:-.04em;line-height:.96;font-size:3.75vw}@media (max-width:768px){.about__text p[data-v-564627a3]{font-size:6.3vw}}.about__img-list[data-v-564627a3]{display:-webkit-box;display:flex;padding:0 24px 0 calc(14.27568px + 20.259vw);padding:0 var(--unit) 0 calc(var(--unit) + 1*var(--column-unit) + 1*var(--gutter-unit));margin-bottom:calc(1.295vw - .6216px);margin-bottom:calc(1*var(--gutter-unit))}@media (max-width:768px){.about__img-list[data-v-564627a3]{padding:0 24px 0 104px;padding:0 var(--unit) 0 calc(var(--unit) + 80px);-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;margin-bottom:8px}}.about__img-list li[data-v-564627a3]:nth-child(n+3){display:none}.about__img-list li[data-v-564627a3]:first-child{width:calc(18.964vw - 9.10272px);width:calc(1*var(--column-unit))}@media (max-width:768px){.about__img-list li[data-v-564627a3]:first-child{margin-bottom:8px;width:100%}}.about__img-list li:first-child .about__img[data-v-564627a3]:before{padding-top:180.2%}@media (max-width:768px){.about__img-list li:first-child .about__img[data-v-564627a3]:before{padding-top:152%}}.about__img-list li[data-v-564627a3]:nth-child(2){margin-left:calc(1.295vw - .6216px);margin-left:calc(1*var(--gutter-unit));width:calc(60.777vw - 29.17296px - 1.295vw + .6216px);width:calc(3*var(--column-and-gutter-unit) - var(--gutter-unit))}@media (max-width:768px){.about__img-list li[data-v-564627a3]:nth-child(2){margin:0;width:100%}}.about__img-list li:nth-child(2) .about__img[data-v-564627a3]:before{padding-top:57.45%}@media (max-width:768px){.about__img-list li:nth-child(2) .about__img[data-v-564627a3]:before{padding-top:65.94%}}.about__img[data-v-564627a3]{width:100%;position:relative}.about__img[data-v-564627a3]:before{content:"";display:block;width:100%}.about__img img[data-v-564627a3],.about__img video[data-v-564627a3]{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.about__info[data-v-564627a3]{display:-webkit-box;display:flex;position:relative}@media (min-width:769px){.about__info[data-v-564627a3]{padding-bottom:48px;-webkit-box-align:end;align-items:flex-end}}@media (max-width:768px){.about__info[data-v-564627a3]{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:start;align-items:flex-start}}.about__info-img[data-v-564627a3]{position:relative}@media (min-width:769px){.about__info-img[data-v-564627a3]{min-width:calc(-4.55136px + 59.482vw);min-width:calc(var(--unit) + 3*var(--column-and-gutter-unit) - var(--gutter-unit));width:calc(-4.55136px + 59.482vw);width:calc(var(--unit) + 3*var(--column-and-gutter-unit) - var(--gutter-unit))}}@media (max-width:768px){.about__info-img[data-v-564627a3]{margin-bottom:24px;width:calc(100% - 24px);width:calc(100% - var(--unit))}}.about__info-img[data-v-564627a3]:before{content:"";display:block;width:100%;padding-top:56.25%}.about__info-img img[data-v-564627a3],.about__info-img video[data-v-564627a3]{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}@media (min-width:769px){.about__info-contact[data-v-564627a3]{margin-left:auto}}@media (max-width:768px){.about__info-contact[data-v-564627a3]{margin:0 0 24px 24px;margin:0 0 24px var(--unit)}}@media (min-width:1401px){.about__info-contact[data-v-564627a3]{min-width:calc(20.259vw - 9.72432px - 1.295vw + .6216px);min-width:calc(1*var(--column-and-gutter-unit) - var(--gutter-unit));width:calc(20.259vw - 9.72432px - 1.295vw + .6216px);width:calc(1*var(--column-and-gutter-unit) - var(--gutter-unit))}}@media (max-width:1400px) and (min-width:769px){.about__info-contact[data-v-564627a3]{margin-right:24px;margin-right:var(--unit)}}.about__credits[data-v-564627a3]{z-index:1}@media (min-width:769px){.about__credits[data-v-564627a3]{position:absolute;bottom:0;left:calc(-4.55136px + 59.482vw);left:calc(var(--unit) + 3*var(--column-and-gutter-unit) - var(--gutter-unit));-webkit-transform:translateX(-100%);transform:translateX(-100%)}}@media (max-width:768px){.about__credits[data-v-564627a3]{margin:0 24px 0 auto;margin:0 var(--unit) 0 auto}}.about__social[data-v-564627a3]{padding-top:24px}@media (max-width:768px){.about__social[data-v-564627a3]{font-size:18px}}.about__social a[data-v-564627a3]{-webkit-transition:.4s ease;transition:.4s ease}.about__social a[data-v-564627a3]:hover{opacity:1}.about-next[data-v-564627a3]{position:relative;z-index:1}@media (max-width:768px){.about-next[data-v-564627a3] .next-row{-webkit-box-flex:unset;flex:unset}}@media (max-width:768px){.about-next[data-v-564627a3] .next-img{display:none}}@media (max-width:768px){.about-next[data-v-564627a3] .next-container{padding:0 24px 64px;padding:0 var(--unit) 64px;-webkit-box-pack:end;justify-content:flex-end}}.about__date[data-v-564627a3],.about__info-contact li[data-v-564627a3]{opacity:0;-webkit-transition:.9s cubic-bezier(.215,.61,.355,1);transition:.9s cubic-bezier(.215,.61,.355,1);-webkit-transition-delay:var(--delay);transition-delay:var(--delay)}.about__date.visible[data-v-564627a3],.about__info-contact li.visible[data-v-564627a3]{opacity:1}.about__img-list li[data-v-564627a3],.about__info-img[data-v-564627a3]{opacity:0;-webkit-transform:translateY(104px);transform:translateY(104px);-webkit-transition:.8s cubic-bezier(.45,0,.55,1);transition:.8s cubic-bezier(.45,0,.55,1)}.about__img-list li.visible[data-v-564627a3],.about__info-img.visible[data-v-564627a3]{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}.about__text[data-v-564627a3]:not(.about__text--animated) div{overflow:hidden}.about__text[data-v-564627a3] div>div{-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-transition:-webkit-transform .8s cubic-bezier(.33,1,.68,1);transition:-webkit-transform .8s cubic-bezier(.33,1,.68,1);transition:transform .8s cubic-bezier(.33,1,.68,1);transition:transform .8s cubic-bezier(.33,1,.68,1),-webkit-transform .8s cubic-bezier(.33,1,.68,1);-webkit-transition-delay:var(--delay);transition-delay:var(--delay)}.about__text p.visible[data-v-564627a3] div{-webkit-transform:translateY(0);transform:translateY(0)}',""]),t.exports=e},396:function(t,e,n){"use strict";n.r(e);n(21),n(12),n(10),n(8),n(17),n(86),n(29);var o=n(3),r=n(27),c=n(4),d=n(343),l=n(346),m=n(341),v=n(14);function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function h(content){var t,e,n;if(content.text.forEach((function(text,i){text.content.forEach((function(o,r){Object(v.f)(o)&&(n=Object(v.a)(f({},o)),t=i,e=r)}))})),n){var o=Object(v.a)(Object(r.a)(content.text));return o[t].content.splice(e,1),o.unshift({data:{},nodeType:"paragraph",content:[n]}),o}return Object(v.a)(content.text)}var w,_,y={mixins:[d.a,l.a],components:{Next:m.a},head:function(){return{title:"About"}},asyncData:(_=Object(o.a)(regeneratorRuntime.mark((function t(e){var n,o,c,content,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,t.next=3,n.dispatch("other/loadAbout");case 3:return o=t.sent,c=o.fields,(content={}).email=c.email,content.postAddress=c.postAddress,content.text=c.text.content,content.mediaList=Object(r.a)(c.mediaList),content.mediaBig=f({},c.mediaBig),d=h(content),t.abrupt("return",{isTextAnimated:!1,content:content,mobileText:d});case 13:case"end":return t.stop()}}),t)}))),function(t){return _.apply(this,arguments)}),mounted:function(){var t=this;this.$store.dispatch("dom/toggleDark",!0),this.$nextTick((function(){t.split()}))},methods:{split:(w=Object(o.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.e(12).then(n.bind(null,393));case 2:this.splitDesktop(),this.splitMob(),setTimeout((function(){e.observe()}),400);case 5:case"end":return t.stop()}}),t,this)}))),function(){return w.apply(this,arguments)}),splitDesktop:function(t){var e=this,n=new SplitText(".about__text--desktop p",{type:"lines"});(n=new SplitText(".about__text--desktop p",{type:"lines",linesClass:"about__text-line"})).lines.forEach((function(line,i){line.style.setProperty("--delay","".concat(.05*i,"s")),i===n.lines.length-1&&line.addEventListener("transitionend",(function(t){"transform"===t.propertyName&&(e.isTextAnimated=!0)}))}))},splitMob:function(){var t=this,e=new SplitText(".about__text--mob p",{type:"lines"});(e=new SplitText(".about__text--mob p",{type:"lines",linesClass:"about__text-line"})).lines.forEach((function(line,i){line.style.setProperty("--delay","".concat(.05*i,"s")),i===e.lines.length-1&&line.addEventListener("transitionend",(function(e){"transform"===e.propertyName&&(t.isTextAnimated=!0)}))}))},observe:function(){var t=this.$el.querySelectorAll("\n        .about__date,\n        .about__text p,\n        .about__img-list li,\n        .about__info-img,\n        .about__info-contact li\n      "),e=new IntersectionObserver((function(t){t.forEach((function(t){t.isIntersecting&&t.target.classList.add("visible")}))}));t.forEach((function(t){e.observe(t)}))},isImage:v.g,isVideo:v.i}},k=(n(362),n(6)),component=Object(k.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"about"},[n("div",{staticClass:"about-container"},[n("article",{staticClass:"about__text-wrap"},[n("p",{staticClass:"about__date"},[t._v("2016-2020")]),t._v(" "),n("div",{class:["about__text about__text--desktop",{"about__text--animated":t.isTextAnimated}]},t._l(t.content.text,(function(p,i){return n("p",{key:i,domProps:{innerHTML:t._s(t.render(p))}})})),0),t._v(" "),n("div",{class:["about__text about__text--mob",{"about__text--animated":t.isTextAnimated}]},t._l(t.mobileText,(function(p,i){return n("p",{key:i,domProps:{innerHTML:t._s(t.render(p))}})})),0)]),t._v(" "),n("ul",{staticClass:"about__img-list"},t._l(t.content.mediaList,(function(e,i){return n("li",{key:e.fields.file.url,style:{"--delay":.1*(i+1)+"s"}},[n("figure",{staticClass:"about__img"},[t.isVideo(e)?n("video",{attrs:{src:e.fields.file.url,autoplay:"",playsinline:"",loop:"",muted:""},domProps:{muted:!0}}):t._e(),t._v(" "),t.isImage(e)?n("BaseImage",{attrs:{img:e,alt:e.fields.title}}):t._e()],1)])})),0),t._v(" "),n("div",{staticClass:"about__info"},[n("figure",{staticClass:"about__info-img"},[t.isVideo(t.content.mediaBig)?n("video",{attrs:{src:t.content.mediaBig.fields.file.url,autoplay:"",playsinline:"",loop:"",muted:""},domProps:{muted:!0}}):t._e(),t._v(" "),t.isImage(t.content.mediaBig)?n("BaseImage",{attrs:{img:t.content.mediaBig,alt:t.content.mediaBig.fields.title}}):t._e()],1),t._v(" "),n("div",{staticClass:"about__info-contact"},[n("ul",[n("li",{style:{"--delay":"0.05s"}},[n("a",{attrs:{href:"mailto:"+this.content.email}},[t._v(t._s(this.content.email))])]),t._v(" "),n("li",{style:{"--delay":"0.01s"}},[t._v("\n            "+t._s(this.content.postAddress)+"\n          ")]),t._v(" "),n("li",{style:{"--delay":"0.15s"}},[t._v("\n            Saint Petersburg\n          ")]),t._v(" "),n("li",{style:{"--delay":"0.2s"}},[t._v("\n            Russia\n          ")])]),t._v(" "),n("ul",{staticClass:"about__social"},[n("li",{style:{"--delay":"0.25s"}},[n("a",{attrs:{href:"https://behance.net/stereocage",target:"_blank"}},[t._v("behance")])]),t._v(" "),n("li",{style:{"--delay":"0.3s"}},[n("a",{attrs:{href:"https://dribbble.com/stereocage",target:"_blank"}},[t._v("dribbble")])]),t._v(" "),n("li",{style:{"--delay":"0.35s"}},[n("a",{attrs:{href:"https://instagram.com/stereocage",target:"_blank"}},[t._v("instagram")])]),t._v(" "),n("li",{style:{"--delay":"0.4s"}},[n("a",{attrs:{href:"https://facebook.com/stereocage",target:"_blank"}},[t._v("facebook")])])])]),t._v(" "),n("button",{staticClass:"about__credits",attrs:{type:"button"},on:{click:function(e){return t.$store.dispatch("dom/toggleModal","credits")}}},[t._v("\n        Credits\n      ")])])]),t._v(" "),n("Next",{staticClass:"about-next",attrs:{to:"/vision",isPageDark:!0}},[n("span",{attrs:{slot:"title"},slot:"title"},[t._v("Vision")]),t._v(" "),n("span",{attrs:{slot:"text"},slot:"text"},[t._v("Looking the world through"),n("br"),t._v("eyes of another")])])],1)}),[],!1,null,"564627a3",null);e.default=component.exports}}]);