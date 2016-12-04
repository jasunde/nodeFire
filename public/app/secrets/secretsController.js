angular.module('secretsApp')
.controller("SecretsController", ['User', '$http', '$scope', function(User, $http, $scope) {
  $scope.secretData = [];

  /**
   * Listen for user state change
   */
  User.onChange(function() {
    var idToken = User.idToken();

    if(idToken) {
      $http({
        method: 'GET',
        url: '/privateData',
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        $scope.secretData = response.data;
      });
    } else {
      $scope.secretData = [];
    }
  });

}]);
