(function(app) {
	app.controller('examreceiptController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', 
		function($scope, $stateParams, ExamFactory, bitcoinApiFactory) {

		var vm = this;
		vm.loading = true;

		vm.balance = 0.0;

		vm.exam = {};

		

		if('secret' in $stateParams && 'examId' in $stateParams)
		{
			ExamFactory.getExamWithSecret($stateParams.examId, $stateParams.secret).then(updateExam);
		}

		function updateExam(data)
		{
			vm.exam = data;
			console.log(data);
			vm.loading = false;
			bitcoinApiFactory.getBalance(vm.exam.id).then(updateBalance)
		}

		function updateBalance(data)
		{
			vm.balance = parseFloat( data.balance);
			console.log(data);
		}
	}]);
})(exambae);
