(this["webpackJsonpearningsvibe-frontend"]=this["webpackJsonpearningsvibe-frontend"]||[]).push([[0],{243:function(e,t,s){},244:function(e,t,s){},247:function(e,t,s){"use strict";s.r(t);var n=s(0),r=s.n(n),c=s(43),o=s.n(c),i=s(46),a=s.n(i),l=s(85),u=s(40),d=s(252),j=s(253),h=s(117),b=s(261),x=s(22),O=s(53),m=s(262),f=s(264),p=s(116),y=s(268),g=s(2),v=m.a.Brand;function k(e){e.onSearch;var t=e.searchPlaceholderText,s=e.isSearchButton,n=e.onSearchClick,r=void 0===n?function(e){}:n,c=e.buttonText,o=e.brand,i=Object(O.a)(e,["onSearch","searchPlaceholderText","isSearchButton","onSearchClick","buttonText","brand"]);return Object(g.jsxs)(m.a,Object(x.a)(Object(x.a)({},i),{},{children:[Object(g.jsx)(v,{href:"#home",children:o}),Object(g.jsxs)(f.a,{inline:!0,className:"ml-auto",children:[Object(g.jsx)(p.a,{type:"text",placeholder:t||"Search",className:"mr-sm-2",onClick:function(e){return r(e)}}),s&&Object(g.jsx)(y.a,{variant:"outline-light",children:c||"Search"})]})]}))}function A(e){var t=e.children,s=Object(O.a)(e,["children"]);return Object(g.jsx)(d.a,Object(x.a)(Object(x.a)({},s),{},{children:t}))}s(119),f.a.Group,f.a.Control;s(266);var w=s(76),S=s(77),C=s(84),E=s(81),N=s(263),B=s(265),M=s(33),z=s(19),P=s(27),T=s(13),V=s(78),D=s(45),F=s(24),L=s(79),X=function(e){Object(C.a)(s,e);var t=Object(E.a)(s);function s(){return Object(w.a)(this,s),t.apply(this,arguments)}return Object(S.a)(s,[{key:"render",value:function(){var e=Object(F.ema)().options({windowSize:20,sourcePath:"close"}).skipUndefined(!1).merge((function(e,t){e.ema20=t})).accessor((function(e){return e.ema20})).stroke("blue"),t=Object(F.sma)().options({windowSize:20}).merge((function(e,t){e.sma20=t})).accessor((function(e){return e.sma20})),s=Object(F.wma)().options({windowSize:20}).merge((function(e,t){e.wma20=t})).accessor((function(e){return e.wma20})),n=Object(F.tma)().options({windowSize:20}).merge((function(e,t){e.tma20=t})).accessor((function(e){return e.tma20})),r=Object(F.ema)().options({windowSize:50}).merge((function(e,t){e.ema50=t})).accessor((function(e){return e.ema50})),c=Object(F.sma)().options({windowSize:20,sourcePath:"volume"}).merge((function(e,t){e.smaVolume50=t})).accessor((function(e){return e.smaVolume50})).stroke("#4682B4").fill("#4682B4"),o=this.props,i=o.type,a=o.data,l=o.width,u=o.height,d=o.ratio,j=e(t(s(n(r(c(a)))))),h=V.discontinuousTimeScaleProvider.inputDateAccessor((function(e){return new Date(e.date)}))(j),b=h.data,x=h.xScale,O=h.xAccessor,m=h.displayXAccessor,f=[0,O(b[Math.max(0,b.length-1)])];return Object(g.jsxs)(M.b,{height:u,width:l,ratio:d,margin:{left:70,right:70,top:10,bottom:30},type:i,data:b,xScale:x,xAccessor:O,displayXAccessor:m,xExtents:f,clamp:!0,panEvent:!0,zoomEvent:!1,children:[Object(g.jsxs)(M.a,{id:1,yExtents:[function(e){return[e.high+3,e.low]},t.accessor(),s.accessor(),n.accessor(),e.accessor(),r.accessor()],padding:{top:10,bottom:20},children:[Object(g.jsx)(P.XAxis,{axisAt:"bottom",orient:"bottom",ticks:5}),Object(g.jsx)(P.YAxis,{axisAt:"right",orient:"right",ticks:5}),Object(g.jsx)(T.MouseCoordinateY,{at:"right",orient:"right",displayFormat:Object(N.a)(".2f")}),Object(g.jsx)(z.CandlestickSeries,{}),Object(g.jsx)(z.LineSeries,{yAccessor:t.accessor(),stroke:t.stroke()}),Object(g.jsx)(z.LineSeries,{yAccessor:s.accessor(),stroke:s.stroke()}),Object(g.jsx)(z.LineSeries,{yAccessor:n.accessor(),stroke:n.stroke()}),Object(g.jsx)(z.LineSeries,{yAccessor:e.accessor(),stroke:e.stroke()}),Object(g.jsx)(z.LineSeries,{yAccessor:r.accessor(),stroke:r.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:t.accessor(),fill:t.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:s.accessor(),fill:s.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:n.accessor(),fill:n.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:e.accessor(),fill:e.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:r.accessor(),fill:r.stroke()}),Object(g.jsx)(D.OHLCTooltip,{origin:[-40,0]}),Object(g.jsx)(D.MovingAverageTooltip,{onClick:function(e){return console.log(e)},origin:[-38,15],options:[{yAccessor:t.accessor(),type:"SMA",stroke:t.stroke(),windowSize:t.options().windowSize,echo:"some echo here"},{yAccessor:s.accessor(),type:"WMA",stroke:s.stroke(),windowSize:s.options().windowSize,echo:"some echo here"},{yAccessor:n.accessor(),type:"TMA",stroke:n.stroke(),windowSize:n.options().windowSize,echo:"some echo here"},{yAccessor:e.accessor(),type:"EMA",stroke:e.stroke(),windowSize:e.options().windowSize,echo:"some echo here"},{yAccessor:r.accessor(),type:"EMA",stroke:r.stroke(),windowSize:r.options().windowSize,echo:"some echo here"}]})]}),Object(g.jsxs)(M.a,{id:2,yExtents:[function(e){return e.volume},c.accessor()],height:150,origin:function(e,t){return[0,t-150]},children:[Object(g.jsx)(P.YAxis,{axisAt:"left",orient:"left",ticks:1,tickFormat:Object(N.a)(".2s")}),Object(g.jsx)(T.MouseCoordinateX,{at:"bottom",orient:"bottom",displayFormat:Object(B.a)("%X")}),Object(g.jsx)(T.MouseCoordinateY,{at:"left",orient:"left",displayFormat:Object(N.a)(".4s")}),Object(g.jsx)(z.BarSeries,{yAccessor:function(e){return e.volume},fill:function(e){return e.close>e.open?"#6BA583":"red"}}),Object(g.jsx)(z.AreaSeries,{yAccessor:c.accessor(),stroke:c.stroke(),fill:c.fill()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:c.accessor(),fill:c.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:function(e){return e.volume},fill:"#9B0A47"})]}),Object(g.jsx)(T.CrossHairCursor,{})]})}}]),s}(n.Component);X.defaultProps={type:"svg",width:400,height:150};var Y=X=Object(L.fitWidth)(X),W=s(44),I=s(74),K=s(94),H=s(3);function _(e,t){var s=this;return function(n){Object(H.isNotDefined)(s.interactiveNodes)&&(s.interactiveNodes={});var r="".concat(e,"_").concat(t);(Object(H.isDefined)(n)||Object(H.isDefined)(s.interactiveNodes[r]))&&(s.interactiveNodes=Object(x.a)(Object(x.a)({},s.interactiveNodes),{},Object(I.a)({},r,{type:e,chartId:t,node:n})))}}var J=Object(F.ema)().id(0).options({windowSize:26}).merge((function(e,t){e.ema26=t})).accessor((function(e){return e.ema26})),R=Object(F.ema)().id(1).options({windowSize:12}).merge((function(e,t){e.ema12=t})).accessor((function(e){return e.ema12})),U=Object(F.macd)().options({fast:12,slow:26,signal:9}).merge((function(e,t){e.macd=t})).accessor((function(e){return e.macd})),G=Object(F.sma)().id(3).options({windowSize:10,sourcePath:"volume"}).merge((function(e,t){e.smaVolume50=t})).accessor((function(e){return e.smaVolume50})),q="2D",Q={stroke:{macd:"#FF0000",signal:"#00F300"},fill:{divergence:"#4682B4"}},Z=function(e){Object(C.a)(s,e);var t=Object(E.a)(s);function s(e){var n;Object(w.a)(this,s),(n=t.call(this,e)).handleBrush1=n.handleBrush1.bind(Object(W.a)(n)),n.handleBrush3=n.handleBrush3.bind(Object(W.a)(n)),n.onKeyPress=n.onKeyPress.bind(Object(W.a)(n)),n.saveInteractiveNode=_.bind(Object(W.a)(n));var r=e.data,c=U(G(R(J(r)))),o=V.discontinuousTimeScaleProvider.inputDateAccessor((function(e){return e.date}))(c),i=o.data,a=o.xScale,l=o.xAccessor,u=o.displayXAccessor,d=[0,l(i[Math.max(0,i.length-150)])];return n.state={data:r,xScale:a,xAccessor:l,displayXAccessor:u,xExtents:d,brushEnabled:!0},n}return Object(S.a)(s,[{key:"componentDidMount",value:function(){document.addEventListener("keyup",this.onKeyPress)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.onKeyPress)}},{key:"saveCanvasNode",value:function(e){this.canvasNode=e}},{key:"onKeyPress",value:function(e){switch(e.which){case 27:this.node_1.terminate(),this.node_3.terminate(),this.setState({brushEnabled:!1})}}},{key:"handleBrush1",value:function(e,t){var s=e.start,n=e.end,r=Math.min(s.xValue,n.xValue),c=Math.max(s.xValue,n.xValue),o=Math.min(s.yValue,n.yValue),i=Math.max(s.yValue,n.yValue);this.setState({xExtents:[r,c],yExtents1:[o,i],brushEnabled:!1})}},{key:"handleBrush3",value:function(e,t){var s=e.start,n=e.end,r=Math.min(s.xValue,n.xValue),c=Math.max(s.xValue,n.xValue),o=Math.min(s.yValue,n.yValue),i=Math.max(s.yValue,n.yValue);this.setState({xExtents:[r,c],yExtents3:[o,i],brushEnabled:!1})}},{key:"render",value:function(){var e=this.props,t=e.type,s=e.width,n=e.ratio,r=this.state,c=r.data,o=r.xExtents,i=r.xScale,a=r.xAccessor,l=r.displayXAccessor,u=r.brushEnabled,d=Object(H.isDefined)(this.state.yExtents1)?this.state.yExtents1:[function(e){return[e.high,e.low]},J.accessor(),R.accessor()],j=Object(H.isDefined)(this.state.yExtents3)?this.state.yExtents3:U.accessor();return Object(g.jsxs)(M.b,{height:600,width:s,ratio:n,margin:{left:70,right:70,top:20,bottom:30},type:t,data:c,xScale:i,xAccessor:a,displayXAccessor:l,xExtents:o,children:[Object(g.jsxs)(M.a,{id:1,height:400,yPanEnabled:Object(H.isDefined)(this.state.yExtents1),yExtents:d,padding:{top:10,bottom:20},children:[Object(g.jsx)(P.XAxis,{axisAt:"bottom",orient:"bottom",showTicks:!1,outerTickSize:0}),Object(g.jsx)(P.YAxis,{axisAt:"right",orient:"right",ticks:5}),Object(g.jsx)(T.MouseCoordinateY,{at:"right",orient:"right",displayFormat:Object(N.a)(".2f")}),Object(g.jsx)(z.CandlestickSeries,{}),Object(g.jsx)(z.LineSeries,{yAccessor:J.accessor(),stroke:J.stroke()}),Object(g.jsx)(z.LineSeries,{yAccessor:R.accessor(),stroke:R.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:J.accessor(),fill:J.stroke()}),Object(g.jsx)(T.CurrentCoordinate,{yAccessor:R.accessor(),fill:R.stroke()}),Object(g.jsx)(T.EdgeIndicator,{itemType:"last",orient:"right",edgeAt:"right",yAccessor:function(e){return e.close},fill:function(e){return e.close>e.open?"#6BA583":"#FF0000"}}),Object(g.jsx)(D.OHLCTooltip,{origin:[-40,0]}),Object(g.jsx)(D.MovingAverageTooltip,{onClick:function(e){return console.log(e)},origin:[-38,15],options:[{yAccessor:J.accessor(),type:J.type(),stroke:J.stroke(),windowSize:J.options().windowSize},{yAccessor:R.accessor(),type:R.type(),stroke:R.stroke(),windowSize:R.options().windowSize}]}),Object(g.jsx)(K.Brush,{ref:this.saveInteractiveNode(1),enabled:u,type:q,onBrush:this.handleBrush1})]}),Object(g.jsxs)(M.a,{id:2,height:150,yExtents:[function(e){return e.volume},G.accessor()],origin:function(e,t){return[0,t-300]},children:[Object(g.jsx)(P.YAxis,{axisAt:"left",orient:"left",ticks:5,tickFormat:Object(N.a)(".2s")}),Object(g.jsx)(T.MouseCoordinateY,{at:"left",orient:"left",displayFormat:Object(N.a)(".4s")}),Object(g.jsx)(z.BarSeries,{yAccessor:function(e){return e.volume},fill:function(e){return e.close>e.open?"#6BA583":"#FF0000"}}),Object(g.jsx)(z.AreaSeries,{yAccessor:G.accessor(),stroke:G.stroke(),fill:G.fill()})]}),Object(g.jsxs)(M.a,{id:3,height:150,yExtents:j,yPanEnabled:Object(H.isDefined)(this.state.yExtents3),origin:function(e,t){return[0,t-150]},padding:{top:10,bottom:10},children:[Object(g.jsx)(P.XAxis,{axisAt:"bottom",orient:"bottom"}),Object(g.jsx)(P.YAxis,{axisAt:"right",orient:"right",ticks:2}),Object(g.jsx)(T.MouseCoordinateX,{at:"bottom",orient:"bottom",displayFormat:Object(B.a)("%Y-%m-%d")}),Object(g.jsx)(T.MouseCoordinateY,{at:"right",orient:"right",displayFormat:Object(N.a)(".2f")}),Object(g.jsx)(K.Brush,{ref:this.saveInteractiveNode(3),enabled:u,type:q,onBrush:this.handleBrush3}),Object(g.jsx)(z.MACDSeries,Object(x.a)({yAccessor:function(e){return e.macd}},Q)),Object(g.jsx)(D.MACDTooltip,{origin:[-38,15],yAccessor:function(e){return e.macd},options:U.options(),appearance:Q})]}),Object(g.jsx)(T.CrossHairCursor,{})]})}}]),s}(r.a.Component);Z.defaultProps={type:"svg"};Object(L.fitWidth)(Z),s(243);function $(e){var t=e.children,s=e.isOpen,n=void 0!==s&&s,r=e.hasCloseButton,c=void 0===r||r,o=e.onClose,i=void 0===o?function(e){}:o;return Object(g.jsx)("div",{children:Object(g.jsxs)("div",{style:{width:n?"100%":"0%"},className:"overlay",children:[c&&Object(g.jsx)("p",{className:"closebtn",onClick:function(e){return i(e)},children:"\xd7"}),Object(g.jsx)("div",{className:"overlay-content",children:t})]})})}s(244);var ee=s(267),te=s(260);function se(e){var t=e.vibe,s=e.chartWidth;return Object(g.jsxs)(ee.a,{className:"mt-4 mb-4",children:[Object(g.jsx)(ee.a.Header,{children:Object(g.jsxs)(te.a,{striped:!0,bordered:!0,hover:!0,responsive:!0,children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Earning Date"}),Object(g.jsx)("th",{children:"EPS Estimate"}),Object(g.jsx)("th",{children:"EPS Actual"}),Object(g.jsx)("th",{children:"Revenue Estimate"}),Object(g.jsx)("th",{children:"Revenue Actual"})]})}),Object(g.jsx)("tbody",{children:Object(g.jsxs)("tr",{children:[Object(g.jsxs)("td",{children:[t.earnings.date," [","amc"===t.earnings.time?"after market close":"before market open","]"]}),Object(g.jsx)("td",{children:!t.earnings.epsEstimated||t.earnings.epsEstimated<=0?"N/A":t.earnings.epsEstimated}),Object(g.jsx)("td",{style:{backgroundColor:t.earnings.eps>t.earnings.epsEstimated?"rgb(0, 128, 0, 0.1)":"rgb(255, 0, 0, 0.1)"},children:!t.earnings.eps||t.earnings.eps<=0?"N/A":t.earnings.eps}),Object(g.jsx)("td",{children:!t.earnings.revenueEstimated||t.earnings.revenueEstimated<=0?"N/A":t.earnings.revenueEstimated}),Object(g.jsx)("td",{style:{backgroundColor:t.earnings.revenue>t.earnings.revenueEstimated?"rgb(0, 128, 0, 0.1)":"rgb(255, 0, 0, 0.1)"},children:!t.earnings.revenue||t.earnings.revenue<=0?"N/A":t.earnings.revenue})]})})]})}),Object(g.jsx)(ee.a.Body,{className:"p-0",children:t.stock&&t.stock.length>0?Object(g.jsxs)("div",{children:[console.log(t.stock.length),Object(g.jsx)(Y,{type:"svg",height:600,width:s,data:t.stock.sort((function(e,t){return new Date(e.date).getTime()-new Date(t.date).getTime()}))})]}):Object(g.jsx)("h3",{children:"Can't seem to find that. Please try again soon."})})]})}var ne=function(){var e=Object(n.useState)(void 0),t=Object(u.a)(e,2),s=t[0],r=t[1],c=Object(n.useState)(!0),o=Object(u.a)(c,2),i=o[0],x=o[1],O=Object(n.useState)(!1),m=Object(u.a)(O,2),f=m[0],p=m[1],y=Object(n.useState)(),v=Object(u.a)(y,2),w=v[0],S=v[1],C=Object(n.useState)(),E=Object(u.a)(C,2),N=E[0],B=E[1],M=Object(n.useCallback)((function(e){f||i||!s||e&&B(e)}),[f,i,s]);function z(){var e=600;N&&(e=N.clientWidth),S(e)}Object(n.useEffect)((function(){window.addEventListener("resize",z)})),Object(n.useEffect)((function(){N&&S(N.clientWidth)}),[N]);var P=function(){var e=Object(l.a)(a.a.mark((function e(t){var s,n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s="".concat("https://earningsvibe.herokuapp.com","/api/vibe_check?symbol=").concat(t.target.value,"&count=4"),e.next=3,fetch(s);case 3:return n=e.sent,e.next=6,n.json();case 6:c=e.sent,console.log({vibeData:c}),r(c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(l.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=7;break}return p(!0),t.preventDefault(),e.next=5,P(t);case 5:x(!1),p(!1);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(d.a,{fluid:!0,className:"pl-0 pr-0 bg-gray",children:[Object(g.jsx)($,{isOpen:i,hasCloseButton:!1,children:Object(g.jsx)(j.a,{className:"justify-content-center center-me",children:Object(g.jsx)(h.a,{xs:!0,className:"ml-5 mr-5",children:!f&&i?Object(g.jsx)("input",{spellCheck:!1,placeholder:"ticker",type:"text",className:"input--fullscreen",onKeyPress:function(){var e=Object(l.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}):Object(g.jsx)(b.a,{variant:"light",className:"justify-content-end",animation:"border",role:"status",children:Object(g.jsx)("span",{className:"sr-only",children:"Loading..."})})})})}),!i&&!f&&Object(g.jsxs)(n.Fragment,{children:[Object(g.jsx)(k,{fixed:"top",brand:"earningsvibe.com",expand:"sm",bg:"light",variant:"light",searchPlaceholderText:"Ticker",onSearchClick:function(e){return x(!0)}}),Object(g.jsx)(A,{style:{marginTop:"6rem"},fluid:!0,children:Object(g.jsx)(j.a,{className:"justify-content-center center-me",children:Object(g.jsxs)(h.a,{sm:12,md:10,ref:M,children:[s&&s.length>0&&Object(g.jsx)("h1",{children:s[0].earnings.symbol}),s.map((function(e){return Object(g.jsx)(j.a,{children:Object(g.jsx)(h.a,{children:Object(g.jsx)(se,{vibe:e,chartWidth:w})})})}))]})})})]})]})};s(245);o.a.render(Object(g.jsx)(ne,{}),document.getElementById("root"))}},[[247,1,2]]]);
//# sourceMappingURL=main.b7d5b9c9.chunk.js.map