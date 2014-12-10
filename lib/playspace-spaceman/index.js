var name = module.exports = 'playspsace-spaceman';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceSpaceman', function() {
  return {
    restirct: 'A',
    controller: playspaceSpacemanCtrl,
    controllerAs: 'Spaceman',
    template: require('./index.html'),
    link: function(scope, elem, attrs, ctrl) {
      var App = scope.App;
      var Playspace = ctrl;
      App.add(Playspace);
    }
  }
});

function playspaceSpacemanCtrl($element, $timeout) {
  var vm = this;
  vm.moving = false;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    getPart: getPart,
    move: move,
    rotate: rotate
  };
  vm.finished = false;
  vm.failed = false;

  function activate(level, speed) {
    if (level) {
      vm.level = level;
    }
    
    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    vm.field.init(vm.level.field);
    vm.astronaut.init(vm.level.astro);
  }

  function getPart() {
    vm.astronaut.get();
  }

  function move() {
    vm.astronaut.move();
  }

  function rotate() {
    vm.astronaut.rotate();
  }

  vm.astronaut = {
    position: "00",
    rotation: 0,
    el: $('.astronaut'),
    init: function(options) {
      this.el.css('left', getLeft(options.position));
      this.el.css('top', getTop(options.position));
      this.el.css("transform", "rotate(" + options.rotation + "deg)");
      this.position = options.position;
      this.rotation = options.rotation;

      //XXX check that start is valid, or set at 00
    },
    rotate: function() {
      var start = this.rotation;
      var angle = start - 90;
      this.el.animateRotate(start, angle, vm.speed, "easeOutQuad");
      this.rotation = angle;
      if(angle == -360) 
        this.rotation= 0;
      vm.step++;
    },
    move: function() {

      var astroDivs = this.el;
      var position = Number(this.position);
      var rotation = this.rotation;
      if(rotation == 0){
        position += 1;
      } else if (rotation == -90){
        position -= 10;
      } else if (rotation == -180){
        //add a check for column 0
        position -= 1;
      } else {
        position += 10;
      }
      
      if(position < 0 || position % 10 == 9 || position >= vm.field.grid.length * 10 || position % 10 == vm.field.numRows()){
        //if you are on the edge of the board trying to go off
        alert("You can't go that way!");
        vm.failed = true;
      } else {
        //if you are in board, check for blockages
        position= "" + position;
        if (position.length == 1 || Number(position) < 0) position= "0" + position;
        
        if(!vm.field.isBlocked(position)){
          vm.moving = true;
          $timeout(function(){
            vm.moving = false;
            //can we temporarily change astronaut to thrusting class?
            astroDivs.animate({
              left: getLeft(position),
              top: getTop(position)
            }, vm.speed * .8, "easeOutExpo");
          }, vm.speed * .2)

          this.position= position;
          vm.step +=1;
        } else {
          vm.moving = true;
          $timeout(function(){
            vm.moving = false;
          }, vm.speed * .2)
          alert("You can't go that way. It's blocked!");
          vm.failed = true;
        }
      }
    }, 
    get: function (){
      var square = this.position;
      if(vm.field.isPart(square)){
        vm.field.setEmpty(square);
        //here we need to remove the part and maybe add a gotPart astronaut class breifly
        if(vm.field.allPickedUp()){
          win();
        }
        vm.step +=1;
      } else {
        alert("There is no satellite part on this square.");
      }
    } 
  };

  

  vm.field = {
    init: function(options) {
      this.grid = [];
      this.byId = {};
      this.pickedUp = 0;
      this.toPickUp = options.parts.length;

      this.createGrid(options.rows, options.cols);
      this.setWidth();
      this.setBlocks(options.blocked);
      this.setParts(options.parts)
    },
    createGrid: function(rows, cols) {
      //ensure the grid is not more than 7x9
      if (rows > 8) 
        rows = 8;
      if (cols > 10) 
        cols = 10;

      //add rows and columns to vm
      for(i = 0; i < rows; i++){
        var array=[];
        for(j = 0; j < cols; j++){
          var square = {id: '' + i + j, type: 'empty'}
          array.push(square);
          this.byId[square.id] = square;
        }
        this.grid.push(array);
      }
      
    },    
    setWidth: function(){
      var width = this.grid[0].length * 102;
      $(".row").css("width", width + "px");
      $(".grid-holder").css("width", width + "px");
      $(".background").css("width", width + 2 + "px");
    },
    setBlocks: function(blocked) {
      var self = this;
      _.each(blocked, function(block) {
        if(block[1]  === '*') {
          // add whole row
          _.times(self.numRows(), function(i) {
            var id = block[0] + i;
            self.setBlocked(id);
          });
        } else if (block[0] === '*') {
          // add whole column
          _.times(self.numCols(), function(i) {
            var id = '' + i + block[1];
            self.setBlocked(id);
          });
        } else {
          self.setBlocked(block);
        }
      });
    },
    setParts: function(parts) {
      var self = this;
      
      _.each(parts, function(part) {
        if (self.byId[part].type !== 'empty') {
          alert("You can't put a part on square " + part + " because is it blocked.")
        } else {
          self.setPart(part);
          self.byId[part].type = 'part';
        }
      });
    },
    numRows: function() {
      return this.grid[0].length;
    },
    numCols: function() {
      return this.grid.length;
    },
    isBlocked: function(pos) {
      return this.byId[pos].type === 'blocked';
    },
    isPart: function(pos) {
      return this.byId[pos].type === 'part';
    },
    isEmpty: function() {
      return this.byId[pos].type === 'empty';
    },
    setBlocked: function(pos) {
      this.byId[pos].type = 'blocked';
      this.byId[pos].option = this.randomAsteroidType(pos);
    },
    setPart: function(pos) {
      this.byId[pos].type = 'part';
      this.byId[pos].option = 'solar-panel';
    },
    setEmpty: function(pos) {
      this.byId[pos].type = 'empty';
      this.byId[pos].option = '';
      this.pickedUp++;
    },
    randomAsteroidType: _.memoize(function(pos) {
      return _.shuffle(['asteroid-1', 'asteroid-2', 'asteroid-3', 'asteroid-4'])[0];
    }),
    allPickedUp: function() {
      return this.pickedUp === this.toPickUp;
    }
  };

  function win(){
    //can we delay this until after celebrate is finished?
    
    celebrate()
    $timeout(function() {
      vm.finished = true;
    }, vm.speed);

  }

  function celebrate(){
    var speed = 100;
    var times = 0;
    var interval = setInterval(function() {
      vm.astronaut.rotate();
      times++;
      if (times >= 4) {
        clearInterval(interval);
      }
    }, speed);
  }



  function getLeft(id){
     var id= Number(id);
     var startCol= ((id % 10) * 102) + "px";
     return startCol;
  }

  function getTop(id){
    var id= Number(id);
    var startRow= (Math.floor(id/10) * 102) + "px";
    return startRow;
  }

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