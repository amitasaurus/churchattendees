(function() {
	angular.module('app')
		   .factory('dataService', ['$q', '$http', function($q, $http) {
			return {
				getData : getData
			};
				
			function getData(){
				var deferred = $q.defer();
				return $http.get('js/data.json')
				 .then(function(response){
				 	return response.data;
				 })
				 .catch(function(response){
				 	return $q.reject(response.status + ' : ' + response.statusText);
				 });	
			}
			
	}]);
})();