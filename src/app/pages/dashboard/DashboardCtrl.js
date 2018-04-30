/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);

  /** @ngInject */
  // document.location.href="/login";
  // return;
  function DashboardCtrl($scope) {
  	$scope.isBrain = false;
  	$scope.isHeart = false;
  	$scope.isLung = false;
  	$scope.isBlood1 = false;
  	$scope.isBlood2 = false;
  	$scope.width = document.getElementById("avatarImg").clientWidth;
  	$scope.height = document.getElementById("avatarImg").clientHeight;
	$scope.captureCoordinate = function($event){
		var xPos = $event.offsetX;
		var yPos = $event.offsetY;
		if((xPos>$scope.width*5/12)&&(xPos<$scope.width*7/12) && (yPos>$scope.height*4/124)&&(yPos<$scope.height*17/124)){
			if( $scope.isBrain == true)return;
				$scope.isBrain = true;
		} else{
			$scope.isBrain = false;
		}
		if((xPos>$scope.width/2)&&(xPos<$scope.width*6.5/12) && (yPos>$scope.height*32/124)&&(yPos<$scope.height*36/124)){
			$scope.isLung = false;
			if( $scope.isHeart == true)return;
				$scope.isHeart = true;
		} else{
			$scope.isHeart = false;
			if((xPos>$scope.width/3)&&(xPos<$scope.width*2/3) && (yPos>$scope.height*25/124)&&(yPos<$scope.height*36/124)){
			  	$scope.isBlood1 = false;
			  	$scope.isBlood2 = false;
				if( $scope.isLung == true)return;
					$scope.isLung = true;
			} else{
				$scope.isLung = false;
			}
		}
		if((xPos>$scope.width/4)&&(xPos<$scope.width*5/12)  && (yPos>$scope.height*25/124)&&(yPos<$scope.height*60/124)){
			if( $scope.isBlood1 == true)return;
				$scope.isBlood1 = true;
		} else{
			$scope.isBlood1 = false;
		}
		if( (xPos>$scope.width*2/3)&&(xPos<$scope.width*3/4) && (yPos>$scope.height*25/124)&&(yPos<$scope.height*60/124)){
			if( $scope.isBlood2 == true)return;
				$scope.isBlood2 = true;
		} else{
			$scope.isBlood2 = false;
		} 
 	}
	$scope.$watch(function () {
		$scope.width = document.getElementById("avatarImg").clientWidth;
		$scope.height = document.getElementById("avatarImg").clientHeight;
	  	$scope.eegLeft = parseInt($scope.width / 2);
	  	$scope.eegtop = parseInt($scope.height * 10 / 124);
	  	$scope.ecgLeft = parseInt($scope.width / 2);
	  	$scope.ecgtop = parseInt($scope.height * 32 / 124);
	  	$scope.canLeft = parseInt($scope.width / 2);
	  	$scope.cantop = parseInt($scope.height * 29 / 124);
	  	$scope.bldLeft = parseInt($scope.width / 4);
	  	$scope.bldLeft2 = parseInt($scope.width *2 / 3);
	  	$scope.bldtop = parseInt($scope.height * 35 / 124);
    });
  }
})();
