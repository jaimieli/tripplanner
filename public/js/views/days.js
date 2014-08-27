// Dependencies: Days model (with addDay & dayBtnView), #daysContainer
// Renders add day button, days container (but not day buttons)

var DaysView = function () {
  var self = this;

  this.$el = $( this.render() );
  this.$addDay = this.$el.find('.addDay');
  this.$daysList = this.$el.find('.days-list');
  $('#days-container').prepend( this.$el );

  this.$addDay.on('click', function() {
    var newDay = days.addDay();
    self.$daysList.append(newDay.dayBtnView.$el);
    switchDay(newDay);
  });
};

DaysView.prototype.render = function() {
  return '<div><div class="btn-group days-list"></div>'+
          '<button type="button" class="btn btn-default addDay">'+
          '+ Add Day</button></div>';
};