function SaveIt(id){
	localStorage.setItem("key" + id + "_name", "dummy");
	localStorage.setItem("key" + id + "_query", GenerateQueryString());
}

function RestoreIt(id){
	ImportValues(localStorage.getItem("key" + id + "_query"));
}

