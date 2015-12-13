//var kcontainer;
var return_to = "pebblejs://close#";
function ImportInitialValues(){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	
	var properties = {};
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    properties[pair[0]] = pair[1];
	}
	
	//kcontainer = properties.KEY_CONTAINER;
	
	ImportValues(properties.KEY_CONTAINER);
	
	if ("return_to" in properties) return_to = decodeURIComponent(properties.return_to);
}

function Decode(stg){
	stg = stg.replace(/Q/g, '=');
	stg = stg.replace(/A/g, '&');
	//stg = stg.replace(/C/g, ':');
	
	stg = stg.replace(/%51/g, 'Q');
	stg = stg.replace(/%41/g, 'A');
	//stg = stg.replace(/%43/g, 'C');
	stg = stg.replace(/%25/g, '%');
	
	return stg;	
}

function Encode(stg){
	stg = stg.replace(/%/g, '%25');
	stg = stg.replace(/Q/g, '%51');
	stg = stg.replace(/A/g, '%41');
	//stg = stg.replace(/C/g, '%43');
	
	stg = stg.replace(/=/g, 'Q');
	stg = stg.replace(/&/g, 'A');
	//stg = stg.replace(/:/g, 'C');
	
	return stg;
	
}

var myProperties;
//var MyUUID;
//var DecodedPayload;
function ImportValues(stg){
	//var DecodedPayload = Decode(stg);

	var vars = Decode(stg).split("&");
	
	myProperties = {};

	for (var i=0; i<vars.length; i++) {
	    var pair = vars[i].split("=");
	    //myProperties[pair[0]] = pair[1];
	    
	    // can we find an element with the id?
	    var elem = document.getElementById(pair[0]);
	    if (elem != null){
	    	if ((elem.tagName == "DIV") && elem.classList.contains('jps_ListWrapper')){
	    		var cnt = parseInt(pair[1]);
	    		for(var n = 0; n < cnt; n++) jps_AddOne(elem, false);
	    	} else {
	    		elem.setAttribute("value", pair[1]);
	    	}
	    } else {
	    }
	    
	    //alert(pair[0] + "=" + pair[1]);
	}
	
	//for (var key in myProperties){
	//	var pair = myProperties[key].split(":");
	//	if (pair[1] == "n"){
	//		alert("we want to create " + pair[0] + " children for " + key);
	//	}
	//}
} 
