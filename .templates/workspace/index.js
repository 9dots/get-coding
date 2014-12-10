var name = module.exports = 'workspace-{{name}}';

var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('workspace{{upperName}}', workspace{{upperName}});


function workspace{{upperName}}() {
  var directive = {
    restrict: 'A',
    link: linkFunc,
    controller: workspace{{upperName}}Ctrl
  };

  return directive;

  function linkFunc(scope, elem, attrs, ctrl) {
    var App = scope.App;
    var Workspace = ctrl;
    App.add(Workspace);

    Workspace.activate();
  }

}

function workspace{{upperName}}Ctrl() {
  var vm = this;

  vm.activate = activate;
  vm.toJSON = toJSON;
  vm.fromJSON = fromJSON;
  vm.toCode = toCode;


  // implement workspace api below
  function activate(session) {
  }

  function toJSON() {
  }

  function fromJSON(json) {
  }

  function toCode() {
  }

}


