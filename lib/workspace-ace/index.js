/**
 * Modules
 */
var $ = require('jquery');
var _ = require('lodash')


var Emitter = require('component-emitter');

/**
 * Exports
 */
var name = module.exports = 'workspace-ace';

/**
 * Styles
 */

require('./index.css');

angular.module(name, [])
.directive('workspaceAce', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, ctrl) {
      elem.attr('id', 'workspace-ace');
      var ace = window.ace;
      var editor = ace.edit($('.ace-editor')[0]);

      editor.setFontSize(22);
      editor.setHighlightActiveLine(false);
      editor.setHighlightGutterLine(false);
      editor.setShowPrintMargin(false);

      var session = editor.getSession();
      var JSMode = ace.require("ace/mode/javascript").Mode;
      //session.setUseWorker(false); //disable syntax checking
      session.setMode(new JSMode());
      session.setUseWrapMode(true);

      var App = scope.App;
      var Workspace = ctrl;

      Workspace.activate(session);
      App.add(Workspace);

      // resizing
      function resize() {
        editor.resize();
      }

      setTimeout(resize);
      var resizeOff = scope.$on('resize', resize);
      $(window).on('resize', resize)
      scope.$on('$destroy', function() {
        $(window).off('resize', resize);
        resizeOff();
      })
    },
    controller: function($scope, appRunner) {
      Emitter(this);

      var vm = this;

      vm.activate = activate;
      vm.toJSON = toJSON;
      vm.fromJSON = fromJSON;
      vm.toCode = toCode;
      vm.trace = trace;

      appRunner.on('apiReady', function () {
        $scope.api = appRunner.get('availableApi')
      })

      $scope.addCode = function (code) {
        let {column, row} = vm.session.getSelection().anchor
        vm.session.insert({column, row}, code + '\n')
      }

      function activate(session) {
        vm.session = session;
        session.on('change', function() {
          vm.emit('change');
          updateUsed()
        });
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

      function updateUsed () {
        $scope.apiCalls = appRunner.get('apiCalls')
        console.log($scope.apiCalls)
      }

      var lastRange = null;
      function trace(lineNum) {
        if (lastRange)
          vm.session.removeMarker(lastRange.id);
        if (lineNum)
          lastRange = vm.session.highlightLines(lineNum - 1);
       else
          lastRange = null;
      }
    },
    template: require('./index.html')
  }
})
