/**
 * Exports
 */
var name = module.exports = 'fire-and-ice';

/**
 * Angular Module
 */
var module = angular.module(name, [
  'ui.router', 
  require('lib/code-app'), 
  require('lib/workspace-ace'), 
  require('lib/playspace-magic-words')
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
    levels: require('lib/magicwords-levels').fireandice,
 // specify levels here
  });
}]);
