var otf='', txt='', selection = {'0,0,0':false};
var fonts = [
	[
		["serif","Select font class…"],
		["default serif font","serif"],
		["default sans-serif font","sans-serif"],
		["default monospaced font","monospace"]
	],
	[
		["serif","Old Style Serif Fonts"],
		["Equity","equity-text-b","equity-text-b;font-style:italic","equity-text-b;font-weight:bold","equity-text-b;font-style:italic;font-weight:bold","equity-caps-b","equity-caps-b;font-weight:bold"],
		["Athelas","Athelas-Regular","Athelas-Italic","Athelas-Bold","Athelas-BoldItalic"],
		["Adobe Caslon Pro","ACaslonPro-Regular","ACaslonPro-Italic","ACaslonPro-Semibold","ACaslonPro-SemiboldItalic","ACaslonPro-Bold","ACaslonPro-BoldItalic"],
		["Big Caslon","BigCaslon-Medium"],
		["Cassia","Cassia-ExtraLight"],
		["Crimson","Crimson-Roman","Crimson-Italic","Crimson-Semibold","Crimson-SemiboldItalic","Crimson-Bold","Crimson-BoldItalic"],
		["EB Garamond","EBGaramond08-Regular","EBGaramond08-Italic","EBGaramond08-SC","EBGaramond12-Regular","EBGaramond12-Italic","EBGaramond12-SC"],
		["Garamond Premier Pro","GaramondPremrPro","GaramondPremrPro-It","GaramondPremrPro-Smbd","GaramondPremrPro-SmbdIt"],
		["Gentium Basic","GentiumBasic","GentiumBasic-Italic","GentiumBasic-Bold","GentiumBasic-BoldItalic"],
		["Gentium Plus","GentiumPlus","GentiumPlus-Italic"],
		["Hoefler Text","HoeflerText-Regular","HoeflerText-Italic","HoeflerText-Black","HoeflerText-BlackItalic"],
		["Iowan Old Style","IowanOldStyle-Titling","IowanOldStyle-Roman","IowanOldStyle-Italic","IowanOldStyle-Bold","IowanOldStyle-BoldItalic","IowanOldStyle-Black","IowanOldStyle-BlackItalic"],
		["Junicode","Junicode","Junicode-Italic","Junicode-Bold","Junicode-BoldItalic"],
		["Minion Pro","MinionPro-Regular","MinionPro-It","MinionPro-Semibold","MinionPro-SemiboldIt","MinionPro-Bold","MinionPro-BoldIt","MinionStd-Black"],
		["Palatino","Palatino-Roman","Palatino-Italic","Palatino-Bold","Palatino-BoldItalic"]
	],
	[
		["serif","Transitional Serif Fonts"],
		["Baskerville","Baskerville","Baskerville-Italic","Baskerville-SemiBold","Baskerville-SemiBoldItalic","Baskerville-Bold","Baskerville-BoldItalic"],
		["Charter","Charter-Roman","Charter-Italic","Charter-Bold","Charter-BoldItalic","Charter-Black","Charter-BlackItalic"],
		["Cochin","Cochin","Cochin-Italic","Cochin-Bold","Cochin-BoldItalic"],
		["Georgia","Georgia","Georgia-Italic","Georgia-Bold","Georgia-BoldItalic"],
		["Heuristica","Heuristica-Regular","Heuristica-Italic","Heuristica-Bold","Heuristica-BoldItalic"],
		["Utopia","Utopia-Regular","Utopia-Italic","Utopia-Bold","Utopia-BoldItalic"],
		["Lido STF","LidoSTF","LidoSTF-Italic","LidoSTFMedium","LidoSTFMedium-Italic","LidoSTF-Bold","LidoSTF-BoldItalic"],
		["Linux Libertine O","LinLibertineDisplayO","LinLibertineO","LinLibertineOI","LinLibertineOZ","LinLibertineOZI","LinLibertineOB","LinLibertineOBI"],
		["Marion","Marion-Regular","Marion-Italic","Marion-Bold"],
		["PT Serif","PTSerif-Regular","PTSerif-Italic","PTSerif-Bold","PTSerif-BoldItalic","PTSerif-Caption","PTSerif-CaptionItalic"],
		["Source Serif Pro","SourceSerifPro-ExtraLight","SourceSerifPro-ExtraLightIt","SourceSerifPro-Light","SourceSerifPro-LightIt","SourceSerifPro-Regular","SourceSerifPro-It","SourceSerifPro-SemiBold","SourceSerifPro-SemiBoldIt","SourceSerifPro-Bold","SourceSerifPro-BoldIt","SourceSerifPro-Black","SourceSerifPro-BlackIt"],
		["Times","Times-Roman","Times-Italic","Times-Bold","Times-BoldItalic"],
		["Times New Roman","TimesNewRomanPSMT","TimesNewRomanPS-ItalicMT","TimesNewRomanPS-BoldMT","TimesNewRomanPS-BoldItalicMT"]
	],
	[
		["serif","Modern Serif Fonts"],
		["Bodoni 72","BodoniSvtyTwoITCTT-Book","BodoniSvtyTwoITCTT-BookIta","BodoniSvtyTwoITCTT-Bold"],
		["Didot","Didot","Didot-Italic","Didot-Bold"]
	],
	[
		["sans-serif","Grotesque Sans-serif Fonts"],
		["News Gothic Std","NewsGothicStd","NewsGothicStd-Oblique","NewsGothicStd-Bold","NewsGothicStd-BoldOblique"],
		["Source Sans Pro","SourceSansPro-ExtraLight","SourceSansPro-ExtraLightIt","SourceSansPro-Light","SourceSansPro-LightIt","SourceSansPro-Regular","SourceSansPro-It","SourceSansPro-SemiBold","SourceSansPro-SemiBoldIt","SourceSansPro-Bold","SourceSansPro-BoldIt","SourceSansPro-Black","SourceSansPro-BlackIt"]
	],
	[
		["sans-serif","Realist (Neo-grotesque / Transitional) Sans-serif Fonts"],
		["DIN","DINAlternate-Bold","DINCondensed-Bold"],
		["Geneva","Geneva"],
		["Helvetica","Helvetica-Light","Helvetica-LightOblique","Helvetica","Helvetica-Oblique","Helvetica-Bold","Helvetica-BoldOblique"],
		["Helvetica Neue","HelveticaNeue-UltraLight","HelveticaNeue-UltraLightItalic","HelveticaNeue-Thin","HelveticaNeue-ThinItalic","HelveticaNeue-Light","HelveticaNeue-LightItalic","HelveticaNeue","HelveticaNeue-Italic","HelveticaNeue-Medium","HelveticaNeue-MediumItalic","HelveticaNeue-Bold","HelveticaNeue-BoldItalic","HelveticaNeue-CondensedBold","HelveticaNeue-CondensedBlack"],
		["Impact","Impact"],
		["Linux Biolinum O","LinBiolinumO","LinBiolinumOI","LinBiolinumOB"],
		["San Francisco Display","SanFranciscoDisplay-Thin","SanFranciscoDisplay-UltraLight","SanFranciscoDisplay-Light","SanFranciscoDisplay-Regular","SanFranciscoDisplay-Medium","SanFranciscoDisplay-Semibold","SanFranciscoDisplay-Bold","SanFranciscoDisplay-Heavy","SanFranciscoDisplay-Black"],
		["San Francisco Text","SanFranciscoText-Light","SanFranciscoText-LightItalic","SanFranciscoText-Regular","SanFranciscoText-Italic","SanFranciscoText-Medium","SanFranciscoText-MediumItalic","SanFranciscoText-Semibold","SanFranciscoText-SemiboldItalic","SanFranciscoText-Bold","SanFranciscoText-BoldItalic","SanFranciscoText-Heavy","SanFranciscoText-HeavyItalic"]
	],
	[
		["sans-serif","Humanist Sans-serif Fonts"],
		["AXIS Std Joyo","AxisStd-Regular"],
		["Concourse","concourse-t2","concourse-t2;font-style:italic","concourse-t3","concourse-t3;font-style:italic","concourse-t3;font-weight:bold","concourse-t3;font-style:italic;font-weight:bold","concourse-t7","concourse-t3-index","concourse-c4"],
		["Frutiger","Frutiger-Light"],
		["Fira Sans","FiraSans-Thin","FiraSans-ThinItalic","FiraSans-UltraLight","FiraSans-UltraLightItalic","FiraSans-ExtraLight","FiraSans-ExtraLightItalic","FiraSans-Light","FiraSans-LightItalic","FiraSans-Book","FiraSans-BookItalic","FiraSans-Regular","FiraSans-Italic","FiraSans-Medium","FiraSans-MediumItalic","FiraSans-SemiBold","FiraSans-SemiBoldItalic","FiraSans-Bold","FiraSans-BoldItalic","FiraSans-Heavy","FiraSans-HeavyItalic"],
		["Gill Sans","GillSans-Light","GillSans-LightItalic","GillSans","GillSans-Italic","GillSans-SemiBold","GillSans-SemiBoldItalic","GillSans-Bold","GillSans-BoldItalic","GillSans-UltraBold"],
		["Lato","Lato-Hairline","Lato-HairlineItalic","Lato-Thin","Lato-ThinItalic","Lato-Light","Lato-LightItalic","Lato-Regular","Lato-Italic","Lato-Medium","Lato-MediumItalic","Lato-SemiBold","Lato-SemiBoldItalic","Lato-Bold","Lato-BoldItalic","Lato-Heavy","Lato-HeavyItalic","Lato-Black","Lato-BlackItalic"],
		["Lucida Grande","LucidaGrande","LucidaGrande-Bold"],
		["Myriad Pro","MyriadPro-Light","MyriadPro-LightIt","MyriadPro-Regular","MyriadPro-It","MyriadPro-Semibold","MyriadPro-SemiboldIt","MyriadPro-Bold","MyriadPro-BoldIt","MyriadPro-Black","MyriadPro-BlackIt"],
		["Open Sans","OpenSans-Light","OpenSansLight-Italic","OpenSans","OpenSans-Italic","OpenSans-Semibold","OpenSans-SemiboldItalic","OpenSans-Bold","OpenSans-BoldItalic","OpenSans-ExtraBold","OpenSans-ExtraBoldItalic"],
		["Optima","Optima-Regular","Optima-Italic","Optima-Bold","Optima-BoldItalic","Optima-ExtraBlack"],
		["PT Sans","PTSans-Regular","PTSans-Italic","PTSans-Bold","PTSans-BoldItalic","PTSans-Caption","PTSans-CaptionBold","PTSans-Narrow","PTSans-NarrowBold"],
		["Seravek","Seravek-ExtraLight","Seravek-ExtraLightItalic","Seravek-Light","Seravek-LightItalic","Seravek","Seravek-Italic","Seravek-Medium","Seravek-MediumItalic","Seravek-Bold","Seravek-BoldItalic"],
		["Skia","Skia-Regular_Light","Skia-Regular_Light-Condensed","Skia-Regular_Light-Extended","Skia-Regular","Skia-Regular_Condensed","Skia-Regular_Extended","Skia-Regular_Bold","Skia-Regular_Black","Skia-Regular_Black-Condensed","Skia-Regular_Black-Extended"],
		["Stone Sans ITC TT","StoneSansITCTT-Semi","StoneSansITCTT-SemiIta","StoneSansITCTT-Bold"],
		["Trebuchet MS","TrebuchetMS","TrebuchetMS-Italic","TrebuchetMS-Bold","Trebuchet-BoldItalic"],
		["Verdana","Verdana","Verdana-Italic","Verdana-Bold","Verdana-BoldItalic"]
	],
	[
		["sans-serif","Geometric Sans-serif Fonts"],
		["Avenir","Avenir-Light","Avenir-LightOblique","Avenir-Roman","Avenir-Oblique","Avenir-Medium","Avenir-MediumOblique","Avenir-Heavy","Avenir-HeavyOblique","Avenir-Black","Avenir-BlackOblique"],
		["Avenir Next","AvenirNext-UltraLight","AvenirNext-UltraLightItalic","AvenirNext-Regular","AvenirNext-Italic","AvenirNext-Medium","AvenirNext-MediumItalic","AvenirNext-DemiBold","AvenirNext-DemiBoldItalic","AvenirNext-Bold","AvenirNext-BoldItalic","AvenirNext-Heavy","AvenirNext-HeavyItalic"],
		["Avenir Next Condensed","AvenirNextCondensed-UltraLight","AvenirNextCondensed-UltraLightItalic","AvenirNextCondensed-Regular","AvenirNextCondensed-Italic","AvenirNextCondensed-Medium","AvenirNextCondensed-MediumItalic","AvenirNextCondensed-DemiBold","AvenirNextCondensed-DemiBoldItalic","AvenirNextCondensed-Bold","AvenirNextCondensed-BoldItalic","AvenirNextCondensed-Heavy","AvenirNextCondensed-HeavyItalic"],
		["Futura","Futura-Medium","Futura-MediumItalic","Futura-CondensedMedium","Futura-CondensedExtraBold"],
		["Gotham","Gotham-Light","Gotham-Book","Gotham-BookItalic","Gotham-Medium","Gotham-Bold","Gotham-BoldItalic"],
		["Museo Sans","MuseoSans-500","MuseoSans-500Italic"]
	],
	[
		["monospace","Monospaced Fonts"],
		["Andale Mono","AndaleMono"],
		["Courier","Courier","Courier-Oblique","Courier-Bold","Courier-BoldOblique"],
		["Courier New","CourierNewPSMT","CourierNewPS-ItalicMT","CourierNewPS-BoldMT","CourierNewPS-BoldItalicMT"],
		["Fira Mono","FiraMono-Regular","FiraMono-Medium","FiraMono-Bold"],
		["Inconsolata","Inconsolata"],
		["Menlo","Menlo-Regular","Menlo-Italic","Menlo-Bold","Menlo-BoldItalic"],
		["Monaco","Monaco"],
		["PT Mono","PTMono-Regular","PTMono-Bold"],
		["Source Code Pro","SourceCodePro-ExtraLight","SourceCodePro-ExtraLightIt","SourceCodePro-Light","SourceCodePro-LightIt","SourceCodePro-Regular","SourceCodePro-It","SourceCodePro-SemiBold","SourceCodePro-SemiBoldIt","SourceCodePro-Bold","SourceCodePro-BoldIt","SourceCodePro-Black","SourceCodePro-BlackIt"],
		["Triplicate","triplicate","triplicate;font-style:italic","triplicate;font-weight:bold","triplicate-code"]
	],
	[
		["serif","日本語フォント"],
		["ヒラギノ角ゴ、丸ゴ、明朝","'.HiraKakuInterface-W1'","'.HiraKakuInterface-W2'","HiraKakuProN-W3","HiraKakuProN-W6","HiraKakuStdN-W8","HiraMaruProN-W4","HiraMinProN-W3","HiraMinProN-W6"],
		["游ゴシック体、明朝体","YuGo-Medium","YuGo-Bold","YuMin-Medium","YuMin-Demibold"],
		["Osaka","Osaka","Osaka-Mono"],
		["源ノ角ゴシック JP (Source Han Sans JP)","SourceHanSansJP-ExtraLight","SourceHanSansJP-Light","SourceHanSansJP-Normal","SourceHanSansJP-Regular","SourceHanSansJP-Medium","SourceHanSansJP-Bold","SourceHanSansJP-Heavy"],
		["小塚ゴシック、明朝","KozGoPro-ExtraLight","KozGoPro-Light","KozGoPro-Regular","KozGoPro-Medium","KozGoPro-Bold","KozGoPro-Heavy","KozMinPro-ExtraLight","KozMinPro-Light","KozMinPro-Regular","KozMinPro-Medium","KozMinPro-Bold","KozMinPro-Heavy"],
		["モトヤ シーダ、マルベリ、アポロ、教科書","NFMotoyaCedarStd-W1","MotoyaLCedar-W3-90ms-RKSJ-H","MotoyaLMaru-W3-90ms-RKSJ-H","NfMotoyaAporoStd-W1","NtMotoyaKyotaiStd-W2","NtMotoyaKyotaiStd-W3","NtMotoyaKyotaiStd-W4"],
		["IPAexゴシック、明朝","IPAexGothic","IPAexMincho"]
	],
	[
		["serif","Selection"]
	]
];

