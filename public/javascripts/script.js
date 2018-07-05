var app =angular.module('myApp', [])

app.controller('myCtrl', function($scope, $interval) {
	$scope.names = temp
	$scope.sum = 0
	$scope.addItem = function(myE) {
		$scope.name = myE.name
		$scope.price = myE.price
		$scope.count = myE.count++
		$scope.sum += $scope.price
	}
	$scope.removeItem = function(myE) {
		if(myE.count) {
			$scope.count = myE.count--;
			$scope.sum = $scope.sum - myE.price;
		}
	}
	$scope.clear = function() {
		$scope.names.forEach(function(x) {
			x.count = 0
		})
		$scope.sum = 0
	}

	$scope.theTime = new Date().toLocaleTimeString()
	$interval(function() {
		$scope.theTime = new Date().toLocaleTimeString()
	}, 1000)
})