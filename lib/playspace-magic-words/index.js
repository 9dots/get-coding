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
    fire: fire, 
    ice: ice
  };
  vm.finishTimeout = 2500;
  //vm.finish = finish;

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

  function fire(){
    vm.bubble.push("fire!");
    for(var i=0; i<vm.obstacles.length; i++){
      if(vm.obstacles[i].position === "down"){
        if(vm.obstacles[i].type === "obstacle"){
          if(vm.obstacles[i].words[0] === "ice"){
            //found ice, destroy ice
            var obstLeft = $("#item" + i).css("left");
            obstLeft = obstLeft.slice(0, obstLeft.length - 2);
            castSpell("fire", Number(obstLeft), i);

            break
          } else {
            errorMessage("Fire won't work on this obstacle! Try ice.");
            break
          }
        } else {
          errorMessage("You need to open the gate first!");
          break
        }
      }
    }
    checkGates();
  };

  function ice(){
    vm.bubble.push("ice!");
    for(var i=0; i<vm.obstacles.length; i++){
      if(vm.obstacles[i].position === "down"){
        if(vm.obstacles[i].type === "obstacle"){
          if(vm.obstacles[i].words[0] === "fire"){
            //found fire, destroy fire
            var obstLeft = $("#item" + i).css("left");
            obstLeft = obstLeft.slice(0, obstLeft.length - 2);
            castSpell("ice", Number(obstLeft), i);
            break
          } else {
            //you tried this on ice
            errorMessage("Ice won't work on this obstacle! Try fire.");
            break
          }
        } else {
          //there is a closed gate
          errorMessage("You need to open the gate first!");
          break
        }
      }
    }
    checkGates();
  };

  function castSpell(spell, left, obstacle){
    $(".spell").addClass(spell + "Spell");
    var newLeft = (left + 210) + "px";
    var obstacleId = "#item" + obstacle;
    var factor = vm.speed / 10;
    var spellSpeed = left / 70 * factor + 30;
    magicWand(factor);
    vm.obstacles[obstacle].position = "up";
    $(".spell").animate({
      left: newLeft
    }, spellSpeed, 'easeInQuad',function(){
      //spell resets
      $(".spell").removeClass(spell + "Spell");
      $(".spell").css("left", "150px");

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
    checkGates(); 
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



  function errorMessage(message){
    var message= "<md-bottom-sheet class='playspace-magic-words'>" + message + "</md-bottom-sheet>";
    $mdBottomSheet.show({
      template: message
    })
  }
}


