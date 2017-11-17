(function(app) {
	app.factory('bitcoinApiFactory', ['$q', '$http', 'HOSTNAME', function($q, $http, HOSTNAME) {


		var services = {
			convertUSD2BTC : convertUSD2BTC,
            getTransactions : getTransactions
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

        function convertUSD2BTC(amount)
        {
        	var url = "https://blockchain.info/tobtc?currency=USD&value=" + amount;

        	return $http.get(url).then(success, error);
        }
		return services;
	}]);
})(exambae);
