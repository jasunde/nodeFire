angular.module('secretsApp')
.controller('UserController', ['User', '$scope', function (User, $scope) {
  $scope.currentUser = User.currentUser();
  // This code runs whenever the user logs in
  $scope.logIn = User.logIn;

  User.onChange(function() {
    // $scope.currentUser = user;
    $scope.currentUser = User.currentUser();
  });

  // This code runs when the user logs out
  $scope.logOut = User.logOut;
}])
