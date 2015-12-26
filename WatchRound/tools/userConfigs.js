/*
* For everything to do with user configurations
*/
function findInput(parentElem){
  return parentElem.getElementsByClassName('jps_Text')[0];
}

function jps_AddUserConfig(parentElem){
	var e = findInput(jps_AddOne(pElem, true));
	var l = e.value.length;
	e.setSelectionRange(l, l);
	e.value = e.value;
	e.focus();
}

function user_SaveNewName(elem){
  
}
