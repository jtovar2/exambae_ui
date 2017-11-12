(function(app) {
	app.controller('HeaderController', ['$scope', '$state', '$rootScope', "$mdDialog", function($scope, $state, $rootScope, $mdDialog) {

		var vm = this;
		
		vm.state = "home";



		vm.toggleSidenav = toggleSidenav;

		vm.openMenu = openMenu;


		function openMenu($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
    	};


		function toggleSidenav() 
		{
			console.log("ayyyeee");
		}

		/* Ok soo on changeSuccess is called when the switch to a state was done. So current will give you the previous one
			Lol just dont change bruh*/
		$rootScope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){
			    vm.state = $state.current.name;
		});
	}]);
})(exambae);
