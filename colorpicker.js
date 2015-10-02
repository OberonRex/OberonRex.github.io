
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
  
  $('#color-value polygon').each(function (index, elem) {
    if (map) {
      $(elem).attr('fill', map[$(elem).data('hex').toLowerCase()]);
    }
    else {
      $(elem).attr('fill', $(elem).data('hex'));
    }
  });
  
}

var chosenColor = 0;
function returnColor(pPolygon){
  chosenColor = pPolygon.getAttribute("fill");
  chosenPolygon.setAttribute("fill", chosenColor);
  GoPage1();
}

$(function () {
  $('#color-picker polygon').on('click', function(elem){returnColor(this);});

  $('#color-picker polygon').each(function (index, elem) {
    $(elem).attr('data-hex', $(elem).attr('fill'));
  });
  
    $('.js-btn-colormap').on('click', function (event) {
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

  window.onpopstate = function(event) {
    selectUrlColor();
  };

  selectUrlColor();
});
