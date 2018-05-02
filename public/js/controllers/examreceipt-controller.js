(function(app) {
	app.controller('examreceiptController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', 
		function($scope, $stateParams, ExamFactory, bitcoinApiFactory) {

		var vm = this;
		vm.loading = true;

		vm.balance = 0.0;

		vm.exam = {};

		bitcoinApiFactory.getDogecoinExchangeRate().then(updateExchangeRate);

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

		function updateExchangeRate(data)
		{
			console.log(data);
			console.log(data);
			console.log(data[0].price_usd)
			vm.dogeExchangeRate = parseFloat(data[0].price_usd);
		}
	}]);
})(exambae);
