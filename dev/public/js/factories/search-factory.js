(function(app) {
	app.factory('SearchFactory', ['$q', '$http', function($q, $http) {


		var services = {
                // Get Calls
                getSchools: getSchools,
                getClasses: getClasses,
                getExams: getExams
            };

        var qa_base_address = "http://demolisherapp.appspot.com";


        function success(data) {

            console.log(data);

            return $q.resolve(data.data);
        }

        function error(error) {
            console.log(error);
            console.log("There was an error");


            return $q.reject(error);
        }

        function getSchools()
        {

            var get_schools_path = '/frontend/get_schools';

            

        	var schools = ['Georgia State University', 'University of Georgia', 'Clayton State University', 'Georgia Southern']
        	/*return schools.map( function (school) {
				        return {
				          value: school.toLowerCase(),
				          display: school
				        };
    			})*/
            return $http.get(qa_base_address + get_schools_path).then(success, error);
        }

        function getClasses(school)
        {

            var get_classes_path = '/frontend/school/' + school.display + '/get_classes'
            return $http.get(qa_base_address + get_classes_path).then(success, error);


        }

        function getExams(school, classname)
        {
            var get_exams_path =  '/frontend/school/' + school.display + '/school_class/' + classname.display + '/get_resources';

            return $http.get(qa_base_address + get_exams_path).then(success, error);

        }


		return services;
	}]);
})(exambae);
