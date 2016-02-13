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

angular.module('leSiteDuMariageApp').directive('scrollindex', function ($window) {
    return function(scope) {
        angular.element($window).bind('scroll', function() {

            
            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent !== document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }
            
            var accueil=elmYPosition('accueil');
            var histoire=elmYPosition('histoire');
            var mariage=elmYPosition('mariage');
            var infos=elmYPosition('infos');
            var photos=elmYPosition('photos');
            var presence=elmYPosition('presence');
            var liste=elmYPosition('liste');
            var album=elmYPosition('album');
            var bali=elmYPosition('bali');
            var message=elmYPosition('message');
            var ecritures=elmYPosition('ecritures');
            if(this.pageYOffset>bali){
                if (scope.bgimg!=='bg5') {
                    scope.bgimg='bg5';
                }
            
            }else if (this.pageYOffset>liste) {
                if (scope.bgimg!=='bg4') {
                    scope.bgimg='bg4';
                }


            }else if (this.pageYOffset>photos) {
                if (scope.bgimg!=='bg3') {
                    scope.bgimg='bg3';
                }

            }else if (this.pageYOffset>mariage) {
                if (scope.bgimg!=='bg2') {
                    scope.bgimg='bg2';
                }
                
            }else{
                if (scope.bgimg!=='bg1') {
                    scope.bgimg='bg1';
                }
                
            }
            if(this.pageYOffset>histoire){
                scope.showArrow=true;
            }else{
                scope.showArrow=false;                
            }


            if (this.pageYOffset >= ecritures) {
                scope.level='ecritures';
            } else if (this.pageYOffset >= message) {
                scope.level='message';
            } else if (this.pageYOffset >= bali) {
                scope.level='bali';
            } else if (this.pageYOffset >= album) {
                scope.level='album'; 
            } else if (this.pageYOffset >= liste) {
                scope.level='liste';
            } else if (this.pageYOffset >= presence) {
                scope.level='presence';
            } else if (this.pageYOffset >= photos) {
                scope.level='photos';
            } else if (this.pageYOffset >= infos) {
                scope.level='infos';
            } else if (this.pageYOffset >= mariage) {
                scope.level='mariage';
            } else if (this.pageYOffset >= histoire) {
                scope.level='histoire';
            } else if (this.pageYOffset >= accueil) {
                scope.level='accueil';
            }
            scope.$apply();
        });
    };
});

angular.module('leSiteDuMariageApp').controller('headerCtrl', function ($scope, $location, $anchorScroll, $window, anchorSmoothScroll) {
    $scope.histoire=true;
    $scope.mariage=true;
    $scope.infos=true;
    $scope.scrollToId=
        function(id){
          anchorSmoothScroll.scrollTo(id);
        };
    $scope.getImage = 
        function(event){
            console.log(event.target.style['background-image']);
        };
    $scope.slides = [

        {image: 'images/Gallery/DS1.d8090354.jpg', description: 'Image 01'},
        {image: 'images/Gallery/DS2.4fb0c244.jpg', description: 'Image 02'},
        {image: 'images/Gallery/DS3.c78b1704.jpg', description: 'Image 03'},
        {image: 'images/Gallery/DS4.680bdcdb.jpg', description: 'Image 04'},
        {image: 'images/Gallery/DS5.af1a300a.jpg', description: 'Image 05'},
        {image: 'images/Gallery/DS6.5a1c6f0a.jpg', description: 'Image 06'},
        {image: 'images/Gallery/DS7.476535ce.jpg', description: 'Image 07'},
        {image: 'images/Gallery/DS8.44edcdd7.jpg', description: 'Image 08'},
        {image: 'images/Gallery/DS9.2c972817.jpg', description: 'Image 09'},
        {image: 'images/Gallery/DS10.7e53165e.jpg', description: 'Image 10'},
        {image: 'images/Gallery/DS11.eec5bc03.jpg', description: 'Image 11'},
        {image: 'images/Gallery/DS12.02fbe525.jpg', description: 'Image 12'},
        {image: 'images/PhotoBali/B1.bda81536.jpg', description: 'Image 13'},
        {image: 'images/PhotoBali/B2.3577fa2f.jpg', description: 'Image 14'},
        {image: 'images/PhotoBali/B3.a0804b16.jpg', description: 'Image 15'},
        {image: 'images/PhotoBali/B4.1df764e6.jpg', description: 'Image 16'},
        {image: 'images/PhotoBali/B5.6952a988.jpg', description: 'Image 17'},
        {image: 'images/PhotoBali/B6.df159499.jpg', description: 'Image 18'},
        {image: 'images/PhotoBali/B7.d1b7718b.jpg', description: 'Image 19'},
        {image: 'images/PhotoBali/B8.ceca17e1.jpg', description: 'Image 20'},
        {image: 'images/PhotoBali/B9.bbd27973.jpg', description: 'Image 21'},
        {image: 'images/PhotoBali/B10.fff7618e.jpg', description: 'Image 22'},
        {image: 'images/PhotoBali/B11.9d7e7f4a.jpg', description: 'Image 23'},
        {image: 'images/PhotoBali/B12.a96c56c6.jpg', description: 'Image 24'},

    ];
    $scope.direction = 'left';
    $scope.currentIndex = 0;
    $scope.showSlider=false;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.showSlider=true;
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.setShowSliderTrue = function () {
        $scope.showSlider=true;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
});