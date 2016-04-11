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

function playspaceFrogjumpCtrl($element, $timeout, $mdBottomSheet) {
  var vm = this;
  vm.moving = false;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    jump:jump,
    err:err, 
    setButton: setButton
  };
  vm.finish = finish;
  vm.finished = false;
  vm.failed = false;



  function activate(level, speed) {

    if (level) {
      vm.level = level;
    }
    error = {};
    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    vm.buttonFns = [];
    vm.field.init(_.cloneDeep(vm.level));

    if (vm.level.powers) {
      vm.powers = vm.level.powers;
      if (vm.level.powers.buttons) vm.buttons = vm.level.powers.buttons;
      //this will blank the labels on the buttons
      _.each(vm.buttons, function(button){
        vm.buttonFns.push(button.name + "Button()")
        button.set = false;
      })
      setTimeout(function(){
        //timeout to ensure that angular has populated info
        if (vm.buttons) clearButtons(vm.buttons.length);
      }, 100)

    }
  }

  function wrapFn(fn){
    
    return function(){
      vm.failed = false;
      window.buttonPressed = true;
      var args = _.toArray(arguments);
      fn.apply(null, args);
      window.buttonPressed = false;
      finish();
    }
  }

  function setButton(num, fn){
    //add an error if they are declaring a function that is not included among buttons for level

    var nameLength = vm.buttons[num].fnName.length;
    var fnString = fn.toString();
    var contents = cleanString(fnString);
    var attemptName = fnString.slice(9, fnString.indexOf("(") + 2);

    if(attemptName === vm.buttons[num].fnName + "()") {

      if(vm.buttons[num].contents === contents){
        var button = document.getElementById("button" + num);
        button.onclick = wrapFn(fn, true);
        vm.buttons[num].set = true;
      } else {
        //add content validation failure error
        var message = "CONTENTS OF FUNCTION";
        var subMessage = "Ignoring spaces, you wrote \`" + contents + "\` but it should be \`" + vm.buttons[num].contents + "\`."
        buttonError(message, subMessage);
      }

    } else {
      if(vm.buttonFns.indexOf(attemptName) === -1){
        //this is not a function you can use in this level
        var message = attemptName + " IS MISSPELLED";
        var subMessage = "Check the directions for the proper spelling of this function."
        vm.failed = {
          toString: function(){
            return message
          }, 
          subMessage: subMessage
        }
      } else {
        var message = "BUTTON " + num + " IS THE WRONG BUTTON";
        var subMessage = attemptName + " does not go on button " + num + ".";
        vm.failed = {
          toString: function(){
            return message
          }, 
          subMessage: subMessage
        }
      }
    }
  }

  function cleanString(string){
    var start = string.indexOf("{");
    var end = string.indexOf("}");
    var contents = string.slice(start, start + end);
    contents = contents.replace(/\s+/g, '');
    return contents
  }

  function err() {
    return error;
  }

  function jump(n) {
    //wrap this in a check for errors.
    if(vm.buttons && window.buttonPressed != true){
      var button = vm.buttons.indexOf()
      var message = "CAN'T JUMP FROM HERE!";
      var subMessage = "You are either trying to jump onto a full space or there is no space to jump.";
      buttonError(message, subMessage)
    } else {
      if(vm.failed === false) {
        if(vm.field.frogs[n]) {
          vm.field.frogs[n].jump();
        }
        else {
          vm.failed = {
            toString: function(){
              return "That frog doesn't exist!"
            },
            subMessage: "Check the paramters of your jump() function"
          }
        }
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
  }

  function frogJump() {

    var position = this.position;
    var nextStone;
    var next2Stone;

    var pos = getNextPos(position, this.rotation);
    if (pos[0] >= vm.field.grid.length || pos[0] < 0) {
      var message = 'No lilypad that way!';
      var subMessage = "That frog can't move further without falling off the lilypads!";
      buttonError(message, subMessage);

    } else if(vm.field.isEmpty(pos[0])) {
      this.render(pos[0]);
    } else if (pos[1] >= vm.field.grid.length || pos[1] < 0) {

      var message = 'No lilypad that way!';
      var subMessage = "That frog can't jump the frog without falling off the lilypads!";
      buttonError(message, subMessage);

    } else if(vm.field.isEmpty(pos[1])) {
      this.render(pos[1]);
    } else {

      var message = "That frog can't jump anymore!";
      var subMessage = "No open space";
      buttonError(message, subMessage);

    }
  }

  function render(nextPos) {
    vm.field.byId[nextPos].type = "frog";
    $("#frog" + nextPos).removeClass("empty");
    $("#frog" + nextPos).show()
    $("#frog" + this.position).hide();
    $("#frog" + this.position).removeClass(this.rotation);
    $("#number" + nextPos).html($("#number" + this.position).html())
    vm.field.byId[nextPos].direction = this.rotation;
    $("#frog" + nextPos).addClass(this.rotation)
    vm.field.byId[this.position].type = "empty";
    this.position = nextPos;
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

  function clearButtons(num){
    for(var i=0; i<num; i++){
      var button = document.getElementById("button" + i);
      button.onclick = null;
    }
  }

  function finish(steps){
    console.log("finishing");
    var count = 0;
    _.each(vm.field.frogs, function(el, idx){

      if (el.destination.indexOf(el.position) != -1){
        count +=1;
      }

      console.log(count)
      console.log(vm.field.frogs.length)

      if (count === vm.field.frogs.length){
        console.log('done!')
        //this is messing up the check on non-button levels
        if (vm.buttons) clearButtons(vm.buttons.length);
        vm.finished = true;
      
      }
    })
  }

  function buttonError(message, subMessage){
    vm.failed = true;
    $mdBottomSheet.show({
      template: require('lib/code-app/error-message.html'),
      locals: {
        error: {
          message: message,
          subMessage: subMessage
        }
      },
      controller: function($scope, error) {
        $scope.error = error;
      }
    });
  }

  vm.field = {
    init: function(options){
      this.grid = this.completed = [];
      this.byId = {};
      this.frogs = options.frogs;
      this.grid = this.createGrid(options.stones);
      //this.setFrogs(options.stage.frogs);
      this.directFrogs();
    },
    createGrid: function(stones){
      stones = stones || 7;
      var array= [];
      for (var i = 0; i < stones; i++) {
        var square = {id: '' + i, type: 'empty'};
        array.push(square);
        this.byId[square.id] = square;
      }

      _.each(this.frogs, function(frog){
        _.each(frog.destination, function(stone, index){
          array[stone].option = frog.rotation;
        })
      })


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
    directFrogs: function(){
      _.each(this.frogs, function(el,idx){
        var position = el.position;
        vm.field.byId[position].type = "frog";
        vm.field.byId[position].direction = el.rotation;
      });
      for(var i=0; i<this.frogs.length; i++){
        this.frogs[i].jump = frogJump;
        this.frogs[i].render = render;
      }
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