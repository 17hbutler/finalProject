var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']); 
var senior = 'Phoenix,usa';
var mez = 'http://api.openweathermap.org/data/2.5/weather?q=';
var equity = '&appid=032d3b4bfed44d0d8201374e445f6cdc';
var map; 




//CONFIG
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl:'pages/home.html', 
        controller: 'homeController'
    })
    .when('/maps', {
        templateUrl:'pages/maps.html',
        controller: 'hotelController'
    })
    .when('/maps1', {
        templateUrl: 'pages/maps1.html',
        controller: 'MainCtrl'
    })
})



//SERVICE
weatherApp.service('cityService', function() 
    {
    this.city = "Denver, CO";  
    });



//CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService','$http',function($scope, cityService,$http){
  
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

weatherApp.controller('hotelController', ['$scope','$http', function($scope, $http){
    
    $http.get("https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=lTgIAFV3QaHWKZyUAhDBHdkAGmWSqvy8&location=DEN&check_in=2016-06-14&check_out=2016-06-16")
        .success(function(data){
            console.log('hurray');
            for(var i = 0; i < data.results.length; i++){
                 $scope.name = data.results[i].property_name;
            }
        })
    .error(
        
    );
}])

weatherApp.controller('MainCtrl', function ($scope, $window) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
});



function mapInit() {
     map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
