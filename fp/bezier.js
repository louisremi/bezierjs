var BezierFP=function(t){function r(e){if(n[e])return n[e].exports;var i=n[e]={exports:{},id:e,loaded:!1};return t[e].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var n={};return r.m=t,r.c=n,r.p="",r(0)}([function(t,r,n){n(1),t.exports=n(5)},function(t,r,n){"use strict";t.exports=n(2)},function(t,r,n){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){function r(t,r,n,e,i){"undefined"==typeof i&&(i=.5);var o=x.projectionratio(i,t),a=1-o,s={x:o*r.x+a*e.x,y:o*r.y+a*e.y},u=x.abcratio(i,t),f={x:n.x+(n.x-s.x)/u,y:n.y+(n.y-s.y)/u};return{A:f,B:n,C:s}}var i=Math.abs,o=Math.min,a=Math.max,s=Math.acos,u=Math.sqrt,f=Math.PI,c={x:0,y:0,z:0},x=n(3),h=n(4),l=function(t){var r=t&&t.forEach?t:[].slice.call(arguments),n=!1;if("object"===e(r[0])){n=r.length;var o=[];r.forEach(function(t){["x","y","z"].forEach(function(r){"undefined"!=typeof t[r]&&o.push(t[r])})}),r=o}var a=!1,s=r.length;if(n){if(n>4){if(1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");a=!0}}else if(6!==s&&8!==s&&9!==s&&12!==s&&1!==arguments.length)throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");var u=!a&&(9===s||12===s)||t&&t[0]&&"undefined"!=typeof t[0].z;this._3d=u;for(var f=[],c=0,h=u?3:2;c<s;c+=h){var l={x:r[c],y:r[c+1]};u&&(l.z=r[c+2]),f.push(l)}this.order=f.length-1,this.points=f;var p=["x","y"];u&&p.push("z"),this.dims=p,this.dimlen=p.length,function(t){for(var r=t.order,n=t.points,e=x.align(n,{p1:n[0],p2:n[r]}),o=0;o<e.length;o++)if(i(e[o].y)>1e-4)return void(t._linear=!1);t._linear=!0}(this),this._t1=0,this._t2=1,this.update()};l.fromSVG=function(t){var r=t.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat),n=/[cq]/.test(t);return n?(r=r.map(function(t,n){return n<2?t:t+r[n%2]}),new l(r)):new l(r)},l.quadraticFromPoints=function(t,n,e,i){if("undefined"==typeof i&&(i=.5),0===i)return new l(n,n,e);if(1===i)return new l(t,n,n);var o=r(2,t,n,e,i);return new l(t,o.A,e)},l.cubicFromPoints=function(t,n,e,i,o){"undefined"==typeof i&&(i=.5);var a=r(3,t,n,e,i);"undefined"==typeof o&&(o=x.dist(n,a.C));var s=o*(1-i)/i,u=x.dist(t,e),f=(e.x-t.x)/u,c=(e.y-t.y)/u,h=o*f,p=o*c,y=s*f,v=s*c,m={x:n.x-h,y:n.y-p},d={x:n.x+y,y:n.y+v},g=a.A,z={x:g.x+(m.x-g.x)/(1-i),y:g.y+(m.y-g.y)/(1-i)},b={x:g.x+(d.x-g.x)/i,y:g.y+(d.y-g.y)/i},_={x:t.x+(z.x-t.x)/i,y:t.y+(z.y-t.y)/i},E={x:e.x+(b.x-e.x)/(1-i),y:e.y+(b.y-e.y)/(1-i)};return new l(t,_,E,e)};var p=function(){return x};l.getUtils=p,l.prototype={getUtils:p,valueOf:function(){return this.toString()},toString:function(){return x.pointsToString(this.points)},toSVG:function(t){if(this._3d)return!1;for(var r=this.points,n=r[0].x,e=r[0].y,i=["M",n,e,2===this.order?"Q":"C"],o=1,a=r.length;o<a;o++)i.push(r[o].x),i.push(r[o].y);return i.join(" ")},update:function(){this.dpoints=[];for(var t=this.points,r=t.length,n=r-1;r>1;r--,n--){for(var e,i=[],o=0;o<n;o++)e={x:n*(t[o+1].x-t[o].x),y:n*(t[o+1].y-t[o].y)},this._3d&&(e.z=n*(t[o+1].z-t[o].z)),i.push(e);this.dpoints.push(i),t=i}this.computedirection()},computedirection:function(){var t=this.points,r=x.angle(t[0],t[this.order],t[1]);this.clockwise=r>0},length:function(){return x.length(this.derivative.bind(this))},_lut:[],getLUT:function(t){if(t=t||100,this._lut.length===t)return this._lut;this._lut=[];for(var r=0;r<=t;r++)this._lut.push(this.compute(r/t));return this._lut},on:function(t,r){r=r||5;for(var n,e=this.getLUT(),i=[],o=0,a=0;a<e.length;a++)n=e[a],x.dist(n,t)<r&&(i.push(n),o+=a/e.length);return!!i.length&&(o/=i.length)},project:function(t){var r=this.getLUT(),n=r.length-1,e=x.closest(r,t),i=e.mdist,o=e.mpos;if(0===o||o===n){var a=o/n,s=this.compute(a);return s.t=a,s.d=i,s}var u,a,f,c,h=(o-1)/n,l=(o+1)/n,p=.1/n;for(i+=1,a=h,u=a;a<l+p;a+=p)f=this.compute(a),c=x.dist(t,f),c<i&&(i=c,u=a);return f=this.compute(u),f.t=u,f.d=i,f},get:function(t){return this.compute(t)},point:function(t){return this.points[t]},compute:function(t){if(0===t)return this.points[0];if(1===t)return this.points[this.order];var r=this.points,n=1-t;if(1===this.order)return f={x:n*r[0].x+t*r[1].x,y:n*r[0].y+t*r[1].y},this._3d&&(f.z=n*r[0].z+t*r[1].z),f;if(this.order<4){var e,i,o,a=n*n,s=t*t,u=0;2===this.order?(r=[r[0],r[1],r[2],c],e=a,i=n*t*2,o=s):3===this.order&&(e=a*n,i=a*t*3,o=n*s*3,u=t*s);var f={x:e*r[0].x+i*r[1].x+o*r[2].x+u*r[3].x,y:e*r[0].y+i*r[1].y+o*r[2].y+u*r[3].y};return this._3d&&(f.z=e*r[0].z+i*r[1].z+o*r[2].z+u*r[3].z),f}for(var x=JSON.parse(JSON.stringify(this.points));x.length>1;){for(var h=0;h<x.length-1;h++)x[h]={x:x[h].x+(x[h+1].x-x[h].x)*t,y:x[h].y+(x[h+1].y-x[h].y)*t},"undefined"!=typeof x[h].z&&(x[h]=x[h].z+(x[h+1].z-x[h].z)*t);x.splice(x.length-1,1)}return x[0]},raise:function(){for(var t,r,n,e=this.points,i=[e[0]],o=e.length,t=1;t<o;t++)r=e[t],n=e[t-1],i[t]={x:(o-t)/o*r.x+t/o*n.x,y:(o-t)/o*r.y+t/o*n.y};return i[o]=e[o-1],new l(i)},derivative:function(t){var r,n,e=1-t,i=0,o=this.dpoints[0];2===this.order&&(o=[o[0],o[1],c],r=e,n=t),3===this.order&&(r=e*e,n=e*t*2,i=t*t);var a={x:r*o[0].x+n*o[1].x+i*o[2].x,y:r*o[0].y+n*o[1].y+i*o[2].y};return this._3d&&(a.z=r*o[0].z+n*o[1].z+i*o[2].z),a},inflections:function(){return x.inflections(this.points)},normal:function(t){return this._3d?this.__normal3(t):this.__normal2(t)},__normal2:function(t){var r=this.derivative(t),n=u(r.x*r.x+r.y*r.y);return{x:-r.y/n,y:r.x/n}},__normal3:function(t){var r=this.derivative(t),n=this.derivative(t+.01),e=u(r.x*r.x+r.y*r.y+r.z*r.z),i=u(n.x*n.x+n.y*n.y+n.z*n.z);r.x/=e,r.y/=e,r.z/=e,n.x/=i,n.y/=i,n.z/=i;var o={x:n.y*r.z-n.z*r.y,y:n.z*r.x-n.x*r.z,z:n.x*r.y-n.y*r.x},a=u(o.x*o.x+o.y*o.y+o.z*o.z);o.x/=a,o.y/=a,o.z/=a;var s=[o.x*o.x,o.x*o.y-o.z,o.x*o.z+o.y,o.x*o.y+o.z,o.y*o.y,o.y*o.z-o.x,o.x*o.z-o.y,o.y*o.z+o.x,o.z*o.z],f={x:s[0]*r.x+s[1]*r.y+s[2]*r.z,y:s[3]*r.x+s[4]*r.y+s[5]*r.z,z:s[6]*r.x+s[7]*r.y+s[8]*r.z};return f},hull:function(t){var r,n=this.points,e=[],i=[],o=0,a=0,s=0;for(i[o++]=n[0],i[o++]=n[1],i[o++]=n[2],3===this.order&&(i[o++]=n[3]);n.length>1;){for(e=[],a=0,s=n.length-1;a<s;a++)r=x.lerp(t,n[a],n[a+1]),i[o++]=r,e.push(r);n=e}return i},split:function(t,r){if(0===t&&r)return this.split(r).left;if(1===r)return this.split(t).right;var n=this.hull(t),e={left:new l(2===this.order?[n[0],n[3],n[5]]:[n[0],n[4],n[7],n[9]]),right:new l(2===this.order?[n[5],n[4],n[2]]:[n[9],n[8],n[6],n[3]]),span:n};if(e.left._t1=x.map(0,0,1,this._t1,this._t2),e.left._t2=x.map(t,0,1,this._t1,this._t2),e.right._t1=x.map(t,0,1,this._t1,this._t2),e.right._t2=x.map(1,0,1,this._t1,this._t2),!r)return e;r=x.map(r,t,1,0,1);var i=e.right.split(r);return i.left},extrema:function(){var t,r,n=this.dims,e={},i=[];return n.forEach(function(n){r=function(t){return t[n]},t=this.dpoints[0].map(r),e[n]=x.droots(t),3===this.order&&(t=this.dpoints[1].map(r),e[n]=e[n].concat(x.droots(t))),e[n]=e[n].filter(function(t){return t>=0&&t<=1}),i=i.concat(e[n].sort())}.bind(this)),i=i.sort().filter(function(t,r){return i.indexOf(t)===r}),e.values=i,e},bbox:function(){var t=this.extrema(),r={};return this.dims.forEach(function(n){r[n]=x.getminmax(this,n,t[n])}.bind(this)),r},overlaps:function(t){var r=this.bbox(),n=t.bbox();return x.bboxoverlap(r,n)},offset:function(t,r){if("undefined"!=typeof r){var n=this.get(t),e=this.normal(t),i={c:n,n:e,x:n.x+e.x*r,y:n.y+e.y*r};return this._3d&&(i.z=n.z+e.z*r),i}if(this._linear){var o=this.normal(0),a=this.points.map(function(r){var n={x:r.x+t*o.x,y:r.y+t*o.y};return r.z&&e.z&&(n.z=r.z+t*o.z),n});return[new l(a)]}var s=this.reduce();return s.map(function(r){return r.scale(t)})},simple:function(){if(3===this.order){var t=x.angle(this.points[0],this.points[3],this.points[1]),r=x.angle(this.points[0],this.points[3],this.points[2]);if(t>0&&r<0||t<0&&r>0)return!1}var n=this.normal(0),e=this.normal(1),o=n.x*e.x+n.y*e.y;this._3d&&(o+=n.z*e.z);var a=i(s(o));return a<f/3},reduce:function(){var t,r,n=0,e=0,o=.01,a=[],s=[],u=this.extrema().values;for(u.indexOf(0)===-1&&(u=[0].concat(u)),u.indexOf(1)===-1&&u.push(1),n=u[0],t=1;t<u.length;t++)e=u[t],r=this.split(n,e),r._t1=n,r._t2=e,a.push(r),n=e;return a.forEach(function(t){for(n=0,e=0;e<=1;)for(e=n+o;e<=1+o;e+=o)if(r=t.split(n,e),!r.simple()){if(e-=o,i(n-e)<o)return[];r=t.split(n,e),r._t1=x.map(n,0,1,t._t1,t._t2),r._t2=x.map(e,0,1,t._t1,t._t2),s.push(r),n=e;break}n<1&&(r=t.split(n,1),r._t1=x.map(n,0,1,t._t1,t._t2),r._t2=t._t2,s.push(r))}),s},scale:function(t){var r=this.order,n=!1;if("function"==typeof t&&(n=t),n&&2===r)return this.raise().scale(n);var e=this.clockwise,i=n?n(0):t,o=n?n(1):t,a=[this.offset(0,10),this.offset(1,10)],s=x.lli4(a[0],a[0].c,a[1],a[1].c);if(!s)throw new Error("cannot scale this curve. Try reducing it first.");var f=this.points,c=[];return[0,1].forEach(function(t){var n=c[t*r]=x.copy(f[t*r]);n.x+=(t?o:i)*a[t].n.x,n.y+=(t?o:i)*a[t].n.y}.bind(this)),n?([0,1].forEach(function(i){if(2!==this.order||!i){var o=f[i+1],a={x:o.x-s.x,y:o.y-s.y},x=n?n((i+1)/r):t;n&&!e&&(x=-x);var h=u(a.x*a.x+a.y*a.y);a.x/=h,a.y/=h,c[i+1]={x:o.x+x*a.x,y:o.y+x*a.y}}}.bind(this)),new l(c)):([0,1].forEach(function(t){if(2!==this.order||!t){var n=c[t*r],e=this.derivative(t),i={x:n.x+e.x,y:n.y+e.y};c[t+1]=x.lli4(n,i,s,f[t+1])}}.bind(this)),new l(c))},outline:function(t,r,n,e){function i(t,r,n,e,i){return function(o){var a=e/n,s=(e+i)/n,u=r-t;return x.map(o,0,1,t+a*u,t+s*u)}}r="undefined"==typeof r?t:r;var o,a=this.reduce(),s=a.length,u=[],f=[],c=0,l=this.length(),p="undefined"!=typeof n&&"undefined"!=typeof e;a.forEach(function(o){_=o.length(),p?(u.push(o.scale(i(t,n,l,c,_))),f.push(o.scale(i(-r,-e,l,c,_)))):(u.push(o.scale(t)),f.push(o.scale(-r))),c+=_}),f=f.map(function(t){return o=t.points,o[3]?t.points=[o[3],o[2],o[1],o[0]]:t.points=[o[2],o[1],o[0]],t}).reverse();var y=u[0].points[0],v=u[s-1].points[u[s-1].points.length-1],m=f[s-1].points[f[s-1].points.length-1],d=f[0].points[0],g=x.makeline(m,y),z=x.makeline(v,d),b=[g].concat(u).concat([z]).concat(f),_=b.length;return new h(b)},outlineshapes:function(t,r,n){r=r||t;for(var e=this.outline(t,r).curves,i=[],o=1,a=e.length;o<a/2;o++){var s=x.makeshape(e[o],e[a-o],n);s.startcap.virtual=o>1,s.endcap.virtual=o<a/2-1,i.push(s)}return i},intersects:function(t,r){return t?t.p1&&t.p2?this.lineIntersects(t):(t instanceof l&&(t=t.reduce()),this.curveintersects(this.reduce(),t,r)):this.selfintersects(r)},lineIntersects:function(t){var r=o(t.p1.x,t.p2.x),n=o(t.p1.y,t.p2.y),e=a(t.p1.x,t.p2.x),i=a(t.p1.y,t.p2.y),s=this;return x.roots(this.points,t).filter(function(t){var o=s.get(t);return x.between(o.x,r,e)&&x.between(o.y,n,i)})},selfintersects:function(t){var r,n,e,i,o=this.reduce(),a=o.length-2,s=[];for(r=0;r<a;r++)e=o.slice(r,r+1),i=o.slice(r+2),n=this.curveintersects(e,i,t),s=s.concat(n);return s},curveintersects:function(t,r,n){var e=[];t.forEach(function(t){r.forEach(function(r){t.overlaps(r)&&e.push({left:t,right:r})})});var i=[];return e.forEach(function(t){var r=x.pairiteration(t.left,t.right,n);r.length>0&&(i=i.concat(r))}),i},arcs:function(t){t=t||.5;var r=[];return this._iterate(t,r)},_error:function(t,r,n,e){var o=(e-n)/4,a=this.get(n+o),s=this.get(e-o),u=x.dist(t,r),f=x.dist(t,a),c=x.dist(t,s);return i(f-u)+i(c-u)},_iterate:function(t,r){var n,e=0,i=1;do{n=0,i=1;var o,a,s,u,f,c=this.get(e),h=!1,l=!1,p=i,y=1,v=0;do{l=h,u=s,p=(e+i)/2,v++,o=this.get(p),a=this.get(i),s=x.getccenter(c,o,a),s.interval={start:e,end:i};var m=this._error(s,c,e,i);if(h=m<=t,f=l&&!h,f||(y=i),h){if(i>=1){y=1,u=s;break}i+=(i-e)/2}else i=p}while(!f&&n++<100);if(n>=100){console.error("arc abstraction somehow failed...");break}u=u?u:s,r.push(u),e=y}while(i<1);return r}},t.exports=l}()},function(t,r,n){"use strict";!function(){var r=Math.abs,e=Math.cos,i=Math.sin,o=Math.acos,a=Math.atan2,s=Math.sqrt,u=Math.pow,f=function(t){return t<0?-u(-t,1/3):u(t,1/3)},c=Math.PI,x=2*c,h=c/2,l=1e-6,p=Number.MAX_SAFE_INTEGER,y=Number.MIN_SAFE_INTEGER,v={Tvalues:[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213],Cvalues:[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872],arcfn:function(t,r){var n=r(t),e=n.x*n.x+n.y*n.y;return"undefined"!=typeof n.z&&(e+=n.z*n.z),s(e)},between:function(t,r,n){return r<=t&&t<=n||v.approximately(t,r)||v.approximately(t,n)},approximately:function(t,n,e){return r(t-n)<=(e||l)},length:function(t){var r,n,e=.5,i=0,o=v.Tvalues.length;for(r=0;r<o;r++)n=e*v.Tvalues[r]+e,i+=v.Cvalues[r]*v.arcfn(n,t);return e*i},map:function(t,r,n,e,i){var o=n-r,a=i-e,s=t-r,u=s/o;return e+a*u},lerp:function(t,r,n){var e={x:r.x+t*(n.x-r.x),y:r.y+t*(n.y-r.y)};return r.z&&n.z&&(e.z=r.z+t*(n.z-r.z)),e},pointToString:function(t){var r=t.x+"/"+t.y;return"undefined"!=typeof t.z&&(r+="/"+t.z),r},pointsToString:function(t){return"["+t.map(v.pointToString).join(", ")+"]"},copy:function(t){return JSON.parse(JSON.stringify(t))},angle:function(t,r,n){var e=r.x-t.x,i=r.y-t.y,o=n.x-t.x,s=n.y-t.y,u=e*s-i*o,f=e*o+i*s;return a(u,f)},round:function(t,r){var n=""+t,e=n.indexOf(".");return parseFloat(n.substring(0,e+1+r))},dist:function(t,r){var n=t.x-r.x,e=t.y-r.y;return s(n*n+e*e)},closest:function(t,r){var n,e,i=u(2,63);return t.forEach(function(t,o){e=v.dist(r,t),e<i&&(i=e,n=o)}),{mdist:i,mpos:n}},abcratio:function(t,n){if(2!==n&&3!==n)return!1;if("undefined"==typeof t)t=.5;else if(0===t||1===t)return t;var e=u(t,n)+u(1-t,n),i=e-1;return r(i/e)},projectionratio:function(t,r){if(2!==r&&3!==r)return!1;if("undefined"==typeof t)t=.5;else if(0===t||1===t)return t;var n=u(1-t,r),e=u(t,r)+n;return n/e},lli8:function(t,r,n,e,i,o,a,s){var u=(t*e-r*n)*(i-a)-(t-n)*(i*s-o*a),f=(t*e-r*n)*(o-s)-(r-e)*(i*s-o*a),c=(t-n)*(o-s)-(r-e)*(i-a);return 0!=c&&{x:u/c,y:f/c}},lli4:function(t,r,n,e){var i=t.x,o=t.y,a=r.x,s=r.y,u=n.x,f=n.y,c=e.x,x=e.y;return v.lli8(i,o,a,s,u,f,c,x)},lli:function(t,r){return v.lli4(t,t.c,r,r.c)},makeline:function(t,r){var e=n(2),i=t.x,o=t.y,a=r.x,s=r.y,u=(a-i)/3,f=(s-o)/3;return new e(i,o,i+u,o+f,i+2*u,o+2*f,a,s)},findbbox:function(t){var r=p,n=p,e=y,i=y;return t.forEach(function(t){var o=t.bbox();r>o.x.min&&(r=o.x.min),n>o.y.min&&(n=o.y.min),e<o.x.max&&(e=o.x.max),i<o.y.max&&(i=o.y.max)}),{x:{min:r,mid:(r+e)/2,max:e,size:e-r},y:{min:n,mid:(n+i)/2,max:i,size:i-n}}},shapeintersections:function(t,r,n,e,i){if(!v.bboxoverlap(r,e))return[];var o=[],a=[t.startcap,t.forward,t.back,t.endcap],s=[n.startcap,n.forward,n.back,n.endcap];return a.forEach(function(r){r.virtual||s.forEach(function(e){if(!e.virtual){var a=r.intersects(e,i);a.length>0&&(a.c1=r,a.c2=e,a.s1=t,a.s2=n,o.push(a))}})}),o},makeshape:function(t,r,n){var e=r.points.length,i=t.points.length,o=v.makeline(r.points[e-1],t.points[0]),a=v.makeline(t.points[i-1],r.points[0]),s={startcap:o,forward:t,back:r,endcap:a,bbox:v.findbbox([o,t,r,a])},u=v;return s.intersections=function(t){return u.shapeintersections(s,s.bbox,t,t.bbox,n)},s},getminmax:function(t,r,n){if(!n)return{min:0,max:0};var e,i,o=p,a=y;n.indexOf(0)===-1&&(n=[0].concat(n)),n.indexOf(1)===-1&&n.push(1);for(var s=0,u=n.length;s<u;s++)e=n[s],i=t.get(e),i[r]<o&&(o=i[r]),i[r]>a&&(a=i[r]);return{min:o,mid:(o+a)/2,max:a,size:a-o}},align:function(t,r){var n=r.p1.x,o=r.p1.y,s=-a(r.p2.y-o,r.p2.x-n),u=function(t){return{x:(t.x-n)*e(s)-(t.y-o)*i(s),y:(t.x-n)*i(s)+(t.y-o)*e(s)}};return t.map(u)},roots:function(t,r){r=r||{p1:{x:0,y:0},p2:{x:1,y:0}};var n=t.length-1,i=v.align(t,r),a=function(t){return 0<=t&&t<=1};if(2===n){var u=i[0].y,c=i[1].y,h=i[2].y,l=u-2*c+h;if(0!==l){var p=-s(c*c-u*h),y=-u+c,m=-(p+y)/l,d=-(-p+y)/l;return[m,d].filter(a)}return c!==h&&0===l?[(2*c-h)/2*(c-h)].filter(a):[]}var g,m,z,b,_,E=i[0].y,w=i[1].y,M=i[2].y,k=i[3].y,l=-E+3*w-3*M+k,u=(3*E-6*w+3*M)/l,c=(-3*E+3*w)/l,h=E/l,i=(3*c-u*u)/3,S=i/3,O=(2*u*u*u-9*u*c+27*h)/27,T=O/2,j=T*T+S*S*S;if(j<0){var I=-i/3,A=I*I*I,N=s(A),L=-O/(2*N),C=L<-1?-1:L>1?1:L,U=o(C),F=f(N),P=2*F;return z=P*e(U/3)-u/3,b=P*e((U+x)/3)-u/3,_=P*e((U+2*x)/3)-u/3,[z,b,_].filter(a)}if(0===j)return g=T<0?f(-T):-f(T),z=2*g-u/3,b=-g-u/3,[z,b].filter(a);var G=s(j);return g=f(-T+G),m=f(T+G),[g-m-u/3].filter(a)},droots:function(t){if(3===t.length){var r=t[0],n=t[1],e=t[2],i=r-2*n+e;if(0!==i){var o=-s(n*n-r*e),a=-r+n,u=-(o+a)/i,f=-(-o+a)/i;return[u,f]}return n!==e&&0===i?[(2*n-e)/(2*(n-e))]:[]}if(2===t.length){var r=t[0],n=t[1];return r!==n?[r/(r-n)]:[]}},inflections:function(t){if(t.length<4)return[];var r=v.align(t,{p1:t[0],p2:t.slice(-1)[0]}),n=r[2].x*r[1].y,e=r[3].x*r[1].y,i=r[1].x*r[2].y,o=r[3].x*r[2].y,a=18*(-3*n+2*e+3*i-o),s=18*(3*n-e-3*i),u=18*(i-n);if(v.approximately(a,0)){if(!v.approximately(s,0)){var f=-u/s;if(0<=f&&f<=1)return[f]}return[]}var c=s*s-4*a*u,x=Math.sqrt(c),o=2*a;return v.approximately(o,0)?[]:[(x-s)/o,-(s+x)/o].filter(function(t){return 0<=t&&t<=1})},bboxoverlap:function(t,n){var e,i,o,a,s,u=["x","y"],f=u.length;for(e=0;e<f;e++)if(i=u[e],o=t[i].mid,a=n[i].mid,s=(t[i].size+n[i].size)/2,r(o-a)>=s)return!1;return!0},expandbox:function(t,r){r.x.min<t.x.min&&(t.x.min=r.x.min),r.y.min<t.y.min&&(t.y.min=r.y.min),r.z&&r.z.min<t.z.min&&(t.z.min=r.z.min),r.x.max>t.x.max&&(t.x.max=r.x.max),r.y.max>t.y.max&&(t.y.max=r.y.max),r.z&&r.z.max>t.z.max&&(t.z.max=r.z.max),t.x.mid=(t.x.min+t.x.max)/2,t.y.mid=(t.y.min+t.y.max)/2,t.z&&(t.z.mid=(t.z.min+t.z.max)/2),t.x.size=t.x.max-t.x.min,t.y.size=t.y.max-t.y.min,t.z&&(t.z.size=t.z.max-t.z.min)},pairiteration:function(t,r,n){var e=t.bbox(),i=r.bbox(),o=1e5,a=n||.5;if(e.x.size+e.y.size<a&&i.x.size+i.y.size<a)return[(o*(t._t1+t._t2)/2|0)/o+"/"+(o*(r._t1+r._t2)/2|0)/o];var s=t.split(.5),u=r.split(.5),f=[{left:s.left,right:u.left},{left:s.left,right:u.right},{left:s.right,right:u.right},{left:s.right,right:u.left}];f=f.filter(function(t){return v.bboxoverlap(t.left.bbox(),t.right.bbox())});var c=[];return 0===f.length?c:(f.forEach(function(t){c=c.concat(v.pairiteration(t.left,t.right,a))}),c=c.filter(function(t,r){return c.indexOf(t)===r}))},getccenter:function(t,r,n){var o,s=r.x-t.x,u=r.y-t.y,f=n.x-r.x,c=n.y-r.y,l=s*e(h)-u*i(h),p=s*i(h)+u*e(h),y=f*e(h)-c*i(h),m=f*i(h)+c*e(h),d=(t.x+r.x)/2,g=(t.y+r.y)/2,z=(r.x+n.x)/2,b=(r.y+n.y)/2,_=d+l,E=g+p,w=z+y,M=b+m,k=v.lli8(d,g,_,E,z,b,w,M),S=v.dist(k,t),O=a(t.y-k.y,t.x-k.x),T=a(r.y-k.y,r.x-k.x),j=a(n.y-k.y,n.x-k.x);return O<j?((O>T||T>j)&&(O+=x),O>j&&(o=j,j=O,O=o)):j<T&&T<O?(o=j,j=O,O=o):j+=x,k.s=O,k.e=j,k.r=S,k}};t.exports=v}()},function(t,r,n){"use strict";!function(){var r=n(3),e=function(t){this.curves=[],this._3d=!1,t&&(this.curves=t,this._3d=this.curves[0]._3d)};e.prototype={valueOf:function(){return this.toString()},toString:function(){return"["+this.curves.map(function(t){return r.pointsToString(t.points)}).join(", ")+"]"},addCurve:function(t){this.curves.push(t),this._3d=this._3d||t._3d},length:function(){return this.curves.map(function(t){return t.length()}).reduce(function(t,r){return t+r})},curve:function(t){return this.curves[t]},bbox:function t(){for(var n=this.curves,t=n[0].bbox(),e=1;e<n.length;e++)r.expandbox(t,n[e].bbox());return t},offset:function t(r){var t=[];return this.curves.forEach(function(n){t=t.concat(n.offset(r))}),new e(t)}},t.exports=e}()},function(t,r,n){"use strict";t.exports=n(6)},function(t,r,n){"use strict";var e=n(7),i=Math.abs,o=Math.min,a=Math.max,s=Math.acos,u=Math.sqrt,f=Math.PI,c={x:0,y:0,z:0},x=t.exports;x.order=function(t){return t.length-1},x.is3d=function(t){return"z"in t[0]},x.dims=function(t){return"z"in t[0]?["x","y","z"]:["x","y"]},x.dimlen=x.dimLen=function(t){return"z"in t[0]?3:2},x.isLinear=function(t,r){r=r||1e-4;for(var n=x.order(t),o=e.align(t,{p1:t[0],p2:t[n]}),a=0;a<o.length;a++)if(i(o[a].y)>r)return!1;return!0},x.getUtils=function(){return e},x.toSVG=function(t){if(x.is3d(t))return!1;for(var r=t,n=r[0].x,e=r[0].y,i=["M",n,e,3===r.length?"Q":"C"],o=1,a=r.length;o<a;o++)i.push(r[o].x),i.push(r[o].y);return i.join(" ")},x.derivativePoints=function(t){for(var r=[],n=x.is3d(t),e=t,i=e.length,o=i-1;i>1;i--,o--){for(var a,s=[],u=0;u<o;u++)a={x:o*(e[u+1].x-e[u].x),y:o*(e[u+1].y-e[u].y)},n&&(a.z=o*(e[u+1].z-e[u].z)),s.push(a);r.push(s),e=s}return r},x.computedirection=x.isClockwise=function(t){return e.angle(t[0],t[t.length-1],t[1])>0},x.length=function(t){return e.length(function(r){return x.derivative(t,r)})},x.getLUT=x.LUT=function(t,r){r=r||100;for(var n=[],e=0;e<=r;e++)n.push(x.compute(t,e/r));return n},x.on=x.crosses=function(t,r,n){n=n||5;for(var i,o=x.getLUT(t),a=[],s=0,u=0;u<o.length;u++)i=o[u],e.dist(i,r)<n&&(a.push(i),s+=u/o.length);return!!a.length&&(s/=a.length)},x.project=function(t,r){var n=x.getLUT(t),i=n.length-1,o=e.closest(n,r),a=o.mdist,s=o.mpos;if(0===s||s===i){var u=s/i,f=x.compute(t,u);return f.t=u,f.d=a,f}var c,u,h,l,p=(s-1)/i,y=(s+1)/i,v=.1/i;for(a+=1,u=p,c=u;u<y+v;u+=v)h=x.compute(t,u),l=e.dist(r,h),l<a&&(a=l,c=u);return h=x.compute(t,c),h.t=c,h.d=a,h},x.get=x.compute=function(t,r){if(0===r)return t[0];if(1===r)return t[t.length-1];var n=t,e=1-r,i=x.order(t),o=x.is3d(t);if(1===i)return p={x:e*n[0].x+r*n[1].x,y:e*n[0].y+r*n[1].y},o&&(p.z=e*n[0].z+r*n[1].z),p;if(i<4){var a,s,u,f=e*e,h=r*r,l=0;2===i?(n=[n[0],n[1],n[2],c],a=f,s=e*r*2,u=h):3===i&&(a=f*e,s=f*r*3,u=e*h*3,l=r*h);var p={x:a*n[0].x+s*n[1].x+u*n[2].x+l*n[3].x,y:a*n[0].y+s*n[1].y+u*n[2].y+l*n[3].y};return o&&(p.z=a*n[0].z+s*n[1].z+u*n[2].z+l*n[3].z),p}for(var y=t.map(function(t){return Object.assign({},t)});y.length>1;){for(var v=0;v<y.length-1;v++)y[v]={x:y[v].x+(y[v+1].x-y[v].x)*r,y:y[v].y+(y[v+1].y-y[v].y)*r},"undefined"!=typeof y[v].z&&(y[v]=y[v].z+(y[v+1].z-y[v].z)*r);y.splice(y.length-1,1)}return y[0]},x.raise=function(t){for(var r,n,e,i=t,o=[i[0]],a=i.length,r=1;r<a;r++)n=i[r],e=i[r-1],o[r]={x:(a-r)/a*n.x+r/a*e.x,y:(a-r)/a*n.y+r/a*e.y};return o[a]=i[a-1],o},x.derivative=function(t,r){var n,e,i=1-r,o=0,a=x.derivativePoints(t),s=x.order(t),u=a[0];2===s&&(u=[u[0],u[1],c],n=i,e=r),3===s&&(n=i*i,e=i*r*2,o=r*r);var f={x:n*u[0].x+e*u[1].x+o*u[2].x,y:n*u[0].y+e*u[1].y+o*u[2].y};return x.is3d(t)&&(f.z=n*u[0].z+e*u[1].z+o*u[2].z),f},x.inflections=function(t){return e.inflections(t)},x.normal=function(t,r){return x.is3d(t)?x.__normal3(t,r):x.__normal2(t,r)},x.__normal2=function(t,r){var n=x.derivative(t,r),e=u(n.x*n.x+n.y*n.y);return{x:-n.y/e,y:n.x/e}},x.__normal3=function(t,r){var n=x.derivative(t,r),e=x.derivative(t,r+.01),i=u(n.x*n.x+n.y*n.y+n.z*n.z),o=u(e.x*e.x+e.y*e.y+e.z*e.z);n.x/=i,n.y/=i,n.z/=i,e.x/=o,e.y/=o,e.z/=o;var a={x:e.y*n.z-e.z*n.y,y:e.z*n.x-e.x*n.z,z:e.x*n.y-e.y*n.x},s=u(a.x*a.x+a.y*a.y+a.z*a.z);a.x/=s,a.y/=s,a.z/=s;var f=[a.x*a.x,a.x*a.y-a.z,a.x*a.z+a.y,a.x*a.y+a.z,a.y*a.y,a.y*a.z-a.x,a.x*a.z-a.y,a.y*a.z+a.x,a.z*a.z],c={x:f[0]*n.x+f[1]*n.y+f[2]*n.z,y:f[3]*n.x+f[4]*n.y+f[5]*n.z,z:f[6]*n.x+f[7]*n.y+f[8]*n.z};return c},x.hull=function(t,r){var n,i=t,o=[],a=[],s=0,u=0,f=0;for(a[s++]=i[0],a[s++]=i[1],a[s++]=i[2],3===x.order(t)&&(a[s++]=i[3]);i.length>1;){for(o=[],u=0,f=i.length-1;u<f;u++)n=e.lerp(r,i[u],i[u+1]),a[s++]=n,o.push(n);i=o}return a},x.split=function(t,r,n){if(0===r&&n)return x.split(t,n).left;if(1===n)return x.split(t,r).right;var i=x.order(t),o=x.hull(t,r),a={left:2===i?[o[0],o[3],o[5]]:[o[0],o[4],o[7],o[9]],right:2===i?[o[5],o[4],o[2]]:[o[9],o[8],o[6],o[3]],span:o};if(a.left[0]=Object.assign({},a.left[0],{_t1:e.map(0,0,1,t[0]._t1||0,t[0]._t2||1),_t2:e.map(r,0,1,t[0]._t1||0,t[0]._t2||1)}),a.right[0]=Object.assign({},a.right[0],{_t1:e.map(r,0,1,t[0]._t1||0,t[0]._t2||1),_t2:e.map(1,0,1,t[0]._t1||0,t[0]._t2||1)}),!n)return a;n=e.map(n,r,1,0,1);var s=x.split(a.right,n);return s.left},x.extrema=function(t){var r,n,i=x.dims(t),o=x.order(t),a=x.derivativePoints(t),s={},u=[];return i.forEach(function(t){n=function(r){return r[t]},r=a[0].map(n),s[t]=e.droots(r),3===o&&(r=a[1].map(n),Array.prototype.push.apply(s[t],e.droots(r))),s[t]=s[t].filter(function(t){return t>=0&&t<=1}),Array.prototype.push.apply(u,s[t].sort())}),u=u.sort().filter(function(t,r){return u.indexOf(t)===r}),s.values=u,s},x.bbox=function(t){var r=x.extrema(t),n={},i=x.dims(t);return i.forEach(function(i){n[i]=e.getminmax(t,i,r[i])}),n},x.overlaps=function(t,r){var n=x.bbox(t),i=x.bbox(r);return e.bboxoverlap(n,i)},x.offset=function(t,r,n){if("undefined"!=typeof n){var e=x.compute(t,r),i=x.normal(t,r),o={c:e,n:i,x:e.x+i.x*n,y:e.y+i.y*n};return x.is3d(t)&&(o.z=e.z+i.z*n),o}if(x.isLinear(t)){var a=x.normal(t,0);return t.map(function(t){var n={x:t.x+r*a.x,y:t.y+r*a.y};return t.z&&i.z&&(n.z=t.z+r*a.z),n})}var s=x.reduce(t);return s.map(function(t){return x.scale(t,r)})},x.isSimple=function(t){if(3===x.order(t)){var r=e.angle(t[0],t[3],t[1]),n=e.angle(t[0],t[3],t[2]);if(r>0&&n<0||r<0&&n>0)return!1}var o=x.normal(t,0),a=x.normal(t,1),u=o.x*a.x+o.y*a.y;x.is3d(t)&&(u+=o.z*a.z);var c=i(s(u));return c<f/3},x.reduce=function(t){var r,n,o=0,a=0,s=.01,u=[],f=[],c=x.extrema(t).values;for(c.indexOf(0)===-1&&c.unshift(0),c.indexOf(1)===-1&&c.push(1),o=c[0],r=1;r<c.length;r++)a=c[r],n=x.split(t,o,a),n[0]._t1=o,n[0]._t2=a,u.push(n),o=a;return u.forEach(function(t){for(o=0,a=0;a<=1;)for(a=o+s;a<=1+s;a+=s)if(n=x.split(t,o,a),!x.isSimple(n)){if(a-=s,i(o-a)<s)return[];n=x.split(t,o,a),n[0]._t1=e.map(o,0,1,t[0]._t1||0,t[0]._t2||1),n[0]._t2=e.map(a,0,1,t[0]._t1||0,t[0]._t2||1),f.push(n),o=a;break}o<1&&(n=x.split(t,o,1),n[0]._t1=e.map(o,0,1,t[0]._t1||0,t[0]._t2||1),n[0]._t2=t[0]._t2||1,f.push(n))}),f},x.scale=function(t,r){var n=x.order(t),i=!1;if("function"==typeof r&&(i=r),i&&2===n)return x.scale(x.raise(t),i);var o=x.isClockwise(t),a=i?i(0):r,s=i?i(1):r,f=[x.offset(t,0,10),x.offset(t,1,10)],c=e.lli4(f[0],f[0].c,f[1],f[1].c);if(!c)throw new Error("cannot scale this curve. Try reducing it first.");var h=[];return[0,1].forEach(function(r){var e=h[r*n]=Object.assign({},t[r*n]);e.x+=(r?s:a)*f[r].n.x,e.y+=(r?s:a)*f[r].n.y}),i?([0,1].forEach(function(e){if(2!==n||!e){var a=t[e+1],s={x:a.x-c.x,y:a.y-c.y},f=i?i((e+1)/n):r;i&&!o&&(f=-f);var x=u(s.x*s.x+s.y*s.y);s.x/=x,s.y/=x,h[e+1]={x:a.x+f*s.x,y:a.y+f*s.y}}}),h):([0,1].forEach(function(r){if(2!==n||!r){var i=h[r*n],o=x.derivative(t,r),a={x:i.x+o.x,y:i.y+o.y};h[r+1]=e.lli4(i,a,c,t[r+1])}}),h)},x.outline=function(t,r,n,i,o){function a(t,r,n,i,o){return function(a){var s=i/n,u=(i+o)/n,f=r-t;return e.map(a,0,1,t+s*f,t+u*f)}}n="undefined"==typeof n?r:n;var s=x.reduce(t),u=s.length,f=[],c=[],h=0,l=x.length(t),p="undefined"!=typeof i&&"undefined"!=typeof o;s.forEach(function(t){var e=x.length(t);p?(f.push(x.scale(t,a(r,i,l,h,e))),c.push(x.scale(t,a(-n,-o,l,h,e)).reverse())):(f.push(x.scale(t,r)),c.push(x.scale(t,-n).reverse())),h+=e}),c.reverse();var y=f[0][0],v=f[u-1][f[u-1].length-1],m=c[u-1][c[u-1].length-1],d=c[0][0],g=e.makeline(m,y),z=e.makeline(v,d),b=[].concat([g],f,[z],c);return b},x.outlineshapes=x.outlineShapes=function(t,r,n,i){n=n||r;for(var o=x.outline(t,r,n),a=[],s=1,u=o.length;s<u/2;s++){var f=e.makeshape(o[s],o[u-s],i);f.startcap[0]=Object.assign({},f.startcap[0],{virtual:s>1}),f.endcap[0]=Object.assign({},f.endcap[0],{virtual:s<u/2-1}),a.push(f)}return a},x.intersects=function(t,r,n){return r?r.p1&&r.p2?x.lineIntersects(t,r):this.curveIntersects(x.reduce(t),x.reduce(r),n):x.selfIntersects(t,n)},x.lineIntersects=function(t,r){var n=o(r.p1.x,r.p2.x),i=o(r.p1.y,r.p2.y),s=a(r.p1.x,r.p2.x),u=a(r.p1.y,r.p2.y);return e.roots(t,r).filter(function(r){var o=x.compute(t,r);return e.between(o.x,n,s)&&e.between(o.y,i,u)})},x.selfintersects=x.selfIntersects=function(t,r){var n,e,i,o,a=x.reduce(t),s=a.length-2,u=[];for(n=0;n<s;n++)i=a.slice(n,n+1),o=a.slice(n+2),e=x.curveIntersects(i,o,r),Array.prototype.push.apply(u,e);return u},x.curveintersects=x.curveIntersects=function(t,r,n){var i=[];t.forEach(function(t){r.forEach(function(r){x.overlaps(t,r)&&i.push({left:t,right:r})})});var o=[];return i.forEach(function(t){var r=e.pairiteration(t.left,t.right,n);r.length>0&&Array.prototype.push.apply(o,r)}),o},x.arcs=function(t,r){r=r||.5;var n=[];return x._iterate(t,r,n)},x._error=function(t,r,n,o,a){var s=(a-o)/4,u=x.compute(t,o+s),f=x.compute(t,a-s),c=e.dist(r,n),h=e.dist(r,u),l=e.dist(r,f);return i(h-c)+i(l-c)},x._iterate=function(t,r,n){var i,o=0,a=1;do{i=0,a=1;var s,u,f,c,h,l=x.compute(t,o),p=!1,y=!1,v=a,m=1,d=0;do{y=p,c=f,v=(o+a)/2,d++,s=x.compute(v),u=x.compute(a),f=e.getccenter(l,s,u),f.interval={start:o,end:a};var g=x._error(t,f,l,o,a);if(p=g<=r,h=y&&!p,h||(m=a),p){if(a>=1){m=1,c=f;break}a+=(a-o)/2}else a=v}while(!h&&i++<100);if(i>=100){console.error("arc abstraction somehow failed...");break}c=c?c:f,n.push(c),o=m}while(a<1);return n},x.reverse=function(t){var r=t.concat().reverse(),n=Object.keys(t[0]);if(n.length!==x.dimLen(t)){var e=x.order(t),i=r[0]=Object.assign({},t[e]),o=r[t.length-1]={};n.forEach(function(r){var n=t[0][r];"x"===r||"y"===r||"z"===r?o[r]=n:"_t1"===r||"_t2"===r?i["_t1"===r?"_t2":"_t1"]=1-n:i[r]=n})}return r}},function(t,r,n){"use strict";var e=n(6),i=n(3),o=Number.MAX_SAFE_INTEGER,a=Number.MIN_SAFE_INTEGER,s=t.exports;["Tvalues","Cvalues","arcfn","between","approximately","length","map","lerp","pointToString","pointsToString","copy","angle","round","dist","closest","abcratio","projectionratio","lli8","lli4","lli"].forEach(function(t){s[t]=i[t]}),s.makeline=function(t,r){var n=t.x,e=t.y,i=r.x,o=r.y,a=(i-n)/3,s=(o-e)/3;return[{x:n,y:e},{x:n+a,y:e+s},{x:n+2*a,y:e+2*s},{x:i,y:o}]},s.findbbox=function(t){var r=o,n=o,i=a,s=a;return t.forEach(function(t){var o=e.bbox(t);r>o.x.min&&(r=o.x.min),n>o.y.min&&(n=o.y.min),i<o.x.max&&(i=o.x.max),s<o.y.max&&(s=o.y.max)}),{x:{min:r,mid:(r+i)/2,max:i,size:i-r},y:{min:n,mid:(n+s)/2,max:s,size:s-n}}},s.shapeintersections=function(t,r,n,i,o){if(!s.bboxoverlap(r,i))return[];var a=[],u=[t.startcap,t.forward,t.back,t.endcap],f=[n.startcap,n.forward,n.back,n.endcap];return u.forEach(function(r){r[0].virtual||f.forEach(function(i){if(!i[0].virtual){var s=e.intersects(r,i,o);s.length>0&&(s.c1=r,s.c2=i,s.s1=t,s.s2=n,a.push(s))}})}),a},s.makeshape=function(t,r,n){var e=r.length,i=t.length,o=s.makeline(r[e-1],t[0]),a=s.makeline(t[i-1],r[0]),u={startcap:o,forward:t,back:r,endcap:a,bbox:s.findbbox([o,t,r,a])};return u.intersections=function(t){return s.shapeintersections(u,u.bbox,t,t.bbox,n)},u},s.getminmax=function(t,r,n){if(!n)return{min:0,max:0};var i,s,u=o,f=a,c=Array.from(n);c.indexOf(0)===-1&&(c=[0].concat(c)),c.indexOf(1)===-1&&c.push(1);for(var x=0,h=c.length;x<h;x++)i=c[x],s=e.compute(t,i),s[r]<u&&(u=s[r]),s[r]>f&&(f=s[r]);return{min:u,mid:(u+f)/2,max:f,size:f-u}},["align","roots","droots","inflections","bboxoverlap"].forEach(function(t){s[t]=i[t]}),s.expandbox=function(t,r){var n={x:{min:Math.min(r.x.min,t.x.min),max:Math.max(r.x.max,t.x.max),mid:(t.x.min+t.x.max)/2,size:t.x.max-t.x.min},y:{min:Math.min(r.y.min,t.y.min),max:Math.max(r.y.max,t.y.max),mid:(t.y.min+t.y.max)/2,size:t.y.max-t.y.min}};return r.z&&(n.z={min:Math.min(r.z.min,t.z.min),max:Math.max(r.z.max,t.z.max),mid:(t.z.min+t.z.max)/2,size:t.z.max-t.z.min}),n},s.pairiteration=function(t,r,n){var i=e.bbox(t),o=e.bbox(r),a=1e5,u=n||.5;if(i.x.size+i.y.size<u&&o.x.size+o.y.size<u)return[(a*((t[0]._t1||0)+(t[0]._t2||1))/2|0)/a+"/"+(a*((r[0]._t1||0)+(r[0]._t2||1))/2|0)/a];var f=e.split(t,.5),c=e.split(r,.5),x=[{left:f.left,right:c.left},{left:f.left,right:c.right},{left:f.right,right:c.right},{left:f.right,right:c.left}];x=x.filter(function(t){return s.bboxoverlap(e.bbox(t.left),e.bbox(t.right))});var h=[];return 0===x.length?h:(x.forEach(function(t){h=h.concat(s.pairiteration(t.left,t.right,u));
}),h=h.filter(function(t,r){return h.indexOf(t)===r}))},s.getccenter=i.getccenter}]);