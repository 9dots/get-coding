var pkg = require('./package.json')

require('angular/bower-angular@master:angular.js')

var name = module.exports = pkg.name;
angular.module(name, [])
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

