console.log('client.js is sourced, yo');

var myApp = angular.module('myApp', []);

var lock = new Auth0Lock( 'le4glthQI5NgyhNzP99mKZJjzsr1I6QP', 'thatspaceguy.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://thatspaceguy.auth0.com/v2/logout';

myApp.controller('displayController', ['$scope', '$http', 'ShelfFactory', 'UserFactory', function($scope, $http, ShelfFactory, UserFactory){
  var fillShelf = function(){
    ShelfFactory.fillShelf().then(
      function(){
        console.log(ShelfFactory.shelf());
        $scope.shelf = ShelfFactory.shelf();
    });
  };
  //fill shelf on load
  fillShelf();

  var findUsers = function(){
    return UserFactory.getUsers().then(
      function(){
        console.log(UserFactory.users());
        $scope.users = UserFactory.users();
    });
  };
  //fill shelf on load

  $scope.onLoad = function(){
    console.log( 'in init' );
    // check if a user's info is saved in localStorage
    if( JSON.parse( localStorage.getItem( 'userProfile' ) ) ){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem( 'userProfile' ) );
      console.log( 'loggedIn:', $scope.userProfile );
      findUsers().then(function(){
        //map users array to only the userIds to allow use of Array.prototype.includes()
        var userIds = $scope.users.map(function(index){
          return index.userId;
        });
        //if userId is already in db, do nothing
        if (userIds.includes($scope.userProfile.user_id)) {
          console.log('userId included');
        }
        //else, add to db and update users array
        else {
          var newUser = {
            userName: $scope.userProfile.name,
            userId: $scope.userProfile.user_id
          };
          UserFactory.addUser(newUser).then(findUsers);
        }
      });

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
      userId: $scope.userProfile.user_id,
      imageUrl: $scope.imageIn
    };
    ShelfFactory.addToShelf(thing).then(fillShelf);
    $scope.descriptionIn = '';
    $scope.imageIn = '';
  };

  $scope.removeThing = function(id){
    ShelfFactory.removeFromShelf(id).then(fillShelf);
  };

  $scope.filterByUser = function(userId){
    console.log('in filterByUser', userId);
  };

}]);


var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
