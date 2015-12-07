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

function jps_MakeRW(inp){
	inp.removeAttribute('readonly');
}

function jps_MakeRO(inp){
	inp.setAttribute('readonly', true);
}

function wireUpFramework(){
	$('.jps_AddButton').on('click',function() {jps_AddOne(this.parentElement)});
	$('.jps_ListHeader').on('click', function(){jps_toggleShowList(this.parentElement);});
	
	$('.jps_AddButton').attr('href', '#');
	$('.jps_ListHeader').attr('href', '#');
	
}

function jps_AddOne(pElem){
	var template = document.getElementById(pElem.getAttribute('add'));
	var clone = template.cloneNode(true);
	pElem.appendChild(clone);
	
	var cb = document.getElementById('clearboth');
	clone = cb.cloneNode(true);
	pElem.appendChild(clone);
	
	wireUpFramework();
}
