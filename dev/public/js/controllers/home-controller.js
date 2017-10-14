(function(app) {
	app.controller('HomeController', ['$scope', function($scope, $log, $q) {
		 var vm = this;

    vm.simulateQuery = false;
    vm.isDisabled    = false;

    // list of `state` value/display objects
    vm.states        = loadAll();
    vm.querySearch   = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.searchTextChange   = searchTextChange;
    vm.searchText = "";
    vm.wtf = "wtfff";

    vm.querySearch = querySearch;
    vm.selectedItemChange = selectedItemChange;
    //vm.selectedItem = "";
    vm.newState = newState;


    vm.exams = [{'description': 'calc 1 test'}, {'description': 'calc 1 test'}, {'description': 'calc 1 test'}]
    vm.exam1 = {'description': 'calc 1 test'}
    vm.exam2 = {'description': 'calc 2 test'}
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
      var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states,
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

    function selectedItemChange(item) {
  //    console.log(item);
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
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
