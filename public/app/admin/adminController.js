// $http({
//   method: 'GET',
//   url: '/users',
//   headers: { id_token: idToken }
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (err) {
//   console.log(err);
// });
// Post a new user
function addUser() {
  if($scope.currentUser) {
    $scope.currentUser.getToken()
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
      })
      .catch(function (err) {
        console.error('addUser error:', err);
      });
    });
  }
}
