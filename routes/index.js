var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */

var hotelFinder = function(req, res, next) {
  models.Hotel.find({}, function(err, hotels) {
    if(err) return next(err);
    res.locals.hotels = hotels;
    next();
  });
};

var thingToDoFinder = function(req, res, next) {
  models.ThingsToDo.find({}, function(err, thingsToDo) {
    if(err) return next(err);
    res.locals.thingsToDo = thingsToDo;
    next();
  });
};

var restaurantFinder = function(req, res, next) {
  models.Restaurant.find({}, function(err, restaurants) {
    if(err) return next(err);
    res.locals.restaurants = restaurants;
    next();
  });
};

var dayFinder = function(req, res, next) {
  models.Day.find({}).populate('hotel restaurant thing').exec(function(err, days) {
    if(err) return next(err);
    res.locals.days = days;
    next();
  });
};

router.get('/', [
  hotelFinder,
  thingToDoFinder,
  restaurantFinder,
  dayFinder,
  function(req, res, next) {
    res.render('index');
  }
]);

module.exports = router;
