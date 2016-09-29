console.log('client.js is sourced, yo');

var myApp = angular.module('myApp', []);

var lock = new Auth0Lock( 'le4glthQI5NgyhNzP99mKZJjzsr1I6QP', 'thatspaceguy.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://thatspaceguy.auth0.com/v2/logout';

myApp.controller('displayController', ['$scope', '$http', 'ShelfFactory', function($scope, $http, ShelfFactory){
  var fillShelf = function(){
    ShelfFactory.fillShelf().then(
      function(){
        console.log(ShelfFactory.shelf());
        $scope.shelf = ShelfFactory.shelf();
    });
  };
  //fill shelf on load
  fillShelf();

  $scope.onLoad = function(){
    console.log( 'in init' );
    // check if a user's info is saved in localStorage
    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
      console.log( 'loggedIn:', $scope.userProfile );
      $scope.loggedIn = true;
    }
    else{
      // if not, make sure we are logged out and empty
      emptyLocalStorage();
      $scope.loggedIn = false;
    }
  };
  $scope.onLoad();

  $scope.logIn = function(){
    console.log( 'in logIn' );
    lock.show( function( err, profile, token ) {
      if (err) {
        console.error( "auth error: ", err);
      } // end error
      else {
        // save token to localStorage
        localStorage.setItem( 'userToken', token );
        // save user profile to localStorage
        localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
        // reload page because dirtyhaxorz
        location.reload();
      } // end no error
    }); //end lock.show
  };

  $scope.logOut = function(){
    $http({
      method:'GET',
      url: logOutUrl,
    }).then( function( data ){
      // if logged out OK
      if( data.data == 'OK' ){
        // empty localStorage
        emptyLocalStorage();
        $scope.loggedIn = false;
      }
    })
  };
  console.log('ng');

  $scope.shelf = [];


  $scope.putThingOnShelf = function(){
    var thing = {
      description: $scope.descriptionIn,
      owner: $scope.userProfile.name,
      imageUrl: $scope.imageIn
    };
    ShelfFactory.addToShelf(thing).then(fillShelf);
  };



}]);


var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
