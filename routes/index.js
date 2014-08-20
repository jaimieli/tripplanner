var express = require('express');
var router = express.Router();
var models = require('models');

/* GET home page. */
router.get('/', function(req, res) {
  models.Hotel.find(function(err, hResults) {
    models.Restaurant.find(function(err, rResults) {
      models.ThingsToDo.find(function(err, tResults) {
        res.render('index', { hotels: hResults, restaurants: rResults, thingsToDo: tResults, title: "Trip Planner" });
      });
    });
  });
});

module.exports = router;
