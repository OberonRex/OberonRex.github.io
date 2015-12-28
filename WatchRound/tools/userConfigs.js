function findConfig(elem){
	while (!elem.classList.contains('jps_Config')) 
		elem = elem.parentElement;
	return elem;
}

function findInput(configElem){
  return configElem.getElementsByClassName('jps_ConfigName')[0];
}

function jps_AddUserConfig(){
	var newConfig = jps_AddOne(document.getElementById('jps_UserConfigWrapper'), true);
	var e = findInput(newConfig);
	e.value = "New";
	var l = e.value.length;
	e.setSelectionRange(l, l);
	e.value = e.value;
	e.focus();
	CaptureConfig(newConfig);
	SaveEverything();
}

function CaptureConfig(configElem){
	var propStg = Encode(jps_PropertyString());
	configElem.setAttribute('properties', propStg);
}

function user_SaveNewName(elem){
 	SaveEverything();
}

function user_Apply(configElem){
	ImportValues(Decode(configElem.getAttribute('properties')), false);
}

function user_Update(configElem){
	CaptureConfig(configElem);
	SaveEverything();
}

function user_Delete(configElem){
	configElem.remove();
	SaveEverything();
}

function SaveEverything(){
	var configRoot = document.getElementById('jps_UserConfigWrapper');
	var litems = $(configRoot).children('.jps_Config:not(.jps_Template)');
	localStorage.setItem("count", litems.length);
	for (var n = 0; n < litems.length; n++){
		var sProp = Encode(litems[n].getAttribute('properties'));
		var sName = Encode(findInput(litems[n]).value);
		localStorage.setItem(n, sName + "&" + sProp);
	}
}

function LoadConfigs(){
	var configRoot = document.getElementById('jps_UserConfigWrapper');
	var count = atoi(localStorage.getItem("count"));
	for (var n = 0; n < count; n++){
		var newConfig = jps_AddOne(configRoot, true);
		var fStg = localStorage.getItem(n);
		var pair = fStg.split('&');
		findInput(newConfig).value = pair[0];
		newConfig.setAttribute('properties', pair[1]);
	}
}
