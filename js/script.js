$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhI4PHzfxptoOUJnW2FkrRI4w11o7_fAI",
    authDomain: "gw-pet-project.firebaseapp.com",
    databaseURL: "https://gw-pet-project.firebaseio.com",
    storageBucket: "gw-pet-project.appspot.com",
    messagingSenderId: "1010431917406"
  };
  firebase.initializeApp(config);
  
  //Geo code to get Long and Lat
  // var geocoder = new google.maps.Geocoder();
	var longitude = "";
	var latitude = "";
	var address = "";
	var name = "";
	var address = "";
	var petType = "";
	var petSize = "";

  
  // 	  geocoder.geocode( { 'address': address}, function(results, status) {
		// 	if (status == google.maps.GeocoderStatus.OK) {
  //   			latitude = results[0].geometry.location.lat();
  //   			longitude = results[0].geometry.location.lng();
  //   	} 
		// });
  

  // Create a variable to reference the database
	var database = firebase.database();

$("#becomeSitterSearch").on("click", function(event) {
  // prevent form from trying to submit
  event.preventDefault();

  // Get the input values from the form fields
  name = $("#name").val().trim();
  address = $("#address").val().trim();
  petType = $("#petType option:selected").text();
  petSize= $("#petSize option:selected").text();

  $("#sitterForm").html("<h3>Your information has been submitted successfully</h3>")
                  .addClass("alert alert-success fade in");
                  
    	
  // push results to firebase by setting the keys and values of the keys
  database.ref().push({
		name: name,
		address: address,
		petType: petType,
		petSize: petSize,
		longitude: longitude,
		latitude: latitude,
		petProfile: petProfile()
	});
	
});

// function initialize(){
// 	var mapOptions = {
// 		zoom: 13, 
// 		center: new google.maps.LatLng(38.879970, -77.106770), 
// 		mapTypeId: google.maps.MapTypeId.ROADMAP
// 		};
// 	var map = new google.maps.Map($("#map").get(0), mapOptions);
// 	}

	var petType;
	var petSize;
	var petProfile;
	var geocoder = new google.maps.Geocoder();

$("#findSitterSearch").on("click", function(event) {
	event.preventDefault();
	petProfileLocal = fpetProfile();
	console.log(petProfileLocal);
	// Store
	localStorage.setItem("petProfileLocal", petProfileLocal);

	redirect();
	
});	
mapG();

function mapG(){
	petProfileLocal = localStorage.petProfileLocal;
	console.log(petProfileLocal);

    var ref = firebase.database().ref();
    ref.orderByChild("petProfile")
         .equalTo(petProfileLocal)
         .on("child_added", function(snapshot) {
          var data = snapshot.val();

          console.log(data);
          for (var i = 0; i < data.length; i++) {
          	
            var address = data[i].address;
            console.log(address);
            var marker;
            geocoder.geocode({address: address}, function(results){
                marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map
                });
                // adds message balloon
                var infoWindow = new google.maps.InfoWindow({
                    content: "This is: <h3>" + address + "</h3>"
                });
                infoWindow.open(map, marker);
            });
          }
    });

localStorage.removeItem("petProfileLocal");
}



function redirect() {
    window.location.href = 'availablehosts.html';
}

function petProfile(){
	if ((petType === "Dog")&&(petSize === "1-20 lb")){
		return "A";
	} else if ((petType === "Dog")&&(petSize === "20-40 lb")){
		return "B";
	} else if ((petType === "Dog")&&(petSize === "40-60 lb")){
		return "C";
	} else if ((petType === "Cat")&&(petSize === "1-20 lb")){
		return "D";
	} else if ((petType === "Cat")&&(petSize === "20-40 lb")){
		return "E";
	} else if ((petType === "Cat")&&(petSize === "40-60 lb")){
		return "F";
	}
}


function fpetProfile(){

	petType = $("#fpetType option:selected").text();
	petSize = $("#fpetSize option:selected").text();

	if ((petType === "Dog")&&(petSize === "1-20 lb")){
		return "A";
	} else if ((petType === "Dog")&&(petSize === "20-40 lb")){
		return "B";
	} else if ((petType === "Dog")&&(petSize === "40-60 lb")){
		return "C";
	} else if ((petType === "Cat")&&(petSize === "1-20 lb")){
		return "D";
	} else if ((petType === "Cat")&&(petSize === "20-40 lb")){
		return "E";
	} else if ((petType === "Cat")&&(petSize === "40-60 lb")){
		return "F";
	}
}

});