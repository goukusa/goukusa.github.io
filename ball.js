var ctx, cW, cH, mouse;
var play = 0;
var p = {x:0,y:0};//座標
var v = {x:0,y:0};//変化量
var r = 15;//ボールの半径
var mr = 4;//マウス点の半径
var k = 20;//定数
var timer;//タイマー
var delay = 15;//タイマーを実行する間隔
var c0 = 'rgba(255,255,255,1)';//マウス色
var c1 = 'rgba(0,255,255,1)';//ボール色1
var c2 = 'rgba(255,0,255,1)';//ボール色2
var color = c1;
var touch = {x:0,y:0};//タッチ座標

window.onload = function(){
	init();
	loop();
}
function init(){
	//コンテキストの取得
	var canvas = document.getElementById("can");
	if(!canvas || !canvas.getContext) return false;
	ctx = canvas.getContext("2d");
	cW = canvas.width;
	cH = canvas.height;
	play = 0;
	p = {x:cW/2,y:cH/2};
	v = {x:0,y:0};
	mouse = {x:cW/2,y:cH/2};
	canvas.addEventListener("mousemove", mouseMoveListener, false);
	canvas.addEventListener("mouseout", mouseOutListener, false);
	canvas.addEventListener("mousedown", mouseDownListener, false);
	canvas.addEventListener("mouseup", mouseUpListener, false);
	canvas.addEventListener("touchstart", touchDownListener, false);
	canvas.addEventListener("touchmove", touchMoveListener, false);
	canvas.addEventListener("touchend", touchEndListener, false);
	//canvas.addEventListener("touchcancel", mouseUpListener, false);
	//q = document.getElementById('q');
	//q.addEventListener('change', function () {k = this.value * 1; kqq.innerHTML = k;}, false);
	pp = document.getElementById('pp');

}
//マウスイベント
//canvas.onmousemove = mouseMoveListener;
function mouseMoveListener(e) {
	if (play == 1) {
		var rect = e.target.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	}
	//return mouse;
}
function touchMoveListener(e) {
	if (play == 1) {
		var rect = e.target.getBoundingClientRect();
		e.preventDefault();
		mouse.x = e.touches[0].clientX - rect.left;
		mouse.y = e.touches[0].clientY - rect.top;
	}
	//return mouse;
}
function mouseOutListener(e) {
	if (play == 1) {
		mouse.x = -1;
		mouse.y = -1;
		pp.value="restart";
		play = 0;
	}
	//return mouse;
}
function mouseDownListener(e) {
	var rect = e.target.getBoundingClientRect();
	e.preventDefault();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
	var d = Math.pow(mouse.x - p.x, 2) + Math.pow(mouse.y - p.y, 2);
	if (d < r*r && (v.x != 0 || v.y != 0)) {
		if (play == 1) {k = -1 * k;}
		v.x = 0;
		v.y = 0;
	}
	if (play == 0) {
		k = -1 * k;
		resume();
	}
}
function touchDownListener(e) {
	var rect = e.target.getBoundingClientRect();
	e.preventDefault();
	mouse.x = e.touches[0].clientX - rect.left;
	mouse.y = e.touches[0].clientY - rect.top;
	touch.x = mouse.x
	touch.y = mouse.y
	var d = Math.pow(mouse.x - p.x, 2) + Math.pow(mouse.y - p.y, 2);
	if (d < r*r && (v.x != 0 || v.y != 0)) {
		k = -1 * k;
		v.x = 0;
		v.y = 0;
	}
	if (play == 0) {
		resume();
	}
}
function mouseUpListener(e) {
	k = -1 * k;
	if(k > 0) {color = c1;} else {color = c2;}
}
function touchEndListener(e) {
	if (mouse.x == touch.x && mouse.y == touch.y) {
		k = -1 * k;
		if(k > 0) {color = c1;} else {color = c2;}
	}
}

//描画処理を行う関数。loop()関数の中で呼び出す。
function draw(){
	//一度canvasをクリア
	//ctx.clearRect(0,0,cW,cH);
	//残像をつける
	//ctx.beginPath();
	ctx.fillStyle = 'rgba(0,0,0,0.75)';
	ctx.fillRect(0,0,cW,cH);
	//ctx.closePath();
	//ボールを描画
	ctx.beginPath();
	ctx.arc(p.x,p.y,r,0,Math.PI*2.0,true);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
	//マウス位置に点を描く
	if (mouse.x >= 0 && mouse.x <= cW && mouse.y >= 0 && mouse.y <= cH){
		ctx.beginPath();
		ctx.arc(mouse.x,mouse.y,mr,0,Math.PI*2.0,true);
		ctx.closePath();
		ctx.fillStyle = c0;
		ctx.fill();
	}
}

//繰り返し描画を行う関数。
function loop(){
	//加速度を計算してvを変化させる
	if (mouse.x >= 0 && mouse.x <= cW && mouse.y >= 0 && mouse.y <= cH){
		var d = (mouse.x - p.x) * (mouse.x - p.x) + (mouse.y - p.y) * (mouse.y - p.y);
		if (d > r*r){
		//if (d>Math.pow(mr-1,2)) {
			v.x = v.x + (mouse.x - p.x) * k/d;
			v.y = v.y + (mouse.y - p.y) * k/d;
		} else if (d>Math.pow(mr-1,2)) {
			v.x = v.x * (1-1/d);
			v.y = v.y * (1-1/d);
		} else { //ボールの中心に当てたら止める
			v.x = 0;
			v.y = 0;
		}
	}
	//pの数値をvの分だけ増やす
	p.x = p.x + v.x;
	p.y = p.y + v.y;
	//境界で反射させる
	if (p.x > cW - r) {
		v.x = -1 * v.x;
		p.x = cW - r;
	} else if (p.x < r) {
		v.x = -1 * v.x;
		p.x = r;
	}
	if (p.y > cH - r) {
		v.y = -1 * v.y;
		p.y = cH - r;
	} else if (p.y < r) {
		v.y = -1 * v.y;
		p.y = r;
	}
	//描画処理を呼び出す
	draw();
	//タイマー(一度クリアしてから再設定。)
	if (play == 1) {
		clearTimeout(timer);
		timer = setTimeout(loop,delay);
	} else {
		ctx.fillStyle = 'rgba(127,127,127,0.6)';
		ctx.fillRect(0,0,cW,cH);
	}
}

function togglePlay(){
	if (play == 0) {
		resume();
	} else {
		pause();
	}
}

function chk(n){
	k = n * 1;
}

function pause(){
	pp.value="restart";
	play = 0;
}

function resume(){
	pp.value="stop";
	play = 1;
	loop();
}

function reset(){
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.fillRect(0,0,cW,cH);
	init();
	loop();
}
