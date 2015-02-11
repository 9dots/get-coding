var name = module.exports = 'code-app';

var _ = require('lodash/lodash');
var lscache = require('pamelafox/lscache:lscache.js');
var Emitter = require('component/emitter');
var parseStack = require('lydell/parse-stack');
var marked = require('chjj/marked');
var Analysis = require('joshrtay/jsAnalyse:dist');

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
    

    this.running = true;
    this.emit('run');
    if (!this.running)
      return;

    self._timeout = $timeout(step);

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
    this.isFinished = true;
    return false;
  };

  this.cancel = function(hard) {
    this.running = false;
    this.emit('canceled');
    if (hard) {
      this.killed = true;
    }
    if (this.isFinished)
      this.emit('finished', this.steps);
    $timeout.cancel(this._timeout);
  };

  this.error = function(e) {
    this.cancel();
    showError(e);
  };

  this.init = function(level) {
    this.steps = 0;
    callStack = [];
    this.running = false;
    this.killed = false;
    this.isFinished = false;
    options.start(level && level.playspace || level, options.speed);
    this.emit('init');
  }

  this.reset = function() {
    this.init();
  };

  this.finished = function() {
    if (this.running)
      this.cancel(true);
      this.emit('end');
  };

  function wrapFn(fn) {
    return function() {
      if (_.isUndefined(callStack[callNum])) {
        var args = _.toArray(arguments);
        // Note: running this in a setTimeout lets step handlers run before step is executed
        // ace highlight runs in 50ms setTimeout
        $timeout(function() {
          callStack.push(fn.apply(null, args) || null);
        }, 50);
        
        throw (new Error('STEP'));
      } else {
        return callStack[callNum++];
      }
    }
  }

  function wrapApi(api) {
    var wrappedApi = {};
    _.each(api, function(fn, key) {
      if (_.isFunction(fn)) {
        wrappedApi[key] = wrapFn(fn);
      } else if (_.isObject(fn)) {
        // getter setter
        if (fn.get && fn.set) {
          fn = _.clone(fn);
          fn.set = wrapFn(fn.set);
          Object.defineProperty(wrappedApi, key, fn);
        } else {
          wrappedApi[key] = wrapApi(fn);
        }
      } else {
        
      }
      
    });
    return wrappedApi
  }

  function showError(e) {
    var p = null;
    if (e instanceof Error)
     p = parseStack(e)[0];
   else
    p = e;

    $mdBottomSheet.show({
      template: require('./error-message.html'),
      locals: {
        error: {
          message: e.toString(),
          subMessage: e.subMessage || 'line: ' + p.lineNumber
        }
      },
      controller: function($scope, error) {
        $scope.error = error;
      }
    });
  }

  function stepSuccess(e) {
    try {
      var p = parseStack(e);
    } catch (err) {
      var p = [{}, {lineNumber: 1}];
      console.error('error parsing', err);
    }
    
    var lineNum = p[1].lineNumber;
    self.steps ++;
    self.emit('step', lineNum);
  }

  Emitter(this);

})
.controller('AppCtrl', function(appRunner, apps, $location, $rootScope, $mdDialog, $timeout) {
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
  vm.locAllowed = null;

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

    if(vm.Workspace && vm.Playspace) {
      setLevel(vm.level, _.isUndefined(workspace) || _.isNull(workspace));
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
    window.workspaceJSON = function() {
      return JSON.stringify({codeSpace: vm.Workspace.toJSON()});
    },
    appRunner
      .set('code', vm.Workspace.toCode);

    analyseCode(true);
    vm.Workspace.on && vm.Workspace.on('change', function() {
      analyseCode(true);

      var phase = $rootScope.$root.$$phase;
      if(phase == '$apply' || phase == '$digest')
        return;
      $rootScope.$apply();
    });
  }

  function activatePlayspace() {
    appRunner
      .set('api', vm.Playspace.api)
      .set('start', vm.Playspace.activate);
  }

  function nextLevel() {
    var level = vm.level + 1;
    if (!app.levels[level])
      level = 0;
    if (level > vm.highLevel)
      vm.highLevel = level;
    setLevel(level, true);

  }

  function setLevel(levelNum, includeWorkspace) {
    vm.level = levelNum;
    vm.locAllowed = null;
    var level = app.levels[vm.level]
    appRunner.init(level);
    appRunner.set('api', vm.Playspace.api);

    if (includeWorkspace && level && level.workspace) {
      if (!_.isUndefined(level.workspace.codeSpace))
        vm.Workspace.fromJSON(level.workspace.codeSpace);
      
    } else if (level && level.workspace) {
      vm.locAllowed = level.workspace.loc;
    }
  }

  function save() {
    //save for 60 minutes
    lscache.set(appKey, {
      workspace: vm.Workspace.toJSON(),
      highLevel: vm.highLevel,
      level: vm.level
    }, 60);
  }

  window.setLevel = function(level){
    vm.level = level;
    vm.highLevel = level;
    save();
  }

  function checkStatus() {
    
    if (vm.Playspace.failed) {
      appRunner.cancel(true);
    } else if (vm.Playspace.finished) {
      appRunner.finished();
      $timeout(function() {
        nextLevel();
      }, 1000);
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

  function finish(steps) {
    if (vm.Playspace.finish){
      vm.Playspace.finish(steps);
      checkStatus();
    }
  }

  function analyseCode(ignoreError) {
    try {
      var analysis = new Analysis(vm.Workspace.toCode());
      vm.locUsed = analysis.lloc();
    } catch (e) {
      if (ignoreError) return;
      var msg = e.toString();
      var sp = msg.split(':');
      var line = parseInt(sp[1].slice(' Line '.length));
      var message = sp[2];

      appRunner.error({
        toString: function() {
          return 'SyntaxError:' + message
        },
        lineNumber: line,
        columnNumber: null
      });
    }
    
  }

  appRunner.on('step', trace);
  appRunner.on('init', trace);
  appRunner.on('finished', finish);
  appRunner.on('stepped', checkStatus);
  appRunner.on('run', save);
  appRunner.on('run', analyseCode);
  appRunner.on('run', function() {
    if (vm.locAllowed  && vm.locUsed > vm.locAllowed) {
      appRunner.error({
        toString: function() {
          return 'Too many lines of code (LOC).'
        },
        subMessage: 'You used ' + vm.locUsed + ' lines of code. ' + vm.locAllowed + ' are allowed.'
      });
    }
  });
  
  window.onbeforeunload = save;

  var interval = setInterval(save, 5000);
  $rootScope.$on('$stateChangeStart', function() {
    clearInterval(interval);
    
    appRunner.off('step', trace);
    appRunner.off('init', trace);
    appRunner.off('stepped', checkStatus);
    appRunner.off('run', save);
    appRunner.off('finished', finish);
    appRunner.off('run', analyseCode);
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