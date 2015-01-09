var name = module.exports = 'whiteboard-declaring-variables';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-whiteboard')
])
.config(['appsProvider', function(appsProvider) {
  appsProvider.register({
    data: require('./package.json'),
    workspace: require('./workspace.html'),
    playspace: require('./playspace.html'),
    help: require('./README.md'),
    levels: [
      {
        "playspace": {
          "board": {
            "directions": "In the code panel, I've declared a variable called animal. Now YOU give it a value! Find the word in the sentence on the board that is an animal and type it between the quotation marks (\" \") in the code panel. Then press RUN (the red play button).",
            "drawing": "drawn_dog",
            "paragraph": "The dog plays.",
            "variables": ["animal"], 
            "values": ["dog"], 
            "help": "The word you type MUST have quotation marks (\" \") on both sides! If you've done it correctly, the word will be green. If it's black, you're missing one or two quotation marks. Otherwise, make sure it's spelled correctly and there are no extra spaces.", 
            "hint": "Which of the three words in the sentence is an animal? Is \'The\' an animal? Is \'plays\' an animal? Is \'dog\' an animal?"
          }
        },
        "workspace": {
          "codeSpace": "var animal= \"\";"
        }
      }, 
      {
        "playspace": {
          "board": {
            "directions": "Now I've added two more variables called action and toy. Give them the correct values from the new sentence on the board, then press RUN to check your work.",
            "drawing": "drawn_dog",
            "paragraph": "The dog chases the ball.",
            "variables": ["animal", "action", "toy"], 
            "values": ["dog", "chases", "ball"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": "var animal= \"dog\";\nvar action= \"\";\nvar toy= \"\";"
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "OK! Here's a new sentence and two new variables called noun and verb. In the code panel to the left, give them the correct values from the sentence on the board, then press RUN to check your  work.",
            "drawing": "drawn_cat",
            "paragraph": "The cat sits.",
            "variables": ["noun", "verb"], 
            "values": ["cat", "sits"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": "var noun= \"\";\nvar verb= \"\";"
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "Now that you're getting the hang of it, I'm going to make you do more work! I've declared your variables, but I have not included quotation marks (\" \") or semicolons (;). Don't forget them as you give the new variables their values!",
            "drawing": "drawn_cat",
            "paragraph": "The cat is black.",
            "variables": ["animal", "color"], 
            "values": ["cat", "black"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": "var animal=\nvar color= "
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "OK! This one should be easy. If you forget what nouns or adjectives are, ask for help at the bottom of the screen. And don't forget those quotations marks and semicolons!",
            "drawing": "drawn_dog",
            "paragraph": "The dog is fast.",
            "variables": ["noun", "adjective"], 
            "values": ["dog", "fast"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": "var noun= \nvar adjective="
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "Alright. This is the last one where I'll write any of your code for you. After this level, you'll have to write everything yourself, so pay attention as you give values to these three variables. Remember quotation marks and semicolons!",
            "drawing": "drawn_dog",
            "paragraph": "Lucy is a sweet dog.",
            "variables": ["petName", "animal", "adjective"], 
            "values": ["Lucy", "dog", "sweet"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": "var name= \nvar animal=\nvar adjective="
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "From here on out, you'll be writing all the code yourself. On each line, type var, followed by a space, the name of the variable, and an equals sign (=). Then add the value from the sentence with quoation marks around it and finish each line with a semicolon.",
            "drawing": "drawn_cat",
            "paragraph": "Mr. Wiggles is a happy cat.",
            "variables": ["properNoun", "noun", "adjective"], 
            "values": ["Mr. Wiggles", "cat", "happy"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "You're doing great! Just keep declaring the variables from the board and giving them values from the sentence. Make sure you type everything exactly as it's spelled.",
            "drawing": "drawn_henry",
            "paragraph": "Henry holds the leash.",
            "variables": ["properNoun", "noun", "verb"], 
            "values": ["Henry", "leash", "holds"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "Now that you've done three, let's do four! Just keep declaring the variables from the board and giving them values from the sentence. Make sure you type everything exactly as it's spelled.",
            "drawing": "drawn_dog",
            "paragraph": "Lucy chases the yellow ball.",
            "variables": ["properNoun", "noun", "adjective", "verb"], 
            "values": ["Lucy", "ball", "yellow", "chases"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "playspace": {
          "board": {
            "directions": "Almost finished! This is the last level. Just declare the five variables from the board and give them values from the sentence. Make sure you type everything exactly as it's spelled.",
            "drawing": "drawn_maria",
            "paragraph": "Maria gives her cat a big present for his birthday.",
            "variables": ["properNoun", "animal", "adjective", "verb", "event"], 
            "values": ["Maria", "cat", "big", "gives", "birthday"], 
            "help": "", 
            "hint": ""
          }
        },
        "workspace": {
          "codeSpace": ""
        }
      }



    ] // specify levels here
  });
}]);
