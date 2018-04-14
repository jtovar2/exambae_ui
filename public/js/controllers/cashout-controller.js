(function(app) {
	app.controller('cashoutController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', '$mdDialog', function($scope, $stateParams, ExamFactory, bitcoinApiFactory, $mdDialog) {

		console.log($stateParams);

		var vm = this;

		vm.exam_id = "";
		vm.exam_secret = "";


		vm.account = "";
		        


	}]);
})(exambae);
