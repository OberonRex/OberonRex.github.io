function DoExport(){
	var cp = document.getElementById("CopyPaste");
	cp.value = JSON.stringify(localStorage);
}

function DoImport(){
	//alert("coming soon but not yet implemented");
	localStorage.clear();

	var cp = document.getElementById("CopyPaste");
	var data = JSON.parse(cp.value);
	Object.keys(data).forEach(function (k){
		localStorage.setItem(k, data[k]);
	})
}

function testxxx(){
//	var ls = JSON.stringify(localStorage);
	//ls = JSON.stringify(ls);
	
//	var t;
//	var data = JSON.parse(ls);
//	Object.keys(data).forEach(function (k){
//		var t = data[k];
//	})
}

function activateInput(inpElem){
	inpElem.removeAttribute('readonly'); inpElem.style.border='1px solid black';
	inpElem.setSelectionRange(0, inpElem.value.length);
}
function deactivateInput(inpElem){
	inpElem.setAttribute('readonly', 'true'); inpElem.style.border = 'none';
}

function SetPage(pContext, elem){
	var value = elem.options[elem.selectedIndex].getAttribute('value');
	localStorage[pContext + "_page"] = value;
}

function LoadMainHomePageSetting(){
	var key = "main_page";
	var value = localStorage[key] != null ? localStorage[key] : "HomePage";
	
	$('#selectMainHomePage').val(value);
	
	if (value != "ConfigurationPage") jps_GoToPage(value);
	else jps_GoToPage(currentSubPageID);
}

function LoadConfigHomePageSetting(){
	var key = "config_page";
	
	var value = localStorage[key] != null ? localStorage[key] : "ConfigHomePage";
	$('#selectConfigHomePage').val(value);
	currentSubPageID = value;
	
	//if (localStorage[key] != null){
	//	var value = localStorage[key];
	//	$('#selectConfigHomePage').val(value);
	//	currentSubPageID = value;
	//}
}

function disableTip(id){
	document.getElementById(id).style.display = "none";
	var idKey = id + "_hide";
	localStorage[idKey] = true;
}

function jps_forceAllTips(value){
	$('j-Tip').each(function(){
		var idKey = this.id + "_hide";
		localStorage[idKey] = value;
		this.style.display = value ? "none" : "";
	});
}

function jps_loadAllTips(){
	$('j-Tip').each(function(){
		var idKey = this.id + "_hide";
		if (localStorage[idKey] != null) this.style.display = $.parseJSON(localStorage[idKey]) ? "none" : "";
		else this.style.display = "";
	});
}

function showTimed(stg){
	document.getElementById("TimedMsgInner").innerHTML = stg;
	document.getElementById("TimedMsg").style.display = "block";
	setTimeout(TimedOut, 1500);
}
function TimedOut(){
	document.getElementById("TimedMsg").style.display = "none";
}

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

