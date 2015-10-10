function SaveIt(id){
	localStorage.setItem("list", "1");
	localStorage.setItem("key" + id + "_name", "Four Points");
	localStorage.setItem("key" + id + "_query", GenerateQueryString());
}

function RestoreIt(id){
	ImportValues(localStorage.getItem("key" + id + "_query"));
}

function LoadThis(liId){
	var li = document.getElementById(liId);
	ImportValues(li.getAttribute('query'));
}

var loaded = false;
function LoadSaved(tableID){
	if (!loaded){
		
	var lStg = localStorage.getItem("list");
	var values = lStg.split(",");
	var table = document.getElementById(tableID);

	for (var i=0;i<values.length;i++) {
		var keyName = "key" + values[i] + "_name";
		var keyQuery = "key" + values[i] + "_query";
	    
	    var sName = localStorage.getItem(keyName);
	    var sQuery = localStorage.getItem(keyQuery);

		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		
	    var anchor = document.createElement('a');
	    anchor.setAttribute('href', '#');
	    anchor.setAttribute('rel', "load")
	    var myId = "id"+i;
	    anchor.setAttribute('id', myId);
	    anchor.setAttribute("onclick", "LoadThis('" + myId + "')");
	    anchor.innerText = sName;
	    anchor.setAttribute("query", sQuery);

		cell1.innerHTML = anchor;
		cell2.innerHTML = "cell2";
	  }		
		
		loaded = true;
	}
}
