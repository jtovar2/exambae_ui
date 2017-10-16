(function(app) {
	app.controller('HomeController', ['$scope', 'SearchFactory', function($scope, SearchFactory) {
		 var vm = this;



	vm.schoolHasBeenSelected = false;
	vm.schools = SearchFactory.getSchools();
	vm.searchSchool = "";
	vm.selectedSchool = "";
	vm.selectedSchoolChange = selectedSchoolChange;
	vm.searchSchoolChange = searchSchoolChange;

	vm.schoolQuerySearch = schoolQuerySearch;


    function searchSchoolChange(text) {

    	vm.schoolHasBeenSelected = false;
    }

    function selectedSchoolChange(item) {

    	vm.schoolHasBeenSelected = true;
    }

    function schoolQuerySearch (query) {
      var results = query ? vm.schools.filter( createFilterFor(query) ) : vm.schools;

        return results;

    }


	
	vm.selectedClass = "";


	

    vm.simulateQuery = false;
    vm.isDisabled    = false;



    //vm.querySearch   = querySearch;
    
    //vm.searchTextChange   = searchTextChange;
    //vm.searchText = "";
    //vm.wtf = "wtfff";

    //vm.querySearch = querySearch;
    //vm.selectedClassChange = selectedClassChange;
    //vm.selectedItem = "";
    vm.newState = newState;


    //vm.exams = [];


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
    	console.log(vm.schools);
      var results = query ? vm.schools.filter( createFilterFor(query) ) : vm.schools,
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
