var name = module.exports = 'fridge-variable-expressions';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-fridge')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: [
      {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "book", 
            "labelid": "label1"
          }, 
          {"id": "drawing2", 
            "class": "seahorse", 
            "labelid": "label2"
          }
        ], 
        "variables": ["word1", "word2", "word3", "word4"], 
        "values": ["horse", "book", "sea", "fish"]
      }, "workspace":{
        "codespace": ""
      }
    }

    ] // specify levels here
  });
}]);
