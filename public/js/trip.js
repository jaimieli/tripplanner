var $daysList = $('#days-list');
var $addDay = $('#addDay');

var $hotelSelect = $('#hotel-menu');
var $hotelAdd = $hotelSelect.parent().next().children();
var $thingSelect = $('#things-menu');
var $thingAdd = $thingSelect.parent().next().children();
var $restaurantSelect = $('#restaurant-menu');
var $cafeAdd = $restaurantSelect.parent().next().children();

var $dayTitle = $('#day-title');
var $dayHotel = $('#day-hotel');
var $dayThings = $('#day-things');
var $dayRestaurants = $('#day-restaurants');

var markers = [];
var days = [];
var currentDay;

var setAllMap = function (map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

var switchDay = function (dayTarget) {
  $dayTitle.html('Plan for Day ' + Number(dayTarget + 1) );
  $dayHotel.children().remove();
  $dayThings.children().remove();
  $dayRestaurants.children().remove();
  setAllMap(null);
  currentDay = days[dayTarget];
  currentDay.restaurants.forEach(function(el) {
    $dayRestaurants.append("<li>" + el + "</li>");
  });
  currentDay.things.forEach(function(el) {
    $dayThings.append("<li>" + el + "</li>");
  });
  if(currentDay.hotel) $dayHotel.append("<li>" + currentDay.hotel + "</li>");
};

var addDay = function () {
  var humanNum;
  days.push({
    hotel: null,
    things: [],
    restaurants: []
  });
  humanNum = days.length;
  switchDay(days.length-1);
  $daysList.append('<button type="button" class="btn btn-default btn-day" id="goToDay' + humanNum + '">Day ' + humanNum + '</button>');
  $( '#goToDay' + humanNum ).click( function (e) {
    e.preventDefault();
    switchDay( Number(humanNum - 1) );
    console.log( 'clicked go-to-' + humanNum );
  });
};

// Initialize first day
addDay();

var removeDay = function () {
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

var addMarker = function (obj, color) {
  var latLng,
      name,
      gLatLng,
      marker;
  color = color || 'red';
  latLng  = obj.place[0].location;
  name    = obj.name;
  gLatLng = new google.maps.LatLng(latLng[0],latLng[1]);
  marker  = new google.maps.Marker({
    position: gLatLng,
    title: name,
    icon: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
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

$hotelAdd.click( function (e) {
  var oldName;
  e.preventDefault();
  hotelObj = findObj($hotelSelect.val(), all_hotels);
  if ( $dayHotel.children().length === 1 ) {
    oldName = $dayHotel.children().html();
    markers[findMarkerIndex(oldName)].setMap(null);
    markers.splice( findMarkerIndex(oldName), 1 );
    $dayHotel.children().html(hotelObj.name);
  } else {
    $dayHotel.append("<li>" + hotelObj.name + "</li>");
  }
  addMarker(hotelObj, 'blue');
  currentDay.hotel = hotelObj.name;
});

$thingAdd.click( function (e) {
  e.preventDefault();
  if (currentDay.things.indexOf( $thingSelect.val() ) === -1) {
    obj = findObj($thingSelect.val(), all_things_to_do);
    addMarker(obj, 'yellow');
    $dayThings.append("<li>" + obj.name + "</li>");
    currentDay.things.push(obj.name);
  }
});

$cafeAdd.click( function (e) {
  e.preventDefault();
  obj = findObj($restaurantSelect.val(), all_restaurants);
  currentDay.restaurants.push(obj.name);
  if ( $dayRestaurants.children().length > 2 ) {
    oldName = currentDay.restaurants[0];
    markers[findMarkerIndex(oldName)].setMap(null);
    markers.splice( findMarkerIndex(oldName), 1 );
    $dayRestaurants.children().first().remove();
    currentDay.restaurants.shift();
  }
  $dayRestaurants.append("<li>" + obj.name + "</li>");
  addMarker(obj, 'green');
});
