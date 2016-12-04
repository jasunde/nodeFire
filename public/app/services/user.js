angular.module('secretsApp')
.factory('User', ['Auth', function UserFactory(Auth) {
  var currentUser = null;
  var idToken = null;

  /**
   * Log in a user
   */
  function logIn() {
    return Auth.logIn()
    .then(function (user) {
      currentUser = user;
    });
  };

  /**
   * Log out a user
   */
  function logOut() {
    return Auth.logOut()
    .then(function () {
      currentUser = null;
    })
  }

  /**
   * Add event listener for user state change
   * @param  {Function} callback To run after user state change
   */
  function onChange(callback) {
    Auth.onChange(function(token, user) {
      idToken = token;
      currentUser = user;
      callback();
    });
  }

  return {
    currentUser: function () {
      return currentUser;
    },
    idToken: function () {
      return idToken;
    },
    logIn: logIn,
    logOut: logOut,
    onChange: onChange
  };
}]);
