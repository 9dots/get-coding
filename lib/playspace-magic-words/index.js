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
    fire: fire, 
    ice: ice
  };
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

  function fire(){
    vm.bubble.push("fire!");
    for(var i=0; i<vm.obstacles.length; i++){
      if(vm.obstacles[i].position === "down"){
        if(vm.obstacles[i].type === "obstacle"){
          if(vm.obstacles[i].words[0] === "ice"){
            vm.obstacles[i].position = "up";
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
            vm.obstacles[i].position = "up";
            break
          } else {
            errorMessage("Ice won't work on this obstacle! Try fire.");
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

  function openGate(word){
    var gateClass = "." + word;
    var gateLabel = "." + word + "label";

    //highlight words
    $(gateLabel).css("color", "white");

    //toggle gates
    toggleGates(word);

    //unhighlight
    setTimeout(function(){
      $(gateLabel).css("color", "black");
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
    var top = vm.obstacles[i].position === 'up' ? -100 : 0;
    $('#item' + i).animate({top: top}, vm.speed * .8, "easeOutExpo");
  }

  function animateWizard() {
    $(".wizard").animate({
      left: "700"
    }, 1000)
  }

  function checkGates(){
    var closed = 0;
    for(var j = 0; j < vm.obstacles.length; j++){
      if(vm.obstacles[j].position === "down") {
        closed++;
      }
    }
    if(closed == 0){  
      vm.finished=true;
    }
  }

  function errorMessage(message){
    var message= "<md-bottom-sheet class='playspace-magic-words'>" + message + "</md-bottom-sheet>";
    $mdBottomSheet.show({
        template: message
      })
  }
}


