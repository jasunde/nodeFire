angular.module('secretsApp')
.controller('NavController', function ($scope, $location) {
  $scope.isActive = function (path) {
    return path === $location.path();
  }
});
