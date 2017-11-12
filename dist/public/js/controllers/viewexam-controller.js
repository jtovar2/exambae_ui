(function(app) {
	app.controller('viewexamController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', function($scope, $stateParams, ExamFactory, bitcoinApiFactory) {

		console.log($stateParams);

		var vm = this;
		vm.loading = true;

		vm.form = {};


		vm.payForExam = payForExam;
		
		vm.exam = {};

		vm.payment = {};
		vm.payment.amount = 0;
		vm.payment.exam_bitcoin_address = "";
		vm.payment.clients_bitcoin_address = "";
		vm.payment.blob_key = "";

		vm.priceInBTC = 0;

		if('examId' in $stateParams)
		{
			ExamFactory.getExam($stateParams.examId).then(updateExam);
		}

		function updateExam(data)
		{
			vm.exam = data;
			console.log(data);
			vm.loading = false;

			vm.downloadLink = ExamFactory.getBlobDownloadUrl(vm.exam.file);

			if(!vm.exam.free_or_nah)
			{
				bitcoinApiFactory.convertUSD2BTC(vm.exam.price).then(updatePrice);
			}
		}

		function updatePrice(data)
		{
			vm.priceInBTC = data;
			
			vm.payment.amount = data;
			vm.payment.exam_bitcoin_address = vm.exam.bitcoin_address
			vm.payment.blob_key = vm.exam.file;
		}

		function payForExam()
		{
			ExamFactory.payForExam(vm.payment).then(paymentReceived())
		}

		function paymentReceived()
		{
			console.log("payment recieved")
		}


	}]);
})(exambae);
