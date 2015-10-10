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

function RenameThis(anchorID){
	var anchor = document.getElementById(anchorID);
	var newName = prompt("New name: ", anchor.getAttribute('desc'));
	SaveAll();
}

function CaptureThis(anchorID){
	var anchor = document.getElementById(anchorID);
	alert("edit: " + anchor.getAttribute('keyNum'));
}

function AddNew(){
	
}

function SaveAll(){
	var table = document.getElementById("SaveTable");
	var dictStg = "";
	for (var i = 1; i < table.rows.length){
		var row = table.rows[i];
		var cell = row.cells[0];
		alert(cell.getAttribute('query'));
		alert(cell.getAttribute('desc'));
	}
}

function buildLoadAnchor(keyNum, sName, sQuery){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = "loadID"+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute("onclick", "LoadThis('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);

    anchor.innerText = "Load";
    anchor.setAttribute("query", sQuery);
    return anchor;
}

function buildSimpleAnchor(keyNum, idBase, desc, fcnName, text){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = idBase+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute('desc', desc);
    anchor.setAttribute("onclick", fcnName + "('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);
    
    anchor.innerText = text;
    return anchor;
}

function LoadSaved(){
}
