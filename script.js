var currentLocation; // stores the users locaton

getLocation();// starts the get locaton method and procceeds to update the location
function getLocation() { // checks if the locaton services is enabled
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError); // gets and sets the users location
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) { // returns the coordinate of the user
    currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); // returns the currentLocation of the user
    map.setCenter(currentLocation); // centers the map to the users currentLocation
    marker.setPosition(currentLocation);//sets the marker's position in the uers current Location
    infoWindow.setContent('<div><strong>You are here!</strong><br>');//Dispays the message to show the users location
    infoWindow.open(map, marker);//displays the message to the map on top of the marker
    map.setZoom(18);
    displayRoute(currentLocation,new google.maps.LatLng(-33.9898318,18.4724879));
    return currentLocation;// returns the updated users location
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


//set  upd the map
var mapOptions = {
    center: currentLocation, // default value to center the map
    zoom: 12,// define the default map size
    mapTypeId: google.maps.MapTypeId.ROADMAP//
};

var map = new google.maps.Map(document.getElementById('map'), mapOptions); // set

var markerOptions = {
    position: currentLocation
};
var marker = new google.maps.Marker(markerOptions);
marker.setMap(map);


var acOptions = {
  types: ['establishment']
};
var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
autocomplete.bindTo('bounds',map);
var infoWindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker({
  map: map
});

google.maps.event.addListener(autocomplete, 'place_changed', function() {
  infoWindow.close();
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(18);
  }
  marker.setPosition(place.geometry.location);
  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  infoWindow.open(map, marker);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);

  });
});
function displayRoute(start,end) {
    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.WALKING
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}
