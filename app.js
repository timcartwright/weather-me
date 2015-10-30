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

	.when('/forecast/:days', {
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


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '5';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appid: '559996506353df37f3c44075a8662dda' });

	$scope.convertToCentigrade = function(degK) {
		return Math.round(degK - 273.15);
	}

	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}

}]);

weatherApp.directive('forecast', function() {

	return {
		templateUrl: 'directives/weather.html',
		replace: true,
		scope: {
			weatherObject: '=',
			convertToDate: '&',
			convertToStandard: '&',
			dateFormat: "@"
		}
		

	}


});

