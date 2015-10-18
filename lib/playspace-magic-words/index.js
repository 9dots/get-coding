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
    cast: cast
  };
  vm.finishTimeout = 2500;
  vm.finish = finish;
  vm.failed = false;
  var lastLevel = null;

  // initialize playspace
  function activate(level, speed) {
    level = level || lastLevel;
    vm.obstacles = _.cloneDeep(level.obstacles);
    vm.bubble= [];
    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;
    lastLevel = level;

    //reset wizard and bubble
    $(".wizard").css("left", "60px");
    $(".wizard").css("background-position", "0px");
    $(".bubble").show();

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
                vm.failed = {
                  toString: function(){
                    return "Wrong spell!"
                  }, 
                  subMessage: "You can't use ice on ice!"
                }
              } else {
                // not a spell
                vm.failed = {
                  toString: function(){
                    return spell + " is undefined"
                  }, 
                  subMessage: "You can only cast 'ice' or 'fire'."
                }
              }
              break
            } else if (vm.obstacles[i].words[0] === 'fire'){
              if(spell === 'ice'){
                castSpell(spell, Number(obstLeft), i, false);
              } else if (spell === 'fire') {
                castSpell(spell, Number(obstLeft), i, true);
                vm.failed = {
                  toString: function(){
                    return "Wrong spell!"
                  }, 
                  subMessage: "You can't use fire on fire!"
                }
              } else {
                // not a spell
                vm.failed = {
                  toString: function(){
                    return spell + " is undefined"
                  }, 
                  subMessage: "You can only cast 'fire' or 'ice'."
                }
              }
              break
            } 
        } else {
          var obstLeft = $("#item" + i).css("left");
          obstLeft = obstLeft.slice(0, obstLeft.length - 2);
          castSpell(spell, Number(obstLeft), i, true);
          vm.failed = {
            toString: function(){
              return "Spell blocked by gate!"
            }, 
            subMessage: "You need to open all gates in front of a obstacle before you can destroy it."
          }
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


