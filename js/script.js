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
   
	var longitude = "";
	var latitude = "";
	var address = "";
	var name = "";
	var petType = "";
	var petSize = "";

  

  // Create a variable to reference the database
	var database = firebase.database();
	var petinfo = database.ref("classi/");

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
  petinfo.push({
		name: name,
		address: address,
		petType: petType,
		petSize: petSize,
		longitude: longitude,
		latitude: latitude,
		petProfile: petProfile()
	});
	
});


// 	var petType;
// 	var petSize;
	var petProfile;
// 	 var marker;


$("#findSitterSearch").on("click", function(event) {
	event.preventDefault();
	petProfileLocal = fpetProfile();
	console.log(petProfileLocal);
	// Store
	localStorage.setItem("petProfileLocal", petProfileLocal);

	redirect();
	
});	

//     function initialize(){
//     	mapG();
//     	var mapOptions = {
//     		zoom: 13, 
//     		center: new google.maps.LatLng(38.879970, -77.106770), 
//     		mapTypeId: google.maps.MapTypeId.ROADMAP
//     		};
//     	var map = new google.maps.Map($("#map").get(0), mapOptions);
// 	}
// 	google.maps.event.addDomListener(window, "load", initialize);



// function mapG(){
// 	petProfileLocal = localStorage.petProfileLocal;
// 	console.log(petProfileLocal);
// 	var geocoder = new google.maps.Geocoder();
//     var ref = firebase.database().ref("classi/").limitToFirst(1);
//     ref.orderByChild("petProfile")
//          .equalTo(petProfileLocal)
//          .on("child_added", function(snapshot) {
//           var data = snapshot.val();
//           console.log(data);
          
// // var toolArr = [];          
// // for (var i=0, len=data.length; i<len; i++) {
// //     for (var j=0, len2=data[i].length; j<len2; j++) {
// //         var tooltip = data[i][j]; 
// //     }
// // }
// //  toolArr.push(tooltip);
// //  console.log(toolArr);

// // 	var res=[];
// // 	$.each(data, function(i,n) {
// //     res.push(n);
// // 	});

// // var res = data.map(function (c) {
// //   return Object.keys(c).map(function (v) {
// //     return c[v];
// //   });
// // });
// // console.log(res);
// 			var address = data.address;
// 			address.toString();
// 		    console.log(address);
			

//         // for (var i = 0; i < data.length; i++) {
//             var marker;
//             geocoder.geocode({address: address}, function(results){
//                 marker = new google.maps.Marker({
//                     position: results[0].geometry.location,
//                     setMap: map
//                 });
				
// 				console.log(marker.position);
				
//                 // adds message balloon
//                 var infoWindow = new google.maps.InfoWindow({
//                     content: "This is: <h3>" + address + "</h3>"
//                 });
//                 infoWindow.open(map, marker);
//             });
 
//           //}
//       });
// localStorage.removeItem("petProfileLocal");
// }


// var data;

// function mapGlobal(){
// 	petProfileLocal = localStorage.petProfileLocal;
// 	console.log(petProfileLocal);
// 	var geocoder = new google.maps.Geocoder();
//     var ref = firebase.database().ref("classi/").limitToFirst(1);
//     ref.orderByChild("petProfile")
//          .equalTo(petProfileLocal)
//          .on("child_added", function(snapshot) {
//           var data = snapshot.val();
//           console.log(data);
          
// function valuesToArray(obj) {
//   return Object.keys(obj).map(function (key) { return obj[key]; });
// }
//     loc = valuesToArray(data);
//     console.log(loc[0]);
//     console.log(loc[1]);
//     });
// }

// var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();
var locations;


function initialize() {
    
    map = new google.maps.Map(
    document.getElementById("map"), {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();

        geocodeAddress(locations);

}
google.maps.event.addDomListener(window, "load", initialize);

function geocodeAddress(locations) {
    	petProfileLocal = localStorage.petProfileLocal;
	console.log(petProfileLocal);
	var geocoder = new google.maps.Geocoder();
    var ref = firebase.database().ref("classi/");
    ref.orderByChild("petProfile")
         .equalTo(petProfileLocal)
         .on("child_added", function(snapshot) {
          var data = snapshot.val();
          
        locations = valuesToArray(data);
   
   
    console.log(data);
    var title = locations[3];
    console.log(title);
    var address = locations[0];
    var url = locations[2];
    geocoder.geocode({
        'address': locations[0]
    },

    function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
                map: map,
                position: results[0].geometry.location,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address,
                url: url
            });
            infoWindow(marker, map, title, address, url);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
        } else {
            alert("geocode of " + address + " failed:" + status);
        }
    });
});
    localStorage.removeItem("petProfileLocal");
}

function infoWindow(marker, map, title, address, url) {
    google.maps.event.addListener(marker, 'click', function () {
        var html = "<div style='color:blue;'><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
        iw = new google.maps.InfoWindow({
            content: html,
            maxWidth: 350
        });
        iw.open(map, marker);
    });
    
    console.log("yes");
}

function createMarker(results) {
    var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
        map: map,
        position: results[0].geometry.location,
        title: title,
        animation: google.maps.Animation.DROP,
        address: address,
        url: url
    })
    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);
    infoWindow(marker, map, title, address, url);
    return marker;
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

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}

});