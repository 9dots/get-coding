var name = module.exports = 'code-app';

var _ = require('lodash/lodash');

var lscache = require('pamelafox/lscache:lscache.js');

var Emitter = require('component/emitter');

require('/lib/angular');
angular.module(name, ['ui.router', require('/lib/div-resize')])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('app', {
    template: require('./index.html'),
    controller: 'AppCtrl',
    controllerAs: 'App'
  });
}])
.provider('apps', ['$stateProvider', function($stateProvider) {
  var apps = [];
  apps.byName = function(name) {
   return _.find(this, {name: name});
  };

  this.register = function(app) {
    app.data.levels = app.levels;
    apps.push(app.data);
    $stateProvider.state('app.' + app.data.name, {
      url: '/' + app.data.name,
      views: {
        workspace: {template: app.workspace},
        playspace: {template: app.playspace}
      }
    });
  };

  this.$get = function() {
    return apps;
  };
}])
.service('appRunner', function($rootScope) {
  var options = {
    api: {},
    code: null,
    speed: 1000,
    start: null
  };

  this.steps = 0;

  var callStack = [];
  var callNum = 0;

  this.set = function(name, fns) {
    if (name === 'api') {
      fns = wrapApi(fns);
    }
    options[name] = fns;
    return this;
  };

  this.run = function() {
    var self = this;
    this.emit('run');
    this.reset();
    this.canceled = false;

    function step() {
      $rootScope.$apply(function() {
        self.emit('step');
        if (self.canceled)
          res = false;
        else
          res = self.step()
      });
      if (res) {
        setTimeout(step, options.speed)
      }
    }

    setTimeout(step, options.speed);
  };

  this.step = function() {
    
    callNum = 0;
    with(options.api) {
      try {
        eval(options.code());
      } catch(e) {
        if (e.message !== 'STEP') {
          console.error(e.stack);
          return false;
        }
        this.steps ++;
        return true;
      }
    }
    return false;
  };

  this.cancel = function() {
    this.canceled = true;
  };

  this.init = function(level) {
    this.steps = 0;
    callStack = [];
    this.canceled = true;
    options.start(level, options.speed);
  }

  this.reset = function() {
    this.init();
  };

  this.finished = function() {
    this.cancel();
    this.emit('end');
  };


  function wrapApi(api) {
    var wrappedApi = {};
    _.each(api, function(fn, key) {
      wrappedApi[key] = function() {
        if (_.isUndefined(callStack[callNum])) {
          var args = _.toArray(arguments);
          callStack.push(fn.apply([null].concat(args)) || null);
          throw new Error('STEP');
        } else {
          return callStack[callNum++];
        }
      }
    });
    return wrappedApi
  }

  Emitter(this);

})
.controller('AppCtrl', function(appRunner, apps, $location, $rootScope) {
  var vm = this;

  //public
  vm.Runner = appRunner
  vm.add = add;
  vm.Workspace = null;
  vm.Playspace = null;
  vm.setLevel = setLevel;

  //private
  var workspace = null;
  var app = null;
  var appKey = null;

  function add(ctrl) {
    if (ctrl.toCode) {
      vm.Workspace = ctrl;
      activateWorkspace();
    } else {
      vm.Playspace = ctrl;
      activatePlayspace();
    }
  }

  function activate() {
    var appName = $location.url().slice(1);
    appKey = appName + ':level';
    app = apps.byName(appName);

    var stored = lscache.get(appKey) || {};
    vm.title = app.title;
    vm.highLevel =  stored.highLevel || 0;
    vm.level = stored.level || vm.highLevel;
    vm.levels = app.levels;
    if (!vm.levels)
      throw new Error('app didnt define levels');
    workspace = stored.workspace;

  }

  function activateWorkspace() {
    workspace && vm.Workspace.fromJSON(workspace);
    appRunner
      .set('code', vm.Workspace.toCode);
  }

  function activatePlayspace() {
    appRunner
      .set('api', vm.Playspace.api())
      .set('start', vm.Playspace.activate);
    appRunner.init(app.levels[vm.level]);
  }

  function nextLevel() {
    var level = vm.level + 1;
    if (!app.levels[level])
      level = 0;
    if (level > vm.highLevel)
      vm.highLevel = level;
    setLevel(level);
  }

  function setLevel(level) {
    vm.level = level;
    appRunner.init(app.levels[vm.level]);
  }

  function save() {
    //save for 60 minutes
    lscache.set(appKey, {
      workspace: vm.Workspace.toJSON(),
      highLevel: vm.highLevel,
      level: vm.level
    }, 60);
  }

  function checkStatus() {
    if (vm.Playspace.failed) {
      appRunner.cancel();
    } else if (vm.Playspace.finished) {
      appRunner.finished();
      nextLevel();
    }
  }

  appRunner.on('step', checkStatus);
  appRunner.on('run', save);
  
  window.onbeforeunload = save;

  var interval = setInterval(save, 5000);
  $rootScope.$on('$stateChangeStart', function() {
    clearInterval(interval);
    appRunner.off('run', save);
    appRunner.off('step', checkStatus);
  });

  activate();
});