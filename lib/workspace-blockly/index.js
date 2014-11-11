var name = module.exports = 'workspace-blockly';

var Blockly = require('castlejs/blockly');

angular.module(name, [])
.directive('workspaceBlockly', function() {
  return {
    restrict: 'A',
    transclude: true,
    link: function workspaceAceLink(scope, elem, attrs, ctrl, transcludeFn) {
      Blockly.inject(elem[0], {toolbox: transcludeFn()[1]});
      ctrl.activate();
    },

    controller: function(appRunner) {
      var vm = this;

      vm.activate = activate;

      function activate() {
        appRunner.codeFn(function() {
          var code = Blockly.JavaScript.workspaceToCode()
          return code;
        });

        if (localStorage.getItem('workspace-blockly')) {
          var saved = localStorage.getItem('workspace-blockly');
          var xml = Blockly.Xml.textToDom(saved);
          Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);

          //var xml = Blockly.Xml.textToDom(localStorage.getItem('workspace-blockly'));
          //Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
        }
        

        function save() {
          var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
          localStorage.setItem('workspace-blockly', Blockly.Xml.domToText(xml));
        }

        setInterval(save, 5000);
        appRunner.on('run', save);
        window.onbeforeunload = save;
      }

    }
  };
})