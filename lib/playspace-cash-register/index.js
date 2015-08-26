/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-cash-register';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceCashRegister', playspaceCashRegister);

function playspaceCashRegister() {
  var directive = {
    restirct: 'A',
    controller: playspaceCashRegisterCtrl,
    controllerAs: 'CashRegister',
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
function playspaceCashRegisterCtrl($element) {
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

    if(level){
      vm.finished= false;
      vm.variableNames = level.board.variables;
      vm.initValues = level.board.initValues; 
      vm.prices = level.board.prices;
      vm.items = level.board.items;
      vm.basketItems=[];

      _.each(vm.variableNames, function(variable) {
        vm.api[variable] = {
          get: function() {
            return vm.variables[variable];
          },
          set: function(val) {
            if(variable === "total"){
              //price change
              var change = val - vm.variables[variable];
              //index of item based on price change
              var ind= vm.prices.indexOf(Math.abs(change));

              var array = {
                "item": vm.items[ind], 
                "price": change
              }
              vm.basketItems.push(array)

              vm.variables[variable] = val;

              console.log(vm.basketItems)
            } else {
              vm.variables[variable] = Number(val * 100);
            }
          }
        };
      })

      setInitValues();
      console.log(vm.api["apple"])

    }
    
  }

  function setInitValues(){
    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= vm.initValues[i];
    }
    console.log(vm.variables)
  }

  function run(){
    setInitValues();
    vm.basketItems=[];
  }

  function finish(){

  }

  // define api

}