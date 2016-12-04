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
        console.log('GET secrets error:', err);
        res.sendStatus(500);
      } else {
        res.send(secrets);
      }
    });
});

module.exports = router;
