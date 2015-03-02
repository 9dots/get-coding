/**
 * Moduels
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-fridge';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceFridge', playspaceFridge);

function playspaceFridge() {
  var directive = {
    restirct: 'A',
    controller: playspaceFridgeCtrl,
    controllerAs: 'Fridge',
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
function playspaceFridgeCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};
  vm.finish = finish;

  // initialize playspace
  function activate(level, speed) {
    if (level){
      vm.finished= false;
      vm.directions = level.directions;
      vm.message = vm.directions;
      vm.drawings= level.drawings;
      vm.variableNames = level.variables;
      vm.help = level.help;
      vm.hint = level.hint;
      vm.getHelp= getHelp;
      vm.unHelp= unHelp;
      vm.getHint= getHint;
      vm.unHint= unHint;
      vm.editValue= editValue;
      vm.setVariables= setVariables;

      function setVariables(){
        vm.api= {};
        //add word variables to api
        _.each(vm.variableNames, function(variable) {
          vm.api[variable.name] = {
            get: function() {
              return vm.variables[variable.name];
            },
            set: function(val) {
              vm.variables[variable.name] = val;
            }
          }
        });
        //add word variables to variables array and give word variables values
        for(var i=0; i<vm.variableNames.length; i++){
          vm.variables[vm.variableNames[i].name] = vm.variableNames[i].value + "^";
        }
        //add drawing variables to api
        _.each(vm.drawings, function(drawing) {
          vm.api[drawing.id] = {
            get: function() {
              return vm.variables[drawing.id];
            },
            set: function(val) {
              vm.variables[drawing.id] = val;
            }
          }
        });
        //add drawings to variables array and give drawing variables initial values 
        for(var j=0; j<vm.drawings.length; j++){
          vm.variables[vm.drawings[j].id] = null;
        }
      }

      setVariables()

      function editValue(val){
        var val= val;
        var ind;
        if(val == null){
          val = "?";
        } else {
          ind= val.indexOf("^");
          while(ind != -1){
            val= val.replace("^", "");
            ind= val.indexOf("^");
          }
        }
        return val;
      }

      function getHelp(){
        $(".help").addClass("helpletters");
        helpMessage();
      }

      function unHelp(){
        $(".help").removeClass("helpletters");
        dirMessage();
      }

      function getHint(){
        $(".hint").addClass("hintletters");
        hintMessage();
      }

      function unHint(){
        $(".hint").removeClass("hintletters");
        dirMessage();
      }

      function helpMessage(){
        vm.message= vm.help;
      }

      function dirMessage(){
        vm.message= vm.directions;
      }

      function hintMessage(){
        vm.message= vm.hint;
      }

      setTimeout(function() {
        $(".magnet").draggable({containment: ".magnetBox"})
      });
    }
  }



  function finish(steps){
    
    //check if all vars have been set
    var missing= 0;
    _.each(vm.drawings, function(drawing){
      if(vm.variables[drawing.id] == null){
        missing += 1;
      }
    });
  
    //if missing, tell them, otherwise check answers
    if(missing != 0){
      var varText1= "";
      var varText2= "";
      var total= vm.drawings.length;
      var defined= total - missing;
      defined > 1 ? varText1= defined + " variables" : varText1= "1 variable";
      total > 1 ? varText2= total + " variables" : varText2= "1 variable";
      //you have not defined all variables 
      vm.message= "Oops! It looks like you have only defined " + varText1 + ". You need to define a total of " + varText2 + " in this exercise.";
      vm.setVariables()
    } else {
      //you have defined all variables. now check the values 

      var correct=0;
      _.each(vm.drawings, function(drawing){
        var value= vm.variables[drawing.id];
        if(value == drawing.answer){
          correct += 1;
        }
      })

      if(correct!=vm.drawings.length){
        //you have at least one incorrect value
        var message= "Oops! It looks like you have declared the correct number of variables, but you have set the wrong values. Double check the word variables you have assigned to each drawing variable.";
        //check if they just declared a string value
        if(vm.variables["drawing1"] == vm.drawings[0].class || vm.variables["drawing2"] == vm.drawings[1].class || vm.variables["drawing3"] == vm.drawings[2].class){
          message= "You're close, but you didn't write your code in the correct way. It seems you just typed in the correct values, but in this exercise, we want you to use variable names to give each drawing variable its value!";
        } 
        //check to see if they changed any of the word magnets
        var changed=0;
        _.each(vm.variableNames, function(variable){
        if (vm.variables[variable.name] != variable.value + "^"){
          changed += 1;
          }
        })
        if(changed > 0){
          message= "Uh oh! It looks like you changed the value of one of the word magnets. Delete any lines that change the values of the word magnets and try again!"
        }
        
        vm.message= message;
        vm.setVariables()

      } else {
        //you're values are correct, new level
        vm.message= "That's right! You got all of them!"
        vm.finished= true;
      }
    }
  }
}





