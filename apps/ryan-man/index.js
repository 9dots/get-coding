var name = module.exports = 'ryan-man';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-ryanman')
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
