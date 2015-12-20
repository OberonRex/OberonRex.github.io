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
			cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');
			
			var cBoth = document.createElement('div');
			cBoth.classList.add('jps_clearboth');
			
			var cInput = document.createElement('input');
			cInput.classList.add('jps_property');
			cInput.classList.add('jps_2ndColumn');
			cInput.classList.add('jps_Text');
			cInput.setAttribute('readonly', 'true');
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
			cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');
			
			var cSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
			cSvg.setAttribute('version', '1.1');
			cSvg.setAttribute('width', 20);
			cSvg.setAttribute('height', 20);
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
			cDiv.classList.add(this.hasAttribute('long') ? 'jps_longColumn' : 'jps_stdColumn');

			var cSel = document.createElement('select');
			cSel.classList.add('jps_property');
			cSel.classList.add('jps_2ndColumn');
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
	
	var boxWidth = screen.width;
	if (boxWidth > 480) boxWidth = 360; else boxWidth = Math.min(screen.width, 480);
	boxWidth -= 20;
	var rule = ".jps_stdBox {width:" + boxWidth + "px;clear:both;}"
	document.styleSheets[0].insertRule(rule, 1);

	$('div#jps_MasterDiv').on('click', '.jps_AddButton', function() {jps_AddOne(this.parentElement, true)});
	$('div#jps_MasterDiv').on('click', '.jps_ListHeader', function(){jps_toggleShowList(this.parentElement);});
	$('div#jps_MasterDiv').on('click', '.jps_RemoveButton', function() {this.parentElement.remove()});
	
	$('div#jps_MasterDiv').on('focus', '.jps_Text', function(){this.removeAttribute('readonly')});
	$('div#jps_MasterDiv').on('blur', '.jps_Text', function(){this.setAttribute('readonly', true)});
	
	$('.jps_ColorSwatch, .jps_ColorPicker').each(function(){
		this.setAttribute('points', '8.85, 0.35 17.15, 5.15 17.15, 14.7 8.85, 19.5 0.6,	14.7 0.6, 5.15');
		this.setAttribute('stroke', '#000000');
		this.setAttribute('stroke-width', '1');
		this.setAttribute('fill', '#FFFFFF');
		this.classList.add('color-value');
		if (!this.classList.contains('jps_ColorPicker')) this.classList.add('jps_property');
	});
	
	$('div#jps_MasterDiv').on('click', '.jps_ColorSwatch', function(){EditColor(this);});

}

function jps_RenumberAllChildren(){
	$('.dynamic').each(function(){jps_RenumberChildren(this)});
}

function jps_RenumberChildren(elem){
	var litems = $(elem).children('.jps_ListItem:not(.jps_Template)');

	var cnt = 0;
	for (var ndx = 0; ndx < litems.length; ndx++)
		$(litems[ndx]).find( '[idtemplate]' ).each(function(){
			//var newID = this.getAttribute("idtemplate").replace("#", ndx);
			var newID = elem.id + ndx + this.getAttribute("idtemplate");
			this.setAttribute("id", newID );
		cnt++;
		});
	elem.setAttribute('value', cnt);
}

function jps_AddOne(pElem, show){
	var template = pElem.getElementsByClassName('jps_Template')[0];
	var clone = template.cloneNode(true);
	pElem.appendChild(clone);
	
	clone.classList.remove('jps_Template');
	
	clone.classList.remove('jps_showList');
	clone.classList.remove('jps_hideList');
	clone.classList.add( show ? 'jps_showList' : 'jps_hideList');
	
	//jps_RenumberChildren(pElem);
	//jps_RenumberAllChildren();
}

function jps_GoToPage(pageID){
	$('.jps_page').each(
		function(){
			this.style.display = this.id == pageID ? "block" : "none";	
		})
}

