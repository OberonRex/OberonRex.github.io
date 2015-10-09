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
	alert('LoadSaved');
	if (!loaded){
		
	var lStg = localStorage.getItem("list");
	var values = lStg.split(",");
	var target = document.getElementById(uiID);
	//var aa = {};
	
	for (var i=0;i<vars.length;i++) {
		var sName = "key" + values[i] + "_name";
		var sQuery = "key" + values[i] + "_query";
	    
	    alert(sName);
	    alert(sQuery);
	    
	    var entry = document.createElement('li');
	    entry.appendChild(document.createTextNode(sName));
	    entry.setElement("query", sQuery);
	    target.appendChild(entry);

	  }		
		
		loaded = true;
	}
}
