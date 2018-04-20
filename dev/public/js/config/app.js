var exambae = angular.module('exambae', ['ngAnimate', 'ngAria', 'ui.router', 'ui.bootstrap']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('checktransactions', {
		url: '/checktransactions',
		templateUrl: 'partials/checktransactions-partial.html',
		controller: 'checktransactionsController',
		controllerAs: 'vm'
	})

	.state('viewexam', {
		url: '/exam/:examId',
		templateUrl: 'partials/viewexam-partial.html',
		controller: 'viewexamController',
		controllerAs: 'vm'
	})

	.state('examreceipt', {
		url: '/exam/:examId/secret/:secret',
		templateUrl: 'partials/examreceipt-partial.html',
		controller: 'examreceiptController',
		controllerAs: 'vm'
	})

	.state('newexam', {
		url: '/newexam',
		templateUrl: 'partials/newexam-partial.html',
		controller: 'newexamController',
        controllerAs: 'vm'
	})

	.state('cashout', {
		url: '/cashout',
		templateUrl: 'partials/cashout-partial.html',
		controller: 'cashoutController',
        controllerAs: 'vm'
	})
	.state('home', {
            url: '/',
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController',
            controllerAs: "vm"
        });
    }]);
})(exambae);
