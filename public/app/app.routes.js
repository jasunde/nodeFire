angular.module('secretsApp')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/secrets', {
    templateUrl: 'app/secrets/secretsView.html',
    controller: 'SecretsController'
  })
  .when('/admin', {
    templateUrl: 'app/admin/adminView.html',
  })
  .otherwise({
    redirectTo: '/secrets'
  });
}]);
