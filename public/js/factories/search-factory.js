(function(app) {
	app.factory('SearchFactory', [function() {


		var services = {
                // Get Calls
                getSchools: getSchools,
                getClasses: getClasses,
                getExams: getExams
            };

        function getSchools()
        {
        	var schools = ['Georgia State University', 'University of Georgia', 'Clayton State University', 'Georgia Southern']
        	return schools.map( function (school) {
				        return {
				          value: school.toLowerCase(),
				          display: school
				        };
    			})
        }

        function getClasses(school)
        {
        	var classes = ['PHYS1001', 'PHYS1001', 'CSC4101', 'CSC3000'];
        	return classes.map( function (school) {
				        return {
				          value: school.toLowerCase(),
				          display: school
				        };
    			})
        }

        function getExams(school, classname)
        {
        	return [{'description': 'calc 1 test'}, {'description': 'calc 1 test'}, {'description': 'calc 1 test'}];
        }


		return services;
	}]);
})(exambae);
