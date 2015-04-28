/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-magic-words';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceMagicWords', playspaceMagicWords);

function playspaceMagicWords() {
  var directive = {
    restirct: 'A',
    controller: playspaceMagicWordsCtrl,
    controllerAs: 'MagicWords',
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
function playspaceMagicWordsCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    vm.gates= level.gates;
    console.log(vm.gates)
<<<<<<< HEAD
    
=======
    $("#gate1").css("height", "50%")
>>>>>>> 13f79311fe8d51540b1367b1dca8b0b4d85a0d20
  }

  // define api

}