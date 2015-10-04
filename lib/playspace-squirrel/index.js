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
    move: move, 
    getAcorn: getAcorn
  };
  vm.finish = finish;
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.level = level;
    }
    error = {};
    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    if (vm.level.powers) vm.powers = vm.level.powers;
    vm.field.init(vm.level.field);
    vm.squirrel.init(vm.level.squirrel);
    $(".squirrel").show();
  };

  function err() {
    return error;
  }

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

  function move(num){
    $(".squirrel").show();
    vm.field.hideAcorns(vm.squirrel.acorns);
    var number = num;
    if (!num) number = 1;
    if (vm.powers && vm.powers.moveNumber) {
      for(var i = 0; i<number; i++) {
        setTimeout(function(){
          vm.squirrel.move();
        }, vm.speed /number * i)
      }
    } else {
      vm.squirrel.move();    
    }
  };

  function getAcorn(){
    vm.field.hideAcorns(vm.squirrel.acorns);
    vm.squirrel.get();
  }

  function orient(newRot){

    $(".squirrel").show();
    vm.field.hideAcorns(vm.squirrel.acorns);

    var axis = vm.squirrel.axis;
    var newRot = newRot;

    if(onTree(vm.squirrel.squareOn)){
      vm.squirrel.facing = "onTree";
    }

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
            if (isTree(vm.squirrel.ahead)){
              setPosition(facing, newRot)
            } else if (isTree(vm.squirrel.behind)) {
              setPosition(notFacing, newRot)
            } else {
              vm.failed = {
                toString: function(){
                  return "CAN'T CALL up() HERE"
                }, 
                subMessage: "The squirrel can only face up if there is a tree ahead or behind it."
              }
            }
          } else if (newRot == 90) {
            if (isTree(vm.squirrel.behind)){
              setPosition(facing, newRot)
            } else if (isTree(vm.squirrel.ahead)) {
              setPosition(notFacing, newRot)
            } else {
              vm.failed = {
                toString: function(){
                  return "CAN'T CALL down() HERE"
                }, 
                subMessage: "The squirrel can only face down if there is a tree ahead or behind it."
              }
            }
          }
        }
      } else {
        if(newRot === switchRot) facing = notFacing;
         setPosition(facing, newRot);
      }
    } else {
       //on ver axis
      if(newRot === 270){
        //going up or down...ok
        if(vm.squirrel.rotation !== newRot){
          setPosition(notFacing, newRot);
        }
      } else if (newRot === 90) {
       if(vm.squirrel.rotation !== newRot){
        setPosition(notFacing, newRot)
       }
        
      } else {
        //trying to switch to hor while on tree
        if(isNotEmpty(Number(vm.squirrel.squareOn) + 10)) {
          if (newRot === 0){
            //going right
            setPosition("right", 0)
          } else if (newRot === 180){
            //going left
            setPosition("left", 180)
          }

        } else {
          vm.failed = {
            toString: function(){
              return "CAN'T CALL THAT FUNCTION HERE"
            }, 
            subMessage: "You can't turn right or left without a branch to stand on."
          }
        }
      }
    }
  };

  function onTree(squareOn){
    var onTree = $("#" + squareOn).hasClass("tree") ;
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

  function setFacing(){
    if(vm.squirrel.facing === "onTree" && !isTree(vm.squirrel.ahead)){
      var rot = vm.squirrel.rotation;
      if(rot === 0){
        //moving to the right
        if(!isGround(vm.squirrel.check) && !isBranch(vm.squirrel.check)) {
          //make him vertical left and right
          vm.squirrel.facing = "right";
          vm.squirrel.rotation = 90;
          vm.squirrel.axis = "ver";
        } else if (isGround(vm.squirrel.check) || isBranch(vm.squirrel.check)) {
          //make him horizontal left and right
          vm.squirrel.facing = "right";
          vm.squirrel.rotation = 0;
          vm.squirrel.axis = "hor";
        }
      } else if (rot === 180) {
        //moving to the left
        if(!isGround(vm.squirrel.check) && !isBranch(vm.squirrel.check)) {
          //make him vertical left and right
          vm.squirrel.facing = "left";
          vm.squirrel.rotation = 90;
          vm.squirrel.axis = "ver";
        } else if (isGround(vm.squirrel.check) || isBranch(vm.squirrel.check)) {
          //make him horizontal left and right
          vm.squirrel.facing = "left";
          vm.squirrel.rotation = 180;
          vm.squirrel.axis = "hor";
        }
      } 
    } 
  };

  function setPosition(facing, rotation){
    var axis;
    if(rotation === 0 || rotation === 180) axis = "hor";
    if(rotation === 90 || rotation === 270) axis = "ver";
    vm.squirrel.axis = axis;

    if(isTree(vm.squirrel.squareOn)) {
      vm.squirrel.facing = "onTree"
    } else {
      vm.squirrel.facing = facing;
    }

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
          check +=9;
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
        check +=11;
      } else if (rotation === 90){
        ahead +=10;
        behind -=10;
        check +=10;
      } else if (rotation === 180){
        ahead -=1;
        behind +=1;
        check +=9;
      } else {
        ahead -=10;
        behind +=10;
        check -=10;
      }
    }

    if (check < 0) check = Math.abs(check)
    //record ahead, behind
    if (ahead < 10) ahead = "0" + ahead;
    if (behind < 10) behind = "0" + behind;
    if (check < 10) check = "0" + check;

    vm.squirrel.ahead = "" + ahead;
    vm.squirrel.behind = "" + behind;
    vm.squirrel.check = "" + check; 

    //canMove based on check

    if (facing === "onTree") {
      if (vm.squirrel.axis === 'ver'){
        vm.squirrel.canMove = isTree(ahead);
      } else {
        //axis is horizontal
        vm.squirrel.canMove = true;
      }
    } else {
      vm.squirrel.canMove = isNotEmpty(check) && !isGround(ahead);
    }

  };

  function isNotEmpty(id){
    var empty = $("#" + id).hasClass("ground") || $("#" + id).hasClass("tree") || $("#" + id).hasClass("branch");
    return empty;
  };

  function isNotBlocked(id){
    var empty = $("#" + id).hasClass("ground") 
  }

  function isTree(id){
    var tree = $("#" + id).hasClass("tree");
    return tree;
  };

  function isGround(id){
    var ground = $('#' + id).hasClass("ground");
    return ground;
  };

  function isBranch(id){
    var branch = $('#' + id).hasClass("branch");
    return branch;
  }


  //more functions here

  vm.squirrel = {
    squareOn: "00",
    facing: "right",
    rotation: 0,
    hidden: false,
    acorns: [],
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
        setFacing();
        if (vm.powers && vm.powers.moveNumber){
          //manually reset class
          setClass(vm.squirrel.facing)
        }
        this.el.css("left", getLeft(vm.squirrel.ahead));
        this.el.css("top", getTop(vm.squirrel.ahead));
        vm.squirrel.squareOn = vm.squirrel.ahead;
        setPosition(vm.squirrel.facing, vm.squirrel.rotation);
        if (vm.powers && vm.powers.moveNumber){
          //manually reset class
          setClass(vm.squirrel.facing)
        }
        vm.step +=1;
      } else {
        vm.failed = {
          toString: function(){
             return "CAN'T USE move() HERE"
          }, 
          subMessage: "The square ahead is either ground or off the screen."
        }
      }
    }, 
    get: function(){
      var square = vm.squirrel.squareOn;
      if (vm.field.isAcorn(vm.squirrel.squareOn)){
        vm.field.setEmpty(square);
        if (vm.field.allPickedUp()) {
          //win
          win();
        }
        vm.step +=1;
      } else {
        //error there is no part here
        vm.failed = {
          toString: function(){
             return "There is no acorn here."
          }, 
          subMessage: "The square you are on does not contain an acorn."
        }
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
      this.backgroundImg = vm.level.background;
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
    }, 
    isAcorn: function(id) {
      return this.byId[id].type === "acorn"
    }, 
    setEmpty: function(id){
      $(".squirrel").hide();
      this.byId[id].type = 'getAcornRight';
      vm.squirrel.acorns.push(id);
      this.byId[id].option = '';
      this.pickedUp++;

    }, 
    allPickedUp: function() {
      return this.pickedUp === this.toPickUp;
    }, 
    hideAcorns: function(acorns) {
      _.each(acorns, function(acorn){
        $("#" + acorn).removeClass("getAcornRight");
        $(".squirrel").show();
      })
    }
  };

  function setClass(newClass){
    var classes= ["right", "left", "onTree"];
    var index = classes.indexOf(newClass);
    classes.splice(index, 1);
    _.each(classes, function(newClass){
      $(".squirrel").removeClass(newClass);
    });
    $(".squirrel").addClass(newClass);
  }

  function win(){
    vm.finished = true;
  }

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

  function finish (steps){
    setTimeout(function(){
      vm.field.hideAcorns(vm.squirrel.acorns);
      $(".squirrel").show();
    }, 400)
  }
}

