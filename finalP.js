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
})



//SERVICE
weatherApp.service('cityService', function() 
    {
    this.city = "Denver, CO";  
    });



//CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService','$http',function($scope, cityService,$http){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() 
        {
        cityService.city = $scope.city; 
        });
    $http.get(mez + senior + equity)
        .success(function(data){
                    console.log("hurray");
                    $scope.description = data.weather[0].description; 
                    $scope.
                 })
        .error(
  
        );
    
}]);