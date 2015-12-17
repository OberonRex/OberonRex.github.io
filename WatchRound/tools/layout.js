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
			
			var cInput = document.createElement('input');
			cInput.classList.add('jps_property');
			cInput.classList.add('jps_2ndColumn');
			cInput.classList.add('jps_Text');
			cInput.setAttribute('readonly', 'true');
			cInput.setAttribute('type', this.tagName == 'jps_intProperty' ? 'number' : 'text');
			if (this.hasAttribute('value')) cInput.setAttribute('value', this.getAttribute('value'));
			if (this.hasAttribute('id')) cInput.setAttribute('id', this.getAttribute('id'));
			if (this.hasAttribute('idtemplate')) cInput.setAttribute('idtemplate', this.getAttribute('idtemplate'));
			
			this.removeAttribute('value');
			this.removeAttribute('id');
			this.removeAttribute('idtemplate');
			this.innerHTML = "";
			
			cDiv.appendChild(cInput);
			this.appendChild(cDiv);
			
		});
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

	for (var ndx = 0; ndx < litems.length; ndx++)
		$(litems[ndx]).find( '[idtemplate]' ).each(function(){
			//var newID = this.getAttribute("idtemplate").replace("#", ndx);
			var newID = elem.id + ndx + this.getAttribute("idtemplate");
			this.setAttribute("id", newID );
		});
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

