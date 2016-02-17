var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']); 
var senior = 'Denver,usa';
var mez = 'http://api.openweathermap.org/data/2.5/weather?q=';
var equity = '&appid=032d3b4bfed44d0d8201374e445f6cdc';




//CONFIG
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl:'pages/home.html', 
        controller: 'homeController'
    })
    .when('/', {
        templateUrl:'pages/home.html',
        controller: 'hotelController'
    })
    .when('/maps', {
        templateUrl: 'pages/maps.html',
        controller: 'MainCtrl'
    })
})



//SERVICE
weatherApp.service('hotelDestination', function() 
    {
    this.destination = "SFO";  
    });



//CONTROLLERS
weatherApp.controller('homeController', ['$scope','$http',function($scope,$http){
  
    $http.get(mez + senior + equity)
        .success(function(data){
                    console.log("hurray");
                    $scope.description = data.weather[0].description; 
                    $scope.temp = data.main.temp; 
                    $scope.temp = ($scope.temp * (9/5))- 459.67; 
                    $scope.temp = Math.round($scope.temp * 100) / 100;
                    $scope.humid = data.main.humidity; 
                 })
        .error(
  
        );
    
}]);

weatherApp.controller('hotelController', ['$scope','$http', 'hotelDestination', function($scope, $http, hotelDestination){
    
    $scope.destination = hotelDestination.destination;
    $scope.$watch('destination', function(){
        hotelDestination.destination = $scope.destination;
    });
    
   $scope.hotelInfo = function(){
     $http.get("https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lTgIAFV3QaHWKZyUAhDBHdkAGmWSqvy8&location=" + $scope.destination + "&check_in=2016-06-14&check_out=2016-06-16")
        .success(function(data){
            console.log('hurray');
            for(var i = 0; i < data.results.length; i++){
                 $scope.name = data.results[i].property_name;
            }
        })
    .error(
        
    );
   }
}])


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
 
weatherApp.controller('MainCtrl', function ($scope, $window) {
    $window.map;
    $window.initMap = function() {
      $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }

  });