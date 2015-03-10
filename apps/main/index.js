
/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');


/**
 * Exports
 */
var name = module.exports = 'main';


/**
 * Module
 */
var module = angular.module(name, [
  'ui.router',
  'ngMaterial',
  'ngSanitize',
  'ngAnimate',

  // Apps
  require('apps/whiteboard-declaring-variables'),
  require('apps/fridge-variable-expressions'),
  require('apps/whiteboard-review'),
  require('apps/space-man-blockly'),
  require('apps/spaceman-blockly-repeat'),
  require('apps/space-man-sandbox'),
  require('apps/space-man'),
  require('apps/shapes-blockly'),
  require('apps/shapes'),
  require('apps/spaceman-sequencing'),
  require('apps/spaceman-sequencing-blockly'),
  require('apps/spaceman-functions'),
  require('apps/spaceman-functions-blockly'),
  require('apps/crossriver-intro'),
  require('apps/crossriver-blockly'),
  require('apps/strings'),
  require('apps/frogjump-puzzle'),
  require('apps/crossriver-cops'),
  require('apps/crossriver-cops-blockly'),
  require('apps/frogjump-blockly'),
  require('apps/crossriver-monkeys')
]);

/**
 * Styles
 */
require('./index.css');

module
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

  var appObject = {};
  _.each(apps, function(elem) {
    appObject[elem.name] = elem;
  });

  this.courses = [
    {
      name: 'Introduction to Variables',
      apps: [
        appObject['whiteboard-declaring-variables'],
        appObject['whiteboard-review'],
        appObject['fridge-variable-expressions'],
        appObject['strings']
      ]
    },
    {
      name: 'Using Functions',
      apps: [
        appObject['space-man']
      ]
    },
    {
      name: 'Spaceman Advanced Algorithms',
      apps: [
        appObject['spaceman-sequencing-blockly'],
        appObject['spaceman-sequencing'],
        appObject['spaceman-functions-blockly'],
        appObject['spaceman-functions']
      ]
    },
    {
      name: 'Puzzles',
      apps: [
        appObject['crossriver-blockly'],
        appObject['crossriver-intro'],
        appObject['crossriver-cops-blockly'],
        appObject['crossriver-cops'],
        appObject['frogjump-blockly'],
        appObject['frogjump-puzzle']
      ]
    }
  ];

  $scope.toggleStatus = function(e) {
    $scope.$emit('toggle', this, $animate);  
  }

}])
.directive('accordion', function(){
  return {
    template: require('./accordion.html')
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
  var modules = ['main', require('lib/html5mode')];
  angular.bootstrap(document, modules);
});