function setupCustomElements(){
	document.registerElement('j-intProperty', {
		prototype: Object.create(HTMLDivElement.prototype)});

	document.registerElement('j-stgProperty', {
		prototype: Object.create(HTMLDivElement.prototype)});

	document.registerElement('j-colorProperty', {
		prototype: Object.create(HTMLDivElement.prototype)});
		
	document.registerElement('j-selectorProperty', {
		prototype: Object.create(HTMLDivElement.prototype)});
		
	document.registerElement('j-Tip', {
		prototype: Object.create(HTMLDivElement.prototype)});
		
	$('j-Tip').each(function(){
		var cInner = this.innerHTML;
		
		var clrDiv = document.createElement('div');
		clrDiv.classList.add('jps_clearboth');
		
		var boxDiv = document.createElement('div');
		boxDiv.style.border = "1px solid black";
		boxDiv.style.margin = "5px 5px 10px 5px";
		boxDiv.style.padding = "10px 5px 10px 5px";
		boxDiv.style.fontStyle = "italic";
		
		var cDiv = document.createElement('div');
		cDiv.innerHTML = "Tip: " + cInner;

		var bar = document.createElement('hr');
		bar.classList.add('hhr');
		bar.style.marginTop = "10px";
		bar.style.marginBottom = "10px";

		var disButton = document.createElement('div');
		disButton.setAttribute('target', this.id);
		disButton.innerHTML = "Don't show this tip again.";
		disButton.classList.add('mButton');
		disButton.classList.add('jButton');
		disButton.onclick = function(){disableTip(this.getAttribute('target'));};
		
		this.innerHTML = "";

		this.appendChild(clrDiv);
		boxDiv.appendChild(cDiv);
		boxDiv.appendChild(bar);
		boxDiv.appendChild(disButton);
		//boxDiv.appendChild(label);
		this.appendChild(boxDiv);
	});
		
	$('j-intProperty,j-stgProperty').each(function(){
		var cInner = this.innerHTML;
		this.classList.add('jps_ListItem');
		
		var cDiv = document.createElement('div');
		cDiv.innerHTML = cInner;
		cDiv.classList.add('jps_stdColumn');

		var cBoth = document.createElement('div');
		cBoth.classList.add('jps_clearboth');
		
		var cInput = document.createElement('input');
		cInput.classList.add('jps_property');
		cInput.classList.add('jps_ShortFloatRight');
		cInput.classList.add('jps_Text');
		cInput.setAttribute('readonly', 'true');
		cInput.style.border = "none";
		cInput.setAttribute('type', this.tagName == 'J-INTPROPERTY' ? 'number' : 'text');
		if (this.hasAttribute('value')) cInput.setAttribute('value', this.getAttribute('value'));
		if (this.hasAttribute('id')) cInput.setAttribute('id', this.getAttribute('id'));
		if (this.hasAttribute('idtemplate')) cInput.setAttribute('idtemplate', this.getAttribute('idtemplate'));
		
		this.removeAttribute('value');
		this.removeAttribute('id');
		this.removeAttribute('idtemplate');
		this.innerHTML = "";
		
		this.appendChild(cDiv);
		this.appendChild(cInput);
		this.appendChild(cBoth);
		
	});
	
	$('j-colorProperty').each(function(){
		var cInner = this.innerHTML;
		this.classList.add('jps_ListItem');
		
		var cDiv = document.createElement('div');
		cDiv.innerHTML = cInner;
		//cDiv.style.float = "left";
		cDiv.classList.add('jps_stdColumn');
		//cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');

		var cSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
		cSvg.setAttribute('version', '1.1');
		cSvg.setAttribute('width', 20);
		cSvg.setAttribute('height', 20);
		cSvg.classList.add('jps_FloatRight');

		var cPoly = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
		cPoly.classList.add('jps_property');
		cPoly.classList.add('jps_ColorSwatch');
		if (this.hasAttribute('id')) cPoly.setAttribute('id', this.getAttribute('id'));
		if (this.hasAttribute('idtemplate')) cPoly.setAttribute('idtemplate', this.getAttribute('idtemplate'));

		var cBoth = document.createElement('div');
		cBoth.classList.add('jps_clearboth');
		
		this.removeAttribute('value');
		this.removeAttribute('id');
		this.removeAttribute('idtemplate');
		this.innerHTML = "";
		
		this.appendChild(cDiv);
		//this.appendChild(document.getElementById('xxx').cloneNode(true));
		this.appendChild(cSvg);
		cSvg.appendChild(cPoly);
		this.appendChild(cBoth);
		
	});

	$('j-selectProperty').each(function(){
		var cInner = this.innerHTML;
		this.classList.add('jps_ListItem');
		
		var cDiv = document.createElement('div');
		cDiv.innerHTML = cInner;
		cDiv.classList.add('jps_stdColumn');
		//cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');

		var cSel = document.createElement('select');
		cSel.classList.add('jps_property');
		cSel.classList.add('jps_ShortFloatRight');
		//cSel.classList.add('jps_FloatRight');
		if (this.hasAttribute('id')) cSel.setAttribute('id', this.getAttribute('id'));
		if (this.hasAttribute('idtemplate')) cSel.setAttribute('idtemplate', this.getAttribute('idtemplate'));
		
		if (this.getAttribute('id')=='ws'){
			$(cSel).on('change', function() {
				var target = findListItem(document.getElementById('wk'));
				if (this.selectedIndex == 1) target.classList.remove('jps_hideKey');
				else target.classList.add('jps_hideKey');
			
			});
		}

		var opts = this.getAttribute('options').split(',');
		for (var n = 0; n < opts.length; n++)
			{
				var opt = document.createElement("option");
				opt.value = n;
				opt.innerHTML = opts[n];
				cSel.appendChild(opt);
			}
		var cBoth = document.createElement('div');
		cBoth.classList.add('jps_clearboth');
			
		this.removeAttribute('value');
		this.removeAttribute('id');
		this.removeAttribute('idtemplate');
		this.innerHTML = "";
		
		this.appendChild(cDiv);
		this.appendChild(cSel);
		this.appendChild(cBoth);
			
	});
}

