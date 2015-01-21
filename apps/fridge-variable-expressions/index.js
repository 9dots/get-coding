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
            "labelid": "label1", 
            "answer": "book^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "horse"
          }, {
            "name": "word2", 
            "value": "book"
          },{
            "name": "word3", 
            "value": "shoe"
          },{
            "name": "word4", 
            "value": "sea"
          }]
      }, "workspace":{
        "codespace": "var drawing1= word"
      }
    }, 
    {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "fire", 
            "labelid": "label1", 
            "answer": "fire^"
          }, 
          {"id": "drawing2",
            "class": "house", 
            "labelid": "label2", 
            "answer": "house^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "string"
          }, {
            "name": "word2", 
            "value": "star"
          },{
            "name": "word3", 
            "value": "fire"
          },{
            "name": "word4", 
            "value": "fish"
          }, {
            "name": "word5", 
            "value": "house"
          }, {
            "name": "word6", 
            "value": "ship"
          },{
            "name": "word7", 
            "value": "friend"
          }]
      }, "workspace":{
        "codespace": "var drawing1= word\nvar drawing2= word"
      }
    },
    {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "shoe", 
            "labelid": "label1", 
            "answer": "shoe^"
          },
          {"id": "drawing2",
            "class": "star", 
            "labelid": "label2", 
            "answer": "star^"
          },
          {"id": "drawing3",
            "class": "box", 
            "labelid": "label3", 
            "answer": "box^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "space"
          }, {
            "name": "word2", 
            "value": "wreck"
          },{
            "name": "word3", 
            "value": "box"
          },{
            "name": "word4", 
            "value": "back"
          }, {
            "name": "word5", 
            "value": "shoe"
          }, {
            "name": "word6", 
            "value": "pack"
          },{
            "name": "word7", 
            "value": "bath"
          }, {
            "name": "word8", 
            "value": "tub"
          }, {
            "name": "word9", 
            "value": "robe"
          },{
            "name": "word10", 
            "value": "star"
          }]
      }, "workspace":{
        "codespace": "var drawing1= word\nvar drawing2= word\nvar drawing3= word"
      }
    },
    {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "fish", 
            "labelid": "label1", 
            "answer": "fish^"
          },
          {"id": "drawing2",
            "class": "jelly", 
            "labelid": "label2", 
            "answer": "jelly^"
          },
          {"id": "drawing3",
            "class": "jellyfish", 
            "labelid": "label3", 
            "answer": "jelly^fish^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "case"
          }, {
            "name": "word2", 
            "value": "fish"
          },{
            "name": "word3", 
            "value": "brief"
          },{
            "name": "word4", 
            "value": "stair"
          }, {
            "name": "word5", 
            "value": "camp"
          }, {
            "name": "word6", 
            "value": "jelly"
          },{
            "name": "word7", 
            "value": "work"
          }, {
            "name": "word8", 
            "value": "home"
          }, {
            "name": "word9", 
            "value": "day"
          },{
            "name": "word10", 
            "value": "birth"
          }]
      }, "workspace":{
        "codespace": "var drawing1= word;\nvar drawing2= word;\nvar drawing3= word + word;"
      }
    },
    {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "horse", 
            "labelid": "label1", 
            "answer": "horse^"
          },
          {"id": "drawing2",
            "class": "seahorse", 
            "labelid": "label2", 
            "answer": "sea^horse^"
          },
          {"id": "drawing3",
            "class": "horseshoe", 
            "labelid": "label3", 
            "answer": "horse^shoe^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "shoe"
          }, {
            "name": "word2", 
            "value": "tooth"
          },{
            "name": "word3", 
            "value": "horse"
          },{
            "name": "word4", 
            "value": "hair"
          }, {
            "name": "word5", 
            "value": "skate"
          }, {
            "name": "word6", 
            "value": "snow"
          },{
            "name": "word7", 
            "value": "food"
          }, {
            "name": "word8", 
            "value": "hot"
          }, {
            "name": "word9", 
            "value": "sea"
          },{
            "name": "word10", 
            "value": "note"
          }]
      }, "workspace":{
        "codespace": "var drawing1= ;\nvar drawing2= ;\nvar drawing3= ;"
      }
    },
    {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "football", 
            "labelid": "label1", 
            "answer": "foot^ball^"
          },
          {"id": "drawing2",
            "class": "baseball", 
            "labelid": "label2", 
            "answer": "base^ball^"
          },
          {"id": "drawing3",
            "class": "basketball", 
            "labelid": "label3", 
            "answer": "basket^ball^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "bowl"
          }, {
            "name": "word2", 
            "value": "cut"
          },{
            "name": "word3", 
            "value": "ball"
          },{
            "name": "word4", 
            "value": "man"
          }, {
            "name": "word5", 
            "value": "basket"
          }, {
            "name": "word6", 
            "value": "flake"
          },{
            "name": "word7", 
            "value": "base"
          }, {
            "name": "word8", 
            "value": "rain"
          }, {
            "name": "word9", 
            "value": "dog"
          },{
            "name": "word10", 
            "value": "foot"
          }]
      }, "workspace":{
        "codespace": "var drawing1= ;\nvar drawing2= ;\nvar drawing3= ;"
      }
    }, {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "snowball", 
            "labelid": "label1", 
            "answer": "snow^ball^"
          },
          {"id": "drawing2",
            "class": "snowman", 
            "labelid": "label2", 
            "answer": "snow^man^"
          },
          {"id": "drawing3",
            "class": "snowflake", 
            "labelid": "label3", 
            "answer": "snow^flake^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "flake"
          }, {
            "name": "word2", 
            "value": "soft"
          },{
            "name": "word3", 
            "value": "mail"
          },{
            "name": "word4", 
            "value": "house"
          }, {
            "name": "word5", 
            "value": "ball"
          }, {
            "name": "word6", 
            "value": "box"
          },{
            "name": "word7", 
            "value": "light"
          }, {
            "name": "word8", 
            "value": "man"
          }, {
            "name": "word9", 
            "value": "finger"
          },{
            "name": "word10", 
            "value": "snow"
          }]
      }, "workspace":{
        "codespace": ""
      }
    }, {"playspace":{
        "directions": "These are the directions.",
        "help":"This is the help.", 
        "hint": "This is the hint.",
        "drawings": [
          {"id": "drawing1",
            "class": "hotdog", 
            "labelid": "label1", 
            "answer": "hot^dog^"
          },
          {"id": "drawing2",
            "class": "doghouse", 
            "labelid": "label2", 
            "answer": "dog^house^"
          },
          {"id": "drawing3",
            "class": "starfish", 
            "labelid": "label3", 
            "answer": "star^fish^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "star"
          }, {
            "name": "word2", 
            "value": "sand"
          },{
            "name": "word3", 
            "value": "dog"
          },{
            "name": "word4", 
            "value": "flash"
          }, {
            "name": "word5", 
            "value": "fish"
          }, {
            "name": "word6", 
            "value": "house"
          },{
            "name": "word7", 
            "value": "high"
          }, {
            "name": "word8", 
            "value": "horse"
          }, {
            "name": "word9", 
            "value": "hot"
          },{
            "name": "word10", 
            "value": "sea"
          }]
      }, "workspace":{
        "codespace": ""
      }
    }

    ] // specify levels here
  });
}]);
