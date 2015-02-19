
/**
 * Modules
 */
var Blockly = require('castle-blockly');
var Emitter = require('component-emitter');

/**
 * Exports
 */
var name = module.exports = 'workspace-blockly';

/**
 * Styles
 */
require('./index.css');

angular.module(name, [])
.directive('workspaceBlockly', function() {
  return {
    restrict: 'A',
    transclude: true,
    link: function(scope, elem, attrs, ctrl, transcludeFn) {
      elem.attr('id', 'workspace-blockly');
      Blockly.inject(elem[0], {toolbox: transcludeFn()[1], path: './assets/'});
      var App = scope.App;
      var Workspace = ctrl;
      App.add(Workspace);
      Workspace.activate(Blockly.getMainWorkspace());
      
    },

    controller: function(appRunner) {
      Emitter(this);

      var vm = this;

      vm.activate = activate;
      vm.toJSON = toJSON
      vm.fromJSON = fromJSON
      vm.toCode = toCode;
      vm.trace = trace;

      Blockly.JavaScript.STATEMENT_PREFIX = '/*blockId:%1*/';
      

      function activate(workspace) {
        vm.workspace = workspace;
        var canvas = workspace.svgBlockCanvas_;
        Blockly.bindEvent_(canvas, 'blocklyWorkspaceChange', null, function() {
          vm.emit('change');
        });
      }

      function toCode() {
        return Blockly.JavaScript.workspaceToCode();
      }

      function toJSON() {
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        return Blockly.Xml.domToText(xml)
      }

      function fromJSON(json) {
        Blockly.mainWorkspace.clear();
        var xml = Blockly.Xml.textToDom(json);
        Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
      };

      function trace(lineNum) {
        Blockly.mainWorkspace.traceOn(true);
        if (lineNum === undefined) {
          Blockly.mainWorkspace.highlightBlock(null);
          return;
        }
        var code = Blockly.JavaScript.workspaceToCode();
        var lines = code.split('\n');
        var blockId = lines[lineNum - 1].match(/\/\*blockId\:\'(\d+)\'\*\//)[1];
        Blockly.mainWorkspace.highlightBlock(blockId);
      }

    }
  };
})