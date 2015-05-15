/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-squirrel';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceSquirrel', playspaceSquirrel);

function playspaceSquirrel() {
  var directive = {
    restirct: 'A',
    controller: playspaceSquirrelCtrl,
    controllerAs: 'Squirrel',
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
function playspaceSquirrelCtrl($element, $timeout, $mdBottomSheet) {
  var vm = this;
  vm.moving = false;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    right: right,
    left: left, 
    up: up, 
    down: down, 
    move: move
  };
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.level = level;
    }

    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    vm.field.init(vm.level.field);
    vm.squirrel.init(vm.level.squirrel);

  };

  function left(){
    vm.squirrel.facing = "left";
    vm.squirrel.rotate(0);
    vm.squirrel.rotation = 0;
  };

  function right(){
    vm.squirrel.facing = "right";
    vm.squirrel.rotate(0);
    vm.squirrel.rotation = 0;
  };

  function up(){
    if(vm.squirrel.facing === "right"){
      vm.squirrel.rotate(-90);
      vm.squirrel.rotation = -90;
    } else {
      vm.squirrel.rotate(90);
      vm.squirrel.rotation = 90;
    }
  };

  function down(){
    if(vm.squirrel.facing === "right"){
      vm.squirrel.rotate(-270);
      vm.squirrel.rotation = -270;
    } else {
      vm.squirrel.rotate(270);
      vm.squirrel.rotation = 270;
    }
  };

  function move() {
    vm.squirrel.move();
  }; 

  function isEmpty(id) {
    var target = $("#" + target).hasClass("empty");
    return target;
  }

  vm.squirrel = {
    position: "00",
    facing: "right",
    rotation: 0,
    el: $('.squirrel'),
    init: function(options) {
      this.el.css('left', getLeft(options.position));
      this.el.css('top', getTop(options.position));
      this.el.css("transform", "rotate(" + options.rotation + "deg)");
      this.position = options.position;
      this.rotation = options.rotation;
      this.facing = options.facing;

      //XXX check that start is valid, or set at 00
    },
    rotate: function(n) {
      this.el.css("transform", "rotate(" + n + "deg)");
      this.rotation = n;
      vm.step++;
    }, 
    move: function() {
      var squirrelDiv = this.el;
      var position = Number(this.position);
      var rotation = this.rotation;
      var facing = this.facing;
      //one for facing left, one for facing right
      var start = Number($("#" + position).attr('id'));
      var target = start;
      var newSquare = start;

      if(facing === "right") {
        if(rotation === 0){
          target += 11;
          newSquare += 1;
        } else if (rotation === -90){
          target -= 9;
          newSquare -= 10;
        } else if (rotation === -180){
          target -= 11;
          newSquare -= 1;
        } else {
          target += 9;
          newSquare += 10;
        }
      } else {
        if(rotation === 0){
          target += 9;
          newSquare -= 1;
        } else if (rotation === -90){
          target += 11;
          newSquare += 10;
        } else if (rotation === -180){
          target -= 9;
          newSquare += 1;
        } else {
          target -= 11;
          newSquare -= 10 ;
        }
      }
      //in each track, check that there is ground to stand on


      if(!isEmpty(target) && $("#" + newSquare).length){
        console.log(isEmpty(target))
        vm.moving = true;
          $timeout(function(){
            vm.moving = false;
            //can we temporarily change astronaut to thrusting class?
            squirrelDiv.animate({
              left: getLeft(newSquare),
              top: getTop(newSquare)
            }, vm.speed * .8, "easeOutExpo");
          }, vm.speed * .2)
          this.position= newSquare;
          vm.step +=1;
      } else if (isEmpty(target)) {
        vm.failed = true;
        errorMessage("You can't go that way because there is nothing to stand on.")
      } else {
        vm.failed = true;
        errorMessage("You can't go that way because it's off the board.")
      }
      
    }
  };

  vm.field = {
    init: function(options) {
      this.grid = [];
      this.byId = {};
      this.pickedUp = 0;
      this.toPickUp = options.acorns.length;
      this.createGrid(options.rows, options.cols);
      this.setWidth();
      this.setBlock(options.ground, "ground");
      this.setBlock(options.tree, "tree");
      this.setBlock(options.branch, "branch");
      this.setObjects(options.acorns, "acorn");
    },
    createGrid: function(rows, cols) {
      //ensure the grid is not more than 8x8
      if (rows > 9)
        rows = 9;
      if (cols > 9)
        cols = 9;

      //add rows and columns to vm
      for(i = 0; i < rows; i++){
        var array=[];
        for(j = 0; j < cols; j++){
          var square = {id: '' + i + j, type: 'empty'};
          array.push(square);
          this.byId[square.id] = square;
        }
        this.grid.push(array);
      }

    },
    setWidth: function(){
      var width = this.grid[0].length * 100;
      $(".row").css("width", width + "px");
      $(".grid-holder").css("width", width + "px");
      $(".background").css("width", width + 2 + "px");
    },
    setBlock: function(ground, kind) {
      var self = this;
      _.each(ground, function(block) {
        if(block[1]  === '*') {
          // add whole row
          _.times(self.numRows(), function(i) {
            var id = block[0] + i;
            self.setBlocked(id, kind);
          });
        } else if (block[0] === '*') {
          // add whole column
          _.times(self.numCols(), function(i) {
            var id = '' + i + block[1];
            self.setBlocked(id, kind);
          });
        } else {
          self.setBlocked(block, kind);
        }
      });
    }, 
    setObjects: function(object, kind) {
      var self = this;

      _.each(object, function(part) {
        if (self.byId[part].type !== 'empty') {
          //lose("You can't put a part on square " + part + " because is it blocked.")
        } else {
          self.setObject(part, kind);
          self.byId[part].type = kind;
        }
      });
    },
    numRows: function() {
      return this.grid[0].length;
    },
    numCols: function() {
      return this.grid.length;
    },
    setBlocked: function(pos, kind) {
      this.byId[pos].type = kind;
    },
    setObject: function(pos, kind) {
      this.byId[pos].type = kind;
    }
  };

  function getLeft(id){
     var id= Number(id);
     var startCol= ((id % 10) * 100) + "px";
     return startCol;
  };

  function getTop(id){
    var id= Number(id);
    var startRow= (Math.floor(id/10) * 100) + "px";
    return startRow;
  };

  function errorMessage(message){
    var message= "<md-bottom-sheet class='playspace-magic-words'>" + message + "</md-bottom-sheet>";
    $mdBottomSheet.show({
        template: message
      })
  };
  
  $.fn.animateRotate = function(start, angle, duration, easing, complete) {
      var args = $.speed(duration, easing, complete);
      var step = args.step;
      return this.each(function(i, e) {
          args.step = function(now) {
              $.style(e, 'transform', 'rotate(' + now + 'deg)');
              if (step) return step.apply(this, arguments);
          };

          $({deg: start}).animate({deg: angle}, args);
      });
  };

}