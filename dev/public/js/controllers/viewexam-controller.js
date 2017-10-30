(function(app) {
	app.controller('viewexamController', ['$scope', '$stateParams', 'ExamFactory', function($scope, $stateParams, ExamFactory) {

		console.log($stateParams);

		var vm = this;
		vm.loading = true;

		vm.exam = {};


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
		}


	}]);
})(exambae);
