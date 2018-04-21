(function(app) {
	app.controller('viewexamController', ['$scope', '$stateParams', 'ExamFactory', 'bitcoinApiFactory', function($scope, $stateParams, ExamFactory, bitcoinApiFactory) {

		console.log($stateParams);

		var vm = this;
		vm.loading = true;

		vm.form = {};


		
		vm.exam = {};

		vm.payment = {};
		vm.payment.amount = 0;
		vm.payment.exam_bitcoin_address = "";
		vm.payment.clients_bitcoin_address = "";
		vm.payment.blob_key = "";


		vm.dogeExchangeRate = 0;
		vm.priceInBTC = 0;

		vm.qr_code_url = "";
		vm.address = "";

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

		bitcoinApiFactory.getDogecoinExchangeRate().then(updateExchangeRate);
		bitcoinApiFactory.getAddress(vm.exam.id).then(loadWalletImage);
            
		}

		function loadWalletImage(data)
		{
			vm.address = data;
			if(!vm.exam.free_or_nah)
			{
			vm.qr_code_url = "https://chart.googleapis.com/chart?chs=300x300&chld=L|2&cht=qr&chl=dogecoin:" + data + "&amount=" + vm.priceInBTC
			}
			else
			{
							vm.qr_code_url = "https://chart.googleapis.com/chart?chs=300x300&chld=L|2&cht=qr&chl=dogecoin:" + data + "&amount=1000" 

			}
		}

		function updateExchangeRate(data)
		{
			console.log(data);
			console.log(data[0].price_usd)
			vm.dogeExchangeRate = parseFloat(data[0].price_usd);
			if(!vm.exam.free_or_nah)
			{
			vm.priceInBTC = parseFloat(vm.exam.price) /  vm.dogeExchangeRate;
			}
		}

        


	}]);
})(exambae);
