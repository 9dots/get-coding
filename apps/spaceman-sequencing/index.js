var name = module.exports = 'spaceman-sequencing';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-spaceman')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: require('/lib/space-man-levels').sequence
  });
}]);
