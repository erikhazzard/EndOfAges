
/**
 * @license
 * Lo-Dash 2.2.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash -o ./dist/lodash.compat.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:b+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=!0;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:b+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=!0
}}function r(n){return n.charCodeAt(0)}function u(n,t){var e=n.m,r=t.m;if(e!==r){if(e>r||typeof e=="undefined")return 1;if(e<r||typeof r=="undefined")return-1}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[0|r/2],a=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&a&&typeof a=="object")return!1;for(u=l(),u["false"]=u["null"]=u["true"]=u.undefined=!1,o=l(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function a(n){return"\\"+Z[n]}function i(){return y.pop()||[]}function l(){return m.pop()||{k:null,l:null,m:null,"false":!1,n:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,o:null}
}function f(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function c(){}function p(n){n.length=0,y.length<j&&y.push(n)}function s(n){var t=n.l;t&&s(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,m.length<j&&m.push(n)}function g(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function h(e){function y(n){return n&&typeof n=="object"&&!Je(n)&&de.call(n,"__wrapped__")?n:new m(n)}function m(n,t){this.__chain__=!!t,this.__wrapped__=n
}function j(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!bt(n))return n;var a=ke.call(n);if(!U[a]||!We.nodeClass&&f(n))return n;var l=qe[a];switch(a){case z:case q:return new l(+n);case G:case H:return new l(n);case M:return o=l(n.source,I.exec(n)),o.lastIndex=n.lastIndex,o}if(a=Je(n),t){var c=!r;r||(r=i()),u||(u=i());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=a?l(n.length):{}}else o=a?g(n):er({},n);return a&&(de.call(n,"index")&&(o.index=n.index),de.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(a?tr:or)(n,function(n,a){o[a]=j(n,t,e,r,u)
}),c&&(p(r),p(u)),o):o}function Z(n,t,e){if(typeof n!="function")return Ht;if(typeof t=="undefined")return n;var r=n.__bindData__||We.funcNames&&!n.name;if(typeof r=="undefined"){var u=P&&ye.call(n);We.funcNames||!u||A.test(u)||(r=!0),(We.funcNames||!r)&&(r=!We.funcDecomp||P.test(u),Ge(n,r))}if(true!==r&&r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)
}}return Gt(n,t)}function tt(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var a=n[r];if(a&&typeof a=="object"&&typeof a.length=="number"&&(Je(a)||vt(a))){t||(a=tt(a,t,e));var i=-1,l=a.length,f=o.length;for(o.length+=l;++i<l;)o[f++]=a[i]}else e||o.push(a)}return o}function et(n,t,e,r,u,o){if(e){var a=e(n,t);if(typeof a!="undefined")return!!a}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&Y[typeof n]||t&&Y[typeof t]))return!1;if(null==n||null==t)return n===t;var l=ke.call(n),c=ke.call(t);
if(l==L&&(l=J),c==L&&(c=J),l!=c)return!1;switch(l){case z:case q:return+n==+t;case G:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case M:case H:return n==oe(t)}if(c=l==T,!c){if(de.call(n,"__wrapped__")||de.call(t,"__wrapped__"))return et(n.__wrapped__||n,t.__wrapped__||t,e,r,u,o);if(l!=J||!We.nodeClass&&(f(n)||f(t)))return!1;var l=!We.argsObject&&vt(n)?re:n.constructor,s=!We.argsObject&&vt(t)?re:t.constructor;if(l!=s&&!(_t(l)&&l instanceof l&&_t(s)&&s instanceof s))return!1}for(s=!u,u||(u=i()),o||(o=i()),l=u.length;l--;)if(u[l]==n)return o[l]==t;
var g=0,a=!0;if(u.push(n),o.push(t),c){if(l=n.length,g=t.length,a=g==n.length,!a&&!r)return a;for(;g--;)if(c=l,s=t[g],r)for(;c--&&!(a=et(n[c],s,e,r,u,o)););else if(!(a=et(n[g],s,e,r,u,o)))break;return a}return ur(t,function(t,i,l){return de.call(l,i)?(g++,a=de.call(n,i)&&et(n[i],t,e,r,u,o)):void 0}),a&&!r&&ur(n,function(n,t,e){return de.call(e,t)?a=-1<--g:void 0}),s&&(p(u),p(o)),a}function ut(n,t,e,r,u){(Je(t)?St:or)(t,function(t,o){var a,i,l=t,f=n[o];if(t&&((i=Je(t))||ar(t))){for(l=r.length;l--;)if(a=r[l]==t){f=u[l];
break}if(!a){var c;e&&(l=e(f,t),c=typeof l!="undefined")&&(f=l),c||(f=i?Je(f)?f:[]:ar(f)?f:{}),r.push(t),u.push(f),c||ut(f,t,e,r,u)}}else e&&(l=e(f,t),typeof l=="undefined"&&(l=t)),typeof l!="undefined"&&(f=l);n[o]=f})}function at(e,r,u){var a=-1,l=st(),f=e?e.length:0,c=[],g=!r&&f>=w&&l===n,h=u||g?i():c;if(g){var v=o(h);v?(l=t,h=v):(g=!1,h=u?h:(p(h),c))}for(;++a<f;){var v=e[a],y=u?u(v,a,e):v;(r?!a||h[h.length-1]!==y:0>l(h,y))&&((u||g)&&h.push(y),c.push(v))}return g?(p(h.k),s(h)):u&&p(h),c}function it(n){return function(t,e,r){var u={};
if(e=y.createCallback(e,r,3),Je(t)){r=-1;for(var o=t.length;++r<o;){var a=t[r];n(u,a,e(a,r,t),t)}}else tr(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function lt(n,t,e,r,u,o){var a=1&t,i=2&t,l=4&t,f=8&t,c=16&t,p=32&t,s=n;if(!i&&!_t(n))throw new ae;c&&!e.length&&(t&=-17,c=e=!1),p&&!r.length&&(t&=-33,p=r=!1);var g=n&&n.__bindData__;if(g)return!a||1&g[1]||(g[4]=u),!a&&1&g[1]&&(t|=8),!l||4&g[1]||(g[5]=o),c&&be.apply(g[2]||(g[2]=[]),e),p&&be.apply(g[3]||(g[3]=[]),r),g[1]|=t,lt.apply(null,g);if(!a||i||l||p||!(We.fastBind||Se&&c))v=function(){var g=arguments,h=a?u:this;
return(l||c||p)&&(g=Le.call(g),c&&Ee.apply(g,e),p&&be.apply(g,r),l&&g.length<o)?(t|=16,lt(n,f?t:-4&t,g,null,u,o)):(i&&(n=h[s]),this instanceof v?(h=ct(n.prototype),g=n.apply(h,g),bt(g)?g:h):n.apply(h,g))};else{if(c){var h=[u];be.apply(h,e)}var v=c?Se.apply(n,h):Se.call(n,u)}return Ge(v,Le.call(arguments)),v}function ft(){X.h=$,X.b=X.c=X.g=X.i="",X.e="t",X.j=!0;for(var n,t=0;n=arguments[t];t++)for(var e in n)X[e]=n[e];t=X.a,X.d=/^[^,]+/.exec(t)[0],n=ne,t="return function("+t+"){",e=X;var r="var n,t="+e.d+",E="+e.e+";if(!t)return E;"+e.i+";";
e.b?(r+="var u=t.length;n=-1;if("+e.b+"){",We.unindexedChars&&(r+="if(s(t)){t=t.split('')}"),r+="while(++n<u){"+e.g+";}}else{"):We.nonEnumArgs&&(r+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+e.g+";}}else{"),We.enumPrototypes&&(r+="var G=typeof t=='function';"),We.enumErrorProps&&(r+="var F=t===k||t instanceof Error;");var u=[];if(We.enumPrototypes&&u.push('!(G&&n=="prototype")'),We.enumErrorProps&&u.push('!(F&&(n=="message"||n=="name"))'),e.j&&e.f)r+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",u.length&&(r+="if("+u.join("&&")+"){"),r+=e.g+";",u.length&&(r+="}"),r+="}";
else if(r+="for(n in t){",e.j&&u.push("m.call(t, n)"),u.length&&(r+="if("+u.join("&&")+"){"),r+=e.g+";",u.length&&(r+="}"),r+="}",We.nonEnumShadows){for(r+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)r+="n='"+e.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",e.j||(r+="||(!x[n]&&t[n]!==A[n])"),r+="){"+e.g+"}";r+="}"}return(e.b||We.nonEnumArgs)&&(r+="}"),r+=e.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+r+"}")(Z,K,le,de,_,vt,Je,jt,X.f,fe,Y,Ke,H,ce,ke)
}function ct(n){return bt(n)?Ie(n):{}}function pt(n){return Xe[n]}function st(){var t=(t=y.indexOf)===Lt?n:t;return t}function gt(n){var t,e;return!n||ke.call(n)!=J||(t=n.constructor,_t(t)&&!(t instanceof t))||!We.argsClass&&vt(n)||!We.nodeClass&&f(n)?!1:We.ownLast?(ur(n,function(n,t,r){return e=de.call(r,t),!1}),false!==e):(ur(n,function(n,t){e=t}),typeof e=="undefined"||de.call(n,e))}function ht(n){return Ye[n]}function vt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ke.call(n)==L||!1
}function yt(n,t,e){var r=He(n),u=r.length;for(t=Z(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function mt(n){var t=[];return ur(n,function(n,e){_t(n)&&t.push(e)}),t.sort()}function dt(n){for(var t=-1,e=He(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function _t(n){return typeof n=="function"}function bt(n){return!(!n||!Y[typeof n])}function wt(n){return typeof n=="number"||ke.call(n)==G}function jt(n){return typeof n=="string"||ke.call(n)==H}function xt(n){for(var t=-1,e=He(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];
return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,a=!1;return e=(0>e?Pe(0,o+e):e)||0,Je(n)?a=-1<u(n,t,e):typeof o=="number"?a=-1<(jt(n)?n.indexOf(t,e):u(n,t,e)):tr(n,function(n){return++r<e?void 0:!(a=n===t)}),a}function kt(n,t,e){var r=!0;if(t=y.createCallback(t,e,3),Je(n)){e=-1;for(var u=n.length;++e<u&&(r=!!t(n[e],e,n)););}else tr(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Et(n,t,e){var r=[];if(t=y.createCallback(t,e,3),Je(n)){e=-1;for(var u=n.length;++e<u;){var o=n[e];
t(o,e,n)&&r.push(o)}}else tr(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function Ot(n,t,e){if(t=y.createCallback(t,e,3),!Je(n)){var r;return tr(n,function(n,e,u){return t(n,e,u)?(r=n,!1):void 0}),r}e=-1;for(var u=n.length;++e<u;){var o=n[e];if(t(o,e,n))return o}}function St(n,t,e){if(t&&typeof e=="undefined"&&Je(n)){e=-1;for(var r=n.length;++e<r&&false!==t(n[e],e,n););}else tr(n,t,e);return n}function It(n,t,e){var r=n,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:Z(t,e,3),Je(n))for(;u--&&false!==t(n[u],u,n););else{if(typeof u!="number")var o=He(n),u=o.length;
else We.unindexedChars&&jt(n)&&(r=n.split(""));tr(n,function(n,e,a){return e=o?o[--u]:--u,t(r[e],e,a)})}return n}function At(n,t,e){var r=-1,u=n?n.length:0,o=Xt(typeof u=="number"?u:0);if(t=y.createCallback(t,e,3),Je(n))for(;++r<u;)o[r]=t(n[r],r,n);else tr(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function Nt(n,t,e){var u=-1/0,o=u;if(!t&&Je(n)){e=-1;for(var a=n.length;++e<a;){var i=n[e];i>o&&(o=i)}}else t=!t&&jt(n)?r:y.createCallback(t,e,3),tr(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o
}function Bt(n,t,e,r){var u=3>arguments.length;if(t=Z(t,r,4),Je(n)){var o=-1,a=n.length;for(u&&(e=n[++o]);++o<a;)e=t(e,n[o],o,n)}else tr(n,function(n,r,o){e=u?(u=!1,n):t(e,n,r,o)});return e}function Dt(n,t,e,r){var u=3>arguments.length;return t=Z(t,r,4),It(n,function(n,r,o){e=u?(u=!1,n):t(e,n,r,o)}),e}function Pt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=Vt(++t);r[t]=r[e],r[e]=n}),r}function Rt(n,t,e){var r;if(t=y.createCallback(t,e,3),Je(n)){e=-1;for(var u=n.length;++e<u&&!(r=t(n[e],e,n)););}else tr(n,function(n,e,u){return!(r=t(n,e,u))
});return!!r}function Ft(e){var r=-1,u=st(),a=e?e.length:0,i=tt(arguments,!0,!0,1),l=[],f=a>=w&&u===n;if(f){var c=o(i);c?(u=t,i=c):f=!1}for(;++r<a;)c=e[r],0>u(i,c)&&l.push(c);return f&&s(i),l}function $t(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;for(t=y.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return g(n,0,Re(Pe(0,r),u))}function Lt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Pe(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;
return n(t,e,r)}function Tt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=y.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Pe(0,t);return g(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?y.createCallback(e,r,1):Ht,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;return u}function qt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(e=(r=e)&&r[t]===n?null:t,t=!1),null!=e&&(e=y.createCallback(e,r,3)),at(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?Nt(cr(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=cr(n,t);
return r}function Wt(n,t){for(var e=-1,r=n?n.length:0,u={};++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Gt(n,t){return 2<arguments.length?lt(n,17,Le.call(arguments,2),null,t):lt(n,1,null,null,t)}function Jt(n,t,e){function r(){c&&he(c),a=c=p=v,(h||g!==t)&&(s=_e(),i=n.apply(f,o))}function u(){var e=t-(_e()-l);0<e?c=xe(u,e):(a&&he(a),e=p,a=c=p=v,e&&(s=_e(),i=n.apply(f,o)))}var o,a,i,l,f,c,p,s=0,g=!1,h=!0;if(!_t(n))throw new ae;if(t=Pe(0,t)||0,true===e)var y=!0,h=!1;else bt(e)&&(y=e.leading,g="maxWait"in e&&(Pe(t,e.maxWait)||0),h="trailing"in e?e.trailing:h);
return function(){if(o=arguments,l=_e(),f=this,p=h&&(c||!y),false===g)var e=y&&!c;else{a||y||(s=l);var v=g-(l-s);0<v?a||(a=xe(r,v)):(a&&(a=he(a)),s=l,i=n.apply(f,o))}return c||t===g||(c=xe(u,t)),e&&(i=n.apply(f,o)),i}}function Mt(n){if(!_t(n))throw new ae;var t=Le.call(arguments,1);return xe(function(){n.apply(v,t)},1)}function Ht(n){return n}function Ut(n,t){var e=n,r=!t||_t(e);t||(e=m,t=n,n=y),St(mt(t),function(u){var o=n[u]=t[u];r&&(e.prototype[u]=function(){var t=this.__wrapped__,r=[t];return be.apply(r,arguments),r=o.apply(n,r),t&&typeof t=="object"&&t===r?this:(r=new e(r),r.__chain__=this.__chain__,r)
})})}function Vt(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=!0)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,r=$e(),e||n%1||t%1?Re(n+r*(t-n+parseFloat("1e-"+((r+"").length-1))),t):n+ve(r*(t-n+1))}function Qt(){return this.__wrapped__}e=e?ot.defaults(nt.Object(),e,ot.pick(nt,F)):nt;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ae=e.TypeError,ie=[],le=e.Error.prototype,fe=re.prototype,ce=oe.prototype,pe=e._,se=ue("^"+oe(fe.valueOf).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$"),ge=te.ceil,he=e.clearTimeout,ve=te.floor,ye=ne.prototype.toString,me=se.test(me=re.getPrototypeOf)&&me,de=fe.hasOwnProperty,_e=se.test(_e=Zt.now)&&_e||function(){return+new Zt
},be=ie.push,we=fe.propertyIsEnumerable,je=e.setImmediate,xe=e.setTimeout,Ce=ie.splice,ke=fe.toString,Ee=ie.unshift,Oe=function(){try{var n={},t=se.test(t=re.defineProperty)&&t,e=t(n,n,n)&&t}catch(r){}return e}(),Se=se.test(Se=ke.bind)&&Se,Ie=se.test(Ie=re.create)&&Ie,Ae=se.test(Ae=Xt.isArray)&&Ae,Ne=e.isFinite,Be=e.isNaN,De=se.test(De=re.keys)&&De,Pe=te.max,Re=te.min,Fe=e.parseInt,$e=te.random,Le=ie.slice,Te=se.test(e.attachEvent),ze=Se&&!/\n|true/.test(Se+Te),qe={};qe[T]=Xt,qe[z]=Yt,qe[q]=Zt,qe[W]=ne,qe[J]=re,qe[G]=ee,qe[M]=ue,qe[H]=oe;
var Ke={};Ke[T]=Ke[q]=Ke[G]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},Ke[z]=Ke[H]={constructor:!0,toString:!0,valueOf:!0},Ke[K]=Ke[W]=Ke[M]={constructor:!0,toString:!0},Ke[J]={constructor:!0},function(){for(var n=$.length;n--;){var t,e=$[n];for(t in Ke)de.call(Ke,t)&&!de.call(Ke[t],e)&&(Ke[t][e]=!1)}}(),m.prototype=y.prototype;var We=y.support={};!function(){function n(){this.x=1}var t={0:1,length:1},r=[];n.prototype={valueOf:1};for(var u in new n)r.push(u);for(u in arguments);We.argsClass=ke.call(arguments)==L,We.argsObject=arguments.constructor==re&&!(arguments instanceof Xt),We.enumErrorProps=we.call(le,"message")||we.call(le,"name"),We.enumPrototypes=we.call(n,"prototype"),We.fastBind=Se&&!ze,We.funcDecomp=!se.test(e.p)&&P.test(h),We.funcNames=typeof ne.name=="string",We.nonEnumArgs=0!=u,We.nonEnumShadows=!/valueOf/.test(r),We.ownLast="x"!=r[0],We.spliceObjects=(ie.splice.call(t,0,1),!t[0]),We.unindexedChars="xx"!="x"[0]+re("x")[0];
try{We.nodeClass=!(ke.call(document)==J&&!({toString:0}+""))}catch(o){We.nodeClass=!0}}(1),y.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:y}},Ie||(ct=function(n){if(bt(n)){c.prototype=n;var t=new c;c.prototype=null}return t||{}});var Ge=Oe?function(n,t){Q.value=t,Oe(n,"__bindData__",Q)}:c;We.argsClass||(vt=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&de.call(n,"callee")||!1});var Je=Ae||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ke.call(n)==T||!1
},Me=ft({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),He=De?function(n){return bt(n)?We.enumPrototypes&&typeof n=="function"||We.nonEnumArgs&&n.length&&vt(n)?Me(n):De(n):[]}:Me,Ue={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:He,g:"if(e(t[n],n,g)===false)return E"},Ve={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:He,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},Qe={i:"if(!B[typeof t])return E;"+Ue.i,b:!1},Xe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ye=dt(Xe),Ze=ue("("+He(Ye).join("|")+")","g"),nr=ue("["+He(Xe).join("")+"]","g"),tr=ft(Ue),er=ft(Ve,{i:Ve.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),rr=ft(Ve),ur=ft(Ue,Qe,{j:!1}),or=ft(Ue,Qe);
_t(/x/)&&(_t=function(n){return typeof n=="function"&&ke.call(n)==W});var ar=me?function(n){if(!n||ke.call(n)!=J||!We.argsClass&&vt(n))return!1;var t=n.valueOf,e=typeof t=="function"&&(e=me(t))&&me(e);return e?n==e||me(n)==e:gt(n)}:gt,ir=it(function(n,t,e){de.call(n,e)?n[e]++:n[e]=1}),lr=it(function(n,t,e){(de.call(n,e)?n[e]:n[e]=[]).push(t)}),fr=it(function(n,t,e){n[e]=t}),cr=At;ze&&rt&&typeof je=="function"&&(Mt=function(n){if(!_t(n))throw new ae;return je.apply(e,arguments)});var pr=8==Fe(x+"08")?Fe:function(n,t){return Fe(jt(n)?n.replace(B,""):n,t||0)
};return y.after=function(n,t){if(!_t(t))throw new ae;return function(){return 1>--n?t.apply(this,arguments):void 0}},y.assign=er,y.at=function(n){var t=arguments,e=-1,r=tt(t,!0,!1,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);for(We.unindexedChars&&jt(n)&&(n=n.split(""));++e<t;)u[e]=n[r[e]];return u},y.bind=Gt,y.bindAll=function(n){for(var t=1<arguments.length?tt(arguments,!0,!1,1):mt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=lt(n[u],1,null,null,n)}return n},y.bindKey=function(n,t){return 2<arguments.length?lt(t,19,Le.call(arguments,2),null,n):lt(t,3,null,null,n)
},y.chain=function(n){return n=new m(n),n.__chain__=!0,n},y.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},y.compose=function(){for(var n=arguments,t=n.length;t--;)if(!_t(n[t]))throw new ae;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},y.countBy=ir,y.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return Z(n,t,e);if("object"!=r)return function(t){return t[n]};var u=He(n),o=u[0],a=n[o];
return 1!=u.length||a!==a||bt(a)?function(t){for(var e=u.length,r=!1;e--&&(r=et(t[u[e]],n[u[e]],null,!0)););return r}:function(n){return n=n[o],a===n&&(0!==a||1/a==1/n)}},y.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,lt(n,4,null,null,null,t)},y.debounce=Jt,y.defaults=rr,y.defer=Mt,y.delay=function(n,t){if(!_t(n))throw new ae;var e=Le.call(arguments,2);return xe(function(){n.apply(v,e)},t)},y.difference=Ft,y.filter=Et,y.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(e=(r=e)&&r[t]===n?null:t,t=!1),null!=e&&(n=At(n,e,r)),tt(n,t)
},y.forEach=St,y.forEachRight=It,y.forIn=ur,y.forInRight=function(n,t,e){var r=[];ur(n,function(n,t){r.push(t,n)});var u=r.length;for(t=Z(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},y.forOwn=or,y.forOwnRight=yt,y.functions=mt,y.groupBy=lr,y.indexBy=fr,y.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=y.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return g(n,0,Re(Pe(0,u-r),u))},y.intersection=function(e){for(var r=arguments,u=r.length,a=-1,l=i(),f=-1,c=st(),g=e?e.length:0,h=[],v=i();++a<u;){var y=r[a];
l[a]=c===n&&(y?y.length:0)>=w&&o(a?r[a]:v)}n:for(;++f<g;){var m=l[0],y=e[f];if(0>(m?t(m,y):c(v,y))){for(a=u,(m||v).push(y);--a;)if(m=l[a],0>(m?t(m,y):c(r[a],y)))continue n;h.push(y)}}for(;u--;)(m=l[u])&&s(m);return p(l),p(v),h},y.invert=dt,y.invoke=function(n,t){var e=Le.call(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,a=Xt(typeof o=="number"?o:0);return St(n,function(n){a[++r]=(u?t:n[t]).apply(n,e)}),a},y.keys=He,y.map=At,y.max=Nt,y.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):b+arguments[0];
return de.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!_t(n))throw new ae;return e.cache={},e},y.merge=function(n){var t=arguments,e=2;if(!bt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=Z(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=Le.call(arguments,1,e),u=-1,o=i(),a=i();++u<e;)ut(n,t[u],r,o,a);return p(o),p(a),n},y.min=function(n,t,e){var u=1/0,o=u;if(!t&&Je(n)){e=-1;for(var a=n.length;++e<a;){var i=n[e];i<o&&(o=i)}}else t=!t&&jt(n)?r:y.createCallback(t,e,3),tr(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)
});return o},y.omit=function(n,t,e){var r=st(),u=typeof t=="function",o={};if(u)t=y.createCallback(t,e,3);else var a=tt(arguments,!0,!1,1);return ur(n,function(n,e,i){(u?!t(n,e,i):0>r(a,e))&&(o[e]=n)}),o},y.once=function(n){var t,e;if(!_t(n))throw new ae;return function(){return t?e:(t=!0,e=n.apply(this,arguments),n=null,e)}},y.pairs=function(n){for(var t=-1,e=He(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},y.partial=function(n){return lt(n,16,Le.call(arguments,1))},y.partialRight=function(n){return lt(n,32,null,Le.call(arguments,1))
},y.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=tt(arguments,!0,!1,1),a=bt(n)?o.length:0;++u<a;){var i=o[u];i in n&&(r[i]=n[i])}else t=y.createCallback(t,e,3),ur(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},y.pluck=cr,y.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,a=t[e];++o<u;)n[o]===a&&(Ce.call(n,o--,1),u--);return n},y.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Pe(0,ge((t-n)/(e||1)));
for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},y.reject=function(n,t,e){return t=y.createCallback(t,e,3),Et(n,function(n,e,r){return!t(n,e,r)})},y.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=y.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),Ce.call(n,r--,1),u--);return o},y.rest=Tt,y.shuffle=Pt,y.sortBy=function(n,t,e){var r=-1,o=n?n.length:0,a=Xt(typeof o=="number"?o:0);for(t=y.createCallback(t,e,3),St(n,function(n,e,u){var o=a[++r]=l();o.m=t(n,e,u),o.n=r,o.o=n}),o=a.length,a.sort(u);o--;)n=a[o],a[o]=n.o,s(n);
return a},y.tap=function(n,t){return t(n),n},y.throttle=function(n,t,e){var r=!0,u=!0;if(!_t(n))throw new ae;return false===e?r=!1:bt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),V.leading=r,V.maxWait=t,V.trailing=u,Jt(n,t,V)},y.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=Z(t,e,1);++r<n;)u[r]=t(r);return u},y.toArray=function(n){return n&&typeof n.length=="number"?We.unindexedChars&&jt(n)?n.split(""):g(n):xt(n)},y.transform=function(n,t,e,r){var u=Je(n);return t=Z(t,r,4),null==e&&(u?e=[]:(r=n&&n.constructor,e=ct(r&&r.prototype))),(u?tr:or)(n,function(n,r,u){return t(e,n,r,u)
}),e},y.union=function(){return at(tt(arguments,!0,!0))},y.uniq=qt,y.values=xt,y.where=Et,y.without=function(n){return Ft(n,Le.call(arguments,1))},y.wrap=function(n,t){if(!_t(t))throw new ae;return function(){var e=[n];return be.apply(e,arguments),t.apply(this,e)}},y.zip=Kt,y.zipObject=Wt,y.collect=At,y.drop=Tt,y.each=St,y.q=It,y.extend=er,y.methods=mt,y.object=Wt,y.select=Et,y.tail=Tt,y.unique=qt,y.unzip=Kt,Ut(y),y.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=!1),j(n,t,typeof e=="function"&&Z(e,r,1))
},y.cloneDeep=function(n,t,e){return j(n,!0,typeof t=="function"&&Z(t,e,1))},y.contains=Ct,y.escape=function(n){return null==n?"":oe(n).replace(nr,pt)},y.every=kt,y.find=Ot,y.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=y.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},y.findKey=function(n,t,e){var r;return t=y.createCallback(t,e,3),or(n,function(n,e,u){return t(n,e,u)?(r=e,!1):void 0}),r},y.findLast=function(n,t,e){var r;return t=y.createCallback(t,e,3),It(n,function(n,e,u){return t(n,e,u)?(r=n,!1):void 0
}),r},y.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=y.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},y.findLastKey=function(n,t,e){var r;return t=y.createCallback(t,e,3),yt(n,function(n,e,u){return t(n,e,u)?(r=e,!1):void 0}),r},y.has=function(n,t){return n?de.call(n,t):!1},y.identity=Ht,y.indexOf=Lt,y.isArguments=vt,y.isArray=Je,y.isBoolean=function(n){return true===n||false===n||ke.call(n)==z},y.isDate=function(n){return n?typeof n=="object"&&ke.call(n)==q:!1},y.isElement=function(n){return n?1===n.nodeType:!1
},y.isEmpty=function(n){var t=!0;if(!n)return t;var e=ke.call(n),r=n.length;return e==T||e==H||(We.argsClass?e==L:vt(n))||e==J&&typeof r=="number"&&_t(n.splice)?!r:(or(n,function(){return t=!1}),t)},y.isEqual=function(n,t,e,r){return et(n,t,typeof e=="function"&&Z(e,r,2))},y.isFinite=function(n){return Ne(n)&&!Be(parseFloat(n))},y.isFunction=_t,y.isNaN=function(n){return wt(n)&&n!=+n},y.isNull=function(n){return null===n},y.isNumber=wt,y.isObject=bt,y.isPlainObject=ar,y.isRegExp=function(n){return n&&Y[typeof n]?ke.call(n)==M:!1
},y.isString=jt,y.isUndefined=function(n){return typeof n=="undefined"},y.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Pe(0,r+e):Re(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},y.mixin=Ut,y.noConflict=function(){return e._=pe,this},y.parseInt=pr,y.random=Vt,y.reduce=Bt,y.reduceRight=Dt,y.result=function(n,t){if(n){var e=n[t];return _t(e)?n[t]():e}},y.runInContext=h,y.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:He(n).length},y.some=Rt,y.sortedIndex=zt,y.template=function(n,t,e){var r=y.templateSettings;
n||(n=""),e=rr({},e,r);var u,o=rr({},e.imports,r.imports),r=He(o),o=xt(o),i=0,l=e.interpolate||D,f="__p+='",l=ue((e.escape||D).source+"|"+l.source+"|"+(l===N?S:D).source+"|"+(e.evaluate||D).source+"|$","g");n.replace(l,function(t,e,r,o,l,c){return r||(r=o),f+=n.slice(i,c).replace(R,a),e&&(f+="'+__e("+e+")+'"),l&&(u=!0,f+="';"+l+";__p+='"),r&&(f+="'+((__t=("+r+"))==null?'':__t)+'"),i=c+t.length,t}),f+="';\n",l=e=e.variable,l||(e="obj",f="with("+e+"){"+f+"}"),f=(u?f.replace(C,""):f).replace(E,"$1").replace(O,"$1;"),f="function("+e+"){"+(l?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+f+"return __p}";
try{var c=ne(r,"return "+f).apply(v,o)}catch(p){throw p.source=f,p}return t?c(t):(c.source=f,c)},y.unescape=function(n){return null==n?"":oe(n).replace(Ze,ht)},y.uniqueId=function(n){var t=++d;return oe(null==n?"":n)+t},y.all=kt,y.any=Rt,y.detect=Ot,y.findWhere=Ot,y.foldl=Bt,y.foldr=Dt,y.include=Ct,y.inject=Bt,or(y,function(n,t){y.prototype[t]||(y.prototype[t]=function(){var t=[this.__wrapped__],e=this.__chain__;return be.apply(t,arguments),t=n.apply(y,t),e?new m(t,e):t})}),y.first=$t,y.last=function(n,t,e){var r=0,u=n?n.length:0;
if(typeof t!="number"&&null!=t){var o=u;for(t=y.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return g(n,Pe(0,u-r))},y.sample=function(n,t,e){var r=n?n.length:0;return typeof r!="number"?n=xt(n):We.unindexedChars&&jt(n)&&(n=n.split("")),null==t||e?n?n[Vt(r-1)]:v:(n=Pt(n),n.length=Re(Pe(0,t),n.length),n)},y.take=$t,y.head=$t,or(y,function(n,t){var e="sample"!==t;y.prototype[t]||(y.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new m(o,u):o
})}),y.VERSION="2.2.1",y.prototype.chain=function(){return this.__chain__=!0,this},y.prototype.toString=function(){return oe(this.__wrapped__)},y.prototype.value=Qt,y.prototype.valueOf=Qt,tr(["join","pop","shift"],function(n){var t=ie[n];y.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);return n?new m(e,n):e}}),tr(["push","reverse","sort","unshift"],function(n){var t=ie[n];y.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),tr(["concat","slice","splice"],function(n){var t=ie[n];
y.prototype[n]=function(){return new m(t.apply(this.__wrapped__,arguments),this.__chain__)}}),We.spliceObjects||tr(["pop","shift","splice"],function(n){var t=ie[n],e="splice"==n;y.prototype[n]=function(){var n=this.__chain__,r=this.__wrapped__,u=t.apply(r,arguments);return 0===r.length&&delete r[0],n||e?new m(u,n):u}}),y}var v,y=[],m=[],d=0,_={},b=+new Date+"",w=75,j=40,x=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",C=/\b__p\+='';/g,E=/\b(__p\+=)''\+/g,O=/(__e\(.*?\)|\b__t\))\+'';/g,S=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,I=/\w*$/,A=/^function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,B=RegExp("^["+x+"]*0+(?=.$)"),D=/($^)/,P=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,F="Array Boolean Date Error Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setImmediate setTimeout".split(" "),$="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),L="[object Arguments]",T="[object Array]",z="[object Boolean]",q="[object Date]",K="[object Error]",W="[object Function]",G="[object Number]",J="[object Object]",M="[object RegExp]",H="[object String]",U={};
U[W]=!1,U[L]=U[T]=U[z]=U[q]=U[G]=U[J]=U[M]=U[H]=!0;var V={leading:!1,maxWait:0,trailing:!1},Q={configurable:!1,enumerable:!1,value:null,writable:!1},X={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:!1},Y={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Z={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},nt=Y[typeof window]&&window||this,tt=Y[typeof exports]&&exports&&!exports.nodeType&&exports,et=Y[typeof module]&&module&&!module.nodeType&&module,rt=et&&et.exports===tt&&tt,ut=Y[typeof global]&&global;
!ut||ut.global!==ut&&ut.window!==ut||(nt=ut);var ot=h();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(nt._=ot, define('lodash',[],function(){return ot})):tt&&et?rt?(et.exports=ot)._=ot:tt._=ot:nt._=ot}).call(this);

(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.1.0";var h=t._;if(!h&&typeof require!=="undefined")h=require("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeningTo;if(!r)return this;var s=!e&&!i;if(!i&&typeof e==="object")i=this;if(t)(r={})[t._listenId]=t;for(var n in r){t=r[n];t.off(e,i,this);if(s||h.isEmpty(t._events))delete this._listeningTo[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeningTo||(this._listeningTo={});var n=e._listenId||(e._listenId=h.uniqueId("l"));s[n]=e;if(!r&&typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)i=this.parse(i,e)||{};i=h.defaults({},i,h.result(this,"defaults"));this.set(i,e);this.changed={};this.initialize.apply(this,arguments)};h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};M(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}i=h.extend({validate:true},i);if(r&&!i.wait){if(!this.set(r,i))return false}else{if(!this._validate(r,i))return false}if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};M(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}M(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e,{validationError:i}));return false}});var p=["keys","values","pairs","invert","pick","omit"];h.each(p,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var v=a.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var g={add:true,remove:true,merge:true};var m={add:true,remove:false};h.extend(v.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.extend({merge:false},e,m))},remove:function(t,e){var i=!h.isArray(t);t=i?[t]:h.clone(t);e||(e={});var r,s,n,a;for(r=0,s=t.length;r<s;r++){a=t[r]=this.get(t[r]);if(!a)continue;delete this._byId[a.id];delete this._byId[a.cid];n=this.indexOf(a);this.models.splice(n,1);this.length--;if(!e.silent){e.index=n;a.trigger("remove",a,this,e)}this._removeReference(a)}return i?t[0]:t},set:function(t,e){e=h.defaults({},e,g);if(e.parse)t=this.parse(t,e);var i=!h.isArray(t);t=i?t?[t]:[]:h.clone(t);var r,s,n,a,o,u,l;var c=e.at;var f=this.model;var p=this.comparator&&c==null&&e.sort!==false;var v=h.isString(this.comparator)?this.comparator:null;var m=[],y=[],_={};var w=e.add,b=e.merge,x=e.remove;var E=!p&&w&&x?[]:false;for(r=0,s=t.length;r<s;r++){o=t[r];if(o instanceof d){n=a=o}else{n=o[f.prototype.idAttribute]}if(u=this.get(n)){if(x)_[u.cid]=true;if(b){o=o===a?a.attributes:o;if(e.parse)o=u.parse(o,e);u.set(o,e);if(p&&!l&&u.hasChanged(v))l=true}t[r]=u}else if(w){a=t[r]=this._prepareModel(o,e);if(!a)continue;m.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}if(E)E.push(u||a)}if(x){for(r=0,s=this.length;r<s;++r){if(!_[(a=this.models[r]).cid])y.push(a)}if(y.length)this.remove(y,e)}if(m.length||E&&E.length){if(p)l=true;this.length+=m.length;if(c!=null){for(r=0,s=m.length;r<s;r++){this.models.splice(c+r,0,m[r])}}else{if(E)this.models.length=0;var T=E||m;for(r=0,s=T.length;r<s;r++){this.models.push(T[r])}}}if(l)this.sort({silent:true});if(!e.silent){for(r=0,s=m.length;r<s;r++){(a=m[r]).trigger("add",a,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return i?t[0]:t},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();t=this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,h.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,h.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t.id]||this._byId[t.cid]||this._byId[t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};M(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(t,e,s){if(s.wait)i.add(t,s);if(r)r(t,e,s)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e=e?h.clone(e):{};e.collection=this;var i=new this.model(t,e);if(!i.validationError)return i;this.trigger("invalid",this,i.validationError,e);return false},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var y=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(y,function(t){v.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var _=["groupBy","countBy","sortBy"];h.each(_,function(t){v.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var w=a.View=function(t){this.cid=h.uniqueId("view");t||(t={});h.extend(this,h.pick(t,x));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var b=/^(\S+)\s*(.*)$/;var x=["model","collection","el","id","attributes","className","tagName","events"];h.extend(w.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(b);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=T[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&E){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var E=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var k=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var $=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(k.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace(S,"(?:$1)?").replace($,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/[?#].*$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=P.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(O,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return h.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var R=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=v.extend=k.extend=w.extend=I.extend=R;var U=function(){throw new Error('A "url" property or function must be specified')};var M=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);

define("backbone", ["lodash"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Backbone;
    };
}(this)));

// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v1.1.0
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com



/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */

Backbone.ChildViewContainer=function(e,t){var i=function(e){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),t.each(e,this.add,this)};t.extend(i.prototype,{add:function(e,t){var i=e.cid;this._views[i]=e,e.model&&(this._indexByModel[e.model.cid]=i),t&&(this._indexByCustom[t]=i),this._updateLength()},findByModel:function(e){return this.findByModelCid(e.cid)},findByModelCid:function(e){var t=this._indexByModel[e];return this.findByCid(t)},findByCustom:function(e){var t=this._indexByCustom[e];return this.findByCid(t)},findByIndex:function(e){return t.values(this._views)[e]},findByCid:function(e){return this._views[e]},remove:function(e){var i=e.cid;e.model&&delete this._indexByModel[e.model.cid],t.any(this._indexByCustom,function(e,t){return e===i?(delete this._indexByCustom[t],!0):void 0},this),delete this._views[i],this._updateLength()},call:function(e){this.apply(e,t.tail(arguments))},apply:function(e,i){t.each(this._views,function(n){t.isFunction(n[e])&&n[e].apply(n,i||[])})},_updateLength:function(){this.length=t.size(this._views)}});var n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return t.each(n,function(e){i.prototype[e]=function(){var i=t.values(this._views),n=[i].concat(t.toArray(arguments));return t[e].apply(t,n)}}),i}(Backbone,_),Backbone.Wreqr=function(e,t,i){var n={};return n.Handlers=function(e,t){var i=function(e){this.options=e,this._wreqrHandlers={},t.isFunction(this.initialize)&&this.initialize(e)};return i.extend=e.Model.extend,t.extend(i.prototype,e.Events,{setHandlers:function(e){t.each(e,function(e,i){var n=null;t.isObject(e)&&!t.isFunction(e)&&(n=e.context,e=e.callback),this.setHandler(i,e,n)},this)},setHandler:function(e,t,i){var n={callback:t,context:i};this._wreqrHandlers[e]=n,this.trigger("handler:add",e,t,i)},hasHandler:function(e){return!!this._wreqrHandlers[e]},getHandler:function(e){var t=this._wreqrHandlers[e];if(!t)throw Error("Handler not found for '"+e+"'");return function(){var e=Array.prototype.slice.apply(arguments);return t.callback.apply(t.context,e)}},removeHandler:function(e){delete this._wreqrHandlers[e]},removeAllHandlers:function(){this._wreqrHandlers={}}}),i}(e,i),n.CommandStorage=function(){var t=function(e){this.options=e,this._commands={},i.isFunction(this.initialize)&&this.initialize(e)};return i.extend(t.prototype,e.Events,{getCommands:function(e){var t=this._commands[e];return t||(t={command:e,instances:[]},this._commands[e]=t),t},addCommand:function(e,t){var i=this.getCommands(e);i.instances.push(t)},clearCommands:function(e){var t=this.getCommands(e);t.instances=[]}}),t}(),n.Commands=function(e){return e.Handlers.extend({storageType:e.CommandStorage,constructor:function(t){this.options=t||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var i=Array.prototype.slice.call(arguments);e.Handlers.prototype.constructor.apply(this,i)},execute:function(e,t){e=arguments[0],t=Array.prototype.slice.call(arguments,1),this.hasHandler(e)?this.getHandler(e).apply(this,t):this.storage.addCommand(e,t)},_executeCommands:function(e,t,n){var r=this.storage.getCommands(e);i.each(r.instances,function(e){t.apply(n,e)}),this.storage.clearCommands(e)},_initializeStorage:function(e){var t,n=e.storageType||this.storageType;t=i.isFunction(n)?new n:n,this.storage=t}})}(n),n.RequestResponse=function(e){return e.Handlers.extend({request:function(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return this.getHandler(e).apply(this,t)}})}(n),n.EventAggregator=function(e,t){var i=function(){};return i.extend=e.Model.extend,t.extend(i.prototype,e.Events),i}(e,i),n}(Backbone,Backbone.Marionette,_);var Marionette=function(e,t,i){function n(e){return s.call(e)}function r(e,t){var i=Error(e);throw i.name=t||"Error",i}var o={};t.Marionette=o,o.$=t.$;var s=Array.prototype.slice;return o.extend=t.Model.extend,o.getOption=function(e,t){if(e&&t){var i;return i=e.options&&t in e.options&&void 0!==e.options[t]?e.options[t]:e[t]}},o.triggerMethod=function(){function e(e,t,i){return i.toUpperCase()}var t=/(^|:)(\w)/gi,n=function(n){var r="on"+n.replace(t,e),o=this[r];return i.isFunction(this.trigger)&&this.trigger.apply(this,arguments),i.isFunction(o)?o.apply(this,i.tail(arguments)):void 0};return n}(),o.MonitorDOMRefresh=function(){function e(e){e._isShown=!0,n(e)}function t(e){e._isRendered=!0,n(e)}function n(e){e._isShown&&e._isRendered&&i.isFunction(e.triggerMethod)&&e.triggerMethod("dom:refresh")}return function(i){i.listenTo(i,"show",function(){e(i)}),i.listenTo(i,"render",function(){t(i)})}}(),function(e){function t(e,t,n,o){var s=o.split(/\s+/);i.each(s,function(i){var o=e[i];o||r("Method '"+i+"' was configured as an event handler, but does not exist."),e.listenTo(t,n,o,e)})}function n(e,t,i,n){e.listenTo(t,i,n,e)}function o(e,t,n,r){var o=r.split(/\s+/);i.each(o,function(i){var r=e[i];e.stopListening(t,n,r,e)})}function s(e,t,i,n){e.stopListening(t,i,n,e)}function h(e,t,n,r,o){t&&n&&(i.isFunction(n)&&(n=n.call(e)),i.each(n,function(n,s){i.isFunction(n)?r(e,t,s,n):o(e,t,s,n)}))}e.bindEntityEvents=function(e,i,r){h(e,i,r,n,t)},e.unbindEntityEvents=function(e,t,i){h(e,t,i,s,o)}}(o),o.Callbacks=function(){this._deferred=o.$.Deferred(),this._callbacks=[]},i.extend(o.Callbacks.prototype,{add:function(e,t){this._callbacks.push({cb:e,ctx:t}),this._deferred.done(function(i,n){t&&(i=t),e.call(i,n)})},run:function(e,t){this._deferred.resolve(t,e)},reset:function(){var e=this._callbacks;this._deferred=o.$.Deferred(),this._callbacks=[],i.each(e,function(e){this.add(e.cb,e.ctx)},this)}}),o.Controller=function(e){this.triggerMethod=o.triggerMethod,this.options=e||{},i.isFunction(this.initialize)&&this.initialize(this.options)},o.Controller.extend=o.extend,i.extend(o.Controller.prototype,t.Events,{close:function(){this.stopListening(),this.triggerMethod("close"),this.unbind()}}),o.Region=function(e){if(this.options=e||{},this.el=o.getOption(this,"el"),!this.el){var t=Error("An 'el' must be specified for a region.");throw t.name="NoElError",t}if(this.initialize){var i=Array.prototype.slice.apply(arguments);this.initialize.apply(this,i)}},i.extend(o.Region,{buildRegion:function(e,t){var n="string"==typeof e,r="string"==typeof e.selector,o=e.regionType===void 0,s="function"==typeof e;if(!s&&!n&&!r)throw Error("Region must be specified as a Region type, a selector string or an object with selector property");var h,a;n&&(h=e),e.selector&&(h=e.selector),s&&(a=e),!s&&o&&(a=t),e.regionType&&(a=e.regionType);var l=new a({el:h});return e.parentEl&&(l.getEl=function(t){var n=e.parentEl;return i.isFunction(n)&&(n=n()),n.find(t)}),l}}),i.extend(o.Region.prototype,t.Events,{show:function(e){this.ensureEl();var t=e.isClosed||i.isUndefined(e.$el),n=e!==this.currentView;n&&this.close(),e.render(),(n||t)&&this.open(e),this.currentView=e,o.triggerMethod.call(this,"show",e),o.triggerMethod.call(e,"show")},ensureEl:function(){this.$el&&0!==this.$el.length||(this.$el=this.getEl(this.el))},getEl:function(e){return o.$(e)},open:function(e){this.$el.empty().append(e.el)},close:function(){var e=this.currentView;e&&!e.isClosed&&(e.close?e.close():e.remove&&e.remove(),o.triggerMethod.call(this,"close"),delete this.currentView)},attachView:function(e){this.currentView=e},reset:function(){this.close(),delete this.$el}}),o.Region.extend=o.extend,o.RegionManager=function(e){var t=e.Controller.extend({constructor:function(t){this._regions={},e.Controller.prototype.constructor.call(this,t)},addRegions:function(e,t){var n={};return i.each(e,function(e,r){"string"==typeof e&&(e={selector:e}),e.selector&&(e=i.defaults({},e,t));var o=this.addRegion(r,e);n[r]=o},this),n},addRegion:function(t,n){var r,o=i.isObject(n),s=i.isString(n),h=!!n.selector;return r=s||o&&h?e.Region.buildRegion(n,e.Region):i.isFunction(n)?e.Region.buildRegion(n,e.Region):n,this._store(t,r),this.triggerMethod("region:add",t,r),r},get:function(e){return this._regions[e]},removeRegion:function(e){var t=this._regions[e];this._remove(e,t)},removeRegions:function(){i.each(this._regions,function(e,t){this._remove(t,e)},this)},closeRegions:function(){i.each(this._regions,function(e){e.close()},this)},close:function(){this.removeRegions();var t=Array.prototype.slice.call(arguments);e.Controller.prototype.close.apply(this,t)},_store:function(e,t){this._regions[e]=t,this._setLength()},_remove:function(e,t){t.close(),delete this._regions[e],this._setLength(),this.triggerMethod("region:remove",e,t)},_setLength:function(){this.length=i.size(this._regions)}}),n=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return i.each(n,function(e){t.prototype[e]=function(){var t=i.values(this._regions),n=[t].concat(i.toArray(arguments));return i[e].apply(i,n)}}),t}(o),o.TemplateCache=function(e){this.templateId=e},i.extend(o.TemplateCache,{templateCaches:{},get:function(e){var t=this.templateCaches[e];return t||(t=new o.TemplateCache(e),this.templateCaches[e]=t),t.load()},clear:function(){var e,t=n(arguments),i=t.length;if(i>0)for(e=0;i>e;e++)delete this.templateCaches[t[e]];else this.templateCaches={}}}),i.extend(o.TemplateCache.prototype,{load:function(){if(this.compiledTemplate)return this.compiledTemplate;var e=this.loadTemplate(this.templateId);return this.compiledTemplate=this.compileTemplate(e),this.compiledTemplate},loadTemplate:function(e){var t=o.$(e).html();return t&&0!==t.length||r("Could not find template: '"+e+"'","NoTemplateError"),t},compileTemplate:function(e){return i.template(e)}}),o.Renderer={render:function(e,t){if(!e){var i=Error("Cannot render the template since it's false, null or undefined.");throw i.name="TemplateNotFoundError",i}var n;return n="function"==typeof e?e:o.TemplateCache.get(e),n(t)}},o.View=t.View.extend({constructor:function(){i.bindAll(this,"render");var e=Array.prototype.slice.apply(arguments);t.View.prototype.constructor.apply(this,e),o.MonitorDOMRefresh(this),this.listenTo(this,"show",this.onShowCalled,this)},triggerMethod:o.triggerMethod,getTemplate:function(){return o.getOption(this,"template")},mixinTemplateHelpers:function(e){e=e||{};var t=o.getOption(this,"templateHelpers");return i.isFunction(t)&&(t=t.call(this)),i.extend(e,t)},configureTriggers:function(){if(this.triggers){var e={},t=i.result(this,"triggers");return i.each(t,function(t,i){e[i]=function(e){e&&e.preventDefault&&e.preventDefault(),e&&e.stopPropagation&&e.stopPropagation();var i={view:this,model:this.model,collection:this.collection};this.triggerMethod(t,i)}},this),e}},delegateEvents:function(e){this._delegateDOMEvents(e),o.bindEntityEvents(this,this.model,o.getOption(this,"modelEvents")),o.bindEntityEvents(this,this.collection,o.getOption(this,"collectionEvents"))},_delegateDOMEvents:function(e){e=e||this.events,i.isFunction(e)&&(e=e.call(this));var n={},r=this.configureTriggers();i.extend(n,e,r),t.View.prototype.delegateEvents.call(this,n)},undelegateEvents:function(){var e=Array.prototype.slice.call(arguments);t.View.prototype.undelegateEvents.apply(this,e),o.unbindEntityEvents(this,this.model,o.getOption(this,"modelEvents")),o.unbindEntityEvents(this,this.collection,o.getOption(this,"collectionEvents"))},onShowCalled:function(){},close:function(){if(!this.isClosed){var e=this.triggerMethod("before:close");e!==!1&&(this.isClosed=!0,this.triggerMethod("close"),this.unbindUIElements(),this.remove())}},bindUIElements:function(){if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var e=i.result(this,"_uiBindings");this.ui={},i.each(i.keys(e),function(t){var i=e[t];this.ui[t]=this.$(i)},this)}},unbindUIElements:function(){this.ui&&this._uiBindings&&(i.each(this.ui,function(e,t){delete this.ui[t]},this),this.ui=this._uiBindings,delete this._uiBindings)}}),o.ItemView=o.View.extend({constructor:function(){o.View.prototype.constructor.apply(this,n(arguments))},serializeData:function(){var e={};return this.model?e=this.model.toJSON():this.collection&&(e={items:this.collection.toJSON()}),e},render:function(){this.isClosed=!1,this.triggerMethod("before:render",this),this.triggerMethod("item:before:render",this);var e=this.serializeData();e=this.mixinTemplateHelpers(e);var t=this.getTemplate(),i=o.Renderer.render(t,e);return this.$el.html(i),this.bindUIElements(),this.triggerMethod("render",this),this.triggerMethod("item:rendered",this),this},close:function(){this.isClosed||(this.triggerMethod("item:before:close"),o.View.prototype.close.apply(this,n(arguments)),this.triggerMethod("item:closed"))}}),o.CollectionView=o.View.extend({itemViewEventPrefix:"itemview",constructor:function(){this._initChildViewStorage(),o.View.prototype.constructor.apply(this,n(arguments)),this._initialEvents()},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this.addChildView,this),this.listenTo(this.collection,"remove",this.removeItemView,this),this.listenTo(this.collection,"reset",this.render,this))},addChildView:function(e){this.closeEmptyView();var t=this.getItemView(e),i=this.collection.indexOf(e);this.addItemView(e,t,i)},onShowCalled:function(){this.children.each(function(e){o.triggerMethod.call(e,"show")})},triggerBeforeRender:function(){this.triggerMethod("before:render",this),this.triggerMethod("collection:before:render",this)},triggerRendered:function(){this.triggerMethod("render",this),this.triggerMethod("collection:rendered",this)},render:function(){return this.isClosed=!1,this.triggerBeforeRender(),this._renderChildren(),this.triggerRendered(),this},_renderChildren:function(){this.closeEmptyView(),this.closeChildren(),this.collection&&this.collection.length>0?this.showCollection():this.showEmptyView()},showCollection:function(){var e;this.collection.each(function(t,i){e=this.getItemView(t),this.addItemView(t,e,i)},this)},showEmptyView:function(){var e=o.getOption(this,"emptyView");if(e&&!this._showingEmptyView){this._showingEmptyView=!0;var i=new t.Model;this.addItemView(i,e,0)}},closeEmptyView:function(){this._showingEmptyView&&(this.closeChildren(),delete this._showingEmptyView)},getItemView:function(){var e=o.getOption(this,"itemView");return e||r("An `itemView` must be specified","NoItemViewError"),e},addItemView:function(e,t,n){var r=o.getOption(this,"itemViewOptions");i.isFunction(r)&&(r=r.call(this,e,n));var s=this.buildItemView(e,t,r);this.addChildViewEventForwarding(s),this.triggerMethod("before:item:added",s),this.children.add(s),this.renderItemView(s,n),this._isShown&&o.triggerMethod.call(s,"show"),this.triggerMethod("after:item:added",s)},addChildViewEventForwarding:function(e){var t=o.getOption(this,"itemViewEventPrefix");this.listenTo(e,"all",function(){var i=n(arguments);i[0]=t+":"+i[0],i.splice(1,0,e),o.triggerMethod.apply(this,i)},this)},renderItemView:function(e,t){e.render(),this.appendHtml(this,e,t)},buildItemView:function(e,t,n){var r=i.extend({model:e},n);return new t(r)},removeItemView:function(e){var t=this.children.findByModel(e);this.removeChildView(t),this.checkEmpty()},removeChildView:function(e){e&&(this.stopListening(e),e.close?e.close():e.remove&&e.remove(),this.children.remove(e)),this.triggerMethod("item:removed",e)},checkEmpty:function(){this.collection&&0!==this.collection.length||this.showEmptyView()},appendHtml:function(e,t){e.$el.append(t.el)},_initChildViewStorage:function(){this.children=new t.ChildViewContainer},close:function(){this.isClosed||(this.triggerMethod("collection:before:close"),this.closeChildren(),this.triggerMethod("collection:closed"),o.View.prototype.close.apply(this,n(arguments)))},closeChildren:function(){this.children.each(function(e){this.removeChildView(e)},this),this.checkEmpty()}}),o.CompositeView=o.CollectionView.extend({constructor:function(){o.CollectionView.prototype.constructor.apply(this,n(arguments))},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this.addChildView,this),this.listenTo(this.collection,"remove",this.removeItemView,this),this.listenTo(this.collection,"reset",this._renderChildren,this))},getItemView:function(){var e=o.getOption(this,"itemView")||this.constructor;return e||r("An `itemView` must be specified","NoItemViewError"),e},serializeData:function(){var e={};return this.model&&(e=this.model.toJSON()),e},render:function(){this.isRendered=!0,this.isClosed=!1,this.resetItemViewContainer(),this.triggerBeforeRender();var e=this.renderModel();return this.$el.html(e),this.bindUIElements(),this.triggerMethod("composite:model:rendered"),this._renderChildren(),this.triggerMethod("composite:rendered"),this.triggerRendered(),this},_renderChildren:function(){this.isRendered&&(o.CollectionView.prototype._renderChildren.call(this),this.triggerMethod("composite:collection:rendered"))},renderModel:function(){var e={};e=this.serializeData(),e=this.mixinTemplateHelpers(e);var t=this.getTemplate();return o.Renderer.render(t,e)},appendHtml:function(e,t){var i=this.getItemViewContainer(e);i.append(t.el)},getItemViewContainer:function(e){if("$itemViewContainer"in e)return e.$itemViewContainer;var t,n=o.getOption(e,"itemViewContainer");if(n){var s=i.isFunction(n)?n():n;t=e.$(s),0>=t.length&&r("The specified `itemViewContainer` was not found: "+e.itemViewContainer,"ItemViewContainerMissingError")}else t=e.$el;return e.$itemViewContainer=t,t},resetItemViewContainer:function(){this.$itemViewContainer&&delete this.$itemViewContainer}}),o.Layout=o.ItemView.extend({regionType:o.Region,constructor:function(e){e=e||{},this._firstRender=!0,this._initializeRegions(e),o.ItemView.prototype.constructor.call(this,e)},render:function(){this.isClosed&&this._initializeRegions(),this._firstRender?this._firstRender=!1:this.isClosed||this._reInitializeRegions();var e=Array.prototype.slice.apply(arguments),t=o.ItemView.prototype.render.apply(this,e);return t},close:function(){if(!this.isClosed){this.regionManager.close();var e=Array.prototype.slice.apply(arguments);o.ItemView.prototype.close.apply(this,e)}},addRegion:function(e,t){var i={};return i[e]=t,this._buildRegions(i)[e]},addRegions:function(e){return this.regions=i.extend({},this.regions,e),this._buildRegions(e)},removeRegion:function(e){return delete this.regions[e],this.regionManager.removeRegion(e)},_buildRegions:function(e){var t=this,i={regionType:o.getOption(this,"regionType"),parentEl:function(){return t.$el}};return this.regionManager.addRegions(e,i)},_initializeRegions:function(e){var t;this._initRegionManager(),t=i.isFunction(this.regions)?this.regions(e):this.regions||{},this.addRegions(t)},_reInitializeRegions:function(){this.regionManager.closeRegions(),this.regionManager.each(function(e){e.reset()})},_initRegionManager:function(){this.regionManager=new o.RegionManager,this.listenTo(this.regionManager,"region:add",function(e,t){this[e]=t,this.trigger("region:add",e,t)}),this.listenTo(this.regionManager,"region:remove",function(e,t){delete this[e],this.trigger("region:remove",e,t)})}}),o.AppRouter=t.Router.extend({constructor:function(e){t.Router.prototype.constructor.apply(this,n(arguments)),this.options=e||{};var i=o.getOption(this,"appRoutes"),r=this._getController();this.processAppRoutes(r,i)},appRoute:function(e,t){var i=this._getController();this._addAppRoute(i,e,t)},processAppRoutes:function(e,t){if(t){var n=i.keys(t).reverse();i.each(n,function(i){this._addAppRoute(e,i,t[i])},this)}},_getController:function(){return o.getOption(this,"controller")},_addAppRoute:function(e,t,n){var r=e[n];if(!r)throw Error("Method '"+n+"' was not found on the controller");this.route(t,n,i.bind(r,e))}}),o.Application=function(e){this._initRegionManager(),this._initCallbacks=new o.Callbacks,this.vent=new t.Wreqr.EventAggregator,this.commands=new t.Wreqr.Commands,this.reqres=new t.Wreqr.RequestResponse,this.submodules={},i.extend(this,e),this.triggerMethod=o.triggerMethod},i.extend(o.Application.prototype,t.Events,{execute:function(){var e=Array.prototype.slice.apply(arguments);this.commands.execute.apply(this.commands,e)},request:function(){var e=Array.prototype.slice.apply(arguments);return this.reqres.request.apply(this.reqres,e)},addInitializer:function(e){this._initCallbacks.add(e)},start:function(e){this.triggerMethod("initialize:before",e),this._initCallbacks.run(e,this),this.triggerMethod("initialize:after",e),this.triggerMethod("start",e)},addRegions:function(e){return this._regionManager.addRegions(e)},closeRegions:function(){this._regionManager.closeRegions()},removeRegion:function(e){this._regionManager.removeRegion(e)},getRegion:function(e){return this._regionManager.get(e)},module:function(){var e=n(arguments);return e.unshift(this),o.Module.create.apply(o.Module,e)},_initRegionManager:function(){this._regionManager=new o.RegionManager,this.listenTo(this._regionManager,"region:add",function(e,t){this[e]=t}),this.listenTo(this._regionManager,"region:remove",function(e){delete this[e]})}}),o.Application.extend=o.extend,o.Module=function(e,t){this.moduleName=e,this.submodules={},this._setupInitializersAndFinalizers(),this.app=t,this.startWithParent=!0,this.triggerMethod=o.triggerMethod},i.extend(o.Module.prototype,t.Events,{addInitializer:function(e){this._initializerCallbacks.add(e)},addFinalizer:function(e){this._finalizerCallbacks.add(e)},start:function(e){this._isInitialized||(i.each(this.submodules,function(t){t.startWithParent&&t.start(e)}),this.triggerMethod("before:start",e),this._initializerCallbacks.run(e,this),this._isInitialized=!0,this.triggerMethod("start",e))},stop:function(){this._isInitialized&&(this._isInitialized=!1,o.triggerMethod.call(this,"before:stop"),i.each(this.submodules,function(e){e.stop()}),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),o.triggerMethod.call(this,"stop"))},addDefinition:function(e,t){this._runModuleDefinition(e,t)},_runModuleDefinition:function(e,n){if(e){var r=i.flatten([this,this.app,t,o,o.$,i,n]);e.apply(this,r)}},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new o.Callbacks,this._finalizerCallbacks=new o.Callbacks}}),i.extend(o.Module,{create:function(e,t,r){var o=e,s=n(arguments);s.splice(0,3),t=t.split(".");var h=t.length,a=[];return a[h-1]=r,i.each(t,function(t,i){var n=o;o=this._getModule(n,t,e),this._addModuleDefinition(n,o,a[i],s)},this),o},_getModule:function(e,t,i){var n=e[t];return n||(n=new o.Module(t,i),e[t]=n,e.submodules[t]=n),n},_addModuleDefinition:function(e,t,n,r){var o,s;i.isFunction(n)?(o=n,s=!0):i.isObject(n)?(o=n.define,s=n.startWithParent):s=!0,o&&t.addDefinition(o,r),t.startWithParent=t.startWithParent&&s,t.startWithParent&&!t.startWithParentIsConfigured&&(t.startWithParentIsConfigured=!0,e.addInitializer(function(e){t.startWithParent&&t.start(e)}))}}),o}(this,Backbone,_);

define("marionette", ["backbone"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Marionette;
    };
}(this)));

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if(!jQuery)throw new Error("Bootstrap requires jQuery");+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery),+function(a){var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(window.jQuery),+function(a){function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(window.jQuery),+function(a){var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(window.jQuery),+function(a){var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery);

define("bootstrap", ["jquery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.jquery;
    };
}(this)));

d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(){}function o(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function a(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var e=0,r=aa.length;r>e;++e){var u=aa[e]+t;if(u in n)return u}}function c(){}function s(){}function l(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,i=e.indexOf(o)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function f(){Zo.event.preventDefault()}function h(){for(var n,t=Zo.event;n=t.sourceEvent;)t=n;return t}function g(n){for(var t=new s,e=0,r=arguments.length;++e<r;)t[arguments[e]]=l(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=Zo.event;u.target=n,Zo.event=u,t[u.type].apply(e,r)}finally{Zo.event=i}}},t}function p(n){return sa(n,pa),n}function v(n){return"function"==typeof n?n:function(){return la(n,this)}}function d(n){return"function"==typeof n?n:function(){return fa(n,this)}}function m(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=Zo.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?i:u}function y(n){return n.trim().replace(/\s+/g," ")}function x(n){return new RegExp("(?:^|\\s+)"+Zo.requote(n)+"(?:\\s+|$)","g")}function M(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=n.trim().split(/\s+/).map(_);var u=n.length;return"function"==typeof t?r:e}function _(n){var t=x(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",y(u+" "+n))):e.setAttribute("class",y(u.replace(t," ")))}}function b(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function w(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function S(n){return"function"==typeof n?n:(n=Zo.ns.qualify(n)).local?function(){return this.ownerDocument.createElementNS(n.space,n.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,n)}}function k(n){return{__data__:n}}function E(n){return function(){return ga(this,n)}}function A(n){return arguments.length||(n=Zo.ascending),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function C(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,e);return n}function N(n){return sa(n,da),n}function L(n){var t,e;return function(r,u,i){var o,a=n[i].update,c=a.length;for(i!=e&&(e=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function T(){var n=this.__transition__;n&&++n.active}function q(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=s(t,Xo(arguments));r.call(this),this.addEventListener(n,this[o]=u,u.$=e),u._=t}function i(){var t,e=new RegExp("^__on([^.]+)"+Zo.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),s=z;a>0&&(n=n.substring(0,a));var l=ya.get(n);return l&&(n=l,s=R),a?t?u:r:t?c:i}function z(n,t){return function(e){var r=Zo.event;Zo.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{Zo.event=r}}}function R(n,t){var e=z(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function D(){var n=".dragsuppress-"+ ++Ma,t="touchmove"+n,e="selectstart"+n,r="dragstart"+n,u="click"+n,i=Zo.select(Wo).on(t,f).on(e,f).on(r,f),o=Bo.style,a=o[xa];return o[xa]="none",function(t){function e(){i.on(u,null)}i.on(n,null),o[xa]=a,t&&(i.on(u,function(){f(),e()},!0),setTimeout(e,0))}}function P(n,t){t.changedTouches&&(t=t.changedTouches[0]);var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>_a&&(Wo.scrollX||Wo.scrollY)){e=Zo.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var u=e[0][0].getScreenCTM();_a=!(u.f||u.e),e.remove()}return _a?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function U(n){return n>0?1:0>n?-1:0}function j(n){return n>1?0:-1>n?ba:Math.acos(n)}function H(n){return n>1?Sa:-1>n?-Sa:Math.asin(n)}function F(n){return((n=Math.exp(n))-1/n)/2}function O(n){return((n=Math.exp(n))+1/n)/2}function Y(n){return((n=Math.exp(2*n))-1)/(n+1)}function I(n){return(n=Math.sin(n/2))*n}function Z(){}function V(n,t,e){return new X(n,t,e)}function X(n,t,e){this.h=n,this.s=t,this.l=e}function $(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*r(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,i=2*e-o,ot(u(n+120),u(n),u(n-120))}function B(n,t,e){return new W(n,t,e)}function W(n,t,e){this.h=n,this.c=t,this.l=e}function J(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),G(e,Math.cos(n*=Aa)*t,Math.sin(n)*t)}function G(n,t,e){return new K(n,t,e)}function K(n,t,e){this.l=n,this.a=t,this.b=e}function Q(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=tt(u)*ja,r=tt(r)*Ha,i=tt(i)*Fa,ot(rt(3.2404542*u-1.5371385*r-.4985314*i),rt(-.969266*u+1.8760108*r+.041556*i),rt(.0556434*u-.2040259*r+1.0572252*i))}function nt(n,t,e){return n>0?B(Math.atan2(e,t)*Ca,Math.sqrt(t*t+e*e),n):B(0/0,0/0,n)}function tt(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function et(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function rt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function ut(n){return ot(n>>16,255&n>>8,255&n)}function it(n){return ut(n)+""}function ot(n,t,e){return new at(n,t,e)}function at(n,t,e){this.r=n,this.g=t,this.b=e}function ct(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function st(n,t,e){var r,u,i,o=0,a=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(gt(u[0]),gt(u[1]),gt(u[2]))}return(i=Ia.get(n))?t(i.r,i.g,i.b):(null!=n&&"#"===n.charAt(0)&&(4===n.length?(o=n.charAt(1),o+=o,a=n.charAt(2),a+=a,c=n.charAt(3),c+=c):7===n.length&&(o=n.substring(1,3),a=n.substring(3,5),c=n.substring(5,7)),o=parseInt(o,16),a=parseInt(a,16),c=parseInt(c,16)),t(o,a,c))}function lt(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=0/0,u=c>0&&1>c?0:r),V(r,u,c)}function ft(n,t,e){n=ht(n),t=ht(t),e=ht(e);var r=et((.4124564*n+.3575761*t+.1804375*e)/ja),u=et((.2126729*n+.7151522*t+.072175*e)/Ha),i=et((.0193339*n+.119192*t+.9503041*e)/Fa);return G(116*u-16,500*(r-u),200*(u-i))}function ht(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function gt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function pt(n){return"function"==typeof n?n:function(){return n}}function vt(n){return n}function dt(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),mt(t,e,n,r)}}function mt(n,t,e,r){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(i,c)}catch(r){return o.error.call(i,r),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=Zo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,s=null;return!Wo.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=Zo.event;Zo.event=n;try{o.progress.call(i,c)}finally{Zo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(s=n,i):s},i.response=function(n){return e=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Xo(arguments)))}}),i.send=function(e,r,u){if(2===arguments.length&&"function"==typeof r&&(u=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var l in a)c.setRequestHeader(l,a[l]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=s&&(c.responseType=s),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==r?null:r),i},i.abort=function(){return c.abort(),i},Zo.rebind(i,o,"on"),null==r?i:i.get(yt(r))}function yt(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function xt(){var n=Mt(),t=_t()-n;t>24?(isFinite(t)&&(clearTimeout($a),$a=setTimeout(xt,t)),Xa=0):(Xa=1,Wa(xt))}function Mt(){var n=Date.now();for(Ba=Za;Ba;)n>=Ba.t&&(Ba.f=Ba.c(n-Ba.t)),Ba=Ba.n;return n}function _t(){for(var n,t=Za,e=1/0;t;)t.f?t=n?n.n=t.n:Za=t.n:(t.t<e&&(e=t.t),t=(n=t).n);return Va=n,e}function bt(n,t){var e=Math.pow(10,3*ua(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function wt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function St(n){return n+""}function kt(){}function Et(n,t,e){var r=e.s=n+t,u=r-n,i=r-u;e.t=n-i+(t-u)}function At(n,t){n&&ac.hasOwnProperty(n.type)&&ac[n.type](n,t)}function Ct(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1],r[2]);t.lineEnd()}function Nt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)Ct(n[e],t,1);t.polygonEnd()}function Lt(){function n(n,t){n*=Aa,t=t*Aa/2+ba/4;var e=n-r,o=Math.cos(t),a=Math.sin(t),c=i*a,s=u*o+c*Math.cos(e),l=c*Math.sin(e);sc.add(Math.atan2(l,s)),r=n,u=o,i=a}var t,e,r,u,i;lc.point=function(o,a){lc.point=n,r=(t=o)*Aa,u=Math.cos(a=(e=a)*Aa/2+ba/4),i=Math.sin(a)},lc.lineEnd=function(){n(t,e)}}function Tt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function qt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function zt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Rt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function Dt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Pt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Ut(n){return[Math.atan2(n[1],n[0]),H(n[2])]}function jt(n,t){return ua(n[0]-t[0])<ka&&ua(n[1]-t[1])<ka}function Ht(n,t){n*=Aa;var e=Math.cos(t*=Aa);Ft(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function Ft(n,t,e){++fc,gc+=(n-gc)/fc,pc+=(t-pc)/fc,vc+=(e-vc)/fc}function Ot(){function n(n,u){n*=Aa;var i=Math.cos(u*=Aa),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),s=Math.atan2(Math.sqrt((s=e*c-r*a)*s+(s=r*o-t*c)*s+(s=t*a-e*o)*s),t*o+e*a+r*c);hc+=s,dc+=s*(t+(t=o)),mc+=s*(e+(e=a)),yc+=s*(r+(r=c)),Ft(t,e,r)}var t,e,r;bc.point=function(u,i){u*=Aa;var o=Math.cos(i*=Aa);t=o*Math.cos(u),e=o*Math.sin(u),r=Math.sin(i),bc.point=n,Ft(t,e,r)}}function Yt(){bc.point=Ht}function It(){function n(n,t){n*=Aa;var e=Math.cos(t*=Aa),o=e*Math.cos(n),a=e*Math.sin(n),c=Math.sin(t),s=u*c-i*a,l=i*o-r*c,f=r*a-u*o,h=Math.sqrt(s*s+l*l+f*f),g=r*o+u*a+i*c,p=h&&-j(g)/h,v=Math.atan2(h,g);xc+=p*s,Mc+=p*l,_c+=p*f,hc+=v,dc+=v*(r+(r=o)),mc+=v*(u+(u=a)),yc+=v*(i+(i=c)),Ft(r,u,i)}var t,e,r,u,i;bc.point=function(o,a){t=o,e=a,bc.point=n,o*=Aa;var c=Math.cos(a*=Aa);r=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),Ft(r,u,i)},bc.lineEnd=function(){n(t,e),bc.lineEnd=Yt,bc.point=Ht}}function Zt(){return!0}function Vt(n,t,e,r,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(jt(e,r)){u.lineStart();for(var a=0;t>a;++a)u.point((e=n[a])[0],e[1]);return u.lineEnd(),void 0}var c=new $t(e,n,null,!0),s=new $t(e,null,c,!1);c.o=s,i.push(c),o.push(s),c=new $t(r,n,null,!1),s=new $t(r,null,c,!0),c.o=s,i.push(c),o.push(s)}}),o.sort(t),Xt(i),Xt(o),i.length){for(var a=0,c=e,s=o.length;s>a;++a)o[a].e=c=!c;for(var l,f,h=i[0];;){for(var g=h,p=!0;g.v;)if((g=g.n)===h)return;l=g.z,u.lineStart();do{if(g.v=g.o.v=!0,g.e){if(p)for(var a=0,s=l.length;s>a;++a)u.point((f=l[a])[0],f[1]);else r(g.x,g.n.x,1,u);g=g.n}else{if(p){l=g.p.z;for(var a=l.length-1;a>=0;--a)u.point((f=l[a])[0],f[1])}else r(g.x,g.p.x,-1,u);g=g.p}g=g.o,l=g.z,p=!p}while(!g.v);u.lineEnd()}}}function Xt(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.n=e=n[r],e.p=u,u=e;u.n=e=n[0],e.p=u}}function $t(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Bt(n,t,e,r){return function(u,i){function o(t,e){var r=u(t,e);n(t=r[0],e=r[1])&&i.point(t,e)}function a(n,t){var e=u(n,t);d.point(e[0],e[1])}function c(){y.point=a,d.lineStart()}function s(){y.point=o,d.lineEnd()}function l(n,t){v.push([n,t]);var e=u(n,t);M.point(e[0],e[1])}function f(){M.lineStart(),v=[]}function h(){l(v[0][0],v[0][1]),M.lineEnd();var n,t=M.clean(),e=x.buffer(),r=e.length;if(v.pop(),p.push(v),v=null,r){if(1&t){n=e[0];var u,r=n.length-1,o=-1;for(i.lineStart();++o<r;)i.point((u=n[o])[0],u[1]);return i.lineEnd(),void 0}r>1&&2&t&&e.push(e.pop().concat(e.shift())),g.push(e.filter(Wt))}}var g,p,v,d=t(i),m=u.invert(r[0],r[1]),y={point:o,lineStart:c,lineEnd:s,polygonStart:function(){y.point=l,y.lineStart=f,y.lineEnd=h,g=[],p=[],i.polygonStart()},polygonEnd:function(){y.point=o,y.lineStart=c,y.lineEnd=s,g=Zo.merge(g);var n=Kt(m,p);g.length?Vt(g,Gt,n,e,i):n&&(i.lineStart(),e(null,null,1,i),i.lineEnd()),i.polygonEnd(),g=p=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}},x=Jt(),M=t(x);return y}}function Wt(n){return n.length>1}function Jt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:c,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Gt(n,t){return((n=n.x)[0]<0?n[1]-Sa-ka:Sa-n[1])-((t=t.x)[0]<0?t[1]-Sa-ka:Sa-t[1])}function Kt(n,t){var e=n[0],r=n[1],u=[Math.sin(e),-Math.cos(e),0],i=0,o=0;sc.reset();for(var a=0,c=t.length;c>a;++a){var s=t[a],l=s.length;if(l)for(var f=s[0],h=f[0],g=f[1]/2+ba/4,p=Math.sin(g),v=Math.cos(g),d=1;;){d===l&&(d=0),n=s[d];var m=n[0],y=n[1]/2+ba/4,x=Math.sin(y),M=Math.cos(y),_=m-h,b=ua(_)>ba,w=p*x;if(sc.add(Math.atan2(w*Math.sin(_),v*M+w*Math.cos(_))),i+=b?_+(_>=0?wa:-wa):_,b^h>=e^m>=e){var S=zt(Tt(f),Tt(n));Pt(S);var k=zt(u,S);Pt(k);var E=(b^_>=0?-1:1)*H(k[2]);(r>E||r===E&&(S[0]||S[1]))&&(o+=b^_>=0?1:-1)}if(!d++)break;h=m,p=x,v=M,f=n}}return(-ka>i||ka>i&&0>sc)^1&o}function Qt(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?ba:-ba,c=ua(i-e);ua(c-ba)<ka?(n.point(e,r=(r+o)/2>0?Sa:-Sa),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(i,r),t=0):u!==a&&c>=ba&&(ua(e-u)<ka&&(e-=u*ka),ua(i-a)<ka&&(i-=a*ka),r=ne(e,r,i,o),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=i,r=o),u=a},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function ne(n,t,e,r){var u,i,o=Math.sin(n-e);return ua(o)>ka?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+r)/2}function te(n,t,e,r){var u;if(null==n)u=e*Sa,r.point(-ba,u),r.point(0,u),r.point(ba,u),r.point(ba,0),r.point(ba,-u),r.point(0,-u),r.point(-ba,-u),r.point(-ba,0),r.point(-ba,u);else if(ua(n[0]-t[0])>ka){var i=n[0]<t[0]?ba:-ba;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function ee(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function e(n){var e,i,c,s,l;return{lineStart:function(){s=c=!1,l=1},point:function(f,h){var g,p=[f,h],v=t(f,h),d=o?v?0:u(f,h):v?u(f+(0>f?ba:-ba),h):0;if(!e&&(s=c=v)&&n.lineStart(),v!==c&&(g=r(e,p),(jt(e,g)||jt(p,g))&&(p[0]+=ka,p[1]+=ka,v=t(p[0],p[1]))),v!==c)l=0,v?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(a&&e&&o^v){var m;d&i||!(m=r(p,e,!0))||(l=0,o?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!v||e&&jt(e,p)||n.point(p[0],p[1]),e=p,c=v,i=d},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return l|(s&&c)<<1}}}function r(n,t,e){var r=Tt(n),u=Tt(t),o=[1,0,0],a=zt(r,u),c=qt(a,a),s=a[0],l=c-s*s;if(!l)return!e&&n;var f=i*c/l,h=-i*s/l,g=zt(o,a),p=Dt(o,f),v=Dt(a,h);Rt(p,v);var d=g,m=qt(p,d),y=qt(d,d),x=m*m-y*(qt(p,p)-1);if(!(0>x)){var M=Math.sqrt(x),_=Dt(d,(-m-M)/y);if(Rt(_,p),_=Ut(_),!e)return _;var b,w=n[0],S=t[0],k=n[1],E=t[1];w>S&&(b=w,w=S,S=b);var A=S-w,C=ua(A-ba)<ka,N=C||ka>A;if(!C&&k>E&&(b=k,k=E,E=b),N?C?k+E>0^_[1]<(ua(_[0]-w)<ka?k:E):k<=_[1]&&_[1]<=E:A>ba^(w<=_[0]&&_[0]<=S)){var L=Dt(d,(-m+M)/y);return Rt(L,p),[_,Ut(L)]}}}function u(t,e){var r=o?n:ba-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}var i=Math.cos(n),o=i>0,a=ua(i)>ka,c=Ne(n,6*Aa);return Bt(t,e,c,o?[0,-n]:[-ba,n-ba])}function re(n,t,e,r){return function(u){var i,o=u.a,a=u.b,c=o.x,s=o.y,l=a.x,f=a.y,h=0,g=1,p=l-c,v=f-s;if(i=n-c,p||!(i>0)){if(i/=p,0>p){if(h>i)return;g>i&&(g=i)}else if(p>0){if(i>g)return;i>h&&(h=i)}if(i=e-c,p||!(0>i)){if(i/=p,0>p){if(i>g)return;i>h&&(h=i)}else if(p>0){if(h>i)return;g>i&&(g=i)}if(i=t-s,v||!(i>0)){if(i/=v,0>v){if(h>i)return;g>i&&(g=i)}else if(v>0){if(i>g)return;i>h&&(h=i)}if(i=r-s,v||!(0>i)){if(i/=v,0>v){if(i>g)return;i>h&&(h=i)}else if(v>0){if(h>i)return;g>i&&(g=i)}return h>0&&(u.a={x:c+h*p,y:s+h*v}),1>g&&(u.b={x:c+g*p,y:s+g*v}),u}}}}}}function ue(n,t,e,r){function u(r,u){return ua(r[0]-n)<ka?u>0?0:3:ua(r[0]-e)<ka?u>0?2:1:ua(r[1]-t)<ka?u>0?1:0:u>0?3:2}function i(n,t){return o(n.x,t.x)}function o(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function c(n){for(var t=0,e=m.length,r=n[1],u=0;e>u;++u)for(var i,o=1,a=m[u],c=a.length,l=a[0];c>o;++o)i=a[o],l[1]<=r?i[1]>r&&s(l,i,n)>0&&++t:i[1]<=r&&s(l,i,n)<0&&--t,l=i;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function l(i,a,c,s){var l=0,f=0;if(null==i||(l=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do s.point(0===l||3===l?n:e,l>1?r:t);while((l=(l+c+4)%4)!==f)}else s.point(a[0],a[1])}function f(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function h(n,t){f(n,t)&&a.point(n,t)}function g(){L.point=v,m&&m.push(y=[]),k=!0,S=!1,b=w=0/0}function p(){d&&(v(x,M),_&&S&&C.rejoin(),d.push(C.buffer())),L.point=h,S&&a.lineEnd()}function v(n,t){n=Math.max(-Sc,Math.min(Sc,n)),t=Math.max(-Sc,Math.min(Sc,t));var e=f(n,t);if(m&&y.push([n,t]),k)x=n,M=t,_=e,k=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&S)a.point(n,t);else{var r={a:{x:b,y:w},b:{x:n,y:t}};N(r)?(S||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),E=!1):e&&(a.lineStart(),a.point(n,t),E=!1)}b=n,w=t,S=e}var d,m,y,x,M,_,b,w,S,k,E,A=a,C=Jt(),N=re(n,t,e,r),L={point:h,lineStart:g,lineEnd:p,polygonStart:function(){a=C,d=[],m=[],E=!0},polygonEnd:function(){a=A,d=Zo.merge(d);var t=c([n,r]),e=E&&t,u=d.length;(e||u)&&(a.polygonStart(),e&&(a.lineStart(),l(null,null,1,a),a.lineEnd()),u&&Vt(d,i,t,l,a),a.polygonEnd()),d=m=y=null}};return L}}function ie(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function oe(n){var t=0,e=ba/3,r=_e(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*ba/180,e=n[1]*ba/180):[180*(t/ba),180*(e/ba)]},u}function ae(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),o-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),o=Math.sqrt(i)/u;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/u,H((i-(n*n+e*e)*u*u)/(2*u))]},e}function ce(){function n(n,t){Ec+=u*n-r*t,r=n,u=t}var t,e,r,u;Tc.point=function(i,o){Tc.point=n,t=r=i,e=u=o},Tc.lineEnd=function(){n(t,e)}}function se(n,t){Ac>n&&(Ac=n),n>Nc&&(Nc=n),Cc>t&&(Cc=t),t>Lc&&(Lc=t)}function le(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function u(){o.push("Z")}var i=fe(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return i=fe(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function fe(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function he(n,t){gc+=n,pc+=t,++vc}function ge(){function n(n,r){var u=n-t,i=r-e,o=Math.sqrt(u*u+i*i);dc+=o*(t+n)/2,mc+=o*(e+r)/2,yc+=o,he(t=n,e=r)}var t,e;zc.point=function(r,u){zc.point=n,he(t=r,e=u)}}function pe(){zc.point=he}function ve(){function n(n,t){var e=n-r,i=t-u,o=Math.sqrt(e*e+i*i);dc+=o*(r+n)/2,mc+=o*(u+t)/2,yc+=o,o=u*n-r*t,xc+=o*(r+n),Mc+=o*(u+t),_c+=3*o,he(r=n,u=t)}var t,e,r,u;zc.point=function(i,o){zc.point=n,he(t=r=i,e=u=o)},zc.lineEnd=function(){n(t,e)}}function de(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,o,0,wa)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:c};return a}function me(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function u(){x=0/0,S.point=o,t.lineStart()}function o(r,u){var o=Tt([r,u]),a=n(r,u);e(x,M,y,_,b,w,x=a[0],M=a[1],y=r,_=o[0],b=o[1],w=o[2],i,t),t.point(x,M)}function a(){S.point=r,t.lineEnd()}function c(){u(),S.point=s,S.lineEnd=l}function s(n,t){o(f=n,h=t),g=x,p=M,v=_,d=b,m=w,S.point=o}function l(){e(x,M,y,_,b,w,g,p,f,v,d,m,i,t),S.lineEnd=a,a()}var f,h,g,p,v,d,m,y,x,M,_,b,w,S={point:r,lineStart:u,lineEnd:a,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=u}};return S}function e(t,i,o,a,c,s,l,f,h,g,p,v,d,m){var y=l-t,x=f-i,M=y*y+x*x;if(M>4*r&&d--){var _=a+g,b=c+p,w=s+v,S=Math.sqrt(_*_+b*b+w*w),k=Math.asin(w/=S),E=ua(ua(w)-1)<ka?(o+h)/2:Math.atan2(b,_),A=n(E,k),C=A[0],N=A[1],L=C-t,T=N-i,q=x*L-y*T;(q*q/M>r||ua((y*L+x*T)/M-.5)>.3||u>a*g+c*p+s*v)&&(e(t,i,o,a,c,s,C,N,E,_/=S,b/=S,w,d,m),m.point(C,N),e(C,N,E,_,b,w,l,f,h,g,p,v,d,m))}}var r=.5,u=Math.cos(30*Aa),i=16;return t.precision=function(n){return arguments.length?(i=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function ye(n){this.stream=n}function xe(n){var t=me(function(t,e){return n([t*Ca,e*Ca])});return function(n){var e=new ye(n=t(n));return e.point=function(t,e){n.point(t*Aa,e*Aa)},e}}function Me(n){return _e(function(){return n})()}function _e(n){function t(n){return n=a(n[0]*Aa,n[1]*Aa),[n[0]*h+c,s-n[1]*h]}function e(n){return n=a.invert((n[0]-c)/h,(s-n[1])/h),n&&[n[0]*Ca,n[1]*Ca]}function r(){a=ie(o=ke(m,y,x),i);var n=i(v,d);return c=g-n[0]*h,s=p+n[1]*h,u()}function u(){return l&&(l.valid=!1,l=null),t}var i,o,a,c,s,l,f=me(function(n,t){return n=i(n,t),[n[0]*h+c,s-n[1]*h]}),h=150,g=480,p=250,v=0,d=0,m=0,y=0,x=0,M=wc,_=vt,b=null,w=null;return t.stream=function(n){return l&&(l.valid=!1),l=be(M(o,f(_(n)))),l.valid=!0,l},t.clipAngle=function(n){return arguments.length?(M=null==n?(b=n,wc):ee((b=+n)*Aa),u()):b},t.clipExtent=function(n){return arguments.length?(w=n,_=n?ue(n[0][0],n[0][1],n[1][0],n[1][1]):vt,u()):w},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],r()):[g,p]},t.center=function(n){return arguments.length?(v=n[0]%360*Aa,d=n[1]%360*Aa,r()):[v*Ca,d*Ca]},t.rotate=function(n){return arguments.length?(m=n[0]%360*Aa,y=n[1]%360*Aa,x=n.length>2?n[2]%360*Aa:0,r()):[m*Ca,y*Ca,x*Ca]},Zo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function be(n){var t=new ye(n);return t.point=function(t,e){n.point(t*Aa,e*Aa)},t}function we(n,t){return[n,t]}function Se(n,t){return[n>ba?n-wa:-ba>n?n+wa:n,t]}function ke(n,t,e){return n?t||e?ie(Ae(n),Ce(t,e)):Ae(n):t||e?Ce(t,e):Se}function Ee(n){return function(t,e){return t+=n,[t>ba?t-wa:-ba>t?t+wa:t,e]}}function Ae(n){var t=Ee(n);return t.invert=Ee(-n),t}function Ce(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*r+a*u;return[Math.atan2(c*i-l*o,a*r-s*u),H(l*i+c*o)]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*i-c*o;return[Math.atan2(c*i+s*o,a*r+l*u),H(l*r-a*u)]},e}function Ne(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=Le(e,u),i=Le(e,i),(o>0?i>u:u>i)&&(u+=o*wa)):(u=n+o*wa,i=n-.5*c);for(var s,l=u;o>0?l>i:i>l;l-=c)a.point((s=Ut([e,-r*Math.cos(l),-r*Math.sin(l)]))[0],s[1])}}function Le(n,t){var e=Tt(t);e[0]-=n,Pt(e);var r=j(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-ka)%(2*Math.PI)}function Te(n,t,e){var r=Zo.range(n,t-ka,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function qe(n,t,e){var r=Zo.range(n,t-ka,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function ze(n){return n.source}function Re(n){return n.target}function De(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(r),a=Math.sin(r),c=u*Math.cos(n),s=u*Math.sin(n),l=o*Math.cos(e),f=o*Math.sin(e),h=2*Math.asin(Math.sqrt(I(r-t)+u*o*I(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*l,u=e*s+t*f,o=e*i+t*a;return[Math.atan2(u,r)*Ca,Math.atan2(o,Math.sqrt(r*r+u*u))*Ca]}:function(){return[n*Ca,t*Ca]};return p.distance=h,p}function Pe(){function n(n,u){var i=Math.sin(u*=Aa),o=Math.cos(u),a=ua((n*=Aa)-t),c=Math.cos(a);Rc+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*i-e*o*c)*a),e*i+r*o*c),t=n,e=i,r=o}var t,e,r;Dc.point=function(u,i){t=u*Aa,e=Math.sin(i*=Aa),r=Math.cos(i),Dc.point=n},Dc.lineEnd=function(){Dc.point=Dc.lineEnd=c}}function Ue(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,r*o),Math.asin(r&&e*i/r)]},e}function je(n,t){function e(n,t){var e=ua(ua(t)-Sa)<ka?0:o/Math.pow(u(t),i);return[e*Math.sin(i*n),o-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(ba/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),o=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=o-t,r=U(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(o/r,1/i))-Sa]},e):Fe}function He(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return ua(u)<ka?we:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-U(u)*Math.sqrt(n*n+e*e)]},e)}function Fe(n,t){return[n,Math.log(Math.tan(ba/4+t/2))]}function Oe(n){var t,e=Me(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=i.apply(e,arguments);if(o===e){if(t=null==n){var a=ba*r(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ye(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function Ie(n){return n[0]}function Ze(n){return n[1]}function Ve(n,t,e,r){var u,i,o,a,c,s,l;return u=r[n],i=u[0],o=u[1],u=r[t],a=u[0],c=u[1],u=r[e],s=u[0],l=u[1],(l-o)*(a-i)-(c-o)*(s-i)>0}function Xe(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function $e(n,t,e,r){var u=n[0],i=e[0],o=t[0]-u,a=r[0]-i,c=n[1],s=e[1],l=t[1]-c,f=r[1]-s,h=(a*(c-s)-f*(u-i))/(f*o-a*l);return[u+h*o,c+h*l]}function Be(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function We(){dr(this),this.edge=this.site=this.circle=null}function Je(n){var t=$c.pop()||new We;return t.site=n,t}function Ge(n){ar(n),Zc.remove(n),$c.push(n),dr(n)}function Ke(n){var t=n.circle,e=t.x,r=t.cy,u={x:e,y:r},i=n.P,o=n.N,a=[n];Ge(n);for(var c=i;c.circle&&ua(e-c.circle.x)<ka&&ua(r-c.circle.cy)<ka;)i=c.P,a.unshift(c),Ge(c),c=i;a.unshift(c),ar(c);for(var s=o;s.circle&&ua(e-s.circle.x)<ka&&ua(r-s.circle.cy)<ka;)o=s.N,a.push(s),Ge(s),s=o;a.push(s),ar(s);var l,f=a.length;for(l=1;f>l;++l)s=a[l],c=a[l-1],gr(s.edge,c.site,s.site,u);c=a[0],s=a[f-1],s.edge=fr(c.site,s.site,null,u),or(c),or(s)}function Qe(n){for(var t,e,r,u,i=n.x,o=n.y,a=Zc._;a;)if(r=nr(a,o)-i,r>ka)a=a.L;else{if(u=i-tr(a,o),!(u>ka)){r>-ka?(t=a.P,e=a):u>-ka?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var c=Je(n);if(Zc.insert(t,c),t||e){if(t===e)return ar(t),e=Je(t.site),Zc.insert(c,e),c.edge=e.edge=fr(t.site,c.site),or(t),or(e),void 0;if(!e)return c.edge=fr(t.site,c.site),void 0;ar(t),ar(e);var s=t.site,l=s.x,f=s.y,h=n.x-l,g=n.y-f,p=e.site,v=p.x-l,d=p.y-f,m=2*(h*d-g*v),y=h*h+g*g,x=v*v+d*d,M={x:(d*y-g*x)/m+l,y:(h*x-v*y)/m+f};gr(e.edge,s,p,M),c.edge=fr(s,n,null,M),e.edge=fr(n,p,null,M),or(t),or(e)}}function nr(n,t){var e=n.site,r=e.x,u=e.y,i=u-t;if(!i)return r;var o=n.P;if(!o)return-1/0;e=o.site;var a=e.x,c=e.y,s=c-t;if(!s)return a;var l=a-r,f=1/i-1/s,h=l/s;return f?(-h+Math.sqrt(h*h-2*f*(l*l/(-2*s)-c+s/2+u-i/2)))/f+r:(r+a)/2}function tr(n,t){var e=n.N;if(e)return nr(e,t);var r=n.site;return r.y===t?r.x:1/0}function er(n){this.site=n,this.edges=[]}function rr(n){for(var t,e,r,u,i,o,a,c,s,l,f=n[0][0],h=n[1][0],g=n[0][1],p=n[1][1],v=Ic,d=v.length;d--;)if(i=v[d],i&&i.prepare())for(a=i.edges,c=a.length,o=0;c>o;)l=a[o].end(),r=l.x,u=l.y,s=a[++o%c].start(),t=s.x,e=s.y,(ua(r-t)>ka||ua(u-e)>ka)&&(a.splice(o,0,new pr(hr(i.site,l,ua(r-f)<ka&&p-u>ka?{x:f,y:ua(t-f)<ka?e:p}:ua(u-p)<ka&&h-r>ka?{x:ua(e-p)<ka?t:h,y:p}:ua(r-h)<ka&&u-g>ka?{x:h,y:ua(t-h)<ka?e:g}:ua(u-g)<ka&&r-f>ka?{x:ua(e-g)<ka?t:f,y:g}:null),i.site,null)),++c)}function ur(n,t){return t.angle-n.angle}function ir(){dr(this),this.x=this.y=this.arc=this.site=this.cy=null}function or(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,u=n.site,i=e.site;if(r!==i){var o=u.x,a=u.y,c=r.x-o,s=r.y-a,l=i.x-o,f=i.y-a,h=2*(c*f-s*l);if(!(h>=-Ea)){var g=c*c+s*s,p=l*l+f*f,v=(f*g-s*p)/h,d=(c*p-l*g)/h,f=d+a,m=Bc.pop()||new ir;m.arc=n,m.site=u,m.x=v+o,m.y=f+Math.sqrt(v*v+d*d),m.cy=f,n.circle=m;for(var y=null,x=Xc._;x;)if(m.y<x.y||m.y===x.y&&m.x<=x.x){if(!x.L){y=x.P;break}x=x.L}else{if(!x.R){y=x;break}x=x.R}Xc.insert(y,m),y||(Vc=m)}}}}function ar(n){var t=n.circle;t&&(t.P||(Vc=t.N),Xc.remove(t),Bc.push(t),dr(t),n.circle=null)}function cr(n){for(var t,e=Yc,r=re(n[0][0],n[0][1],n[1][0],n[1][1]),u=e.length;u--;)t=e[u],(!sr(t,n)||!r(t)||ua(t.a.x-t.b.x)<ka&&ua(t.a.y-t.b.y)<ka)&&(t.a=t.b=null,e.splice(u,1))}function sr(n,t){var e=n.b;if(e)return!0;var r,u,i=n.a,o=t[0][0],a=t[1][0],c=t[0][1],s=t[1][1],l=n.l,f=n.r,h=l.x,g=l.y,p=f.x,v=f.y,d=(h+p)/2,m=(g+v)/2;if(v===g){if(o>d||d>=a)return;if(h>p){if(i){if(i.y>=s)return}else i={x:d,y:c};e={x:d,y:s}}else{if(i){if(i.y<c)return}else i={x:d,y:s};e={x:d,y:c}}}else if(r=(h-p)/(v-g),u=m-r*d,-1>r||r>1)if(h>p){if(i){if(i.y>=s)return
}else i={x:(c-u)/r,y:c};e={x:(s-u)/r,y:s}}else{if(i){if(i.y<c)return}else i={x:(s-u)/r,y:s};e={x:(c-u)/r,y:c}}else if(v>g){if(i){if(i.x>=a)return}else i={x:o,y:r*o+u};e={x:a,y:r*a+u}}else{if(i){if(i.x<o)return}else i={x:a,y:r*a+u};e={x:o,y:r*o+u}}return n.a=i,n.b=e,!0}function lr(n,t){this.l=n,this.r=t,this.a=this.b=null}function fr(n,t,e,r){var u=new lr(n,t);return Yc.push(u),e&&gr(u,n,t,e),r&&gr(u,t,n,r),Ic[n.i].edges.push(new pr(u,n,t)),Ic[t.i].edges.push(new pr(u,t,n)),u}function hr(n,t,e){var r=new lr(n,null);return r.a=t,r.b=e,Yc.push(r),r}function gr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function pr(n,t,e){var r=n.a,u=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(u.x-r.x,r.y-u.y):Math.atan2(r.x-u.x,u.y-r.y)}function vr(){this._=null}function dr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function mr(n,t){var e=t,r=t.R,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function yr(n,t){var e=t,r=t.L,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function xr(n){for(;n.L;)n=n.L;return n}function Mr(n,t){var e,r,u,i=n.sort(_r).pop();for(Yc=[],Ic=new Array(n.length),Zc=new vr,Xc=new vr;;)if(u=Vc,i&&(!u||i.y<u.y||i.y===u.y&&i.x<u.x))(i.x!==e||i.y!==r)&&(Ic[i.i]=new er(i),Qe(i),e=i.x,r=i.y),i=n.pop();else{if(!u)break;Ke(u.arc)}t&&(cr(t),rr(t));var o={cells:Ic,edges:Yc};return Zc=Xc=Yc=Ic=null,o}function _r(n,t){return t.y-n.y||t.x-n.x}function br(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function wr(n){return n.x}function Sr(n){return n.y}function kr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function Er(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var o=.5*(e+u),a=.5*(r+i),c=t.nodes;c[0]&&Er(n,c[0],e,r,o,a),c[1]&&Er(n,c[1],o,r,u,a),c[2]&&Er(n,c[2],e,a,o,i),c[3]&&Er(n,c[3],o,a,u,i)}}function Ar(n,t){n=Zo.rgb(n),t=Zo.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,o=t.g-r,a=t.b-u;return function(n){return"#"+ct(Math.round(e+i*n))+ct(Math.round(r+o*n))+ct(Math.round(u+a*n))}}function Cr(n,t){var e,r={},u={};for(e in n)e in t?r[e]=Tr(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function Nr(n,t){return t-=n=+n,function(e){return n+t*e}}function Lr(n,t){var e,r,u,i,o,a=0,c=0,s=[],l=[];for(n+="",t+="",Jc.lastIndex=0,r=0;e=Jc.exec(t);++r)e.index&&s.push(t.substring(a,c=e.index)),l.push({i:s.length,x:e[0]}),s.push(null),a=Jc.lastIndex;for(a<t.length&&s.push(t.substring(a)),r=0,i=l.length;(e=Jc.exec(n))&&i>r;++r)if(o=l[r],o.x==e[0]){if(o.i)if(null==s[o.i+1])for(s[o.i-1]+=o.x,s.splice(o.i,1),u=r+1;i>u;++u)l[u].i--;else for(s[o.i-1]+=o.x+s[o.i+1],s.splice(o.i,2),u=r+1;i>u;++u)l[u].i-=2;else if(null==s[o.i+1])s[o.i]=o.x;else for(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1),u=r+1;i>u;++u)l[u].i--;l.splice(r,1),i--,r--}else o.x=Nr(parseFloat(e[0]),parseFloat(o.x));for(;i>r;)o=l.pop(),null==s[o.i+1]?s[o.i]=o.x:(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1)),i--;return 1===s.length?null==s[0]?(o=l[0].x,function(n){return o(n)+""}):function(){return t}:function(n){for(r=0;i>r;++r)s[(o=l[r]).i]=o.x(n);return s.join("")}}function Tr(n,t){for(var e,r=Zo.interpolators.length;--r>=0&&!(e=Zo.interpolators[r](n,t)););return e}function qr(n,t){var e,r=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Tr(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;o>e;++e)u[e]=t[e];return function(n){for(e=0;a>e;++e)u[e]=r[e](n);return u}}function zr(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function Rr(n){return function(t){return 1-n(1-t)}}function Dr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Pr(n){return n*n}function Ur(n){return n*n*n}function jr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Hr(n){return function(t){return Math.pow(t,n)}}function Fr(n){return 1-Math.cos(n*Sa)}function Or(n){return Math.pow(2,10*(n-1))}function Yr(n){return 1-Math.sqrt(1-n*n)}function Ir(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/wa*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*wa/t)}}function Zr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Vr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Xr(n,t){n=Zo.hcl(n),t=Zo.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,o=t.c-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return J(e+i*n,r+o*n,u+a*n)+""}}function $r(n,t){n=Zo.hsl(n),t=Zo.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,o=t.s-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return $(e+i*n,r+o*n,u+a*n)+""}}function Br(n,t){n=Zo.lab(n),t=Zo.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,o=t.a-r,a=t.b-u;return function(n){return Q(e+i*n,r+o*n,u+a*n)+""}}function Wr(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Jr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Kr(t),u=Gr(t,e),i=Kr(Qr(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Ca,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*Ca:0}function Gr(n,t){return n[0]*t[0]+n[1]*t[1]}function Kr(n){var t=Math.sqrt(Gr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Qr(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function nu(n,t){var e,r=[],u=[],i=Zo.transform(n),o=Zo.transform(t),a=i.translate,c=o.translate,s=i.rotate,l=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:Nr(a[0],c[0])},{i:3,x:Nr(a[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),s!=l?(s-l>180?l+=360:l-s>180&&(s+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:Nr(s,l)})):l&&r.push(r.pop()+"rotate("+l+")"),f!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:Nr(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:Nr(g[0],p[0])},{i:e-2,x:Nr(g[1],p[1])})):(1!=p[0]||1!=p[1])&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function tu(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function eu(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function ru(n){for(var t=n.source,e=n.target,r=iu(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function uu(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function iu(n,t){if(n===t)return n;for(var e=uu(n),r=uu(t),u=e.pop(),i=r.pop(),o=null;u===i;)o=u,u=e.pop(),i=r.pop();return o}function ou(n){n.fixed|=2}function au(n){n.fixed&=-7}function cu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function su(n){n.fixed&=-5}function lu(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(lu(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var s=t*e[n.point.index];n.charge+=n.pointCharge=s,r+=s*n.point.x,u+=s*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function fu(n,t){return Zo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=vu,n}function hu(n){return n.children}function gu(n){return n.value}function pu(n,t){return t.value-n.value}function vu(n){return Zo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function du(n){return n.x}function mu(n){return n.y}function yu(n,t,e){n.y0=t,n.y=e}function xu(n){return Zo.range(n.length)}function Mu(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function _u(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function bu(n){return n.reduce(wu,0)}function wu(n,t){return n+t[1]}function Su(n,t){return ku(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function ku(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function Eu(n){return[Zo.min(n),Zo.max(n)]}function Au(n,t){return n.parent==t.parent?1:2}function Cu(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function Nu(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function Lu(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=Lu(e[i],t),n)>0&&(n=r);return n}function Tu(n,t){return n.x-t.x}function qu(n,t){return t.x-n.x}function zu(n,t){return n.depth-t.depth}function Ru(n,t){function e(n,r){var u=n.children;if(u&&(o=u.length))for(var i,o,a=null,c=-1;++c<o;)i=u[c],e(i,a),a=i;t(n,r)}e(n,null)}function Du(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function Pu(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function Uu(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function ju(n,t){return n.value-t.value}function Hu(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Fu(n,t){n._pack_next=t,t._pack_prev=n}function Ou(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return.999*u*u>e*e+r*r}function Yu(n){function t(n){l=Math.min(n.x-n.r,l),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(s=e.length)){var e,r,u,i,o,a,c,s,l=1/0,f=-1/0,h=1/0,g=-1/0;if(e.forEach(Iu),r=e[0],r.x=-r.r,r.y=0,t(r),s>1&&(u=e[1],u.x=u.r,u.y=0,t(u),s>2))for(i=e[2],Xu(r,u,i),t(i),Hu(r,i),r._pack_prev=i,Hu(i,u),u=r._pack_next,o=3;s>o;o++){Xu(r,u,i=e[o]);var p=0,v=1,d=1;for(a=u._pack_next;a!==u;a=a._pack_next,v++)if(Ou(a,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==a._pack_prev&&!Ou(c,i);c=c._pack_prev,d++);p?(d>v||v==d&&u.r<r.r?Fu(r,u=a):Fu(r=c,u),o--):(Hu(r,i),u=i,t(i))}var m=(l+f)/2,y=(h+g)/2,x=0;for(o=0;s>o;o++)i=e[o],i.x-=m,i.y-=y,x=Math.max(x,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=x,e.forEach(Zu)}}function Iu(n){n._pack_next=n._pack_prev=n}function Zu(n){delete n._pack_next,delete n._pack_prev}function Vu(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,o=u.length;++i<o;)Vu(u[i],t,e,r)}function Xu(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var o=t.r+e.r,a=u*u+i*i;o*=o,r*=r;var c=.5+(r-o)/(2*a),s=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+c*u+s*i,e.y=n.y+c*i-s*u}else e.x=n.x+r,e.y=n.y}function $u(n){return 1+Zo.max(n,function(n){return n.y})}function Bu(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Wu(n){var t=n.children;return t&&t.length?Wu(t[0]):n}function Ju(n){var t,e=n.children;return e&&(t=e.length)?Ju(e[t-1]):n}function Gu(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ku(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function Qu(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function ni(n){return n.rangeExtent?n.rangeExtent():Qu(n.range())}function ti(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function ei(n,t){var e,r=0,u=n.length-1,i=n[r],o=n[u];return i>o&&(e=r,r=u,u=e,e=i,i=o,o=e),n[r]=t.floor(i),n[u]=t.ceil(o),n}function ri(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:os}function ui(n,t,e,r){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(e(n[o-1],n[o])),i.push(r(t[o-1],t[o]));return function(t){var e=Zo.bisect(n,t,1,a)-1;return i[e](u[e](t))}}function ii(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?ui:ti,c=r?eu:tu;return o=u(n,t,c,e),a=u(t,n,c,Tr),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Wr)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return si(n,t)},i.tickFormat=function(t,e){return li(n,t,e)},i.nice=function(t){return ai(n,t),u()},i.copy=function(){return ii(n,t,e,r)},u()}function oi(n,t){return Zo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function ai(n,t){return ei(n,ri(ci(n,t)[2]))}function ci(n,t){null==t&&(t=10);var e=Qu(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function si(n,t){return Zo.range.apply(Zo,ci(n,t))}function li(n,t,e){var r=-Math.floor(Math.log(ci(n,t)[2])/Math.LN10+.01);return Zo.format(e?e.replace(tc,function(n,t,e,u,i,o,a,c,s,l){return[t,e,u,i,o,a,c,s||"."+(r-2*("%"===l)),l].join("")}):",."+r+"f")}function fi(n,t,e,r){function u(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(u)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(u)),o):t},o.nice=function(){var t=ei(r.map(u),e?Math:cs);return n.domain(t),r=t.map(i),o},o.ticks=function(){var n=Qu(r),o=[],a=n[0],c=n[1],s=Math.floor(u(a)),l=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(l-s)){if(e){for(;l>s;s++)for(var h=1;f>h;h++)o.push(i(s)*h);o.push(i(s))}else for(o.push(i(s));s++<l;)for(var h=f-1;h>0;h--)o.push(i(s)*h);for(s=0;o[s]<a;s++);for(l=o.length;o[l-1]>c;l--);o=o.slice(s,l)}return o},o.tickFormat=function(n,t){if(!arguments.length)return as;arguments.length<2?t=as:"function"!=typeof t&&(t=Zo.format(t));var r,a=Math.max(.1,n/o.ticks().length),c=e?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+r))<=a?t(n):""}},o.copy=function(){return fi(n.copy(),t,e,r)},oi(o,n)}function hi(n,t,e){function r(t){return n(u(t))}var u=gi(t),i=gi(1/t);return r.invert=function(t){return i(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(u)),r):e},r.ticks=function(n){return si(e,n)},r.tickFormat=function(n,t){return li(e,n,t)},r.nice=function(n){return r.domain(ai(e,n))},r.exponent=function(o){return arguments.length?(u=gi(t=o),i=gi(1/t),n.domain(e.map(u)),r):t},r.copy=function(){return hi(n.copy(),t,e)},oi(r,n)}function gi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function pi(n,t){function e(e){return o[((i.get(e)||"range"===t.t&&i.set(e,n.push(e)))-1)%o.length]}function r(t,e){return Zo.range(n.length).map(function(n){return t+e*n})}var i,o,a;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var o,a=-1,c=r.length;++a<c;)i.has(o=r[a])||i.set(o,n.push(o));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(o=n,a=0,t={t:"range",a:arguments},e):o},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],s=u[1],l=(s-c)/(Math.max(1,n.length-1)+i);return o=r(n.length<2?(c+s)/2:c+l*i/2,l),a=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=(f-l)/(n.length-i+2*c);return o=r(l+h*c,h),s&&o.reverse(),a=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=Math.floor((f-l)/(n.length-i+2*c)),g=f-l-(n.length-i)*h;return o=r(l+Math.round(g/2),h),s&&o.reverse(),a=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return a},e.rangeExtent=function(){return Qu(t.a[0])},e.copy=function(){return pi(n,t)},e.domain(n)}function vi(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=Zo.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?void 0:t[Zo.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(Zo.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.invertExtent=function(e){return e=t.indexOf(e),0>e?[0/0,0/0]:[e>0?u[e-1]:n[0],e<u.length?u[e]:n[n.length-1]]},r.copy=function(){return vi(n,t)},e()}function di(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),o=e.length-1,r}var i,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},r.copy=function(){return di(n,t,e)},u()}function mi(n,t){function e(e){return e>=e?t[Zo.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return mi(n,t)},e}function yi(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return si(n,t)},t.tickFormat=function(t,e){return li(n,t,e)},t.copy=function(){return yi(n)},t}function xi(n){return n.innerRadius}function Mi(n){return n.outerRadius}function _i(n){return n.startAngle}function bi(n){return n.endAngle}function wi(n){function t(t){function o(){s.push("M",i(n(l),a))}for(var c,s=[],l=[],f=-1,h=t.length,g=pt(e),p=pt(r);++f<h;)u.call(this,c=t[f],f)?l.push([+g.call(this,c,f),+p.call(this,c,f)]):l.length&&(o(),l=[]);return l.length&&o(),s.length?s.join(""):null}var e=Ie,r=Ze,u=Zt,i=Si,o=i.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=vs.get(n)||Si).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function Si(n){return n.join("L")}function ki(n){return Si(n)+"Z"}function Ei(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&u.push("H",r[0]),u.join("")}function Ai(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function Ci(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function Ni(n,t){return n.length<4?Si(n):n[1]+qi(n.slice(1,n.length-1),zi(n,t))}function Li(n,t){return n.length<3?Si(n):n[0]+qi((n.push(n[0]),n),zi([n[n.length-2]].concat(n,[n[1]]),t))}function Ti(n,t){return n.length<3?Si(n):n[0]+qi(n,zi(n,t))}function qi(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Si(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(e&&(r+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,r+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var s=2;s<t.length;s++,c++)i=n[c],a=t[s],r+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(e){var l=n[c];r+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+l[0]+","+l[1]}return r}function zi(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)e=i,i=o,o=n[a],r.push([u*(o[0]-e[0]),u*(o[1]-e[1])]);return r}function Ri(n){if(n.length<3)return Si(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],o=[u,u,u,(r=n[1])[0]],a=[i,i,i,r[1]],c=[u,",",i,"L",ji(ys,o),",",ji(ys,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Hi(c,o,a);return n.pop(),c.push("L",r),c.join("")}function Di(n){if(n.length<4)return Si(n);for(var t,e=[],r=-1,u=n.length,i=[0],o=[0];++r<3;)t=n[r],i.push(t[0]),o.push(t[1]);for(e.push(ji(ys,i)+","+ji(ys,o)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),Hi(e,i,o);return e.join("")}function Pi(n){for(var t,e,r=-1,u=n.length,i=u+4,o=[],a=[];++r<4;)e=n[r%u],o.push(e[0]),a.push(e[1]);for(t=[ji(ys,o),",",ji(ys,a)],--r;++r<i;)e=n[r%u],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Hi(t,o,a);return t.join("")}function Ui(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],o=n[0][1],a=n[e][0]-i,c=n[e][1]-o,s=-1;++s<=e;)r=n[s],u=s/e,r[0]=t*r[0]+(1-t)*(i+u*a),r[1]=t*r[1]+(1-t)*(o+u*c);return Ri(n)}function ji(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Hi(n,t,e){n.push("C",ji(ds,t),",",ji(ds,e),",",ji(ms,t),",",ji(ms,e),",",ji(ys,t),",",ji(ys,e))}function Fi(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Oi(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],o=r[0]=Fi(u,i);++t<e;)r[t]=(o+(o=Fi(u=i,i=n[t+1])))/2;return r[t]=o,r}function Yi(n){for(var t,e,r,u,i=[],o=Oi(n),a=-1,c=n.length-1;++a<c;)t=Fi(n[a],n[a+1]),ua(t)<ka?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*e,o[a+1]=u*r));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function Ii(n){return n.length<3?Si(n):n[0]+qi(n,Yi(n))}function Zi(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+gs,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Vi(n){function t(t){function c(){v.push("M",a(n(m),f),l,s(n(d.reverse()),f),"Z")}for(var h,g,p,v=[],d=[],m=[],y=-1,x=t.length,M=pt(e),_=pt(u),b=e===r?function(){return g}:pt(r),w=u===i?function(){return p}:pt(i);++y<x;)o.call(this,h=t[y],y)?(d.push([g=+M.call(this,h,y),p=+_.call(this,h,y)]),m.push([+b.call(this,h,y),+w.call(this,h,y)])):d.length&&(c(),d=[],m=[]);return d.length&&c(),v.length?v.join(""):null}var e=Ie,r=Ie,u=0,i=Ze,o=Zt,a=Si,c=a.key,s=a,l="L",f=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=vs.get(n)||Si).key,s=a.reverse||a,l=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function Xi(n){return n.radius}function $i(n){return[n.x,n.y]}function Bi(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+gs;return[e*Math.cos(r),e*Math.sin(r)]}}function Wi(){return 64}function Ji(){return"circle"}function Gi(n){var t=Math.sqrt(n/ba);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Ki(n,t){return sa(n,Ss),n.id=t,n}function Qi(n,t,e,r){var u=n.id;return C(n,"function"==typeof e?function(n,i,o){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,o)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function no(n){return null==n&&(n=""),function(){this.textContent=n}}function to(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),o=i[e];if(!o){var a=r.time;o=i[e]={tween:new u,time:a,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,Zo.timer(function(r){function u(r){return i.active>e?s():(i.active=e,o.event&&o.event.start.call(n,l,t),o.tween.forEach(function(e,r){(r=r.call(n,l,t))&&v.push(r)}),Zo.timer(function(){return p.c=c(r||1)?Zt:c,1},0,a),void 0)}function c(r){if(i.active!==e)return s();for(var u=r/g,a=f(u),c=v.length;c>0;)v[--c].call(n,a);return u>=1?(o.event&&o.event.end.call(n,l,t),s()):void 0}function s(){return--i.count?delete i[e]:delete n.__transition__,1}var l=n.__data__,f=o.ease,h=o.delay,g=o.duration,p=Ba,v=[];return p.t=h+a,r>=h?u(r-h):(p.c=u,void 0)},0,a)}}function eo(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function ro(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function uo(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function io(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new Ts(e-1)),1),e}function i(n,e){return t(n=new Ts(+n),e),n}function o(n,r,i){var o=u(n),a=[];if(i>1)for(;r>o;)e(o)%i||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{Ts=uo;var r=new uo;return r._=n,o(r,t,e)}finally{Ts=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=oo(n);return c.floor=c,c.round=oo(r),c.ceil=oo(u),c.offset=oo(i),c.range=a,n}function oo(n){return function(t,e){try{Ts=uo;var r=new uo;return r._=t,n(r,e)._}finally{Ts=Date}}}function ao(n){function t(t){for(var r,u,i,o=[],a=-1,c=0;++a<e;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=Js[r=n.charAt(++a)])&&(r=n.charAt(++a)),(i=Gs[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),o.push(r),c=a+1);return o.push(n.substring(c,a)),o.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},r=co(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+12*e.p);var u=null!=e.Z&&Ts!==uo,i=new(u?uo:Ts);return"j"in e?i.setFullYear(e.y,0,e.j):"w"in e&&("W"in e||"U"in e)?(i.setFullYear(e.y,0,1),i.setFullYear(e.y,0,"W"in e?(e.w+6)%7+7*e.W-(i.getDay()+5)%7:e.w+7*e.U-(i.getDay()+6)%7)):i.setFullYear(e.y,e.m,e.d),i.setHours(e.H+Math.floor(e.Z/100),e.M+e.Z%100,e.S,e.L),u?i._:i},t.toString=function(){return n},t}function co(n,t,e,r){for(var u,i,o,a=0,c=t.length,s=e.length;c>a;){if(r>=s)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=Ks[o in Js?t.charAt(a++):o],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function so(n){return new RegExp("^(?:"+n.map(Zo.requote).join("|")+")","i")}function lo(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function fo(n,t,e){var r=0>n?"-":"",u=(r?-n:n)+"",i=u.length;return r+(e>i?new Array(e-i+1).join(t)+u:u)}function ho(n,t,e){Is.lastIndex=0;var r=Is.exec(t.substring(e));return r?(n.w=Zs.get(r[0].toLowerCase()),e+r[0].length):-1}function go(n,t,e){Os.lastIndex=0;var r=Os.exec(t.substring(e));return r?(n.w=Ys.get(r[0].toLowerCase()),e+r[0].length):-1}function po(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function vo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e));return r?(n.U=+r[0],e+r[0].length):-1}function mo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e));return r?(n.W=+r[0],e+r[0].length):-1}function yo(n,t,e){$s.lastIndex=0;var r=$s.exec(t.substring(e));return r?(n.m=Bs.get(r[0].toLowerCase()),e+r[0].length):-1}function xo(n,t,e){Vs.lastIndex=0;var r=Vs.exec(t.substring(e));return r?(n.m=Xs.get(r[0].toLowerCase()),e+r[0].length):-1}function Mo(n,t,e){return co(n,Gs.c.toString(),t,e)}function _o(n,t,e){return co(n,Gs.x.toString(),t,e)}function bo(n,t,e){return co(n,Gs.X.toString(),t,e)}function wo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function So(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.y=Eo(+r[0]),e+r[0].length):-1}function ko(n,t,e){return/^[+-]\d{4}$/.test(t=t.substring(e,e+5))?(n.Z=+t,e+5):-1}function Eo(n){return n+(n>68?1900:2e3)}function Ao(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function Co(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function No(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function Lo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function To(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function qo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function zo(n,t,e){Qs.lastIndex=0;var r=Qs.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function Ro(n,t,e){var r=nl.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function Do(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(ua(t)/60),u=ua(t)%60;return e+fo(r,"0",2)+fo(u,"0",2)}function Po(n,t,e){Ws.lastIndex=0;var r=Ws.exec(t.substring(e,e+1));return r?e+r[0].length:-1}function Uo(n){function t(n){try{Ts=uo;var t=new Ts;return t._=n,e(t)}finally{Ts=Date}}var e=ao(n);return t.parse=function(n){try{Ts=uo;var t=e.parse(n);return t&&t._}finally{Ts=Date}},t.toString=e.toString,t}function jo(n){return n.toISOString()}function Ho(n,t,e){function r(t){return n(t)}function u(n,e){var r=n[1]-n[0],u=r/e,i=Zo.bisect(el,u);return i==el.length?[t.year,ci(n.map(function(n){return n/31536e6}),e)[2]]:i?t[u/el[i-1]<el[i]/u?i-1:i]:[ol,ci(n,e)[2]]}return r.invert=function(t){return Fo(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Fo)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,Fo(+e+1),t).length}var i=r.domain(),o=Qu(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),r.domain(ei(i,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=Fo(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=Fo(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Qu(r.domain()),i=null==n?u(e,10):"number"==typeof n?u(e,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(e[0],Fo(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return Ho(n.copy(),t,e)},oi(r,n)}function Fo(n){return new Date(n)}function Oo(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function Yo(n){return JSON.parse(n.responseText)}function Io(n){var t=$o.createRange();return t.selectNode($o.body),t.createContextualFragment(n.responseText)}var Zo={version:"3.3.8"};Date.now||(Date.now=function(){return+new Date});var Vo=[].slice,Xo=function(n){return Vo.call(n)},$o=document,Bo=$o.documentElement,Wo=window;try{Xo(Bo.childNodes)[0].nodeType}catch(Jo){Xo=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}try{$o.createElement("div").style.setProperty("opacity",0,"")}catch(Go){var Ko=Wo.Element.prototype,Qo=Ko.setAttribute,na=Ko.setAttributeNS,ta=Wo.CSSStyleDeclaration.prototype,ea=ta.setProperty;Ko.setAttribute=function(n,t){Qo.call(this,n,t+"")},Ko.setAttributeNS=function(n,t,e){na.call(this,n,t,e+"")},ta.setProperty=function(n,t,e){ea.call(this,n,t+"",e)}}Zo.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},Zo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},Zo.min=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&e>r&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&e>r&&(e=r)}return e},Zo.max=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&r>e&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&r>e&&(e=r)}return e},Zo.extent=function(n,t){var e,r,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(e=u=n[i])&&e>=e);)e=u=void 0;for(;++i<o;)null!=(r=n[i])&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<o&&!(null!=(e=u=t.call(n,n[i],i))&&e>=e);)e=void 0;for(;++i<o;)null!=(r=t.call(n,n[i],i))&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},Zo.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},Zo.mean=function(t,e){var r,u=t.length,i=0,o=-1,a=0;if(1===arguments.length)for(;++o<u;)n(r=t[o])&&(i+=(r-i)/++a);else for(;++o<u;)n(r=e.call(t,t[o],o))&&(i+=(r-i)/++a);return a?i:void 0},Zo.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;return i?u+i*(n[r]-u):u},Zo.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?Zo.quantile(t.sort(Zo.ascending),.5):void 0},Zo.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;
n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var ra=Zo.bisector(function(n){return n});Zo.bisectLeft=ra.left,Zo.bisect=Zo.bisectRight=ra.right,Zo.shuffle=function(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n},Zo.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},Zo.pairs=function(n){for(var t,e=0,r=n.length-1,u=n[0],i=new Array(0>r?0:r);r>e;)i[e]=[t=u,u=n[++e]];return i},Zo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=Zo.min(arguments,t),r=new Array(e);++n<e;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},Zo.transpose=function(n){return Zo.zip.apply(Zo,n)},Zo.keys=function(n){var t=[];for(var e in n)t.push(e);return t},Zo.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},Zo.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},Zo.merge=function(n){for(var t,e,r,u=n.length,i=-1,o=0;++i<u;)o+=n[i].length;for(e=new Array(o);--u>=0;)for(r=n[u],t=r.length;--t>=0;)e[--o]=r[t];return e};var ua=Math.abs;Zo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var u,i=[],o=e(ua(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(u=n+r*++a)>t;)i.push(u/o);else for(;(u=n+r*++a)<t;)i.push(u/o);return i},Zo.map=function(n){var t=new u;if(n instanceof u)n.forEach(function(n,e){t.set(n,e)});else for(var e in n)t.set(e,n[e]);return t},r(u,{has:function(n){return ia+n in this},get:function(n){return this[ia+n]},set:function(n,t){return this[ia+n]=t},remove:function(n){return n=ia+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===oa&&n.call(this,t.substring(1),this[t])}});var ia="\x00",oa=ia.charCodeAt(0);Zo.nest=function(){function n(t,a,c){if(c>=o.length)return r?r.call(i,a):e?a.sort(e):a;for(var s,l,f,h,g=-1,p=a.length,v=o[c++],d=new u;++g<p;)(h=d.get(s=v(l=a[g])))?h.push(l):d.set(s,[l]);return t?(l=t(),f=function(e,r){l.set(e,n(t,r,c))}):(l={},f=function(e,r){l[e]=n(t,r,c)}),d.forEach(f),l}function t(n,e){if(e>=o.length)return n;var r=[],u=a[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},o=[],a=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(Zo.map,e,0),0)},i.key=function(n){return o.push(n),i},i.sortKeys=function(n){return a[o.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},Zo.set=function(n){var t=new i;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},r(i,{has:function(n){return ia+n in this},add:function(n){return this[ia+n]=!0,n},remove:function(n){return n=ia+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===oa&&n.call(this,t.substring(1))}}),Zo.behavior={},Zo.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=o(n,t,t[e]);return n};var aa=["webkit","ms","moz","Moz","o","O"];Zo.dispatch=function(){for(var n=new s,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=l(n);return n},s.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},Zo.event=null,Zo.requote=function(n){return n.replace(ca,"\\$&")};var ca=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,sa={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},la=function(n,t){return t.querySelector(n)},fa=function(n,t){return t.querySelectorAll(n)},ha=Bo[a(Bo,"matchesSelector")],ga=function(n,t){return ha.call(n,t)};"function"==typeof Sizzle&&(la=function(n,t){return Sizzle(n,t)[0]||null},fa=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},ga=Sizzle.matchesSelector),Zo.selection=function(){return ma};var pa=Zo.selection.prototype=[];pa.select=function(n){var t,e,r,u,i=[];n=v(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var c=-1,s=r.length;++c<s;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c,o)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return p(i)},pa.selectAll=function(n){var t,e,r=[];n=d(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(e=o[a])&&(r.push(t=Xo(n.call(e,e.__data__,a,u))),t.parentNode=e);return p(r)};var va={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Zo.ns={prefix:va,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),va.hasOwnProperty(e)?{space:va[e],local:n}:n}},pa.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=Zo.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(m(t,n[t]));return this}return this.each(m(n,t))},pa.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!x(n[u]).test(t))return!1;return!0}for(t in n)this.each(M(t,n[t]));return this}return this.each(M(n,t))},pa.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(b(e,n[e],t));return this}if(2>r)return Wo.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(b(n,t,e))},pa.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(w(t,n[t]));return this}return this.each(w(n,t))},pa.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},pa.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},pa.append=function(n){return n=S(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},pa.insert=function(n,t){return n=S(n),t=v(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},pa.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},pa.data=function(n,t){function e(n,e){var r,i,o,a=n.length,f=e.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),v=new Array(a);if(t){var d,m=new u,y=new u,x=[];for(r=-1;++r<a;)d=t.call(i=n[r],i.__data__,r),m.has(d)?v[r]=i:m.set(d,i),x.push(d);for(r=-1;++r<f;)d=t.call(e,o=e[r],r),(i=m.get(d))?(g[r]=i,i.__data__=o):y.has(d)||(p[r]=k(o)),y.set(d,o),m.remove(d);for(r=-1;++r<a;)m.has(x[r])&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],o=e[r],i?(i.__data__=o,g[r]=i):p[r]=k(o);for(;f>r;++r)p[r]=k(e[r]);for(;a>r;++r)v[r]=n[r]}p.update=g,p.parentNode=g.parentNode=v.parentNode=n.parentNode,c.push(p),s.push(g),l.push(v)}var r,i,o=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(n[o]=i.__data__);return n}var c=N([]),s=p([]),l=p([]);if("function"==typeof n)for(;++o<a;)e(r=this[o],n.call(r,r.parentNode.__data__,o));else for(;++o<a;)e(r=this[o],n);return s.enter=function(){return c},s.exit=function(){return l},s},pa.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},pa.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=E(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return p(u)},pa.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},pa.sort=function(n){n=A.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},pa.each=function(n){return C(this,function(t,e,r){n.call(t,t.__data__,e,r)})},pa.call=function(n){var t=Xo(arguments);return n.apply(t[0]=this,t),this},pa.empty=function(){return!this.node()},pa.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null},pa.size=function(){var n=0;return this.each(function(){++n}),n};var da=[];Zo.selection.enter=N,Zo.selection.enter.prototype=da,da.append=pa.append,da.empty=pa.empty,da.node=pa.node,da.call=pa.call,da.size=pa.size,da.select=function(n){for(var t,e,r,u,i,o=[],a=-1,c=this.length;++a<c;){r=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var s=-1,l=u.length;++s<l;)(i=u[s])?(t.push(r[s]=e=n.call(u.parentNode,i.__data__,s,a)),e.__data__=i.__data__):t.push(null)}return p(o)},da.insert=function(n,t){return arguments.length<2&&(t=L(this)),pa.insert.call(this,n,t)},pa.transition=function(){for(var n,t,e=Ms||++ks,r=[],u=_s||{time:Date.now(),ease:jr,delay:0,duration:250},i=-1,o=this.length;++i<o;){r.push(n=[]);for(var a=this[i],c=-1,s=a.length;++c<s;)(t=a[c])&&to(t,c,e,u),n.push(t)}return Ki(r,e)},pa.interrupt=function(){return this.each(T)},Zo.select=function(n){var t=["string"==typeof n?la(n,$o):n];return t.parentNode=Bo,p([t])},Zo.selectAll=function(n){var t=Xo("string"==typeof n?fa(n,$o):n);return t.parentNode=Bo,p([t])};var ma=Zo.select(Bo);pa.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(q(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(q(n,t,e))};var ya=Zo.map({mouseenter:"mouseover",mouseleave:"mouseout"});ya.forEach(function(n){"on"+n in $o&&ya.remove(n)});var xa=a(Bo.style,"userSelect"),Ma=0;Zo.mouse=function(n){return P(n,h())};var _a=/WebKit/.test(Wo.navigator.userAgent)?-1:0;Zo.touches=function(n,t){return arguments.length<2&&(t=h().touches),t?Xo(t).map(function(t){var e=P(n,t);return e.identifier=t.identifier,e}):[]},Zo.behavior.drag=function(){function n(){this.on("mousedown.drag",o).on("touchstart.drag",a)}function t(){return Zo.event.changedTouches[0].identifier}function e(n,t){return Zo.touches(n).filter(function(n){return n.identifier===t})[0]}function r(n,t,e,r){return function(){function o(){var n=t(l,g),e=n[0]-v[0],r=n[1]-v[1];d|=e|r,v=n,f({type:"drag",x:n[0]+c[0],y:n[1]+c[1],dx:e,dy:r})}function a(){m.on(e+"."+p,null).on(r+"."+p,null),y(d&&Zo.event.target===h),f({type:"dragend"})}var c,s=this,l=s.parentNode,f=u.of(s,arguments),h=Zo.event.target,g=n(),p=null==g?"drag":"drag-"+g,v=t(l,g),d=0,m=Zo.select(Wo).on(e+"."+p,o).on(r+"."+p,a),y=D();i?(c=i.apply(s,arguments),c=[c.x-v[0],c.y-v[1]]):c=[0,0],f({type:"dragstart"})}}var u=g(n,"drag","dragstart","dragend"),i=null,o=r(c,Zo.mouse,"mousemove","mouseup"),a=r(t,e,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},Zo.rebind(n,u,"on")};var ba=Math.PI,wa=2*ba,Sa=ba/2,ka=1e-6,Ea=ka*ka,Aa=ba/180,Ca=180/ba,Na=Math.SQRT2,La=2,Ta=4;Zo.interpolateZoom=function(n,t){function e(n){var t=n*y;if(m){var e=O(v),o=i/(La*h)*(e*Y(Na*t+v)-F(v));return[r+o*s,u+o*l,i*e/O(Na*t+v)]}return[r+n*s,u+n*l,i*Math.exp(Na*t)]}var r=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],s=o-r,l=a-u,f=s*s+l*l,h=Math.sqrt(f),g=(c*c-i*i+Ta*f)/(2*i*La*h),p=(c*c-i*i-Ta*f)/(2*c*La*h),v=Math.log(Math.sqrt(g*g+1)-g),d=Math.log(Math.sqrt(p*p+1)-p),m=d-v,y=(m||Math.log(c/i))/Na;return e.duration=1e3*y,e},Zo.behavior.zoom=function(){function n(n){n.on(A,s).on(Ra+".zoom",h).on(C,p).on("dblclick.zoom",v).on(L,l)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function e(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function r(n){S.k=Math.max(E[0],Math.min(E[1],n))}function u(n,t){t=e(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){_&&_.domain(M.range().map(function(n){return(n-S.x)/S.k}).map(M.invert)),w&&w.domain(b.range().map(function(n){return(n-S.y)/S.k}).map(b.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function s(){function n(){l=1,u(Zo.mouse(r),h),a(i)}function e(){f.on(C,Wo===r?p:null).on(N,null),g(l&&Zo.event.target===s),c(i)}var r=this,i=q.of(r,arguments),s=Zo.event.target,l=0,f=Zo.select(Wo).on(C,n).on(N,e),h=t(Zo.mouse(r)),g=D();T.call(r),o(i)}function l(){function n(){var n=Zo.touches(p);return g=S.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=t(n))}),n}function e(){for(var t=Zo.event.changedTouches,e=0,i=t.length;i>e;++e)d[t[e].identifier]=null;var o=n(),c=Date.now();if(1===o.length){if(500>c-x){var s=o[0],l=d[s.identifier];r(2*S.k),u(s,l),f(),a(v)}x=c}else if(o.length>1){var s=o[0],h=o[1],g=s[0]-h[0],p=s[1]-h[1];m=g*g+p*p}}function i(){for(var n,t,e,i,o=Zo.touches(p),c=0,s=o.length;s>c;++c,i=null)if(e=o[c],i=d[e.identifier]){if(t)break;n=e,t=i}if(i){var l=(l=e[0]-n[0])*l+(l=e[1]-n[1])*l,f=m&&Math.sqrt(l/m);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],r(f*g)}x=null,u(n,t),a(v)}function h(){if(Zo.event.touches.length){for(var t=Zo.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var u in d)return void n()}b.on(M,null).on(_,null),w.on(A,s).on(L,l),k(),c(v)}var g,p=this,v=q.of(p,arguments),d={},m=0,y=Zo.event.changedTouches[0].identifier,M="touchmove.zoom-"+y,_="touchend.zoom-"+y,b=Zo.select(Wo).on(M,i).on(_,h),w=Zo.select(p).on(A,null).on(L,e),k=D();T.call(p),e(),o(v)}function h(){var n=q.of(this,arguments);y?clearTimeout(y):(T.call(this),o(n)),y=setTimeout(function(){y=null,c(n)},50),f();var e=m||Zo.mouse(this);d||(d=t(e)),r(Math.pow(2,.002*qa())*S.k),u(e,d),a(n)}function p(){d=null}function v(){var n=q.of(this,arguments),e=Zo.mouse(this),i=t(e),s=Math.log(S.k)/Math.LN2;o(n),r(Math.pow(2,Zo.event.shiftKey?Math.ceil(s)-1:Math.floor(s)+1)),u(e,i),a(n),c(n)}var d,m,y,x,M,_,b,w,S={x:0,y:0,k:1},k=[960,500],E=za,A="mousedown.zoom",C="mousemove.zoom",N="mouseup.zoom",L="touchstart.zoom",q=g(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=q.of(this,arguments),t=S;Ms?Zo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var e=k[0],r=k[1],u=e/2,i=r/2,o=Zo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,e/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,e/t.k]);return function(t){var r=o(t),c=e/r[2];this.__chart__=S={x:u-r[0]*c,y:i-r[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(E=null==t?za:[+t[0],+t[1]],n):E},n.center=function(t){return arguments.length?(m=t&&[+t[0],+t[1]],n):m},n.size=function(t){return arguments.length?(k=t&&[+t[0],+t[1]],n):k},n.x=function(t){return arguments.length?(_=t,M=t.copy(),S={x:0,y:0,k:1},n):_},n.y=function(t){return arguments.length?(w=t,b=t.copy(),S={x:0,y:0,k:1},n):w},Zo.rebind(n,q,"on")};var qa,za=[0,1/0],Ra="onwheel"in $o?(qa=function(){return-Zo.event.deltaY*(Zo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in $o?(qa=function(){return Zo.event.wheelDelta},"mousewheel"):(qa=function(){return-Zo.event.detail},"MozMousePixelScroll");Z.prototype.toString=function(){return this.rgb()+""},Zo.hsl=function(n,t,e){return 1===arguments.length?n instanceof X?V(n.h,n.s,n.l):st(""+n,lt,V):V(+n,+t,+e)};var Da=X.prototype=new Z;Da.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,this.l/n)},Da.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,n*this.l)},Da.rgb=function(){return $(this.h,this.s,this.l)},Zo.hcl=function(n,t,e){return 1===arguments.length?n instanceof W?B(n.h,n.c,n.l):n instanceof K?nt(n.l,n.a,n.b):nt((n=ft((n=Zo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):B(+n,+t,+e)};var Pa=W.prototype=new Z;Pa.brighter=function(n){return B(this.h,this.c,Math.min(100,this.l+Ua*(arguments.length?n:1)))},Pa.darker=function(n){return B(this.h,this.c,Math.max(0,this.l-Ua*(arguments.length?n:1)))},Pa.rgb=function(){return J(this.h,this.c,this.l).rgb()},Zo.lab=function(n,t,e){return 1===arguments.length?n instanceof K?G(n.l,n.a,n.b):n instanceof W?J(n.l,n.c,n.h):ft((n=Zo.rgb(n)).r,n.g,n.b):G(+n,+t,+e)};var Ua=18,ja=.95047,Ha=1,Fa=1.08883,Oa=K.prototype=new Z;Oa.brighter=function(n){return G(Math.min(100,this.l+Ua*(arguments.length?n:1)),this.a,this.b)},Oa.darker=function(n){return G(Math.max(0,this.l-Ua*(arguments.length?n:1)),this.a,this.b)},Oa.rgb=function(){return Q(this.l,this.a,this.b)},Zo.rgb=function(n,t,e){return 1===arguments.length?n instanceof at?ot(n.r,n.g,n.b):st(""+n,ot,$):ot(~~n,~~t,~~e)};var Ya=at.prototype=new Z;Ya.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),ot(Math.min(255,~~(t/n)),Math.min(255,~~(e/n)),Math.min(255,~~(r/n)))):ot(u,u,u)},Ya.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),ot(~~(n*this.r),~~(n*this.g),~~(n*this.b))},Ya.hsl=function(){return lt(this.r,this.g,this.b)},Ya.toString=function(){return"#"+ct(this.r)+ct(this.g)+ct(this.b)};var Ia=Zo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});Ia.forEach(function(n,t){Ia.set(n,ut(t))}),Zo.functor=pt,Zo.xhr=dt(vt),Zo.dsv=function(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var o=Zo.xhr(n,t,i);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:u(n)):e},o.row(e)}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function o(t){return t.map(a).join(n)}function a(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=new RegExp('["'+n+"\n]"),s=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(l>=c)return o;if(u)return u=!1,i;var t=l;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}l=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,10===n.charCodeAt(e+2)&&++l):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>l;){var r=n.charCodeAt(l++),a=1;if(10===r)u=!0;else if(13===r)u=!0,10===n.charCodeAt(l)&&(++l,++a);else if(r!==s)continue;return n.substring(t,l-a)}return n.substring(t)}for(var r,u,i={},o={},a=[],c=n.length,l=0,f=0;(r=e())!==o;){for(var h=[];r!==i&&r!==o;)h.push(r),r=e();(!t||(h=t(h,f++)))&&a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new i,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(a).join(n)].concat(t.map(function(t){return u.map(function(n){return a(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(o).join("\n")},e},Zo.csv=Zo.dsv(",","text/csv"),Zo.tsv=Zo.dsv("	","text/tab-separated-values");var Za,Va,Xa,$a,Ba,Wa=Wo[a(Wo,"requestAnimationFrame")]||function(n){setTimeout(n,17)};Zo.timer=function(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var u=e+t,i={c:n,t:u,f:!1,n:null};Va?Va.n=i:Za=i,Va=i,Xa||($a=clearTimeout($a),Xa=1,Wa(xt))},Zo.timer.flush=function(){Mt(),_t()};var Ja=".",Ga=",",Ka=[3,3],Qa="$",nc=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(bt);Zo.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=Zo.round(n,wt(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((0>=e?e+1:e-1)/3)))),nc[8+e/3]},Zo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},Zo.format=function(n){var t=tc.exec(n),e=t[1]||" ",r=t[2]||">",u=t[3]||"",i=t[4]||"",o=t[5],a=+t[6],c=t[7],s=t[8],l=t[9],f=1,h="",g=!1;switch(s&&(s=+s.substring(1)),(o||"0"===e&&"="===r)&&(o=e="0",r="=",c&&(a-=Math.floor((a-1)/4))),l){case"n":c=!0,l="g";break;case"%":f=100,h="%",l="f";break;case"p":f=100,h="%",l="r";break;case"b":case"o":case"x":case"X":"#"===i&&(i="0"+l.toLowerCase());case"c":case"d":g=!0,s=0;break;case"s":f=-1,l="r"}"#"===i?i="":"$"===i&&(i=Qa),"r"!=l||s||(l="g"),null!=s&&("g"==l?s=Math.max(1,Math.min(21,s)):("e"==l||"f"==l)&&(s=Math.max(0,Math.min(20,s)))),l=ec.get(l)||St;var p=o&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):u;if(0>f){var v=Zo.formatPrefix(n,s);n=v.scale(n),h=v.symbol}else n*=f;n=l(n,s);var d=n.lastIndexOf("."),m=0>d?n:n.substring(0,d),y=0>d?"":Ja+n.substring(d+1);!o&&c&&(m=rc(m));var x=i.length+m.length+y.length+(p?0:t.length),M=a>x?new Array(x=a-x+1).join(e):"";return p&&(m=rc(M+m)),t+=i,n=m+y,("<"===r?t+n+M:">"===r?M+t+n:"^"===r?M.substring(0,x>>=1)+t+n+M.substring(x):t+(p?n:M+n))+h}};var tc=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,ec=Zo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=Zo.round(n,wt(n,t))).toFixed(Math.max(0,Math.min(20,wt(n*(1+1e-15),t))))}}),rc=vt;if(Ka){var uc=Ka.length;rc=function(n){for(var t=n.length,e=[],r=0,u=Ka[0];t>0&&u>0;)e.push(n.substring(t-=u,t+u)),u=Ka[r=(r+1)%uc];return e.reverse().join(Ga)}}Zo.geo={},kt.prototype={s:0,t:0,add:function(n){Et(n,this.t,ic),Et(ic.s,this.s,this),this.s?this.t+=ic.t:this.s=ic.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ic=new kt;Zo.geo.stream=function(n,t){n&&oc.hasOwnProperty(n.type)?oc[n.type](n,t):At(n,t)};var oc={Feature:function(n,t){At(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)At(e[r].geometry,t)}},ac={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){Ct(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Ct(e[r],t,0)},Polygon:function(n,t){Nt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Nt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)At(e[r],t)}};Zo.geo.area=function(n){return cc=0,Zo.geo.stream(n,lc),cc};var cc,sc=new kt,lc={sphere:function(){cc+=4*ba},point:c,lineStart:c,lineEnd:c,polygonStart:function(){sc.reset(),lc.lineStart=Lt},polygonEnd:function(){var n=2*sc;cc+=0>n?4*ba+n:n,lc.lineStart=lc.lineEnd=lc.point=c}};Zo.geo.bounds=function(){function n(n,t){x.push(M=[l=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,e){var r=Tt([t*Aa,e*Aa]);if(m){var u=zt(m,r),i=[u[1],-u[0],0],o=zt(i,u);Pt(o),o=Ut(o);var c=t-p,s=c>0?1:-1,v=o[0]*Ca*s,d=ua(c)>180;if(d^(v>s*p&&s*t>v)){var y=o[1]*Ca;y>g&&(g=y)}else if(v=(v+360)%360-180,d^(v>s*p&&s*t>v)){var y=-o[1]*Ca;f>y&&(f=y)}else f>e&&(f=e),e>g&&(g=e);d?p>t?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t):h>=l?(l>t&&(l=t),t>h&&(h=t)):t>p?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t)}else n(t,e);m=r,p=t}function e(){_.point=t}function r(){M[0]=l,M[1]=h,_.point=n,m=null}function u(n,e){if(m){var r=n-p;y+=ua(r)>180?r+(r>0?360:-360):r}else v=n,d=e;lc.point(n,e),t(n,e)}function i(){lc.lineStart()}function o(){u(v,d),lc.lineEnd(),ua(y)>ka&&(l=-(h=180)),M[0]=l,M[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function s(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var l,f,h,g,p,v,d,m,y,x,M,_={point:n,lineStart:e,lineEnd:r,polygonStart:function(){_.point=u,_.lineStart=i,_.lineEnd=o,y=0,lc.polygonStart()},polygonEnd:function(){lc.polygonEnd(),_.point=n,_.lineStart=e,_.lineEnd=r,0>sc?(l=-(h=180),f=-(g=90)):y>ka?g=90:-ka>y&&(f=-90),M[0]=l,M[1]=h}};return function(n){g=h=-(l=f=1/0),x=[],Zo.geo.stream(n,_);var t=x.length;if(t){x.sort(c);for(var e,r=1,u=x[0],i=[u];t>r;++r)e=x[r],s(e[0],u)||s(e[1],u)?(a(u[0],e[1])>a(u[0],u[1])&&(u[1]=e[1]),a(e[0],u[1])>a(u[0],u[1])&&(u[0]=e[0])):i.push(u=e);for(var o,e,p=-1/0,t=i.length-1,r=0,u=i[t];t>=r;u=e,++r)e=i[r],(o=a(u[1],e[0]))>p&&(p=o,l=e[0],h=u[1])}return x=M=null,1/0===l||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[l,f],[h,g]]}}(),Zo.geo.centroid=function(n){fc=hc=gc=pc=vc=dc=mc=yc=xc=Mc=_c=0,Zo.geo.stream(n,bc);var t=xc,e=Mc,r=_c,u=t*t+e*e+r*r;return Ea>u&&(t=dc,e=mc,r=yc,ka>hc&&(t=gc,e=pc,r=vc),u=t*t+e*e+r*r,Ea>u)?[0/0,0/0]:[Math.atan2(e,t)*Ca,H(r/Math.sqrt(u))*Ca]};var fc,hc,gc,pc,vc,dc,mc,yc,xc,Mc,_c,bc={sphere:c,point:Ht,lineStart:Ot,lineEnd:Yt,polygonStart:function(){bc.lineStart=It},polygonEnd:function(){bc.lineStart=Ot}},wc=Bt(Zt,Qt,te,[-ba,-ba/2]),Sc=1e9;Zo.geo.clipExtent=function(){var n,t,e,r,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=ue(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(Zo.geo.conicEqualArea=function(){return oe(ae)}).raw=ae,Zo.geo.albers=function(){return Zo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},Zo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,e(i,o),t||(r(i,o),t)||u(i,o),t}var t,e,r,u,i=Zo.geo.albers(),o=Zo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=Zo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=i.scale(),e=i.translate(),r=(n[0]-e[0])/t,u=(n[1]-e[1])/t;return(u>=.12&&.234>u&&r>=-.425&&-.214>r?o:u>=.166&&.234>u&&r>=-.214&&-.115>r?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,u){t.point(n,u),e.point(n,u),r.point(n,u)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var s=i.scale(),l=+t[0],f=+t[1];return e=i.translate(t).clipExtent([[l-.455*s,f-.238*s],[l+.455*s,f+.238*s]]).stream(c).point,r=o.translate([l-.307*s,f+.201*s]).clipExtent([[l-.425*s+ka,f+.12*s+ka],[l-.214*s-ka,f+.234*s-ka]]).stream(c).point,u=a.translate([l-.205*s,f+.212*s]).clipExtent([[l-.214*s+ka,f+.166*s+ka],[l-.115*s-ka,f+.234*s-ka]]).stream(c).point,n},n.scale(1070)};var kc,Ec,Ac,Cc,Nc,Lc,Tc={point:c,lineStart:c,lineEnd:c,polygonStart:function(){Ec=0,Tc.lineStart=ce},polygonEnd:function(){Tc.lineStart=Tc.lineEnd=Tc.point=c,kc+=ua(Ec/2)}},qc={point:se,lineStart:c,lineEnd:c,polygonStart:c,polygonEnd:c},zc={point:he,lineStart:ge,lineEnd:pe,polygonStart:function(){zc.lineStart=ve},polygonEnd:function(){zc.point=he,zc.lineStart=ge,zc.lineEnd=pe}};Zo.geo.transform=function(n){return{stream:function(t){var e=new ye(t);for(var r in n)e[r]=n[r];return e}}},ye.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},Zo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),Zo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var e,r,u,i,o,a=4.5;return n.area=function(n){return kc=0,Zo.geo.stream(n,u(Tc)),kc},n.centroid=function(n){return gc=pc=vc=dc=mc=yc=xc=Mc=_c=0,Zo.geo.stream(n,u(zc)),_c?[xc/_c,Mc/_c]:yc?[dc/yc,mc/yc]:vc?[gc/vc,pc/vc]:[0/0,0/0]},n.bounds=function(n){return Nc=Lc=-(Ac=Cc=1/0),Zo.geo.stream(n,u(qc)),[[Ac,Cc],[Nc,Lc]]},n.projection=function(n){return arguments.length?(u=(e=n)?n.stream||xe(n):vt,t()):e},n.context=function(n){return arguments.length?(i=null==(r=n)?new le:new de(n),"function"!=typeof a&&i.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(Zo.geo.albersUsa()).context(null)},Zo.geo.projection=Me,Zo.geo.projectionMutator=_e,(Zo.geo.equirectangular=function(){return Me(we)}).raw=we.invert=we,Zo.geo.rotation=function(n){function t(t){return t=n(t[0]*Aa,t[1]*Aa),t[0]*=Ca,t[1]*=Ca,t
}return n=ke(n[0]%360*Aa,n[1]*Aa,n.length>2?n[2]*Aa:0),t.invert=function(t){return t=n.invert(t[0]*Aa,t[1]*Aa),t[0]*=Ca,t[1]*=Ca,t},t},Se.invert=we,Zo.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=ke(-n[0]*Aa,-n[1]*Aa,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=Ca,n[1]*=Ca}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=Ne((t=+r)*Aa,u*Aa),n):t},n.precision=function(r){return arguments.length?(e=Ne(t*Aa,(u=+r)*Aa),n):u},n.angle(90)},Zo.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Aa,u=n[1]*Aa,i=t[1]*Aa,o=Math.sin(r),a=Math.cos(r),c=Math.sin(u),s=Math.cos(u),l=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((e=f*o)*e+(e=s*l-c*f*a)*e),c*l+s*f*a)},Zo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return Zo.range(Math.ceil(i/d)*d,u,d).map(h).concat(Zo.range(Math.ceil(s/m)*m,c,m).map(g)).concat(Zo.range(Math.ceil(r/p)*p,e,p).filter(function(n){return ua(n%d)>ka}).map(l)).concat(Zo.range(Math.ceil(a/v)*v,o,v).filter(function(n){return ua(n%m)>ka}).map(f))}var e,r,u,i,o,a,c,s,l,f,h,g,p=10,v=p,d=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(s).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],s=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),s>c&&(t=s,s=c,c=t),n.precision(y)):[[i,s],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],m=+t[1],n):[d,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],v=+t[1],n):[p,v]},n.precision=function(t){return arguments.length?(y=+t,l=Te(a,o,90),f=qe(r,e,y),h=Te(s,c,90),g=qe(i,u,y),n):y},n.majorExtent([[-180,-90+ka],[180,90-ka]]).minorExtent([[-180,-80-ka],[180,80+ka]])},Zo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=ze,u=Re;return n.distance=function(){return Zo.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},Zo.geo.interpolate=function(n,t){return De(n[0]*Aa,n[1]*Aa,t[0]*Aa,t[1]*Aa)},Zo.geo.length=function(n){return Rc=0,Zo.geo.stream(n,Dc),Rc};var Rc,Dc={sphere:c,point:c,lineStart:Pe,lineEnd:c,polygonStart:c,polygonEnd:c},Pc=Ue(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(Zo.geo.azimuthalEqualArea=function(){return Me(Pc)}).raw=Pc;var Uc=Ue(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},vt);(Zo.geo.azimuthalEquidistant=function(){return Me(Uc)}).raw=Uc,(Zo.geo.conicConformal=function(){return oe(je)}).raw=je,(Zo.geo.conicEquidistant=function(){return oe(He)}).raw=He;var jc=Ue(function(n){return 1/n},Math.atan);(Zo.geo.gnomonic=function(){return Me(jc)}).raw=jc,Fe.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Sa]},(Zo.geo.mercator=function(){return Oe(Fe)}).raw=Fe;var Hc=Ue(function(){return 1},Math.asin);(Zo.geo.orthographic=function(){return Me(Hc)}).raw=Hc;var Fc=Ue(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(Zo.geo.stereographic=function(){return Me(Fc)}).raw=Fc,Ye.invert=function(n,t){return[Math.atan2(F(n),Math.cos(t)),H(Math.sin(t)/O(n))]},(Zo.geo.transverseMercator=function(){return Oe(Ye)}).raw=Ye,Zo.geom={},Zo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u,i,o,a,c,s,l,f,h,g,p,v=pt(e),d=pt(r),m=n.length,y=m-1,x=[],M=[],_=0;if(v===Ie&&r===Ze)t=n;else for(i=0,t=[];m>i;++i)t.push([+v.call(this,u=n[i],i),+d.call(this,u,i)]);for(i=1;m>i;++i)(t[i][1]<t[_][1]||t[i][1]==t[_][1]&&t[i][0]<t[_][0])&&(_=i);for(i=0;m>i;++i)i!==_&&(c=t[i][1]-t[_][1],a=t[i][0]-t[_][0],x.push({angle:Math.atan2(c,a),index:i}));for(x.sort(function(n,t){return n.angle-t.angle}),g=x[0].angle,h=x[0].index,f=0,i=1;y>i;++i){if(o=x[i].index,g==x[i].angle){if(a=t[h][0]-t[_][0],c=t[h][1]-t[_][1],s=t[o][0]-t[_][0],l=t[o][1]-t[_][1],a*a+c*c>=s*s+l*l){x[i].index=-1;continue}x[f].index=-1}g=x[i].angle,f=i,h=o}for(M.push(_),i=0,o=0;2>i;++o)x[o].index>-1&&(M.push(x[o].index),i++);for(p=M.length;y>o;++o)if(!(x[o].index<0)){for(;!Ve(M[p-2],M[p-1],x[o].index,t);)--p;M[p++]=x[o].index}var b=[];for(i=p-1;i>=0;--i)b.push(n[M[i]]);return b}var e=Ie,r=Ze;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},Zo.geom.polygon=function(n){return sa(n,Oc),n};var Oc=Zo.geom.polygon.prototype=[];Oc.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],u=0;++t<e;)n=r,r=this[t],u+=n[1]*r[0]-n[0]*r[1];return.5*u},Oc.centroid=function(n){var t,e,r=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++r<u;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[i*n,o*n]},Oc.clip=function(n){for(var t,e,r,u,i,o,a=Be(n),c=-1,s=this.length-Be(this),l=this[s-1];++c<s;){for(t=n.slice(),n.length=0,u=this[c],i=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Xe(o,l,u)?(Xe(i,l,u)||n.push($e(i,o,l,u)),n.push(o)):Xe(i,l,u)&&n.push($e(i,o,l,u)),i=o;a&&n.push(n[0]),l=u}return n};var Yc,Ic,Zc,Vc,Xc,$c=[],Bc=[];er.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(ur),t.length},pr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},vr.prototype={insert:function(n,t){var e,r,u;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=xr(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(u=r.R,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.R&&(mr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,yr(this,r))):(u=r.L,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.L&&(yr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,mr(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,u=n.U,i=n.L,o=n.R;if(e=i?o?xr(o):i:o,u?u.L===n?u.L=e:u.R=e:this._=e,i&&o?(r=e.C,e.C=n.C,e.L=i,i.U=e,e!==o?(u=e.U,e.U=n.U,n=e.R,u.L=n,e.R=o,o.U=e):(e.U=u,u=e,n=e.R)):(r=n.C,n=e),n&&(n.U=u),!r){if(n&&n.C)return n.C=!1,void 0;do{if(n===this._)break;if(n===u.L){if(t=u.R,t.C&&(t.C=!1,u.C=!0,mr(this,u),t=u.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,yr(this,t),t=u.R),t.C=u.C,u.C=t.R.C=!1,mr(this,u),n=this._;break}}else if(t=u.L,t.C&&(t.C=!1,u.C=!0,yr(this,u),t=u.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,mr(this,t),t=u.L),t.C=u.C,u.C=t.L.C=!1,yr(this,u),n=this._;break}t.C=!0,n=u,u=u.U}while(!n.C);n&&(n.C=!1)}}},Zo.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],u=a[0][1],i=a[1][0],o=a[1][1];return Mr(e(n),a).cells.forEach(function(e,a){var c=e.edges,s=e.site,l=t[a]=c.length?c.map(function(n){var t=n.start();return[t.x,t.y]}):s.x>=r&&s.x<=i&&s.y>=u&&s.y<=o?[[r,o],[i,o],[i,u],[r,u]]:[];l.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(i(n,t)/ka)*ka,y:Math.round(o(n,t)/ka)*ka,i:t}})}var r=Ie,u=Ze,i=r,o=u,a=Wc;return n?t(n):(t.links=function(n){return Mr(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return Mr(e(n)).cells.forEach(function(e,r){for(var u,i,o=e.site,a=e.edges.sort(ur),c=-1,s=a.length,l=a[s-1].edge,f=l.l===o?l.r:l.l;++c<s;)u=l,i=f,l=a[c].edge,f=l.l===o?l.r:l.l,r<i.i&&r<f.i&&br(o,i,f)<0&&t.push([n[r],n[i.i],n[f.i]])}),t},t.x=function(n){return arguments.length?(i=pt(r=n),t):r},t.y=function(n){return arguments.length?(o=pt(u=n),t):u},t.clipExtent=function(n){return arguments.length?(a=null==n?Wc:n,t):a===Wc?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===Wc?null:a&&a[1]},t)};var Wc=[[-1e6,-1e6],[1e6,1e6]];Zo.geom.delaunay=function(n){return Zo.geom.voronoi().triangles(n)},Zo.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,l=n.y;if(null!=c)if(ua(c-e)+ua(l-r)<.01)s(n,t,e,r,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,s(n,f,c,l,u,i,o,a),s(n,t,e,r,u,i,o,a)}else n.x=e,n.y=r,n.point=t}else s(n,t,e,r,u,i,o,a)}function s(n,t,e,r,u,o,a,c){var s=.5*(u+a),l=.5*(o+c),f=e>=s,h=r>=l,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=kr()),f?u=s:a=s,h?o=l:c=l,i(n,t,e,r,u,o,a,c)}var l,f,h,g,p,v,d,m,y,x=pt(a),M=pt(c);if(null!=t)v=t,d=e,m=r,y=u;else if(m=y=-(v=d=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)l=n[g],l.x<v&&(v=l.x),l.y<d&&(d=l.y),l.x>m&&(m=l.x),l.y>y&&(y=l.y),f.push(l.x),h.push(l.y);else for(g=0;p>g;++g){var _=+x(l=n[g],g),b=+M(l,g);v>_&&(v=_),d>b&&(d=b),_>m&&(m=_),b>y&&(y=b),f.push(_),h.push(b)}var w=m-v,S=y-d;w>S?y=d+w:m=v+S;var k=kr();if(k.add=function(n){i(k,n,+x(n,++g),+M(n,g),v,d,m,y)},k.visit=function(n){Er(n,k,v,d,m,y)},g=-1,null==t){for(;++g<p;)i(k,n[g],f[g],h[g],v,d,m,y);--g}else n.forEach(k.add);return f=h=n=l=null,k}var o,a=Ie,c=Ze;return(o=arguments.length)?(a=wr,c=Sr,3===o&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,e],[r,u]]},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r-t,u-e]},i)},Zo.interpolateRgb=Ar,Zo.interpolateObject=Cr,Zo.interpolateNumber=Nr,Zo.interpolateString=Lr;var Jc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;Zo.interpolate=Tr,Zo.interpolators=[function(n,t){var e=typeof t;return("string"===e?Ia.has(t)||/^(#|rgb\(|hsl\()/.test(t)?Ar:Lr:t instanceof Z?Ar:"object"===e?Array.isArray(t)?qr:Cr:Nr)(n,t)}],Zo.interpolateArray=qr;var Gc=function(){return vt},Kc=Zo.map({linear:Gc,poly:Hr,quad:function(){return Pr},cubic:function(){return Ur},sin:function(){return Fr},exp:function(){return Or},circle:function(){return Yr},elastic:Ir,back:Zr,bounce:function(){return Vr}}),Qc=Zo.map({"in":vt,out:Rr,"in-out":Dr,"out-in":function(n){return Dr(Rr(n))}});Zo.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=Kc.get(e)||Gc,r=Qc.get(r)||vt,zr(r(e.apply(null,Vo.call(arguments,1))))},Zo.interpolateHcl=Xr,Zo.interpolateHsl=$r,Zo.interpolateLab=Br,Zo.interpolateRound=Wr,Zo.transform=function(n){var t=$o.createElementNS(Zo.ns.prefix.svg,"g");return(Zo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new Jr(e?e.matrix:ns)})(n)},Jr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var ns={a:1,b:0,c:0,d:1,e:0,f:0};Zo.interpolateTransform=nu,Zo.layout={},Zo.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(ru(n[e]));return t}},Zo.layout.chord=function(){function n(){var n,s,f,h,g,p={},v=[],d=Zo.range(i),m=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(s=0,g=-1;++g<i;)s+=u[h][g];v.push(s),m.push(Zo.range(i)),n+=s}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&m.forEach(function(n,t){n.sort(function(n,e){return a(u[t][n],u[t][e])})}),n=(wa-l*i)/n,s=0,h=-1;++h<i;){for(f=s,g=-1;++g<i;){var y=d[h],x=m[y][g],M=u[y][x],_=s,b=s+=M*n;p[y+"-"+x]={index:y,subindex:x,startAngle:_,endAngle:b,value:M}}r[y]={index:y,startAngle:f,endAngle:s,value:(s-f)/n},s+=l}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,o,a,c,s={},l=0;return s.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,s):u},s.padding=function(n){return arguments.length?(l=n,e=r=null,s):l},s.sortGroups=function(n){return arguments.length?(o=n,e=r=null,s):o},s.sortSubgroups=function(n){return arguments.length?(a=n,e=null,s):a},s.sortChords=function(n){return arguments.length?(c=n,e&&t(),s):c},s.chords=function(){return e||n(),e},s.groups=function(){return r||n(),r},s},Zo.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=1/Math.sqrt(i*i+o*o);if(v>(u-e)*a){var c=t.charge*a*a;return n.px-=i*c,n.py-=o*c,!0}if(t.point&&isFinite(a)){var c=t.pointCharge*a*a;n.px-=i*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=Zo.event.x,n.py=Zo.event.y,a.resume()}var e,r,u,i,o,a={},c=Zo.dispatch("start","tick","end"),s=[1,1],l=.9,f=ts,h=es,g=-30,p=.1,v=.8,d=[],m=[];return a.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,a,f,h,v,y,x,M,_=d.length,b=m.length;for(e=0;b>e;++e)a=m[e],f=a.source,h=a.target,x=h.x-f.x,M=h.y-f.y,(v=x*x+M*M)&&(v=r*i[e]*((v=Math.sqrt(v))-u[e])/v,x*=v,M*=v,h.x-=x*(y=f.weight/(h.weight+f.weight)),h.y-=M*y,f.x+=x*(y=1-y),f.y+=M*y);if((y=r*p)&&(x=s[0]/2,M=s[1]/2,e=-1,y))for(;++e<_;)a=d[e],a.x+=(x-a.x)*y,a.y+=(M-a.y)*y;if(g)for(lu(t=Zo.geom.quadtree(d),r,o),e=-1;++e<_;)(a=d[e]).fixed||t.visit(n(a));for(e=-1;++e<_;)a=d[e],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*l,a.y-=(a.py-(a.py=a.y))*l);c.tick({type:"tick",alpha:r})},a.nodes=function(n){return arguments.length?(d=n,a):d},a.links=function(n){return arguments.length?(m=n,a):m},a.size=function(n){return arguments.length?(s=n,a):s},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(l=+n,a):l},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.gravity=function(n){return arguments.length?(p=+n,a):p},a.theta=function(n){return arguments.length?(v=+n,a):v},a.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),Zo.timer(a.tick)),a):r},a.start=function(){function n(n,r){if(!e){for(e=new Array(c),a=0;c>a;++a)e[a]=[];for(a=0;s>a;++a){var u=m[a];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var i,o=e[t],a=-1,s=o.length;++a<s;)if(!isNaN(i=o[a][n]))return i;return Math.random()*r}var t,e,r,c=d.length,l=m.length,p=s[0],v=s[1];for(t=0;c>t;++t)(r=d[t]).index=t,r.weight=0;for(t=0;l>t;++t)r=m[t],"number"==typeof r.source&&(r.source=d[r.source]),"number"==typeof r.target&&(r.target=d[r.target]),++r.source.weight,++r.target.weight;for(t=0;c>t;++t)r=d[t],isNaN(r.x)&&(r.x=n("x",p)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof f)for(t=0;l>t;++t)u[t]=+f.call(this,m[t],t);else for(t=0;l>t;++t)u[t]=f;if(i=[],"function"==typeof h)for(t=0;l>t;++t)i[t]=+h.call(this,m[t],t);else for(t=0;l>t;++t)i[t]=h;if(o=[],"function"==typeof g)for(t=0;c>t;++t)o[t]=+g.call(this,d[t],t);else for(t=0;c>t;++t)o[t]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return e||(e=Zo.behavior.drag().origin(vt).on("dragstart.force",ou).on("drag.force",t).on("dragend.force",au)),arguments.length?(this.on("mouseover.force",cu).on("mouseout.force",su).call(e),void 0):e},Zo.rebind(a,c,"on")};var ts=20,es=1;Zo.layout.hierarchy=function(){function n(t,o,a){var c=u.call(e,t,o);if(t.depth=o,a.push(t),c&&(s=c.length)){for(var s,l,f=-1,h=t.children=new Array(s),g=0,p=o+1;++f<s;)l=h[f]=n(c[f],p,a),l.parent=t,g+=l.value;r&&h.sort(r),i&&(t.value=g)}else delete t.children,i&&(t.value=+i.call(e,t,o)||0);return t}function t(n,r){var u=n.children,o=0;if(u&&(a=u.length))for(var a,c=-1,s=r+1;++c<a;)o+=t(u[c],s);else i&&(o=+i.call(e,n,r)||0);return i&&(n.value=o),o}function e(t){var e=[];return n(t,0,e),e}var r=pu,u=hu,i=gu;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},Zo.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(o=i.length)){var o,a,c,s=-1;for(r=t.value?r/t.value:0;++s<o;)n(a=i[s],e,c=a.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var o=r.call(this,e,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var r=Zo.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},fu(e,r)},Zo.layout.pie=function(){function n(i){var o=i.map(function(e,r){return+t.call(n,e,r)}),a=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/Zo.sum(o),s=Zo.range(i.length);null!=e&&s.sort(e===rs?function(n,t){return o[t]-o[n]}:function(n,t){return e(i[n],i[t])});var l=[];return s.forEach(function(n){var t;l[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),l}var t=Number,e=rs,r=0,u=wa;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var rs={};Zo.layout.stack=function(){function n(a,c){var s=a.map(function(e,r){return t.call(n,e,r)}),l=s.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),o.call(n,t,e)]})}),f=e.call(n,l,c);s=Zo.permute(s,f),l=Zo.permute(l,f);var h,g,p,v=r.call(n,l,c),d=s.length,m=s[0].length;for(g=0;m>g;++g)for(u.call(n,s[0][g],p=v[g],l[0][g][1]),h=1;d>h;++h)u.call(n,s[h][g],p+=l[h-1][g][1],l[h][g][1]);return a}var t=vt,e=xu,r=Mu,u=yu,i=du,o=mu;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:us.get(t)||xu,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:is.get(t)||Mu,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var us=Zo.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(_u),i=n.map(bu),o=Zo.range(r).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,s=[],l=[];for(t=0;r>t;++t)e=o[t],c>a?(a+=i[e],s.push(e)):(c+=i[e],l.push(e));return l.reverse().concat(s)},reverse:function(n){return Zo.range(n.length).reverse()},"default":xu}),is=Zo.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,o=[],a=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;i>e;++e)c[e]=(a-o[e])/2;return c},wiggle:function(n){var t,e,r,u,i,o,a,c,s,l=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=s=0,e=1;h>e;++e){for(t=0,u=0;l>t;++t)u+=n[t][e][1];for(t=0,i=0,a=f[e][0]-f[e-1][0];l>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;i+=o*n[t][e][1]}g[e]=c-=u?i/u*a:0,s>c&&(s=c)}for(e=0;h>e;++e)g[e]-=s;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,o=1/u,a=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=o}for(e=0;i>e;++e)a[e]=0;return a},zero:Mu});Zo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],s=n.map(e,this),l=r.call(this,s,i),f=u.call(this,l,s,i),i=-1,h=s.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=s[i],a>=l[0]&&a<=l[1]&&(o=c[Zo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,e=Number,r=Eu,u=Su;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=pt(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return ku(n,t)}:pt(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},Zo.layout.tree=function(){function n(n,i){function o(n,t){var r=n.children,u=n._tree;if(r&&(i=r.length)){for(var i,a,s,l=r[0],f=l,h=-1;++h<i;)s=r[h],o(s,a),f=c(s,a,f),a=s;Du(n);var g=.5*(l._tree.prelim+s._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function c(n,t,r){if(t){for(var u,i=n,o=n,a=t,c=n.parent.children[0],s=i._tree.mod,l=o._tree.mod,f=a._tree.mod,h=c._tree.mod;a=Nu(a),i=Cu(i),a&&i;)c=Cu(c),o=Nu(o),o._tree.ancestor=n,u=a._tree.prelim+f-i._tree.prelim-s+e(a,i),u>0&&(Pu(Uu(a,n,r),n,u),s+=u,l+=u),f+=a._tree.mod,s+=i._tree.mod,h+=c._tree.mod,l+=o._tree.mod;a&&!Nu(o)&&(o._tree.thread=a,o._tree.mod+=f-l),i&&!Cu(c)&&(c._tree.thread=i,c._tree.mod+=s-h,r=n)}return r}var s=t.call(this,n,i),l=s[0];Ru(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),o(l),a(l,-l._tree.prelim);var f=Lu(l,qu),h=Lu(l,Tu),g=Lu(l,zu),p=f.x-e(f,h)/2,v=h.x+e(h,f)/2,d=g.depth||1;return Ru(l,u?function(n){n.x*=r[0],n.y=n.depth*r[1],delete n._tree}:function(n){n.x=(n.x-p)/(v-p)*r[0],n.y=n.depth/d*r[1],delete n._tree}),s}var t=Zo.layout.hierarchy().sort(null).value(null),e=Au,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},fu(n,t)},Zo.layout.pack=function(){function n(n,i){var o=e.call(this,n,i),a=o[0],c=u[0],s=u[1],l=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,Ru(a,function(n){n.r=+l(n.value)}),Ru(a,Yu),r){var f=r*(t?1:Math.max(2*a.r/c,2*a.r/s))/2;Ru(a,function(n){n.r+=f}),Ru(a,Yu),Ru(a,function(n){n.r-=f})}return Vu(a,c/2,s/2,t?1:1/Math.max(2*a.r/c,2*a.r/s)),o}var t,e=Zo.layout.hierarchy().sort(ju),r=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},fu(n,e)},Zo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],s=0;Ru(c,function(n){var t=n.children;t&&t.length?(n.x=Bu(t),n.y=$u(t)):(n.x=o?s+=e(n,o):0,n.y=0,o=n)});var l=Wu(c),f=Ju(c),h=l.x-e(l,f)/2,g=f.x+e(f,l)/2;return Ru(c,u?function(n){n.x=(n.x-c.x)*r[0],n.y=(c.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(g-h)*r[0],n.y=(1-(c.y?n.y/c.y:1))*r[1]}),a}var t=Zo.layout.hierarchy().sort(null).value(null),e=Au,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},fu(n,t)},Zo.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var o,a,c,s=f(e),l=[],h=i.slice(),p=1/0,v="slice"===g?s.dx:"dice"===g?s.dy:"slice-dice"===g?1&e.depth?s.dy:s.dx:Math.min(s.dx,s.dy);for(n(h,s.dx*s.dy/e.value),l.area=0;(c=h.length)>0;)l.push(o=h[c-1]),l.area+=o.area,"squarify"!==g||(a=r(l,v))<=p?(h.pop(),p=a):(l.area-=l.pop().area,u(l,v,s,!1),v=Math.min(s.dx,s.dy),l.length=l.area=0,p=1/0);l.length&&(u(l,v,s,!0),l.length=l.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,o=f(t),a=r.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,o=n.length,a=e.x,s=e.y,l=t?c(n.area/t):0;if(t==e.dx){for((r||l>e.dy)&&(l=e.dy);++i<o;)u=n[i],u.x=a,u.y=s,u.dy=l,a+=u.dx=Math.min(e.x+e.dx-a,l?c(u.area/l):0);u.z=!0,u.dx+=e.x+e.dx-a,e.y+=l,e.dy-=l}else{for((r||l>e.dx)&&(l=e.dx);++i<o;)u=n[i],u.x=a,u.y=s,u.dx=l,s+=u.dy=Math.min(e.y+e.dy-s,l?c(u.area/l):0);u.z=!1,u.dy+=e.y+e.dy-s,e.x+=l,e.dx-=l}}function i(r){var u=o||a(r),i=u[0];return i.x=0,i.y=0,i.dx=s[0],i.dy=s[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?e:t)(i),h&&(o=u),u}var o,a=Zo.layout.hierarchy(),c=Math.round,s=[1,1],l=null,f=Gu,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(s=n,i):s},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?Gu(t):Ku(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Ku(t,n)}if(!arguments.length)return l;var r;return f=null==(l=n)?Gu:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},fu(i,a)},Zo.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=2*Math.random()-1,r=2*Math.random()-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=Zo.random.normal.apply(Zo,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},Zo.scale={};var os={floor:vt,ceil:vt};Zo.scale.linear=function(){return ii([0,1],[0,1],Tr,!1)},Zo.scale.log=function(){return fi(Zo.scale.linear().domain([0,1]),10,!0,[1,10])};var as=Zo.format(".0e"),cs={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};Zo.scale.pow=function(){return hi(Zo.scale.linear(),1,[0,1])},Zo.scale.sqrt=function(){return Zo.scale.pow().exponent(.5)},Zo.scale.ordinal=function(){return pi([],{t:"range",a:[[]]})},Zo.scale.category10=function(){return Zo.scale.ordinal().range(ss)},Zo.scale.category20=function(){return Zo.scale.ordinal().range(ls)},Zo.scale.category20b=function(){return Zo.scale.ordinal().range(fs)},Zo.scale.category20c=function(){return Zo.scale.ordinal().range(hs)};var ss=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(it),ls=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(it),fs=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(it),hs=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(it);Zo.scale.quantile=function(){return vi([],[])},Zo.scale.quantize=function(){return di(0,1,[0,1])},Zo.scale.threshold=function(){return mi([.5],[0,1])},Zo.scale.identity=function(){return yi([0,1])},Zo.svg={},Zo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),o=r.apply(this,arguments)+gs,a=u.apply(this,arguments)+gs,c=(o>a&&(c=o,o=a,a=c),a-o),s=ba>c?"0":"1",l=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);return c>=ps?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+s+",0 "+n*l+","+n*f+"Z":"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=xi,e=Mi,r=_i,u=bi;return n.innerRadius=function(e){return arguments.length?(t=pt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=pt(t),n):e},n.startAngle=function(t){return arguments.length?(r=pt(t),n):r},n.endAngle=function(t){return arguments.length?(u=pt(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+gs;return[Math.cos(i)*n,Math.sin(i)*n]},n};var gs=-Sa,ps=wa-ka;Zo.svg.line=function(){return wi(vt)};var vs=Zo.map({linear:Si,"linear-closed":ki,step:Ei,"step-before":Ai,"step-after":Ci,basis:Ri,"basis-open":Di,"basis-closed":Pi,bundle:Ui,cardinal:Ti,"cardinal-open":Ni,"cardinal-closed":Li,monotone:Ii});vs.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var ds=[0,2/3,1/3,0],ms=[0,1/3,2/3,0],ys=[0,1/6,2/3,1/6];Zo.svg.line.radial=function(){var n=wi(Zi);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},Ai.reverse=Ci,Ci.reverse=Ai,Zo.svg.area=function(){return Vi(vt)},Zo.svg.area.radial=function(){var n=Vi(Zi);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},Zo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),s=t(this,o,n,a);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,s)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,s.r,s.p0)+r(s.r,s.p1,s.a1-s.a0)+u(s.r,s.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=a.call(n,u,r),o=c.call(n,u,r)+gs,l=s.call(n,u,r)+gs;return{r:i,a0:o,a1:l,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(l),i*Math.sin(l)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>ba)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=ze,o=Re,a=Xi,c=_i,s=bi;return n.radius=function(t){return arguments.length?(a=pt(t),n):a},n.source=function(t){return arguments.length?(i=pt(t),n):i},n.target=function(t){return arguments.length?(o=pt(t),n):o},n.startAngle=function(t){return arguments.length?(c=pt(t),n):c},n.endAngle=function(t){return arguments.length?(s=pt(t),n):s},n},Zo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=e.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=ze,e=Re,r=$i;return n.source=function(e){return arguments.length?(t=pt(e),n):t},n.target=function(t){return arguments.length?(e=pt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},Zo.svg.diagonal.radial=function(){var n=Zo.svg.diagonal(),t=$i,e=n.projection;return n.projection=function(n){return arguments.length?e(Bi(t=n)):t},n},Zo.svg.symbol=function(){function n(n,r){return(xs.get(t.call(this,n,r))||Gi)(e.call(this,n,r))}var t=Ji,e=Wi;return n.type=function(e){return arguments.length?(t=pt(e),n):t},n.size=function(t){return arguments.length?(e=pt(t),n):e},n};var xs=Zo.map({circle:Gi,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*ws)),e=t*ws;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/bs),e=t*bs/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/bs),e=t*bs/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});Zo.svg.symbolTypes=xs.keys();var Ms,_s,bs=Math.sqrt(3),ws=Math.tan(30*Aa),Ss=[],ks=0;Ss.call=pa.call,Ss.empty=pa.empty,Ss.node=pa.node,Ss.size=pa.size,Zo.transition=function(n){return arguments.length?Ms?n.transition():n:ma.transition()},Zo.transition.prototype=Ss,Ss.select=function(n){var t,e,r,u=this.id,i=[];n=v(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],s=-1,l=c.length;++s<l;)(r=c[s])&&(e=n.call(r,r.__data__,s,o))?("__data__"in r&&(e.__data__=r.__data__),to(e,s,u,r.__transition__[u]),t.push(e)):t.push(null)
}return Ki(i,u)},Ss.selectAll=function(n){var t,e,r,u,i,o=this.id,a=[];n=d(n);for(var c=-1,s=this.length;++c<s;)for(var l=this[c],f=-1,h=l.length;++f<h;)if(r=l[f]){i=r.__transition__[o],e=n.call(r,r.__data__,f,c),a.push(t=[]);for(var g=-1,p=e.length;++g<p;)(u=e[g])&&to(u,g,o,i),t.push(u)}return Ki(a,o)},Ss.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=E(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var e=this[i],a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return Ki(u,this.id)},Ss.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):C(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},Ss.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?nu:Tr,a=Zo.ns.qualify(n);return Qi(this,"attr."+n,t,a.local?i:u)},Ss.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=Zo.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},Ss.style=function(n,t,e){function r(){this.style.removeProperty(n)}function u(t){return null==t?r:(t+="",function(){var r,u=Wo.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=Tr(u,t),function(t){this.style.setProperty(n,r(t),e)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}return Qi(this,"style."+n,t,u)},Ss.styleTween=function(n,t,e){function r(r,u){var i=t.call(this,r,u,Wo.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},Ss.text=function(n){return Qi(this,"text",n,no)},Ss.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Ss.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=Zo.ease.apply(Zo,arguments)),C(this,function(e){e.__transition__[t].ease=n}))},Ss.delay=function(n){var t=this.id;return C(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=+n.call(e,e.__data__,r,u)}:(n=+n,function(e){e.__transition__[t].delay=n}))},Ss.duration=function(n){var t=this.id;return C(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u))}:(n=Math.max(1,n),function(e){e.__transition__[t].duration=n}))},Ss.each=function(n,t){var e=this.id;if(arguments.length<2){var r=_s,u=Ms;Ms=e,C(this,function(t,r,u){_s=t.__transition__[e],n.call(t,t.__data__,r,u)}),_s=r,Ms=u}else C(this,function(r){var u=r.__transition__[e];(u.event||(u.event=Zo.dispatch("start","end"))).on(n,t)});return this},Ss.transition=function(){for(var n,t,e,r,u=this.id,i=++ks,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],s=0,l=t.length;l>s;s++)(e=t[s])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,to(e,s,i,r)),n.push(e)}return Ki(o,i)},Zo.svg.axis=function(){function n(n){n.each(function(){var n,s=Zo.select(this),l=this.__chart__||e,f=this.__chart__=e.copy(),h=null==c?f.ticks?f.ticks.apply(f,a):f.domain():c,g=null==t?f.tickFormat?f.tickFormat.apply(f,a):vt:t,p=s.selectAll(".tick").data(h,f),v=p.enter().insert("g",".domain").attr("class","tick").style("opacity",ka),d=Zo.transition(p.exit()).style("opacity",ka).remove(),m=Zo.transition(p).style("opacity",1),y=ni(f),x=s.selectAll(".domain").data([0]),M=(x.enter().append("path").attr("class","domain"),Zo.transition(x));v.append("line"),v.append("text");var _=v.select("line"),b=m.select("line"),w=p.select("text").text(g),S=v.select("text"),k=m.select("text");switch(r){case"bottom":n=eo,_.attr("y2",u),S.attr("y",Math.max(u,0)+o),b.attr("x2",0).attr("y2",u),k.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+i+"V0H"+y[1]+"V"+i);break;case"top":n=eo,_.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),b.attr("x2",0).attr("y2",-u),k.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+-i+"V0H"+y[1]+"V"+-i);break;case"left":n=ro,_.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),b.attr("x2",-u).attr("y2",0),k.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),M.attr("d","M"+-i+","+y[0]+"H0V"+y[1]+"H"+-i);break;case"right":n=ro,_.attr("x2",u),S.attr("x",Math.max(u,0)+o),b.attr("x2",u).attr("y2",0),k.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),M.attr("d","M"+i+","+y[0]+"H0V"+y[1]+"H"+i)}if(f.rangeBand){var E=f.rangeBand()/2,A=function(n){return f(n)+E};v.call(n,A),m.call(n,A)}else v.call(n,l),m.call(n,f),d.call(n,f)})}var t,e=Zo.scale.linear(),r=Es,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in As?t+"":Es,n):r},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(u=+t,i=+arguments[e-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Es="bottom",As={top:1,right:1,bottom:1,left:1};Zo.svg.brush=function(){function n(i){i.each(function(){var i=Zo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(d,vt);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return Cs[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,f=Zo.transition(i),h=Zo.transition(o);c&&(l=ni(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),e(f)),s&&(l=ni(s),h.attr("y",l[0]).attr("height",l[1]-l[0]),r(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+l[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function e(n){n.select(".extent").attr("x",l[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",l[1]-l[0])}function r(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==Zo.event.keyCode&&(C||(x=null,L[0]-=l[1],L[1]-=h[1],C=2),f())}function g(){32==Zo.event.keyCode&&2==C&&(L[0]+=l[1],L[1]+=h[1],C=0,f())}function d(){var n=Zo.mouse(_),u=!1;M&&(n[0]+=M[0],n[1]+=M[1]),C||(Zo.event.altKey?(x||(x=[(l[0]+l[1])/2,(h[0]+h[1])/2]),L[0]=l[+(n[0]<x[0])],L[1]=h[+(n[1]<x[1])]):x=null),E&&m(n,c,0)&&(e(S),u=!0),A&&m(n,s,1)&&(r(S),u=!0),u&&(t(S),w({type:"brush",mode:C?"move":"resize"}))}function m(n,t,e){var r,u,a=ni(t),c=a[0],s=a[1],f=L[e],g=e?h:l,d=g[1]-g[0];return C&&(c-=f,s-=d+f),r=(e?v:p)?Math.max(c,Math.min(s,n[e])):n[e],C?u=(r+=f)+d:(x&&(f=Math.max(c,Math.min(s,2*x[e]-r))),r>f?(u=r,r=f):u=f),g[0]!=r||g[1]!=u?(e?o=null:i=null,g[0]=r,g[1]=u,!0):void 0}function y(){d(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),Zo.select("body").style("cursor",null),T.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),N(),w({type:"brushend"})}var x,M,_=this,b=Zo.select(Zo.event.target),w=a.of(_,arguments),S=Zo.select(_),k=b.datum(),E=!/^(n|s)$/.test(k)&&c,A=!/^(e|w)$/.test(k)&&s,C=b.classed("extent"),N=D(),L=Zo.mouse(_),T=Zo.select(Wo).on("keydown.brush",u).on("keyup.brush",g);if(Zo.event.changedTouches?T.on("touchmove.brush",d).on("touchend.brush",y):T.on("mousemove.brush",d).on("mouseup.brush",y),S.interrupt().selectAll("*").interrupt(),C)L[0]=l[0]-L[0],L[1]=h[0]-L[1];else if(k){var q=+/w$/.test(k),z=+/^n/.test(k);M=[l[1-q]-L[0],h[1-z]-L[1]],L[0]=l[q],L[1]=h[z]}else Zo.event.altKey&&(x=L.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),Zo.select("body").style("cursor",b.style("cursor")),w({type:"brushstart"}),d()}var i,o,a=g(n,"brushstart","brush","brushend"),c=null,s=null,l=[0,0],h=[0,0],p=!0,v=!0,d=Ns[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:l,y:h,i:i,j:o},e=this.__chart__||t;this.__chart__=t,Ms?Zo.select(this).transition().each("start.brush",function(){i=e.i,o=e.j,l=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=qr(l,t.x),r=qr(h,t.y);return i=o=null,function(u){l=t.x=e(u),h=t.y=r(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,d=Ns[!c<<1|!s],n):c},n.y=function(t){return arguments.length?(s=t,d=Ns[!c<<1|!s],n):s},n.clamp=function(t){return arguments.length?(c&&s?(p=!!t[0],v=!!t[1]):c?p=!!t:s&&(v=!!t),n):c&&s?[p,v]:c?p:s?v:null},n.extent=function(t){var e,r,u,a,f;return arguments.length?(c&&(e=t[0],r=t[1],s&&(e=e[0],r=r[0]),i=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(f=e,e=r,r=f),(e!=l[0]||r!=l[1])&&(l=[e,r])),s&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],s.invert&&(u=s(u),a=s(a)),u>a&&(f=u,u=a,a=f),(u!=h[0]||a!=h[1])&&(h=[u,a])),n):(c&&(i?(e=i[0],r=i[1]):(e=l[0],r=l[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(f=e,e=r,r=f))),s&&(o?(u=o[0],a=o[1]):(u=h[0],a=h[1],s.invert&&(u=s.invert(u),a=s.invert(a)),u>a&&(f=u,u=a,a=f))),c&&s?[[e,u],[r,a]]:c?[e,r]:s&&[u,a])},n.clear=function(){return n.empty()||(l=[0,0],h=[0,0],i=o=null),n},n.empty=function(){return!!c&&l[0]==l[1]||!!s&&h[0]==h[1]},Zo.rebind(n,a,"on")};var Cs={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Ns=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Ls=Zo.time={},Ts=Date,qs=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];uo.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){zs.setUTCDate.apply(this._,arguments)},setDay:function(){zs.setUTCDay.apply(this._,arguments)},setFullYear:function(){zs.setUTCFullYear.apply(this._,arguments)},setHours:function(){zs.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){zs.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){zs.setUTCMinutes.apply(this._,arguments)},setMonth:function(){zs.setUTCMonth.apply(this._,arguments)},setSeconds:function(){zs.setUTCSeconds.apply(this._,arguments)},setTime:function(){zs.setTime.apply(this._,arguments)}};var zs=Date.prototype,Rs="%a %b %e %X %Y",Ds="%m/%d/%Y",Ps="%H:%M:%S",Us=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],js=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Hs=["January","February","March","April","May","June","July","August","September","October","November","December"],Fs=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Ls.year=io(function(n){return n=Ls.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),Ls.years=Ls.year.range,Ls.years.utc=Ls.year.utc.range,Ls.day=io(function(n){var t=new Ts(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),Ls.days=Ls.day.range,Ls.days.utc=Ls.day.utc.range,Ls.dayOfYear=function(n){var t=Ls.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},qs.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=Ls[n]=io(function(n){return(n=Ls.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=Ls.year(n).getDay();return Math.floor((Ls.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});Ls[n+"s"]=e.range,Ls[n+"s"].utc=e.utc.range,Ls[n+"OfYear"]=function(n){var e=Ls.year(n).getDay();return Math.floor((Ls.dayOfYear(n)+(e+t)%7)/7)}}),Ls.week=Ls.sunday,Ls.weeks=Ls.sunday.range,Ls.weeks.utc=Ls.sunday.utc.range,Ls.weekOfYear=Ls.sundayOfYear,Ls.format=ao;var Os=so(Us),Ys=lo(Us),Is=so(js),Zs=lo(js),Vs=so(Hs),Xs=lo(Hs),$s=so(Fs),Bs=lo(Fs),Ws=/^%/,Js={"-":"",_:" ",0:"0"},Gs={a:function(n){return js[n.getDay()]},A:function(n){return Us[n.getDay()]},b:function(n){return Fs[n.getMonth()]},B:function(n){return Hs[n.getMonth()]},c:ao(Rs),d:function(n,t){return fo(n.getDate(),t,2)},e:function(n,t){return fo(n.getDate(),t,2)},H:function(n,t){return fo(n.getHours(),t,2)},I:function(n,t){return fo(n.getHours()%12||12,t,2)},j:function(n,t){return fo(1+Ls.dayOfYear(n),t,3)},L:function(n,t){return fo(n.getMilliseconds(),t,3)},m:function(n,t){return fo(n.getMonth()+1,t,2)},M:function(n,t){return fo(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return fo(n.getSeconds(),t,2)},U:function(n,t){return fo(Ls.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return fo(Ls.mondayOfYear(n),t,2)},x:ao(Ds),X:ao(Ps),y:function(n,t){return fo(n.getFullYear()%100,t,2)},Y:function(n,t){return fo(n.getFullYear()%1e4,t,4)},Z:Do,"%":function(){return"%"}},Ks={a:ho,A:go,b:yo,B:xo,c:Mo,d:Co,e:Co,H:Lo,I:Lo,j:No,L:zo,m:Ao,M:To,p:Ro,S:qo,U:vo,w:po,W:mo,x:_o,X:bo,y:So,Y:wo,Z:ko,"%":Po},Qs=/^\s*\d+/,nl=Zo.map({am:0,pm:1});ao.utc=Uo;var tl=Uo("%Y-%m-%dT%H:%M:%S.%LZ");ao.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?jo:tl,jo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},jo.toString=tl.toString,Ls.second=io(function(n){return new Ts(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),Ls.seconds=Ls.second.range,Ls.seconds.utc=Ls.second.utc.range,Ls.minute=io(function(n){return new Ts(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),Ls.minutes=Ls.minute.range,Ls.minutes.utc=Ls.minute.utc.range,Ls.hour=io(function(n){var t=n.getTimezoneOffset()/60;return new Ts(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),Ls.hours=Ls.hour.range,Ls.hours.utc=Ls.hour.utc.range,Ls.month=io(function(n){return n=Ls.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),Ls.months=Ls.month.range,Ls.months.utc=Ls.month.utc.range;var el=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],rl=[[Ls.second,1],[Ls.second,5],[Ls.second,15],[Ls.second,30],[Ls.minute,1],[Ls.minute,5],[Ls.minute,15],[Ls.minute,30],[Ls.hour,1],[Ls.hour,3],[Ls.hour,6],[Ls.hour,12],[Ls.day,1],[Ls.day,2],[Ls.week,1],[Ls.month,1],[Ls.month,3],[Ls.year,1]],ul=[[ao("%Y"),Zt],[ao("%B"),function(n){return n.getMonth()}],[ao("%b %d"),function(n){return 1!=n.getDate()}],[ao("%a %d"),function(n){return n.getDay()&&1!=n.getDate()}],[ao("%I %p"),function(n){return n.getHours()}],[ao("%I:%M"),function(n){return n.getMinutes()}],[ao(":%S"),function(n){return n.getSeconds()}],[ao(".%L"),function(n){return n.getMilliseconds()}]],il=Oo(ul);rl.year=Ls.year,Ls.scale=function(){return Ho(Zo.scale.linear(),rl,il)};var ol={range:function(n,t,e){return Zo.range(+n,+t,e).map(Fo)}},al=rl.map(function(n){return[n[0].utc,n[1]]}),cl=[[Uo("%Y"),Zt],[Uo("%B"),function(n){return n.getUTCMonth()}],[Uo("%b %d"),function(n){return 1!=n.getUTCDate()}],[Uo("%a %d"),function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],[Uo("%I %p"),function(n){return n.getUTCHours()}],[Uo("%I:%M"),function(n){return n.getUTCMinutes()}],[Uo(":%S"),function(n){return n.getUTCSeconds()}],[Uo(".%L"),function(n){return n.getUTCMilliseconds()}]],sl=Oo(cl);return al.year=Ls.year.utc,Ls.scale.utc=function(){return Ho(Zo.scale.linear(),al,sl)},Zo.text=dt(function(n){return n.responseText}),Zo.json=function(n,t){return mt(n,"application/json",Yo,t)},Zo.html=function(n,t){return mt(n,"text/html",Io,t)},Zo.xml=dt(function(n){return n.responseXML}),Zo}();

define("d3", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.d3;
    };
}(this)));

// ===========================================================================
//
// d3 plugins
//
//  d3 plugins - outside of offical d3 plugins
//      moveToFront, sticker
// ===========================================================================
define('util/d3plugins',['d3'], function d3Plugins(d3){
    // ----------------------------------
    // Move a selection to the front
    // ----------------------------------
    d3.selection.prototype.moveToFront = function moveToFront() { 
        // test for browser support
        if(this.each){
            return this.each(function() { 
                this.parentNode.appendChild(this); 
            }); 
        }
    };

    // ----------------------------------
    // Sticker plugin - Enjalot ( https://github.com/enjalot/d3-plugins/blob/master/sticker/sticker.js )
    // ----------------------------------
    function d3_isSVG(el) {
        if(!el){ return false; }
        return !!el.ownerSVGElement;// || el.tagName === "svg";
    }

    function d3_makeFragment(fragment) {
        var range = document.createRange();
        return range.createContextualFragment(fragment);
    }
    function d3_makeSVGFragment(fragment, svgElement) {
        //we need to wrap our element in a temporarary intermediate svg element
        //so that the browser knows to instanciate the Node properly.
        //for some reason having the range select an svg element isn't enough.
        // TODO: Allow optional namespace declarations
        var pre = '<svg xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink>';
        var post = '</svg>';
        var range = document.createRange();
        range.selectNode(svgElement);
        var contextFragment = range.createContextualFragment(pre + fragment + post);
        var intermediateSvg = contextFragment.childNodes[0];
        var node = intermediateSvg.childNodes[0];
        return node;
    }

    d3.sticker = function(selector) {
        var string;
        var node;
        var svgElement; //for deserializing svg elements

        var sticker = function(selection) {
            return sticker.append(selection);
        };

        sticker.copy = function(selector) {
            node = d3.select(selector).node();
            if(!node){ return sticker; }
            //we keep track of svg element 
            if(d3_isSVG(node)) {
                sticker.isSVG = true;
                svgElement = node.ownerSVGElement;
            }
            node = node.cloneNode(true);
            node.removeAttribute("id");
            return sticker;
        };

        sticker.paste = function() {
            if(!node) return;
            return node.cloneNode(true);
        };

        sticker.node = function(_) {
            if(!arguments.length){ return node; }
            node = _;
            if(d3_isSVG(node)) {
                sticker.isSVG = true;
                svgElement = node.ownerSVGElement;
            }
            return sticker;
        };

        //append a copy of the sticker to the selection
        sticker.append = function(selection) {
            return selection.select(function() {
                return this.appendChild(sticker.paste());
            });
        };

        //insert a copy of the sticker into a selection similar to the d3 insert API 
        sticker.insert = function(selection, before) {
            if(!string){ return selection; }
            return selection.select(before).select(function() {
                return this.parentNode.insertBefore(sticker.paste(), this);
            });
        };

        sticker.string = function(_) {
        if(!arguments.length){ return string; }
            string = _;
            return sticker;
        };

        sticker.serialize = function() {
            //Serialize the selected element into a string
            string = new XMLSerializer().serializeToString(node);
        };

        sticker.deserialize = function () {
            //check if our element is SVG
            if(sticker.isSVG) {
                node = d3_makeSVGFragment(string, svgElement);
            } else {
                node = d3_makeFragment(string);
            }
            return node;
        };

        sticker.toString = function() {
            sticker.serialize();
            return string;
        };

        if(selector) {
            return sticker.copy(selector);
        }
        return sticker;
    };

    return d3;
});

//----------------------------------------------------------------------------
//Logger library
//    author: Erik Hazzard
//
//Provides a LOGGER object which can be used to perform client side logging
//    Maintains a list of of all messages by log type. To log:
//            LOGGER.log('type', 'message', param1, param2, etc...);
//
//    e.g.,
//            LOGGER.log('error', 'Woops', { some: data });
//
//    To change logger options:
//            LOGGER.options.logLevel = 'all' // ( or true ) - Shows ALL messages
//            LOGGER.options.logLevel = ['error', 'debug'] // only shows the types 
//              passed in
//
//            LOGGER.options.storeHistory = true | false
//    To access history:
//            LOGGER.history[type] to access messages by type
//----------------------------------------------------------------------------
define('logger',['d3'], function(d3) {
    var LOGGER;

    // generate some color scales, give a wide range of unique colors
    var colorScales = [
        d3.scale.category20c(),
        d3.scale.category20b(),
        d3.scale.category20(),
        d3.scale.category10()
    ];

    // remember lastGroup
    var LAST_GROUP = null;

    // values of found colors, to check for same colors
    var foundColors = ['#dd4444'];

    // key : value of colors so we don't generate new colors
    // for each key
    // set some default colors
    var colorDict = {error: '#dd4444'};

    var getColor = function loggerGetColor(target){
        // generates or returns a color used by a target key
        var i=0;
        var color = '';
        if(colorDict[target]){ return colorDict[target]; }

        while(i<colorScales.length){
            color = colorScales[i](target);

            // did NOT find the color, update the objects and break loop
            if(foundColors.indexOf(color) === -1){
                foundColors.push(color);
                colorDict[target] = color;
                break;
            } 

            i += 1;
        }

        return color;
    };

    LOGGER = {};
    LOGGER.options = {
        logLevel: 'all',
        storeHistory: false
    };
    LOGGER.history = {};
    LOGGER.can_log = function(type) {
        var logLevel, return_value;

        return_value = false;
        logLevel = LOGGER.options.logLevel;
        if (logLevel === 'all' || logLevel === true) {
            return_value = true;
        } else if (logLevel instanceof Array) {
            if (logLevel.indexOf(type) > -1) {
                return_value = true;
            }
        } else if (logLevel === null || logLevel === void 0 || logLevel === 'none' || logLevel === false) {
            return_value = false;
        } else {
            if (logLevel === type) {
                return_value = true;
            }
        }
        return return_value;
    };
    LOGGER.log = function(type) {
        var args, cur_date, logHistory;

        args = Array.prototype.slice.call(arguments);
        if ((type == null) || arguments.length === 1) {
            type = 'debug';
            args.splice(0, 0, 'debug');
        }
        if (!LOGGER.can_log(type)) {
            return false;
        }
        cur_date = new Date();
        args.push({
            'Date': cur_date,
            'Milliseconds': cur_date.getMilliseconds(),
            'Time': cur_date.getTime()
        });

        if(LOGGER.options.storeHistory){
                logHistory = LOGGER.history;
                logHistory[type] = logHistory[type] || [];
                logHistory[type].push(args);
        }
        if (window && window.console) {
            //console.log(Array.prototype.slice.call(args));
            // add a spacer between each arg
            var len = args.length;
            var newArgs = Array.prototype.slice.call(args);

            // close group if the groups aren't the same
            if(type !== LAST_GROUP){
                console.groupEnd();
                // start a group
                console.group(type);
                LAST_GROUP = type;
            }


            // NOTE: this will only add color to %c specified strings

            // Add color to everything
            if(newArgs[1] && typeof newArgs[1] === 'string'){
                var shifted = newArgs.shift();

                // if the string is a formatted string, add in the
                // log type, the message, then the time
                newArgs[0] = '%c' + 
                    shifted + '\t:\t' + 
                    newArgs[0].replace('%c', '') + 
                    ' <time:%O>';

                // If the second argument is a string and it is 
                // NOT a color format string, the create one
                if(typeof newArgs[1] !== 'string' || (typeof newArgs[1] === 'string' && newArgs[1].match(/[a-z ]+:[a-z ]+;/) === null)){
                    var background = getColor(shifted);
                    var color = d3.rgb(background);
                    var border = color.darker();

                    // make the text bright or light depending on how
                    // dark or light it already is
                    if(color.r + color.g + color.b < 378){
                        color = color.brighter().brighter().brighter().brighter().brighter();
                    } else { 
                        color = color.darker().darker().darker().darker().darker();
                    }

                    // format string
                    var formatString = "background: " + background + ';' + 
                        'color:' + color + ';' + 
                        'border: 2px solid ' + border + ';';

                    newArgs.splice(1, 0, formatString);
                    console.log.apply(console, newArgs);
                }
            } else {
                // no special formatting, just call it normally
                console.log(args);
            }
        }
        return true;
    };
    LOGGER.options.log_types = ['debug', 'error', 'info', 'warn'];
    LOGGER.options.setup_log_types = function() {
        var log_type, _i, _len, _ref, _results;

        LOGGER.log('logger', 'setup_log_types()', 'Called setup log types!');
        _ref = LOGGER.options.log_types;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            log_type = _ref[_i];
            _results.push((function(log_type) {
                LOGGER[log_type] = function() {
                    var args;

                    args = Array.prototype.slice.call(arguments);
                    args.splice(0, 0, log_type);
                    return LOGGER.log.apply(null, args);
                };
                return LOGGER[log_type];
            })(log_type));
        }
        return _results;
    };
    LOGGER.options.setup_log_types();
    if (window) {
        if (window.console && LOGGER.options) {
            if (LOGGER.options.logLevel === 'none' || LOGGER.options.logLevel === null) {
                console.log = function() {
                    return {};
                };
            }
        }
        if (!window.console) {
            window.console = {
                log: function consoleLog() {
                    return {};
                }
            };
        }
        if (!window.console.group) {
            window.console.group = function consoleGroup() {};
        }
        if (!window.console.error) {
            window.console.error = function consoleError() {};
        }
        window.onerror = function(msg, url, line) {
            LOGGER.error(msg, url, line);
            return false;
        };
    }
    return LOGGER;
});

// ===========================================================================
//
// browser detect
//
//  -Returns an object containing browser info
//
// ===========================================================================
define( 'util/browserInfo',[ ], function(){
    //Get the current campaign
    //  (NOTE: get from URL when set up, e.g.:
    //  var campaign = window.location.host.split('.')[0]
    var browserInfo = {
        isIe8: $('html').hasClass('ie8')
    };

    return browserInfo;
});

// ===========================================================================
//
// Global event aggregator
//
//  Provides the global event aggregator so all modules have access to events
//
// ===========================================================================
define('events',['backbone', 'marionette'],function(Backbone, Marionette){
    var events = new Backbone.Wreqr.EventAggregator();
    // store a global reference to the event aggregator
    window.EVENTS = events;

    return events;
});

(function(global,exports){var $d=global.document,$=global.jQuery||global.Zepto||global.ender||$d,$$,$b,$f,ke="keydown";function realTypeOf(v,s){return v===null?s==="null":v===undefined?s==="undefined":v.is&&v instanceof $?s==="element":Object.prototype.toString.call(v).toLowerCase().indexOf(s)>7}if($===$d){$$=function(selector,context){return selector?$.querySelector(selector,context||$):$};$b=function(e,fn){e.addEventListener(ke,fn,false)};$f=function(e,jwertyEv){var ret=$d.createEvent("Event"),i;ret.initEvent(ke,true,true);for(i in jwertyEv)ret[i]=jwertyEv[i];return(e||$).dispatchEvent(ret)}}else{$$=function(selector,context){return $(selector||$d,context)};$b=function(e,fn){$(e).bind(ke+".jwerty",fn)};$f=function(e,ob){$(e||$d).trigger($.Event(ke,ob))}}var _modProps={16:"shiftKey",17:"ctrlKey",18:"altKey",91:"metaKey"};var _keys={mods:{"⇧":16,shift:16,"⌃":17,ctrl:17,"⌥":18,alt:18,option:18,"⌘":91,meta:91,cmd:91,"super":91,win:91},keys:{"⌫":8,backspace:8,"⇥":9,"⇆":9,tab:9,"↩":13,"return":13,enter:13,"⌅":13,pause:19,"pause-break":19,"⇪":20,caps:20,"caps-lock":20,"⎋":27,escape:27,esc:27,space:32,"↖":33,pgup:33,"page-up":33,"↘":34,pgdown:34,"page-down":34,"⇟":35,end:35,"⇞":36,home:36,ins:45,insert:45,del:46,"delete":46,"←":37,left:37,"arrow-left":37,"↑":38,up:38,"arrow-up":38,"→":39,right:39,"arrow-right":39,"↓":40,down:40,"arrow-down":40,"*":106,star:106,asterisk:106,multiply:106,"+":107,plus:107,"-":109,subtract:109,"num-.":110,"num-period":110,"num-dot":110,"num-full-stop":110,"num-delete":110,";":186,semicolon:186,"=":187,equals:187,",":188,comma:188,".":190,period:190,"full-stop":190,"/":191,slash:191,"forward-slash":191,"`":192,tick:192,"back-quote":192,"[":219,"open-bracket":219,"\\":220,"back-slash":220,"]":221,"close-bracket":221,"'":222,quote:222,apostraphe:222}};var i=47,n=0;while(++i<106){_keys.keys[n]=i;_keys.keys["num-"+n]=i+48;++n}i=111,n=1;while(++i<136){_keys.keys["f"+n]=i;++n}i=64;while(++i<91){_keys.keys[String.fromCharCode(i).toLowerCase()]=i}function JwertyCode(jwertyCode){var i,c,n,z,keyCombo,optionals,jwertyCodeFragment,rangeMatches,rangeI;if(jwertyCode instanceof JwertyCode)return jwertyCode;if(!realTypeOf(jwertyCode,"array")){jwertyCode=String(jwertyCode).replace(/\s/g,"").toLowerCase().match(/(?:\+,|[^,])+/g)}for(i=0,c=jwertyCode.length;i<c;++i){if(!realTypeOf(jwertyCode[i],"array")){jwertyCode[i]=String(jwertyCode[i]).match(/(?:\+\/|[^\/])+/g)}optionals=[],n=jwertyCode[i].length;while(n--){jwertyCodeFragment=jwertyCode[i][n];keyCombo={jwertyCombo:String(jwertyCodeFragment),shiftKey:false,ctrlKey:false,altKey:false,metaKey:false};if(!realTypeOf(jwertyCodeFragment,"array")){jwertyCodeFragment=String(jwertyCodeFragment).toLowerCase().match(/(?:(?:[^\+])+|\+\+|^\+$)/g)}z=jwertyCodeFragment.length;while(z--){if(jwertyCodeFragment[z]==="++")jwertyCodeFragment[z]="+";if(jwertyCodeFragment[z]in _keys.mods){keyCombo[_modProps[_keys.mods[jwertyCodeFragment[z]]]]=true}else if(jwertyCodeFragment[z]in _keys.keys){keyCombo.keyCode=_keys.keys[jwertyCodeFragment[z]]}else{rangeMatches=jwertyCodeFragment[z].match(/^\[([^-]+\-?[^-]*)-([^-]+\-?[^-]*)\]$/)}}if(realTypeOf(keyCombo.keyCode,"undefined")){if(rangeMatches&&rangeMatches[1]in _keys.keys&&rangeMatches[2]in _keys.keys){rangeMatches[2]=_keys.keys[rangeMatches[2]];rangeMatches[1]=_keys.keys[rangeMatches[1]];for(rangeI=rangeMatches[1];rangeI<rangeMatches[2];++rangeI){optionals.push({altKey:keyCombo.altKey,shiftKey:keyCombo.shiftKey,metaKey:keyCombo.metaKey,ctrlKey:keyCombo.ctrlKey,keyCode:rangeI,jwertyCombo:String(jwertyCodeFragment)})}keyCombo.keyCode=rangeI}else{keyCombo.keyCode=0}}optionals.push(keyCombo)}this[i]=optionals}this.length=i;return this}var jwerty=exports.jwerty={event:function(jwertyCode,callbackFunction,callbackContext){if(realTypeOf(callbackFunction,"boolean")){var bool=callbackFunction;callbackFunction=function(){return bool}}jwertyCode=new JwertyCode(jwertyCode);var i=0,c=jwertyCode.length-1,returnValue,jwertyCodeIs;return function(event){if(jwertyCodeIs=jwerty.is(jwertyCode,event,i)){if(i<c){++i;return}else{returnValue=callbackFunction.call(callbackContext||this,event,jwertyCodeIs);if(returnValue===false)event.preventDefault();i=0;return}}i=jwerty.is(jwertyCode,event)?1:0}},is:function(jwertyCode,event,i){jwertyCode=new JwertyCode(jwertyCode);i=i||0;jwertyCode=jwertyCode[i];event=event.originalEvent||event;var n=jwertyCode.length,returnValue=false;while(n--){returnValue=jwertyCode[n].jwertyCombo;for(var p in jwertyCode[n]){if(p!=="jwertyCombo"&&event[p]!=jwertyCode[n][p])returnValue=false}if(returnValue!==false)return returnValue}return returnValue},key:function(jwertyCode,callbackFunction,callbackContext,selector,selectorContext){var realSelector=realTypeOf(callbackContext,"element")||realTypeOf(callbackContext,"string")?callbackContext:selector,realcallbackContext=realSelector===callbackContext?global:callbackContext,realSelectorContext=realSelector===callbackContext?selector:selectorContext;$b(realTypeOf(realSelector,"element")?realSelector:$$(realSelector,realSelectorContext),jwerty.event(jwertyCode,callbackFunction,realcallbackContext))},fire:function(jwertyCode,selector,selectorContext,i){jwertyCode=new JwertyCode(jwertyCode);var realI=realTypeOf(selectorContext,"number")?selectorContext:i;$f(realTypeOf(selector,"element")?selector:$$(selector,selectorContext),jwertyCode[realI||0][0])},KEYS:_keys}})(this,typeof module!=="undefined"&&module.exports?module.exports:this);
define("jwerty", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.jwerty;
    };
}(this)));

//============================================================================
//
// Keyboard handling
//
//  Uses jwerty to listen for key presses, fires corresponding key press events
//  other app components listen for
//============================================================================
define('handleKeys',[ 
        'events', 'logger', 'jwerty'
    ], function(
        events, logger, jwerty
    ) {
        var keys = [
            'up',
            'down',
            'left',
            'right',
            'space',
            'escape',
            'enter',
            'q','w','e','r',
            'shift+q','shift+w','shift+e','shift+r',
            'h','j','k','l',
            '1', '2', '3', '4', '5', '6',
            'shift+1', 'shift+2', 'shift+3', 'shift+4', 'shift+5', 'shift+6',
            'backspace',
            'shift+up',
            'shift+down'
        ];

        var handleKeys = function handleKeys(){
            _.each(keys, function(key){
                //Site wide binding
                jwerty.key(key, function(e){
                    //If user is pressing keys in an input element, don't
                    //  trigger event
                    var tag = e.target.tagName.toLowerCase();

                    if(tag !== 'input' && tag !== 'textarea'){
                        if(key === 'backspace'){
                            //don't reload page
                            e.preventDefault();
                        }
                        events.trigger('keyPress:' + key, {
                            key: key,
                            e: e
                        });
                    }

                    //return the event
                    return e;
                });
            });

            logger.log('handleKeys', 'setup key handlers with jwerty');
            return this;
        };

        return handleKeys;
});

// ===========================================================================
//
// API_URL
//
//      -Returns a {String} of the root URL for the API. For instance,
//          '/api/'
//
//      -TODO: use api.quint.com
// ===========================================================================
define( 'util/API_URL',[], function API_ROOT(){
    API_URL = '/api/';

    return API_URL;
});

// ===========================================================================
//
// App User
//
//  Model class for the app wide user object 
//
// ===========================================================================
define(
    'models/AppUser',[ 'events', 'logger', 'util/API_URL' ], function AppUserModel(
        events, logger, API_URL
    ){

        // Define the app user model. Similar to user model, but a bit different
        var AppUser = Backbone.Model.extend({
            defaults: {
                username: null,
                profilePic: null,
                name: '',
                fName: '',
                lName: '',
                facebookId: '',
                personalityHistory: []
            },
        
            url: API_URL + 'user/',

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/AppUser', 
                    'User:initialize: New app user created');

                // When model comes back from server, if there's no error
                this.on('sync', function(model, res){
                    if(!res.error && res.username){
                        logger.log('models/AppUser', 
                            'sync: no error, setting properties for model: %O | res: %O',
                            self.cid,
                            res);

                        var newProps = {
                            error: false,
                            isLoggedIn: true
                        };

                        self.set(newProps);
                    }
                });

                // Try to fetch from server immediately. This ALSO immediately
                // tries to fetch friends
                this.fetch({
                    success: function(res){ 
                        // Check if there's an error (e.g., appUser isn't authed)
                        if(res.attributes.error){
                            logger.log('models/AppUser',
                                'fetch(): appUser not logged in');
                            return false;
                        }
                        // no error, remove if there was an exisiting error
                        self.unset('error');
                        self.trigger('initialFetchFromServer');
                        return self;
                    },
                    error: function(){ 
                        logger.error('models/AppUser', 
                            'fetch(): unable to get model from server');
                        return self;
                    }
                });


                return this;
            }

        });

    return AppUser;
});

// ===========================================================================
//
// appUser-object
//
//      returns a Profile object
//
// ===========================================================================
define(
    'models/appUser-object',[ 'events', 'logger', 'models/AppUser' ], function(
        events, logger, AppUser
    ){
    // Create the new app appUser object
    // NOTE: when model is created, it will immediately try to fetch
    // from server
    var appUser = new AppUser();

    return appUser;
});

// ===========================================================================
//
// facebook
//
//  returns a function which sets up a listener for the loginSuccess:facebook
//  event. This is triggered when a user auths and logs in with facebook.
//  When this happens, refetch the user model, as the user will now be
//  logged in
//
// ===========================================================================
define('auth/facebook',[ 'events', 'models/appUser-object' ], function(events, appUser){
    // When a user successfully logins with facebook, an event names
    //  'loginSuccess:facebook' is triggered. Listen for that event and re-get
    //  the user user
    
    var setupListener = function(){

        // When user logs in with facebook, the loginSuccess:facebook event
        // is triggered
        events.on('loginSuccess:facebook', function(){

            // Update the user user object since the user is logged in
            // now
            appUser.fetch({
                success: function(res){
                    // After the user has updated, trigger an event to let
                    // listeners know the user has logged in, passing in the
                    // user response object
                    appUser.trigger('loggedIn', res);
                }
            });

        });
    };

    return setupListener;
});

// ===========================================================================
//
// app.js
//
//      -Returns a Marionette app object.  The app object is a sort of
//      composite for our application.  There are a few things of note here:
//          -We use events for communication between independent 
//          components. We can us: event.trigger( ... ) and event.on( ... )
//
// ===========================================================================
define('app',[ 
        'jquery', 'backbone', 'marionette',

        'logger', 'events',

        'models/appUser-object',
        'auth/facebook'
    ], function(
        $, Backbone, Marionette,

        logger, events,

        appUser,
        authFacebook
    ){

    // Create the app instance
    var app = new Backbone.Marionette.Application();

    // store a global ref to it (not used in our code, used for debugging)
    window.APP = app;

    //-----------------------------------
    //App - Region setup
    //-----------------------------------
    //NOTE: Router / controller is setup in main.js
    
    app.addInitializer(function(options){
        //Setup the main region
        var regionMain = new Backbone.Marionette.Region({
            el: '#region-main'
        });
        var regionFriends = new Backbone.Marionette.Region({
            el: '#region-friends'
        });

        // user login / profile
        var regionAuth = new Backbone.Marionette.Region({
            el: '#region-auth'
        });
        app.addRegions({
            'regionMain': regionMain,
            'regionFriends': regionFriends,
            'regionAuth': regionAuth
        });

        //Set the user of the app to be the (logged in) user
        app.user = appUser;
        
        // set up call back when user auths with facebook. When user
        // auths with facebook, the app user model should be refetched
        authFacebook();
    });

    //-----------------------------------
    //Finished
    //-----------------------------------
    app.on('initialize:after', function(options){
        logger.log('app', 'app-main.js: Finished initialization of app');

        if(Backbone.history){
            //start history to enable bookmarkable URLs
            //TODO: use non hash tagged urls
            Backbone.history.start({ pushState: true });
        }

        //For all links, use pushstate
        $(document).on('click', 'a', function(e) {
            var $el = $(this);
            e = e || window.event;
            var href = $(this).attr('href');

            // if the link has no href or an empty string, assume it shouldn't
            // link anywhere and return the event
            if(href === undefined || href === ''){
                e.preventDefault();
                return e;
            }

            // we need to catch all internal links and pass them to the router
            var fragment = Backbone.history.getFragment(href);
            var matched = _.any(Backbone.history.handlers, function(handler) {
                return handler.route.test(fragment);
            });
            if(matched) {
                // found a matched link, send it to the router
                e.preventDefault();
                // always navigate to link, even if fragment is same
                if(Backbone.history.fragment === fragment){
                    Backbone.history.fragment = null;
                }
                Backbone.history.navigate(fragment, { trigger: true });
            }

            // otherwise, continue with event
            return e;

        });

        $(window).on('popstate', function(e) {
            app.router.navigate(location.pathname.substr(1), true);
        }); 
    });

    return app;
});

(function(){var async={};var root,previous_async;root=this;if(root!=null){previous_async=root.async}async.noConflict=function(){root.async=previous_async;return async};function only_once(fn){var called=false;return function(){if(called)throw new Error("Callback was already called.");called=true;fn.apply(root,arguments)}}var _each=function(arr,iterator){if(arr.forEach){return arr.forEach(iterator)}for(var i=0;i<arr.length;i+=1){iterator(arr[i],i,arr)}};var _map=function(arr,iterator){if(arr.map){return arr.map(iterator)}var results=[];_each(arr,function(x,i,a){results.push(iterator(x,i,a))});return results};var _reduce=function(arr,iterator,memo){if(arr.reduce){return arr.reduce(iterator,memo)}_each(arr,function(x,i,a){memo=iterator(memo,x,i,a)});return memo};var _keys=function(obj){if(Object.keys){return Object.keys(obj)}var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k)}}return keys};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){async.nextTick=function(fn){setImmediate(fn)};async.setImmediate=async.nextTick}else{async.nextTick=function(fn){setTimeout(fn,0)};async.setImmediate=async.nextTick}}else{async.nextTick=process.nextTick;if(typeof setImmediate!=="undefined"){async.setImmediate=setImmediate}else{async.setImmediate=async.nextTick}}async.each=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;_each(arr,function(x){iterator(x,only_once(function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}}}))})};async.forEach=async.each;async.eachSeries=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;var iterate=function(){iterator(arr[completed],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}else{iterate()}}})};iterate()};async.forEachSeries=async.eachSeries;async.eachLimit=function(arr,limit,iterator,callback){var fn=_eachLimit(limit);fn.apply(null,[arr,iterator,callback])};async.forEachLimit=async.eachLimit;var _eachLimit=function(limit){return function(arr,iterator,callback){callback=callback||function(){};if(!arr.length||limit<=0){return callback()}var completed=0;var started=0;var running=0;(function replenish(){if(completed>=arr.length){return callback()}while(running<limit&&started<arr.length){started+=1;running+=1;iterator(arr[started-1],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;running-=1;if(completed>=arr.length){callback()}else{replenish()}}})}})()}};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.each].concat(args))}};var doParallelLimit=function(limit,fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[_eachLimit(limit)].concat(args))}};var doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.eachSeries].concat(args))}};var _asyncMap=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v;callback(err)})},function(err){callback(err,results)})};async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=function(arr,limit,iterator,callback){return _mapLimit(limit)(arr,iterator,callback)};var _mapLimit=function(limit){return doParallelLimit(limit,_asyncMap)};async.reduce=function(arr,memo,iterator,callback){async.eachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v;callback(err)})},function(err){callback(err,memo)})};async.inject=async.reduce;async.foldl=async.reduce;async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x}).reverse();async.reduce(reversed,memo,iterator,callback)};async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.filter=doParallel(_filter);async.filterSeries=doSeries(_filter);async.select=async.filter;async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(!v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.reject=doParallel(_reject);async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){if(result){main_callback(x);main_callback=function(){}}else{callback()}})},function(err){main_callback()})};async.detect=doParallel(_detect);async.detectSeries=doSeries(_detect);async.some=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(v){main_callback(true);main_callback=function(){}}callback()})},function(err){main_callback(false)})};async.any=async.some;async.every=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(!v){main_callback(false);main_callback=function(){}}callback()})},function(err){main_callback(true)})};async.all=async.every;async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err)}else{callback(null,{value:x,criteria:criteria})}})},function(err,results){if(err){return callback(err)}else{var fn=function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0};callback(null,_map(results.sort(fn),function(x){return x.value}))}})};async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);if(!keys.length){return callback(null)}var results={};var listeners=[];var addListener=function(fn){listeners.unshift(fn)};var removeListener=function(fn){for(var i=0;i<listeners.length;i+=1){if(listeners[i]===fn){listeners.splice(i,1);return}}};var taskComplete=function(){_each(listeners.slice(0),function(fn){fn()})};addListener(function(){if(_keys(results).length===keys.length){callback(null,results);callback=function(){}}});_each(keys,function(k){var task=tasks[k]instanceof Function?[tasks[k]]:tasks[k];var taskCallback=function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}if(err){var safeResults={};_each(_keys(results),function(rkey){safeResults[rkey]=results[rkey]});safeResults[k]=args;callback(err,safeResults);callback=function(){}}else{results[k]=args;async.setImmediate(taskComplete)}};var requires=task.slice(0,Math.abs(task.length-1))||[];var ready=function(){return _reduce(requires,function(a,x){return a&&results.hasOwnProperty(x)},true)&&!results.hasOwnProperty(k)};if(ready()){task[task.length-1](taskCallback,results)}else{var listener=function(){if(ready()){removeListener(listener);task[task.length-1](taskCallback,results)}};addListener(listener)}})};async.waterfall=function(tasks,callback){callback=callback||function(){};if(tasks.constructor!==Array){var err=new Error("First argument to waterfall must be an array of functions");return callback(err)}if(!tasks.length){return callback()}var wrapIterator=function(iterator){return function(err){if(err){callback.apply(null,arguments);callback=function(){}}else{var args=Array.prototype.slice.call(arguments,1);var next=iterator.next();if(next){args.push(wrapIterator(next))}else{args.push(callback)}async.setImmediate(function(){iterator.apply(null,args)})}}};wrapIterator(async.iterator(tasks))()};var _parallel=function(eachfn,tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){eachfn.map(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};eachfn.each(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.parallel=function(tasks,callback){_parallel({map:async.map,each:async.each},tasks,callback)};async.parallelLimit=function(tasks,limit,callback){_parallel({map:_mapLimit(limit),each:_eachLimit(limit)},tasks,callback)};async.series=function(tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){async.mapSeries(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};async.eachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){if(tasks.length){tasks[index].apply(null,arguments)}return fn.next()};fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null};return fn};return makeCallback(0)};async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)))}};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]);cb(err)})},function(err){callback(err,r)})};async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){if(test()){iterator(function(err){if(err){return callback(err)}async.whilst(test,iterator,callback)})}else{callback()}};async.doWhilst=function(iterator,test,callback){iterator(function(err){if(err){return callback(err)}if(test()){async.doWhilst(iterator,test,callback)}else{callback()}})};async.until=function(test,iterator,callback){if(!test()){iterator(function(err){if(err){return callback(err)}async.until(test,iterator,callback)})}else{callback()}};async.doUntil=function(iterator,test,callback){iterator(function(err){if(err){return callback(err)}if(!test()){async.doUntil(iterator,test,callback)}else{callback()}})};async.queue=function(worker,concurrency){if(concurrency===undefined){concurrency=1}function _insert(q,data,pos,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){var item={data:task,callback:typeof callback==="function"?callback:null};if(pos){q.tasks.unshift(item)}else{q.tasks.push(item)}if(q.saturated&&q.tasks.length===concurrency){q.saturated()}async.setImmediate(q.process)})}var workers=0;var q={tasks:[],concurrency:concurrency,saturated:null,empty:null,drain:null,push:function(data,callback){_insert(q,data,false,callback)},unshift:function(data,callback){_insert(q,data,true,callback)},process:function(){if(workers<q.concurrency&&q.tasks.length){var task=q.tasks.shift();if(q.empty&&q.tasks.length===0){q.empty()}workers+=1;var next=function(){workers-=1;if(task.callback){task.callback.apply(task,arguments)}if(q.drain&&q.tasks.length+workers===0){q.drain()}q.process()};var cb=only_once(next);worker(task.data,cb)}},length:function(){return q.tasks.length},running:function(){return workers}};return q};async.cargo=function(worker,payload){var working=false,tasks=[];var cargo={tasks:tasks,payload:payload,saturated:null,empty:null,drain:null,push:function(data,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){tasks.push({data:task,callback:typeof callback==="function"?callback:null});if(cargo.saturated&&tasks.length===payload){cargo.saturated()}});async.setImmediate(cargo.process)},process:function process(){if(working)return;if(tasks.length===0){if(cargo.drain)cargo.drain();return}var ts=typeof payload==="number"?tasks.splice(0,payload):tasks.splice(0);var ds=_map(ts,function(task){return task.data});if(cargo.empty)cargo.empty();working=true;worker(ds,function(){working=false;var args=arguments;_each(ts,function(data){if(data.callback){data.callback.apply(null,args)}});process()})},length:function(){return tasks.length},running:function(){return working}};return cargo};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);if(typeof console!=="undefined"){if(err){if(console.error){console.error(err)}}else if(console[name]){_each(args,function(x){console[name](x)})}}}]))}};async.log=_console_fn("log");async.dir=_console_fn("dir");async.memoize=function(fn,hasher){var memo={};var queues={};hasher=hasher||function(x){return x};var memoized=function(){var args=Array.prototype.slice.call(arguments);var callback=args.pop();var key=hasher.apply(null,args);if(key in memo){callback.apply(null,memo[key])}else if(key in queues){queues[key].push(callback)}else{queues[key]=[callback];fn.apply(null,args.concat([function(){memo[key]=arguments;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,arguments)}}]))}};memoized.memo=memo;memoized.unmemoized=fn;return memoized};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments)}};async.times=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.map(counter,iterator,callback)};async.timesSeries=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.mapSeries(counter,iterator,callback)};async.compose=function(){var fns=Array.prototype.reverse.call(arguments);return function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([function(){var err=arguments[0];var nextargs=Array.prototype.slice.call(arguments,1);cb(err,nextargs)}]))},function(err,results){callback.apply(that,[err].concat(results))})}};var _applyEach=function(eachfn,fns){var go=function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();return eachfn(fns,function(fn,cb){fn.apply(that,args.concat([cb]))},callback)};if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);return go.apply(this,args)}else{return go}};async.applyEach=doParallel(_applyEach);async.applyEachSeries=doSeries(_applyEach);async.forever=function(fn,callback){function next(err){if(err){if(callback){return callback(err)}throw err}fn(next)}next()};if(typeof define!=="undefined"&&define.amd){define('async',[],function(){return async})}else if(typeof module!=="undefined"&&module.exports){module.exports=async}else{root.async=async}})();
// ===========================================================================
//
//  Entity Attributes
//
//      This model manages the attributes sub model of an entity
//
// ===========================================================================
define(
    'models/EntityAttributes',[ 'backbone', 'marionette', 'logger',
        'events', 'util/API_URL'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, API_URL
    ){

    var EntityAttributes = Backbone.Model.extend({
        defaults: {
            health: 100,
            maxHealth: 100,

            //power is used to cast spells and use abilities
            power: 100,
            maxPower: 100,

            // Combat - ability use
            // --------------------------
            // Each ability has a certain power cost (or no cost). There
            // is a timer that fills up. Using an ability drains the timer
            // by some amount (or all). 
            //
            // NOT SURE:
            // The timer takes a longer time to fill up the closer it gets to 
            // the end. 
            //
            // Certain items may decrease how long the timer takes to fill up

            //Stats
            //---------------------------
            strength: 10,
            agility: 10,
            dexterity: 10,
            stamina: 10,
            intelligence: 10,
            wisdom: 10,

            //Regen
            //---------------------------
            //How many points to regen per 'tick'
            regenHealth: 1,
            regenPower: 1,

            //Combat stats
            //---------------------------
            // "Final" calculated values:
            attack: 0,
            attackSpeed: 0,

            defense: 0,

            //Chance to deal critical damage (for all abilities)
            chanceCritical: 0,

            //Base crit damage is 100% of normal damage. This raises that
            criticalModifier: 0,

            //Combat stats which affect above values
            //---------------------------
            //Every 100 points of multiattack means a chance to strike
            ////  opponent N number of times
            chanceMultiAttack: 0,

            //Block will absorb some % of meele attacks if shield
            chanceBlock: 0,

            //Chance to completely avoid an attack
            //  NOTE: Should avoid only a single attack. Dodge should
            //  check all multi attacks as well
            chanceDodge: 0,

            // Chance to parry (avoid) some damage
            chanceParry: 0,

            //  Chance to avoid some damage AND return part of that damage back
            //  to the attack. Must first Parry, then this is the % chance that
            //  a parry will turn into a Riposte
            chanceRiposte: 0,

            // Chance for a meele hit to do area of effect damage
            chanceAoe: 0,

            //Resists
            //---------------------------
            resistAir: 0,
            resistDark: 0,
            resistEarth: 0,
            resistFire: 0,
            resistLight: 0,
            resistWater: 0
        }
    });

    return EntityAttributes;

});

// ===========================================================================
//
//  Ability
//
//      This model manages a single ability
//
// ===========================================================================
define(
    'models/Ability',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function AbilityModel(
        Backbone, Marionette, logger,
        events, d3, API_URL
    ){

    var Ability = Backbone.Model.extend({
        defaults: {
            name: 'Magic Missle',
            // ID of the effect element
            effectId: null,

            // castDuration - measured in seconds
            // how long the spell takes to cast - how long between the source
            // entity using the spell and the target entity receiving the effect
            castDuration: 0.5,

            // how much power the ability costs to use
            // TODO: probably won't use power
            powerCost: 10,
    
            // Damage Over Time (DOT) properties
            // ticks: number of times to do the effect
            ticks: 0,
            // time between each tick
            tickDuration: 1,
        
            // How long must the player wait until they can use this ability
            // This SHOULD always be greater than or equal to than the timeCost
            //  (e.g., if you need to wait 3 seconds to cast it but the cost is 4
            //  seconds, you'll have negative time)
            //
            // Measured in seconds
            castTime: 1,

            // How much this ability costs in time units. Normally, this
            // is the same as the cast time. THIS property is subtracted from
            // the entity's timer.
            // This may be lower than the cast time (e,g., if a spell takes a
            // while to cast but doesn't take down the timer much - maybe not
            // as powerful a spell)
            //
            // Measured in seconds
            timeCost: 1,

            // validTargets specifies the entities the ability can be
            // used on. for now, only 'enemy' or 'player' are valid targets. 
            validTargets: ['enemy', 'player'],
        
            // Damage
            // --------------------------
            damage: undefined,
            // could be either 'source' or 'target', will damage the entities
            // that are either the source or target of the used ability
            damageTarget: 'target',

            // type could be either 'magic' or 'physical'
            type: 'magic',
            // TODO: allow multiple subtypes
            // subtypes are:
            //  arcane, fire, light, dark, earth, air, water, or physical (for physical)
            subType: 'fire',

            // Heal
            // --------------------------
            heal: undefined,
            // could be either 'source' or 'target', will heal the entities
            // that are either the source or target of the used ability
            healTarget: 'target',

            visualEffect: function(options){
                //TODO: figure this out...should have some way of doing an
                //effect, but should it live here?
            }
            
        },

        effect: function(options){
            // NOTE: This is the default effect function. If no effect attribute
            // is passed into the model, , it will use this function, which 
            // calculates damage based on model attributes. This function can 
            // be overriden
            // TODO: Does it need to be? How to handle DoT? Buffs?
            // 
            // options can contain the following keys:
            //
            //  target: target(s) of effect
            //      {Object} or {Array of {Objects}}, object being an entity
            //
            //  source: source of effect
            //      {Object} - an entity
            //
            // The function body may be unique to each effect
            var self = this;
            //
            logger.log('models/Ability', 
                '>> DEFAULT ABILITY USED : this: %O, options: %O', 
                this,
                options);
            var amount = 0;
                // note: multiply castDuration by 1000 (it's in seconds, we
                // need to get milliseconds)
            var delay = this.get('castDuration') * 1000;
            // TODO: lower delay if the target has some sort of delay reducting
            // stats

            // TODO: To damage or heal multiple targets, just call it on the passed
            // in targets
            //
            // NOTE: Handle heal effect first
            //
            // NOTE: The takeHeal / takeDamage methods on the target entity
            // should be called on a delay, the delay being the `castDuration`.
            // If a spell takes 2 seconds to cast, the effect shouldn't occur
            // until 2 seconds after it was activated
            //
            // TODO: How to precent takeHeal() or takeDamage from doing anything
            // if the ability is interuppted? Set some property on this model?
            // Check property in the takeXX() function?
            if(this.get('heal')){
                setTimeout(function effectHealDelay(){
                    function takeHeal(){
                        amount = options[self.get('healTarget')].takeHeal({
                            type: self.get('type'),
                            subType: self.get('subType'),
                            amount: self.get('heal'),
                            sourceAbility: self
                        });
                    }
                    takeHeal();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            setTimeout( takeHeal,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            // Then, handle damage effect
            if(this.get('damage')){
                setTimeout(function effectDamageDelay(){
                    function takeDamage(){
                        amount = options[self.get('damageTarget')].takeDamage({
                            type: self.get('type'),
                            subType: self.get('subType'),
                            amount: self.get('damage'),
                            sourceAbility: self
                        });
                    }
                    takeDamage();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            setTimeout( takeDamage,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            return amount;
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            options = options || {};
            logger.log('models/Ability', 
                'initialize() called : attributes: %O : options: %O',
                this.attributes, options);

            // if an effect attributes was passed in, updat the method
            if(options.effect){ this.effect = options.effect; }

            // if the model is updated and a new effect attribute is set,
            // update the effect method
            this.on('change:effect', function(model, effect){
                this.effect = effect;
            });

            return this;
        }

    });

    return Ability;
});

// ===========================================================================
//
//  Abilities Collection
//
//      This collection is a list of ability models an entity has
//
// ===========================================================================
define(
    'collections/Abilities',[ 'backbone', 'marionette', 'logger', 'events',
        'models/Ability'
    ], function AbilitiesCollection(
        Backbone, Marionette, logger, events,
        Ability
    ){

    var Abilities = Backbone.Collection.extend({
        model: Ability,

        initialize: function(){
            logger.log('collections/Abilities', 'initialize() called');
        }
    });

    return Abilities;
});

// ===========================================================================
//
// data-abilities
//
//      TODO: should be loaded from server and abilities should load on a per
//      entity level
//
// ===========================================================================
define(
    'models/data-abilities',[ 'events', 'logger', 'models/Ability' ], function(
        events, logger, Ability
    ){
    // TODO: think of structure.
    // Maybe instead of damage and heal, `amount` is used, and a separate
    // attribute like `spellType` specifies if it's a Direct Damage, Heal,
    // DoT, buff, etc. type spell

    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {
        // ------------------------------
        // Damage - Arcane
        // ------------------------------
        'magicmissle': new Ability({
            name: 'Magic Missle',
            effectId: 'magicMissle',
            castTime: 2,
            timeCost: 2,
            powerCost: 6,
            validTargets: ['enemy'],
            type: 'magic',
            subType: 'arcane',
            damage: 15,
            heal: 5,
            healTarget: 'source'
        }),

        // ------------------------------
        // Damage - Fire
        // ------------------------------
        'flamelick': new Ability({
            name: 'Flamelick',
            effectId: 'flamelick',
            castTime: 3,
            timeCost: 3,
            powerCost: 4,
            validTargets: ['enemy'],
            type: 'magic',
            subType: 'fire',
            damage: 10
        }),
        'fireball': new Ability({
            name: 'Fireball',
            effectId: 'fireball',
            castTime: 4,
            timeCost: 4,
            powerCost: 8,
            validTargets: ['enemy'],
            type: 'magic',
            subType: 'fire',
            damage: 40
        }),

        // ------------------------------
        // Healing - Light
        // ------------------------------
        'trivialhealing': new Ability({
            name: 'Trivial Healing',
            effectId: 'trivialHealing',
            castTime: 3,
            timeCost: 3,
            powerCost: 1,
            validTargets: ['player'],
            type: 'magic',
            subType: 'light',
            heal: 5
        }),
        'minorhealing': new Ability({
            name: 'Minor Healing',
            effectId: 'minorHealing',
            castTime: 3,
            timeCost: 3,
            powerCost: 3,
            validTargets: ['player'],
            type: 'magic',
            subType: 'light',
            heal: 15
        })
    };


    return abilities;
});

// ===========================================================================
//
//  Entity
//
//      This model manages an entity - a creature in the game
//
// ===========================================================================
define(
    'models/Entity',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'models/EntityAttributes',
        'collections/Abilities',
        'models/Ability',
        'models/data-abilities'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        EntityAttributes,
        Abilities,
        Ability,
        ABILITIES
    ){

    var Entity = Backbone.Model.extend({
        defaults: {
            // abilities will be a collection of ability models
            abilities: null,

            // effects active on the entity (e.g., buffs or DoTs)
            activeEffects: [ function(){ console.log('bla'); } ],

            // name of the base sprite
            // TODO: Should this be here?
            sprite: 'man1', 

            // entity can be either alive or dead (can be revived with spell)
            isAlive: true,

            //User object which owns this entity
            owner: null,
            name: 'Soandso' + Math.random(),

            // Timer properties
            //---------------------------
            // timer is measured in seconds
            timerLimit: 10,

            //---------------------------
            //Entity attributes
            //---------------------------
            // Attributes include everything from health to attack damage, etc.
            // Anything combat related
            attributes: {},

            //Base attributes (copied over when a game starts to allow
            //  for buffs / debuffs)
            //---------------------------
            baseAttributes: {},

            // AI Related
            // --------------------------
            aiDelay: 0,

            // list of enemies and their aggro. Key is entity ID, value is
            // aggro value
            aggroList: {},
            
            // ability the entity desires to use. Is handled by the AI
            // function, may change before using (e.g., if health changes)
            desiredAbility: null,

            // desired target is the intended target to use the ability on
            desiredTarget: null
           
        },
        
        url: function getURL(){
            var url = API_URL + 'entities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            logger.log('models/Entity', 'initialize() called');

            // TODO: get attributes from server
            // set attributes and base attributes from server
            this.set({
                name: 'Soandso' + Math.random(),
                attributes: new EntityAttributes(),
                baseAttributes: new EntityAttributes()
            }, {silent: true});

            // TODO: allow setting just some entity attribute attributes

            // TODO: get AIdelay from server
            this.set({ aiDelay: Math.random() * 2.5 });

            // Setup entity abilities
            if(!options.abilities){
                // TODO: get from server
                this.set({
                    // TODO: DEV: remove random maxTimer
                    //timerLimit: 60 * (Math.random() * 20 | 0),
                    // TODO: get from server
                    abilities: new Abilities([
                        ABILITIES.magicmissle,
                        ABILITIES.minorhealing,
                        ABILITIES.fireball
                    ])
                });
            }

            // Listen when health drops to 0 or below, trigger entity
            // death event
            this.listenTo(
                this.get('attributes'), 
                'change:health', 
                this.healthCallback);

            return this;
        },

        getScore: function getScore(){
            // TODO: get a combat score for this entity based on abilities
            // and states

        },

        checkEffects: function checkEffects(time){
            // Called at each game loop iteration, checks each active effect
            var effects = this.attributes.activeEffects;
            if(effects.length === 0){
                return this;
            }

            _.each(effects, function checkEffect(effect){
                if(Math.random() < 0.01){
                    console.log(">>>>>", time);
                }
                // Bla
            });

            return this;
        },

        // ==============================
        //
        // Take damage / heal functions
        //
        // ==============================
        healthCallback: function healthCallback(model, health){
            logger.log('models/Entity', '1. healthCallback() : health ' + health);

            if(health <= 0){
                logger.log('models/Entity', '2. entity is dead!');
                this.set({ isAlive: false });
                // trigger global event to let listeners know entity died
                this.trigger('entity:died', {model: this});
            }

            return this;
        },

        // Take / Deal damage
        takeDamage: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
            var damage = options.amount * -1;

            // TODO: process damage

            // update attributes
            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');
            var newHealth = curHealth + damage;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            // update the health
            //  pass in the ability that caused the damage
            attrs.set({ health: newHealth }, { sourceAbility: sourceAbility});

            // NOTE:
            // death event is called in the `healthCallback`, which is called
            // whenever health changes

            return damage;
        },
        
        // an ability that does healing
        takeHeal: function(options){
            // TODO: document, think of structure
            logger.log('models/Entity', '1. takeHeal() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
            var amount = options.amount;

            // TODO: process healing
            amount = amount;

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');
            var newHealth = curHealth + amount;

            // TODO: check if there are any buffs that protect from death

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            // update the health
            //  pass in the ability that healed the entity
            attrs.set({ health: newHealth }, { sourceAbility: sourceAbility});

            return amount;
        },

        // ==============================
        //
        // AI 
        //
        // TODO: Don't put this here
        // ==============================
        getAbilityAI: function getAbilityAI(time){
            // selects an ability based on health, enemy health, etc
            var models = this.attributes.abilities.models;

            // TODO: select ability based on health / timer / etc.
            var ability = models[ (Math.random() * models.length)|0 ];

            this.set({'desiredAbility': ability});

            return ability;
        }, 

        handleAI: function handleAI(time, battle){
            // TODO: don't put this here. How to handle battle context?
            // TODO: this is ugly, rework this, updates battle AI, use aggrolist
            //
            //
            // called each tick to control AI
            // Note: using this.attributes instead of this.get() for performance
            
            // Select ability to use if one isn't already selected
            var ability = this.attributes.desiredAbility;
            var models = null;
            var i = 0;
            var target = null;
            var targetIndex, targetGroup;
            var targets, model, len;

            if(!ability){
                // No ability already chosen? Select one at random
                // TODO: don't do it randomly
                ability = this.getAbilityAI(time);
            }

            // Use the ability
            if(ability && time >= ability.attributes.castTime && 
                // TODO: handle AI delay differently?
                // aiDelay is how long to delay using an ability
                time >= (ability.attributes.castTime + this.attributes.aiDelay)
            ){
                // ----------------------
                // 1. make sure ability is still the right one
                // ----------------------
                // get the ability to use (it might change between selecting
                // the ability the first time and when the entity can cast it)
                // TODO: this might get screwy with the aiDelay...
                this.getAbilityAI(time);
                ability = this.attributes.desiredAbility;

                // make sure the ability can be cast
                if(time < ability.attributes.castTime){
                    return false;
                }

                // ----------------------
                // 2. set desired target
                // ----------------------

                // TODO: target based on ability
                // TODO: Use validTargets instead of checking damage or heal type
                // (don't target enemy for healing spells)
               
                if(ability.attributes.damage){
                    // 1: Target enemy
                    // TODO: get target based on aggro
                    models = battle.get('playerEntities').models;
                    while(true){
                        // TODO: go down aggro list instead of randomly selecting
                        target = models[Math.random() * models.length | 0]; 
                        // TODO: some % chance to randomly select

                        // Check if entity is dead or untargettable
                        if(target.get('isAlive')){
                            found = true;
                            break;
                        }

                        // make sure to avoid endless loop
                        i++;
                        if(i > 10){ break; }
                    }
                    targetIndex = battle.get('playerEntities').indexOf(target), 
                    targetGroup = 'player';

                } else if (ability.attributes.heal){
                    // TODO: Target self group
                    models = battle.get('enemyEntities').models;
                    // TODO: instead of agro list, use a healing list
                    //  entities that have the lowest health should be healed
                    //  first
                    targets = [];

                    for(i=0,len=models.length;i<len;i++){
                        model = models[i];

                        // Check if entity is dead or untargettable
                        if(model.get('isAlive') && 
                            model.get('attributes').get('health') < 
                            model.get('attributes').get('maxHealth')){
                            targets.push({
                                health: model.get('attributes').get('health'),
                                index: i
                            });
                        }
                    }
                    // sort by lowest health
                    targets = _.sortBy(targets, 'health');

                    // if there are no targets to heal, then return false so
                    // a new ability can be selected
                    if(targets.length === 0){ return false; }

                    // set the target as the first entity in the heal list
                    target = models[targets[0].index];

                    // set the target index and group
                    targetIndex = battle.get('enemyEntities').indexOf(target), 
                    targetGroup = 'enemy';

                }

                // ----------------------
                // 2. trigger event to use ability
                // ----------------------
                // TODO: make sure this isn't used over and over
                events.trigger('useAbility', {
                    target: target,
                    targetIndex: targetIndex,
                    entityGroup: targetGroup,

                    sourceEntityIndex: battle.get('enemyEntities').indexOf(this),
                    sourceEntityGroup: 'enemy',
                    ability: ability
                });

                // clear out desirect ability
                this.set('desiredAbility', null);
            }

            return this;
        }

    });

    return Entity;
});

// ===========================================================================
//
//  Entities Collection
//
//      This collection contains entities - i.e., it is the members in
//      a player's or enemy's party 
//
// ===========================================================================
define(
    'collections/Entities',[ 'backbone', 'marionette', 'logger', 'events', 'async',
        'models/Entity'
    ], function EntitiesCollection(
        Backbone, Marionette, logger, events, async,
        Entity
    ){

    var Entities = Backbone.Collection.extend({
        model: Entity,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Entities', 'initialize() called');

            // store the entity group ('player' or 'enemy')
            options = options || {};
            if(options.group){
                this.group = options.group;
            }

            // When an entity dies, listen for the event
            _.each(models, function(model){
                self.listenTo(model, 'entity:died', self.entityDied);
            });
        },

        entityDied: function(options){
            // This is called whenever an individual entity in the collection
            // dies. If all entities have died, trigger the corresponding event
            var self = this;
            logger.log('collections/Entities', 
                '1. entityDied() called');

            // if all the entities are dead, trigger event
            var numDead = 0;
            _.each(this.models, function(model){
                if(!model.get('isAlive')){
                    numDead += 1;
                }
            });

            if(numDead === this.models.length){
                logger.log('collections/Entities', 
                '2. All entities are dead. triggering entityGroup:defeated');

                this.trigger('entityGroup:defeated', { collection: this });
            }

            return this;
        }
    });

    return Entities;
});

// ===========================================================================
//
//  Game
//
//      This model manages a game
//
// ===========================================================================
define(
    'models/Game',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',

        'collections/Entities', 'models/Entity'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,

        Entities, Entity
    ){

    var Game = Backbone.Model.extend({
        defaults: {
            // current map
            activeMap: null,

            // Instance of the node type (e.g., battle)
            activeNodeInstance: null,

            // the player's party
            playerEntities: null,

            // money for the current game
            gold: 0

        },

        url: function getURL(){
            var url = API_URL + 'user/game';
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Game', 'initialize() called');

            // TODO: setup entities
            this.set({
                playerEntities: new Entities([
                    new Entity({}),
                    new Entity({}),
                    new Entity({}),
                    new Entity({})
                ])
            }, {silent: true});
            this.trigger('change:playerEntities');

            return this;
        }
    });

    return Game;
});

// ===========================================================================
//
// PageTitleScreen
// 
// ===========================================================================
define(
    'views/PageHome',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events
    ){

    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',
        events: {
            'click .btn-play-game': 'playGame'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageHome', 'initialize() called');
            return this;
        },
        onShow: function homeOnShow(){
            logger.log('views/PageHome', 'onShow called');
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        playGame: function homePlayGame(e){
            logger.log('views/PageHome', 'playGae button clicked');
            e.stopPropagation();
            e.preventDefault();
            
            // Let controller know play game was clicked
            events.trigger('appRouter:showGame');
        }
    });

    return PageHome;
});

// ===========================================================================
//
// data-map
//
//     Possible list of map node locations
//     TODO: Pull from server when user loads a new map
//
// ===========================================================================
define(
    'models/data-map',[ 'events', 'logger' ], function(
        events, logger
    ){
    // TODO: think of structure.
    var MAP_NODES = {
        // by map
        map1: [
            // First set of possible nodes
            [
                // TODO: Store nextNodes ref differently
                // id is the node id, x / y are the position on the map,
                // nextNodes is an array of neighboring node indicies that the 
                // player can travel to from the current node (directed edges)
                // TODO: add types based on biome type (e.g., coastal, mountain)
                { id: '0', x: 132, y: 337, nextNodes: ['1'] },

                { id: '1', x: 217, y: 306, nextNodes: ['2','3'] },

                { id: '2', x: 272, y: 279, nextNodes: ['4'] }, 
                { id: '3', x: 272, y: 337, nextNodes: [] }, 

                { id: '4', x: 252, y: 229, nextNodes: [] } 

            ]
    
            // Other sets
        ]
    };

    return MAP_NODES;
});

define('lib/noise',[],function(){var Noise={};var ClassicalNoise=function(r){if(r==undefined)r=Math;this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];this.p=[];for(var i=0;i<256;i++){this.p[i]=Math.floor(r.random()*256)}this.perm=[];for(var i=0;i<512;i++){this.perm[i]=this.p[i&255]}};ClassicalNoise.prototype.dot=function(g,x,y,z){return g[0]*x+g[1]*y+g[2]*z};ClassicalNoise.prototype.mix=function(a,b,t){return(1-t)*a+t*b};ClassicalNoise.prototype.fade=function(t){return t*t*t*(t*(t*6-15)+10)};ClassicalNoise.prototype.noise=function(x,y,z){var X=Math.floor(x);var Y=Math.floor(y);var Z=Math.floor(z);x=x-X;y=y-Y;z=z-Z;X=X&255;Y=Y&255;Z=Z&255;var gi000=this.perm[X+this.perm[Y+this.perm[Z]]]%12;var gi001=this.perm[X+this.perm[Y+this.perm[Z+1]]]%12;var gi010=this.perm[X+this.perm[Y+1+this.perm[Z]]]%12;var gi011=this.perm[X+this.perm[Y+1+this.perm[Z+1]]]%12;var gi100=this.perm[X+1+this.perm[Y+this.perm[Z]]]%12;var gi101=this.perm[X+1+this.perm[Y+this.perm[Z+1]]]%12;var gi110=this.perm[X+1+this.perm[Y+1+this.perm[Z]]]%12;var gi111=this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]]%12;var n000=this.dot(this.grad3[gi000],x,y,z);var n100=this.dot(this.grad3[gi100],x-1,y,z);var n010=this.dot(this.grad3[gi010],x,y-1,z);var n110=this.dot(this.grad3[gi110],x-1,y-1,z);var n001=this.dot(this.grad3[gi001],x,y,z-1);var n101=this.dot(this.grad3[gi101],x-1,y,z-1);var n011=this.dot(this.grad3[gi011],x,y-1,z-1);var n111=this.dot(this.grad3[gi111],x-1,y-1,z-1);var u=this.fade(x);var v=this.fade(y);var w=this.fade(z);var nx00=this.mix(n000,n100,u);var nx01=this.mix(n001,n101,u);var nx10=this.mix(n010,n110,u);var nx11=this.mix(n011,n111,u);var nxy0=this.mix(nx00,nx10,v);var nxy1=this.mix(nx01,nx11,v);var nxyz=this.mix(nxy0,nxy1,w);return nxyz};var SimplexNoise=function(r){if(r==undefined)r=Math;this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];this.p=[];for(var i=0;i<256;i++){this.p[i]=Math.floor(r.random()*256)}this.perm=[];for(var i=0;i<512;i++){this.perm[i]=this.p[i&255]}this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]};SimplexNoise.prototype.dot=function(g,x,y){return g[0]*x+g[1]*y};SimplexNoise.prototype.noise=function(xin,yin){var n0,n1,n2;var F2=.5*(Math.sqrt(3)-1);var s=(xin+yin)*F2;var i=Math.floor(xin+s);var j=Math.floor(yin+s);var G2=(3-Math.sqrt(3))/6;var t=(i+j)*G2;var X0=i-t;var Y0=j-t;var x0=xin-X0;var y0=yin-Y0;var i1,j1;if(x0>y0){i1=1;j1=0}else{i1=0;j1=1}var x1=x0-i1+G2;var y1=y0-j1+G2;var x2=x0-1+2*G2;var y2=y0-1+2*G2;var ii=i&255;var jj=j&255;var gi0=this.perm[ii+this.perm[jj]]%12;var gi1=this.perm[ii+i1+this.perm[jj+j1]]%12;var gi2=this.perm[ii+1+this.perm[jj+1]]%12;var t0=.5-x0*x0-y0*y0;if(t0<0)n0=0;else{t0*=t0;n0=t0*t0*this.dot(this.grad3[gi0],x0,y0)}var t1=.5-x1*x1-y1*y1;if(t1<0)n1=0;else{t1*=t1;n1=t1*t1*this.dot(this.grad3[gi1],x1,y1)}var t2=.5-x2*x2-y2*y2;if(t2<0)n2=0;else{t2*=t2;n2=t2*t2*this.dot(this.grad3[gi2],x2,y2)}return 70*(n0+n1+n2)};SimplexNoise.prototype.noise3d=function(xin,yin,zin){var n0,n1,n2,n3;var F3=1/3;var s=(xin+yin+zin)*F3;var i=Math.floor(xin+s);var j=Math.floor(yin+s);var k=Math.floor(zin+s);var G3=1/6;var t=(i+j+k)*G3;var X0=i-t;var Y0=j-t;var Z0=k-t;var x0=xin-X0;var y0=yin-Y0;var z0=zin-Z0;var i1,j1,k1;var i2,j2,k2;if(x0>=y0){if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}}else{if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}}var x1=x0-i1+G3;var y1=y0-j1+G3;var z1=z0-k1+G3;var x2=x0-i2+2*G3;var y2=y0-j2+2*G3;var z2=z0-k2+2*G3;var x3=x0-1+3*G3;var y3=y0-1+3*G3;var z3=z0-1+3*G3;var ii=i&255;var jj=j&255;var kk=k&255;var gi0=this.perm[ii+this.perm[jj+this.perm[kk]]]%12;var gi1=this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]]%12;var gi2=this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]]%12;var gi3=this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]]%12;var t0=.6-x0*x0-y0*y0-z0*z0;if(t0<0)n0=0;else{t0*=t0;n0=t0*t0*this.dot(this.grad3[gi0],x0,y0,z0)}var t1=.6-x1*x1-y1*y1-z1*z1;if(t1<0)n1=0;else{t1*=t1;n1=t1*t1*this.dot(this.grad3[gi1],x1,y1,z1)}var t2=.6-x2*x2-y2*y2-z2*z2;if(t2<0)n2=0;else{t2*=t2;n2=t2*t2*this.dot(this.grad3[gi2],x2,y2,z2)}var t3=.6-x3*x3-y3*y3-z3*z3;if(t3<0)n3=0;else{t3*=t3;n3=t3*t3*this.dot(this.grad3[gi3],x3,y3,z3)}return 32*(n0+n1+n2+n3)};Noise.Classical=ClassicalNoise;Noise.Simplex=SimplexNoise;return Noise});
// ===========================================================================
//
//  MapNode
//
//      A model for an individual map node
//
// ===========================================================================
define(
    'models/MapNode',[ 'backbone', 'logger',
        'events', 'd3', 'util/API_URL'
    ], function MapModel(
        Backbone, logger,
        events, API_URL
    ){

    var MapNode = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,

            // array of node indicies
            nextNodes: [],

            // if the user has visited the node yet
            visited: false,
            isCurrentNode: false,

            biome: 'cave'
        },

        url: function getURL(){
            var url = API_URL + 'map/node/' + this.cid;
            return url;
        },

        initialize: function gameInitialize(){
            logger.log('models/Node', 'initialize() called');
            return this;
        }
    });

    return MapNode;
});

// ===========================================================================
//
//  MapNodes
//
//      This collection contains MapNodes
//
// ===========================================================================
define(
    'collections/MapNodes',[ 'backbone', 'logger', 'events', 
        'models/MapNode'
    ], function MapNodesCollection(
        Backbone, logger, events, 
        MapNode
    ){

    var MapNodes = Backbone.Collection.extend({
        model: MapNode,

        // desired node
        // TODO: should desired / current node info be stored here??
        nextNode: null,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/MapNodes', 'initialize() called');

            // store the entity group ('player' or 'enemy')
            options = options || {};

            this.on('change:nodes', this.updateNextNodesLinks);

            return this;
        },

        updateNextNodesLinks: function updateNextNodesLinks(){
            // Sets the nextNodes array to an array of node objects
            // Original form is an array of node IDs, but we want to link
            // objects
            var self = this;

            // go through each map node, then each map node's next nodes
            _.each(this.models, function(node){
                var nextNodeObjects = [];
                _.each(node.get('nextNodes'), function(nextNodeId){
                    // NOTE: id is not the CID, but just an ID string the
                    // nodes use to reference each other
                    nextNodeObjects.push(self.findWhere({id: nextNodeId}));
                });
                node.set({ nextNodes: nextNodeObjects }, {silent: true});
            });

            return this;
        }
    });

    return MapNodes;
});

// ===========================================================================
//
//  Map
//
//      This model manages a map
//
// ===========================================================================
define(
    'models/Map',[ 'backbone', 'marionette', 'logger',
        'events',
        'd3',
        'util/API_URL',
        'models/data-map',
        'lib/noise',
        'models/MapNode',
        'collections/MapNodes'
    ], function MapModel(
        Backbone, Marionette, logger,
        events,
        d3,
        API_URL,
        MAP_NODES,
        Noise,
        MapNode,
        MapNodes
    ){

        // This model defines a target map (non the app map)
        var Map = Backbone.Model.extend({
            defaults: {
                // collection of node objects
                nodes: null,
                // an array of node model index
                visitedPath: [],

                background: '',
                mapId: null,

                // the width / height the nodes are scaled to
                //  Used by the view to scale the map. I don't consider
                //  these view properties because they're data associated with
                //  the position of the nodes on a map - the view can intrepret
                //  these units however its wishes (e.g., in pixels, scaled
                //  to the actual map's width / height)
                nodeMaxWidth: 800,
                nodeMaxHeight: 400,

                // next desired node
                nextNode: null
            },
        
            url: function getURL(){
                var url = API_URL + 'maps/generate';
                if(this.get('mapId')){
                    url = API_URL + 'maps/' + this.get('mapId');
                }
                return url;
            },

            initialize: function mapInitialize(){
                var self = this;

                return this;
            },

            generateMap: function mapGeneraterMap(){
                // Generate nodes and background. This will live on the server
                
                // get nodes from map data
                // TODO: different set of nodes
                var nodes = MAP_NODES.map1[0];
                // first node is always visted (it's the current node)
                nodes[0].visited = true;
                nodes[0].isCurrentNode = true;

                // create a collection of map nodes and store it
                this.set({ nodes: new MapNodes(nodes) }, {silent: true});
                this.get('nodes').trigger('change:nodes');

                // trigger map model changes
                this.trigger('change');
                this.trigger('change:nodes');
                this.setCurrentNode(this.get('nodes').models[0], {silent:true});

                return this;
            },

            // Node related
            setCurrentNode: function setCurrentNode(node, options){
                options = options || {};
                // unset current node
                logger.log('models/Map', 
                    'setCurrentNode() called with node %O', node);

                // update the visited path first (so changes to currentNode will
                // know about the visible path)
                this.updateVisitedPath(node);

                // update current node
                this.getCurrentNode().set({ isCurrentNode: false }, {silent:!!options.silent}); 

                // set current node
                node.set({ isCurrentNode: true, visited: true });
                if(!options.silent){
                    this.trigger('change:currentNode', {model: node});
                }
            },

            getCurrentNode: function getCurrentNode(){
                // returns the currently active node model
                //
                var i=0;
                var currentNode = null;
                var models = this.get('nodes').models;

                for(i=0;i<models.length;i++){
                    currentNode = models[i];
                    if(currentNode.get('isCurrentNode')){ break; }
                }

                logger.log('models/Map', 
                    'getCurrentNode() got node %O', currentNode);

                return currentNode;
            },

            updateVisitedPath: function updateVisitedPath(node, options){
                // Updates the path of nodes the user took
                options = options || {};
                this.attributes.visitedPath.push(
                    this.get('nodes').indexOf(node)
                );
               
                if(!!options.silent){
                    this.trigger('change');
                    this.trigger('change:visitedPath');
                }
                return this;
            }

        });
        return Map;
});

// ===========================================================================
//
//  Battle
//
//      This model manages an individual battle.
//      Used to keep track of state, battle stats, etc.
//
// ===========================================================================
define(
    'models/Battle',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'collections/Entities',
        'models/Entity',
        'collections/Abilities',
        'models/data-abilities'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity,
        Abilities,
        ABILITIES
    ){

    var Battle = Backbone.Model.extend({
        defaults: {
            id: 0,
    
            // state can be either 'normal' or 'ability' or 'pause'
            state: 'normal',
            previousState: 'normal',

            // ability the player currently has selected
            // TODO: not sure this is the best way to handle this, how to
            // allow auto attacks? does this affect it?
            playerSelectedAbility: null,

            // NOTE: player entities are passed in
            playerEntities: [],
            enemyEntities: [],
            
            //TODO: keep track of stats

            // TODO: rewards
            // These properties are set when model is created or pulled from
            // server, won't change
            rewardGold: 10,
            rewardExp: 10,

            // Item chances
            // NOTE: item chances change based on the encounter
            rewardItemChances: {
                common: 0.2,
                uncommon: 0.05,
                teasured: 0.01,
                legendary: 0.001,
                epic: 0.00001
            }
        },

        url: function getURL(){
            var url = API_URL + 'battle/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            logger.log('models/Battle', 'initialize() called');

            // TODO: get entities from game model
            
            var entities = [];
            var abilities = [];
            var i = 0;

            if(!options.enemyEntities){
                // generate random enemy entities
                entities.push(this.getRandomEntity());
                while(i<3) {
                    if(Math.random() < 0.5){
                        entities.push(this.getRandomEntity()); 
                    }
                    i++;
                }

                this.set({
                    enemyEntities: new Entities(entities)
                }, {silent: true});
            }

            // TODO: get reward stats
            return this;
        },


        getRandomEntity: function getRandomEntity(){
            // Returns a randomly generate enemy entity
            // TODO: make this more smarted, depending on player levels, etc.
            var abilities = [];
            var entity;
            var sprites = ['tiger','man1', 'darkelf'];

            if(Math.random() < 0.8){
                abilities.push(ABILITIES.flamelick);
            }
            if(Math.random() < 0.6){
                abilities.push(ABILITIES.trivialhealing);
            }
            if(Math.random() < 0.2){
                abilities.push(ABILITIES.magicmissle);
            }
            if(Math.random() < 0.05){
                abilities.push(ABILITIES.magicmissle);
            }

            // generate new entity
            entity = new Entity({
                sprite: sprites[ 
                    Math.random() * sprites.length | 0],
                abilities: new Abilities(abilities)
            });

            return entity;
        }
    });

    return Battle;
});

// ===========================================================================
//
//  Map
//
//      This model manages a map
//
// ===========================================================================
define(
    'Models/Map',[ 'backbone', 'marionette', 'logger',
        'events',
        'd3',
        'util/API_URL',
        'models/data-map',
        'lib/noise',
        'models/MapNode',
        'collections/MapNodes'
    ], function MapModel(
        Backbone, Marionette, logger,
        events,
        d3,
        API_URL,
        MAP_NODES,
        Noise,
        MapNode,
        MapNodes
    ){

        // This model defines a target map (non the app map)
        var Map = Backbone.Model.extend({
            defaults: {
                // collection of node objects
                nodes: null,
                // an array of node model index
                visitedPath: [],

                background: '',
                mapId: null,

                // the width / height the nodes are scaled to
                //  Used by the view to scale the map. I don't consider
                //  these view properties because they're data associated with
                //  the position of the nodes on a map - the view can intrepret
                //  these units however its wishes (e.g., in pixels, scaled
                //  to the actual map's width / height)
                nodeMaxWidth: 800,
                nodeMaxHeight: 400,

                // next desired node
                nextNode: null
            },
        
            url: function getURL(){
                var url = API_URL + 'maps/generate';
                if(this.get('mapId')){
                    url = API_URL + 'maps/' + this.get('mapId');
                }
                return url;
            },

            initialize: function mapInitialize(){
                var self = this;

                return this;
            },

            generateMap: function mapGeneraterMap(){
                // Generate nodes and background. This will live on the server
                
                // get nodes from map data
                // TODO: different set of nodes
                var nodes = MAP_NODES.map1[0];
                // first node is always visted (it's the current node)
                nodes[0].visited = true;
                nodes[0].isCurrentNode = true;

                // create a collection of map nodes and store it
                this.set({ nodes: new MapNodes(nodes) }, {silent: true});
                this.get('nodes').trigger('change:nodes');

                // trigger map model changes
                this.trigger('change');
                this.trigger('change:nodes');
                this.setCurrentNode(this.get('nodes').models[0], {silent:true});

                return this;
            },

            // Node related
            setCurrentNode: function setCurrentNode(node, options){
                options = options || {};
                // unset current node
                logger.log('models/Map', 
                    'setCurrentNode() called with node %O', node);

                // update the visited path first (so changes to currentNode will
                // know about the visible path)
                this.updateVisitedPath(node);

                // update current node
                this.getCurrentNode().set({ isCurrentNode: false }, {silent:!!options.silent}); 

                // set current node
                node.set({ isCurrentNode: true, visited: true });
                if(!options.silent){
                    this.trigger('change:currentNode', {model: node});
                }
            },

            getCurrentNode: function getCurrentNode(){
                // returns the currently active node model
                //
                var i=0;
                var currentNode = null;
                var models = this.get('nodes').models;

                for(i=0;i<models.length;i++){
                    currentNode = models[i];
                    if(currentNode.get('isCurrentNode')){ break; }
                }

                logger.log('models/Map', 
                    'getCurrentNode() got node %O', currentNode);

                return currentNode;
            },

            updateVisitedPath: function updateVisitedPath(node, options){
                // Updates the path of nodes the user took
                options = options || {};
                this.attributes.visitedPath.push(
                    this.get('nodes').indexOf(node)
                );
               
                if(!!options.silent){
                    this.trigger('change');
                    this.trigger('change:visitedPath');
                }
                return this;
            }

        });
        return Map;
});

// ===========================================================================
//
// Map subview
//
//      View for the map
//
//  TODO: listen for node finish event, update current node in map model
// ===========================================================================
define(
    'views/subViews/Map',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'Models/Map'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Map
    ){

    // ----------------------------------
    // Helper functions
    // ----------------------------------
    function animatePath(path) {
        path.transition()
            .duration(1500)
            .ease('linear')
            .attrTween("stroke-dasharray", tweenDash)
            .each("end", function() { d3.select(this).call(animatePath); });
    }

    function tweenDash() {
        var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    // ----------------------------------
    //
    // Map view
    //
    // ----------------------------------
    var MapView = Backbone.Marionette.Layout.extend({
        CONFIG: {
            updateDuration: 1500,
            updateEase: 'cubic-in-out'
        },

        template: '#template-game-map',

        events: { },

        'className': 'game-map-wrapper',

        initialize: function mapViewInitialize(options){
            // initialize:
            var self = this;
            logger.log('views/subviews/Map', 'initialize() called');
            this.gameModel = options.gameModel;

            // set as null by default. will be populated when map is drawn
            this.nodes = null;

            // When the current node changes, update the map
            this.listenTo(this.model, 'change:currentNode', this.updateMap);


            // TODO: on node mouse over, draw line
            // TODO: NOOOO remove this, this is JUST for demo
            this.listenTo(events, 'nodeHoverOn', function(options){
                var line = function(d){
                    return d3.svg.line()([
                        [self.nodes.current.x, self.nodes.current.y],
                        [options.d.x, options.d.y]
                    ]);
                };
                self.paths.append('path')
                    .attr({
                        d: line, 
                        'class': 'to-remove destination-path-animated',
                        'filter': 'url(#filter-wavy)'
                    })
                    .call(animatePath);
            });
            this.listenTo(events, 'nodeHoverOff', function(options){
                self.paths.selectAll('.to-remove').transition()
                    .duration(0);
                self.paths.selectAll('.to-remove').remove();
            });

            return this;
        },

        onShow: function mapViewOnShow(){
            // Setup the map svg element and groups
            this.prepareMap();

            // draw / update the map
            this.updateMap();

            return this;
        },

        // ==============================
        //
        // First time setup functions
        //
        // ==============================
        prepareMap: function mapViewDrawMap(options){
            var self = this;
            logger.log('views/subviews/Map', 'prepareMap() called');

            // d3 used to draw map
            var svg = d3.select('#map');
            // empty existing map
            svg.select('.svg-wrapper').remove();

            var width = $('#map').width();
            this.width = width;
            var height = $('#map').height();
            this.height = height;

            // setup wrapper and elements
            this.wrapper = svg.append('g').attr({ 'class': 'svg-wrapper map' });

            this.defs = this.wrapper.append('defs');
            this.maskPath = this.defs.append('mask')
                .attr({ id: 'map-mask' });

            // Add background layer
            // TODO: use difference background image
            this.background = this.wrapper.append('g').attr({'class': 'background'});
            this.background.append("image")
                .attr({ 
                    // TODO: use difference background image
                    'xlink:href': '/static/img/maps/map1-dark.jpg',
                    'preserveAspectRatio': 'none',
                    'class': 'fog', x: 0, y: 0,
                    height: '100%', width: '100%'
                    // fill with blacked out map
                });

            // hull / visible area
            this.visibleArea = this.background.append("image")
                .attr({ 
                    // TODO: use difference background image
                    'xlink:href': '/static/img/maps/map1.jpg',
                    'preserveAspectRatio': 'none',
                    'class': 'visibleArea', x: 0, y: 0,
                    height: '100%', width: '100%'
                })
                .style({ 
                    // fill with full version of map
                    fill: '#336699', mask: 'url(#map-mask)'
                });

            // draw paths under nodes
            this.paths = this.wrapper.append('g')
                .attr({ 'class': 'map-paths' });

            // Add nodes
            this.mapNodes = this.wrapper.append('g')
                .attr({ 'class': 'map-nodes' });

            // stores entity sprite on map
            // --------------------------
            // add group
            this.entitySpritesWrapper = this.wrapper.append('g')
                .attr({ 'class': 'entity-sprites-wrapper' });

            return this;
        },

        prepareEntities: function mapDrawEntities(){
            // Sets up and Draws the entities and their gorups
            var self = this;
            var entityWidth = 60;
            var entityHeight = entityWidth;

            self.entityWidth = entityWidth;
            self.entityHeight = entityHeight;

            this.entitySprites = this.entitySpritesWrapper.append('g')
                .attr({ 
                    'class': 'map-entity-sprites',
                    transform: function(){ 
                        return 'translate(' + [
                            self.nodes.current.x - self.entityWidth/2,
                            self.nodes.current.y - self.entityHeight/1.2
                        ] + ')';
                    }
                });

            // Add the party member to the map
            this.entitySprites.append('image')
                .attr({
                    'xlink:href': function(d, i){
                        // store a ref to the current node
                        return "/static/img/characters/" + 
                            self.gameModel.get('playerEntities').models[0].get('sprite') + '.gif';
                    }, 
                    width: entityWidth, height: entityHeight
                });
        },

        // ==============================
        //
        // Model change callbacks
        //
        // ==============================
        updateNodeReferences: function updateNodeReferences(){
            // Called whenever the current node changes. Updates all
            // node references
            logger.log('views/subviews/Map', '1. updateNodeReferences() called');
            this.nodes = {};

            // visited map nodes also include current node (it's visited)
            this.nodes.visited = this.getNodes({ 
                next: false, visited: true, current: true
            });

            // current will only ever be a single node
            this.nodes.current = this.getNodes({ 
                next: false, visited: false, current: true
            })[0];

            this.nodes.next = this.getNodes({ 
                next: true, visited: false, current: false
            });

            // update all the nodes
            this.nodes.all = this.nodes.visited.concat(this.nodes.next);
            logger.log('views/subviews/Map', '2. updateNodeReferences() all nodes: %O', this.nodes);

            return this;
        },

        // ==============================
        //
        // Draw nodes
        //
        // ==============================
        updateNodes: function mapDrawNodes(){
            // Draws all the nodes on the map
            // TODO: Update the function structure, this is really the main
            // draw func
            var self = this;
            logger.log('views/subviews/Map', 'updateNodes() called');

            // Draw nodes
            var nodes = this.mapNodes.selectAll('.node-wrapper')
                .data(this.nodes.all);

            // Draw circles
            nodes.enter().append('g')
                .on('mouseenter', this.nodeHoverStart)
                .on('mouseleave', this.nodeHoverEnd)
                .on('touchend', this.nodeClicked)
                .on('click', this.nodeClicked);

            // add class names to the node wrapper
            nodes.attr({ 
                'class': function(d,i){
                    var cssClass = 'node-wrapper';

                    if(d.node.get('visited')){ cssClass += ' node-visited'; }
                    if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; }
                    
                    return cssClass;
                }
            });

            // remove existing circles
            // TODO: do this better
            nodes.selectAll('circle').remove();

            // Add circles representing destinations
            var circles = nodes
                .append('circle')
                    .attr({
                        'class': function(d,i){
                            var cssClass = 'map-node'; 
                            if(d.node.get('visited')){ cssClass += ' node-visited'; }
                            if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; }
                            
                            return cssClass;
                        },
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        r: 10
                    });

            // remove any removed nodes
            nodes.exit().remove();
        },

        // ------------------------------
        // Draw a paths
        // ------------------------------
        updatePaths: function(){
            var self = this;
            //  1. Draw a path based on the visited nodes path
            logger.log('views/subviews/Map', 
                'visitedNodes : %O', this.nodes.visited);

            var visited = self.model.get('visitedPath');

            // add group for visited paths if it hasn't been added yet
            if(!this.visitedPaths){
                this.visitedPaths = this.paths.append('g')
                    .attr({ 
                        'filter': 'url(#filter-wavy)'
                    });
            }

            // Add a line between the last visited node and the current
            if(visited.length >= 2){
                this.visitedPaths.append('path')
                    .attr({
                        'class': 'visited-path visited-path-dotted',
                        d: function(){
                            var coords = [];
                            // if no nodes have been visited yet, return empty array
                            if(visited.length < 2){ return ''; }

                            var previousIndex = visited[visited.length-2];
                            var currentIndex = visited[visited.length-1];
                            var previous  = self.getCoordinatesFromNode(
                                self.model.get('nodes').models[previousIndex]
                            );

                            return d3.svg.line()([ 
                                // first pair (previous node)
                                [previous.x, previous.y], 
                                [self.nodes.current.x, self.nodes.current.y]
                            ]);
                        }
                    })
                    // transition the line coming in
                    .transition().duration(this.CONFIG.updateDuration)
                        .ease(this.CONFIG.updateEase)
                        .attrTween("stroke-dasharray", tweenDash);
            }

            // --------------------------
            //
            //  2. Draw a path from the current node to the next nodes
            //
            // --------------------------
            // add paths
            line = function(d){
                return d3.svg.line()([
                    [self.nodes.current.x, self.nodes.current.y],
                    [d.x, d.y]
                ]);
            };

            // remove existing destination paths
            d3.selectAll('.destination-path').remove();

            var destinationPaths = this.paths.selectAll('.destination-path')
                .data(this.nodes.next);

            // draw the dotted path
            destinationPaths.enter().append('path');

            destinationPaths
                .attr({
                    d: line, 
                    'class': 'destination-path destination-path-dotted',
                    'filter': 'url(#filter-wavy)',
                    'stroke-dashoffset': 0
                });

            ////draw the animated path
            ////TODO: Should this antimate? If it should be, we can do this:
            //// NOTE: Be sure to cancel the animation
            _.each(destinationPaths[0], function(path){
                path = d3.select(path);
                var totalLength = path.node().getTotalLength();
                var duration = 18000 * (totalLength / 115);
                var i = 1;
                function animateNextPath(){
                    // need to check if the path was removed from the DOM.
                    // If so, remove the path and stop the animations
                    if(!path[0][0].parentNode){ path.remove(); return false; }

                    path.transition().duration(duration).ease("linear")
                        .attr("stroke-dashoffset", -totalLength * i)
                            .each('end', function(){ d3.select(this).call(animateNextPath); });
                    i += 1;
                }
                animateNextPath();
            });

            // remove old paths
            destinationPaths.exit().remove();

            return this;
        },

        // ------------------------------
        //
        // Map Node interactions
        //
        // ------------------------------
        nodeClicked: function nodeClicked(d,i){
            // CLICK event
            // callback when a node is interacted with
            // TODO: What should happen?
            logger.log('views/subviews/Map', '%s %O %O', 
                'nodeClicked:', d, i);

            // If the node is the current node OR the node has been visited,
            // do nothing
            if (d.node.get('isCurrentNode')){
                logger.log('views/subviews/Map', '[x] already visited this node');
                // TODO: do an effect
                alert("You're already heree");
            } else if(d.node.get('visited')){
                logger.log('views/subviews/Map', '[x] already visited this node');
                // TODO: do an effect
                alert('Already visted this location');
            } else {
                // Can travel to the node
                events.trigger('map:nodeClicked', {node: d.node});
            }
        },

        // HOVER events
        // --------------------------
        nodeHoverStart: function nodeHoverStart(d,i){
            logger.log('views/subviews/Map', '%s d:%O i:%O', 
                'nodeHoverStart:', d, i);

            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            events.trigger('nodeHoverOn', {d: d});
            // hover effect
            d3.select(this).classed('node-hover', true);
        },

        nodeHoverEnd: function nodeHoverEnd(d,i){
            logger.log('views/subviews/Map', '%s %O %O',
                'nodeHoverEnd:', d, i);
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            // TODO: REMOVE !!!!!!!!!!!!!!!!
            events.trigger('nodeHoverOff', {d: d});
            d3.select(this).classed('node-hover', false);
        },

        // =====================================================================
        //
        // Update Map functions
        //
        // =====================================================================
        updateMap: function mapUpdate(){
            // Draws all nodes then updates the visible areas
            var self = this;
            logger.log('views/subviews/Map', 
                '=== 1. updateMap() called');

            // update the store node references
            this.updateNodeReferences();

            // setup entity groups if it hasn't been setup
            if(!this.entitiesSetup){
                this.prepareEntities();
                this.entitiesSetup = true;
            }


            // draw / update nodes
            this.updateNodes();
            this.updatePaths();

            // minor delay to delay SVG filter effect
            setTimeout(function(){
                self.updateVisible.call(self);
            }, 20);

            // transition the entity to the next node
            this.moveEntity();

            return this;
        },

        moveEntity: function moveEntity(){
            // Move the entity sprite to the next node. This is called whenever
            // the node instance successfully is completed
            var self = this;

            this.entitySprites.transition()
                .duration(this.CONFIG.updateDuration)
                .ease(this.CONFIG.updateEase)
                .attr({ 
                    transform: function(){ 
                        return 'translate(' + [
                            self.nodes.current.x - self.entityWidth/2,
                            self.nodes.current.y - self.entityHeight/1.2
                        ] + ')';
                    }
                });
            
            return this;
        },

        

        // =====================================================================
        //
        // Utility Functions
        //
        // =====================================================================
        getNodes: function mapGetNodes(options){
            // This function will get (a subset) of nodes from the map's
            // node list, process them, and return them. For processing, it
            // transforms the x/y of the node into the actual x/y map coordinates
            //
            // options: {object} optional, describes what subset of nodes to get
            //
            //      all these options default to `true`
            //
            //      visited: {boolean} get nodes that have been visited 
            //      current: {boolean} get the current node
            //      next: {boolean} get the neighors of the current node
            var self = this;
            options = options || {};
            logger.log('views/subviews/Map', 
                '1. getNodes() called: %O', options);

            var nodes = this.model.get('nodes');
            var vertices = [];
            var currentNode;

            if(options.current !== false){
                currentNode = this.model.getCurrentNode();
                vertices.push( _.extend(
                    { node: currentNode },
                    self.getCoordinatesFromNode(currentNode)
                ));
            }

            // push the current node's next possible neighbors
            if(options.next !== false){
                _.each(this.model.getCurrentNode().get('nextNodes'), function(node){
                    vertices.push( _.extend(
                        { node: node },
                        self.getCoordinatesFromNode(node)
                    ));
                });
            }

            // push all visted nodes
            if(options.visited !== false){
                _.each(nodes.models, function(node){
                    if(node.attributes.visited){ 
                        if( !node.attributes.isCurrentNode ){
                            vertices.push( _.extend(
                                { node: node },
                                self.getCoordinatesFromNode(node)
                            ));
                        }
                    }
                });
            }

            return vertices;
        }, 

        getCoordinatesFromNode: function getCoordinatesFromNode(node){
            // Returns the map x/y for a passed in map node object
            var coordinates = {
                x: node.attributes.x * (this.width/this.model.get('nodeMaxWidth')), 
                y: node.attributes.y * (this.height/this.model.get('nodeMaxHeight'))
            };

            return coordinates;
        },

        // ------------------------------
        // Hide the fog for visible nodes
        // ------------------------------
        updateVisible: function mapGenerateHull(){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            var vertices = this.nodes.all;

            var filter = '';

            // only use filters if lowRes mode is not true
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#filter-map)';
            }

            // create a masked path to show visible nodes
            var masks = this.maskPath.selectAll('.visibleNode')
                .data(vertices);

            masks.enter()
                .append('circle')
                .style({
                    fill: '#ffffff'   
                });

            masks.attr({
                'class': 'visibleNode',
                cx: function(d){ return d.x; },
                cy: function(d){ return d.y; },
                filter: filter,
                r: function(d){ 
                    var r = 73;
                    // note: make unvisited nodes have a smaller visible
                    // radius
                    if(d.node.attributes.isCurrentNode){ } 
                    else if(d.node.attributes.visited){ r = 73; } 
                    else { r = 45; }
                    return r;
                }
            });

            masks.exit().remove();

            return this;
        }

    });

    return MapView;
});

// ===========================================================================
//
// Battle - Ability Item subview
//      View for an ability list
//
//  Shows the available abilities for an entity
//
// ===========================================================================
define(
    'views/subviews/battle/AbilityItem',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var AbilityItem = Backbone.Marionette.ItemView.extend({
        template: '#template-game-battle-ability',
        'className': 'ability-item-wrapper inactive',

        serializeData: function(){
            return _.extend({
                cid: this.model.cid,
                index: this.index
            }, this.model.toJSON());
        },

        // When this element is interaction with, use the corresponding
        // ability
        events: {
            'click': 'useAbility',
            'touchend': 'useAbility'
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'initialize() called for: ' + this.model.get('name'));

            // index is the index of this itemview in the collection
            this.index = options.index;

            // TODO: use a hotkey configuration instead of hardcoding
            var key = [ 'q', 'w', 'e', 'r'][this.index];
            // do the same thing, but also if user holds shift
            var keyShift = [ 'shift+q', 'shift+w', 'shift+e', 'shift+r'][this.index];

            // handle keypress
            this.listenTo(events, 'keyPress:' + key, this.useAbility);
            this.listenTo(events, 'keyPress:' + keyShift, this.useAbility);

            // handle battle related events
            this.listenTo(events, 'ability:cancel', this.cancelAbility);

            this.listenTo(this.model, 'abilityActive', this.setAbilityActive);
            this.listenTo(this.model, 'abilityInactive', this.setAbilityInactive);

            return this;
        },

        cancelAbility: function(options){
            // called when the user pressed 'escape' or the ability cannot
            // be used (trigged in the Battle controller view)
            this.$el.removeClass('use');
            return this;
        },

        // ------------------------------
        // timer updates
        // ------------------------------
        setAbilityActive: function(){
            this.$el.removeClass('inactive');
            this.$el.addClass('active');
        },
        setAbilityInactive: function(){
            this.$el.removeClass('active');
            this.$el.addClass('inactive');
        },

        // ------------------------------
        // Use ability
        // ------------------------------
        useAbility: function(options){
            // Called when either the user clicks on the ability or presses the 
            // hotkey. If the ability can't be used yet, do nothing
            // TODO: global timer? for each entity? pass in entity for this
            // ability?
            var self = this;
            logger.log('views/subviews/battle/AbilityItem', 
                'ability used! ' + this.model.get('name') + 
                ' | key pressed: ' + options.key);
            

            events.trigger('ability:activated', {
                ability: this.model,

                useCallback: function(err, options){
                    // This callback is called immediately upon ability
                    // usage. If it can be used, color it green; otherwise,
                    // color it grey
                    var canBeUsed = options.canBeUsed;

                    // Can the ability be used? If not, add the use-invalid class
                    if(!canBeUsed){
                        // Can NOT be used
                        self.$el.addClass('use-invalid');
                        self.$el.focus();
                        setTimeout(function(){
                            self.$el.removeClass('use-invalid');
                        }, 100);
                    } else {
                        // CAN use
                        // add class
                        self.$el.addClass('use');
                        self.$el.focus();
                    }
                }
            });

            return this;
        }

    });

    return AbilityItem;
});

// ===========================================================================
//
// Battle - Ability List subview
//      View for an ability list
//
//  Shows the available abilities for an entity
//
// ===========================================================================
define(
    'views/subviews/battle/AbilityList',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityItem'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events,
        AbilityItem
    ){

    var AbilityList = Backbone.Marionette.CollectionView.extend({
        itemView: AbilityItem,
        'className': 'ability-list-wrapper',

        itemViewOptions: function(model){
            return {index: this.collection.indexOf(model)};
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/AbilityList', 
            'initialize() called');

            // keep track of what entity this ability list is for
            this.entityModel = options.entityModel;

            // if an entity died when this view is rendered, update the template
            this.listenTo(this.entityModel, 'entity:died', this.entityDied);

            // keep track of the active (usable) abilities (abilities that are 
            // usable, the timer has past the castTime)
            this.activeAbilities = {};
            _.each(this.collection.models, function(model){
                self.activeAbilities[model.cid] = false; 
            });

            return this;
        },

        onShow: function(){
            if(!this.entityModel.get('isAlive')){
                this.$el.append('<div class="entity-dead"></div>');
            }

            return this;
        },

        // ------------------------------
        // Game events
        // ------------------------------
        checkTimer: function checkTimer(time){
            // called on each loop iteration. Check the abilities 
            // and triggers a change event if necessary
            // TODO : Might not want to do this? 
            // TODO: update UI's progress bar based on loop? NO - use d3
            // timers to do it instead, less DOM updates
            var self = this;

            _.each(this.collection.models, function checkTimerAbilityListLoop(ability){
                // see if ability is usable. if so, trigger a change event
                // if necessary (which abilityItem view listens for)

                // if the activeAbilities ability has an inverse equality,
                // change the equality and trigger an event on the ability
                // model
                if(time < ability.attributes.castTime){
                    // CANNOT use
                    //
                    if(self.activeAbilities[ability.cid]){ 
                        self.activeAbilities[ability.cid] = false;
                        ability.trigger('abilityInactive');
                    }
                } else {
                    // CAN use
                    if(!self.activeAbilities[ability.cid]){ 
                        self.activeAbilities[ability.cid] = true;
                        ability.trigger('abilityActive');
                    }
                }
            });

            return this;
        },

        entityDied: function entityDied(options){
            // called when an entitiy dies
            logger.log('views/subviews/battle/AbilityList', 
            'entityDied() : bluring abilities');

            this.$el.append('<div class="entity-dead"></div>');

            return this;
        }
    });

    return AbilityList;
});

// ===========================================================================
//
// Battle - Entity info subview
//      Entity battle related info (health, magic, timer, etc) 
//
// ===========================================================================
define(
    'views/subviews/battle/SelectedEntityInfo',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var Entity = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle-selected-entity-info',
        'className': 'selectedEntityInfoWrapper',

        initialize: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'initialize called');

            this.listenTo(this.model.get('attributes'), 'change', this.rerender);
            this.listenTo(this.model.get('baseAttributes'), 'change', this.rerender);

            return this;
        },
        onBeforeClose: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                '[x] closing');
        },

        onShow: function infoOnShow(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'onShow() called');

            this.$timerNode = $('.timer', this.$el)[0];
            return this;
        },

        rerender: function infoRerender(){
            this.render();
            this.onShow();
            return this;
        },

        updateTimer: function infoUpdateTimer(time){
            // called by the battle controller, the current game time is
            // passed in
            //
            return this;

            // TODO: DOM updates too slow
            var current = Math.round(time * 100) / 100;

            // don't update DOM if value is same
            if(current !== this.last){
                this.$timerNode.innerHTML = this.last;
                this.last = current;
            }
            return this;
        }
    });

    return Entity;
});

// ===========================================================================
//
// Battle - Entity info subview
//      Entity battle related info (health, magic, timer, etc) 
//
// ===========================================================================
define(
    'views/subviews/battle/IntendedTargetInfo',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var Entity = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle-intended-target-info',
        'className': 'intendedTargetInfoWrapper',

        initialize: function(){
            logger.log('views/subviews/battle/IntendedTaretInfo', 
                'initialize called');

            this.listenTo(this.model.get('attributes'), 'change', this.render);
            this.listenTo(this.model.get('baseAttributes'), 'change', this.render);
            return this;
        }
    });

    return Entity;
});

// ===========================================================================
//
// Battle Controller / View
//
//  TODO: Break up view and controller logic
//  TODO: Should transitions instead use the global game timer?
//  TODO: Clean up code
//  TODO: PAUSE FUNCTIONALITY
//      -Should be able to select an ability when not in pause mode,
//      pause, unpause, then use it (cannot now)
//      -Should be able to select an ability in pause mode
//      -Abilities should have a way to trigger remember action and trigger
//      afterwards (BIG)
//
//
//      View for a battle. Sub views contains in the Combat subfolder
//
// Battle Oveview:
//
//      This view is instaniated when a battle takes place. A battle
//      will not always happen after clicking on a map node - there may
//      be an option to not fight before this view is created.
//
//      Battles happen between the game player and a single enemy. Each player
//      has a party (a collection of entities). The player's entities are
//      managed in the Game model object's 'playerEntities' property (a 
//      collection of entity models)
//
// Win condition:
//      When all enemy entities are dead. 
//      Anytime an entity dies, the entity:died event is triggered. When all
//      entities in a group die, the 'entityGroup:defeated' event is triggered
//      (from the entity group collection), passing in the group
//
//
// "Game" Loop
//      This battle controller contains a game loop, used to keep track of when
//      abilities can be used, buffs expire, etc. All abilities and timers
//      are express to the player in terms of seconds
//
//
// End states:
//      1. Player defeats all enemy entities
//      2. Player retreats
//      3. All of player's entities die
//      4. Player surrenders (Not always an option)
//      5. Enemy retreats
//      6. Eneemy surrenders
//
//
// States:
//  There are two states: "normal" and "ability".
//      1. Normal (default): Player is able to select an entity and
//      decide what ability to use.
//      2. Targetting: After selecting an ability to use, player selects
//      the entity they want to use the ability on
//
//
// View overview
// --------------------------------------
//  This view renders the battle scene and acts as a controller for the battle.
//
//
// ===========================================================================
define(
    'views/subViews/Battle',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'views/subviews/battle/AbilityList',
        'views/subviews/battle/SelectedEntityInfo',
        'views/subviews/battle/IntendedTargetInfo'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        AbilityListView,
        SelectedEntityInfoView,
        IntendedTargetInfoView
    ){

    // Utility functions
    function timestampFunc() {
        return window.performance && window.performance.now ? window.performance.now : new Date().getTime;
    }

    // =======================================================================
    //
    // Battle view
    //
    // =======================================================================
    var BattleView = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle',
        'className': 'game-battle-wrapper',

        events: {
            // UI User input
            'click .finish-instance': 'finishInstance',
            'click .btn-pause': 'togglePause'
        },

        regions: {
            'regionSelectedEntity': '#region-battle-selected-entity-wrapper',
            'regionIntendedTarget': '#region-battle-intended-target-wrapper',
            'regionAbility': '#region-battle-ability-wrapper'
        },

        initialize: function battleViewInitialize(options){
            var self = this;
            options = options || {};
            this.gameModel = options.gameModel;

            logger.log('views/subviews/Battle', 
                '1. initialize() called. Model: %O : Game Model: %O', 
                this.model, this.gameModel); 

            // keep track of the selected entity and the current target
            this.selectedEntityIndex = undefined;
            this.selectedEntityGroup = undefined;
            this.selectedEntity = undefined;
            this.previouslySelectedEntityIndex = undefined;

            // set references for entities
            this.playerEntityModels = this.model.get('playerEntities').models;

            // target should reset whenever entity changes
            //  should be able to select own entities with 1 - n keys,
            //      target with shift + n 
            //  if target is null when an ability is attempted to be used,
            //      user must select a target for the ability
            this.selectedTarget = undefined;

            // --------------------------
            // Ability use callback
            // --------------------------
            // TODO: Better way to handle this? Have in own controller
            this.listenTo(events, 'useAbility', this.useAbility);

            // ==========================
            // Handle user input - shortcut keys
            // ==========================
            // Pressing up or down will cycle through the entities
            this.listenTo(events, 'keyPress:up', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:k', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpdateSelection);
            this.listenTo(events, 'keyPress:j', this.handleKeyUpdateSelection);

            // do something on left / right key ?
            // TODO: this?
            this.listenTo(events, 'keyPress:left', function(options){
                options.e.preventDefault();
            });
            this.listenTo(events, 'keyPress:right', function(options){
                options.e.preventDefault();
            });

            _.each([1,2,3,4,6], function eachKey(key){
                self.listenTo(events, 'keyPress:' + key, self.handleKeyUpdateSelection);
                self.listenTo(events, 'keyPress:shift+' + key, self.handleKeyUpdateSelection);
            });

            // escape pressed
            this.listenTo(events, 'keyPress:escape', this.handleKeyEscape);
            // space pressed (pause)
            this.listenTo(events, 'keyPress:space', this.togglePause);

            // --------------------------
            // Handle ability usage
            // --------------------------
            this.listenTo(events, 'ability:activated', this.handleAbilityActivated);
        
            // handle state changes
            this.listenTo(this.model, 'change:state', this.stateChange);
            this.listenTo(this.model, 'change:selectedAbility', this.selectedAbilityChange);

            // ==========================
            // Scroll input
            // ==========================
            // use this in favor of function.prototype.bind for larger browser
            // support
            this.handleMouseWheelProxy = function(e){
                self.handleMouseWheel(e);
            };
            $(window).on('mousewheel', this.handleMouseWheelProxy);

            // Timer / Game loop 
            // --------------------------
            // used to pause or cancel timer
            this.isTimerActive = false;

            // NOTE: death listeners are setup in onShow
            
            return this;
        },

        onBeforeClose: function close(){
            logger.log('views/subviews/Battle', 'onBeforeClose() called');

            // remove mouse wheel listener
            $(window).off('mousewheel', this.handleMouseWheelProxy);

            this.isTimerActive = false;
            return this;
        },

        // ==============================
        //
        // Win / Loss State
        //
        // ==============================
        enemyGroupDied: function enemyGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            var reward = {
                gold: this.model.get('rewardGold'),
                exp: this.model.get('rewardExp')
            };

            console.log("so win." + JSON.stringify(reward));
            return this;
        },
        playerGroupDied: function playerGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            console.log("so lose.");
            return this;
        },

        setupDeathListeners: function battleSetupDeathListeners(){
            // Note: This is called in onShow, after all entities are ready
            //
            // This sets up death listeners for each entity, along with
            // the entire group defeat listener
            var self = this;

            _.each(['player', 'enemy'], function eachModelSetup(group){
                // For each model, listen for an individual death
                var collection = self.model.get(group + 'Entities');
                
                _.each(collection.models, function deathListener(model){
                    self.listenTo( model, 'entity:died', self.entityDied);
                });

                // For the entire collection, listen when the group is defeated
                // (this is either a win or lose state)
                self.listenTo(
                    collection,
                    'entityGroup:defeated', 
                    self[group + 'GroupDied']);
            });
        },

        // ==============================
        //
        // Timer
        //
        // ==============================
        runTimer: function battleRunTimer(){
            // TODO: ::: Can we put the timer in a web worker?
            //
            // This is called to kicked off the game loop for the battle.
            // Store variables the battleFrame loop function will access
            //
            // Note: This is called as one of the last actions in the onShow()
            // method
            var self = this,
                
                timerNow = null,
                timerDt = 0,
                timerLast = (window.performance && window.performance.now ? window.performance.now() : new Date().getTime()),

                fps = 60,
                timerStep = 1 / fps,

                slow = 1, // slow factor
                slowStep = slow * timerStep,

                timerRender = this.timerRender,
                timerUpdate = this.timerUpdate;

            // store some timer refs
            this.timerFps = fps;
            this.timerStep = timerStep;

            // when runTimer is called, set the timer to be active
            this.isTimerActive = true;

            function battleFrame(){
                // This function is called each frame. Call render() to keep
                // render state up to date, call update() on a fixed time
                //
                timerNow = (window.performance && window.performance.now ? window.performance.now() : new Date().getTime());
                // cap time if requestAnimFrame is stalled (e.g., user switches tab)
                timerDt = timerDt + Math.min(
                    1, (timerNow - timerLast) / 1000);

                while(timerDt > timerStep) {
                    // Only call update when delta is greater than the timer step
                    // to maintain constant calls
                    timerDt = timerDt - timerStep;
                    timerUpdate.call(self, timerStep);
                }

                // always call render though, so we can draw things properly
                timerRender.call(self, timerDt);
                timerLast = timerNow;


                if(self.isTimerActive){
                    requestAnimationFrame(battleFrame);
                } else {
                    return false;
                }
            }

            // TODO: Restart any setTimeouts on ability effects

            // start the game loop
            this.start = new Date();
            requestAnimationFrame(battleFrame);
            return this;
        },

        timerRender: function battleTimerRender(dt){
            // if we wanted to update the battle scene
        },

        // TIMER UPDATE
        // ------------------------------
        timerUpdate: function battleTimerUpdate(dt){
            // Update each entity's timer. This is the main update function
            // TODO: do DoT effects? other time based effects?
            //
            // Fixed update function. Called to update the timer for each
            // entity. This only increments entity timers and triggers events
            // for ability usage
            //
            var self = this;

            // 1. Update timers
            _.each(['player', 'enemy'], function timerEachGroup(entityGroup){
                var models = self.model.attributes[entityGroup + 'Entities'].models;

                // For each model in each group, increase the timer
                _.each(self[entityGroup + 'EntityTimers'], function timerEachEntityTimer(val,index){
                    var model = models[index];

                    if(!model.attributes.isAlive){
                        // DEAD
                        // --------------
                        // if entity is dead, do nothing
                        self[entityGroup + 'EntityTimers'][index] = 0;

                    } else {
                        // ALIVE
                        // --------------
                        // increase timer
                        if( val < model.attributes.timerLimit){
                            // increase the timer by the timer step - e.g., if FPS is
                            // 60, each update tick is 1/60
                            self[entityGroup + 'EntityTimers'][index] += self.timerStep;
                        }
                        if ( val < 0){
                            self[entityGroup + 'EntityTimers'][index] = 0;
                        }

                        if(entityGroup === 'player'){
                            // PLAYER 
                            // ----------
                            // check abilities use timers for UI
                            // - Selected Entity - UI
                            if(model === self.selectedEntity){
                                // on the selected ability list view, call checkTimer
                                // which will update the ability list item ui
                                self.currentAbilityListView.checkTimer(
                                    self[entityGroup + 'EntityTimers'][index]);
                            }

                            // If auto attack is enabled, let AI decide behavior
                        } else {
                            // ENEMY
                            // ----------
                            // AI for enemy
                            // TODO: don't do the battle AI logic in the model
                            // Pass in the current time
                            model.handleAI(
                                // time
                                self[entityGroup + 'EntityTimers'][index],
                                // battle model
                                self.model
                            );
                        }

                    }
                });
            });

            //// 3. Update info views
            //// TODO: update each ability's timer
            //this.entityInfoView.updateTimer(
                //this.playerEntityTimers[this.selectedEntityIndex]
            //);

            return this;
        },


        // ------------------------------
        //
        // PAUSE 
        //
        // ------------------------------
        togglePause: function pause(options){
            // This pauses all timers and animations, effectively pausing
            // the battle. When the battle is paused, abilities cannot be
            // used. 
            //
            // Players may select an entity and mouse over to target entities
            //
            var self = this;

            options = options || {};
            if(options.e){
                options.e.preventDefault();
                options.e.stopPropagation();
            }

            // Already paused, UNPAUSE
            // ----------------------
            if(this.model.get('state') === 'pause'){
                this._unpause();
            } else {
                this._pause();
            }

            return false;
        },

        _pause: function _pause(){
            // PAUSE
            // ----------------------
            logger.log('views/subviews/Battle', 
                '1. togglePause(): PAUSING');

            // Show pause message
            this.$pauseBlocker.classed('active', true);

            // cancel target and pause
            this.cancelTarget();

            // set state
            this.model.set({
                state: 'pause',
                previousState: this.model.get('previousState')
            });
            
            // pause animations
            d3.selectAll('#battle .timer-bar').transition().duration(0);

            // stop the timer
            // pauses the timer by setting isTimerActive to false.
            // After this is called, runTimer() must be called to run the
            // timer again
            this.isTimerActive = false;

            return this;
        },

        _unpause: function _unpause(){
            // Called to pause the game state and animations
            //
            var self = this;
            logger.log('views/subviews/Battle', 
                '1. togglePause(): UNPAUSING');

            // remove blocker
            this.$pauseBlocker.classed('active', false);

            // set state
            this.model.set({
                state: 'normal'
            });

            // resumse all animations
            var e = d3.select("#time");
            var sel = d3.selectAll('#battle .timer-bar');

            // for each selection, update transition
            _.each(sel[0], function unpauseEachSelection(el){
                $el = d3.select(el);
                var entityGroup = $el.attr('data-entityGroup');
                var index = $el.attr('data-index');
                var val = self[entityGroup + 'EntityTimers'][index];

                var duration = ( 
                    self.model.get(entityGroup + 'Entities').models[index].get('timerLimit') - val
                ) * 1000;

                $el.transition().ease('linear') 
                    .duration( duration )
                    .attr({
                        'data-duration': duration,
                        'data-time': 1,
                        'width': $el.attr('data-endWidth')
                    });
            });

            // reset timer
            this.runTimer();

            return this;
        },

        // ==============================
        //
        // Battle Model Changes
        //
        // ==============================
        selectedAbilityChange: function selectedAbilityChange(model, ability){
            // When the player's selected ability changes, change the SVG wrapper
            logger.log('views/subviews/Battle', 
                '1. abilityChange(): ability changed to %O', ability);
            var type = '';
            var validTargets = ''; 

            if(ability){
                // TODO: more damage types? DOTs?
                if(ability.get('damage')){ type = 'selected-ability-damage'; }
                else if(ability.get('heal')){ type = 'selected-ability-heal'; }

                // get valid targets
                validTargets = ability.get('validTargets');
                if(validTargets.join){ 
                    validTargets = validTargets.join(' selected-ability-');
                }
                validTargets = 'selected-ability-' + validTargets;
            }

            // remove classes
            // TODO: if more types, add them here
            this.$wrapper.classed(
                'selected-ability-damage selected-ability-heal selected-ability-enemy selected-ability-player',
                false);

            if(type){ this.$wrapper.classed(type, true); }
            if(validTargets){ this.$wrapper.classed(validTargets, true); }

            return this;
        },

        stateChange: function stateChange(model,state){
            // Called when the model state changes
            logger.log('views/subviews/Battle', 
                '1. stateChange(): model state changed to: ' + state);

            // remove all classes
            this.$wrapper.classed('state-normal state-ability', false);

            // TODO: do stuff based on state change
            if(state === 'normal'){
                // From ability to normal
                this.$wrapper.classed('state-normal', true);
                
            } else if (state === 'ability'){
                // From ability to normal
                this.$wrapper.classed('state-ability', true);
            }

            // DEV: TODO: REMOVE
            $('.state', this.$el).html(state);
        },

        // ------------------------------
        // Ability use handler
        // ------------------------------
        handleAbilityActivated: function handleAbilityActivated(options){
            // This function sets the model's state to either 'ability' or
            // 'normal' (by means of calling cancelTarget())
            //
            // parameters: 
            //  options: {Object} with keys:
            //      ability: {Object} ability object
            //      //TODO: Rename to activateCallback or something
            //      useCallback: {Object} callback to call after using an 
            //      ability
            //
            // When an ability is activated:
            //  1. check if ability can be used (check entity timer with passed 
            //  entity)
            //  2. switch ability state
            //
            // This function is an event handler which is called when
            // an ability is attempted to be used. There are multiple
            // things that can happen:
            //
            // 1. Previously was in a normal state, player uses ability for
            // the first time to activate an ability
            // 2. Player has an ability active already, but has NOT selected
            // a target. Player has tried to use the same ability
            // 3. Player has an ability active already, but has NOT selected
            // a target. Player has tried to use a different ability
            //
            var ability = options.ability;
            var useCallback = options.useCallback;

            logger.log('views/subviews/Battle', 
                '1. handleAbilityActivated: %O', ability);

            // Do nothing if game is paused
            if(this.model.get('state') === 'pause'){
                logger.log('views/subviews/Battle', '2. game paused, returning');
                return false;
            }
            
            var canBeUsed = false;

            // Check usage based on timer
            var entityTime = this.playerEntityTimers[this.selectedEntityIndex];
            if(entityTime >= ability.get('castTime')){
                logger.log('views/subviews/Battle', 
                    'handleAbilityActivated  : CAN be used');
                canBeUsed = true;
            } else {
                logger.log('views/subviews/Battle', 
                    'handleAbilityActivated  : CANNOT be used');
            }

            // Toggle ability on / off
            // --------------------------
            // if same ability was used, do nothing
            if(this.model.get('selectedAbility') === options.ability){
                return false;
            }

            // Remove existing target
            // --------------------------
            this.cancelTarget();

            // Use ability if it can be used
            // --------------------------
            if(canBeUsed){
                // The ability CAN be used

                // Set the selected ability
                this.model.set({selectedAbility: ability},{silent:false});

                // change the state to ability. Now, when the user clicks on
                // an entity, the ability will be used
                this.model.set({ state: 'ability' });

                // highlight the possible targets (whatever group)
                // TODO: Highlight group of possible targets based on ability
                // options.ability.get('validTargets') bla bla bla
            } 

            // call the useCallback
            if(useCallback){ useCallback(null, {canBeUsed: canBeUsed}); }

            return this;
        },

        // ==============================
        //
        // User input - Shortcut keys
        //
        // ==============================
        handleKeyUpdateSelection: function handleKeyUpdateSelection(options){
            // This function selects an entity based on a keypress. 
            // j / k and up / down select next or previous entity the
            // player controls, as does the 1 - 4 keys
            //
            // To select an enemy : use keys 1 - n
            // To select a player entity : use keys shift + 1 - n

            // disable page scrolling with up / down arrow key
            if(options.e){
                options.e.preventDefault();
            }

            var key = options.key;
            // If user has an ability selected, only targetting allowed is
            // using 1 - n, shift + 1 - n, and clicking / selecting an entity
            if(this.model.get('state') === 'ability' &&
                key.match(/[0-9]+/) === null){
                logger.log('views/subviews/Battle', 
                    '[x] in ability mode and a key other than 1 - n or shift + 1 -n was pressed');
                return false;
            }

            
            var entityGroup = 'player';

            // TODO: Handle different functions based on state
            var targetIndex = this.selectedEntityIndex;
            if(targetIndex === undefined){ targetIndex = -1; }

            // reverse up down - down key should go down the entity list
            if(key === 'up' || key === 'k'){ targetIndex -= 1; }
            else if (key === 'down' || key === 'j'){ targetIndex += 1; }
            else if(key.match(/^shift\+[0-9]+/)){ 
                // If the keys are number keys, select the specific entity 
                // for the player
                targetIndex = +(key.replace('shift+', '')) - 1;
            }
            else if(key.match(/[0-9]+/)){
                // When in ability mode, using the 1 - n keys will select an
                // enemy
                if(this.model.get('state') === 'ability'){
                    targetIndex = +key - 1;
                    entityGroup = 'enemy';
                } else { 
                    // when the user is not in ability mode, do nothing when
                    // 1 - n key is pressed
                    logger.log('views/subviews/Battle', 
                        '[x] 1-n key pressed not in ability mode, returning');
                    return false;
                }
            } 

            var entities, modelsLength;
            if(entityGroup === 'player'){
                entities = this.model.get('playerEntities');
                modelsLength = entities.models.length;
                // loop around if the end is reached
                if(targetIndex >= modelsLength){
                    targetIndex = 0;
                } else if( targetIndex < 0) {
                    targetIndex = modelsLength - 1;
                }
            } else if (entityGroup === 'enemy'){
                // If the player tries to select an entity outside of range
                //  e.g., selects entity 4 but there's only 3 entities, then
                //  select the last entity
                entities = this.model.get('enemyEntities');
                modelsLength = entities.models.length;
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                }
            }

            // --------------------------
            // 2. Got target entity, select it
            // --------------------------
            logger.log('views/subviews/Battle', 
                '1. got key press : ' + key + 
                ' : entityGroup: ' + entityGroup +
                ' : Selecting entity: ' + targetIndex);

            // select the entity
            this.selectEntity({
                entityGroup: entityGroup,
                index: targetIndex
            });

            return this;
        },

        handleKeyEscape: function handleKeyEscape(options){
            // When escape is pressed, it should return to the
            // normal battle state
            options.e.preventDefault();

            var key = options.key;
            logger.log('views/subviews/Battle', '1. got key press : ' + key);

            //If in pause, switch back
            if(this.model.get('state') === 'pause'){
                return this.togglePause();
            }

            this.cancelTarget();
            return this;
        },

        // ------------------------------
        // mouse scroll event
        // ------------------------------
        handleMouseWheel: function(e){
            // When the mousewheel is scrolled, determine if it's up or down,
            // then select the player's entity above or below the current one
            // stop scrolling on the page
            if(e){
                e.preventDefault();
            }

            var direction = 'up';
            if(e.originalEvent.wheelDelta < 0){
                direction = 'down';
            }

            this.handleKeyUpdateSelection({key: direction});
            return this;
        },

        // ------------------------------
        // Cancel target
        // ------------------------------
        cancelTarget: function cancelTarget(){
            // return to default state
            logger.log('views/subviews/Battle', '1. cancelTarget, changing state');

            this.model.set({selectedAbility: null}, {silent:false});

            events.trigger('ability:cancel');
            this.model.set({
                state: 'normal'
            });
            return this;
        },

        // =====================================================================
        //
        // Render / Show
        //
        // =====================================================================
        onShow: function battleOnShow(){
            // Render the scene
            var self = this;
            // TODO: remove timer el for dev
            this.$timerEl = $('.timer', this.$el);

            logger.log('views/subviews/Battle', '1. onShow() called');
            
            // Setup svg
            var svg = d3.select('#battle');
            this.$svg = svg;

            var wrapper = svg.append('g');
            this.$wrapper = wrapper;

            // entity props
            var entityHeight = 60;
            var entityWidth = entityHeight;
            this.entityHeight = entityHeight;
            this.entityWidth = entityWidth;

            // update models
            // --------------------------
            this.playerEntityModels = this.model.get('playerEntities').models;

            // --------------------------
            // Handle entity death
            // --------------------------
            this.setupDeathListeners();

            // Setup timer and time scales for each group
            // --------------------------
            _.each(['player', 'enemy'], function setupTimers(entityGroup){
                // TODO: don't repeat enemy / player(?) Use a single collection(?)
                self[entityGroup + 'EntityTimers'] = [];
                self[entityGroup + 'EntityTimeScales'] = [];
                var models = self.model.get(entityGroup + 'Entities').models;

                _.each(models, function timerEachModel(model){
                    // setup timer for each entity
                    self[entityGroup + 'EntityTimers'].push(0);

                    // Setup scales for each entity
                    // --------------------------
                    // the scale is used to calculate the width of the timer bar
                    // the domain units is in seconds
                    self[entityGroup + 'EntityTimeScales'].push(
                        d3.scale.linear()
                            .domain([ 0, model.get('timerLimit')])
                            .range([ 0, entityWidth ])
                    );
                });
            });

            // --------------------------
            // setup groups
            // --------------------------
            logger.log('views/subviews/Battle', '2. setting up groups');
            var background = wrapper.append('g')
                .attr({ 'class': 'background' });

            // add pause block
            this.$pauseBlocker = wrapper.append('rect')
                .attr({ 'class': 'pause-blocker', x: 0, y: 0, width: '100%', height: '100%' })
                .style({ fill: 'none' });

            // damage / heal effect flash
            this.$healthEffectBlocker = wrapper.append('rect')
                .attr({ 'class': 'health-blocker', x: 0, y: 0, 
                    width: '100%', height: '100%' })
                .style({ fill: 'none', opacity: 0 });

            this.$deathEffectBlocker = wrapper.append('rect')
                .attr({ 'class': 'health-blocker', x: 0, y: 0, 
                    width: '100%', height: '100%' })
                .style({ fill: 'none', opacity: 0 });

            // setup groups for entities
            var entityGroups = {
                player: wrapper.append('g')
                    .attr({ 'class': 'player-entities' }),
                enemy: wrapper.append('g')
                    .attr({ 'class': 'enemy-entities' })
            };

            // Spell effect group - spell effects are appended here
            this.$abilityEffects = wrapper.append('g')
                .attr({ 'class': 'ability-effects' });

            // --------------------------
            // setup background
            // --------------------------
            logger.log('views/subviews/Battle', '3. setting up backdrop');
            // TODO: use different background images
            var backgroundImage = background.append('image')
                .attr({
                    'xlink:href': '/static/img/backdrops/cave.png',
                    'preserveAspectRatio': 'none',
                    'class': 'backgroundImage', x: 0, y: 0,
                    height: '100%', width: '100%'
                });

            logger.log('views/subviews/Battle', '4. setting up entities');

            // ==========================
            //
            // Draw Player entities
            //
            // ==========================
            // TODO: text effect that comes up from entity when damaged or healed

            // TODO: Clean up code
            //
            function drawEntities(entityGroup){
                // This function is called to draw entities for a passed in
                // entity group {String} ( either 'player' or 'enemy')
                // The main difference between the two functions is the 
                // placement and model setup of the entities in each group

                // if enemy entities, place near edge of map
                // TODO: get map width
                var entityGroupX = (entityGroup === 'player' ? 40 : 500);

                // Setup the wrapper group
                // Whenever interaction happens with it, select or hover the 
                // entity
                var groupsWrapper = self[entityGroup + 'EntityGroupsWrapper'] = entityGroups[
                    entityGroup].selectAll('.entity-group')
                        .data(self.model.get(entityGroup + 'Entities').models)
                        .enter().append('g')
                            .attr({ 
                                'class': 'entity-group-wrapper ' + entityGroup,
                                // transform the entire group to set the entity position
                                transform: function groupsWrapperTransform(d,i){
                                    return "translate(" + [
                                        entityGroupX, 
                                        40 + (i * (entityHeight + entityHeight ))
                                    ] + ")";
                                }
                            })
                            .on('click', function entityClicked(d,i){ 
                                return self.selectEntity({index: i, entityGroup: entityGroup});
                            })
                            .on('touchend', function entityTouchEnd(d,i){ 
                                return self.selectEntity({index: i, entityGroup: entityGroup});
                            })
                            .on('mouseenter',function entityMouseEnter(d,i){ 
                                // TODO: fix this when ability changes
                                d3.select(this).classed('entity-hover', true);
                                return self.entityHoverStart({index: i, entityGroup: entityGroup});
                            })
                            .on('mouseleave',function entityMouseLeave(d,i){ 
                                d3.select(this).classed('entity-hover', false);

                                return self.entityHoverEnd({index:i, entityGroup: entityGroup});
                            });

                // Append an invisible rect for interaction
                //  this is a large rect behind the sprites that allows the user
                //  to click / tap it
                groupsWrapper.append('rect')
                    .attr({
                        opacity: 0,
                        x: -entityWidth, y: -15,
                        width: entityWidth + 150,
                        height: entityHeight + 25
                    });
        
                // setup the individual player groups. This group is transformed
                // left / right when a player selects an entity. All other entity
                // specific visuals are contained in this group
                var groups = self[entityGroup + 'EntityGroups'] = groupsWrapper.append('g')
                    .attr({ 'class': 'entity-group ' + entityGroup });

                // ----------------------
                // Targetting Ring
                // ----------------------
                self[entityGroup + 'EntityTargetRings'] = groups.append('ellipse')
                    .attr({
                        'class': entityGroup + '-target-indicator target-indicator',
                        cy: entityHeight/1.2,
                        cx: entityWidth/1.9,
                        ry: 15,
                        rx: entityWidth/1.5
                    });

                // --------------------------
                // PLAYER SPRITE / image
                // --------------------------
                // TODO : figure out better way to handle sprites
                self[entityGroup + 'EntitySprites'] = groups.append('image')
                    .attr({
                        'class': entityGroup + '-entity entity',
                        'transform': function(d,i){
                            var transform = '';
                            if(entityGroup === 'enemy'){
                                transform = 'translate(' + [
                                    entityWidth, 0
                                ] + ') scale(-1 1)';
                            }
                            return transform;
                        },
                        'xlink:href': function(d, i){
                            return "/static/img/characters/" + 
                                d.attributes.sprite + '.gif';
                        }, 
                        height: entityHeight,
                        width: entityWidth
                    });

                // ----------------------
                // Health Bars
                // ----------------------
                // Draw bars
                var healthGroups = groups.append('g')
                    .attr({ 'class': 'battle-entity-health ' + entityGroup });

                var healthBarHeight = 10;
                // frame / border (TODO: Use image)
                healthGroups.append('rect')
                    .attr({
                        'class': 'health-bar-border ' + entityGroup,
                        x: 0,
                        y: entityHeight + 5,
                        width: entityWidth,
                        height: healthBarHeight
                    });
        
                // actual health bar that updates
                healthGroups.append('rect')
                    .attr({
                        'class': 'health-bar ' + entityGroup,
                        x: 0,
                        y: entityHeight + 5,
                        height: healthBarHeight,
                        width: function healthSetWidth(d, i){
                            var model = self.model.get(
                                entityGroup + 'Entities').models[i];
                            var maxHealth = model.get('attributes')
                                .get('maxHealth');
                            var health = model.get('attributes').get('health');
                            var d3this = d3.select(this);

                            var healthScale = d3.scale.linear()
                                .domain([0, maxHealth])
                                .range([0, entityWidth])
                                .clamp(true);
                    
                            // when health changes, update width of health bar
                            self.listenTo(model.get('attributes'), 
                                'change:health',
                                function updateHealth(returnedModel, health, changeOptions){
                                    // called when health updates
                                    // NOTE: if the entity is dead, don't
                                    // update the bar
                                    if(model.get('isAlive')){
                                        d3this.transition()
                                            .attr({
                                                width: healthScale(health)
                                            });
                                    } else {
                                        // entity is dead, make sure health
                                        // is at 0 and cancel existing transitions
                                        d3this.transition().duration(0).attr({
                                            width: healthScale(0)
                                        });
                                    }
                            });

                            // set current width based on model health
                            return healthScale(health);
                        }
                    }); 

                // ----------------------
                // timer bar group
                // ----------------------
                //  draw a group for each bar (frame + bar)
                var timerGroup = groups
                    .append('g').attr({ 
                        'class': 'entity-timer ' + entityGroup,
                        'transform': 'translate(0, -10)'
                    });

                // frame / border (TODO: Use image)
                timerGroup.append('rect')
                    .attr({
                        'class': 'timer-bar-border',
                        x: 0,
                        y: 0,
                        width: entityWidth,
                        height: 10
                    });
        
                // actual timer bar that updates
                self[entityGroup + 'TimerBars'] = timerGroup.append('rect')
                    .attr({
                        'class': 'timer-bar ' + entityGroup,
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 10
                    }); 

                // ----------------------
                // Damage Text animation
                // ----------------------
                // There can be multiple text elements at once, anytime health
                // changes create a floating text element for it
                self[entityGroup + 'EntityDamageTextGroups'] = groups.append('g');

                return this;
            }

            // ==========================
            //
            // draw enemies
            //
            // ==========================
            drawEntities('player');
            drawEntities('enemy');

            // ==========================
            //
            // Game Loop 
            //
            // ==========================
            // Kick off the timer
            this.runTimer();

            // start the timer bar animation for each entity
            _.each(['player', 'enemy'], function startTimers(entityGroup){
                var bars = self[entityGroup + 'TimerBars'][0];

                _.each(bars, function eachTimerBar(bar, i){
                    self.startTimerAnimation.call(self, {
                        index: i,
                        entityGroup: entityGroup
                    });
                });
            });

            // After everything is rendered, select first living entity
            var firstAliveEntity = 0;
            var i = 0;
            var models = this.model.get('playerEntities').models;
            while(i < models.length){
                if(models[i].get('isAlive')){ 
                    firstAliveEntity = i;
                    break;
                }
                i++;
            }
            logger.log("views/subviews/Battle", 
                "selected first living entity: index: " + i);

            // select first living player
            this.selectPlayerEntity({index:firstAliveEntity});


            // --------------------------
            // show damage text whenever entitiy's health changes
            // --------------------------
            _.each(['player', 'enemy'], function healthGroup(entityGroup){
                var models = self.model.get(entityGroup + 'Entities').models;
                _.each(models, function setupHealthCallback(model, index){
                    self.listenTo(
                        model.get('attributes'), 
                        'change:health', 
                        // model changes get passed in the model and the
                        // changed attribute value
                        function callShowText(attrModel, health, changeOptions){
                            return self.showEffectOnHealthChange.call(
                                self, {
                                    entityModel: model,
                                    model: attrModel,
                                    health: health,
                                    index: index,
                                    entityGroup: entityGroup,
                                    changeOptions: changeOptions
                                }
                            );
                        });
                });
            });

            return this;
        },

        showEffectOnHealthChange: function showTextEffect(options){
            // This is called whenever any entity's health is changed.
            // Text will appear, along with the screen flashing
            //
            // The text will be styled based on the difference
            //
            // options:
            //      model: {Object} the `attributes` model of the entity model
            options = options || {};
            logger.log("views/subviews/Battle", 
                "1. showEffectOnHealthChange() : options: %O",
                options); 

            var self = this;
            var model = options.model; // attribute model (health / stats / etc)
            var entityModel = options.entityModel;
            var index = options.index;
            var entityGroup = options.entityGroup;
            var difference = options.health - model._previousAttributes.health;

            // Show flash
            // --------------------------
            // Show a red flash whenever the player takes damage
            var fill = '';
            var opacity = '';

            if(entityGroup === 'player'){
                if(difference < 0){ 
                    // If damage is done, flash the screen red
                    fill = '#dd0000';
                    opacity = d3.scale.linear()
                        .domain([ 0, -model.attributes.maxHealth ])
                        .range([ 0.2, 0.9 ])
                        (difference);

                } else { 
                    // if entity is healed, flash the screen green
                    fill = '#22dd22';
                    opacity = d3.scale.linear()
                        .domain([ 0, model.attributes.maxHealth ])
                        .range([ 0.1, 0.8 ])
                        (difference);
                }
                
                // do the flash
                this.$healthEffectBlocker.transition().ease('elastic')
                    .style({ fill: fill, opacity: opacity })
                    .transition()
                    .ease('elastic')
                        .style({ fill: '', opacity: 0 });
            }

            // --------------------------
            // Wiggle 
            // --------------------------
            // Do a wiggle event on the entity
            var intensityDamageScale = d3.scale.linear()
                .domain([ 0, -model.attributes.maxHealth * 0.9])
                .range([ -20, -80 ]);
            var intensityHealScale = d3.scale.linear()
                .domain([ 0, model.attributes.maxHealth ])
                .range([ -10, -40 ]);

            if(entityModel.get('isAlive')){
                // initiate the wiggle 
                d3.select(self[entityGroup + 'EntitySprites'][0][index])
                    .attr({
                        // wiggle the entity left / right or up / down depending
                        // if the ability has negative or positive damage
                        x: difference < 0 ? intensityDamageScale(difference) : 0,
                        y: difference > 0 ? intensityHealScale(difference) : 0
                    })
                    .transition()
                    .duration(520)
                    .ease('elastic')
                        .attr({
                            x: 0, y: 0
                        });
            }

            // Show text
            // --------------------------
            // This is called whenever any entity's health is modified
            var $damageText = d3.select(
                self[entityGroup + 'EntityDamageTextGroups'][0][index]
            ).append('text')
                .attr({
                    'class': 'entity-group-text ' + entityGroup,
                    // position it based on positive / negative health change
                    x: difference < 0 ? -25 : 25
                });

            // first, start text at bottom of entity and set text
            //  will have either 'positive damage' or 'negative damage' classes
            $damageText.classed((difference < 0 ? 'negative' : 'positive') + ' damage', true);

            $damageText
                .attr({ 
                    y: self.entityHeight - 10,
                    opacity: 0.2
                })
                .text((difference < 0 ? '' : '+') + difference);

            // then, fade in text and float it up
            $damageText.transition().duration(200)
                    .attr({ y: -10, opacity: 1 })
                    // when that's done, fade it out
                    .transition()
                        .duration(300).attr({  opacity: 0 });
        },

        // =====================================================================
        //
        // timer animation
        //
        // =====================================================================
        startTimerAnimation: function startTimerAnimation(options){
            // Starts (or restarts) the timer animation, transitioning the 
            // bar's width to width of the entity scale. This happens to
            // all timer bars on a per entity level
            //
            // Options: {Object}
            //  value: {Number} Value to start the count at (must be calculated 
            //      by caller based on the ability value and value left in timer
            //  index: {Number} index of entity
            //  entityGroup: {String} 'player' or 'enemy'
            //
            logger.log("views/subviews/Battle", 
                '1. startTimerAnimation: << started : %O', options);

            // check options
            options = options || {};
            if(options.value === undefined){ options.value = 0; }

            var entityGroup = options.entityGroup;

            if(options.index === undefined ||
                !options.entityGroup){
                logger.error("views/subviews/Battle : startTimerAnimation : " +
                    'invalid parameters passed in: %O', options);
                return false;
            }

            // get bar from passed in index
            var bar = this[entityGroup + 'TimerBars'][0][options.index];
            var d3sel = d3.select(bar);
            var models = this.model.get(options.entityGroup + 'Entities').models;
            var targetModel = models[options.index];

            if(!targetModel.get('isAlive')){ 
                logger.log("views/subviews/Battle", 
                    "2. target model is not alive, not starting animation");
                return false;
            }

            // get widths
            // --------------------------
            var startWidth = this[options.entityGroup + 'EntityTimeScales'][options.index](options.value);
            startWidth = startWidth >= 0 ? startWidth: 0;

            // get bar width from the entity scale
            var endWidth = this[entityGroup + 'EntityTimeScales'][
                options.index].range()[1];
            endWidth = endWidth >= 0 ? endWidth : 0;

            //1. Reset bar width
            d3sel.transition()
                .ease('linear')
                .duration(0)
                .attr({ 
                    // starting bar width based on value
                    width: startWidth,
                    'data-time': 0,
                    'data-index': options.index,
                    'data-entityGroup': entityGroup
                }).each('end', function startTimerAnimationTransitionEnd(){
                    // 2. After bar is reset, transition to specified width
                    var duration = ( 
                        targetModel.get('timerLimit') - options.value
                    ) * 1000;

                    // keep track of duration and end width for pausing
                    // we multiply data-time by data-duration to get the
                    // time left
                    d3sel.attr({ 
                        'data-duration': duration,
                        'data-endWidth': endWidth 
                    });

                    // transition the bar width to the end of the range
                    // --------------------------
                    d3sel.transition()
                        .ease('linear')
                        .duration( duration )
                        .attr({ 
                            width: endWidth,
                            'data-time': 1
                        });
                });

            return this;
        },

        // =====================================================================
        //
        // Select Entity
        //
        // =====================================================================
        selectEntity: function selectEntity(options){
            // This is a proxy function that will call the corresponding select
            // entity type function based on the passed in entityGroup
            options = options || {};

            if(options.entityGroup === 'player'){
                // Select player enemy
                return this.selectPlayerEntity(options);
            } else if(options.entityGroup === 'enemy'){
                // Select enemy entity
                return this.selectEnemyEntity(options);
            }
        },

        selectPlayerEntity: function selectPlayerEntity(options){
            // This triggers when an entity is selected - meaning, whenever
            // a user selects an entity to use an ability or see more info
            // about it. 
            //
            // index: index of selected entity (matches with the order of
            //  playerEntities.models)
            options = options || {};
            var i = options.index;
            
            // STATE: normal
            var state = this.model.get('state');
            if(state === 'normal' || state === 'pause'){
                this.selectPlayerEntityStateNormal({index: options.index});

            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                var target = this.selectTarget(i, 
                    this.model.get('playerEntities').models);

                // then, use the ability
                // TODO: think of call structure
                this.useAbility({
                    target: target, 
                    targetIndex: i, 
                    entityGroup: 'player'
                });
            }

            return this;
        },

        // select Enemy entity
        selectEnemyEntity: function selectEnemyEntity(options){
            options = options || {};
            var i = options.index;
            
            if(this.model.get('state') === 'normal'){
                // TODO: show more info on enemy?
            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                var target = this.selectTarget(i, 
                    this.model.get('enemyEntities').models);

                // then, use the ability
                this.useAbility({
                    target: target,
                    targetIndex: i, 
                    entityGroup: 'enemy'
                });
            }

            return this;
        },

        // ------------------------------
        //
        // Select entity by state 
        //
        // ------------------------------
        selectTarget: function selectTarget(i, models){
            // Sets the target based on the selected index in the model
            logger.log("views/subviews/Battle", 
                '1. selectTarget : i: %O : model : %O', i, models[i]);
            var model = models[i];

            // TODO: update svg elements
            //
            //
            this.selectedTarget = model;

            return this.selectedTarget;
        },

        selectPlayerEntityStateNormal: function selectPlayerStateNormal(options){
            // Select an entity at passed in index in the normal state
            // --------------------------
            // overview:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            options = options || {};
            var i = options.index;

            // if the user selected the currently active entity, do nothing
            if(i === this.previouslySelectedEntityIndex){ 
                logger.log("views/subviews/Battle", 
                    '0. entity selected: same entity selected, exiting : i : %O', i);
                return false; 
            } 

            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "1. entity selected: %O \n model: %O", i, model);

            // update the selected entity
            this.selectedEntityIndex = i;
            this.selectedEntityGroup = 'player';
            this.selectedEntity = model;

            // show abilities for this entity. Create new AbilityList view
            // --------------------------
            logger.log("views/subviews/Battle", "2. showing ability view");
            var abilityListView = new AbilityListView({
                collection: model.get('abilities'),
                entityModel: model
            });
            // store ref to ability list view so we can show active abilities
            this.currentAbilityListView = abilityListView;
            this.regionAbility.show(abilityListView);

            // show entity info
            logger.log("views/subviews/Battle", "3. showing entity info");
            this.entityInfoView = new SelectedEntityInfoView({ model: model });
            this.regionSelectedEntity.show(this.entityInfoView);

            // move entity group forward
            logger.log("views/subviews/Battle", "4. moving entity");
            var d3selection = d3.select(this.playerEntityGroups[0][i]);
            d3selection
                .transition()
                .attr({ transform: 'translate(100)' });

            // move back previously selected entity
            if(this.previouslySelectedEntityIndex !== undefined){
                d3.select(this.playerEntityGroups[0][
                this.previouslySelectedEntityIndex])
                    .transition()
                    .attr({ transform: ''});
            }

            // update the previously selected entity
            this.previouslySelectedEntityIndex = i;

            return this;
        },

        entityHoverStart: function entityHoverStart(options){
            //logger.log("views/subviews/Battle", "entity hover start: %O : %O", d,i);
            this.setIntendedTarget(options);

            return this;
        },
        entityHoverEnd: function entityHoverEnd(options){
            //logger.log("views/subviews/Battle", "entity hover end: %O : %O", d,i);
            this.clearIntendedTarget();

            return this;
        },

        // ------------------------------
        //
        // Hover - Intended Target states
        //
        // ------------------------------
        setIntendedTarget: function setIntendedTarget(options){
            // Sets the intended target. The intended target specifies which
            // entity the spell could be cast on. 
            // Options: 
            //      entityGroup: {string} 'player' or 'enemy'
            //      index: {number} index of entity in entity group
            //
            this.intendedTarget = {
                index: options.index,
                entityGroup: options.entityGroup
            };

            logger.log("views/subviews/Battle", 
                "1. setIntendedTarget : options: %O", options);

            var model = this.model.get(options.entityGroup + 'Entities')
                .models[options.index];
            var infoView = new IntendedTargetInfoView({ model: model });
            this.regionIntendedTarget.show(infoView);

            return this;
        },

        clearIntendedTarget: function clearIntendedTarget(){
            // Clears out the intended target info window
            logger.log("views/subviews/Battle", 
                "1. clearIntendedTarget : previous target: %O", 
                this.intendedTarget);

            this.regionIntendedTarget.close();
            this.intendedTarget = null;

            return this;
        },

        // ==============================
        //
        // Use ability
        //
        // ==============================
        useAbility: function battleUseAbility(options){
            // TODO: think of call structure
            // TODO: Move forward entity when ability is used
            // TODO: Split out the visible stuff and the logic parts. most of 
            // this function is logic that could live elsewhere
            options = options || {};
            var self = this;

            // TARGET
            var target = options.target;
            var targetEntityGroup = options.entityGroup;
            var targetEntityIndex = options.targetIndex;

            // SOURCE 
            // By default, is the selected entity
            //
            // set the source entity index ( the entity using the ability )
            //
            // NOTE: if no source was passed in, assume the source is from the
            // player
            var playerUsedAbility = false;

            var sourceEntityIndex = options.sourceEntityIndex;
            if(sourceEntityIndex === undefined){
                sourceEntityIndex = this.selectedEntityIndex;
                playerUsedAbility = true;
            }
            var sourceEntityGroup = options.sourceEntityGroup;
            if(sourceEntityGroup === undefined){
                sourceEntityGroup = this.selectedEntityGroup;
            }
            var sourceEntity = this.model.get(sourceEntityGroup + 'Entities')
                .models[sourceEntityIndex];

            // ABILITY
            // get selected ability from the user's selected ability
            var selectedAbility = options.ability;

            if(selectedAbility === undefined){
                selectedAbility = this.model.get('selectedAbility');
            }

            // --------------------------
            // Use the ability
            // --------------------------
            // Uses whatever the active ability is on the target
            logger.log("views/subviews/Battle", 
                "1. useAbility(): using ability: %O on %O",
                selectedAbility, 
                target);

            // check that selected ability is an ability
            if(!selectedAbility){
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid ability");
                return false;
            }

            // TODO : use selected entity index for enemies
            var entityTime = this[sourceEntityGroup + 'EntityTimers'][
                sourceEntityIndex];

            // If the intended target is not in the ability's usable target 
            // group, cannot use the ability
            var validTarget = selectedAbility.get('validTargets');

            // if the AI used the ability, the validTargets should be switched
            //  (to an enemy, the 'enemy' is the player, and 'player' is the AI)
            var invalidTarget = false;

            // if the PLAYER used the ability, check for valid target.
            //  The handleAI() logic will handle valid target checks for enemies
            if(playerUsedAbility){
                invalidTarget = (validTarget !== targetEntityGroup && 
                    validTarget.indexOf(targetEntityGroup) === -1);
            } 

            // check that target is valid (either enemy or player)
            if( invalidTarget ||
                // check if target is dead
                ( !target.get('isAlive') && validTarget.indexOf('dead') === -1 )
            ){
                //
                // Cannot use because the entity group of the intended target 
                // is not valid
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid target");
                // don't cancel out the target, just let anyone listening know
                // the target is invalid
                events.trigger('battle:useAbility:invalidTarget', {
                    ability: selectedAbility    
                });

                return false; 
            }


            // If the battle's timer is LESS than the castTime attribute, do 
            // nothing
            if(entityTime < selectedAbility.get('castTime')){
                // >>>> CAN NOT use (timer not met)
                // TODO: visual spell effect
                // TODO: multiple targets 
                logger.log("views/subviews/Battle", 
                    "2. CANNNOT use ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                return false;

            } else {
               // >>>> CAN use (timer met)
                logger.log("views/subviews/Battle", 
                    "2. USING ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                // update the timer
                // --------------------------
                this[sourceEntityGroup + 'EntityTimers'][sourceEntityIndex] -= 
                    selectedAbility.get('timeCost');

                // --------------------------
                // reset animation
                // --------------------------
                this.startTimerAnimation({
                    index: sourceEntityIndex,
                    value: entityTime - selectedAbility.get('timeCost'),
                    entityGroup: sourceEntityGroup
                });
                
                // --------------------------
                // use ability
                // --------------------------
                // get effect function and call it
                // TODO: multiple targets 
                selectedAbility.effect({
                    target: target,
                    source: sourceEntity
                });

                // --------------------------
                // Reset back to normal state
                // --------------------------
                if(playerUsedAbility){
                    this.cancelTarget();
                }

                // TODO: do a spell effect (always do it, even if entity is
                // dead)
                // --------------------------
                // TODO: put this in a separate method
                //
                // effect needs a source and a target. each spell can have
                // its own custom effect. 
                // TODO: put this in model? model hold data, so it doesn't seem
                // like view logic should be there, but placing it there
                // would encapsulate all ability logic / effects which the
                // view could call
                // TODO: a spell may have multiple effect icons

                if(selectedAbility.attributes.effectId){
                    // update the bounding rect
                    this.wrapperBoundingRect = this.$svg.node().getBoundingClientRect();

                    // get the position of the entity sprite
                    // TODO: cache bounding rect
                    var sourceRect = d3.select(this[sourceEntityGroup + 'EntitySprites'][0][sourceEntityIndex])
                        .node()
                        .getBoundingClientRect();
                    var targetRect = d3.select(this[targetEntityGroup + 'EntitySprites'][0][targetEntityIndex])
                        .node()
                        .getBoundingClientRect();

                    // get position relative to the battle svg they are contained in
                    var targetPos = {};
                    var sourcePos = {};

                    // set the position based on the source / target bounding
                    // rects and update the position
                    _.each([[targetRect, targetPos], [sourceRect, sourcePos]],
                        function(item){
                        //item[0] is the bounding rect, item[1] is relative position
                        item[1].top = item[0].top - self.wrapperBoundingRect.top;
                        item[1].bottom = item[0].bottom - self.wrapperBoundingRect.top;
                        item[1].left = item[0].left - self.wrapperBoundingRect.left;
                        item[1].right = item[0].right - self.wrapperBoundingRect.left;
                    });

                    // TODO: rotate / flip effect based on source and target
                    // if target and source are same group, flip the effect up or
                    // down?
                    var scaleAmount = '';
                    if(sourceEntityGroup === 'enemy'){
                        scaleAmount = 'scale(-1 1)';
                    }

                    // draw effect from target to source
                    //
                    // get a copy of the svg effect
                    //  all effects should be wrapped in a svg element with id of
                    //  `effect-spellName`, and the wrapper should have no attributes
                    function renderEffect(){
                        var $effect = d3.sticker('#effect-' + selectedAbility.attributes.effectId);
                        // append it the ability effects group
                        $effect = $effect(self.$abilityEffects);

                        // start in the middle of the source
                        $effect.attr({
                            // set start position immediately
                            transform: 'translate(' + [
                                // get midpoints
                                sourcePos.left + ((sourcePos.right - sourcePos.left) / 2), 
                                sourcePos.top + ((sourcePos.bottom - sourcePos.top) / 2)
                                ] + ') ' + scaleAmount

                        })
                            // then travel to the target
                            .transition()
                            .ease('cubic-in')
                            .duration(selectedAbility.attributes.castDuration * 1000) 
                            .attr({
                                transform: 'translate(' + [
                                    // send to edge of either enemy or player
                                    targetEntityGroup === 'enemy' ? targetPos.left - 20 : targetPos.right + 20,
                                    // get midpoints
                                    targetPos.top + ((targetPos.bottom - targetPos.top) / 2)
                                    ] + ') ' + scaleAmount
                            })
                            .each('end', function(){
                                // remove the effect
                                // NOTE: the entity wiggle will happen in the 
                                // change:health callback
                                d3.select(this).remove();
                            });
                    }

                    // do the effect
                    renderEffect();

                    // if the ability has multiple ticks, do it
                    var curTick = 0;
                    if(selectedAbility.attributes.ticks){
                        while(curTick < selectedAbility.attributes.ticks){
                            setTimeout(
                                renderEffect,
                                (selectedAbility.attributes.tickDuration * 1000) * (curTick + 1)
                            );
                            curTick += 1;
                        }
                    }
                }


                // Move the entity that used the ability forward
                // --------------------------
                // only move the entity if it's not selected by the player
                if(this.selectedEntity !== sourceEntity && sourceEntity.get('isAlive')){
                    // Move the SOURCE entity to the left / right, indiciating
                    // the entity used an ability
                    d3.select(this[sourceEntityGroup + 'EntityGroups'][0][sourceEntityIndex])
                        .transition()
                        .attr({ transform: 'translate(' + [
                                (sourceEntityGroup === 'enemy' ? -100 : 100), 
                                0] + ')' })
                            .transition()
                                .attr({ transform: 'translate(0 0)' });

                }
            }

            return this;
        },

        // ==============================
        // 
        // Entity death 
        //
        // ==============================
        entityDied: function battleEntityDied(options){
            // Called when an entity dies
            // TODO : pass in index and whatnot
            //
            // options: {Object} consisting of 
            //  model: {Object} entity object
            var self = this;

            logger.log("views/subviews/Battle", 
                "1. entityDied() : options: %O", options);

            
            // Reset timer animation
            // Get index
            var index;
            var group = '';

            // cancel target
            this.cancelTarget();

            // get the index and entity group so we can do some animation
            _.each(['player', 'enemy'], function deathGroup(entityGroup){
                var tmpIndex = self.model.get(entityGroup + 'Entities').indexOf(options.model);
                if(tmpIndex !== -1){
                    index = tmpIndex;
                    group = entityGroup;
                }
            });

            // Flash screen
            // --------------------------
            if(group === 'player'){
                // Only flash for player entity deaths
                this.$deathEffectBlocker.transition()
                    .ease('elastic')
                    .style({ fill: '#dd0000', opacity: 1 })
                    .transition()
                    .ease('linear')
                        .style({ fill: '', opacity: 0 });
            } else {
                // TODO: play a sound or show some effect when enemy dies
            }

            // update timer / sprites
            // --------------------------
            // Stop transition, reset timer width to 0
            // stop bars
            d3.select(this[group + 'TimerBars'][0][index])
                .transition()
                .duration(100)
                .attr({ width: 0 });

            // flip entity
            d3.select(this[group + 'EntitySprites'][0][index])
                .transition()
                // NOTE: TODO: should have a small delay. NOTE: If another
                // transition happens after this, this may get cancelled out
                // (e.g., if in useAbility() a transitions occurs it would
                // cancel this one)
                .delay(100)
                .duration(500)
                .attr({
                    transform: function(){
                        var transform = '';
                        transform = 'translate(' + [
                            0, self.entityHeight ] + 
                            ') scale(' + [
                                1, -1
                            ] + ')';

                        if(group === 'enemy'){
                            transform = 'translate(' + [
                                self.entityWidth, self.entityHeight ] + 
                                ') scale(' + [
                                    -1, -1
                                ] + ')';
                        }
                        return transform;
                    },
                    opacity: 0.7
                });

            return this;
        },

        // ------------------------------
        // TODO: Revive entity
        // ------------------------------

        // ==============================
        //
        // User UI interaction
        //
        // ==============================
        finishInstance: function finishInstance(){
            events.trigger('node:instanceFinished');
        }

    });

    return BattleView;
});

// ===========================================================================
//
// Page Game
//
//      View for the game 
//
//      This acts also as a controller for the game. It listens for and 
//      handles game related events 
//
// ===========================================================================
define(
    'views/PageGame',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        // Map
        'models/Map',
        'models/Battle',

        'views/subViews/Map',
        'views/subViews/Battle'

    ], function viewPageGame(
        d3, backbone, marionette, 
        logger, events,

        Map, Battle,
        MapView,
        BattleView
    ){

    var PageGame = Backbone.Marionette.Layout.extend({
        template: '#template-page-game',
        'className': 'page-game-wrapper',

        events: {
            'click .login-facebook': 'facebookLogin'
        },
        
        regions: {
            regionNodeInstance: '#region-node-instance-wrapper',
            regionMap: '#region-map'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageGame', 'initialize() called');

            // --------------------------
            // controller / game related properties
            // --------------------------
            // only one node instance may be active at a time.
            // when a node instance is active, map is disabled and
            // nothing can happen until the instance is finished or
            // abandoned
            // NOTE: activeNodeInstance is a model property, used to 
            // keep track of what node is active

            // --------------------------
            // Setup event listeners
            // --------------------------
            // when a user clicks a node on the map
            this.listenTo(events, 'map:nodeClicked', this.mapNodeClicked);

            // when an instance (battle / shop / etc.) is finished
            this.listenTo(events, 'node:instanceFinished', 
                this.nodeInstanceFinished);
            
            // --------------------------
            // Setup views
            // --------------------------
            //
            // MAP
            // TODO: get model
            this.mapModel = new Map({});
            // TODO: Get map model from game.
            this.mapModel.generateMap();

            this.model.set({ map: this.mapModel });

            this.viewMap = new MapView({
                model: this.mapModel,
                gameModel: this.model
            }); 

            return this;
        },

        onShow: function gameOnShow(){
            logger.log('views/PageGame', 'onShow() called');
            var self = this;
            // setup the map

            this.regionMap.show(this.viewMap);
            return this;
        },

        // ------------------------------
        //
        // Map - User Interaction
        //
        // ------------------------------
        mapNodeClicked: function mapNodeClicked(options){
            //
            // This function handles user clicks on map nodes. This is
            // the main function which brings up the coresponding
            // battle / shop / etc. view based on the clicked node.
            //
            // When the instance is finished, the node:instanceFinished 
            // event is fired off, which will re-show the map
            //
            // options: {Object}
            //  node: Map node object
            //
            logger.log('views/PageGame', 
                '1. mapNodeClicked() called. Options: %O',
                options);

            // If the node instance was clicked and an instance is already 
            // active, do nothing
            if(this.model.get('activeNodeInstance') !== null){
                logger.error('views/PageGame : node instance already active!');
                logger.log('views/PageGame', '2. exiting function');
                return this;
            }

            // Hide map
            logger.log('views/PageGame', '2. Hiding map');
            //this.regionMap.$el.hide();
            this.regionMap.$el.css({ height: 0 });

            // Get node type from options
            // TODO: Best place to put a mapping of node types to views?
            //
            var node = '';

            // Valid node types:
            //      battle, shop, rest, teasure, quest, etc.
            // some % chance for each node
            var rand = Math.random();
            if(rand < 1){
                node = 'battle';
            } // TODO: other types

            // create node
            logger.log('views/PageGame', '3. Creating node instance: %O',
                nodeInstance);

            var nodeInstance = null;
            
            // Setup node
            // --------------------------
            if(node === 'battle'){
                nodeInstance = new BattleView({
                    // pass in game model
                    // TODO: get model from server, pass in playerEntities
                    model: new Battle({
                        playerEntities: this.model.get('playerEntities')
                    }),
                    gameModel: this.model 
                });
            }

            // update game model
            this.model.set({
                activeNodeInstance: nodeInstance
            }, {silent: true});
            this.model.trigger('change:activeNodeInstance');

            // set the desired next node
            this.model.get('map').set({nextNode: options.node});

            // show it
            logger.log('views/PageGame', '4. Showing node instance: %O',
                nodeInstance);
            this.regionNodeInstance.show( nodeInstance );
            this.regionNodeInstance.$el.removeClass('hidden');

            //// ===============================================================
            //// DEV / ADMIN MODE:::
            //this.nodeInstanceFinished();
            //// ===============================================================

            return this;
        },

        // ------------------------------
        //
        // Node Instance - Finished
        //
        // ------------------------------
        nodeInstanceFinished: function gameNodeInstanceFinished(options){
            //
            // When the node instance is completed (or aborted), this
            // is called. It will show the map
            //
            logger.log('views/PageGame', 
                '1. nodeInstanceFinished() called. Options: %O',
                options);

            // change the currently updated node
            // clear out the active node
            this.model.set({
                activeNodeInstance: null
            }, {silent: true});
            this.model.trigger('change:activeNodeInstance');
            
            // Hide instance
            logger.log('views/PageGame', '3. Hiding node instance');
            this.regionNodeInstance.$el.addClass('hidden');
            this.regionNodeInstance.close();

            // show map
            logger.log('views/PageGame', '4. Showing map');
            //this.regionMap.$el.show();
            this.regionMap.$el.css({ height: 100 });

            // update the map's current map node
            var map = this.model.get('map');
            map.setCurrentNode(map.get('nextNode'));
        }

    });

    return PageGame;
});

// ===========================================================================
//
// Page Create Character
// 
// ===========================================================================
define(
    'views/PageCreateCharacter',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewPageCreateCharacter(
        d3, backbone, marionette, 
        logger, events
    ){

    var PageCreateCharacter = Backbone.Marionette.Layout.extend({
        template: '#template-page-create-character',
        'className': 'page-create-character-wrapper',

        initialize: function initialize(options){
            // initialize:
            logger.log('views/PageCreateCharacter', 'initialize() called');
            return this;
        },
        onShow: function homeOnShow(){
            logger.log('views/PageCreateCharacter', 'onShow called');
            return this;
        }
        // ------------------------------
        // TODO: how to handle new views?
        // ------------------------------

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
    });

    return PageCreateCharacter;
});

//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//============================================================================= 
define('Controller',[
    'backbone', 'marionette', 'logger', 'events',
    'models/appUser-object',
    'models/Game',
    'models/Entity',
    'views/PageHome',
    'views/PageGame',
    'views/PageCreateCharacter'
    ], function(
        Backbone, Marionette, logger, events,
        appUser,
        Game,
        Entity,

        // include views here
        PageHome,
        PageGame,
        PageCreateCharacter
    ){

    // console color
    var Controller = Backbone.Marionette.Controller.extend({
        //The controller handles the navigation logic / calling views
        
        initialize: function controllerInitialize(options){
            //ASSUMPTIONS: 
            //  regionMain parameter must be passed in, which specifies what 
            //  region to show. (NOTE: fire off events)
            var self = this;
            logger.log('Controller', 'initialize() called');

            _.each(options.regions, function(region, key){
                self[key] = region;
            });

            this.setupMobile();
            
            return this;
        },

        setupMobile: function setupMobile(){
            // Mobile related functionality
            //
        },

        // ===================================================================
        //
        // Route handlers
        //
        // ===================================================================
        showHome: function controllerShowHome(){
            // This shows the homepage for logged out appUsers. If appUser is
            // logged in when trying to access this page, it will load their
            // profile page instead. (If they log in from the homepage, the 
            // initializer catches it and redirects them to their page).
            //
            // If the appUser is already logged in when they load the site,
            // they will be redirected to the /me endpoint (set in html
            // head before anything loads)
            var self = this;
            logger.log('Controller', 'showHome() called');

            if(!this.pageHome){
                logger.log('Controller', 'creating new pageHome view');
            }
            // Otherwise, show the homepage
            this.pageHome = new PageHome({});
            this.currentRegion = this.pageHome;
            this.regionMain.show(this.currentRegion);

            return this;
        },

        // ------------------------------
        //
        // Character Create
        //
        // ------------------------------
        showCreateCharacter: function controllerShowCreateCharacter(){
            logger.log('Controller', 'showCreateCharacter() called');

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageCreateCharacter = new PageCreateCharacter({
                // Hmm, model should be an empty entity?
                model: new Entity({})
            });

            this.regionMain.show(this.pageCreateCharacter);

            return this;
        },

        // ------------------------------
        //
        // Game
        //
        // ------------------------------
        showGame: function controllerShowGame(){
            logger.log('Controller', 'showGame() called');

            // get game model from server(?)
            if(!this.pageGame){
                logger.log('Controller', 'creating new pageGame view');
            }

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageGame = new PageGame({
                model: new Game({})
            });
            this.currentRegion = this.pageGame;
            this.regionMain.show(this.currentRegion);

            return this;
        }

    });

    return Controller;
});

//=============================================================================
// Router.js
//
// Handles routing for the app
//=============================================================================
define('appRouter',['backbone', 'marionette', 'logger', 'events'], 
    function(Backbone, Marionette, logger, events){

    // Router class
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            //Main route
            "(/)": "showHome",
            "create": "showCreateCharacter",
            "game": "showGame"
        }
    });

    // singleton
    var appRouter;

    function getAppRouter(options){
        // We only want to create one app router - if it's already been
        // created don't create another one
        if(appRouter !== undefined ){ return appRouter; }

        logger.log('appRouter', 'creating appRouter');

        var controller = options.controller;
        if(!controller){ 
            throw new Error('Controller must be passed in as an option');
        }

        // set new app router
        appRouter = new Router({
            controller: controller
        });

        // setup global event handlers (allows code to trigger a page 
        // redirect without directly accessing router)
        events.on('appRouter:showHome', function(){
            logger.log('appRouter', 'appRouter:showHome event called');
            appRouter.navigate('/', {trigger: true});
        }, this);

        events.on('appRouter:showGame', function(){
            logger.log('appRouter', 'appRouter:showGame event called');
            appRouter.navigate('/game', {trigger: true});
        }, this);

        events.on('appRouter:showCreateCharacter', function(){
            logger.log('appRouter', 'appRouter:showCreateCharacter event called');
            appRouter.navigate('/create', {trigger: true});
        }, this);

        return appRouter;
    }

    return getAppRouter;

});

//========================================
//Require Config (load additional libraries)
//========================================
requirejs.config({
    baseUrl: '/static/js',
    //For dev
    urlArgs: 'v='+(new Date()).getTime(),

    paths: {
        'jquery-ui': 'lib/jquery.ui',

        d3: 'lib/d3',
        async: 'lib/async.min',
    
        // We're using lodash in place of underscore
        lodash: 'lib/lodash.compat',
        
        jwerty: 'lib/jwerty.min',

        backbone: 'lib/backbone',
        marionette: 'lib/marionette',
        bootstrap: 'lib/bootstrap'
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery'], 
            exports: '$'
        },
        'd3': {
            exports: 'd3'
        },
        'lodash': {
            exports: '_'
        },

        'jwerty': {
            exports: 'jwerty'
        },

        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['lodash'], 
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'async': {
            exports: 'async'
        },
        'marionette' : {
            deps : ['backbone'],
            exports : 'Marionette'
        },
        'logger': {
            exports: 'logger'
        },
        'bootstrap': {
            exports: 'jquery',
            deps: ['jquery'] 
        }
    }
});

//========================================
// Set everything up
//========================================
require([
    //libs
    'jquery',
    'backbone', 'marionette', 'bootstrap',
    'util/d3plugins', // always load d3 plugins, extends d3 object

    //utils
    'logger', 
    'util/browserInfo',
    'handleKeys',

    //app
    'app', 
    'events',

    'Controller',
    'appRouter'
    ],
    function main(
        $, 
        Backbone, marionette, bootstrap,
        d3plugins,

        logger, 
        browserInfo,
        handleKeys,

        app, events,

        Controller,
        getAppRouter
    ){

    // Allows multiple modals 
    $.fn.modal.Constructor.prototype.enforceFocus = function () {};

    if(browserInfo.isIe8){
        //For IE8, don't cache AJAX queries. 
        $.ajaxSetup({ cache: false });
    }

    //INITIAL CONFIG
    //-----------------------------------
    //Configure log options (set app-wide) 
    
    ////NO logging:
    //logger.options.logLevel = false;
    
    //// log errors:
    logger.options.logLevel = [ 
        'error'
        ,'Controller'
        //,'views/subviews/Battle'
        ,'views/subviews/Map'
        ,'models/Map'
    ];

    //// log EVERYTHING:
    //logger.options.logLevel = true;

    //-----------------------------------
    //APP Config - Add router / controller
    //-----------------------------------
    app.addInitializer(function(options){
        // get the app controller, pass in all the regions
        var appController = new Controller({
            //pass in regions to the controller, which allows updating
            //  specific parts of the DOM
            regions: app._regionManager._regions
        });

        // There's only ever ONE app-wide router (handles URL page routing) 
        router = getAppRouter({ controller: appController });
        app.router = router;


        // When event it triggered to change page, catch it
        events.on('app:router:navigate', function(route){
            logger.log('events', 
                'app:router:navigate event received, changing page to:',
                route
            );

            app.router.navigate(route, true);
        });

        // setup handle keys
        handleKeys();

    });

    app.start();
});

define("main", function(){});
