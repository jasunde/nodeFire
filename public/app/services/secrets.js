angular.module('secretsApp')
.factory('Secrets', ['$http', '$q', function SecretsFactory($http, $q) {
  var secrets = [];

  function get(idToken) {
    return $q(function (resolve, reject) {

      if(idToken) {
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          secrets = response.data;
          resolve();
        })
        .catch(function (err) {
          console.log('GET secrets error:', err)
        });
      } else {
        secrets = [];
        resolve();
      }
    });
  }

  return {
    get: get,
    list: function () {
      return secrets;
    }
  };
}]);
