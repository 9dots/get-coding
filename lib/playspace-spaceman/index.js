/**
 * Modules
 */
require('lib/angular')
var _ = require('lodash')
var $ = require('jquery')
var autoYield = require('auto-yield')

/**
 * Exports
 */
var name = module.exports = 'playspace-spaceman'

/**
 * Styles
 */
require('./index.css')

angular.module(name, [])
.directive('playspaceSpaceman', function () {
  return {
    restirct: 'A',
    controller: playspaceSpacemanCtrl,
    controllerAs: 'Spaceman',
    template: require('./index.html'),
    link: function (scope, elem, attrs, ctrl) {
      var App = scope.App
      var Playspace = ctrl
      App.add(Playspace)
    }
  }
})

function playspaceSpacemanCtrl ($element, $timeout) {
  var vm = this
  vm.moving = false
  var error = {}

  // playspace interface
  vm.activate = activate
  vm.api = {
    getPart: getPart,
    move: move,
    rotate: rotate,
    moreParts: moreParts,
    pathRight: pathRight,
    pathLeft: pathLeft,
    pathAhead: pathAhead,
    onPart: onPart,
    notOnPart: notOnPart,
    loop: loop,
    err: err
  }
  vm.finished = false
  vm.failed = false

  function activate (level, speed) {
    if (level) {
      vm.level = level
    }

    vm.finished = false
    vm.failed = false
    vm.speed = speed
    vm.field.init(vm.level.field)
    vm.astronaut.init(vm.level.astro)
    error = {}
  }

  function getPart () {
    vm.astronaut.get()
  }

  function move (n) {
    vm.astronaut.move()
  }

  function rotate (n) {
    vm.astronaut.rotate()
  }

  function loop (n, fn) {
    if (typeof (n) === 'function') {
      n = fnString(n)
      return `for (var i = 0; i < 100; i++) { ${n} }`
    } else {
      fn = fnString(fn)
      return `for (var i = 0; i < ${n}; i++) { ${fn} }`
    }
  }

  function fnString (fn) {
    return fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1]
  }

  function onPart () {
    return vm.field.isPart(vm.astronaut.position)
  }

  function pathRight () {
    var rotation = vm.astronaut.rotation
    var positionRight = Number(vm.astronaut.position)
    if (rotation === 0) {
      positionRight += 10
    } else if (rotation === -90) {
      positionRight += 1
    } else if (rotation === -180) {
      positionRight -= 10
    } else {
      positionRight -= 1
    }
    if (positionRight.toString().length === 1 || Number(positionRight) < 0) {
      positionRight = '0' + positionRight
    }
    return vm.field.isOnBoard(positionRight) ? !vm.field.isBlocked(positionRight) : false
  }

  function pathLeft () {
    var rotation = vm.astronaut.rotation
    var positionLeft = Number(vm.astronaut.position)
    if (rotation === 0) {
      positionLeft -= 10
    } else if (rotation === -90) {
      positionLeft -= 1
    } else if (rotation === -180) {
      positionLeft += 10
    } else {
      positionLeft += 1
    }
    if (positionLeft.toString().length === 1 || Number(positionLeft) < 0) {
      positionLeft = '0' + positionLeft
    }
    return vm.field.isOnBoard(positionLeft) ? !vm.field.isBlocked(positionLeft) : false
  }

  function pathAhead () {
    var rotation = vm.astronaut.rotation
    var positionAhead = Number(vm.astronaut.position)
    if (rotation === 0) {
      positionAhead += 1
    } else if (rotation === -90) {
      positionAhead -= 10
    } else if (rotation === -180) {
      positionAhead -= 1
    } else {
      positionAhead += 10
    }
    if (positionAhead.toString().length === 1 || Number(positionAhead) < 0) {
      positionAhead = '0' + positionAhead
    }
    return vm.field.isOnBoard(positionAhead) ? !vm.field.isBlocked(positionAhead) : false
  }

  function moreParts () {
    return !vm.field.allPickedUp()
  }

  function notOnPart () {
    return !vm.field.isPart(vm.astronaut.position)
  }

  function err () {
    return error
  }

  function lose (message) {
    vm.failed = {
      toString: function () {
        return 'You lost!'
      },
      subMessage: message
    }
  }

  vm.astronaut = {
    position: "00",
    rotation: 0,
    el: $('.astronaut'),
    init: function(options) {
      this.el.css('left', getLeft(options.position))
      this.el.css('top', getTop(options.position))
      this.el.css("transform", "rotate(" + options.rotation + "deg)")
      this.position = options.position
      this.rotation = options.rotation

      //XXX check that start is valid, or set at 00
    },
    rotate: function() {
      var start = this.rotation
      var angle = start - 90
      this.el.animateRotate(start, angle, vm.speed, "easeOutQuad")
      this.rotation = angle
      if(angle == -360)
        this.rotation= 0
      vm.step++
    },
    move: function() {
      var astroDivs = this.el
      var position = Number(this.position)
      var rotation = this.rotation
      if(rotation == 0){
        position += 1
      } else if (rotation == -90){
        position -= 10
      } else if (rotation == -180){
        //add a check for column 0
        position -= 1
      } else {
        position += 10
      }

      if(position < 0 || position % 10 == 9 || position >= vm.field.grid.length * 10 || position % 10 == vm.field.numRows()){
        //if you are on the edge of the board trying to go off
        lose("You can't go that way!")
      } else {
        //if you are in board, check for blockages
        position= "" + position
        if (position.length == 1 || Number(position) < 0) position= "0" + position

        if(!vm.field.isBlocked(position)){
          vm.moving = true
          $timeout(function(){
            vm.moving = false
            //can we temporarily change astronaut to thrusting class?
            astroDivs.animate({
              left: getLeft(position),
              top: getTop(position)
            }, vm.speed * .8, "easeOutExpo")
          }, vm.speed * .2)

          this.position= position
          vm.step +=1
        } else {
          vm.moving = true
          $timeout(function(){
            vm.moving = false
          }, vm.speed * .2)
          lose("You can't go that way. It's blocked!")
        }
      }
    },
    get: function (){
      var square = this.position
      if(vm.field.isPart(square)){
        vm.field.setEmpty(square)
        //here we need to remove the part and maybe add a gotPart astronaut class breifly
        if(vm.field.allPickedUp()){
          win()
        }
        vm.step +=1
      } else {
        lose("There is no satellite part on this square.")
      }
    }
  }



  vm.field = {
    init: function(options) {
      this.grid = []
      this.byId = {}
      this.pickedUp = 0
      this.toPickUp = options.parts.length

      this.createGrid(options.rows, options.cols)
      this.setWidth()
      this.setBlocks(options.blocked)
      this.setParts(options.parts)
    },
    createGrid: function(rows, cols) {
      //ensure the grid is not more than 7x9
      if (rows > 8)
        rows = 8
      if (cols > 10)
        cols = 10

      //add rows and columns to vm
      for(i = 0; i < rows;  i++){
        var array=[]
        for(j = 0;  j < cols;  j++){
          var square = {id: '' + i + j, type: 'empty'}
          array.push(square)
          this.byId[square.id] = square
        }
        this.grid.push(array)
      }

    },
    setWidth: function(){
      var width = this.grid[0].length * 90
      $(".row").css("width", width + "px")
      $(".grid-holder").css("width", width + "px")
      $(".background").css("width", width + 2 + "px")
    },
    setBlocks: function(blocked) {
      var self = this
      _.each(blocked, function(block) {
        if(block[1]  === '*') {
          // add whole row
          _.times(self.numRows(), function(i) {
            var id = block[0] + i
            self.setBlocked(id)
          })
        } else if (block[0] === '*') {
          // add whole column
          _.times(self.numCols(), function(i) {
            var id = '' + i + block[1]
            self.setBlocked(id)
          })
        } else {
          self.setBlocked(block)
        }
      })
    },
    setParts: function(parts) {
      var self = this

      _.each(parts, function(part) {
        if (self.byId[part].type !== 'empty') {
          lose("You can't put a part on square " + part + " because is it blocked.")
        } else {
          self.setPart(part)
          self.byId[part].type = 'part'
        }
      })
    },
    numRows: function() {
      return this.grid[0].length
    },
    numCols: function() {
      return this.grid.length
    },
    isBlocked: function(pos) {
      return this.byId[pos].type === 'blocked'
    },
    isPart: function(pos) {
      return this.byId[pos].type === 'part'
    },
    isEmpty: function(pos) {
      return this.byId[pos].type === 'empty'
    },
    isOnBoard: function(pos) {
      return _.has(this.byId, pos)
    },
    setBlocked: function(pos) {
      this.byId[pos].type = 'blocked'
      this.byId[pos].option = this.randomAsteroidType(pos)
    },
    setPart: function(pos) {
      this.byId[pos].type = 'part'
      this.byId[pos].option = 'solar-panel'
    },
    setEmpty: function(pos) {
      this.byId[pos].type = 'empty'
      this.byId[pos].option = ''
      this.pickedUp++
    },
    randomAsteroidType: _.memoize(function(pos) {
      return _.shuffle(['asteroid-1', 'asteroid-2', 'asteroid-3', 'asteroid-4'])[0]
    }),
    allPickedUp: function() {
      return this.pickedUp === this.toPickUp
    }
  }

  function win(){
    vm.finished = true
    celebrate()
  }

  function celebrate(){
    var speed = 100
    var rotate = vm.astronaut.rotate.bind(vm.astronaut)
    setTimeout(rotate, speed)
    setTimeout(rotate, speed * 2)
    setTimeout(rotate, speed * 3)
    setTimeout(rotate, speed * 4)
  }



  function getLeft(id){
     var id= Number(id)
     var startCol= ((id % 10) * 90) + "px"
     return startCol
  }

  function getTop(id){
    var id= Number(id)
    var startRow= (Math.floor(id/10) * 90) + "px"
    return startRow
  }

  $.fn.animateRotate = function(start, angle, duration, easing, complete) {
      var args = $.speed(duration, easing, complete)
      var step = args.step
      return this.each(function(i, e) {
          args.step = function(now) {
              $.style(e, 'transform', 'rotate(' + now + 'deg)')
              if (step) return step.apply(this, arguments)
          }

          $({deg: start}).animate({deg: angle}, args)
      })
  }

}
