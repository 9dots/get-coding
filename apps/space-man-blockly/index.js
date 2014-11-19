var name = module.exports = 'space-man-blockly';

require('/lib/spaceman-blocks')

angular.module(name, ['ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-blockly'), 
  require('/lib/playspace-spaceman')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    levels: require('/lib/space-man-levels').first,
    help: require('./README.md')
  });
}]);