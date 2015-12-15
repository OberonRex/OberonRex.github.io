var return_to = "pebblejs://close#";
function ImportInitialValues(){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	
	var properties = {};
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    properties[pair[0]] = pair[1];
	}
	
	ImportValues(properties.KEY_CONTAINER);
	
	if ("return_to" in properties) return_to = decodeURIComponent(properties.return_to);
}

function Decode(stg){
	stg = stg.replace(/Q/g, '=');
	stg = stg.replace(/A/g, '&');

	stg = stg.replace(/%51/g, 'Q');
	stg = stg.replace(/%41/g, 'A');
	stg = stg.replace(/%25/g, '%');
	
	return stg;	
}

function Encode(stg){
	stg = stg.replace(/%/g, '%25');
	stg = stg.replace(/Q/g, '%51');
	stg = stg.replace(/A/g, '%41');

	stg = stg.replace(/=/g, 'Q');
	stg = stg.replace(/&/g, 'A');

	return stg;
	
}

var myProperties;
function ImportValues(stg){
	var vars = Decode(stg).split("&");
	
	//myProperties = {};

	for (var i=0; i<vars.length; i++) {
	    var pair = vars[i].split("=");
	    //myProperties[pair[0]] = pair[1];
	    
	    // can we find an element with the id?
	    var elem = document.getElementById(pair[0]);
	    if (elem != null){
	    	if ((elem.tagName == "DIV") && elem.classList.contains('jps_ListWrapper')){
	    		var cnt = parseInt(pair[1]);
	    		for(var n = 0; n < cnt; n++) jps_AddOne(elem, false);
	    		elem.value = cnt;
	    		jps_RenumberChildren(elem);
	    	} else {
	    		if ((elem.tagName == "polygon")) SetColor(pair[0], pair[1]);
	    		else elem.value = pair[1];
	    	}
	    } else {
	    }
	    
	    //alert(pair[0] + "=" + pair[1]);
	}
} 

function jps_PropertyString(){
	var stg = "";
	
	$('.dynamic').each(function(){ stg += (stg == "" ? "" : "&") + this.id + '=' + this.value });
	
	$('.jps_property').each(function(){
		if (this.tagName == 'polygon') stg += (stg == "" ? "" : "&") + this.id + '=' + pebbleColor(this.id);
		else stg += (stg == "" ? "" : "&") + this.id + '=' + this.value;
	});
}

function SetColor(polyID, colorKey){
	document.getElementById(polyID).setAttribute("fill", pebble_to_hex(colorKey));
	document.getElementById(polyID).setAttribute("data-hex", pebble_to_hex(colorKey));
}


