(function() {
	angular.module('app')
		.controller('mainCtrl', ['NgMap', 'mapURL', '$scope', '$window', 'dataService', '$log', '$timeout', function(NgMap, mapURL, $scope, $window, dataService, $log, $timeout) {
			$scope.url = mapURL;
			$scope.zoom = 17;
			NgMap.getMap()
				.then(function(map) {
					$scope.map = map;
					console.log(map);
				});

			dataService.getData()
				.then(function(data) {
					$scope.userData = data;
					console.log($scope.userData);
				})
				.catch(function(err) {
					$log.error(err);
				})

			$timeout(function() {
				$scope.center = $scope.userData[0].latitude + ',' + $scope.userData[0].longitude;
			}, 1500);

			$scope.showInfo = function(e, user) {
				$scope.currentUser = user;
				$scope.map.showInfoWindow('info-window', this);
			}

			$scope.$watch('selectedStatus', function(newData) {
				console.log($scope.selectedStatus);
				console.log(newData);
			})

			$scope.reset = function(){
				$scope.selectedStatus = undefined;
				$scope.selectedCondition = undefined;
			}

	}])
		.filter('unique', function() {
			return function(collection, keyname) {
				var output = [],
					keys = [];

				angular.forEach(collection, function(item) {
					var key = item[keyname];
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						output.push(item);
					}
				});

				return output;
			};
		});;
})();

