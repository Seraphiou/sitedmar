'use strict';

/**
 * @ngdoc function
 * @name leSiteDuMariageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSiteDuMariageApp
 */


angular.module('leSiteDuMariageApp').service('messageService', ['$http', '$q', function($http, $q) {

    this.storeMessage = function(name, message, title ){
        var def = $q.defer();

        var messageJson= {
            'name': name,
            'title': title,
        	'message': message
        };

        $http.post('storeMessage.php', messageJson)
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



angular.module('leSiteDuMariageApp').controller('MessageController', function ($scope, $window ,messageService) {

	$scope.sendMessage = function(){
        $scope.nameError=false;
        $scope.messageError=false;
        $scope.titleError=false;
        if(!$scope.varname){
            $scope.nameError=true;
        }
        if(!$scope.message){
            $scope.messageError=true;
        }
        if(!$scope.title){
            $scope.titleError=true;
        }
        if (!($scope.titleError||$scope.messageError||$scope.nameError)) {
            messageService.storeMessage( $scope.varname, $scope.message,$scope.title  ).then(
        		function(data) {
        			$scope.result = data;
                    
                    $window.alert('Votre message à bien été enregistré, merci beaucoup ! :)');
                    $scope.$emit('someEvent');
                    $scope.varname='';
                    $scope.message='';
                    $scope.title='';
        		}, function(error) {
        			$scope.error = error;
        		}
        	);
        }
    };
});
