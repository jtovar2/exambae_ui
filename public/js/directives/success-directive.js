(function(app) {
	app.directive('successDirective', [ function() {
		return {
			scope: {},
			controller: function($scope, $element, $attrs, $transclude) {
				var numberOfTexts = 2;
				var randomTextNumber = Math.floor(Math.random() * numberOfTexts);

				var numberOfGiphies = 7;
				var randomGiphyNumber = Math.floor(Math.random() * numberOfGiphies);
				$scope.random = randomGiphyNumber;
				$scope.randomText = randomTextNumber;
			},
			// require: 'ngModel',
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			 templateUrl: 'partials/success-view-partial.html',
			// replace: true,
			// transclude: true,
			link: function($scope, elem, attrs, controller) {}
		};
	}]);
})(exambae);
