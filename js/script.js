function initMap() {
    
	//Declared variables for locations to be put on the map
	var georgewashington = {
		info: '<strong>The George Washington University</strong><br>\
					950 N Glebe Rd<br> Arlington, VA 22203<br>\
					<a href="#">Get Directions</a>',
		lat: 38.881487,
		long: -77.116197
	};

	var arlpubschools = {
		info: '<strong>Arlington Public Schools</strong><br>\
					1426 N Quincy St<br> Arlington, VA 22207<br>\
					<a href="#">Get Directions</a>',
		lat: 38.888454,
		long: -77.108744
	};

	var chipotle = {
		info: '<strong>Chipotle Mexican Grill</strong><br>\r\
					4300 Wilson Blvd<br> Arlington, VA 22203<br>\
					<a href="#">Get Directions</a>',
		lat: 38.879694,
		long: -77.112697
	};

	var locations = [
      [georgewashington.info, georgewashington.lat, georgewashington.long, 0],
      [arlpubschools.info, arlpubschools.lat, arlpubschools.long, 1],
      [chipotle.info, chipotle.lat, chipotle.long, 2],
    ];
    
    //Grab the map ID in the index file and add the map
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(38.879970, -77.106770),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

 