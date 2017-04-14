if (window.localstorage) {

	var name = document.getElementById("name");
	var address = document.getElementById("address");

	name.value = localStorage.getItem("name");
	address.value = localStorage.getItem("address");

	name.addEventListener("becomeSitterSearch", function() {
		localStorage.setItem("name", name.value);
	}, false);

	address.addEventListener("input", function() {
		localStorage.setItem("address", address.value);
	}, false);

}