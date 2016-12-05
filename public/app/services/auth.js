angular.module('secretsApp')
.factory('Auth', ['$firebaseAuth', '$http', function AuthFactory($firebaseAuth, $http) {
  var auth = $firebaseAuth();

  /**
   * Perform user log-in
   */
  function logIn() {
    return auth.$signInWithPopup("google")
    .then(function(firebaseUser) {
      return firebaseUser;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  /**
   * Add state change listener to auth
   */
  function onChange(callback) {
    auth.$onAuthStateChanged(function(firebaseUser){
      if(firebaseUser) {
        callback(firebaseUser);
      } else {
        console.log('Not logged in or not authorized.');
        callback();
      }
    });
  }

  // This code runs when the user logs out
  /**
   * Sign out the user
   */
  /**
   * Sign out the user
   * @param  {Function} callback Callback function
   */
  function logOut(){
    return auth.$signOut();
  };

  return {
    logIn: logIn,
    logOut: logOut,
    onChange: onChange
  };
}]);
