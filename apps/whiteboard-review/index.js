/**
 * Exports
 */
var name = module.exports = 'whiteboard-review';


/**
 * Angular module
 */
var module = angular.module(name, [
  'ui.router',
  require('lib/code-app'),
  require('lib/workspace-ace'),
  require('lib/playspace-whiteboard-review')
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
    levels: require('./levels.json').levels
  });
}]);
