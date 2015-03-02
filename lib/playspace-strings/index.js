var name = module.exports = 'playspsace-strings';

require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

require('./index.css');

angular.module(name, [])
.directive('playspaceStrings', playspaceStrings);

function playspaceStrings() {
  var directive = {
    restirct: 'A',
    controller: playspaceStringsCtrl,
    controllerAs: 'Strings',
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
function playspaceStringsCtrl($element, $mdBottomSheet) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.run = run;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};
  vm.finish = finish;
  vm.editValue= editValue;
  vm.setAnimal= setAnimal;
  vm.setBg= setBg;
  vm.setFood= setFood;
  vm.removeSpaces= removeSpaces;
  vm.setScreen= setScreen;
  vm.errorMessage= errorMessage;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.level= level.level;
      vm.finished= false;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.showValues= level.board.showValues;
      vm.answer= level.board.answer;
      vm.drawings= level.board.drawings;
      vm.blanked= 0;

      _.each(vm.variableNames, function(variable) {

        vm.api[variable] = {
          get: function() {
            return vm.variables[variable];
          },
          set: function(val) {
            vm.variables[variable] = val + "^";
          }
        }
      });

      for(var i=0; i< vm.variableNames.length; i++){
        vm.variables[vm.variableNames[i]]= vm.showValues[i];
      }

    } else {
      blankValues();
    }
  }

  function run() {
    blankValues();
  }

  function blankValues() {
    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= null;
    }
  }

  function editValue(val){
    var val= val;
    var ind;
    if(val == null){
      val = "";
    } else {
      ind= val.indexOf("^");
      while(ind != -1){
        val= val.replace("^", "");
        ind= val.indexOf("^");
      }
    }
    return val;
  }

  function setAnimal(id){
    var el = $(".screenAnimal");
    if (vm.drawings.indexOf(id) != -1){
      el.removeClass("happybird happybear happycat sadbird sadbear sadcat angrybird angrybear angrycat");
      if (vm.level == 3){
        el.addClass("angrycat");
      } else {
        el.addClass(id);
      }
    }
  }

  function setBg(id){
    var el = $(".screenBg");
    if (vm.drawings.indexOf(id) != -1){
      el.removeClass("ahouse NewYork space");
      el.addClass(id);
    }
  }

  function setFood(id){
    var el = $(".screenFood");
    if (vm.drawings.indexOf(id) != -1){
      el.removeClass("hotdogs cake catfood");
      el.addClass(id);
    }
  }

  function setScreen(animalClass, bgClass, foodClass){
    vm.setAnimal(animalClass);
    vm.setBg(bgClass);
    vm.setFood(foodClass);
  }

  function removeSpaces(val){
    var val= val;
    var ind;
    if(val == null){
      val = "";
    } else {
      ind= val.indexOf(" ");
      while(ind != -1){
        val= val.replace(" ", "");
        ind= val.indexOf(" ");
      }
    }
    return val;
  }

  function errorMessage(message){
    var message= "<md-bottom-sheet class='playspace-strings'>" + message + "</md-bottom-sheet>";
    $mdBottomSheet.show({
        template: message
      })
  }

  function finish(steps) {
    var animalClass= editValue(vm.api["adjective"].get()) + vm.editValue(vm.api["animal"].get());
    var bgClass= vm.editValue(vm.removeSpaces(vm.api["place"].get()));
    var foodClass= editValue(vm.removeSpaces(vm.api["food"].get()));
    var count= 0;
    for (var i= 0; i < 4; i++){
      if(vm.editValue(vm.api[vm.variableNames[i]].get()) == vm.values[i]) {
        count +=1;
      }
    }

    if (vm.level == 10){
      vm.setScreen(animalClass, bgClass, foodClass);
    } else {
      if(vm.api["story"].get() == vm.answer && count == 4){
        //correct answer 
        vm.setScreen(animalClass, bgClass, foodClass);
        vm.finished= true;
      } else {
        //wrong answer
        var wrongVars= "It looks like there's a problem with your first four variables. Make sure you have created all four variables and given them the right values."
        var wrongStory= "Your story is not quite right. Make sure you've added the new text to the story without deleting anything from the previous levels."
        if (count < 4){
          vm.errorMessage(wrongVars);
        } else {
          vm.errorMessage(wrongStory);
        }
      }
    }
  }
}




