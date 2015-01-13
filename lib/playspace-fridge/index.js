var name = module.exports = 'playspsace-fridge';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceFridge', playspaceFridge);

function playspaceFridge() {
  var directive = {
    restirct: 'A',
    controller: playspaceFridgeCtrl,
    controllerAs: 'Fridge',
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
function playspaceFridgeCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};
  vm.finish = finish;

  // initialize playspace
  function activate(level, speed) {
    
  }
  function finish(steps){
    
  }
  // define api

}