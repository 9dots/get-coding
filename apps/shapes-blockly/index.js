var name = module.exports = 'shapes-blockly';

require('/lib/shapes-blocks')

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-blockly'), 
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
