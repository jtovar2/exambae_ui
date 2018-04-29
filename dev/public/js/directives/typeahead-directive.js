(function(app) {
	app.directive('typeaheadDirective', ['ExamFactory', function(ExamFactory) {
		return {
			scope: {
				choiceslist: '=',
				selectedchoice: '='
			},
			controller: function($scope, $element, $attrs, $transclude) {

				$scope.searchContent = "";
				$scope.choices = [{'display': 'ayyyee', 'value': 'AYYee'},
				 {'display': 'againg', 'value': 'Agagin'}
				 , {'display': 'wowo', 'value': 'WOWO'}]
				
				selectChoice = function(input)
				{
					console.log(input);

				}
				$scope.selectChoice = selectChoice;
				$scope.nochoices = undefined;
			},

			templateUrl: 'partials/typeahead-directive.html',
			replace: true,

			link: function($scope, elem, attrs, controller) {

			}
		};
	}]);
})(exambae);