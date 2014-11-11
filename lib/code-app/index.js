var name = module.exports = 'code-app';

var _ = require('lodash/lodash');

var Emitter = require('component/emitter');

require('/lib/angular');
angular.module(name, ['ui.router'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app', {
    template: require('./index.html'),
    controller: 'AppCtrl',
    controllerAs: 'App'
  });
}])
.service('appRunner', function($timeout) {
  var runnerOptions = {
    api: {},
    codeFn: null,
    speed: 1000
  };
  var scheduled = [];
  this.api = function(api) {
    var wrappedApi = {};
    _.each(api, function(fn, key) {
      wrappedApi[key] = function() {
        var args = _.toArray(arguments);
        scheduled.push(fn.bind.apply(fn, [null].concat(args)));
      }
    });
    runnerOptions.api = wrappedApi;
  };

  this.codeFn = function(fn) {
    runnerOptions.codeFn = fn;
  };

  this.speed = function(speed) {
    if (_.isUndefined(speed))
      return runnerOptions.speed;
    else
      runnerOptions.speed = speed;
  };

  this.run = function() {
    var self = this;
    this.emit('start');
    with(runnerOptions.api) {
      try {
        eval(runnerOptions.codeFn());
      } catch(e) {
        console.error(e.stack);
      }
    }

    var i = 0;
    function step() {
      var fn = scheduled.shift();
      if (fn) {
        fn();
        $timeout(step, runnerOptions.speed);
      } else
        self.emit('end');
    }
    $timeout(step, runnerOptions.speed);
  };

  this.cancel = function() {
    scheduled = [];
  }

  Emitter(this);

})
.controller('AppCtrl', function(appRunner) {
  var vm = this;
  vm.run = run;

  function run() {
    appRunner.run();
  }
});