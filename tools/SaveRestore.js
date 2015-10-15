
function MakeRWbyID(inpID){
	MakeRW(document.getElementById(inpID));
}

function MakeRObyID(inpID){
	MakeRO(document.getElementById(inpID));
}

function LoadThis(anchorID){
	var anchor = document.getElementById(anchorID);
	ImportValues(anchor.getAttribute('query'));
	allDone();
}

function keybase(){
	//return "key_" + WatchToken + "_";
	return "key";
}
//
function DeleteThis(anchorID){
	var anchor = document.getElementById(anchorID);
	var cell = anchor.parentNode;
	var row = cell.parentNode;
	
	var keyNum = anchor.getAttribute('keynum');
	var keyName = keybase() + keyNum + "_name";
	var keyQuery = keybase() + keyNum + "_query";
	localStorage.removeItem(keyName);
	localStorage.removeItem(keyQuery);
	
	var table  = document.getElementById("SaveTable");
	table.deleteRow(row.rowIndex);
	
	SaveAll();
	LoadSaved();
}

function SaveNewName(inpID){
	var inp = document.getElementById(inpID);

	var cell = inp.parentNode;
	var row = cell.parentNode;
	
	inp.setAttribute('readonly', true);
	inp.setAttribute('style', 'border:none');
	//inp.setAttribute('value', sName);

	var cell2 = row.cells[2];
	anchor = cell2.children[0];
	anchor.setAttribute('desc', inp.value);
	
	SaveAll();
	LoadSaved();
}

function CaptureThis(anchorID){
	var anchor = document.getElementById(anchorID);

	var cell = anchor.parentNode;
	var row = cell.parentNode;
	
	var cell1 = row.cells[1];
	anchor = cell1.children[0];
	anchor.setAttribute('query', GenerateQueryString());
	
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
	var table  = document.getElementById("SaveTable");
	
	for (var i = 0; InUse(table, i); i++);
	AddOne(table, i, "New", GenerateQueryString());

	SaveAll();
	LoadSaved();

	var e = document.getElementById('rename'+i);
	var l = e.value.length;
	e.setSelectionRange(l, l);
	//e.value = e.value;
	e.focus();
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
		
		localStorage.setItem(keybase() + keyNum + "_name", desc);
		localStorage.setItem(keybase() + keyNum + "_query", query);

	}
	localStorage.setItem(keybase() + "list", dictStg);
}

function buildLoadAnchor(keyNum, sName, sQuery){
    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#');
    var myId = "loadID"+keyNum;
    anchor.setAttribute('id', myId);
    anchor.setAttribute("onclick", "LoadThis('" + myId + "')");
    anchor.setAttribute('keyNum', keyNum);

    anchor.innerText = "Apply";
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

function buildInput(keyNum, sName){
	var inp = document.createElement('input');
	inp.setAttribute('type', 'text');
	inp.setAttribute('value', sName);
	inp.setAttribute('readonly', true);
	//inp.setAttribute('style', 'border:none');
	var myId = "rename" + keyNum;
	inp.setAttribute("id", myId);
	inp.setAttribute("onblur", "MakeRObyID('" + myId + "')");
	inp.setAttribute("onchange", "SaveNewName('" + myId + "')");
	inp.setAttribute("onfocus", "MakeRWbyID('" + myId + "')");
	return inp;
}

function AddOne(table, keyNum, sName, sQuery){
	var row = table.insertRow(table.rows.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	//var cell5 = row.insertCell(4);
	
	//cell1.width = "100%";

	cell1.innerHTML = buildInput(keyNum, sName).outerHTML;
	cell2.innerHTML = buildLoadAnchor(keyNum, sName, sQuery).outerHTML;
	cell3.innerHTML = buildSimpleAnchor(keyNum, "cap", sName, "CaptureThis", "Scan").outerHTML;
	cell4.innerHTML = buildSimpleAnchor(keyNum, "del", sName, "DeleteThis", "Del").outerHTML;	
}

function LoadSaved(){
	var table = document.getElementById("SaveTable");
	
	for (var i = table.rows.length-1; i > 0; i--) table.deleteRow(i);
		
	var lStg = localStorage.getItem("list");
	var values = lStg.split(",");

	for (var i=0; i<values.length; i++) {
		var keyName = keybase() + values[i] + "_name";
		var keyQuery = keybase() + values[i] + "_query";
	    
	    var sName = localStorage.getItem(keyName);
	    var sQuery = localStorage.getItem(keyQuery);
		AddOne(table, values[i], sName, sQuery);
	  }		
}
