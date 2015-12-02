//TODO: DRY (関数による整理）, 近い色のリスト表示(colorname, hex3, websafecolor), HSV/HSL color circle (Hue の表示), 色見本, 履歴, touchstart, touchmove, touchend によるイベント制御
'use strict';
var names = {
	black:'#000000', dimgray:'#696969', dimgrey:'#696969', gray:'#808080',
	grey:'#808080', darkgray:'#a9a9a9', darkgrey:'#a9a9a9', silver:'#c0c0c0',
	lightgray:'#d3d3d3', lightgrey:'#d3d3d3', gainsboro:'#dcdcdc', whitesmoke:'#f5f5f5',
	white:'#ffffff', aliceblue:'#f0f8ff', antiquewhite:'#faebd7', aqua:'#00ffff',
	aquamarine:'#7fffd4', azure:'#f0ffff', beige:'#f5f5dc', bisque:'#ffe4c4',
	blanchedalmond:'#ffebcd', blue:'#0000ff', blueviolet:'#8a2be2', brown:'#a52a2a',
	burlywood:'#deb887', cadetblue:'#5f9ea0', chartreuse:'#7fff00', chocolate:'#d2691e',
	coral:'#ff7f50', cornflowerblue:'#6495ed', cornsilk:'#fff8dc', crimson:'#dc143c',
	cyan:'#00ffff', darkblue:'#00008b', darkcyan:'#008b8b', darkgoldenrod:'#b8860b',
	darkgreen:'#006400', darkkhaki:'#bdb76b', darkmagenta:'#8b008b', darkolivegreen:'#556b2f',
	darkorange:'#ff8c00', darkorchid:'#9932cc', darkred:'#8b0000', darksalmon:'#e9967a',
	darkseagreen:'#8fbc8f', darkslateblue:'#483d8b', darkslategray:'#2f4f4f', darkslategrey:'#2f4f4f',
	darkturquoise:'#00ced1', darkviolet:'#9400d3', deeppink:'#ff1493', deepskyblue:'#00bfff',
	dodgerblue:'#1e90ff', firebrick:'#b22222', floralwhite:'#fffaf0', forestgreen:'#228b22',
	fuchsia:'#ff00ff', ghostwhite:'#f8f8ff', gold:'#ffd700', goldenrod:'#daa520',
	green:'#008000', greenyellow:'#adff2f', honeydew:'#f0fff0', hotpink:'#ff69b4',
	indianred:'#cd5c5c', indigo:'#4b0082', ivory:'#fffff0', khaki:'#f0e68c',
	lavender:'#e6e6fa', lavenderblush:'#fff0f5', lawngreen:'#7cfc00', lemonchiffon:'#fffacd',
	lightblue:'#add8e6', lightcoral:'#f08080', lightcyan:'#e0ffff', lightgoldenrodyellow:'#fafad2',
	lightgreen:'#90ee90', lightpink:'#ffb6c1', lightsalmon:'#ffa07a', lightseagreen:'#20b2aa',
	lightskyblue:'#87cefa', lightslategray:'#778899', lightslategrey:'#778899', lightsteelblue:'#b0c4de',
	lightyellow:'#ffffe0', lime:'#00ff00', limegreen:'#32cd32', linen:'#faf0e6',
	magenta:'#ff00ff', maroon:'#800000', mediumaquamarine:'#66cdaa', mediumblue:'#0000cd',
	mediumorchid:'#ba55d3', mediumpurple:'#9370db', mediumseagreen:'#3cb371', mediumslateblue:'#7b68ee',
	mediumspringgreen:'#00fa9a', mediumturquoise:'#48d1cc', mediumvioletred:'#c71585', midnightblue:'#191970',
	mintcream:'#f5fffa', mistyrose:'#ffe4e1', moccasin:'#ffe4b5', navajowhite:'#ffdead',
	navy:'#000080', oldlace:'#fdf5e6', olive:'#808000', olivedrab:'#6b8e23',
	orange:'#ffa500', orangered:'#ff4500', orchid:'#da70d6', palegoldenrod:'#eee8aa',
	palegreen:'#98fb98', paleturquoise:'#afeeee', palevioletred:'#db7093', papayawhip:'#ffefd5',
	peachpuff:'#ffdab9', peru:'#cd853f', pink:'#ffc0cb', plum:'#dda0dd',
	powderblue:'#b0e0e6', purple:'#800080', red:'#ff0000', rosybrown:'#bc8f8f',
	royalblue:'#4169e1', saddlebrown:'#8b4513', salmon:'#fa8072', sandybrown:'#f4a460',
	seagreen:'#2e8b57', seashell:'#fff5ee', sienna:'#a0522d', skyblue:'#87ceeb',
	slateblue:'#6a5acd', slategray:'#708090', slategrey:'#708090', snow:'#fffafa',
	springgreen:'#00ff7f', steelblue:'#4682b4', tan:'#d2b48c', teal:'#008080',
	thistle:'#d8bfd8', tomato:'#ff6347', turquoise:'#40e0d0', violet:'#ee82ee',
	wheat:'#f5deb3', yellow:'#ffff00', yellowgreen:'#9acd32'
};
var barr = $('barr');
var barg = $('barg');
var barb = $('barb');
var barv = $('barv');
var bars = $('bars');
var xlabel = $('xlabel');
var ylabel = $('ylabel');
var sample = $('sample');
var colorname = $('colorname');
var rgbr = $('rgbr');
var rgbg = $('rgbg');
var rgbb = $('rgbb');
var brightness = $('brightness');
var saturation = $('saturation');
var color = $('color');
var downstart = false;

