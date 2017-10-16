(function(app) {
	app.controller('HeaderController', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {

		var vm = this;
		
		vm.state = "home";

		/* Ok soo on changeSuccess is called when the switch to a state was done. So current will give you the previous one
			Lol just dont change bruh*/
		$rootScope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){
			    vm.state = $state.current.name;
		});
	}]);
})(exambae);
