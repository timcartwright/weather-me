// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/second', {
		templateUrl: 'page/forecast.html',
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


weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

}]);