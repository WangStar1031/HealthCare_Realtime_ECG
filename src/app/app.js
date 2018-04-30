'use strict';

var testApp = angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);

testApp.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/dashboard');

})
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
var userName = getCookie("blurAdmin");
// console.log(userName);
// debugger;
var isAuth = true;
if( userName == ""){
  isAuth = false;//window.location.href='auth.html';
}
testApp.run(function($window){
  // console.log($cookies);
  // debugger;
  if( !isAuth)
    $window.location = 'auth.html';
  else{
    $("#userName").html(userName);
  }
})