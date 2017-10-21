(function(app) {
	app.controller('HomeController', ['$scope', 'SearchFactory', function($scope, SearchFactory) {
		 var vm = this;

     vm.exams = [];


	vm.loading = false;
	vm.isSchoolSearchDisabled = false;
    vm.isSchoolCacheDisabled = false;

	vm.schoolHasBeenSelected = false;
	vm.schools = SearchFactory.getSchools();
	vm.searchSchool = "";
	vm.selectedSchool = "";
	vm.selectedSchoolChange = selectedSchoolChange;
	vm.searchSchoolChange = searchSchoolChange;

	vm.schoolQuerySearch = schoolQuerySearch;


    function searchSchoolChange(text) {

    	vm.schoolHasBeenSelected = false;
    	console.log("search method");
    	console.log(vm);
    }

    function selectedSchoolChange(item) {

    	if(vm.selectedSchool == null || vm.selectedSchool === "")
    	{
    		vm.schoolHasBeenSelected = false;
        vm.classHasBeenSelected = false;
        vm.selectedClass = "";
    	}
    	else
    	{
    		vm.schoolHasBeenSelected = true;
    	}
    	console.log("selection method");
    	console.log(vm);
    }

    function schoolQuerySearch (query) {
      var results = query ? vm.schools.filter( createFilterFor(query) ) : vm.schools;

        return results;

    }
    vm.isClassSearchDisabled = false;
    vm.isClassCacheDisabled = false;
    vm.classHasBeenSelected = false;
    vm.searchClass = "";
    vm.classQuerySearch = classQuerySearch;
	vm.schoolClasess = SearchFactory.getClasses();
	vm.selectedClass = "";
	vm.selectedClassChange = selectedClassChange;
	vm.searchClassChange = searchClassChange;

	


    function searchClassChange(text) {

    	vm.classHasBeenSelected = false;
    }

    function selectedClassChange(item) {
      if(vm.selectedClass === null || vm.selectedClass === "")
      {
        vm.classHasBeenSelected = false
      }
      else
      {
        vm.classHasBeenSelected = true;
      }

      if(vm.schoolHasBeenSelected && vm.classHasBeenSelected)
      {
        vm.exams = SearchFactory.getExams(vm.selectedSchool, vm.selectedClass);
      }

    }

    function classQuerySearch (query) {
      var results = query ? vm.schoolClasess.filter( createFilterFor(query) ) : vm.schoolClasess;

        return results;
    }


	



	






    vm.newState = newState;


    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
    	console.log(vm.schoolClasses);
      var results = query ? vm.schoolClasses.filter( createFilterFor(query) ) : vm.schoolClasses,
          deferred;
      if (vm.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {

        return results;
      }
    }

    function searchTextChange(text) {
//      console.log(text);
    }


    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
      	return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }


	}]);
})(exambae);