function findWrapper(elem){
	while (!elem.classList.contains('jps_ListWrapper')) elem = elem.parentElement;
	return elem;
}
function findListItem(elem){
	while (!elem.classList.contains('jps_ListItem')) elem = elem.parentElement;
	return elem;
}

var production = false;
function wireUpFramework(){
	setupCustomElements();
	
	var boxWidth = screen.width;
	if (!production) {
		if (boxWidth > 640) boxWidth = 360; else boxWidth = Math.min(screen.width, 640);
	}
		
	boxWidth -= 20;
	var rule = ".jps_stdBox {width:" + boxWidth + "px;clear:both;}"
	document.styleSheets[0].insertRule(rule, 1);

	$('div#jps_MasterDiv').on('click', '.jps_AddUserConfigButton', function() {jps_AddUserConfig()});
	
	$('div#jps_MasterDiv').on('click', '.jps_AddButton', function() {jps_AddOne(findWrapper(this), true)});
	$('div#jps_MasterDiv').on('click', '.jps_ListHeader', function(){jps_toggleShowList(findWrapper(this));});
	$('div#jps_MasterDiv').on('click', '.jps_RemoveButton', function() {findWrapper(this).remove()});
	
	$('body').on('click', '.lButton, .slButton', function() {jps_GoToTarget(this)});
	//$('body').on('mousedown', '.mButton, oButton', function(){jps_Click(this)});
	//$('body').on('mouseup', '.mButton, oButton', function(){jps_UnClick(this)});
	
	$('div#jps_MasterDiv').on('focus', '.jps_Text', function(){activateInput(this)});
	$('div#jps_MasterDiv').on('blur', '.jps_Text', function(){deactivateInput(this)});
	
	$('.jps_ColorSwatch, .jps_ColorPicker, jps_ColorPainter').each(function(){
		this.setAttribute('points', '8.85, 0.35 17.15, 5.15 17.15, 14.7 8.85, 19.5 0.6,	14.7 0.6, 5.15');
		this.setAttribute('stroke', '#000000');
		this.setAttribute('stroke-width', '1');
		this.setAttribute('fill', '#FFFFFF');
		this.classList.add('color-value');
		if (!this.classList.contains('jps_ColorPicker')) this.classList.add('jps_property');
	});

	jps_LoadFontSize();
	jps_LoadBackgroundColor();
	jps_LoadFontColor();
	
	jps_LoadButtonColor();
	jps_LoadButtonFontColor();
	jps_LoadButtonClickColor();
	
	jps_LoadAlertColor();
	jps_LoadAlertFontColor();
	
	jps_loadAllTips();
	
	// Do Config first
	LoadConfigHomePageSetting();
	LoadMainHomePageSetting();
	
	
}

function jps_RenumberAllChildren(){
	$('.dynamic').each(function(){
		jps_RenumberChildren(this)
	});
}

function jps_RenumberChildren(elem){
	var litems = $(elem).children('.jps_ListItem:not(.jps_Template)');

	for (var ndx = 0; ndx < litems.length; ndx++)
		$(litems[ndx]).find( '[idtemplate]' ).each(function(){
			//var newID = this.getAttribute("idtemplate").replace("#", ndx);
			var newID = elem.id + ndx + this.getAttribute("idtemplate");
			this.setAttribute("id", newID );
		});
	elem.value = litems.length;
}

