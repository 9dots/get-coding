console.log('main index');

require('angular/bower-angular@master:angular.js');
require('angular/bower-angular-route@master:angular-route.js');
require('angular/bower-material@master:angular-material.js');

angular.module('main',
  [
      'ngRoute'
  ])
.config(['$compileProvider', function($compileProvider) {
	var re = /^\s*(?:blob(?::|%3A))?(https?|ftp|file)(:|%3A)|data:image\//;
	$compileProvider.imgSrcSanitizationWhitelist(re);
}]);