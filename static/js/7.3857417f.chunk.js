(this.webpackJsonpeveningroutine=this.webpackJsonpeveningroutine||[]).push([[7],{242:function(e,t,o){"use strict";var r=o(1),a=o(458),i=o(36);t.a=function(e){var t=Object(a.a)(e);return function(e,o){return t(e,Object(r.a)({defaultTheme:i.a},o))}}},272:function(e,t,o){"use strict";o.d(t,"b",(function(){return H}));var r=o(25),a=o(1),i=(o(3),o(163));var n=function(e,t){return t?Object(i.a)(e,t,{clone:!1}):e};var s=function(e){var t=function(t){var o=e(t);return t.css?Object(a.a)({},n(o,e(Object(a.a)({theme:t.theme},t.css))),{},function(e,t){var o={};return Object.keys(e).forEach((function(r){-1===t.indexOf(r)&&(o[r]=e[r])})),o}(t.css,[e.filterProps])):o};return t.propTypes={},t.filterProps=["css"].concat(Object(r.a)(e.filterProps)),t};var u=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var r=function(e){return t.reduce((function(t,o){var r=o(e);return r?n(t,r):t}),{})};return r.propTypes={},r.filterProps=t.reduce((function(e,t){return e.concat(t.filterProps)}),[]),r},p=o(11),m=o(66),l={xs:0,sm:600,md:960,lg:1280,xl:1920},c={keys:["xs","sm","md","lg","xl"],up:function(e){return"@media (min-width:".concat(l[e],"px)")}};function g(e,t,o){if(Array.isArray(t)){var r=e.theme.breakpoints||c;return t.reduce((function(e,a,i){return e[r.up(r.keys[i])]=o(t[i]),e}),{})}if("object"===Object(m.a)(t)){var a=e.theme.breakpoints||c;return Object.keys(t).reduce((function(e,r){return e[a.up(r)]=o(t[r]),e}),{})}return o(t)}function h(e,t){return t&&"string"===typeof t?t.split(".").reduce((function(e,t){return e&&e[t]?e[t]:null}),e):null}var d=function(e){var t=e.prop,o=e.cssProperty,r=void 0===o?e.prop:o,a=e.themeKey,i=e.transform,n=function(e){if(null==e[t])return null;var o=e[t],n=h(e.theme,a)||{};return g(e,o,(function(e){var t;return"function"===typeof n?t=n(e):Array.isArray(n)?t=n[e]||e:(t=h(n,e)||e,i&&(t=i(t))),!1===r?t:Object(p.a)({},r,t)}))};return n.propTypes={},n.filterProps=[t],n};function f(e){return"number"!==typeof e?e:"".concat(e,"px solid")}var y=u(d({prop:"border",themeKey:"borders",transform:f}),d({prop:"borderTop",themeKey:"borders",transform:f}),d({prop:"borderRight",themeKey:"borders",transform:f}),d({prop:"borderBottom",themeKey:"borders",transform:f}),d({prop:"borderLeft",themeKey:"borders",transform:f}),d({prop:"borderColor",themeKey:"palette"}),d({prop:"borderRadius",themeKey:"shape"})),b=u(d({prop:"displayPrint",cssProperty:!1,transform:function(e){return{"@media print":{display:e}}}}),d({prop:"display"}),d({prop:"overflow"}),d({prop:"textOverflow"}),d({prop:"visibility"}),d({prop:"whiteSpace"})),v=u(d({prop:"flexBasis"}),d({prop:"flexDirection"}),d({prop:"flexWrap"}),d({prop:"justifyContent"}),d({prop:"alignItems"}),d({prop:"alignContent"}),d({prop:"order"}),d({prop:"flex"}),d({prop:"flexGrow"}),d({prop:"flexShrink"}),d({prop:"alignSelf"}),d({prop:"justifyItems"}),d({prop:"justifySelf"})),j=u(d({prop:"gridGap"}),d({prop:"gridColumnGap"}),d({prop:"gridRowGap"}),d({prop:"gridColumn"}),d({prop:"gridRow"}),d({prop:"gridAutoFlow"}),d({prop:"gridAutoColumns"}),d({prop:"gridAutoRows"}),d({prop:"gridTemplateColumns"}),d({prop:"gridTemplateRows"}),d({prop:"gridTemplateAreas"}),d({prop:"gridArea"})),q=u(d({prop:"position"}),d({prop:"zIndex",themeKey:"zIndex"}),d({prop:"top"}),d({prop:"right"}),d({prop:"bottom"}),d({prop:"left"})),w=u(d({prop:"color",themeKey:"palette"}),d({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette"})),x=d({prop:"boxShadow",themeKey:"shadows"});function O(e){return e<=1?"".concat(100*e,"%"):e}var k=d({prop:"width",transform:O}),_=d({prop:"maxWidth",transform:O}),U=d({prop:"minWidth",transform:O}),W=d({prop:"height",transform:O}),A=d({prop:"maxHeight",transform:O}),N=d({prop:"minHeight",transform:O}),E=(d({prop:"size",cssProperty:"width",transform:O}),d({prop:"size",cssProperty:"height",transform:O}),u(k,_,U,W,A,N,d({prop:"boxSizing"}))),L=o(73);var S={m:"margin",p:"padding"},T={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},K={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},R=function(e){var t={};return function(o){return void 0===t[o]&&(t[o]=e(o)),t[o]}}((function(e){if(e.length>2){if(!K[e])return[e];e=K[e]}var t=e.split(""),o=Object(L.a)(t,2),r=o[0],a=o[1],i=S[r],n=T[a]||"";return Array.isArray(n)?n.map((function(e){return i+e})):[i+n]})),C=["m","mt","mr","mb","ml","mx","my","p","pt","pr","pb","pl","px","py","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY"];function P(e,t){return function(o){return e.reduce((function(e,r){return e[r]=function(e,t){if("string"===typeof t)return t;var o=e(Math.abs(t));return t>=0?o:"number"===typeof o?-o:"-".concat(o)}(t,o),e}),{})}}function I(e){var t=function(e){var t=e.spacing||8;return"number"===typeof t?function(e){return t*e}:Array.isArray(t)?function(e){return t[e]}:"function"===typeof t?t:function(){}}(e.theme);return Object.keys(e).map((function(o){if(-1===C.indexOf(o))return null;var r=P(R(o),t),a=e[o];return g(e,a,r)})).reduce(n,{})}I.propTypes={},I.filterProps=C;var z=I,Q=u(d({prop:"fontFamily",themeKey:"typography"}),d({prop:"fontSize",themeKey:"typography"}),d({prop:"fontStyle",themeKey:"typography"}),d({prop:"fontWeight",themeKey:"typography"}),d({prop:"letterSpacing"}),d({prop:"lineHeight"}),d({prop:"textAlign"})),B=o(242),H=s(u(y,b,v,j,q,w,x,E,z,Q)),J=Object(B.a)("div")(H,{name:"MuiBox"});t.a=J},338:function(e,t,o){"use strict";var r=o(1),a=o(2),i=o(11),n=o(0),s=o.n(n),u=(o(3),o(4)),p=o(5),m=o(9),l=s.a.forwardRef((function(e,t){var o=e.classes,i=e.className,n=e.component,p=void 0===n?"div":n,l=e.disableGutters,c=void 0!==l&&l,g=e.fixed,h=void 0!==g&&g,d=e.maxWidth,f=void 0===d?"lg":d,y=Object(a.a)(e,["classes","className","component","disableGutters","fixed","maxWidth"]);return s.a.createElement(p,Object(r.a)({className:Object(u.a)(o.root,i,h&&o.fixed,c&&o.disableGutters,!1!==f&&o["maxWidth".concat(Object(m.a)(String(f)))]),ref:t},y))}));t.a=Object(p.a)((function(e){return{root:Object(i.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),disableGutters:{paddingLeft:0,paddingRight:0},fixed:Object.keys(e.breakpoints.values).reduce((function(t,o){var r=e.breakpoints.values[o];return 0!==r&&(t[e.breakpoints.up(o)]={maxWidth:r}),t}),{}),maxWidthXs:Object(i.a)({},e.breakpoints.up("xs"),{maxWidth:Math.max(e.breakpoints.values.xs,444)}),maxWidthSm:Object(i.a)({},e.breakpoints.up("sm"),{maxWidth:e.breakpoints.values.sm}),maxWidthMd:Object(i.a)({},e.breakpoints.up("md"),{maxWidth:e.breakpoints.values.md}),maxWidthLg:Object(i.a)({},e.breakpoints.up("lg"),{maxWidth:e.breakpoints.values.lg}),maxWidthXl:Object(i.a)({},e.breakpoints.up("xl"),{maxWidth:e.breakpoints.values.xl})}}),{name:"MuiContainer"})(l)},458:function(e,t,o){"use strict";var r=o(1),a=o(2),i=o(0),n=o.n(i),s=o(4),u=(o(3),o(27)),p=o.n(u),m=o(102);function l(e,t){var o={};return Object.keys(e).forEach((function(r){-1===t.indexOf(r)&&(o[r]=e[r])})),o}t.a=function(e){return function(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=o.name,u=Object(a.a)(o,["name"]);var c,g=i,h="function"===typeof t?function(e){return{root:function(o){return t(Object(r.a)({theme:e},o))}}}:{root:t},d=Object(m.a)(h,Object(r.a)({Component:e,name:i||e.displayName,classNamePrefix:g},u));t.filterProps&&(c=t.filterProps,delete t.filterProps),t.propTypes&&(t.propTypes,delete t.propTypes);var f=n.a.forwardRef((function(t,o){var i=t.children,u=t.className,p=t.clone,m=t.component,g=Object(a.a)(t,["children","className","clone","component"]),h=d(t),f=Object(s.a)(h.root,u),y=g;if(c&&(y=l(y,c)),p)return n.a.cloneElement(i,Object(r.a)({className:Object(s.a)(i.props.className,f)},y));if("function"===typeof i)return i(Object(r.a)({className:f},y));var b=m||e;return n.a.createElement(b,Object(r.a)({ref:o,className:f},y),i)}));return p()(f,e),f}}},543:function(e,t,o){"use strict";o.r(t);var r=o(75),a=o(14),i=o(0),n=o.n(i),s=o(164),u=o(60),p=o(43),m=o(44),l=o(45),c=o(46),g=o(5),h=function(e){Object(c.a)(o,e);var t=Object(l.a)(o);function o(){var e;Object(p.a)(this,o);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).onLoad=function(){e.props.onQuoteLoaded()},e}return Object(m.a)(o,[{key:"render",value:function(){var e=this.props.className;return n.a.createElement("img",{alt:"quoteImage",src:this.props.src,className:e,onLoad:this.onLoad})}}]),o}(i.Component),d=Object(g.a)((function(e){return{}}))(h),f=o(338),y=o(272),b=o(39),v={motivationQuotes:[{quote:"Act as if what you do makes a difference. It does.",author:"William James",imageUrl:"images/quotes/1_act as if.jpg"},{quote:"Success is not final, failure is not fatal: it is the courage to continue that counts.",author:"Winston Churchill",imageUrl:"images/quotes/2_success.jpg"},{quote:"Never bend your head. Always hold it high. Look the world straight in the eye.",author:"Helen Keller",imageUrl:"images/quotes/3_eye.jpg"},{quote:"What you get by achieving your goals is not as important as what you become by achieving your goals.",author:"Zig Ziglar",imageUrl:"images/quotes/4_achieve_goals.jpg"},{quote:"Believe you can and you're halfway there.",author:"Theodore Roosevelt",imageUrl:"images/quotes/5_believe.jpg"},{quote:"When you have a dream, you've got to grab it and never let go.",author:"Carol Burnett",imageUrl:"images/quotes/6_dream.jpg"},{quote:"I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",author:"Jimmy Dean",imageUrl:"images/quotes/7_sail.jpg"},{quote:"No matter what you're going through, there's a light at the end of the tunnel.",author:"Demi Lovato",imageUrl:"images/quotes/8_tunnel.jpg"},{quote:"It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",author:"William James",imageUrl:"images/quotes/9_attitude.jpg"},{quote:"Life is like riding a bicycle. To keep your balance, you must keep moving.",author:"Albert Einstein",imageUrl:"images/quotes/10_bicycle.jpg"},{quote:"Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",author:"Ella Fitzgerald",imageUrl:"images/quotes/11_inspiration.jpg"},{quote:'Limit your "always" and your "nevers."',author:"Amy Poehler",imageUrl:"images/quotes/12_limit_always.jpg"},{quote:'Nothing is impossible. The word itself says "I\'m possible!"',author:"Audrey Hepburn",imageUrl:"images/quotes/13_impossible.jpg"},{quote:"You are never too old to set another goal or to dream a new dream.",author:"C.S. Lewis",imageUrl:"images/quotes/14_old.jpg"},{quote:"Try to be a rainbow in someone else's cloud.",author:"Maya Angelou",imageUrl:"images/quotes/15_rainbow.jpg"},{quote:"You do not find the happy life. You make it.",author:"Camilla Eyring Kimball",imageUrl:"images/quotes/16_happy_life.jpg"},{quote:"Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",author:"Deep Roy",imageUrl:"images/quotes/17_positive.jpg"},{quote:"Sometimes you will never know the value of a moment, until it becomes a memory.",author:"Dr. Seuss",imageUrl:"images/quotes/18_memories.jpg"},{quote:"The most wasted of days is one without laughter.",author:"E. E. Cummings",imageUrl:"images/quotes/19_laugh.jpg"},{quote:"You must do the things you think you cannot do.",author:"Eleanor Roosevelt",imageUrl:"images/quotes/20_things_youcantdo.jpg"},{quote:"It isn't where you came from. It's where you're going that counts.",author:"Ella Fitzgerald",imageUrl:"images/quotes/21_goingto.jpg"},{quote:"It is never too late to be what you might have been.",author:"George Eliot",imageUrl:"images/quotes/22_toolate.jpg"},{quote:"Stay close to anything that makes you glad you are alive.",author:"Hafez",imageUrl:"images/quotes/23_makesgladtobealive.jpg"},{quote:"You get what you give.",author:"Jennifer Lopez",imageUrl:"images/quotes/24_getwhatyougive.jpg"},{quote:"Some people look for a beautiful place. Others make a place beautiful.",author:"Hazrat Inayat Khan",imageUrl:"images/quotes/25_beautifulplace.jpg"},{quote:"Happiness often sneaks in through a door you didn't know you left open.",author:"John Barrymore",imageUrl:"images/quotes/26_happiness_door.jpg"},{quote:"We must be willing to let go of the life we planned so as to have the life that is waiting for us.",author:"Joseph Campbell",imageUrl:"images/quotes/27_letgo_of_life.jpg"},{quote:"Happiness is not by chance, but by choice.",author:"Jim Rohn",imageUrl:"images/quotes/28_choice.jpg"},{quote:"Life changes very quickly, in a very positive way, if you let it.",author:"Lindsey Vonn",imageUrl:"images/quotes/29_change_quickly.jpg"},{quote:"Keep your face to the sunshine and you cannot see a shadow.",author:"Helen Keller",imageUrl:"images/quotes/30_sunshine.jpg"},{quote:"Never limit yourself because of others\u2019 limited imagination; never limit others because of your own limited imagination.",author:"Mae Jemison",imageUrl:"images/quotes/31_imagination.jpg"},{quote:"Be the change that you wish to see in the world.",author:"Mahatma Gandhi",imageUrl:"images/quotes/32_gandhi.jpg"},{quote:"We can be heroes just for one day.",author:"David Bowie",imageUrl:"images/quotes/33_heroes_bowie.jpg"}]},j="50vh",q="50vw",w=Object(s.a)((function(e){var t;return{container:(t={display:"flex",justifyContent:"center",flexDirection:"column",textAlign:"center"},Object(a.a)(t,e.breakpoints.down("md"),{height:"80vh"}),Object(a.a)(t,e.breakpoints.up("md"),{height:"calc(100vh - (112px))"}),t),imgQuote:{maxWidth:q,maxHeight:j},boxQuote:{marginTop:20},typoQuote:{fontSize:"3vh"},typoQuoteAuthor:{fontSize:"2vh"},show:{opacity:1},hide:{opacity:0,width:0,height:0}}}));t.default=function(e){var t=w(),o=Object(i.useState)({}),a=Object(r.a)(o,2),s=a[0],p=a[1],m=Object(i.useState)(!1),l=Object(r.a)(m,2),c=l[0],g=l[1];return Object(i.useEffect)((function(){!function(){var e=Math.floor(Math.random()*v.motivationQuotes.length),t=v.motivationQuotes[e];t!==s&&p(t)}(),g(!1)}),[]),n.a.createElement(f.a,{className:t.container},n.a.createElement(y.a,{className:c?t.show:t.hide},n.a.createElement(y.a,{className:t.boxImage},n.a.createElement(d,{src:s.imageUrl,className:t.imgQuote,onQuoteLoaded:function(){g(!0)}})),n.a.createElement(y.a,{className:t.boxQuote},n.a.createElement(u.a,{className:t.typoQuote},'"',s.quote,'"'),n.a.createElement(u.a,{className:t.typoQuoteAuthor},s.author))),n.a.createElement(b.a,{className:c?t.hide:t.show}))}}}]);
//# sourceMappingURL=7.3857417f.chunk.js.map