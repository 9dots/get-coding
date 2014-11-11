var name = module.exports = 'space-man-blockly';

require('/lib/spaceman-blocks')

angular.module(name, ['ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-blockly'), 
  require('/lib/playspace-spaceman')
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.space-man-blockly', {
    url: '/space-man-blockly',
    views: {
      workspace: {
        template: require('./workspace.html')
      },
      playspace: {
        template: require('./playspace.html')        
      }
    }
  })
}]);