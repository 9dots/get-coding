var name = module.exports = 'playspsace-crossriver';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

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
    pickUp: PICKUP
  };
  vm.finished = false;
  vm.failed = false;

  // initialize playspace
  function activate(level, speed) {
    if(level) vm.level = level;
    vm.speed = speed;
    vm.finished = false;
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
  background= options.background;
  foreground= options.foreground;
  bank = options.bank;
  $(".instructionText").html(options.instructions);
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
  var goodSoFar = true;
  _.each(vm.level.stage.conditionLog, function(value, k1) {
    _.each(value, function(v2, k2) {
      if (log[k1][k2] !== v2) goodSoFar = false;
    })
  })
  if(goodSoFar === false) return;
  else{
  $(".message").html("Nice Job!");
  $(".message").show();
  vm.finished = true;
}
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
        //throw new Error('Item not present');
        //if item is not present
        $(".message").html("Item not present");
        $(".message").show();
        setTimeout(function(){
          $(".message").fadeOut();
        }, 5000)
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
      setTimeout(function(){
        $("." + dead + "." + place).addClass("dead" + dead);
        $("." + killer).hide();
        $(".message").html("Oh no! The " + killer + " ate the " + dead + "! You lose!");
        $(".message").show();
      }, 500)
    };

function DROPOFF(){
  if(pickedUp == ""){
    $(".message").html("Looks like you have nothing to drop off!");
    $(".message").show();
    setTimeout(function(){
      $(".message").fadeOut();
    }, 1000)
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