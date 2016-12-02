var User = require('../models/user');

function userInfo(req, res, next) {
  if(req.decodedToken) {
    User.findOne({email: req.decodedToken.email})
      .then(function (userInfo) {
        req.userInfo = userInfo;
        next();
      })
      .catch(function (err) {
        console.trace('userInfo error:', err);
        res.sendStatus(500)
      });
  } else {
    next();
  }
}

module.exports = userInfo;
