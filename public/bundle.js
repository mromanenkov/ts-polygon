!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";var i=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.substract=function(e){return new t(this.x-e.x,this.y-e.y)},t.prototype.add=function(e){return new t(this.x+e.x,this.y+e.y)},t}();e.a=i},function(t,e,n){"use strict";function i(t,e){for(var n=!1,i=0,r=e.length-1;i<e.length;r=i++){var o=e[i],s=e[r];o.y>t.y!=s.y>t.y&&t.x<(s.x-o.x)*(t.y-o.y)/(s.y-o.y)+o.x&&(n=!n)}return n}function r(t,e){var n=t[0],r=t[1],o=e[0],s=e[1],u=((n.x*r.y-n.y*r.x)*(o.x-s.x)-(n.x-r.x)*(o.x*s.y-o.y*s.x))/((n.x-r.x)*(o.y-s.y)-(n.y-r.y)*(o.x-s.x)),a=((n.x*r.y-n.y*r.x)*(o.y-s.y)-(n.y-r.y)*(o.x*s.y-o.y*s.x))/((n.x-r.x)*(o.y-s.y)-(n.y-r.y)*(o.x-s.x));return i(new c.a(u,a),[n,o,r,s])}function o(t,e){for(var n=t.vertices.concat([t.vertices[0]]),i=e.vertices.concat([e.vertices[0]]),o=!1,s=0;s<n.length-1;s++)for(var u=[n[s],n[s+1]],a=0;a<i.length-1;a++){var f=[i[a],i[a+1]],h=[new c.a(u[0].x,u[0].y),new c.a(u[1].x,u[1].y)],d=[new c.a(f[0].x,f[0].y),new c.a(f[1].x,f[1].y)];if(o=r(h,d))return!0}return o}function s(t,e){return t.vertices.some(function(t){return i(t,e.vertices)}),e.vertices.some(function(e){return i(e,t.vertices)})}e.c=i,e.a=o,e.b=s;var c=n(0)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),r=n(4),o=n(5),s=n(0),c=[new s.a(100,100),new s.a(200,100),new s.a(200,200),new s.a(100,200)],u=[new s.a(300,400),new s.a(450,300),new s.a(470,370)],a=[new s.a(0,20),new s.a(20,0),new s.a(40,10),new s.a(40,30),new s.a(30,40)],f=new i.a(c),h=new i.a(u),d=new i.a(a),y={width:window.innerWidth-.02*window.innerWidth,height:window.innerHeight-.02*window.innerWidth,padding:30,polygonMargin:20},l=new o.a,p=new r.a("example",y);window.addEventListener("load",function(){function t(){requestAnimationFrame(t),p.update()}p.init();var e=[f,h,d];p.addArr(e),p.element.addEventListener("mousedown",function(t){l.cursorDownPos.x=t.offsetX,l.cursorDownPos.y=t.offsetY,p.selectedObject=p.getSelectedObject(l.cursorDownPos)}),p.element.addEventListener("mouseup",function(t){l.cursorUpPos.x=t.offsetX,l.cursorUpPos.y=t.offsetY;var e=l.getOffset();p.selectedObject&&p.selectedObject.shift(e),p.selectedObject=null}),t()})},function(t,e,n){"use strict";var i=n(0),r=n(1),o=function(){function t(t){this.vertices=t,this.isOverlap=!1,this.setBoundingBox()}return t.prototype.shift=function(t){for(var e=0;e<this.vertices.length;e++)this.vertices[e]=this.vertices[e].add(t);this.setBoundingBox()},t.prototype.setBoundingBox=function(){var t=this.vertices[0].x,e=this.vertices[0].x,n=this.vertices[0].y,r=this.vertices[0].y;this.vertices.forEach(function(i){i.x<t&&(t=i.x),i.x>e&&(e=i.x),i.y<n&&(n=i.y),i.y>r&&(r=i.y)}),this.boundingBox=[new i.a(t,n),new i.a(e,n),new i.a(e,r),new i.a(t,r)]},t.prototype.isOverlappingBy=function(t){return r.b(this,t)||r.a(this,t)},t}();e.a=o},function(t,e,n){"use strict";n.d(e,"a",function(){return o});var i=n(1),r=n(0),o=function(){function t(t,e,n){this.id=t,this.setting=e,this.objects=n||[],this.nextObjListPos=new r.a(this.setting.padding,this.setting.padding),this.strokeColor="#000",this.fillColor="#fff",this.selectedObject=null,this.element=document.getElementById(t)}return t.prototype.init=function(){this.element.width=this.setting.width,this.element.height=this.setting.height},t.prototype.add=function(t){this.objects.push(t);var e=this.nextObjListPos.substract(t.boundingBox[0]);t.shift(e),this.nextObjListPos.y=t.boundingBox[t.boundingBox.length-1].y+this.setting.polygonMargin,this.update()},t.prototype.addArr=function(t){var e=this;t.forEach(function(t){e.add(t)})},t.prototype.draw=function(t){var e=this.element.getContext("2d");e.save(),e.fillStyle=t.isOverlap?"#f00":this.fillColor,e.strokeStyle=this.strokeColor,e.beginPath(),e.moveTo(t.vertices[0].x,t.vertices[0].y),t.vertices.forEach(function(t){e.lineTo(t.x,t.y)}),e.closePath(),e.stroke(),e.fill(),e.restore()},t.prototype.update=function(){var t=this;this.element.getContext("2d").clearRect(0,0,this.setting.width,this.setting.height),this.updateOverlappedObject(this.objects),this.objects.forEach(function(e){t.draw(e)})},t.prototype.getSelectedObject=function(t){return this.objects.find(function(e){return i.c(t,e.vertices)})||null},t.prototype.updateOverlappedObject=function(t){for(var e=new Set,n=0;n<t.length;n++)for(var i=t[n],r=n+1;r<t.length;r++){var o=t[r];i.isOverlappingBy(o)&&e.add(i).add(o)}t.forEach(function(t){t.isOverlap=e.has(t)})},t}()},function(t,e,n){"use strict";var i=n(0),r=function(){function t(){this.cursorDownPos=new i.a(0,0),this.cursorUpPos=new i.a(0,0)}return Object.defineProperty(t,"Instance",{get:function(){return this.instance||(this.instance=new t)},enumerable:!0,configurable:!0}),t.prototype.getOffset=function(){return this.cursorUpPos.substract(this.cursorDownPos)},t}();e.a=r}]);
//# sourceMappingURL=bundle.js.map