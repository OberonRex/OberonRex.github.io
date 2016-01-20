function ResizeColorSwatches(percent){
	
	$('.jps_ColorSwatch').each(function(){
	
		//var trg = document.getElementById("fb2");
		var trgParent = this.parentElement;
		var mul = percent/100;
		
		var pointsStg = "8.85,0.35 17.15,5.15 17.15,14.7 8.85,19.5 0.6,14.7 0.6,5.15";
		var points = pointsStg.split(" ");
		
		var newStg = "";
		for (var n = 0; n <= 5; n++)
		{
			var xy = points[n].split(",");
			var x = xy[0] * mul;
			var y = xy[1] * mul;
			newStg += x + "," + y + " ";
		}
		
		var w = 20;
		var h = 20;
		
		this.setAttribute("points", newStg);
		trgParent.setAttribute("width", w * mul);
		trgParent.setAttribute("height", h * mul);
	});
}


//
// Font Size
//
function jps_SaveFontSize(elem){
	document.body.style.fontSize = elem.value + '%';
	localStorage.FontSize = elem.value;
	ResizeColorSwatches(elem.value);
}
function jps_LoadFontSize(){
	if (localStorage.FontSize != null) document.body.style.fontSize = localStorage.FontSize + "%";
	document.getElementById('jps_FontSize').value = parseInt(document.body.style.fontSize);
	ResizeColorSwatches(parseInt(document.body.style.fontSize));
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

var ClickColor = "yellow";
//
// Button Hover Color
//
function jps_SaveButtonClickColor(elem){
	localStorage.ButtonClickColor = elem.value;
	ClickColor = elem.value;
}

function jps_LoadButtonClickColor(){
	if (localStorage.ButtonClickColor != null){
		ClickColor = localStorage.ButtonClickColor;
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

