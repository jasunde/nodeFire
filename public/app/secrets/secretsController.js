angular.module('secretsApp')
.controller("SecretsController", ['User', 'Secrets', '$http', '$scope', function(User, Secrets, $http, $scope) {
  $scope.currentUser = User.currentUser();
  $scope.secretData = Secrets.list();

  /**
   * Listen for user state change
   */
  User.onChange(function() {
    $scope.secretData = Secrets.list();
    $scope.currentUser = User.currentUser();
  });

}]);
