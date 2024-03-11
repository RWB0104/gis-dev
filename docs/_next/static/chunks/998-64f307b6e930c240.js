"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[998],{75890:function(t,e,s){var i=s(13767);e.Z=void 0;var r=i(s(41032)),n=s(39926),o=(0,r.default)((0,n.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");e.Z=o},54288:function(t,e,s){s.d(e,{D:function(){return c}});var i=s(10496),r=s(96105),n=s(34222),o=s(37452),h=s(99664),a=class extends o.l{constructor(t,e){super(),this.#t=void 0,this.#e=t,this.setOptions(e),this.bindMethods(),this.#s()}#e;#t;#i;#r;bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){let e=this.options;this.options=this.#e.defaultMutationOptions(t),(0,h.VS)(e,this.options)||this.#e.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#i,observer:this}),this.#i?.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#i?.removeObserver(this)}onMutationUpdate(t){this.#s(),this.#n(t)}getCurrentResult(){return this.#t}reset(){this.#i=void 0,this.#s(),this.#n()}mutate(t,e){return this.#r=e,this.#i?.removeObserver(this),this.#i=this.#e.getMutationCache().build(this.#e,this.options),this.#i.addObserver(this),this.#i.execute(t)}#s(){let t=this.#i?.state??(0,r.R)();this.#t={...t,isPending:"pending"===t.status,isSuccess:"success"===t.status,isError:"error"===t.status,isIdle:"idle"===t.status,mutate:this.mutate,reset:this.reset}}#n(t){n.V.batch(()=>{this.#r&&this.hasListeners()&&(t?.type==="success"?(this.#r.onSuccess?.(t.data,this.#t.variables,this.#t.context),this.#r.onSettled?.(t.data,null,this.#t.variables,this.#t.context)):t?.type==="error"&&(this.#r.onError?.(t.error,this.#t.variables,this.#t.context),this.#r.onSettled?.(void 0,t.error,this.#t.variables,this.#t.context))),this.listeners.forEach(t=>{t(this.#t)})})}},u=s(62152),l=s(20783);function c(t,e){let s=(0,u.NL)(e),[r]=i.useState(()=>new a(s,t));i.useEffect(()=>{r.setOptions(t)},[r,t]);let o=i.useSyncExternalStore(i.useCallback(t=>r.subscribe(n.V.batchCalls(t)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),h=i.useCallback((t,e)=>{r.mutate(t,e).catch(d)},[r]);if(o.error&&(0,l.L)(r.options.throwOnError,[o.error]))throw o.error;return{...o,mutate:h,mutateAsync:o.mutate}}function d(){}},11248:function(t,e,s){let i;s.d(e,{a:function(){return Q}});var r=s(99664),n=s(34222),o=s(47653),h=s(37452),a=s(33655),u=class extends h.l{constructor(t,e){super(),this.#o=void 0,this.#h=void 0,this.#t=void 0,this.#a=new Set,this.#e=t,this.options=e,this.#u=null,this.bindMethods(),this.setOptions(e)}#e;#o;#h;#t;#l;#c;#u;#d;#p;#f;#g;#m;#R;#a;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#o.addObserver(this),l(this.#o,this.options)?this.#y():this.updateResult(),this.#v())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return c(this.#o,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return c(this.#o,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#O(),this.#b(),this.#o.removeObserver(this)}setOptions(t,e){let s=this.options,i=this.#o;if(this.options=this.#e.defaultQueryOptions(t),(0,r.VS)(s,this.options)||this.#e.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#o,observer:this}),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled)throw Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=s.queryKey),this.#P();let n=this.hasListeners();n&&d(this.#o,i,this.options,s)&&this.#y(),this.updateResult(e),n&&(this.#o!==i||this.options.enabled!==s.enabled||this.options.staleTime!==s.staleTime)&&this.#E();let o=this.#I();n&&(this.#o!==i||this.options.enabled!==s.enabled||o!==this.#R)&&this.#C(o)}getOptimisticResult(t){let e=this.#e.getQueryCache().build(this.#e,t),s=this.createResult(e,t);return(0,r.VS)(this.getCurrentResult(),s)||(this.#t=s,this.#c=this.options,this.#l=this.#o.state),s}getCurrentResult(){return this.#t}trackResult(t){let e={};return Object.keys(t).forEach(s=>{Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:()=>(this.#a.add(s),t[s])})}),e}getCurrentQuery(){return this.#o}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){let e=this.#e.defaultQueryOptions(t),s=this.#e.getQueryCache().build(this.#e,e);return s.isFetchingOptimistic=!0,s.fetch().then(()=>this.createResult(s,e))}fetch(t){return this.#y({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#t))}#y(t){this.#P();let e=this.#o.fetch(this.options,t);return t?.throwOnError||(e=e.catch(r.ZT)),e}#E(){if(this.#O(),r.sk||this.#t.isStale||!(0,r.PN)(this.options.staleTime))return;let t=(0,r.Kp)(this.#t.dataUpdatedAt,this.options.staleTime);this.#g=setTimeout(()=>{this.#t.isStale||this.updateResult()},t+1)}#I(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#o):this.options.refetchInterval)??!1}#C(t){this.#b(),this.#R=t,!r.sk&&!1!==this.options.enabled&&(0,r.PN)(this.#R)&&0!==this.#R&&(this.#m=setInterval(()=>{(this.options.refetchIntervalInBackground||o.j.isFocused())&&this.#y()},this.#R))}#v(){this.#E(),this.#C(this.#I())}#O(){this.#g&&(clearTimeout(this.#g),this.#g=void 0)}#b(){this.#m&&(clearInterval(this.#m),this.#m=void 0)}createResult(t,e){let s;let i=this.#o,n=this.options,o=this.#t,h=this.#l,u=this.#c,c=t!==i?t.state:this.#h,{state:f}=t,{error:g,errorUpdatedAt:m,fetchStatus:R,status:y}=f,v=!1;if(e._optimisticResults){let s=this.hasListeners(),r=!s&&l(t,e),o=s&&d(t,i,e,n);(r||o)&&(R=(0,a.Kw)(t.options.networkMode)?"fetching":"paused",f.dataUpdatedAt||(y="pending")),"isRestoring"===e._optimisticResults&&(R="idle")}if(e.select&&void 0!==f.data){if(o&&f.data===h?.data&&e.select===this.#d)s=this.#p;else try{this.#d=e.select,s=e.select(f.data),s=(0,r.oE)(o?.data,s,e),this.#p=s,this.#u=null}catch(t){this.#u=t}}else s=f.data;if(void 0!==e.placeholderData&&void 0===s&&"pending"===y){let t;if(o?.isPlaceholderData&&e.placeholderData===u?.placeholderData)t=o.data;else if(t="function"==typeof e.placeholderData?e.placeholderData(this.#f?.state.data,this.#f):e.placeholderData,e.select&&void 0!==t)try{t=e.select(t),this.#u=null}catch(t){this.#u=t}void 0!==t&&(y="success",s=(0,r.oE)(o?.data,t,e),v=!0)}this.#u&&(g=this.#u,s=this.#p,m=Date.now(),y="error");let O="fetching"===R,b="pending"===y,P="error"===y,E=b&&O;return{status:y,fetchStatus:R,isPending:b,isSuccess:"success"===y,isError:P,isInitialLoading:E,isLoading:E,data:s,dataUpdatedAt:f.dataUpdatedAt,error:g,errorUpdatedAt:m,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:f.dataUpdateCount>0||f.errorUpdateCount>0,isFetchedAfterMount:f.dataUpdateCount>c.dataUpdateCount||f.errorUpdateCount>c.errorUpdateCount,isFetching:O,isRefetching:O&&!b,isLoadingError:P&&0===f.dataUpdatedAt,isPaused:"paused"===R,isPlaceholderData:v,isRefetchError:P&&0!==f.dataUpdatedAt,isStale:p(t,e),refetch:this.refetch}}updateResult(t){let e=this.#t,s=this.createResult(this.#o,this.options);if(this.#l=this.#o.state,this.#c=this.options,(0,r.VS)(s,e))return;void 0!==this.#l.data&&(this.#f=this.#o),this.#t=s;let i={};t?.listeners!==!1&&(()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,s="function"==typeof t?t():t;if("all"===s||!s&&!this.#a.size)return!0;let i=new Set(s??this.#a);return this.options.throwOnError&&i.add("error"),Object.keys(this.#t).some(t=>this.#t[t]!==e[t]&&i.has(t))})()&&(i.listeners=!0),this.#n({...i,...t})}#P(){let t=this.#e.getQueryCache().build(this.#e,this.options);if(t===this.#o)return;let e=this.#o;this.#o=t,this.#h=t.state,this.hasListeners()&&(e?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#v()}#n(t){n.V.batch(()=>{t.listeners&&this.listeners.forEach(t=>{t(this.#t)}),this.#e.getQueryCache().notify({query:this.#o,type:"observerResultsUpdated"})})}};function l(t,e){return!1!==e.enabled&&!t.state.dataUpdatedAt&&!("error"===t.state.status&&!1===e.retryOnMount)||t.state.dataUpdatedAt>0&&c(t,e,e.refetchOnMount)}function c(t,e,s){if(!1!==e.enabled){let i="function"==typeof s?s(t):s;return"always"===i||!1!==i&&p(t,e)}return!1}function d(t,e,s,i){return!1!==s.enabled&&(t!==e||!1===i.enabled)&&(!s.suspense||"error"!==t.state.status)&&p(t,s)}function p(t,e){return t.isStaleByTime(e.staleTime)}var f=s(10496),g=f.createContext((i=!1,{clearReset:()=>{i=!1},reset:()=>{i=!0},isReset:()=>i})),m=()=>f.useContext(g),R=s(62152),y=f.createContext(!1),v=()=>f.useContext(y);y.Provider;var O=s(20783),b=(t,e)=>{(t.suspense||t.throwOnError)&&!e.isReset()&&(t.retryOnMount=!1)},P=t=>{f.useEffect(()=>{t.clearReset()},[t])},E=t=>{let{result:e,errorResetBoundary:s,throwOnError:i,query:r}=t;return e.isError&&!s.isReset()&&!e.isFetching&&(0,O.L)(i,[e.error,r])},I=t=>{t.suspense&&"number"!=typeof t.staleTime&&(t.staleTime=1e3)},C=(t,e)=>t.isLoading&&t.isFetching&&!e,S=(t,e,s)=>t?.suspense&&C(e,s),M=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function Q(t,e){return function(t,e,s){let i=(0,R.NL)(s),r=v(),o=m(),h=i.defaultQueryOptions(t);h._optimisticResults=r?"isRestoring":"optimistic",I(h),b(h,o),P(o);let[a]=f.useState(()=>new e(i,h)),u=a.getOptimisticResult(h);if(f.useSyncExternalStore(f.useCallback(t=>{let e=r?()=>void 0:a.subscribe(n.V.batchCalls(t));return a.updateResult(),e},[a,r]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),f.useEffect(()=>{a.setOptions(h,{listeners:!1})},[h,a]),S(h,u,r))throw M(h,a,o);if(E({result:u,errorResetBoundary:o,throwOnError:h.throwOnError,query:a.getCurrentQuery()}))throw u.error;return h.notifyOnChangeProps?u:a.trackResult(u)}(t,u,e)}},20783:function(t,e,s){s.d(e,{L:function(){return i}});function i(t,e){return"function"==typeof t?t(...e):!!t}},68254:function(t,e,s){var i=s(29390),r=s(77129),n=s(70790),o=s(75682),h=s(29342),a=s(93107);let u={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"};class l extends i.Z{constructor(t){super(),this.on,this.once,this.un,this.options=t,this.id=t.id,this.insertFirst=void 0===t.insertFirst||t.insertFirst,this.stopEvent=void 0===t.stopEvent||t.stopEvent,this.element=document.createElement("div"),this.element.className=void 0!==t.className?t.className:"ol-overlay-container "+n.$A,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.autoPan=!0===t.autoPan?{}:t.autoPan||void 0,this.rendered={transform_:"",visible:!0},this.mapPostrenderListenerKey=null,this.addChangeListener(u.ELEMENT,this.handleElementChanged),this.addChangeListener(u.MAP,this.handleMapChanged),this.addChangeListener(u.OFFSET,this.handleOffsetChanged),this.addChangeListener(u.POSITION,this.handlePositionChanged),this.addChangeListener(u.POSITIONING,this.handlePositioningChanged),void 0!==t.element&&this.setElement(t.element),this.setOffset(void 0!==t.offset?t.offset:[0,0]),this.setPositioning(t.positioning||"top-left"),void 0!==t.position&&this.setPosition(t.position)}getElement(){return this.get(u.ELEMENT)}getId(){return this.id}getMap(){return this.get(u.MAP)||null}getOffset(){return this.get(u.OFFSET)}getPosition(){return this.get(u.POSITION)}getPositioning(){return this.get(u.POSITIONING)}handleElementChanged(){(0,a.ep)(this.element);let t=this.getElement();t&&this.element.appendChild(t)}handleMapChanged(){this.mapPostrenderListenerKey&&((0,a.ZF)(this.element),(0,h.bN)(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);let t=this.getMap();if(t){this.mapPostrenderListenerKey=(0,h.oL)(t,r.Z.POSTRENDER,this.render,this),this.updatePixelPosition();let e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element),this.performAutoPan()}}render(){this.updatePixelPosition()}handleOffsetChanged(){this.updatePixelPosition()}handlePositionChanged(){this.updatePixelPosition(),this.performAutoPan()}handlePositioningChanged(){this.updatePixelPosition()}setElement(t){this.set(u.ELEMENT,t)}setMap(t){this.set(u.MAP,t)}setOffset(t){this.set(u.OFFSET,t)}setPosition(t){this.set(u.POSITION,t)}performAutoPan(){this.autoPan&&this.panIntoView(this.autoPan)}panIntoView(t){let e=this.getMap();if(!e||!e.getTargetElement()||!this.get(u.POSITION))return;let s=this.getRect(e.getTargetElement(),e.getSize()),i=this.getElement(),r=this.getRect(i,[(0,a.iO)(i),(0,a.Pb)(i)]),n=void 0===(t=t||{}).margin?20:t.margin;if(!(0,o.r4)(s,r)){let i=r[0]-s[0],o=s[2]-r[2],h=r[1]-s[1],a=s[3]-r[3],u=[0,0];if(i<0?u[0]=i-n:o<0&&(u[0]=Math.abs(o)+n),h<0?u[1]=h-n:a<0&&(u[1]=Math.abs(a)+n),0!==u[0]||0!==u[1]){let s=e.getView().getCenterInternal(),i=e.getPixelFromCoordinateInternal(s);if(!i)return;let r=[i[0]+u[0],i[1]+u[1]],n=t.animation||{};e.getView().animateInternal({center:e.getCoordinateFromPixelInternal(r),duration:n.duration,easing:n.easing})}}}getRect(t,e){let s=t.getBoundingClientRect(),i=s.left+window.pageXOffset,r=s.top+window.pageYOffset;return[i,r,i+e[0],r+e[1]]}setPositioning(t){this.set(u.POSITIONING,t)}setVisible(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)}updatePixelPosition(){let t=this.getMap(),e=this.getPosition();if(!t||!t.isRendered()||!e){this.setVisible(!1);return}let s=t.getPixelFromCoordinate(e),i=t.getSize();this.updateRenderedPosition(s,i)}updateRenderedPosition(t,e){let s=this.element.style,i=this.getOffset(),r=this.getPositioning();this.setVisible(!0);let n=Math.round(t[0]+i[0])+"px",o=Math.round(t[1]+i[1])+"px",h="0%",a="0%";"bottom-right"==r||"center-right"==r||"top-right"==r?h="-100%":("bottom-center"==r||"center-center"==r||"top-center"==r)&&(h="-50%"),"bottom-left"==r||"bottom-center"==r||"bottom-right"==r?a="-100%":("center-left"==r||"center-center"==r||"center-right"==r)&&(a="-50%");let u=`translate(${h}, ${a}) translate(${n}, ${o})`;this.rendered.transform_!=u&&(this.rendered.transform_=u,s.transform=u)}getOptions(){return this.options}}e.Z=l}}]);