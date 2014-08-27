var DayView = function(day) {
  this.day = day;
  this.$el = $(this.render());
  this.markers = [];
  this.display = {
    hotel: this.$el.find('.day-hotel'),
    thing: this.$el.find('.day-things'),
    restaurant: this.$el.find('.day-restaurants')
  };
  // TODO: make switchDay work here or wherever so we are not duplicating stuff
  //currentDay = this.day;
  //$('.day-view').html(this.$el);
};

DayView.prototype.setMarkersVisible = function (showing) {
  this.markers.forEach( function (m) {
    m.setVisible(showing);
  });
};

DayView.prototype.render = function() {
  return '<div><h2 id="day-title">Plan for Day ' + this.day.dayNum + '</h2>'+
          '<ul class="list-unstyled dayPanel">'+
            '<li>'+
              '<h3>Hotel</h3>'+
              '<ul class="list-unstyled day-hotel">'+
              '</ul>'+
            '</li>'+
            '<li>'+
              '<h3>Restaurants</h3>'+
              '<ul class="list-unstyled day-restaurants">'+
              '</ul>'+
            '</li>'+
            '<li>'+
              '<h3>Things to Do</h3>'+
              '<ul class="list-unstyled day-things">'+
              '</ul>'+
            '</li>'+
          '</ul></div>';
};