function SaveIt(id){
	localStorage.setItem("list", "1");
	localStorage.setItem("key" + id + "_name", "Four Points");
	localStorage.setItem("key" + id + "_query", GenerateQueryString());
}

function RestoreIt(id){
	ImportValues(localStorage.getItem("key" + id + "_query"));
}

function LoadThis(evt){
	alert(evt.target);
}

var loaded = false;
function LoadSaved(uiID){
	if (!loaded){
		
	var lStg = localStorage.getItem("list");
	var values = lStg.split(",");
	var target = document.getElementById(uiID);

	for (var i=0;i<values.length;i++) {
		var keyName = "key" + values[i] + "_name";
		var keyQuery = "key" + values[i] + "_query";
	    
	    var sName = localStorage.getItem(keyName);
	    var sQuery = localStorage.getItem(keyQuery);
	    
	    var entry = document.createElement('li');
	    
	    //entry.appendChild(document.createTextNode(sName));
	    var anchor = document.createElement('a');
	    anchor.setAttribute('href', '#');
	    anchor.setAttribute('rel', "load")
	    //anchor.setAttribute("onclick", "alert(this)");
	    //anchor.onclick = function(){alert(this);};
	    anchor.innerText = sName;
	    anchor.setAttribute("query", sQuery);
	    $(anchor).click(function(){ alert(this); });
	    
	    entry.appendChild(anchor);
	    
	    //entry.setAttribute("onclick", "alert()");
	    target.appendChild(entry);
	    
		//$( '#uiList" ).on( 'click', LoadThis, 'a[rel="load"]');	   
		
		$( '#outer" ).on( 'click', 
			function( evt ){
				alert(evt.target);
			} ,
			'a[rel="load"]'
		);
		


	  }		
		
		loaded = true;
	}
}
