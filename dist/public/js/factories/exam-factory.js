(function(app) {
	app.factory('ExamFactory', ['$q', '$http', 'HOSTNAME', function($q, $http, HOSTNAME) {

		var services = {
			getExam: getExam,
            getExamWithSecret: getExamWithSecret,
			postExam: postExam,

            getUploadUrl: getUploadUrl,
            deleteBlob: deleteBlob,
            createBlob: createBlob,
            getBlobDownloadUrl: getBlobDownloadUrl,


            payForExam: payForExam



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


        function getBlobDownloadUrl(blobKey)
        {
            return base_address + '/blob/' + blobKey;
        }
        function createBlob(file, filename, uploadUrl)
        {

            var fd = new FormData();
            fd.append(filename, file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(success, error);
        }

        function deleteBlob(blob_key)
        {
            var path_to_blob_api = base_address + "/blob/" + blob_key;
            return $http.delete(path_to_blob_api)
            .then(success, error);
        }

        function getUploadUrl()
        {
            var path_to_get_upload_url = base_address + '/generate_blobstore_url';
            return $http.get(path_to_get_upload_url).then(success, error);
        }

        function getExam(exam_id)
        {

            var get_exam_path = '/exam/' + exam_id;
  
            return $http.get(base_address + get_exam_path).then(success, error);
        }

        function getExamWithSecret(exam_id, secret)
        {

            var get_exam_path = '/exam/' + exam_id + '/secret/' + secret;
  
            return $http.get(base_address + get_exam_path).then(success, error);
        }

        function postExam(exam)
        {
            var post_exam_path = '/exam';

            

        
              return $http.post(base_address + post_exam_path, exam).then(success, error);
        }

        function payForExam(payment)
        {
            var pay_for_exam_path = '/pay_for_exam';

            return $http.post(base_address + pay_for_exam_path, payment).then(success, error);
        }

		return services;
	}]);
})(exambae);
