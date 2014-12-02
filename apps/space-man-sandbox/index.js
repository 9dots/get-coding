var name = module.exports = 'space-man-sandbox';

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
    levels: require('/lib/space-man-levels').practice,
    help: require('./README.md')
  });
}]);
