(function(app) {
	app.controller('newexamController', ['$scope', 'SearchFactory', function($scope, SearchFactory) {
		var vm = this;


		vm.fileUploaded = true;
		vm.uploadFile = uploadFile;
		vm.metaDataForm = {};

		var metaDataForm = {};

		vm.exam = {school: "", schoolClass : "", description: "", price: 0.0};


		console.log("newexam");
		function uploadFile()
		{
			//TODO
			console.log("ayyyeee");
			console.log(vm.metaDataForm);
		}





	}]);
})(exambae);
