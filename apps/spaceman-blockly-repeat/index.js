var name = module.exports = 'spaceman-blockly-repeat';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-blockly'), 
  require('/lib/playspace-spaceman')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: require('/lib/space-man-levels').repeat
  });
}]);
