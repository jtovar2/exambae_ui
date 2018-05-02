(function(app) {
	app.factory('bitcoinApiFactory', ['$q', '$http', 'HOSTNAME', function($q, $http, HOSTNAME) {


		var services = {
			convertUSD2BTC : convertUSD2BTC,
            getTransactions : getTransactions,
            getDogecoinExchangeRate: getDogecoinExchangeRate,
            getAddress : getAddress,
              getQRCode : getQRCode,
              getBalance: getBalance
		}

        var base_address = HOSTNAME;

		function success(data) {

            console.log(data);

            return $q.resolve(data.data);
        }

        function error(error) {
            console.log(error);
            console.log("There was an error");


            return $q.reject(error);
        }

        function getTransactions(client_wallet)
        {
            var get_transactions_path = '/transactions/' + client_wallet;

            return $http.get(base_address + get_transactions_path).then(success, error);
        }

        function getDogecoinExchangeRate()
        {
            var exchange_rate_api = 'https://api.coinmarketcap.com/v1/ticker/dogecoin/';

            return $http.get(exchange_rate_api).then(success, error);
        }
        function convertUSD2BTC(amount)
        {
        	var url = "https://blockchain.info/tobtc?currency=USD&value=" + amount;

        	return $http.get(url).then(success, error);
        }

        function getAddress(exam_id)
        {
            var url = HOSTNAME + "/create_wallet/" + exam_id;
            return $http.get(url).then(success, error);
        }

        function getBalance(exam_id)
        {
            var url = HOSTNAME + "/balance/" + exam_id;
            return $http.get(url).then(success, error);
        }
        function getQRCode(address, amount)
        {
            var url = "https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=dogecoin:" + address + "&amount=" + amount;
            return $http.get(url).then(success, error);
        }
		return services;
	}]);
})(exambae);
