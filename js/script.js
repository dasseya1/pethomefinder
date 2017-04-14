$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBhI4PHzfxptoOUJnW2FkrRI4w11o7_fAI",
        authDomain: "gw-pet-project.firebaseapp.com",
        databaseURL: "https://gw-pet-project.firebaseio.com",
        storageBucket: "gw-pet-project.appspot.com",
        messagingSenderId: "1010431917406"
    };
    firebase.initializeApp(config);

   // Global variables
    var address = "";
    var name = "";
    var petType = "";
    var petSize = "";
    var petProfile;
    var description = "";
    var map;
    var bounds = new google.maps.LatLngBounds();
    var locations;
    var aboutme = "About me:";


    // Create a variable to reference the database
    var database = firebase.database();
    var petinfo = database.ref("classi/");

    $("#becomeSitterSearch").on("click", function(event) {
        // prevent form from trying to submit
        event.preventDefault();

        // Get the input values from the form fields
        name = $("#name").val().trim();
        address = $("#address").val().trim();
        description = $("#description").val().trim();
        petType = $("#petType option:selected").text();
        petSize = $("#petSize option:selected").text();
        
        //This message appears when user clicks the submit button and info is sent successfully
        $("#sitterForm").html("<h3>Your information has been submitted successfully</h3>")
            .addClass("alert alert-success fade in");


        // push results to firebase by setting the keys and values
        petinfo.push({
            name: name,
            address: address,
            petType: petType,
            petSize: petSize,
            description: description,
            petProfile: petProfile()
        });

    });


    $("#findSitterSearch").on("click", function(event) {
        event.preventDefault();
        petProfileLocal = fpetProfile();
        
        // Store search options selected by user on client side (local storage)
        localStorage.setItem("petProfileLocal", petProfileLocal);

        //Redirect to the results page
        redirect();

    });

    //Google maps API function starts here
    function initialize() {
        map = new google.maps.Map(
            document.getElementById("map"), {
                center: new google.maps.LatLng(37.4419, -122.1419),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            })
        geocoder = new google.maps.Geocoder();

        geocodeAddress(locations);

    }
    google.maps.event.addDomListener(window, "load", initialize);

    function geocodeAddress(locations) {
        petProfileLocal = localStorage.petProfileLocal;
        var geocoder = new google.maps.Geocoder();
        var ref = firebase.database().ref("classi/");
        ref.orderByChild("petProfile")
            .equalTo(petProfileLocal)
            .on("child_added", function(snapshot) {
                var data = snapshot.val();
                
                locations = valuesToArray(data);

                var name = locations[2];
                var address = locations[0];
                var description = locations[1];
                geocoder.geocode({
                        'address': locations[0]
                    },

                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var marker = new google.maps.Marker({
                                icon: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
                                map: map,
                                position: results[0].geometry.location,
                                name: name,
                                animation: google.maps.Animation.DROP,
                                address: address,
                                description: description
                            });
                            infoWindow(marker, map, name, address, description);
                            bounds.extend(marker.getPosition());
                            map.fitBounds(bounds);
                        } else {
                            alert("geocode of " + address + " failed: " + status);
                        }
                    });
            });
        //Clear the local storage
        localStorage.removeItem("petProfileLocal");
    }
    
    //Add markers on the map
    function infoWindow(marker, map, name, address, description) {
        google.maps.event.addListener(marker, 'click', function() {
            var html = "<div style='color:blue;'><h3>" + name + "</h3><p>" + address + "</p><h5 style='text-decoration: underline;'>" + aboutme + "</h5><p>" + description + "</p></div>";
            iw = new google.maps.InfoWindow({
                content: html,
                maxWidth: 500
            });
            iw.open(map, marker);
        });

    }
    
    //Create the markers
    function createMarker(results) {
        var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
            map: map,
            position: results[0].geometry.location,
            name: name,
            animation: google.maps.Animation.DROP,
            address: address,
            description: description
        })
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
        infoWindow(marker, map, name, address, description);
        return marker;
    }
    
    //This function redirects to the availablehosts page
    function redirect() {
        window.location.href = 'availablehosts.html';
    }

    //Combine two selected options to one and save it to firebase (for Pet Sitters)
    function petProfile() {
        if ((petType === "Dog") && (petSize === "1-20 lb")) {
            return "A";
        } else if ((petType === "Dog") && (petSize === "20-40 lb")) {
            return "B";
        } else if ((petType === "Dog") && (petSize === "40-60 lb")) {
            return "C";
        } else if ((petType === "Cat") && (petSize === "1-20 lb")) {
            return "D";
        } else if ((petType === "Cat") && (petSize === "20-40 lb")) {
            return "E";
        } else if ((petType === "Cat") && (petSize === "40-60 lb")) {
            return "F";
        }
    }

    //Combine two selected options to one and save it to firebase (for Customers)
    function fpetProfile() {

        petType = $("#fpetType option:selected").text();
        petSize = $("#fpetSize option:selected").text();

        if ((petType === "Dog") && (petSize === "1-20 lb")) {
            return "A";
        } else if ((petType === "Dog") && (petSize === "20-40 lb")) {
            return "B";
        } else if ((petType === "Dog") && (petSize === "40-60 lb")) {
            return "C";
        } else if ((petType === "Cat") && (petSize === "1-20 lb")) {
            return "D";
        } else if ((petType === "Cat") && (petSize === "20-40 lb")) {
            return "E";
        } else if ((petType === "Cat") && (petSize === "40-60 lb")) {
            return "F";
        }
    }

    //Transform muliple objects to an array of arrays
    function valuesToArray(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    }

});