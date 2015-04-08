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
    vm.foreground = new charArea(fg);
    vm.background = new charArea(bg);
    vm.boat.init(boat);
  }

  function PICKUP(item){
    if (vm[vm.boat.position].hasCharacter(item) && vm.boat.characters.length < 2){ 
      item = findItem(item);
      vm[vm.boat.position].removeCharacter(item);
      vm.boat.addPassenger(item);
      checkForWin();
    }
    else if (vm.boat.characters.length >= 2)
      setError('The boat is already full', 'Make sure to drop off any cargo before trying to pick up more.')
    else 
      setError('Item not present', 'Try selecting a different item from the dropdown menu.')
   };

  function CROSSRIVER(){
    if(vm.boat.captain && !_.isEmpty(vm[vm.boat.position].get(vm.boat.captain)))
      getCaptain();
    if(!vm.boat.checkForCaptain() && !vm.boat.captain) {
      setError('The boat needs a captain!','There is nobody in the body that can drive it.')
    }
    else {
      if (!vm[vm.boat.position].checkRules());
        vm.boat.cross();
    }
  };

  function DROPOFF(){
    if(_.isEmpty(vm.boat.characters)){
      setError("Nothing to drop off.", "You had no item in your boat.")
    }
    else{
      _.each(vm.boat.characters, function(el) {
        vm[vm.boat.position].addCharacter(el);
      });
      if (!vm[vm.boat.position].checkRules()) {
        vm.boat.removePassengers();
        checkForWin();
      }
    }
  };


  function ERR() {
    return error;
  };

  function setError(main, sub){
   vm.failed = true;
    error = {
      toString: function(){
        return main
      },
      subMessage:sub
    }
  }

  function charArea(options) {
    this.characters = options;
    this.addCharacter = addCharacter;
    this.removeCharacter = removeCharacter;
    this.checkRules = checkRules;
    this.checkPrey = checkPrey;
    this.checkTypes = checkTypes;
    this.getCharacters = getCharacters;
    this.get = get;
    this.hasCharacter = hasCharacter;
  }

  function addCharacter(character) {
    this.characters.push(character);
  }

  function removeCharacter(character){
    this.characters = _.reject(this.characters, function(el){
      return _.isEqual(el, character);
    })
  }

  function get(character) {
    if(_.isArray(character)) {
      var list = [];
      var self = this;
      _.each(character, function(el){
        list.push(self.get(el));
      })
      return _.flatten(list);
    }
    else return _.filter(this.characters, function(el){
      return el.type === character;
    })
  }

  function checkPrey(predator, key){
    var prey = predator.rules[key];
    predator = predator.type;
    var dead = _.find(this.characters, function(el){
      return el.type === prey
    });
    if (dead) {
      lose('The ' + predator + ' ate the ' + prey + '!');
      return false;
    }
  }

  function checkTypes(character, key) {
    var self = this;
    var nemesis = character.rules[key];
    var num_heroes = this.get(character.type).length;
    var num_nemesis = this.get(nemesis).length;
    return [num_heroes,num_nemesis];
  }

  function getCharacters() {
    return _.map(this.characters, function(el){ return el.type });
  }

  function hasCharacter(character) {
    if(_.isString(character)) {
      return _.find(this.characters, function(el){
        return el.type === character;
      })
    }
    else if (_.isArray(character)) {
      var find;
      for (var i = 0; i < character.length; i++) {
        find = _.find(this.characters, function(el){
          return el.type === character[i];
        });
        if (find)
          return find;
      }
    }
    else
      return _.includes(this.characters, character);
  }

  function listCharacters (list) {
    if(_.isArray(list)) {
      return _.first(list);
    }
    else return list;
  }

  function checkRules() {
    var characters = this.characters;
    for (var i = 0; i < characters.length; i++) {
      var keys = _.keys(characters[i].rules)
      for (var j = 0; j < keys.length; j++) {
        console.log(keys);
        if (keys[j] === 'prey' && !this.hasCharacter(vm.boat.captain))
          if (this.checkPrey(characters[i], keys)) return true;
        else if (keys[j] === 'greaterThan') {
          var results = this.checkTypes(characters[i], keys);
          if(results[0] < results[1]) {
            lose('Too many ' + listCharacters(characters[i].rules[keys]) + "s on one side.");
            return false;
          }
        }
      }
    }
  }


  vm.boat = {
    init: function(boat){
      this.position = boat.position || 'foreground';
      this.captain = boat.forceCaptain;
      this.element = $('.middle');
      this.characters = [];
      this.getCharacters = getCharacters;
      this.hasCharacter = hasCharacter;
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
    },
    checkForCaptain: function() {
      return this.hasCharacter(vm.level.captains);
    }
  }


function getConditions() {
  var num = 0;
  _.each(vm.level.conditionLog, function(el){
    _.each(el, function(elem){
      var q = elem.quantity || 1
      num = (num+q);
    })
  })
  return num;
}

function getCaptain(){
  var captain = _.first(vm[vm.boat.position].get(vm.boat.captain));
  vm[vm.boat.position].removeCharacter(captain);
  vm.boat.addPassenger(captain);
}

function findItem(item) {
  return _.find(vm[vm.boat.position].characters, function(el){
    return el.type === item;
  });
}
    // define api

function checkForWin(){
  var log = vm.level.conditionLog
  var metConditions = 0;
  var rules = _.keys(log);
  _.each(rules, function(el, idx, obj){
    var rule = el;
    _.each(vm[el].getCharacters(), function(elem,idx,obj){
      var character = elem;
      _.each(log[rule], function(charType){
        if(character === charType.type)
          metConditions++;
      });
    });
  })
  if(metConditions === getConditions())
    vm.finished = true;
}


function lose(message){
  setError('You lose!', message);
};

};