var rgbplane = $('rgbplane');
var axisr = $('axisr');
var axisg = $('axisg');
var axisb = $('axisb');
rgbplane.addEventListener('mousedown', function (e) {planedown(e)}, false);
rgbplane.addEventListener('touchstart', function (e) {planedown(e)}, false);
rgbplane.addEventListener('mouseup', mouseup, false);
rgbplane.addEventListener('mouseout', mouseup, false);
rgbplane.addEventListener('mousemove', function (e) {planemove(e)}, false);
rgbplane.addEventListener('touchmove', function (e) {planemove(e)}, false);
axisr.addEventListener('click', rgbdraw, false);
axisg.addEventListener('click', rgbdraw, false);
axisb.addEventListener('click', rgbdraw, false);
(function(){
	var bar = [barr, barg, barb, barv, bars];
	for(var i=0; i<bar.length; i++) {
		bar[i].addEventListener('mouseup', mouseup, false);
		bar[i].addEventListener('mouseout', mouseup, false);
	}
}());
barr.addEventListener('mousedown', function (e) {bardown(e,0)}, false);
barr.addEventListener('touchstart', function (e) {bardown(e,0)}, false);
barr.addEventListener('mousemove', function (e) {barmove(e,0)}, false);
barr.addEventListener('touchmove', function (e) {barmove(e,0)}, false);
barg.addEventListener('mousedown', function (e) {bardown(e,1)}, false);
barg.addEventListener('touchstart', function (e) {bardown(e,1)}, false);
barg.addEventListener('mousemove', function (e) {barmove(e,1)}, false);
barg.addEventListener('touchmove', function (e) {barmove(e,1)}, false);
barb.addEventListener('mousedown', function (e) {bardown(e,2)}, false);
barb.addEventListener('touchstart', function (e) {bardown(e,2)}, false);
barb.addEventListener('mousemove', function (e) {barmove(e,2)}, false);
barb.addEventListener('touchmove', function (e) {barmove(e,2)}, false);
barv.addEventListener('mousedown', function (e) {bardown(e,3)}, false);
barv.addEventListener('touchstart', function (e) {bardown(e,3)}, false);
barv.addEventListener('mousemove', function (e) {barmove(e,3)}, false);
barv.addEventListener('touchmove', function (e) {barmove(e,3)}, false);
bars.addEventListener('mousedown', function (e) {bardown(e,4)}, false);
bars.addEventListener('touchstart', function (e) {bardown(e,4)}, false);
bars.addEventListener('mousemove', function (e) {barmove(e,4)}, false);
bars.addEventListener('touchmove', function (e) {barmove(e,4)}, false);
function target (c,x,y) {
	var fg, bg;
	if (Number(rgbr.value)+2*Number(rgbg.value)+Number(rgbb.value) < 512) {
		fg = 'rgba(255,255,255,1)';
	   	bg = 'rgba(0,0,0,1)';
	} else {
	   	fg = 'rgba(0,0,0,1)';
		bg = 'rgba(255,255,255,1)';
	}
	c.beginPath();
	c.arc(x,y,6,0,Math.PI*2.0,true);
	c.closePath();
	c.lineWidth = 2;
	c.strokeStyle = bg;
	c.stroke();
	c.beginPath();
	c.arc(x,y,4,0,Math.PI*2.0,true);
	c.closePath();
	c.lineWidth = 2;
	c.strokeStyle = fg;
	c.stroke();
}
function rgbdraw (r,g,b) {
	if (!r || !g || !b) {
		r = rgbr.value;
		g = rgbg.value;
		b = rgbb.value;
	}
	r = Number(r);
	g = Number(g);
	b = Number(b);
	// plane
	var ctx = rgbplane.getContext("2d");
	var imgdata = ctx.createImageData(256, 256);
	var data = imgdata.data;
	var pxl = 0;
	var zi, xi, yi, z;
	var v = [r, g, b];
	if (axisr.checked) {
		zi = 0, xi= 1, yi = 2, z = r;
		xlabel.innerHTML = 'G';
		ylabel.innerHTML = 'B';
	} else if (axisg.checked) {
		zi = 1, xi= 2, yi = 0, z = g;
		xlabel.innerHTML = 'B';
		ylabel.innerHTML = 'R';
	} else {
		zi = 2, xi= 0, yi = 1, z = b;
		xlabel.innerHTML = 'R';
		ylabel.innerHTML = 'G';
	}
	for (var y = 0; y < 256; y++) {
		for (var x = 0; x < 256; x++) {
			data[pxl + zi] = z;
			data[pxl + xi] = x;
			data[pxl + yi] = y;
			data[pxl + 3] = 255;
			pxl += 4;
		}
	}
	ctx.putImageData(imgdata, 0, 0);
	target(ctx,v[xi],v[yi]);
	// bar R, G, B
	var bar = [barr, barg, barb];
	for (var i=0; i<3; i++) {
		yi = (i+1)%3;
		zi = (i+2)%3;
		ctx = bar[i].getContext("2d");
		imgdata = ctx.createImageData(256, 12);
		data = imgdata.data;
		pxl = 0;
		for (y = 0; y < 12; y++) {
			for (x = 0; x < 256; x++) {
				data[pxl + i] = x;
				data[pxl + yi] = v[yi];
				data[pxl + zi] = v[zi];
				data[pxl + 3] = 255;
				pxl += 4;
			}
		}
		ctx.putImageData(imgdata, 0, 0);
		target(ctx,v[i],6);
	}
	// bar V
	ctx = barv.getContext("2d");
	imgdata = ctx.createImageData(256, 12);
	data = imgdata.data;
	pxl = 0;
	v = Math.max(r, g, b);
	for (y = 0; y < 12; y++) {
		for (x = 0; x < 256; x++) {
			data[pxl + 0] = (v == 0 ? x : r*x/v);
			data[pxl + 1] = (v == 0 ? x : g*x/v);
			data[pxl + 2] = (v == 0 ? x : b*x/v);
			data[pxl + 3] = 255;
			pxl += 4;
		}
	}
	ctx.putImageData(imgdata, 0, 0);
	target(ctx,v,6);
	// bar S
	ctx = bars.getContext("2d");
	imgdata = ctx.createImageData(256, 12);
	data = imgdata.data;
	pxl = 0;
	var s = Math.max(r, g, b) - Math.min(r, g, b);
	for (y = 0; y < 12; y++) {
		for (x = 0; x < 256; x++) {
			data[pxl + 0] = (v==0 ? 0 : (s==0 ? v : v*(1-(v-r)*x/s/255)));
			data[pxl + 1] = (v==0 ? 0 : (s==0 ? v : v*(1-(v-g)*x/s/255)));
			data[pxl + 2] = (v==0 ? 0 : (s==0 ? v : v*(1-(v-b)*x/s/255)));
			data[pxl + 3] = 255;
			pxl += 4;
		}
	}
	ctx.putImageData(imgdata, 0, 0);
	target(ctx,s*255/v,6);
}
function rgbset (r,g,b) {
	r = Number(r);
	g = Number(g);
	b = Number(b);
	rgbr.value = r;
	rgbg.value = g;
	rgbb.value = b;
	brightness.value = Math.max(r, g, b);
	saturation.value = (Math.max(r, g, b) - Math.min(r, g, b))/brightness.value;
	rgbdraw(r,g,b);
	color.value = '#' + ('0'+r.toString(16)).slice(-2) + ('0'+g.toString(16)).slice(-2) + ('0'+b.toString(16)).slice(-2);
}
function drawbox () {
	sample.setAttribute('fill', color.value);
	colorname.value = '';
	for (var key in names) {
		if (color.value == names[key]) {
			colorname.value = key;
			break;
		} else if (color.value == key) {
			colorname.value = key;
			color.value = names[key];
			rgbset(parseInt(color.value.slice(1,3), 16), parseInt(color.value.slice(3,5), 16), parseInt(color.value.slice(5,7), 16));
			break;
		}
	}
	$('boxname1').textContent = colorname.value;
	$('boxname2').textContent = color.value;
	if (Number(rgbr.value)+2*Number(rgbg.value)+Number(rgbb.value) < 512) {
		$('boxnames').setAttribute('fill', 'white');
	} else {
		$('boxnames').setAttribute('fill', 'black');
	}
}
function posX(e) {
	var rect = e.target.getBoundingClientRect();
	var p = (e.touches ? e.touches[0] : e);
	return Math.min(255, p.clientX-Math.floor(rect.left));
}
function posY(e) {
	var rect = e.target.getBoundingClientRect();
	var p = (e.touches ? e.touches[0] : e);
	return Math.min(255, p.clientY-Math.floor(rect.top));
}
function planedown(e) { downstart = true; planemove(e) }
function mouseup() { downstart = false; }
function planemove (e) {
	e.preventDefault();
	if(downstart){
		if (axisr.checked) {
			rgbset(rgbr.value, posX(e), posY(e));
		} else if (axisg.checked) {
			rgbset(posY(e), rgbg.value, posX(e));
		} else {
			rgbset(posX(e), posY(e), rgbb.value);
		}
		drawbox();
	}
}
function bardown(e,c) { downstart = true; barmove(e,c) }
function barmove(e,c) {
	e.preventDefault();
	if(downstart){
		if(c==0){
			rgbset(posX(e), rgbg.value, rgbb.value);
		} else if(c==1) {
			rgbset(rgbr.value, posX(e), rgbb.value);
		} else if(c==2){
			rgbset(rgbr.value, rgbg.value, posX(e));
		} else {
			var r = Number(rgbr.value);
			var g = Number(rgbg.value);
			var b = Number(rgbb.value);
			var x = posX(e);
			if(c==3){
				if(Math.max(r, g, b) == 0) {
					rgbset(x, x, x);
				} else {
					x /= Math.max(r, g, b);
					rgbset(Math.round(r*x), Math.round(g*x), Math.round(b*x));
				}
			} else{
				x /= 255;
				var v = Math.max(r, g, b);
				var s = Math.max(r, g, b) - Math.min(r, g, b);
				if(s == 0 || v == 0) {
					rgbset(v, v, v);
				} else {
					r = Math.round(v*(1-(v-r)*x/s));
					g = Math.round(v*(1-(v-g)*x/s));
					b = Math.round(v*(1-(v-b)*x/s));
					rgbset(r, g, b);
				}
			}
		}
		drawbox();
	}
}
function vset(x) {
	var r = Number(rgbr.value);
	var g = Number(rgbg.value);
	var b = Number(rgbb.value);
	if(Math.max(r, g, b) == 0) {
		rgbset(x, x, x);
	} else {
		x /= Math.max(r, g, b);
		rgbset(Math.round(r*x), Math.round(g*x), Math.round(b*x));
	}
	drawbox();
}
function sset(x) {
	var r = Number(rgbr.value);
	var g = Number(rgbg.value);
	var b = Number(rgbb.value);
	var v = Math.max(r, g, b);
	var s = Math.max(r, g, b) - Math.min(r, g, b);
	if(s == 0 || v == 0) {
		rgbset(v, v, v);
	} else {
		r = Math.round(v*(1-(v-r)*x/s));
		g = Math.round(v*(1-(v-g)*x/s));
		b = Math.round(v*(1-(v-b)*x/s));
		rgbset(r, g, b);
	}
	drawbox();
}
function rawv(v) {
	return Math.max(Math.min(Math.floor(v), 255), 0);
}
rgbr.addEventListener('change', function () {
	rgbset(rawv(this.value), rgbg.value, rgbb.value);
	drawbox();
}, false);
rgbg.addEventListener('change', function () {
	rgbset(rgbr.value, rawv(this.value), rgbb.value);
	drawbox();
}, false);
rgbb.addEventListener('change', function () {
	rgbset(rgbr.value, rgbg.value, rawv(this.value));
	drawbox();
}, false);
brightness.addEventListener('change', function () {
	vset(rawv(this.value));
}, false);
saturation.addEventListener('change', function () {
	sset(Math.max(Math.min(this.value, 1), 0));
}, false);
function changecolor() {
	var rgb = color.value.toLowerCase();
	var r, g, b;
	if (/^#[0-9a-f]{3}$/.test(rgb)) {
		r = rgb.slice(1,2)
		g = rgb.slice(2,3)
		b = rgb.slice(3,4)
		rgb = '#' + r + r + g + g + b + b;
	}
	color.value = rgb;
	drawbox();
	rgb = color.value;
	if (/^#[0-9a-f]{6}$/.test(rgb)) {
		rgbset(parseInt(rgb.slice(1,3), 16), parseInt(rgb.slice(3,5), 16), parseInt(rgb.slice(5,7), 16));
	}
}
colorname.addEventListener('change', function () {
	color.value = this.value;
	changecolor();
}, false);
color.addEventListener('change', function () {
	changecolor();
}, false);
rgbdraw(0,0,0);
var tag = "";
for (var key in names) {
	tag += '<option' + (key=='black' ? ' selected="selected">' : '>') + key + '</option>';
}
setI('colorname',tag);
