(function(app) {
	app.controller('checktransactionsController', ['$scope', 'bitcoinApiFactory', function($scope, bitcoinApiFactory) {


		var vm = this;
		vm.form = {};

		vm.clients_bitcoin_address = "";


		vm.transactions = [{"amount" : "0.00471444",
"blob_key" : "AMIfv95iMCCl38yRVONQoo7tHyCoThKr5r4Hjqog8wOthJAHfdaOGxng4ysEmU2q_HaYvR5mv0z4NpUvgVfAkJT7GI4AnfEI6XcjGTBupPo-ArEgFYyDeu-zGYNTWFLobXBIgBmbMljSPbMABpY4H8FEQSc5gfhIAa0Qqygr2uI9gdNwDYtiocIek8PsSUYM6pP2Dm9R7zNn-fF5emGa4_7l63FZOZb1l6TKTgF5LUzMWHo0p2aqGWFKlYRT3SrGKcSfP5P3Tn2quWFcB46mRnyO1zbFYtMjbBJLXQx4YBkhnTm-cs4yKzTn9YsAvx0pYyiMMwypCDpthooIgeYb7ZCRCukQoIImAQKId9o4lpgaVohxPHZXleqIw6vwBejVv9l9DC0fYcML",
"clients_bitcoin_address" : "asdfasdfasdfasdf",
"exam_bitcoin_address" : "213EED262E1574D2",
"state" : "NOT CONFIRMED"}
,
{"amount" : "0.00471444",
"blob_key" : "AMIfv95iMCCl38yRVONQoo7tHyCoThKr5r4Hjqog8wOthJAHfdaOGxng4ysEmU2q_HaYvR5mv0z4NpUvgVfAkJT7GI4AnfEI6XcjGTBupPo-ArEgFYyDeu-zGYNTWFLobXBIgBmbMljSPbMABpY4H8FEQSc5gfhIAa0Qqygr2uI9gdNwDYtiocIek8PsSUYM6pP2Dm9R7zNn-fF5emGa4_7l63FZOZb1l6TKTgF5LUzMWHo0p2aqGWFKlYRT3SrGKcSfP5P3Tn2quWFcB46mRnyO1zbFYtMjbBJLXQx4YBkhnTm-cs4yKzTn9YsAvx0pYyiMMwypCDpthooIgeYb7ZCRCukQoIImAQKId9o4lpgaVohxPHZXleqIw6vwBejVv9l9DC0fYcML",
"clients_bitcoin_address" : "asdfasdfasdfasdf",
"exam_bitcoin_address" : "213EED262E1574D2",
"state" : "CONFIRMED"}];

		vm.submitBitcoinAddress = submitBitcoinAddress;

		function submitBitcoinAddress()
		 {
		 	console.log("AYYYEEE");
		 	bitcoinApiFactory.getTransactions(vm.clients_bitcoin_address).then(updateTransactions);
		 }

		function updateTransactions(data)
		{
			
			console.log(data);

			vm.transactions = data;
		}

	}]);
})(exambae);
