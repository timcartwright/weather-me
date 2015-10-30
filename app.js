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

// Controllers
weatherApp.controller('mainController', ['$scope', function($scope) {


}]);


weatherApp.controller('forecastController', ['$scope', function($scope) {


}]);