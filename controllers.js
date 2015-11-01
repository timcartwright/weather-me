// Controllers
weatherApp.controller('mainController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {



	// Options for ngAutocomplete
	$scope.options = {};
	$scope.options.types = "(cities)";

	$scope.lat = 51.52;
	$scope.lng = 0;

	$scope.$watch('lat', function() {
		$scope.weatherAPI = $resource("https://api.forecast.io/forecast/8ce6c9b19b79a81db3d5c9428983b2c3/" + $scope.lat + "," + $scope.lng, { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});

		$scope.weatherResult = $scope.weatherAPI.get();

		console.log($scope.weatherResult);
	});



	// $scope.days = $routeParams.days * 8 || '40';

	$scope.weatherAPI = $resource("https://api.forecast.io/forecast/8ce6c9b19b79a81db3d5c9428983b2c3/" + $scope.lat + "," + $scope.lng, { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});

	$scope.weatherResult = $scope.weatherAPI.get();

	console.log($scope.weatherResult);

	$scope.convertToCentigrade = function(degK) {
		return Math.round(degK - 273.15);
	}

	$scope.fahrenheitToCentigrade = function(degf) {
		return Math.round((degf-32)*0.5556);
	}

	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}

	$scope.jacketNoJacket = function(degf) {

		var jacketText
		var tempindegC = $scope.fahrenheitToCentigrade(degf);
		var none = 21;
		var light = 15;
		var medium = 10;

		if (tempindegC <= medium) {
			jacketText = "you should wrap up warm!";
		}
		else if (tempindegC < light){
			jacketText = "you should take a jacket!";
		}
		else if (tempindegC < none){
			jacketText = "you might need a jacket!";
		}
		else {
			jacketText = "you won't need a jacket!";
		};

		return jacketText;
	};

	$scope.shadesNoShades = function(cloud) {

		var shadesText;
		var cloudy = 0.4;

		if (cloud > cloudy) {
			shadesText = "No Shades";
		}
		else {
			shadesText = "Shades";
		}

		return shadesText;

	};

	$scope.brollyNoBrolly = function(chance, intensity) {

		var brollyText
		var probability = 0.2;
		var heavyEnough = 0.002;

		if (chance > probability && intensity > heavyEnough) {
			brollyText = "Brolly";
		}
		else {
			brollyText = "No Brolly";
		}

		return brollyText;
	};

	$scope.andOrBut = function(foo) {

		return foo;

	};

	// Get Location

	angular.element(document).ready(function () {
        getLocation();
    });

    
    function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	function showPosition(position) {
	     $scope.lat = position.coords.latitude;
	     $scope.lng = position.coords.longitude;
	     console.log($scope.lat);
	}

}]);