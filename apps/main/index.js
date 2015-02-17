
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
  require('/apps/spaceman-functions-blockly'),
  require('/apps/crossriver-intro')
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
      color: '#EC5766'
    },
    {
      name: 'Daniel Courses',
      apps: _.first(apps, 4),
      color: '#F7B33B'
    },
    {
      name: 'Third Courses',
      apps: _.last(apps, 7),
      color: '#69B7E3'
    }
  ];

  this.apps = apps;

  $scope.toggleStatus = function(e) {
    $scope.$emit('toggle', this, $animate);  
  }

}])
.directive('accordion', function(){
  return {
    template:require('./accordion.html')
  }
})
.directive('expandable', function(){
  function animateAdd(element, $animate) {
    $animate.addClass(element, 'on', {
      from: {
        height: element.height()
      },
      to: {
        height : element[0].scrollHeight
      }
    });
  }
  function animateRemove(element, $animate) {
    $animate.removeClass(element, 'on', {
      from: {
        height: element.height()
      },
      to: {
        height : '0px'
      }
    });
  }

  return {
    link: function(scope, element, attrs) {
      scope.$parent.$on('toggle', function(evt, targetScope, $animate){
        if(scope == targetScope && !scope.active){
          animateAdd(element,$animate);
          scope.active = true;
        }
        else{
          animateRemove(element,$animate);
          scope.active = false;
        }
      });
    }
  }
});

angular.element(document).ready(function() {
  var modules = ['main', require('/lib/html5mode')];
  angular.bootstrap(document, modules);
});

