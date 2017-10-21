var exambae = angular.module('exambae', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('newexam', {
		url: '/newexam',
		templateUrl: 'partials/newexam-partial.html',
		controller: 'newexamController',
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
