console.log('client.js is sourced, yo');

var myApp = angular.module('myApp', []);

var lock = new Auth0Lock( 'le4glthQI5NgyhNzP99mKZJjzsr1I6QP', 'thatspaceguy.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://thatspaceguy.auth0.com/v2/logout';

myApp.controller('displayController', ['$scope', 'ShelfFactory', function($scope, ShelfFactory){
  $scope.loggedIn = false;

  $scope.logIn = function(){
    $scope.loggedIn = true;
  };

  $scope.logOut = function(){
    $scope.loggedIn = false;
  };
  console.log('ng');

  $scope.shelf = [];
  //fill shelf on load
  ShelfFactory.fillShelf().then(
    function(){
      console.log(ShelfFactory.shelf());
      $scope.shelf = ShelfFactory.shelf();
    });

    var putThingOnShelf = function(){
      var thing = {
        description: $scope.descriptionIn,
        owner: undefined, //!!---TAKE FROM AUTH0
        imageUrl: $scope.imageIn
      };
      return ShelfFactory.addToShelf(thing);
    };

}]);


myApp.controller('privelegedController', ['$scope', 'ShelfFactory', function($scope, ShelfFactory){



}]);
