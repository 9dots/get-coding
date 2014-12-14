var name = module.exports = 'playspsace-p5-grid';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceP5Grid', playspaceP5Grid);



function playspaceP5Grid() {
  var directive = {
    restirct: 'A',
    controller: playspaceCtrl,
    controllerAs: 'P5-grid',
    template: require('./index.html'),
    link: linkFunc
  };
  return directive;

  function linkFunc(scope, elem, attrs, ctrl) {
    var App = scope.App;
    var Playspace = ctrl;
    App.add(Playspace);

    scope.$on('$destroy', function() {
      delete window.setup;
      delete window.draw;
    })
  }
}

// Create your playspace in the controller below
function playspaceCtrl($element) {

  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;

  vm.fns = [];

  // initialize playspace
  function activate(level, speed) {
    vm.fns = [];
    setup();
  }

  vm.api.circle = function(x, y, w, h) {

    vm.fns.push(function() {
      noFill()
      strokeWeight(2)
      ellipse(x + w/2, y + h/2, w, h);
    });
  }

  vm.api.rectangle = function(x, y, w, h) {

    vm.fns.push(function() {
      noFill()
      strokeWeight(2)
      rect(x, y, w, h);
    });
  }

  vm.api.triangle = function(x, y, w, h) {

    vm.fns.push(function() {
      noFill()
      strokeWeight(2)
      triangle(x, y+h, w/2+x, y, w+x, h+y);
    });
  }
   

  // define api

  window.setup = function() {
      if (!window.createCanvas)
        return;
      var canvas = createCanvas(800, 800);
      canvas.parent('grid');
  }

  window.draw = function() {
    vm.fns.forEach(function(fn) {
      fn();
    });
  }

}