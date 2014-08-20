var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Place,
    Hotel,
    ThingToDo,
    Restaurant;

var Schema = mongoose.Schema;

var placeSchema = new Schema ({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number, Number]
});

var hotelSchema = new Schema ({
  name: String,
  place: [placeSchema],
  num_stars: Number,
  amenities: String
});

hotelSchema.pre('save', function(next) {
  var cleanStars = function(stars) {
    stars = parseInt(stars, 10);
    if (stars > 5) return 5;
    else if (stars < 1) return 1;
    return stars;
  }

  this.num_stars = cleanPrice(this.num_stars);
  next();
});

var thingToDoSchema = new Schema ({
  name: String,
  place: [placeSchema],
  age_range: String
});

var restaurantSchema = new Schema ({
  name: String,
  place: [placeSchema],
  cuisine: String,
  price: Number
});

restaurantSchema.pre('save', function(next) {
  var cleanPrice = function(price) {
    price = parseInt(price, 10);
    if (price > 5) return 5;
    else if (price < 1) return 1;
    return price;
  }

  this.price = cleanPrice(this.price);
  next();
});

Place       = mongoose.model('Place', placeSchema);
Hotel       = mongoose.model('Hotel', hotelSchema);
ThingToDo   = mongoose.model('ThingToDo', thingToDoSchema);
Restaurant  = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  'Place': Place,
  'Hotel': Hotel,
  'ThingToDo': ThingToDo,
  'Restaurant': Restaurant
};
