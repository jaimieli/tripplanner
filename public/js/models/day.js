// dependencies: days, DayView,

// builds a new day object and calls this.create() to save to server
var Day = function() {
  this.dayNum = days.length + 1;
  this.hotel = [];
  this.restaurant = [];
  this.thing = [];
  this.dayView = new DayView(this);
  this.dayBtnView = new DayBtnView(this);

  //save to the database
  this.create();
};

// make a new server-side day and set front-end day ID to server day ID
Day.prototype.create = function() {
  var self = this;
  $.post( '/day', {dayNum: this.dayNum} ).done( function(serverDay) {
    self._id = serverDay._id;
  });
};

Day.prototype.addActivity = function(type, id) {
  for (var i = 0; i < data[type].length; i++) {
    if (data[type][i]._id === id) {
      var foundActivity = data[type][i];
      var activityView  = new ActivityView(foundActivity, type);
      this[type].push(foundActivity);
      this.dayView.markers.push(activityView.marker);
      this.dayView.display[type].append(activityView.$el);
      break;
    }
  }
};