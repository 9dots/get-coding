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
  };
  vm.finished = false;
  vm.failed = false;

  function activate(level) {
    if(level)
      vm.level = level;
    vm.field.init(vm.level);
  }

  function Frog(options) {
    this.rotation = options.rotation;
    this.position = options.position;
    this.id = options.id;
    this.team = options.team;
    this.jump = jump;
  }

  function jump() {
    console.log('jump');
  }

  vm.field = {
    init: function(options){
      this.grid = [];
      this.byId = {};
      this.leftTeam = this.rightTeam = this.frogs = [];
      this.grid = this.createGrid(options.stones);
      this.setFrogs(options.frogs);
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
      var team_size = Math.floor(frogs / 2);
      var that = this;
      for (var i = 0; i < team_size; i++) {
        this.frogs.push(new Frog({team:"right", position: team_size+i+1, id:team_size+i, rotation:'left'}));
        this.frogs.push(new Frog({team: "left", position: i, id: i, rotation:'right'}));
      }
      _.each(this.frogs, function(el,idx){
        var position = el.position;
        that.byId[position].type="frog";
        that.byId[position].direction = el.rotation;
      })
    },

  }
}