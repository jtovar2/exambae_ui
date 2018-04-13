(function(app) {
	app.controller('newexamController', ['$scope', 'ExamFactory', '$state',  'HOSTNAME',function($scope, ExamFactory, $state, HOSTNAME) {
		var vm = this;
		console.log("shubin learning today");
		vm.tagsReadonlyToggle = false;
		vm.tagsRemovable = true;


		vm.NO_FILE_UPLOADED = "NO_FILES";
		vm.FILE_UPLOADED = "FILE";
		vm.uploadButtonState = vm.NO_FILE_UPLOADED;

		vm.fileUploaded = false;

		vm.uploadUrlLoading = true;
		vm.uploadUrl = ExamFactory.getUploadUrl().then(updateUploadUrl);


		vm.fileUploaded = false;
		vm.uploadFile = uploadFile;
		vm.deleteFile = deleteFile;
		vm.metaDataForm = {};


		vm.exam = {};
		vm.exam.school = "";
		vm.exam.school_class = "";
		vm.exam.professor = "";
		vm.exam.file = "";
		vm.exam.description = "";
		vm.exam.free_or_nah = true;
		vm.exam.price = 0.00;
		vm.exam.number_of_downloads = 0;
		vm.exam.tags = [];

		vm.postExam = postExam;

		function uploadFile()
		{
			//TODO
			var file = document.getElementById('file').files[0];
			ExamFactory.createBlob(file, vm.uploadUrl).then(updateBlobKey);
		}

		function updateBlobKey(data)
		{
			vm.exam.file = data.blob_key;
			vm.fileUploaded = true;
		}

		function updateUploadUrl(data)
		{
			vm.uploadUrlLoading = false;
			vm.uploadUrl = HOSTNAME + data;
			console.log(vm.uploadUrl);
		}

		function deleteFile()
		{
			ExamFactory.deleteBlob(vm.exam.file);
			vm.exam.file = "";
			vm.fileUploaded = false;
		}

		function postExam()
		{

			if(vm.exam.price > 0.0)
			{
				vm.exam.free_or_nah = false;
			}

			ExamFactory.postExam(vm.exam).then(goToExamReceipt);


		}


		function goToExamReceipt(data)
		{
			if('secret' in data && 'id' in data)
			{
				$state.go('examreceipt', {'examId' : data.id, 'secret': data.secret});
			}
			else
			{
				console.log("WTFFF");
				console.log(data);
			}
		}


	}]);
})(exambae);
