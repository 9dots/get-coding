var name = module.exports = 'playspsace-whiteboard-review';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('playspaceWhiteboardReview', playspaceWhiteboardReview);

function playspaceWhiteboardReview() {
  var directive = {
    restirct: 'A',
    controller: playspaceWhiteboardReviewCtrl,
    controllerAs: 'WhiteboardReview',
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
function playspaceWhiteboardReviewCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {};
  vm.finished = false;
  vm.failed = false;
  vm.variables = {};
  vm.getHelp= getHelp;
  vm.unHelp= unHelp;
  vm.getHint= getHint;
  vm.unHint= unHint;
  vm.finish = finish;
  vm.helpMessage= helpMessage;
  vm.editValue= editValue;

  // initialize playspace
  function activate(level, speed) {
    if (level) {
      vm.level= level.level;
      vm.finished= false;
      vm.directions = level.board.directions;
      vm.message = vm.directions;
      vm.variableNames = level.board.variables;
      vm.values = level.board.values; 
      vm.showValues= level.board.showValues;
      vm.picture= level.board.picture;
      vm.answer= level.board.answer;
      vm.help = level.board.help;
      vm.hint = level.board.hint;
      vm.blanked= 0;

      if(vm.answer){
        var picture= vm.editValue(vm.answer);
        if (picture.indexOf(" ") != -1){
          picture= picture.replace(" ", "");
        }
        $(".screen").removeClass("happybird happybear happycat sadbird sadbear sadcat angrybird angrybear angrycat");
        $(".screen").addClass(picture);
        $(".screen").show()
      } else {
        $(".screen").hide();
      }

      _.each(vm.variableNames, function(variable) {
        vm.api[variable] = {
          get: function() {
            return vm.variables[variable];
          },
          set: function(val) {
            if(vm.blanked == 0){
              for(var i=0; i< vm.variableNames.length; i++){
                vm.variables[vm.variableNames[i]]= null;
              }
              vm.blanked+=1;
            }

            $(".onScreenValue").hide();
            vm.variables[variable] = val + "^";
          }
        }
      });
    }

    for(var i=0; i< vm.variableNames.length; i++){
      vm.variables[vm.variableNames[i]]= vm.showValues[i];
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

  function getHelp(){
    $(".helphand").animate({
      top: "625px",
      left: "360px"
    }, 200, function(){
      $(".helphand").addClass("openhand");
      $(".helphand").removeClass("fisthand");
    })
    helpMessage();
  }

  function unHelp(){
    $(".helphand").addClass("fisthand");
    $(".helphand").removeClass("openhand");
    $(".helphand").animate({
      top: "800px",
      left: "300px"
    }, 200)
    dirMessage();
  }

  function getHint(){
    $(".hinthand").animate({
      top: "650px",
      left: "610px"
    }, 200, function(){
      $(".hinthand").addClass("openhand");
      $(".hinthand").removeClass("fisthand");
    })
    hintMessage();
  }

  function unHint(){
    $(".hinthand").addClass("fisthand");
    $(".hinthand").removeClass("openhand");
    $(".hinthand").animate({
      top: "800px",
      left: "550px"
    }, 200)
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

  function animation(adj, noun){
      var adjInd= vm.values.indexOf(adj);
      var adjId= vm.variableNames[adjInd];
      var adjText= editValue(vm.api[adjId].get());
      var adjEl= "<p class= 'green cubby singlevar " + adjId + "Value animAdj'>" + adjText + "</p>";
      $(".holder").append(adjEl);

      var nounInd= vm.values.indexOf(noun);
      var nounId= vm.variableNames[nounInd];
      var nounText= editValue(vm.api[nounId].get());
      var nounEl= "<p class= 'green cubby singlevar " + nounId + "Value animNoun'>" + nounText + "</p>";
      $(".holder").append(nounEl);

      var picture= adjId + nounId;

      $(".animAdj").animate({
        left: $(".onScreenValue").css("left"), 
        top: $(".onScreenValue").css("top")
      }, 600);

      $(".animNoun").animate({
        left: $(".onScreenValue").css("left"), 
        top: $(".onScreenValue").css("top")
      }, 600);

      setTimeout(function(){
        $(".screen").addClass(picture);
        $(".animAdj").hide();
        $(".animNoun").hide();
        $(".onScreenValue").show();
      }, 900)


    }

  function finish(steps) {

    var count=0;

    if(vm.level > 4 && vm.level < 10){
      //level 5, 8 or 9
      for(var i=0; i<vm.variableNames.length-1; i++){
        if(vm.editValue(vm.api[vm.variableNames[i]].get()) == editValue(vm.values[i])){
          count += 1;
        }
      }

      if(count == 6){
        //correct, move on to onScreen
        var given= vm.api["onScreen"].get();
        if (given == vm.answer){
          given= given.slice(0, given.length-2);
          var ind= given.indexOf("^");
          var adj= given.slice(0, ind);
          var noun= given.slice(ind + 1, given.length);

          vm.message= "THAT'S RIGHT! YOU DID IT!";
          //call success animation here
          animation(adj, noun);
          vm.finished= true;

        } else {
          //you gave the wrong onScreen value. check if they wrote it in.
          if(editValue(given) == vm.editValue(vm.answer)){
            vm.message= "Uh oh. It looks like you just typed in the correct value for onScreen. You need to tell the computer which variables to combine using their names and the + sign.";
          } else {
            vm.message= "OOPS! It looks like your onScreen variable is incorrect. Make sure you are combining the right variables and not just typing in the value.";
          }
        }
      } else {
        //you have incorrect values
        var countText;
        if (count == 5){
          countText= " one variable";
        } else {
          countText= (6 - count) + " variables";
        }
        vm.message= "OOPS! It looks like you have given " + countText + " incorrect values! Make sure the words in quotation marks are spelled correctly."
      }
    } else if (vm.level == 10) {

      for(var i=0; i<vm.variableNames.length-1; i++){
        if(vm.editValue(vm.api[vm.variableNames[i]].get()) == editValue(vm.values[i])){
          count += 1;
        }
      }

      if(count == 6){
        var pic= vm.editValue(vm.api["onScreen"].get());
        var ind= pic.indexOf(" ");
        var adj= pic.slice(0, ind+ 1);
        var noun= pic.slice(ind + 1, pic.length);
        animation(adj, noun)
        pic= pic.replace(" ", "");
        $(".screen").removeClass("happybird happybear happycat sadbird sadbear sadcat angrybird angrybear angrycat");
        $(".screen").addClass(pic);
        $(".screen").show();
        var adjText;
        if(adj == "angry "){
          adjText= "an angry ";
        } else {
          adjText= "a " + adj;
        }
        vm.message= "Way to go! You made " + adjText + noun + "! What else can you make?";
        vm.blanked= 0;
      } else {
        //you have incorrect values
        var countText;
        if (count == 5){
          countText= " one variable";
        } else {
          countText= (6 - count) + " variables";
        }
        vm.blaned= 0;
        vm.message= "OOPS! It looks like you have given " + countText + " incorrect values! Make sure the words in quotation marks are spelled correctly."
      }

    } else {
      for(var i=0; i<vm.variableNames.length; i++){
        if(vm.editValue(vm.api[vm.variableNames[i]].get()) == editValue(vm.values[i])){
          count += 1;
        }
      }

      if (steps < vm.variableNames.length){
        //too few variables
        vm.message= "Uh oh. It looks like you didn't declare all your variables. Make sure that you declare all variables listed on the board, that their names are spelled correctly, and that there is a space between var and the variable name."
      } else if (steps == vm.variableNames.length && steps != count) {
        // enough vars, wrong vals
        vm.message= "OOPS! You have declared the correct number of variables, but it seems that the values (the words in quotation marks) are incorrect. Check that you have spelled everything correctly and that you have paired the correct values with the correct variables."
      } else if (count == vm.variableNames.length) {
        //right num, right vals
        vm.message= "THAT'S RIGHT! YOU DID IT!";
        vm.finished= true;
      }
    }

    //define behavior for success and set finished to true when done
  }

}


