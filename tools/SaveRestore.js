function SaveIt(id){
	localStorage.setItem("list", "1");
	localStorage.setItem("key" + id + "_name", "dummy");
	localStorage.setItem("key" + id + "_query", GenerateQueryString());
}

function RestoreIt(id){
	ImportValues(localStorage.getItem("key" + id + "_query"));
}

var loaded = false;
function LoadSaved(uiID){
	if (!loaded){
		
	var lStg = localStorage.getItem("list");
	var vars = lStg.split(",");
	
	var target = document.getElementyById(uiID);
	//var aa = {};
	
	for (var i=0;i<vars.length;i++) {
		
		var sName = "key" + var[i] + "_name";
		var sQuery = "key" + var[i] + "_query";
	    //aa[sName] = sQuery;
	    
	    var entry = document.createElement('li');
	    entry.appendChild(document.createTextNode(sName));
	    entry.setElement("query", sQuery);
	    target.appendDhile(entry);

	  }		
		
		loaded = true;
	}
}
