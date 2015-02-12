var name = module.exports = 'workspace-blockly';

var Blockly = require('castlejs/blockly');
var Emitter = require('component/emitter');
var _ = require('lodash/lodash');

angular.module(name, [])
.directive('workspaceBlockly', function() {
  return {
    restrict: 'A',
    transclude: true,
    link: function(scope, elem, attrs, ctrl, transcludeFn) {
      elem.attr('id', 'workspace-blockly');
      Blockly.inject(elem[0], {toolbox: transcludeFn()[1]});
      var App = scope.App;
      var Workspace = ctrl;
      App.add(Workspace);
      Workspace.activate(Blockly.getMainWorkspace());
    },

    controller: function($scope, appRunner) {
      Emitter(this);

      var vm = this;

      $scope.blocks = [{name:'spaceman_move', id:1}];

      vm.activate = activate;
      vm.toJSON = toJSON
      vm.fromJSON = fromJSON
      vm.toCode = toCode;
      vm.trace = trace;
      vm.validate = validate;

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
        var startBlock = '<block type="start" id="6" deletable="false" movable="false" editable="false" x="150" y="144">'
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
      };

      function validate(a) {
        var topBlocks = this.workspace.topBlocks_;

        _.each(topBlocks, function(block){
          if (block.previousConnection) {
            var err = new Error('Unattached block.');
            err.subMessage = 'Did you mean to connect it to start block?';
            throw err;
          }
        });
      };
    }
  }
});