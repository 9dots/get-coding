var name = module.exports = 'workspace-ace';

require('ajaxorg/ace-builds:/src-noconflict/ace.js')
require('ajaxorg/ace-builds:/src-noconflict/mode-javascript.js')
var $ = require('components/jquery@1.11');
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
      editor.setShowPrintMargin(false);

      var session = editor.getSession();
      console.log('session', session);
      //session.setUseWorker(false); //disable syntax checking
      session.setMode(new JSMode());

      var App = scope.App;
      var Workspace = ctrl;

      Workspace.activate(session);
      App.add(Workspace);



      // resizing
      function resize() {
        editor.resize();
      }

      setTimeout(resize);
      $(window).on('resize', resize)
      scope.$on('$destroy', function() {
        $(window).off('resize', resize);
      })

    },
    controller: function(appRunner) {
      var vm = this;

      vm.activate = activate;
      vm.toJSON = toJSON;
      vm.fromJSON = fromJSON;
      vm.toCode = toCode;
      vm.trace = trace;


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

      function trace(lineNum) {
        console.log('line num', lineNum)
      }
    }
  };
})


