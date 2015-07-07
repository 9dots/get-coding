/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-{{name}}';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspace{{upperName}}', playspace{{upperName}});

function playspace{{upperName}}() {
  var directive = {
    restirct: 'A',
    controller: playspace{{upperName}}Ctrl,
    controllerAs: '{{upperName}}',
    template: require('./index.html'),
    link: linkFunc
  };
  return directive;

  function linkFunc(scope, elem, attrs, ctrl) {
    var App = scope.App;
    var Playspace = ctrl;
    App.add(Playspace);
  }
}

// Create your playspace in the controller below
function playspace{{upperName}}Ctrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    
  }

  // define api

}