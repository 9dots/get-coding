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
function playspaceMagicWordsCtrl($element, $timeout) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    foo: foo, 
    boo: boo, 
    goo: goo, 
    loo: loo
  };
  var lastLevel = null;

  // initialize playspace
  function activate(level, speed) {
    level = level || lastLevel;
    
    vm.gates = _.cloneDeep(level.gates);

    vm.finished = false;
    vm.failed = false;
    vm.speed = speed;

    lastLevel = level;

  }

  // define api
  function foo(){
    magicWord("foo");
  };

  function boo(){
    magicWord("boo");
  };

  function goo(){
    magicWord("goo");
  };

  function loo(){
    magicWord("loo");
  };

  function magicWord(word){
    var gateClass = "." + word;
    var gateLabel = "." + word + "label";

    //speech bubble

    //highlight words
    $(gateLabel).css("color", "white");

    //change position

    //toggle gates
    toggleGates(word);

    //unhighlight
    setTimeout(function(){
      $(gateLabel).css("color", "black");
    }, vm.speed);
    //remove bubble

    //check for win
    checkGates(); 
  }

  function toggleGates(gate){

    for(var i = 0; i < vm.gates.length; i++){
      if(vm.gates[i].words.indexOf(gate) != -1){
        toggleGate(i);
        animateGate(i);
      }
    }
  }

  function toggleGate(i) {
    if(vm.gates[i].position === "up") {
      vm.gates[i].position = "down";
    } else {
      vm.gates[i].position = "up";
    }
  }

  function animateGate(i) {
    var top = vm.gates[i].position === 'up' ? -100 : 0;
    $('#gate' + i).animate({top: top}, vm.speed * .8, "easeOutExpo");
  }

  function checkGates(){

    var closed = 0;
    for(var j = 0; j < vm.gates.length; j++){
      if(vm.gates[j].position === "down") {
        closed++;
      }
    }

    if(closed == 0){
      vm.finished = true;
    }
  }


}


