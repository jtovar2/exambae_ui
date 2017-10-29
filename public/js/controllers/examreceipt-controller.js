(function(app) {
	app.controller('examreceiptController', ['$scope', '$stateParams', 'ExamFactory', function($scope, $stateParams, ExamFactory) {

		var vm = this;
		vm.loading = true;

		vm.exam = {};


		if('secret' in $stateParams && 'examId' in $stateParams)
		{
			ExamFactory.getExamWithSecret($stateParams.examId, $stateParams.secret).then(updateExam);
		}

		function updateExam(data)
		{
			vm.exam = data;
			console.log(data);
			vm.loading = false;
		}
	}]);
})(exambae);
