(this["webpackJsonpbad-api-assignment"]=this["webpackJsonpbad-api-assignment"]||[]).push([[0],{139:function(e,t,a){"use strict";a.r(t);var r=a(15),n=a(0),c=a.n(n),i=a(12),s=a.n(i),o=a(7),l=a(185),u=a(188),b=a(189),j=a(66),d=a(191),f=a(183),h=a(184),v=function(e){var t=e.category,a=void 0===t?"gloves":t,n=e.setCategory;return Object(r.jsxs)(d.a,{value:a,onChange:function(e,t){return n(t)},children:[Object(r.jsx)(f.a,{value:"gloves",label:"Gloves"}),Object(r.jsx)(f.a,{value:"facemasks",label:"Facemasks"}),Object(r.jsx)(f.a,{value:"beanies",label:"Beanies"})]})},O=function(e){return Object(r.jsx)(h.a,{position:"static",children:Object(r.jsx)(v,Object(j.a)({},e))})},p=a(49),m=a.n(p),x=a(73),g=a(104),y=a(101),w=a(24),C=a(190),N=a(146),k=a(3),S={getByCategory:function(){var e=Object(x.a)(m.a.mark((function e(t){var a,r,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat("api/products","/").concat(t),e.next=3,fetch(a);case 3:return r=e.sent,e.next=6,r.json();case 6:return n=e.sent,e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},T=Object(w.a)((function(){return{root:{height:"90vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center","& .availability.positive":{backgroundColor:"#07ad0f",color:"#032d05"},"& .availability.negative":{backgroundColor:"#c9021d",color:"#fafafa"},"& .availability.neutral":{backgroundColor:"#f2d40c",color:"#756602"}}}})),B=function(e){var t=e.columns,a=e.rows,n=Object(g.a)(e,["columns","rows"]);return Object(r.jsx)(y.a,Object(j.a)({rows:a,columns:t,pageSize:100,checkboxSelection:!1},n))},I=function(e){var t=e.category,a=Object(n.useState)([]),c=Object(o.a)(a,2),i=c[0],s=c[1],l=Object(n.useState)(!0),u=Object(o.a)(l,2),b=u[0],j=u[1],d=T();Object(n.useEffect)((function(){j(!0),function(){var e=Object(x.a)(m.a.mark((function e(){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.getByCategory(t);case 3:a=e.sent,s(a),j(!1),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()()}),[t]);var f=[{field:"id",headerName:"ID",width:250},{field:"manufacturer",headerName:"Manufacturer",width:150},{field:"name",headerName:"Name",width:200},{field:"color",headerName:"Color",width:130},{field:"price",headerName:"Price",width:130},{field:"availability",headerName:"Availability",width:130,cellClassName:function(e){return Object(k.a)("availability",{positive:"INSTOCK"===e.value,negative:"OUTOFSTOCK"===e.value,neutral:"LESSTHAN10"===e.value})}},{field:"type",headerName:"Type",width:130}];return b?Object(r.jsx)(C.a,{className:d.root,children:Object(r.jsx)(N.a,{style:{margin:"0px auto"}})}):Object(r.jsx)(C.a,{className:d.root,children:Object(r.jsx)("div",{style:{height:"90%",width:"100%"},children:Object(r.jsx)(B,{columns:f,rows:i})})})},E=a(44),A=Object(E.a)({palette:{primary:{main:"#8b008b",contrastText:"#fafafa"}}}),D=function(){var e=Object(n.useState)("gloves"),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(r.jsxs)(l.a,{theme:A,children:[Object(r.jsx)(u.a,{}),Object(r.jsx)(O,{category:a,setCategory:c}),Object(r.jsx)(b.a,{maxWidth:"xl",children:Object(r.jsx)(I,{category:a})})]})};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(D,{})}),document.getElementById("root"))}},[[139,1,2]]]);
//# sourceMappingURL=main.cd52d1cb.chunk.js.map