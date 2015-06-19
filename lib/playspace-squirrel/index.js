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

  function right(){
    orient(0);
  };

  function left(){
    orient(180);
  };

  function up(){
    orient(270);
  };

  function down(){
    orient(90);
  };

  function move(){
    vm.squirrel.move();
  };

  function orient(newRot){

    var axis = vm.squirrel.axis;
    var newRot = newRot;

    console.log(vm.squirrel.facing);
    console.log(vm.squirrel.squareOn)

    if(onTree(vm.squirrel.squareOn)){
      vm.squirrel.facing = "onTree";
    }

    console.log(vm.squirrel.facing);

    var facing = vm.squirrel.facing;

    if (facing === "right"){
      changeRotation("right", "left", 180, axis, newRot)
    } else if (facing === "left"){
      changeRotation("left", "right", 0, axis, newRot)
    } else {
      //squirrel starts facing tree
      setPosition(facing, newRot);
    }
  };

  function changeRotation(facing, notFacing, switchRot, axis, newRot){
    if(axis !== "ver"){
      //on hor axis
       if(newRot === 90 || newRot === 270){
        //trying to switch to ver...
         if(onTree(vm.squirrel.squareOn)){
           setPosition("onTree", newRot)
         } else {
          if(newRot === 270){
            //check ahead
            if(treeAhead(vm.squirrel.ahead)) {
              setPosition(facing, newRot)
             } else {
               errorMessage("You can't go that way because there is nothing to climb on.")
             }
           } else {
            //check behind
             if(treeBehind(vm.squirrel.behind)) {
               setPosition(facing, newRot)
             } else {
               errorMessage("You can't go that way because there is nothing to climb on.")
             }
          }
        }
      } else {
        if(newRot === switchRot) facing = notFacing;
         setPosition(facing, newRot);
      }
    } else {
       //on ver axis
      if(newRot === 90 || newRot === 270){
        //going up or down...ok
        if(newRot === 90){
          setPosition(notFacing, newRot);
         } else {
           setPosition(facing, newRot);
        }
      } else {
        //can't go sideways
        errorMessage("Uh oh! You can't turn right or left when you're going up or down the side of the tree.")
      }
    }
  };

  function onTree(squareOn){
    var onTree = $("#" + squareOn).hasClass("tree") || $("#" + squareOn).hasClass("branch");
    return onTree;
  };

  function treeAhead(ahead){
    var treeAhead = $("#" + ahead).hasClass("tree");
    return treeAhead;
  };

   function treeBehind(behind){
    var treeBehind = $("#" + behind).hasClass("tree");
    return treeBehind;
  };

  function setPosition(facing, rotation){
    var axis;
    if(rotation === 0 || rotation === 180) axis = "hor";
    if(rotation === 90 || rotation === 270) axis = "ver";
    vm.squirrel.axis = axis;
    vm.squirrel.facing = facing;
    vm.squirrel.rotate(rotation);
    //add funcitonality to determine/record situational info
    recordPostion();
  };

  function recordPostion(){
    var facing = vm.squirrel.facing;
    var rotation = vm.squirrel.rotation;
    var axis = vm.squirrel.axis;
    var squareOn = Number(vm.squirrel.squareOn);
    var ahead = squareOn;
    var behind = squareOn;
    var check = squareOn;

    if (facing === "right" || facing === "left"){
      //facing right or left
      if (facing === "right") {
        //facing right
        if (rotation === 0){
          ahead +=1;
          behind -=1;
          check +=11;
        } else if (rotation === 90){
          ahead +=10;
          behind -=10;
          check -=11;
        } else {
          ahead -=10;
          behind +=10;
          check -=9;
        }
      } else {
        //facing left
        if (rotation === 90){
          ahead +=10;
          behind -=10;
          check +=11;
        } else if (rotation === 180){
          ahead -=1;
          behind +=1;
          check +=9;
        } else {
          ahead -=10;
          behind +=10;
          check -=11;
        }
      }
    } else {
      //facing tree
      if (rotation === 0){
        ahead +=1;
        behind -=1;
        check = ahead;
      } else if (rotation === 90){
        ahead +=10;
        behind -=10;
        check = ahead;
      } else if (rotation === 180){
        ahead -=1;
        behind +=1;
        check = ahead;
      } else {
        ahead -=10;
        behind +=10;
        check = ahead;
      }
    }
    //record ahead, behind
    if (ahead < 10) ahead = "0" + ahead;
    if (behind < 10) behind = "0" + behind;
    if (check < 10) check = "0" + check;

    vm.squirrel.ahead = "" + ahead;
    vm.squirrel.behind = "" + behind;

    //canMove based on check
    vm.squirrel.canMove = isEmpty(check);

  };

  function isEmpty(id){
    var empty = $("#" + id).hasClass("ground") || $("#" + id).hasClass("tree") || $("#" + id).hasClass("branch");
    return empty;
  }


  //more functions here

  vm.squirrel = {
    squareOn: "00",
    facing: "right",
    rotation: 0,
    el: $('.squirrel'),
    init: function(options) {
      this.el.css('left', getLeft(options.squareOn));
      this.el.css('top', getTop(options.squareOn));
      this.el.css("transform", "rotate(" + options.rotation + "deg)");
      this.rotation = options.rotation;
      this.facing = options.facing;
      this.axis = options.axis;
      this.squareOn = options.squareOn;
      this.ahead = options.ahead;
      this.behind = options.behind;
      this.canMove = options.canMove;

      //XXX check that start is valid, or set at 00
    }, 
    rotate: function(n) {
      this.el.css("transform", "rotate(" + n + "deg)");
      this.rotation = n;
      vm.step++;
    }, 
    move: function(){
      if(vm.squirrel.canMove){
        vm.moving = true;
        this.el.css("left", getLeft(vm.squirrel.ahead));
        this.el.css("top", getTop(vm.squirrel.ahead));
        vm.squirrel.squareOn = vm.squirrel.ahead;
        recordPostion();
        vm.step +=1;
      } else {
        errorMessage("You can't move there!")
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
      var width = this.grid[0].length * 90;
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
     var startCol= ((id % 10) * 90) + "px";
     return startCol;
  };

  function getTop(id){
    var id= Number(id);
    var startRow= (Math.floor(id/10) * 90) + "px";
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

