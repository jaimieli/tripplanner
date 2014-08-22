var $hotelSelect = $('#hotel-menu');
var $thingSelect = $('#things-menu');
var $restaurantSelect = $('#restaurant-menu');
var $dayHotel = $('#day-hotel');
var $dayThings = $('#day-things');
var $dayRestaurants = $('#day-restaurants');
var $addDay = $('#addDay');
var $daysList = $('#days-list');
var $dayTitle = $('#day-title');

var markers = [];
var days = [];
var currentDay;
var addDay = function addDay () {
  days.push({
    hotel: null,
    things: [],
    restaurants: []
  });
  $daysList.append('<button type="button" class="btn btn-default btn-day" value="' + days.length + '">Day ' + days.length + '</button>');
  currentDay = days.length - 1;
  $dayTitle.html('Plan for Day ' + days.length);
};

// Initialize first day
addDay();

var removeDay = function removeDay () {
  days.pop();
};

var findObj = function (name, db) {
  for (var i = 0; i < db.length; i++) {
    if (db[i].name === name) return db[i];
  }
  return null;
};

var findMarkerIndex = function (title) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].title === title) return i;
  }
  return null;
};

var addMarker = function (obj) {
  var latLng,
      name,
      gLatLng,
      marker;
  latLng  = obj.place[0].location;
  name    = obj.name;
  gLatLng = new google.maps.LatLng(latLng[0],latLng[1]);
  marker  = new google.maps.Marker({
    position: gLatLng,
    title: name
  });
  markers.push(marker);
  marker.setMap(map);
};

$addDay.click( function (e) {
  e.preventDefault();
  addDay();
});

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
  var oldName;
  e.preventDefault();
  hotelObj = findObj($hotelSelect.val(), all_hotels);
  if ( $dayHotel.children().length === 1 ) {
    oldName = $dayHotel.children().html();
    markers[findMarkerIndex(oldName)].setMap(null);
    markers.splice( findMarkerIndex(oldName), 1 );
    console.log('tried to delete ' + oldName);
    $dayHotel.children().html(hotelObj.name);
  } else {
    $dayHotel.append("<li>" + hotelObj.name + "</li>");
  }
  addMarker(hotelObj);
  days[currentDay].hotel = hotelObj.name;
});

var $thingAdd = $thingSelect.parent().next().children();
$thingAdd.click( function (e) {
  e.preventDefault();
  obj = findObj($thingSelect.val(), all_things_to_do);
  addMarker(obj);
  $dayThings.append("<li>" + obj.name + "</li>");
});

var $cafeAdd = $restaurantSelect.parent().next().children();
$cafeAdd.click( function (e) {
  e.preventDefault();
  obj = findObj($restaurantSelect.val(), all_restaurants);
  addMarker(obj);
  $dayRestaurants.append("<li>" + obj.name + "</li>");
});
