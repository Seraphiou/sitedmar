'use strict';

/**
 * @ngdoc function
 * @name leSiteDuMariageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSiteDuMariageApp
 */


angular.module('leSiteDuMariageApp').service('confirmationService', ['$http', '$q', function($http, $q) {

    this.storeConfirmation = function(name, firstname, password, placeCount, notcoming){
        var def = $q.defer();

        var confirmationJson= {
            'name': name,
            'firstname': firstname,
        	'password': password,
            'placeCount': placeCount,
            'iscoming': notcoming?0:1
        };

        $http.post('storeConfirmation.php', confirmationJson)
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



angular.module('leSiteDuMariageApp').controller('ConfirmationController', function ($scope, $window, confirmationService) {

    $scope.inputType = 'password';
    $scope.notcoming=false;
    $scope.placeCount=0;
      // Hide & show password function
    $scope.hideShowPassword = function(){
        if ($scope .inputType === 'password'){
          $scope.inputType = 'text';
        } else{
          $scope.inputType = 'password';
        }
    };
	$scope.sendConfirmation = function(){
        $scope.nameError=false;
        $scope.firstnameError=false;
        $scope.passwordError=false;
        $scope.placeError=false;

        if(!$scope.varname){
            $scope.nameError=true;
        }
        if(!$scope.firstname){
            $scope.firstnameError=true;
        }
        if(!$scope.password){
            $scope.passwordError=true;
        }
        if(!$scope.notcoming&&!$scope.placeCount){
            $scope.placeError=true;
        }
        if (!($scope.placeError||$scope.passwordError||$scope.firstnameError||$scope.nameError)) {
            confirmationService.storeConfirmation($scope.varname, $scope.firstname, $scope.password, $scope.placeCount, $scope.notcoming).then(
        		function(data) {
                    if (data.indexOf('pwerror')===-1) {
            			$scope.response = data;
                        $window.alert('Votre confirmation à bien été enregistrée :) Merci beaucoup ! Didi et Séraf');
                        $scope.varname='';
                        $scope.firstname='';
                        $scope.password='';
                        $scope.placeCount='';
                    }else{
                        $window.alert('Le mot de passe est faux. :/\n Veuillez reessayer.');
                    }
        		}, function(error) {
        			$scope.error = error;
        		}
        	);
        }
    };
});
