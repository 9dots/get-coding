var name = module.exports = 'space-man';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-spaceman')
])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app.space-man', {
    url: '/space-man',
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