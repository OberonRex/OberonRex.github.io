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
	alert("delete: " + anchor.getAttribute('keyNum'));
}

function EditThis(anchorID){
	var anchor = document.getElementById(anchorID);
	alert("edit: " + anchor.getAttribute('keyNum'));
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

function buildSimpleAnchor(keyNum, idBase, fcnName, text){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = idBase+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute("onclick", fcnName + "('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);
    
    anchor.innerText = text;
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
		var cell3 = row.insertCell(2);
		
		cell1.width = "100%";

		cell1.innerHTML = buildLoadAnchor(values[i], sName, sQuery).outerHTML;
		cell2.innerHTML = buildSimpleAnchor(values[i], "del", "DeleteThis", "Delete").outerHTML;
		cell3.innerHTML = buildSimpleAnchor(values[i], "edit", "EditThis", "Edit").outerHTML;
	  }		
		
		loaded = true;
	}
}
