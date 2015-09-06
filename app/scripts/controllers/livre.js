'use strict';
angular.module('leSiteDuMariageApp').service('getMessagesService', ['$http', '$q', function($http, $q) {

    this.messages = function(){
        var def = $q.defer();

        

        $http.get('getMessages.php')
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

angular.module('leSiteDuMariageApp').controller('LivreDOrController', function ($scope, getMessagesService) {
    $scope.messages=[];
    getMessagesService.messages().then(
    		function(data) {
    			$scope.messages = data;
    		}, function(error) {
                $scope.error = error;
    		}
    	);

    
});