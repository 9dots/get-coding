/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-incrementor';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceIncrementor', playspaceIncrementor);

function playspaceIncrementor() {
  var directive = {
    restirct: 'A',
    controller: playspaceIncrementorCtrl,
    controllerAs: 'Incrementor',
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
function playspaceIncrementorCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};

  // initialize playspace
  function activate(level, speed) {

    vm.finished= false;
    vm.failed = false;
    vm.speed = speed;

    if (level) {
      vm.level = level;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.showItems = level.board.showItems;
      vm.showValues = level.board.showValues;
      vm.initValues = level.board.initValues;
    }

    vm.api = {
      setButton: setButton
    };

    vm.itemDisplay = [];
    vm.setVars = [];
    vm.buttonFns = [];
    vm.buttonsSet = 0;
    vm.allSet = false;

    _.each(vm.variableNames, function(variable) {
      vm.api[variable] = {
        get: function() {
          return vm.variables[variable];
        },
        set: function(val) {
          if(window.buttonPressed === true || val === vm.initValues[vm.variableNames.indexOf(variable)]){
            vm.variables[variable] = val;
            $("#" + variable).html(val);
          } else {
            //send error that you either can't set value other than 0 in codespace
            var message = "INCORRECT VARIABLE VALUE";
            var subMessage = "You may only set the variable to a value of " + vm.variableNames.indexOf(variable) + ", then change its value with buttons.";
            vm.failed = {
              toString: function(){
                return message
              }, 
            subMessage: subMessage
            }
          }
        }
      };      
    })

    initValues();

    if (vm.level.powers) {
      vm.powers = vm.level.powers;
      if (vm.level.powers.buttons) vm.buttons = vm.level.powers.buttons;
      //this will blank the labels on the buttons
      _.each(vm.buttons, function(button){
        vm.buttonFns.push(button.name)
        button.set = false;
      })
      setTimeout(function(){
        //timeout to ensure that angular has populated info
        clearButtons(vm.buttons.length);
      }, 100)
    }

    function initValues() {
      for(var i=0; i< vm.variableNames.length; i++){
        vm.variables[vm.variableNames[i]]= vm.initValues[i];
        $("#" + vm.variableNames[i]).html(vm.showValues[i])
      }
    };

  }//end of activate



  function setButton(num, fn){
    //add an error if they are declaring a function that is not included among buttons for level

    var nameLength = vm.buttons[num - 1].fnName.length;
    var fnString = fn.toString();
    var attemptName = fnString.slice(9, fnString.indexOf("(") + 2);

    if(attemptName === vm.buttons[num - 1].fnName + "()") {

      var button = document.getElementById("button" + num);
      button.onclick = wrapFn(fn, true);
      vm.buttons[num-1].set = true;
      $("#label" + num).html(vm.buttons[num - 1].label)
      vm.buttonsSet ++;

      //check if all buttons are set, 
      if(vm.buttonsSet === vm.buttons.length){
        vm.allSet = true;
        //put up sign
      }

    } else {
      if(vm.buttonFns.indexOf(attemptName) === -1){
        //this is not a function you can use in this level
        var message = attemptName + " IS MISSPELLED";
        var subMessage = "Check the directions for the proper spelling of this function."
        vm.failed = {
          toString: function(){
            return message
          }, 
          subMessage: subMessage
        }
      } else {
        var message = "BUTTON " + num + " IS THE WRONG BUTTON";
        var subMessage = attemptName + " does not go on button " + num + ".";
        vm.failed = {
          toString: function(){
            return message
          }, 
          subMessage: subMessage
        }
      }
    }
  };

  function clearButtons(num){
    for(var i=0; i<num; i++){
      var ind= i + 1;
      var button = document.getElementById("button" + ind);
      button.onclick = null;
    }
  }

  function wrapFn(fn){
    
    return function(){
      vm.failed = false;
      window.buttonPressed = true;
      var args = _.toArray(arguments);
      fn.apply(null, args);
      window.buttonPressed = false;
    }
  }

  // define api

}