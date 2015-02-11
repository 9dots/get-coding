var name = module.exports = 'whiteboard-review';

angular.module(name, [
  'ui.router',
  require('/lib/code-app'),
  require('/lib/workspace-ace'),
  require('/lib/playspace-whiteboard-review')
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
          "level": 1,
          "board": {
            "directions": "Computers remember pieces of information in boxes called variables. Let's tell the computer to remember the word \"happy\". Make a variable called `adjective1` and put the value `\"happy\"` inside.",
            "variables": ["adjective1"],
            "values": ["happy"],
            "showValues":[null],
            "answer": "",
            "help": "To make a variable, we use the keyword `var`. The next word will be the name of the variable which is like the label on box. Then we use the `=` to tell the computer what to put in the box. In this case, we want to put the word `\"happy\"` inside the variable.",
            "hint": "In the code panel, type the following line: `var adjective1 = \"happy\";`"
          }
        },
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "playspace": {
          "level": 2,
          "board": {
            "directions": "Great! When you go to a new level, the computer erases the variables you saved before. Before we save our variable agian, let's create two more. Under your first line, make adjective2 with a value of \"sad\", and adjective3 with a value of \"angry\".",
            "variables": ["adjective1", "adjective2", "adjective3"],
            "values": ["happy", "sad", "angry"],
            "showValues":["happy", null, null],
            "answer": "",
            "help": "To make a variable, we use the keyword var. The next word will be the name of the variable which is like the label on box. Then we use the = to tell the computer what to put in the box. In this step, we need to declare TWO variables.",
            "hint": "Starting on line 2, type: \nvar adjective2 = \"sad\";\n and on line 3, type: var adjective3 = \"angry\";"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy\";"
        }
      },
      {
        "playspace": {
          "level": 3,
          "board": {
            "directions": "OK! I think that's enough adjectives. Now let's save some animals. Under your adjectives, create a variable called animal1 and give it a value of \"cat\".",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1"],
            "values": ["happy", "sad", "angry", "cat"],
            "showValues":["happy", "sad", "angry", null],
            "answer": "",
            "help": "To make a variable, we use the keyword var. The next word will be the name of the variable which is like the label on box. Then we use the = to tell the computer what to put in the box.",
            "hint": "On line 4 in the code panel, type the following: \nvar animal1= \"cat\";"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy\";\nvar adjective2 = \"sad\";\nvar adjective3 = \"angry\";"
        }
      },
      {
        "playspace": {
          "level": 4,
          "board": {
            "directions": "Now let's add two more animals. We'll need to make a few more variables. Make animal2 and put \"bird\" inside it, then make animal3 a put \"bear\" inside it.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3"],
            "values": ["happy", "sad", "angry", "cat", "bird", "bear"],
            "showValues":["happy", "sad", "angry", "cat", null, null],
            "answer": "",
            "help": "To make a variable, we use the keyword var. The next word will be the name of the variable which is like the label on box. Then we use the = to tell the computer what to put in the box.",
            "hint": "Starting on line 5, type \nvar animal2 = \"bird\";\n and on line 6, type var animal3 = \"bear\";"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy\";\nvar adjective2 = \"sad\";\nvar adjective3 = \"angry\";\nvar animal1 = \"cat\";"
        }
      },
      {
        "playspace": {// up to here.
          "level": 5,
          "board": {
            "directions": "THE NEXT STEP IS TRICKY! Look at the picture on the screen. Now create a variable called onScreen and have it get its value by telling it which adjective and which animal box to combine using the + sign.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy", "sad", "angry", "cat", "bird", "bear"],
            "showValues":["happy", "sad", "angry", "cat", "bird", "bear"],
            "answer": "happy^cat^^",
            "help": "First we need to make a variable with var and give it the name onScreen. Then we can just tell the computer to combine the words in adjective1 and animal1 by using the + sign.",
            "hint": "Since the screen shows a happy cat, we want to combine adjective1, \"happy\", and animal1, \"cat\". Starting on line 7, type var onScreen = adjective1 + animal1;"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy\";\nvar adjective2 = \"sad\";\nvar adjective3 = \"angry\";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";"
        }
      },
      {
        "playspace": {// up to here.
          "level": 6,
          "board": {
            "directions": "That looks pretty good, but do you notice that in onScreen, there's no space between happy and cat? Let's put one in. We can do this by adding a space between the -y in happy and the last quotation mark.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy ", "sad", "angry", "cat", "bird", "bear"],
            "showValues":["happy ", "sad", "angry", "cat", "bird", "bear", "happycat"],
            "answer": "happy ^cat^^",
            "help": "There's no space because the computer is just combinging the letters in happy with the letters in cat. Since there is no space written between the quotation marks, the computer doesn't add one. If we want a space, we need to add it in adjective1.",
            "hint": "To add the space, go to line 1 of your code and change \"happy\"; to \"happy \"; by adding a blank space between the y and the \"."
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy\";\nvar adjective2 = \"sad\";\nvar adjective3 = \"angry\";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";\nvar onScreen = adjective1 + animal1;"
        }
      },
      {
        "playspace": {// up to here.
          "level": 7,
          "board": {
            "directions": "That looks much better! Now let's do the same thing for our other two adjectives. Add a space after sad and angry.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy ", "sad ", "angry ", "cat", "bird", "bear"],
            "showValues":["happy ", "sad", "angry", "cat", "bird", "bear", "happy cat"],
            "answer": "happy ^cat^^",
            "help": "If we were to combine the words in adjective1 or adjective2 with one of the animals, there would be no space between the words because we never typed one. If we type a space though, when joined, the words will have a space between them.",
            "hint": "To add the spaces, go to line 2 of your code and change \"sad\"; to \"sad \"; by adding a blank space between the d and the \". Then do the same for angry on line 3."
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy \";\nvar adjective2 = \"sad\";\nvar adjective3 = \"angry\";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";\nvar onScreen = adjective1 + animal1;"
        }
      },
      {
        "playspace": {// up to here.
          "level": 8,
          "board": {
            "directions": "OK! Now we've changed the picture on the screen. Change the variable names in line 7 to match the new picture of a sad bear.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy ", "sad ", "angry ", "cat", "bird", "bear"],
            "showValues":["happy ", "sad ", "angry ", "cat", "bird", "bear", "happy cat"],
            "answer": "sad ^bear^^",
            "help": "We've changed the picture, so now we have to change the animal and adjective we put into the onScreen variable. Which adjective and animal should go into the onScreen variable on line 7 now?",
            "hint": "Since the picture shows a sad bear, we want to combine adjective2 and animal3. Change line 7 from var onScreen = adjective1 + animal1; to var onScreen = adjective2 + animal3;"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy \";\nvar adjective2 = \"sad \";\nvar adjective3 = \"angry \";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";\nvar onScreen = adjective1 + animal1;\n"
        }
      },
      {
        "playspace": {// up to here.
          "level": 9,
          "board": {
            "directions": "Great! We're almost finished here. Here's one last picture. Change the variable names in line 7 to match the picture now on the screen.",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy ", "sad ", "angry ", "cat", "bird", "bear"],
            "showValues":["happy ", "sad ", "angry ", "cat", "bird", "bear", "sad bear"],
            "answer": "angry ^bird^^",
            "help": "We've changed the picture again, so now we have to change the animal and adjective we put into the onScreen variable. Which adjective and animal should go into the onScreen variable on line 7 now?",
            "hint": "Since the picture shows an angry bird, we want to combine adjective3 and animal2. Change line 7 from var onScreen= adjective2 + animal3; to var onScreen= adjective3 + animal2;"
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy \";\nvar adjective2 = \"sad \";\nvar adjective3 = \"angry \";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";\nvar onScreen = adjective2 + animal3;"
        }
      },
      {
        "playspace": {// up to here.
          "level": 10,
          "board": {
            "directions": "Great job! You now know how to make variables, save information and combine saved information in new variables! Now you can play around. Change the onScreen variable to see all animals with all the different emotions!",
            "variables": ["adjective1", "adjective2", "adjective3", "animal1", "animal2", "animal3", "onScreen"],
            "values": ["happy ", "sad ", "angry ", "cat", "bird", "bear"],
            "showValues":["happy ", "sad ", "angry ", "cat", "bird", "bear", "angry bird"],
            "answer": "",
            "help": "Change the adjective and animal variable names in the line 7 to see the different animals.",
            "hint": "Try changing the numbers at the end of the adjective and animal variables on line 7 then pressing the red run button."
          }
        },
        "workspace": {
          "codeSpace": "var adjective1 = \"happy \";\nvar adjective2 = \"sad \";\nvar adjective3 = \"angry \";\nvar animal1 = \"cat\";\nvar animal2 = \"bird\";\nvar animal3 = \"bear\";\nvar onScreen = adjective3 + animal2;"
        }
      }







    ] // specify levels here
  });
}]);