function jps_AddOne(pElem, show){
	var template = pElem.getElementsByClassName('jps_Template')[0];
	var clone = template.cloneNode(true);
	pElem.appendChild(clone);
	
	clone.classList.remove('jps_Template');
	
	clone.classList.remove('jps_showList');
	clone.classList.remove('jps_hideList');
	clone.classList.add( show ? 'jps_showList' : 'jps_hideList');
	
	return clone;
}

function jps_Click(elem){
	elem.style.backgroundColor = ButtonClickColor;	
}
function jps_UnClick(elem){
	elem.style.backgroundColor = ButtonColor;
}

function AdjustMenuButtons(menuID, pageID){
	$(document.getElementById(menuID)).children('.jButton').each(function(){
		if (this.getAttribute('target') == pageID)
		{
			this.style.backgroundColor = ButtonClickColor;
			//this.scrollIntoView(); Doesn't work
		}
		else this.style.backgroundColor = ButtonColor;
	});
	//$(document.getElementById(menuID)).children('.jButton').css('backgroundColor', this.getAttribute('page') == pageID ? ButtonClickColor : ButtonColor);
}

//var LastMainButton;
//var LastSubButton;
function jps_GoToTarget(elem){
	//if (elem.classList.contains('lButton')) LastMainButton = elem;
	//else LastSubButton = elem;
	if (elem.classList.contains('hasSubPages')) jps_GoToPage(currentSubPageID);
	else jps_GoToPage(elem.getAttribute('target'));
}

var prevSubPageID;
var currentSubPageID = "ConfigHomePage";
var prevPageID;
var currentPageID = "HomePage";
function jps_GoToPage(pageID){
	$('[page="' + currentPageID + '"]')[0].setAttribute(sTop, document.getElementById("jps_MasterDiv").scrollTop);

	$('.jps_page').each(
		function(){
			if (this.getAttribute('page').toLowerCase() == pageID.toLowerCase()){
				this.style.display = "block";
				
				prevPageID = currentPageID;
				currentPageID = pageID;
				
				// If a main page or subpage, show main navigation bar
				document.getElementById('jps_Nav').style.display = 
					(this.hasAttribute('jps_ShowMainNav') || this.hasAttribute('jps_subpage')) ? 'block' : 'none';
				
				// Show reset/cancel/apply buttons?
				document.getElementById('jps_Apply').style.display = this.classList.contains('jps_noApply') ? 'none' : 'block';

				// If subpage, show sub navigation bar
				document.getElementById('jps_SubNav').style.display = this.hasAttribute('jps_subpage') ? 'block' : 'none';
				document.getElementById('jps_SubNav2').style.display = this.hasAttribute('jps_subpage') ? 'block' : 'none';
				
				// If it's a sub page...
				if (this.hasAttribute('jps_subpage')) {
					// remember pageID as currentSubPageID
					currentSubPageID = pageID;
					// show or don't show color tools
					document.getElementById('jps_ColorEditors').style.display = this.hasAttribute('noColorEditors') ? 'none' : 'block';
					AdjustMenuButtons('jps_SubNav', pageID);
					AdjustMenuButtons('jps_MainNav', 'ConfigurationPage');
				}
				// don't show color tools
				else {
					if (this.hasAttribute('jps_ShowMainNav')) AdjustMenuButtons('jps_MainNav', pageID);
					document.getElementById('jps_ColorEditors').style.display = 'none';
				}
			}
			else this.style.display = "none";	
		});
	var sTop = 0;
	if ($('[page="' + currentPageID + '"]')[0].hasAttribute('sTop'))
		sTop = $('[page="' + currentPageID + '"]')[0].getAttribute('sTop');
	document.getElementById("jps_MasterDiv").scrollTop = sTop;
}

function jps_Return(){
	jps_GoToPage(prevPageID);
}
