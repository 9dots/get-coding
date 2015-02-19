/**
 * Exports
 */
var name = module.exports = 'fridge-variable-expressions';


/**
 * Module
 */
var module = angular.module(name, [
  'ui.router', 
  require('lib/code-app'), 
  require('lib/workspace-ace'), 
  require('lib/playspace-fridge')
]);

/**
 * Styles
 */
require('./index.css');

module
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: [
      {"playspace":{
        "directions": "DIRECTIONS: We have created four variables called word1, word2, word3 and word4. These variables each contain a different word. We have also created a variable called drawing1, but it does not contain a word yet. In the code panel, set drawing1 equal to the word variable that matches the drawing.",
        "help":"In this exercise, we don't want you to just type in the word. We want you to set drawing1 equal to the word magnet on the fridge that matches the drawing. Which magnet on the fridge has the right word in it? Type the name of that variable to the right of the equal sign in the code panel.", 
        "hint": "You CANNOT type var drawing1 = \"book\". You have to set drawing1 equal to the magnet that has the word \"book\" in it. Which of the magnets contains the word \"book\"? Type that word to the right of the equal sign in the code panel.",
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
        "codeSpace": "var drawing1 = word;"
      }
    }, 
    {"playspace":{
        "directions": "DIRECTIONS: We have created seven variables. Each variable contains a different word. We have also created two variables called drawing1 and drawing2, but they do not contain words yet. In the code panel, set drawing1 and drawing2 equal to the word variables that match their drawings.",
        "help":"In this exercise, we don't want you to just type in the words. We want you to set drawing1 and drawing2 equal to the word magnets on the fridge that match their drawings. Which magnets on the fridge have the right words? Type the names of those variables to the right of the equal signs in the code panel.", 
        "hint": "You CANNOT type var drawing1 = \"fire\" and var drawing2 = \”house\” You have to set them equal to the magnets that have the words \"fire\"  and \”book\” in them. Which of the magnets contains those words? Type them to the right of the equal signs in the code panel.",
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
        "codeSpace": "var drawing1 = word;\nvar drawing2 = word;"
      }
    },
    {"playspace":{
        "directions": "DIRECTIONS: We have created ten variables in the magnets on the fridge. Each variable contains a different word. We have also created three variables called drawing1, drawing2, and drawing3, but they do not contain words yet. In the code panel, set drawing1, drawing2 and drawing3 equal to the word variables that match their drawings.",
        "help":"In this exercise, we don't want you to just type in the words. We want you to set drawing1, drawing2 and drawing3 equal to the word magnets on the fridge that match their drawings. Which magnets on the fridge have the right words? Type the names of those variables to the right of the equal signs in the code panel.", 
        "hint": "You CANNOT type var drawing1 = \"shoe\" . You have to set them equal to the magnet that has the word \"shoe\" in it. Which of the magnets contains that word? Type it to the right of the equal sign after drawing1 in the code panel. Then do the same thing for the other two drawing variables.",
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
        "codeSpace": "var drawing1 = word;\nvar drawing2 = word;\nvar drawing3 = word;"
      }
    },
    {"playspace":{
        "directions": "DIRECTIONS: Now things get a little tricky. You can set drawing1 and drawing 2 like you did in the previous exercises, but drawing3 is different. It needs you to combine two of the magnets to get the proper name. Using the + sign,  you can combine the words from TWO magnets to make a compound word!",
        "help":"Do you know what the drawing3 is? Do you see a magnet with that word in it? Do you see two magnets that could be joined to form the word that describes drawing3? Join those two words in the code panel with a + sign to create a longer word.", 
        "hint": "drawing3 is a jellyfish. Since no magnet has that word in it, you have to combine the magnets with the words jelly and fish in them. To do this, we use the + sign.",
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
        "codeSpace": "var drawing1 = word;\nvar drawing2 = word;\nvar drawing3 = word + word;"
      }
    },
    {"playspace":{
        "directions": "DIRECTIONS: Now we’ll continue to practice combining variables. drawing1 will only need one magnet, but drawing2 and drawing 3 will each need two. All drawings will have one word in common. Using the + sign, combine the words from TWO magnets to make a compound word for drawing2 and drawing3.",
        "help":"Do you know what drawing2 and drawing3 are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing2 and drawing3? Join those two words in the code panel with a + sign to create a longer word.", 
        "hint": "You will use the same magnet from drawing1 in all the variables. drawing2 is a seahorse and drawing3 is a horseshoe. Combine the variables with the words sea and horse for drawing2, and the variables with the words horse and shoe for drawing3.",
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
        "codeSpace": "var drawing1 = ;\nvar drawing2 = ;\nvar drawing3 = ;"
      }
    },
    {"playspace":{
        "directions": "DIRECTIONS: Now all three drawings will require you to combine two words. All the drawings will use the same second word. Using the + sign, combine the words from TWO magnets to make a compound word for the drawing variables.",
        "help":"Do you know what all the drawings are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing1, drawing2 and drawing3? Join those words in the code panel with a + sign to create a longer word.", 
        "hint": "Every drawing is a kind of ball used in a sport. So, for each drawing, the second word will be ball. What will the first word be for each drawing? Combine the right first word with the second word, ball, to name each drawing.",
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
        "codeSpace": "var drawing1 = ;\nvar drawing2 = ;\nvar drawing3 = ;"
      }
    }, {"playspace":{
        "directions": "DIRECTIONS: Now all three drawings will require you to combine two words. In this level, all the drawings will use the same first word. Using the + sign, combine the words from TWO magnets to make a compound word for the drawing variables.",
        "help":"Do you know what all the drawings are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing1, drawing2 and drawing3? Join those words in the code panel with a + sign to create a longer word.", 
        "hint": "Every drawing has something in common. They all have a first word of snow. What will the second word be for each drawing? Using the + sign, combine the variable that contains the word snow with another variable that matched the different drawings.",
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
        "codeSpace": ""
      }
    }, {"playspace":{
        "directions": "DIRECTIONS: All three drawings will require you to combine two words. Some drawings will share a word, others will not. Using the + sign, combine the words from TWO magnets to make a compound word for the drawing variables.",
        "help":"Do you know what all the drawings are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing1, drawing2 and drawing3? Join those words in the code panel with a + sign to create a longer word.", 
        "hint": "drawing1 is a hotdog, drawing2 is a doghouse, and drawing3 is a starfish. To name them, use the + sign to combine the variables that contain the words that make up that drawing's name.",
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
        "codeSpace": ""
      }
    }, {"playspace":{
        "directions": "DIRECTIONS: All three drawings will require you to combine two words. Some drawings will share a word, others will not. Using the + sign, combine the words from TWO magnets to make a compound word for the drawing variables.",
        "help":"Do you know what all the drawings are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing1, drawing2 and drawing3? Join those words in the code panel with a + sign to create a longer word.", 
        "hint": "drawing1 is a flashlight, drawing2 is a lighthouse, and drawing3 is a mailbox. To name them, use the + sign to combine the variables that contain the words that make up that drawing’s name.",
        "drawings": [
          {"id": "drawing1",
            "class": "flashlight", 
            "labelid": "label1", 
            "answer": "flash^light^"
          },
          {"id": "drawing2",
            "class": "lighthouse", 
            "labelid": "label2", 
            "answer": "light^house^"
          },
          {"id": "drawing3",
            "class": "mailbox", 
            "labelid": "label3", 
            "answer": "mail^box^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "nail"
          }, {
            "name": "word2", 
            "value": "flash"
          },{
            "name": "word3", 
            "value": "way"
          },{
            "name": "word4", 
            "value": "mail"
          }, {
            "name": "word5", 
            "value": "horse"
          }, {
            "name": "word6", 
            "value": "house"
          },{
            "name": "word7", 
            "value": "box"
          }, {
            "name": "word8", 
            "value": "house"
          }, {
            "name": "word9", 
            "value": "shoe"
          },{
            "name": "word10", 
            "value": "light"
          }]
      }, "workspace":{
        "codeSpace": ""
      }
    }, {"playspace":{
        "directions": "DIRECTIONS: All three drawings will require you to combine two words. None of these drawings will share any words. Using the + sign, combine the words from TWO magnets to make a compound word for the drawing variables.",
        "help":"Do you know what all the drawings are? Do you see any magnets with those words in them? Do you see any magnets that could be joined to form the words that describe drawing1, drawing2 and drawing3? Join those words in the code panel with a + sign to create a longer word.", 
        "hint": "drawing1 is a toothbrush, drawing2 is a firework, and drawing3 is a skateboard. To name them, use the + sign to combine the variables that contain the words that make up that drawing’s name.",
        "drawings": [
          {"id": "drawing1",
            "class": "toothbrush", 
            "labelid": "label1", 
            "answer": "tooth^brush^"
          },
          {"id": "drawing2",
            "class": "firework", 
            "labelid": "label2", 
            "answer": "fire^work^"
          },
          {"id": "drawing3",
            "class": "skateboard", 
            "labelid": "label3", 
            "answer": "skate^board^"
          }
        ], 
        "variables": [
          {
            "name": "word1", 
            "value": "board"
          }, {
            "name": "word2", 
            "value": "string"
          },{
            "name": "word3", 
            "value": "work"
          },{
            "name": "word4", 
            "value": "tooth"
          }, {
            "name": "word5", 
            "value": "star"
          }, {
            "name": "word6", 
            "value": "skate"
          },{
            "name": "word7", 
            "value": "fish"
          }, {
            "name": "word8", 
            "value": "friend"
          }, {
            "name": "word9", 
            "value": "fire"
          },{
            "name": "word10", 
            "value": "brush"
          }]
      }, "workspace":{
        "codeSpace": ""
      }
    }

    ] // specify levels here
  });
}]);
