(this["webpackJsonppeareasy-web-app"]=this["webpackJsonppeareasy-web-app"]||[]).push([[0],{25:function(e,t,a){e.exports={loader:"Spinner_loader__fTuX5",load6:"Spinner_load6__1_74m",round:"Spinner_round__3G_CY"}},33:function(e,t,a){},34:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(23),o=a.n(r),c=(a(33),a(7)),l=a(2),i=(a(34),a(3)),d=a(64),u=a(24),b=a.n(u).a.create({baseURL:"https://5fmhq2i8rp.eu-west-1.awsapprunner.com"}),h=a(0),j=function(e){var t=e.title,a=e.onClick,n=e.disabled;return Object(h.jsx)("button",{className:"bg-primary-500 shadow hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline focus:outline-none text-secondary font-bold py-2 px-4 rounded",onClick:a,disabled:n,children:t})},x=function(e){var t=e.title,a=e.onClick,n=e.disabled;return Object(h.jsx)("button",{className:"bg-tertiary-700 shadow hover:bg-tertiary-500 disabled:cursor-not-allowed disabled:bg-primary-300 focus:shadow-outline outline-secondary focus:outline-none text-secondary font-bold py-2 px-4 rounded",onClick:a,disabled:n,children:t})},p=a(25),m=a.n(p),f=function(){return Object(h.jsx)("div",{className:m.a.loader})},y=function(e){var t=e.title,a=e.onClick,n=["h-10 rounded bg-gray-700 flex flex-row w-full m-auto cursor-pointer border-primary-500 "];return e.selected&&n.push("border-2"),Object(h.jsxs)("div",{className:n.join(" "),onClick:a,children:[Object(h.jsx)("div",{className:"flex-none mt-auto mb-auto w-16",children:"\u2728"}),Object(h.jsx)("p",{className:"m-auto",children:t}),Object(h.jsx)("div",{className:"flex-none mt-auto mb-auto w-16"})]},t)},O=function(){return Object(h.jsx)("div",{className:"absolute bottom-0 w-full z-0",children:Object(h.jsxs)("svg",{width:"100%",height:"300px",fill:"none",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:[Object(h.jsxs)("linearGradient",{id:"grad1",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[Object(h.jsx)("stop",{offset:"0%",stopColor:"#A5B4FC"}),Object(h.jsx)("stop",{offset:"50%",stopColor:"#6366F1"}),Object(h.jsx)("stop",{offset:"100%",stopColor:"#4338CA"})]}),Object(h.jsx)("path",{fill:"url(#grad1)",d:" M0 67 C 273,183 822,-40 1920.00,106 V 359 H 0 V 67 Z",children:Object(h.jsx)("animate",{repeatCount:"indefinite",fill:"url(#grad1)",attributeName:"d",dur:"15s",attributeType:"XML",values:" M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z; M0 77 C 473,-40 1222,283 1920,136 V 359 H 0 V 67 Z; M0 77 C 973,260 1722,-53 1920,120 V 359 H 0 V 67 Z; M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z "})})]})})},g=function(){var e=Object({NODE_ENV:"production",PUBLIC_URL:"/peareasy-web-app",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_EXTENSION_ID||"",t=Object(d.a)(["peareasy"]),a=Object(i.a)(t,2),s=a[0],r=a[1],o=Object(n.useState)(!1),c=Object(i.a)(o,2),l=c[0],u=c[1],x=Object(n.useState)([]),p=Object(i.a)(x,2),m=p[0],g=p[1],v=Object(n.useState)([]),w=Object(i.a)(v,2),N=w[0],C=w[1],k=Object(n.useState)(),S=Object(i.a)(k,2),_=S[0],A=S[1],E=Object(n.useState)(0),T=Object(i.a)(E,2),M=T[0],I=T[1],B=Object(n.useState)(-1),F=Object(i.a)(B,2),L=F[0],V=F[1];Object(n.useEffect)((function(){s.peareasy?(chrome.runtime.sendMessage(e,{uuid:s.peareasy}),P()):b.post("/users/anon").then((function(e){var t;return e.data&&(t=e.data.uuid),t})).then((function(e){r("peareasy",e)}))}),[s,r,e]);var W=function(){var e;u(!0),(e=s.peareasy,console.log(e),b.get("/players",{headers:{"x-auth-token":e}}).then((function(e){var t=[];return e.data&&(t=e.data),t}))).then((function(e){var t=e.map((function(e){return{name:e.name,position:e.position}}));C(t),u(!1)})).catch((function(){return u(!1)}))},P=function(){u(!0),b.get("/sbcs").then((function(e){var t=[];return e.data&&(t=e.data),t})).then((function(e){g(e.map((function(e){return e.name}))),u(!1)})).catch((function(){return u(!1)}))},H=Object(h.jsxs)("div",{className:"space-y-8",children:[Object(h.jsx)("h1",{className:"font-extrabold text-transparent text-5xl bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text ",children:"Hello there! \ud83d\udc4b\ud83c\udffc"}),Object(h.jsx)("p",{className:"m-auto",children:"Are you tired of spending time on solving squad building challenges (SBCs) in FIFA ultimate team?"}),Object(h.jsx)("p",{className:"m-auto",children:"Then you have come to the right place! We've developed an artificial intelligence which searches for a cheap solution to an SBC with the players in your club!"}),Object(h.jsx)("div",{className:"absolute bottom-10 left-0 right-0",children:Object(h.jsx)(j,{onClick:function(){return I(1)},title:"Get Started!"})})]}),D=Object(h.jsxs)("div",{className:"space-y-8",children:[Object(h.jsx)("h1",{className:"text-5xl font-bold m-auto",children:"Import your players! \u26bd"}),Object(h.jsx)("div",{className:"m-auto",children:"We will take you through a few steps, before you can solve SBCs"}),Object(h.jsxs)("div",{children:["Click",Object(h.jsx)("a",{href:"https://www.ea.com/fifa/ultimate-team/web-app/",rel:"noreferrer",target:"_blank",children:" here "}),"to import players"]}),Object(h.jsx)("div",{className:"absolute bottom-10 left-0 right-0",children:Object(h.jsx)(j,{onClick:function(){W(),u(!0),I(2)},title:"Done"})})]}),R=Object(h.jsxs)("div",{className:"space-y-2",children:[m.length>0?m.map((function(e,t){return Object(h.jsx)(y,{title:e,onClick:function(){return V(t)},selected:L===t},e)})):null,Object(h.jsx)("div",{className:"absolute bottom-10 left-0 right-0",children:Object(h.jsx)(j,{title:"Solve",onClick:function(){var e,t;(I(3),0!==N.length)&&(u(!0),(e=s.peareasy,t=m[L],b.post("/sbcs",{name:t},{headers:{"x-auth-token":e}}).then((function(e){return e.data?e.data:[]}))).then((function(e){var t=e.players,a=e.cost;A({players:t,cost:a}),u(!1)})).catch((function(){u(!1)})))}})})]}),U=["flex flex-col text-center bg-primary-500"],Z=["absolute bottom-0 h-2 w-full bg-primary-200 rounded overflow-hidden text-xs flex"];U.push("w-"+M.toString()+"/3"),M<3?Z.push("bg-primary-200"):Z.push("bg-primary-500");var z,q=Object(h.jsx)("div",{className:Z.join(" "),children:Object(h.jsx)("div",{className:U.join(" ")})});return 2!==M||0!==N.length||l||(Z.push("hidden"),R=Object(h.jsxs)("div",{role:"alert",children:[Object(h.jsxs)("div",{className:"w-2/3 m-auto",children:[Object(h.jsx)("div",{className:"bg-error-500 text-white font-bold rounded-t px-4 py-2",children:"Oh no"}),Object(h.jsx)("div",{className:"border border-t-0 border-error-400 rounded-b bg-red-100 px-4 py-3 text-red-700 ",children:Object(h.jsxs)("p",{children:["It seems like your players weren't imported properly. Please, try again or see",Object(h.jsx)("a",{rel:"noreferrer",href:"https://www.youtube.com/watch?v=MvMSYZ8gA2s&list=LLPrmD7AZQwQzstyOwLT0QiQ",target:"_blank",children:" this "}),"tutorial"]})})]}),Object(h.jsx)("div",{className:"absolute bottom-10 left-0 right-0",children:Object(h.jsx)(j,{onClick:function(){I(1)},title:"Try again!"})})]})),z=_?Object(h.jsxs)("div",{children:[null===_||void 0===_?void 0:_.players.map((function(e){return Object(h.jsxs)("p",{children:[e.name,", ",e.position]})})),Object(h.jsx)("br",{}),Object(h.jsxs)("p",{children:["Approximate cost of players involved is ",null===_||void 0===_?void 0:_.cost]})]}):Object(h.jsxs)("div",{className:"space-y-8",children:[Object(h.jsx)("h1",{className:"text-5xl font-bold m-auto",children:"Oh no, we couldn't find a solution \ud83d\ude14"}),Object(h.jsxs)("p",{children:["We can see that you only have ",N.length," players in the club that can be used for SBCs."]}),Object(h.jsx)("p",{children:"With your current players, we couldn't find a solution - you can try to see if another SBC can be solved."}),Object(h.jsx)("div",{className:"absolute bottom-10 left-0 right-0",children:Object(h.jsx)(j,{onClick:function(){I(2)},title:"Try another one!"})})]}),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("main",{className:"w-2/6 mx-auto h-2/4 text-secondary text-center relative z-10",children:Object(h.jsxs)("div",{className:"mx-auto h-3/4 overflow-y-scroll",children:[M>=1&&(3!==M||_)?q:null,0===M?H:null,1===M?D:null,2!==M||l?null:R,2===M&&l?Object(h.jsx)(f,{}):null,3===M?l?Object(h.jsx)(f,{}):z:null]})}),Object(h.jsx)(O,{})]})},v=function(){return Object(h.jsxs)("main",{className:"container mx-auto w-1/2 space-y-5 pb-10 pt-10 bg-primary-500 p-20 overflow-visible",children:[Object(h.jsx)("h3",{className:"text-secondary text-2xl text-left",children:"What we offer"}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Cheap, fast solutions to squad building challenges using players in your club."}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Are you tired of spending time on solving squad building challenges (SBCs) in FIFA ultimate team? Maybe you prefer using players which you already own, but it takes ages to find a cheap solution?  Then you have come to the right place! We've developed an artificial intelligence which searches for a cheap solution to an SBC with the players in your club!"}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Our service is still at an early stage and we are currently working hard on improving the AI. We are also working on some different extensions - for example searching for solutions where we use a few cheap players from the transfer market, in case no solutions exist within your club."}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Note that when we load the players in your club, we NEVER interact with the web-app. We only read the player names in order to tailor solutions to your club!"}),Object(h.jsx)("h3",{className:"text-secondary text-2xl text-left",children:"How it works"}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"YOUTUBE VIDEO COMING SOON"}),Object(h.jsx)("h3",{className:"text-secondary text-2xl text-left",children:"About us"}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Many of our employees have played a lot of FIFA ultimate team, where we have experienced the hassle of solving SBCs for many years. In the recent years, we've talked a lot about that it must be possible to automate... And here we are!"}),Object(h.jsx)("p",{className:"text-secondary text-m text-left",children:"Please feel free to contact us with any feedback or ideas. We are still at an early stage with lots of features and improvements to come."})]})},w=function(){var e=Object(n.useState)(!0),t=Object(i.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)(""),o=Object(i.a)(r,2),c=o[0],l=o[1],u=Object(n.useState)(""),j=Object(i.a)(u,2),p=j[0],m=j[1],f=Object(d.a)(["peareasy"]),y=Object(i.a)(f,2),O=y[0],g=y[1];if(O.peareasy)return Object(h.jsx)("h1",{className:"text-secondary text-center text-3xl mt-8 mb-8",children:"You are logged in!"});var v=a?Object(h.jsx)(x,{onClick:function(){(function(e,t){return b.post("/users/login",{email:e,password:t}).then((function(e){var t;return e.data&&(t=e.data),t}))})(c,p).then((function(e){return g("peareasy",e)}))},title:"Sign In"}):Object(h.jsx)(x,{onClick:function(){(function(e,t){return b.post("/users",{email:e,password:t}).then((function(e){var t;return e.data&&(t=e.data.uuid),t}))})(c,p).then((function(e){return g("peareasy",e)}))},title:"Sign Up"});return Object(h.jsxs)("div",{className:"container mx-auto w-1/3",children:[Object(h.jsxs)("div",{className:"bg-primary-600 shadow-md rounded px-8 pt-6 pb-8 mb-4",children:[Object(h.jsxs)("div",{className:"mb-4",children:[Object(h.jsx)("label",{className:"block text-secondary text-sm font-bold mb-2",htmlFor:"username",children:"Email"}),Object(h.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline",id:"email",type:"text",placeholder:"Email",onChange:function(e){return l(e.target.value)}})]}),Object(h.jsxs)("div",{className:"mb-6",children:[Object(h.jsx)("label",{className:"block text-secondary text-sm font-bold mb-2",htmlFor:"password",children:"Password"}),Object(h.jsx)("input",{className:"shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"password",type:"password",placeholder:"******************",onChange:function(e){return m(e.target.value)}}),Object(h.jsx)("p",{className:"text-secondary text-xs italic",children:"Please choose a password."})]}),Object(h.jsxs)("div",{className:"flex flex-col gap-y-6",children:[v,Object(h.jsx)("button",{className:"inline-block align-baseline font-bold text-sm text-secondary hover:text-tertiary-300",onClick:function(){return s(!a)},children:a?"Change to sign Up":"Change to sign In"})]})]}),Object(h.jsx)("p",{className:"text-center text-secondary text-xs",children:"\xa92021 Peareasy Corp. All rights reserved."})]})},N=function(e){var t=e.link,a=e.onClick,n=e.children;return Object(h.jsx)(c.b,{to:t,className:"px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-secondary hover:opacity-75",onClick:a,children:Object(h.jsx)("span",{className:"ml-2",children:n})})},C=Object(h.jsx)("svg",{fill:"#ffffff",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",width:"30px",height:"30px",children:Object(h.jsx)("path",{d:"M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"})}),k=function(){var e=s.a.useState(!1),t=Object(i.a)(e,2),a=t[0],n=t[1];return Object(h.jsx)("nav",{className:"relative flex flex-wrap items-center justify-between px-2 py-3 bg-primary-500 mb-16",children:Object(h.jsxs)("div",{className:"container px-4 mx-auto flex flex-wrap items-center justify-between",children:[Object(h.jsxs)("div",{className:"w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start",children:[Object(h.jsx)(c.b,{className:"text-m font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-secondary",to:"/",children:"SBC Solver \u26bd"}),Object(h.jsx)("button",{className:"text-secondary cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none",type:"button",onClick:function(){return n(!a)},children:C})]}),Object(h.jsx)("div",{className:"lg:flex flex-grow items-center"+(a?" flex":" hidden"),id:"example-navbar-danger",children:Object(h.jsx)("ul",{className:"flex flex-col lg:flex-row list-none lg:ml-auto",children:Object(h.jsx)(N,{link:"/about",onClick:function(){return n(!a)},children:"about"})})})]})})};var S=function(){return Object(h.jsx)("div",{className:"h-screen bg-cover bg-center bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800",children:Object(h.jsxs)(c.a,{children:[Object(h.jsx)(k,{}),Object(h.jsxs)(l.d,{children:[Object(h.jsx)(l.b,{path:"/about",component:v}),Object(h.jsx)(l.b,{path:"/profile",component:w}),Object(h.jsx)(l.b,{path:"/peareasy-web-app",component:g}),Object(h.jsx)(l.b,{path:"/",children:Object(h.jsx)(l.a,{to:"/peareasy-web-app"})})]})]})})};o.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(S,{})}),document.getElementById("root"))}},[[63,1,2]]]);
//# sourceMappingURL=main.cf29e1ed.chunk.js.map