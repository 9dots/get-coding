var name = module.exports = 'code-app';

var _ = require('lodash/lodash');
var lscache = require('pamelafox/lscache:lscache.js');
var Emitter = require('component/emitter');
var parseStack = require('lydell/parse-stack');
var marked = require('chjj/marked');

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
    app.data.help = app.help;
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
.service('appRunner', function($rootScope, $mdBottomSheet, $timeout) {
  var options = {
    api: {},
    code: null,
    speed: 1000,
    start: null
  };


  var self = this;
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

  this.get = function(name) {
    return options[name];
  };

  this.run = function() {
    var self = this;
    if (this.running)
      return this.cancel();

    
    if (this.killed) {
      this.reset();
    }
    this.emit('run');
    this.running = true;

    $timeout(step);

    function step() {
      var res = self.step()
      if (res) {
        self._timeout = $timeout(function() {
          self.emit('stepped');
          self.running && step();
        }, options.speed)
      } else {
        self.cancel(true);
      }
    }
  };

  this.step = function() {
    callNum = 0;
    with(options.api) {
      try {
        eval(options.code());
      } catch(e) {
        if (e.message !== 'STEP') {
          showError(e);
          return false;
        } else {
          stepSuccess(e);
        }
        return true;
      }
    }
    return false;
  };

  this.cancel = function(hard) {
    this.running = false;
    if (hard) {
      this.killed = true;
    }
    clearTimeout(this._timeout);
  };

  this.init = function(level) {
    this.steps = 0;
    callStack = [];
    this.running = false;
    this.killed = false;
    options.start(level, options.speed);
    this.emit('init');
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

          // Note: running this in a setTimeout lets step handlers run before step is executed
          // ace highlight runs in 50ms setTimeout
          setTimeout(function() {
            callStack.push(fn.apply([null].concat(args)) || null);
          }, 50);
          
          throw new Error('STEP');
        } else {
          return callStack[callNum++];
        }
      }
    });
    return wrappedApi
  }

  function showError(e) {
    var p = parseStack(e);
    $mdBottomSheet.show({
      template: require('./error-message.html'),
      locals: {
        error: {
          message: e.toString(),
          line: p[0].lineNumber,
          column: p[0].columnNumber
        }
      },
      controller: function($scope, error) {
        $scope.error = error;
      }
    });
  }

  function stepSuccess(e) {
    var p = parseStack(e);
    var lineNum = p[1].lineNumber;
    self.steps ++;
    self.emit('step', lineNum);
  }

  Emitter(this);

})
.controller('AppCtrl', function(appRunner, apps, $location, $rootScope, $mdDialog) {
  var vm = this;

  //public
  vm.Runner = appRunner
  vm.add = add;
  vm.Workspace = null;
  vm.Playspace = null;
  vm.setLevel = setLevel;
  vm.showReadme = showReadme;
  vm.hasReadme = hasReadme;
  vm.increaseSpeed = increaseSpeed;
  vm.decreaseSpeed = decreaseSpeed;
  vm.speed = speed;

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
      .set('api', vm.Playspace.api)
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
      appRunner.cancel(true);
    } else if (vm.Playspace.finished) {
      appRunner.finished();
      nextLevel();
    }
  }

  function trace(lineNum) {
    vm.Workspace.trace && vm.Workspace.trace(lineNum);
  }

  function increaseSpeed() {
    appRunner.set('speed', Math.max(appRunner.get('speed') / 2, 125));
  }

  function decreaseSpeed() {
    appRunner.set('speed', Math.min(appRunner.get('speed') * 2, 4000));
  }

  function speed() {
    return 1000 / appRunner.get('speed');
  }

  appRunner.on('step', trace);
  appRunner.on('init', trace);
  appRunner.on('stepped', checkStatus);
  appRunner.on('run', save);
  
  window.onbeforeunload = save;

  var interval = setInterval(save, 5000);
  $rootScope.$on('$stateChangeStart', function() {
    clearInterval(interval);
    
    appRunner.off('step', trace);
    appRunner.off('init', trace);
    appRunner.off('stepped', checkStatus);
    appRunner.off('run', save);
  });

  function showReadme() {
    $mdDialog.show({
      template: require('./readme.html'),
      locals: {
        readme: marked(app.help)
      },
      controller: function($scope, readme) {
        $scope.readme = readme;
      }
    })
  }

  function hasReadme() {
    return !!app.help;
  }

  activate();
});