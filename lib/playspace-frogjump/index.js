/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspace-frogjump';

/**
 * Styles
 */
require('./index.css');


angular.module(name, [])
.directive('playspaceFrogjump', function() {
  return {
    restirct: 'A',
    controller: playspaceFrogjumpCtrl,
    controllerAs: 'Frogjump',
    template: require('./index.html'),
    link: function(scope, elem, attrs, ctrl) {
      var App = scope.App;
      var Playspace = ctrl;
      App.add(Playspace);
    }
  }
});

function playspaceFrogjumpCtrl($element, $timeout) {
  var vm = this;
  vm.moving = false;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    jump:jump,
    err:err
  };
  vm.finished = false;
  vm.failed = false;

  function activate(level) {
    if(level)
      vm.level = level;
    error = {};
    vm.field.init(vm.level);
    vm.finished = false;
    vm.failed = false;
  }

  function err() {
    return error;
  }

  function jump(n) {
    if(vm.field.frogs[n])
      vm.field.frogs[n].jump();
    else {
      vm.failed = true;
      error = {
        toString: function(){
          return "That frog doesn't exist!"
        },
        subMessage: "Check the paramters of your jump() function"
      }
    }
  }

  function Frog(options) {
    this.rotation = options.rotation;
    this.position = options.position;
    this.id = options.id;
    this.destination = options.destination;
    this.jump = frogJump;
    this.render = render;
    this.checkWin = checkWin;
  }

  function frogJump() {
    var position = this.position;
    var nextStone;
    var next2Stone;

    var pos = getNextPos(position, this.rotation);

    if (pos[0] >= vm.field.grid.length || pos[0] < 0) {
      vm.failed = true;
      error = {
        toString: function(){
          return 'No rock that way!'
        },
        subMessage: "That frog can't move further without falling the rocks!"
      }
    }
    else if(vm.field.isEmpty(pos[0])) 
      this.render(pos[0]);
    else if(vm.field.isEmpty(pos[1]))
      this.render(pos[1]);
    else {
      vm.failed = true;
      error = {
        toString: function(){
          return "That frog can't jump anymore!"
        },
        subMessage: "No open space"
      }
    }
    this.checkWin();
  }

  function render(nextPos) {
    vm.field.byId[nextPos].type = "frog";
    vm.field.byId[nextPos].direction = this.rotation;
    vm.field.byId[this.position].type = "empty";
    this.position = nextPos;
  }

  function checkWin() {
    if(this.destination === this.position)
      vm.field.completed.push(this);
    if(vm.field.completed.length === _.size(vm.field.frogs)){
      vm.finished = true;
    }
  }

  function getNextPos(pos, rot){
    var nextPos = [];
    if(rot === "right") {
      nextPos[0] = pos + 1;
      nextPos[1] = pos + 2;
    }
    if(rot === "left") {
      nextPos[0] = pos - 1;
      nextPos[1] = pos - 2;
    }
    return nextPos;
  }

  vm.field = {
    init: function(options){
      this.grid = this.completed = [];
      this.byId = {};
      this.frogs = {};
      this.grid = this.createGrid(options.stage.stones);
      this.setFrogs(options.stage.frogs);
    },
    createGrid: function(stones){
      stones = stones || 7;
      var array= [];
      for (var i = 0; i < stones; i++) {
        var square = {id: '' + i, type: 'empty'};
        array.push(square);
        this.byId[square.id] = square;
      }
      return array;
    },
    setFrogs: function(frogs) {
      var stones = Math.floor(this.grid.length / 2);
      var stonesLength = this.grid.length - stones;
      var teamSize = Math.floor(frogs/2);
      var that = this;

      if(teamSize === 0)
        this.frogs[0] = new Frog(
          {
            position: stones-(1), 
            id: stones-(1), 
            rotation:'right', 
            destination:stones-(1) + stonesLength
          }
        );

      for (var i = 0; i < teamSize; i++) {
        this.frogs[teamSize+i] = new Frog(
          {
            position: stones+(i+1), 
            id:teamSize+i, 
            rotation:'left', 
            destination:i
          }
        );
        this.frogs[teamSize-(i+1)] = new Frog(
          {
            position: stones-(i+1), 
            id: teamSize-(i+1), 
            rotation:'right', 
            destination:stones-(i+1) + stonesLength
          }
        );
      }

      _.each(this.frogs, function(el,idx){
        var position = el.position;
        that.byId[position].type = "frog";
        that.byId[position].direction = el.rotation;
      });
    },
    byPos: function(pos) {
      return _.find(this.frogs, function(el){
        return el.position === pos;
      })
    },
    isEmpty: function(pos) {
      return this.byId[pos].type === "empty" ? true : false;
    }
  }
}