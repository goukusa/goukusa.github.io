var single = true;
var posBase = [[false,false,false,false],[false,false,false,false],[false,false,false,false]];
function setIC(id,i,c) { with(document.getElementById(id)) { innerHTML = i; className = c; } }
function setI(id,i) { document.getElementById(id).innerHTML = i; }
function setC(id,c) { document.getElementById(id).className = c; }
function hideAA() {
	var arr = document.getElementsByClassName('aa');
	for(var i = 0; i < arr.length; i++) arr[i].style.display = 'none';
}
function codonaa(codon) {
	return(
			/^tt[tcy]/.test(codon) ? 'F' :
			/^ct|^[ty]t[agr]/.test(codon) ? 'L' :
			/^at[tcaywmh]/.test(codon) ? 'I' :
			/^atg/.test(codon) ? 'M' :
			/^gt/.test(codon) ? 'V' :
			/^tc|^ag[tcy]/.test(codon) ? 'S' :
			/^cc/.test(codon) ? 'P' :
			/^ac/.test(codon) ? 'T' :
			/^gc/.test(codon) ? 'A' :
			/^ta[tcy]/.test(codon) ? 'Y' :
			/^ta[agr]|^t[gr]a/.test(codon) ? '*' :
			/^ca[tcy]/.test(codon) ? 'H' :
			/^ca[agr]/.test(codon) ? 'Q' :
			/^aa[tcy]/.test(codon) ? 'N' :
			/^aa[agr]/.test(codon) ? 'K' :
			/^ga[tcy]/.test(codon) ? 'D' :
			/^ga[agr]/.test(codon) ? 'E' :
			/^tg[tcy]/.test(codon) ? 'C' :
			/^tgg/.test(codon) ? 'W' :
			/^cg|^[am]g[agr]/.test(codon) ? 'R' :
			/^gg/.test(codon) ? 'G' :
			/^ra[tcy]/.test(codon) ? 'B' :
			/^sa[agr]/.test(codon) ? 'Z' :
			/^mt[tcaywmh]|^[wh]ta/.test(codon) ? 'J' : 'X');
}
function codonaas(codon) {
	var aas = '';
	if(/^[gksrvdbn][cymsvbhn]/.test(codon)) aas += '<div class="polar" onClick="showAA(\'A\')">A<\/div>';
	if(/^[tywkdbhn][gksrvdbn][^agr]/.test(codon)) aas += '<div class="cysteine" onClick="showAA(\'C\')">C<\/div>';
	if(/^[gksrvdbn][awmrvdhn][^agr]/.test(codon)) aas += '<div class="acidic" onClick="showAA(\'D\')">D<\/div>';
	if(/^[gksrvdbn][awmrvdhn][^tcy]/.test(codon)) aas += '<div class="acidic" onClick="showAA(\'E\')">E<\/div>';
	if(/^[tywkdbhn][tywkdbhn][^agr]/.test(codon)) aas += '<div class="aromatic" onClick="showAA(\'F\')">F<\/div>';
	if(/^[gksrvdbn][gksrvdbn]/.test(codon)) aas += '<div class="polar" onClick="showAA(\'G\')">G<\/div>';
	if(/^[cymsvbhn][awmrvdhn][^agr]/.test(codon)) aas += '<div class="basic" onClick="showAA(\'H\')">H<\/div>';
	if(/^[awmrvdhn][awmrvdhn][^tcy]/.test(codon)) aas += '<div class="basic" onClick="showAA(\'K\')">K<\/div>';
	if(/^[awmrvdhn][tywkdbhn][^g]/.test(codon)) aas += '<div class="nonpolar" onClick="showAA(\'I\')">I<\/div>';
	if(/^[cymsvbhn][tywkdbhn]|^[twkd][tywkdbhn][^tcy]/.test(codon)) aas += '<div class="nonpolar" onClick="showAA(\'L\')">L<\/div>';
	if(/^[awmrvdhn][tywkdbhn][gksrvdbn]/.test(codon)) aas += '<div class="nonpolar" onClick="showAA(\'M\')">M<\/div>';
	if(/^[awmrvdhn][awmrvdhn][^agr]/.test(codon)) aas += '<div class="amide" onClick="showAA(\'N\')">N<\/div>';
	if(/^[cymsvbhn][cymsvbhn]/.test(codon)) aas += '<div class="polar" onClick="showAA(\'P\')">P<\/div>';
	if(/^[cymsvbhn][awmrvdhn][^tcy]/.test(codon)) aas += '<div class="amide" onClick="showAA(\'Q\')">Q<\/div>';
	if(/^[cymsvbhn][gksrvdbn]|^[awrd][gksrvdbn][^tcy]/.test(codon)) aas += '<div class="basic" onClick="showAA(\'R\')">R<\/div>';
	if(/^[tywkdbhn][cymsvbhn]|^[awmrvdhn][gksrvdbn][^agr]/.test(codon)) aas += '<div class="polar" onClick="showAA(\'S\')">S<\/div>';
	if(/^[awmrvdhn][cymsvbhn]/.test(codon)) aas += '<div class="polar" onClick="showAA(\'T\')">T<\/div>';
	if(/^[gksrvdbn][tywkdbhn]/.test(codon)) aas += '<div class="nonpolar" onClick="showAA(\'V\')">V<\/div>';
	if(/^[tywkdbhn][gksrvdbn][gksrvdbn]/.test(codon)) aas += '<div class="aromatic" onClick="showAA(\'W\')">W<\/div>';
	if(/^[tywkdbhn][awmrvdhn][^agr]/.test(codon)) aas += '<div class="aromatic" onClick="showAA(\'Y\')">Y<\/div>';
	if(/^[tywkdbhn][awmrvdhn][^tcy]|^[tywkdbhn][gksb][awmrvdhn]/.test(codon)) aas += '<div class="stop" onClick="showAA(\'0\')">*<\/div>';
	return aas;
}
function showAA(aa) {
	hideAA();
	if(aa.length == 3) aa = codonaa(aa);
	if(aa == '*') aa = '0';
	document.getElementById("aa").style.display = 'block';
	document.getElementById("aa_" + aa).style.display = 'block';
}
function switchCode(e) {
	setIC('tta', 'L/Leu', "nonpolar");
	setIC('tca', 'S/Ser', "polar");
	setIC('taa', 'Ochre', "stop");
	setIC('tag', 'Amber', "stop");
	setIC('tga', 'Opal', "stop");
	setIC('ctt', 'L/Leu', "nonpolar");
	setIC('ctc', 'L/Leu', "nonpolar");
	setIC('cta', 'L/Leu', "nonpolar");
	setIC('ctg', 'L/Leu', "nonpolar");
	setIC('ata', 'I/Ile', "nonpolar");
	setIC('aaa', 'K/Lys', "basic");
	setIC('aga', 'R/Arg', "basic");
	setIC('agg', 'R/Arg', "basic");
	if(e==2) { // 2. The Vertebrate Mitochondrial Code (transl_table=2)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('ata', 'M/Met', "nonpolar futo");
		setIC('aga', 'Stop', "stop futo");
		setIC('agg', 'Stop', "stop futo");
	} else if(e==3) { // 3. The Yeast Mitochondrial Code (transl_table=3)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('ctt', 'T/Thr', "polar futo");
		setIC('ctc', 'T/Thr', "polar futo");
		setIC('cta', 'T/Thr', "polar futo");
		setIC('ctg', 'T/Thr', "polar futo");
		setIC('ata', 'M/Met', "nonpolar futo");
	} else if(e==4) { // 4. The Mold, Protozoan, and Coelenterate Mitochondrial Code and the Mycoplasma/Spiroplasma Code (transl_table=4)
		setIC('tga', 'W/Trp', "aromatic futo");
	} else if(e==5) { // 5. The Invertebrate Mitochondrial Code (transl_table=5)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('ata', 'M/Met', "nonpolar futo");
		setIC('aga', 'S/Ser', "polar futo");
		setIC('agg', 'S/Ser', "polar futo");
	} else if(e==6) { // 6. The Ciliate, Dasycladacean and Hexamita Nuclear Code (transl_table=6)
		setIC('taa', 'Q/Gln', "amide futo");
		setIC('tag', 'Q/Gln', "amide futo");
	} else if(e==9) { // 9. The Echinoderm and Flatworm Mitochondrial Code (transl_table=9)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('aaa', 'N/Asn', "amide futo");
		setIC('aga', 'S/Ser', "polar futo");
		setIC('agg', 'S/Ser', "polar futo");
	} else if(e==10) { // 10. The Euplotid Nuclear Code (transl_table=10)
		setIC('tag', 'C/Cys', "cysteine futo");
	} else if(e==12) { // 12. The Alternative Yeast Nuclear Code (transl_table=12)
		setIC('ctg', 'S/Ser', "polar futo");
	} else if(e==13) { // 13. The Ascidian Mitochondrial Code (transl_table=13)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('ata', 'M/Met', "nonpolar futo");
		setIC('aga', 'G/Gly', "polar futo");
		setIC('agg', 'G/Gly', "polar futo");
	} else if(e==14) { // 14. The Alternative Flatworm Mitochondrial Code (transl_table=14)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('taa', 'Y/Tyr', "aromatic futo");
		setIC('aaa', 'N/Asn', "amide futo");
		setIC('aga', 'S/Ser', "polar futo");
		setIC('agg', 'S/Ser', "polar futo");
	} else if(e==16) { // 16. Chlorophycean Mitochondrial Code (transl_table=16)
		setIC('tag', 'L/Leu', "nonpolar futo");
	} else if(e==21) { // 21. Trematode Mitochondrial Code (transl_table=21)
		setIC('tga', 'W/Trp', "aromatic futo");
		setIC('ata', 'M/Met', "nonpolar futo");
		setIC('aaa', 'N/Asn', "amide futo");
		setIC('aga', 'S/Ser', "polar futo");
		setIC('agg', 'S/Ser', "polar futo");
	} else if(e==22) { // 22. Scenedesmus obliquus Mitochondrial Code (transl_table=22)
		setIC('tca', 'Stop', "stop futo");
		setIC('tag', 'L/Leu', "nonpolar futo");
	} else if(e==23) { // 23. Thraustochytrium Mitochondrial Code (transl_table=23)
		setIC('tta', 'Stop', "stop futo");
	} else if(e==24) { // 24. Pterobranchia Mitochondrial Code (transl_table=24)
		setIC('aga', 'S/Ser', "polar futo");
		setIC('agg', 'K/Lys', "basic futo");
		setIC('tga', 'W/Trp', "aromatic futo");
	} else if(e==25) { // 25. Candidate Division SR1 and Gracilibacteria Code (transl_table=25)
		setIC('tga', 'G/Gly', "polar futo");
	}
}
function togglePB(pos, base) {
	var pb2id = [['m1t','m1c','m1a','m1g'],['m2t','m2c','m2a','m2g'],['m3t','m3c','m3a','m3g']];
	function iub(p) {
		var sum = 0;
		for(var b=0; b<4; b++) if(posBase[p][b]) sum += Math.pow(2,b);
		switch(sum) {
			case 1: return 't';
			case 2: return 'c';
			case 3: return 'y';
			case 4: return 'a';
			case 5: return 'w';
			case 6: return 'm';
			case 7: return 'h';
			case 8: return 'g';
			case 9: return 'k';
			case 10: return 's';
			case 11: return 'b';
			case 12: return 'r';
			case 13: return 'd';
			case 14: return 'v';
			default: return 'n';
		}
	}
	if(single) {
		for(var b=0; b<4; b++) {
			posBase[pos][b] = (b == base ? true : false);
			setC(pb2id[pos][b], (b == base ? "mOn" : "mOff"));
		}
	} else {
		posBase[pos][base] = !posBase[pos][base];
		setC(pb2id[pos][base], (posBase[pos][base] ? "mOn" : "mOff"));
	}
	var codon = iub(0) + iub(1) + iub(2);
	setI("mcodon", codon);
	setI("aas", codonaas(codon));
	showAA(codon);
}
function selectAA(aa) {
	var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0".split('');
	for(var i=0; i<a.length; i++) setC("sel"+a[i], (a[i]==aa ? "mOn" : "mOff"));
	showAA(aa);
}
function tmcalc() {
	var text = document.getElementById("tmseq");
	var seq = text.value.replace(/[^tucag]/gi,"");
	text.value = seq;
	var tcag = seq.length;
	var cg = seq.replace(/[^cg]/gi,"").length;
	var tm, meth;
	if(tcag>21 || (tcag==21 && cg>5)) {
		tm = 69.3 + (41*cg - 650)/tcag;
		meth = "GC%";
	} else {
		tm = 2*(tcag + cg) - 5;
		meth = "Wallace";
	}
	setI("tmresult", (tcag > 0 ?
				tcag + "-mer, GC = " + Math.round(1000*cg/tcag)/10 + "%, Tm = "
				+ Math.round(tm*10)/10 + "&deg;C (" + meth + "&nbsp;method)" :
				"<span>Tm value will be shown here.<\/span>"));
}
function mass(prot) {
	var am = {"A":71.0788, "C":103.1388, "D":115.0886, "E":129.1155, "F":147.1766, "G":57.0519,
		"H":137.1411, "I":113.1594, "J":113.1594, "K":128.1741, "L":113.1594, "M":131.1986,
		"N":114.1039, "O":255.3172, "P":97.1167, "Q":128.1307, "R":156.1875, "S":87.0782,
		"T":101.1051, "U":150.03, "V":99.1326, "W":186.2132, "Y":163.1760, "*":0, ".":0};
	var m = 0;
	prot = prot.replace(/[\*\.].*$/,'');
	if(/^$|[BZX]/.test(prot)) {
		return "N/A";
	} else {
		for(var i=0; i<prot.length; i++) m += am[prot.substr(i,1)];
		m += 18.01528; /* H2O */
		return Math.round(m*100)/100;
	}
}
function translate(fr) {
	function tran(seq) {
		var prot = "";
		for(var i=0; i<=seq.length/3-1; i++) prot += codonaa(seq.substr(3*i,3));
		return "MW=" + mass(prot) + "\n" + prot;
	}
	var text = document.getElementById("seq");
	var seq = text.value.replace(/[^a-z]/gi,"").toLowerCase().replace(/u/gi,'t');
	text.value = seq;
	setI("translation",
			(fr && seq.length<2+fr) ?  "Input at least " + (2+fr) + " nucleotides." :
			seq.length<3 ?  "Input at least 3 nucleotides." :
			fr==1 ? ">" + tran(seq) : 
			fr==2 ? ">" + tran(seq.substring(1)) :
			fr==3 ? ">" + tran(seq.substring(2)) :
			">fr_1 " + tran(seq) + "\n>fr_2 " + tran(seq.substring(1)) + "\n>fr_3 " + tran(seq.substring(2)));
}
function untranslate() {
	function untran(prot) {
		var inverse = {"A":"gcn", "B":"ray", "C":"tgy", "D":"gay", "E":"gar", "F":"tty", "G":"ggn",
			"H":"cay", "I":"ath", "J":"nnn", "K":"aar", "L":"ytn", "M":"atg", "N":"aay",
			"O":"nnn", "P":"ccn", "Q":"car", "R":"mgn", "S":"wsn", "T":"acn", "U":"nnn",
			"V":"gtn", "W":"tgg", "X":"nnn", "Y":"tay", "Z":"sar", "*":"trr", ".":"trr"};
		var seq = "";
		for(var i=0; i<prot.length; i++) seq += inverse[prot.substr(i,1)] + ' ';
		return seq.replace(/ $/,'');
	}
	var text = document.getElementById("prot");
	var prot = text.value.replace(/\(.*\)/,"").replace(/[^A-Z\*\.]/gi,"").toUpperCase();
	text.value = prot + "\n(MW=" + mass(prot) + ")";
	setI("untranslation", (prot.length < 1 ? "Input aa sequence." : untran(prot)));
}
