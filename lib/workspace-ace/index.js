var name = module.exports = 'workspace-ace';

require('ajaxorg/ace-builds:/src-noconflict/ace.js')

var ace = window.ace;
angular.module(name, [])
.directive('workspaceAce', function() {
  return {
    restrict: 'A',
    link: function workspaceAceLink(scope, elem, attrs, ctrl) {
      var editor = ace.edit(elem[0]);
      var session = editor.getSession();
      ctrl.activate(session);
    },

    controller: function(appRunner) {
      var vm = this;

      vm.activate = activate;

      function activate(session) {
        appRunner.codeFn(function() {
          return session.getValue();
        });


        //XXX clean all this up its ugly
        session.setValue(localStorage.getItem('workspace-ace') || '');

        setInterval(function() {
          localStorage.setItem('workspace-ace', session.getValue());
        }, 5000);

        appRunner.on('run', function() {
          localStorage.setItem('workspace-ace', session.getValue());
        });

        window.onbeforeunload = function() {
          localStorage.setItem('workspace-ace', session.getValue());
        }
      }

    }
  };
})


