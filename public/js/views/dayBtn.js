// dependencies: switchDay (in days model)

var DayBtnView = function (day) {
  this.day = day;
  this.$el = $( this.render() );
  var self = this;
  this.$el.on('click', function() {
    switchDay(self.day);
  });
};

DayBtnView.prototype.render = function() {
  return '<button class="btn btn-default">Day ' + this.day.dayNum + '</button>';
};