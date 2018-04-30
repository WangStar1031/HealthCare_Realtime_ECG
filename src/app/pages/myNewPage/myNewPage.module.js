(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
  	$stateProvider
  		.state('myNewPage', {
  			url: '/myNewPage',
  			templateUrl: 'app/pages/myNewPage/my-new-page.html',
  			sidebarMeta:{
  				order: 800,
  			},
  		});
  }

})();