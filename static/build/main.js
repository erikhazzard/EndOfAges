
(function($){$.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var div=document.createElement("div");var support={};function getVendorPropertyName(prop){if(prop in div.style)return prop;var prefixes=["Moz","Webkit","O","ms"];var prop_=prop.charAt(0).toUpperCase()+prop.substr(1);if(prop in div.style){return prop}for(var i=0;i<prefixes.length;++i){var vendorProp=prefixes[i]+prop_;if(vendorProp in div.style){return vendorProp}}}function checkTransform3dSupport(){div.style[support.transform]="";div.style[support.transform]="rotateY(90deg)";return div.style[support.transform]!==""}var isChrome=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;support.transition=getVendorPropertyName("transition");support.transitionProperty=getVendorPropertyName("transitionProperty");support.transitionDelay=getVendorPropertyName("transitionDelay");support.transform=getVendorPropertyName("transform");support.transformOrigin=getVendorPropertyName("transformOrigin");support.transform3d=checkTransform3dSupport();var eventNames={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var transitionEnd=support.transitionEnd=eventNames[support.transition]||null;for(var key in support){if(support.hasOwnProperty(key)&&typeof $.support[key]==="undefined"){$.support[key]=support[key]}}div=null;$.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};$.cssHooks["transit:transform"]={get:function(elem){return $(elem).data("transform")||new Transform},set:function(elem,v){var value=v;if(!(value instanceof Transform)){value=new Transform(value)}if(support.transform==="WebkitTransform"&&!isChrome){elem.style[support.transform]=value.toString(true)}else{elem.style[support.transform]=value.toString()}$(elem).data("transform",value)}};$.cssHooks.transform={set:$.cssHooks["transit:transform"].set};if($.fn.jquery<"1.8"){$.cssHooks.transformOrigin={get:function(elem){return elem.style[support.transformOrigin]},set:function(elem,value){elem.style[support.transformOrigin]=value}};$.cssHooks.transition={get:function(elem){return elem.style[support.transition]},set:function(elem,value){elem.style[support.transition]=value}}}registerCssHook("scale");registerCssHook("translate");registerCssHook("rotate");registerCssHook("rotateX");registerCssHook("rotateY");registerCssHook("rotate3d");registerCssHook("perspective");registerCssHook("skewX");registerCssHook("skewY");registerCssHook("x",true);registerCssHook("y",true);function Transform(str){if(typeof str==="string"){this.parse(str)}return this}Transform.prototype={setFromString:function(prop,val){var args=typeof val==="string"?val.split(","):val.constructor===Array?val:[val];args.unshift(prop);Transform.prototype.set.apply(this,args)},set:function(prop){var args=Array.prototype.slice.apply(arguments,[1]);if(this.setter[prop]){this.setter[prop].apply(this,args)}else{this[prop]=args.join(",")}},get:function(prop){if(this.getter[prop]){return this.getter[prop].apply(this)}else{return this[prop]||0}},setter:{rotate:function(theta){this.rotate=unit(theta,"deg")},rotateX:function(theta){this.rotateX=unit(theta,"deg")},rotateY:function(theta){this.rotateY=unit(theta,"deg")},scale:function(x,y){if(y===undefined){y=x}this.scale=x+","+y},skewX:function(x){this.skewX=unit(x,"deg")},skewY:function(y){this.skewY=unit(y,"deg")},perspective:function(dist){this.perspective=unit(dist,"px")},x:function(x){this.set("translate",x,null)},y:function(y){this.set("translate",null,y)},translate:function(x,y){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(x!==null&&x!==undefined){this._translateX=unit(x,"px")}if(y!==null&&y!==undefined){this._translateY=unit(y,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var s=(this.scale||"1,1").split(",");if(s[0]){s[0]=parseFloat(s[0])}if(s[1]){s[1]=parseFloat(s[1])}return s[0]===s[1]?s[0]:s},rotate3d:function(){var s=(this.rotate3d||"0,0,0,0deg").split(",");for(var i=0;i<=3;++i){if(s[i]){s[i]=parseFloat(s[i])}}if(s[3]){s[3]=unit(s[3],"deg")}return s}},parse:function(str){var self=this;str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(x,prop,val){self.setFromString(prop,val)})},toString:function(use3d){var re=[];for(var i in this){if(this.hasOwnProperty(i)){if(!support.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(use3d&&i==="scale"){re.push(i+"3d("+this[i]+",1)")}else if(use3d&&i==="translate"){re.push(i+"3d("+this[i]+",0)")}else{re.push(i+"("+this[i]+")")}}}}return re.join(" ")}};function callOrQueue(self,queue,fn){if(queue===true){self.queue(fn)}else if(queue){self.queue(queue,fn)}else{fn()}}function getProperties(props){var re=[];$.each(props,function(key){key=$.camelCase(key);key=$.transit.propertyMap[key]||$.cssProps[key]||key;key=uncamel(key);if($.inArray(key,re)===-1){re.push(key)}});return re}function getTransition(properties,duration,easing,delay){var props=getProperties(properties);if($.cssEase[easing]){easing=$.cssEase[easing]}var attribs=""+toMS(duration)+" "+easing;if(parseInt(delay,10)>0){attribs+=" "+toMS(delay)}var transitions=[];$.each(props,function(i,name){transitions.push(name+" "+attribs)});return transitions.join(", ")}$.fn.transition=$.fn.transit=function(properties,duration,easing,callback){var self=this;var delay=0;var queue=true;var theseProperties=jQuery.extend(true,{},properties);if(typeof duration==="function"){callback=duration;duration=undefined}if(typeof duration==="object"){easing=duration.easing;delay=duration.delay||0;queue=duration.queue||true;callback=duration.complete;duration=duration.duration}if(typeof easing==="function"){callback=easing;easing=undefined}if(typeof theseProperties.easing!=="undefined"){easing=theseProperties.easing;delete theseProperties.easing}if(typeof theseProperties.duration!=="undefined"){duration=theseProperties.duration;delete theseProperties.duration}if(typeof theseProperties.complete!=="undefined"){callback=theseProperties.complete;delete theseProperties.complete}if(typeof theseProperties.queue!=="undefined"){queue=theseProperties.queue;delete theseProperties.queue}if(typeof theseProperties.delay!=="undefined"){delay=theseProperties.delay;delete theseProperties.delay}if(typeof duration==="undefined"){duration=$.fx.speeds._default}if(typeof easing==="undefined"){easing=$.cssEase._default}duration=toMS(duration);var transitionValue=getTransition(theseProperties,duration,easing,delay);var work=$.transit.enabled&&support.transition;var i=work?parseInt(duration,10)+parseInt(delay,10):0;if(i===0){var fn=function(next){self.css(theseProperties);if(callback){callback.apply(self)}if(next){next()}};callOrQueue(self,queue,fn);return self}var run=function(nextCall,element){var bound=false;var self=$(element);var oldTransitions={};var cb=function(e){self.data("transitCallback",null);if(e)e.stopPropagation();if(bound){self.unbind(transitionEnd,cb)}element.style[support.transition]=oldTransitions[this]||null;if(typeof callback==="function"){callback.apply(self)}if(typeof nextCall==="function"){nextCall()}};if(transitionEnd&&$.transit.useTransitionEnd){bound=true;self.bind(transitionEnd,cb)}else{var id=window.setTimeout(cb,i);self.data("transitTimer",id)}element.style[support.transition]=transitionValue;self.css(properties);self.data("transitCallback",cb)};var deferredRun=function(next){this.offsetWidth;run(next,this)};callOrQueue(self,queue,deferredRun);return this};$.fn.transitionStop=$.fn.transitStop=function(clearQueue,jumpToEnd){this.each(function(){var self=$(this);var id=self.data("transitTimer");clearTimeout(id);self.data("transitTimer",null);var properties=this.style[support.transitionProperty];if(properties){properties=properties.replace(/\s*/g,"").split(",");var style=window.getComputedStyle(this),css={};for(var i=0;i<properties.length;i++){css[properties[i]]=this.style[properties[i]];this.style[properties[i]]=style[properties[i]]}this.offsetWidth;this.style[support.transition]="none";if(clearQueue){self.clearQueue();self.unbind(transitionEnd)}if(jumpToEnd){for(var i=0;i<properties.length;i++)this.style[properties[i]]=css[properties[i]];var cb=self.data("transitCallback");if(typeof cb==="function")cb()}else if(!clearQueue){self.dequeue()}}});return this};function registerCssHook(prop,isPixels){if(!isPixels){$.cssNumber[prop]=true}$.transit.propertyMap[prop]=support.transform;$.cssHooks[prop]={get:function(elem){var t=$(elem).css("transit:transform");return t.get(prop)},set:function(elem,value){var t=$(elem).css("transit:transform");t.setFromString(prop,value);$(elem).css({"transit:transform":t})}}}function uncamel(str){return str.replace(/([A-Z])/g,function(letter){return"-"+letter.toLowerCase()})}function unit(i,units){if(typeof i==="string"&&!i.match(/^[\-0-9\.]+$/)){return i}else{return""+i+units}}function toMS(duration){var i=duration;if(typeof i==="string"&&!i.match(/^[\-0-9\.]+/)){i=$.fx.speeds[i]||$.fx.speeds._default}return unit(i,"ms")}$.transit.getTransitionValue=getTransition})(jQuery);
define("lib/jquery.transit.min", function(){});

(function(window,document,$,undefined){var prefix;var property;var eventName="onfocusin"in document&&"hasFocus"in document?"focusin focusout":"focus blur";var prefixes=["webkit","o","ms","moz",""];var $support=$.support;var $event=$.event;while((prefix=prefixes.pop())!=undefined){property=(prefix?prefix+"H":"h")+"idden";if($support.pageVisibility=typeof document[property]=="boolean"){eventName=prefix+"visibilitychange";break}}$(/blur$/.test(eventName)?window:document).on(eventName,function(event){var type=event.type;var originalEvent=event.originalEvent;if(!originalEvent){return}var toElement=originalEvent.toElement;if(!/^focus./.test(type)||toElement==undefined&&originalEvent.fromElement==undefined&&originalEvent.relatedTarget==undefined){$event.trigger((property&&document[property]||/^(?:blur|focusout)$/.test(type)?"hide":"show")+".visibility")}})})(this,document,jQuery);
define("lib/jquery.visibility", function(){});

/* =========================================================================
 *
 * word-writer
 *      Library for taking in an element and making words and letters appear as
 *      if by writing them
 *
 * ========================================================================= */
(function wordWriter ( $ ){

    $.fn.wordWriter = function ( options ){
        // This function takes in an `element` object and configuration `options`.
        // It turns all the text inside of an element to span elements and then 
        // fades them in word by word or letter by letter
        options = options || {};

        // Config based on options
        var callback = options.callback || function callback(didFinish){ console.log('Done'); };
        var speedFactor = options.speedFactor || 0.8;
        var fadeInCss = options.fadeInCss || { opacity: 1 };
        var finalCss = options.finalCss || { opacity: 0.5 };

        var element = this;

        var text = element.html();
        
        var _timeouts = [];
        var _finalCallbackTimeout;

        // First, clean up the text a lil bit
        text = text.trim();
        text = text
            .replace(/\n/g, '')
            .replace(/  +/g, ' ');
        
        // then split on words
        var words = text.split(' ');

        // empty the passed element's content
        element.empty();

        // setup a document fragment to append nodes to
        var $writerWrapper = $('<div class="writer-wrapper"></div>');
        var $wordEl;
        var startCssProps = { opacity: 0 };

        var velocityOptionsFadeIn = { duration: 800 * speedFactor }; 

        var velocityOptionsFinal = { delay: 2000 * speedFactor, duration: 5000 * speedFactor};

        var timeoutDelay = 0;
        var _stopAnimations = false;

        var curWord;
        var punctuationRegexLongDelay = new RegExp('[.!?]', 'i');
        var punctuationRegexShortDelay = new RegExp('[-,;:"]', 'i');

        // Fade in individual word
        function fadeInWord ( el ){
            if(_stopAnimations){ return false; }

            el.velocity(fadeInCss, velocityOptionsFadeIn)
                .velocity(finalCss, velocityOptionsFinal);
        }

        // Add a span class to wrap each word
        for(var i=0, len=words.length; i<len; i++){
            curWord = words[i];

            $wordEl = $('<span class="writer-word"></span>')
                .css(startCssProps)
                .html(curWord);

            // append the el
            $writerWrapper.append( $wordEl );

            // fade in the text
            // ------------------------------
            _timeouts.push(
                setTimeout(fadeInWord.bind(this, $wordEl), timeoutDelay)
            );

            // increment the timeout delay porportionally to the word length
            // ------------------------------
            timeoutDelay = timeoutDelay + (((curWord.length * 7) * 6) * speedFactor);

            // test for punctuation (make the *next* word slower)
            if(punctuationRegexLongDelay.test(curWord)){
                timeoutDelay += (550 * speedFactor);
            } else if(punctuationRegexShortDelay.test(curWord)){
                timeoutDelay += (250 * speedFactor);
            }

            if(i >= len-1){
                _finalCallbackTimeout = setTimeout(function(){
                    // finished naturally, did not cancel
                    return callback(false);
                }, timeoutDelay);
            }
        }

        // then append all the content
        element.append($writerWrapper);

        // Instantly show everything and call the callback
        // ------------------------------
        function finishNow (){
            _stopAnimations = true;

            // clear all timeouts
            for(var i=0,len=_timeouts.length; i<len; i++){
                clearTimeout(_timeouts[i]);
            }
            clearTimeout(_finalCallbackTimeout);

            // add callback 
            velocityOptionsFadeIn.complete = function (){
                // cancelled, did not finish naturally
                return callback(true);
            };

            $('.writer-word', $writerWrapper)
                .velocity('stop')
                .velocity('stop')
                .velocity(fadeInCss, velocityOptionsFadeIn)
                .velocity(finalCss, velocityOptionsFinal);
        }

        // allow finish event to be triggered
        this.bind('finish', finishNow);

        if(!options.disableInstant){
            // also, instantly animate everything when the element is clicked
            element.click(finishNow);
        }

        return this;
    };

}( $ ));

define("lib/jquery.wordwriter", function(){});

/*!
* Velocity.js: Accelerated JavaScript animation.
* @version 0.8.0
* @docs http://velocityjs.org
* @license Copyright 2014 Julian Shapiro. MIT License: http://en.wikipedia.org/wiki/MIT_License
*/
!function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){var b=r.data(a,k);return null===b?d:b}function g(a){return function(b){return Math.round(b*a)*(1/a)}}function h(a,b){var c=a;return q.isString(a)?s.Easings[a]||(c=!1):c=q.isArray(a)&&1===a.length?g.apply(null,a):q.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):q.isArray(a)&&4===a.length?t.apply(null,a):!1,c===!1&&(c=s.Easings[s.defaults.easing]?s.defaults.easing:m),c}function i(a){if(a)for(var b=(new Date).getTime(),c=0,e=s.State.calls.length;e>c;c++)if(s.State.calls[c]){var g=s.State.calls[c],h=g[0],k=g[2],l=g[3];l||(l=s.State.calls[c][3]=b-16);for(var m=Math.min((b-l)/k.duration,1),n=0,o=h.length;o>n;n++){var r=h[n],t=r.element;if(f(t)){var u=!1;k.display&&"none"!==k.display&&v.setPropertyValue(t,"display",k.display),k.visibility&&"hidden"!==k.visibility&&v.setPropertyValue(t,"visibility",k.visibility);for(var w in r)if("element"!==w){var x,y=r[w],z=q.isString(y.easing)?s.Easings[y.easing]:y.easing;if(x=1===m?y.endValue:y.startValue+(y.endValue-y.startValue)*z(m),y.currentValue=x,v.Hooks.registered[w]){var A=v.Hooks.getRoot(w),B=f(t).rootPropertyValueCache[A];B&&(y.rootPropertyValue=B)}var C=v.setPropertyValue(t,w,y.currentValue+(0===parseFloat(x)?"":y.unitType),y.rootPropertyValue,y.scrollData);v.Hooks.registered[w]&&(f(t).rootPropertyValueCache[A]=v.Normalizations.registered[A]?v.Normalizations.registered[A]("extract",null,C[1]):C[1]),"transform"===C[0]&&(u=!0)}k.mobileHA&&f(t).transformCache.translate3d===d&&(f(t).transformCache.translate3d="(0px, 0px, 0px)",u=!0),u&&v.flushTransformCache(t)}}k.display&&"none"!==k.display&&(s.State.calls[c][2].display=!1),k.visibility&&"hidden"!==k.visibility&&(s.State.calls[c][2].visibility=!1),k.progress&&k.progress.call(g[1],g[1],m,Math.max(0,l+k.duration-b),l),1===m&&j(c)}s.State.isTicking&&p(i)}function j(a,b){if(!s.State.calls[a])return!1;for(var c=s.State.calls[a][0],e=s.State.calls[a][1],g=s.State.calls[a][2],h=s.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||g.loop||("none"===g.display&&v.setPropertyValue(l,"display",g.display),"hidden"===g.visibility&&v.setPropertyValue(l,"visibility",g.visibility)),(r.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(r.queue(l)[1]))&&f(l)){f(l).isAnimating=!1,f(l).rootPropertyValueCache={};var m=!1;r.each(f(l).transformCache,function(a,b){var c=/^scale/.test(a)?1:0;new RegExp("^\\("+c+"[^.]").test(b)&&(m=!0,delete f(l).transformCache[a])}),g.mobileHA&&(m=!0,delete f(l).transformCache.translate3d),m&&v.flushTransformCache(l),v.Values.removeClass(l,"animating")}if(!b&&g.complete&&!g.loop&&j===k-1)try{g.complete.call(e,e)}catch(n){setTimeout(function(){throw n},1)}h&&h(e),g.queue!==!1&&r.dequeue(l,g.queue)}s.State.calls[a]=!1;for(var o=0,p=s.State.calls.length;p>o;o++)if(s.State.calls[o]!==!1){i=!0;break}i===!1&&(s.State.isTicking=!1,delete s.State.calls,s.State.calls=[])}var k="velocity",l=400,m="swing",n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p=b.requestAnimationFrame||o,q={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof SVGElement}},r=b.jQuery||a.Velocity&&a.Velocity.Utilities;if(!r)throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");if(a.Velocity!==d&&!a.Velocity.Utilities)throw new Error("Velocity: Namespace is occupied.");if(7>=n){if(b.jQuery)return void(b.jQuery.fn.velocity=b.jQuery.fn.animate);throw new Error("Velocity: For IE<=7, Velocity falls back to jQuery, which must first be loaded.")}if(8===n&&!b.jQuery)throw new Error("Velocity: For IE8, Velocity requirejss jQuery to be loaded. (Velocity's jQuery shim does not work with IE8.)");var s=a.Velocity=a.velocity={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:b.jQuery,Sequences:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:l,easing:m,begin:null,complete:null,progress:null,display:null,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},animate:function(){},mock:!1,version:{major:0,minor:8,patch:0},debug:!1};b.pageYOffset!==d?(s.State.scrollAnchor=b,s.State.scrollPropertyLeft="pageXOffset",s.State.scrollPropertyTop="pageYOffset"):(s.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,s.State.scrollPropertyLeft="scrollLeft",s.State.scrollPropertyTop="scrollTop"),s.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(p=function(a){return setTimeout(function(){a(!0)},16)},i()):p=b.requestAnimationFrame||o});var t=function(){function a(a,b){return 1-3*b+3*a}function b(a,b){return 3*b-6*a}function c(a){return 3*a}function d(d,e,f){return((a(e,f)*d+b(e,f))*d+c(e))*d}function e(d,e,f){return 3*a(e,f)*d*d+2*b(e,f)*d+c(e)}return function(a,b,c,f){function g(b){for(var f=b,g=0;8>g;++g){var h=e(f,a,c);if(0===h)return f;var i=d(f,a,c)-b;f-=i/h}return f}if(4!==arguments.length)return!1;for(var h=0;4>h;++h)if("number"!=typeof arguments[h]||isNaN(arguments[h])||!isFinite(arguments[h]))return!1;return a=Math.min(a,1),c=Math.min(c,1),a=Math.max(a,0),c=Math.max(c,0),function(e){return a===b&&c===f?e:d(g(e),b,f)}}}(),u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;;)if(h=c(h||i,g),j.push(1+h.x),k+=16,!(Math.abs(h.x)>l&&Math.abs(h.v)>l))break;return f?function(a){return j[a*(j.length-1)|0]}:k}}();!function(){s.Easings.linear=function(a){return a},s.Easings.swing=function(a){return.5-Math.cos(a*Math.PI)/2},s.Easings.spring=function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)},s.Easings.ease=t(.25,.1,.25,1),s.Easings["ease-in"]=t(.42,0,1,1),s.Easings["ease-out"]=t(0,0,.58,1),s.Easings["ease-in-out"]=t(.42,0,.58,1);var a={};r.each(["Quad","Cubic","Quart","Quint","Expo"],function(b,c){a[c]=function(a){return Math.pow(a,b+2)}}),r.extend(a,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}}),r.each(a,function(a,b){s.Easings["easeIn"+a]=b,s.Easings["easeOut"+a]=function(a){return 1-b(1-a)},s.Easings["easeInOut"+a]=function(a){return.5>a?b(2*a)/2:1-b(-2*a+2)/2}})}();var v=s.CSS={RegEx:{valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Hooks:{templates:{color:["Red Green Blue Alpha","255 255 255 1"],backgroundColor:["Red Green Blue Alpha","255 255 255 1"],borderColor:["Red Green Blue Alpha","255 255 255 1"],borderTopColor:["Red Green Blue Alpha","255 255 255 1"],borderRightColor:["Red Green Blue Alpha","255 255 255 1"],borderBottomColor:["Red Green Blue Alpha","255 255 255 1"],borderLeftColor:["Red Green Blue Alpha","255 255 255 1"],outlineColor:["Red Green Blue Alpha","255 255 255 1"],fill:["Red Green Blue Alpha","255 255 255 1"],stroke:["Red Green Blue Alpha","255 255 255 1"],stopColor:["Red Green Blue Alpha","255 255 255 1"],textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){var a,b,c;if(n)for(a in v.Hooks.templates){b=v.Hooks.templates[a],c=b[0].split(" ");var d=b[1].match(v.RegEx.valueSplit);"Color"===c[0]&&(c.push(c.shift()),d.push(d.shift()),v.Hooks.templates[a]=[c.join(" "),d.join(" ")])}for(a in v.Hooks.templates){b=v.Hooks.templates[a],c=b[0].split(" ");for(var e in c){var f=a+c[e],g=e;v.Hooks.registered[f]=[a,g]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.Hooks.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){function a(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?"rgb("+(parseInt(b[1],16)+" "+parseInt(b[2],16)+" "+parseInt(b[3],16))+")":"rgb(0 0 0)"}var b=["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"];9>=n||s.State.isGingerbread||(b=b.concat(["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]));for(var c=0,e=b.length;e>c;c++)!function(){var a=b[c];v.Normalizations.registered[a]=function(b,c,e){switch(b){case"name":return"transform";case"extract":return f(c).transformCache[a]===d?/^scale/i.test(a)?1:0:f(c).transformCache[a].replace(/[()]/g,"");case"inject":var g=!1;switch(a.substr(0,a.length-1)){case"translate":g=!/(%|px|em|rem|\d)$/i.test(e);break;case"scal":case"scale":s.State.isAndroid&&f(c).transformCache[a]===d&&1>e&&(e=1),g=!/(\d)$/i.test(e);break;case"skew":g=!/(deg|\d)$/i.test(e);break;case"rotate":g=!/(deg|\d)$/i.test(e)}return g||(f(c).transformCache[a]="("+e+")"),f(c).transformCache[a]}}}();for(var g=["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],c=0,h=g.length;h>c;c++)!function(){var b=g[c];v.Normalizations.registered[b]=function(c,e,f){switch(c){case"name":return b;case"extract":var g;if(v.RegEx.wrappedValueAlreadyExtracted.test(f))g=f;else{var h,i={aqua:"rgb(0, 255, 255);",black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",fuchsia:"rgb(255, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",lime:"rgb(0, 255, 0)",maroon:"rgb(128, 0, 0)",navy:"rgb(0, 0, 128)",olive:"rgb(128, 128, 0)",purple:"rgb(128, 0, 128)",red:"rgb(255, 0, 0)",silver:"rgb(192, 192, 192)",teal:"rgb(0, 128, 128)",white:"rgb(255, 255, 255)",yellow:"rgb(255, 255, 0)"};/^[A-z]+$/i.test(f)?h=i[f]!==d?i[f]:i.black:/^#([A-f\d]{3}){1,2}$/i.test(f)?h=a(f):/^rgba?\(/i.test(f)||(h=i.black),g=(h||f).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==g.split(" ").length||(g+=" 1"),g;case"inject":return 8>=n?4===f.split(" ").length&&(f=f.split(/\s+/).slice(0,3).join(" ")):3===f.split(" ").length&&(f+=" 1"),(8>=n?"rgb":"rgba")+"("+f.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y1";return(n||s.State.isAndroid&&!s.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(s.State.prefixMatches[a])return[s.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),q.isString(s.State.prefixElement.style[e]))return s.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,g){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=r.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!g){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var m;m=f(a)===d?b.getComputedStyle(a,null):f(a).computedStyle?f(a).computedStyle:f(a).computedStyle=b.getComputedStyle(a,null),n&&"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?m.getPropertyValue(c):m[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var o=h(a,"position");("fixed"===o||"absolute"===o&&/top|left/i.test(c))&&(i=r(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,m;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(m=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(m)&&v.Hooks.templates[c]&&(m=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,m)}return/^[\d-]/.test(i)||(i=f(a)&&f(a).isSVG&&v.Names.SVGAttribute(c)?/^(height|width)$/i.test(c)?a.getBBox()[c]:a.getAttribute(c):h(a,v.Names.prefixCheck(c)[0])),v.Values.isCSSNullValue(i)&&(i=0),s.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,g){var h=c;if("scroll"===c)g.container?g.container["scroll"+g.direction]=d:"Left"===g.direction?b.scrollTo(d,g.alternateValue):b.scrollTo(g.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=f(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){s.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else f(a)&&f(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;s.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||s.State.isAndroid&&!s.State.isChrome)&&f(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};r.each(f(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,g;r.each(f(a).transformCache,function(b){return e=f(a).transformCache[b],"transformPerspective"===b?(g=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),g&&(c="perspective"+g+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),s.animate=function(){function a(){return m?C.promise||null:o}function g(){function a(){function a(a){var b=d,c=d,e=d;return q.isArray(a)?(b=a[0],!q.isArray(a[1])&&/^[\d-]/.test(a[1])||q.isFunction(a[1])?e=a[1]:(q.isString(a[1])||q.isArray(a[1]))&&(c=h(a[1],j.duration),a[2]!==d&&(e=a[2]))):b=a,c=c||j.easing,q.isFunction(b)&&(b=b.call(g,z,y)),q.isFunction(e)&&(e=e.call(g,z,y)),[b||0,c,e]}function k(a,b){var c,d;return d=(b||0).toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function l(){var a={parent:g.parentNode,position:v.getPropertyValue(g,"position"),fontSize:v.getPropertyValue(g,"fontSize")},d=a.position===H.lastPosition&&a.parent===H.lastParent,e=a.fontSize===H.lastFontSize&&a.parent===H.lastParent;H.lastParent=a.parent,H.lastPosition=a.position,H.lastFontSize=a.fontSize,null===H.remToPx&&(H.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===H.vwToPx&&(H.vwToPx=parseFloat(b.innerWidth)/100,H.vhToPx=parseFloat(b.innerHeight)/100);var h={overflowX:null,overflowY:null,boxSizing:null,width:null,minWidth:null,maxWidth:null,height:null,minHeight:null,maxHeight:null,paddingLeft:null},i={},j=10;if(i.remToPx=H.remToPx,i.vwToPx=H.vwToPx,i.vhToPx=H.vhToPx,n&&!f(g).isSVG)var k=/^auto$/i.test(g.currentStyle.width),l=/^auto$/i.test(g.currentStyle.height);d&&e||(f(g).isSVG||(h.overflowX=v.getPropertyValue(g,"overflowX"),h.overflowY=v.getPropertyValue(g,"overflowY"),h.boxSizing=v.getPropertyValue(g,"boxSizing"),h.minWidth=v.getPropertyValue(g,"minWidth"),h.maxWidth=v.getPropertyValue(g,"maxWidth")||"none",h.minHeight=v.getPropertyValue(g,"minHeight"),h.maxHeight=v.getPropertyValue(g,"maxHeight")||"none",h.paddingLeft=v.getPropertyValue(g,"paddingLeft")),h.width=v.getPropertyValue(g,"width",null,!0),h.height=v.getPropertyValue(g,"height",null,!0)),d?(i.percentToPxRatioWidth=H.lastPercentToPxWidth,i.percentToPxRatioHeight=H.lastPercentToPxHeight):(f(g).isSVG||(v.setPropertyValue(g,"overflowX","hidden"),v.setPropertyValue(g,"overflowY","hidden"),v.setPropertyValue(g,"boxSizing","content-box"),v.setPropertyValue(g,"minWidth",j+"%"),v.setPropertyValue(g,"maxWidth",j+"%"),v.setPropertyValue(g,"minHeight",j+"%"),v.setPropertyValue(g,"maxHeight",j+"%")),v.setPropertyValue(g,"width",j+"%"),v.setPropertyValue(g,"height",j+"%")),e?i.emToPx=H.lastEmToPx:f(g).isSVG||v.setPropertyValue(g,"paddingLeft",j+"em"),d||(i.percentToPxRatioWidth=H.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(g,"width",null,!0))||1)/j,i.percentToPxRatioHeight=H.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(g,"height",null,!0))||1)/j),e||(i.emToPx=H.lastEmToPx=(parseFloat(v.getPropertyValue(g,"paddingLeft"))||1)/j);for(var m in h)null!==h[m]&&v.setPropertyValue(g,m,h[m]);return f(g).isSVG||(n?(k&&v.setPropertyValue(g,"width","auto"),l&&v.setPropertyValue(g,"height","auto")):(v.setPropertyValue(g,"height","auto"),h.height!==v.getPropertyValue(g,"height",null,!0)&&v.setPropertyValue(g,"height",h.height),v.setPropertyValue(g,"width","auto"),h.width!==v.getPropertyValue(g,"width",null,!0)&&v.setPropertyValue(g,"width",h.width))),s.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),g),i}if(j.begin&&0===z)try{j.begin.call(t,t)}catch(o){setTimeout(function(){throw o},1)}if("scroll"===D){var p,x,A,B=/^x$/i.test(j.axis)?"Left":"Top",E=parseFloat(j.offset)||0;j.container?j.container.jquery||q.isNode(j.container)?(j.container=j.container[0]||j.container,p=j.container["scroll"+B],A=p+r(g).position()[B.toLowerCase()]+E):j.container=null:(p=s.State.scrollAnchor[s.State["scrollProperty"+B]],x=s.State.scrollAnchor[s.State["scrollProperty"+("Left"===B?"Top":"Left")]],A=r(g).offset()[B.toLowerCase()]+E),m={scroll:{rootPropertyValue:!1,startValue:p,currentValue:p,endValue:A,unitType:"",easing:j.easing,scrollData:{container:j.container,direction:B,alternateValue:x}},element:g}}else if("reverse"===D){if(!f(g).tweensContainer)return void r.dequeue(g,j.queue);"none"===f(g).opts.display&&(f(g).opts.display="block"),"hidden"===f(g).opts.visibility&&(f(g).opts.visibility="visible"),f(g).opts.loop=!1,f(g).opts.begin=null,f(g).opts.complete=null,w.easing||delete j.easing,w.duration||delete j.duration,j=r.extend({},f(g).opts,j);var F=r.extend(!0,{},f(g).tweensContainer);for(var G in F)if("element"!==G){var J=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=J,w&&(F[G].easing=j.easing)}m=F}else if("start"===D){var F;f(g).tweensContainer&&f(g).isAnimating===!0&&(F=f(g).tweensContainer);for(var K in u){var L=a(u[K]),M=L[0],N=L[1],O=L[2];K=v.Names.camelCase(K);var P=v.Hooks.getRoot(K),Q=!1;if(f(g).isSVG||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(j.display&&"none"!==j.display||j.visibility&&"hidden"!==j.visibility)&&/opacity|filter/.test(K)&&!O&&0!==M&&(O=0),j._cacheValues&&F&&F[K]?(O===d&&(O=F[K].endValue+F[K].unitType),Q=f(g).rootPropertyValueCache[P]):v.Hooks.registered[K]?O===d?(Q=v.getPropertyValue(g,P),O=v.getPropertyValue(g,K,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(g,K));var R,S,T,U=!1;R=k(K,O),O=R[0],T=R[1],R=k(K,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,""}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0;var V;if("%"===S&&(/^(fontSize|lineHeight)$/.test(K)?(M/=100,S="em"):/^scale/.test(K)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(K)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else{V=V||l();var W=/margin|padding|left|right|width|text|word|letter/i.test(K)||/X$/.test(K)?"x":"y";switch(T){case"%":O*="x"===W?V.percentToPxRatioWidth:V.percentToPxRatioHeight;break;case"px":break;default:O*=V[T+"ToPx"]}switch(S){case"%":O*=1/("x"===W?V.percentToPxRatioWidth:V.percentToPxRatioHeight);break;case"px":break;default:O*=1/V[S+"ToPx"]}}switch(U){case"+":M=O+M;break;case"-":M=O-M;break;case"*":M=O*M;break;case"/":M=O/M}m[K]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},s.debug&&console.log("tweensContainer ("+K+"): "+JSON.stringify(m[K]),g)}else s.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.")}m.element=g}m.element&&(v.Values.addClass(g,"animating"),I.push(m),f(g).tweensContainer=m,f(g).opts=j,f(g).isAnimating=!0,z===y-1?(s.State.calls.length>1e4&&(s.State.calls=e(s.State.calls)),s.State.calls.push([I,t,j,null,C.resolver]),s.State.isTicking===!1&&(s.State.isTicking=!0,i())):z++)}var g=this,j=r.extend({},s.defaults,w),m={};if(f(g)===d&&r.data(g,k,{isSVG:q.isSVG(g),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}}),parseFloat(j.delay)&&j.queue!==!1&&r.queue(g,j.queue,function(a){s.velocityQueueEntryFlag=!0,f(g).delayTimer={setTimeout:setTimeout(a,parseFloat(j.delay)),next:a}}),s.mock===!0)j.duration=1;else switch(j.duration.toString().toLowerCase()){case"fast":j.duration=200;break;case"normal":j.duration=l;break;case"slow":j.duration=600;break;default:j.duration=parseFloat(j.duration)||1}j.easing=h(j.easing,j.duration),j.begin&&!q.isFunction(j.begin)&&(j.begin=null),j.progress&&!q.isFunction(j.progress)&&(j.progress=null),j.complete&&!q.isFunction(j.complete)&&(j.complete=null),j.display&&(j.display=j.display.toString().toLowerCase(),"auto"===j.display&&(j.display=s.CSS.Values.getDisplayType(g))),j.visibility&&(j.visibility=j.visibility.toString().toLowerCase()),j.mobileHA=j.mobileHA&&s.State.isMobile&&!s.State.isGingerbread,j.queue===!1?j.delay?setTimeout(a,j.delay):a():r.queue(g,j.queue,function(b,c){return c===!0?(C.promise&&C.resolver(t),!0):(s.velocityQueueEntryFlag=!0,void a(b))}),""!==j.queue&&"fx"!==j.queue||"inprogress"===r.queue(g)[0]||r.dequeue(g)}var m,o,p,t,u,w,x=arguments[0]&&(r.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||q.isString(arguments[0].properties));if(q.isWrapped(this)?(m=!1,p=0,t=this,o=this):(m=!0,p=1,t=x?arguments[0].elements:arguments[0]),t=q.isWrapped(t)?[].slice.call(t):t){x?(u=arguments[0].properties,w=arguments[0].options):(u=arguments[p],w=arguments[p+1]);var y=q.isArray(t)||q.isNodeList(t)?t.length:1,z=0;if("stop"!==u&&!r.isPlainObject(w)){var A=p+1;w={};for(var B=A;B<arguments.length;B++)!q.isArray(arguments[B])&&/^\d/.test(arguments[B])?w.duration=parseFloat(arguments[B]):q.isString(arguments[B])||q.isArray(arguments[B])?w.easing=arguments[B]:q.isFunction(arguments[B])&&(w.complete=arguments[B])}var C={promise:null,resolver:null,rejecter:null};m&&s.Promise&&(C.promise=new s.Promise(function(a,b){C.resolver=a,C.rejecter=b}));var D;switch(u){case"scroll":D="scroll";break;case"reverse":D="reverse";break;case"stop":r.each(q.isNode(t)?[t]:t,function(a,b){f(b)&&f(b).delayTimer&&(clearTimeout(f(b).delayTimer.setTimeout),f(b).delayTimer.next(),delete f(b).delayTimer)});var E=[];return r.each(s.State.calls,function(a,b){b!==!1&&r.each(q.isNode(b[1])?[b[1]]:b[1],function(b,c){r.each(q.isNode(t)?[t]:t,function(b,d){if(d===c){if(f(d)&&r.each(f(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),w===!0||q.isString(w)){var e=q.isString(w)?w:"";r.each(r.queue(d,e),function(a,b){q.isFunction(b)&&b(null,!0)}),r.queue(d,e,[])}E.push(a)}})})}),r.each(E,function(a,b){j(b,!0)}),C.promise&&C.resolver(t),a();default:if(!r.isPlainObject(u)||r.isEmptyObject(u)){if(q.isString(u)&&s.Sequences[u]){var F=w.duration;return w.backwards===!0&&(t=(t.jquery?[].slice.call(t):t).reverse()),r.each(t,function(a,b){parseFloat(w.stagger)?w.delay=parseFloat(w.stagger)*a:q.isFunction(w.stagger)&&(w.delay=w.stagger.call(b,a,y)),w.drag&&(w.duration=parseFloat(F)||(/^(callout|transition)/.test(u)?1e3:l),w.duration=Math.max(w.duration*(w.backwards?1-a/y:(a+1)/y),.75*w.duration,200)),s.Sequences[u].call(b,b,w||{},a,y,t,C.promise?C:d)}),a()}var G="Velocity: First argument ("+u+") was not a property map, a known action, or a registered sequence. Aborting.";return C.promise?C.rejecter(new Error(G)):console.log(G),a()}D="start"}var H={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},I=[];r.each(q.isNode(t)?[t]:t,function(a,b){q.isNode(b)&&g.call(b)});var J,K=r.extend({},s.defaults,w);if(K.loop=parseInt(K.loop),J=2*K.loop-1,K.loop)for(var L=0;J>L;L++){var M={delay:K.delay};K.complete&&L===J-1&&(M.complete=K.complete),s.animate(t,"reverse",M)}return a()}};var w=b.jQuery||b.Zepto;w&&(w.fn.velocity=s.animate,w.fn.velocity.defaults=s.defaults),"undefined"!=typeof define&&define.amd?define('velocity',[],function(){return s}):"undefined"!=typeof module&&module.exports&&(module.exports=s),r.each(["Down","Up"],function(a,b){s.Sequences["slide"+b]=function(a,c){var d=r.extend({},c),e={height:null,marginTop:null,marginBottom:null,paddingTop:null,paddingBottom:null,overflow:null,overflowX:null,overflowY:null},f=d.begin,g=d.complete,h=!1;null!==d.display&&(d.display="Down"===b?d.display||"auto":d.display||"none"),d.begin=function(){function c(){e.height=parseFloat(s.CSS.getPropertyValue(a,"height")),a.style.height="auto",s.CSS.getPropertyValue(a,"height")===e.height&&(h=!0),s.CSS.setPropertyValue(a,"height",e.height+"px")}if("Down"===b){e.overflow=[s.CSS.getPropertyValue(a,"overflow"),0],e.overflowX=[s.CSS.getPropertyValue(a,"overflowX"),0],e.overflowY=[s.CSS.getPropertyValue(a,"overflowY"),0],a.style.overflow="hidden",a.style.overflowX="visible",a.style.overflowY="hidden",c();for(var d in e)if(!/^overflow/.test(d)){var g=s.CSS.getPropertyValue(a,d);"height"===d&&(g=parseFloat(g)),e[d]=[g,0]}}else{c();for(var d in e){var g=s.CSS.getPropertyValue(a,d);"height"===d&&(g=parseFloat(g)),e[d]=[0,g]}a.style.overflow="hidden",a.style.overflowX="visible",a.style.overflowY="hidden"}f&&f.call(a,a)},d.complete=function(a){var c="Down"===b?0:1;h===!0?e.height[c]="auto":e.height[c]+="px";for(var d in e)a.style[d]=e[d][c];g&&g.call(a,a)},s.animate(a,e,d)}}),r.each(["In","Out"],function(a,b){s.Sequences["fade"+b]=function(a,c,d,e){var f=r.extend({},c),g={opacity:"In"===b?1:0};d!==e-1&&(f.complete=f.begin=null),null!==f.display&&(f.display=f.display||("In"===b?"auto":"none")),s.animate(this,g,f)}})}(window.jQuery||window.Zepto||window,window,document);

/* turn.js 4.1.0 | Copyright (c) 2012 Emmanuel Garcia | turnjs.com | turnjs.com/license.txt */

(function(f){function J(a,b,c){if(!c[0]||"object"==typeof c[0])return b.init.apply(a,c);if(b[c[0]])return b[c[0]].apply(a,Array.prototype.slice.call(c,1));throw q(c[0]+" is not a method or property");}function l(a,b,c,d){return{css:{position:"absolute",top:a,left:b,overflow:d||"hidden",zIndex:c||"auto"}}}function S(a,b,c,d,e){var h=1-e,f=h*h*h,g=e*e*e;return j(Math.round(f*a.x+3*e*h*h*b.x+3*e*e*h*c.x+g*d.x),Math.round(f*a.y+3*e*h*h*b.y+3*e*e*h*c.y+g*d.y))}function j(a,b){return{x:a,y:b}}function F(a,
b,c){return z&&c?" translate3d("+a+"px,"+b+"px, 0px) ":" translate("+a+"px, "+b+"px) "}function G(a){return" rotate("+a+"deg) "}function n(a,b){return Object.prototype.hasOwnProperty.call(b,a)}function T(){for(var a=["Moz","Webkit","Khtml","O","ms"],b=a.length,c="";b--;)a[b]+"Transform"in document.body.style&&(c="-"+a[b].toLowerCase()+"-");return c}function P(a,b,c,d,e){var h,f=[];if("-webkit-"==w){for(h=0;h<e;h++)f.push("color-stop("+d[h][0]+", "+d[h][1]+")");a.css({"background-image":"-webkit-gradient(linear, "+
b.x+"% "+b.y+"%,"+c.x+"% "+c.y+"%, "+f.join(",")+" )"})}else{var b={x:b.x/100*a.width(),y:b.y/100*a.height()},c={x:c.x/100*a.width(),y:c.y/100*a.height()},g=c.x-b.x;h=c.y-b.y;var i=Math.atan2(h,g),x=i-Math.PI/2,x=Math.abs(a.width()*Math.sin(x))+Math.abs(a.height()*Math.cos(x)),g=Math.sqrt(h*h+g*g),c=j(c.x<b.x?a.width():0,c.y<b.y?a.height():0),k=Math.tan(i);h=-1/k;k=(h*c.x-c.y-k*b.x+b.y)/(h-k);c=h*k-h*c.x+c.y;b=Math.sqrt(Math.pow(k-b.x,2)+Math.pow(c-b.y,2));for(h=0;h<e;h++)f.push(" "+d[h][1]+" "+100*
(b+g*d[h][0])/x+"%");a.css({"background-image":w+"linear-gradient("+-i+"rad,"+f.join(",")+")"})}}function t(a,b,c){a=f.Event(a);b.trigger(a,c);return a.isDefaultPrevented()?"prevented":a.isPropagationStopped()?"stopped":""}function q(a){function b(a){this.name="TurnJsError";this.message=a}b.prototype=Error();b.prototype.constructor=b;return new b(a)}function D(a){var b={top:0,left:0};do b.left+=a.offsetLeft,b.top+=a.offsetTop;while(a=a.offsetParent);return b}var z,U,w="",K=Math.PI,L=K/2,u="ontouchstart"in
window,r=u?{down:"touchstart",move:"touchmove",up:"touchend",over:"touchstart",out:"touchend"}:{down:"mousedown",move:"mousemove",up:"mouseup",over:"mouseover",out:"mouseout"},p={backward:["bl","tl"],forward:["br","tr"],all:"tl bl tr br l r".split(" ")},V=["single","double"],W=["ltr","rtl"],X={acceleration:!0,display:"double",duration:600,page:1,gradients:!0,turnCorners:"bl,br",when:null},Y={cornerSize:100},g={init:function(a){z="WebKitCSSMatrix"in window||"MozPerspective"in document.body.style;var b;
U=(b=/AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent))?534.3<parseFloat(b[1]):!0;w=T();var c;b=0;var d=this.data(),e=this.children(),a=f.extend({width:this.width(),height:this.height(),direction:this.attr("dir")||this.css("direction")||"ltr"},X,a);d.opts=a;d.pageObjs={};d.pages={};d.pageWrap={};d.pageZoom={};d.pagePlace={};d.pageMv=[];d.zoom=1;d.totalPages=a.pages||0;d.eventHandlers={touchStart:f.proxy(g._touchStart,this),touchMove:f.proxy(g._touchMove,this),touchEnd:f.proxy(g._touchEnd,this),
start:f.proxy(g._eventStart,this)};if(a.when)for(c in a.when)n(c,a.when)&&this.bind(c,a.when[c]);this.css({position:"relative",width:a.width,height:a.height});this.turn("display",a.display);""!==a.direction&&this.turn("direction",a.direction);z&&(!u&&a.acceleration)&&this.transform(F(0,0,!0));for(c=0;c<e.length;c++)"1"!=f(e[c]).attr("ignore")&&this.turn("addPage",e[c],++b);f(this).bind(r.down,d.eventHandlers.touchStart).bind("end",g._eventEnd).bind("pressed",g._eventPressed).bind("released",g._eventReleased).bind("flip",
g._flip);f(this).parent().bind("start",d.eventHandlers.start);f(document).bind(r.move,d.eventHandlers.touchMove).bind(r.up,d.eventHandlers.touchEnd);this.turn("page",a.page);d.done=!0;return this},addPage:function(a,b){var c,d=!1,e=this.data(),h=e.totalPages+1;if(e.destroying)return!1;if(c=/\bp([0-9]+)\b/.exec(f(a).attr("class")))b=parseInt(c[1],10);if(b)if(b==h)d=!0;else{if(b>h)throw q('Page "'+b+'" cannot be inserted');}else b=h,d=!0;1<=b&&b<=h&&(c="double"==e.display?b%2?" odd":" even":"",e.done&&
this.turn("stop"),b in e.pageObjs&&g._movePages.call(this,b,1),d&&(e.totalPages=h),e.pageObjs[b]=f(a).css({"float":"left"}).addClass("page p"+b+c),-1!=navigator.userAgent.indexOf("MSIE 9.0")&&e.pageObjs[b].hasClass("hard")&&e.pageObjs[b].removeClass("hard"),g._addPage.call(this,b),g._removeFromDOM.call(this));return this},_addPage:function(a){var b=this.data(),c=b.pageObjs[a];if(c)if(g._necessPage.call(this,a)){if(!b.pageWrap[a]){b.pageWrap[a]=f("<div/>",{"class":"page-wrapper",page:a,css:{position:"absolute",
overflow:"hidden"}});this.append(b.pageWrap[a]);b.pagePlace[a]||(b.pagePlace[a]=a,b.pageObjs[a].appendTo(b.pageWrap[a]));var d=g._pageSize.call(this,a,!0);c.css({width:d.width,height:d.height});b.pageWrap[a].css(d)}b.pagePlace[a]==a&&g._makeFlip.call(this,a)}else b.pagePlace[a]=0,b.pageObjs[a]&&b.pageObjs[a].remove()},hasPage:function(a){return n(a,this.data().pageObjs)},center:function(a){var b=this.data(),c=f(this).turn("size"),d=0;b.noCenter||("double"==b.display&&(a=this.turn("view",a||b.tpage||
b.page),"ltr"==b.direction?a[0]?a[1]||(d+=c.width/4):d-=c.width/4:a[0]?a[1]||(d-=c.width/4):d+=c.width/4),f(this).css({marginLeft:d}));return this},destroy:function(){var a=this,b=this.data(),c="end first flip last pressed released start turning turned zooming missing".split(" ");if("prevented"!=t("destroying",this)){b.destroying=!0;f.each(c,function(b,c){a.unbind(c)});this.parent().unbind("start",b.eventHandlers.start);for(f(document).unbind(r.move,b.eventHandlers.touchMove).unbind(r.up,b.eventHandlers.touchEnd);0!==
b.totalPages;)this.turn("removePage",b.totalPages);b.fparent&&b.fparent.remove();b.shadow&&b.shadow.remove();this.removeData();b=null;return this}},is:function(){return"object"==typeof this.data().pages},zoom:function(a){var b=this.data();if("number"==typeof a){if(0.0010>a||100<a)throw q(a+" is not a value for zoom");if("prevented"==t("zooming",this,[a,b.zoom]))return this;var c=this.turn("size"),d=this.turn("view"),e=1/b.zoom,h=Math.round(c.width*e*a),c=Math.round(c.height*e*a);b.zoom=a;f(this).turn("stop").turn("size",
h,c);b.opts.autoCenter&&this.turn("center");g._updateShadow.call(this);for(a=0;a<d.length;a++)d[a]&&b.pageZoom[d[a]]!=b.zoom&&(this.trigger("zoomed",[d[a],d,b.pageZoom[d[a]],b.zoom]),b.pageZoom[d[a]]=b.zoom);return this}return b.zoom},_pageSize:function(a,b){var c=this.data(),d={};if("single"==c.display)d.width=this.width(),d.height=this.height(),b&&(d.top=0,d.left=0,d.right="auto");else{var e=this.width()/2,h=this.height();c.pageObjs[a].hasClass("own-size")?(d.width=c.pageObjs[a].width(),d.height=
c.pageObjs[a].height()):(d.width=e,d.height=h);if(b){var f=a%2;d.top=(h-d.height)/2;"ltr"==c.direction?(d[f?"right":"left"]=e-d.width,d[f?"left":"right"]="auto"):(d[f?"left":"right"]=e-d.width,d[f?"right":"left"]="auto")}}return d},_makeFlip:function(a){var b=this.data();if(!b.pages[a]&&b.pagePlace[a]==a){var c="single"==b.display,d=a%2;b.pages[a]=b.pageObjs[a].css(g._pageSize.call(this,a)).flip({page:a,next:d||c?a+1:a-1,turn:this}).flip("disable",b.disabled);g._setPageLoc.call(this,a);b.pageZoom[a]=
b.zoom}return b.pages[a]},_makeRange:function(){var a,b;if(!(1>this.data().totalPages)){b=this.turn("range");for(a=b[0];a<=b[1];a++)g._addPage.call(this,a)}},range:function(a){var b,c,d,e=this.data(),a=a||e.tpage||e.page||1;d=g._view.call(this,a);if(1>a||a>e.totalPages)throw q('"'+a+'" is not a valid page');d[1]=d[1]||d[0];1<=d[0]&&d[1]<=e.totalPages?(a=Math.floor(2),e.totalPages-d[1]>d[0]?(b=Math.min(d[0]-1,a),c=2*a-b):(c=Math.min(e.totalPages-d[1],a),b=2*a-c)):c=b=5;return[Math.max(1,d[0]-b),Math.min(e.totalPages,
d[1]+c)]},_necessPage:function(a){if(0===a)return!0;var b=this.turn("range");return this.data().pageObjs[a].hasClass("fixed")||a>=b[0]&&a<=b[1]},_removeFromDOM:function(){var a,b=this.data();for(a in b.pageWrap)n(a,b.pageWrap)&&!g._necessPage.call(this,a)&&g._removePageFromDOM.call(this,a)},_removePageFromDOM:function(a){var b=this.data();if(b.pages[a]){var c=b.pages[a].data();i._moveFoldingPage.call(b.pages[a],!1);c.f&&c.f.fwrapper&&c.f.fwrapper.remove();b.pages[a].removeData();b.pages[a].remove();
delete b.pages[a]}b.pageObjs[a]&&b.pageObjs[a].remove();b.pageWrap[a]&&(b.pageWrap[a].remove(),delete b.pageWrap[a]);g._removeMv.call(this,a);delete b.pagePlace[a];delete b.pageZoom[a]},removePage:function(a){var b=this.data();if("*"==a)for(;0!==b.totalPages;)this.turn("removePage",b.totalPages);else{if(1>a||a>b.totalPages)throw q("The page "+a+" doesn't exist");b.pageObjs[a]&&(this.turn("stop"),g._removePageFromDOM.call(this,a),delete b.pageObjs[a]);g._movePages.call(this,a,-1);b.totalPages-=1;b.page>
b.totalPages?(b.page=null,g._fitPage.call(this,b.totalPages)):(g._makeRange.call(this),this.turn("update"))}return this},_movePages:function(a,b){var c,d=this,e=this.data(),h="single"==e.display,f=function(a){var c=a+b,f=c%2,i=f?" odd ":" even ";e.pageObjs[a]&&(e.pageObjs[c]=e.pageObjs[a].removeClass("p"+a+" odd even").addClass("p"+c+i));e.pagePlace[a]&&e.pageWrap[a]&&(e.pagePlace[c]=c,e.pageWrap[c]=e.pageObjs[c].hasClass("fixed")?e.pageWrap[a].attr("page",c):e.pageWrap[a].css(g._pageSize.call(d,
c,!0)).attr("page",c),e.pages[a]&&(e.pages[c]=e.pages[a].flip("options",{page:c,next:h||f?c+1:c-1})),b&&(delete e.pages[a],delete e.pagePlace[a],delete e.pageZoom[a],delete e.pageObjs[a],delete e.pageWrap[a]))};if(0<b)for(c=e.totalPages;c>=a;c--)f(c);else for(c=a;c<=e.totalPages;c++)f(c)},display:function(a){var b=this.data(),c=b.display;if(void 0===a)return c;if(-1==f.inArray(a,V))throw q('"'+a+'" is not a value for display');switch(a){case "single":b.pageObjs[0]||(this.turn("stop").css({overflow:"hidden"}),
b.pageObjs[0]=f("<div />",{"class":"page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this));this.addClass("shadow");break;case "double":b.pageObjs[0]&&(this.turn("stop").css({overflow:""}),b.pageObjs[0].remove(),delete b.pageObjs[0]),this.removeClass("shadow")}b.display=a;c&&(a=this.turn("size"),g._movePages.call(this,1,0),this.turn("size",a.width,a.height).turn("update"));return this},direction:function(a){var b=this.data();if(void 0===a)return b.direction;a=a.toLowerCase();
if(-1==f.inArray(a,W))throw q('"'+a+'" is not a value for direction');"rtl"==a&&f(this).attr("dir","ltr").css({direction:"ltr"});b.direction=a;b.done&&this.turn("size",f(this).width(),f(this).height());return this},animating:function(){return 0<this.data().pageMv.length},corner:function(){var a,b,c=this.data();for(b in c.pages)if(n(b,c.pages)&&(a=c.pages[b].flip("corner")))return a;return!1},data:function(){return this.data()},disable:function(a){var b,c=this.data(),d=this.turn("view");c.disabled=
void 0===a||!0===a;for(b in c.pages)n(b,c.pages)&&c.pages[b].flip("disable",c.disabled?!0:-1==f.inArray(parseInt(b,10),d));return this},disabled:function(a){return void 0===a?!0===this.data().disabled:this.turn("disable",a)},size:function(a,b){if(void 0===a||void 0===b)return{width:this.width(),height:this.height()};this.turn("stop");var c,d,e=this.data();d="double"==e.display?a/2:a;this.css({width:a,height:b});e.pageObjs[0]&&e.pageObjs[0].css({width:d,height:b});for(c in e.pageWrap)n(c,e.pageWrap)&&
(d=g._pageSize.call(this,c,!0),e.pageObjs[c].css({width:d.width,height:d.height}),e.pageWrap[c].css(d),e.pages[c]&&e.pages[c].css({width:d.width,height:d.height}));this.turn("resize");return this},resize:function(){var a,b=this.data();b.pages[0]&&(b.pageWrap[0].css({left:-this.width()}),b.pages[0].flip("resize",!0));for(a=1;a<=b.totalPages;a++)b.pages[a]&&b.pages[a].flip("resize",!0);g._updateShadow.call(this);b.opts.autoCenter&&this.turn("center")},_removeMv:function(a){var b,c=this.data();for(b=
0;b<c.pageMv.length;b++)if(c.pageMv[b]==a)return c.pageMv.splice(b,1),!0;return!1},_addMv:function(a){var b=this.data();g._removeMv.call(this,a);b.pageMv.push(a)},_view:function(a){var b=this.data(),a=a||b.page;return"double"==b.display?a%2?[a-1,a]:[a,a+1]:[a]},view:function(a){var b=this.data(),a=g._view.call(this,a);return"double"==b.display?[0<a[0]?a[0]:0,a[1]<=b.totalPages?a[1]:0]:[0<a[0]&&a[0]<=b.totalPages?a[0]:0]},stop:function(a,b){if(this.turn("animating")){var c,d,e,h=this.data();h.tpage&&
(h.page=h.tpage,delete h.tpage);for(c=0;c<h.pageMv.length;c++)h.pageMv[c]&&h.pageMv[c]!==a&&(e=h.pages[h.pageMv[c]],d=e.data().f.opts,e.flip("hideFoldedPage",b),b||i._moveFoldingPage.call(e,!1),d.force&&(d.next=0===d.page%2?d.page-1:d.page+1,delete d.force))}this.turn("update");return this},pages:function(a){var b=this.data();if(a){if(a<b.totalPages)for(var c=b.totalPages;c>a;c--)this.turn("removePage",c);b.totalPages=a;g._fitPage.call(this,b.page);return this}return b.totalPages},_missing:function(a){var b=
this.data();if(!(1>b.totalPages)){for(var c=this.turn("range",a),d=[],a=c[0];a<=c[1];a++)b.pageObjs[a]||d.push(a);0<d.length&&this.trigger("missing",[d])}},_fitPage:function(a){var b=this.data(),c=this.turn("view",a);g._missing.call(this,a);if(b.pageObjs[a]){b.page=a;this.turn("stop");for(var d=0;d<c.length;d++)c[d]&&b.pageZoom[c[d]]!=b.zoom&&(this.trigger("zoomed",[c[d],c,b.pageZoom[c[d]],b.zoom]),b.pageZoom[c[d]]=b.zoom);g._removeFromDOM.call(this);g._makeRange.call(this);g._updateShadow.call(this);
this.trigger("turned",[a,c]);this.turn("update");b.opts.autoCenter&&this.turn("center")}},_turnPage:function(a){var b,c,d=this.data(),e=d.pagePlace[a],h=this.turn("view"),i=this.turn("view",a);if(d.page!=a){var j=d.page;if("prevented"==t("turning",this,[a,i])){j==d.page&&-1!=f.inArray(e,d.pageMv)&&d.pages[e].flip("hideFoldedPage",!0);return}-1!=f.inArray(1,i)&&this.trigger("first");-1!=f.inArray(d.totalPages,i)&&this.trigger("last")}"single"==d.display?(b=h[0],c=i[0]):h[1]&&a>h[1]?(b=h[1],c=i[0]):
h[0]&&a<h[0]&&(b=h[0],c=i[1]);e=d.opts.turnCorners.split(",");h=d.pages[b].data().f;i=h.opts;j=h.point;g._missing.call(this,a);d.pageObjs[a]&&(this.turn("stop"),d.page=a,g._makeRange.call(this),d.tpage=c,i.next!=c&&(i.next=c,i.force=!0),this.turn("update"),h.point=j,"hard"==h.effect?"ltr"==d.direction?d.pages[b].flip("turnPage",a>b?"r":"l"):d.pages[b].flip("turnPage",a>b?"l":"r"):"ltr"==d.direction?d.pages[b].flip("turnPage",e[a>b?1:0]):d.pages[b].flip("turnPage",e[a>b?0:1]))},page:function(a){var b=
this.data();if(void 0===a)return b.page;if(!b.disabled&&!b.destroying){a=parseInt(a,10);if(0<a&&a<=b.totalPages)return a!=b.page&&(!b.done||-1!=f.inArray(a,this.turn("view"))?g._fitPage.call(this,a):g._turnPage.call(this,a)),this;throw q("The page "+a+" does not exist");}},next:function(){return this.turn("page",Math.min(this.data().totalPages,g._view.call(this,this.data().page).pop()+1))},previous:function(){return this.turn("page",Math.max(1,g._view.call(this,this.data().page).shift()-1))},peel:function(a,
b){var c=this.data(),d=this.turn("view"),b=void 0===b?!0:!0===b;!1===a?this.turn("stop",null,b):"single"==c.display?c.pages[c.page].flip("peel",a,b):(d="ltr"==c.direction?-1!=a.indexOf("l")?d[0]:d[1]:-1!=a.indexOf("l")?d[1]:d[0],c.pages[d]&&c.pages[d].flip("peel",a,b));return this},_addMotionPage:function(){var a=f(this).data().f.opts,b=a.turn;b.data();g._addMv.call(b,a.page)},_eventStart:function(a,b,c){var d=b.turn.data(),e=d.pageZoom[b.page];a.isDefaultPrevented()||(e&&e!=d.zoom&&(b.turn.trigger("zoomed",
[b.page,b.turn.turn("view",b.page),e,d.zoom]),d.pageZoom[b.page]=d.zoom),"single"==d.display&&c&&("l"==c.charAt(1)&&"ltr"==d.direction||"r"==c.charAt(1)&&"rtl"==d.direction?(b.next=b.next<b.page?b.next:b.page-1,b.force=!0):b.next=b.next>b.page?b.next:b.page+1),g._addMotionPage.call(a.target));g._updateShadow.call(b.turn)},_eventEnd:function(a,b,c){f(a.target).data();var a=b.turn,d=a.data();if(c){if(c=d.tpage||d.page,c==b.next||c==b.page)delete d.tpage,g._fitPage.call(a,c||b.next,!0)}else g._removeMv.call(a,
b.page),g._updateShadow.call(a),a.turn("update")},_eventPressed:function(a){var a=f(a.target).data().f,b=a.opts.turn;b.data().mouseAction=!0;b.turn("update");return a.time=(new Date).getTime()},_eventReleased:function(a,b){var c;c=f(a.target);var d=c.data().f,e=d.opts.turn,h=e.data();c="single"==h.display?"br"==b.corner||"tr"==b.corner?b.x<c.width()/2:b.x>c.width()/2:0>b.x||b.x>c.width();if(200>(new Date).getTime()-d.time||c)a.preventDefault(),g._turnPage.call(e,d.opts.next);h.mouseAction=!1},_flip:function(a){a.stopPropagation();
a=f(a.target).data().f.opts;a.turn.trigger("turn",[a.next]);a.turn.data().opts.autoCenter&&a.turn.turn("center",a.next)},_touchStart:function(){var a=this.data(),b;for(b in a.pages)if(n(b,a.pages)&&!1===i._eventStart.apply(a.pages[b],arguments))return!1},_touchMove:function(){var a=this.data(),b;for(b in a.pages)n(b,a.pages)&&i._eventMove.apply(a.pages[b],arguments)},_touchEnd:function(){var a=this.data(),b;for(b in a.pages)n(b,a.pages)&&i._eventEnd.apply(a.pages[b],arguments)},calculateZ:function(a){var b,
c,d,e,h=this,f=this.data();b=this.turn("view");var i=b[0]||b[1],g=a.length-1,j={pageZ:{},partZ:{},pageV:{}},k=function(a){a=h.turn("view",a);a[0]&&(j.pageV[a[0]]=!0);a[1]&&(j.pageV[a[1]]=!0)};for(b=0;b<=g;b++)c=a[b],d=f.pages[c].data().f.opts.next,e=f.pagePlace[c],k(c),k(d),c=f.pagePlace[d]==d?d:c,j.pageZ[c]=f.totalPages-Math.abs(i-c),j.partZ[e]=2*f.totalPages-g+b;return j},update:function(){var a,b=this.data();if(this.turn("animating")&&0!==b.pageMv[0]){var c,d=this.turn("calculateZ",b.pageMv),e=
this.turn("corner"),h=this.turn("view"),i=this.turn("view",b.tpage);for(a in b.pageWrap)if(n(a,b.pageWrap)&&(c=b.pageObjs[a].hasClass("fixed"),b.pageWrap[a].css({display:d.pageV[a]||c?"":"none",zIndex:(b.pageObjs[a].hasClass("hard")?d.partZ[a]:d.pageZ[a])||(c?-1:0)}),c=b.pages[a]))c.flip("z",d.partZ[a]||null),d.pageV[a]&&c.flip("resize"),b.tpage?c.flip("hover",!1).flip("disable",-1==f.inArray(parseInt(a,10),b.pageMv)&&a!=i[0]&&a!=i[1]):c.flip("hover",!1===e).flip("disable",a!=h[0]&&a!=h[1])}else for(a in b.pageWrap)n(a,
b.pageWrap)&&(d=g._setPageLoc.call(this,a),b.pages[a]&&b.pages[a].flip("disable",b.disabled||1!=d).flip("hover",!0).flip("z",null));return this},_updateShadow:function(){var a,b,c=this.data(),d=this.width(),e=this.height(),h="single"==c.display?d:d/2;a=this.turn("view");c.shadow||(c.shadow=f("<div />",{"class":"shadow",css:l(0,0,0).css}).appendTo(this));for(var i=0;i<c.pageMv.length&&a[0]&&a[1];i++)a=this.turn("view",c.pages[c.pageMv[i]].data().f.opts.next),b=this.turn("view",c.pageMv[i]),a[0]=a[0]&&
b[0],a[1]=a[1]&&b[1];switch(a[0]?a[1]?3:"ltr"==c.direction?2:1:"ltr"==c.direction?1:2){case 1:c.shadow.css({width:h,height:e,top:0,left:h});break;case 2:c.shadow.css({width:h,height:e,top:0,left:0});break;case 3:c.shadow.css({width:d,height:e,top:0,left:0})}},_setPageLoc:function(a){var b=this.data(),c=this.turn("view"),d=0;if(a==c[0]||a==c[1])d=1;else if("single"==b.display&&a==c[0]+1||"double"==b.display&&a==c[0]-2||a==c[1]+2)d=2;if(!this.turn("animating"))switch(d){case 1:b.pageWrap[a].css({zIndex:b.totalPages,
display:""});break;case 2:b.pageWrap[a].css({zIndex:b.totalPages-1,display:""});break;case 0:b.pageWrap[a].css({zIndex:0,display:b.pageObjs[a].hasClass("fixed")?"":"none"})}return d},options:function(a){if(void 0===a)return this.data().opts;var b=this.data();f.extend(b.opts,a);a.pages&&this.turn("pages",a.pages);a.page&&this.turn("page",a.page);a.display&&this.turn("display",a.display);a.direction&&this.turn("direction",a.direction);a.width&&a.height&&this.turn("size",a.width,a.height);if(a.when)for(var c in a.when)n(c,
a.when)&&this.unbind(c).bind(c,a.when[c]);return this},version:function(){return"4.1.0"}},i={init:function(a){this.data({f:{disabled:!1,hover:!1,effect:this.hasClass("hard")?"hard":"sheet"}});this.flip("options",a);i._addPageWrapper.call(this);return this},setData:function(a){var b=this.data();b.f=f.extend(b.f,a);return this},options:function(a){var b=this.data().f;return a?(i.setData.call(this,{opts:f.extend({},b.opts||Y,a)}),this):b.opts},z:function(a){var b=this.data().f;b.opts["z-index"]=a;b.fwrapper&&
b.fwrapper.css({zIndex:a||parseInt(b.parent.css("z-index"),10)||0});return this},_cAllowed:function(){var a=this.data().f,b=a.opts.page,c=a.opts.turn.data(),d=b%2;return"hard"==a.effect?"ltr"==c.direction?[d?"r":"l"]:[d?"l":"r"]:"single"==c.display?1==b?"ltr"==c.direction?p.forward:p.backward:b==c.totalPages?"ltr"==c.direction?p.backward:p.forward:p.all:"ltr"==c.direction?p[d?"forward":"backward"]:p[d?"backward":"forward"]},_cornerActivated:function(a){var b=this.data().f,c=this.width(),d=this.height(),
a={x:a.x,y:a.y,corner:""},e=b.opts.cornerSize;if(0>=a.x||0>=a.y||a.x>=c||a.y>=d)return!1;var h=i._cAllowed.call(this);switch(b.effect){case "hard":if(a.x>c-e)a.corner="r";else if(a.x<e)a.corner="l";else return!1;break;case "sheet":if(a.y<e)a.corner+="t";else if(a.y>=d-e)a.corner+="b";else return!1;if(a.x<=e)a.corner+="l";else if(a.x>=c-e)a.corner+="r";else return!1}return!a.corner||-1==f.inArray(a.corner,h)?!1:a},_isIArea:function(a){var b=this.data().f.parent.offset(),a=u&&a.originalEvent?a.originalEvent.touches[0]:
a;return i._cornerActivated.call(this,{x:a.pageX-b.left,y:a.pageY-b.top})},_c:function(a,b){b=b||0;switch(a){case "tl":return j(b,b);case "tr":return j(this.width()-b,b);case "bl":return j(b,this.height()-b);case "br":return j(this.width()-b,this.height()-b);case "l":return j(b,0);case "r":return j(this.width()-b,0)}},_c2:function(a){switch(a){case "tl":return j(2*this.width(),0);case "tr":return j(-this.width(),0);case "bl":return j(2*this.width(),this.height());case "br":return j(-this.width(),
this.height());case "l":return j(2*this.width(),0);case "r":return j(-this.width(),0)}},_foldingPage:function(){var a=this.data().f;if(a){var b=a.opts;if(b.turn)return a=b.turn.data(),"single"==a.display?1<b.next||1<b.page?a.pageObjs[0]:null:a.pageObjs[b.next]}},_backGradient:function(){var a=this.data().f,b=a.opts.turn.data();if((b=b.opts.gradients&&("single"==b.display||2!=a.opts.page&&a.opts.page!=b.totalPages-1))&&!a.bshadow)a.bshadow=f("<div/>",l(0,0,1)).css({position:"",width:this.width(),height:this.height()}).appendTo(a.parent);
return b},type:function(){return this.data().f.effect},resize:function(a){var b=this.data().f,c=b.opts.turn.data(),d=this.width(),e=this.height();switch(b.effect){case "hard":a&&(b.wrapper.css({width:d,height:e}),b.fpage.css({width:d,height:e}),c.opts.gradients&&(b.ashadow.css({width:d,height:e}),b.bshadow.css({width:d,height:e})));break;case "sheet":a&&(a=Math.round(Math.sqrt(Math.pow(d,2)+Math.pow(e,2))),b.wrapper.css({width:a,height:a}),b.fwrapper.css({width:a,height:a}).children(":first-child").css({width:d,
height:e}),b.fpage.css({width:d,height:e}),c.opts.gradients&&b.ashadow.css({width:d,height:e}),i._backGradient.call(this)&&b.bshadow.css({width:d,height:e})),b.parent.is(":visible")&&(c=D(b.parent[0]),b.fwrapper.css({top:c.top,left:c.left}),c=D(b.opts.turn[0]),b.fparent.css({top:-c.top,left:-c.left})),this.flip("z",b.opts["z-index"])}},_addPageWrapper:function(){var a=this.data().f,b=a.opts.turn.data(),c=this.parent();a.parent=c;if(!a.wrapper)switch(a.effect){case "hard":var d={};d[w+"transform-style"]=
"preserve-3d";d[w+"backface-visibility"]="hidden";a.wrapper=f("<div/>",l(0,0,2)).css(d).appendTo(c).prepend(this);a.fpage=f("<div/>",l(0,0,1)).css(d).appendTo(c);b.opts.gradients&&(a.ashadow=f("<div/>",l(0,0,0)).hide().appendTo(c),a.bshadow=f("<div/>",l(0,0,0)));break;case "sheet":var d=this.width(),e=this.height();Math.round(Math.sqrt(Math.pow(d,2)+Math.pow(e,2)));a.fparent=a.opts.turn.data().fparent;a.fparent||(d=f("<div/>",{css:{"pointer-events":"none"}}).hide(),d.data().flips=0,d.css(l(0,0,"auto",
"visible").css).appendTo(a.opts.turn),a.opts.turn.data().fparent=d,a.fparent=d);this.css({position:"absolute",top:0,left:0,bottom:"auto",right:"auto"});a.wrapper=f("<div/>",l(0,0,this.css("z-index"))).appendTo(c).prepend(this);a.fwrapper=f("<div/>",l(c.offset().top,c.offset().left)).hide().appendTo(a.fparent);a.fpage=f("<div/>",l(0,0,0,"visible")).css({cursor:"default"}).appendTo(a.fwrapper);b.opts.gradients&&(a.ashadow=f("<div/>",l(0,0,1)).appendTo(a.fpage));i.setData.call(this,a)}i.resize.call(this,
!0)},_fold:function(a){var b=this.data().f,c=b.opts.turn.data(),d=i._c.call(this,a.corner),e=this.width(),h=this.height();switch(b.effect){case "hard":a.x="l"==a.corner?Math.min(Math.max(a.x,0),2*e):Math.max(Math.min(a.x,e),-e);var f,g,s,x,k,n=c.totalPages,l=b.opts["z-index"]||n,q={overflow:"visible"},p=d.x?(d.x-a.x)/e:a.x/e,r=90*p,t=90>r;switch(a.corner){case "l":x="0% 50%";k="100% 50%";t?(f=0,g=0<b.opts.next-1,s=1):(f="100%",g=b.opts.page+1<n,s=0);break;case "r":x="100% 50%",k="0% 50%",r=-r,e=-e,
t?(f=0,g=b.opts.next+1<n,s=0):(f="-100%",g=1!=b.opts.page,s=1)}q[w+"perspective-origin"]=k;b.wrapper.transform("rotateY("+r+"deg)translate3d(0px, 0px, "+(this.attr("depth")||0)+"px)",k);b.fpage.transform("translateX("+e+"px) rotateY("+(180+r)+"deg)",x);b.parent.css(q);t?(p=-p+1,b.wrapper.css({zIndex:l+1}),b.fpage.css({zIndex:l})):(p-=1,b.wrapper.css({zIndex:l}),b.fpage.css({zIndex:l+1}));c.opts.gradients&&(g?b.ashadow.css({display:"",left:f,backgroundColor:"rgba(0,0,0,"+0.5*p+")"}).transform("rotateY(0deg)"):
b.ashadow.hide(),b.bshadow.css({opacity:-p+1}),t?b.bshadow.parent()[0]!=b.wrapper[0]&&b.bshadow.appendTo(b.wrapper):b.bshadow.parent()[0]!=b.fpage[0]&&b.bshadow.appendTo(b.fpage),P(b.bshadow,j(100*s,0),j(100*(-s+1),0),[[0,"rgba(0,0,0,0.3)"],[1,"rgba(0,0,0,0)"]],2));break;case "sheet":var u=this,H=0,z,A,B,M,y,N,D,v=j(0,0),Q=j(0,0),m=j(0,0),J=i._foldingPage.call(this);Math.tan(0);var O=c.opts.acceleration,R=b.wrapper.height(),E="t"==a.corner.substr(0,1),C="l"==a.corner.substr(1,1),I=function(){var b=
j(0,0),f=j(0,0);b.x=d.x?d.x-a.x:a.x;b.y=U?d.y?d.y-a.y:a.y:0;f.x=C?e-b.x/2:a.x+b.x/2;f.y=b.y/2;var g=L-Math.atan2(b.y,b.x),k=g-Math.atan2(f.y,f.x),k=Math.max(0,Math.sin(k)*Math.sqrt(Math.pow(f.x,2)+Math.pow(f.y,2)));H=180*(g/K);m=j(k*Math.sin(g),k*Math.cos(g));if(g>L&&(m.x+=Math.abs(m.y*b.y/b.x),m.y=0,Math.round(m.x*Math.tan(K-g))<h))return a.y=Math.sqrt(Math.pow(h,2)+2*f.x*b.x),E&&(a.y=h-a.y),I();g>L&&(b=K-g,f=R-h/Math.sin(b),v=j(Math.round(f*Math.cos(b)),Math.round(f*Math.sin(b))),C&&(v.x=-v.x),
E&&(v.y=-v.y));z=Math.round(m.y/Math.tan(g)+m.x);b=e-z;f=b*Math.cos(2*g);k=b*Math.sin(2*g);Q=j(Math.round(C?b-f:z+f),Math.round(E?k:h-k));c.opts.gradients&&(y=b*Math.sin(g),b=i._c2.call(u,a.corner),b=Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2))/e,D=Math.sin(L*(1<b?2-b:b)),N=Math.min(b,1),M=100<y?(y-100)/y:0,A=j(100*(y*Math.sin(g)/e),100*(y*Math.cos(g)/h)),i._backGradient.call(u)&&(B=j(100*(1.2*y*Math.sin(g)/e),100*(1.2*y*Math.cos(g)/h)),C||(B.x=100-B.x),E||(B.y=100-B.y)));m.x=Math.round(m.x);
m.y=Math.round(m.y);return!0};f=function(a,d,f,g){var k=["0","auto"],m=(e-R)*f[0]/100,l=(h-R)*f[1]/100,d={left:k[d[0]],top:k[d[1]],right:k[d[2]],bottom:k[d[3]]},k={},n=90!=g&&-90!=g?C?-1:1:0,s=f[0]+"% "+f[1]+"%";u.css(d).transform(G(g)+F(a.x+n,a.y,O),s);b.fpage.css(d).transform(G(g)+F(a.x+Q.x-v.x-e*f[0]/100,a.y+Q.y-v.y-h*f[1]/100,O)+G((180/g-2)*g),s);b.wrapper.transform(F(-a.x+m-n,-a.y+l,O)+G(-g),s);b.fwrapper.transform(F(-a.x+v.x+m,-a.y+v.y+l,O)+G(-g),s);c.opts.gradients&&(f[0]&&(A.x=100-A.x),f[1]&&
(A.y=100-A.y),k["box-shadow"]="0 0 20px rgba(0,0,0,"+0.5*D+")",J.css(k),P(b.ashadow,j(C?100:0,E?0:100),j(A.x,A.y),[[M,"rgba(0,0,0,0)"],[0.8*(1-M)+M,"rgba(0,0,0,"+0.2*N+")"],[1,"rgba(255,255,255,"+0.2*N+")"]],3,0),i._backGradient.call(u)&&P(b.bshadow,j(C?0:100,E?0:100),j(B.x,B.y),[[0.6,"rgba(0,0,0,0)"],[0.8,"rgba(0,0,0,"+0.3*N+")"],[1,"rgba(0,0,0,0)"]],3))};switch(a.corner){case "tl":a.x=Math.max(a.x,1);I();f(m,[1,0,0,1],[100,0],H);break;case "tr":a.x=Math.min(a.x,e-1);I();f(j(-m.x,m.y),[0,0,0,1],
[0,0],-H);break;case "bl":a.x=Math.max(a.x,1);I();f(j(m.x,-m.y),[1,1,0,0],[100,100],-H);break;case "br":a.x=Math.min(a.x,e-1),I(),f(j(-m.x,-m.y),[0,1,1,0],[0,100],H)}}b.point=a},_moveFoldingPage:function(a){var b=this.data().f;if(b){var c=b.opts.turn,d=c.data(),e=d.pagePlace;a?(d=b.opts.next,e[d]!=b.opts.page&&(b.folding&&i._moveFoldingPage.call(this,!1),i._foldingPage.call(this).appendTo(b.fpage),e[d]=b.opts.page,b.folding=d),c.turn("update")):b.folding&&(d.pages[b.folding]?(c=d.pages[b.folding].data().f,
d.pageObjs[b.folding].appendTo(c.wrapper)):d.pageWrap[b.folding]&&d.pageObjs[b.folding].appendTo(d.pageWrap[b.folding]),b.folding in e&&(e[b.folding]=b.folding),delete b.folding)}},_showFoldedPage:function(a,b){var c=i._foldingPage.call(this),d=this.data(),e=d.f,f=e.visible;if(c){if(!f||!e.point||e.point.corner!=a.corner)if(c="hover"==e.status||"peel"==e.status||e.opts.turn.data().mouseAction?a.corner:null,f=!1,"prevented"==t("start",this,[e.opts,c]))return!1;if(b){var g=this,d=e.point&&e.point.corner==
a.corner?e.point:i._c.call(this,a.corner,1);this.animatef({from:[d.x,d.y],to:[a.x,a.y],duration:500,frame:function(b){a.x=Math.round(b[0]);a.y=Math.round(b[1]);i._fold.call(g,a)}})}else i._fold.call(this,a),d.effect&&!d.effect.turning&&this.animatef(!1);if(!f)switch(e.effect){case "hard":e.visible=!0;i._moveFoldingPage.call(this,!0);e.fpage.show();e.opts.shadows&&e.bshadow.show();break;case "sheet":e.visible=!0,e.fparent.show().data().flips++,i._moveFoldingPage.call(this,!0),e.fwrapper.show(),e.bshadow&&
e.bshadow.show()}return!0}return!1},hide:function(){var a=this.data().f,b=a.opts.turn.data(),c=i._foldingPage.call(this);switch(a.effect){case "hard":b.opts.gradients&&(a.bshadowLoc=0,a.bshadow.remove(),a.ashadow.hide());a.wrapper.transform("");a.fpage.hide();break;case "sheet":0===--a.fparent.data().flips&&a.fparent.hide(),this.css({left:0,top:0,right:"auto",bottom:"auto"}).transform(""),a.wrapper.transform(""),a.fwrapper.hide(),a.bshadow&&a.bshadow.hide(),c.transform("")}a.visible=!1;return this},
hideFoldedPage:function(a){var b=this.data().f;if(b.point){var c=this,d=b.point,e=function(){b.point=null;b.status="";c.flip("hide");c.trigger("end",[b.opts,!1])};if(a){var f=i._c.call(this,d.corner),a="t"==d.corner.substr(0,1)?Math.min(0,d.y-f.y)/2:Math.max(0,d.y-f.y)/2,g=j(d.x,d.y+a),l=j(f.x,f.y-a);this.animatef({from:0,to:1,frame:function(a){a=S(d,g,l,f,a);d.x=a.x;d.y=a.y;i._fold.call(c,d)},complete:e,duration:800,hiding:!0})}else this.animatef(!1),e()}},turnPage:function(a){var b=this,c=this.data().f,
d=c.opts.turn.data(),a={corner:c.corner?c.corner.corner:a||i._cAllowed.call(this)[0]},e=c.point||i._c.call(this,a.corner,c.opts.turn?d.opts.elevation:0),f=i._c2.call(this,a.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(c){c=S(e,e,f,f,c);a.x=c.x;a.y=c.y;i._showFoldedPage.call(b,a)},complete:function(){b.trigger("end",[c.opts,!0])},duration:d.opts.duration,turning:!0});c.corner=null},moving:function(){return"effect"in this.data()},isTurning:function(){return this.flip("moving")&&
this.data().effect.turning},corner:function(){return this.data().f.corner},_eventStart:function(a){var b=this.data().f,c=b.opts.turn;if(!b.corner&&!b.disabled&&!this.flip("isTurning")&&b.opts.page==c.data().pagePlace[b.opts.page]){b.corner=i._isIArea.call(this,a);if(b.corner&&i._foldingPage.call(this))return this.trigger("pressed",[b.point]),i._showFoldedPage.call(this,b.corner),!1;b.corner=null}},_eventMove:function(a){var b=this.data().f;if(!b.disabled)if(a=u?a.originalEvent.touches:[a],b.corner){var c=
b.parent.offset();b.corner.x=a[0].pageX-c.left;b.corner.y=a[0].pageY-c.top;i._showFoldedPage.call(this,b.corner)}else if(b.hover&&!this.data().effect&&this.is(":visible"))if(a=i._isIArea.call(this,a[0])){if("sheet"==b.effect&&2==a.corner.length||"hard"==b.effect)b.status="hover",b=i._c.call(this,a.corner,b.opts.cornerSize/2),a.x=b.x,a.y=b.y,i._showFoldedPage.call(this,a,!0)}else"hover"==b.status&&(b.status="",i.hideFoldedPage.call(this,!0))},_eventEnd:function(){var a=this.data().f,b=a.corner;!a.disabled&&
b&&"prevented"!=t("released",this,[a.point||b])&&i.hideFoldedPage.call(this,!0);a.corner=null},disable:function(a){i.setData.call(this,{disabled:a});return this},hover:function(a){i.setData.call(this,{hover:a});return this},peel:function(a,b){var c=this.data().f;if(a){if(-1==f.inArray(a,p.all))throw q("Corner "+a+" is not permitted");if(-1!=f.inArray(a,i._cAllowed.call(this))){var d=i._c.call(this,a,c.opts.cornerSize/2);c.status="peel";i._showFoldedPage.call(this,{corner:a,x:d.x,y:d.y},b)}}else c.status=
"",i.hideFoldedPage.call(this,b);return this}};window.requestAnim=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)};f.extend(f.fn,{flip:function(){return J(f(this[0]),i,arguments)},turn:function(){return J(f(this[0]),g,arguments)},transform:function(a,b){var c={};b&&(c[w+"transform-origin"]=b);c[w+"transform"]=a;return this.css(c)},animatef:function(a){var b=
this.data();b.effect&&b.effect.stop();if(a){a.to.length||(a.to=[a.to]);a.from.length||(a.from=[a.from]);for(var c=[],d=a.to.length,e=!0,g=this,i=(new Date).getTime(),j=function(){if(b.effect&&e){for(var f=[],k=Math.min(a.duration,(new Date).getTime()-i),l=0;l<d;l++)f.push(b.effect.easing(1,k,a.from[l],c[l],a.duration));a.frame(1==d?f[0]:f);k==a.duration?(delete b.effect,g.data(b),a.complete&&a.complete()):window.requestAnim(j)}},l=0;l<d;l++)c.push(a.to[l]-a.from[l]);b.effect=f.extend({stop:function(){e=
!1},easing:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c}},a);this.data(b);j()}else delete b.effect}});f.isTouch=u;f.mouseEvents=r;f.cssPrefix=T;f.cssTransitionEnd=function(){var a,b=document.createElement("fakeelement"),c={transition:"transitionend",OTransition:"oTransitionEnd",MSTransition:"transitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in c)if(void 0!==b.style[a])return c[a]};f.findPos=D})(jQuery);

define("pageTurn", function(){});

!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)k.push("exports"===i[l]?g={}:b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/cast",["exports"],function(a){function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.cast=b}),a("promise/config",["exports"],function(a){function b(a,b){return 2!==arguments.length?c[a]:void(c[a]=b)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){function d(){var a="Promise"in window&&"cast"in window.Promise&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var a;return new window.Promise(function(b){a=b}),f(a)}();a||(window.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./cast","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h,i){function j(a){if(!w(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof j))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],k(a,this)}function k(a,b){function c(a){p(b,a)}function d(a){r(b,a)}try{a(c,d)}catch(e){d(e)}}function l(a,b,c,d){var e,f,g,h,i=w(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;o(b,e)||(i&&g?p(b,e):h?r(b,f):a===F?p(b,e):a===G&&r(b,e))}function m(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+F]=c,e[f+G]=d}function n(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],l(b,c,d,f);a._subscribers=null}function o(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(v(b)&&(d=b.then,w(d)))return d.call(b,function(d){return c?!0:(c=!0,void(b!==d?p(a,d):q(a,d)))},function(b){return c?!0:(c=!0,void r(a,b))}),!0}catch(e){return c?!0:(r(a,e),!0)}return!1}function p(a,b){a===b?q(a,b):o(a,b)||q(a,b)}function q(a,b){a._state===D&&(a._state=E,a._detail=b,u.async(s,a))}function r(a,b){a._state===D&&(a._state=E,a._detail=b,u.async(t,a))}function s(a){n(a,a._state=F)}function t(a){n(a,a._state=G)}var u=a.config,v=(a.configure,b.objectOrFunction),w=b.isFunction,x=(b.now,c.cast),y=d.all,z=e.race,A=f.resolve,B=g.reject,C=h.asap;u.async=C;var D=void 0,E=0,F=1,G=2;j.prototype={constructor:j,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;u.async(function(){l(c._state,d,e[c._state-1],c._detail)})}else m(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},j.all=y,j.cast=x,j.race=z,j.resolve=A,j.reject=B,i.Promise=j}),a("promise/race",["./utils","exports"],function(a,b){function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){function b(a){var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}(),function(){function a(a,b,c){if(l)b(l.transaction(j,a).objectStore(j));else{var d=m.open(h,i);d.onerror=function(){c(d.error.name)},d.onupgradeneeded=function(){d.result.createObjectStore(j)},d.onsuccess=function(){l=d.result,b(l.transaction(j,a).objectStore(j))}}}function b(b,c){return new k(function(d,e){a("readonly",function(a){var f=a.get(b);f.onsuccess=function(){var a=f.result;void 0===a&&(a=null),c&&c(a),d(a)},f.onerror=function(){e(f.error.name)}},e)})}function c(b,c,d){return new k(function(e,f){a("readwrite",function(a){void 0===c&&(c=null);var g=a.put(c,b);g.onsuccess=function(){d&&d(c),e(c)},g.onerror=function(){f(g.error.name)}},f)})}function d(b,c){return new k(function(d,e){a("readwrite",function(a){var f=a["delete"](b);f.onsuccess=function(){c&&c(),d()},f.onerror=function(){e(f.error.name)}})})}function e(b){return new k(function(c,d){a("readwrite",function(a){var e=a.clear();e.onsuccess=function(){b&&b(),c()},e.onerror=function(){d(e.error.name)}},d)})}function f(b){return new k(function(c,d){a("readonly",function(a){var e=a.count();e.onsuccess=function(){b&&b(e.result),c(e.result)},e.onerror=function(){d(e.error.name)}})})}function g(b,c){return new k(function(d,e){return 0>b?(c&&c(null),void d(null)):void a("readonly",function(a){var f=!1,g=a.openCursor();g.onsuccess=function(){var a=g.result;return a?void(0===b?(c&&c(a.key),d(a.key)):f?(c&&c(a.key),d(a.key)):(f=!0,a.advance(b))):(c&&c(null),void d(null))},g.onerror=function(){e(g.error.name)}},e)})}var h="localforage",i=1,j="keyvaluepairs",k=window.Promise,l=null,m=m||window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.OIndexedDB||window.msIndexedDB;if(m){var n={driver:"asyncStorage",getItem:b,setItem:c,removeItem:d,clear:e,length:f,key:g};"function"==typeof define&&define.amd?define("asyncStorage",function(){return n}):"undefined"!=typeof module&&module.exports?module.exports=n:this.asyncStorage=n}}.call(this),function(){function a(a){return new h(function(b){g.clear(),a&&a(),b()})}function b(a,b){return new h(function(c,d){try{var e=g.getItem(a);e&&(e=JSON.parse(e)),b&&b(e),c(e)}catch(f){d(f)}})}function c(a,b){return new h(function(c){var d=g.key(a);b&&b(d),c(d)})}function d(a){return new h(function(b){var c=g.length;a&&a(c),b(c)})}function e(a,b){return new h(function(c){g.removeItem(a),b&&b(),c()})}function f(a,b,c){return new h(function(d,e){void 0===b&&(b=null);var f=b;try{b=JSON.stringify(b)}catch(h){e(h)}g.setItem(a,b),c&&c(f),d(f)})}var g,h=window.Promise;try{g=window.localStorage}catch(i){return}var j={driver:"localStorageWrapper",getItem:b,setItem:f,removeItem:e,clear:a,length:d,key:c};"function"==typeof define&&define.amd?define("localStorageWrapper",function(){return j}):"undefined"!=typeof module&&module.exports?module.exports=j:this.localStorageWrapper=j}.call(this),function(){function a(a,b){return new m(function(c,d){n.transaction(function(e){e.executeSql("SELECT * FROM localforage WHERE key = ? LIMIT 1",[a],function(a,e){var f=e.rows.length?e.rows.item(0).value:null;if(f&&f.substr(0,k)===j)try{f=JSON.parse(f.slice(k))}catch(g){d(g)}b&&b(f),c(f)},null)})})}function b(a,b,c){return new m(function(d){void 0===b&&(b=null);var e;e="boolean"==typeof b||"number"==typeof b||"object"==typeof b?j+JSON.stringify(b):b,n.transaction(function(f){f.executeSql("INSERT OR REPLACE INTO localforage (key, value) VALUES (?, ?)",[a,e],function(){c&&c(b),d(b)},null)})})}function c(a,b){return new m(function(c){n.transaction(function(d){d.executeSql("DELETE FROM localforage WHERE key = ?",[a],function(){b&&b(),c()},null)})})}function d(a){return new m(function(b){n.transaction(function(c){c.executeSql("DELETE FROM localforage",[],function(){a&&a(),b()},null)})})}function e(a){return new m(function(b){n.transaction(function(c){c.executeSql("SELECT COUNT(key) as c FROM localforage",[],function(c,d){var e=d.rows.item(0).c;a&&a(e),b(e)},null)})})}function f(a,b){return new m(function(c){n.transaction(function(d){d.executeSql("SELECT key FROM localforage WHERE id = ? LIMIT 1",[a+1],function(a,d){var e=d.rows.length?d.rows.item(0).key:null;b&&b(e),c(e)},null)})})}var g="localforage",h=4980736,i="1.0",j="__lfsc__:",k=j.length,l="keyvaluepairs",m=window.Promise;if(window.openDatabase){var n=window.openDatabase(g,i,l,h);n.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS localforage (id INTEGER PRIMARY KEY, key unique, value)")});var o={driver:"webSQLStorage",getItem:a,setItem:b,removeItem:c,clear:d,length:e,key:f};"function"==typeof define&&define.amd?define("webSQLStorage",function(){return o}):"undefined"!=typeof module&&module.exports?module.exports=o:this.webSQLStorage=o}}.call(this),function(){var a=window.Promise,b=1,c=2,d=3,e=d;"function"==typeof define&&define.amd?e=b:"undefined"!=typeof module&&module.exports&&(e=c);var f,g=g||window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.OIndexedDB||window.msIndexedDB,h=this,i={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage",setDriver:function(d,f){return new a(function(a,j){if(!g&&d===i.INDEXEDDB||!window.openDatabase&&d===i.WEBSQL)return f&&f(i),void j(i);if(e===b)requirejs([d],function(b){i._extend(b),f&&f(i),a(i)});else if(e===c){var k;switch(d){case i.INDEXEDDB:k=requirejs("localforage/src/drivers/indexeddb");break;case i.LOCALSTORAGE:k=requirejs("localforage/src/drivers/localstorage");break;case i.WEBSQL:k=requirejs("localforage/src/drivers/websql")}i._extend(k),f&&f(i),a(i)}else i._extend(h[d]),f&&f(i),a(i)})},_extend:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b])}};f=g?i.INDEXEDDB:window.openDatabase?i.WEBSQL:i.LOCALSTORAGE,i.setDriver(f),e===b?define('localForage',[],function(){return i}):e===c?module.exports=i:this.localforage=i}.call(this);

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define('lodash',[],function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);

(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.1.0";var h=t._;if(!h&&typeof requirejs!=="undefined")h=requirejs("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeningTo;if(!r)return this;var s=!e&&!i;if(!i&&typeof e==="object")i=this;if(t)(r={})[t._listenId]=t;for(var n in r){t=r[n];t.off(e,i,this);if(s||h.isEmpty(t._events))delete this._listeningTo[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeningTo||(this._listeningTo={});var n=e._listenId||(e._listenId=h.uniqueId("l"));s[n]=e;if(!r&&typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)i=this.parse(i,e)||{};i=h.defaults({},i,h.result(this,"defaults"));this.set(i,e);this.changed={};this.initialize.apply(this,arguments)};h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};M(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}i=h.extend({validate:true},i);if(r&&!i.wait){if(!this.set(r,i))return false}else{if(!this._validate(r,i))return false}if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};M(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}M(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e,{validationError:i}));return false}});var p=["keys","values","pairs","invert","pick","omit"];h.each(p,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var v=a.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var g={add:true,remove:true,merge:true};var m={add:true,remove:false};h.extend(v.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.extend({merge:false},e,m))},remove:function(t,e){var i=!h.isArray(t);t=i?[t]:h.clone(t);e||(e={});var r,s,n,a;for(r=0,s=t.length;r<s;r++){a=t[r]=this.get(t[r]);if(!a)continue;delete this._byId[a.id];delete this._byId[a.cid];n=this.indexOf(a);this.models.splice(n,1);this.length--;if(!e.silent){e.index=n;a.trigger("remove",a,this,e)}this._removeReference(a)}return i?t[0]:t},set:function(t,e){e=h.defaults({},e,g);if(e.parse)t=this.parse(t,e);var i=!h.isArray(t);t=i?t?[t]:[]:h.clone(t);var r,s,n,a,o,u,l;var c=e.at;var f=this.model;var p=this.comparator&&c==null&&e.sort!==false;var v=h.isString(this.comparator)?this.comparator:null;var m=[],y=[],_={};var w=e.add,b=e.merge,x=e.remove;var E=!p&&w&&x?[]:false;for(r=0,s=t.length;r<s;r++){o=t[r];if(o instanceof d){n=a=o}else{n=o[f.prototype.idAttribute]}if(u=this.get(n)){if(x)_[u.cid]=true;if(b){o=o===a?a.attributes:o;if(e.parse)o=u.parse(o,e);u.set(o,e);if(p&&!l&&u.hasChanged(v))l=true}t[r]=u}else if(w){a=t[r]=this._prepareModel(o,e);if(!a)continue;m.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}if(E)E.push(u||a)}if(x){for(r=0,s=this.length;r<s;++r){if(!_[(a=this.models[r]).cid])y.push(a)}if(y.length)this.remove(y,e)}if(m.length||E&&E.length){if(p)l=true;this.length+=m.length;if(c!=null){for(r=0,s=m.length;r<s;r++){this.models.splice(c+r,0,m[r])}}else{if(E)this.models.length=0;var T=E||m;for(r=0,s=T.length;r<s;r++){this.models.push(T[r])}}}if(l)this.sort({silent:true});if(!e.silent){for(r=0,s=m.length;r<s;r++){(a=m[r]).trigger("add",a,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return i?t[0]:t},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();t=this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,h.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,h.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t.id]||this._byId[t.cid]||this._byId[t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};M(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(t,e,s){if(s.wait)i.add(t,s);if(r)r(t,e,s)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e=e?h.clone(e):{};e.collection=this;var i=new this.model(t,e);if(!i.validationError)return i;this.trigger("invalid",this,i.validationError,e);return false},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var y=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(y,function(t){v.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var _=["groupBy","countBy","sortBy"];h.each(_,function(t){v.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var w=a.View=function(t){this.cid=h.uniqueId("view");t||(t={});h.extend(this,h.pick(t,x));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var b=/^(\S+)\s*(.*)$/;var x=["model","collection","el","id","attributes","className","tagName","events"];h.extend(w.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(b);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=T[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&E){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var E=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var k=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var $=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(k.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace(S,"(?:$1)?").replace($,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/[?#].*$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=P.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(O,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return h.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var R=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=v.extend=k.extend=w.extend=I.extend=R;var U=function(){throw new Error('A "url" property or function must be specified')};var M=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);

define("backbone", ["lodash"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Backbone;
    };
}(this)));

// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v1.5.1
//
// Copyright (c)2014 Derick Bailey, Muted Solutions, LLC.
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

Backbone.ChildViewContainer=function(a,b){var c=function(a){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),b.each(a,this.add,this)};b.extend(c.prototype,{add:function(a,b){var c=a.cid;this._views[c]=a,a.model&&(this._indexByModel[a.model.cid]=c),b&&(this._indexByCustom[b]=c),this._updateLength()},findByModel:function(a){return this.findByModelCid(a.cid)},findByModelCid:function(a){var b=this._indexByModel[a];return this.findByCid(b)},findByCustom:function(a){var b=this._indexByCustom[a];return this.findByCid(b)},findByIndex:function(a){return b.values(this._views)[a]},findByCid:function(a){return this._views[a]},remove:function(a){var c=a.cid;a.model&&delete this._indexByModel[a.model.cid],b.any(this._indexByCustom,function(a,b){return a===c?(delete this._indexByCustom[b],!0):void 0},this),delete this._views[c],this._updateLength()},call:function(a){this.apply(a,b.tail(arguments))},apply:function(a,c){b.each(this._views,function(d){b.isFunction(d[a])&&d[a].apply(d,c||[])})},_updateLength:function(){this.length=b.size(this._views)}});var d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return b.each(d,function(a){c.prototype[a]=function(){var c=b.values(this._views),d=[c].concat(b.toArray(arguments));return b[a].apply(b,d)}}),c}(Backbone,_),Backbone.Wreqr=function(a,b,c){var d={};return d.Handlers=function(a,b){var c=function(a){this.options=a,this._wreqrHandlers={},b.isFunction(this.initialize)&&this.initialize(a)};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events,{setHandlers:function(a){b.each(a,function(a,c){var d=null;b.isObject(a)&&!b.isFunction(a)&&(d=a.context,a=a.callback),this.setHandler(c,a,d)},this)},setHandler:function(a,b,c){var d={callback:b,context:c};this._wreqrHandlers[a]=d,this.trigger("handler:add",a,b,c)},hasHandler:function(a){return!!this._wreqrHandlers[a]},getHandler:function(a){var b=this._wreqrHandlers[a];if(!b)throw new Error("Handler not found for '"+a+"'");return function(){var a=Array.prototype.slice.apply(arguments);return b.callback.apply(b.context,a)}},removeHandler:function(a){delete this._wreqrHandlers[a]},removeAllHandlers:function(){this._wreqrHandlers={}}}),c}(a,c),d.CommandStorage=function(){var b=function(a){this.options=a,this._commands={},c.isFunction(this.initialize)&&this.initialize(a)};return c.extend(b.prototype,a.Events,{getCommands:function(a){var b=this._commands[a];return b||(b={command:a,instances:[]},this._commands[a]=b),b},addCommand:function(a,b){var c=this.getCommands(a);c.instances.push(b)},clearCommands:function(a){var b=this.getCommands(a);b.instances=[]}}),b}(),d.Commands=function(a){return a.Handlers.extend({storageType:a.CommandStorage,constructor:function(b){this.options=b||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var c=Array.prototype.slice.call(arguments);a.Handlers.prototype.constructor.apply(this,c)},execute:function(a,b){a=arguments[0],b=Array.prototype.slice.call(arguments,1),this.hasHandler(a)?this.getHandler(a).apply(this,b):this.storage.addCommand(a,b)},_executeCommands:function(a,b,d){var e=this.storage.getCommands(a);c.each(e.instances,function(a){b.apply(d,a)}),this.storage.clearCommands(a)},_initializeStorage:function(a){var b,d=a.storageType||this.storageType;b=c.isFunction(d)?new d:d,this.storage=b}})}(d),d.RequestResponse=function(a){return a.Handlers.extend({request:function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);return this.getHandler(a).apply(this,b)}})}(d),d.EventAggregator=function(a,b){var c=function(){};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events),c}(a,c),d}(Backbone,Backbone.Marionette,_);var Marionette=function(a,b,c){function d(a){return g.call(a)}function e(a,b){var c=new Error(a);throw c.name=b||"Error",c}var f={};b.Marionette=f,f.$=b.$;var g=Array.prototype.slice;return f.extend=b.Model.extend,f.getOption=function(a,b){if(a&&b){var c;return c=a.options&&b in a.options&&void 0!==a.options[b]?a.options[b]:a[b]}},f.triggerMethod=function(){function a(a,b,c){return c.toUpperCase()}var b=/(^|:)(\w)/gi,d=function(d){var e="on"+d.replace(b,a),f=this[e];return c.isFunction(this.trigger)&&this.trigger.apply(this,arguments),c.isFunction(f)?f.apply(this,c.tail(arguments)):void 0};return d}(),f.MonitorDOMRefresh=function(a){function b(a){a._isShown=!0,e(a)}function d(a){a._isRendered=!0,e(a)}function e(a){a._isShown&&a._isRendered&&f(a)&&c.isFunction(a.triggerMethod)&&a.triggerMethod("dom:refresh")}function f(b){return a.contains(b.el)}return function(a){a.listenTo(a,"show",function(){b(a)}),a.listenTo(a,"render",function(){d(a)})}}(document.documentElement),function(a){function b(a,b,d,f){var g=f.split(/\s+/);c.each(g,function(c){var f=a[c];f||e("Method '"+c+"' was configured as an event handler, but does not exist."),a.listenTo(b,d,f,a)})}function d(a,b,c,d){a.listenTo(b,c,d,a)}function f(a,b,d,e){var f=e.split(/\s+/);c.each(f,function(c){var e=a[c];a.stopListening(b,d,e,a)})}function g(a,b,c,d){a.stopListening(b,c,d,a)}function h(a,b,d,e,f){b&&d&&(c.isFunction(d)&&(d=d.call(a)),c.each(d,function(d,g){c.isFunction(d)?e(a,b,g,d):f(a,b,g,d)}))}a.bindEntityEvents=function(a,c,e){h(a,c,e,d,b)},a.unbindEntityEvents=function(a,b,c){h(a,b,c,g,f)}}(f),f.Callbacks=function(){this._deferred=f.$.Deferred(),this._callbacks=[]},c.extend(f.Callbacks.prototype,{add:function(a,b){this._callbacks.push({cb:a,ctx:b}),this._deferred.done(function(c,d){b&&(c=b),a.call(c,d)})},run:function(a,b){this._deferred.resolve(b,a)},reset:function(){var a=this._callbacks;this._deferred=f.$.Deferred(),this._callbacks=[],c.each(a,function(a){this.add(a.cb,a.ctx)},this)}}),f.Controller=function(a){this.triggerMethod=f.triggerMethod,this.options=a||{},c.isFunction(this.initialize)&&this.initialize(this.options)},f.Controller.extend=f.extend,c.extend(f.Controller.prototype,b.Events,{close:function(){this.stopListening(),this.triggerMethod("close"),this.unbind()}}),f.Region=function(a){if(this.options=a||{},this.el=f.getOption(this,"el"),!this.el){var b=new Error("An 'el' must be specified for a region.");throw b.name="NoElError",b}if(this.initialize){var c=Array.prototype.slice.apply(arguments);this.initialize.apply(this,c)}},c.extend(f.Region,{buildRegion:function(a,b){var d="string"==typeof a,e="string"==typeof a.selector,f="undefined"==typeof a.regionType,g="function"==typeof a;if(!g&&!d&&!e)throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");var h,i;d&&(h=a),a.selector&&(h=a.selector,delete a.selector),g&&(i=a),!g&&f&&(i=b),a.regionType&&(i=a.regionType,delete a.regionType),(d||g)&&(a={}),a.el=h;var j=new i(a);return a.parentEl&&(j.getEl=function(b){var d=a.parentEl;return c.isFunction(d)&&(d=d()),d.find(b)}),j}}),c.extend(f.Region.prototype,b.Events,{show:function(a){this.ensureEl();var b=a.isClosed||c.isUndefined(a.$el),d=a!==this.currentView;d&&this.close(),a.render(),(d||b)&&this.open(a),this.currentView=a,f.triggerMethod.call(this,"show",a),f.triggerMethod.call(a,"show")},ensureEl:function(){this.$el&&0!==this.$el.length||(this.$el=this.getEl(this.el))},getEl:function(a){return f.$(a)},open:function(a){this.$el.empty().append(a.el)},close:function(){var a=this.currentView;a&&!a.isClosed&&(a.close?a.close():a.remove&&a.remove(),f.triggerMethod.call(this,"close",a),delete this.currentView)},attachView:function(a){this.currentView=a},reset:function(){this.close(),delete this.$el}}),f.Region.extend=f.extend,f.RegionManager=function(a){var b=a.Controller.extend({constructor:function(b){this._regions={},a.Controller.prototype.constructor.call(this,b)},addRegions:function(a,b){var d={};return c.each(a,function(a,e){"string"==typeof a&&(a={selector:a}),a.selector&&(a=c.defaults({},a,b));var f=this.addRegion(e,a);d[e]=f},this),d},addRegion:function(b,d){var e,f=c.isObject(d),g=c.isString(d),h=!!d.selector;return e=g||f&&h?a.Region.buildRegion(d,a.Region):c.isFunction(d)?a.Region.buildRegion(d,a.Region):d,this._store(b,e),this.triggerMethod("region:add",b,e),e},get:function(a){return this._regions[a]},removeRegion:function(a){var b=this._regions[a];this._remove(a,b)},removeRegions:function(){c.each(this._regions,function(a,b){this._remove(b,a)},this)},closeRegions:function(){c.each(this._regions,function(a){a.close()},this)},close:function(){this.removeRegions();var b=Array.prototype.slice.call(arguments);a.Controller.prototype.close.apply(this,b)},_store:function(a,b){this._regions[a]=b,this._setLength()},_remove:function(a,b){b.close(),delete this._regions[a],this._setLength(),this.triggerMethod("region:remove",a,b)},_setLength:function(){this.length=c.size(this._regions)}}),d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return c.each(d,function(a){b.prototype[a]=function(){var b=c.values(this._regions),d=[b].concat(c.toArray(arguments));return c[a].apply(c,d)}}),b}(f),f.TemplateCache=function(a){this.templateId=a},c.extend(f.TemplateCache,{templateCaches:{},get:function(a){var b=this.templateCaches[a];return b||(b=new f.TemplateCache(a),this.templateCaches[a]=b),b.load()},clear:function(){var a,b=d(arguments),c=b.length;if(c>0)for(a=0;c>a;a++)delete this.templateCaches[b[a]];else this.templateCaches={}}}),c.extend(f.TemplateCache.prototype,{load:function(){if(this.compiledTemplate)return this.compiledTemplate;var a=this.loadTemplate(this.templateId);return this.compiledTemplate=this.compileTemplate(a),this.compiledTemplate},loadTemplate:function(a){var b=f.$(a).html();return b&&0!==b.length||e("Could not find template: '"+a+"'","NoTemplateError"),b},compileTemplate:function(a){return c.template(a)}}),f.Renderer={render:function(a,b){if(!a){var c=new Error("Cannot render the template since it's false, null or undefined.");throw c.name="TemplateNotFoundError",c}var d;return d="function"==typeof a?a:f.TemplateCache.get(a),d(b)}},f.View=b.View.extend({constructor:function(a){c.bindAll(this,"render");var d=Array.prototype.slice.apply(arguments);this.options=c.extend({},c.result(this,"options"),c.isFunction(a)?a.call(this):a),this.events=this.normalizeUIKeys(c.result(this,"events")),b.View.prototype.constructor.apply(this,d),f.MonitorDOMRefresh(this),this.listenTo(this,"show",this.onShowCalled,this)},triggerMethod:f.triggerMethod,getTemplate:function(){return f.getOption(this,"template")},mixinTemplateHelpers:function(a){a=a||{};var b=f.getOption(this,"templateHelpers");return c.isFunction(b)&&(b=b.call(this)),c.extend(a,b)},normalizeUIKeys:function(a){return"undefined"!=typeof a?(c.each(c.keys(a),function(b){var c=b.split("@ui.");2===c.length&&(a[c[0]+this.ui[c[1]]]=a[b],delete a[b])},this),a):void 0},configureTriggers:function(){if(this.triggers){var a={},b=this.normalizeUIKeys(c.result(this,"triggers"));return c.each(b,function(b,d){var e=c.isObject(b),f=e?b.event:b;a[d]=function(a){if(a){var c=a.preventDefault,d=a.stopPropagation,g=e?b.preventDefault:c,h=e?b.stopPropagation:d;g&&c&&c.apply(a),h&&d&&d.apply(a)}var i={view:this,model:this.model,collection:this.collection};this.triggerMethod(f,i)}},this),a}},delegateEvents:function(a){this._delegateDOMEvents(a),f.bindEntityEvents(this,this.model,f.getOption(this,"modelEvents")),f.bindEntityEvents(this,this.collection,f.getOption(this,"collectionEvents"))},_delegateDOMEvents:function(a){a=a||this.events,c.isFunction(a)&&(a=a.call(this));var d={},e=this.configureTriggers();c.extend(d,a,e),b.View.prototype.delegateEvents.call(this,d)},undelegateEvents:function(){var a=Array.prototype.slice.call(arguments);b.View.prototype.undelegateEvents.apply(this,a),f.unbindEntityEvents(this,this.model,f.getOption(this,"modelEvents")),f.unbindEntityEvents(this,this.collection,f.getOption(this,"collectionEvents"))},onShowCalled:function(){},close:function(){if(!this.isClosed){var a=this.triggerMethod("before:close");a!==!1&&(this.isClosed=!0,this.triggerMethod("close"),this.unbindUIElements(),this.remove())}},bindUIElements:function(){if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var a=c.result(this,"_uiBindings");this.ui={},c.each(c.keys(a),function(b){var c=a[b];this.ui[b]=this.$(c)},this)}},unbindUIElements:function(){this.ui&&this._uiBindings&&(c.each(this.ui,function(a,b){delete this.ui[b]},this),this.ui=this._uiBindings,delete this._uiBindings)}}),f.ItemView=f.View.extend({constructor:function(){f.View.prototype.constructor.apply(this,d(arguments))},serializeData:function(){var a={};return this.model?a=this.model.toJSON():this.collection&&(a={items:this.collection.toJSON()}),a},render:function(){this.isClosed=!1,this.triggerMethod("before:render",this),this.triggerMethod("item:before:render",this);var a=this.serializeData();a=this.mixinTemplateHelpers(a);var b=this.getTemplate(),c=f.Renderer.render(b,a);return this.$el.html(c),this.bindUIElements(),this.triggerMethod("render",this),this.triggerMethod("item:rendered",this),this},close:function(){this.isClosed||(this.triggerMethod("item:before:close"),f.View.prototype.close.apply(this,d(arguments)),this.triggerMethod("item:closed"))}}),f.CollectionView=f.View.extend({itemViewEventPrefix:"itemview",constructor:function(){this._initChildViewStorage(),f.View.prototype.constructor.apply(this,d(arguments)),this._initialEvents(),this.initRenderBuffer()},initRenderBuffer:function(){this.elBuffer=document.createDocumentFragment(),this._bufferedChildren=[]},startBuffering:function(){this.initRenderBuffer(),this.isBuffering=!0},endBuffering:function(){this.isBuffering=!1,this.appendBuffer(this,this.elBuffer),this._triggerShowBufferedChildren(),this.initRenderBuffer()},_triggerShowBufferedChildren:function(){this._isShown&&(c.each(this._bufferedChildren,function(a){f.triggerMethod.call(a,"show")}),this._bufferedChildren=[])},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this.addChildView,this),this.listenTo(this.collection,"remove",this.removeItemView,this),this.listenTo(this.collection,"reset",this.render,this))},addChildView:function(a){this.closeEmptyView();var b=this.getItemView(a),c=this.collection.indexOf(a);this.addItemView(a,b,c)},onShowCalled:function(){this.children.each(function(a){f.triggerMethod.call(a,"show")})},triggerBeforeRender:function(){this.triggerMethod("before:render",this),this.triggerMethod("collection:before:render",this)},triggerRendered:function(){this.triggerMethod("render",this),this.triggerMethod("collection:rendered",this)},render:function(){return this.isClosed=!1,this.triggerBeforeRender(),this._renderChildren(),this.triggerRendered(),this},_renderChildren:function(){this.startBuffering(),this.closeEmptyView(),this.closeChildren(),this.collection&&this.collection.length>0?this.showCollection():this.showEmptyView(),this.endBuffering()},showCollection:function(){var a;this.collection.each(function(b,c){a=this.getItemView(b),this.addItemView(b,a,c)},this)},showEmptyView:function(){var a=this.getEmptyView();if(a&&!this._showingEmptyView){this._showingEmptyView=!0;var c=new b.Model;this.addItemView(c,a,0)}},closeEmptyView:function(){this._showingEmptyView&&(this.closeChildren(),delete this._showingEmptyView)},getEmptyView:function(){return f.getOption(this,"emptyView")},getItemView:function(){var a=f.getOption(this,"itemView");return a||e("An `itemView` must be specified","NoItemViewError"),a},addItemView:function(a,b,d){var e=f.getOption(this,"itemViewOptions");c.isFunction(e)&&(e=e.call(this,a,d));var g=this.buildItemView(a,b,e);return this.addChildViewEventForwarding(g),this.triggerMethod("before:item:added",g),this.children.add(g),this.renderItemView(g,d),this._isShown&&!this.isBuffering&&f.triggerMethod.call(g,"show"),this.triggerMethod("after:item:added",g),g},addChildViewEventForwarding:function(a){var b=f.getOption(this,"itemViewEventPrefix");this.listenTo(a,"all",function(){var e=d(arguments),g=e[0],h=this.getItemEvents();e[0]=b+":"+g,e.splice(1,0,a),"undefined"!=typeof h&&c.isFunction(h[g])&&h[g].apply(this,e),f.triggerMethod.apply(this,e)},this)},getItemEvents:function(){return c.isFunction(this.itemEvents)?this.itemEvents.call(this):this.itemEvents},renderItemView:function(a,b){a.render(),this.appendHtml(this,a,b)},buildItemView:function(a,b,d){var e=c.extend({model:a},d);return new b(e)},removeItemView:function(a){var b=this.children.findByModel(a);this.removeChildView(b),this.checkEmpty()},removeChildView:function(a){a&&(this.stopListening(a),a.close?a.close():a.remove&&a.remove(),this.children.remove(a)),this.triggerMethod("item:removed",a)},checkEmpty:function(){this.collection&&0!==this.collection.length||this.showEmptyView()},appendBuffer:function(a,b){a.$el.append(b)},appendHtml:function(a,b){a.isBuffering?(a.elBuffer.appendChild(b.el),a._bufferedChildren.push(b)):a.$el.append(b.el)},_initChildViewStorage:function(){this.children=new b.ChildViewContainer},close:function(){this.isClosed||(this.triggerMethod("collection:before:close"),this.closeChildren(),this.triggerMethod("collection:closed"),f.View.prototype.close.apply(this,d(arguments)))},closeChildren:function(){this.children.each(function(a){this.removeChildView(a)},this),this.checkEmpty()}}),f.CompositeView=f.CollectionView.extend({constructor:function(){f.CollectionView.prototype.constructor.apply(this,d(arguments))},_initialEvents:function(){this.once("render",function(){this.collection&&(this.listenTo(this.collection,"add",this.addChildView,this),this.listenTo(this.collection,"remove",this.removeItemView,this),this.listenTo(this.collection,"reset",this._renderChildren,this))})},getItemView:function(){var a=f.getOption(this,"itemView")||this.constructor;return a||e("An `itemView` must be specified","NoItemViewError"),a},serializeData:function(){var a={};return this.model&&(a=this.model.toJSON()),a},render:function(){this.isRendered=!0,this.isClosed=!1,this.resetItemViewContainer(),this.triggerBeforeRender();var a=this.renderModel();return this.$el.html(a),this.bindUIElements(),this.triggerMethod("composite:model:rendered"),this._renderChildren(),this.triggerMethod("composite:rendered"),this.triggerRendered(),this},_renderChildren:function(){this.isRendered&&(f.CollectionView.prototype._renderChildren.call(this),this.triggerMethod("composite:collection:rendered"))},renderModel:function(){var a={};a=this.serializeData(),a=this.mixinTemplateHelpers(a);var b=this.getTemplate();return f.Renderer.render(b,a)},appendBuffer:function(a,b){var c=this.getItemViewContainer(a);c.append(b)},appendHtml:function(a,b){if(a.isBuffering)a.elBuffer.appendChild(b.el),a._bufferedChildren.push(b);else{var c=this.getItemViewContainer(a);c.append(b.el)}},getItemViewContainer:function(a){if("$itemViewContainer"in a)return a.$itemViewContainer;var b,d=f.getOption(a,"itemViewContainer");if(d){var g=c.isFunction(d)?d.call(this):d;b=a.$(g),b.length<=0&&e("The specified `itemViewContainer` was not found: "+a.itemViewContainer,"ItemViewContainerMissingError")}else b=a.$el;return a.$itemViewContainer=b,b},resetItemViewContainer:function(){this.$itemViewContainer&&delete this.$itemViewContainer}}),f.Layout=f.ItemView.extend({regionType:f.Region,constructor:function(a){a=a||{},this._firstRender=!0,this._initializeRegions(a),f.ItemView.prototype.constructor.call(this,a)},render:function(){this.isClosed&&this._initializeRegions(),this._firstRender?this._firstRender=!1:this.isClosed||this._reInitializeRegions();var a=Array.prototype.slice.apply(arguments),b=f.ItemView.prototype.render.apply(this,a);return b},close:function(){if(!this.isClosed){this.regionManager.close();var a=Array.prototype.slice.apply(arguments);f.ItemView.prototype.close.apply(this,a)}},addRegion:function(a,b){var c={};return c[a]=b,this._buildRegions(c)[a]},addRegions:function(a){return this.regions=c.extend({},this.regions,a),this._buildRegions(a)},removeRegion:function(a){return delete this.regions[a],this.regionManager.removeRegion(a)},_buildRegions:function(a){var b=this,c={regionType:f.getOption(this,"regionType"),parentEl:function(){return b.$el}};return this.regionManager.addRegions(a,c)},_initializeRegions:function(a){var b;this._initRegionManager(),b=c.isFunction(this.regions)?this.regions(a):this.regions||{},this.addRegions(b)},_reInitializeRegions:function(){this.regionManager.closeRegions(),this.regionManager.each(function(a){a.reset()})},_initRegionManager:function(){this.regionManager=new f.RegionManager,this.listenTo(this.regionManager,"region:add",function(a,b){this[a]=b,this.trigger("region:add",a,b)}),this.listenTo(this.regionManager,"region:remove",function(a,b){delete this[a],this.trigger("region:remove",a,b)})}}),f.AppRouter=b.Router.extend({constructor:function(a){b.Router.prototype.constructor.apply(this,d(arguments)),this.options=a||{};var c=f.getOption(this,"appRoutes"),e=this._getController();this.processAppRoutes(e,c)},appRoute:function(a,b){var c=this._getController();this._addAppRoute(c,a,b)},processAppRoutes:function(a,b){if(b){var d=c.keys(b).reverse();c.each(d,function(c){this._addAppRoute(a,c,b[c])},this)}},_getController:function(){return f.getOption(this,"controller")},_addAppRoute:function(a,b,d){var e=a[d];if(!e)throw new Error("Method '"+d+"' was not found on the controller");this.route(b,d,c.bind(e,a))}}),f.Application=function(a){this._initRegionManager(),this._initCallbacks=new f.Callbacks,this.vent=new b.Wreqr.EventAggregator,this.commands=new b.Wreqr.Commands,this.reqres=new b.Wreqr.RequestResponse,this.submodules={},c.extend(this,a),this.triggerMethod=f.triggerMethod},c.extend(f.Application.prototype,b.Events,{execute:function(){var a=Array.prototype.slice.apply(arguments);this.commands.execute.apply(this.commands,a)},request:function(){var a=Array.prototype.slice.apply(arguments);return this.reqres.request.apply(this.reqres,a)},addInitializer:function(a){this._initCallbacks.add(a)},start:function(a){this.triggerMethod("initialize:before",a),this._initCallbacks.run(a,this),this.triggerMethod("initialize:after",a),this.triggerMethod("start",a)},addRegions:function(a){return this._regionManager.addRegions(a)},closeRegions:function(){this._regionManager.closeRegions()},removeRegion:function(a){this._regionManager.removeRegion(a)},getRegion:function(a){return this._regionManager.get(a)},module:function(){var a=d(arguments);return a.unshift(this),f.Module.create.apply(f.Module,a)},_initRegionManager:function(){this._regionManager=new f.RegionManager,this.listenTo(this._regionManager,"region:add",function(a,b){this[a]=b}),this.listenTo(this._regionManager,"region:remove",function(a){delete this[a]})}}),f.Application.extend=f.extend,f.Module=function(a,b){this.moduleName=a,this.submodules={},this._setupInitializersAndFinalizers(),this.app=b,this.startWithParent=!0,this.triggerMethod=f.triggerMethod},c.extend(f.Module.prototype,b.Events,{addInitializer:function(a){this._initializerCallbacks.add(a)},addFinalizer:function(a){this._finalizerCallbacks.add(a)},start:function(a){this._isInitialized||(c.each(this.submodules,function(b){b.startWithParent&&b.start(a)}),this.triggerMethod("before:start",a),this._initializerCallbacks.run(a,this),this._isInitialized=!0,this.triggerMethod("start",a))},stop:function(){this._isInitialized&&(this._isInitialized=!1,f.triggerMethod.call(this,"before:stop"),c.each(this.submodules,function(a){a.stop()}),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),f.triggerMethod.call(this,"stop"))},addDefinition:function(a,b){this._runModuleDefinition(a,b)},_runModuleDefinition:function(a,d){if(a){var e=c.flatten([this,this.app,b,f,f.$,c,d]);a.apply(this,e)}},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new f.Callbacks,this._finalizerCallbacks=new f.Callbacks}}),c.extend(f.Module,{create:function(a,b,e){var f=a,g=d(arguments);g.splice(0,3),b=b.split(".");var h=b.length,i=[];return i[h-1]=e,c.each(b,function(b,c){var d=f;f=this._getModule(d,b,a),this._addModuleDefinition(d,f,i[c],g)},this),f},_getModule:function(a,b,c){var d=a[b];return d||(d=new f.Module(b,c),a[b]=d,a.submodules[b]=d),d},_addModuleDefinition:function(a,b,d,e){var f,g;c.isFunction(d)?(f=d,g=!0):c.isObject(d)?(f=d.define,g=d.startWithParent):g=!0,f&&b.addDefinition(f,e),b.startWithParent=b.startWithParent&&g,b.startWithParent&&!b.startWithParentIsConfigured&&(b.startWithParentIsConfigured=!0,a.addInitializer(function(a){b.startWithParent&&b.start(a)}))}}),f}(this,Backbone,_);

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
if(!jQuery)throw new Error("Bootstrap requirejss jQuery");+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery),+function(a){var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(window.jQuery),+function(a){function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(window.jQuery),+function(a){var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(window.jQuery),+function(a){var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requirejss tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery);

define("bootstrap", ["jquery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.jquery;
    };
}(this)));

!function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(n){return aa+n in this}function o(n){return n=aa+n,n in this&&delete this[n]}function a(){var n=[];return this.forEach(function(t){n.push(t)}),n}function c(){var n=0;for(var t in this)t.charCodeAt(0)===ca&&++n;return n}function s(){for(var n in this)if(n.charCodeAt(0)===ca)return!1;return!0}function l(){}function f(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function h(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var e=0,r=sa.length;r>e;++e){var u=sa[e]+t;if(u in n)return u}}function g(){}function p(){}function v(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,i=e.indexOf(o)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function d(){Xo.event.preventDefault()}function m(){for(var n,t=Xo.event;n=t.sourceEvent;)t=n;return t}function y(n){for(var t=new p,e=0,r=arguments.length;++e<r;)t[arguments[e]]=v(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=Xo.event;u.target=n,Xo.event=u,t[u.type].apply(e,r)}finally{Xo.event=i}}},t}function x(n){return fa(n,da),n}function M(n){return"function"==typeof n?n:function(){return ha(n,this)}}function _(n){return"function"==typeof n?n:function(){return ga(n,this)}}function b(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=Xo.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?i:u}function w(n){return n.trim().replace(/\s+/g," ")}function S(n){return new RegExp("(?:^|\\s+)"+Xo.requote(n)+"(?:\\s+|$)","g")}function k(n){return n.trim().split(/^|\s+/)}function E(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=k(n).map(A);var u=n.length;return"function"==typeof t?r:e}function A(n){var t=S(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",w(u+" "+n))):e.setAttribute("class",w(u.replace(t," ")))}}function C(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function N(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function L(n){return"function"==typeof n?n:(n=Xo.ns.qualify(n)).local?function(){return this.ownerDocument.createElementNS(n.space,n.local)}:function(){return this.ownerDocument.createElementNS(this.namespaceURI,n)}}function z(n){return{__data__:n}}function q(n){return function(){return va(this,n)}}function T(n){return arguments.length||(n=Xo.ascending),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function R(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,e);return n}function D(n){return fa(n,ya),n}function P(n){var t,e;return function(r,u,i){var o,a=n[i].update,c=a.length;for(i!=e&&(e=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function U(){var n=this.__transition__;n&&++n.active}function j(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=c(t,Bo(arguments));r.call(this),this.addEventListener(n,this[o]=u,u.$=e),u._=t}function i(){var t,e=new RegExp("^__on([^.]+)"+Xo.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),c=H;a>0&&(n=n.substring(0,a));var s=Ma.get(n);return s&&(n=s,c=F),a?t?u:r:t?g:i}function H(n,t){return function(e){var r=Xo.event;Xo.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{Xo.event=r}}}function F(n,t){var e=H(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function O(){var n=".dragsuppress-"+ ++ba,t="click"+n,e=Xo.select(Go).on("touchmove"+n,d).on("dragstart"+n,d).on("selectstart"+n,d);if(_a){var r=Jo.style,u=r[_a];r[_a]="none"}return function(i){function o(){e.on(t,null)}e.on(n,null),_a&&(r[_a]=u),i&&(e.on(t,function(){d(),o()},!0),setTimeout(o,0))}}function Y(n,t){t.changedTouches&&(t=t.changedTouches[0]);var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>wa&&(Go.scrollX||Go.scrollY)){e=Xo.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var u=e[0][0].getScreenCTM();wa=!(u.f||u.e),e.remove()}return wa?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function I(n){return n>0?1:0>n?-1:0}function Z(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])}function V(n){return n>1?0:-1>n?Sa:Math.acos(n)}function X(n){return n>1?Ea:-1>n?-Ea:Math.asin(n)}function $(n){return((n=Math.exp(n))-1/n)/2}function B(n){return((n=Math.exp(n))+1/n)/2}function W(n){return((n=Math.exp(2*n))-1)/(n+1)}function J(n){return(n=Math.sin(n/2))*n}function G(){}function K(n,t,e){return new Q(n,t,e)}function Q(n,t,e){this.h=n,this.s=t,this.l=e}function nt(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*r(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,i=2*e-o,gt(u(n+120),u(n),u(n-120))}function tt(n,t,e){return new et(n,t,e)}function et(n,t,e){this.h=n,this.c=t,this.l=e}function rt(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),ut(e,Math.cos(n*=Na)*t,Math.sin(n)*t)}function ut(n,t,e){return new it(n,t,e)}function it(n,t,e){this.l=n,this.a=t,this.b=e}function ot(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=ct(u)*Fa,r=ct(r)*Oa,i=ct(i)*Ya,gt(lt(3.2404542*u-1.5371385*r-.4985314*i),lt(-.969266*u+1.8760108*r+.041556*i),lt(.0556434*u-.2040259*r+1.0572252*i))}function at(n,t,e){return n>0?tt(Math.atan2(e,t)*La,Math.sqrt(t*t+e*e),n):tt(0/0,0/0,n)}function ct(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function st(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function lt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function ft(n){return gt(n>>16,255&n>>8,255&n)}function ht(n){return ft(n)+""}function gt(n,t,e){return new pt(n,t,e)}function pt(n,t,e){this.r=n,this.g=t,this.b=e}function vt(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function dt(n,t,e){var r,u,i,o=0,a=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(Mt(u[0]),Mt(u[1]),Mt(u[2]))}return(i=Va.get(n))?t(i.r,i.g,i.b):(null!=n&&"#"===n.charAt(0)&&(4===n.length?(o=n.charAt(1),o+=o,a=n.charAt(2),a+=a,c=n.charAt(3),c+=c):7===n.length&&(o=n.substring(1,3),a=n.substring(3,5),c=n.substring(5,7)),o=parseInt(o,16),a=parseInt(a,16),c=parseInt(c,16)),t(o,a,c))}function mt(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=0/0,u=c>0&&1>c?0:r),K(r,u,c)}function yt(n,t,e){n=xt(n),t=xt(t),e=xt(e);var r=st((.4124564*n+.3575761*t+.1804375*e)/Fa),u=st((.2126729*n+.7151522*t+.072175*e)/Oa),i=st((.0193339*n+.119192*t+.9503041*e)/Ya);return ut(116*u-16,500*(r-u),200*(u-i))}function xt(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function Mt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function _t(n){return"function"==typeof n?n:function(){return n}}function bt(n){return n}function wt(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),St(t,e,n,r)}}function St(n,t,e,r){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(i,c)}catch(r){return o.error.call(i,r),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=Xo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,s=null;return!Go.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=Xo.event;Xo.event=n;try{o.progress.call(i,c)}finally{Xo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(s=n,i):s},i.response=function(n){return e=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Bo(arguments)))}}),i.send=function(e,r,u){if(2===arguments.length&&"function"==typeof r&&(u=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var l in a)c.setRequestHeader(l,a[l]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=s&&(c.responseType=s),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==r?null:r),i},i.abort=function(){return c.abort(),i},Xo.rebind(i,o,"on"),null==r?i:i.get(kt(r))}function kt(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Et(){var n=At(),t=Ct()-n;t>24?(isFinite(t)&&(clearTimeout(Wa),Wa=setTimeout(Et,t)),Ba=0):(Ba=1,Ga(Et))}function At(){var n=Date.now();for(Ja=Xa;Ja;)n>=Ja.t&&(Ja.f=Ja.c(n-Ja.t)),Ja=Ja.n;return n}function Ct(){for(var n,t=Xa,e=1/0;t;)t.f?t=n?n.n=t.n:Xa=t.n:(t.t<e&&(e=t.t),t=(n=t).n);return $a=n,e}function Nt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Lt(n,t){var e=Math.pow(10,3*oa(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function zt(n){var t=n.decimal,e=n.thousands,r=n.grouping,u=n.currency,i=r?function(n){for(var t=n.length,u=[],i=0,o=r[0];t>0&&o>0;)u.push(n.substring(t-=o,t+o)),o=r[i=(i+1)%r.length];return u.reverse().join(e)}:bt;return function(n){var e=Qa.exec(n),r=e[1]||" ",o=e[2]||">",a=e[3]||"",c=e[4]||"",s=e[5],l=+e[6],f=e[7],h=e[8],g=e[9],p=1,v="",d="",m=!1;switch(h&&(h=+h.substring(1)),(s||"0"===r&&"="===o)&&(s=r="0",o="=",f&&(l-=Math.floor((l-1)/4))),g){case"n":f=!0,g="g";break;case"%":p=100,d="%",g="f";break;case"p":p=100,d="%",g="r";break;case"b":case"o":case"x":case"X":"#"===c&&(v="0"+g.toLowerCase());case"c":case"d":m=!0,h=0;break;case"s":p=-1,g="r"}"$"===c&&(v=u[0],d=u[1]),"r"!=g||h||(g="g"),null!=h&&("g"==g?h=Math.max(1,Math.min(21,h)):("e"==g||"f"==g)&&(h=Math.max(0,Math.min(20,h)))),g=nc.get(g)||qt;var y=s&&f;return function(n){if(m&&n%1)return"";var e=0>n||0===n&&0>1/n?(n=-n,"-"):a;if(0>p){var u=Xo.formatPrefix(n,h);n=u.scale(n),d=u.symbol}else n*=p;n=g(n,h);var c=n.lastIndexOf("."),x=0>c?n:n.substring(0,c),M=0>c?"":t+n.substring(c+1);!s&&f&&(x=i(x));var _=v.length+x.length+M.length+(y?0:e.length),b=l>_?new Array(_=l-_+1).join(r):"";return y&&(x=i(b+x)),e+=v,n=x+M,("<"===o?e+n+b:">"===o?b+e+n:"^"===o?b.substring(0,_>>=1)+e+n+b.substring(_):e+(y?n:b+n))+d}}}function qt(n){return n+""}function Tt(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Rt(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new ec(e-1)),1),e}function i(n,e){return t(n=new ec(+n),e),n}function o(n,r,i){var o=u(n),a=[];if(i>1)for(;r>o;)e(o)%i||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{ec=Tt;var r=new Tt;return r._=n,o(r,t,e)}finally{ec=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=Dt(n);return c.floor=c,c.round=Dt(r),c.ceil=Dt(u),c.offset=Dt(i),c.range=a,n}function Dt(n){return function(t,e){try{ec=Tt;var r=new Tt;return r._=t,n(r,e)._}finally{ec=Date}}}function Pt(n){function t(n){function t(t){for(var e,u,i,o=[],a=-1,c=0;++a<r;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=uc[e=n.charAt(++a)])&&(e=n.charAt(++a)),(i=C[e])&&(e=i(t,null==u?"e"===e?" ":"0":u)),o.push(e),c=a+1);return o.push(n.substring(c,a)),o.join("")}var r=n.length;return t.parse=function(t){var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},u=e(r,n,t,0);if(u!=t.length)return null;"p"in r&&(r.H=r.H%12+12*r.p);var i=null!=r.Z&&ec!==Tt,o=new(i?Tt:ec);return"j"in r?o.setFullYear(r.y,0,r.j):"w"in r&&("W"in r||"U"in r)?(o.setFullYear(r.y,0,1),o.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(o.getDay()+5)%7:r.w+7*r.U-(o.getDay()+6)%7)):o.setFullYear(r.y,r.m,r.d),o.setHours(r.H+Math.floor(r.Z/100),r.M+r.Z%100,r.S,r.L),i?o._:o},t.toString=function(){return n},t}function e(n,t,e,r){for(var u,i,o,a=0,c=t.length,s=e.length;c>a;){if(r>=s)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=N[o in uc?t.charAt(a++):o],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function r(n,t,e){b.lastIndex=0;var r=b.exec(t.substring(e));return r?(n.w=w.get(r[0].toLowerCase()),e+r[0].length):-1}function u(n,t,e){M.lastIndex=0;var r=M.exec(t.substring(e));return r?(n.w=_.get(r[0].toLowerCase()),e+r[0].length):-1}function i(n,t,e){E.lastIndex=0;var r=E.exec(t.substring(e));return r?(n.m=A.get(r[0].toLowerCase()),e+r[0].length):-1}function o(n,t,e){S.lastIndex=0;var r=S.exec(t.substring(e));return r?(n.m=k.get(r[0].toLowerCase()),e+r[0].length):-1}function a(n,t,r){return e(n,C.c.toString(),t,r)}function c(n,t,r){return e(n,C.x.toString(),t,r)}function s(n,t,r){return e(n,C.X.toString(),t,r)}function l(n,t,e){var r=x.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}var f=n.dateTime,h=n.date,g=n.time,p=n.periods,v=n.days,d=n.shortDays,m=n.months,y=n.shortMonths;t.utc=function(n){function e(n){try{ec=Tt;var t=new ec;return t._=n,r(t)}finally{ec=Date}}var r=t(n);return e.parse=function(n){try{ec=Tt;var t=r.parse(n);return t&&t._}finally{ec=Date}},e.toString=r.toString,e},t.multi=t.utc.multi=ee;var x=Xo.map(),M=jt(v),_=Ht(v),b=jt(d),w=Ht(d),S=jt(m),k=Ht(m),E=jt(y),A=Ht(y);p.forEach(function(n,t){x.set(n.toLowerCase(),t)});var C={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return y[n.getMonth()]},B:function(n){return m[n.getMonth()]},c:t(f),d:function(n,t){return Ut(n.getDate(),t,2)},e:function(n,t){return Ut(n.getDate(),t,2)},H:function(n,t){return Ut(n.getHours(),t,2)},I:function(n,t){return Ut(n.getHours()%12||12,t,2)},j:function(n,t){return Ut(1+tc.dayOfYear(n),t,3)},L:function(n,t){return Ut(n.getMilliseconds(),t,3)},m:function(n,t){return Ut(n.getMonth()+1,t,2)},M:function(n,t){return Ut(n.getMinutes(),t,2)},p:function(n){return p[+(n.getHours()>=12)]},S:function(n,t){return Ut(n.getSeconds(),t,2)},U:function(n,t){return Ut(tc.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Ut(tc.mondayOfYear(n),t,2)},x:t(h),X:t(g),y:function(n,t){return Ut(n.getFullYear()%100,t,2)},Y:function(n,t){return Ut(n.getFullYear()%1e4,t,4)},Z:ne,"%":function(){return"%"}},N={a:r,A:u,b:i,B:o,c:a,d:Bt,e:Bt,H:Jt,I:Jt,j:Wt,L:Qt,m:$t,M:Gt,p:l,S:Kt,U:Ot,w:Ft,W:Yt,x:c,X:s,y:Zt,Y:It,Z:Vt,"%":te};return t}function Ut(n,t,e){var r=0>n?"-":"",u=(r?-n:n)+"",i=u.length;return r+(e>i?new Array(e-i+1).join(t)+u:u)}function jt(n){return new RegExp("^(?:"+n.map(Xo.requote).join("|")+")","i")}function Ht(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Ft(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Ot(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e));return r?(n.U=+r[0],e+r[0].length):-1}function Yt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e));return r?(n.W=+r[0],e+r[0].length):-1}function It(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Zt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.y=Xt(+r[0]),e+r[0].length):-1}function Vt(n,t,e){return/^[+-]\d{4}$/.test(t=t.substring(e,e+5))?(n.Z=+t,e+5):-1}function Xt(n){return n+(n>68?1900:2e3)}function $t(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function Bt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function Wt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function Jt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function Gt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function Kt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function Qt(n,t,e){ic.lastIndex=0;var r=ic.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function ne(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(oa(t)/60),u=oa(t)%60;return e+Ut(r,"0",2)+Ut(u,"0",2)}function te(n,t,e){oc.lastIndex=0;var r=oc.exec(t.substring(e,e+1));return r?e+r[0].length:-1}function ee(n){for(var t=n.length,e=-1;++e<t;)n[e][0]=this(n[e][0]);return function(t){for(var e=0,r=n[e];!r[1](t);)r=n[++e];return r[0](t)}}function re(){}function ue(n,t,e){var r=e.s=n+t,u=r-n,i=r-u;e.t=n-i+(t-u)}function ie(n,t){n&&lc.hasOwnProperty(n.type)&&lc[n.type](n,t)}function oe(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1],r[2]);t.lineEnd()}function ae(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)oe(n[e],t,1);t.polygonEnd()}function ce(){function n(n,t){n*=Na,t=t*Na/2+Sa/4;var e=n-r,o=Math.cos(t),a=Math.sin(t),c=i*a,s=u*o+c*Math.cos(e),l=c*Math.sin(e);hc.add(Math.atan2(l,s)),r=n,u=o,i=a}var t,e,r,u,i;gc.point=function(o,a){gc.point=n,r=(t=o)*Na,u=Math.cos(a=(e=a)*Na/2+Sa/4),i=Math.sin(a)},gc.lineEnd=function(){n(t,e)}}function se(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function le(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function fe(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function he(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function ge(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function pe(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function ve(n){return[Math.atan2(n[1],n[0]),X(n[2])]}function de(n,t){return oa(n[0]-t[0])<Aa&&oa(n[1]-t[1])<Aa}function me(n,t){n*=Na;var e=Math.cos(t*=Na);ye(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function ye(n,t,e){++pc,dc+=(n-dc)/pc,mc+=(t-mc)/pc,yc+=(e-yc)/pc}function xe(){function n(n,u){n*=Na;var i=Math.cos(u*=Na),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),s=Math.atan2(Math.sqrt((s=e*c-r*a)*s+(s=r*o-t*c)*s+(s=t*a-e*o)*s),t*o+e*a+r*c);vc+=s,xc+=s*(t+(t=o)),Mc+=s*(e+(e=a)),_c+=s*(r+(r=c)),ye(t,e,r)}var t,e,r;kc.point=function(u,i){u*=Na;var o=Math.cos(i*=Na);t=o*Math.cos(u),e=o*Math.sin(u),r=Math.sin(i),kc.point=n,ye(t,e,r)}}function Me(){kc.point=me}function _e(){function n(n,t){n*=Na;var e=Math.cos(t*=Na),o=e*Math.cos(n),a=e*Math.sin(n),c=Math.sin(t),s=u*c-i*a,l=i*o-r*c,f=r*a-u*o,h=Math.sqrt(s*s+l*l+f*f),g=r*o+u*a+i*c,p=h&&-V(g)/h,v=Math.atan2(h,g);bc+=p*s,wc+=p*l,Sc+=p*f,vc+=v,xc+=v*(r+(r=o)),Mc+=v*(u+(u=a)),_c+=v*(i+(i=c)),ye(r,u,i)}var t,e,r,u,i;kc.point=function(o,a){t=o,e=a,kc.point=n,o*=Na;var c=Math.cos(a*=Na);r=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),ye(r,u,i)},kc.lineEnd=function(){n(t,e),kc.lineEnd=Me,kc.point=me}}function be(){return!0}function we(n,t,e,r,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(de(e,r)){u.lineStart();for(var a=0;t>a;++a)u.point((e=n[a])[0],e[1]);return u.lineEnd(),void 0}var c=new ke(e,n,null,!0),s=new ke(e,null,c,!1);c.o=s,i.push(c),o.push(s),c=new ke(r,n,null,!1),s=new ke(r,null,c,!0),c.o=s,i.push(c),o.push(s)}}),o.sort(t),Se(i),Se(o),i.length){for(var a=0,c=e,s=o.length;s>a;++a)o[a].e=c=!c;for(var l,f,h=i[0];;){for(var g=h,p=!0;g.v;)if((g=g.n)===h)return;l=g.z,u.lineStart();do{if(g.v=g.o.v=!0,g.e){if(p)for(var a=0,s=l.length;s>a;++a)u.point((f=l[a])[0],f[1]);else r(g.x,g.n.x,1,u);g=g.n}else{if(p){l=g.p.z;for(var a=l.length-1;a>=0;--a)u.point((f=l[a])[0],f[1])}else r(g.x,g.p.x,-1,u);g=g.p}g=g.o,l=g.z,p=!p}while(!g.v);u.lineEnd()}}}function Se(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.n=e=n[r],e.p=u,u=e;u.n=e=n[0],e.p=u}}function ke(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Ee(n,t,e,r){return function(u,i){function o(t,e){var r=u(t,e);n(t=r[0],e=r[1])&&i.point(t,e)}function a(n,t){var e=u(n,t);d.point(e[0],e[1])}function c(){y.point=a,d.lineStart()}function s(){y.point=o,d.lineEnd()}function l(n,t){v.push([n,t]);var e=u(n,t);M.point(e[0],e[1])}function f(){M.lineStart(),v=[]}function h(){l(v[0][0],v[0][1]),M.lineEnd();var n,t=M.clean(),e=x.buffer(),r=e.length;if(v.pop(),p.push(v),v=null,r){if(1&t){n=e[0];var u,r=n.length-1,o=-1;for(i.lineStart();++o<r;)i.point((u=n[o])[0],u[1]);return i.lineEnd(),void 0}r>1&&2&t&&e.push(e.pop().concat(e.shift())),g.push(e.filter(Ae))}}var g,p,v,d=t(i),m=u.invert(r[0],r[1]),y={point:o,lineStart:c,lineEnd:s,polygonStart:function(){y.point=l,y.lineStart=f,y.lineEnd=h,g=[],p=[],i.polygonStart()},polygonEnd:function(){y.point=o,y.lineStart=c,y.lineEnd=s,g=Xo.merge(g);var n=Le(m,p);g.length?we(g,Ne,n,e,i):n&&(i.lineStart(),e(null,null,1,i),i.lineEnd()),i.polygonEnd(),g=p=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}},x=Ce(),M=t(x);return y}}function Ae(n){return n.length>1}function Ce(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:g,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ne(n,t){return((n=n.x)[0]<0?n[1]-Ea-Aa:Ea-n[1])-((t=t.x)[0]<0?t[1]-Ea-Aa:Ea-t[1])}function Le(n,t){var e=n[0],r=n[1],u=[Math.sin(e),-Math.cos(e),0],i=0,o=0;hc.reset();for(var a=0,c=t.length;c>a;++a){var s=t[a],l=s.length;if(l)for(var f=s[0],h=f[0],g=f[1]/2+Sa/4,p=Math.sin(g),v=Math.cos(g),d=1;;){d===l&&(d=0),n=s[d];var m=n[0],y=n[1]/2+Sa/4,x=Math.sin(y),M=Math.cos(y),_=m-h,b=oa(_)>Sa,w=p*x;if(hc.add(Math.atan2(w*Math.sin(_),v*M+w*Math.cos(_))),i+=b?_+(_>=0?ka:-ka):_,b^h>=e^m>=e){var S=fe(se(f),se(n));pe(S);var k=fe(u,S);pe(k);var E=(b^_>=0?-1:1)*X(k[2]);(r>E||r===E&&(S[0]||S[1]))&&(o+=b^_>=0?1:-1)}if(!d++)break;h=m,p=x,v=M,f=n}}return(-Aa>i||Aa>i&&0>hc)^1&o}function ze(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?Sa:-Sa,c=oa(i-e);oa(c-Sa)<Aa?(n.point(e,r=(r+o)/2>0?Ea:-Ea),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(i,r),t=0):u!==a&&c>=Sa&&(oa(e-u)<Aa&&(e-=u*Aa),oa(i-a)<Aa&&(i-=a*Aa),r=qe(e,r,i,o),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=i,r=o),u=a},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function qe(n,t,e,r){var u,i,o=Math.sin(n-e);return oa(o)>Aa?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+r)/2}function Te(n,t,e,r){var u;if(null==n)u=e*Ea,r.point(-Sa,u),r.point(0,u),r.point(Sa,u),r.point(Sa,0),r.point(Sa,-u),r.point(0,-u),r.point(-Sa,-u),r.point(-Sa,0),r.point(-Sa,u);else if(oa(n[0]-t[0])>Aa){var i=n[0]<t[0]?Sa:-Sa;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function Re(n){function t(n,t){return Math.cos(n)*Math.cos(t)>i}function e(n){var e,i,c,s,l;return{lineStart:function(){s=c=!1,l=1},point:function(f,h){var g,p=[f,h],v=t(f,h),d=o?v?0:u(f,h):v?u(f+(0>f?Sa:-Sa),h):0;if(!e&&(s=c=v)&&n.lineStart(),v!==c&&(g=r(e,p),(de(e,g)||de(p,g))&&(p[0]+=Aa,p[1]+=Aa,v=t(p[0],p[1]))),v!==c)l=0,v?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(a&&e&&o^v){var m;d&i||!(m=r(p,e,!0))||(l=0,o?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!v||e&&de(e,p)||n.point(p[0],p[1]),e=p,c=v,i=d},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return l|(s&&c)<<1}}}function r(n,t,e){var r=se(n),u=se(t),o=[1,0,0],a=fe(r,u),c=le(a,a),s=a[0],l=c-s*s;if(!l)return!e&&n;var f=i*c/l,h=-i*s/l,g=fe(o,a),p=ge(o,f),v=ge(a,h);he(p,v);var d=g,m=le(p,d),y=le(d,d),x=m*m-y*(le(p,p)-1);if(!(0>x)){var M=Math.sqrt(x),_=ge(d,(-m-M)/y);if(he(_,p),_=ve(_),!e)return _;var b,w=n[0],S=t[0],k=n[1],E=t[1];w>S&&(b=w,w=S,S=b);var A=S-w,C=oa(A-Sa)<Aa,N=C||Aa>A;if(!C&&k>E&&(b=k,k=E,E=b),N?C?k+E>0^_[1]<(oa(_[0]-w)<Aa?k:E):k<=_[1]&&_[1]<=E:A>Sa^(w<=_[0]&&_[0]<=S)){var L=ge(d,(-m+M)/y);return he(L,p),[_,ve(L)]}}}function u(t,e){var r=o?n:Sa-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}var i=Math.cos(n),o=i>0,a=oa(i)>Aa,c=cr(n,6*Na);return Ee(t,e,c,o?[0,-n]:[-Sa,n-Sa])}function De(n,t,e,r){return function(u){var i,o=u.a,a=u.b,c=o.x,s=o.y,l=a.x,f=a.y,h=0,g=1,p=l-c,v=f-s;if(i=n-c,p||!(i>0)){if(i/=p,0>p){if(h>i)return;g>i&&(g=i)}else if(p>0){if(i>g)return;i>h&&(h=i)}if(i=e-c,p||!(0>i)){if(i/=p,0>p){if(i>g)return;i>h&&(h=i)}else if(p>0){if(h>i)return;g>i&&(g=i)}if(i=t-s,v||!(i>0)){if(i/=v,0>v){if(h>i)return;g>i&&(g=i)}else if(v>0){if(i>g)return;i>h&&(h=i)}if(i=r-s,v||!(0>i)){if(i/=v,0>v){if(i>g)return;i>h&&(h=i)}else if(v>0){if(h>i)return;g>i&&(g=i)}return h>0&&(u.a={x:c+h*p,y:s+h*v}),1>g&&(u.b={x:c+g*p,y:s+g*v}),u}}}}}}function Pe(n,t,e,r){function u(r,u){return oa(r[0]-n)<Aa?u>0?0:3:oa(r[0]-e)<Aa?u>0?2:1:oa(r[1]-t)<Aa?u>0?1:0:u>0?3:2}function i(n,t){return o(n.x,t.x)}function o(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function c(n){for(var t=0,e=d.length,r=n[1],u=0;e>u;++u)for(var i,o=1,a=d[u],c=a.length,s=a[0];c>o;++o)i=a[o],s[1]<=r?i[1]>r&&Z(s,i,n)>0&&++t:i[1]<=r&&Z(s,i,n)<0&&--t,s=i;return 0!==t}function s(i,a,c,s){var l=0,f=0;if(null==i||(l=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do s.point(0===l||3===l?n:e,l>1?r:t);while((l=(l+c+4)%4)!==f)}else s.point(a[0],a[1])}function l(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function f(n,t){l(n,t)&&a.point(n,t)}function h(){N.point=p,d&&d.push(m=[]),S=!0,w=!1,_=b=0/0}function g(){v&&(p(y,x),M&&w&&A.rejoin(),v.push(A.buffer())),N.point=f,w&&a.lineEnd()}function p(n,t){n=Math.max(-Ac,Math.min(Ac,n)),t=Math.max(-Ac,Math.min(Ac,t));var e=l(n,t);if(d&&m.push([n,t]),S)y=n,x=t,M=e,S=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&w)a.point(n,t);else{var r={a:{x:_,y:b},b:{x:n,y:t}};C(r)?(w||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),k=!1):e&&(a.lineStart(),a.point(n,t),k=!1)}_=n,b=t,w=e}var v,d,m,y,x,M,_,b,w,S,k,E=a,A=Ce(),C=De(n,t,e,r),N={point:f,lineStart:h,lineEnd:g,polygonStart:function(){a=A,v=[],d=[],k=!0},polygonEnd:function(){a=E,v=Xo.merge(v);var t=c([n,r]),e=k&&t,u=v.length;(e||u)&&(a.polygonStart(),e&&(a.lineStart(),s(null,null,1,a),a.lineEnd()),u&&we(v,i,t,s,a),a.polygonEnd()),v=d=m=null}};return N}}function Ue(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function je(n){var t=0,e=Sa/3,r=nr(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*Sa/180,e=n[1]*Sa/180):[180*(t/Sa),180*(e/Sa)]},u}function He(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),o-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),o=Math.sqrt(i)/u;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/u,X((i-(n*n+e*e)*u*u)/(2*u))]},e}function Fe(){function n(n,t){Nc+=u*n-r*t,r=n,u=t}var t,e,r,u;Rc.point=function(i,o){Rc.point=n,t=r=i,e=u=o},Rc.lineEnd=function(){n(t,e)}}function Oe(n,t){Lc>n&&(Lc=n),n>qc&&(qc=n),zc>t&&(zc=t),t>Tc&&(Tc=t)}function Ye(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function u(){o.push("Z")}var i=Ie(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return i=Ie(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Ie(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Ze(n,t){dc+=n,mc+=t,++yc}function Ve(){function n(n,r){var u=n-t,i=r-e,o=Math.sqrt(u*u+i*i);xc+=o*(t+n)/2,Mc+=o*(e+r)/2,_c+=o,Ze(t=n,e=r)}var t,e;Pc.point=function(r,u){Pc.point=n,Ze(t=r,e=u)}}function Xe(){Pc.point=Ze}function $e(){function n(n,t){var e=n-r,i=t-u,o=Math.sqrt(e*e+i*i);xc+=o*(r+n)/2,Mc+=o*(u+t)/2,_c+=o,o=u*n-r*t,bc+=o*(r+n),wc+=o*(u+t),Sc+=3*o,Ze(r=n,u=t)}var t,e,r,u;Pc.point=function(i,o){Pc.point=n,Ze(t=r=i,e=u=o)},Pc.lineEnd=function(){n(t,e)}}function Be(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,o,0,ka)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:g};return a}function We(n){function t(n){return(a?r:e)(n)}function e(t){return Ke(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){x=0/0,S.point=i,t.lineStart()}function i(e,r){var i=se([e,r]),o=n(e,r);u(x,M,y,_,b,w,x=o[0],M=o[1],y=e,_=i[0],b=i[1],w=i[2],a,t),t.point(x,M)}function o(){S.point=e,t.lineEnd()}function c(){r(),S.point=s,S.lineEnd=l}function s(n,t){i(f=n,h=t),g=x,p=M,v=_,d=b,m=w,S.point=i}function l(){u(x,M,y,_,b,w,g,p,f,v,d,m,a,t),S.lineEnd=o,o()}var f,h,g,p,v,d,m,y,x,M,_,b,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function u(t,e,r,a,c,s,l,f,h,g,p,v,d,m){var y=l-t,x=f-e,M=y*y+x*x;if(M>4*i&&d--){var _=a+g,b=c+p,w=s+v,S=Math.sqrt(_*_+b*b+w*w),k=Math.asin(w/=S),E=oa(oa(w)-1)<Aa||oa(r-h)<Aa?(r+h)/2:Math.atan2(b,_),A=n(E,k),C=A[0],N=A[1],L=C-t,z=N-e,q=x*L-y*z;(q*q/M>i||oa((y*L+x*z)/M-.5)>.3||o>a*g+c*p+s*v)&&(u(t,e,r,a,c,s,C,N,E,_/=S,b/=S,w,d,m),m.point(C,N),u(C,N,E,_,b,w,l,f,h,g,p,v,d,m))}}var i=.5,o=Math.cos(30*Na),a=16;return t.precision=function(n){return arguments.length?(a=(i=n*n)>0&&16,t):Math.sqrt(i)},t}function Je(n){var t=We(function(t,e){return n([t*La,e*La])});return function(n){return tr(t(n))}}function Ge(n){this.stream=n}function Ke(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function Qe(n){return nr(function(){return n})()}function nr(n){function t(n){return n=a(n[0]*Na,n[1]*Na),[n[0]*h+c,s-n[1]*h]}function e(n){return n=a.invert((n[0]-c)/h,(s-n[1])/h),n&&[n[0]*La,n[1]*La]}function r(){a=Ue(o=ur(m,y,x),i);var n=i(v,d);return c=g-n[0]*h,s=p+n[1]*h,u()}function u(){return l&&(l.valid=!1,l=null),t}var i,o,a,c,s,l,f=We(function(n,t){return n=i(n,t),[n[0]*h+c,s-n[1]*h]}),h=150,g=480,p=250,v=0,d=0,m=0,y=0,x=0,M=Ec,_=bt,b=null,w=null;return t.stream=function(n){return l&&(l.valid=!1),l=tr(M(o,f(_(n)))),l.valid=!0,l},t.clipAngle=function(n){return arguments.length?(M=null==n?(b=n,Ec):Re((b=+n)*Na),u()):b
},t.clipExtent=function(n){return arguments.length?(w=n,_=n?Pe(n[0][0],n[0][1],n[1][0],n[1][1]):bt,u()):w},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],r()):[g,p]},t.center=function(n){return arguments.length?(v=n[0]%360*Na,d=n[1]%360*Na,r()):[v*La,d*La]},t.rotate=function(n){return arguments.length?(m=n[0]%360*Na,y=n[1]%360*Na,x=n.length>2?n[2]%360*Na:0,r()):[m*La,y*La,x*La]},Xo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function tr(n){return Ke(n,function(t,e){n.point(t*Na,e*Na)})}function er(n,t){return[n,t]}function rr(n,t){return[n>Sa?n-ka:-Sa>n?n+ka:n,t]}function ur(n,t,e){return n?t||e?Ue(or(n),ar(t,e)):or(n):t||e?ar(t,e):rr}function ir(n){return function(t,e){return t+=n,[t>Sa?t-ka:-Sa>t?t+ka:t,e]}}function or(n){var t=ir(n);return t.invert=ir(-n),t}function ar(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*r+a*u;return[Math.atan2(c*i-l*o,a*r-s*u),X(l*i+c*o)]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,s=Math.sin(t),l=s*i-c*o;return[Math.atan2(c*i+s*o,a*r+l*u),X(l*r-a*u)]},e}function cr(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=sr(e,u),i=sr(e,i),(o>0?i>u:u>i)&&(u+=o*ka)):(u=n+o*ka,i=n-.5*c);for(var s,l=u;o>0?l>i:i>l;l-=c)a.point((s=ve([e,-r*Math.cos(l),-r*Math.sin(l)]))[0],s[1])}}function sr(n,t){var e=se(t);e[0]-=n,pe(e);var r=V(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Aa)%(2*Math.PI)}function lr(n,t,e){var r=Xo.range(n,t-Aa,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function fr(n,t,e){var r=Xo.range(n,t-Aa,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function hr(n){return n.source}function gr(n){return n.target}function pr(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(r),a=Math.sin(r),c=u*Math.cos(n),s=u*Math.sin(n),l=o*Math.cos(e),f=o*Math.sin(e),h=2*Math.asin(Math.sqrt(J(r-t)+u*o*J(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*l,u=e*s+t*f,o=e*i+t*a;return[Math.atan2(u,r)*La,Math.atan2(o,Math.sqrt(r*r+u*u))*La]}:function(){return[n*La,t*La]};return p.distance=h,p}function vr(){function n(n,u){var i=Math.sin(u*=Na),o=Math.cos(u),a=oa((n*=Na)-t),c=Math.cos(a);Uc+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*i-e*o*c)*a),e*i+r*o*c),t=n,e=i,r=o}var t,e,r;jc.point=function(u,i){t=u*Na,e=Math.sin(i*=Na),r=Math.cos(i),jc.point=n},jc.lineEnd=function(){jc.point=jc.lineEnd=g}}function dr(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,r*o),Math.asin(r&&e*i/r)]},e}function mr(n,t){function e(n,t){var e=oa(oa(t)-Ea)<Aa?0:o/Math.pow(u(t),i);return[e*Math.sin(i*n),o-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(Sa/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),o=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=o-t,r=I(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(o/r,1/i))-Ea]},e):xr}function yr(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return oa(u)<Aa?er:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-I(u)*Math.sqrt(n*n+e*e)]},e)}function xr(n,t){return[n,Math.log(Math.tan(Sa/4+t/2))]}function Mr(n){var t,e=Qe(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=i.apply(e,arguments);if(o===e){if(t=null==n){var a=Sa*r(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function _r(n,t){return[Math.log(Math.tan(Sa/4+t/2)),-n]}function br(n){return n[0]}function wr(n){return n[1]}function Sr(n){for(var t=n.length,e=[0,1],r=2,u=2;t>u;u++){for(;r>1&&Z(n[e[r-2]],n[e[r-1]],n[u])<=0;)--r;e[r++]=u}return e.slice(0,r)}function kr(n,t){return n[0]-t[0]||n[1]-t[1]}function Er(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function Ar(n,t,e,r){var u=n[0],i=e[0],o=t[0]-u,a=r[0]-i,c=n[1],s=e[1],l=t[1]-c,f=r[1]-s,h=(a*(c-s)-f*(u-i))/(f*o-a*l);return[u+h*o,c+h*l]}function Cr(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Nr(){Jr(this),this.edge=this.site=this.circle=null}function Lr(n){var t=Jc.pop()||new Nr;return t.site=n,t}function zr(n){Or(n),$c.remove(n),Jc.push(n),Jr(n)}function qr(n){var t=n.circle,e=t.x,r=t.cy,u={x:e,y:r},i=n.P,o=n.N,a=[n];zr(n);for(var c=i;c.circle&&oa(e-c.circle.x)<Aa&&oa(r-c.circle.cy)<Aa;)i=c.P,a.unshift(c),zr(c),c=i;a.unshift(c),Or(c);for(var s=o;s.circle&&oa(e-s.circle.x)<Aa&&oa(r-s.circle.cy)<Aa;)o=s.N,a.push(s),zr(s),s=o;a.push(s),Or(s);var l,f=a.length;for(l=1;f>l;++l)s=a[l],c=a[l-1],$r(s.edge,c.site,s.site,u);c=a[0],s=a[f-1],s.edge=Vr(c.site,s.site,null,u),Fr(c),Fr(s)}function Tr(n){for(var t,e,r,u,i=n.x,o=n.y,a=$c._;a;)if(r=Rr(a,o)-i,r>Aa)a=a.L;else{if(u=i-Dr(a,o),!(u>Aa)){r>-Aa?(t=a.P,e=a):u>-Aa?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var c=Lr(n);if($c.insert(t,c),t||e){if(t===e)return Or(t),e=Lr(t.site),$c.insert(c,e),c.edge=e.edge=Vr(t.site,c.site),Fr(t),Fr(e),void 0;if(!e)return c.edge=Vr(t.site,c.site),void 0;Or(t),Or(e);var s=t.site,l=s.x,f=s.y,h=n.x-l,g=n.y-f,p=e.site,v=p.x-l,d=p.y-f,m=2*(h*d-g*v),y=h*h+g*g,x=v*v+d*d,M={x:(d*y-g*x)/m+l,y:(h*x-v*y)/m+f};$r(e.edge,s,p,M),c.edge=Vr(s,n,null,M),e.edge=Vr(n,p,null,M),Fr(t),Fr(e)}}function Rr(n,t){var e=n.site,r=e.x,u=e.y,i=u-t;if(!i)return r;var o=n.P;if(!o)return-1/0;e=o.site;var a=e.x,c=e.y,s=c-t;if(!s)return a;var l=a-r,f=1/i-1/s,h=l/s;return f?(-h+Math.sqrt(h*h-2*f*(l*l/(-2*s)-c+s/2+u-i/2)))/f+r:(r+a)/2}function Dr(n,t){var e=n.N;if(e)return Rr(e,t);var r=n.site;return r.y===t?r.x:1/0}function Pr(n){this.site=n,this.edges=[]}function Ur(n){for(var t,e,r,u,i,o,a,c,s,l,f=n[0][0],h=n[1][0],g=n[0][1],p=n[1][1],v=Xc,d=v.length;d--;)if(i=v[d],i&&i.prepare())for(a=i.edges,c=a.length,o=0;c>o;)l=a[o].end(),r=l.x,u=l.y,s=a[++o%c].start(),t=s.x,e=s.y,(oa(r-t)>Aa||oa(u-e)>Aa)&&(a.splice(o,0,new Br(Xr(i.site,l,oa(r-f)<Aa&&p-u>Aa?{x:f,y:oa(t-f)<Aa?e:p}:oa(u-p)<Aa&&h-r>Aa?{x:oa(e-p)<Aa?t:h,y:p}:oa(r-h)<Aa&&u-g>Aa?{x:h,y:oa(t-h)<Aa?e:g}:oa(u-g)<Aa&&r-f>Aa?{x:oa(e-g)<Aa?t:f,y:g}:null),i.site,null)),++c)}function jr(n,t){return t.angle-n.angle}function Hr(){Jr(this),this.x=this.y=this.arc=this.site=this.cy=null}function Fr(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,u=n.site,i=e.site;if(r!==i){var o=u.x,a=u.y,c=r.x-o,s=r.y-a,l=i.x-o,f=i.y-a,h=2*(c*f-s*l);if(!(h>=-Ca)){var g=c*c+s*s,p=l*l+f*f,v=(f*g-s*p)/h,d=(c*p-l*g)/h,f=d+a,m=Gc.pop()||new Hr;m.arc=n,m.site=u,m.x=v+o,m.y=f+Math.sqrt(v*v+d*d),m.cy=f,n.circle=m;for(var y=null,x=Wc._;x;)if(m.y<x.y||m.y===x.y&&m.x<=x.x){if(!x.L){y=x.P;break}x=x.L}else{if(!x.R){y=x;break}x=x.R}Wc.insert(y,m),y||(Bc=m)}}}}function Or(n){var t=n.circle;t&&(t.P||(Bc=t.N),Wc.remove(t),Gc.push(t),Jr(t),n.circle=null)}function Yr(n){for(var t,e=Vc,r=De(n[0][0],n[0][1],n[1][0],n[1][1]),u=e.length;u--;)t=e[u],(!Ir(t,n)||!r(t)||oa(t.a.x-t.b.x)<Aa&&oa(t.a.y-t.b.y)<Aa)&&(t.a=t.b=null,e.splice(u,1))}function Ir(n,t){var e=n.b;if(e)return!0;var r,u,i=n.a,o=t[0][0],a=t[1][0],c=t[0][1],s=t[1][1],l=n.l,f=n.r,h=l.x,g=l.y,p=f.x,v=f.y,d=(h+p)/2,m=(g+v)/2;if(v===g){if(o>d||d>=a)return;if(h>p){if(i){if(i.y>=s)return}else i={x:d,y:c};e={x:d,y:s}}else{if(i){if(i.y<c)return}else i={x:d,y:s};e={x:d,y:c}}}else if(r=(h-p)/(v-g),u=m-r*d,-1>r||r>1)if(h>p){if(i){if(i.y>=s)return}else i={x:(c-u)/r,y:c};e={x:(s-u)/r,y:s}}else{if(i){if(i.y<c)return}else i={x:(s-u)/r,y:s};e={x:(c-u)/r,y:c}}else if(v>g){if(i){if(i.x>=a)return}else i={x:o,y:r*o+u};e={x:a,y:r*a+u}}else{if(i){if(i.x<o)return}else i={x:a,y:r*a+u};e={x:o,y:r*o+u}}return n.a=i,n.b=e,!0}function Zr(n,t){this.l=n,this.r=t,this.a=this.b=null}function Vr(n,t,e,r){var u=new Zr(n,t);return Vc.push(u),e&&$r(u,n,t,e),r&&$r(u,t,n,r),Xc[n.i].edges.push(new Br(u,n,t)),Xc[t.i].edges.push(new Br(u,t,n)),u}function Xr(n,t,e){var r=new Zr(n,null);return r.a=t,r.b=e,Vc.push(r),r}function $r(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function Br(n,t,e){var r=n.a,u=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(u.x-r.x,r.y-u.y):Math.atan2(r.x-u.x,u.y-r.y)}function Wr(){this._=null}function Jr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function Gr(n,t){var e=t,r=t.R,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function Kr(n,t){var e=t,r=t.L,u=e.U;u?u.L===e?u.L=r:u.R=r:n._=r,r.U=u,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function Qr(n){for(;n.L;)n=n.L;return n}function nu(n,t){var e,r,u,i=n.sort(tu).pop();for(Vc=[],Xc=new Array(n.length),$c=new Wr,Wc=new Wr;;)if(u=Bc,i&&(!u||i.y<u.y||i.y===u.y&&i.x<u.x))(i.x!==e||i.y!==r)&&(Xc[i.i]=new Pr(i),Tr(i),e=i.x,r=i.y),i=n.pop();else{if(!u)break;qr(u.arc)}t&&(Yr(t),Ur(t));var o={cells:Xc,edges:Vc};return $c=Wc=Vc=Xc=null,o}function tu(n,t){return t.y-n.y||t.x-n.x}function eu(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function ru(n){return n.x}function uu(n){return n.y}function iu(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function ou(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var o=.5*(e+u),a=.5*(r+i),c=t.nodes;c[0]&&ou(n,c[0],e,r,o,a),c[1]&&ou(n,c[1],o,r,u,a),c[2]&&ou(n,c[2],e,a,o,i),c[3]&&ou(n,c[3],o,a,u,i)}}function au(n,t){n=Xo.rgb(n),t=Xo.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,o=t.g-r,a=t.b-u;return function(n){return"#"+vt(Math.round(e+i*n))+vt(Math.round(r+o*n))+vt(Math.round(u+a*n))}}function cu(n,t){var e,r={},u={};for(e in n)e in t?r[e]=fu(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function su(n,t){return t-=n=+n,function(e){return n+t*e}}function lu(n,t){var e,r,u,i,o,a=0,c=0,s=[],l=[];for(n+="",t+="",Qc.lastIndex=0,r=0;e=Qc.exec(t);++r)e.index&&s.push(t.substring(a,c=e.index)),l.push({i:s.length,x:e[0]}),s.push(null),a=Qc.lastIndex;for(a<t.length&&s.push(t.substring(a)),r=0,i=l.length;(e=Qc.exec(n))&&i>r;++r)if(o=l[r],o.x==e[0]){if(o.i)if(null==s[o.i+1])for(s[o.i-1]+=o.x,s.splice(o.i,1),u=r+1;i>u;++u)l[u].i--;else for(s[o.i-1]+=o.x+s[o.i+1],s.splice(o.i,2),u=r+1;i>u;++u)l[u].i-=2;else if(null==s[o.i+1])s[o.i]=o.x;else for(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1),u=r+1;i>u;++u)l[u].i--;l.splice(r,1),i--,r--}else o.x=su(parseFloat(e[0]),parseFloat(o.x));for(;i>r;)o=l.pop(),null==s[o.i+1]?s[o.i]=o.x:(s[o.i]=o.x+s[o.i+1],s.splice(o.i+1,1)),i--;return 1===s.length?null==s[0]?(o=l[0].x,function(n){return o(n)+""}):function(){return t}:function(n){for(r=0;i>r;++r)s[(o=l[r]).i]=o.x(n);return s.join("")}}function fu(n,t){for(var e,r=Xo.interpolators.length;--r>=0&&!(e=Xo.interpolators[r](n,t)););return e}function hu(n,t){var e,r=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(fu(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;o>e;++e)u[e]=t[e];return function(n){for(e=0;a>e;++e)u[e]=r[e](n);return u}}function gu(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function pu(n){return function(t){return 1-n(1-t)}}function vu(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function du(n){return n*n}function mu(n){return n*n*n}function yu(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function xu(n){return function(t){return Math.pow(t,n)}}function Mu(n){return 1-Math.cos(n*Ea)}function _u(n){return Math.pow(2,10*(n-1))}function bu(n){return 1-Math.sqrt(1-n*n)}function wu(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/ka*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*ka/t)}}function Su(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function ku(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Eu(n,t){n=Xo.hcl(n),t=Xo.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,o=t.c-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return rt(e+i*n,r+o*n,u+a*n)+""}}function Au(n,t){n=Xo.hsl(n),t=Xo.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,o=t.s-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return nt(e+i*n,r+o*n,u+a*n)+""}}function Cu(n,t){n=Xo.lab(n),t=Xo.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,o=t.a-r,a=t.b-u;return function(n){return ot(e+i*n,r+o*n,u+a*n)+""}}function Nu(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Lu(n){var t=[n.a,n.b],e=[n.c,n.d],r=qu(t),u=zu(t,e),i=qu(Tu(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*La,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*La:0}function zu(n,t){return n[0]*t[0]+n[1]*t[1]}function qu(n){var t=Math.sqrt(zu(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Tu(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Ru(n,t){var e,r=[],u=[],i=Xo.transform(n),o=Xo.transform(t),a=i.translate,c=o.translate,s=i.rotate,l=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:su(a[0],c[0])},{i:3,x:su(a[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),s!=l?(s-l>180?l+=360:l-s>180&&(s+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:su(s,l)})):l&&r.push(r.pop()+"rotate("+l+")"),f!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:su(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:su(g[0],p[0])},{i:e-2,x:su(g[1],p[1])})):(1!=p[0]||1!=p[1])&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function Du(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Pu(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Uu(n){for(var t=n.source,e=n.target,r=Hu(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function ju(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Hu(n,t){if(n===t)return n;for(var e=ju(n),r=ju(t),u=e.pop(),i=r.pop(),o=null;u===i;)o=u,u=e.pop(),i=r.pop();return o}function Fu(n){n.fixed|=2}function Ou(n){n.fixed&=-7}function Yu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function Iu(n){n.fixed&=-5}function Zu(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(Zu(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var s=t*e[n.point.index];n.charge+=n.pointCharge=s,r+=s*n.point.x,u+=s*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function Vu(n,t){return Xo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=Wu,n}function Xu(n){return n.children}function $u(n){return n.value}function Bu(n,t){return t.value-n.value}function Wu(n){return Xo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function Ju(n){return n.x}function Gu(n){return n.y}function Ku(n,t,e){n.y0=t,n.y=e}function Qu(n){return Xo.range(n.length)}function ni(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function ti(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function ei(n){return n.reduce(ri,0)}function ri(n,t){return n+t[1]}function ui(n,t){return ii(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function ii(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function oi(n){return[Xo.min(n),Xo.max(n)]}function ai(n,t){return n.parent==t.parent?1:2}function ci(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function si(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function li(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=li(e[i],t),n)>0&&(n=r);return n}function fi(n,t){return n.x-t.x}function hi(n,t){return t.x-n.x}function gi(n,t){return n.depth-t.depth}function pi(n,t){function e(n,r){var u=n.children;if(u&&(o=u.length))for(var i,o,a=null,c=-1;++c<o;)i=u[c],e(i,a),a=i;t(n,r)}e(n,null)}function vi(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function di(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function mi(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function yi(n,t){return n.value-t.value}function xi(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Mi(n,t){n._pack_next=t,t._pack_prev=n}function _i(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return.999*u*u>e*e+r*r}function bi(n){function t(n){l=Math.min(n.x-n.r,l),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(s=e.length)){var e,r,u,i,o,a,c,s,l=1/0,f=-1/0,h=1/0,g=-1/0;if(e.forEach(wi),r=e[0],r.x=-r.r,r.y=0,t(r),s>1&&(u=e[1],u.x=u.r,u.y=0,t(u),s>2))for(i=e[2],Ei(r,u,i),t(i),xi(r,i),r._pack_prev=i,xi(i,u),u=r._pack_next,o=3;s>o;o++){Ei(r,u,i=e[o]);var p=0,v=1,d=1;for(a=u._pack_next;a!==u;a=a._pack_next,v++)if(_i(a,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==a._pack_prev&&!_i(c,i);c=c._pack_prev,d++);p?(d>v||v==d&&u.r<r.r?Mi(r,u=a):Mi(r=c,u),o--):(xi(r,i),u=i,t(i))}var m=(l+f)/2,y=(h+g)/2,x=0;for(o=0;s>o;o++)i=e[o],i.x-=m,i.y-=y,x=Math.max(x,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=x,e.forEach(Si)}}function wi(n){n._pack_next=n._pack_prev=n}function Si(n){delete n._pack_next,delete n._pack_prev}function ki(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,o=u.length;++i<o;)ki(u[i],t,e,r)}function Ei(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var o=t.r+e.r,a=u*u+i*i;o*=o,r*=r;var c=.5+(r-o)/(2*a),s=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+c*u+s*i,e.y=n.y+c*i-s*u}else e.x=n.x+r,e.y=n.y}function Ai(n){return 1+Xo.max(n,function(n){return n.y})}function Ci(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Ni(n){var t=n.children;return t&&t.length?Ni(t[0]):n}function Li(n){var t,e=n.children;return e&&(t=e.length)?Li(e[t-1]):n}function zi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function qi(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function Ti(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Ri(n){return n.rangeExtent?n.rangeExtent():Ti(n.range())}function Di(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function Pi(n,t){var e,r=0,u=n.length-1,i=n[r],o=n[u];return i>o&&(e=r,r=u,u=e,e=i,i=o,o=e),n[r]=t.floor(i),n[u]=t.ceil(o),n}function Ui(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:ls}function ji(n,t,e,r){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(e(n[o-1],n[o])),i.push(r(t[o-1],t[o]));return function(t){var e=Xo.bisect(n,t,1,a)-1;return i[e](u[e](t))}}function Hi(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?ji:Di,c=r?Pu:Du;return o=u(n,t,c,e),a=u(t,n,c,fu),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Nu)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return Ii(n,t)},i.tickFormat=function(t,e){return Zi(n,t,e)},i.nice=function(t){return Oi(n,t),u()},i.copy=function(){return Hi(n,t,e,r)},u()}function Fi(n,t){return Xo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Oi(n,t){return Pi(n,Ui(Yi(n,t)[2]))}function Yi(n,t){null==t&&(t=10);var e=Ti(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function Ii(n,t){return Xo.range.apply(Xo,Yi(n,t))}function Zi(n,t,e){var r=Yi(n,t);return Xo.format(e?e.replace(Qa,function(n,t,e,u,i,o,a,c,s,l){return[t,e,u,i,o,a,c,s||"."+Xi(l,r),l].join("")}):",."+Vi(r[2])+"f")}function Vi(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function Xi(n,t){var e=Vi(t[2]);return n in fs?Math.abs(e-Vi(Math.max(Math.abs(t[0]),Math.abs(t[1]))))+ +("e"!==n):e-2*("%"===n)}function $i(n,t,e,r){function u(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(u)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(u)),o):t},o.nice=function(){var t=Pi(r.map(u),e?Math:gs);return n.domain(t),r=t.map(i),o},o.ticks=function(){var n=Ti(r),o=[],a=n[0],c=n[1],s=Math.floor(u(a)),l=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(l-s)){if(e){for(;l>s;s++)for(var h=1;f>h;h++)o.push(i(s)*h);o.push(i(s))}else for(o.push(i(s));s++<l;)for(var h=f-1;h>0;h--)o.push(i(s)*h);for(s=0;o[s]<a;s++);for(l=o.length;o[l-1]>c;l--);o=o.slice(s,l)}return o},o.tickFormat=function(n,t){if(!arguments.length)return hs;arguments.length<2?t=hs:"function"!=typeof t&&(t=Xo.format(t));var r,a=Math.max(.1,n/o.ticks().length),c=e?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+r))<=a?t(n):""}},o.copy=function(){return $i(n.copy(),t,e,r)},Fi(o,n)}function Bi(n,t,e){function r(t){return n(u(t))}var u=Wi(t),i=Wi(1/t);return r.invert=function(t){return i(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(u)),r):e},r.ticks=function(n){return Ii(e,n)},r.tickFormat=function(n,t){return Zi(e,n,t)},r.nice=function(n){return r.domain(Oi(e,n))},r.exponent=function(o){return arguments.length?(u=Wi(t=o),i=Wi(1/t),n.domain(e.map(u)),r):t},r.copy=function(){return Bi(n.copy(),t,e)},Fi(r,n)}function Wi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function Ji(n,t){function e(e){return o[((i.get(e)||"range"===t.t&&i.set(e,n.push(e)))-1)%o.length]}function r(t,e){return Xo.range(n.length).map(function(n){return t+e*n})}var i,o,a;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var o,a=-1,c=r.length;++a<c;)i.has(o=r[a])||i.set(o,n.push(o));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(o=n,a=0,t={t:"range",a:arguments},e):o},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],s=u[1],l=(s-c)/(Math.max(1,n.length-1)+i);return o=r(n.length<2?(c+s)/2:c+l*i/2,l),a=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=(f-l)/(n.length-i+2*c);return o=r(l+h*c,h),s&&o.reverse(),a=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var s=u[1]<u[0],l=u[s-0],f=u[1-s],h=Math.floor((f-l)/(n.length-i+2*c)),g=f-l-(n.length-i)*h;return o=r(l+Math.round(g/2),h),s&&o.reverse(),a=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return a},e.rangeExtent=function(){return Ti(t.a[0])},e.copy=function(){return Ji(n,t)},e.domain(n)}function Gi(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=Xo.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?void 0:t[Xo.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(Xo.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.invertExtent=function(e){return e=t.indexOf(e),0>e?[0/0,0/0]:[e>0?u[e-1]:n[0],e<u.length?u[e]:n[n.length-1]]},r.copy=function(){return Gi(n,t)},e()}function Ki(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),o=e.length-1,r}var i,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},r.copy=function(){return Ki(n,t,e)},u()}function Qi(n,t){function e(e){return e>=e?t[Xo.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return Qi(n,t)},e}function no(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Ii(n,t)},t.tickFormat=function(t,e){return Zi(n,t,e)},t.copy=function(){return no(n)},t}function to(n){return n.innerRadius}function eo(n){return n.outerRadius}function ro(n){return n.startAngle}function uo(n){return n.endAngle}function io(n){function t(t){function o(){s.push("M",i(n(l),a))}for(var c,s=[],l=[],f=-1,h=t.length,g=_t(e),p=_t(r);++f<h;)u.call(this,c=t[f],f)?l.push([+g.call(this,c,f),+p.call(this,c,f)]):l.length&&(o(),l=[]);return l.length&&o(),s.length?s.join(""):null}var e=br,r=wr,u=be,i=oo,o=i.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=Ms.get(n)||oo).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function oo(n){return n.join("L")}function ao(n){return oo(n)+"Z"}function co(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&u.push("H",r[0]),u.join("")}function so(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function lo(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function fo(n,t){return n.length<4?oo(n):n[1]+po(n.slice(1,n.length-1),vo(n,t))}function ho(n,t){return n.length<3?oo(n):n[0]+po((n.push(n[0]),n),vo([n[n.length-2]].concat(n,[n[1]]),t))}function go(n,t){return n.length<3?oo(n):n[0]+po(n,vo(n,t))}function po(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return oo(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(e&&(r+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,r+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var s=2;s<t.length;s++,c++)i=n[c],a=t[s],r+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(e){var l=n[c];r+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+l[0]+","+l[1]}return r}function vo(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)e=i,i=o,o=n[a],r.push([u*(o[0]-e[0]),u*(o[1]-e[1])]);return r}function mo(n){if(n.length<3)return oo(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],o=[u,u,u,(r=n[1])[0]],a=[i,i,i,r[1]],c=[u,",",i,"L",_o(ws,o),",",_o(ws,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),bo(c,o,a);return n.pop(),c.push("L",r),c.join("")}function yo(n){if(n.length<4)return oo(n);for(var t,e=[],r=-1,u=n.length,i=[0],o=[0];++r<3;)t=n[r],i.push(t[0]),o.push(t[1]);for(e.push(_o(ws,i)+","+_o(ws,o)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),bo(e,i,o);return e.join("")}function xo(n){for(var t,e,r=-1,u=n.length,i=u+4,o=[],a=[];++r<4;)e=n[r%u],o.push(e[0]),a.push(e[1]);for(t=[_o(ws,o),",",_o(ws,a)],--r;++r<i;)e=n[r%u],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),bo(t,o,a);return t.join("")}function Mo(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],o=n[0][1],a=n[e][0]-i,c=n[e][1]-o,s=-1;++s<=e;)r=n[s],u=s/e,r[0]=t*r[0]+(1-t)*(i+u*a),r[1]=t*r[1]+(1-t)*(o+u*c);return mo(n)}function _o(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function bo(n,t,e){n.push("C",_o(_s,t),",",_o(_s,e),",",_o(bs,t),",",_o(bs,e),",",_o(ws,t),",",_o(ws,e))}function wo(n,t){return(t[1]-n[1])/(t[0]-n[0])}function So(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],o=r[0]=wo(u,i);++t<e;)r[t]=(o+(o=wo(u=i,i=n[t+1])))/2;return r[t]=o,r}function ko(n){for(var t,e,r,u,i=[],o=So(n),a=-1,c=n.length-1;++a<c;)t=wo(n[a],n[a+1]),oa(t)<Aa?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*e,o[a+1]=u*r));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function Eo(n){return n.length<3?oo(n):n[0]+po(n,ko(n))}function Ao(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+ys,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Co(n){function t(t){function c(){v.push("M",a(n(m),f),l,s(n(d.reverse()),f),"Z")}for(var h,g,p,v=[],d=[],m=[],y=-1,x=t.length,M=_t(e),_=_t(u),b=e===r?function(){return g}:_t(r),w=u===i?function(){return p}:_t(i);++y<x;)o.call(this,h=t[y],y)?(d.push([g=+M.call(this,h,y),p=+_.call(this,h,y)]),m.push([+b.call(this,h,y),+w.call(this,h,y)])):d.length&&(c(),d=[],m=[]);return d.length&&c(),v.length?v.join(""):null}var e=br,r=br,u=0,i=wr,o=be,a=oo,c=a.key,s=a,l="L",f=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=Ms.get(n)||oo).key,s=a.reverse||a,l=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function No(n){return n.radius}function Lo(n){return[n.x,n.y]}function zo(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+ys;return[e*Math.cos(r),e*Math.sin(r)]}}function qo(){return 64}function To(){return"circle"}function Ro(n){var t=Math.sqrt(n/Sa);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Do(n,t){return fa(n,Ns),n.id=t,n}function Po(n,t,e,r){var u=n.id;return R(n,"function"==typeof e?function(n,i,o){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,o)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function Uo(n){return null==n&&(n=""),function(){this.textContent=n}}function jo(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),o=i[e];if(!o){var a=r.time;o=i[e]={tween:new u,time:a,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,Xo.timer(function(r){function u(r){return i.active>e?s():(i.active=e,o.event&&o.event.start.call(n,l,t),o.tween.forEach(function(e,r){(r=r.call(n,l,t))&&v.push(r)}),Xo.timer(function(){return p.c=c(r||1)?be:c,1},0,a),void 0)}function c(r){if(i.active!==e)return s();for(var u=r/g,a=f(u),c=v.length;c>0;)v[--c].call(n,a);return u>=1?(o.event&&o.event.end.call(n,l,t),s()):void 0}function s(){return--i.count?delete i[e]:delete n.__transition__,1}var l=n.__data__,f=o.ease,h=o.delay,g=o.duration,p=Ja,v=[];return p.t=h+a,r>=h?u(r-h):(p.c=u,void 0)},0,a)}}function Ho(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function Fo(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function Oo(n){return n.toISOString()}function Yo(n,t,e){function r(t){return n(t)}function u(n,e){var r=n[1]-n[0],u=r/e,i=Xo.bisect(js,u);return i==js.length?[t.year,Yi(n.map(function(n){return n/31536e6}),e)[2]]:i?t[u/js[i-1]<js[i]/u?i-1:i]:[Os,Yi(n,e)[2]]
}return r.invert=function(t){return Io(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Io)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,Io(+e+1),t).length}var i=r.domain(),o=Ti(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),r.domain(Pi(i,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=Io(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=Io(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Ti(r.domain()),i=null==n?u(e,10):"number"==typeof n?u(e,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(e[0],Io(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return Yo(n.copy(),t,e)},Fi(r,n)}function Io(n){return new Date(n)}function Zo(n){return JSON.parse(n.responseText)}function Vo(n){var t=Wo.createRange();return t.selectNode(Wo.body),t.createContextualFragment(n.responseText)}var Xo={version:"3.4.1"};Date.now||(Date.now=function(){return+new Date});var $o=[].slice,Bo=function(n){return $o.call(n)},Wo=document,Jo=Wo.documentElement,Go=window;try{Bo(Jo.childNodes)[0].nodeType}catch(Ko){Bo=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}try{Wo.createElement("div").style.setProperty("opacity",0,"")}catch(Qo){var na=Go.Element.prototype,ta=na.setAttribute,ea=na.setAttributeNS,ra=Go.CSSStyleDeclaration.prototype,ua=ra.setProperty;na.setAttribute=function(n,t){ta.call(this,n,t+"")},na.setAttributeNS=function(n,t,e){ea.call(this,n,t,e+"")},ra.setProperty=function(n,t,e){ua.call(this,n,t+"",e)}}Xo.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},Xo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},Xo.min=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&e>r&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&e>r&&(e=r)}return e},Xo.max=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&r>e&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&r>e&&(e=r)}return e},Xo.extent=function(n,t){var e,r,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(e=u=n[i])&&e>=e);)e=u=void 0;for(;++i<o;)null!=(r=n[i])&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<o&&!(null!=(e=u=t.call(n,n[i],i))&&e>=e);)e=void 0;for(;++i<o;)null!=(r=t.call(n,n[i],i))&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},Xo.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},Xo.mean=function(t,e){var r,u=t.length,i=0,o=-1,a=0;if(1===arguments.length)for(;++o<u;)n(r=t[o])&&(i+=(r-i)/++a);else for(;++o<u;)n(r=e.call(t,t[o],o))&&(i+=(r-i)/++a);return a?i:void 0},Xo.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;return i?u+i*(n[r]-u):u},Xo.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?Xo.quantile(t.sort(Xo.ascending),.5):void 0},Xo.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var ia=Xo.bisector(function(n){return n});Xo.bisectLeft=ia.left,Xo.bisect=Xo.bisectRight=ia.right,Xo.shuffle=function(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n},Xo.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},Xo.pairs=function(n){for(var t,e=0,r=n.length-1,u=n[0],i=new Array(0>r?0:r);r>e;)i[e]=[t=u,u=n[++e]];return i},Xo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=Xo.min(arguments,t),r=new Array(e);++n<e;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},Xo.transpose=function(n){return Xo.zip.apply(Xo,n)},Xo.keys=function(n){var t=[];for(var e in n)t.push(e);return t},Xo.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},Xo.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},Xo.merge=function(n){for(var t,e,r,u=n.length,i=-1,o=0;++i<u;)o+=n[i].length;for(e=new Array(o);--u>=0;)for(r=n[u],t=r.length;--t>=0;)e[--o]=r[t];return e};var oa=Math.abs;Xo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var u,i=[],o=e(oa(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(u=n+r*++a)>t;)i.push(u/o);else for(;(u=n+r*++a)<t;)i.push(u/o);return i},Xo.map=function(n){var t=new u;if(n instanceof u)n.forEach(function(n,e){t.set(n,e)});else for(var e in n)t.set(e,n[e]);return t},r(u,{has:i,get:function(n){return this[aa+n]},set:function(n,t){return this[aa+n]=t},remove:o,keys:a,values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},size:c,empty:s,forEach:function(n){for(var t in this)t.charCodeAt(0)===ca&&n.call(this,t.substring(1),this[t])}});var aa="\x00",ca=aa.charCodeAt(0);Xo.nest=function(){function n(t,a,c){if(c>=o.length)return r?r.call(i,a):e?a.sort(e):a;for(var s,l,f,h,g=-1,p=a.length,v=o[c++],d=new u;++g<p;)(h=d.get(s=v(l=a[g])))?h.push(l):d.set(s,[l]);return t?(l=t(),f=function(e,r){l.set(e,n(t,r,c))}):(l={},f=function(e,r){l[e]=n(t,r,c)}),d.forEach(f),l}function t(n,e){if(e>=o.length)return n;var r=[],u=a[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},o=[],a=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(Xo.map,e,0),0)},i.key=function(n){return o.push(n),i},i.sortKeys=function(n){return a[o.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},Xo.set=function(n){var t=new l;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},r(l,{has:i,add:function(n){return this[aa+n]=!0,n},remove:function(n){return n=aa+n,n in this&&delete this[n]},values:a,size:c,empty:s,forEach:function(n){for(var t in this)t.charCodeAt(0)===ca&&n.call(this,t.substring(1))}}),Xo.behavior={},Xo.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=f(n,t,t[e]);return n};var sa=["webkit","ms","moz","Moz","o","O"];Xo.dispatch=function(){for(var n=new p,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=v(n);return n},p.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},Xo.event=null,Xo.requote=function(n){return n.replace(la,"\\$&")};var la=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,fa={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},ha=function(n,t){return t.querySelector(n)},ga=function(n,t){return t.querySelectorAll(n)},pa=Jo[h(Jo,"matchesSelector")],va=function(n,t){return pa.call(n,t)};"function"==typeof Sizzle&&(ha=function(n,t){return Sizzle(n,t)[0]||null},ga=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},va=Sizzle.matchesSelector),Xo.selection=function(){return xa};var da=Xo.selection.prototype=[];da.select=function(n){var t,e,r,u,i=[];n=M(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var c=-1,s=r.length;++c<s;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c,o)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return x(i)},da.selectAll=function(n){var t,e,r=[];n=_(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(e=o[a])&&(r.push(t=Bo(n.call(e,e.__data__,a,u))),t.parentNode=e);return x(r)};var ma={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};Xo.ns={prefix:ma,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),ma.hasOwnProperty(e)?{space:ma[e],local:n}:n}},da.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=Xo.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(b(t,n[t]));return this}return this.each(b(n,t))},da.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=k(n)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!S(n[u]).test(t))return!1;return!0}for(t in n)this.each(E(t,n[t]));return this}return this.each(E(n,t))},da.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(C(e,n[e],t));return this}if(2>r)return Go.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(C(n,t,e))},da.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(N(t,n[t]));return this}return this.each(N(n,t))},da.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},da.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},da.append=function(n){return n=L(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},da.insert=function(n,t){return n=L(n),t=M(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},da.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},da.data=function(n,t){function e(n,e){var r,i,o,a=n.length,f=e.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),v=new Array(a);if(t){var d,m=new u,y=new u,x=[];for(r=-1;++r<a;)d=t.call(i=n[r],i.__data__,r),m.has(d)?v[r]=i:m.set(d,i),x.push(d);for(r=-1;++r<f;)d=t.call(e,o=e[r],r),(i=m.get(d))?(g[r]=i,i.__data__=o):y.has(d)||(p[r]=z(o)),y.set(d,o),m.remove(d);for(r=-1;++r<a;)m.has(x[r])&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],o=e[r],i?(i.__data__=o,g[r]=i):p[r]=z(o);for(;f>r;++r)p[r]=z(e[r]);for(;a>r;++r)v[r]=n[r]}p.update=g,p.parentNode=g.parentNode=v.parentNode=n.parentNode,c.push(p),s.push(g),l.push(v)}var r,i,o=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(n[o]=i.__data__);return n}var c=D([]),s=x([]),l=x([]);if("function"==typeof n)for(;++o<a;)e(r=this[o],n.call(r,r.parentNode.__data__,o));else for(;++o<a;)e(r=this[o],n);return s.enter=function(){return c},s.exit=function(){return l},s},da.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},da.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=q(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a,i)&&t.push(r)}return x(u)},da.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},da.sort=function(n){n=T.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},da.each=function(n){return R(this,function(t,e,r){n.call(t,t.__data__,e,r)})},da.call=function(n){var t=Bo(arguments);return n.apply(t[0]=this,t),this},da.empty=function(){return!this.node()},da.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null},da.size=function(){var n=0;return this.each(function(){++n}),n};var ya=[];Xo.selection.enter=D,Xo.selection.enter.prototype=ya,ya.append=da.append,ya.empty=da.empty,ya.node=da.node,ya.call=da.call,ya.size=da.size,ya.select=function(n){for(var t,e,r,u,i,o=[],a=-1,c=this.length;++a<c;){r=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var s=-1,l=u.length;++s<l;)(i=u[s])?(t.push(r[s]=e=n.call(u.parentNode,i.__data__,s,a)),e.__data__=i.__data__):t.push(null)}return x(o)},ya.insert=function(n,t){return arguments.length<2&&(t=P(this)),da.insert.call(this,n,t)},da.transition=function(){for(var n,t,e=ks||++Ls,r=[],u=Es||{time:Date.now(),ease:yu,delay:0,duration:250},i=-1,o=this.length;++i<o;){r.push(n=[]);for(var a=this[i],c=-1,s=a.length;++c<s;)(t=a[c])&&jo(t,c,e,u),n.push(t)}return Do(r,e)},da.interrupt=function(){return this.each(U)},Xo.select=function(n){var t=["string"==typeof n?ha(n,Wo):n];return t.parentNode=Jo,x([t])},Xo.selectAll=function(n){var t=Bo("string"==typeof n?ga(n,Wo):n);return t.parentNode=Jo,x([t])};var xa=Xo.select(Jo);da.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(j(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(j(n,t,e))};var Ma=Xo.map({mouseenter:"mouseover",mouseleave:"mouseout"});Ma.forEach(function(n){"on"+n in Wo&&Ma.remove(n)});var _a="onselectstart"in Wo?null:h(Jo.style,"userSelect"),ba=0;Xo.mouse=function(n){return Y(n,m())};var wa=/WebKit/.test(Go.navigator.userAgent)?-1:0;Xo.touches=function(n,t){return arguments.length<2&&(t=m().touches),t?Bo(t).map(function(t){var e=Y(n,t);return e.identifier=t.identifier,e}):[]},Xo.behavior.drag=function(){function n(){this.on("mousedown.drag",o).on("touchstart.drag",a)}function t(){return Xo.event.changedTouches[0].identifier}function e(n,t){return Xo.touches(n).filter(function(n){return n.identifier===t})[0]}function r(n,t,e,r){return function(){function o(){var n=t(l,g),e=n[0]-v[0],r=n[1]-v[1];d|=e|r,v=n,f({type:"drag",x:n[0]+c[0],y:n[1]+c[1],dx:e,dy:r})}function a(){m.on(e+"."+p,null).on(r+"."+p,null),y(d&&Xo.event.target===h),f({type:"dragend"})}var c,s=this,l=s.parentNode,f=u.of(s,arguments),h=Xo.event.target,g=n(),p=null==g?"drag":"drag-"+g,v=t(l,g),d=0,m=Xo.select(Go).on(e+"."+p,o).on(r+"."+p,a),y=O();i?(c=i.apply(s,arguments),c=[c.x-v[0],c.y-v[1]]):c=[0,0],f({type:"dragstart"})}}var u=y(n,"drag","dragstart","dragend"),i=null,o=r(g,Xo.mouse,"mousemove","mouseup"),a=r(t,e,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},Xo.rebind(n,u,"on")};var Sa=Math.PI,ka=2*Sa,Ea=Sa/2,Aa=1e-6,Ca=Aa*Aa,Na=Sa/180,La=180/Sa,za=Math.SQRT2,qa=2,Ta=4;Xo.interpolateZoom=function(n,t){function e(n){var t=n*y;if(m){var e=B(v),o=i/(qa*h)*(e*W(za*t+v)-$(v));return[r+o*s,u+o*l,i*e/B(za*t+v)]}return[r+n*s,u+n*l,i*Math.exp(za*t)]}var r=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],s=o-r,l=a-u,f=s*s+l*l,h=Math.sqrt(f),g=(c*c-i*i+Ta*f)/(2*i*qa*h),p=(c*c-i*i-Ta*f)/(2*c*qa*h),v=Math.log(Math.sqrt(g*g+1)-g),d=Math.log(Math.sqrt(p*p+1)-p),m=d-v,y=(m||Math.log(c/i))/za;return e.duration=1e3*y,e},Xo.behavior.zoom=function(){function n(n){n.on(A,s).on(Pa+".zoom",f).on(C,h).on("dblclick.zoom",g).on(L,l)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function e(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function r(n){S.k=Math.max(E[0],Math.min(E[1],n))}function u(n,t){t=e(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){_&&_.domain(M.range().map(function(n){return(n-S.x)/S.k}).map(M.invert)),w&&w.domain(b.range().map(function(n){return(n-S.y)/S.k}).map(b.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function s(){function n(){l=1,u(Xo.mouse(r),g),a(i)}function e(){f.on(C,Go===r?h:null).on(N,null),p(l&&Xo.event.target===s),c(i)}var r=this,i=z.of(r,arguments),s=Xo.event.target,l=0,f=Xo.select(Go).on(C,n).on(N,e),g=t(Xo.mouse(r)),p=O();U.call(r),o(i)}function l(){function n(){var n=Xo.touches(g);return h=S.k,n.forEach(function(n){n.identifier in v&&(v[n.identifier]=t(n))}),n}function e(){for(var t=Xo.event.changedTouches,e=0,i=t.length;i>e;++e)v[t[e].identifier]=null;var o=n(),c=Date.now();if(1===o.length){if(500>c-x){var s=o[0],l=v[s.identifier];r(2*S.k),u(s,l),d(),a(p)}x=c}else if(o.length>1){var s=o[0],f=o[1],h=s[0]-f[0],g=s[1]-f[1];m=h*h+g*g}}function i(){for(var n,t,e,i,o=Xo.touches(g),c=0,s=o.length;s>c;++c,i=null)if(e=o[c],i=v[e.identifier]){if(t)break;n=e,t=i}if(i){var l=(l=e[0]-n[0])*l+(l=e[1]-n[1])*l,f=m&&Math.sqrt(l/m);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],r(f*h)}x=null,u(n,t),a(p)}function f(){if(Xo.event.touches.length){for(var t=Xo.event.changedTouches,e=0,r=t.length;r>e;++e)delete v[t[e].identifier];for(var u in v)return void n()}b.on(M,null).on(_,null),w.on(A,s).on(L,l),k(),c(p)}var h,g=this,p=z.of(g,arguments),v={},m=0,y=Xo.event.changedTouches[0].identifier,M="touchmove.zoom-"+y,_="touchend.zoom-"+y,b=Xo.select(Go).on(M,i).on(_,f),w=Xo.select(g).on(A,null).on(L,e),k=O();U.call(g),e(),o(p)}function f(){var n=z.of(this,arguments);m?clearTimeout(m):(U.call(this),o(n)),m=setTimeout(function(){m=null,c(n)},50),d();var e=v||Xo.mouse(this);p||(p=t(e)),r(Math.pow(2,.002*Ra())*S.k),u(e,p),a(n)}function h(){p=null}function g(){var n=z.of(this,arguments),e=Xo.mouse(this),i=t(e),s=Math.log(S.k)/Math.LN2;o(n),r(Math.pow(2,Xo.event.shiftKey?Math.ceil(s)-1:Math.floor(s)+1)),u(e,i),a(n),c(n)}var p,v,m,x,M,_,b,w,S={x:0,y:0,k:1},k=[960,500],E=Da,A="mousedown.zoom",C="mousemove.zoom",N="mouseup.zoom",L="touchstart.zoom",z=y(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=z.of(this,arguments),t=S;ks?Xo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var e=k[0],r=k[1],u=e/2,i=r/2,o=Xo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,e/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,e/t.k]);return function(t){var r=o(t),c=e/r[2];this.__chart__=S={x:u-r[0]*c,y:i-r[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(E=null==t?Da:[+t[0],+t[1]],n):E},n.center=function(t){return arguments.length?(v=t&&[+t[0],+t[1]],n):v},n.size=function(t){return arguments.length?(k=t&&[+t[0],+t[1]],n):k},n.x=function(t){return arguments.length?(_=t,M=t.copy(),S={x:0,y:0,k:1},n):_},n.y=function(t){return arguments.length?(w=t,b=t.copy(),S={x:0,y:0,k:1},n):w},Xo.rebind(n,z,"on")};var Ra,Da=[0,1/0],Pa="onwheel"in Wo?(Ra=function(){return-Xo.event.deltaY*(Xo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in Wo?(Ra=function(){return Xo.event.wheelDelta},"mousewheel"):(Ra=function(){return-Xo.event.detail},"MozMousePixelScroll");G.prototype.toString=function(){return this.rgb()+""},Xo.hsl=function(n,t,e){return 1===arguments.length?n instanceof Q?K(n.h,n.s,n.l):dt(""+n,mt,K):K(+n,+t,+e)};var Ua=Q.prototype=new G;Ua.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),K(this.h,this.s,this.l/n)},Ua.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),K(this.h,this.s,n*this.l)},Ua.rgb=function(){return nt(this.h,this.s,this.l)},Xo.hcl=function(n,t,e){return 1===arguments.length?n instanceof et?tt(n.h,n.c,n.l):n instanceof it?at(n.l,n.a,n.b):at((n=yt((n=Xo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):tt(+n,+t,+e)};var ja=et.prototype=new G;ja.brighter=function(n){return tt(this.h,this.c,Math.min(100,this.l+Ha*(arguments.length?n:1)))},ja.darker=function(n){return tt(this.h,this.c,Math.max(0,this.l-Ha*(arguments.length?n:1)))},ja.rgb=function(){return rt(this.h,this.c,this.l).rgb()},Xo.lab=function(n,t,e){return 1===arguments.length?n instanceof it?ut(n.l,n.a,n.b):n instanceof et?rt(n.l,n.c,n.h):yt((n=Xo.rgb(n)).r,n.g,n.b):ut(+n,+t,+e)};var Ha=18,Fa=.95047,Oa=1,Ya=1.08883,Ia=it.prototype=new G;Ia.brighter=function(n){return ut(Math.min(100,this.l+Ha*(arguments.length?n:1)),this.a,this.b)},Ia.darker=function(n){return ut(Math.max(0,this.l-Ha*(arguments.length?n:1)),this.a,this.b)},Ia.rgb=function(){return ot(this.l,this.a,this.b)},Xo.rgb=function(n,t,e){return 1===arguments.length?n instanceof pt?gt(n.r,n.g,n.b):dt(""+n,gt,nt):gt(~~n,~~t,~~e)};var Za=pt.prototype=new G;Za.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),gt(Math.min(255,~~(t/n)),Math.min(255,~~(e/n)),Math.min(255,~~(r/n)))):gt(u,u,u)},Za.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),gt(~~(n*this.r),~~(n*this.g),~~(n*this.b))},Za.hsl=function(){return mt(this.r,this.g,this.b)},Za.toString=function(){return"#"+vt(this.r)+vt(this.g)+vt(this.b)};var Va=Xo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});Va.forEach(function(n,t){Va.set(n,ft(t))}),Xo.functor=_t,Xo.xhr=wt(bt),Xo.dsv=function(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var o=St(n,t,null==e?r:u(e),i);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:u(n)):e},o}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function i(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),c=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(l>=s)return o;if(u)return u=!1,i;var t=l;if(34===n.charCodeAt(t)){for(var e=t;e++<s;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}l=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,10===n.charCodeAt(e+2)&&++l):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;s>l;){var r=n.charCodeAt(l++),a=1;if(10===r)u=!0;else if(13===r)u=!0,10===n.charCodeAt(l)&&(++l,++a);else if(r!==c)continue;return n.substring(t,l-a)}return n.substring(t)}for(var r,u,i={},o={},a=[],s=n.length,l=0,f=0;(r=e())!==o;){for(var h=[];r!==i&&r!==o;)h.push(r),r=e();(!t||(h=t(h,f++)))&&a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new l,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(o).join(n)].concat(t.map(function(t){return u.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(i).join("\n")},e},Xo.csv=Xo.dsv(",","text/csv"),Xo.tsv=Xo.dsv("	","text/tab-separated-values");var Xa,$a,Ba,Wa,Ja,Ga=Go[h(Go,"requestAnimationFrame")]||function(n){setTimeout(n,17)};Xo.timer=function(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var u=e+t,i={c:n,t:u,f:!1,n:null};$a?$a.n=i:Xa=i,$a=i,Ba||(Wa=clearTimeout(Wa),Ba=1,Ga(Et))},Xo.timer.flush=function(){At(),Ct()},Xo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var Ka=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Lt);Xo.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=Xo.round(n,Nt(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((0>=e?e+1:e-1)/3)))),Ka[8+e/3]};var Qa=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,nc=Xo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=Xo.round(n,Nt(n,t))).toFixed(Math.max(0,Math.min(20,Nt(n*(1+1e-15),t))))}}),tc=Xo.time={},ec=Date;Tt.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){rc.setUTCDate.apply(this._,arguments)},setDay:function(){rc.setUTCDay.apply(this._,arguments)},setFullYear:function(){rc.setUTCFullYear.apply(this._,arguments)},setHours:function(){rc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){rc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){rc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){rc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){rc.setUTCSeconds.apply(this._,arguments)},setTime:function(){rc.setTime.apply(this._,arguments)}};var rc=Date.prototype;tc.year=Rt(function(n){return n=tc.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),tc.years=tc.year.range,tc.years.utc=tc.year.utc.range,tc.day=Rt(function(n){var t=new ec(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),tc.days=tc.day.range,tc.days.utc=tc.day.utc.range,tc.dayOfYear=function(n){var t=tc.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var e=tc[n]=Rt(function(n){return(n=tc.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=tc.year(n).getDay();return Math.floor((tc.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});tc[n+"s"]=e.range,tc[n+"s"].utc=e.utc.range,tc[n+"OfYear"]=function(n){var e=tc.year(n).getDay();return Math.floor((tc.dayOfYear(n)+(e+t)%7)/7)}}),tc.week=tc.sunday,tc.weeks=tc.sunday.range,tc.weeks.utc=tc.sunday.utc.range,tc.weekOfYear=tc.sundayOfYear;var uc={"-":"",_:" ",0:"0"},ic=/^\s*\d+/,oc=/^%/;Xo.locale=function(n){return{numberFormat:zt(n),timeFormat:Pt(n)}};var ac=Xo.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});Xo.format=ac.numberFormat,Xo.geo={},re.prototype={s:0,t:0,add:function(n){ue(n,this.t,cc),ue(cc.s,this.s,this),this.s?this.t+=cc.t:this.s=cc.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var cc=new re;Xo.geo.stream=function(n,t){n&&sc.hasOwnProperty(n.type)?sc[n.type](n,t):ie(n,t)};var sc={Feature:function(n,t){ie(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)ie(e[r].geometry,t)}},lc={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){oe(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)oe(e[r],t,0)},Polygon:function(n,t){ae(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)ae(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)ie(e[r],t)}};Xo.geo.area=function(n){return fc=0,Xo.geo.stream(n,gc),fc};var fc,hc=new re,gc={sphere:function(){fc+=4*Sa},point:g,lineStart:g,lineEnd:g,polygonStart:function(){hc.reset(),gc.lineStart=ce},polygonEnd:function(){var n=2*hc;fc+=0>n?4*Sa+n:n,gc.lineStart=gc.lineEnd=gc.point=g}};Xo.geo.bounds=function(){function n(n,t){x.push(M=[l=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,e){var r=se([t*Na,e*Na]);if(m){var u=fe(m,r),i=[u[1],-u[0],0],o=fe(i,u);pe(o),o=ve(o);var c=t-p,s=c>0?1:-1,v=o[0]*La*s,d=oa(c)>180;if(d^(v>s*p&&s*t>v)){var y=o[1]*La;y>g&&(g=y)}else if(v=(v+360)%360-180,d^(v>s*p&&s*t>v)){var y=-o[1]*La;f>y&&(f=y)}else f>e&&(f=e),e>g&&(g=e);d?p>t?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t):h>=l?(l>t&&(l=t),t>h&&(h=t)):t>p?a(l,t)>a(l,h)&&(h=t):a(t,h)>a(l,h)&&(l=t)}else n(t,e);m=r,p=t}function e(){_.point=t}function r(){M[0]=l,M[1]=h,_.point=n,m=null}function u(n,e){if(m){var r=n-p;y+=oa(r)>180?r+(r>0?360:-360):r}else v=n,d=e;gc.point(n,e),t(n,e)}function i(){gc.lineStart()}function o(){u(v,d),gc.lineEnd(),oa(y)>Aa&&(l=-(h=180)),M[0]=l,M[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function s(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var l,f,h,g,p,v,d,m,y,x,M,_={point:n,lineStart:e,lineEnd:r,polygonStart:function(){_.point=u,_.lineStart=i,_.lineEnd=o,y=0,gc.polygonStart()},polygonEnd:function(){gc.polygonEnd(),_.point=n,_.lineStart=e,_.lineEnd=r,0>hc?(l=-(h=180),f=-(g=90)):y>Aa?g=90:-Aa>y&&(f=-90),M[0]=l,M[1]=h
}};return function(n){g=h=-(l=f=1/0),x=[],Xo.geo.stream(n,_);var t=x.length;if(t){x.sort(c);for(var e,r=1,u=x[0],i=[u];t>r;++r)e=x[r],s(e[0],u)||s(e[1],u)?(a(u[0],e[1])>a(u[0],u[1])&&(u[1]=e[1]),a(e[0],u[1])>a(u[0],u[1])&&(u[0]=e[0])):i.push(u=e);for(var o,e,p=-1/0,t=i.length-1,r=0,u=i[t];t>=r;u=e,++r)e=i[r],(o=a(u[1],e[0]))>p&&(p=o,l=e[0],h=u[1])}return x=M=null,1/0===l||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[l,f],[h,g]]}}(),Xo.geo.centroid=function(n){pc=vc=dc=mc=yc=xc=Mc=_c=bc=wc=Sc=0,Xo.geo.stream(n,kc);var t=bc,e=wc,r=Sc,u=t*t+e*e+r*r;return Ca>u&&(t=xc,e=Mc,r=_c,Aa>vc&&(t=dc,e=mc,r=yc),u=t*t+e*e+r*r,Ca>u)?[0/0,0/0]:[Math.atan2(e,t)*La,X(r/Math.sqrt(u))*La]};var pc,vc,dc,mc,yc,xc,Mc,_c,bc,wc,Sc,kc={sphere:g,point:me,lineStart:xe,lineEnd:Me,polygonStart:function(){kc.lineStart=_e},polygonEnd:function(){kc.lineStart=xe}},Ec=Ee(be,ze,Te,[-Sa,-Sa/2]),Ac=1e9;Xo.geo.clipExtent=function(){var n,t,e,r,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=Pe(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(Xo.geo.conicEqualArea=function(){return je(He)}).raw=He,Xo.geo.albers=function(){return Xo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},Xo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,e(i,o),t||(r(i,o),t)||u(i,o),t}var t,e,r,u,i=Xo.geo.albers(),o=Xo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=Xo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=i.scale(),e=i.translate(),r=(n[0]-e[0])/t,u=(n[1]-e[1])/t;return(u>=.12&&.234>u&&r>=-.425&&-.214>r?o:u>=.166&&.234>u&&r>=-.214&&-.115>r?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,u){t.point(n,u),e.point(n,u),r.point(n,u)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var s=i.scale(),l=+t[0],f=+t[1];return e=i.translate(t).clipExtent([[l-.455*s,f-.238*s],[l+.455*s,f+.238*s]]).stream(c).point,r=o.translate([l-.307*s,f+.201*s]).clipExtent([[l-.425*s+Aa,f+.12*s+Aa],[l-.214*s-Aa,f+.234*s-Aa]]).stream(c).point,u=a.translate([l-.205*s,f+.212*s]).clipExtent([[l-.214*s+Aa,f+.166*s+Aa],[l-.115*s-Aa,f+.234*s-Aa]]).stream(c).point,n},n.scale(1070)};var Cc,Nc,Lc,zc,qc,Tc,Rc={point:g,lineStart:g,lineEnd:g,polygonStart:function(){Nc=0,Rc.lineStart=Fe},polygonEnd:function(){Rc.lineStart=Rc.lineEnd=Rc.point=g,Cc+=oa(Nc/2)}},Dc={point:Oe,lineStart:g,lineEnd:g,polygonStart:g,polygonEnd:g},Pc={point:Ze,lineStart:Ve,lineEnd:Xe,polygonStart:function(){Pc.lineStart=$e},polygonEnd:function(){Pc.point=Ze,Pc.lineStart=Ve,Pc.lineEnd=Xe}};Xo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),Xo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var e,r,u,i,o,a=4.5;return n.area=function(n){return Cc=0,Xo.geo.stream(n,u(Rc)),Cc},n.centroid=function(n){return dc=mc=yc=xc=Mc=_c=bc=wc=Sc=0,Xo.geo.stream(n,u(Pc)),Sc?[bc/Sc,wc/Sc]:_c?[xc/_c,Mc/_c]:yc?[dc/yc,mc/yc]:[0/0,0/0]},n.bounds=function(n){return qc=Tc=-(Lc=zc=1/0),Xo.geo.stream(n,u(Dc)),[[Lc,zc],[qc,Tc]]},n.projection=function(n){return arguments.length?(u=(e=n)?n.stream||Je(n):bt,t()):e},n.context=function(n){return arguments.length?(i=null==(r=n)?new Ye:new Be(n),"function"!=typeof a&&i.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(Xo.geo.albersUsa()).context(null)},Xo.geo.transform=function(n){return{stream:function(t){var e=new Ge(t);for(var r in n)e[r]=n[r];return e}}},Ge.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},Xo.geo.projection=Qe,Xo.geo.projectionMutator=nr,(Xo.geo.equirectangular=function(){return Qe(er)}).raw=er.invert=er,Xo.geo.rotation=function(n){function t(t){return t=n(t[0]*Na,t[1]*Na),t[0]*=La,t[1]*=La,t}return n=ur(n[0]%360*Na,n[1]*Na,n.length>2?n[2]*Na:0),t.invert=function(t){return t=n.invert(t[0]*Na,t[1]*Na),t[0]*=La,t[1]*=La,t},t},rr.invert=er,Xo.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=ur(-n[0]*Na,-n[1]*Na,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=La,n[1]*=La}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=cr((t=+r)*Na,u*Na),n):t},n.precision=function(r){return arguments.length?(e=cr(t*Na,(u=+r)*Na),n):u},n.angle(90)},Xo.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Na,u=n[1]*Na,i=t[1]*Na,o=Math.sin(r),a=Math.cos(r),c=Math.sin(u),s=Math.cos(u),l=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((e=f*o)*e+(e=s*l-c*f*a)*e),c*l+s*f*a)},Xo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return Xo.range(Math.ceil(i/d)*d,u,d).map(h).concat(Xo.range(Math.ceil(s/m)*m,c,m).map(g)).concat(Xo.range(Math.ceil(r/p)*p,e,p).filter(function(n){return oa(n%d)>Aa}).map(l)).concat(Xo.range(Math.ceil(a/v)*v,o,v).filter(function(n){return oa(n%m)>Aa}).map(f))}var e,r,u,i,o,a,c,s,l,f,h,g,p=10,v=p,d=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(s).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],s=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),s>c&&(t=s,s=c,c=t),n.precision(y)):[[i,s],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],m=+t[1],n):[d,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],v=+t[1],n):[p,v]},n.precision=function(t){return arguments.length?(y=+t,l=lr(a,o,90),f=fr(r,e,y),h=lr(s,c,90),g=fr(i,u,y),n):y},n.majorExtent([[-180,-90+Aa],[180,90-Aa]]).minorExtent([[-180,-80-Aa],[180,80+Aa]])},Xo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=hr,u=gr;return n.distance=function(){return Xo.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},Xo.geo.interpolate=function(n,t){return pr(n[0]*Na,n[1]*Na,t[0]*Na,t[1]*Na)},Xo.geo.length=function(n){return Uc=0,Xo.geo.stream(n,jc),Uc};var Uc,jc={sphere:g,point:g,lineStart:vr,lineEnd:g,polygonStart:g,polygonEnd:g},Hc=dr(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(Xo.geo.azimuthalEqualArea=function(){return Qe(Hc)}).raw=Hc;var Fc=dr(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},bt);(Xo.geo.azimuthalEquidistant=function(){return Qe(Fc)}).raw=Fc,(Xo.geo.conicConformal=function(){return je(mr)}).raw=mr,(Xo.geo.conicEquidistant=function(){return je(yr)}).raw=yr;var Oc=dr(function(n){return 1/n},Math.atan);(Xo.geo.gnomonic=function(){return Qe(Oc)}).raw=Oc,xr.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Ea]},(Xo.geo.mercator=function(){return Mr(xr)}).raw=xr;var Yc=dr(function(){return 1},Math.asin);(Xo.geo.orthographic=function(){return Qe(Yc)}).raw=Yc;var Ic=dr(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(Xo.geo.stereographic=function(){return Qe(Ic)}).raw=Ic,_r.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Ea]},(Xo.geo.transverseMercator=function(){var n=Mr(_r),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[-n[1],n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},n.rotate([0,0])}).raw=_r,Xo.geom={},Xo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u=_t(e),i=_t(r),o=n.length,a=[],c=[];for(t=0;o>t;t++)a.push([+u.call(this,n[t],t),+i.call(this,n[t],t),t]);for(a.sort(kr),t=0;o>t;t++)c.push([a[t][0],-a[t][1]]);var s=Sr(a),l=Sr(c),f=l[0]===s[0],h=l[l.length-1]===s[s.length-1],g=[];for(t=s.length-1;t>=0;--t)g.push(n[a[s[t]][2]]);for(t=+f;t<l.length-h;++t)g.push(n[a[l[t]][2]]);return g}var e=br,r=wr;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},Xo.geom.polygon=function(n){return fa(n,Zc),n};var Zc=Xo.geom.polygon.prototype=[];Zc.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],u=0;++t<e;)n=r,r=this[t],u+=n[1]*r[0]-n[0]*r[1];return.5*u},Zc.centroid=function(n){var t,e,r=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++r<u;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[i*n,o*n]},Zc.clip=function(n){for(var t,e,r,u,i,o,a=Cr(n),c=-1,s=this.length-Cr(this),l=this[s-1];++c<s;){for(t=n.slice(),n.length=0,u=this[c],i=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Er(o,l,u)?(Er(i,l,u)||n.push(Ar(i,o,l,u)),n.push(o)):Er(i,l,u)&&n.push(Ar(i,o,l,u)),i=o;a&&n.push(n[0]),l=u}return n};var Vc,Xc,$c,Bc,Wc,Jc=[],Gc=[];Pr.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(jr),t.length},Br.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},Wr.prototype={insert:function(n,t){var e,r,u;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=Qr(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(u=r.R,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.R&&(Gr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,Kr(this,r))):(u=r.L,u&&u.C?(e.C=u.C=!1,r.C=!0,n=r):(n===e.L&&(Kr(this,e),n=e,e=n.U),e.C=!1,r.C=!0,Gr(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,u=n.U,i=n.L,o=n.R;if(e=i?o?Qr(o):i:o,u?u.L===n?u.L=e:u.R=e:this._=e,i&&o?(r=e.C,e.C=n.C,e.L=i,i.U=e,e!==o?(u=e.U,e.U=n.U,n=e.R,u.L=n,e.R=o,o.U=e):(e.U=u,u=e,n=e.R)):(r=n.C,n=e),n&&(n.U=u),!r){if(n&&n.C)return n.C=!1,void 0;do{if(n===this._)break;if(n===u.L){if(t=u.R,t.C&&(t.C=!1,u.C=!0,Gr(this,u),t=u.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,Kr(this,t),t=u.R),t.C=u.C,u.C=t.R.C=!1,Gr(this,u),n=this._;break}}else if(t=u.L,t.C&&(t.C=!1,u.C=!0,Kr(this,u),t=u.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,Gr(this,t),t=u.L),t.C=u.C,u.C=t.L.C=!1,Kr(this,u),n=this._;break}t.C=!0,n=u,u=u.U}while(!n.C);n&&(n.C=!1)}}},Xo.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],u=a[0][1],i=a[1][0],o=a[1][1];return nu(e(n),a).cells.forEach(function(e,a){var c=e.edges,s=e.site,l=t[a]=c.length?c.map(function(n){var t=n.start();return[t.x,t.y]}):s.x>=r&&s.x<=i&&s.y>=u&&s.y<=o?[[r,o],[i,o],[i,u],[r,u]]:[];l.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(i(n,t)/Aa)*Aa,y:Math.round(o(n,t)/Aa)*Aa,i:t}})}var r=br,u=wr,i=r,o=u,a=Kc;return n?t(n):(t.links=function(n){return nu(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return nu(e(n)).cells.forEach(function(e,r){for(var u,i,o=e.site,a=e.edges.sort(jr),c=-1,s=a.length,l=a[s-1].edge,f=l.l===o?l.r:l.l;++c<s;)u=l,i=f,l=a[c].edge,f=l.l===o?l.r:l.l,r<i.i&&r<f.i&&eu(o,i,f)<0&&t.push([n[r],n[i.i],n[f.i]])}),t},t.x=function(n){return arguments.length?(i=_t(r=n),t):r},t.y=function(n){return arguments.length?(o=_t(u=n),t):u},t.clipExtent=function(n){return arguments.length?(a=null==n?Kc:n,t):a===Kc?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===Kc?null:a&&a[1]},t)};var Kc=[[-1e6,-1e6],[1e6,1e6]];Xo.geom.delaunay=function(n){return Xo.geom.voronoi().triangles(n)},Xo.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,l=n.y;if(null!=c)if(oa(c-e)+oa(l-r)<.01)s(n,t,e,r,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,s(n,f,c,l,u,i,o,a),s(n,t,e,r,u,i,o,a)}else n.x=e,n.y=r,n.point=t}else s(n,t,e,r,u,i,o,a)}function s(n,t,e,r,u,o,a,c){var s=.5*(u+a),l=.5*(o+c),f=e>=s,h=r>=l,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=iu()),f?u=s:a=s,h?o=l:c=l,i(n,t,e,r,u,o,a,c)}var l,f,h,g,p,v,d,m,y,x=_t(a),M=_t(c);if(null!=t)v=t,d=e,m=r,y=u;else if(m=y=-(v=d=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)l=n[g],l.x<v&&(v=l.x),l.y<d&&(d=l.y),l.x>m&&(m=l.x),l.y>y&&(y=l.y),f.push(l.x),h.push(l.y);else for(g=0;p>g;++g){var _=+x(l=n[g],g),b=+M(l,g);v>_&&(v=_),d>b&&(d=b),_>m&&(m=_),b>y&&(y=b),f.push(_),h.push(b)}var w=m-v,S=y-d;w>S?y=d+w:m=v+S;var k=iu();if(k.add=function(n){i(k,n,+x(n,++g),+M(n,g),v,d,m,y)},k.visit=function(n){ou(n,k,v,d,m,y)},g=-1,null==t){for(;++g<p;)i(k,n[g],f[g],h[g],v,d,m,y);--g}else n.forEach(k.add);return f=h=n=l=null,k}var o,a=br,c=wr;return(o=arguments.length)?(a=ru,c=uu,3===o&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,e],[r,u]]},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r-t,u-e]},i)},Xo.interpolateRgb=au,Xo.interpolateObject=cu,Xo.interpolateNumber=su,Xo.interpolateString=lu;var Qc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;Xo.interpolate=fu,Xo.interpolators=[function(n,t){var e=typeof t;return("string"===e?Va.has(t)||/^(#|rgb\(|hsl\()/.test(t)?au:lu:t instanceof G?au:"object"===e?Array.isArray(t)?hu:cu:su)(n,t)}],Xo.interpolateArray=hu;var ns=function(){return bt},ts=Xo.map({linear:ns,poly:xu,quad:function(){return du},cubic:function(){return mu},sin:function(){return Mu},exp:function(){return _u},circle:function(){return bu},elastic:wu,back:Su,bounce:function(){return ku}}),es=Xo.map({"in":bt,out:pu,"in-out":vu,"out-in":function(n){return vu(pu(n))}});Xo.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=ts.get(e)||ns,r=es.get(r)||bt,gu(r(e.apply(null,$o.call(arguments,1))))},Xo.interpolateHcl=Eu,Xo.interpolateHsl=Au,Xo.interpolateLab=Cu,Xo.interpolateRound=Nu,Xo.transform=function(n){var t=Wo.createElementNS(Xo.ns.prefix.svg,"g");return(Xo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new Lu(e?e.matrix:rs)})(n)},Lu.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var rs={a:1,b:0,c:0,d:1,e:0,f:0};Xo.interpolateTransform=Ru,Xo.layout={},Xo.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Uu(n[e]));return t}},Xo.layout.chord=function(){function n(){var n,s,f,h,g,p={},v=[],d=Xo.range(i),m=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(s=0,g=-1;++g<i;)s+=u[h][g];v.push(s),m.push(Xo.range(i)),n+=s}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&m.forEach(function(n,t){n.sort(function(n,e){return a(u[t][n],u[t][e])})}),n=(ka-l*i)/n,s=0,h=-1;++h<i;){for(f=s,g=-1;++g<i;){var y=d[h],x=m[y][g],M=u[y][x],_=s,b=s+=M*n;p[y+"-"+x]={index:y,subindex:x,startAngle:_,endAngle:b,value:M}}r[y]={index:y,startAngle:f,endAngle:s,value:(s-f)/n},s+=l}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,o,a,c,s={},l=0;return s.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,s):u},s.padding=function(n){return arguments.length?(l=n,e=r=null,s):l},s.sortGroups=function(n){return arguments.length?(o=n,e=r=null,s):o},s.sortSubgroups=function(n){return arguments.length?(a=n,e=null,s):a},s.sortChords=function(n){return arguments.length?(c=n,e&&t(),s):c},s.chords=function(){return e||n(),e},s.groups=function(){return r||n(),r},s},Xo.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=u-e,c=i*i+o*o;if(c>a*a/d){if(p>c){var s=t.charge/c;n.px-=i*s,n.py-=o*s}return!0}if(t.point&&c&&p>c){var s=t.pointCharge/c;n.px-=i*s,n.py-=o*s}}return!t.charge}}function t(n){n.px=Xo.event.x,n.py=Xo.event.y,a.resume()}var e,r,u,i,o,a={},c=Xo.dispatch("start","tick","end"),s=[1,1],l=.9,f=us,h=is,g=-30,p=os,v=.1,d=.64,m=[],y=[];return a.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,a,f,h,p,d,x,M,_=m.length,b=y.length;for(e=0;b>e;++e)a=y[e],f=a.source,h=a.target,x=h.x-f.x,M=h.y-f.y,(p=x*x+M*M)&&(p=r*i[e]*((p=Math.sqrt(p))-u[e])/p,x*=p,M*=p,h.x-=x*(d=f.weight/(h.weight+f.weight)),h.y-=M*d,f.x+=x*(d=1-d),f.y+=M*d);if((d=r*v)&&(x=s[0]/2,M=s[1]/2,e=-1,d))for(;++e<_;)a=m[e],a.x+=(x-a.x)*d,a.y+=(M-a.y)*d;if(g)for(Zu(t=Xo.geom.quadtree(m),r,o),e=-1;++e<_;)(a=m[e]).fixed||t.visit(n(a));for(e=-1;++e<_;)a=m[e],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*l,a.y-=(a.py-(a.py=a.y))*l);c.tick({type:"tick",alpha:r})},a.nodes=function(n){return arguments.length?(m=n,a):m},a.links=function(n){return arguments.length?(y=n,a):y},a.size=function(n){return arguments.length?(s=n,a):s},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(l=+n,a):l},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.chargeDistance=function(n){return arguments.length?(p=n*n,a):Math.sqrt(p)},a.gravity=function(n){return arguments.length?(v=+n,a):v},a.theta=function(n){return arguments.length?(d=n*n,a):Math.sqrt(d)},a.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),Xo.timer(a.tick)),a):r},a.start=function(){function n(n,r){if(!e){for(e=new Array(c),a=0;c>a;++a)e[a]=[];for(a=0;s>a;++a){var u=y[a];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var i,o=e[t],a=-1,s=o.length;++a<s;)if(!isNaN(i=o[a][n]))return i;return Math.random()*r}var t,e,r,c=m.length,l=y.length,p=s[0],v=s[1];for(t=0;c>t;++t)(r=m[t]).index=t,r.weight=0;for(t=0;l>t;++t)r=y[t],"number"==typeof r.source&&(r.source=m[r.source]),"number"==typeof r.target&&(r.target=m[r.target]),++r.source.weight,++r.target.weight;for(t=0;c>t;++t)r=m[t],isNaN(r.x)&&(r.x=n("x",p)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof f)for(t=0;l>t;++t)u[t]=+f.call(this,y[t],t);else for(t=0;l>t;++t)u[t]=f;if(i=[],"function"==typeof h)for(t=0;l>t;++t)i[t]=+h.call(this,y[t],t);else for(t=0;l>t;++t)i[t]=h;if(o=[],"function"==typeof g)for(t=0;c>t;++t)o[t]=+g.call(this,m[t],t);else for(t=0;c>t;++t)o[t]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return e||(e=Xo.behavior.drag().origin(bt).on("dragstart.force",Fu).on("drag.force",t).on("dragend.force",Ou)),arguments.length?(this.on("mouseover.force",Yu).on("mouseout.force",Iu).call(e),void 0):e},Xo.rebind(a,c,"on")};var us=20,is=1,os=1/0;Xo.layout.hierarchy=function(){function n(t,o,a){var c=u.call(e,t,o);if(t.depth=o,a.push(t),c&&(s=c.length)){for(var s,l,f=-1,h=t.children=new Array(s),g=0,p=o+1;++f<s;)l=h[f]=n(c[f],p,a),l.parent=t,g+=l.value;r&&h.sort(r),i&&(t.value=g)}else delete t.children,i&&(t.value=+i.call(e,t,o)||0);return t}function t(n,r){var u=n.children,o=0;if(u&&(a=u.length))for(var a,c=-1,s=r+1;++c<a;)o+=t(u[c],s);else i&&(o=+i.call(e,n,r)||0);return i&&(n.value=o),o}function e(t){var e=[];return n(t,0,e),e}var r=Bu,u=Xu,i=$u;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},Xo.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(o=i.length)){var o,a,c,s=-1;for(r=t.value?r/t.value:0;++s<o;)n(a=i[s],e,c=a.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var o=r.call(this,e,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var r=Xo.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},Vu(e,r)},Xo.layout.pie=function(){function n(i){var o=i.map(function(e,r){return+t.call(n,e,r)}),a=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/Xo.sum(o),s=Xo.range(i.length);null!=e&&s.sort(e===as?function(n,t){return o[t]-o[n]}:function(n,t){return e(i[n],i[t])});var l=[];return s.forEach(function(n){var t;l[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),l}var t=Number,e=as,r=0,u=ka;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var as={};Xo.layout.stack=function(){function n(a,c){var s=a.map(function(e,r){return t.call(n,e,r)}),l=s.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),o.call(n,t,e)]})}),f=e.call(n,l,c);s=Xo.permute(s,f),l=Xo.permute(l,f);var h,g,p,v=r.call(n,l,c),d=s.length,m=s[0].length;for(g=0;m>g;++g)for(u.call(n,s[0][g],p=v[g],l[0][g][1]),h=1;d>h;++h)u.call(n,s[h][g],p+=l[h-1][g][1],l[h][g][1]);return a}var t=bt,e=Qu,r=ni,u=Ku,i=Ju,o=Gu;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:cs.get(t)||Qu,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:ss.get(t)||ni,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var cs=Xo.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(ti),i=n.map(ei),o=Xo.range(r).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,s=[],l=[];for(t=0;r>t;++t)e=o[t],c>a?(a+=i[e],s.push(e)):(c+=i[e],l.push(e));return l.reverse().concat(s)},reverse:function(n){return Xo.range(n.length).reverse()},"default":Qu}),ss=Xo.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,o=[],a=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;i>e;++e)c[e]=(a-o[e])/2;return c},wiggle:function(n){var t,e,r,u,i,o,a,c,s,l=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=s=0,e=1;h>e;++e){for(t=0,u=0;l>t;++t)u+=n[t][e][1];for(t=0,i=0,a=f[e][0]-f[e-1][0];l>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;i+=o*n[t][e][1]}g[e]=c-=u?i/u*a:0,s>c&&(s=c)}for(e=0;h>e;++e)g[e]-=s;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,o=1/u,a=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=o}for(e=0;i>e;++e)a[e]=0;return a},zero:ni});Xo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],s=n.map(e,this),l=r.call(this,s,i),f=u.call(this,l,s,i),i=-1,h=s.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=s[i],a>=l[0]&&a<=l[1]&&(o=c[Xo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,e=Number,r=oi,u=ui;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=_t(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return ii(n,t)}:_t(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},Xo.layout.tree=function(){function n(n,i){function o(n,t){var r=n.children,u=n._tree;if(r&&(i=r.length)){for(var i,a,s,l=r[0],f=l,h=-1;++h<i;)s=r[h],o(s,a),f=c(s,a,f),a=s;vi(n);var g=.5*(l._tree.prelim+s._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function c(n,t,r){if(t){for(var u,i=n,o=n,a=t,c=n.parent.children[0],s=i._tree.mod,l=o._tree.mod,f=a._tree.mod,h=c._tree.mod;a=si(a),i=ci(i),a&&i;)c=ci(c),o=si(o),o._tree.ancestor=n,u=a._tree.prelim+f-i._tree.prelim-s+e(a,i),u>0&&(di(mi(a,n,r),n,u),s+=u,l+=u),f+=a._tree.mod,s+=i._tree.mod,h+=c._tree.mod,l+=o._tree.mod;a&&!si(o)&&(o._tree.thread=a,o._tree.mod+=f-l),i&&!ci(c)&&(c._tree.thread=i,c._tree.mod+=s-h,r=n)}return r}var s=t.call(this,n,i),l=s[0];pi(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),o(l),a(l,-l._tree.prelim);var f=li(l,hi),h=li(l,fi),g=li(l,gi),p=f.x-e(f,h)/2,v=h.x+e(h,f)/2,d=g.depth||1;return pi(l,u?function(n){n.x*=r[0],n.y=n.depth*r[1],delete n._tree}:function(n){n.x=(n.x-p)/(v-p)*r[0],n.y=n.depth/d*r[1],delete n._tree}),s}var t=Xo.layout.hierarchy().sort(null).value(null),e=ai,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},Vu(n,t)},Xo.layout.pack=function(){function n(n,i){var o=e.call(this,n,i),a=o[0],c=u[0],s=u[1],l=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,pi(a,function(n){n.r=+l(n.value)}),pi(a,bi),r){var f=r*(t?1:Math.max(2*a.r/c,2*a.r/s))/2;pi(a,function(n){n.r+=f}),pi(a,bi),pi(a,function(n){n.r-=f})}return ki(a,c/2,s/2,t?1:1/Math.max(2*a.r/c,2*a.r/s)),o}var t,e=Xo.layout.hierarchy().sort(yi),r=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},Vu(n,e)},Xo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],s=0;pi(c,function(n){var t=n.children;t&&t.length?(n.x=Ci(t),n.y=Ai(t)):(n.x=o?s+=e(n,o):0,n.y=0,o=n)});var l=Ni(c),f=Li(c),h=l.x-e(l,f)/2,g=f.x+e(f,l)/2;return pi(c,u?function(n){n.x=(n.x-c.x)*r[0],n.y=(c.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(g-h)*r[0],n.y=(1-(c.y?n.y/c.y:1))*r[1]}),a}var t=Xo.layout.hierarchy().sort(null).value(null),e=ai,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},Vu(n,t)},Xo.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var o,a,c,s=f(e),l=[],h=i.slice(),p=1/0,v="slice"===g?s.dx:"dice"===g?s.dy:"slice-dice"===g?1&e.depth?s.dy:s.dx:Math.min(s.dx,s.dy);for(n(h,s.dx*s.dy/e.value),l.area=0;(c=h.length)>0;)l.push(o=h[c-1]),l.area+=o.area,"squarify"!==g||(a=r(l,v))<=p?(h.pop(),p=a):(l.area-=l.pop().area,u(l,v,s,!1),v=Math.min(s.dx,s.dy),l.length=l.area=0,p=1/0);l.length&&(u(l,v,s,!0),l.length=l.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,o=f(t),a=r.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,o=n.length,a=e.x,s=e.y,l=t?c(n.area/t):0;if(t==e.dx){for((r||l>e.dy)&&(l=e.dy);++i<o;)u=n[i],u.x=a,u.y=s,u.dy=l,a+=u.dx=Math.min(e.x+e.dx-a,l?c(u.area/l):0);u.z=!0,u.dx+=e.x+e.dx-a,e.y+=l,e.dy-=l}else{for((r||l>e.dx)&&(l=e.dx);++i<o;)u=n[i],u.x=a,u.y=s,u.dx=l,s+=u.dy=Math.min(e.y+e.dy-s,l?c(u.area/l):0);u.z=!1,u.dy+=e.y+e.dy-s,e.x+=l,e.dx-=l}}function i(r){var u=o||a(r),i=u[0];return i.x=0,i.y=0,i.dx=s[0],i.dy=s[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?e:t)(i),h&&(o=u),u}var o,a=Xo.layout.hierarchy(),c=Math.round,s=[1,1],l=null,f=zi,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(s=n,i):s},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?zi(t):qi(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return qi(t,n)}if(!arguments.length)return l;var r;return f=null==(l=n)?zi:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},Vu(i,a)},Xo.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=2*Math.random()-1,r=2*Math.random()-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=Xo.random.normal.apply(Xo,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=Xo.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},Xo.scale={};var ls={floor:bt,ceil:bt};Xo.scale.linear=function(){return Hi([0,1],[0,1],fu,!1)};var fs={s:1,g:1,p:1,r:1,e:1};Xo.scale.log=function(){return $i(Xo.scale.linear().domain([0,1]),10,!0,[1,10])};var hs=Xo.format(".0e"),gs={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};Xo.scale.pow=function(){return Bi(Xo.scale.linear(),1,[0,1])},Xo.scale.sqrt=function(){return Xo.scale.pow().exponent(.5)},Xo.scale.ordinal=function(){return Ji([],{t:"range",a:[[]]})},Xo.scale.category10=function(){return Xo.scale.ordinal().range(ps)},Xo.scale.category20=function(){return Xo.scale.ordinal().range(vs)},Xo.scale.category20b=function(){return Xo.scale.ordinal().range(ds)},Xo.scale.category20c=function(){return Xo.scale.ordinal().range(ms)};var ps=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(ht),vs=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(ht),ds=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(ht),ms=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(ht);Xo.scale.quantile=function(){return Gi([],[])
},Xo.scale.quantize=function(){return Ki(0,1,[0,1])},Xo.scale.threshold=function(){return Qi([.5],[0,1])},Xo.scale.identity=function(){return no([0,1])},Xo.svg={},Xo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),o=r.apply(this,arguments)+ys,a=u.apply(this,arguments)+ys,c=(o>a&&(c=o,o=a,a=c),a-o),s=Sa>c?"0":"1",l=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);return c>=xs?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+s+",0 "+n*l+","+n*f+"Z":"M"+i*l+","+i*f+"A"+i+","+i+" 0 "+s+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=to,e=eo,r=ro,u=uo;return n.innerRadius=function(e){return arguments.length?(t=_t(e),n):t},n.outerRadius=function(t){return arguments.length?(e=_t(t),n):e},n.startAngle=function(t){return arguments.length?(r=_t(t),n):r},n.endAngle=function(t){return arguments.length?(u=_t(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+ys;return[Math.cos(i)*n,Math.sin(i)*n]},n};var ys=-Ea,xs=ka-Aa;Xo.svg.line=function(){return io(bt)};var Ms=Xo.map({linear:oo,"linear-closed":ao,step:co,"step-before":so,"step-after":lo,basis:mo,"basis-open":yo,"basis-closed":xo,bundle:Mo,cardinal:go,"cardinal-open":fo,"cardinal-closed":ho,monotone:Eo});Ms.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var _s=[0,2/3,1/3,0],bs=[0,1/3,2/3,0],ws=[0,1/6,2/3,1/6];Xo.svg.line.radial=function(){var n=io(Ao);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},so.reverse=lo,lo.reverse=so,Xo.svg.area=function(){return Co(bt)},Xo.svg.area.radial=function(){var n=Co(Ao);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},Xo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),s=t(this,o,n,a);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,s)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,s.r,s.p0)+r(s.r,s.p1,s.a1-s.a0)+u(s.r,s.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=a.call(n,u,r),o=c.call(n,u,r)+ys,l=s.call(n,u,r)+ys;return{r:i,a0:o,a1:l,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(l),i*Math.sin(l)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Sa)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=hr,o=gr,a=No,c=ro,s=uo;return n.radius=function(t){return arguments.length?(a=_t(t),n):a},n.source=function(t){return arguments.length?(i=_t(t),n):i},n.target=function(t){return arguments.length?(o=_t(t),n):o},n.startAngle=function(t){return arguments.length?(c=_t(t),n):c},n.endAngle=function(t){return arguments.length?(s=_t(t),n):s},n},Xo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=e.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=hr,e=gr,r=Lo;return n.source=function(e){return arguments.length?(t=_t(e),n):t},n.target=function(t){return arguments.length?(e=_t(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},Xo.svg.diagonal.radial=function(){var n=Xo.svg.diagonal(),t=Lo,e=n.projection;return n.projection=function(n){return arguments.length?e(zo(t=n)):t},n},Xo.svg.symbol=function(){function n(n,r){return(Ss.get(t.call(this,n,r))||Ro)(e.call(this,n,r))}var t=To,e=qo;return n.type=function(e){return arguments.length?(t=_t(e),n):t},n.size=function(t){return arguments.length?(e=_t(t),n):e},n};var Ss=Xo.map({circle:Ro,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Cs)),e=t*Cs;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/As),e=t*As/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/As),e=t*As/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});Xo.svg.symbolTypes=Ss.keys();var ks,Es,As=Math.sqrt(3),Cs=Math.tan(30*Na),Ns=[],Ls=0;Ns.call=da.call,Ns.empty=da.empty,Ns.node=da.node,Ns.size=da.size,Xo.transition=function(n){return arguments.length?ks?n.transition():n:xa.transition()},Xo.transition.prototype=Ns,Ns.select=function(n){var t,e,r,u=this.id,i=[];n=M(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],s=-1,l=c.length;++s<l;)(r=c[s])&&(e=n.call(r,r.__data__,s,o))?("__data__"in r&&(e.__data__=r.__data__),jo(e,s,u,r.__transition__[u]),t.push(e)):t.push(null)}return Do(i,u)},Ns.selectAll=function(n){var t,e,r,u,i,o=this.id,a=[];n=_(n);for(var c=-1,s=this.length;++c<s;)for(var l=this[c],f=-1,h=l.length;++f<h;)if(r=l[f]){i=r.__transition__[o],e=n.call(r,r.__data__,f,c),a.push(t=[]);for(var g=-1,p=e.length;++g<p;)(u=e[g])&&jo(u,g,o,i),t.push(u)}return Do(a,o)},Ns.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=q(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var e=this[i],a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a,i)&&t.push(r)}return Do(u,this.id)},Ns.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):R(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},Ns.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?Ru:fu,a=Xo.ns.qualify(n);return Po(this,"attr."+n,t,a.local?i:u)},Ns.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=Xo.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},Ns.style=function(n,t,e){function r(){this.style.removeProperty(n)}function u(t){return null==t?r:(t+="",function(){var r,u=Go.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=fu(u,t),function(t){this.style.setProperty(n,r(t),e)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}return Po(this,"style."+n,t,u)},Ns.styleTween=function(n,t,e){function r(r,u){var i=t.call(this,r,u,Go.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},Ns.text=function(n){return Po(this,"text",n,Uo)},Ns.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Ns.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=Xo.ease.apply(Xo,arguments)),R(this,function(e){e.__transition__[t].ease=n}))},Ns.delay=function(n){var t=this.id;return R(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=+n.call(e,e.__data__,r,u)}:(n=+n,function(e){e.__transition__[t].delay=n}))},Ns.duration=function(n){var t=this.id;return R(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u))}:(n=Math.max(1,n),function(e){e.__transition__[t].duration=n}))},Ns.each=function(n,t){var e=this.id;if(arguments.length<2){var r=Es,u=ks;ks=e,R(this,function(t,r,u){Es=t.__transition__[e],n.call(t,t.__data__,r,u)}),Es=r,ks=u}else R(this,function(r){var u=r.__transition__[e];(u.event||(u.event=Xo.dispatch("start","end"))).on(n,t)});return this},Ns.transition=function(){for(var n,t,e,r,u=this.id,i=++Ls,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],s=0,l=t.length;l>s;s++)(e=t[s])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,jo(e,s,i,r)),n.push(e)}return Do(o,i)},Xo.svg.axis=function(){function n(n){n.each(function(){var n,s=Xo.select(this),l=this.__chart__||e,f=this.__chart__=e.copy(),h=null==c?f.ticks?f.ticks.apply(f,a):f.domain():c,g=null==t?f.tickFormat?f.tickFormat.apply(f,a):bt:t,p=s.selectAll(".tick").data(h,f),v=p.enter().insert("g",".domain").attr("class","tick").style("opacity",Aa),d=Xo.transition(p.exit()).style("opacity",Aa).remove(),m=Xo.transition(p).style("opacity",1),y=Ri(f),x=s.selectAll(".domain").data([0]),M=(x.enter().append("path").attr("class","domain"),Xo.transition(x));v.append("line"),v.append("text");var _=v.select("line"),b=m.select("line"),w=p.select("text").text(g),S=v.select("text"),k=m.select("text");switch(r){case"bottom":n=Ho,_.attr("y2",u),S.attr("y",Math.max(u,0)+o),b.attr("x2",0).attr("y2",u),k.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+i+"V0H"+y[1]+"V"+i);break;case"top":n=Ho,_.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),b.attr("x2",0).attr("y2",-u),k.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),M.attr("d","M"+y[0]+","+-i+"V0H"+y[1]+"V"+-i);break;case"left":n=Fo,_.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),b.attr("x2",-u).attr("y2",0),k.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),M.attr("d","M"+-i+","+y[0]+"H0V"+y[1]+"H"+-i);break;case"right":n=Fo,_.attr("x2",u),S.attr("x",Math.max(u,0)+o),b.attr("x2",u).attr("y2",0),k.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),M.attr("d","M"+i+","+y[0]+"H0V"+y[1]+"H"+i)}if(f.rangeBand){var E=f,A=E.rangeBand()/2;l=f=function(n){return E(n)+A}}else l.rangeBand?l=f:d.call(n,f);v.call(n,l),m.call(n,f)})}var t,e=Xo.scale.linear(),r=zs,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in qs?t+"":zs,n):r},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(u=+t,i=+arguments[e-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var zs="bottom",qs={top:1,right:1,bottom:1,left:1};Xo.svg.brush=function(){function n(i){i.each(function(){var i=Xo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(p,bt);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return Ts[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,f=Xo.transition(i),h=Xo.transition(o);c&&(l=Ri(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),e(f)),s&&(l=Ri(s),h.attr("y",l[0]).attr("height",l[1]-l[0]),r(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+l[+/e$/.test(n)]+","+f[+/^s/.test(n)]+")"})}function e(n){n.select(".extent").attr("x",l[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",l[1]-l[0])}function r(n){n.select(".extent").attr("y",f[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",f[1]-f[0])}function u(){function u(){32==Xo.event.keyCode&&(C||(x=null,L[0]-=l[1],L[1]-=f[1],C=2),d())}function p(){32==Xo.event.keyCode&&2==C&&(L[0]+=l[1],L[1]+=f[1],C=0,d())}function v(){var n=Xo.mouse(_),u=!1;M&&(n[0]+=M[0],n[1]+=M[1]),C||(Xo.event.altKey?(x||(x=[(l[0]+l[1])/2,(f[0]+f[1])/2]),L[0]=l[+(n[0]<x[0])],L[1]=f[+(n[1]<x[1])]):x=null),E&&m(n,c,0)&&(e(S),u=!0),A&&m(n,s,1)&&(r(S),u=!0),u&&(t(S),w({type:"brush",mode:C?"move":"resize"}))}function m(n,t,e){var r,u,a=Ri(t),c=a[0],s=a[1],p=L[e],v=e?f:l,d=v[1]-v[0];return C&&(c-=p,s-=d+p),r=(e?g:h)?Math.max(c,Math.min(s,n[e])):n[e],C?u=(r+=p)+d:(x&&(p=Math.max(c,Math.min(s,2*x[e]-r))),r>p?(u=r,r=p):u=p),v[0]!=r||v[1]!=u?(e?o=null:i=null,v[0]=r,v[1]=u,!0):void 0}function y(){v(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),Xo.select("body").style("cursor",null),z.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),N(),w({type:"brushend"})}var x,M,_=this,b=Xo.select(Xo.event.target),w=a.of(_,arguments),S=Xo.select(_),k=b.datum(),E=!/^(n|s)$/.test(k)&&c,A=!/^(e|w)$/.test(k)&&s,C=b.classed("extent"),N=O(),L=Xo.mouse(_),z=Xo.select(Go).on("keydown.brush",u).on("keyup.brush",p);if(Xo.event.changedTouches?z.on("touchmove.brush",v).on("touchend.brush",y):z.on("mousemove.brush",v).on("mouseup.brush",y),S.interrupt().selectAll("*").interrupt(),C)L[0]=l[0]-L[0],L[1]=f[0]-L[1];else if(k){var q=+/w$/.test(k),T=+/^n/.test(k);M=[l[1-q]-L[0],f[1-T]-L[1]],L[0]=l[q],L[1]=f[T]}else Xo.event.altKey&&(x=L.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),Xo.select("body").style("cursor",b.style("cursor")),w({type:"brushstart"}),v()}var i,o,a=y(n,"brushstart","brush","brushend"),c=null,s=null,l=[0,0],f=[0,0],h=!0,g=!0,p=Rs[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:l,y:f,i:i,j:o},e=this.__chart__||t;this.__chart__=t,ks?Xo.select(this).transition().each("start.brush",function(){i=e.i,o=e.j,l=e.x,f=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=hu(l,t.x),r=hu(f,t.y);return i=o=null,function(u){l=t.x=e(u),f=t.y=r(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,p=Rs[!c<<1|!s],n):c},n.y=function(t){return arguments.length?(s=t,p=Rs[!c<<1|!s],n):s},n.clamp=function(t){return arguments.length?(c&&s?(h=!!t[0],g=!!t[1]):c?h=!!t:s&&(g=!!t),n):c&&s?[h,g]:c?h:s?g:null},n.extent=function(t){var e,r,u,a,h;return arguments.length?(c&&(e=t[0],r=t[1],s&&(e=e[0],r=r[0]),i=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(h=e,e=r,r=h),(e!=l[0]||r!=l[1])&&(l=[e,r])),s&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],s.invert&&(u=s(u),a=s(a)),u>a&&(h=u,u=a,a=h),(u!=f[0]||a!=f[1])&&(f=[u,a])),n):(c&&(i?(e=i[0],r=i[1]):(e=l[0],r=l[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(h=e,e=r,r=h))),s&&(o?(u=o[0],a=o[1]):(u=f[0],a=f[1],s.invert&&(u=s.invert(u),a=s.invert(a)),u>a&&(h=u,u=a,a=h))),c&&s?[[e,u],[r,a]]:c?[e,r]:s&&[u,a])},n.clear=function(){return n.empty()||(l=[0,0],f=[0,0],i=o=null),n},n.empty=function(){return!!c&&l[0]==l[1]||!!s&&f[0]==f[1]},Xo.rebind(n,a,"on")};var Ts={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Rs=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Ds=tc.format=ac.timeFormat,Ps=Ds.utc,Us=Ps("%Y-%m-%dT%H:%M:%S.%LZ");Ds.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Oo:Us,Oo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Oo.toString=Us.toString,tc.second=Rt(function(n){return new ec(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),tc.seconds=tc.second.range,tc.seconds.utc=tc.second.utc.range,tc.minute=Rt(function(n){return new ec(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),tc.minutes=tc.minute.range,tc.minutes.utc=tc.minute.utc.range,tc.hour=Rt(function(n){var t=n.getTimezoneOffset()/60;return new ec(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),tc.hours=tc.hour.range,tc.hours.utc=tc.hour.utc.range,tc.month=Rt(function(n){return n=tc.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),tc.months=tc.month.range,tc.months.utc=tc.month.utc.range;var js=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Hs=[[tc.second,1],[tc.second,5],[tc.second,15],[tc.second,30],[tc.minute,1],[tc.minute,5],[tc.minute,15],[tc.minute,30],[tc.hour,1],[tc.hour,3],[tc.hour,6],[tc.hour,12],[tc.day,1],[tc.day,2],[tc.week,1],[tc.month,1],[tc.month,3],[tc.year,1]],Fs=Ds.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",be]]),Os={range:function(n,t,e){return Xo.range(+n,+t,e).map(Io)},floor:bt,ceil:bt};Hs.year=tc.year,tc.scale=function(){return Yo(Xo.scale.linear(),Hs,Fs)};var Ys=Hs.map(function(n){return[n[0].utc,n[1]]}),Is=Ps.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",be]]);Ys.year=tc.year.utc,tc.scale.utc=function(){return Yo(Xo.scale.linear(),Ys,Is)},Xo.text=wt(function(n){return n.responseText}),Xo.json=function(n,t){return St(n,"application/json",Zo,t)},Xo.html=function(n,t){return St(n,"text/html",Vo,t)},Xo.xml=wt(function(n){return n.responseXML}),"function"==typeof define&&define.amd?define('d3',Xo):"object"==typeof module&&module.exports?module.exports=Xo:this.d3=Xo}();

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

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof requirejs=="function"&&requirejs;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof requirejs=="function"&&requirejs;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(requirejs,module,exports){var util=requirejs("util");var canLog=requirejs("./bragi/canLog");var Transports=requirejs("./bragi/transports/Transports");var transports=requirejs("./bragi/transports");var STYLES=requirejs("./bragi/styles");var SYMBOLS=requirejs("./bragi/symbols");(function(root,factory){if(typeof define==="function"&&define.amd){define('logger',["exports"],function(exports){root=factory(root,exports);return root})}else if(typeof exports!=="undefined"){factory(root,exports);module.exports=factory()}else{root.logger=factory(root,{})}})(this,function(root,logger){var LOGGER={util:{},canLog:canLog};LOGGER.util.__stack=function(){var stack=null;try{var orig=Error.prepareStackTrace;Error.prepareStackTrace=function(_,stack){return stack};var err=new Error;Error.captureStackTrace(err,arguments.callee);stack=err.stack;Error.prepareStackTrace=orig}catch(e){}return stack};LOGGER.util.colors=STYLES.colors;LOGGER.util.symbols=SYMBOLS;LOGGER.options={groupsEnabled:true,groupsDisabled:[],storeStackTrace:false};LOGGER.transports=new Transports;var _defaultTransports=[new transports.Console({showMeta:true,showStackTrace:false})];for(var i=0;i<_defaultTransports.length;i++){LOGGER.transports.add(_defaultTransports[i])}LOGGER.transportClasses=transports;LOGGER.util.print=function print(message,color){color=color?color:"black";return LOGGER.util.colors[color]+message+LOGGER.util.colors.reset};LOGGER.log=function loggerLog(group,message){var groupsEnabled,groupsDisabled,currentTransport;var transportFuncsToCall=[];for(var transport in LOGGER.transports._transports){currentTransport=LOGGER.transports._transports[transport];groupsEnabled=LOGGER.options.groupsEnabled;groupsDisabled=LOGGER.options.groupsDisabled;if(currentTransport.groupsEnabled!==undefined){groupsEnabled=currentTransport.groupsEnabled}if(currentTransport.groupsDisabled!==undefined){groupsDisabled=currentTransport.groupsDisabled}if(canLog(group,groupsEnabled,groupsDisabled)){transportFuncsToCall.push(currentTransport)}}if(transportFuncsToCall.length<1){if(!LOGGER.options.storeAllHistory){return false}}var extraArgs=Array.prototype.slice.call(arguments,2);var loggedObject={};var caller="global scope";if(loggerLog.caller&&loggerLog.caller.name){caller=loggerLog.caller.name}else if((loggerLog.caller+"").indexOf("function ()")===0){caller="anonymous function"}loggedObject.properties={};loggedObject.originalArgs=[];for(var i=0;i<extraArgs.length;i++){if(!(extraArgs[i]instanceof Array)&&typeof extraArgs[i]==="object"){for(var key in extraArgs[i]){loggedObject.properties[key]=extraArgs[i][key]}}else{loggedObject.properties["_argument"+i]=extraArgs[i]}loggedObject.originalArgs.push(extraArgs[i])}loggedObject.meta={caller:caller,date:(new Date).toJSON()};loggedObject.unixTimestamp=(new Date).getTime()/1e3;if(LOGGER.options.storeStackTrace){var stack=LOGGER.util.__stack();if(stack){var stackLength=stack.length;var trace=[];for(i=1;i<stack.length;i++){trace.push(stack[i]+"")}loggedObject.meta.file=stack[1].getFileName();loggedObject.meta.line=stack[1].getLineNumber();loggedObject.meta.column=stack[1].getColumnNumber();loggedObject.meta.trace=trace}}loggedObject.group=group;loggedObject.message=message;for(i=0,len=transportFuncsToCall.length;i<len;i++){transportFuncsToCall[i].log.call(transportFuncsToCall[i],loggedObject)}};if(!(typeof define==="function"&&define.amd)){window.BRAGI=LOGGER}return LOGGER})},{"./bragi/canLog":2,"./bragi/styles":3,"./bragi/symbols":4,"./bragi/transports":5,"./bragi/transports/Transports":8,util:13}],2:[function(requirejs,module,exports){function canLog(group,groupsEnabled,groupsDisabled){if(groupsEnabled===undefined){groupsEnabled=true}var i,len;var canLogIt=true;if(groupsEnabled===true){canLogIt=true}else if(groupsEnabled===false||groupsEnabled===null){canLogIt=false}else if(groupsEnabled instanceof Array){canLogIt=false;for(i=0,len=groupsEnabled.length;i<len;i++){if(groupsEnabled[i]instanceof RegExp){if(groupsEnabled[i].test(group)){canLogIt=true;break}}else if(group.indexOf(groupsEnabled[i])===0){canLogIt=true;break}}}if(group.indexOf("error")===0||group.indexOf("warn")===0){canLogIt=true}if(groupsDisabled&&groupsDisabled instanceof Array){for(i=0,len=groupsDisabled.length;i<len;i++){if(groupsDisabled[i]instanceof RegExp){if(groupsDisabled[i].test(group)){canLogIt=false;break}}else if(group.indexOf(groupsDisabled[i])===0){canLogIt=false;break}}}return canLogIt}module.exports=canLog},{}],3:[function(requirejs,module,exports){module.exports={colors:{white:"[37m",grey:"[90m",gray:"[90m",black:"[30m",blue:"[34m",cyan:"[36m",green:"[32m",magenta:"[35m",red:"[31m",yellow:"[33m",reset:"[0m"},styles:{blink:"[49;5;8m",underline:"[4m",bold:"[1m"},backgrounds:{white:"[47m",black:"[40m",blue:"[44m",cyan:"[46m",green:"[42m",magenta:"[45m",red:"[41m",yellow:"[43m"}}},{}],4:[function(requirejs,module,exports){var STYLES=requirejs("./styles");module.exports={success:STYLES.colors.green+"✔︎ "+STYLES.colors.reset,error:STYLES.colors.red+"✘ "+STYLES.colors.reset,warn:STYLES.colors.yellow+"⚑ "+STYLES.colors.reset,arrow:"➤ ",star:"☆ ",box:STYLES.colors.yellow+"☐ "+STYLES.colors.reset,boxSuccess:STYLES.colors.green+"☑︎ "+STYLES.colors.reset,boxError:STYLES.colors.red+"☒ "+STYLES.colors.reset,circle:"◯ ",circleFilled:"◉ ",asterisk:"✢",floral:"❧",snowflake:"❄︎",fourDiamond:"❖",spade:"♠︎",club:"♣︎",heart:"♥︎",diamond:"♦︎",queen:"♛",rook:"♜",pawn:"♟",atom:"⚛"}},{"./styles":3}],5:[function(requirejs,module,exports){var files=requirejs("./transports/index");var transports={};for(var file in files){transports[file]=files[file]}module.exports=transports},{"./transports/index":9}],6:[function(requirejs,module,exports){var STYLES=requirejs("../styles");var SYMBOLS=requirejs("../symbols");if(!window.console){window.console=function(){}}GROUP_COLORS=[["#3182bd","#ffffff","#225588"],["#f38630","#ffffff"],["#e0e4cc","#000000","#c8cbb6"],["#8c510a","#ffffff"],["#35978f","#ffffff","#13756d"],["#c51b7d","#ffffff"],["#c6dbef","#000000"],["#af8dc3","#000000"],["#543005","#ffffff","#321002"],["#7fbf7b","#000000"],["#dfc27d","#000000","#bda05b"],["#f5f5f5","#000000"],["#e9a3c9","#000000"],["#59323C","#ffffff"],["#66c2a5","#000000"],["#f6e8c3","#000000"],["#606060","#f0f0f0"],["#8c510a","#ffffff"],["#80cdc1","#000000"],["#542788","#ffffff"],["#FB8AFE","#343434"],["#003c30","#ffffff"],["#e6f598","#000000"],["#c7eae5","#000000"],["#000000","#f0f0f0"],["#C3FF0E","#343434"]];OVERFLOW_SYMBOLS=["asterisk","floral","snowflake","fourDiamond","spade","club","heart","diamond","queen","rook","pawn","atom"];var BASE_CSS="padding: 2px; margin:2px; line-height: 1.8em;";var META_STYLE=BASE_CSS+"font-size:0.9em; color: #cdcdcd; padding-left:30px;";function TransportConsole(options){options=options||{};this.groupsEnabled=options.groupsEnabled;this.groupsDisabled=options.groupsDisabled;this.showStackTrace=options.showStackTrace!==undefined?options.showStackTrace:false;this.addLineBreak=options.addLineBreak!==undefined?options.addLineBreak:false;this.showMeta=options.showMeta!==undefined?options.showMeta:true;this.showColors=options.showColors===undefined?true:options.showColor;this._foundColors=[];this._colorDict={error:BASE_CSS+"background: #ff0000; color: #ffffff; font-style: bold; border: 4px solid #cc0000;",warn:BASE_CSS+"padding: 2px; background: #ffff00; color: #343434; font-style: bold; border: 4px solid #cccc00;"};this.curSymbolIndex=0;return this}TransportConsole.prototype.getColor=function getColor(group){var color="";var baseColor="";var curSymbol;var cssString="";group=group.split(":")[0];if(this._colorDict[group]){return this._colorDict[group]}if(this._foundColors.length>=GROUP_COLORS.length){color=GROUP_COLORS[this._foundColors.length%GROUP_COLORS.length];baseColor=color;cssString+="font-style: italic;"}else{color=GROUP_COLORS[this._foundColors.length]}var borderColor=color[2];if(!color[2]){borderColor="#";for(var i=1;i<color[0].length;i++){borderColor+=Math.max(0,parseInt(color[0][i],16)-2).toString(16)}}cssString+=BASE_CSS+"background: "+color[0]+";"+"border: 1px solid "+borderColor+";"+"color: "+color[1]+";";this._foundColors.push(color);this._colorDict[group]=cssString;return cssString};TransportConsole.prototype.name="Console";TransportConsole.prototype.log=function transportConsoleLog(loggedObject){var consoleMessage="";if(this.showColors){consoleMessage+="%c"}consoleMessage+="[ "+loggedObject.group+" "+" ] 	";consoleMessage+=loggedObject.message+" 	";if(this.addLineBreak){consoleMessage+="\n"}var toLogArray=[];toLogArray.push(consoleMessage);if(this.showColors){toLogArray.push(this.getColor(loggedObject.group))}toLogArray=toLogArray.concat(loggedObject.originalArgs);console.log.apply(console,toLogArray);var metaConsoleMessage="";var metaLogArray=[];if(this.showMeta){if(this.showColors){metaConsoleMessage+="%c"}metaConsoleMessage+=(new Date).toJSON()+" 	 	 ";metaConsoleMessage+="caller: "+loggedObject.meta.caller+" 	 	 ";if(loggedObject.meta.file&&loggedObject.meta.line){metaConsoleMessage+=loggedObject.meta.file+":"+loggedObject.meta.line+":"+loggedObject.meta.column+""}}if(this.showStackTrace&&loggedObject.meta.trace){metaConsoleMessage+="\n"+"(Stack Trace)"+"\n";for(i=0;i<loggedObject.meta.trace.length;i++){metaConsoleMessage+="	"+loggedObject.meta.trace[i]+"\n"}}if(this.showMeta&&this.showColors){metaLogArray.push(metaConsoleMessage);metaLogArray.push(META_STYLE)}if(metaLogArray.length>0){console.log.apply(console,metaLogArray)}return this};module.exports=TransportConsole},{"../styles":3,"../symbols":4}],7:[function(requirejs,module,exports){function TransportHistory(options){options=options||{};this.groupsEnabled=options.groupsEnabled;this.groupsDisabled=options.groupsDisabled;this.storeEverything=false;if(options.storeEverything===true){this.storeEverything=true;this.groupsEnabled=true}this.historySize=options.historySize!==undefined?options.historySize:200;this.history={};return this}TransportHistory.prototype.name="History";TransportHistory.prototype.log=function transportHistoryLog(loggedObject){var group=loggedObject.group.split(":")[0];if(this.history[group]===undefined){this.history[group]=[]}this.history[group].push(loggedObject);if(this.historySize>0&&this.history[group].length>this.historySize){this.history[group].shift()}return this};module.exports=TransportHistory},{}],8:[function(requirejs,module,exports){function Transports(){this._transports={};this._transportCount={};return this}Transports.prototype.get=function get(transportName){var returnedTransportObjects=new Array;for(var key in this._transports){if(key.toLowerCase().indexOf(transportName.toLowerCase())>-1){returnedTransportObjects.push(this._transports[key])}}returnedTransportObjects.property=function transportProperty(keyOrObject,value){var i=0;var len=this.length;if(typeof keyOrObject==="string"&&value===undefined){var vals=[];for(i=0;i<len;i++){vals.push(this[i][keyOrObject])}return vals}else if(typeof keyOrObject==="string"&&value!==undefined){for(i=0;i<len;i++){this[i][keyOrObject]=value}}else if(typeof keyOrObject==="object"){for(i=0;i<len;i++){for(var keyName in keyOrObject){this[i][keyName]=keyOrObject[keyName]}}}return this};return returnedTransportObjects};Transports.prototype.add=function add(transport){if(this._transportCount[transport.name]===undefined){this._transportCount[transport.name]=1;this._transports[transport.name]=transport}else{this._transportCount[transport.name]+=1;this._transports[transport.name+""+(this._transportCount[transport.name]-1)]=transport}return this};Transports.prototype.remove=function remove(transportName,index){transportName=transportName;if(transportName.name){transportName=transportName.name}for(var key in this._transports){if(index!==undefined){if(transportName+""+index===key){delete this._transports[key]}}else{if(key.indexOf(transportName)>-1){delete this._transports[key]}}}return this};Transports.prototype.empty=function empty(){for(var key in this._transports){delete this._transports[key]}return this};module.exports=Transports},{}],9:[function(requirejs,module,exports){module.exports.Console=requirejs("./Console");module.exports.History=requirejs("./History")},{"./Console":6,"./History":7}],10:[function(requirejs,module,exports){if(typeof Object.create==="function"){module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}})}}else{module.exports=function inherits(ctor,superCtor){ctor.super_=superCtor;var TempCtor=function(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor;ctor.prototype.constructor=ctor}}},{}],11:[function(requirejs,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}if(canPost){var queue=[];window.addEventListener("message",function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}],12:[function(requirejs,module,exports){module.exports=function isBuffer(arg){return arg&&typeof arg==="object"&&typeof arg.copy==="function"&&typeof arg.fill==="function"&&typeof arg.readUInt8==="function"}},{}],13:[function(requirejs,module,exports){(function(process,global){var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){var objects=[];for(var i=0;i<arguments.length;i++){objects.push(inspect(arguments[i]))}return objects.join(" ")}var i=1;var args=arguments;var len=args.length;var str=String(f).replace(formatRegExp,function(x){if(x==="%%")return"%";if(i>=len)return x;switch(x){case"%s":return String(args[i++]);case"%d":return Number(args[i++]);case"%j":try{return JSON.stringify(args[i++])}catch(_){return"[Circular]"}default:return x}});for(var x=args[i];i<len;x=args[++i]){if(isNull(x)||!isObject(x)){str+=" "+x}else{str+=" "+inspect(x)}}return str};exports.deprecate=function(fn,msg){if(isUndefined(global.process)){return function(){return exports.deprecate(fn,msg).apply(this,arguments)}}if(process.noDeprecation===true){return fn}var warned=false;function deprecated(){if(!warned){if(process.throwDeprecation){throw new Error(msg)}else if(process.traceDeprecation){console.trace(msg)}else{console.error(msg)}warned=true}return fn.apply(this,arguments)}return deprecated};var debugs={};var debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron))debugEnviron=process.env.NODE_DEBUG||"";set=set.toUpperCase();if(!debugs[set]){if(new RegExp("\\b"+set+"\\b","i").test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error("%s %d: %s",set,pid,msg)}}else{debugs[set]=function(){}}}return debugs[set]};function inspect(obj,opts){var ctx={seen:[],stylize:stylizeNoColor};if(arguments.length>=3)ctx.depth=arguments[2];if(arguments.length>=4)ctx.colors=arguments[3];if(isBoolean(opts)){ctx.showHidden=opts}else if(opts){exports._extend(ctx,opts)}if(isUndefined(ctx.showHidden))ctx.showHidden=false;if(isUndefined(ctx.depth))ctx.depth=2;if(isUndefined(ctx.colors))ctx.colors=false;if(isUndefined(ctx.customInspect))ctx.customInspect=true;if(ctx.colors)ctx.stylize=stylizeWithColor;return formatValue(ctx,obj,ctx.depth)}exports.inspect=inspect;inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]};inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"};function stylizeWithColor(str,styleType){var style=inspect.styles[styleType];if(style){return"["+inspect.colors[style][0]+"m"+str+"["+inspect.colors[style][1]+"m"}else{return str}}function stylizeNoColor(str,styleType){return str}function arrayToHash(array){var hash={};array.forEach(function(val,idx){hash[val]=true});return hash}function formatValue(ctx,value,recurseTimes){if(ctx.customInspect&&value&&isFunction(value.inspect)&&value.inspect!==exports.inspect&&!(value.constructor&&value.constructor.prototype===value)){var ret=value.inspect(recurseTimes,ctx);if(!isString(ret)){ret=formatValue(ctx,ret,recurseTimes)}return ret}var primitive=formatPrimitive(ctx,value);if(primitive){return primitive}var keys=Object.keys(value);var visibleKeys=arrayToHash(keys);if(ctx.showHidden){keys=Object.getOwnPropertyNames(value)}if(isError(value)&&(keys.indexOf("message")>=0||keys.indexOf("description")>=0)){return formatError(value)}if(keys.length===0){if(isFunction(value)){var name=value.name?": "+value.name:"";return ctx.stylize("[Function"+name+"]","special")}if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}if(isDate(value)){return ctx.stylize(Date.prototype.toString.call(value),"date")}if(isError(value)){return formatError(value)}}var base="",array=false,braces=["{","}"];if(isArray(value)){array=true;braces=["[","]"]}if(isFunction(value)){var n=value.name?": "+value.name:"";base=" [Function"+n+"]"}if(isRegExp(value)){base=" "+RegExp.prototype.toString.call(value)}if(isDate(value)){base=" "+Date.prototype.toUTCString.call(value)}if(isError(value)){base=" "+formatError(value)}if(keys.length===0&&(!array||value.length==0)){return braces[0]+base+braces[1]}if(recurseTimes<0){if(isRegExp(value)){return ctx.stylize(RegExp.prototype.toString.call(value),"regexp")}else{return ctx.stylize("[Object]","special")}}ctx.seen.push(value);var output;if(array){output=formatArray(ctx,value,recurseTimes,visibleKeys,keys)}else{output=keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)})}ctx.seen.pop();return reduceToSingleString(output,base,braces)}function formatPrimitive(ctx,value){if(isUndefined(value))return ctx.stylize("undefined","undefined");if(isString(value)){var simple="'"+JSON.stringify(value).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return ctx.stylize(simple,"string")}if(isNumber(value))return ctx.stylize(""+value,"number");if(isBoolean(value))return ctx.stylize(""+value,"boolean");if(isNull(value))return ctx.stylize("null","null")}function formatError(value){return"["+Error.prototype.toString.call(value)+"]"}function formatArray(ctx,value,recurseTimes,visibleKeys,keys){var output=[];for(var i=0,l=value.length;i<l;++i){if(hasOwnProperty(value,String(i))){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,String(i),true))}else{output.push("")}}keys.forEach(function(key){if(!key.match(/^\d+$/)){output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,true))}});return output}function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){var name,str,desc;desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};if(desc.get){if(desc.set){str=ctx.stylize("[Getter/Setter]","special")}else{str=ctx.stylize("[Getter]","special")}}else{if(desc.set){str=ctx.stylize("[Setter]","special")}}if(!hasOwnProperty(visibleKeys,key)){name="["+key+"]"}if(!str){if(ctx.seen.indexOf(desc.value)<0){if(isNull(recurseTimes)){str=formatValue(ctx,desc.value,null)}else{str=formatValue(ctx,desc.value,recurseTimes-1)}if(str.indexOf("\n")>-1){if(array){str=str.split("\n").map(function(line){return"  "+line}).join("\n").substr(2)}else{str="\n"+str.split("\n").map(function(line){return"   "+line}).join("\n")}}}else{str=ctx.stylize("[Circular]","special")}}if(isUndefined(name)){if(array&&key.match(/^\d+$/)){return str}name=JSON.stringify(""+key);if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){name=name.substr(1,name.length-2);name=ctx.stylize(name,"name")}else{name=name.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");name=ctx.stylize(name,"string")}}return name+": "+str}function reduceToSingleString(output,base,braces){var numLinesEst=0;var length=output.reduce(function(prev,cur){numLinesEst++;if(cur.indexOf("\n")>=0)numLinesEst++;return prev+cur.replace(/\u001b\[\d\d?m/g,"").length+1},0);if(length>60){return braces[0]+(base===""?"":base+"\n ")+" "+output.join(",\n  ")+" "+braces[1]}return braces[0]+base+" "+output.join(", ")+" "+braces[1]}function isArray(ar){return Array.isArray(ar)}exports.isArray=isArray;function isBoolean(arg){return typeof arg==="boolean"}exports.isBoolean=isBoolean;function isNull(arg){return arg===null}exports.isNull=isNull;function isNullOrUndefined(arg){return arg==null}exports.isNullOrUndefined=isNullOrUndefined;function isNumber(arg){return typeof arg==="number"}exports.isNumber=isNumber;function isString(arg){return typeof arg==="string"}exports.isString=isString;function isSymbol(arg){return typeof arg==="symbol"}exports.isSymbol=isSymbol;function isUndefined(arg){return arg===void 0}exports.isUndefined=isUndefined;function isRegExp(re){return isObject(re)&&objectToString(re)==="[object RegExp]"}exports.isRegExp=isRegExp;function isObject(arg){return typeof arg==="object"&&arg!==null}exports.isObject=isObject;function isDate(d){return isObject(d)&&objectToString(d)==="[object Date]"}exports.isDate=isDate;function isError(e){return isObject(e)&&(objectToString(e)==="[object Error]"||e instanceof Error)}exports.isError=isError;function isFunction(arg){return typeof arg==="function"}exports.isFunction=isFunction;function isPrimitive(arg){return arg===null||typeof arg==="boolean"||typeof arg==="number"||typeof arg==="string"||typeof arg==="symbol"||typeof arg==="undefined"}exports.isPrimitive=isPrimitive;exports.isBuffer=requirejs("./support/isBuffer");function objectToString(o){return Object.prototype.toString.call(o)}function pad(n){return n<10?"0"+n.toString(10):n.toString(10)}var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function timestamp(){var d=new Date;var time=[pad(d.getHours()),pad(d.getMinutes()),pad(d.getSeconds())].join(":");return[d.getDate(),months[d.getMonth()],time].join(" ")}exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))};exports.inherits=requirejs("inherits");exports._extend=function(origin,add){if(!add||!isObject(add))return origin;var keys=Object.keys(add);var i=keys.length;while(i--){origin[keys[i]]=add[keys[i]]}return origin};function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}}).call(this,requirejs("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./support/isBuffer":12,_process:11,inherits:10}]},{},[1]);

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
// generate a UUID. RFC4122 compliant http://www.ietf.org/rfc/rfc4122.txt
//  adapted from http://stackoverflow.com/a/2117523
//
// ===========================================================================
define('util/generateUUID',[], function generateUUID(){
    function createUUID(){
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g, function(c) {
                var r = Math.random()*16|0, 
                    v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
        });
        return uuid;
    }
    return createUUID;
});

// ===========================================================================
//
// Timer
//
//      -Returns a {String} of the root URL for the API. For instance,
//          '/api/'
//
// ===========================================================================
define('util/Timer',['util/generateUUID'], function TIMER(generateUUID){
    // TODO: Store all timers globally so we can pause / unpause them all
    //
    // Timer class to enable pause / resume. Uses setTimeout
    //
    function Timer(callback, delay) {
        // takes in a callback {Function} and a delay {Number} (same signature
        // as setTimeout)
        var self = this;

        // how much time remains for this timer
        this.remaining = delay;

        // note : we need to store also a unique ID that won't be changed when
        // the timer is cleared in pause()
        this._id = generateUUID();

        // wrap the callback to remove the timer from the list when it's finished
        this.callback = function wrappedCallback(){
            // remove timer
            delete Timer._timers[self._id];

            // call original callback
            return callback();
        };

        // start the timer when initiall called
        this.resume();

        return this;
    }

    // Object Methods
    // ------------------------------
    Timer.prototype.pause = function TimerPause() {
        // pause the timer by clearing the original timer and keeping track
        // of the remaining time
        window.clearTimeout(this.timerId);

        this.remaining -= new Date() - this.start;

        return this;
    };

    Timer.prototype.resume = function TimerResume() {
        // resume (or start) the timer, passing in the callback and however
        // much time is remaning (in the case of the initial call, remaining
        // will equal the delay)
        this.start = new Date();

        // store the ID setTimeout returns so we can clear it in pause
        this.timerId = window.setTimeout(this.callback, this.remaining);
        
        // Keep track of timers 
        Timer._timers[this._id] = this;

        return this;
    };

    // Timer class properties and methods
    // ------------------------------
    // Keep track of all timers
    Timer._timers = {};
    Timer.pauseAll = function pauseAll(){
        // Pause all timers
        _.each(Timer._timers, function(timer, key){ timer.pause(); });
        return Timer;
    };

    Timer.resumeAll = function resumeAll(){
        // Resumse all timers
        _.each(Timer._timers, function(timer, key){ timer.resume(); });
        return Timer;
    };

    return Timer;
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

            'tab',
            'shift+tab',

            'shift+up',
            'shift+down',

            'shift+i'
        ];

        var handleKeys = function handleKeys(){
            _.each(keys, function setupKeyHandler(key){
                //Site wide binding
                jwerty.key(key, function jwertyKeyHandler(e){
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
// ===========================================================================
define( 'util/API_URL',[], function API_ROOT(){
    var API_URL = '/api/';

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
        // UTIL
        // ------------------------------
        var unsetCookie = function(){
            document.cookie = 'eoagame=true' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };
        var setCookie = function(){
            document.cookie = 'eoagame=true';
        };

        // APP USER
        // ------------------------------
        // Define the app user model. Similar to user model, but a bit different
        var AppUser = Backbone.Model.extend({
            defaults: {
                username: null,
                
                // keep track if the user has been fetched from the server
                isLoggedIn: false,

                // how many games were played?
                numGames: 0
            },
        
            url: API_URL + 'user/',

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/AppUser', 
                    'User:initialize: New app user created');

                // When model comes back from server, if there's no error
                this.on('sync', function(model, res){
                    if(!res.error && res.username){
                        // LOGGED IN
                        // ----------
                        setCookie();
                        logger.log('models/AppUser', 
                            'sync: no error, setting properties for model: %O | res: %O',
                            self.cid,
                            res);

                        var newProps = {
                            error: false,
                            isLoggedIn: true
                        };

                        self.set(newProps);
                    } else {
                        // NOT LOGGED IN
                        // ----------
                        logger.log('models/AppUser', 'model synced, not logged in');
                        unsetCookie();
                    }
                });

                // Try to fetch from server immediately. This ALSO immediately
                // tries to fetch friends
                this.fetch({
                    success: function(res){ 
                        // Check if there's an error (e.g., appUser isn't authed)
                        //
                        if(res.attributes.error){
                            // NOT LOGGED IN
                            // ----------
                            logger.log('models/AppUser',
                                'fetch(): appUser not logged in');
                            unsetCookie();
                            self.set({isLoggedIn: false});

                            self.trigger('initialFetchFromServer');

                            return false;
                        } else {
                            // LOGGED IN
                            // ----------
                            // no error, remove if there was an exisiting error
                            setCookie();
                            self.unset('error');
                            self.set({isLoggedIn: true});

                            self.trigger('initialFetchFromServer');
                        }
                        return self;
                    },

                    error: function(){ 
                        logger.log('error:models:AppUser', 
                            'fetch(): unable to get model from server');

                        // unset cookie
                        unsetCookie();
                        //// Actual code
                        //self.set({isLoggedIn: false});

                        self.set({isLoggedIn: true});

                        self.trigger('initialFetchFromServer');

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
        var regionDevTools = new Backbone.Marionette.Region({
            el: '#region-dev-tools'
        });

        // user login / profile
        var regionAuth = new Backbone.Marionette.Region({
            el: '#region-auth'
        });
        app.addRegions({
            'regionMain': regionMain,
            'regionDevTools': regionDevTools,
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

/**
 * Backbone localStorage Adapter
 * Version 1.1.7
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
(function (root, factory) {
   if (typeof exports === 'object' && typeof requirejs === 'function') {
     module.exports = factory(requirejs("lodash"), requirejs("backbone"));
   } else if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define('localstorage',["lodash","backbone"], function(_, Backbone) {
        // Use global variables if the locals are undefined.
        return factory(_ || root._, Backbone || root.Backbone);
      });
   } else {
      // RequireJS isn't being used. Assume lodash and backbone are loaded in <script> tags
      factory(_, Backbone);
   }
}(this, function(_, Backbone) {
// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
Backbone.LocalStorage = window.Store = function(name) {
  if( !this.localStorage ) {
    throw "Backbone.localStorage: Environment does not support localStorage."
  }
  this.name = name;
  var store = this.localStorage().getItem(this.name);
  this.records = (store && store.split(",")) || [];
};

_.extend(Backbone.LocalStorage.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    this.localStorage().setItem(this.name, this.records.join(","));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) {
      model.id = guid();
      model.set(model.idAttribute, model.id);
    }
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return this.find(model);
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(this.records, model.id.toString()))
      this.records.push(model.id.toString()); this.save();
    return this.find(model);
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return this.jsonData(this.localStorage().getItem(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    // Lodash removed _#chain in v1.0.0-rc.1
    return (_.chain || _)(this.records)
      .map(function(id){
        return this.jsonData(this.localStorage().getItem(this.name+"-"+id));
      }, this)
      .compact()
      .value();
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    if (model.isNew())
      return false
    this.localStorage().removeItem(this.name+"-"+model.id);
    this.records = _.reject(this.records, function(id){
      return id === model.id.toString();
    });
    this.save();
    return model;
  },

  localStorage: function() {
    return localStorage;
  },

  // fix for "illegal access" error on Android when JSON.parse is passed null
  jsonData: function (data) {
      return data && JSON.parse(data);
  },

  // Clear localStorage for specific collection.
  _clear: function() {
    var local = this.localStorage(),
      itemRe = new RegExp("^" + this.name + "-");

    // Remove id-tracking item (e.g., "foo").
    local.removeItem(this.name);

    // Lodash removed _#chain in v1.0.0-rc.1
    // Match all data items (e.g., "foo-ID") and remove.
    (_.chain || _)(local).keys()
      .filter(function (k) { return itemRe.test(k); })
      .each(function (k) { local.removeItem(k); });

    this.records.length = 0;
  },

  // Size of localStorage.
  _storageSize: function() {
    return this.localStorage().length;
  }

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprecated, use Backbone.LocalStorage.sync instead
Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
  var store = model.localStorage || model.collection.localStorage;

  var resp, errorMessage,
    // If $ and $ is having Deferred - use it.
    syncDfd = Backbone.$ && Backbone.$.Deferred && Backbone.$.Deferred();

  try {

    switch (method) {
      case "read":
        resp = model.id != undefined ? store.find(model) : store.findAll();
        break;
      case "create":
        resp = store.create(model);
        break;
      case "update":
        resp = store.update(model);
        break;
      case "delete":
        resp = store.destroy(model);
        break;
    }

  } catch(error) {
    if (error.code === 22 && store._storageSize() === 0)
      errorMessage = "Private browsing is unsupported";
    else
      errorMessage = error.message;
  }

  if (resp) {
    if (options && options.success) {
      if (Backbone.VERSION === "0.9.10") {
        options.success(model, resp, options);
      } else {
        options.success(resp);
      }
    }
    if (syncDfd) {
      syncDfd.resolve(resp);
    }

  } else {
    errorMessage = errorMessage ? errorMessage
                                : "Record Not Found";

    if (options && options.error)
      if (Backbone.VERSION === "0.9.10") {
        options.error(model, errorMessage, options);
      } else {
        options.error(errorMessage);
      }

    if (syncDfd)
      syncDfd.reject(errorMessage);
  }

  // add compatibility with $.ajax
  // always execute callback for success and error
  if (options && options.complete) options.complete(resp);

  return syncDfd && syncDfd.promise();
};

Backbone.ajaxSync = Backbone.sync;

Backbone.getSyncMethod = function(model) {
  if(model.localStorage || (model.collection && model.collection.localStorage)) {
    return Backbone.localSync;
  }

  return Backbone.ajaxSync;
};

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.sync = function(method, model, options) {
  return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
};

return Backbone.LocalStorage;
}));

(function(){var async={};var root,previous_async;root=this;if(root!=null){previous_async=root.async}async.noConflict=function(){root.async=previous_async;return async};function only_once(fn){var called=false;return function(){if(called)throw new Error("Callback was already called.");called=true;fn.apply(root,arguments)}}var _each=function(arr,iterator){if(arr.forEach){return arr.forEach(iterator)}for(var i=0;i<arr.length;i+=1){iterator(arr[i],i,arr)}};var _map=function(arr,iterator){if(arr.map){return arr.map(iterator)}var results=[];_each(arr,function(x,i,a){results.push(iterator(x,i,a))});return results};var _reduce=function(arr,iterator,memo){if(arr.reduce){return arr.reduce(iterator,memo)}_each(arr,function(x,i,a){memo=iterator(memo,x,i,a)});return memo};var _keys=function(obj){if(Object.keys){return Object.keys(obj)}var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k)}}return keys};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){async.nextTick=function(fn){setImmediate(fn)};async.setImmediate=async.nextTick}else{async.nextTick=function(fn){setTimeout(fn,0)};async.setImmediate=async.nextTick}}else{async.nextTick=process.nextTick;if(typeof setImmediate!=="undefined"){async.setImmediate=setImmediate}else{async.setImmediate=async.nextTick}}async.each=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;_each(arr,function(x){iterator(x,only_once(function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}}}))})};async.forEach=async.each;async.eachSeries=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;var iterate=function(){iterator(arr[completed],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}else{iterate()}}})};iterate()};async.forEachSeries=async.eachSeries;async.eachLimit=function(arr,limit,iterator,callback){var fn=_eachLimit(limit);fn.apply(null,[arr,iterator,callback])};async.forEachLimit=async.eachLimit;var _eachLimit=function(limit){return function(arr,iterator,callback){callback=callback||function(){};if(!arr.length||limit<=0){return callback()}var completed=0;var started=0;var running=0;(function replenish(){if(completed>=arr.length){return callback()}while(running<limit&&started<arr.length){started+=1;running+=1;iterator(arr[started-1],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;running-=1;if(completed>=arr.length){callback()}else{replenish()}}})}})()}};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.each].concat(args))}};var doParallelLimit=function(limit,fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[_eachLimit(limit)].concat(args))}};var doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.eachSeries].concat(args))}};var _asyncMap=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v;callback(err)})},function(err){callback(err,results)})};async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=function(arr,limit,iterator,callback){return _mapLimit(limit)(arr,iterator,callback)};var _mapLimit=function(limit){return doParallelLimit(limit,_asyncMap)};async.reduce=function(arr,memo,iterator,callback){async.eachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v;callback(err)})},function(err){callback(err,memo)})};async.inject=async.reduce;async.foldl=async.reduce;async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x}).reverse();async.reduce(reversed,memo,iterator,callback)};async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.filter=doParallel(_filter);async.filterSeries=doSeries(_filter);async.select=async.filter;async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(!v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.reject=doParallel(_reject);async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){if(result){main_callback(x);main_callback=function(){}}else{callback()}})},function(err){main_callback()})};async.detect=doParallel(_detect);async.detectSeries=doSeries(_detect);async.some=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(v){main_callback(true);main_callback=function(){}}callback()})},function(err){main_callback(false)})};async.any=async.some;async.every=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(!v){main_callback(false);main_callback=function(){}}callback()})},function(err){main_callback(true)})};async.all=async.every;async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err)}else{callback(null,{value:x,criteria:criteria})}})},function(err,results){if(err){return callback(err)}else{var fn=function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0};callback(null,_map(results.sort(fn),function(x){return x.value}))}})};async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);if(!keys.length){return callback(null)}var results={};var listeners=[];var addListener=function(fn){listeners.unshift(fn)};var removeListener=function(fn){for(var i=0;i<listeners.length;i+=1){if(listeners[i]===fn){listeners.splice(i,1);return}}};var taskComplete=function(){_each(listeners.slice(0),function(fn){fn()})};addListener(function(){if(_keys(results).length===keys.length){callback(null,results);callback=function(){}}});_each(keys,function(k){var task=tasks[k]instanceof Function?[tasks[k]]:tasks[k];var taskCallback=function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}if(err){var safeResults={};_each(_keys(results),function(rkey){safeResults[rkey]=results[rkey]});safeResults[k]=args;callback(err,safeResults);callback=function(){}}else{results[k]=args;async.setImmediate(taskComplete)}};var requirejss=task.slice(0,Math.abs(task.length-1))||[];var ready=function(){return _reduce(requirejss,function(a,x){return a&&results.hasOwnProperty(x)},true)&&!results.hasOwnProperty(k)};if(ready()){task[task.length-1](taskCallback,results)}else{var listener=function(){if(ready()){removeListener(listener);task[task.length-1](taskCallback,results)}};addListener(listener)}})};async.waterfall=function(tasks,callback){callback=callback||function(){};if(tasks.constructor!==Array){var err=new Error("First argument to waterfall must be an array of functions");return callback(err)}if(!tasks.length){return callback()}var wrapIterator=function(iterator){return function(err){if(err){callback.apply(null,arguments);callback=function(){}}else{var args=Array.prototype.slice.call(arguments,1);var next=iterator.next();if(next){args.push(wrapIterator(next))}else{args.push(callback)}async.setImmediate(function(){iterator.apply(null,args)})}}};wrapIterator(async.iterator(tasks))()};var _parallel=function(eachfn,tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){eachfn.map(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};eachfn.each(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.parallel=function(tasks,callback){_parallel({map:async.map,each:async.each},tasks,callback)};async.parallelLimit=function(tasks,limit,callback){_parallel({map:_mapLimit(limit),each:_eachLimit(limit)},tasks,callback)};async.series=function(tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){async.mapSeries(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};async.eachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){if(tasks.length){tasks[index].apply(null,arguments)}return fn.next()};fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null};return fn};return makeCallback(0)};async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)))}};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]);cb(err)})},function(err){callback(err,r)})};async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){if(test()){iterator(function(err){if(err){return callback(err)}async.whilst(test,iterator,callback)})}else{callback()}};async.doWhilst=function(iterator,test,callback){iterator(function(err){if(err){return callback(err)}if(test()){async.doWhilst(iterator,test,callback)}else{callback()}})};async.until=function(test,iterator,callback){if(!test()){iterator(function(err){if(err){return callback(err)}async.until(test,iterator,callback)})}else{callback()}};async.doUntil=function(iterator,test,callback){iterator(function(err){if(err){return callback(err)}if(!test()){async.doUntil(iterator,test,callback)}else{callback()}})};async.queue=function(worker,concurrency){if(concurrency===undefined){concurrency=1}function _insert(q,data,pos,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){var item={data:task,callback:typeof callback==="function"?callback:null};if(pos){q.tasks.unshift(item)}else{q.tasks.push(item)}if(q.saturated&&q.tasks.length===concurrency){q.saturated()}async.setImmediate(q.process)})}var workers=0;var q={tasks:[],concurrency:concurrency,saturated:null,empty:null,drain:null,push:function(data,callback){_insert(q,data,false,callback)},unshift:function(data,callback){_insert(q,data,true,callback)},process:function(){if(workers<q.concurrency&&q.tasks.length){var task=q.tasks.shift();if(q.empty&&q.tasks.length===0){q.empty()}workers+=1;var next=function(){workers-=1;if(task.callback){task.callback.apply(task,arguments)}if(q.drain&&q.tasks.length+workers===0){q.drain()}q.process()};var cb=only_once(next);worker(task.data,cb)}},length:function(){return q.tasks.length},running:function(){return workers}};return q};async.cargo=function(worker,payload){var working=false,tasks=[];var cargo={tasks:tasks,payload:payload,saturated:null,empty:null,drain:null,push:function(data,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){tasks.push({data:task,callback:typeof callback==="function"?callback:null});if(cargo.saturated&&tasks.length===payload){cargo.saturated()}});async.setImmediate(cargo.process)},process:function process(){if(working)return;if(tasks.length===0){if(cargo.drain)cargo.drain();return}var ts=typeof payload==="number"?tasks.splice(0,payload):tasks.splice(0);var ds=_map(ts,function(task){return task.data});if(cargo.empty)cargo.empty();working=true;worker(ds,function(){working=false;var args=arguments;_each(ts,function(data){if(data.callback){data.callback.apply(null,args)}});process()})},length:function(){return tasks.length},running:function(){return working}};return cargo};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);if(typeof console!=="undefined"){if(err){if(console.error){console.error(err)}}else if(console[name]){_each(args,function(x){console[name](x)})}}}]))}};async.log=_console_fn("log");async.dir=_console_fn("dir");async.memoize=function(fn,hasher){var memo={};var queues={};hasher=hasher||function(x){return x};var memoized=function(){var args=Array.prototype.slice.call(arguments);var callback=args.pop();var key=hasher.apply(null,args);if(key in memo){callback.apply(null,memo[key])}else if(key in queues){queues[key].push(callback)}else{queues[key]=[callback];fn.apply(null,args.concat([function(){memo[key]=arguments;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,arguments)}}]))}};memoized.memo=memo;memoized.unmemoized=fn;return memoized};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments)}};async.times=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.map(counter,iterator,callback)};async.timesSeries=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.mapSeries(counter,iterator,callback)};async.compose=function(){var fns=Array.prototype.reverse.call(arguments);return function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([function(){var err=arguments[0];var nextargs=Array.prototype.slice.call(arguments,1);cb(err,nextargs)}]))},function(err,results){callback.apply(that,[err].concat(results))})}};var _applyEach=function(eachfn,fns){var go=function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();return eachfn(fns,function(fn,cb){fn.apply(that,args.concat([cb]))},callback)};if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);return go.apply(this,args)}else{return go}};async.applyEach=doParallel(_applyEach);async.applyEachSeries=doSeries(_applyEach);async.forever=function(fn,callback){function next(err){if(err){if(callback){return callback(err)}throw err}fn(next)}next()};if(typeof define!=="undefined"&&define.amd){define('async',[],function(){return async})}else if(typeof module!=="undefined"&&module.exports){module.exports=async}else{root.async=async}})();

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
        defaults: function(){ 
            return {
                // timer related
                //---------------------------
                timerLimit: 15, // (seconds)
                // specifies how much to multiply the timer ticks by
                //  higher values speed it up (haste), lower values slow it down
                timerFactor: 1,

                // ======================
                //
                // Stats
                //
                // ======================
                health: 100,
                maxHealth: 100,

                //Combat stats
                //---------------------------
                // Physcial
                armor: 0,
                attack: 0,

                magicResist: 0,
                magicPower: 0,

                //Regen
                //---------------------------
                //How many points to regen per 'tick'
                regenHealth: 0,

                // element modifiers
                //---------------------------
                air: 0,
                dark: 0,
                earth: 0,
                fire: 0,
                light: 0,
                water: 0,

                //Resists
                //---------------------------
                resistAir: 0,
                resistDark: 0,
                resistEarth: 0,
                resistFire: 0,
                resistLight: 0,
                resistWater: 0,

                // Other modifiers
                // --------------------------
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
                chanceAoe: 0
            };
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
//      TODO: Add an ability rating - a sort of 'score' for how powerful the
//      ability is(?)
//
//      TODO::::::::::: Implement buff effect tracking, similar to entity's 
//      method
//
// ===========================================================================
define(
    'models/Ability',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'util/Timer',
        'util/generateUUID'
    ], function AbilityModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Timer,
        generateUUID
    ){

    var Ability = Backbone.Model.extend({
        defaults: function(){
            return {
                name: 'Magic Missle',

                // ID used to identify the ability as well as the name of the
                // icon file
                id: 'magic-missle',

                // spell type (for labels)
                spellTypes: [], // or heal, debuff, buff, util, etc

                // Keep track of buffs / effects that affect the ability object
                activeEffects: [],

                // ID of the effect element
                effectId: 'placeHolder',
                // sprite for icon itself
                sprite: '',

                description: 'PLACEHOLDER TEXT :::::::::::',

                // How long must the player wait until they can use this ability
                // This SHOULD always be greater than or equal to than the timeCost
                //  (e.g., if you need to wait 3 seconds to cast it but the cost is 4
                //  seconds, you'll have negative time)
                //
                //  This property determines if the entity can cast the spell or
                //  not. If the castTime is >= the current tick counter,
                //  entity can cast
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
                timeCost: null, // By default, will be set to castTime

                // castDuration - measured in seconds
                // how long the spell takes to cast - how long between the source
                // entity using the spell and the target entity receiving the effect
                castDuration: 0.5,

                // How long (in seconds) the user must wait before using the
                // ability again
                cooldown: 0.1,

                // validTargets specifies the entities the ability can be
                // used on. for now, only 'enemy' or 'player' are valid targets. 
                validTargets: ['enemy'],
            
                // type / subtype
                // --------------------------
                // type could be either 'magic' or 'physical'
                //  Can be either a {string}, representing 100% of the type, or
                //  an object with keys consisting of the types (e.g., 
                //      {physical: 0.7, magic: 0.3}
                //
                type: { magic: 1 },
                // This is also valid: (will be transformed to an object)
                // type: 'magic', 

                // TODO: allow multiple subtypes and percentages for sub types
                //
                // subtypes are:
                //  none (e.g., purely physical), fire, light, dark, earth, air, water
                //  Can be either a {string}, representing 100% of the element, or
                //  an object with keys consisting of the element types along
                //  with a number that combined will add to 1.0
                element: {fire: 1},
                // This is also valid: (will be transformed to an object)
                // element: 'fire'

                // Bonus from entity's attack and / or magicPower
                //  (e.g., an ability may do 10 base damage + 50% of entity's attack)
                // --------------------------
                // values are from 0 to 1
                attackBonusPercent: 0,
                magicPowerBonusPercent: 0,

                // Damage
                // --------------------------
                // Base damage
                damage: undefined,
                // could be either 'source' or 'target', will damage the entities
                // that are either the source or target of the used ability
                damageTarget: 'target',

                // DOT
                // ----------------------
                // Damage Over Time (DOT) properties
                // ticks: number of times to do the effect
                ticks: 0,
                // time between each tick (seconds)
                tickDuration: 1,

                // Heal
                // --------------------------
                // Base Heal
                heal: undefined,
                // could be either 'source' or 'target', will heal the entities
                // that are either the source or target of the used ability
                //      (source would be a self heal, target heals other)
                healTarget: 'target',

                // Buffs
                // --------------------------
                // This is an example static buff. Will temporarily boost an 
                // entity's stats for the passed in duration
                buffEffects: null, // Will look like { strength : -10, agility: 10 }
                buffDuration: null, // in seconds

                buffCanStack: false, // can this buff stack with itself?

                // used to keep track of start date of NON stackable buffs
                _buffStartDate: null, 

                // can be either 'target' (allows player to target an entity,
                //  including self) or 'self' (only works on self)
                buffTarget: 'target',

                visualEffect: function(options){
                    //TODO: figure this out...should have some way of doing an
                    //effect, but should it live here?
                },

                // Meta
                // --------------------------
                // meta is an arbitrary object containing various properties,
                // e.g., used for sorting abilities in character create
                meta: {},

                // keep track of last cast time (for cooldown)
                _lastUseTime: null
            };
        },
        
        url: function getURL(){
            var url = API_URL + 'abilities/' + this.get('id');
            return url;
        },

        initialize: function gameInitialize(options){
            // TODO: Restructure, get abilities from server.
            // TODO: Allow ability to be modified. Store base stats(?) e.g., 
            //  duration, cast time, etc.
            //
            var self = this;
            options = options || {};
            logger.log('models/Ability', 
                'initialize() called : attributes: %O : options: %O',
                this.attributes, options);

            // if an effect attributes was passed in, updat the method
            if(options.effect){ this.effect = options.effect; }

            // set timeCost if it is not passed in
            if(this.attributes.timeCost === null){
                this.set({
                    timeCost: this.get('castTime')
                }, { silent: true });
            }


            // set type and element
            var newType={}; 
            if(typeof this.attributes.type === 'string'){
                newType[this.attributes.type] = 1;
                this.set({ type: newType }, {silent: true});
            }
            
            var newElement={}; 
            if(typeof this.attributes.element === 'string'){
                newElement[this.attributes.element] = 1;
                this.set({ element: newElement }, {silent: true});
            }

            // if the model is updated and a new effect attribute is set,
            // update the effect method
            this.on('change:effect', function(model, effect){
                this.effect = effect;
            });

            return this;
        },

        getCastDuration: function getDelay(options){
            // returns, in seconds, the delay before ability should take effect
            // TODO: lower delay if the target has some sort of delay reducting
            // stats
            //
            return this.get('castDuration') * 1000;
        },

        canBeUsed: function canBeUsed(){
            // returns a {boolean} indicating if the ability can be used
            var canUse = true;

            if(this.get('cooldown')){
                // If there's a cooldown, and the difference between now and
                // the _lastUseTime is less than the cooldown, it cannot be
                // used yet
                if(new Date() - this.get('_lastUseTime') < (this.get('cooldown') * 1000)){
                    canUse = false;
                }
            } 

            return canUse;
        },

        // ------------------------------
        // Default ability effect (NOTE: can be overriden for custom abilities)
        // ------------------------------
        effect: function(options){
            // NOTE: This is the default effect function. If no effect attribute
            // is passed into the model, , it will use this function, which 
            // calculates damage based on model attributes. This function can 
            // be overriden
            //
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
            //  callback: optional callback {Function} 
            //      NOTE: This is the default effect method, so in this case
            //      the callback will be called after each damage / health /
            //      buff section. 
            //
            // The function body may be unique to each effect
            var self = this;

            logger.log('models/Ability', 
                '>> DEFAULT ABILITY USED : this: %O, options: %O', 
                this,
                options);

            // Check if ability can be used
            if(!this.canBeUsed()){
                logger.log('models/Ability', 'cannot cast, cooldown not yet met');
                return false;
            }

            // note: multiply castDuration by 1000 (it's in seconds, we
            // need to get milliseconds)
            var delay = this.getCastDuration(options);

            // keep track of when spell was last cast. Do it immediately (don't
            // wait for the delay before setting time)
            this.set({ _lastUseTime: new Date() });

            // TODO : restructure, break functionality up

            // --------------------------
            // Heal
            // --------------------------
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
            // 
            // TODO: should heal WITH buffeffects still happen? Or should
            // the buff effect itself manage a heal. For now, handle healing
            // in the buff itself (not here, so check that buffEffects is null)
            if(this.get('heal') && !this.get('buffEffects')){
                new Timer(function effectHealDelay(){
                    function takeHeal(){
                        options[self.get('healTarget')].takeHeal({
                            type: self.get('type'),
                            element: self.get('element'),
                            amount: self.get('heal'),
                            sourceAbility: self,
                            target: options.target,
                            source: options.source
                        });
                    }
                    takeHeal();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            new Timer( takeHeal,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            // --------------------------
            // Damage
            // --------------------------
            if(this.get('damage')){
                new Timer(function effectDamageDelay(){
                    function takeDamage(){
                        options[self.get('damageTarget')].takeDamage({
                            type: self.get('type'),
                            element: self.get('element'),
                            amount: self.get('damage'),
                            sourceAbility: self,
                            target: options.target,
                            source: options.source
                        });
                    }
                    takeDamage();

                    // Setup for DoTs
                    var curTick = 0;
                    if(self.get('ticks')){
                        while(curTick < self.get('ticks')){
                            new Timer( takeDamage,
                                (self.get('tickDuration') * 1000) * (curTick + 1) 
                            );
                            curTick += 1;
                        }
                    }

                    if(options.callback){ options.callback(); }
                }, delay);
            }

            // --------------------------
            // Buffs
            // --------------------------
            if(this.get('buffEffects')){

                new Timer(function effectBuff(){
                    // TODO::::: Should the logic be handled there instead of
                    // here? If in entity model, a lot of default logic
                    // has to be handled there. If it's in the ability, can
                    // customzie / tailor it more
                    var targetEntity = options[self.get('buffTarget')];
                    // should the buff timer be reset? This will only be true
                    // if this ability does NOT stack AND is already active
                    var resetTimer = false;

                    if(!self.get('buffCanStack')){
                        // If the buff cannot stack with itself, then check
                        // to see if the effect already exists
                        //
                        if(targetEntity.hasBuffByName(self)){
                            logger.log('models/Ability', 
                                '[x] buff already exists %O : removing and re-adding', self);
                            // remove the buff so we can re-apply it
                            self.removeBuffEffect.call(self, targetEntity, options.source);

                            // remove all ability buff effects
                            if(self.attributes.buffEffects && 
                            self.attributes.buffEffects.abilities && 
                            targetEntity.get('abilities')){
                                logger.log('models/Ability', 'removing all ability buff effects from non-stackable buff');
                                // remove existing ability buff modifiers 
                                _.each(targetEntity.get('abilities').models, function(ability){
                                    // pass in this ability so other abilities can have
                                    // their properties modified 
                                    _.each(ability.get('activeEffects'), function(abilityBuffEffect){
                                        ability.removeBuff.call(
                                            ability,
                                            abilityBuffEffect,
                                            options.source
                                        );
                                    });
                                });
                            }

                            resetTimer = true;
                        }

                        // set the time the buff was applied
                        self.set({ _buffStartDate: new Date() }, { silent: true });
                    }

                    // Check for heals
                    // ------------------
                    if(self.get('heal')){
                        function takeHeal(){
                            options[self.get('healTarget')].takeHeal({
                                type: self.get('type'),
                                element: self.get('element'),
                                amount: self.get('heal'),
                                sourceAbility: self,
                                target: options.target,
                                source: options.source
                            });
                        }
                        takeHeal();
                    }
                    // ------------------
                    // TODO: Check for damage?
                    // ------------------


                    // ------------------
                    // ADD Buff
                    // ------------------
                    // add it to the buff list
                    logger.log('models/Ability', 'adding buff %O', self);

                    // add the buff, which returns a clone of the ability object
                    //  we need to do this so we can track unique stackable
                    //  buff effects and remove the correct buff
                    var buffInstance = targetEntity.addBuff(self, options.source);


                    // Keep track of buff effects on the ability itself
                    var abilityBuffInstances = [];

                    // Add buff /debuff effect to the ability if the buffeffects
                    // contain abilities properties
                    if(self.attributes.buffEffects && 
                    self.attributes.buffEffects.abilities && 
                    targetEntity.get('abilities')){
                        // call addBuff for each of the target entity's abilities
                        _.each(targetEntity.get('abilities').models, function(ability){
                            // pass in this ability so other abilities can have
                            // their properties modified 
                            abilityBuffInstances.push({
                                instance: ability.addBuff.call(ability, self, targetEntity, options.source),
                                ability: ability,
                                targetEntity: targetEntity,
                                source: options.source
                            }); 
                        });
                    }


                    // ------------------
                    // REMOVE Buff
                    // ------------------
                    // TODO: Allow the buffDuration to be modified by the
                    // entity's properties.
                    var buffDuration = self.get('buffDuration') * 1000;

                    if(self._buffCancelTimer && resetTimer){
                        self._buffCancelTimer.pause();
                        self._buffCancelTimer.remaining = buffDuration;
                        self._buffCancelTimer.resume();
                    } else { 
                        // cancel timer does not yet exist, create it
                        self._buffCancelTimer = new Timer(function buffCancelTimer(){
                            // remove effect
                            logger.log('models/Ability', 'removing buff');
                            
                            // if entity is dead, do nothing
                            if(!targetEntity.get('isAlive')){ 
                                logger.log('models/Ability', 
                                    'tried to remove buff, but entity is dead %O',
                                    self);
                                return false; 
                            }

                            // remove the buff
                            self.removeBuffEffect.call(self, 
                                targetEntity, 
                                options.source,
                                buffInstance
                            );

                            // remove each buff instance from the ability
                            _.each(abilityBuffInstances, function removeAbiltiyBuffInstance(options){
                                // remove it
                                options.ability.removeBuff.call(
                                    options.ability, // context
                                    options.instance, // buff instance
                                    options.source // source 
                                );
                            });

                            // remove references
                            abilityBuffInstances.length = 0;

                            if(options.callback){ options.callback(); }

                        }, buffDuration);
                    }
                    
                }, delay);

            }

            // NOTE: this function makes async calls, don't rely on the return
            // value for anything
            return this;
        },

        // ==============================
        // Buff helpers
        // ==============================
        removeBuffEffect: function removeBuffEffect(targetEntity, source, buffInstance){
            // Reset the stats to the pre buff values
            var self = this;

            // if no buff instance was passed in, it means the ability can NOT 
            // stack, so no need to create a unique ID for it
            buffInstance = buffInstance || this;

            //remove buff from entity
            targetEntity.removeBuff.call(targetEntity, buffInstance, source);

            return this;
        },

        // ==============================
        //
        // Buff related
        //
        // ==============================
        hasBuffByName: function hasBuffByName(ability){
            // takes in an ability and returns if the entity already has the
            // buff. NOTE: Use the ability NAME, not an ID. The reason for this 
            // is so that abilities that aren't stackable can't be stacked
            var effects = this.get('activeEffects');
            var i=0, len = effects.length;
            var entityHasBuff = false;

            // find the buff; if it exists, break out of the loop
            for(i=0; i<len; i++){
                if(effects[i].name === ability.name){ 
                    entityHasBuff = true;
                    break;
                }
            }

            logger.log('models/Ability', 'hasBuffByName called : %O', entityHasBuff);
            return entityHasBuff;
        },

        addBuff: function addBuff(sourceAbility, targetEntity, source){
            // Modifies *this* ability's properties based on the properties 
            // defined in `abilities` in `buffEffects` of the passed in ability
            //
            // Takes in a target entity and source entity
            //
            //
            // TODO: Modify based on entity stats?
            //
            var self = this;
            logger.log('models/Ability', 'addBuff(): called : source :%O, this: %O', 
                sourceAbility, this);

            // Add it
            // --------------------------
            var effects = this.get('activeEffects');

            // Clone the passed in ability
            // NOTE: Use a basic backbone model; we only need to keep track of
            // property values, don't need the overhead of all the other methods
            //
            // Futhermore, it shouldn't be thought of as an actual Ability object,
            // it's essentially just a property store to keep track of stat
            // differences
            var abilityBuffInstance = new Backbone.Model( 
                _.extend({}, sourceAbility.attributes) 
            );
            // remove the activeEffects on the instance to avoid recursion
            abilityBuffInstance.set({ activeEffects: null }, { silent: true });

            // if the buff cannot stack, the cid should be the same as original
            if(!sourceAbility.attributes.buffCanStack){
                abilityBuffInstance.cid = sourceAbility.cid;
            }

            // add to the effects array
            effects.push(abilityBuffInstance);
            
            // Update the entity's stats
            // --------------------------
            var updatedStats = {}; // new attributes to set
            // Keep track of the differences between the new value and the old
            // value, used for removing the effect and tracking changes
            var statDifferences = {}; 

            // Add the effect
            var currentStats = this.attributes;

            // stats to affect
            var abilityEffects = abilityBuffInstance.attributes.buffEffects.abilities;

            _.each(abilityEffects, function(val, key){
                // ignore buffEffects key, just as a safety catch
                if(key === 'buffEffects'){ return false; }

                // check for % or absolute value
                if(val > -1 && val < 1){
                    // a percentage
                    updatedStats[key] = currentStats[key] + (currentStats[key] * val);
                } else {
                    // a whole number
                    updatedStats[key] = currentStats[key] + val;
                }

                // keep track of differences
                statDifferences[key] = updatedStats[key] - currentStats[key];
            });

            // update this ability's properties based on the changes described
            // in the passed in ability
            this.set(updatedStats);

            // store the updated differences for removal and tracking
            // (note: this object is pushed to the effects array, so the 
            // reference is updated)
            abilityBuffInstance.set({statDifferences: statDifferences}, { silent: true });

            // update activeEffects and stats
            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: sourceAbility,
                source: source,
                target: targetEntity,
                type: 'add'
            });

            // return the cloned ability
            return abilityBuffInstance;
        },

        removeBuff: function removeBuff(abilityBuffInstance, source){
            // Remove buff effect
            //
            //  Takes in a abilityBuffInstance (the ability instance returned 
            //  in addBuff) and a source entity.
            //      Note: If the ability is NOT stackable, the 
            //      abilityBuffInstance will just be the actual ability object
            //
            //  If found, will remove the effects from the entity
            //
            logger.log('models/Ability', 'removeBuff(): called %O', abilityBuffInstance);
            var effects = this.get('activeEffects');
            var foundAbility = null;

            // remove the FIRST occurence of the targeted ability
            //      abilities are added in order of cast time, so the first
            //      one found is the oldest ability
            for(var i=0, len = effects.length; i<len; i++){
                if(effects[i].cid === abilityBuffInstance.cid){
                    foundAbility = effects.splice(i, 1)[0];
                    break;
                }
            }

            // Update the entity's stats
            // --------------------------
            // Reset the stats with the found ability
            if(foundAbility){
                var updatedStats = {};
                var statDifferences = foundAbility.attributes.statDifferences;

                // Add the effect
                var currentStats = this.attributes;

                _.each(statDifferences, function(difference, key){
                    updatedStats[key] = currentStats[key] - difference;
                });
                this.set(updatedStats);
            }


            logger.log('models/Ability', 'removeBuff(): found it? : %O', !!foundAbility);

            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: abilityBuffInstance,
                source: source,
                target: this,
                type: 'remove'
            });
            return this;
        },

        removeAllBuffs: function removeAllBuffs(){
            // Remove all buffs except class specific buffs
            var activeEffects = this.get('activeEffects');

            // only keep isPermanent buffs
            activeEffects = _.filter(activeEffects, function(effect){
                if(effect.attributes.isPermanent){ return true; }
                else { return false; }
            });

            this.set({ activeEffects: activeEffects });
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

        // DATA config
        dataConfig : {
            maxCastTime: 6,
            maxTimeCost: 6,
            maxDamage: 40,
            maxHeal: 40
        },

        initialize: function(models, options){
            logger.log('collections:Abilities', 'initialize() called with:', {
                models: models,
                options:options
            });
            options = options || {};
        }
    });

    return Abilities;
});

// ===========================================================================
//
// generateName
//
//      -Generates a random name
//
// ===========================================================================
define( 'util/generateName',[], function funcGenerateName(){
    function generateName(){
        var vowels = "aeiouyaeiouaeioea";
        var cons = "bcdfghjklmnpqrstvwxzybcdgklmnprstvwbcdgkpstrkdtr";
        var rndname = []; // final name
        var paircons = "ngrkndstshthphsktrdrbrgrfrclcrst";
        var randomNum = Math.random() * 75 | 0;
        var orig = randomNum;
        var n=1;

        var dlc=false;
        var vwl=false;
        var dbl=false;

        if (randomNum>63) {
            // randomNum is 0 - 75 where 64-75 is cons pair, 
            // 17-63 is cons, 0-16 is vowel
            randomNum=(randomNum-61)*2;	// name can't start with "ng" "nd" or "rk"
            rndname[0]=paircons[randomNum];
            rndname[1]=paircons[randomNum+1];
            n=2;
        } else if (randomNum>16) {
            randomNum -= 17;
            rndname[0] = cons[randomNum];
        } else {
            rndname[0]=vowels[randomNum];
            vwl=true;
        }

        var namlen = 5 + (Math.random() * 5 | 0);

        for(var i=n;i<namlen;i++){
            dlc=false;
            if (vwl){
                //last char was a vowel		
                // so pick a cons or cons pair
                randomNum=Math.random() * 62 | 0;
                if (randomNum>46) {	
                    // pick a cons pair
                    if(i>namlen-3){
                        // last 2 chars in name?
                        // name can only end in cons pair "rk" "st" "sh" "th" "ph" "sk" "nd" or "ng"
                        randomNum=(Math.random() * 7 | 0)*2;
                    } else {	
                        // pick any from the set
                        randomNum=(randomNum-47)*2;
                    }
                    rndname[i]=paircons[randomNum];
                    rndname[i+1]=paircons[randomNum+1];
                    dlc=true;	// flag keeps second letter from being doubled below
                    i+=1;
                } else {	
                    // select a single cons
                    rndname[i]=cons[randomNum];
                }
            } else {		
                // select a vowel
                rndname[i]=vowels[Math.random() * 16 | 0];
            }
            vwl=!vwl;
            if (!dbl && !dlc) {	
                // one chance at double letters in name
                if(!(Math.random() * (i+9) | 0)){
                    // chances decrease towards end of name
                    rndname[i+1]=rndname[i];
                    dbl=true;
                    i+=1;
                }
            }
        }

        // capitalize name
        rndname[0] = rndname[0].toUpperCase();
        rndname = rndname.join('');
        // return it
        return rndname;
    }
    return generateName;
});

// ===========================================================================
//
//  Entity
//
//      This model manages an entity - a creature in the game
//
//      TODO: Rename attributes to something else, rethink how to store them
//
// ===========================================================================
define(
    'models/Entity',[ 'backbone', 'marionette', 'logger',
        'events', 'd3', 'util/API_URL',
        'models/EntityAttributes',
        'collections/Abilities',
        'models/Ability',
        'util/generateName'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        EntityAttributes,
        Abilities,
        Ability,
        generateName
    ){

    var Entity = Backbone.Model.extend({
        defaults: function(){
            return {
                // abilities will be a collection of ability models
                // NOTE: these abilities are mutable, can be changed based on
                // buffs
                abilities: null,

                // effects active on the entity (e.g., buffs or DoTs)
                activeEffects: [ 
                    // Will look like:
                    // { type: magic, subtype: fire, effect: function(){ ... }, duration: n }
                    // TODO: some sort ofDetrimental property to determine if it's
                ],

                // an array of objects that is updated whenever the entity's health
                // changes
                healthHistory: [],

                // the entity's race
                // tracks effects / stats, bonuses from / against races, etc.
                // TODO: favorite / known races, give bonuses based on it
                race: null,

                // name of the base sprite
                // TODO: Should this be here?
                sprite: 'man1', 

                // entity can be either alive or dead (can be revived with spell)
                isAlive: true,

                // generate a name
                name: generateName(),

                // ==========================
                // Stats
                // ==========================
                kills: 0,
                deaths: 0,

                // ==========================
                // Entity attributes
                // ==========================
                // TODO: Make flat structure. Copy over attributes at beginning
                //
                // Attributes include everything from health to attack damage, etc.
                // Anything combat related
                //
                // TODO: pass in values?
                // Starting values based on the entity's race / class
                // Note: Timer properties are set in attributes
                attributes: {},

                //Base attributes (copied over when a game starts to allow
                //  for buffs / debuffs)
                //---------------------------
                baseAttributes: {},

                // ==========================
                // AI Related
                //
                // TODO: AI Should be handled OUTSIDE of this model
                // ==========================
                // // TODO: set to null for real game
                aiDelay: 5,

                // list of enemies and their aggro. Key is entity ID, value is
                // aggro value
                aggroList: {},
                
                // ability the entity desires to use. Is handled by the AI
                // function, may change before using (e.g., if health changes)
                desiredAbility: null,

                // desired target is the intended target to use the ability on
                desiredTarget: null
            };
        },
        
        url: function getURL(){
            var url = API_URL + 'entities/' + this.get('id');
            return url;
        },

        generateName: function(){
            // simply returns a new name (does not set it)
            return generateName();
        }, 

        initialize: function entityInitialize(options, opts){
            logger.log('models/Entity', 'initialize() called');
            options = options || {};
            var self = this;

            // TODO: get attributes from server
            // set attributes and base attributes from server
            this.set({
                name: generateName(),
                attributes: new EntityAttributes(options.attributes || {})
            }, {silent: true});

            // set base attributes from attributes
            this.set({ baseAttributes: this.get('attributes') },
                {silent: true});

            // TODO: allow setting just some entity attribute attributes

            // TODO: get AIdelay from server
            // TODO: Don't set this for a player
            if(this.attributes.aiDelay === null){
                this.set({ aiDelay: Math.random() * 3 });
            }

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // // SET ABILITIES FROM CLASS
            // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // TODO: Don't use class - it doesn't exist anymore. Get abilities
            // from a list of IDs or something
            //
            if(this.get('class')){
                this.set({ abilities: this.get('class').get('abilities') }, { silent: true });
            } else {
                // If entity has no class yet (e.g., character create screen),
                // change abilities when class changes
                this.listenTo(this, 'change:class', function(){
                    self.set({ abilities: self.get('class').get('abilities') });
                });
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // --------------------------
            // Set stats from race
            // --------------------------
            // TODO: ::::::::::::: think more about this, should race ever change?
            // Could have the create screen only change race when process is finished
            if(this.get('race')){
                this.set({ 
                    sprite: this.get('race').get('sprite'),
                    attributes: new EntityAttributes(this.get('race').get('baseStats'))
                });
                this.set({ baseAttributes: this.get('attributes') });

            } else {
                // Entity has no race yet (e.g., create)
                // TODO: ::::::::::: Don't always listen on this - allow
                // race to change (e.g., spell effect) without clearing out
                // stats
                this.listenTo(this, 'change:race', function(){
                    // attributes changed, need to reset listeners
                    self.stopListening(self.get('attributes'));

                    self.set({ 
                        sprite: self.get('race').get('sprite'),
                        attributes: new EntityAttributes(self.get('race').get('baseStats'))
                    });

                    // listen to attributes
                    self.listenTo(
                        self.get('attributes'), 
                        'change:health', 
                        self.healthChanged);

                    // set base attributes from attributes
                    self.set({ baseAttributes: self.get('attributes') });
                });
            }

            // Listen when health drops to 0 or below, trigger entity
            // death event
            // --------------------------
            this.listenTo(
                this.get('attributes'), 
                'change:health', 
                this.healthChanged);

            // When entity dies, remove all buffs
            this.listenTo(
                this,
                'entity:died',
                this.removeAllBuffs);

            return this;
        },

        resetAfterBattle: function resetAfterBattle(){
            // Called after a battle, reset stats to base stats 
            // Also, removes buffs, etc.
            // TODO: This.
            // NOTE: Should be called after the node is finished. Need to
            // update EXP, reset attributes, remove buffs, etc.
            //
            // reset health and other attributes
            this.get('attributes').set(
                this.get('baseAttributes').attributes
            );

            // get rid of the health history
            this.set({ healthHistory: [] });

            // Remove non permanent buffs
            this.removeAllBuffs();
            //
            return this;
        },

        // ==============================
        // TODO: calculate score / difficultly
        // ==============================
        getScore: function getScore(){
            // TODO: get a combat score for this entity based on abilities
            // and states
        },

        // ==============================
        // Buff related
        // ==============================
        hasBuffByName: function hasBuffByName(ability){
            // takes in an ability and returns if the entity already has the
            // buff. NOTE: Use the ability NAME, not an ID. The reason for this 
            // is so that abilities that aren't stackable can't be stacked
            var effects = this.get('activeEffects');
            var i=0, len = effects.length;
            var entityHasBuff = false;

            // find the buff; if it exists, break out of the loop
            for(i=0; i<len; i++){
                if(effects[i].name === ability.name){ 
                    entityHasBuff = true;
                    break;
                }
            }

            logger.log('models/Entity', 'hasBuffByName called : %O', entityHasBuff);
            return entityHasBuff;
        },

        addBuff: function addBuff(ability, source){
            // Takes in an ability and adds the buff effect
            //  TODO: Document How it works
            //
            //
            var self = this;
            logger.log('models/Entity', 'addBuff(): called %O', ability);

            // Add it
            // --------------------------
            var effects = this.get('activeEffects');

            var abilityBuffInstance = ability;

            // Make a copy of the ability if it is stackable, so we can add or
            // remove instances of it
            // if the buff can stack, we need a unique instance of it
            if(ability.attributes.buffCanStack){
                abilityBuffInstance = new Ability( 
                    _.extend({}, ability.attributes) 
                );
            }

            // add to the effecst array
            effects.push(abilityBuffInstance);

            // Update the entity's stats
            // --------------------------
            var updatedStats = {}; // new attributes to set
            // Keep track of the differences between the new value and the old
            // value, used for removing the effect and tracking changes
            var statDifferences = {}; 

            // Add the effect
            var currentStats = this.get('attributes').attributes;

            _.each(abilityBuffInstance.get('buffEffects'), function(val, key){
                if(key !== 'abilities'){
                    // check for % or absolute value
                    if(val > -1 && val < 1){
                        // a percentage
                        updatedStats[key] = currentStats[key] + (currentStats[key] * val);
                    } else {
                        // a whole number
                        updatedStats[key] = currentStats[key] + val;
                    }

                    // keep track of differences
                    statDifferences[key] = updatedStats[key] - currentStats[key];
                }
            });

            // update this model's attributes stats
            this.get('attributes').set(updatedStats);

            // store the updated differences for removal and tracking
            abilityBuffInstance.set({statDifferences: statDifferences}, { silent: true });

            // --------------------------
            // TODO :::::::: Track the stat difference 
            // --------------------------

            // update activeEffects and stats
            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: abilityBuffInstance,
                source: source,
                target: this,
                type: 'add'
            });

            // return the cloned ability
            return abilityBuffInstance;
        },

        removeBuff: function removeBuff(abilityBuffInstance, source){
            // Remove buff effect
            //
            //  Takes in a abilityBuffInstance (the ability instance returned 
            //  in addBuff) and a source entity.
            //      Note: If the ability is NOT stackable, the 
            //      abilityBuffInstance will just be the actual ability object
            //
            //  If found, will remove the effects from the entity
            //
            logger.log('models/Entity', 'removeBuff(): called %O', abilityBuffInstance);
            var effects = this.get('activeEffects');
            var foundAbility = null;

            // remove the FIRST occurence of the targeted ability
            //      abilities are added in order of cast time, so the first
            //      one found is the oldest ability
            for(var i=0, len = effects.length; i<len; i++){
                if(effects[i].cid === abilityBuffInstance.cid){
                    foundAbility = effects.splice(i, 1)[0];
                    break;
                }
            }

            // Update the entity's stats
            // --------------------------
            // Reset the stats with the found ability
            if(foundAbility){
                var updatedStats = {};
                var statDifferences = foundAbility.attributes.statDifferences;

                // Add the effect
                var currentStats = this.get('attributes').attributes;

                _.each(statDifferences, function(difference, key){
                    updatedStats[key] = currentStats[key] - difference;
                });
                this.get('attributes').set(updatedStats);
            }


            logger.log('models/Entity', 'removeBuff(): found it? : %O', !!foundAbility);

            this.set({ activeEffects: effects }, {silent: true});
            this.trigger('change:activeEffects', this, abilityBuffInstance.cid, {
                sourceAbility: abilityBuffInstance,
                source: source,
                target: this,
                type: 'remove'
            });
            return this;
        },

        removeAllBuffs: function removeAllBuffs(){
            // Remove all buffs except class specific buffs
            var activeEffects = this.get('activeEffects');

            // only keep isPermanent buffs
            activeEffects = _.filter(activeEffects, function(effect){
                if(effect.attributes.isPermanent){ return true; }
                else { return false; }
            });

            this.set({ activeEffects: activeEffects });
            return this;
        },

        // ==============================
        //
        // Track damage
        //
        // ==============================
        trackDamage: function(options){
            // Takes in options (same as from healthChange, along with
            // model and health). Keep track of difference in health, along
            // with some data about the change
            //
            // TODO: track damage breakdown
            //
            var healthHistory = this.get('healthHistory');

            var difference = null;

            // check for health / model, and check for source and sourceAbility
            //  These should almost always exist, but this allows an entity 
            //  taking damage from a non entity source
            if(options.health && options.model){
                difference = options.health - options.model._previousAttributes.health;
            }
            var source = options.source || {cid: -1, get: function(){}};
            var sourceAbility = options.sourceAbility || {cid: -1, get: function(){}};

            // add a new history item to beginning of history array
            // update it (NOTE: it's an array, so it's updating in place without
            // triggering a change event)
            healthHistory.unshift({
                element: sourceAbility.get('element'),
                type: sourceAbility.get('type'),
                date: new Date(),
                abilityName: sourceAbility.get('name'),
                entityCID: source.cid,
                entityName: source.get('name'),
                amount: difference
            });

            this.trigger('change:healthHistory', this, this.get('healthHistory'));

            return this;
        },

        // ===================================================================
        //
        // Take damage / heal functions
        //
        // ===================================================================
        healthChanged: function healthChanged(model, health, options){
            // Called whenever the entity's health changes. Takes in the
            // changed model (the attributes), the health amount, and an options
            // object that contains the `sourceAbility` that triggered the health
            // change
            //
            // TODO: Track all damage
            // TODO: for res spels, trigger isAlive change, pass in sourceAbility
            // and source
            logger.log('models/Entity', 
                '1. healthChanged() : health ' + health + ' options: %O',
                options);

            // Track damage dealt
            this.trackDamage(_.extend({ model: model, health: health }, options));

            // Check for entity death
            if(health <= 0){
                logger.log('models/Entity', '2. entity is dead!');
                this.set({ isAlive: false }, { 
                    source: options.source,
                    sourceAbility: options.sourceAbility
                });
                
                // TODO: check to see if there is a prevent death buff? Or
                // should it go in take damage?

                // trigger global event to let listeners know entity died
                // TODO:  just listen for change:isAlive, don't need this
                this.trigger('entity:died', {model: this, source: options.source});

                // update number of deaths and kills for the entities
                this.set({
                    deaths: this.get('deaths') + 1
                });
                if(options.source){
                    options.source.set({
                        kills: options.source.get('kills') + 1
                    });
                }
            }

            return this;
        },

        // ------------------------------
        // FORMULA - Damage Multiplier
        // ------------------------------
        calculateDamageMultiplier: function calculateDamageMultiplier(factor, resist){
            // take in a factor (0 to 1) and a resist value (e.g., the entity
            // armor or magic resist or elemental resist value).
            //
            // Same formula for armor and resists
            //
            // Returns the multiplier, a number to multiply the original damage
            // by
            var multiplier;

            if(resist >= 0){
                multiplier = 100 / (100 + (factor * resist) );
            } else {
                multiplier = 2 - (100 / (100 - (factor * resist) ));
            }

            return multiplier;
        },


        // ==============================
        //
        // Take / Deal damage
        //
        // ==============================
        // TODO: Combine takeDamage and takeHeal

        takeDamage: function(options){
            // This function is a helper function for the entity to take damage
            // Alternatively, the ability may manually have the entity take
            // damage (for instance, an ability might do 10% of the entity's
            // health in damage)
            //
            // parameters:
            //  options: {Object} with keys:
            //      sourceAbility: {Ability} ability object
            //      source: {Entity} entity object
            //      amount: {Number} amount of damage to do (is positive)
            //
            logger.log('models/Entity', '1. takeDamage() : options: %O',
                options);

            // if entity is dead, do nothing
            if(!this.get('isAlive')){ 
                logger.log('models/Entity', '[x] entity is dead');
                return false; 
            }

            var attrs = this.get('attributes');

            // TODO: process damage based on passed in damage and type and this
            // entity's stats
            var sourceAbility = options.sourceAbility;
            var sourceEntity = options.source;

            var type = sourceAbility.get('type');
            var element = sourceAbility.get('element');
            var damage = Math.abs(options.amount) * -1;
            var armor = attrs.get('armor');
            var magicResist = attrs.get('magicResist');

            // update attributes
            var curHealth = attrs.get('health');
            var maxHealth = attrs.get('maxHealth');

            // --------------------------
            //
            // process damage
            //
            // --------------------------
            // Get modifier for armor and magic resist
            // update damage with mod
            var moddedDamage = 0,
                physicalDamage, magicDamage;

            // get physical damage and magic damage bonuses based on the source
            // entity's stats
            //
            // functionality is: get base damage, add additional damage based
            // on the source entity's attributes * the % of the physical or magic
            // type
            var bonusDmgFromPhysical = 0;
            var bonusDmgFromMagic = 0;

            // TODO: TRACK DAMAGE

            // Get damage reduction from stats
            if(type.physical){
                // 1. Calculate damage from base damage plus the source's 
                // attack power. Scale the source's bonus attack damage by
                // the % of the type of attack
                //
                // TODO: RENAME - bonusDmgFrom___ is actually just damage
                // TODO: Track how much damage is taken vs. absorbed
                bonusDmgFromPhysical = -1 * (Math.abs(damage) + 
                    // bonus damage
                    (sourceEntity.get('attributes').get('attack') * sourceAbility.attributes.attackBonusPercent)
                );

                // 2. get actual total physical damage done based on armor and damge from source's attack
                physicalDamage = this.calculateDamageMultiplier(type.physical, armor) * (bonusDmgFromPhysical * type.physical);
                // update the moddedDamage 
                moddedDamage += physicalDamage;
            }
            if(type.magic){
                // same as above
                bonusDmgFromMagic = -1 * (Math.abs(damage) + 
                    // bonus
                    (sourceEntity.get('attributes').get('magicPower') * sourceAbility.attributes.magicPowerBonusPercent)
                );

                magicDamage = this.calculateDamageMultiplier(type.magic, magicResist) * (bonusDmgFromMagic * type.magic);
                moddedDamage += magicDamage;
            }

            // TODO: Get value of damage increase from source entity's stats
            // TODO: Get elemental boosts

            // Update the damage to be the calculated modified damage
            damage = moddedDamage;

            // round damage
            damage = Math.round(damage);

            // if damage is POSITIVE, set it to 0
            // (this could happen if entity has negative stats)
            if(damage > 0){ damage = 0; }

            // --------------------------
            // update health
            // --------------------------
            var newHealth = curHealth + damage;

            // TODO: check if there are any buffs that protect from death?

            // If the health drops below 0, the target is dead
            if(newHealth <= 0){ newHealth = 0; }
            // limit health
            if(newHealth > maxHealth){ newHealth = maxHealth; }

            //  -------------------------
            // update the health
            //  pass in the ability that caused the damage
            //  -------------------------
            //  NOTE: if an ability overrides this function, it still must
            //  called the following to update health
            attrs.set({ health: newHealth }, { silent: true });
            
            // we want to manually trigger it, because we want to capture
            // the change in health even if there is not change (e.g., doing
            // 0 damage should still trigger everything)
            attrs.trigger(
                'change:health',
                attrs, attrs.get('health'),
                { 
                    sourceAbility: sourceAbility, 
                    source: options.source
                    // TODO: Pass in damage breakdown
                }
            );

            // NOTE:
            // death event is called in the `healthChanged`, which is called
            // whenever health changes
            logger.log('models/Entity', 'amount received : %O', damage);

            return damage;
        },

        takeTrueDamage: function takeTrueDamage(options){
            // Takes damage, ignoring armor and magic resist. 
            // TODO: Should it not ignore elements?
            var damage = Math.abs(options.amount); 
            damage = Math.round(damage);

            var attrs = this.get('attributes');
            var curHealth = attrs.get('health');

            var newHealth = curHealth - damage;
            
            // TODO: track damage
            //
            //  -------------------------
            // update the health
            //  -------------------------
            attrs.set({ health: newHealth }, { 
                sourceAbility: options.sourceAbility,
                source: options.source
            });

            return damage;
        },
        
        // ------------------------------
        //
        // Heal
        //
        // ------------------------------
        takeHeal: function(options){
            // This is called by an abilty that does healing
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
            attrs.set({ health: newHealth }, {silent: true});
            attrs.trigger(
                'change:health',
                attrs, attrs.get('health'),
                { sourceAbility: sourceAbility, source: options.source }
            );

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
            // TODO: Inherit AI from classes (healer, warrior, etc)
            // TODO: make AI work for players too
            //
            // Params: 
            //  time: {Number} in seconds
            //  battle: {Battle Model}
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
            this._lastAIHandleCall = this._lastAIHandleCall || Date.now();

            var canUseAbility = false;

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
                    targetIndex = battle.get('playerEntities').indexOf(target); 
                    targetGroup = 'player';
                    canUseAbility = true;

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
                    targetIndex = battle.get('enemyEntities').indexOf(target);
                    targetGroup = 'enemy';
                    canUseAbility = true;

                }

                // ----------------------
                // 2. trigger event to use ability
                // ----------------------
                // TODO: make sure this isn't used over and over
                if(canUseAbility && Date.now() - this._lastAIHandleCall > 100){
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
                    this._lastAIHandleCall = Date.now();
                }
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
// EntityClass
//
//  Model for a race (used in create process)
//
// ===========================================================================
define(
    'models/EntityClass',[ 'events', 'logger', 'util/API_URL' ], function ModelEntityClass(
        events, logger, API_URL
    ){

        // Define the app user model. Similar to user model, but a bit different
        var EntityClass = Backbone.Model.extend({
            defaults: {
                name: '',
                description: '',
                sprite: '',
                // abilities will be a collection of abilities
                abilities: [],
                baseStats: {
                    // todo: more...
                    agility: 10
                }
            },

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/EntityClass', 
                    'initialize: New entity class object created');

                return this;
            }

        });

    return EntityClass;
});

// ===========================================================================
//
// Race
//
//  Model for a race (used in create process)
//
// ===========================================================================
define(
    'models/Race',[ 'events', 'logger', 'util/API_URL' ], function ModelRace(
        events, logger, API_URL
    ){

        // Define the race model
        var Race = Backbone.Model.extend({
            defaults: {
                name: 'Race',
                description: 'Some test',
                disabled: false,
                sprite: 'race',
                baseStats: {
                    // todo: more...
                    agility: 10
                }
            },

            initialize: function appUserInitialize(){
                var self = this;
                logger.log('models/Race', 
                    'initialize: New race object created');

                return this;
            }

        });

    return Race;
});

// ===========================================================================
//
//  Game
//
//      This model manages a game
//      TODO: restructure, use a flat structure
//
// ===========================================================================
define(
    'models/Game',[ 'backbone', 'marionette', 'logger',
        'localstorage',
        'events', 'd3', 'util/API_URL', 

        'collections/Entities', 'models/Entity',
        'models/Map',
        'models/appUser-object'

        // TODO: use a flat structure so this isn't necessary?
        ,'collections/Abilities'
        ,'models/EntityClass'
        ,'models/Race'

    ], function MapModel(
        Backbone, Marionette, logger,
        localstorage,
        events, d3, API_URL, 

        Entities, Entity,
        Map,
        appUser

        // TODO: Use a flat structure for entity so this isn't necessary
        ,Abilities
        ,EntityClass
        ,Race
    ){

    var Game = Backbone.Model.extend({
        defaults: {
            // actual ID used on backend
            _id: '',

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

        initialize: function gameInitialize(attrs, options){
            logger.log('models/Game', 'initialize() called');
            var self = this;
            options = options || {};

            if(options.models){
                this.set({ playerEntities: new Entities(options.models) });
            }


            // TODO: Use a unique ID. FOR NOW, for dev, we're using the same ID
            this.set({ id: 'currentGame' });

            window._GAME = this;

            this.on('sync', function(r){
                logger.log('models/Game', 'sync() triggered');
            });

            // TODO: DEV ::: REMOVE THIS, CHANGE SAVE LOGIC
            this.listenTo(events, 'dev:saveGame', function(){
                logger.log('models/Game', 'dev:saveGame event received, saving');
                self.save();
            });

            return this;
        },

        parse: function(res){
            // Load from JSON and turn into object
            // Need to overwrite the parse function so we can load in data
            // from the server for nested models. 
            // NOTE: Could automate this, store embedded collection / models
            // as a property and include the class
            var entities = [];

            // create entity models for each entity, then add them to the
            // collection
            _.each(res.playerEntities, function(entity){
                // setup model / collections from JSON data
                // For non flat structure, we need to create objects based on
                // the data
                // TODO: don't use class, call it entityClass in model
                entity.class.abilities = new Abilities(entity.class.abilities);
                entity.class = new EntityClass(entity.class);
                entity.race = new Race(entity.race);

                entities.push(new Entity(entity));
            });

            // create the collection, pass in the entity models
            res.playerEntities = new Entities(entities);

            // TODO: Add map, add node
            //
            // NOTE: if other collections or models are defined on the game,
            // we need to add them here
            return res;
        },

        localStorage: new Backbone.LocalStorage("gameModel")
    });

    return Game;
});

// ===========================================================================
//
// analytics.js
//
//  analytics util function for sending analytics data to server
//
// ===========================================================================
define('analytics',[
    'jquery', 'logger'
], function($, logger){
    var analytics = {};

    analytics.log = function analyticsLog( options ){
        // DO STUFF
        logger.log('analytics', 'called with', options);
        return true;
    };

    return analytics;
});

// ===========================================================================
//
// Race List Item
//
// ItemView for race item
//
// ===========================================================================
define(
    'views/create/RaceListItem',[ 
        'd3', 'logger', 'events'
    ], function viewRaceListItem(
        d3, logger, events
    ){

    var RaceListItem = Backbone.Marionette.ItemView.extend({
        'className': 'race-list-item',
        template: '#template-create-race-list-item',

        events: {
            'click': 'raceClicked'
        },

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/RaceListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;
            logger.log('views/create/RaceListItem', '\t onShow() called');

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }
            this.$el.attr({
                id: 'create-race-' + 
                    this.model.attributes.sprite
            });

            // Redelegate events on a timeout. 
            // TODO : Why doesn't this work without the timeout? It seems
            // that maybe the elements haven't been rendered to the DOM yet
            setTimeout(function(){
                self._delegateDOMEvents();
            }, 1000);
            return this;
        },

        raceClicked: function raceClicked (){
            logger.log('views/create/RaceListItem', 'race clicked: %O', 
                this.model);

            events.trigger('create:page2:raceClicked', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return RaceListItem;
});

// ===========================================================================
//
// Races List
//
// Collection for races in the create screen
//
// ===========================================================================
define(
    'views/create/RaceList',[ 
        'd3', 'logger', 'events', 
        'views/create/RaceListItem'
    ], function viewRaceListCollection(
        d3, logger, events,
        RaceListItem
    ){

    var RaceListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'races-list',

        itemView: RaceListItem,

        initialize: function(options){
            logger.log(
                'views/create/RaceList.js', 
                'collectionView initialized : %O', options);
            this.itemView = RaceListItem;

            return this;
        }
    });

    return RaceListCollection;
});

// ===========================================================================
//
// data-races
//
//      TODO: should be loaded from server and abilities should load 
//
//      TODO: difference between locked and non unlocked races(?) No, should
//      store playable races on user model
//
// ===========================================================================
define(
    'models/data-races',[ 'events', 'logger', 'models/Race' ], function(
        events, logger, Race
    ){

    var RACES = [
        new Race({
            name: 'Human',

            description: "Well rounded creatures with moderate attack and defense bonuses",
            specialDescription: "<span class='positive'>+20%</span> experience bonus",
            
            sprite: 'human',
            baseStats: {
                power: 5,
                defense: 5,
                health: 85,

                armor: 4,
                magicResist: 3,
                magicPower: 3
            }
        }),
        new Race({
            name: 'Elf',
            description: 'Wise and agile creatures in touch with the natural world.',
            specialDescription: "<span class='positive'>+5%</span> chance to avoid all damage",
            sprite: 'elf',
            baseStats: {
                power: 7,
                defense: 3,
                health: 50,

                // TODO: Don't use these props?
                armor: 2,
                magicResist: 4,
                magicPower: 4
            }
        }),
        new Race({
            name: 'Dark Elf',
            disabled: true,
            description: 'Agile and intelligent creatures raised in darkness',
            sprite: 'darkelf',
            specialDescription: 'Has a {5%} bonus to something',
            baseStats: {
                power: 5,
                defense: 2,
                health: 60,

                armor: 4,
                magicResist: 26,
                magicPower: 10
            }
        }),
        new Race({
            name: 'Mimirian',
            disabled: true,
            description: 'Strong, but slow, mountain dwelling creatures',
            sprite: 'mimirian',
            baseStats: {
                power: 1,
                defense: 5,
                health: 90,

                armor: 6,
                magicResist: 5,
                magicPower: 2
            }
        })
    ];

    return RACES;
});

// ===========================================================================
//
//  Races Collection
//
//      This collection contains a collection of races for the create screen,
//      the list of available races for the player
// ===========================================================================
define(
    'collections/Races',[ 'backbone', 'marionette', 'logger', 'events', 
        'models/Race',
        'models/data-races'
    ], function RaceCollection(
        Backbone, Marionette, logger, events,
        Race,
        RACES
    ){

    var Races = Backbone.Collection.extend({
        model: Race,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Races', 'initialize() called');

            // TODO: don't do this, get from server
            this.add(RACES);

            return this;
        }
        //,comparator: function(model){
            //return model.get('name');
        //}

    });

    return Races;
});

/* =========================================================================
 *
 * RaceViz
 *      Visualization function for the race in the create screen
 *
 *  TODO: TEXT-ANCHOR END
 * ========================================================================= */
// Renders a visualization of stats to the passed in element
define('views/create/RaceViz',[ 'd3', 'logger', 'events' ], 
function viewRaceViz( d3, logger, events){

    function RaceViz ( $el ){
        logger.log('RaceViz', 'initialized raceViz chart object');

        this.chart = d3.select($el[0]).append('svg')
            .attr({
                width: '100%',
                height: '100%'
            })
            .append('g')
                .attr({ 'class': 'create-race-viz-chart' });

        // data properties
        this.PROPS = {
            data: null
        };

        // prepare data
        this.chartData = null;
        this.hasBeenDrawn = false;

        return this;
    }

    RaceViz.prototype.update = function update (){
        // Draws or updates the chart based on the data
        var self = this;
        logger.log('RaceViz', 'drawing chart : data : ', {
            data: this.PROPS.data
        });

        // prepare data
        var data = [
            {key: 'Health', value: this.PROPS.data.baseStats.health},
            {key: 'Power', value: this.PROPS.data.baseStats.power},
            {key: 'Defense', value: this.PROPS.data.baseStats.defense},
        ];

        var barHeight = 20;

        // setup scales
        var maxWidth = 320;
        var startX = 70;

        maxWidth = maxWidth - startX;

        this.healthScale = d3.scale.linear()
            .domain([ 0, 100 ])
            .range([ 0, maxWidth ]);
        this.powerDefenseScale = d3.scale.linear()
            .domain([ 0, 10 ])
            .range([ 0, maxWidth ]);

        // 1. Draw
        // ------------------------------
        // Setup groups
        var groups = this.chart.selectAll('.propWrapper')
            // specify a key function to control how data
            // is joined to elements - use the `key` key
            .data(data, function(d){ return d.key; });

        groups
            .enter()
                .append('g')
                .attr({ 
                    'class': 'propWrapper',
                    transform: function translate(d,i){
                        return 'translate(' + [
                            0, 2 + (30 * i)
                        ] + ')';
                    }
                });

        // Setup outlines
        var rectOutlines = groups.selectAll('.outline')
            .data(function(d,i){ return [d]; });

        rectOutlines
            .enter()
                .append('rect')
                .attr({
                    'class': 'outline',
                    filter: 'url(#filter-wavy)',
                    width: maxWidth,
                    height: barHeight,
                    x: startX,
                    y: 0
                });

        // Setup fills
        var rectFills = groups.selectAll('.bar')
            .data(function(d,i){ return [d]; });

        rectFills
            .enter()
                .append('rect')
                .attr({
                    'class': 'bar',
                    height: barHeight,
                    x: startX+1,
                    y: 1
                });

        // 2. Update
        // ------------------------------
        rectFills 
            .transition()
            .delay(150)
            .duration(600)
            .attr({
                'class': function setupClassName(d,i){
                    logger.log('RaceViz', '...', d);
                    return 'bar ' + d.key;
                },
                filter: 'url(#filter-wavy)',
                width: function setupWidth (d,i){
                    if(d.key.toLowerCase() === 'health'){
                        return self.healthScale(d.value) - 1;
                    } else {
                        return self.powerDefenseScale(d.value) - 1;
                    }
                }
            });

        // Text
        // ------------------------------
        var labels = groups.selectAll('.label')
            .data(function(d,i){ return [d]; });
        
        labels
            .enter()
            .append('text')
            .attr({
                'class': 'label',
                'text-anchor': 'end',
                x: startX - 10,
                y: 18
            })
            .text(function(d,i){
                return d.key;
            });
        

        return this;
    };

    // =====================================================================
    //
    // Getter / Setters (reusable charts paradigm)
    //
    // =====================================================================
    RaceViz.prototype.getterSetter = function helper(key){
        // Getter / setter helper funciton. Takes in a key for the
        // PROPS obj and returns a getter / setter func which accesses
        // the passed in key
        return function getSetterHelperRet(value){
            // getter
            if(arguments.length === 0){ return this.PROPS[key]; }
            // setter
            this.PROPS[key] = value;
            return this;
        };
    };
    
    //setup getter / setters
    RaceViz.prototype.data = RaceViz.prototype.getterSetter('data');

    return RaceViz;
});

// ===========================================================================
//
// Class List Item
//
// ItemView for class item
//
// ===========================================================================
define(
    'views/create/ClassListItem',[ 
        'd3', 'logger', 'events'
    ], function viewClassListItem(
        d3, logger, events
    ){

    var ClassListItem = Backbone.Marionette.ItemView.extend({
        'className': 'list-item',
        template: '#template-create-class-list-item',

        events: {
            'click': 'classClicked'
        },

        serializeData: function(){
            return _.extend({ cid: this.model.cid }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('views/create/ClassListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;
            logger.log('views/create/ClassListItem', '\t onShow() called');

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }

            // add the sprite name to allow selection
            this.$el.attr({
                id: 'create-race-' + this.model.attributes.sprite.replace(/ /g, '') 
            });

            // Redelegate events on a timeout. 
            // TODO : Why doesn't this work without the timeout? It seems
            // that maybe the elements haven't been rendered to the DOM yet
            setTimeout(function(){requestAnimationFrame(function(){
                self._delegateDOMEvents();
            });}, 100);
            return this;
        },

        classClicked: function classClicked (){
            logger.log('views/create/ClassListItem', 'class clicked: %O', 
                this.model);

            events.trigger('create:page3:classClicked', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return ClassListItem;
});

// ===========================================================================
//
// Classes List
//
// Collection for races in the create screen
//
// ===========================================================================
define(
    'views/create/ClassList',[ 
        'd3', 'logger', 'events', 
        'views/create/ClassListItem'
    ], function viewClassListCollection(
        d3, logger, events,
        ClassListItem
    ){

    var ClassListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'classes-list',

        itemView: ClassListItem,

        initialize: function(options){
            logger.log(
                'views/create/ClassList.js', 
                'collectionView initialized : %O', options);
            this.itemView = ClassListItem;

            return this;
        }
    });

    return ClassListCollection;
});

// ===========================================================================
//
// data-abilities
//
//      TODO: should be loaded from server and abilities should load on a per
//      entity level
//
// PROPERTIES: id: used to get the icon (e.g., `magic-shielding`.svg)
//
// ===========================================================================
define(
    'models/data-abilities',[ 'events', 'logger', 'models/Ability', 'util/Timer' ], function(
        events, logger, Ability, Timer
    ){
    logger.log('models/data-abilities', 'Creating abilities');

    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = [

        // ==============================
        // 
        // Assassin
        //
        // ==============================
        {
            name: 'Stab',
            id: 'stab',
            spellTypes: ['damage'],
            description: 'A quick stabbing attack which deals a small amount of damage',
            effectId: 'placeHolder',
            sprite: 'stab',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 0.2,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 3,
            attackBonusPercent: 0.1
        },
        {
            name: 'Backstab',
            id: 'backstab',
            spellTypes: ['damage'],
            description: 'A powerful attack which will do additional damage based on previous attacks',
            effectId: 'placeHolder',
            sprite: 'backstab',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 1,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 7,
            attackBonusPercent: 0.2,
            effect: function effect(options){
                var self = this;
                var delay = this.getCastDuration(options);
                var amount = this.get('damage');
                var intendedTarget = options[this.get('damageTarget')];
                // TODO: make sure castDuration is always the current castDuration
                var castDuration = self.attributes.castDuration * 1000;

                new Timer(function effectDamageDelay(){
                    var healthHistory = intendedTarget.get('healthHistory');
                    var i,len;
                    var now = new Date();
                    if(healthHistory){
                        for(i=0,len=healthHistory.length;i<len;i++){
                            // only check for effects that have happened since this was cast
                            if((now - healthHistory[i].date) <= castDuration){
                                // TODO: check for a single ability
                                // TODO: scale based on entity's attack bonus
                                amount += 5;
                            } else {
                                // otherwise, break
                                break;
                            }
                        }
                    }
                    amount = intendedTarget.takeDamage({
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount,
                        sourceAbility: self,
                        target: options.target,
                        source: options.source
                    });
                    if(options.callback){ options.callback(); }
                }, delay);

            }
        },
        {
            name: 'Suspend',
            id: 'suspend',
            spellTypes: ['debuff'],
            description: "Temporarily prevents a single enemy's timer from regenerating",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            buffEffects: { 
                timerFactor: -1.0,

                abilities: {
                }
            }
        },
        {
            name: 'Cripple',
            id: 'cripple',
            spellTypes: ['debuff'],
            description: "Cripple weakens an enemy, lowering their defense",
            effectId: 'placeHolder',
            sprite: 'cripple',
            castTime: 1,
            timeCost: 1,
            damage: 0,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'air',

            buffDuration: 8,
            // TODO : scale effect
            buffEffects: { 
                armor: -15
            }
        },

        {
            name: 'Assassinate',
            id: 'assassinate',
            spellTypes: ['damage'],
            description: "An attack which deals tremendous damage, having a chance to kill the enemy the lower the enemy's health is",
            effectId: 'placeHolder',
            sprite: 'assassinate',
            castTime: 0.6,
            timeCost: 0.6,
            castDuration: 1,
            validTargets: ['enemy'],
            type: {'physical': 1},
            element: 'air',
            damage: 10,
            attackBonusPercent: 0.6,
            effect: function effect(options){
                var self = this;
                var delay = this.getCastDuration(options);
                var amount = this.get('damage');
                var intendedTarget = options[this.get('damageTarget')];
                // TODO: make sure castDuration is always the current castDuration
                var castDuration = self.attributes.castDuration * 1000;

                // Add the entity's health to the effect.
                // TODO: calculate entity difficultly and scale damage based on
                // it
                amount += (
                    intendedTarget.get('attributes').get('health') / (Math.random() * 4 | 0)
                );

                new Timer(function effectDamageDelay(){
                    amount = intendedTarget.takeDamage({
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount,
                        sourceAbility: self,
                        target: options.target,
                        source: options.source
                    });
                    if(options.callback){ options.callback(); }
                }, delay);

            }
        },

        {
            name: 'Haste',
            id: 'haste',
            spellTypes: ['buff'],
            description: "Increases your timer speed by 20%",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            buffEffects: { 
                timerFactor: 0.2
            }
        },

        // Ranger
        // ------------------------------
        {
            name: 'Multi Shot',
            id: 'multi-shot',
            spellTypes: ['damage'],
            description: "An attack which fires multiple arrows at a single enemy",
            effectId: 'placeHolder',
            castTime: 3.2,
            timeCost: 3.2,
            castDuration: 0.1,
            validTargets: ['enemy'],
            type: {'physical': 1.0},
            element: 'light',
            damage: 5,
            ticks: 2,
            tickDuration: 0.27
        },

        // ------------------------------
        // Healing - Light
        // ------------------------------
        {
            name: 'Minor Healing',
            id: 'minor-healing',
            spellTypes: ['heal'],
            effectId: 'minorHealing',
            castTime: 3,
            description: "A quick ability that restores a minor amount of health",
            timeCost: 3,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 15
        },
        {
            name: 'Heal',
            id: 'heal',
            description: "This ability provides a greater degree of healing at the expense of a longer usage time",
            spellTypes: ['heal'],
            effectId: 'heal',
            castTime: 5.5,
            timeCost: 5.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            heal: 20
        },
        // ==============================
        // 
        // Shadowknight
        //
        // ==============================
        {
            // TODO::::: return percentage of damage
            name: 'Dark Blade',
            id: 'darkblade',
            spellTypes: ['damage'],
            description: 'A physical attack that damages the enemy and returns a percentage of damage to you',
            effectId: 'placeHolder',
            castTime: 3,
            timeCost: 3,
            castDuration: 0.3,
            validTargets: ['enemy'],
            type: {'magic': 0.3, 'physical': 0.7},
            element: 'dark',
            damage: 9,
            heal: 5,
            healTarget: 'source'
        },

        // TODO: Have true damage be a part of the damage func
        {
            name: 'Death Touch',
            id: 'deathtouch',
            spellTypes: ['damage'],
            description: "An attack that deals a true damage equal to 25% of the enemy's current health, ignoring armor and magic resist",
            effectId: 'placeHolder',
            castTime: 1,
            timeCost: 1,
            castDuration: 1.5,
            validTargets: ['enemy'],
            type: {'magic': 0.5, 'physical': 0.5},
            element: 'dark',
            damage: '25%',
            effect: function(options){
                // Does 10% of entity's health in damage
                var self = this;
                var delay = this.getCastDuration(options);

                new Timer(function effectDamageDelay(){
                    var target = options.target;
                    var amount = target.get('baseAttributes').get('maxHealth');
                    amount = Math.ceil(0.25 * target.get('baseAttributes').get('health'));

                    target.takeTrueDamage({
                        sourceAbility: self,
                        source: options.source,
                        target: options.target,
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount
                    });

                }, delay);
            }
        },

        {
            name: 'Poisoned Stab',
            id: 'poisoned-stab',
            spellTypes: ['damage'],
            description: 'A piercing attack that deals poison (dark) damage over time',
            effectId: 'placeHolder',
            castTime: 3.5,
            timeCost: 3.5,
            castDuration: 0.1,
            validTargets: ['enemy'],
            type: {'physical': 1.0},
            element: 'dark',
            damage: 3,
            ticks: 3,
            tickDuration: 2
        },

        // ------------------------------
        // Damage - Spells
        // ------------------------------
        {
            name: 'Magic Shield',
            id: 'magic-shield',
            spellTypes: ['buff'],
            effectId: 'magicshield',
            description: "A shield of magic which increases your armor, magic resistence, and maximum health",
            castTime: 2,
            timeCost: 2,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',
            
            heal: 5,

            buffDuration: 5,

            buffEffects: { 
                armor: 10,
                magicResist: 10,
                maxHealth: 10
            }
        },
        {
            name: 'Fire Comet',
            id: 'firecomet',
            spellTypes: ['damage'],
            description: "A magical comet of fire reigns down on a single enemy, dleaing massive fire damage",
            effectId: 'firecomet',
            castTime: 5,
            timeCost: 5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 50
        },
        {
            name: 'Ice Spear',
            id: 'icespear',
            spellTypes: ['damage'],
            effectId: 'icespear',
            description: "A quick direct damage spell which deals water damage to a single enemy",
            castTime: 5,
            timeCost: 5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 50
        },

        // ==============================
        // 
        // Cleric
        //
        // ==============================
        {
            name: 'Smite',
            id: 'smite',
            spellTypes: ['damage', 'heal'],
            description: "Using the force of divine power, you smite your foes with the element of light, damaging them while healing yourself to a small degree.",
            effectId: 'placeHolder',
            castTime: 1,
            timeCost: 1,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',
            damage: 10,
            heal: 3,
            healTarget: 'source'
        },
        {
            name: 'Virtue',
            id: 'virtue',
            spellTypes: ['buff', 'heal'],
            description: "Virtue bolsters an ally's armor, magic resist, and maximum health",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['player'],
            type: 'magic',
            element: 'light',

            heal: 10,

            buffDuration: 8,
            buffEffects: { 
                armor: 10,
                magicResist: 10,
                maxHealth: 10,

                abilities: {
                    //// 20% faster, so decrease time by 20%
                    //coolDown: -0.5,
                    //castDuration: -0.5,
                    //castTime: -0.5,
                    //timeCost: -0.5
                }
            }
        },

        // TODO:  Have truedamage be a side effect in the default damage func
        {
            name: 'Judgement',
            id: 'judgement',
            spellTypes: ['damage'],
            effectId: 'placeHolder',
            description: "At the expense of a long casting time, this ability decreases your enemy's health by 10%",
            castTime: 6,
            timeCost: 1,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',
            damage: '10%',
            effect: function(options){
                // Does 10% of entity's health in damage
                var self = this;
                var delay = this.getCastDuration(options);

                new Timer(function effectDamageDelay(){
                    var target = options.target;
                    var amount = target.get('baseAttributes').get('maxHealth');
                    amount = Math.ceil(0.15 * target.get('baseAttributes').get('health'));

                    target.takeTrueDamage({
                        sourceAbility: self,
                        source: options.source,
                        target: options.target,
                        type: self.get('type'),
                        element: self.get('element'),
                        amount: amount
                    });

                }, delay);
            }
        },



        // ------------------------------
        // Other effects
        // ------------------------------
        {
            name: 'Stun',
            id: 'stun',
            spellTypes: ['debuff'],
            description: "Temporarily prevents an enemy from using abilities",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            buffDuration: 8,
            // to prevent ability usage, set the time to be greater than the
            // entitiy's max timer value. Setting to something ridiculously high
            // also accomplishes this
            buffEffects: { 
                abilities: {
                    castTime: 9999999
                }
            }
        },
        {
            name: 'Comatose',
            id: 'comatose',
            spellTypes: ['debuff'],
            description: "Temporarily prevents enemies from using abilities and regenerating time",
            effectId: 'placeHolder',
            castTime: 0.5,
            timeCost: 0.5,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'light',

            damage: 1,

            buffDuration: 8,
            // to prevent ability usage, set the time to be greater than the
            // entitiy's max timer value. Setting to something ridiculously high
            // also accomplishes this
            buffEffects: { 
                timerFactor: -1.0,
                abilities: {
                    castTime: 9999999
                }
            }
        }
    ];


    return abilities;
});

// ===========================================================================
//
// data-classes
//
//      TODO: should be loaded from server and abilities should load 
//      TODO: Think of group of classes (DPS / Tank / Healer?)
//
//      -- Classes can be generally divided into types:
//          Type: Physical and Magical
//          Elements: Earth, Wind, Water, Fire, Light, Dark
//          
//          Class could be parts of any type / element
//
//
// ===========================================================================
define(
    'models/data-entity-classes',[ 'events', 'logger', 'models/EntityClass',
        'collections/Abilities', 'models/data-abilities'], function(
        events, logger, EntityClass,
        Abilities, ABILITIES
    ){

    var ENTITY_CLASSES = [
        new EntityClass({
            name: 'Custom',
            description: 'Think you can build an awesome class? Build your own unique combination of abilities',
            sprite: 'custom',
            disabled: false,
            abilities: []
        }),

        new EntityClass({
            name: 'Assassin',
            description: 'Assassins attack in bursts, combining skills to deal massive amounts of damage.',
            sprite: 'assassin',
            disabled: false,
            abilities: [
                // array of effectId names
                'stab', 'backstab', 'cripple', 'assassinate'
            ]
        }),

        new EntityClass({
            name: 'Ranger',
            description: "Possesses unparalleled skill with bows and hunting, allowing them to mark enemies to enhance their attacks",
            sprite: 'ranger',
            disabled: false,
            abilities: [
                // array of effectId names
                'multi-shot', 'stab', 'haste', 'minor-healing'
            ]
        }),

        new EntityClass({
            name: 'Shadow Knight',
            description: "A knight born in darkness, using dark magic to enhance their combat skills",
            sprite: 'shadowknight',
            disabled: false,
            abilities: [
                // array of effectId names
                'darkblade', 'deathtouch', 'cripple'
            ]
        }),

        new EntityClass({
            name: 'Wizard',
            description: "",
            sprite: 'wizard',
            disabled: false,
            abilities: [
                // array of effectId names
                'magic-shield', 'icespear', 'firecomet'
            ]
        })
    ];


    return ENTITY_CLASSES;
});

// ===========================================================================
//
//  Classes Collection
//
//      This collection contains a collection of races for the create screen,
//      the list of available races for the player
// ===========================================================================
define(
    'collections/Classes',[ 'backbone', 'marionette', 'logger', 'events', 
        'models/EntityClass',
        'models/data-entity-classes'
    ], function EntityClassCollection(
        Backbone, Marionette, logger, events,
        EntityClass,
        ENTITY_CLASSES
    ){

    var Classes = Backbone.Collection.extend({
        model: EntityClass,

        initialize: function(models, options){
            var self = this;
            logger.log('collections/Classes', 'initialize() called');

            // TODO: don't do this, get from server
            this.add(ENTITY_CLASSES);

            return this;
        }

    });

    return Classes;
});

// ===========================================================================
//
// All Ability List
//
// ItemView for class item
//
// ===========================================================================
define(
    'views/create/AllAbilitiesListItem',[ 
        'd3', 'logger', 'events',
        'collections/Abilities'
    ], function viewAllAbilityListItem(
        d3, logger, events,
        Abilities
    ){

    var AllAbilityListItem = Backbone.Marionette.ItemView.extend({
        template: '#template-create-all-abilities-list-item',

        events: {
            'click': 'abilityClicked',
            'mouseenter': 'mouseenter', 
            'mouseleave': 'mouseleave'
        },


        serializeData: function(){
            return _.extend({ 
                cid: this.model.cid,
                sprite: this.model.attributes.sprite || null,
                disabled: false,
                data: Abilities.prototype.dataConfig
            }, this.model.toJSON());
        },

        initialize: function(){
            logger.log('AllAbilitiesListItem', 'initialize : model %O',
                this.model);
            return this;
        },

        onShow: function(){
            var self = this;

            var sprite = this.model.get('effectId');

            var classNames = 'list-item';
            // update classNames based on model spell types
            classNames += ' ' + this.model.attributes.spellTypes.join(' ');

            this.$el.attr({
                id: 'create-all-ability-' + 
                    this.model.attributes.id,
                'class': classNames
            });

            if(this.model.attributes.disabled){
                this.$el.addClass('disabled');
            }

            setTimeout(function(){requestAnimationFrame(function(){
                self._delegateDOMEvents();
            });}, 20);

            return this;
        },

        // ------------------------------
        // UI callbacks
        // ------------------------------
        abilityClicked : function abilityClicked(){
            logger.log('AllAbilitiesListItem', 'ability item clicked'); 

            events.trigger('create:page4:abilityClicked', { 
                $el: this.$el,
                model: this.model
            });

            return this;
        },

        mouseenter: function mouseenter(){
            events.trigger('create:page4:allAbilityMouseenter', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        },
        mouseleave: function mouseleave(){
            events.trigger('create:page4:allAbilityMouseleave', { 
                $el: this.$el,
                model: this.model
            });
            return this;
        }

    });

    return AllAbilityListItem;
});

// ===========================================================================
//
// AllAbility List
//
// Collection for classes in the create screen
//
// ===========================================================================
define(
    'views/create/AllAbilitiesList',[ 
        'd3', 'logger', 'events', 
        'views/create/AllAbilitiesListItem'
    ], function viewAllAbilityListCollection(
        d3, logger, events,
        AllAbilityListItem
    ){

    var AllAbilityListCollection = Backbone.Marionette.CollectionView.extend({
        'className': 'all-ability-list',

        itemView: AllAbilityListItem,

        initialize: function(options){
            logger.log(
                'views/create/AllAbilityList.js', 
                'collectionView initialized : %O', options);
            this.itemView = AllAbilityListItem;
            return this;
        }
    });

    return AllAbilityListCollection;
});

// ===========================================================================
//
//  AllAbilities Collection
//
//      Loads all abilities and creates a collectino for it
//
// ===========================================================================
define(
    'collections/AllAbilities',[ 'backbone', 'marionette', 'logger', 'events',
        'models/data-abilities',
        'models/Ability'
    ], function AllAbilitiesCollection(
        Backbone, Marionette, logger, events,
        dataAbilities,
        Ability
    ){

    var AllAbilities = Backbone.Collection.extend({
        model: Ability,

        initialize: function(models, options){
            var self = this;

            logger.log('collections:AllAbilities', 'initialize() called with:', {
                models: models,
                options:options
            });
            options = options || {};

            if(!options.callback){
                logger.log('warn:collections:AllAbilities', 'no callback passed');
            }

            // NOTE: Fetch data from local or server
            setTimeout(function(){
                // turn data to array, and create ability objects from data
                dataAbilities = _.filter(dataAbilities, function(d){ 
                    return new Ability(d); 
                });

                // Get data (for now, use local)
                logger.log('collections:AllAbilities', 'adding data: ', {
                    data: dataAbilities
                });

                self.add( dataAbilities );

                logger.log('collections:AllAbilities', 'added! models: ', {
                    models: self.models
                });

                setTimeout(function(){
                    if(options.callback){
                        // call callback
                        return options.callback(null, self.models);
                    }
                }, 20);

            }, 30);
        }
    });

    return AllAbilities;
});

// ===========================================================================
//
// PageHome
//      Main homepage - handles character creation
//
// TODO: Metrics on play time, etc. Every 30(?) seconds, ping server
// with stats
//
// ===========================================================================
define(
    'views/PageHome',[ 
        'd3', 'backbone', 'marionette',
        'analytics',
        'logger', 'events',
        'async',
        'models/Entity',

        // races
        'views/create/RaceList',
        'collections/Races',
        'models/Race',
        'views/create/RaceViz',

        // classes
        'views/create/ClassList',
        'collections/Classes',

        // abilities
        'views/create/AllAbilitiesList',
        'collections/Abilities',
        'collections/AllAbilities',

        'localForage',

    ], function viewPageHome(
        d3, backbone, marionette, 
        analytics,
        logger, events,
        async,
        Entity,
        RaceList,
        Races,
        Race,
        RaceViz,

        ClassList,
        Classes,

        AllAbilityList,
        Abilities,
        AllAbilities,

        localForage
    ){

    // CONFIG
    // ----------------------------------
    var ORIGINAL_BASE_DELAY = 1000;
    var baseDelay = ORIGINAL_BASE_DELAY;

    var HOME_DATA_KEY = 'game:createCharacter:initialState';

    // total number of abilities user can have
    var MAX_ABILITIES = 4;
    var START_DATE; // set when page is initialized

    // View 
    // ----------------------------------
    var PageHome = Backbone.Marionette.Layout.extend({
        template: '#template-page-home',
        'className': 'page-home-wrapper',

        'regions': {
            'regionRaceList': '#region-create-races',
            'regionClassList': '#region-create-classes',
            'regionAllAbilitiesList': '#region-create-all-abilities-list'
        },

        events: {
        },

        initialize: function initialize(options){
            // initialize:
            var self = this;

            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // ==========================
            // TODO: REMOVE THIS : DEV 
            // SKIP CREATE
            // ==========================
            return localForage.getItem('game:createCharacter:initialState', function(d){ EVENTS.trigger('controller:showGame', {dataToCreateGameModel: JSON.parse(d) }); });
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXX

            logger.log('pageHome', 'initialize() called');
            START_DATE = new Date();

            analytics.log({
                type: 'create',
                step: 0,
                message: 'initailize called',
                page: 'pageHome',
                time: START_DATE
            });

            // Create a new entity model for character create
            this.model = new Entity({});
            // no name by default
            this.model.attributes.name = null;

            // loaded from localstore
            this.initialData = options.initialData || null;

            // Setup races and collection
            this.races = new Races();
            this.raceListView = new RaceList({
                collection: this.races
            });

            // templates (classes)
            this.classes = new Classes();
            this.classListView = new ClassList({
                collection: this.classes
            });

            // all abilities collection and list
            this.allAbilitiesListView = {};

            this.allAbilities = new AllAbilities([], {
                callback: function(err, collection){
                    self.allAbilitiesListView = new AllAbilityList({
                        collection: self.allAbilities
                    });

                    logger.log('pageHome:setupAllAbilities', 
                    'callback called, set up allAbilitiesListView', {
                        list: self.allAbilitiesListView
                    });


                    // setup *abilities* here, so they will be setup by the time
                    // the abilities page fades in
                    setTimeout(function(){requestAnimationFrame(function(){
                        self.regionAllAbilitiesList.show(self.allAbilitiesListView);

                        requestAnimationFrame(function(){
                            logger.log('pageHome:setupAllAbilities',
                                'allAbilitiesListView is setup!');

                            self.isAbilitiesListSetup = true;

                            if(self.callbackAfterAbilityListSetup){
                                self.callbackAfterAbilityListSetup();
                            }
                        });
                    });}, 105);
                }
            });

            // --------------------------
            // Page - list click callbacks
            // --------------------------
            this.listenTo(events, 'create:page2:raceClicked', this.raceClicked);
            this.listenTo(events, 'create:page3:classClicked', this.classClicked);
            this.listenTo(events, 'create:page4:abilityClicked', this.abilityClicked);

            this.listenTo(events, 'create:page4:allAbilityMouseenter', this.allAbilityMouseenter);
            this.listenTo(events, 'create:page4:allAbilityMouseleave', this.allAbilityMouseleave);

            // --------------------------
            // final data page template
            // --------------------------
            this.finalDataPageTemplate = _.template(
                $('#template-create-final-data-page').html()
            );

            // --------------------------
            // keep track of selected abilities 
            // --------------------------
            this.selectedAbilities = new Abilities();

            // UTILITY
            // --------------------------
            // TODO: This should all be cleaned up and optimized
            function createAbilityIcon( model ){
                // returns an element
                return $('<img />')
                    .attr({
                        src:'/static/img/abilities/' + model.attributes.id + '.svg',
                        'class': 'ability-icon',
                        height: '60',
                        width: '60'
                    });
            }

            function removeImage( $el ){
                $('img', $el).remove();
                $el.addClass('empty-skill');
                return;
            }

            // Selected ability handlers
            // --------------------------
            this.listenTo(this.selectedAbilities, 'add', function(model, collection){
                var $el = self.$selectedAbilitiesEls[collection.indexOf(model)];
                removeImage($el);

                $el.removeClass('empty-skill');
                $el.append(createAbilityIcon(model));
            });

            this.listenTo(this.selectedAbilities, 'remove', function(model, collection, options){
                // When an item from the collection is removed, update the
                // element states. 
                // TODO: Fix this, right now it's emptying everything to ensure 
                //  selected abilities always match
                _.each(self.$selectedAbilitiesEls, function(el,i){
                    removeImage(el);
                });

                // add back all the selected icons
                _.each(collection.models, function(curModel, i){
                    self.$selectedAbilitiesEls[i].append(createAbilityIcon(curModel));
                    self.$selectedAbilitiesEls[i].removeClass('empty-skill');
                });

            });

            this.listenTo(this.selectedAbilities, 'reset', function(model, collection, options){
                _.each(self.$selectedAbilitiesEls, function(el){
                    removeImage(el);
                });
            });


            // Local Forage - fetching data
            // --------------------------

            // NOTE: If this is initialized with state data (i.e., the user
            // already created their character), skip all the intro stuff
            // and allow player to just change things
            if(this.initialData){
                // TODO: Fill in selections and skip steps
                this.setupInitialDataAndSkip( this.initialData );

            } else {
                localForage.getItem(HOME_DATA_KEY, 
                function loadedLocalData(stateData){
                    logger.log('pageHome:loadLocalData', 
                        'loaded data from local store: ', {
                            data: stateData
                    });

                    // turn to object and call setup initial data
                    self.setupInitialDataAndSkip( JSON.parse(stateData) );
                });
            }

            // ============================
            // TODO: DEV: SKIP BOOK
            // ============================

            return this;
        },
        
        // ==============================
        //
        //  initial data setup - skip everything
        //
        // ==============================
        setupInitialDataAndSkip: function( data ){
            var self = this;
            logger.log('pageHome:setupInitialDataAndSkip', 
                'called - filling in data and skipping steps', {
                    data: data
                });

            if(!data){
                logger.log('pageHome:setupInitialDataAndSkip', '[x] no data');
                return false;
            }

            // set delay / animations to immediate
            ORIGINAL_BASE_DELAY = 1;
            baseDelay = 1;
            
            // set pages completed based on data
            if(data.name){
                this.pagesCompleted[1] = true;

                // TODO: cancel all animations and immediately allow player to 
                // continue
                $('#create-name').val(data.name);
            }

            // setup model
            this.model.set({
                name: data.name
            });

            // trigger click events
            if(data.race){
                this.raceClicked({
                    model: new Race(data.race),
                    $el: $('#create-race-' + data.race.sprite)
                });

                if(self.$raceWrapper){
                    self.$raceWrapper.velocity({ opacity: 1 }, { duration: 100 });
                }
            }

            // set selected class and abilities
            // --------------------------
            if(data.className){
                $('#' + data.className).addClass('selected');
            }

            this.initialData = data;

            self.step1WriterCallback();
            self.page1Writer.trigger('finish');
            self.setupPage2();

            logger.log('pageHome:setupInitialDataAndSkip', 
                'finished setting up initial data');

            // TODO: cancel any animations in progress? 
            return this;
        },

        // ==============================
        //
        // cleanup
        //
        // ==============================
        onBeforeClose: function onBeforeClose(){
            logger.log('pageHome:onBeforeClose', 'called, cleaning up stuff');

            // ensure we unbind everything
            $('#create-book-final-start-button').off();
            $('#create-name').off();
            $('#arrow-right').off();
            $('#arrow-left').off();
            _.each(this.$selectedAbilitiesEls, function(el, i){ el.off(); });

            $('#create-abilities-filter-wrapper .label-filter').off();

            $(window).unbind();

            return this;
        },

        // ------------------------------
        //
        // onShow
        //
        // ------------------------------
        onShow: function homeOnShow(){
            // When the view is rendered, set everything up
            
            var self = this;
            logger.log('pageHome', 'onShow called');


            this.$bookWrapper = $('#book-wrapper');

            // setup races
            this.regionRaceList.show(this.raceListView);
            this.regionClassList.show(this.classListView);

            // keep reference to pages
            this.$pages = $('#book-pages', this.$el);

            // remove 'hidden' pages
            $('.hidden', this.$pages).removeClass('hidden');

            // Setup templates
            // --------------------------
            this.templateRaceDescription = _.template($('#template-create-race-description').html());
            this.templateRaceVisualization = _.template($('#template-create-race-description').html());

            // Seutp global "skip" behavior to allow skipping all the fade ins
            // TODO: 
            this.pagesCompleted = {
                1: false, // title page
                2: false, // race page
                3: false, // templates
                4: false, // abilities
                5: false, // overview of character
                6: false // final page - play
            };

            // Setup cached els
            this.$cachedEls = {
                nextStepArrow: $('#arrow-right'),
                previousStepArrow: $('#arrow-left'),
                page5name: $('#create-final-name')
            };

            // Setup pageturn
            this.setupPageturn();

            // Setup title page stuff
            this.setupPage1();

            return this;
        },

        // ------------------------------
        //
        // Pageturn util
        //
        // ------------------------------
        setupPageturn: function setupPageturn(){
            // Initializes the pageTurn animation library
            // TODO: Use https://github.com/codrops/BookBlock instead of turn.js
            //
            var self = this;
            this.curStep = 1;

            self.$pages.turn({
                display: 'double',
                acceleration: true,
                page: 2,
                //gradients: !$.isTouch,
                gradients: false,
                duration: 600,
                elevation: 100,

                when: {
                    // ------------------
                    //
                    // CALLBACK When page is turned
                    //
                    // ------------------
                    turned: function(e, page) {
                        logger.log('pageHome:pageTurn', 
                            'finished turning page : %O : %O', 
                            e, page);
                    }
                }
            });

            //disable page peel
            self.$pages.bind('start', 
                function (event, pageObject, corner){
                    if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br'){
                        event.preventDefault();
                    } 
                }
            );

            self.$pages.turn('disable', true);

            function pageNext(e){
                // Called to show the next page. This is state based, as
                // the user cannot see 
                // NOTE: Here, "step" means the set of of pages (step 1 is
                //      title / race, step 2 is templates / abilities, step 3
                //      is final)

                logger.log('pageHome:pageNext', 'curStep ' + self.curStep);

                self.$pages.turn('disable', false);

                // set the book wrapper's class
                self.setBookWrapperStep(self.curStep+1);

                if(self.curStep < 4){
                    logger.log('pageHome', '\t showing next page');
                    e.preventDefault();
                    self.curStep++;
                    self.$pages.turn('next');

                    // Templates / abilities
                    if(self.curStep === 2){
                        logger.log('pageHome:pageNext', 
                            'showing page 3...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[3] !== true){
                            logger.log('pageHome:pageNext', 'setting up page 3...');
                            self.setupPage3(); 

                        } else {
                            logger.log('pageHome:pageNext', 'showing page 3');
                            // Show it (don't setup)
                            self.showPage3(); 
                        }

                    } else if(self.curStep === 3){
                        // GO TO LAST STEP
                        logger.log('pageHome:pageNext', 
                            'showing step 3, page 5/6...');

                        // initial setup or show of page 3 (step 4 - templates)
                        if(self.pagesCompleted[5] !== true){
                            logger.log('pageHome:pageNext', 'setting up page 5');
                            self.setupPage5(); 
                        } else {
                            logger.log('pageHome:pageNext', 'showing page 5');
                            // Show it (don't setup)
                            self.showPage5(); 
                        }

                    }
                }

                // disable animation
                self.$pages.turn('disable', true);
            }

            function pagePrevious(e){
                // Called to show the previous page
                logger.log('pageHome:pagePrevious', 'curStep ' + self.curStep);

                self.$pages.turn('disable', false);
                // set the book wrapper's class
                self.setBookWrapperStep(self.curStep-1);
                
                if(self.curStep > 1){
                    logger.log('pageHome', '\t showing previous page');
                    e.preventDefault();
                    self.$pages.turn('previous');
                    self.curStep--;

                    // Step 1 is the first set of pages (title and race)
                    if(self.curStep === 1){
                        logger.log('pageHome:pagePrevious', 
                            'showing step 1...');

                        self.showPage2();

                    } else if(self.curStep === 2){
                        logger.log('pageHome:pagePrevious', 
                            'showing step 2...');

                        self.showPage3();
                    }
                }

                // disable again
                self.$pages.turn('disable', true);
            }



            // store functions for page turning
            this.pageNext = pageNext;
            this.pagePrevious = pagePrevious;
            
            // Turn pages on events
            // --------------------------
            $(window).bind('keydown', function(e){
                // Don't let pages go below 2 (we don't have a cover page) and
                // don't let it go above the number of pages we have
                //
                // NOTE: This is really hacky, should be same logic as
                // right / left arrow click
                logger.log('pageHome:pageTurn:keyPress', 
                    'key pressed : ' + e.keyCode + ' | curStep : ' + 
                    self.curStep);

                var now = new Date();

                // Left Arrow
                if (e.keyCode === 37) {
                    logger.log('pageHome:pageTurn:keyPress', 'going back');
                    if(self.curStep > 1){
                        analytics.log({
                            message: 'left key pressed! ' + 
                                'step : ' + self.curStep + ' to ' + (self.curStep - 1),
                            type: 'create:changeStep',
                            from: self.curStep, 
                            step: self.curStep,
                            to: self.curStep-1,
                            method: 'keyPress',
                            delta: (now - START_DATE) / 1000,
                            date: now
                        });
                        pagePrevious(e);
                    } else {
                        logger.log('pageHome:pageTurn:keyPress', 
                            'cannot go back');
                    }

                // Right Arrow
                } else if (e.keyCode === 39) {
                    // can we go forward?
                    if(
                        (self.curStep === 1 && self.pagesCompleted[2]) || 
                        (self.curStep === 2 && self.pagesCompleted[4])
                    ){
                        logger.log('pageHome:pageTurn:keyPress', 'going forward');

                        // only go to next page if models are set up
                        if(self.curStep === 2 && 
                        self.selectedAbilities.models && 
                        self.selectedAbilities.models.length < 4){
                            logger.log('pageHome:pageNext', '[x] cannot continue, no selected models');
                            self.handleInvalidAbilitySelection();
                            return false;
                        }

                        analytics.log({
                            message: 'right key pressed! ' + 
                                'step : ' + self.curStep + ' to ' + (self.curStep + 1),
                            type: 'create:changeStep',
                            from: self.curStep, 
                            to: self.curStep+1,
                            method: 'keyPress',
                            delta: (now - START_DATE) / 1000,
                            date: now
                        });

                        pageNext(e);

                    } else {
                        logger.log('pageHome:pageTurn:keyPress', '[x] cannot go forward');
                    }

                // Escape or enter
                } else if (e.keyCode === 27 || e.keyCode === 13){
                    // ------------------
                    // Skip all the transition stuff
                    // ------------------
                    logger.log('pageHome:pageTurn:keyPress', 
                        'enter or escape pressed, skipping transitions');

                    // are we on step 1?
                    if(self.curStep === 1 && self.pagesCompleted[1] === false){
                        // finish step 1
                        baseDelay = 1;

                        analytics.log({
                            type: 'create:skipIntro', 
                            message: (e.keyCode === 27 ? 'escape' : 'enter') +
                                ' key pressed on step 1', 
                            delta: (now - START_DATE) / 1000,
                            step: self.curStep,
                            date: now
                        });

                        self.step1DidPressEscape = true;
                        self.step1WriterCallback();
                        self.page1Writer.trigger('finish');
                        self.setupPage2();

                        setTimeout(function(){ 
                            baseDelay = ORIGINAL_BASE_DELAY; 
                        }, ORIGINAL_BASE_DELAY * 0.2);
                    }
                }
            });

            // arrows
            var $arrowRight = $('#arrow-right');
            $arrowRight.click(function(e){
                logger.log('pageHome:arrowClick', 'arrow-right clicked'); 
                var now = new Date();

                // if the arrow is NOT visible, do nothing
                if($arrowRight.hasClass('fadeOut') || $arrowRight.css('opacity') < 0.01){
                    logger.log('pageHome:arrowClick', 'clicked but arrow is hidden');
                    return false;
                }

                analytics.log({
                    message: 'arrow-right button clicked! ' + 
                        'step : ' + self.curStep + ' to ' + (self.curStep + 1),
                    type: 'create:changeStep',
                    from: self.curStep, 
                    step: self.curStep,
                    to: self.curStep+1,
                    method: 'click',
                    delta: (now - START_DATE) / 1000,
                    date: now
                });

                if(
                    // step 1 to step 2
                    (self.curStep === 1 && self.pagesCompleted[2]) || 
                    // step 2 to step 3 
                    // TODO - THIS IS FOR DEVELOPMENT, have another page
                    // REMOVE false
                    (self.curStep === 2 && self.pagesCompleted[4])
                ){
                    // only go to next page if models are set up
                    if(self.curStep === 2 && 
                    self.selectedAbilities.models && 
                    self.selectedAbilities.models.length < 4){
                        logger.log('pageHome:pageNext', '[x] cannot continue, no selected models');
                        self.handleInvalidAbilitySelection();
                        return false;
                    }

                    return pageNext(e);
                }

            });

            var $arrowLeft = $('#arrow-left');
            $arrowLeft.click(function(e){
                if($arrowLeft.hasClass('fadeOut') || $arrowLeft.css('opacity') < 0.01){
                    logger.log('pageHome:arrowClick', 'clicked but arrow is hidden');
                    return false;
                }

                var now = new Date();
                analytics.log({
                    message: 'arrow-left button clicked! ' + 
                        'step : ' + self.curStep + ' to ' + (self.curStep - 1),
                    type: 'create:changeStep',
                    from: self.curStep, 
                    step: self.curStep,
                    to: self.curStep-1,
                    method: 'click',
                    delta: (now - START_DATE) / 1000,
                    date: now
                });
                logger.log('pageHome:arrowClick', 'arrow-left clicked');
                return pagePrevious(e);
            });
        },

        setBookWrapperStep: function setBookWrapperStep ( step ){
            // remove other step classes
            this.$bookWrapper.removeClass('step-1 step-2 step-3');
            this.$bookWrapper.addClass('step-' + step);
            return this;
        },

        // ===================================================================
        //
        // Page 1  - Title
        // 
        // ===================================================================
        setupPage1: function setupStep1(){
            // Sets up flow for the title page
            //
            // TODO: Think of best on board flow. Fade in word by word?
            // TODO: When mouse over bottom left, should the name text
            // fade in automatically instead of waiting for the user to read
            // the text?
            logger.log('pageHome:setupPage1', 'called. baseDelay: ' + baseDelay);

            var self = this;
            var $paragraph = $('#book-page-title p', this.$el);
            var $paragraphName = $('#name-input-wrapper');

            var animation = 'fadeInDown';
            var $name = $('#create-name');
            var enteredText = false;

            $($paragraph[0]).velocity({ opacity: 1 });
            $($paragraph[0]).addClass('animated ' + animation);
        
            // Setup writer callback
            self.step1WriterCallbackCalled = false;

            self.step1WriterCallback = function writerCallback(wasCancelled){
                // Called when all words have been faded, or when the
                // user clicks on text
                logger.log('pageHome', 
                    '\t finished showing words, was cancelled? : %O',
                    wasCancelled);

                // if already called, do nothing
                if(self.step1WriterCallbackCalled){ 
                    logger.log('pageHome', 
                        '\t\t step1WriterCallbackCalled is TRUE. should return');
                }
                // TODO: it only seems to show up the second time this is
                // called. why?
                
                self.step1WriterCallbackCalled = true;

                requestAnimationFrame(function(){
                    $paragraphName.velocity({ opacity: 1 });
                    $paragraphName.addClass('animated fadeInUp');
                });

                setTimeout(function(){
                    $paragraphName.removeClass('animated fadeInUp');
                }, 1000);

                // Show the name input box
                if(self.step1nameTimeout){
                    clearTimeout(self.step1nameTimeout);
                }
                
                self.step1nameTimeout = setTimeout(function showName(){
                    logger.log('pageHome', 
                        '\t\t showName() called, showing input...');

                    $name.velocity({ opacity: 1 });
                    $name.attr('placeholder', 'Name');

                    // if they skipped through the intro, don't do anything to
                    // the name input
                    if(!self.step1DidPressEscape){
                        $name.addClass('animated fadeInLeft');
                        $name.attr('placeholder', '');

                        // don't fuck with the placeholder if the name is already set
                        // from initial data
                        if(!self.model.attributes.name){
                            // Fade in "name text"
                            async.eachSeries(['N','Na','Nam','Name'], 
                            function(val, cb){
                                $name.attr('placeholder', val);

                                setTimeout(function(){
                                    cb();
                                }, baseDelay * 0.8);
                            }, function allDone (){ 
                                logger.log('pageHome', '\t\t pulsating name : entetedText: %O',
                                    enteredText);

                                // remove fade in left class to prevent it triggering later
                                $name.removeClass('fadeInLeft');

                                //// No longer pulsating
                                if(!enteredText){
                                    $name.removeClass();
                                    self.step1$namePulse = setTimeout(function(){
                                        logger.log('pageHome', '\t\t adding pulsate : %O');
                                        $name.addClass('animated-subtle pulse-subtle infinite');
                                    }, baseDelay * 1.8);
                                }
                            });
                        } else {
                            // setup page 2 (if it hasn't been setup yet)
                            // the username already exists at this point
                            self.setupPage2();
                        }
                    }

                }, baseDelay / 2);
            };

            // --------------------------
            // Fade in text
            // --------------------------
            self.page1Writer = $('#create-title-intro-text').wordWriter({
                finalCss: { opacity: 0.8 },

                callback: self.step1WriterCallback
            });

            // Remove the pulsating effect when user clicks input
            $name.focus(function (){ 
                logger.log('pageHome', '\t name focused');

                var now = new Date();
                analytics.log({
                    message: 'name input box focused',
                    type: 'create:nameFocus',
                    step: self.curStep,
                    delta: (now - START_DATE) / 1000,
                    date: now
                });
                //// No longer pulsating
                clearTimeout(self.step1$namePulse);
                $name.removeClass('pulse-subtle infinite'); 

                if(self.pagesCompleted[1] === true){
                    logger.log('pageHome', '\t [x] already setup page2');
                    return false;
                }

                enteredText = true;

                setTimeout(function showPage2(){
                    // DONE, Show page 2
                    $name.removeClass('pulse-subtle infinite'); 
                    logger.log('pageHome', 
                        '\t setupPage1: calling setupPage2...');
                    self.setupPage2();

                }, baseDelay * 0.7);
            });

            $name.on('input change', function(e){
                // After input has been changed, user can continue to the
                // second page (race selection)
                logger.log('pageHome:setupPage1:nameChange', 
                    'input change event triggered on name');

                var name = $(this).val();
                if(!name || name.length < 1){
                    name = self.model.generateName();
                }
                self.model.set({ name: name });
                self.$cachedEls.page5name.html(name);
            });

            // if the username already exists, set up next page
            if(self.model.attributes.name){
                logger.log('pageHome:setupPage1', 'model has name: ' +
                    self.model.attributes.name + ' | finishing step 1...');
                self.step1WriterCallback();
                self.page1Writer.trigger('finish');
                self.setupPage2();
            }

            // remove the animated fade class
            setTimeout(function(){
                $($paragraph[0]).removeClass('animated ' + animation);
            },900);

            return this;
        },

        // ===================================================================
        //
        // Page 2 - Race
        // 
        // ===================================================================
        setupPage2: function setupPage2 (){
            var self = this;

            if(self.page2SetupCalled){ return false; }
            self.page2SetupCalled = true;

            logger.log('pageHome', 'setupPage2() called');

            this.pagesCompleted[1] = true;

            var animation = 'fadeInDown';
            var $raceHeader = $('#create-race-header');
            var $raceWrapper = $('#create-race-wrapper');
            self.$raceHeader = $raceHeader;
            self.$raceWrapper = $raceWrapper;

            $raceHeader.velocity({ opacity: 1 });
            $raceHeader.addClass('animated fadeInDown');

            // then show the selection
            if(ORIGINAL_BASE_DELAY > 1){
                setTimeout(function(){
                    logger.log('pageHome:setupPage2', 'setup page 2 with delay');

                    $raceWrapper.velocity({ opacity: 1 });
                    $raceWrapper.addClass('animated fadeInUp');
                }, baseDelay * 0.8);
            } else {
                logger.log('pageHome:setupPage2', 'setup page 2 with no delay');
                $raceWrapper.velocity({ opacity: 1 }, { duration: 100 });
            }

            // remove the animated classes so page switches don't re-trigger
            // transitions
            setTimeout(function removeAnimatedClasses(){
                $raceWrapper.removeClass();
                $raceHeader.removeClass();
            }, baseDelay * 5);

            return this;
        },

        // ------------------------------
        //
        // race clicked
        //
        // ------------------------------
        raceClicked: function raceClicked (options){
            // Called when a race is clicked. Show the race description,
            // and allow user to progress to next step
            //
            logger.log('pageHome', 'raceClicked() passed options: %O',
                options);
            var self = this;

            // if a disabled race was clicked, do nothing
            if(options.model.attributes.disabled){
                logger.log('pageHome', '[x] race disabled');
                $('.item', options.$el).addClass('shake shake-constant');
                setTimeout(function(){
                    $('.item', options.$el).removeClass('shake shake-constant');
                }, 200);

                return this;
            }

            if(this.pagesCompleted[1] !== true){
                logger.log('pageHome', '[x] first page incomplete, must enter name');
                return false;
            }

            // done with race page
            this.pagesCompleted[2] = true;

            // Show the right arrow
            setTimeout(function(){
                requestAnimationFrame(function(){
                    self.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
                    self.$cachedEls.nextStepArrow.addClass('animated fadeIn');
                });
            }, ORIGINAL_BASE_DELAY * 0.04);
            
            // If the same race was clicked, do nothing
            if(this._previousRaceSelected === options.model.attributes.name){
                logger.log('pageHome', '[x] same race selected, doing nothing');
                return false;
            }

            // ==========================
            // Update description and race viz, allow going to next page,
            // pulsate arrow
            // ==========================
            this.model.set({ race: options.model });
            
            // --------------------------
            // Race Visualization
            // --------------------------
            // Only do this once (if no previous race was selected)
            if(!this.raceViz){
                this.$raceViz = this.$raceViz || $('#home-race-visualization');

                // setup viz object
                this.raceViz = new RaceViz( this.$raceViz );
                
                setTimeout(function(){
                    self.$raceViz.addClass('animated fadeIn');

                    requestAnimationFrame(function(){
                        self.raceViz
                            .data(options.model.attributes)
                            .update();
                    });

                    // remove fadeIn class when the animation is over
                    setTimeout(function(){
                        self.$raceViz.css({ opacity: 1 });
                        self.$raceViz.removeClass('fadeIn');
                    }, ORIGINAL_BASE_DELAY * 0.8);
                }, ORIGINAL_BASE_DELAY * 0.2);
                
            } else {
                // otherwise, update the data
                requestAnimationFrame(function(){
                    self.raceViz
                        .data(options.model.attributes)
                        .update();
                });
            }

            // store state
            this._previousRaceSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            // --------------------------
            $('#region-create-races .race-list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            // Race description
            // --------------------------
            this.$raceDescription = this.$raceDescription || $('#home-race-description');
            if(!this.$raceDescription){ 
                logger.log('error', 'this.$raceDescription does not exist');
                return false;
            }

            logger.log('pageHome', 'raceDescription: %O', this.$raceDescription);

            requestAnimationFrame(function(){
                // Show race description
                self.$raceDescription.velocity({ opacity: 0 });
                self.$raceDescription.addClass('fadeOut');
            });

            clearTimeout(this.raceDescriptionFadeIn);
            clearTimeout(this.raceDescriptionFadeIn2);

            // update the HTML below the race info
            // --------------------------
            this.raceDescriptionFadeIn = setTimeout(function(){
                // update the race description div with the template
                requestAnimationFrame(function(){
                    self.$raceDescription.html(
                        self.templateRaceDescription({ model: options.model })
                    );

                    self.$raceDescription.velocity({ opacity: 1 });
                    self.$raceDescription.css({ opacity: 1 });
                    //self.$raceDescription.removeClass('fadeOutDown');
                    
                    self.$raceDescription.removeClass('fadeOut');
                    self.$raceDescription.addClass('animated fadeIn');
                });

            }, baseDelay / 5);

            // --------------------------
            // Pulsate arrow
            // --------------------------
            // clear existing timeout
            clearTimeout(self.page2arrowPulseTimeout);
            // remove pulse class when race is clicked
            $('.arrow', self.$cachedEls.nextStepArrow).removeClass('pulse infinite');

            this.page2arrowPulseTimeout = setTimeout(function() {
                $('.arrow', self.$cachedEls.nextStepArrow).addClass('pulse infinite');
            }, baseDelay * 4); 

            return this;
        },

        // ------------------------------
        // SHOW Page 2 
        //      Called when page turns to page 2
        // ------------------------------
        showPage2: function showPage2(){
            var self = this;

            self.$cachedEls.nextStepArrow.removeClass('fadeOut');
            self.$cachedEls.nextStepArrow.addClass('fadeIn');

            self.$cachedEls.previousStepArrow.removeClass('fadeIn');
            self.$cachedEls.previousStepArrow.addClass('animated fadeOut');
            return this;
        },

        // ===================================================================
        //
        // Page 3 - Templates
        // 
        // ===================================================================
        cleanupPage2: function cleanupPage2(){
            // Removes any classes that would trigger reanimataions from page2
            this.$raceDescription.removeClass('fadeIn');
            return this;
        },

        setupPage3: function setupPage3 (){
            // This is called *initially* to set up the third page. Once setup
            // it is not called again
            var self = this;

            this.cleanupPage2();

            logger.log('pageHome:setupPage3', 'setupPage3() (templates) called');

            if(this.pagesCompleted[3]){ 
                logger.log('pageHome:setupPage3', 
                    '[x] third page complete already, returning');
                return this;
            }

            this.pagesCompleted[3] = true;

            // remove existing arrow pulsate
            clearTimeout(this.page2arrowPulseTimeout);
            clearTimeout(this.page3arrowPulseTimeout);
            $('.arrow', self.$cachedEls.nextStepArrow).removeClass('pulse infinite');

            // hide the right arrow
            self.$cachedEls.nextStepArrow.addClass('fadeOut');
            
            // show the previous arrow after a delay
            setTimeout(function(){
                logger.log('pageHome:setupPage3', 'showing previous step arrow');
                self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
                self.$cachedEls.previousStepArrow.removeClass('fadeOut');
                self.$cachedEls.previousStepArrow.addClass('fadeIn');
            }, baseDelay / 3 | 0);

            // setup the fade ins
            var $classWrapper = $('#create-classes-wrapper');
            var $rCreateClasses = $('#region-create-classes');

            function finishWordWriter(){
                // When the text has come in, show the lists

                // Show classes when done
                $rCreateClasses.velocity({ opacity: 1 });
                $rCreateClasses.addClass('animated fadeInTop');
                $rCreateClasses.removeClass('opacity-zero');

                // SHOW SELECTED ABILITIES
                setTimeout(function(){requestAnimationFrame(function(){
                    $('#create-selected-abilities-wrapper').addClass('visible');
                });}, ORIGINAL_BASE_DELAY * 0.5);

                // if there is existing data, set the initial selection
                if(self.initialData && self.initialData.className){
                    setTimeout(function(){
                        requestAnimationFrame(function setupInitialClassData(){
                            $('#' + self.initialData.className).click();

                            // set selected abilities (if custom)
                            // NOTE: this is ugly and hacky.
                            if(self.initialData.className === 'create-race-custom'){

                                // manually select abilities 
                                setTimeout(function(){requestAnimationFrame(function(){
                                    _.each(self.initialData.abilities, function(ability){
                                        $('#create-all-ability-' + ability.id).click();
                                    });
                                });}, 20);
                            }
                        });
                    }, 380);
                }
            }

            // then show the selection
            setTimeout(function(){
                $classWrapper.velocity({ opacity: 1 });

                setTimeout(function(){requestAnimationFrame(function(){
                    $('#create-classes-description').removeClass('opacity-zero');

                    if(ORIGINAL_BASE_DELAY > 10){
                        $('#create-classes-description').wordWriter({
                            finalCss: { opacity: 0.8 },
                            callback: finishWordWriter 
                        });
                    } else {
                        finishWordWriter();
                    }

                    self.page3canClickClass = true;
                });}, baseDelay * 0.2);

            }, baseDelay * 0.8);

            // remove the animated classes so page switches don't re-trigger
            // transitions
            setTimeout(function removeAnimatedClasses(){
                $classWrapper.removeClass();
                $rCreateClasses.removeClass('animated fadeIn fadeInTop opacity-zero');
            }, baseDelay * 5);


            return this;
        },

        showPage3: function showPage3 (){
            // This is called whenever player goes from page 2 to page 3
            var self = this;
            logger.log('pageHome:setupPage3', 'showPage3() (classes) called: ', {
                page3Complete: this.pagesCompleted[3]
            });

            clearTimeout(this.page2arrowPulseTimeout);
            clearTimeout(this.page3arrowPulseTimeout);

            // hide the right arrow ONLY if the player hasn't selected their
            // abilities
            if(this.pagesCompleted[3] !== true){ 
                self.$cachedEls.nextStepArrow.addClass('fadeOut');
            } else {
                // player has already selected their abilities at this point,
                // so show the next arrow step
                self.$cachedEls.nextStepArrow.removeClass('fadeOut');
            }

            // show the previous arrow 
            self.$cachedEls.previousStepArrow.velocity({ opacity: 1 });
            self.$cachedEls.previousStepArrow.removeClass('fadeOut fadeOutRight');
            self.$cachedEls.previousStepArrow.addClass('fadeIn');
            return this;
        },

        classClicked: function classClicked (options){
            // when clicking on a calling / class, show the ability list
            logger.log('pageHome:classClicked', 'classClicked() passed options: %O',
                options);
            var self = this;

            if(!self.page3canClickClass){
                return false;
            }

            // if a disabled class was clicked, do nothing
            if(options.model.attributes.disabled){
                logger.log('pageHome:classClicked', '[x] class disabled');
                return this;
            }

            // ensure no reclicks - is set to true once we're all done here
            self.page3canClickClass = false;

            // done with class page
            self.pagesCompleted[3] = true;

            // If the same class was clicked, do nothing
            if(self._previousClassSelected === options.model.attributes.name){
                logger.log('pageHome:classClicked', '[x] same class selected, doing nothing');
                self.page3canClickClass = true;
                return false;
            }

            // store state
            self._previousClassSelected = options.model.attributes.name;

            // remove selected class from other entity selections
            // --------------------------
            $('#region-create-classes .list-item.selected')
                .removeClass('selected');

            // add selected class to selected entity
            options.$el.addClass('selected');

            // doo all the side effects after the next animation frame
            requestAnimationFrame(function(){

                self.page3canClickClass = true;

                // show the next step icons
                self.$cachedEls.nextStepArrow.velocity({ opacity: 1 });
                self.$cachedEls.nextStepArrow.addClass('animated fadeIn');
                self.$cachedEls.nextStepArrow.removeClass('fadeOut');

                self.setupPage4();

                // --------------------------
                // Select abilities
                // --------------------------
                if(!self.$step4AbilityListItems){
                    self.$step4AbilityListItems = $('#region-create-all-abilities-list .list-item');
                }
                if(!self.$step4AbilityList){
                    self.$step4AbilityList = $('#region-create-all-abilities-list');
                }

                self.$step4AbilityListItems.removeClass('selected');
                // empty the currently selected abilities
                self.selectedAbilities.reset();

                // select abilities from model list
                requestAnimationFrame(function(){
                    _.each(options.model.attributes.abilities, function(id){
                        requestAnimationFrame(function(){
                            $('#create-all-ability-' + id).addClass('selected');

                            // add model
                            var ability = self.allAbilities.findWhere({
                                id: id
                            });
                            self.selectedAbilities.add(ability);
                        });
                    });
                });

            });

            return self;
        },

        // =================================================================
        //
        // Page 4
        //
        // =================================================================
        setupPage4: function setupPage4 (){
            var self = this;

            if(self.page4SetupCalled){
                // Only call once
                logger.log('pageHome:setupPage4:called:returning', 
                    '[x] setting up page 4 called, but was already called. returning');
                return false;
            }

            logger.log('pageHome:setupPage4', 'setting up page 4');
            self.page4SetupCalled = true;

            // setup selected ability elements ( on the left page )
            this.$selectedAbilitiesEls = [
                $('#create-selected-abilities-1'),
                $('#create-selected-abilities-2'),
                $('#create-selected-abilities-3'),
                $('#create-selected-abilities-4')
            ];

            // change description when mousing over ability
            this.$step4templateDescription =
                _.template($('#template-create-abilities-item-info').html());
            this.$step4abilityDescription = $('#create-all-abilities-description');

            // when user mouses over item, update description
            _.each(this.$selectedAbilitiesEls, function(el, i){
                el.on('mouseenter', function(){
                    self.step4UpdateDescription(self.selectedAbilities.models[i]);
                    if(self.selectedAbilities.models[i]){
                        $(el).addClass('hover');
                    }
                });

                el.on('mouseleave', function(){
                    // reset html
                    self.step4ResetAbilityDescription();
                    $(el).removeClass('hover');
                });

                el.on('click', function(){
                    // remove selected ability
                    if(self.selectedAbilities.models[i]){
                        self.abilityClicked({
                            $el: $('#create-all-ability-' + self.selectedAbilities.models[i].id),
                            model: self.selectedAbilities.models[i]
                        });

                        $(el).removeClass('hover');
                    }
                });
            });

            // Setup filter icons
            var $filters = $('#create-abilities-filter-wrapper .label-filter');

            // all filters are active by default
            this.abilitiesFilterActive = {};
            this.$abilitiesListItemsByType = {};

            //NOTE: all ability items are rendered by now
            _.each($filters, function(el, i){
                var curSpellType = $(el).attr('data');

                self.abilitiesFilterActive[curSpellType] = true;
                self.$abilitiesListItemsByType[curSpellType] = $('#region-create-all-abilities-list .' + curSpellType);
            });

            // Add click behaviour to toggle which abilities are shown
            // --------------------------
            $filters.on('click', function(el, i){
                logger.log('pageHome:pageAbilities:filter:clicked', 
                    'filter clicked: %o', el);

                // note: must use parent() since the child element that got 
                // clicked takes up the entire DOM element
                var $parent = $(el.target).parent();
                
                var clickedSpellType = $parent.attr('data');
                $parent.toggleClass('inactive');

                self.abilitiesFilterActive[clickedSpellType] = !self.abilitiesFilterActive[clickedSpellType];

                // Show / hide based on selected filters. Hide all that match, 
                // then show all that match
                _.each(self.abilitiesFilterActive, function(isActive, type){
                    if(!isActive){
                        self.$abilitiesListItemsByType[type]
                            .addClass('hide-from-list');
                    }
                });
                _.each(self.abilitiesFilterActive, function(isActive, type){
                    if(isActive){
                        self.$abilitiesListItemsByType[type]
                            .removeClass('hide-from-list');
                    }
                });
            });

            // Add hover behavior to show info about filter
            // --------------------------
            $filters.on('mouseenter', function(el, i){
                var $parent = $(el.target).parent();
                var spellType = $parent.attr('data');
                $parent.addClass('hover');

                self.$step4abilityDescription.html(
                    $('#template-create-abilities-filter-info-' + spellType).html()
                );
            });
            $filters.on('mouseleave', function(el, i){
                var $parent = $(el.target).parent();
                var spellType = $parent.attr('data');
                $parent.removeClass('hover');

                self.$step4abilityDescription.empty();
            });

            return this.showPage4();
        },

        showPage4: function showPage4 () { 
            var self = this;
            logger.log('pageHome:setupPage4', 'showing page 4');

            $('#create-abilities-header').velocity({ opacity: 1 });

            $('#create-abilities-wrapper').velocity({ opacity: 1 });
            $('#region-create-all-abilities-list').velocity({ opacity: 1 });

            setTimeout(function(){requestAnimationFrame(function(){
                $('#region-create-all-abilities-list').removeClass('opacity-zero');
                $('#create-abilities-wrapper').removeClass('opacity-zero');
            });}, 100);

            self.page4canClickAbility = true;

            // TODO: set this after all abilities selected
            this.pagesCompleted[4] = true;

            return this;
        },

        // ------------------------------
        // Step 4 - UTILITY
        // ------------------------------
        step4UpdateDescription: function(model){
            // Updates the description based on passed in model
            // TODO: Flesh this out
            var self = this;

            logger.log('pageHome:step4UpdateDescription', 
            'called with model', {
                model: model
            });

            // do it after a small delay so we don't mess up other hover effects
            requestAnimationFrame(function(){
                // provide a default description if none is available in the
                // model
                var attrs = {
                    description: '', name: '',
                    id: '', castTime: '',
                    data: Abilities.prototype.dataConfig
                };

                if(model && model.attributes && model.attributes.description){
                    attrs = model.attributes;
                }

                attrs.data = Abilities.prototype.dataConfig;

                if(self.$step4abilityDescription){
                    self.$step4abilityDescription.html( 
                        self.$step4templateDescription( attrs )
                    );

                    // TODO: Could add in d3 stuff here
                }

            });

            return this;
        },

        step4ResetAbilityDescription: function ste4ResetHtml(){
            // Called on mouseleave of selected abilities or ability list items
            if(this.$step4abilityDescription){
                this.$step4abilityDescription.html(''); 
            }
            return this;
        },


        changeToCustomClass: function changeToCustomClass(){
            // Select new ability, change class to "Custom"
            $('#region-create-classes .selected').removeClass('selected');
            $('#create-race-custom').addClass('selected');

            // store state
            this._previousClassSelected = 'Custom';
        },

        // ------------------------------
        // All ability callbacks
        // ------------------------------
        allAbilityMouseenter: function allAbilityMouseenter (options){
            this.step4UpdateDescription(options.model);

            // TODO: If we want to add a class on hover do it here but also
            // remove it on fiter buttons and selected ability icons
            if(this.$step4AbilityListItems){
                this.$step4AbilityListItems.removeClass('description-shown');
                $('#create-all-ability-' + options.model.id).addClass('description-shown');
            }
            return this;
        }, 

        allAbilityMouseleave: function allAbilityMouseleave (options){
            // TODO: QUESTION: Should we do nothing on mouseleave?
            return this;

            this.step4ResetAbilityDescription();
            return this;
        }, 

        abilityClicked: function abilityClicked ( options ){
            logger.log('pageHome:abilityClicked', 'passed options: %O',
                options);
            var self = this;

            if(!self.page4canClickAbility){
                logger.log('pageHome:abilityClicked', '[x] cannot click, returning false');
                return false;
            }

            // is the ability already selected?
            if(this.selectedAbilities.indexOf(options.model) > -1){
                // Yes, the model was selected. Remove it
                this.selectedAbilities.remove(options.model);
                options.$el.removeClass('selected');
                this.changeToCustomClass();

            } else {
                // no, the model was NOT selected. Add it IF there is enough
                // room in the selected abilities array
                if(this.selectedAbilities.models.length >= MAX_ABILITIES){
                    // If there are too many abilities selected, do a shake
                    logger.log('pageHome:abilityClicked', 
                        'too many abilities selected, cannot add another');

                    // add an indicator that the player has too many skills selected
                    self.$abilitySelectedSkillsH3 = self.$abilitySelectedSkillsH3 || $('#selected-skills-h3');
                    self.$abilitySelectedSkillsH3.addClass('flash');
                    $('#create-selected-abilities-wrapper').addClass('shake shake-constant');

                    //// shake ability (NOTE: Fucks up other els that have filters
                    $('.item', options.$el).addClass('shake shake-constant');

                    setTimeout(function(){requestAnimationFrame(function(){
                        self.$abilitySelectedSkillsH3.removeClass('flash');

                        //// adjust clicked ability
                        $('.item', options.$el).removeClass('shake shake-constant');

                        $('#create-selected-abilities-wrapper').removeClass('shake shake-constant');
                    });}, 220);

                } else {
                    // There is space for it, add it
                    this.selectedAbilities.add(options.model);
                    options.$el.addClass('selected');
                    this.changeToCustomClass();
                }
            } 
        },

        handleInvalidAbilitySelection: function handleInvalidAbilitySelection(){
            // called when not enough abilities are selected and you try to
            // go to the next page
            logger.log('pageHome:handleInvalidAbilitySelection', 
                'called');
            
            // TODO: MAJOR: This....make it look better
            self.$abilitySelectedSkillsH3 = self.$abilitySelectedSkillsH3 || $('#selected-skills-h3');
            self.$abilitySelectedSkillsH3.addClass('flash'); 

            // TODO: shake hotkeys that don't have an ability
            $('#create-selected-abilities-wrapper .empty-skill')
                .addClass('shake shake-constant');

            setTimeout(function(){
                self.$abilitySelectedSkillsH3.removeClass('flash');
                $('#create-selected-abilities-wrapper .empty-skill')
                    .removeClass('shake shake-constant');
                $('#create-selected-abilities-wrapper .create-selected-abilities-item')
                    .removeClass('shake shake-constant');
            }, 210);
        
            return this;
        },

        // ==============================
        //
        // Page 5 - Final steps, confirm
        //
        // ==============================
        setupPage5: function setupPage4(){
            logger.log('pageHome:setupPage5', 'setting up page 5');
            var self = this;

            if(self.page5SetupCalled){ return false; }
            self.page5SetupCalled = true;

            // if name hasn't been set yet, set it.
            if(!this.model.attributes.name){
                this.model.set({name: this.model.generateName()});
                $('#create-name').val(this.model.attributes.name);
            }

            return this.showPage5();
        },

        showPage5: function showPage5(){
            var self = this;
            logger.log('pageHome:showPage5', 'showing page 5', {
                selectedAbilityModels: this.selectedAbilities.models
            });

            // hide next arrow
            self.$cachedEls.nextStepArrow.addClass('animated fadeOut');

            if(this.selectedAbilities.models){
                logger.log('pageHome:showPage5', 
                    'setting model with selected abilities');
                this.model.set({
                    abilities: new Abilities(
                        this.selectedAbilities.models
                    )
                });
            }

            // setup final variables
            // update template
            if(!this.$finalDataWrapper){
                this.$finalDataWrapper = $('#create-final-data-wrapper');
            }
            var $finalDataWrapper = this.$finalDataWrapper;

            $finalDataWrapper.html(this.finalDataPageTemplate(
                _.extend(this.model.attributes, {
                    selectedAbilities: this.selectedAbilities.models,
                    className: $('#region-create-classes .selected .list-item-name')
                        .html().trim()
                })
            ));

            function finishShowingFinalData(){
                // called after the final data stuff has been filled in
                $('#create-book-page-final-confirm').addClass('animated fadeIn');
                setTimeout(function(){
                    $('#create-book-page-final-confirm').removeClass('opacity-zero');
                }, 200);
            }
            
            // Show everything
            if(!this.initialData && this.pagesCompleted[5] !== true){
                // If it HASN'T been shown yet, fade it in
                $finalDataWrapper.removeClass('opacity-zero');
                finishShowingFinalData();

            } else {
                // Already been completed, show things immediately
                $finalDataWrapper.removeClass('opacity-zero');
                finishShowingFinalData();
            }

            // Finish create process when continue is clicked....
            // add event listener for final start button
            $('#create-book-final-start-button').off();
            $('#create-book-final-start-button').on('click', function(){
                logger.log('pageHome', 'final start button clicked');
                self.finishCreateProcess();
            });


            // set immediately, no further action required
            this.pagesCompleted[5] = true;

            return this;
        },

        // ==============================
        //
        // ALL FINISHED
        // 
        // ==============================
        finishCreateProcess: function finishCreateProcess(){
            // Called when the creation process is completely finished.
            //
            // TODO: show an in app prompt
            var self = this;
            logger.log('pageHome', 'Finished! : %O',
                this.model);

            // setup model with abilities
            // TODO: ensure things aren't stuck around in memory
            this.model.set({
                abilities: new Abilities(
                    this.selectedAbilities.models
                )
            });

            // STORE data
            // TODO: store a clone of this entity model. 
            // currently, only save change properties. it's a bit hacky
            var dataToSet = {
                name: this.model.attributes.name,
                race: this.model.attributes.race,
                className: $('#region-create-classes .selected').attr('id'),
                abilities: this.selectedAbilities.toJSON()
            };
            logger.log('pageHome', 'setting local data: ', {
                data: dataToSet
            });

            var now = new Date();
            analytics.log({
                message: 'finish create process',
                type: 'create:finish',
                step: self.curStep,
                delta: (now - START_DATE) / 1000,
                date: now,
                entity: dataToSet
            });

            // Setup the data locally
            dataToSet = JSON.stringify(dataToSet);
            localForage.setItem(HOME_DATA_KEY, dataToSet);

            // remove page turn 
            this.$pages.turn('disable', true);
            this.$pages.turn('destroy').remove();

            // TODO: Clean up book, do some cool animation?


            // TODO: only trigger if prompt is true
            // If done, show the game and pass in the entities
            requestAnimationFrame(function(){
                events.trigger('controller:showGame');
            });
            return this;
        }

    });

    return PageHome;
});

/* =========================================================================
 *
 * abilities
 *  data file containing all abilities
 *  TODO: Is this used? Don't think so
 *
 *  ======================================================================== */
define(
'data/abilities',[ 'logger', 'util/Timer' ], function( logger, Timer){
    // Here be abilities. This would be loaded in a DB and entities would
    // get abilities from server
    var abilities = {

        'magic-missile': {
            name: 'Magic Missle',
            effectId: 'magicMissle',
            castTime: 2,
            timeCost: 2,
            validTargets: ['enemy'],
            type: 'magic',
            element: {light: 0.7, fire: 0.3},
            damage: 15
        },

        'fireball': {
            name: 'Fireball',
            effectId: 'fireball',
            castTime: 4,
            timeCost: 4,
            validTargets: ['enemy'],
            type: 'magic',
            element: 'fire',
            damage: 40
        }

    };

    return abilities;
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
        'models/Ability',
        'data/abilities'
        // TODO : remove this, get from server
        ,'models/data-races'
    ], function MapModel(
        Backbone, Marionette, logger,
        events, d3, API_URL,
        Entities, Entity,

        Abilities,
        Ability,
        dataAbilities,
        RACES
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

            // TODO: :::::::::::::::: 
            // Randomize enemies better, get enemies from server!
            if(!options.enemyEntities){
                // generate random enemy entities
                entities.push(this.getRandomEntity());

                // DEV : Manually add a number of entities
                entities.push(this.getRandomEntity());

                // Add more enemies
                // TODO: For dev, only add one for now.
                if(false){
                    while(i<3) {
                        if(Math.random() < (1/(i+3))){
                            entities.push(this.getRandomEntity()); 
                        }
                        i++;
                    }
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
            // TODO: make this more smarter, depending on player levels, etc.
            var entity;
            var abilities = new Abilities();
            abilities.add([new Ability(dataAbilities.haste)]);

            // generate new entity
            entity = new Entity({
                //// FOR ALL : 
                //TODO: set abilities
                abilities: abilities,
                race: RACES[Math.random() * RACES.length | 0]
            });
            // gimp stats. TODO: Scale based on encounter
            entity.get('attributes').set({
                armor: Math.random() * -20,
                attack: Math.random() * -20,
                magicResist:  Math.random() * -20,
                magicPower: Math.random() * -20
            });

            return entity;
        }
    });

    return Battle;
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
    'views/map/Map',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'util/Timer'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Timer
    ){

    // ----------------------------------
    // Helper functions
    // ----------------------------------
    var IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    function animatePath(path) {
        path.transition()
            .duration(1500)
            .ease('cubic-in-out')
            .attrTween("stroke-dasharray", tweenDash)
            .each("end", function() { d3.select(this).call(animatePath); });
    }
    function animatePathOnce(path) {
        path.transition()
            //.duration(1500)
            //.ease('linear')
            .duration(1500)
            .ease('cubic-in-out')
            .attrTween("stroke-dasharray", tweenDash);
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

        id: 'map-wrapper',

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
                        'class': 'to-remove destination-path-animated'
                    });
                    // TODO: This causes drastic hit on performance 
                    //.call(animatePath);
            });
            this.listenTo(events, 'nodeHoverOff', function(options){
                // if we want to ignore hover events
                if(this._ignoreNodeHoverOff){ return false; }

                // TODO: this doesn't remove all paths
                self.paths.selectAll('.to-remove').transition()
                    .duration(0);
                self.paths.selectAll('.to-remove').remove();
            });

            return this;
        },

        onShow: function mapViewOnShow(){
            var self = this;

            // Setup the map svg element and groups
            requestAnimationFrame(function(){
                self.prepareMap();

                // draw / update the map
                // update the map *after* it has been prepared so it has time
                // to draw and render the SVG
                requestAnimationFrame(function(){
                    self.updateMap(true);
                });
            });

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
                .on('touchend', function(d,i){ 
                    self.nodeClicked.call(self, d,i, this); 
                })
                .on('click', function(d,i){ 
                    self.nodeClicked.call(self, d,i, this); 
                });

            // add class names to the node wrapper
            nodes.attr({ 
                'class': function(d,i){
                    var cssClass = 'node-wrapper';

                    // add the visited class after a delay - after the
                    // transition of the entity sprite to the node
                    if(d.node.get('visited')){ cssClass += ' node-visited'; }
                    if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; }
                    
                    return cssClass;
                }
            });

            // remove existing circles
            // TODO: :::::::::::::::::::::::::::
            // TODO: do this better - don't remove nodes every call
            // TODO: :::::::::::::::::::::::::::
            nodes.selectAll('circle').remove();

            // Add circles representing destinations
            var currentNode = null;
            var circles = nodes
                .append('circle')
                    .attr({
                        'class': function(d,i){
                            var cssClass = 'map-node'; 
                            var unvisited = true;

                            if(d.node.get('visited')){ cssClass += ' node-visited'; unvisited = false; }
                            if(d.node.get('isCurrentNode')){ cssClass += ' node-current'; unvisited = false; }
                            if(unvisited){ cssClass += ' node-unvisited'; }

                            // TODO: :::::::::::::::::::::::::::
                            // TODO: Don't use id check of 0
                            // TODO: How to 
                            // TODO: :::::::::::::::::::::::::::
                            var index = self.model.get('nodes').models.indexOf(d.node); 
                            if(index > 0 && d.node.get('isCurrentNode') && d.node.get('visited')){
                                // There is only one current node
                                currentNode = this;
                                cssClass = cssClass.replace(/node-visited/, '');
                            }
                            
                            return cssClass;
                        },
                        filter: 'url(#filter-outline)',
                        cx: function(d){ return d.x; },
                        cy: function(d){ return d.y; },
                        r: 16
                    });

            // Turn the node green after the entity has moved to it
            if(currentNode){
                setTimeout(function(){
                    d3.select(currentNode).attr({
                        'class': d3.select(currentNode).attr('class') + ' node-visited'
                    });
                }, this.CONFIG.updateDuration * 0.8);
            }

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
                this.visitedPaths = this.paths.append('g');
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
                        },
                        filter: 'url(#filter-wavy)'
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
                    filter: 'url(#filter-wavy)',
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
                            .each('end', function(){ 
                                var self = this;
                                requestAnimationFrame(function(){
                                    d3.select(self).call(animateNextPath); 
                                });
                            });
                    i += 1;
                }
                
                // TODO: This is crazy bad performance, slows everything down.
                //  TODO: add this back, but fix slowness
                //animateNextPath();
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
        nodeClicked: function nodeClicked(d,i,context){
            // Called when a node is clicked.
            //  Moves entity, draws path, triggers showNode event

            // CLICK event
            // callback when a node is interacted with
            // parameters:
            //  d: d3 selected datum
            //  i: index
            //  context: `this` context of the selection
            var self = this;
            //
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
                //
                
                // pause / force stop the current animation if one exists
                requestAnimationFrame(function(){
                    self.nodeHoverEnd.call(context,d,i);

                    // force draw a line afterwards
                    self._ignoreNodeHoverOff = true;
                    setTimeout(function(){
                        self.nodeHoverEnd.call(context,d,i);

                        var line = function(){
                            return d3.svg.line()([
                                [self.nodes.current.x, self.nodes.current.y],
                                [d.x, d.y]
                            ]);
                        };
                        self.paths.append('path')
                            .attr({
                                d: line, 
                                'class': 'to-remove destination-path-animated',
                                filter: 'url(#filter-wavy)'
                            })
                            .call(animatePathOnce);

                    }, 20);

                    // Move the entity, then trigger the nodeClicked event
                    // when the entity finishes moving to show the next node
                    self.moveEntity(d, function(){
                        events.trigger('map:nodeClicked', {node: d.node});
                        self._ignoreNodeHoverOff = true;
                    });
                });
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
        updateMap: function mapUpdate(isFirstCall){
            // Draws all nodes then updates the visible areas
            var self = this;
            logger.log('views/subviews/Map', 
                '=== 1. updateMap() called');

            this.width = $('#map')[0].getBBox().width;
            this.height = $('#map')[0].getBBox().height;

            // update the store node references
            self.updateNodeReferences();

            requestAnimationFrame(function(){
                // setup entity groups if it hasn't been setup
                if(!self.entitiesSetup){
                    self.prepareEntities();
                    self.entitiesSetup = true;
                }

                // draw / update nodes

                //// Don't need to move entity anymore, already moved
                //// transition the entity to the next node
                //// NOTE: TODO: Only move entity if the player lost, but in that
                //// case move the entity BACK
                //this.moveEntity();

                // minor delay to delay SVG filter effect
                self.updateVisible(isFirstCall);
                
                requestAnimationFrame(function(){
                    self.updateNodes();
                    self.updatePaths();

                    d3.select('.node-unvisited').style({ opacity: 0 });
                    d3.select('.node-unvisited').transition().duration(500).style({ opacity: 1 });

                    d3.select('.destination-path').style({ opacity: 0 });
                    d3.select('.destination-path').transition().duration(1500).style({ opacity: 1 });
                });
            });

            return this;
        },

        moveEntity: function moveEntity(node, callback){
            // Move the entity sprite to the next node. This is called whenever
            // the node instance successfully is completed
            //
            // if node is passed in, will manually move the entity to the
            // passed in node
            var self = this;

            var currentNode = self.nodes.current;
            // if a specific node was passed in, use it
            if(node){ currentNode = node; }

            this.entitySprites.transition()
                .duration(this.CONFIG.updateDuration)
                .ease(this.CONFIG.updateEase)
                .attr({ 
                    transform: function(){ 
                        return 'translate(' + [
                            currentNode.x - self.entityWidth/2,
                            currentNode.y - self.entityHeight/1.2
                        ] + ')';
                    }
                })
                .each('end', function(){
                    if(callback){ callback(); }
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
        updateVisible: function mapGenerateHull(isFirstCall){
            // Updates the the visible area, based on nodes
            logger.log('views/subviews/Map', 
                'updateVisible() called. Updating fog of war');
            var vertices = this.nodes.all;

            var filter = '';

            // only use filters if lowRes mode is not true
            if(CONFIG && !CONFIG.lowRes){
                filter = 'url(#filter-map)';
                // Firefox renders this filter effect in an extremely shitty way
                // which completely kills the experience, so for FF don't use
                // a filter
                if(IS_FIREFOX){
                    filter = '';
                }
            }

            //var _duration = 1500;
            //var _delay = 250;
            var _duration = 500;
            var _delay = 550;

            // For the first rendering, low delay or duration
            if(isFirstCall){
                _duration = 400;
                _delay = 0;
            }

            // create a masked path to show visible nodes
            var masks = this.maskPath.selectAll('.visibleNode')
                .data(vertices);

            var newMasks = masks.enter()
                .append('circle')
                .style({
                    fill: '#000000',
                    opacity: 1
                });

            // update existing masks
            masks
                .attr({
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
                
            var newStyle = { fill: '#ffffff', opacity: 1 };

            if(_duration){
                masks.transition().duration(_duration).delay(_delay).style(newStyle);
            } else {
                masks.transition().duration(_duration).delay(_delay).style(newStyle);
                //masks.style(newStyle);
            }

            masks.exit().remove();

            return this;
        }

    });

    return MapView;
});

// ===========================================================================
//
// Party Member item view
//  
//  Party memebr item view
// 
// ===========================================================================
define(
    'views/map/PartyMember',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function(
        d3, Backbone, Marionette, 
        logger, events
    ){

    var PartyMember = Backbone.Marionette.ItemView.extend({
        tagName: 'div',
        template: '#template-game-map-party-member',
        'className': 'member',
        events: {
            'click': 'memberClicked'
        },
        serializeData: function(){
            return _.extend({ self: this.model }, this.model.toJSON());
        },

        memberClicked: function memberClicked(e){
            logger.log('views/map/PartyMember',
                'Party member wrapper clicked : %O | model: %O',
                this, this.model);

            // map will listen for this event and show the entity info
            events.trigger('map:showEntityInfo', {
                entity: this.model
            });

            return this;
        }

    });

    return PartyMember;
});

// ===========================================================================
//
// Party Member collection view
// 
// ===========================================================================
define(
    'views/map/PartyMembers',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'views/map/PartyMember'
    ], function(
        d3, Backbone, Marionette, 
        logger, events,
        PartyMember
    ){

    var PartyMembers = Backbone.Marionette.CompositeView.extend({
        itemView: PartyMember,
        itemViewContainer: '.members',
        template: '#template-game-map-party-members',
        id: 'map-party-wrapper'
    });

    return PartyMembers;
});

// ===========================================================================
//
// Entity Info
//
//  View for Entity Info      
//
// ===========================================================================
define(
    'views/map/EntityInfo',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events'
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events
    ){

    var EntityInfo = Backbone.Marionette.Layout.extend({
        template: '#template-game-map-entity-info',
        events: { },
        id: 'map-entity-info',

        serializeData: function(){
            return { model: this.model };

            return _.extend({
                model: this.model
            }, this.model.toJSON());
        },

        initialize: function entityInfoInit(options){
            logger.log('views/map/EntityInfo', 'initialize() called');
            return this;
        },

        onShow: function entityInfoShow(options){
            logger.log('views/map/EntityInfo', 'onShow() called');
            return this;
        }
    });

    return EntityInfo;
});

// ===========================================================================
//
// Page Map
//
//      Containing view for the map page
//
// ===========================================================================
define(
    'views/map/ContainerMap',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'models/Map',
        'views/map/Map',
        'views/map/PartyMembers',
        'views/map/EntityInfo'

        // TODO: pass in game state somehow - map, char create, etc.
        // 
    ], function viewMap(
        d3, backbone, marionette, 
        logger, events,
        Map,

        // Views
        // ------------------------------
        MapView,
        PartyMembersView,
        EntityInfoView
    ){

    // ----------------------------------
    //
    // Map view
    //
    // ----------------------------------
    var ContainerMap = Backbone.Marionette.Layout.extend({
        template: '#template-game-container-map',
        events: { 
            'click #map-wrapper': 'mapWrapperClick'
        },

        'className': 'game-map-wrapper',
        regions: {
            regionMapView:  '#region-map-map',
            regionPartyMembers:  '#region-map-party-members',
            regionEntityInfo: '#region-map-entity-info'
        },

        initialize: function mapViewInitialize(options){
            // initialize:
            var self = this;

            // MAP - map itself
            // --------------------------
            // TODO: get model
            this.mapModel = new Map({});
            // TODO: Get map model from game.
            this.mapModel.generateMap();

            this.model.set({ map: this.mapModel });

            this.viewMap = new MapView({
                model: this.mapModel,
                gameModel: this.model
            }); 

            // Map interaction events
            this.listenTo(events, 'map:showEntityInfo', this.showEntityInfo);

            // Party members
            // --------------------------
            this.viewPartyMembers = new PartyMembersView({
                collection: this.model.attributes.playerEntities
            });

            this.entityInfoView = new EntityInfoView({});
            logger.log('views/map/ContainerMap',
                'Player entities: %O', 
                this.model.attributes.playerEntities);

            // Handle escape key to close entity info
            // --------------------------
            this.listenTo(events, 'keyPress:escape', this.keyEscapePressed);
            return this;
        },

        onShow: function mapViewOnShow(){
            var self = this;

            this.regionMapView.show(this.viewMap);
            this.regionPartyMembers.show(this.viewPartyMembers);
            return this;
        },

        // ==============================
        // Interaction callbacks
        // ==============================
        showEntityInfo: function mapShowEntityInfo(options){
            // Called when an entity from the player list on the left side is 
            // clicked
            logger.log('views/map/ContainerMap',
                'showEntityInfo() called : %O', options);
            var self = this;

            // If the same entity was selected, do nothing
            if(this.entityInfoView.model && this.entityInfoView.model === options.entity){

            } else {
                // Different entity was selected
                this.entityInfoView.model = options.entity;

                self.regionEntityInfo.show(self.entityInfoView);
                $('.member-inner', this.regionEntityInfo.$el).addClass('hidden');

                setTimeout(function(){
                    $('.member-inner', self.regionEntityInfo.$el).removeClass('hidden');
                }, 150);
            }

            // Show the entity info div
            if(this.regionEntityInfo.$el){
                this.regionEntityInfo.$el.removeClass('off-screen');

                // add the box shadow after the shown animation
                setTimeout(function(){
                    self.regionEntityInfo.$el.addClass('box-shadow');
                    // duration matches css time
                }, 300);
            }

            return this;
        },

        hideEntityInfo: function hideEntityInfo(){
            $('#map-wrapper').off('click', this.hideEntityInfo);
            if(this.regionEntityInfo.$el){
                if(!this.regionEntityInfo.$el.hasClass('off-screen')){
                    this.regionEntityInfo.$el.removeClass('box-shadow');
                    this.regionEntityInfo.$el.addClass('off-screen');
                }
            }
            return this;
        },

        // Map wrapper interaction
        mapWrapperClick: function mapWrapperClick(){
            // if the map wrapper was clicked and the entity info window is
            // open, close the entity info
            this.hideEntityInfo();
            return this;
        },

        // ------------------------------
        // Keyboard shortcuts
        // ------------------------------
        keyEscapePressed: function(options){
            // TODO: Do nothing if NOT on map
            //
            logger.log('map:containerMap', 'escape pressed');

            if(options.e){ options.e.preventDefault(); }

            this.hideEntityInfo();
        }

    });

    return ContainerMap;
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
            //
            // TODO: This should really be handled in Battle, most likely, not
            // here...
            //
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

        onShow: function(){
            // add class based on targets
            if(this.model.attributes.validTargets.indexOf('enemy') > -1){
                this.$el.addClass('enemy');
            }
            if(this.model.attributes.validTargets.indexOf('player') > -1){
                this.$el.addClass('player');
            }

            this.$abilityIconOverlay = $('.ability-icon-overlay', this.$el);
            this.$abilityIconCanvas = $('.ability-icon-canvas', this.$el);

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
                    if(canBeUsed){
                        // CAN use
                        self.$abilityIconOverlay.addClass('used-success');
                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-success');
                        },140);

                    } else {
                        // Can NOT be used
                        self.$abilityIconOverlay.addClass('used-invalid');
                        self.$abilityIconOverlay.addClass('invalid');
                        self.$el.addClass('shake shake-constant');
                        setTimeout(function(){
                            self.$abilityIconOverlay.removeClass('used-invalid');
                            self.$el.removeClass('shake shake-constant');
                        },140);
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
                this.$el.addClass('entity-dead');
            }

            this.$timerInfo = $('<div class="timer-info"></div>');
            this.$el.append(this.$timerInfo);
            this.$timerInfo = this.$timerInfo[0];
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


            // TODO: update item based on timer
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

            this.$el.addClass('entity-dead');

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
//
//
//      TODO: Refactor, use subviews. Don't rerender the whole thing whenever
//      a single data point changes
//
//
//
// ===========================================================================
define(
    'views/subviews/battle/PlayerEntityInfo',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events'
    ], function viewBattleAbility(
        d3, backbone, marionette, logger, events
    ){

    var EntityInfo = Backbone.Marionette.Layout.extend({
        template: '#template-game-battle-selected-entity-info',
        'className': 'selectedEntityInfoWrapper',

        events: {
            'click': 'selfViewClicked' 
        },

        initialize: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'initialize called');

            // Listen for changes to attributes.
            // TODO: break it out even more, have functions for each group of
            // changes
            //this.listenTo(this.model.get('attributes'), 'change', this.rerender);
            this.listenTo(this.model.get('attributes'), 'change:health', this.rerenderHealth);
            this.listenTo(this.model.get('attributes'), 'change:maxHealth', this.rerenderHealth);

            this.listenTo(this.model.get('attributes'), 'change', this.rerender);

            // TODO: :::::::::::: THIS
            // Update active effects when they get changed
            this.listenTo(
                this.model, 
                'change:activeEffects', 
                this.updateActiveEffects
            );

            // render components the first time this view renders
            //  subsequent renders happen on attribute change callbacks
            this.listenToOnce(this, 'render', this.rerenderHealth);

            return this;
        },

        onBeforeClose: function(){
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                '[x] closing');

            return this;
        },

        onShow: function infoOnShow(){
            var self = this;
            logger.log('views/subviews/battle/SelectedEntityInfo', 
            'onShow() called');

            // TODO: Render subviews? Should we have subviews, or just manually
            // manage it ourselves here?
            // subviews
            this.updateActiveEffects();

            return this;
        },
        rerender: function infoRerender(){
            this.render();
            this.onShow();
            return this;
        },

        rerenderHealth: function healthRerender(){
            // Update the health
            if(!this.$health){ this.$health = $('.health-wrapper', this.$el); }

            this.$health.html(
                Backbone.Marionette.TemplateCache.get('#template-game-battle-selected-entity-health')(
                    this.model.toJSON()    
                )
            );

            return this;
        },
        
        // ------------------------------
        //
        // BUFFS
        //
        // ------------------------------
        updateActiveEffects: function updateActiveEffects(){
            var self = this;
            this.$activeEffectsEl = this.$activeEffectsEl || $('.active-effect', this.$el);

            logger.log('PlayerEntityInfo:updateActiveEffects', 
                'updateActiveEffects called', this.model);

            // Set the fade duration for all the active effects based on their
            // duration
            // The active effect elements are in order of the activeEffects
            //  array on the entity
            _.each(this.$activeEffectsEl, function(el, i){
                var duration = self.model.attributes.activeEffects[i].get('buffDuration');

                // Don't do anything for buffs that have no duration
                if(duration < 1){ 
                    return false;
                }

                // convert to seconds
                duration *= 1000;

                // Get the time the buff was started
                var start = self.model.attributes.activeEffects[i].get('startDate');
                // how much time has passed between the start and now
                var timeDiff = new Date() - start;
                // and the time left before the buff is finished
                duration = duration - timeDiff;

                // stop the existing transition
                $(el).transitionStop();

                // start a new one
                $(el).transit({
                    opacity: 0
                }, duration, 'easeInSine');
            });
        },


        // ------------------------------
        //
        // user interaction
        //
        // ------------------------------
        selfViewClicked: function selfViewClicked(){
            // Called when this view is clicked. Will trigger an event,
            // which the battle view listens to to update the currently
            // selected entity
            //
            logger.log('views/subviews/battle/SelectedEntityInfo', 
                'selfViewClicked() called');

            events.trigger('playerEntityInfo:clicked', {
                model: this.model,
                index: this.model.collection.models.indexOf(this.model)
            });

            return this;
        }

    });

    return EntityInfo;
});

// ===========================================================================
//
// Player Entity Info collection view
// 
// ===========================================================================
define(
    'views/subviews/battle/EntityInfoCollection',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'views/subviews/battle/PlayerEntityInfo'
    ], function(
        d3, Backbone, Marionette, 
        logger, events,
        PlayerEntityInfo
    ){

    var PlayerEntitiesInfo = Backbone.Marionette.CompositeView.extend({
        itemView: PlayerEntityInfo,
        itemViewContainer: '.members',
        template: '#template-game-battle-player-entities',
        id: 'map-party-wrapper',

        initialize: function(){
            logger.log('views/subviews/battle/EntityInfoCollection',
                'PlayerEntitiesInfo collection initialized: %O | collection: %O',
                this,
                this.collection);

            return this;
        },
        
        setSelectedEntityView: function setSelectedEntityView(model){
            // Called whenever the selected entity changes. Takes in a model
            // and adds a class to the corresponding view
            $('.entity-selected', this.$el).removeClass('entity-selected');

            // update the set model view
            $(this.children.findByModelCid(model.cid).$el).addClass('entity-selected');

            return this;
        }
    });

    return PlayerEntitiesInfo;
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

            this.listenTo(this.model.get('attributes'), 'change:health', this.rerender);
            return this;
        },

        onShow: function(){
            return this;
        },

        rerender: function(){
            this.render();
            this.onShow();
            return this;
        }
    });

    return Entity;
});

// ============================================================================
//
// BattleLog
//
//      Logs all battle related actions
//
// ============================================================================
define(
    'views/subviews/battle/BattleLog',[ 
        'd3', 'backbone', 'marionette', 'logger', 'events',
        'util/Timer'
    ], function viewBattle(
        d3, backbone, marionette, logger, events, Timer
    ){
    // =======================================================================
    var BattleLogView = Backbone.Marionette.Layout.extend({
        // This will use the existing battle-log element
        template: '#template-game-battle-log',
        'className': 'battle-log-container',

        initialize: function battleLogViewInitialize(options){
            var self = this;
            logger.log('views/subviews/battle/BattleLog',
                'battleLog initialized');

            // --------------------------
            // Setup event listens to log
            // --------------------------
            _.each([
                this.model.get('playerEntities'),
                this.model.get('enemyEntities')
            ], function(group){
                _.each(group.models, function(model){
                    // HEALTH Changes 
                    // ------------------
                    self.listenTo(model.get('attributes'), 'change:health', function(attrsModel, health, options){
                        // add the log
                        self.addHealthLog.call(self, {
                            attrsModel: attrsModel, 
                            model: model,
                            health: health, 
                            options: options
                        });
                    });

                    // Life changes
                    // ------------------
                    self.listenTo(model, 'change:isAlive', function(attrsModel, isAlive, options){
                        // add the log after a smal delay so health callback
                        // fires first
                        new Timer( function(){ 
                            self.addDeathLog.call(self, {
                                model: model,
                                isAlive: isAlive, 
                                options: options
                            });
                        }, 300);
                    });

                    // Buff Changes 
                    // ------------------
                    self.listenTo(model, 'change:activeEffects', function(attrsModel, effects, options){
                        // add the log
                        self.addEffectLog.call(self, {
                            model: model,
                            effects: effects,
                            options: options
                        });
                    });
                });
            });

            // --------------------------
            // Also, listen for manual log messages
            // --------------------------
            this.listenTo(this.model, 'logMessage', this.addManualLog);

            return this;
        },
        onShow: function(){
            this.$log = $('#battle-log', this.$el);
            return this;
        },

        // ==============================
        //
        // Logging funcs
        //
        // ==============================
        addHealthLog: function addHealthLog(options){
            // Called whenever health changes
            //
            options = options || {};
            
            // get health change
            // --------------------------
            var healthDifference = options.health - options.attrsModel._previousAttributes.health;

            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-health-item')({
                d3: d3,
                target: options.model,
                source: options.options.source,
                ability: options.options.sourceAbility,

                healthDifference: healthDifference,
                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ==============================
        //
        // Effects Log
        //
        // ==============================
        addEffectLog: function addEffectLog(options){
            // Called whenever health changes
            //
            options = options || {};
            
            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // if there are no options given, it means the entity has died
            // and all buffs have been removed - no need to log it
            if(!options.options.source || !options.options.sourceAbility){
                return false;
            }

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-effect-item')({
                d3: d3,
                target: options.model,
                source: options.options.source,
                ability: options.options.sourceAbility,

                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer,

                type: options.options.type
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ------------------------------
        // entity died / res'ed
        // ------------------------------
        addDeathLog: function addDeathLog(options){
            var message = options.message;

            // Get target and source info
            // --------------------------
            var targetIsPlayer = true;
            var sourceIsPlayer = true;

            // if there are no options given, it means the entity has died
            // and all buffs have been removed - no need to log it
            if(!options.options.source || !options.options.sourceAbility){
                return false;
            }

            // determine if target and source are player models
            if(options.model.collection !== this.model.get('playerEntities')){
                targetIsPlayer = false;
            }
            if(options.options.source.collection !== this.model.get('playerEntities')){
                sourceIsPlayer = false;
            }


            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-death-item')({
                d3: d3,
                target: options.model,
                isAlive: options.isAlive,
                source: options.options.source,
                ability: options.options.sourceAbility,

                targetIsPlayer: targetIsPlayer,
                sourceIsPlayer: sourceIsPlayer
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;

            return this;
        },

        // ------------------------------
        // Add a manual log message
        // ------------------------------
        addManualLog: function addManualLog(options){
            var message = options.message;

            // update the log
            // --------------------------
            this.$log.append(Backbone.Marionette.TemplateCache.get('#template-game-battle-log-item-manual')({
                message: message
            }));

            // scroll to bottom
            this.$log[0].scrollTop = this.$log[0].scrollHeight;
        }

        
    });
    return BattleLogView;
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
        'util/Timer',
        'views/subviews/battle/AbilityList',
        'views/subviews/battle/EntityInfoCollection',
        'views/subviews/battle/IntendedTargetInfo',
        'views/subviews/battle/BattleLog'
    ], function viewBattle(
        d3, backbone, marionette, logger, events,
        Timer,
        AbilityListView,
        EntityInfoCollectionView,
        IntendedTargetInfoView,
        BattleLogView
    ){

    // Utility functions
    function timestampFunc() {
        return window.performance && window.performance.now ? window.performance.now : new Date().getTime;
    }

    function shakeBattle(intensity) {
        // Helper function to  shake the battle element
        //  Takes in: 
        //      intensity: {Number} shake intensity, amount of pixels to shake 
        //          the svg.  Around 200 would be a good upper limit
        intensity = intensity || 40;
        var duration = 45;

        $('#battle')
            .transit({
                left: -intensity, top: intensity, duration: duration
            })
            .transit({
                left: intensity, top: -intensity, duration: duration
            })

            // end
            .transit({
                left: 0, top: 0, duration: duration
            });


        return this;
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
            'regionPlayerEntities': '#region-battle-player-entities-info',
            'regionIntendedTarget': '#region-battle-intended-target-wrapper',
            'regionAbility': '#region-battle-ability-wrapper',
            'regionBattleLog': '#region-battle-log-wrapper'
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
            // entity player info views (left sidebar) clicked
            // ==========================
            this.listenTo(events, 'playerEntityInfo:clicked', this.setSelectedEntity);


            // ==========================
            // Handle user input - shortcut keys
            // ==========================
            // Handle keys for changing target
            // --------------------------
            this.listenTo(events, 'keyPress:up', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:k', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:down', this.handleKeyUpdateTarget);
            this.listenTo(events, 'keyPress:j', this.handleKeyUpdateTarget);

            // do something on left / right key ?
            // TODO: this?
            this.listenTo(events, 'keyPress:left', function(options){
                options.e.preventDefault();
                return self.handleKeyUpdateTarget.call(self, options);
            });
            this.listenTo(events, 'keyPress:right', function(options){
                options.e.preventDefault();
                return self.handleKeyUpdateTarget.call(self, options);
            });

            // Handle keys for changing active entity
            // --------------------------
            this.listenTo(events, 'keyPress:tab', this.handleKeyChangeSelectedEntity);
            this.listenTo(events, 'keyPress:shift+tab', this.handleKeyChangeSelectedEntity);
            _.each([1,2,3,4,6,7,8,9], function eachKey(key){
                // NOTE: these also set the active key pressed button
                self.listenTo(events, 'keyPress:' + key, self.handleKeyChangeSelectedEntity);
                self.listenTo(events, 'keyPress:shift+' + key, self.handleKeyChangeSelectedEntity);
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
            
            // ==========================
            // Window focus events
            // ==========================
            this.listenTo(events, 'document:hide', this._pause);
            this.listenTo(events, 'document:show', this._unpause);

            // ==========================
            // Battle log Subview
            // ==========================
            this.battleLogView = new BattleLogView({
                model: this.model
            });

            return this;
        },

        onBeforeClose: function close(){
            // Called when the view is closed. Unbind global window / doc events
            var self = this;
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

            var reward = {
                gold: this.model.get('rewardGold'),
                exp: this.model.get('rewardExp')
            };

            console.log("so win." + JSON.stringify(reward));
            alert("You win");
            return this;
        },
        playerGroupDied: function playerGroupDied(options){
            // When the entire enemy group has died, you win

            // stop timer
            this.isTimerActive = false;

            console.log(">>>>>>>>>>>>>>>> entity group died ", options);
            alert("You lose");
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

            // TODO:::: Should timer logic live in entity?
            // TODO: Handle rendering in separate func, not using d3?
            //
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
                        if( val < model.attributes.attributes.attributes.timerLimit){
                            // increase the timer by the timer step - e.g., if FPS is
                            // 60, each update tick is 1/60
                            self[entityGroup + 'EntityTimers'][index] += (
                                self.timerStep * model.attributes.attributes.attributes.timerFactor
                            );
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

                            // TODO:
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

            // pause all timers
            Timer.pauseAll();

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

            // resume all timers
            Timer.resumeAll();

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
            // TODO: pull this into a function, call for each entity
            _.each(sel[0], function unpauseEachSelection(el){
                $el = d3.select(el);
                var entityGroup = $el.attr('data-entityGroup');
                var index = $el.attr('data-index');
                var targetModel = self.model.get(entityGroup + 'Entities').models[index];

                // if entity is dead, don't start timer
                if(!self.model.get(entityGroup + 'Entities').models[index].get('isAlive')){
                    return false;
                }

                // Otherwise, resume the timer
                var val = self[entityGroup + 'EntityTimers'][index];

                var duration = ( 
                    (targetModel.attributes.attributes.attributes.timerLimit - val) /
                    (targetModel.attributes.attributes.attributes.timerFactor)
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
            var self = this;
            logger.log('views/subviews/Battle', 
                '1. stateChange(): model state changed to: ' + state);

            // remove all classes
            this.$wrapper.classed('state-normal state-ability', false);

            // remove shown indicators
            _.each(['player', 'enemy'], function(entityGroup){
                self[entityGroup + 'KeyIndicators'].classed('hidden', true);
                self[entityGroup + 'AlternativeKeyIndicators'].classed('hidden', true);
            });

            // TODO: do stuff based on state change
            if(state === 'normal'){
                // From ability to normal
                this.$wrapper.classed('state-normal', true);
                
            } else if (state === 'ability'){
                // From ability to normal
                this.$wrapper.classed('state-ability', true);
                
                // ----------------------
                // change the indicator keys based on selected ability
                // ----------------------
                var validTargets = [];
                if(this.model.get('selectedAbility')){
                    validTargets = this.model.get('selectedAbility').get('validTargets');
                }
                // show the key indicators for the corresponding targets
                if(validTargets){
                    // primary keys
                    if(validTargets[0] === 'enemy'){
                        self.enemyKeyIndicators.classed('hidden', false);
                    } else if(validTargets[0] === 'player'){
                        self.playerKeyIndicators.classed('hidden', false);
                    }

                    //alternative keys
                    if(validTargets[1] === 'enemy'){
                        self.enemyAlternativeKeyIndicators.classed('hidden', false);
                    } else if(validTargets[1] === 'player'){
                        self.playerAlternativeKeyIndicators.classed('hidden', false);
                    }
                }

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
                logger.log('views/subviews/Battle', 
                    '[x] game paused, returning');
                return false;
            }

            // If there is no selected target, cannot use the ability
            if(!this.selectedTarget){
                logger.log('views/subviews/Battle', 
                    '[x] cannot use ability, no selected target');
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
                    'handleAbilityActivated  : CANNOT be used : %O : %O',
                    entityTime, ability.get('castTime'));
            }

            // store desired target
            var desiredTarget = this.selectedEntity.attributes.desiredTarget;

            // Use ability if it can be used
            // --------------------------
            if(canBeUsed && desiredTarget && desiredTarget.model){
                logger.log('views/subviews/Battle', 
                    '\t ability CAN be used and DOES have a target');
                this.model.set({selectedAbility: ability},{silent:false});
                this.useAbility({
                    target: desiredTarget.model,
                    targetIndex: desiredTarget.index, 
                    entityGroup: desiredTarget.group
                });

            } else if (canBeUsed) {
                // The ability CAN be used
                logger.log('views/subviews/Battle', 
                    '\t ability CAN be used, setting selected ability. NO target');

                // Set the selected ability
                this.model.set({selectedAbility: ability},{silent:false});

                // change the state to ability. Now, when the user clicks on
                // an entity, the ability will be used
                this.model.set({ state: 'ability' });

                // highlight the possible targets (whatever group)
                // TODO: Highlight group of possible targets based on ability
                // options.ability.get('validTargets') bla bla bla
            } else {
                logger.log('views/subviews/Battle', 
                    '\t ability can NOT be used');
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
        handleKeyUpdateTarget: function handleKeyUpdateTarget(options){
            // This function selects an entity based on a keypress. 
            // j / k and up / down select next or previous entity the
            // player controls, as does the 1 - 4 keys
            //
            // To select an enemy : use keys 1 - n
            // To select a player entity : use keys shift + 1 - n
            //
            // Updates the target for the selected (active) entity
            //
            // TODO: Handle changing the selected entity
            var self = this;
            logger.log('views/subviews/Battle', 
                'handleKeyUpdateTarget() called : %O', options);

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
                    '\t [x] in ability mode and a key other than 1 - n or shift + 1 -n was pressed');
                return false;
            }

            // set default group
            var entities, modelsLength;

            // TODO: If NOT in `targetting` state, pressing up or down should
            // change the selected entity
            // get index for selected entity
            var targetIndex = -1;
            var targetGroup = 'player';

            if(this.selectedEntity.attributes.desiredTarget){
                targetIndex = this.selectedEntity.attributes.desiredTarget.index;
                targetGroup = this.selectedEntity.attributes.desiredTarget.group;
            }

            logger.log('views/subviews/Battle', 
                '\t selectedEntity : %O ( %O ) | targetIndex : %O | targetGroup : %O', 
                this.selectedEntity,
                this.selectedEntity.attributes.desiredTarget,
                targetIndex, targetGroup);

            // store reference to the valid targets of the selectedAbility
            var abilityTargets = [];
            if(this.model.get('selectedAbility')){
                abilityTargets = this.model.get('selectedAbility').get('validTargets');
            }

            // reverse up down - down key should go down the entity list
            if(key === 'up' || key === 'k'){ targetIndex -= 1; }
            else if (key === 'down' || key === 'j'){ targetIndex += 1; }
            else if(key.match(/^shift\+[0-9]+/)){ 
                // Key shift + 1 -n
                // ----------------------
                // set the key being pressed to the number
                targetIndex = +(key.replace('shift+', '')) - 1;

                // If the keys are number keys, select the specific entity 
                // for the player
                // TODO: Have shift + n target alternate (i.e., whatever
                // the secondary target is)
                if(abilityTargets && abilityTargets[1] === 'enemy'){
                    targetGroup = 'enemy';
                }
            }
            else if(key.match(/[0-9]+/)){
                // Key 1 - n 
                // ----------------------
                // set the key being pressed to the number

                if(this.model.get('state') === 'ability'){
                    // When in ability mode, using the 1 - n keys will select
                    // either an enemy or player entity
                    targetIndex = +key - 1;

                    // if the first type of valid target is an enemy, have
                    // the 1-n keys target the enemy. Otherwise, it will target
                    // the player entities
                    if(abilityTargets && abilityTargets[0] === 'enemy'){
                        targetGroup = 'enemy';
                    } 
                } else { 
                    // when the user is not in ability mode, do nothing when
                    // 1 - n key is pressed
                    logger.log('views/subviews/Battle', 
                        '\t [x] 1-n key pressed not in ability mode, returning');
                    return false;
                }
            } else if (key.match(/left/)){
                // For left / right keys, switch groups
                targetGroup = 'player';
            } else if (key.match(/right/)){
                targetGroup = 'enemy';
            }

            // ensure target index stays inside of the bounds
            if(targetGroup === 'player'){
                entities = this.model.get('playerEntities');
                modelsLength = entities.models.length;

                //// loop around if the end is reached
                //if(targetIndex >= modelsLength){
                    //targetIndex = 0;
                //} else if( targetIndex < 0) {
                    //targetIndex = 0;
                //}
                
                // do not loop around
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                } else if ( targetIndex < 0){
                    targetIndex = 0;
                }

            } else if (targetGroup === 'enemy'){
                // If the player tries to select an entity outside of range
                //  e.g., selects entity 4 but there's only 3 entities, then
                //  select the last entity
                entities = this.model.get('enemyEntities');
                modelsLength = entities.models.length;

                // don't loop around
                if(targetIndex >= modelsLength){
                    targetIndex = modelsLength-1;
                } else if ( targetIndex < 0){
                    targetIndex = 0;
                }
            }

            // --------------------------
            // 2. Got target entity, select it
            // --------------------------
            logger.log('views/subviews/Battle', 
                ' got key press : ' + key + 
                ' : entityGroup: ' + targetGroup +
                ' : Selecting entity: ' + targetIndex);

            // select the entity
            this.selectEntity({
                entityGroup: targetGroup,
                index: targetIndex
            });

            return this;
        },

        handleKeyChangeSelectedEntity: function handleKeyChangeSelectedEntity(options){
            // Changes the currently selected entity. Can either tab (or shift
            // tab) to cycle through entities, or press the number keys
            logger.log('views/subviews/Battle',
                'handleKeyChangeSelectedEntity(): called with %O', options);

            // prevent default key behavior 
            if(options.e){ options.e.preventDefault(); }
            var key = options.key;

            var numPlayerEntities = this.model.get('playerEntities').models.length;
            var curIndex = this.selectedEntityIndex;
            var newIndex = 0;

            // update the currently selected entity
            if(key === 'tab'){
                // tab goes down the list
                newIndex = curIndex + 1;

                // loop around
                if(newIndex >= numPlayerEntities){ 
                    newIndex = 0;
                }
            } else if(key === 'shift+tab'){
                // tab goes down the list
                newIndex = curIndex - 1;

                // loop around
                if(newIndex < 0){
                    newIndex = numPlayerEntities - 1;
                }
            } else if(key.match(/[0123456789]/)){
                // get index from key, start at 1 (not 0), so subtract 1 to
                // the new index
                newIndex = parseInt(key,10) - 1;

                if(newIndex < 0){
                    newIndex = 0;
                } else if(newIndex >= numPlayerEntities){
                    // outside of bounds, get last entity
                    newIndex = numPlayerEntities - 1;
                }

            }

            // Update selected entity by index
            // --------------------------
            this.setSelectedEntity({index: newIndex});

            // update the target based on the selected entity's target
            var entityDesiredTarget = this.selectedEntity.get('desiredTarget');

            logger.log('views/subviews/Battle', 
                'updated selected entity: %O | desiredTarget for new entity : %O',
                this.selectedEntity, entityDesiredTarget);

            // update the currently selected target based on the selected entity
            if(entityDesiredTarget){
                this.selectTarget(
                    entityDesiredTarget.group, 
                    entityDesiredTarget.index
                );
            } else {
                // no valid target
                this.selectTarget(null, null);
            }

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
            if(!this.$battleWrapper.is(':hover')){ 
                return false;
            }

            if(e){
                e.preventDefault();
            }

            var direction = 'up';
            if(e.originalEvent.wheelDelta < 0){
                direction = 'down';
            }

            this.handleKeyUpdateTarget({key: direction});
            return this;
        },

        // ------------------------------
        // Cancel target
        // ------------------------------
        cancelTarget: function cancelTarget(){
            // removes any selected targets, return to default state
            logger.log('views/subviews/Battle', 
                'cancelTarget() called, changing state');

            // clear out selected ability
            this.model.set({selectedAbility: null}, {silent:false});

            // cancel ability usage
            events.trigger('ability:cancel');

            if(this.selectedEntity && 
            this.selectedEntity.attributes.desiredTarget){
                // update the selected entity's target
                this.selectedEntity.set({ desiredTarget: null }, {silent: true});
                this.selectedEntity.trigger('change:desiredTarget', 
                    this.selectedEntity, null);
            }

            // clear the selected target
            this.selectTarget(null);

            // set the battle state to normal
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
            logger.log('views/subviews/Battle', '1. onShow() called');
            var self = this;

            // TODO: remove timer el for dev
            this.$timerEl = $('.timer', this.$el);

            // show the battle log
            this.regionBattleLog.show(this.battleLogView);

            this.$battleWrapper = $('#battle-wrapper');
            
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

            // Show player entities info
            logger.log("views/subviews/Battle", "\t showing player entity info");
            this.entityInfoCollectionView = new EntityInfoCollectionView({
                collection: this.model.get('playerEntities')
            });
            this.regionPlayerEntities.show(this.entityInfoCollectionView);

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
                            .domain([ 0, model.attributes.attributes.attributes.timerLimit])
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

                
                // Setup the wrapper group
                // ----------------------
                // Whenever interaction happens with it, select or hover the 
                // entity
                function entityClickedInteraction(d,i){
                    // if the 
                    return self.selectEntity({index: i, entityGroup: entityGroup});
                }

                // configure num of entities per row
                var numEntitiesPerRow = 4;

                var groupsWrapper = self[entityGroup + 'EntityGroupsWrapper'] = entityGroups[
                    entityGroup].selectAll('.entity-group')
                        .data(self.model.get(entityGroup + 'Entities').models)
                        .enter().append('g')
                            .attr({ 
                                'class': 'entity-group-wrapper ' + entityGroup,

                                // transform the entire group to set the entity position
                                transform: function groupsWrapperTransform(d,i){

                                    // position entiy wrapper
                                    // TODO: place near edge of map, don't
                                    // hardcode 740 
                                    // if enemy entities, place near edge of map
                                    var entityGroupX = (entityGroup === 'player' ? 40 : 740);
                                    var entityGroupY = 40 + 
                                        (i * (entityHeight + entityHeight ));

                                    // Give it a little randomness
                                    if(entityGroup === 'enemy'){
                                        entityGroupX += (20 - Math.random() * 40);
                                    }

                                    // wrap enemies around
                                    if(entityGroup === 'enemy' && i >= numEntitiesPerRow){
                                        entityGroupX -= ( 100 * Math.floor(((i+1)-0.001)/numEntitiesPerRow));

                                        entityGroupY = 40 + 
                                            ( i % numEntitiesPerRow ) *
                                            (entityHeight + entityHeight );
                                    }
                                    
                                    return "translate(" + [
                                        entityGroupX, 
                                        entityGroupY
                                    ] + ")";
                                }
                            })
                            .on('click', entityClickedInteraction)
                            .on('touchstart', entityClickedInteraction)
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
                // ----------------------
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
                // TODO: dont use image, use clone / sticker?
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

                // selection key
                // ----------------------
                // Shows the key to select the entity. The keys should match
                // the index of the entity displayed. Showing / hiding the
                // group is handled in the game logic when the state changes
                //
                // regular key
                // ----------------------
                self[entityGroup + 'KeyIndicators'] = groups.append('g')
                    .attr({
                        'class': entityGroup + '-key-indicator key-indicator hidden'
                    });

                // add background circle
                self[entityGroup + 'KeyIndicators'].append('circle')
                    .attr({
                        cy: Math.round(entityHeight/1.2) - 10,
                        cx: Math.round(entityWidth/1.9) + 38,
                        r: 20
                    });
                // add text
                self[entityGroup + 'KeyIndicators'].append('text')
                    .attr({
                        y: Math.round(entityHeight/1.2) + 2,
                        x: Math.round(entityWidth/1.9) + 31
                    }).text(function(d,i){ return i + 1; });

                // alternative key
                // ----------------------
                self[entityGroup + 'AlternativeKeyIndicators'] = groups.append('g')
                    .attr({
                        'class': 'alternative-' + entityGroup + '-key-indicator alternative-key-indicator hidden'
                    });

                // add background circle
                self[entityGroup + 'AlternativeKeyIndicators'].append('circle')
                    .attr({
                        cy: Math.round(entityHeight/1.2) - 10,
                        cx: Math.round(entityWidth/1.9) + 38,
                        r: 20
                    });
                // add text
                self[entityGroup + 'AlternativeKeyIndicators'].append('text')
                    .attr({
                        y: Math.round(entityHeight/1.2) + 2,
                        x: Math.round(entityWidth/1.9) + 31
                    }).text(function(d,i){ return 'Shift + ' + (i + 1); });

                // ----------------------
                // Damage Text animation
                // ----------------------
                // There can be multiple text elements at once, anytime health
                // changes create a floating text element for it
                self[entityGroup + 'EntityDamageTextGroups'] = groups.append('g')
                    .attr({ 'class': 'text-group-wrapper' });

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
            this.setSelectedEntity({index: firstAliveEntity});

            // --------------------------
            // Event Listeners
            // --------------------------
            _.each(['player', 'enemy'], function healthGroup(entityGroup){
                var models = self.model.get(entityGroup + 'Entities').models;
                _.each(models, function setupHealthCallback(model, index){
                    // show damage text whenever entitiy's health changes
                    // ----------------------
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
                        }
                    );

                    self.listenTo(
                        model,
                        'change:activeEffects', 
                        // model changes get passed in the model and the
                        // changed attribute value
                        function callUpdateEffects(entityModel, effects, changeOptions){
                            return self.showEffectOnActiveEffectChange.call(
                                self, {
                                    entityModel: entityModel,
                                    effects: effects,
                                    index: index,
                                    entityGroup: entityGroup,
                                    changeOptions: changeOptions
                                }
                            );
                        }
                    );
                });
            });

            return this;
        },

        // ------------------------------
        //
        // Buff effect
        //
        // ------------------------------
        showEffectOnActiveEffectChange: function showEffectChange(options){
            console.log("active effect change : ", options);
            return this;
        },

        // ------------------------------
        //
        // Text effect
        //
        // ------------------------------
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

            var shakeScale = d3.scale.linear()
                .domain([ 0, entityModel.get('attributes').get('maxHealth')])
                .range([ 3, 24 ]);
                        

            // shake the battle container
            // --------------------------
            if(difference < 0){
                // shake a lot if self is hit
                if(entityGroup === 'player'){
                    shakeBattle(Math.ceil(shakeScale(-difference)));
                } else {
                    shakeBattle(Math.ceil(shakeScale(-difference) / 3));
                }
            }

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
            var textXScale = d3.scale.linear()
                .domain([ 0, entityModel.get('attributes').get('maxHealth') / 5 ])
                .range([ 0, 40 ])
                .clamp(true);

            var textX = textXScale(Math.round(Math.abs(difference)));

            if(difference < 0){ textX = textX * -1; }

            var $damageText = d3.select(
                self[entityGroup + 'EntityDamageTextGroups'][0][index]
            ).append('text')
                .attr({
                    'class': 'entity-group-text ' + entityGroup,
                    // position it based on positive / negative health change
                    //  randomize position just a little bit so text doesn't
                    //  overlap
                    x: textX
                });

            // first, start text at bottom of entity and set text
            //  will have either 'positive damage' or 'negative damage' classes
            var dmgClass = 'neutral damage';
            if(difference < 0){
                dmgClass = 'negative damage';
            } else if(difference > 0){
                dmgClass = 'positive damage';
            }
            $damageText.classed(dmgClass, true);

            $damageText
                .attr({ 
                    y: self.entityHeight - 10,
                    opacity: 0.3
                })
                .text((difference < 1 ? '' : '+') + difference);


            // then, fade in text and float it up and out
            $damageText.transition().ease('cubic-in').duration(160)
                    .attr({ 
                        y: -15, 
                        x: textX < 0 ? textX - 20 : textX + 20,
                        opacity: 1
                    })
                    // reached the apex
                    .transition().ease('cubic-out').duration(420)
                        .attr({  
                            y: 0, 
                            x: textX < 0 ? textX - 50 : textX + 50,
                            opacity: 1
                        })
                        .transition().ease('cubic-in').duration(270)
                            .attr({
                                y: 40, 
                                'font-size': 0,
                                opacity: 0
                            })
                            // remove the element when it's over
                            .each('end', function(){
                                d3.select(this).remove();
                            });
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
                logger.log("error:view:Battle:startTimerAnimation",
                    'invalid parameters passed in', options);
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
                    // must divide by the timerFactor
                    var duration = (
                        (targetModel.attributes.attributes.attributes.timerLimit - options.value) / 
                        targetModel.attributes.attributes.attributes.timerFactor) * 1000;

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
        updateSVGTargetDisplay: function updateSVGTargetDisplay(group, index){
            // Called whenever the selectedEntity's desired target changes, will
            // update the target ring
            //
            logger.log("views/subviews/Battle", 
                'updateSVGTargetDisplay() called : %O', arguments);

            // turn off all selected entities
            d3.select('#battle .entity-selected')
                .classed('entity-selected', false);

            if(group){
                // target the entity, if group was passed in
                d3.select(this[group + 'EntityGroupsWrapper'][0][index])
                    .classed('entity-selected', true);
            }

            return this;
        },

        selectEntity: function selectEntity(options){
            // This is a proxy function that will call the corresponding select
            // entity type function based on the passed in entityGroup
            options = options || {};
            logger.log("views/subviews/Battle", 'selectEntity() called with options : %O', options);

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
            logger.log("views/subviews/Battle", 
                'selectPlayerEntity : selecting (or using an ability) on an entity controlled by the player. options : %O',
                options);
            options = options || {};
            var i = options.index;
            
            var target = this.selectTarget('player', i);

            if(!target){
                logger.warn("views/subviews/Battle : selectPlayerEntity() : no target entity %O", target);
                return false;
            }

            // STATE: normal
            var state = this.model.get('state');
            var desiredTarget = {
                model: target,
                index: i,
                group: 'player'
            };

            if(state === 'normal' || state === 'pause'){
                logger.log("views/subviews/Battle", '\t setting entity target');

                if(this.selectedEntity){
                    // if there's a selected entity, update the desired target
                    // update the selected entity's target
                    this.selectedEntity.set({ 
                        desiredTarget: desiredTarget
                    }, { silent: true });

                    // manually trigger the change since we're updating a model
                    this.selectedEntity.trigger('change:desiredTarget', 
                        this.selectedEntity, desiredTarget);
                }

                // TODO: Handle this differently..don't always set the
                // selected entity, ONLY do this if they press up / down
                // or j / k OR double click on an entity
                // TODO: THIS ? REMOVE?
                //this.setSelectedEntity({index: options.index});

            } else if(this.model.get('state') === 'ability'){
                // then, use the ability
                // TODO: think of call structure
                logger.log("views/subviews/Battle", '\t using ability');
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
            // This is called when the user clicks on or otherwise targets an
            // entity. If the `ability` state is active, use the ability selected
            // otherwise, set the entity's target
            //
            options = options || {};
            var i = options.index;
            logger.log("views/subviews/Battle", 
                'selectEnemyEntity called with options : %O', options);
            
            var target = this.selectTarget('enemy', i);

            if(!target){
                logger.warn("views/subviews/Battle : selectEnemyEntity() : no target entity %O", target);
                return false;
            }

            // store desiredTarget info
            var desiredTarget = {
                model: target, index: i, group: 'enemy'
            };
            
            if(this.model.get('state') === 'normal'){
                // TODO: show more info on enemy?
                logger.log("views/subviews/Battle", 'setting entity target');
                // set desired target info
                //
                // TODO: index and group should NOT be stored in here,
                // should have a util function to get index and group FROM
                // a target
                this.selectedEntity.set({ 
                    desiredTarget: desiredTarget
                }, { silent: true });

                // manually trigger the change event
                this.selectedEntity.trigger('change:desiredTarget',
                    this.selectedEntity, desiredTarget);

            } else if(this.model.get('state') === 'ability'){
                // call the general select entity function to set the ability's
                // target and use the ability
                logger.log("views/subviews/Battle", 
                    'using ability on target %O', target);

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
        selectTarget: function selectTarget(group, i){
            // Sets the target based on the selected index in the model
            logger.log("views/subviews/Battle", 
                '1. selectTarget : group %O | i %O', group, i);

            var model = null;
            if(group){
                model = this.model.get(group + 'Entities').models[i];
            }

            // TODO: Update selectTarget when selectedEntity changes
            //  (in setSelectedEntity)
            this.selectedTarget = model;
            logger.log("views/subviews/Battle", '\t selected target: %O', this.selectedTarget);

            // update svg elements
            this.updateSVGTargetDisplay(group, i);

            // TODO: restructure, prettify
            // update the target window
            if(group && (i !== undefined)){
                logger.log("views/subviews/Battle", 
                    '\t updating current target view : %O | %O', i, group);
                this.setIntendedTarget({
                    index: i,
                    entityGroup: group
                });
            } else {
                logger.log("views/subviews/Battle", '\t clearing current target view');
                this.clearIntendedTarget();
            }

            return this.selectedTarget;
        },

        setSelectedEntity: function setSelectedEntity(options){
            // Select an entity at passed in index in the normal state
            // --------------------------
            // overview:
            //  -Get the entity model from the selection
            //  -Show the abilities for the entity
            //  -Show more info
            //  -Move the entity forward
            //
            options = options || {};
            logger.log("views/subviews/Battle", 'setSelectedEntity() called');
            var i = options.index;

            // if the user selected the currently active entity, do nothing
            if(i === this.previouslySelectedEntityIndex){ 
                logger.log("views/subviews/Battle", 
                    '\t 0. entity selected: same entity selected, exiting : i : %O', i);
                return false; 
            } 

            //1. get model based on selected element
            var model = this.model.get('playerEntities').models[i];
            logger.log("views/subviews/Battle", 
                "\t 1. entity selected: %O \n model: %O", i, model);

            // update the selected entity
            this.selectedEntityIndex = i;
            this.selectedEntityGroup = 'player';
            this.selectedEntity = model;

            // upet the active player entity view
            this.entityInfoCollectionView.setSelectedEntityView(model);

            // show abilities for this entity. Create new AbilityList view
            // --------------------------
            logger.log("views/subviews/Battle", "\t 2. showing ability view");
            var abilityListView = new AbilityListView({
                collection: model.get('abilities'),
                entityModel: model
            });
            // store ref to ability list view so we can show active abilities
            this.currentAbilityListView = abilityListView;
            this.regionAbility.show(abilityListView);

            // move entity group forward
            logger.log("views/subviews/Battle", "\t 3. moving entity");
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

            // Update the visible target
            // --------------------------
            if(model.attributes.desiredTarget){
                logger.log("views/subviews/Battle", "\t updated selected target");
                this.selectTarget(
                    model.attributes.desiredTarget.group,
                    model.attributes.desiredTarget.index
                );
            }

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

            // TODO: don't create new views, use a single view and just rerender
            // TODO: don't create new views, reuse them(?)
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

            if(this.selectedEntity && this.selectedEntity.attributes.desiredTarget){
                var infoView = new IntendedTargetInfoView({ 
                    model: this.selectedEntity.attributes.desiredTarget.model
                });
                this.regionIntendedTarget.show(infoView);
            }   
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
                !target || 
                // check if target is dead
                ( !target.get('isAlive') && validTarget.indexOf('dead') === -1 )
            ){
                //
                // Cannot use because the entity group of the intended target 
                // is not valid
                logger.log("views/subviews/Battle", 
                    "x. useAbility(): CANNOT use, invalid target | target %O",
                    target);
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
                //  CAN NOT use (timer not met)
                // TODO: visual spell effect
                // TODO: multiple targets 
                logger.log("views/subviews/Battle", 
                    "2. CANNNOT use ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                return false;

            } else {
               // CAN use (timer met)
                logger.log("views/subviews/Battle", 
                    "2. USING ability! Time: %O / %O", entityTime, 
                    selectedAbility.get('castTime'));

                // update the timer
                // --------------------------
                this[sourceEntityGroup + 'EntityTimers'][sourceEntityIndex] -= 
                    selectedAbility.get('timeCost');

                // trigger ability usage on entiy model
                sourceEntity.trigger('ability:use', {
                    target: target,
                    ability: selectedAbility
                });

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

                //// --------------------------
                //// Reset back to normal state
                //// --------------------------
                //// NOTE: need this if we don't have target first usage
                //if(playerUsedAbility){
                    //this.cancelTarget();
                //}

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

                    // get the position of the entity sprite.
                    //  We need to do this so we can tell the effect where to go
                    //  TODO: We could just have the effect go to the entity's
                    //  starting location instead - would be slightly faster
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
                    // TODO: Make this a function outside of this scope, pass 
                    // in selected ability and entities. 
                    // Then, this allows us to just listen for a health change
                    // or whatever other event and trigger it
                    //
                    // get a copy of the svg effect
                    //  all effects should be wrapped in a svg element with id of
                    //  `effect-spellName`, and the wrapper should have no attributes
                    function renderEffect(){
                        if($('#effect-' + selectedAbility.attributes.effectId).length < 1){
                            logger.log('Battle:renderEffect', 'no effect found, returning');
                            return false;
                        }
                        var $effect = d3.sticker('#effect-' + selectedAbility.attributes.effectId);

                        // append it the ability effects group
                        $effect = $effect(self.$abilityEffects);

                        var effectClass = '';

                        // Set effect class based on the element
                        // --------------
                        // TODO: Use a gradient for multiple effects
                        var highestElement = { value: 0, element: '' };

                        _.each(selectedAbility.attributes.element, function(val,key){
                            if(highestElement.value < val){ 
                                highestElement.value = val; 
                                highestElement.element = key;
                            }
                        });

                        effectClass = highestElement.element;

                        // Render the effect
                        // --------------
                        // start in the middle of the source
                        $effect.attr({
                            'class': $effect.attr('class') + ' ' + effectClass,
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

                    // TODO: Don't do this here - listen for change or use ability
                    // event, some sort of event where we can render it without
                    // relying on ticks existing
                    var curTick = 0;
                    if(selectedAbility.attributes.ticks){
                        while(curTick < selectedAbility.attributes.ticks){
                            new Timer(
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
//      TODO: allow resuming games
//      TODO: Use EoALayoutView
//
// ===========================================================================
define(
    'views/PageGame',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',

        // Map
        'models/Map',
        'models/Battle',

        'views/map/ContainerMap',
        'views/subViews/Battle',
        
        'localForage'

    ], function viewPageGame(
        d3, backbone, marionette, 
        logger, events,

        Map, Battle,
        MapContainerView,
        BattleView,

        localForage
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
            this.mapContainer = new MapContainerView({
                model: this.model
            });

            return this;
        },

        onShow: function gameOnShow(){
            logger.log('views/PageGame', 'onShow() called');
            var self = this;

            // setup the map
            this.regionMap.show(this.mapContainer);

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
            var self = this;

            // If the node instance was clicked and an instance is already 
            // active, do nothing
            if(this.model.get('activeNodeInstance') !== null){
                logger.log('error:views:PageGame', 
                    '[x] node instance already active! 2. exiting');
                return this;
            }

            // Hide map
            logger.log('views/PageGame', '2. Hiding map');
            this.regionMap.$el.addClass('inactive');
            //this.regionMap.$el.addClass('animated rotateOut');

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

            // wrap in raf for slight improvement in performance
            requestAnimationFrame(function showNodeInstanceWrapper(){
                self.regionNodeInstance.$el.removeClass('inactive');
            });

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
            var self = this;

            // change the currently updated node
            // clear out the active node
            this.model.set({
                activeNodeInstance: null
            }, {silent: true});
            this.model.trigger('change:activeNodeInstance');
            
            // Hide instance
            logger.log('views/PageGame', '3. Hiding node instance');
            this.regionNodeInstance.$el.addClass('inactive');
            this.regionNodeInstance.close();

            // show map
            logger.log('views/PageGame', '4. Showing map');
            // Do this after a small delay to give the instance wrapper time
            // to fade out
            setTimeout(function(){
                requestAnimationFrame(function(){
                    self.regionMap.$el.removeClass('inactive');
                });
            }, 50);

            // update the map's current map node
            var map = this.model.get('map');
            map.setCurrentNode(map.get('nextNode'));
        }

    });

    return PageGame;
});

// ===========================================================================
//
// DevTools
//
//  Admin / Dev utilities
// 
// ===========================================================================
define(
    'views/DevTools',[ 
        'd3', 'backbone', 'marionette',
        'logger', 'events',
        'localForage',
    ], function viewPageHome(
        d3, backbone, marionette, 
        logger, events,
        localForage
    ){

    var DevTools = Backbone.Marionette.Layout.extend({
        template: '#template-dev-tools',

        //hidden by default
        'className': 'dev-tools-wrapper hidden',

        events: {
            'click .btn-save': 'save',
            'click .btn-clear-save': 'clearSave'
        },

        initialize: function initialize(options){
            // initialize:
            logger.log('views/DevTools', 'initialize() called');

            // show / hide dev panel
            this.listenTo(events, 'keyPress:shift+i', this.togglePanel);
            return this;
        },

        save: function(){
            // Save the game
            logger.log('views/DevTools', 'save(): triggering save');
            events.trigger('dev:saveGame');
        },
        clearSave: function(){
            // clear the saved game 
            // NOTE: only clears local storage
            logger.log('views/DevTools', 'clearSave(): removing items from localstorage');
            while(window.localStorage.length){
                window.localStorage.removeItem(localStorage.key(0));
            }
            logger.log('views/DevTools', 'all done: %O', window.localStorage);

            localForage.clear();
            return this;
        },

        // ------------------------------
        //
        // User Interaction
        //
        // ------------------------------
        togglePanel: function(e){
            this.$el.toggleClass('hidden');
            return this;
        }
    });

    return DevTools;
});

//=============================================================================
// Controller.js
//
// Handles Controller functions the router uses
//
// TODO: Don't have user be logged in permanently (done for dev)
//
// TODO: Show loading message if auth cookie exists (in HTML).
//  -load game state from localstorage
//============================================================================= 
define('Controller',[
    'backbone', 'marionette', 'logger', 'events', 
    'models/appUser-object',
    'models/Game',
    'models/Race',
    'models/Entity',
    'views/PageHome',
    'views/PageGame',

    'collections/Abilities',

    // TODO: remove, only for dev
    'views/DevTools'

    ], function(
        Backbone, Marionette, logger, events,
        appUser,
        Game,
        Race,
        Entity,

        // include views here
        PageHome,
        PageGame,

        Abilities,

        // TODO: remove once out of dev
        DevTools
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

            // keep trak of regions
            _.each(options.regions, function(region, key){
                self[key] = region;
            });

            // create dev tools view
            this.regionDevTools.show(new DevTools({}));

            // config mobile
            this.setupMobile();
            this.initialUrl = window.location.pathname;


            // HANDLE Logged in functionality
            function handleLoggedIn(){
                // This is called whenever a user successfully logs in
                // Try to get an exiting game model
                //
                // !!!!!!!!!!!!!!!!!!!!!!
                // TODO: We should fetch the app user, and get the game model
                // from the app user
                // !!!!!!!!!!!!!!!!!!!!!!
                // Create a temporary game model and try to fetch it
                // TODO: fetch from server instead of localhost? 
                var tmpGameModel = new Game({ id: 'currentGame' });
                tmpGameModel.fetch({
                    success: function(res){
                        logger.log('Controller', 'Model fetched from server!');
                        // model worked, store game model reference
                        self.modelGame = tmpGameModel;
                        self.showGame();
                    }, 
                    error: function(e,r){
                        logger.log('Controller', 'Model unable to be fetched : %O, %O',
                            e,r);
                        // Model does not exist, do nothing
                        // TODO: do anything?
                    }
                });
                return false;
            }

            // Don't show any views other than the loading or login UNTIL the
            // user's login status has been fetched
            if(appUser.get('isLoggedIn') === false){
                // NOT logged in
                // ----------------------
                // Note: it's possible the appUser may have been fetched before
                // this is called - in that case, do nothing
                logger.log('Controller', 'not logged in');

                appUser.on('initialFetchFromServer', function controllerUserFetched(){
                    var loggedIn = appUser.get('isLoggedIn');

                    logger.log('Controller', 
                        'fetched app user : loggedIn: %O',
                        loggedIn);

                    // If user is logged in, show the called route
                    if(loggedIn){
                        // LOGGED IN
                        // --------------
                        handleLoggedIn();
                    } else {
                        // NOT LOGGED IN
                        // --------------
                        // TODO: do nothing(?)
                    }
                });
            } else {
                // LOGGED IN already
                // ----------------------
                // if user is already logged in, 
                logger.log('Controller', 'logged in already during controller initialize');
                handleLoggedIn();
            }

            // Listen for controller events to show different pages
            // --------------------------
            // NOTE: We're NOT using the appRouter for this, because we don't
            // want routes - we want the game state to be stored outside of URLs
            this.listenTo(events, 'controller:showCreateCharacter', this.showCreateCharacter);
            this.listenTo(events, 'controller:showGame', this.showGame);
            this.listenTo(events, 'controller:showHome', this.showHome);

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
            // The "home" page is the initial landing experience / create
            // character flow. It is called immediately. If the user is logged
            // in, account links should fade in, along with more race options.
            //
            var self = this;
            logger.log('Controller', 'showHome() called');

            if(!this.pageHome){
                logger.log('Controller', 'creating new pageHome view');
                this.pageHome = new PageHome();
            }

            // Otherwise, show the homepage
            this.currentRegion = this.pageHome;
            this.regionMain.show(this.currentRegion);

            return this;
        },

        // ------------------------------
        //
        // Game
        //
        // ------------------------------
        showGame: function controllerShowGame(options){
            var self = this;
            options = options || {};

            logger.log('Controller', 'showGame() called');

            // TODO: Do we need this??!?!? Players should be able to play while
            // not logged in...
            if(!appUser.get('isLoggedIn')){ 
                logger.log('Controller', 'not logged in, returning false');
                return false;
            }

            // get game model from server(?)
            if(!this.pageGame){
                logger.log('Controller', 'creating new pageGame view');
            }
            var playerEntityModels = [];

            // Check for options
            // --------------------------
            if(options.dataToCreateGameModel){
                // if data from create is passed in, use it. This assumes
                // data is passed in as a raw JSON object, not game models
                this.modelGame = new Game({}, {
                    models: [ new Entity({
                        abilities: new Abilities( options.dataToCreateGameModel.abilities ),
                        name: options.dataToCreateGameModel.name,
                        race: new Race( options.dataToCreateGameModel.race )
                    }) ]
                });
            }

            if(!this.modelGame){
                // TODO: handle creating game differently, load in models
                // NOT from pageCreateCharacter. Get from GAME model
                playerEntityModels = [ this.pageHome.model ];

                //// TODO: To load from localstorage
                var modelGame = null;
                this.modelGame = new Game({}, {
                    models: playerEntityModels
                });
            }

            // TODO: Reuse game view, don't show / hide it? Use a different
            // region?
            this.pageGame = new PageGame({
                model: this.modelGame
            });

            logger.log('Controller', 'showing game : %O, %O',
                playerEntityModels,
                this.modelGame);

            this.currentRegion = this.pageGame;
            requestAnimationFrame(function(){
                self.regionMain.show(self.currentRegion);
            });

            return this;
        }

    });

    return Controller;
});

//=============================================================================
// Router.js
//
// Handles routing for the game. Note that there is only a single route for
// the game itself, but there may be other routes for things like account info,
// about, etc. that are _outside_ the game
//=============================================================================
define('appRouter',['backbone', 'marionette', 'logger', 'events'], 
    function(Backbone, Marionette, logger, events){

    // Router class
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            //Main route
            "(/)": "showHome"
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
        lodash: 'lib/lodash.min',
        
        jwerty: 'lib/jwerty.min',

        localForage: 'lib/localForage.min',

        velocity: 'lib/jquery.velocity',
        pageTurn: 'lib/turn.min',

        backbone: 'lib/backbone',
        localstorage: 'lib/backbone.localstorage',
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
requirejs([
    //libs
    'jquery', 'lib/jquery.transit.min', 'lib/jquery.visibility',
    'lib/jquery.wordwriter',
    'velocity', 'pageTurn', 
    'localForage',
    'backbone', 'marionette', 'bootstrap',
    'd3',
    'util/d3plugins', // always load d3 plugins, extends d3 object

    //utils
    'logger', 
    'util/browserInfo',
    'util/Timer',
    'handleKeys',

    //app
    'app', 
    'events',

    'Controller',
    'appRouter'
    ],
    function main(
        $, $transit, $visibility,
        $wordWriter,
        $velocity, $turn,
        localForage,
        Backbone, marionette, bootstrap,
        d3,
        d3plugins,

        logger, 
        browserInfo,
        Timer,
        handleKeys,

        app, events,

        Controller,
        getAppRouter
    ){

    window.d3 = d3;
    window.localForage = localForage;
    window.EVENTS = events;

    // Allows multiple modals 
    if (!$.support.transition) { $.fn.transition = $.fn.animate; }

    //For IE8, don't cache AJAX queries. 
    if(browserInfo.isIe8){ $.ajaxSetup({ cache: false }); }

    //INITIAL CONFIG
    //-----------------------------------
    //Configure log options (set app-wide) 
    
    // log options
    logger.transports.get('Console').property({ showMeta: false });

    logger.options.groupsEnabled = [
        /pageHome/, /analytics/,
        /PlayerEntityInfo/
    ];
    logger.options.groupsDisabled = [/pageHome/, /allAbilitiesListItem/];
    logger.options.groupsEnabled = true;

    window.LOGGER = logger;

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

        // ------------------------------
        // Events for window losing or gaining focus / visibility 
        // ------------------------------
        $(document).on({
            'show.visibility': function(e) {
                logger.log('app', 'document:show event triggering at : ' + 
                    new Date() + ' %O', e);
                events.trigger('document:show');
            },
            'hide.visibility': function(e) {
                logger.log('app', 'document:hide event triggering at : ' + 
                    new Date() + ' %O', e);
                events.trigger('document:hide');
            }
        });

        // ------------------------------
        // setup handle keys
        // ------------------------------
        handleKeys();

    });

    app.start();
});

define("main", function(){});
