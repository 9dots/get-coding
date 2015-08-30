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
  vm.counting = false;
  vm.checking = false;
  vm.variables = {};
  vm.finish = finish;
  vm.run = run;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.level = level;
      vm.finished= false;
      vm.api = {};
      vm.view = level.board.view;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.showItems = level.board.showItems;
      vm.itemDisplay = [];
      vm.showValues = level.board.showValues;
      vm.view = level.board.view;
      vm.setVars = [];
      vm.background = level.board.background;
      vm.foreground = level.board.foreground;
      if (level.board.requiredCalls) vm.requiredCalls = level.board.requiredCalls;
      if (level.board.numberCalls) vm.numberCalls = level.board.numberCalls;
      if (level.board.setVars) vm.setVars = level.board.setVars;
      if (level.board.serVals) vm.setVals = level.board.setVals;
      if (level.board.place) vm.place = level.board.place;
      if (level.board.rule) vm.rule = level.board.rule;

      _.each(vm.variableNames, function(variable) {
        vm.api[variable] = {
          get: function() {
            console.log('get playspace')
            if (!vm.counting && vm.requiredCalls) {
              vm.requiredCalls[variable] +=1;
            }
            return vm.variables[variable];
          },
          set: function(val) {
            if (vm.setVars.indexOf(variable) != -1) {
              vm.failed = {
                toString: function(){
                  return "UNCHANGEABLE VARIABLE"
                }, 
                subMessage: "The variable " + variable + " already exists and has a value. You do not need to create it or change its value."
              }
            } else {
              vm.variables[variable] = val;
              if (variable === "x" && vm.view === "copyrule"){
                recordAnswer();
              }
            }
          }
        };
      })

   
    }

    setShowValues();

    //show the items to count, if necessary
    vm.itemDisplay= [];
    _.each(vm.showItems, function(item) {
      var ind = vm.showItems.indexOf(item);
      var num = vm.values[ind];
      for(var i=0; i<num; i++){
        vm.itemDisplay.push(vm.showItems[ind])
      }

      shuffle(vm.itemDisplay);
      
    });
  };

  function shuffle(array){
    for (var n = 0; n < array.length - 1; n++) {
      var k = n + Math.floor(Math.random() * (array.length - n));
      var temp = array[k];
      array[k] = array[n];
      array[n] = temp;
    };
  };

  function recordAnswer(){

    var expression = vm.rule;
    var x = vm.variables['x'];

    vm.values[3] = x;
    vm.values[4] = followRule(expression, x);
    vm.values[5] = followRule(expression, vm.values[4])

  }

  function followRule(expression, val){
    while (expression.indexOf('y') != -1){
      expression = expression.replace('y', val);
    }
    return eval(expression)
  }

  function setShowValues() {
    if (vm.view === 'varsandnums'){
      clearVars();
      initShowValues();
    } else {
      clearVars();
      initSetValues();
    }
  };

  function initShowValues() {
    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= vm.showValues[i];
    }
  };

  function initSetValues(){
    for(var j=0;j<vm.setVars.length;j++){
      var ind = vm.variableNames.indexOf(vm.setVars[j]);
      vm.variables[vm.setVars[j]] = vm.values[ind];
    }
  };

  function clearVars(){
    _.each(vm.variableNames, function(variable) {
      vm.variables[variable] = null;  
    });
  }

  function clearCalls(){
    _.each(vm.setVars, function (variable){
        vm.requiredCalls[variable] = 0;
        //for copy the rule, reset calls for x and y, which aren't in setVars...
    })
  }

  function run(){
    vm.failed = false;
    if (vm.requiredCalls) clearCalls();
    if (vm.setVars.length === 0) clearVars();

  }

  function finish(steps) {

    vm.checking = true;

    if(vm.requiredCalls){
      _.each(vm.requiredCalls, function(setVar, index){

        var req = vm.numberCalls[index];
        var made = vm.requiredCalls[index] / 2;

        if(req != 0){
          if(made === 0 && vm.checking){
            //did not call this var at all
            console.log("you didn't call all vars!")
            vm.checking = false;
          } 
        }
      })
    }

    var count = 0;

    if (!vm.answer){
      vm.counting = true;
      for (var i=0; i<vm.variableNames.length; i++){
        if(vm.api[vm.variableNames[i]].get() === vm.values[i]) {
          count +=1;
        }
      }
      vm.counting = false;
    }

    if (count === vm.variableNames.length && vm.checking){
      vm.finished = true;
    } else if (count !== vm.variableNames.length && vm.checking){

      var nulls= 0; 
      //you used variables but you don't have all vars declared  so...
      _.each(vm.variableNames, function(name, index){
        if (vm.variables[vm.variableNames[index]] === null && vm.checking) {
          console.log("you didn't declare the variable " + vm.variableNames[index])
          vm.checking = false;
        }
      })

      if(nulls === 0){
        console.log("wrong values!")
      }
    } 
  }
}


