function SaveIt(id){
	localStorage.setItem("list", "1");
	localStorage.setItem("key" + id + "_name", "Four Points");
	localStorage.setItem("key" + id + "_query", GenerateQueryString());
}

function RestoreIt(id){
	ImportValues(localStorage.getItem("key" + id + "_query"));
}

function LoadThis(anchorID){
	var anchor = document.getElementById(anchorID);
	alert(anchor.getAttribute('query'));
}

function DeleteThis(anchorID){
	var anchor = document.getElementById(anchorID);
	alert(anchor.getAttribute('keyNum'));
}

function buildLoadAnchor(keyNum, sName, sQuery){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = "loadID"+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute("onclick", "LoadThis('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);

    anchor.innerText = sName;
    anchor.setAttribute("query", sQuery);
    return anchor;
}

function buildDeleteAnchor(keyNum){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = "delID"+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute("onclick", DeleteThis('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);
    
    anchor.innerText = "-";
    return anchor;
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

		var row = table.insertRow(table.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		cell1.innerHTML = buildLoadAnchor(values[i], sName, sQuery).outerHTML;
		cell2.innerHTML = buildDeleteAnchor(values[i], "-").outerHTML;
	  }		
		
		loaded = true;
	}
}
