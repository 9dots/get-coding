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

  vm.frog = {
    position:"0",
    init: function(options, second){
      console.log(options);
      positon: options.position;
      this.render();
    },
    render: function() {

    }
    // jump: function(){

    // },
  }

  vm.field = {
    init: function(options){
      this.grid = [];
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
      }
      return array;
    },
    setFrogs: function(frogs) {
      var team_size = Math.floor(frogs / 2);
      for (var i = 0; i < team_size; i++) {
        var right_frog = vm.frog.init({position: team_size+i+1});
        var left_frog = vm.frog.init({position: i});
        this.leftTeam.push(left_frog);
        this.rightTeam.push(right_frog);
      }
      this.frogs = _.merge(this.leftTeam, this.rightTeam);
    }
  }
}