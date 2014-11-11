var pkg = require('./package.json')

var name = module.exports = pkg.name;
angular.module(name, [])
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

