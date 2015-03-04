/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-crossriver';

/**
 * Styles
 */
require('./index.css');

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
function playspaceCrossriverCtrl($element, $animate) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    dropOff: DROPOFF, 
    crossRiver: CROSSRIVER, 
    pickUp: PICKUP,
    err: ERR
  };
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    if(level) vm.level = level;
    vm.speed = speed;
    vm.finished = false;
    error = {};
    vm.foreground = new charArea(vm.level.stage.fg);
    vm.background = new charArea(vm.level.stage.bg);
    vm.boat.init();
  }

  function PICKUP(item){
    if (itemPresent(item) && vm.boat.passengers.length < 2){
      vm[vm.boat.position].removeCharacter(item);
      vm.boat.addPassenger(item);
    }
    else if (vm.boat.passengers.length >= 2) {
      error = {
        toString: function(){
          return 'The boat is already full';
        },
        subMessage:'Make sure to drop off any cargo before trying to pick up more'
      };
    } 
    else {
      error = {
        toString: function(){
          return 'Item not present';
        },
        subMessage:'Try selecting a different item from the dropdown menu'
      }
    }
   };


  function CROSSRIVER(){
    vm[vm.boat.position].checkRules();
    vm.boat.cross();
  };

  function DROPOFF(){
    if(_.isEmpty(vm.boat.passengers)){
      error = {
        toString: function(){
          return "Nothing to drop off."
        },
        subMessage: "You had no item in your boat."
      }
    }
    else{
      _.each(vm.boat.passengers, function(el) {
        vm[vm.boat.position].addCharacter(el);
      });
      vm.boat.removePassengers();
    }
    // checkForWin();
  };


  function ERR() {
    return error;
  };

  function charArea(options) {
    var characters = [];
    _.each(options, function(el, idx){
      characters[idx] = {
        type:el
      };  
    });
    this.characters = characters;
    this.addCharacter = addCharacter;
    this.removeCharacter = removeCharacter;
    this.checkRules = checkRules;
  }

  function addCharacter(character) {
    this.characters.push(character);
  }

  function removeCharacter(character){
    this.characters = _.reject(this.characters, function(el){
      return el.type === character;
    })
  }

  function checkRules() {
    console.log('checkRules');
  }


  vm.boat = {
    init: function(){
      this.position = 'foreground';
      this.element = $('.middle');
      this.passengers = [];
    },
    addPassenger: function(character) {
      this.passengers.push({type:character});
    },
    removePassengers: function(){
      this.passengers = [];
    },
    cross: function() {
      this.position = this.position === 'foreground' 
        ? 'background' 
        : 'foreground';
    }
  }


    // define api

function checkForWin(){
  var goodSoFar;
  if(_.isArray(vm.level.stage.conditionLog)){
    for(i = 0 ; i < vm.level.stage.conditionLog.length; i++){
      goodSoFar = compareLogs(vm.level.stage.conditionLog[i]);
      if(goodSoFar === true) break;
    }
  }
  else{
    goodSoFar = compareLogs(vm.level.stage.conditionLog);
  }
  if(goodSoFar === false) return;
  else{
    $(".message").html("Nice Job!");
    $(".message").show();
    vm.finished = true;
  }
}

function compareLogs(conditionLog){
  var good = true;
  _.each(conditionLog, function(value, k1) {
    _.each(value, function(v2, k2) {
      if (log[k1][k2] !== v2) good = false;
    })
  })
  return good;
}

function itemPresent(item){
  return _.find(vm[vm.boat.position].characters, function(el){
    return el.type === item;
  })
};

function lose(dead, place, killer){
  error = {
    toString: function() {
      return "You lost!";
    },
    subMessage: "Oh no! The " + killer + " ate the " + dead + "!"
  }
};

};