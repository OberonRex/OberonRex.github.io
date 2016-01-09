
//
// Font Size
//
function jps_SaveFontSize(elem){
	document.body.style.fontSize = elem.value + '%';
	localStorage.FontSize = document.body.style.fontSize;
}
function jps_LoadFontSize(){
	if (localStorage.FontSize != null) document.body.style.fontSize = localStorage.FontSize;
	document.getElementById('jps_FontSize').value = parseInt(document.body.style.fontSize);
}

//
// Background Color
//
function jps_SaveBackgroundColor(elem){
	document.body.style.backgroundColor = elem.value;
	$('input, select').css('background-color', elem.value);
	localStorage.backgroundColor = elem.value;
}
function jps_LoadBackgroundColor(){
	if (localStorage.backgroundColor != null) {
		document.body.style.backgroundColor = localStorage.backgroundColor;
		$('input, select').css('background-color', localStorage.backgroundColor);
		document.getElementById('jps_BackgroundColor').value = localStorage.backgroundColor;
	}
}

//
// Font Color
//
function jps_SaveFontColor(elem){
	document.body.style.color = elem.value;
	localStorage.FontColor = elem.value;
}
function jps_LoadFontColor(){
	if (localStorage.FontColor != null) {
		document.body.style.color = localStorage.FontColor;
		document.getElementById('jps_FontColor').value = localStorage.FontColor;
	}
}

//
// Button Color
//
function jps_SaveButtonColor(elem){
	$('.mButton,.lButton,.slButton').css("backgroundColor", elem.value);
	localStorage.ButtonColor = elem.value;
}
function jps_LoadButtonColor(){
	if (localStorage.ButtonColor != null){
		$('.mButton,.lButton,.slButton').css("backgroundColor", localStorage.ButtonColor);
		document.getElementById('jps_ButtonColor').value = localStorage.ButtonColor;
	} 
}

//
// Button Font Color
//
function jps_SaveButtonFontColor(elem){
	$('.mButton,.lButton,.slButton').css("color", elem.value);
	localStorage.ButtonFontColor = elem.value;
}
function jps_LoadButtonFontColor(){
	if (localStorage.ButtonFontColor != null){
		$('.mButton,.lButton,.slButton').css("color", localStorage.ButtonFontColor);
		document.getElementById('jps_ButtonFontColor').value = localStorage.ButtonFontColor;
	} 
}

//
// Alert Color
//
function jps_SaveAlertColor(elem){
	document.getElementById('TimedMsgInner').style.backgroundColor = elem.value;
	localStorage.AlertColor = elem.value;
}
function jps_LoadAlertColor(){
	if (localStorage.AlertColor != null){
		document.getElementById('TimedMsgInner').style.backgroundColor = localStorage.AlertColor;
		document.getElementById('jps_AlertColor').value = localStorage.AlertColor;
	} 
}

//
// Button Font Color
//
function jps_SaveAlertFontColor(elem){
	document.getElementById('TimedMsgInner').style.color = elem.value;
	localStorage.AlertFontColor = elem.value;
}
function jps_LoadAlertFontColor(){
	if (localStorage.AlertFontColor != null){
		document.getElementById('TimedMsgInner').style.color = localStorage.AlertFontColor;
		document.getElementById('jps_AlertFontColor').value = localStorage.AlertFontColor;
	} 
}

