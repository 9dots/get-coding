var name = module.exports = 'shapes';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-p5-grid')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: [] // specify levels here
  });
}]);
