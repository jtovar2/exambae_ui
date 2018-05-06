(function(app) {
	app.controller('cashoutController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', '$state', function($scope, $stateParams, ExamFactory, bitcoinApiFactory, $state) {

		console.log($stateParams);

		var vm = this;

		vm.exam_id = "";
		vm.exam_secret = "";


		vm.account = "";
		vm.cashout = cashout;
		        


		function cashout()
		{
			$state.go('examreceipt', {'examId' : vm.exam_id, 'secret': vm.exam_secret});
		}

	}]);
})(exambae);
