var ActivitiesView = function(type) {
  var self  = this;
  var label = {hotel: 'Hotels', restaurant: 'Restaurants', thing: 'Things to Do'};

  this.type = type;
  this.$el = $( this.render(label[type]) );
  this.$select = this.$el.find('select');
  this.$button = this.$el.find('button');
  this.populateList();
  $('.top-row').append( this.$el );

  this.$button.on('click', function (e) {
    e.preventDefault();
    var id = self.$select.val();
    currentDay.addActivity(self.type,id);
  });
};

ActivitiesView.prototype.populateList = function() {
  var self = this;
  data[this.type].forEach( function (datum) {
    self.$select.append('<option value="' + datum._id + '">' + datum.name + '</option>');
  });
};

ActivitiesView.prototype.render = function(label) {
  return  '<div class="col-sm-4 col-xs-12">'+
            '<form role="form" class="tp-form">'+
              '<label for="' + this.type + 'Select">' + label + '</label>'+
              '<div class="row">'+

                '<div class="col-xs-9">'+
                  '<select name="' + this.type + 'Select" class="form-control">'+
                  '</select>'+
                '</div>'+

                '<div class="col-xs-3">'+
                  '<button type="submit" data-select="' + this.type + '" class="btn btn-primary addToDay">Add</button>'+
                '</div>'+

              '</div>'+
            '</form>'+
          '</div>';
};

var types = ['hotel', 'restaurant', 'thing'];
types.forEach( function (type) {
  new ActivitiesView(type);
});