var name = module.exports = 'playspsace-crossriver';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceCrossriver', playspaceCrossriver);

function playspaceCrossriver() {
  var directive = {
    restirct: 'A',
    controller: playspaceCrossriverCtrl,
    controllerAs: 'Crossriver',
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
function playspaceCrossriverCtrl($element) {
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