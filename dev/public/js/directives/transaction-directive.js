(function(app) {
	app.directive('transactionDirective', ['ExamFactory', function(ExamFactory) {
		return {
			scope: {
				transaction: '='
			},
			controller: function($scope, $element, $attrs, $transclude) {
				console.log($scope);
				$scope.downloadLink = ExamFactory.getBlobDownloadUrl($scope.transaction.blob_key);
			},

			templateUrl: 'partials/transaction-directive.html',
			replace: true,

			link: function($scope, elem, attrs, controller) {

			}
		};
	}]);
})(exambae);
