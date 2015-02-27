/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'playspsace-crossriver';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('playspaceCrossriver', playspaceCrossriver);

function playspaceCrossriver() {
  var directive = {
    restirct: 'A',
    controller: playspaceCrossriverCtrl,
    controllerAs: 'Crossriver',
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
function playspaceCrossriverCtrl($element) {
  var vm = this;

  // playspace interface
  vm.activate = activate;
  vm.api = {
    dropOff: DROPOFF, 
    crossRiver: CROSSRIVER, 
    pickUp: PICKUP,
    err: ERR
  };
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    if(level) vm.level = level;
    vm.speed = speed;
    vm.finished = false;
    error = {};
    setStage(vm.level.stage);
  }

    // define api
var chicken= "chicken";
var fox= "fox";
var grain= "grain";
var bank= false;
var foreground= [];
var background= [];
var pickedUp= "";
  
var log = {};

function setStage(options){
  background= _.clone(options.bg);
  foreground= _.clone(options.fg);
  bank = _.clone(options.bank);
  pickedUp="";
  $(".bg").hide();
  $(".fg").hide();
  $(".cargo").hide();
  $(".passenger").hide();
  for(var object in background) $("."+String(background[object])+".bg").show();
  for(var object in foreground) $("."+String(foreground[object])+".fg").show();
  if (bank == false){
    $(".middle").css("left", 450);
    $(".farmer.fg").show();
  }
  else{
    $(".middle").css("left", 100);
    $(".farmer.bg").show();
  }
  $(".message").hide();
  $('.chicken').removeClass('deadchicken');
  $(".grain").removeClass('deadgrain');
  log = {
    'pickedUp': {},
    'crossedToBackground': {},
    'crossedToForeground': {}
  }
};

function checkForWin(){
  var goodSoFar;
  if(_.isArray(vm.level.stage.conditionLog)){
    for(i = 0 ; i < vm.level.stage.conditionLog.length; i++){
      goodSoFar = compareLogs(vm.level.stage.conditionLog[i]);
      if(goodSoFar === true) break;
    }
  }
  else{
    goodSoFar = compareLogs(vm.level.stage.conditionLog);
  }
  if(goodSoFar === false) return;
  else{
    $(".message").html("Nice Job!");
    $(".message").show();
    vm.finished = true;
  }
}

function compareLogs(conditionLog){
  var good = true;
  _.each(conditionLog, function(value, k1) {
    _.each(value, function(v2, k2) {
      if (log[k1][k2] !== v2) good = false;
    })
  })
  return good;
}

function ERR() {
  return error;
}

function PICKUP(item){
      //check that item is there to be picked up
      if (itemPresent(item)){      
        var handle= "." + item;
        var location= getLocation();
        $(handle + location).hide();
        $(".farmer" + location).hide();
        $(".passenger").show();
        $(".cargo").addClass(item);
        $(".cargo").show();
        if(bank == false){
           foreground.splice(foreground.indexOf(item), 1);
        } else {
          background.splice(background.indexOf(item), 1);
        }
        pickedUp= item;
        log.pickedUp[item] = (log.pickedUp[item] || 0) + 1;
        checkForWin();
      } else {
        error = {
          toString: function(){
            return 'Item not present';
          },
          subMessage:'Try selecting a different item from the dropdown menu'
      }
    }
 };

function itemPresent(item){
    if (bank==false){
      //in foreground
      if(foreground.indexOf(item) != -1) {
          return true
        } else {
          return false
        }
    } else {
      //in background
      if(background.indexOf(item) != -1) {
          return true
        } else {
          return false
        }
    }
};

function getLocation(){
  var location;
  if(bank == false){
    location= ".fg";
  } else {
    location = ".bg"
  }
  return location;
};

function CROSSRIVER(){
      $(".farmer").hide();
      $(".passenger").show();
      if(bank== false){
        $(".middle").animate({
          left: "-=350"
        }, vm.speed);
        bank=true;
        
      } else {
        $(".middle").animate({
          left: "+=350"
        }, vm.speed);
        bank=false;

      }
      //checkForWin();
      if(foreground.length > 1){
        //check foreground for bad match
        if(foreground.indexOf("chicken") != -1 && foreground.indexOf("fox") != -1) {
          //fox eats chicken in foreground
          lose("chicken", "fg", "fox");
        } else if (foreground.indexOf("chicken") != -1 && foreground.indexOf("grain") != -1) {
          //chicken eats grain in foreground
          lose("grain", "fg", "chicken");
        }
      } else if (background.length > 1) {
        //check background for bad match
        if(background.indexOf("chicken") != -1 && background.indexOf("fox") != -1) {
          //fox eats chicken in background
          lose("chicken", "bg", "fox");
        } else if (background.indexOf("chicken") != -1 && background.indexOf("grain") != -1) {
          //chicken eats grain in background
          lose("grain", "bg", "chicken");
        }
      } 
    };


function lose(dead, place, killer){
  error = {
    toString: function() {
      return "You lost!";
    },
    subMessage: "Oh no! The " + killer + " ate the " + dead + "!"
  }
};

function DROPOFF(){
  if(pickedUp == ""){
    error = {
      toString: function(){
        return "Nothing to drop off."
      },
      subMessage: "You had no item in your boat."
    }
  }
  else{
    var handle = "." + pickedUp;
    var location = getLocation();
    $(".cargo").removeClass(handle.substring(1, handle.length));
    $(".cargo").hide();
    $(handle +location).show();
    if(bank == false){
      foreground.push(pickedUp);
      foreground.sort();
      var crossed = "";
      for(i = 0; i < foreground.length; i ++){
        crossed += foreground[i];
      }
      log.crossedToForeground[crossed] = (log.crossedToForeground[crossed] || 0) +1;
    }
    else{
      background.push(pickedUp);
      background.sort();
      var crossed = "";
      for(i = 0; i < background.length; i ++){
        crossed += background[i];
      }
      log.crossedToBackground[crossed] = (log.crossedToBackground[crossed] || 0) +1;
    }
    pickedUp = "";
  }
  checkForWin();
}
};