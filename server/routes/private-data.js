var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Secret = require('../models/secret');

/**
 * Filter out un-authorized requests
 */
router.use(function (req, res, next) {
  if(req.userInfo) {
    next();
  } else {
    // If the user is not in the database, return a forbidden error status
    console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
    res.sendStatus(403);
  }
});

/**
 * Find secrets the user is permitted to see
 */
router.get("/", function(req, res){
  Secret.find(
    { secrecyLevel: { $lte: req.userInfo.clearanceLevel } },
    function (err, secrets){
      if (err) {
        console.log('Error COMPLETING secrecyLevel query task', err);
        res.sendStatus(500);
      } else {
        res.send(secrets);
      }
    });
});

/**
 * Add a user with given clearanceLevel to database
 */
router.post('/', function (req, res) {
  var newUser = req.body;
  if(req.userInfo.clearanceLevel >= newUser.clearanceLevel) {
    User.create(newUser)
      .then(function (user) {
        res.status(201).send(user);
      })
      .catch(function (err) {
        console.trace('POST new user error:', err);
        res.sendStatus(500);
      });
  } else {
    console.trace('Unauthorized post. Insufficient clearanceLevel.');
    res.sendStatus(401);
  }
});

module.exports = router;
