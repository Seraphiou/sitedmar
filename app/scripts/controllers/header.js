'use strict';

/**
 * @ngdoc function
 * @name leSiteDuMariageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the leSiteDuMariageApp
 */

 angular.module('leSiteDuMariageApp').service('anchorSmoothScroll', function(){

 	this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        
        function currentYPosition() {
        	
            // Firefox, Chrome, Opera, Safari
            if (window.self.pageYOffset) {
            	return window.self.pageYOffset;
            }
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop) {
            	return document.documentElement.scrollTop;
            }
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop){
            	return document.body.scrollTop;
            }
            return 0;
        }
        
        function elmYPosition(eID) {
        	var elm = document.getElementById(eID);
        	var y = elm.offsetTop;
        	var node = elm;
        	while (node.offsetParent && node.offsetParent !== document.body) {
        		node = node.offsetParent;
        		y += node.offsetTop;
        	} return y;
        }

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
        	scrollTo(0, stopY);
        	return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20){ 
        	speed = 20;
        }
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
        	for ( var i=startY; i<stopY; i+=step ) {
        		setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
        		leapY += step;
        		if (leapY > stopY){
        			leapY = stopY;
        		}
        		timer++;
        	}

        	return;
        }
        for ( var j=startY; j>stopY; j-=step ) {
        	setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
        	leapY -= step;
        	if (leapY < stopY){
        		leapY = stopY;
        	}
        	timer++;
        }
    };
    
});
angular.module('leSiteDuMariageApp').directive('scroll', function ($window) {
    return function(scope) {
        angular.element($window).bind('scroll', function() {

    		 var scrollLimit=angular.element('.top-bar-content').height();
             if (this.pageYOffset >= scrollLimit) {
                 scope.boolChangeClass = true;
             } else {
                 scope.boolChangeClass = false;
             }
            scope.$apply();
        });
    };
});

angular.module('leSiteDuMariageApp').controller('headerCtrl', function ($scope, $location, $anchorScroll, anchorSmoothScroll) {
  	$scope.histoire=true;
    $scope.mariage=true;
    $scope.infos=true;
    $scope.scrollToId=
    function(id){
		anchorSmoothScroll.scrollTo(id);
    };
});