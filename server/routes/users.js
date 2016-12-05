var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res) {
  if(req.userInfo) {
  User.find({})
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      console.trace('GET all users error:', err);
      res.sendStatus(500);
    });
  } else {
    console.log('Unauthorized GET.');
    res.sendStatus(403);
  }
})

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
