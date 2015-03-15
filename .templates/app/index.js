/**
 * Exports
 */
var name = module.exports = '{{name}}';

/**
 * Angular Module
 */
var module = angular.module(name, [
  'ui.router', 
  require('lib/code-app'), 
  require('lib/workspace-{{workspace}}'), 
  require('lib/playspace-{{playspace}}')
]);

/**
 * Styles
 */
require('./index.css');

module
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: [] // specify levels here
  });
}]);
