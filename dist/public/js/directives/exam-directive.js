(function(app) {
	app.directive('examDirective', [ function() {
		return {
			scope: {
				exam: '='
			},
			controller: function($scope, $element, $attrs, $transclude) {

				$scope.uploadFile = function(){
				console.log("uploading");
            	var file = $scope.blob;

            }
		},
			// require: 'ngModel',
			//restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			//template: '<h1>Heyyy this a directive</h1>',
			templateUrl: 'partials/exam-directive.html',
			replace: true,
			// transclude: true,
			link: function($scope, elem, attrs, controller) {
				
				
			}
		};
	}]);
})(exambae);
