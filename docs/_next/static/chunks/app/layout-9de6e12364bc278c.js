(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{54037:function(e,t,n){Promise.resolve().then(n.bind(n,42352)),Promise.resolve().then(n.t.bind(n,93966,23)),Promise.resolve().then(n.bind(n,54890)),Promise.resolve().then(n.bind(n,18888)),Promise.resolve().then(n.bind(n,58796)),Promise.resolve().then(n.bind(n,27909))},94695:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var i=n(39926),r=n(22035),o=n(24264),s=n(24131),a=n(93477),l=n(73948),c=n(10496),u=function(e){let{header:t,onConfirm:n,children:u,...d}=e,h=(0,c.useCallback)(e=>{var t;null===(t=d.onClose)||void 0===t||t.call(d,e,"escapeKeyDown")},[d.onClose]);return(0,i.jsxs)(o.Z,{"data-component":"BasicModal",...d,children:[(0,i.jsx)(l.Z,{children:t}),(0,i.jsx)(a.Z,{children:u}),(0,i.jsxs)(s.Z,{children:[n?(0,i.jsx)(r.Z,{onClick:n,children:"확인"}):null,d.onClose?(0,i.jsx)(r.Z,{onClick:h,children:"닫기"}):null]})]})}},54890:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m},montserrat:function(){return a()},notoSans:function(){return o()}});var i=n(39926),r=n(22126),o=n.n(r),s=n(63746),a=n.n(s);let l=(0,n(64440).Ue)(e=>({setTheme:t=>{localStorage.setItem("theme",t),e({theme:t})},theme:"light",toggleTheme:()=>{e(e=>{let{theme:t}=e,n="light"===t?"dark":"light";return localStorage.setItem("theme",n),{theme:n}})}}));var c=n(13665),u=n(33034),d=n(86220),h=n(10496);let p=[o().style.fontFamily];function m(e){let{children:t}=e,{theme:n}=l(),r=(0,h.useMemo)(()=>(0,c.Z)({palette:{mode:n},transitions:{duration:{standard:.3}},typography:{fontFamily:p.join(", ")}}),[n]);return(0,i.jsxs)(u.Z,{theme:r,children:[(0,i.jsx)(d.ZP,{}),t]})}},46123:function(e,t,n){"use strict";n.d(t,{yA:function(){return i.montserrat}});var i=n(54890)},18888:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var i=n(39926),r=n(94695),o=n(54636),s=n(65580),a=n(63622),l=n(55473),c=n(4057),u=n(54839),d=n(10496);function h(){let{palette:e}=(0,l.Z)(),{modal:t,setModal:n}=(0,o.C)(),h=(0,d.useCallback)(()=>{n(void 0)},[n]),p=(0,d.useMemo)(()=>{switch(null==t?void 0:t.type){case"info":return(0,i.jsxs)(c.Z,{alignItems:"center",color:e.info.main,flexDirection:"row",gap:1,children:[(0,i.jsx)(a.Z,{}),(0,i.jsx)(u.Z,{fontWeight:"bold",children:t.title})]});case"error":return(0,i.jsxs)(c.Z,{alignItems:"center",color:e.error.main,flexDirection:"row",gap:1,children:[(0,i.jsx)(s.Z,{}),(0,i.jsx)(u.Z,{fontWeight:"bold",children:t.title})]});default:return""}},[t,e]);return(0,i.jsx)(r.Z,{header:p,open:void 0!==t,onClose:h,onConfirm:null==t?void 0:t.onConfirm,children:null==t?void 0:t.body})}},58796:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Z}});var i=n(39926),r=n(46123),o=n(2768),s=n(49301),a=n(55473),l=n(43160),c=n(52937),u=n(4057),d=n(54839),h=n(87103),p=function(e){let{onMenuClick:t,...n}=e,{palette:{background:p}}=(0,a.Z)();return(0,i.jsx)(l.Z,{bgcolor:p.default,boxShadow:"0px 3px 10px #00000022","data-component":"Header",left:0,position:"sticky",top:0,width:"100%",zIndex:10001,...n,children:(0,i.jsxs)(u.Z,{alignItems:"center",flexDirection:"row",gap:2,padding:1,paddingLeft:3,paddingRight:3,children:[t?(0,i.jsx)(c.Z,{size:"small",onClick:t,children:(0,i.jsx)(s.Z,{})}):null,(0,i.jsx)(h.default,{href:"/",children:(0,i.jsx)(u.Z,{justifyContent:"center",children:(0,i.jsx)("img",{alt:o.L1.title,height:24,src:o.L1.image,width:24})})}),(0,i.jsx)(h.default,{href:"/",children:(0,i.jsx)(d.Z,{fontFamily:r.yA.style.fontFamily,variant:"h6",children:o.L1.title})})]})})},m=n(45640),g=n(4134),f=n(22035),b=n(28124),x=n(55271),j=n(10496),S=function(e){let{currentLink:t,...n}=e;return(0,i.jsx)(x.ZP,{"data-component":"Sidebar",...n,children:(0,i.jsxs)(u.Z,{alignItems:"center",height:"100%",justifyContent:"space-between",minWidth:250,paddingTop:"50px",width:"100%",children:[(0,i.jsx)(u.Z,{alignItems:"center",padding:4,width:"100%",children:(0,i.jsx)("img",{alt:o.L1.title,height:100,src:o.L1.image,width:100})}),(0,i.jsx)(u.Z,{width:"100%",children:o.Tl.map(e=>{let{title:n,link:r,divide:o}=e;return(0,i.jsxs)(j.Fragment,{children:[(0,i.jsx)(l.Z,{paddingLeft:1,paddingRight:1,children:(0,i.jsx)(h.default,{href:r,children:(0,i.jsx)(f.Z,{fullWidth:!0,children:(0,i.jsxs)(u.Z,{alignItems:"center",color:t===r?"primary":"GrayText",direction:"row",fontSize:"0.8rem",gap:1,textTransform:"initial",width:"100%",children:[(0,i.jsx)(g.Z,{color:"inherit"}),(0,i.jsx)(d.Z,{color:"inherit",fontSize:"inherit",children:n})]})})})}),o?(0,i.jsx)(l.Z,{padding:1,children:(0,i.jsx)(b.Z,{})}):null]},"Sidebar-Link-".concat(r))})}),(0,i.jsxs)(u.Z,{alignItems:"center",gap:1,paddingBottom:4,paddingTop:4,children:[(0,i.jsx)(d.Z,{fontFamily:r.yA.style.fontFamily,variant:"caption",children:o.L1.title}),(0,i.jsx)(d.Z,{color:"GrayText",variant:"caption",children:m.i8})]})]})})},k=n(43391);function Z(){let e=(0,k.usePathname)(),[t,n]=(0,j.useState)(!1),r=(0,j.useCallback)(()=>{n(e=>!e)},[n]),o=(0,j.useCallback)(()=>{n(!1)},[n]);return(0,j.useEffect)(()=>{n(!1)},[e,n]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(p,{onMenuClick:r}),(0,i.jsx)(S,{currentLink:e,open:t,onClose:o})]})}},27909:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var i=n(39926),r=n(16169),o=n(62152),s=n(86191);function a(e){let{children:t}=e,n=new r.S({defaultOptions:{queries:{gcTime:1/0,refetchOnWindowFocus:!1,staleTime:36e5}}});return(0,i.jsxs)(o.aH,{client:n,"data-component":"ReactQueryProvider",children:[t,(0,i.jsx)(s.t,{buttonPosition:"bottom-left"})]})}},2768:function(e,t,n){"use strict";n.d(t,{CT:function(){return r},L1:function(){return i},Tl:function(){return s},vu:function(){return o}});let i={author:{email:"psj2716@mensakorea.org",nickname:"RWB",social:{github:{link:"https://github.com/RWB0104",name:"Kapoo"},linkedin:{link:"https://www.linkedin.com/in/itcode/",name:"RWB"}}},description:"OpenLayers Sandbox",image:"/gis-dev/logo.png",thumbnail:"https://user-images.githubusercontent.com/50317129/260221872-30486c85-667f-4919-8445-3499b318748d.png",title:"OpenLayers Box"},r="https://api.itcode.dev/geoserver",o="0834AFA9-AB19-30C2-8902-0E3790CDBB2F",s=[{description:"OpenLayers 8과 GeoServer를 통해 생성한 다양한 지도의 예시를 확인할 수 있습니다.",divide:!0,group:"HOME",link:"/",thumbnail:i.thumbnail,title:"홈"},{description:"기본적으로 제공되는 OSM 객체를 VectorLayer에 적용하여 OSM 지도를 생성합니다.",group:"MAP",link:"/osm",thumbnail:"https://user-images.githubusercontent.com/50317129/171675095-54c8c18a-2bd4-4979-928d-e55c4184105d.png",title:"OSM 지도"},{description:"임의의 타일 레이어를 적용하여 다양한 지도를 생성합니다. 국가에서 제공하는 V-World 타일맵을 예시로 적용하였으며, XYZ 기반의 타일맵이라면 동일한 방법으로 활용이 가능합니다.",divide:!0,group:"MAP",link:"/vworld",thumbnail:"https://user-images.githubusercontent.com/50317129/171675864-9d886ca4-da97-4041-8854-8b2fa7593f61.png",title:"V-World 지도"},{description:"지도의 좌표계, 바운더리 등, 여러 정보를 추출하고, 이를 별도의 패널에 표시하는 지도를 생성합니다.",group:"BASIC",link:"/map-info",thumbnail:"https://user-images.githubusercontent.com/50317129/171676198-449a45b9-b2d3-4105-ba28-420fc96f7bc1.png",title:"맵 정보"},{description:"브라우저의 Geolocation API를 활용하여 현재 경위도 위치를 구하고, 해당 위치로 이동할 수 있는 지도를 생성합니다. 우측 상단의 버튼을 클릭하여 현재 위치로 이동할 수 있습니다.",group:"BASIC",link:"/geolocation",thumbnail:"https://user-images.githubusercontent.com/50317129/171676793-fa995885-32d7-4f0a-bb36-0475516ac19d.png",title:"지오로케이션"},{description:"지도에 상호작용 가능한 객체인 Feature를 생성, 삭제할 수 있는 지도를 생성합니다. 스페이스바를 눌러 지도의 중앙에 마커를 생성합니다. 이미 마커가 있을 경우, 삭제합니다.",divide:!0,group:"BASIC",link:"/feature",thumbnail:"https://user-images.githubusercontent.com/50317129/171676976-63577e9d-26d5-49ab-8826-7d571c2ee169.png",title:"맵 피쳐"},{description:"GeoServer를 통해 세종시 도로명주소 데이터를 지도에 표시하는 지도를 생성합니다. WFS의 GetFeature API를 사용하며, 지도에 Feature로 데이터를 표시합니다.",group:"GEOSERVER",link:"/wfs",thumbnail:"https://user-images.githubusercontent.com/50317129/171677267-71a2d78a-bf5f-437e-b00d-81fa9af3ea58.png",title:"WFS"},{description:"GeoServer를 통해 세종시 도로명주소 데이터를 지도에 표시하는 지도를 생성합니다. WMS의 GetMap API를 사용하며, 지도에 이미지로 데이터를 표시합니다. Tile, Image 두 방식을 선택할 수 있습니다.",group:"GEOSERVER",link:"/wms",thumbnail:"https://user-images.githubusercontent.com/50317129/171677419-bbf52eac-e3f5-4d71-b171-a28c961dd820.png",title:"WMS"},{description:"WFS 지도의 Feature에 클릭, 호버와 같은 상호작용이 추가된 지도를 생성합니다.",group:"GEOSERVER",link:"/feature-click",thumbnail:"https://user-images.githubusercontent.com/50317129/171677600-44136c02-a35b-4c3f-ab70-fb8fe313ae2b.png",title:"맵 피쳐 상호작용"},{description:"WFS 지도에서 Feature 클릭 시, 해당 Feature의 정보 팝업이 나오는 지도를 생성합니다. Overlay 객체를 통해 클릭한 Feature의 정보를 받아 표시합니다.",group:"GEOSERVER",link:"/wfs-popup",thumbnail:"https://user-images.githubusercontent.com/50317129/171677734-451d4297-c7cf-4821-89d6-35edc84252b9.png",title:"WFS를 활용한 팝업"},{description:"WMS 지도에서 빌딩 클릭 시, 해당 빌딩의 정보 팝업이 나오는 지도를 생성합니다. Overlay 객체를 통해 클릭한 Feature의 정보를 받아 표시합니다. WFS와 달리, 객체가 아닌 이미지이므로, 클릭 시 WMS의 GetFeatureInfo API를 사용하여 정보를 받아옵니다.",divide:!0,group:"GEOSERVER",link:"/wms-popup",thumbnail:"https://user-images.githubusercontent.com/50317129/171677876-7307d8a6-3442-4d15-b44a-574eee85947b.png",title:"WMS를 활용한 팝업"},{description:"WFS의 Transaction 기능을 활용하여 도형을 추가할 수 있는 지도를 생성합니다. 우측 상단의 버튼 클릭 시, 원하는 도형을 그리고 정보를 입력하면 해당 도형이 데이터베이스에 추가됩니다.",group:"TRANSACTION",link:"/transaction-insert",thumbnail:"https://user-images.githubusercontent.com/50317129/171678036-b7810925-d0a0-4144-aa8e-e77f37e78d18.png",title:"WFS-T 삽입"},{description:"WFS의 Transaction 기능을 활용하여 도형을 수정할 수 있는 지도를 생성합니다. 지도를 클릭하고, 이미 그려진 도형의 모양이나 정보를 수정할 수 있습니다.",group:"TRANSACTION",link:"/transaction-update",thumbnail:"https://user-images.githubusercontent.com/50317129/171678295-5bf7fedb-9e78-49b8-8519-8a0afc37dac4.png",title:"WFS-T 수정"},{description:"WFS의 Transaction 기능을 활용하여 도형을 삭제할 수 있는 지도를 생성합니다. 도형을 클릭하고 삭제할 수 있습니다.",divide:!0,group:"TRANSACTION",link:"/transaction-delete",thumbnail:"https://user-images.githubusercontent.com/50317129/171678189-b3e5262c-5670-42c9-8f95-51145ec395ec.png",title:"WFS-T 삭제"},{description:"전국 스타벅스 위치 정보를 활용하여 클러스터 맵을 생성합니다. 많은 객체를 표시할 경우, 이를 압축하여 보여줄 수 있습니다.",group:"VARIATION",link:"/cluster-map",thumbnail:"https://user-images.githubusercontent.com/50317129/171678364-6b66062f-143b-4076-a2ee-573d0f438172.png",title:"클러스터맵"},{description:"전국 스타벅스 위치 정보를 활용하여 히트맵을 생성합니다.",group:"VARIATION",link:"/heat-map",thumbnail:"https://user-images.githubusercontent.com/50317129/171678468-c495473f-1f23-4dd6-a7df-efeec8adc9bc.png",title:"히트맵"},{description:"전세계 도시 위치 정보를 활용하여, WebGL 지도를 생성합니다. WebGL 레이어는 기존 레이어보다 훨씬 많은 데이터를 표시할 수 있습니다. 지도에서 WebGL, Vector 레이어를 선택하여 성능 차이를 비교할 수 있습니다.",group:"VARIATION",link:"/webgl",thumbnail:"https://user-images.githubusercontent.com/50317129/171678561-4f173439-cf86-48e6-89be-d01b839b8762.png",title:"WebGL을 활용한 맵"}]},54636:function(e,t,n){"use strict";n.d(t,{C:function(){return i}});let i=(0,n(64440).Ue)(e=>({setModal:t=>{e({modal:t})}}))},93966:function(){},45640:function(e){"use strict";e.exports={i8:"0.1.1"}}},function(e){e.O(0,[647,322,864,373,664,285,126,991,399,744],function(){return e(e.s=54037)}),_N_E=e.O()}]);