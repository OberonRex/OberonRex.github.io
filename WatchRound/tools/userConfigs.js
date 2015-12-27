/*
* For everything to do with user configurations
*/

function findConfig(elem){
	while (!elem.classList.contains('jps_Config')) 
		elem = elem.parentElement;
	return elem;
}

function findInput(configElem){
  return configElem.getElementsByClassName('jps_ConfigName')[0];
}

function jps_AddUserConfig(parentElem){
	var newConfig = jps_AddOne(parentElem, true);
	var e = findInput(newConfig);
	e.value = "New";
	var l = e.value.length;
	e.setSelectionRange(l, l);
	e.value = e.value;
	e.focus();
	CaptureConfig(newConfig);
}

function CaptureConfig(configElem){
	var propStg = Encode(jps_PropertyString());
	configElem.setAttribute('properties', propStg);
}

function user_SaveNewName(elem){
  
}

function user_Apply(configElem){
	
}

function user_Update(configElem){
	
}

function user_Delete(configElem){
	alert("Delete");
}
