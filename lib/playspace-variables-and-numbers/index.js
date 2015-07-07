/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-variables-and-numbers';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceVariablesAndNumbers', playspaceVariablesAndNumbers);

function playspaceVariablesAndNumbers() {
  var directive = {
    restirct: 'A',
    controller: playspaceVariablesAndNumbersCtrl,
    controllerAs: 'VariablesAndNumbers',
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
function playspaceVariablesAndNumbersCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};
  vm.finish = finish;
  vm.run = run;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.finished= false;
      vm.view = level.board.view;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.showItems = level.board.showItems;
      vm.itemDisplay = [];
      vm.showValues = level.board.showValues;
      vm.setVars = level.board.setVars;
      vm.setVals = level.board.setVals;
      vm.view = level.board.view;
      if (level.board.operation) vm.operation = level.board.operation;
      if (level.board.place) vm.place = level.board.place;

      _.each(vm.variableNames, function(variable) {
        vm.api[variable] = {
          get: function() {
            return vm.variables[variable];
          },
          set: function(val) {
            if (vm.setVars.indexOf(variable) != -1) {
              console.log("failed! Can't change!")
            } else if (vm.answer){
              if (val === vm.answer){ 
                vm.variables[variable] = val;
                vm.finished = true;
              } else {
                vm.variables[variable] = val * 2;
                vm.failed = {
                  toString: function(){
                    return "Incorrect value assignment"
                  }, 
                  subMessage: "That's the not correct value for the variable."
                }
              }
            } else {
              vm.variables[variable] = val;
            }
          }
        };
      })
    }

    if (vm.setVars.length) recordAnswer();

    setShowValues();

    _.each(vm.showItems, function(item) {
      var ind = vm.showItems.indexOf(item);
      var num = vm.values[ind];
      var array = [];
      for(var i=0; i<num; i++){
        array.push(vm.showItems[ind])
      }
      vm.itemDisplay.push(array)
    });

  };

  function recordAnswer(){
    var ind = vm.showValues.indexOf(null);
    vm.answer = vm.values[ind] * 2;
  }

  function setShowValues() {
    if (vm.view === 'level1'){
      clearVars();
      initValuesOpen();
    } else {
      clearVars();
      initValuesRestrict(vm.operation);
    }
  };

  function initValuesOpen() {
    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= vm.showValues[i];
    }
  };

  function initValuesRestrict(operation){
    if (operation === 'addition'){
      for(var j=0;j<vm.setVars.length;j++){
        var ind = vm.variableNames.indexOf(vm.setVars[j]);
        vm.variables[vm.setVars[j]] = vm.values[ind] * 2;
      }
    } else if (operation === 'multiplication'){
      var ind = vm.variableNames.indexOf(vm.setVars[0]);
      vm.variables[vm.setVars[0]] = vm.values[ind] * 2;
      ind = vm.variableNames.indexOf(vm.setVars[1]);
      vm.variables[vm.setVars[1]] = vm.values[ind];
    }
  };

  function clearVars(){
    _.each(vm.variableNames, function(variable) {
      vm.variables[variable] = null;  
    });
  }

  function run(){
    vm.failed = false;
    setShowValues();
  }

  function finish(steps) {

    var count = 0;
    if (!vm.answer){
      for (var i=0; i<vm.variableNames.length; i++){
        if(vm.api[vm.variableNames[i]].get() === vm.values[i]) {
          count +=1;
        }
      }
    }

    if (count === vm.variableNames.length){
      vm.finished = true;
    }
  }
}


