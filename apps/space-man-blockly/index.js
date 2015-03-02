/**
 * Modules
 */

require('lib/spaceman-blocks');

/**
 * Exports
 */
var name = module.exports = 'space-man-blockly';


/**
 * Angular Module
 */
var module = angular.module(name, ['ui.router', 
  require('lib/code-app'), 
  require('lib/workspace-blockly'), 
  require('lib/playspace-spaceman')
])

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
    levels: require('lib/space-man-levels').first,
    help: require('./README.md')
  });
}]);