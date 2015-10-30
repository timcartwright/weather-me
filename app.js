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

// Service
weatherApp.service('cityService', function() {

	this.city = '';

});

// Controllers
weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;


}]);


weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

}]);