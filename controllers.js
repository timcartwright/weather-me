// Controllers
weatherApp.controller('mainController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {

	// Get User's Location
	angular.element(document).ready(function () {
        getLocation();
    });

	// Options for ngAutocomplete
	$scope.options = {};
	$scope.options.types = "(cities)";

	// Watch for changes to 'lat'
	$scope.$watch('lat', function() {
		if ($scope.lat) {
			getWeather();
		};
	});	

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


	function getWeather() {
		$scope.weatherAPI = $resource("https://api.forecast.io/forecast/8ce6c9b19b79a81db3d5c9428983b2c3/" + $scope.lat + "," + $scope.lng, { callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});
		$scope.weatherResult = $scope.weatherAPI.get();
	};
    
    function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        $scope.lat = 16.7758;
	        $scope.lng = -3.0094;
	        getWeather();
	    }    
	};

	function showPosition(position) {
	     $scope.lat = position.coords.latitude;
	     $scope.lng = position.coords.longitude;
	     getWeather();
	};

}]);