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
  e.preventDefault()
  console.log('hotel');
});
var $thingAdd = $thingSelect.parent().next().children();
$thingAdd.click( function (e) {
  e.preventDefault()
  console.log('thing');
});
var $cafeAdd = $restaurantSelect.parent().next().children();
$cafeAdd.click( function (e) {
  e.preventDefault()
  console.log('cafe');
});
