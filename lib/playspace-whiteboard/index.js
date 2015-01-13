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
  vm.getHelp= getHelp;
  vm.unHelp= unHelp;
  vm.getHint= getHint;
  vm.unHint= unHint;
  vm.finish = finish;
  vm.helpMessage= helpMessage;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.finished= false;
      vm.directions = level.board.directions;
      vm.message = vm.directions;
      vm.paragraph = level.board.paragraph; 
      vm.drawing= level.board.drawing;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.help = level.board.help;
      vm.hint = level.board.hint;

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

  function getHelp(){
    $(".helphand").animate({
      top: "625px",
      left: "360px"
    }, 200, function(){
      $(".helphand").addClass("openhand");
      $(".helphand").removeClass("fisthand");
    })
    helpMessage();
  }

  function unHelp(){
    $(".helphand").addClass("fisthand");
    $(".helphand").removeClass("openhand");
    $(".helphand").animate({
      top: "800px",
      left: "300px"
    }, 200)
    dirMessage();
  }

  function getHint(){
    $(".hinthand").animate({
      top: "650px",
      left: "610px"
    }, 200, function(){
      $(".hinthand").addClass("openhand");
      $(".hinthand").removeClass("fisthand");
    })
    hintMessage();
  }

  function unHint(){
    $(".hinthand").addClass("fisthand");
    $(".hinthand").removeClass("openhand");
    $(".hinthand").animate({
      top: "800px",
      left: "550px"
    }, 200)
    dirMessage();
  }

  function helpMessage(){
    vm.message= vm.help;
  }

  function dirMessage(){
    vm.message= vm.directions;
  }

  function hintMessage(){
    vm.message= vm.hint;
  }

  function finish(steps) {

    var count=0;
    for(var i=0; i<vm.variableNames.length; i++){
      if(vm.api[vm.variableNames[i]].get() == vm.values[i]){
        count += 1;
      }
    }

    if (steps < vm.variableNames.length){
      //too few variables
      vm.message= "Uh oh. It looks like you didn't declare all your variables. Make sure that you declare all variables listed on the board, that their names are spelled correctly, and that there is a space between var and the variable name."
    } else if (steps == vm.variableNames.length && steps != count) {
      // enough vars, wrong vals
      vm.message= "OOPS! You have declared the correct number of variables, but it seems that the values (the words in quotation marks) are incorrect. Check that you have spelled everything correctly and that you have paired the correct values with the correct variables."
    } else if (count == vm.variableNames.length) {
      //right num, right vals
      vm.message= "THAT'S RIGHT! YOU DID IT!";
      vm.finished= true;
    }
    
    //define behavior for success and set finished to true when done
  }

}
















