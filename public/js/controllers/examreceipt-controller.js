(function(app) {
	app.controller('examreceiptController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', 
		function($scope, $stateParams, ExamFactory, bitcoinApiFactory) {

		var vm = this;

		vm.txn_id = "asdflkj;lkjasd;flkjasdf";
		vm.doge_deposit_address = "";
		vm.loading = true;

		vm.balance = 0.0;


		vm.cashout = cashout;
		vm.exam = {};

		vm.loading_cashout = true;
		vm.cashout_process = false;

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

		function cashout()
		{
			vm.cashout_process = true;
			vm.loading_cashout = true;
			bitcoinApiFactory.cashout(vm.exam.id, vm.exam.secret, vm.doge_deposit_address).then(getTransactionStatus);
		}

		function getTransactionStatus(data)
		{

			vm.loading_cashout = false;
			console.log(data);
			vm.txn_id = data.txn_id;

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
