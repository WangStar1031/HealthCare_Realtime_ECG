 /**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('pageTopCtrl', pageTopCtrl);

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /** @ngInject */
  function pageTopCtrl($scope) {
  	var userName = getCookie("blurAdmin");
  	$("#userName").html(userName);
	$scope.signout = function(){
	  setCookie("blurAdmin", "", 1);
      // setTimeout(function(){
        window.location.href = "auth.html";
      // }, 1000);
  	}
  }
})();
