var ActivityView = function(activity, type) {
  this.activity = activity;
  this.$el = $( this.render() );
  this.generateMarker(type);
};

ActivityView.prototype.render = function() {
  return '<li>' + this.activity.name + '</li>';
};

ActivityView.prototype.generateMarker = function (type) {
  var color = {
    hotel : 'blue',
    thing : 'yellow',
    restaurant : 'green'
  }[type];
  this.marker = new google.maps.Marker({
    map: map,
    title: this.activity.name,
    position: this.getLatLng(),
    icon: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
  });
};

ActivityView.prototype.getLatLng = function() {
  var latlngarr = this.activity.place[0].location;
  return new google.maps.LatLng(latlngarr[0],latlngarr[1]);
};
