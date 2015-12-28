var chosenPolygon;
function EditColor(pPolygon){
	clrPtr = document.getElementById('PaintWith');
	if (clrPtr.classList.contains('jps_hideList')){
		chosenPolygon = pPolygon;
		selectPolygon(pPolygon.getAttribute("data-hex"));
		jps_GoToPage('colorPickerPage');
	} else {
		srcPolygon = document.getElementById('paintColor');
	  	pPolygon.setAttribute("fill", srcPolygon.getAttribute("data-hex"));
	  	pPolygon.setAttribute("data-hex", srcPolygon.getAttribute("data-hex"));		
	}
}

function EditColorAbs(pPolygon){
	chosenPolygon = pPolygon;
	//alert(pPolygon.getAttribute("fill"));
	selectPolygon(pPolygon.getAttribute("data-hex"));
	//CallPicker();
	jps_GoToPage('colorPickerPage');
}

function doSwap(){
	//$('.jps_property[id].jps_ColorSwatch');
	var swap1 = document.getElementById("swap1");
	var swap2 = document.getElementById("swap2");
	$('.jps_property[id].jps_ColorSwatch').each(function(){
		if (this.getAttribute('data-hex') == swap1.getAttribute('data-hex')){
		  	this.setAttribute("fill", swap2.getAttribute("data-hex"));
		  	this.setAttribute("data-hex", swap2.getAttribute("data-hex"));		
		}
		else if (this.getAttribute('data-hex') == swap2.getAttribute('data-hex')){
		  	this.setAttribute("fill", swap1.getAttribute("data-hex"));
		  	this.setAttribute("data-hex", swap1.getAttribute("data-hex"));		
		}
	});
}

function doReplace(){
	//var pList = $('.jps_property[id].jps_ColorSwatch');
	var rTarget = document.getElementById("replaceTarget");
	var rSource = document.getElementById("replaceSource");
	$('.jps_property[id].jps_ColorSwatch').each(function(){
		if (this.getAttribute('data-hex') == rTarget.getAttribute('data-hex')){
		  	this.setAttribute("fill", rSource.getAttribute("data-hex"));
		  	this.setAttribute("data-hex", rSource.getAttribute("data-hex"));		
		}
	});
}

function pebbleColor(polyId){
	try{
		return Number(color_picker_colors[document.getElementById(polyId).getAttribute("data-hex")].binary)
	}
	catch (e){
		alert("color failed: " + polyId + " " + document.getElementById(polyId).getAttribute("data-hex"));
		return 255;
	}
}

function selectColor($polygon) {
  var hexValue = $polygon.data('hex');
  var correctedHexValue = $polygon.attr('fill');
  var name = color_picker_colors[hexValue].name;
  $('#color-picker polygon').attr('stroke', '#fff').attr('stroke-width', '1.5');
  $polygon.attr('stroke', '#000').attr('stroke-width', '3');
  $polygon.parent().append($polygon);

  if (color_picker_colors[hexValue].url) {
    $('#js-picker-name-no-url').hide();
    $('#js-picker-name').text(name).attr('href', color_picker_colors[hexValue].url).show();
  }
  else {
    $('#js-picker-name-no-url').show().text(name);
    $('#js-picker-name').hide();
  }
  $('#js-picker-block').css('background-color', correctedHexValue);
  if (hexValue === '#FFFFFF') {
    $('#js-picker-block').css('border', '1px solid #000');
  }
  else {
    $('#js-picker-block').css('border', '0');
  }
  $('#js-picker-constant').text(color_picker_colors[hexValue].c_identifier);
  $('#js-picker-html').text(correctedHexValue.toUpperCase());
  $('#js-picker-html-uncorrected').text(hexValue.toUpperCase());
  $('#js-picker-rgb').text(color_picker_colors[hexValue].literals[1].value);
  $('#js-picker-hex').text(color_picker_colors[hexValue].literals[2].value);

  if (window.location.hash !== hexValue) {
    window.location = hexValue;
  }
}

function selectUrlColor() {
  if (! document.location.hash) {
    return;
  }
  var polygon = $('#color-picker polygon[data-hex="' + document.location.hash + '"]');
  if (polygon && polygon.length) {
    selectColor(polygon);
  }
}

function selectPolygon(pColor){
  $('#color-picker polygon').each(function (index, elem) {
    if (elem.getAttribute('data-hex') == pColor){
      //alert('found it');
      selectColor($(elem));
      return;
    }
  });
}

function applyColorMap(map) {
  $('#color-picker polygon').each(function (index, elem) {
    if (map) {
      $(elem).attr('fill', map[$(elem).data('hex').toLowerCase()]);
    }
    else {
      $(elem).attr('fill', $(elem).data('hex'));
    }
  });
  
  //$('#color-value polygon').each(function (index, elem) {
  //  if (map) {
  //    $(elem).attr('fill', map[$(elem).data('hex').toLowerCase()]);
  //  }
  //  else {
  //    $(elem).attr('fill', $(elem).data('hex'));
  //  }
  //});
  
}

//var chosenColor = 0;
function returnColor(pPolygon){
  //chosenColor = pPolygon.getAttribute("fill");
  chosenPolygon.setAttribute("fill", pPolygon.getAttribute("data-hex"));
  chosenPolygon.setAttribute("data-hex", pPolygon.getAttribute("data-hex"));
  jps_GoToPage('page1');
}

function wireUpColorPicker() {
  $('#color-picker polygon').on('click', function(elem){returnColor(this);});

  $('#color-picker polygon, .jps_ColorSwatch').each(function (index, elem) {
    $(elem).attr('data-hex', $(elem).attr('fill'));
  });
  
	$('div#jps_MasterDiv').on('click', '.js-btn-colormap', function (event) {
	var type = $(this).data('colormap');
	switch (type) {
	  case 'none':
	    applyColorMap(null);
	    break;
	  case 'sunlight':
	    applyColorMap(colorMappingSunlight);
	    break;
	}
	selectUrlColor();
	});
  
  $('div#jps_MasterDiv').on('click', '.color-value', function (event) {
  	EditColor(this);
  });

  

  window.onpopstate = function(event) {
    selectUrlColor();
  };

  selectUrlColor();
};
