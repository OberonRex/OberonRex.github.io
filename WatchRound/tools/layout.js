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
		
	$('j-intProperty,j-stgProperty').each(function(){
		var cInner = this.innerHTML;
		this.classList.add('jps_ListItem');
		
		var cDiv = document.createElement('div');
		cDiv.innerHTML = cInner;
		cDiv.classList.add('jps_stdColumn');
		//cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');
		
		var cBoth = document.createElement('div');
		cBoth.classList.add('jps_clearboth');
		
		var cInput = document.createElement('input');
		cInput.classList.add('jps_property');
		cInput.classList.add('jps_ShortFloatRight');
		//cInput.classList.add('jps_FloatRight');
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
		//cSvg.classList.add('boxit');
		//cSvg.style.width = "40px";
		//var cSvg = document.getElementById("svgMaster").cloneNode(true);
		//cSvg.removeAttribute('id');
		
		//var cPoly = $(cSvg).find('polygon')[0]; //cSvg.childNodes[1];
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
				//if (this.selectedIndex == 1){
				//	this.parentElement.classList.add("jps_needsKey");
				//	this.parentElement.classList.remove("jps_noKey");
				//} else {
				//	this.parentElement.classList.remove("jps_needsKey");
				//	this.parentElement.classList.add("jps_noKey");
				//}
				var target = $(this.parentElement).next()[0];
				if (this.selectedIndex == 1) target.classList.remove('jps_hideKey'); //style.display = "inherit";
				else target.classList.add('jps_hideKey');//style.display = "none";
			
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

function wireUpFramework(){
	setupCustomElements();
	
	jps_LoadFontSize();
	jps_LoadBackgroundColor();
	jps_LoadFontColor();
	jps_LoadButtonColor();
	jps_LoadButtonFontColor();
	
	var boxWidth = screen.width;
	if (boxWidth > 640) boxWidth = 360; else boxWidth = Math.min(screen.width, 640);
	boxWidth -= 20;
	var rule = ".jps_stdBox {width:" + boxWidth + "px;clear:both;}"
	document.styleSheets[0].insertRule(rule, 1);

	$('div#jps_MasterDiv').on('click', '.jps_AddUserConfigButton', function() {jps_AddUserConfig()});
	$('div#jps_MasterDiv').on('click', '.jps_AddButton', function() {jps_AddOne(this.parentElement, true)});
	$('div#jps_MasterDiv').on('click', '.jps_ListHeader', function(){jps_toggleShowList(this.parentElement);});
	$('div#jps_MasterDiv').on('click', '.jps_RemoveButton', function() {this.parentElement.remove()});
	$('body').on('click', '.lButton, .slButton', function() {jps_GoToTarget(this)});
	
	$('div#jps_MasterDiv').on('focus', '.jps_Text', function(){this.removeAttribute('readonly'); this.style.border='1px solid black';});
	$('div#jps_MasterDiv').on('blur', '.jps_Text', function(){this.setAttribute('readonly', 'true'); this.style.border = 'none';});
	
	$('.jps_ColorSwatch, .jps_ColorPicker, jps_ColorPainter').each(function(){
		this.setAttribute('points', '8.85, 0.35 17.15, 5.15 17.15, 14.7 8.85, 19.5 0.6,	14.7 0.6, 5.15');
		this.setAttribute('stroke', '#000000');
		this.setAttribute('stroke-width', '1');
		this.setAttribute('fill', '#FFFFFF');
		this.classList.add('color-value');
		if (!this.classList.contains('jps_ColorPicker')) this.classList.add('jps_property');
	});
	
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

var LastMainButton;
var LastSubButton;
function jps_GoToTarget(elem){
	if (elem.classList.contains('lButton')) LastMainButton = elem;
	else LastSubButton = elem;
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
				
				document.getElementById('jps_Nav').style.display = this.hasAttribute('jps_MainPage') ? 'block' : 'none';
				document.getElementById('jps_Apply').style.display = this.hasAttribute('jps_Apply') ? 'block' : 'none';
				
				document.getElementById('jps_SubNav').style.display = this.hasAttribute('jps_subpage') ? 'block' : 'none';
				document.getElementById('jps_SubNav2').style.display = this.hasAttribute('jps_subpage') ? 'block' : 'none';
				
				if (this.classList.contains('jps_subpage')) currentSubPageID = pageID;
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
