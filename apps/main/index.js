
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
  require('apps/create-functions'),
  require('apps/functions-debug'),
  require('apps/shapes-blockly'),
  require('apps/shapes'),
  require('apps/spaceman-sequencing'),
  require('apps/spaceman-sequencing-blockly'),
  require('apps/spaceman-functions'),
  require('apps/spaceman-functions-blockly'),
  require('apps/spaceman-loops'),
  require('apps/crossriver-intro'),
  require('apps/crossriver-blockly'),
  require('apps/strings'),
  require('apps/frogjump-puzzle'),
  require('apps/crossriver-cops'),
  require('apps/crossriver-cops-blockly'),
  require('apps/frogjump-blockly'),
  require('apps/crossriver-monkeys'),
  require('apps/squirrel'),
  require('apps/magic-words'),
  require('apps/fire-and-ice'),
  require('apps/variables-and-numbers'),
  require('apps/math-operators'),
  require('apps/combining-variables'),
  require('apps/cash-register'),
  require('apps/find-the-rule'),
  require('apps/copy-rule'),
  require('apps/three-to-one'),
  require('apps/test'),
  require('apps/squirrel2'),
  require('apps/mathops2'),
  require('apps/squirrel3'),
  require('apps/mathops3'),
  require('apps/squirrel4'),
  require('apps/squirrel-btn1'),
  require('apps/incrementor'),
  require('apps/counter'),
  require('apps/frogjump-btns'),
  require('apps/magic-words-buttons'),
  require('apps/strings1'),
  require('apps/strings2')
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
.controller('MainCtrl', ['apps', '$scope', '$animate', '$anchorScroll', function(apps, $scope, $animate, $anchorScroll) {

  var appObject = {};
  _.each(apps, function(elem) {
    appObject[elem.name] = elem;
  });

  this.courses = [
    {
      name: 'Pre-Code Activities',
      subtitle: 'Unit for early readers that does not require typing.',
      open: 'closed',
      apps: [
        appObject['crossriver-blockly'],
        appObject['frogjump-blockly'],
        appObject['spaceman-functions-blockly']
      ]
    },
    {
      name: 'Unit 1',
      subtitle: 'Students solve problems by calling functions, passing arguments, and utilizing looping and selection.',
      open: 'closed',
      apps: [
        appObject['squirrel'],
        appObject['squirrel2'],
        appObject['space-man'],
        appObject['magic-words'],
        appObject['squirrel3'],
        appObject['fire-and-ice'],
        appObject['frogjump-puzzle'],
        appObject['crossriver-intro'],
        appObject['spaceman-loops']
      ]
    },
    {
      name: 'Unit 2',
      subtitle: 'Students learn about creating and using variables to store strings and numbers.',
      open: 'closed',
      apps: [
        appObject['variables-and-numbers'],
        appObject['math-operators'],
        appObject['mathops2'],
        appObject['mathops3'],
        appObject['strings1'],
        appObject['strings2']
      ]
    }
  ]

  $scope.toggleStatus = function(e) {
    $scope.$emit('toggle', this, $animate);
  }

  $scope.scrollTop = function(){
    $anchorScroll();
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
