(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[863],{86027:function(e,n,t){Promise.resolve().then(t.bind(t,98567)),Promise.resolve().then(t.bind(t,42352)),Promise.resolve().then(t.bind(t,53646)),Promise.resolve().then(t.t.bind(t,62372,23)),Promise.resolve().then(t.bind(t,30310)),Promise.resolve().then(t.bind(t,36280)),Promise.resolve().then(t.bind(t,17282)),Promise.resolve().then(t.bind(t,68342)),Promise.resolve().then(t.bind(t,1181)),Promise.resolve().then(t.bind(t,7161))},78279:function(e,n,t){"use strict";var i=t(13767);n.Z=void 0;var o=i(t(41032)),s=t(39926),r=(0,o.default)((0,s.jsx)("path",{d:"M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"}),"Apps");n.Z=r},49019:function(e,n,t){"use strict";var i=t(13767);n.Z=void 0;var o=i(t(41032)),s=t(39926),r=(0,o.default)((0,s.jsx)("path",{d:"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"}),"Image");n.Z=r},37243:function(e,n,t){"use strict";t.d(n,{DK:function(){return u},Hc:function(){return a},eL:function(){return l},u4:function(){return c}});var i=t(2768),o=t(38033),s=t(11248),r=t(54288);function a(e,n){return(0,s.a)({queryFn:async()=>{let n=await fetch(e,{method:"GET"});return await n.json()},queryKey:["wfs","useGetFeatureInfo",e],...n})}function l(e){return(0,r.D)({mutationFn:async e=>{let n="";if(e.features.length>1){let t=e.features.map(e=>{let n=(0,o.UG)(e).trim();return"\n					<gml:polygonMember>\n						".concat(n,"\n					</gml:polygonMember>\n					")}).join("\n");n='\n				<gml:MultiPolygon xmlns="http://www.opengis.net/gml" srsName="EPSG:3857">\n					'.concat(t,"\n				</gml:MultiPolygon>\n				")}else n=(0,o.UG)(e.features[0]);let t='\n			<wfs:Transaction\n				xmlns:wfs="http://www.opengis.net/wfs"\n				xmlns:gml="http://www.opengis.net/gml"\n				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n					service="WFS"\n					version="1.1.0"\n					xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/WFS-transaction.xsd">\n				<wfs:Insert>\n					<buld_test>\n						<name>'.concat(e.name,"</name>\n						<address>").concat(e.address,"</address>\n						<SHAPE>\n							").concat(n.trim(),"\n						</SHAPE>\n					</buld_test>\n				</wfs:Insert>\n			</wfs:Transaction>\n			"),s=await fetch("".concat(i.CT,"/wfs"),{body:t,method:"POST"}),r=await s.text();return new DOMParser().parseFromString(r,"text/xml")},mutationKey:["wfs","usePostFeature"],...e})}function c(e){return(0,r.D)({mutationFn:async e=>{let n="";if(e.features.length>1){let t=e.features.map(e=>{let n=(0,o.UG)(e).trim();return"\n					<gml:polygonMember>\n						".concat(n,"\n					</gml:polygonMember>\n					")}).join("\n");n='\n				<gml:MultiPolygon xmlns="http://www.opengis.net/gml" srsName="EPSG:3857">\n					'.concat(t,"\n				</gml:MultiPolygon>\n				")}else n=(0,o.UG)(e.features[0]);let t='\n			<wfs:Transaction\n				xmlns:wfs="http://www.opengis.net/wfs"\n				xmlns:gml="http://www.opengis.net/gml"\n				xmlns:ogc="http://www.opengis.net/ogc"\n				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n				service="WFS"\n				version="1.1.0"\n				xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">\n				<wfs:Update typeName="buld_test">\n					<wfs:Property>\n						<wfs:Name>name</wfs:Name>\n						<wfs:Value>'.concat(e.name,"</wfs:Value>\n					</wfs:Property>\n\n					<wfs:Property>\n						<wfs:Name>address</wfs:Name>\n						<wfs:Value>").concat(e.address,"</wfs:Value>\n					</wfs:Property>\n\n					<wfs:Property>\n						<wfs:Name>SHAPE</wfs:Name>\n						<wfs:Value>\n							").concat(n,'\n						</wfs:Value>\n					</wfs:Property>\n\n					<ogc:Filter>\n						<ogc:FeatureId fid="').concat(e.id,'" />\n					</ogc:Filter>\n				</wfs:Update>\n			</wfs:Transaction>\n			'),s=await fetch("".concat(i.CT,"/wfs"),{body:t,method:"POST"}),r=await s.text();return new DOMParser().parseFromString(r,"text/xml")},mutationKey:["wfs","useUpdateFeature"],...e})}function u(e){return(0,r.D)({mutationFn:async e=>{let n=await fetch("".concat(i.CT,"/wfs"),{body:'\n			<wfs:Transaction\n				xmlns:wfs="http://www.opengis.net/wfs"\n				xmlns:ogc="http://www.opengis.net/ogc"\n				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n				service="WFS"\n				version="1.1.0"\n				xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">\n				<wfs:Delete typeName="buld_test">\n					<ogc:Filter>\n						<ogc:FeatureId fid="'.concat(e,'" />\n					</ogc:Filter>\n				</wfs:Delete>\n			</wfs:Transaction>\n			'),method:"POST"}),t=await n.text();return new DOMParser().parseFromString(t,"text/xml")},mutationKey:["wfs","useDeleteFeature"],...e})}},56028:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var i=t(39926),o=t(75890),s=t(43160),r=t(598),a=t(52937),l=t(41299),c=t(4057),u=t(54839),d=t(99271),f=t.n(d),m=t(87103),w=t(97172),g=t.n(w);let h=f().bind(g());var p=function(e){let{id:n,header:t="-",thumb:d,list:f,onClose:w,onThumbClick:g,...p}=e;return(0,i.jsx)(l.Z,{"data-component":"MapPopup",id:n,...p,children:(0,i.jsxs)(c.Z,{gap:1,maxWidth:250,padding:2,children:[(0,i.jsxs)(c.Z,{alignItems:"center",direction:"row",gap:1,justifyContent:"space-between",children:[(0,i.jsx)(u.Z,{color:"primary",fontWeight:"bold",children:t}),w?(0,i.jsx)(a.Z,{size:"small",onClick:w,children:(0,i.jsx)(o.Z,{fontSize:"inherit"})}):null]}),d?(0,i.jsx)(s.Z,{border:"1px solid",borderColor:"ActiveBorder",borderRadius:2,overflow:"hidden",paddingTop:"100%",position:"relative",children:(0,i.jsx)(s.Z,{height:"100%",left:0,position:"absolute",top:0,width:"100%",children:(0,i.jsx)(r.Z,{className:h("button"),onClick:g,children:(0,i.jsx)("img",{alt:d,className:h("image"),height:"100%",src:d,width:"100%"})})})}):null,f?(0,i.jsx)(c.Z,{gap:1,children:f.map((e,n)=>{let{key:t,value:o,link:s,color:r}=e;return(0,i.jsxs)(c.Z,{direction:"row",gap:1,children:[(0,i.jsx)(c.Z,{width:70,children:(0,i.jsx)(u.Z,{fontWeight:"bold",variant:"caption",children:t})}),(0,i.jsx)(c.Z,{flex:1,children:s?(0,i.jsx)(u.Z,{color:r,variant:"caption",children:(0,i.jsx)(m.default,{href:s,target:"_blank",children:o})}):(0,i.jsx)(u.Z,{color:r,variant:"caption",children:o})})]},n)})}):null]})})}},30310:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var i=t(39926),o=t(98594),s=t(34901),r=t(54636),a=t(50878),l=t(54839),c=t(99271),u=t.n(c),d=t(48806),f=t(10496),m=t(39647),w=t.n(m);let g=u().bind(w());function h(){let{map:e}=(0,f.useContext)(s.X),{setModal:n}=(0,r.C)(),[t,c]=(0,f.useState)(!1),u=(0,f.useCallback)(()=>{e&&(c(!0),navigator.geolocation.getCurrentPosition(n=>{let{latitude:t,longitude:i}=n.coords,o=e.getView().getProjection().getCode(),s=e.getView().getZoom()||0,r=(0,d.Z)("EPSG:4326",o,[i,t]);e.getView().animate({center:r,duration:2e3}),e.getView().animate({duration:1e3,zoom:s-3},{duration:1e3,zoom:s},()=>{c(!1)})},()=>{n({body:(0,i.jsx)(l.Z,{variant:"caption",children:"지오로케이션 호출에 실패했습니다."}),title:"지오로케이션 실패",type:"error"}),c(!1)},{enableHighAccuracy:!0}))},[e,c,n]);return(0,i.jsx)(o.Z,{bgcolor:"limegreen","data-component":"GeolocationButton",disabled:t,onClick:u,children:(0,i.jsx)(a.default,{className:g({icon:t}),htmlColor:"white"})})}},36280:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var i=t(39926),o=t(98594),s=t(34901),r=t(23744),a=t(10496);function l(e){let{homePosition:n}=e,{map:t}=(0,a.useContext)(s.X),[l,c]=(0,a.useState)(!1),u=(0,a.useCallback)(()=>{if(t){c(!0);let e=t.getView().getZoom()||0;t.getView().animate({center:n,duration:2e3}),t.getView().animate({duration:1e3,zoom:e-3},{duration:1e3,zoom:e},()=>{c(!1)})}},[n,t,c]);return(0,i.jsx)(o.Z,{bgcolor:"orange",disabled:l,onClick:u,children:(0,i.jsx)(r.Z,{htmlColor:"white"})})}},68342:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var i=t(39926),o=t(39993),s=t(92214);function r(e){let{children:n}=e;return(0,i.jsx)(o.Z,{view:s.t.sejongView,hasCursor:!0,children:n})}},16365:function(e,n,t){"use strict";var i=t(97503);n.Z=i.default},1181:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var i=t(39926),o=t(16365),s=t(34901),r=t(27731),a=t(78279),l=t(49019),c=t(43160),u=t(28124),d=t(4057),f=t(16323),m=t(3853),w=t(54839),g=t(10496);function h(){let{map:e}=(0,g.useContext)(s.X),[n,t]=(0,g.useState)("tile"),h=(0,g.useCallback)((e,n)=>{t(n)},[t]);return(0,g.useEffect)(()=>{e&&(e.getAllLayers().filter(e=>"wms"===e.get("name")).forEach(n=>e.removeLayer(n)),"tile"===n?e.addLayer(r.J.sejongTileWmsLayer):e.addLayer(r.J.sejongImageWmsLayer))},[e,n]),(0,i.jsxs)(o.Z,{children:[(0,i.jsxs)(m.Z,{size:"small",value:n,exclusive:!0,fullWidth:!0,onChange:h,children:[(0,i.jsx)(f.Z,{color:"tile"===n?"primary":void 0,disabled:"tile"===n,value:"tile",children:(0,i.jsxs)(d.Z,{alignItems:"center",direction:"row",gap:1,children:[(0,i.jsx)(a.Z,{fontSize:"inherit"}),(0,i.jsx)(w.Z,{variant:"caption",children:"Tile"})]})}),(0,i.jsx)(f.Z,{color:"image"===n?"primary":void 0,disabled:"image"===n,value:"image",children:(0,i.jsxs)(d.Z,{alignItems:"center",direction:"row",gap:1,children:[(0,i.jsx)(l.Z,{fontSize:"inherit"}),(0,i.jsx)(w.Z,{variant:"caption",children:"Image"})]})})]}),(0,i.jsx)(c.Z,{padding:.5,children:(0,i.jsx)(u.Z,{})})]})}},7161:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var i=t(39926),o=t(37243),s=t(56028),r=t(38033),a=t(34901),l=t(68254),c=t(16586),u=t(10496);let d="popup";function f(){let{map:e}=(0,u.useContext)(a.X),[n,t]=(0,u.useState)(),[f,m]=(0,u.useState)(),{data:w}=(0,o.Hc)(n||"",{enabled:void 0!==n}),g=(0,u.useCallback)(()=>{m(void 0)},[m]),h=(0,u.useMemo)(()=>{if(f)return[{key:"ID",value:f.getId()||"-"},{key:"고유일련변호",value:f.get("bul_man_no")||"-"},{key:"고시일자",value:(0,r.ce)(f.get("ntfc_de")||"-")}]},[f]);return(0,u.useEffect)(()=>{if(e){let n=new l.Z({autoPan:{animation:{duration:250}},element:document.getElementById(d)||void 0,id:"popup",offset:[0,-20],positioning:"bottom-center"});e.addOverlay(n)}},[e,m]),(0,u.useEffect)(()=>{e&&e.on("singleclick",async n=>{let i=e.getAllLayers().find(e=>"wms"===e.get("name")),o=null==i?void 0:i.getSource(),s=null==o?void 0:o.getFeatureInfoUrl(n.coordinate,e.getView().getResolution()||0,"EPSG:3857",{INFO_FORMAT:"application/json",QUERY_LAYERS:"buld_sejong"});s?t(s):t(void 0)})},[e,t]),(0,u.useEffect)(()=>{w&&(0===w.features.length?m(void 0):m(new c.Z().readFeature(w.features[0])))},[w]),(0,u.useEffect)(()=>{if(e){let n=e.getOverlayById("popup");if(f){let e=f.getGeometry();if(e){let[t,i,o,s]=e.getExtent();null==n||n.setPosition([(o+t)/2,(s+i)/2])}else null==n||n.setPosition(void 0)}else null==n||n.setPosition(void 0)}},[e,f]),(0,i.jsx)(s.Z,{header:null==f?void 0:f.get("buld_nm"),id:d,list:h,onClose:g})}},97172:function(e){e.exports={button:"BasicPopup_button__JkJDn",image:"BasicPopup_image__FGnso"}},39647:function(e){e.exports={icon:"GeolocationButton_icon__O2WtR",rolling:"GeolocationButton_rolling__mgNSn"}}},function(e){e.O(0,[322,880,864,27,77,373,998,973,116,503,991,399,744],function(){return e(e.s=86027)}),_N_E=e.O()}]);