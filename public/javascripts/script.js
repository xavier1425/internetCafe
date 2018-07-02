var app =angular.module('myApp', []);

app.controller('myCtrl', function($scope, $interval) {
	$scope.names = temp;
	$scope.sum = 0;
	$scope.products = [];
	$scope.myFunc = function(myE) {
		$scope.name = myE.name;
		$scope.price = myE.price;
		$scope.sum += myE.price;
		$scope.count = myE.count++;
	}

	$scope.addItem = function() {
		$scope.errortext = "";
		if(!$scope.addMe) {return;}
		if($scope.products.indexOf($scope.addMe) == -1) {
		} else {
			$scope.errortext = "The item is already in your shopping list.";
		}
	}
	$scope.removeItem = function(x) {
		$scope.errortext = "";
		$scope.products.splice(x, 1);
	}

	$scope.clear = function() {
		$scope.sum = 0;
	}

	$scope.theTime = new Date().toLocaleTimeString();
	$interval(function() {
		$scope.theTime = new Date().toLocaleTimeString();
	}, 1000);
});