// Dependencies: Day model, currentDay variable, dayView (setMarkersVisible),
// and #dayPanel

var days = [];
var currentDay;

days.addDay = function () {
  var newDay = new Day();
  this.push(newDay);
  return newDay;
};

var switchDay = function (day) {
  if (currentDay) currentDay.dayView.setMarkersVisible(false);
  currentDay = day;
  currentDay.dayView.setMarkersVisible(true);
  $('.day-view').html(currentDay.dayView.$el);
};