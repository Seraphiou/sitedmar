'use strict';

/**
 * @ngdoc function
 * @name leSiteDuMariageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSiteDuMariageApp
 */


angular.module('leSiteDuMariageApp').service('covoiturageService', ['$http', '$q', function($http, $q) {

    this.storeCovoiturage = function(name, varreturn, firstname, driver, town, tel, placeCount ){
        var def = $q.defer();

        var covoiturage= {
        	'name': name,
        	'return': varreturn ? 1 : 0,
        	'firstname': firstname,
        	'driver': driver ? 1 : 0,
        	'town': town,
        	'tel': tel,
        	'placeCount': placeCount
        };

        $http.post('storeCovoiturage.php',covoiturage)
            .success(
				function(data) {
					def.resolve(data);
				}
            )
            .error(
				function() {
					def.reject('Failed to get albums');
				}
            );
        return def.promise;
    };
}]);



angular.module('leSiteDuMariageApp').controller('CovoiturageController', function ($scope, $window, covoiturageService) {

	$scope.sendCovoiturage = function(){
        $scope.nameError=false;
        $scope.firstnameError=false;
        $scope.choosingError=false;
        $scope.townError=false;
        $scope.telError=false;
        $scope.placeError=false;
        if(!$scope.varname){
            $scope.nameError=true;
        }
        if(!$scope.firstname){
            $scope.firstnameError=true;
        }
        if(!($scope.searchForPlace || $scope.searchForCo)){
            $scope.choosingError=true;
        }
        if(!$scope.placeCount){
            $scope.placeError=true;
        }
        if(!$scope.tel){
            $scope.telError=true;
        }
        if (!($scope.placeError||$scope.choosingError||$scope.firstnameError||$scope.nameError||$scope.telError)) {
            covoiturageService.storeCovoiturage($scope.varname, $scope.varreturn, $scope.firstname, !$scope.searchForPlace, $scope.town, $scope.tel, $scope.placeCount).then(
        		function(data) {
        			$scope.response = data;
                    $window.alert('C\'est noté ! Merci pour l\'info, nous vous recontacterons ! Didi et Séraf');
                    $scope.varname='';
                    $scope.varreturn=false;
                    $scope.firstname='';
                    $scope.searchForPlace=false;
                    $scope.town='';
                    $scope.tel='';
                    $scope.placeCount='';
        		}, function(error) {
        			$scope.error = error;
        		}
        	);
        }
    };
});
