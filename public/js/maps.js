var myLatlng = new google.maps.LatLng(40.705786,-74.007672);

// set the map options hash
var mapOptions = {
  center: myLatlng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

// get the maps div's HTML obj
var map_canvas_obj = document.getElementById("mapView");

// initialize a new Google Map with the options
var map = new google.maps.Map(map_canvas_obj, mapOptions);

// // Add the marker to the map
// var marker = new google.maps.Marker({
//   position: myLatlng,
//   title:"Fullstack"
// });

// // Add the marker to the map by calling setMap()
// marker.setMap(map);