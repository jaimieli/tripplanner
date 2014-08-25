var $daysList = $('#days-list');
var $addDay = $('#addDay');
var $dayTitle = $('#day-title');
var days = [];
var types = ['hotel', 'thing', 'restaurant'];
var selectors = {};
var currentDay;

// Build selectors[] & DOM <option>s
types.forEach( function (type) {
  selectors[type] = $('#' + type + 'Select');
  data[type].forEach( function (activity) {
    selectors[type].append('<option value="' + activity._id + '">' + activity.name + '</option>');
  });
});

// get hotel, thing, or restaurant object by id
var findById = function (type, id) {
  for (var i = 0; i < data[type].length; i++) {
    if ( data[type][i]._id === id ) {
      return data[type][i];
    }
  }
  return null;
};

// add click events to 'add' activity buttons
$('.addToDay').on( 'click', function(e) {
  e.preventDefault();
  var type = $(this).attr('data-select');
  var selection = $(selectors[type]);
  var id = selection.val();

  if (!currentDay) return alert('You need to select a day before adding activities');

  if ( type === 'hotel' || (type === 'restaurant' &&
                      currentDay[type].length === 3) ) {
    currentDay[type].shift();
  }
  currentDay[type].push( findById(type,id) );
  renderDayPanel();
  putMarkersOnMap();
});

var days = [];
var currentDay;

// Day constructor with properties
var Day = function() {
  this.dayNum     = days.length + 1;
  this.hotel      = [];
  this.thing      = [];
  this.restaurant = [];
  this.markers    = [];
};
Day.prototype.addActivity = function(type, id) {
  // body...
};

// pushes new Day, calls switchDay, appends button w/ click
var addDay = function () {
  var humanNum;
  days.push( new Day() );
  humanNum = days.length;
  switchDay(days.length-1);
  $daysList.append('<button type="button" class="btn btn-default btn-day" id="goToDay' + humanNum + '">Day ' + humanNum + '</button>');
  $( '#goToDay' + humanNum ).click( function (e) {
    e.preventDefault();
    switchDay( Number(humanNum - 1) );
  });
};

// this is the button which calls addDay
$addDay.click( function (e) {
  e.preventDefault();
  addDay();
});

// takes activity object and returns google API coordinates
var getGLatLng = function(activity) {
  var latLngArr = activity.place[0].location;
  return new google.maps.LatLng(latLngArr[0], latLngArr[1]);
};

// deletes markers from map and from markers[]
var clearMarkers = function () {
  while (currentDay.markers.length) {
    currentDay.markers.pop().setMap(null);
  }
};

// draws markers for currentDay and sets them as markers[]
var putMarkersOnMap = function () {
  if (currentDay.markers) {
    clearMap(null);
    currentDay.markers = [];
  }
  types.forEach( function (type) {
    var color = {
      hotel : 'blue',
      thing : 'yellow',
      restaurant : 'green'
    }[type];
    currentDay[type].forEach ( function (activity) {
      currentDay.markers.push( new google.maps.Marker({
        map: map,
        title: activity.name,
        position: getGLatLng(activity),
        icon: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
      }));
    });
  });
};

// renders itinerary DOM based on currentDay
var renderDayPanel = function() {
  var str = '<li><h3>Hotel</h3><ul class="list-unstyled">';
  currentDay.hotel.forEach(function(h) {
    str += '<li>' + h.name + '</li>';
  });
  str += '</ul></li><li><h3>Restaurants</h3><ul class="list-unstyled">';
  currentDay.restaurant.forEach(function(h) {
    str += '<li>' + h.name + '</li>';
  });
  str += '</ul></li><li><h3>Things to Do</h3><ul class="list-unstyled">';
  currentDay.thing.forEach(function(h) {
    str += '<li>' + h.name + '</li>';
  });
  str += '</ul></li>';
  $('#day-panel').html(str);
};

// sets all currentDay.markers to null map
var clearMap = function () {
  for (var i = 0; i < currentDay.markers.length; i++) {
    currentDay.markers[i].setMap(null);
  }
};

// change DOM title, clears today map, switches days & draws
var switchDay = function (dayTarget) {
  $dayTitle.html('Plan for Day ' + Number(dayTarget + 1) );
  if (currentDay) clearMap();
  currentDay = days[dayTarget];
  renderDayPanel();
  putMarkersOnMap();
};

// not working yet
var findMarkerIndex = function (title) {
  for (var i = 0; i < currentDay.markers.length; i++) {
    if (currentDay.markers[i].title === title) return i;
  }
  return null;
};

// not currently working
var removeItem = function(name, type) {
  console.log('Trying to delete '+ name + ' of ' + type);
  currentDay.markers[findMarkerIndex(name)].setMap(null);
  currentDay.markers.splice( findMarkerIndex(name), 1 );
  if (type === 'hotel') {
    currentDay.hotel = '';
  } else if (type === 'thing') {
    currentDay.things.splice(currentDay.things.indexOf(name), 1);
  } else {
    currentDay.restaurants.splice(currentDay.restaurants.indexOf(name), 1);
  }
};

// Instantiate the first day. :-)
addDay();