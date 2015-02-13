
var name = module.exports = 'main';

require('/lib/angular');
var _ = require('lodash/lodash');

angular.module(name, [
  'ui.router',
  'ngMaterial',
  'ngSanitize',

  // Apps
  require('/apps/whiteboard-declaring-variables'),
  require('/apps/fridge-variable-expressions'),
  require('/apps/whiteboard-review'),
  require('/apps/space-man-blockly'),
  require('/apps/spaceman-blockly-repeat'),
  require('/apps/space-man-sandbox'),
  require('/apps/space-man'),
  require('/apps/shapes-blockly'),
  require('/apps/shapes'),
  require('/apps/spaceman-sequencing'),
  require('/apps/spaceman-sequencing-blockly'),
  require('/apps/spaceman-functions'),
  require('/apps/spaceman-functions-blockly')
])
.config(['$compileProvider', function($compileProvider) {
  var re = /^\s*(?:blob(?::|%3A))?(https?|ftp|file)(:|%3A)|data:image\//;
  $compileProvider.imgSrcSanitizationWhitelist(re);
}])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: require('./index.html'),
    controller: 'MainCtrl',
    controllerAs: 'Main'
  });
}])
.controller('MainCtrl', ['apps', '$scope', '$animate', function(apps, $scope, $animate) {

  this.groups = [
    {
      name: 'Ryan Courses',
      apps: apps,
      color: '#69B7E3'
    },
    {
      name: 'Daniel Courses',
      apps: _.first(apps, 4),
      color: '#EC5766'
    },
    {
      name: 'Third Courses',
      apps: _.last(apps, 7),
      color: '#F7B33B'
    }
  ];

  this.apps = apps;

  $scope.toggleStatus = function(e) {
    this.isopen = !this.isopen; 
    $scope.$emit('toggle', this, $animate);  
  }

}])
.directive('accordion', function(){
  return {
    template:require('./accordion.html')
  }
})
.directive('accordionGroup', function(){
  return {
    link: function(scope, element, attrs){
      scope.$parent.$on('toggle', function(evt, targetScope, $animate){
        console.log(evt);
        if(scope != targetScope){
          $animate.addClass(element, 'on', {
            to: {
              height : '300px'
            }
          });
          scope.isopen = false;
        }
      });
    }
  }
}).
directive('expandable', function(){
  return {
    link: function(scope, element) {
      scope.$parent.$on('toggle', function(){
        console.log(element.height(), element[0].scrollHeight);
      });
    }
  }
});

angular.element(document).ready(function() {
  var modules = ['main', require('/lib/html5mode')];
  angular.bootstrap(document, modules);
});

