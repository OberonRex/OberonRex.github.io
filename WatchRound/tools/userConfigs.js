function findConfig(elem){
	while (!elem.classList.contains('jps_Config')) 
		elem = elem.parentElement;
	return elem;
}

function findInput(configElem){
  return configElem.getElementsByClassName('jps_ConfigName')[0];
}

function jps_Found(root, base, n){
	var target = base + n;
	var found = false;
	$(root).find('.jps_ConfigName').each(function(){
		if (this.value == target) found = true;
	});
	return found;
}

function jps_AddUserConfig(){
	var root = document.getElementById('jps_UserConfigWrapper');
	
	var n = 1;
	var base = "New ";
	while (jps_Found(root, base, n)) n++;
	
	var newConfig = jps_AddOne(root, true);
	var e = findInput(newConfig);
	e.value = base + n;
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
	showTimed("Loaded");
}

function user_Update(configElem){
	if (confirm("Update with current settings? This cannot be undone.")){
		CaptureConfig(configElem);
		SaveEverything();
		showTimed("Updated");
	}
}

function user_Delete(configElem){
	if (confirm("Permanently delete? This cannot be undone.")){
		configElem.remove();
		SaveEverything();
	}
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
	var count = parseInt(localStorage.getItem("count"));
	for (var n = 0; n < count; n++){
		var newConfig = jps_AddOne(configRoot, true);
		var fStg = localStorage.getItem(n);
		var pair = fStg.split('&');
		findInput(newConfig).value = Decode(pair[0]);
		newConfig.setAttribute('properties', Decode(pair[1]));
	}
}