function setotf() {
	var arr = document.getElementsByClassName('otf');
	if(txt=='lig') txt='The strict firefly choeffiae 0123456789 Que&G';
	else if(txt=='0-9') txt='11⁄20 0123456789 (+−×÷±=∞<>_-/*#$%&~^¥@!?,.;:){}[] ` \' " ′ ″ ’ ”';
	else if(txt=='a-z') txt='abcdefghijklmnopqrstuvwxyz';
	else if(txt=='A-Z') txt='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	else if(txt=='A-z') txt='ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
	else if(txt=='a-Z') txt='abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for(var i = 0; i < arr.length; i++) {
		arr[i].className = 'otf ' + otf;
		arr[i].innerHTML = (txt=='' ? arr[i].getAttribute('title') : txt);
	}
}
function toggle(key,e) {
	selection[key]=!selection[key];
	e.className = selection[key] ? 'row checked' : 'row';
}
function line(i,j,k) {
	return '<div class="row ' + (selection[i+','+j+','+k] ? 'checked' : '') + '" style="font-family:' + fonts[i][j][k] + '" onclick="toggle(\''
		+ i + ',' + j + ',' + k + '\',this)"><span class="otf" title="' + fonts[i][j][k] + '">' + fonts[i][j][k]
		+ '</span></div>';
}
function show(cl) {
	var f = fonts[cl];
	var t = '<h3 class="row" style="font-family:' + f[0][0] + ';">' + f[0][1] + '</h3>';
	if(cl<10) {
		for(var j=1; j<f.length; j++) {
			t += '<li title="' + f[j][0] + '"><h4 class="row font-name">' + f[j][0] + '</h4>';
			for (var k=1; k<f[j].length; k++) t += line(cl,j,k);
			t += '</li>';
		}
	} else {
		t += '<li title="Custom collection"><h4 class="row font-name">Custom collection</h4>';
		for(var i=1; i<fonts.length; i++) {
			for(var j=1; j<fonts[i].length; j++) {
				for (var k=1; k<fonts[i][j].length; k++)
					if(selection[i+','+j+','+k]) t += line(i,j,k);
			}
		}
		t += '</li>';
	}
	document.getElementById('show').innerHTML = t;
	setotf();
}
