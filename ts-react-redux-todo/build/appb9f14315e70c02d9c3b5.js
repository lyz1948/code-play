(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){t.exports={normal:"_3FIL-",filters:"_1BcvS",selected:"_2piwY",count:"_3khYx",clearCompleted:"_3tf6X"}},11:function(t,e,n){t.exports={normal:"_1Q51z",toggle:"_1qmDW",destroy:"_2IRed",edit:"_2HdII",editing:"_2EWh0 _1Q51z",view:"_2XJXA",completed:"Cokm5"}},15:function(t,e,n){t.exports={main:"_3k-Zn",normal:"_3tkZl",editing:"_30p4P",edit:"_1l0KG",view:"_217L8",toggle:"_36a-n",completed:"_1cN6x",destroy:"_1mxli",toggleAll:"_38AgA"}},19:function(t,e,n){t.exports={new:"_1MSku",edit:"_21OYt"}},25:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return l});var o=n(0),r=n(44),i=n(45),c=n(29),a=n(27),l=Object(a.hot)(t)(function(){return o.createElement(r.a,null,o.createElement(i.a,{path:"/",component:c.a}))})}).call(this,n(22)(t))},26:function(t,e,n){t.exports={normal:"_2eZ7s"}},29:function(t,e,n){"use strict";var o=n(0),r=n(26),i=n(14),c=n(5);function a(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return Object.keys(t).reduce(function(n,o){return e.includes(o)||(n[o]=t[o]),n},{})}var l,u=n(10),p=n(8);!function(t){!function(t){t.SHOW_ALL="ALL",t.SHOW_ACTIVE="ACTINVE",t.SHOW_COMPLETED="COMPLETED"}(t.Filter||(t.Filter={}))}(l||(l={}));var d,s,f=(d=function(t,e){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}d(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),h=((s={})[l.Filter.SHOW_ALL]="ALL",s[l.Filter.SHOW_ACTIVE]="ACTIVE",s[l.Filter.SHOW_COMPLETED]="COMPLETED",s),m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return f(e,t),e.prototype.renderTodoCount=function(){var t=this.props.activeCount,e=1===t?"item":"items";return o.createElement("span",{className:u.count},o.createElement("strong",null,t||"no"),e," left")},e.prototype.renderFilterLink=function(t){var e,n=this.props,r=n.filter,i=n.onClickFilter;return o.createElement("a",{className:p((e={},e[u.selected]=t===r,e)),style:{cursor:"pointer"},onClick:function(){return i(t)},children:h[t]})},e.prototype.renderClearButton=function(){var t=this.props,e=t.completedCount,n=t.onClickClearCompleted;if(e>0)return o.createElement("button",{className:u.clearCompleted,onClick:n,children:"Clear completed"})},e.prototype.render=function(){var t=this;return o.createElement("footer",{className:u.normal},this.renderTodoCount(),o.createElement("ul",{className:u.filters},Object.keys(l.Filter).map(function(e){return o.createElement("li",{key:e,children:t.renderFilterLink(l.Filter[e])})})),this.renderClearButton())},e.defaultProps={activeCount:0,completedCount:0},e}(o.Component),O=n(19),_=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),y=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.state={text:o.props.text||""},o.handleBlur=o.handleBlur.bind(o),o.handleSubmit=o.handleSubmit.bind(o),o.handleChange=o.handleChange.bind(o),o}return _(e,t),e.prototype.handleBlur=function(t){var e=t.target.value.trim();this.props.newTodo||this.props.onSave(e)},e.prototype.handleChange=function(t){this.setState({text:t.target.value})},e.prototype.handleSubmit=function(t){var e=t.currentTarget.value.trim();13===t.which&&(this.props.onSave(e),this.props.newTodo&&this.setState({text:""}))},e.prototype.render=function(){var t,e=p(((t={})[O.edit]=this.props.editing,t[O.new]=this.props.newTodo,t));return o.createElement("input",{className:e,type:"text",autoFocus:!0,placeholder:this.props.placeholder,value:this.state.text,onBlur:this.handleBlur,onChange:this.handleChange,onKeyDown:this.handleSubmit})},e}(o.Component),E=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),C=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.handleSave=o.handleSave.bind(o),o}return E(e,t),e.prototype.handleSave=function(t){t.length&&this.props.addTodo({text:t})},e.prototype.render=function(){return o.createElement("header",null,o.createElement("h1",null,"Todos"),o.createElement(y,{newTodo:!0,onSave:this.handleSave,placeholder:"enter new todo!!"}))},e}(o.Component),T=n(6),v=n(15),b=n(11),g=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),L=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.state={editing:!1},o}return g(e,t),e.prototype.handleDoubleClick=function(){this.setState({editing:!0})},e.prototype.handleSave=function(t,e){0===e.length?this.props.deleteTodo(t):this.props.editTodo({id:t,text:e}),this.setState({editing:!1})},e.prototype.render=function(){var t,e,n=this,r=this.props,i=r.todo,c=r.completeTodo,a=r.deleteTodo;e=this.state.editing?o.createElement(y,{text:i.text,editing:this.state.editing,onSave:function(t){return i.id&&n.handleSave(i.id,t)}}):o.createElement("div",null,o.createElement("input",{className:b.toggle,type:"checkbox",checked:i.completed,onChange:function(){return i.id&&c(i.id)}}),o.createElement("label",{onDoubleClick:function(){return n.handleDoubleClick()}},i.text),o.createElement("button",{className:b.destroy,onClick:function(){i.id&&a(i.id)}}));var l=p(((t={})[b.completed]=i.completed,t[b.editiong]=this.state.editing,t[b.normal]=!this.state.editing,t));return o.createElement("li",{className:l},e)},e}(o.Component),D=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),A=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return D(e,t),e.prototype.renderToggeAll=function(){var t=this.props,e=t.todos,n=t.actions;if(e.length>0){var r=e.some(function(t){return!t.completed});return o.createElement("input",{className:v.toggleAll,type:"checkbox",checked:r,onChange:n.completeAll})}},e.prototype.render=function(){var t=this.props,e=t.todos,n=t.actions;return o.createElement("section",{className:v.main},this.renderToggeAll(),o.createElement("ul",{className:v.normal},e.map(function(t){return o.createElement(L,{key:t.id,todo:t,completeTodo:n.completeTodo,deleteTodo:n.deleteTodo,editTodo:n.editTodo})})))},e}(o.Component);n.d(e,"a",function(){return k});var P,j=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),w=function(t,e,n,o){var r,i=arguments.length,c=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(c=(i<3?r(c):i>3?r(e,n,c):r(e,n))||c);return i>3&&c&&Object.defineProperty(e,n,c),c},S=Object.keys(l.Filter).map(function(t){return l.Filter[t]}),x=((P={})[l.Filter.SHOW_ALL]=function(){return!0},P[l.Filter.SHOW_ACTIVE]=function(t){return!t.completed},P[l.Filter.SHOW_COMPLETED]=function(t){return t.completed},P),k=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.handleClearCompleted=o.handleClearCompleted.bind(o),o.handleFilterChange=o.handleFilterChange.bind(o),o}return j(e,t),e.prototype.handleClearCompleted=function(){this.props.todos.some(function(t){return t.completed||!1})&&this.props.actions.clearCompleted()},e.prototype.handleFilterChange=function(t){this.props.history.push("#"+t)},e.prototype.render=function(){var t=this.props,e=t.todos,n=t.actions,i=t.filter,c=e.length-e.filter(function(t){return t.completed}).length,a=i?e.filter(x[i]):e,l=e.reduce(function(t,e){return e.completed?t+1:t},0);return o.createElement("div",{className:r.normal},o.createElement(C,{addTodo:n.addTodo}),o.createElement(A,{todos:a,actions:n}),o.createElement(m,{filter:i,activeCount:c,completedCount:l,onClickClearCompleted:this.handleClearCompleted,onClickFilter:this.handleFilterChange}))},e.defaultProps={filter:l.Filter.SHOW_ALL},e=w([Object(i.b)(function(t,e){var n=e.location&&e.location.hash.replace("#",""),o=S.find(function(t){return t===n})||l.Filter.SHOW_ALL;return{todos:t.todos,filter:o}},function(t){return{actions:Object(c.bindActionCreators)(a(T.a,"Type"),t)}})],e)}(o.Component)},43:function(t,e,n){"use strict";n.r(e);var o,r=n(0),i=n(23),c=n(14),a=n(30),l=n(5),u=(n(40),function(t){return function(t){return function(e){return t(e)}}}),p=n(48),d=n(6),s=function(){return(s=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},f=Object(p.a)(((o={})[d.a.Type.ADD_TODO]=function(t,e){return e.payload&&e.payload.text?[{id:t.reduce(function(t,e){return Math.max(e.id||1,t)},0)+1,completed:!1,text:e.payload.text}].concat(t):t},o[d.a.Type.DELETE_TODO]=function(t,e){return t.filter(function(t){return t.id!==e.payload})},o[d.a.Type.EDIT_TODO]=function(t,e){return t.map(function(t){return t&&e&&e.payload&&(t.id||0)===e.payload.id?s({},t,{text:e.payload.text}):t})},o[d.a.Type.COMPLETE_TODO]=function(t,e){return t.map(function(t){return t.id===e.payload?s({},t,{completed:!t.completed}):t})},o[d.a.Type.COMPLETE_ALL]=function(t,e){return t.map(function(t){return s({},t,{completed:!0})})},o[d.a.Type.CLEAR_COMPLETED]=function(t,e){return t.filter(function(t){return!1===t.completed})},o),[{id:1,text:"Use Redux",completed:!1}]),h=Object(l.combineReducers)({todos:f});var m,O,_=n(47),y=n(25),E=Object(a.a)(),C=(O=Object(l.applyMiddleware)(u),Object(l.createStore)(h,m,O));i.render(r.createElement(c.a,{store:C},r.createElement(_.a,{history:E},r.createElement(y.a,null))),document.getElementById("app"))},6:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o,r=n(12);!function(t){var e;!function(t){t.ADD_TODO="ADD_TODO",t.EDIT_TODO="EDIT_TODO",t.DELETE_TODO="DELETE_TODO",t.COMPLETE_TODO="COMPLETE_TODO",t.COMPLETE_ALL="COMPLETE_ALL",t.CLEAR_COMPLETED="CLEAR_COMPLETED"}(e=t.Type||(t.Type={})),t.addTodo=Object(r.a)(e.ADD_TODO),t.editTodo=Object(r.a)(e.EDIT_TODO),t.deleteTodo=Object(r.a)(e.DELETE_TODO),t.completeTodo=Object(r.a)(e.COMPLETE_TODO),t.completeAll=Object(r.a)(e.COMPLETE_ALL),t.clearCompleted=Object(r.a)(e.CLEAR_COMPLETED)}(o||(o={}))}},[[43,1,2]]]);