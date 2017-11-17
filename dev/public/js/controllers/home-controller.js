(function(app) {
	app.controller('HomeController', ['$scope', 'SearchFactory', 'LCP', 'HOSTNAME', function($scope, SearchFactory, LCP, HOSTNAME) {

    console.log(HOSTNAME);
    console.log(LCP);
		 var vm = this;

     vm.loadingExams = true;
     vm.exams = [ {"description" : 'test1'} ];


	vm.loadingSchools = true;
	vm.isSchoolSearchDisabled = false;
    vm.isSchoolCacheDisabled = false;

	vm.schoolHasBeenSelected = false;
	vm.schools = [];
  SearchFactory.getSchools().then(updateLoadingSchools);
	vm.searchSchool = "";
	vm.selectedSchool = "";
	vm.selectedSchoolChange = selectedSchoolChange;
	vm.searchSchoolChange = searchSchoolChange;

	vm.schoolQuerySearch = schoolQuerySearch;


  function updateLoadingSchools(data) {
    vm.loadingSchools = false;
    console.log(data);
    console.log(vm.loadingSchools);
    vm.schools = data;
  }
    function searchSchoolChange(text) {

      vm.loadingClasses = true;
      vm.loadingExams = true;
    	vm.schoolHasBeenSelected = false;

      vm.schoolClasses = [];


    }

    function selectedSchoolChange(item) {

    	if(vm.selectedSchool == null || vm.selectedSchool === "")
    	{
    		vm.schoolHasBeenSelected = false;
        vm.classHasBeenSelected = false;
        vm.selectedClass = "";
        vm.loadingClasses = true;
        vm.loadingExams = true;

        vm.schoolClasses = [];
    	}
    	else
    	{
    		vm.schoolHasBeenSelected = true;
        SearchFactory.getClasses(vm.selectedSchool).then(updateLoadingClasses);
    	}
    	console.log("selection method");
    	console.log(vm);
    }

    function schoolQuerySearch (query) {
      console.log(vm.schools);
      var results = query || query == "" ? vm.schools.filter( createFilterFor(query) ) : vm.schools;

        return results;

    }

    vm.loadingClasses = true;
    vm.isClassSearchDisabled = false;
    vm.isClassCacheDisabled = true;
    vm.classHasBeenSelected = false;
    vm.searchClass = "";
    vm.classQuerySearch = classQuerySearch;
	vm.schoolClasses = [];
	vm.selectedClass = "";
	vm.selectedClassChange = selectedClassChange;
	vm.searchClassChange = searchClassChange;



	

    function updateLoadingClasses(data) {
    vm.loadingClasses = false;
    console.log(data);
    vm.schoolClasses = data;
    }
    function searchClassChange(text) {
      console.log(vm.schoolClasses);
    	vm.classHasBeenSelected = false;
      vm.loadingExams = true;
    }

    function selectedClassChange(item) {
      if(vm.selectedClass === null || vm.selectedClass === "")
      {
        vm.classHasBeenSelected = false
        vm.loadingExams = true;
      }
      else
      {
        vm.classHasBeenSelected = true;
        SearchFactory.getExams(vm.selectedSchool, vm.selectedClass).then(updateLoadingExams);
      }



    }

    function updateLoadingExams(data)
    {
      vm.loadingExams = false;
      console.log(vm.loadingExams);
      console.log(data);
      vm.exams = data;
      return data;
    }

    function classQuerySearch (query) {
      console.log(query);
      var results = query || query == "" ? vm.schoolClasses.filter( createFilterFor(query) ) : vm.schoolClasses;
      console.log("results");
      console.log(results);
        return results;
    }


	


  vm.loadingTags = true;
  vm.isTagSearchDisabled = false;
    vm.isTagCacheDisabled = false;

  vm.tagHasBeenSelected = false;
  vm.tags = [];
  SearchFactory.getTags().then(updateLoadingTags);
  vm.searchTag = "";
  vm.selectedTag = "";
  vm.selectedTagChange = selectedTagChange;
  vm.searchTagChange = searchTagChange;

  vm.tagQuerySearch = tagQuerySearch;


  function updateLoadingTags(data) {
    vm.loadingTags = false;
    console.log(data);
    console.log(vm.loadingTags);
    vm.tags = data;
  }
    function searchTagChange(text) {

      vm.loadingClasses = true;
      vm.loadingExams = true;
      vm.tagHasBeenSelected = false;



    }

    function selectedTagChange(item) {


      console.log(item);
      if(item != null)
      {
        SearchFactory.getExamsByTag(item).then(updateLoadingExams);
      }

    }

    function tagQuerySearch (query) {
      console.log(vm.tags);
      var results = query || query == "" ? vm.tags.filter( createFilterFor(query) ) : vm.tags;

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
