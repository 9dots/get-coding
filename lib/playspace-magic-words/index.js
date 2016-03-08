/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-magic-words';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceMagicWords', playspaceMagicWords);

function playspaceMagicWords() {
  var directive = {
    restirct: 'A',
    controller: playspaceMagicWordsCtrl,
    controllerAs: 'MagicWords',
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
function playspaceMagicWordsCtrl($element, $timeout, $mdBottomSheet) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    foo: foo, 
    boo: boo, 
    goo: goo, 
    loo: loo, 
    moo: moo, 
    koo: koo, 
    doo: doo, 
    cast: cast,
    setButton: setButton
  };
  vm.finishTimeout = 2500;
  vm.finish = finish;
  vm.failed = false;
  var lastLevel = null;

  // initialize playspace
  function activate(level, speed) {

    if (level) {
      vm.level = level;
    }

    vm.obstacles = _.cloneDeep(vm.level.obstacles);
    vm.bubble= [];
    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    vm.buttonFns = [];
    lastLevel = level;

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

    //reset wizard and bubble
    $(".wizard").css("left", "60px");
    $(".wizard").css("background-position", "0px");
    $(".bubble").show();

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

  function clearButtons(num){
    for(var i=0; i<num; i++){
      var button = document.getElementById("button" + i);
      button.onclick = null;
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

  // define api
  function foo(){
    openGate("foo");
    vm.bubble.push("foo!")
  };

  function boo(){
    openGate("boo");
    vm.bubble.push("boo!")
  };

  function goo(){
    openGate("goo");
    vm.bubble.push("goo!")
  };

  function loo(){
    openGate("loo");
    vm.bubble.push("loo!")
  };

  function moo(){
    openGate("moo");
    vm.bubble.push("moo!")
  };

  function koo(){
    openGate("koo");
    vm.bubble.push("koo!")
  };

  function doo(){
    openGate("doo");
    vm.bubble.push("doo!")
  };

  function scoot(num){

    var time= 300;
    for(var i=0; i<num; i++){
      setTimeout(function(){
        $(".wizard").css("background-position", "-=120");
      }, time)
      time += 100;
      if (i === num - 1) {
        time += 100;
        setTimeout(function(){
          $(".bubble").hide()
          roll();
        }, time)
      }
    }
  }

  function roll(){
    $(".wizard").animate({
      left: "800px"
    }, 2000, 'easeInOutQuad')
  }

  function cast(spell){
    vm.bubble.push(spell + "!");

    for(var i=0; i<vm.obstacles.length; i++){
      if(vm.obstacles[i].position === "down"){
        if(vm.obstacles[i].type === "obstacle"){
            var obstLeft = $("#item" + i).css("left");
            obstLeft = obstLeft.slice(0, obstLeft.length - 2);
            if(vm.obstacles[i].words[0] === 'ice'){
              if(spell === 'fire'){
                castSpell(spell, Number(obstLeft), i, false);
              } else if (spell === 'ice') {
                castSpell(spell, Number(obstLeft), i, true);

                var message= "Wrong spell!";
                var subMessage= "You can't use ice on ice!";
                buttonError(message, subMessage)

              } else {
                // not a spell
                var message= spell + " is undefined";
                var subMessage= "You can only cast 'ice' or 'fire'.";
                buttonError(message, subMessage)
              }
              break
            } else if (vm.obstacles[i].words[0] === 'fire'){
              if(spell === 'ice'){
                castSpell(spell, Number(obstLeft), i, false);
              } else if (spell === 'fire') {
                castSpell(spell, Number(obstLeft), i, true);

                var message= "Wrong spell!";
                var subMessage= "You can't use fire on fire!";
                buttonError(message, subMessage)
              } else {
                // not a spell

                var message= spell + " is undefined";
                var subMessage= "You can only cast 'fire' or 'ice'.";
                buttonError(message, subMessage)
              }
              break
            } 
        } else {
          var obstLeft = $("#item" + i).css("left");
          obstLeft = obstLeft.slice(0, obstLeft.length - 2);
          castSpell(spell, Number(obstLeft), i, true);

          var message= "Spell blocked by gate!";
          var subMessage= "You need to open all gates in front of a obstacle before you can destroy it.";
          buttonError(message, subMessage)
          break
        }
      }
    }
    //checkGates();
  }

  function castSpell(spell, left, obstacle, gates){
    $(".spell").addClass(spell + "Spell");
    var newLeft = (left + 210) + "px";
    var obstacleId = "#item" + obstacle;
    var factor = vm.speed / 10;
    var spellSpeed = left / 70 * factor + 30;
    magicWand(factor);
    if(gates === false){
      vm.obstacles[obstacle].position = "up";
    }
    
    $(".spell").animate({
      left: newLeft
    }, spellSpeed, 'easeInQuad',function(){
      //spell resets
      $(".spell").removeClass(spell + "Spell");
      $(".spell").css("left", "150px");

      if (gates === false) {
        if(spell === "ice"){
          //fire wipes up 
          $(obstacleId).animate({
            height: 0
          }, 500, 'easeOutQuart');
        } else {
          //ice melts down
          $(obstacleId).animate({
            'background-position-y': '400'
          }, 500, 'easeOutQuart')
        }
      }
    })
  };


  function magicWand(speed){
    $(".wizard").css("background-position", "-=120");
    setTimeout(function(){
      $(".wizard").css("background-position", "0");
    }, speed)
  };

  function openGate(word){
    var gateClass = "." + word;
    var gateLabel = "." + word + "label";

    //highlight words
    $(gateLabel).css("color", "rgb(239, 98, 68)");

    //toggle gates
    toggleGates(word);

    //unhighlight
    setTimeout(function(){
      $(gateLabel).css("color", "rgb(72, 197, 76)");
    }, vm.speed);

    //put in error if they call a gate that doesn't exist.

    //check for win
    //checkGates(); 
  }

  function toggleGates(gate){
    for(var i = 0; i < vm.obstacles.length; i++){
      if(vm.obstacles[i].words.indexOf(gate) != -1){
        toggleGate(i);
        animateGate(i);
      }
    }
  }

  function toggleGate(i) {
    if(vm.obstacles[i].position === "up") {
      vm.obstacles[i].position = "down";
    } else {
      vm.obstacles[i].position = "up";
    }
  }

  function animateGate(i) {
    var top = vm.obstacles[i].position === 'up' ? -136 : -24;
    $('#item' + i).animate({top: top}, vm.speed * .8, "easeOutExpo");
  }

  function checkGates(){
    var closed = 0;
    for(var j = 0; j < vm.obstacles.length; j++){
      if(vm.obstacles[j].position === "down") {
        closed++;
      }
    }
    if(closed == 0){  
      vm.finished = true;
      scoot(8);
    }
  }

  function finish(steps){
    checkGates();
  }
}


