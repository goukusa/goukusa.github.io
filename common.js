var $ = function (id) { return document.getElementById(id) };
function setI(id,i) { document.getElementById(id).innerHTML = i; }
function chgView(e) {
	if(e){
		var arr = document.getElementsByClassName('checked');
		for(var i = 0; i < arr.length; i++) arr[i].className = '';
		e.className = 'checked';
		arr = document.getElementsByTagName('section');
		var t = e.getAttribute('title');
		for(i = 0; i < arr.length; i++)
			arr[i].style.display = (t == arr[i].getAttribute('id') ? 'block' : 'none');
		setI('tool',e.innerHTML);
	}
	document.getElementById('toc').style.display = 'none' ;
}
function svgAnim() {
	var svgs = document.getElementsByTagName('svg');
	for (var i=0; i<svgs.length; i++){
		svgs[i].onmouseover = function(){this.unpauseAnimations();}
		svgs[i].onmouseout = function(){this.pauseAnimations();}
		svgs[i].pauseAnimations();
	}
};
