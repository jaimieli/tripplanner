var $hotelSelect = $("#hotel-menu");
var $thingSelect = $("#things-menu");
var $restaurantSelect = $("#restaurant-menu");

all_hotels.forEach(function(hotel) {
  $hotelSelect.append("<option>" + hotel.name + "</option>");
});
all_things_to_do.forEach(function(thing) {
  $thingSelect.append("<option>" + thing.name + "</option>");
});
all_restaurants.forEach(function(cafe) {
  $restaurantSelect.append("<option>" + cafe.name + "</option>");
});

var $hotelAdd = $hotelSelect.parent().next().children();
$hotelAdd.click( function (e) {
  e.preventDefault();
  var hotelVal = $hotelSelect.val(),
      latLng,
      hName;
  all_hotels.forEach(function (hotelObj) {
    if (hotelObj.name === hotelVal) {
      latLng = hotelObj.place[0].location;
      hName = hotelObj.name;
    }
  });
  var gLatLng = new google.maps.LatLng(latLng[0],latLng[1]);
  var marker = new google.maps.Marker({
    position: gLatLng,
    title: hName
  });
  marker.setMap(map);
});

var $thingAdd = $thingSelect.parent().next().children();
$thingAdd.click( function (e) {
  e.preventDefault();
  var thingVal = $thingSelect.val(),
      latLng,
      tName;
  all_things_to_do.forEach(function (thingObj) {
    if (thingObj.name === thingVal) {
      latLng = thingObj.place[0].location;
      tName = thingObj.name;
    }
  });
  var gLatLng = new google.maps.LatLng(latLng[0],latLng[1]);
  var marker = new google.maps.Marker({
    position: gLatLng,
    title: tName
  });
  marker.setMap(map);
});

var $cafeAdd = $restaurantSelect.parent().next().children();
$cafeAdd.click( function (e) {
  e.preventDefault();
  var restaurantVal = $restaurantSelect.val(),
      latLng,
      rName;
  all_restaurants.forEach(function (restaurantObj) {
    if (restaurantObj.name === restaurantVal) {
      latLng = restaurantObj.place[0].location;
      rName = restaurantObj.name;
    }
  });
  var gLatLng = new google.maps.LatLng(latLng[0],latLng[1]);
  var marker = new google.maps.Marker({
    position: gLatLng,
    title: rName
  });
  marker.setMap(map);
});
