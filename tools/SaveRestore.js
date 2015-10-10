function LoadThis(anchorID){
	var anchor = document.getElementById(anchorID);
	ImportValues(anchor.getAttribute('query'));
}

function DeleteThis(anchorID){
	var anchor = document.getElementById(anchorID);
	var cell = anchor.parentNode;
	var row = cell.parentNode;
	
	var keyNum = anchor.getAttribute('keynum');
	var keyName = "key" + keyNum + "_name";
	var keyQuery = "key" + keyNum + "_query";
	localStorage.removeItem(keyName);
	localStorage.removeItem(keyQuery);
	
	var table  = document.getElementById("SaveTable");
	table.deleteRow(row.rowIndex);
	
	SaveAll();
	LOadSaved();
}

function RenameThis(anchorID){
	var anchor = document.getElementById(anchorID);
	var newName = prompt("New name: ", anchor.getAttribute('desc'));
	
	var cell = anchor.parentNode;
	var row = cell.parentNode;
	
	var cell0 = row.cells[0];
	cell0.innerHTML = newName;
		
	var cell2 = row.cells[2];
	anchor = cell2.children[0];
	anchor.setAttribute('desc', newName);
	
	SaveAll();
	LoadSaved();
}

function CaptureThis(anchorID){
	var anchor = document.getElementById(anchorID);

	var cell = anchor.parentNode;
	var row = cell.parentNode;
	
	var cell1 = row.cells[1];
	anchor = cell1.children[0];
	anchor.setAttribute('desc', GenerateQueryString());
	
	SaveAll();
	LoadSaved();
}

function InUse(table, candidate){
	for (var i = 1; i < table.rows.length; i++)
	{
		var row = table.rows[i];
		cell = row.cells[2];
		anchor = cell.children[0];
		var keyNum = anchor.getAttribute('keyNum');
		if (Number(keyNum) == candidate) return true;
	}
	return false;
}

function AddNew(){
	var newName = prompt("name", "New");
	var table  = document.getElementById("SaveTable");
	
	for (var i = 0; InUse(table, i); i++);
	AddOne(table, i, newName, GenerateQueryString());
	
	SaveAll();
	LoadSaved();
}

function SaveAll(){
	var table = document.getElementById("SaveTable");
	var dictStg = "";
	for (var i = 1; i < table.rows.length; i++){
		var row = table.rows[i];
		
		var cell = row.cells[1];
		var anchor = cell.children[0];
		var query = anchor.getAttribute('query');

		cell = row.cells[2];
		anchor = cell.children[0];
		var desc = anchor.getAttribute('desc');

		if (i > 1) dictStg += ",";
		var keyNum = anchor.getAttribute('keyNum');
		dictStg += keyNum;
		
		localStorage.setItem("key" + keyNum + "_name", desc);
		localStorage.setItem("key" + keyNum + "_query", query);

	}
	localStorage.setItem("list", dictStg);
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

function buildInput(sName){
	var inp = document.createElement('input');
	inp.setAttribute('type', 'text');
	inp.setAttribute('value', sName);
	inp.setAttribute('readonly', true);
	return inp;
}

function AddOne(table, keyNum, sName, sQuery){
	var row = table.insertRow(table.rows.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	
	cell1.width = "100%";

	cell1.innerHTML = buildInput(sName).outerHTML;//buildLoadAnchor(values[i], sName, sQuery).outerHTML;
	cell2.innerHTML = buildLoadAnchor(keyNum, sName, sQuery).outerHTML;
	cell3.innerHTML = buildSimpleAnchor(keyNum, "ren", sName, "RenameThis", "Rename").outerHTML;
	cell4.innerHTML = buildSimpleAnchor(keyNum, "cap", sName, "CaptureThis", "Recapture").outerHTML;
	cell5.innerHTML = buildSimpleAnchor(keyNum, "del", sName, "DeleteThis", "Delete").outerHTML;	
}

function LoadSaved(){
	var table = document.getElementById("SaveTable");
	
	for (var i = table.rows.length-1; i > 0; i--) table.deleteRow(i);
		
	var lStg = localStorage.getItem("list");
	var values = lStg.split(",");

	for (var i=0; i<values.length; i++) {
		var keyName = "key" + values[i] + "_name";
		var keyQuery = "key" + values[i] + "_query";
	    
	    var sName = localStorage.getItem(keyName);
	    var sQuery = localStorage.getItem(keyQuery);
		AddOne(table, values[i], sName, sQuery);
	  }		
}
