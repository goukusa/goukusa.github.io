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
