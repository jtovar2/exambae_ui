(function(app) {
	app.factory('SearchFactory', ['$q', '$http', 'HOSTNAME', function($q, $http, HOSTNAME) {


		var services = {
                // Get Calls
                getSchools: getSchools,
                getClasses: getClasses,
                getExams: getExams,
                getExamsByTag: getExamsByTag,
                getTags: getTags
            };

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

        function getExamsByTag(tag)
        {
            var get_exams_by_tag_path = "/frontend/tag/" + tag.display + "/get_resources";


            return $http.get(base_address + get_exams_by_tag_path).then(success, error);
        }

        function getTags () {
            var get_tags_path = '/frontend/get_tags'

            return $http.get(base_address + get_tags_path).then(success, error);
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
            return $http.get(base_address + get_schools_path).then(success, error);
        }

        function getClasses(school)
        {

            var get_classes_path = '/frontend/school/' + school.display + '/get_classes'
            return $http.get(base_address + get_classes_path).then(success, error);


        }

        function getExams(school, classname)
        {
            var get_exams_path =  '/frontend/school/' + school.display + '/school_class/' + classname.display + '/get_resources';

            return $http.get(base_address + get_exams_path).then(success, error);

        }


		return services;
	}]);
})(exambae);
