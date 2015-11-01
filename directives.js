// Directives
weatherApp.directive('forecast', function() {

	return {
		templateUrl: 'directives/weather.html',
		replace: true,
		scope: {
			weatherObject: '=',
			convertToDate: '&',
			convertToStandard: '&',
			dateFormat: "@",
			jacket: "&",
			shades: "&",
			brolly: "&"
		}		
	}
});