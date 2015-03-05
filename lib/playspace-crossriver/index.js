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
    if (level) 
      vm.level = level;
    var bg = _.clone(vm.level.stage.bg);
    var fg = _.clone(vm.level.stage.fg);
    var boat = _.clone(vm.level.stage.boat);
    vm.speed = speed;
    vm.failed = false;
    vm.finished = false;
    error = {};
    console.log(fg);
    vm.foreground = new charArea(fg);
    vm.background = new charArea(bg);
    vm.boat.init(boat);
  }

  function PICKUP(item){
    if (itemPresent(item) && vm.boat.characters.length < 2){
      item = _.find(vm[vm.boat.position].characters, function(el){
        return el.type === item;
      });
      vm[vm.boat.position].removeCharacter(item);
      vm.boat.addPassenger(item);
      checkForWin();
    }
    else if (vm.boat.characters.length >= 2) {
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
    if(_.isEmpty(vm.boat.characters)){
      error = {
        toString: function(){
          return "Nothing to drop off."
        },
        subMessage: "You had no item in your boat."
      }
    }
    else{
      _.each(vm.boat.characters, function(el) {
        vm[vm.boat.position].addCharacter(el);
      });
      vm.boat.removePassengers();
      checkForWin();
    }
  };


  function ERR() {
    return error;
  };

  function charArea(options) {
    this.characters = options;
    this.addCharacter = addCharacter;
    this.removeCharacter = removeCharacter;
    this.checkRules = checkRules;
    this.checkPrey = checkPrey;
    this.getCharacters = getCharacters;
  }

  function addCharacter(character) {
    this.characters.push(character);
  }

  function removeCharacter(character){
    this.characters = _.reject(this.characters, function(el){
      return _.isEqual(el, character);
    })
  }

  function checkPrey(prey){
    var dead = _.find(this.characters, function(el){
      return el.type === prey
    });
    if (dead)
      lose(dead.type);
  }

  function getCharacters() {
    return _.map(this.characters, function(el){ return el.type });
  }

  function checkRules() {
    var err;
    for (var i = 0; i < this.characters.length; i++) {
      var keys = _.keys(this.characters[i].rules)
      for (var j = 0; j < keys.length; j++) {
        if (keys[j] === 'prey')
          this.checkPrey(this.characters[i].rules[keys]);
      }
    }
  }


  vm.boat = {
    init: function(position){
      this.position = position || 'foreground';
      this.element = $('.middle');
      this.characters = [];
      this.getCharacters = getCharacters;
    },
    addPassenger: function(character) {
      this.characters.push(character);
    },
    removePassengers: function(){
      this.characters = [];
    },
    cross: function() {
      this.position = this.position === 'foreground' 
        ? 'background' 
        : 'foreground';
    }
  }


    // define api

function checkForWin(){
  var rules = _.keys(vm.level.stage.conditionLog);
  _.each(rules, function(el, idx, obj){
    var rule = el;
    _.each(vm[el].getCharacters(), function(elem,idx,obj){
      if(elem === vm.level.stage.conditionLog[rule].type)
        vm.finished = true;
    });
  })
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
  vm.failed = true;
  vm.finished = true;
  error = {
    toString: function() {
      return "You lost!";
    },
    subMessage: "Oh no! The " + killer + " ate the " + dead + "!"
  }
};

};