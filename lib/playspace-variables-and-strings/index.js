/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-variables-and-strings';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceVariablesAndStrings', playspaceVariablesAndStrings);

function playspaceVariablesAndStrings() {
  var directive = {
    restirct: 'A',
    controller: playspaceVariablesAndStringsCtrl,
    controllerAs: 'VariablesAndStrings',
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
function playspaceVariablesAndStringsCtrl($element) {
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
      vm.level = level;
      vm.finished= false;
      vm.api = {};
      vm.activity = level.activity;
      if (level.board.choices) vm.choices = level.board.choices;
      if(level.board.sentences) vm.sentences = level.board.sentences;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values;
      vm.showItems = level.board.showItems;
      vm.itemDisplay = [];
      vm.showValues = level.board.showValues;
      vm.setVars = [];
      if (level.board.requiredCalls) vm.requiredCalls = level.board.requiredCalls;
      if (level.board.numberCalls) vm.numberCalls = level.board.numberCalls;
      if (level.board.setVars) vm.setVars = level.board.setVars;
      if (level.board.serVals) vm.setVals = level.board.setVals;
      if (level.board.rule) vm.rule = level.board.rule;
      if (level.board.words) vm.words = level.board.words;

      var varArray = vm.variableNames;
      if (vm.words) varArray = vm.choices.concat(varArray);

      _.each(varArray, function(variable) {

        vm.api[variable] = {
          get: function() {
            if (!vm.counting && vm.numberCalls) {
              vm.numberCalls[variable] +=1;
            }
            return vm.variables[variable];
          },
          set: function(val) {
            if(vm.firstVar === true){
              clearVars();
              vm.firstVar = false;
            }
            //this assumes all values will be strings
            vm.variables[variable] = val;
            vm.declared[vm.variableNames.indexOf(variable)] = true;

            //if sentences, it inserts value into sentence string

            if(vm.sentences){
              var ind = vm.variableNames.indexOf(variable);
              var sentence = vm.duplicateSentences[ind];
              vm.duplicateSentences[ind] = sentence.replace(variable, val);;
            }

            //add rule to let this happen if the value is the same as it
            if (vm.setVars.indexOf(variable) != -1) {
              if (vm.api[variable].get() != val){
                vm.failed = {
                toString: function(){
                return "UNCHANGEABLE VARIABLE"
                },
                subMessage: "The variable " + variable + " already exists and has a value. You do not need to create it or change its value."
                }
              }
            }
          }
        };
      })
    }

    vm.failed = false;
    vm.finished = false;
    vm.firstVar = true;
    setShowValues();
    duplicateSentences();
    vm.declared = [];
    _.each(vm.variableNames, function(){
      vm.declared.push(false);
    })
  }

  // after activate

  function duplicateSentences(){
    vm.duplicateSentences = [];
    _.each(vm.sentences, function(sentence, key){
      vm.duplicateSentences.push(sentence.slice(0, sentence.indexOf("_____")) + " " + vm.variableNames[key]);
    })
  }

  function setShowValues() {
    clearVars();
    initShowValues();
  };

  function initShowValues() {
    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= vm.showValues[i];
    }
    if (vm.words) {
      for(var i=0; i< vm.choices.length; i++){
        vm.variables[vm.choices[i]]= vm.words[i];
      }
    }
  };

  function clearVars(){
    _.each(vm.variableNames, function(variable) {
      vm.variables[variable] = null;
    });
  }

function clearCalls(){
    _.each(vm.numberCalls, function(variable, index){
        vm.numberCalls[index] = 0;
        //for copy the rule, reset calls for x and y, which aren't in setVars...
    })
  }

  function run(){
    vm.failed = false;
    if (vm.numberCalls) clearCalls();
    clearVars();
  }

  function finish(){
    //if needed, will run after code finishes

    vm.checking = true;

    if(vm.requiredCalls){
        _.each(vm.requiredCalls, function(setVar, index){

          console.log(vm.numberCalls[index])//made

          if(vm.numberCalls[index] < setVar){
            //you have not called the var enough times
            vm.failed = {
              toString: function(){
                return "MISSING VARIABLE CALL"
              },
              subMessage: "You have not called all the variables you need to call in this level."
            }
            vm.checking = false;
          }
        })
      }

      var count = 0;

      if (!vm.answer){

        vm.counting = true;

        var offset = 0; //for skipping * values when checking...what index to start checking at
        for(var m=0; m<vm.values.length; m++){
          if(vm.values[m] === "*"){
            offset ++;
          }
        }

        if(vm.words){
          //check this way for strings2
          var temp = vm.values.slice();
          _.each(vm.variableNames, function(variable){
            var ind = temp.indexOf(vm.variables[variable]);
            if(ind != -1){
              count+=1;
              temp.splice(ind, 1);
            }
          })

        } else {
          //actually check variables vals against vals array
          for (var i=0; i<vm.variableNames.length; i++){
            if(vm.variables[vm.variableNames[i + offset]] === vm.values[i + offset]) {
              count +=1;
            }
          }
        }
        vm.counting = false;
      }

      if (count === vm.variableNames.length && vm.checking){
        vm.finished = true;
      } else if (count !== vm.variableNames.length && vm.checking){

      var nulls = 0;

      if(nulls === 0){
        vm.failed = {
          toString: function(){
          return "WRONG VALUES"
        },
          subMessage: "Your variables do not have the correct string values."
        }
      }
    }
  }
}
