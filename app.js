// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

});

// Services
weatherApp.service('cityService', function() {

	this.city = 'London, UK';

});

// Controllers
weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});


}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

	$scope.city = cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2, appid: '559996506353df37f3c44075a8662dda' });

	console.log($scope.weatherResult);

}]);