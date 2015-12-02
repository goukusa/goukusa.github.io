// 定数
var BALL_R = 15;//ボールの半径
var MOUSE_R = 4;//マウス点の半径
var DELAY = 15;//タイマーを実行する間隔
var C0 = 'rgba(255,255,255,1)';//マウス色
var C1 = 'rgba(0,255,255,1)';//ボール色1
var C2 = 'rgba(255,0,255,1)';//ボール色2
var cW, cH;
// 変数
var mouse;
var play = false;
var position = {x:0,y:0};//ボールの座標
var velocity = {x:0,y:0};//変化量
var kvalue = 20;//定数
var timer;//タイマー
var ballcolor = C1;
var touch = {x:0,y:0};//タッチ座標

window.onload = function(){
	//初期設定
	var canvas = document.getElementById("ball");
	if(!canvas || !canvas.getContext) return false;
	cW = canvas.width;
	cH = canvas.height;
	canvas.addEventListener("mousemove", mouseMoveListener, false);
	canvas.addEventListener("touchmove", mouseMoveListener, false);
	canvas.addEventListener("mouseout", mouseOutListener, false);
	canvas.addEventListener("touchcancel", mouseOutListener, false);
	canvas.addEventListener("mousedown", mouseDownListener, false);
	canvas.addEventListener("touchstart", mouseDownListener, false);
	canvas.addEventListener("mouseup", mouseUpListener, false);
	canvas.addEventListener("touchend", mouseUpListener, false);
	document.getElementById('toggleplay').addEventListener('click', togglePlay, false);
	document.getElementById('reset').addEventListener('click', init, false);
	document.getElementById('kval').addEventListener('change', function(){kvalue = Number(this.value);}, false);
	init();
}
function init(){
	play = false;
	position = {x:cW/2,y:cH/2};
	velocity = {x:0,y:0};
	mouse = {x:cW/2,y:cH/2};
	var ctx = document.getElementById("ball").getContext("2d");
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.fillRect(0,0,cW,cH);
	loop();
}
function mousepos(e) {
	e.preventDefault();
	var rect = e.target.getBoundingClientRect();
	var p = (e.touches ? e.touches[0] : e);
	mouse.x = p.clientX - rect.left;
	mouse.y = p.clientY - rect.top;
}
function mouseMoveListener(e) {if(play) mousepos(e);}
function mouseOutListener(e) {
	if (play) {
		mouse.x = -1;
		mouse.y = -1;
		togglePlay();
	}
}
function mouseDownListener(e) {
	mousepos(e);
	touch.x = mouse.x
	touch.y = mouse.y
	var d = Math.pow(mouse.x - position.x, 2) + Math.pow(mouse.y - position.y, 2);
	if (d < BALL_R*BALL_R && (velocity.x != 0 || velocity.y != 0)) {
		velocity.x = 0;
		velocity.y = 0;
	}
	if (!play) {
		togglePlay();
	}
}
function mouseUpListener(e) {
	if (mouse.x == touch.x && mouse.y == touch.y) {
		kvalue = -1 * kvalue;
		if(kvalue > 0) {ballcolor = C1;} else {ballcolor = C2;}
	}
}

//繰り返し描画を行う関数。
function loop(){
	//加速度を計算してvelocityを変化させる
	if (mouse.x >= 0 && mouse.x <= cW && mouse.y >= 0 && mouse.y <= cH){
		var d = (mouse.x - position.x) * (mouse.x - position.x) + (mouse.y - position.y) * (mouse.y - position.y);
		if (d > BALL_R*BALL_R){
			velocity.x = velocity.x + (mouse.x - position.x) * kvalue/d;
			velocity.y = velocity.y + (mouse.y - position.y) * kvalue/d;
		} else if (d>Math.pow(MOUSE_R-1,2)) {
			velocity.x = velocity.x * (1-1/d);
			velocity.y = velocity.y * (1-1/d);
		} else { //ボールの中心に当てたら止める
			velocity.x = 0;
			velocity.y = 0;
		}
	}
	//positionの数値をvelocityの分だけ増やす
	position.x = position.x + velocity.x;
	position.y = position.y + velocity.y;
	//境界で反射させる
	if (position.x > cW - BALL_R) {
		velocity.x = -1 * velocity.x;
		position.x = cW - BALL_R;
	} else if (position.x < BALL_R) {
		velocity.x = -1 * velocity.x;
		position.x = BALL_R;
	}
	if (position.y > cH - BALL_R) {
		velocity.y = -1 * velocity.y;
		position.y = cH - BALL_R;
	} else if (position.y < BALL_R) {
		velocity.y = -1 * velocity.y;
		position.y = BALL_R;
	}
	//描画処理
	var ctx = document.getElementById("ball").getContext("2d");
	//残像をつける
	ctx.fillStyle = 'rgba(0,0,0,0.75)';
	ctx.fillRect(0,0,cW,cH);
	//ボールを描画
	ctx.beginPath();
	ctx.arc(position.x,position.y,BALL_R,0,Math.PI*2.0,true);
	ctx.closePath();
	ctx.fillStyle = ballcolor;
	ctx.fill();
	//マウス位置に点を描く
	if (mouse.x >= 0 && mouse.x <= cW && mouse.y >= 0 && mouse.y <= cH){
		ctx.beginPath();
		ctx.arc(mouse.x,mouse.y,MOUSE_R,0,Math.PI*2.0,true);
		ctx.closePath();
		ctx.fillStyle = C0;
		ctx.fill();
	}
	//タイマー(一度クリアしてから再設定。)
	if (play) {
		clearTimeout(timer);
		timer = setTimeout(loop,DELAY);
	} else {
		ctx.fillStyle = 'rgba(127,127,127,0.6)';
		ctx.fillRect(0,0,cW,cH);
	}
}

function togglePlay(){
	play = !play;
	document.getElementById('toggleplay').value = (play ? 'pause' : 'resume');
	if (play) loop();
}
