angular.module('secretsApp')
.controller('AdminController', ['$scope', '$http', 'User', 'Secrets', function ($scope, $http, User, Secrets) {
  $scope.currentUser = User.currentUser();
  $scope.secretData = Secrets.list();
  $scope.newUser = {};
  $scope.users = [];

  User.onChange(function () {
    $scope.secretData = Secrets.list();
    $scope.currentUser = User.currentUser();

    getUsers();
  });

  function getUsers() {
    if(User.idToken()) {
      $http({
        method: 'GET',
        url: '/users',
        headers: {
          id_token: User.idToken()
        }
      })
      .then(function (response) {
        $scope.users = response.data;
      })
      .catch(function (err) {
        console.log('getUsers error:', err);
      });
    } else {
      $scope.users = [];
    }
  }

  // Post a new user
  function addUser() {
    if(User.idToken()) {
      User.idToken()
      .then(function (idToken) {
        console.log('idToken', idToken);
        $http({
          method: 'POST',
          url: '/users',
          headers: {
            id_token: idToken
          },
          data: $scope.newUser
        })
        .then(function (response) {
          console.log('addUser success:', response);
          getUsers();
        })
        .catch(function (err) {
          console.error('addUser error:', err);
        });
      });
    }
  }

}]);
