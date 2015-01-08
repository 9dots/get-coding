var name = module.exports = 'playspsace-whiteboard';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceWhiteboard', playspaceWhiteboard);

function playspaceWhiteboard() {
  var directive = {
    restirct: 'A',
    controller: playspaceWhiteboardCtrl,
    controllerAs: 'Whiteboard',
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
function playspaceWhiteboardCtrl($element) {
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
    if (level) {
      vm.directions = level.board.directions;
      vm.message = vm.directions;
      vm.paragraph = level.board.paragraph; 
      vm.drawing= level.board.drawing;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.help = level.board.help;

      _.each(vm.variableNames, function(variable) {
        vm.api[variable] = {
          get: function() {
            return vm.variables[variable];
          },
          set: function(val) {
            vm.variables[variable] = val;
          }
        }
      });
    }

    _.each(vm.variableNames, function(variable) {
      vm.variables[variable] = null;
    });
  }

  function finish(steps) {
    /*
    console.log('finish');
    console.log(vm.variableNames.length)
    console.log(vm.api['toy'].get())
    console.log(steps)
    console.log(vm.finished)
    */
    vm.finished= true;

    //define behavior for success and set finished to true when done
  }

}
















