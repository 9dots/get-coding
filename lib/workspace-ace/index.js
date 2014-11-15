var name = module.exports = 'workspace-ace';

require('ajaxorg/ace-builds:/src-noconflict/ace.js')
require('ajaxorg/ace-builds:/src-noconflict/mode-javascript.js')
var ace = window.ace;

var JSMode = ace.require("ace/mode/javascript").Mode;

angular.module(name, [])
.directive('workspaceAce', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, ctrl) {
      elem.attr('id', 'workspace-ace');
      var editor = ace.edit(elem[0]);

      editor.setFontSize(22);
      editor.setHighlightActiveLine(false);
      editor.setHighlightGutterLine(false);

      var session = editor.getSession();
      //session.setUseWorker(false); //disable syntax checking
      session.setMode(new JSMode());

      var App = scope.App;
      var Workspace = ctrl;

      Workspace.activate(session);
      App.add(Workspace);

    },
    controller: function(appRunner) {
      var vm = this;

      vm.activate = activate;
      vm.toJSON = toJSON;
      vm.fromJSON = fromJSON;
      vm.toCode = toCode;


      function activate(session) {
        vm.session = session;
      }

      function toJSON() {
        return vm.session.getValue();
      }

      function fromJSON(json) {
        vm.session.setValue(json);
      }

      function toCode() {
        return toJSON();
      }
    }
  };
})


