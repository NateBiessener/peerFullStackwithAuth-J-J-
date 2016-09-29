myApp.factory('UserFactory', ['$http', function($http){
  console.log('in UserFactory');

  var users;

  var getUsers = function(){
    return $http({
      method: 'GET',
      url: '/users/user'
    }).then(function(results){
      console.log('got users');
      users = results.data;
    }, function(response){
      console.log('server error');
    });
  };

  var addUser = function(objectToSend){
    return $http({
      method: 'POST',
      url: '/users/user',
      data: objectToSend
    }).then(function(results){
      console.log('saved');
    }, function(response){
      console.log('server error');
    });
  };

  return {
    users: function(){
      return users;
    },
    getUsers: getUsers,
    addUser: addUser
  };

}]);
