function jps_toggleShowList(wrapper){
	if (wrapper.classList.contains('jps_showList'))
	{
		wrapper.classList.remove('jps_showList');
		wrapper.classList.add('jps_hideList');
	} else {
		wrapper.classList.remove('jps_hideList');
		wrapper.classList.add('jps_showList');
	}
}

//function jps_MakeRW(inp){
//	inp.removeAttribute('readonly');
//}

//function jps_MakeRO(inp){
//	inp.setAttribute('readonly', true);
//}

function wireUpFramework(){
	$('div#jps_MasterDiv').on('click', '.jps_AddButton', function() {jps_AddOne(this.parentElement)});
	$('div#jps_MasterDiv').on('click', '.jps_ListHeader', function(){jps_toggleShowList(this.parentElement);});
	$('div#jps_MasterDiv').on('click', '.jps_RemoveButton', function() {jps_RemoveOne(this.parentElement)});
	
	//<input class="jps_2ndColumn" type="text" onblur="jps_MakeRO(this)" onfocus="jps_MakeRW(this)" readonly=true>
	$('div#jps_MasterDiv').on('focus', '.jps_Text', function(){this.removeAttribute('readonly')});
	$('div#jps_MasterDiv').on('blur', '.jps_Text', function(){this.setAttribute('readonly', true)});

}

function jps_AddOne(pElem){
	var template = pElem.getElementsByClassName('jps_Template')[0];
	var clone = template.cloneNode(true);
	pElem.appendChild(clone);
	
	clone.classList.remove('jps_Template');
	clone.classList.add('jps_ListItem');
	clone.classList.add('jps_ListWrapper');
}

function jps_RemoveOne(pElem){
	pElem.remove();
}
