var name = module.exports = 'strings';

angular.module(name, [
  'ui.router', 
  require('/lib/code-app'), 
  require('/lib/workspace-ace'), 
  require('/lib/playspace-strings')
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
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["cat", "happy", "a house", "cat food", ""],
              "showValues":[],
              "answer": null, 
              "drawings": []
            }, 
            "help": {
                "Directions": "##STEP ONE DIRECTIONS \n\nWe're going to make a simple Mad Lib, which is a story that allows you to change certain words. First, let's create four variables for the words in our story that will be changeable. Create the following variables: \n\n`animal` with a value of `\"cat\"`, \n\n`adjective` with a value of `\"happy\"`, \n\n`place` with a value of `\"a house\"`, and \n\n`food` with a value of `\"cat food\"`", 
                "Hint": "##STEP ONE HINT \n\nYour first line should look like this: \n\n `var animal = \"cat\";` \n\n The next three lines will follow the same pattern but with the different variable names and values given in the directions.", 
            }
          },
          "workspace": {
            "codeSpace": ""
          }
        },{
          "playspace": {
            "level": 2,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["cat", "happy", "a house", "cat food", "Once there was a "],
              "showValues":["cat", "happy", "a house", "cat food"],
              "answer": "Once there was a ^", 
              "drawings": []
            }, 
            "help": {
              "Directions": "##STEP TWO DIRECTIONS \n\nGood work! Now let's start our story! \n\nCreate a variable called `story` and give it a value of `\"Once there was a \"`. Don't forget the space after the last a!",
              "Hint": "##STEP TWO HINT \n\nDon't erase any of the variables you made before! Under them, on line 5, create the `story` variable by typing: \n\n`var story = \"Once there was a \";` \n\nMake sure you type it exactly as it looks above!",
            }
          },
          "workspace": {
            "codeSpace": "var animal = \"cat\";\nvar adjective = \"happy\";\nvar place = \"a house\";\nvar food = \"cat food\";"
          }
        }, {
          "playspace": {
            "level": 3,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["cat", "happy", "a house", "cat food"],
              "showValues":["cat", "happy", "a house", "cat food", "Once there was a "],
              "answer": "Once there was a cat^^", 
              "drawings": ["angrycat", "happycat"]
            }, 
            "help": {
              "Directions": "##STEP THREE DIRECTIONS \n\nGreat! Now we'll add our animal to the story. \n\nAfter `\"Once there was a \"`, use the `+` sign to add `animal` to the story. By typing `animal`, you are telling the computer to go to the `animal` variable, get the word inside, and add it to the story.",
              "Hint": "##STEP THREE HINT \n\nIn line 5, before the semicolon ( ; ), type `+ animal`. If you're typed it correctly, you're line 5 should like like this: \n\n `var story = \"Once there was a \" + animal;`",
            }
          },
          "workspace": {
            "codeSpace": "var animal = \"cat\";\nvar adjective = \"happy\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \";"
          }
        }, {
          "playspace": {
            "level": 4,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["cat", "happy", "a house", "cat food"],
              "showValues":["cat", "happy", "a house", "cat food", "Once there was a cat"],
              "answer": "Once there was a cat^ who was happy^^", 
              "drawings": ["happycat"]
            }, 
            "help": {
              "Directions": "##STEP FOUR DIRECTIONS \n\nFantastic! Now our story has a main character. Let's add our adjective. You may notice that the story line is spilling over to the next line. That's fine! You can continue to add to it. \n\n After `animal`, use the `+` to add the string `\" who was \"` then use another `+` to add `adjective`. \n\nMake sure you put spaces before `who` and after `was`!",
              "Hint": "##STEP FOUR HINT \n\nIn line 6, before the semicolon ( ; ), type `+ \" who was \" + adjective`. If you've typed it correctly, you're line 5 should like like this: \n\n `var story = \"Once there was a \" + `\n\n `animal + \" who was \" + adjective;`",
            }
          },
          "workspace": {
            "codeSpace": "var animal = \"cat\";\nvar adjective = \"happy\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \" + \nanimal;"
          }
        }, {
          "playspace": {
            "level": 5,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["bear", "sad", "a house", "cat food"],
              "showValues":["cat", "happy", "a house", "cat food", "Once there was a cat who was happy"],
              "answer": "Once there was a bear^ who was sad^^", 
              "drawings": ["sadbear"]
            }, 
            "help": {
              "Directions": "##STEP FIVE DIRECTIONS \n\nWonderful! Now we've got our story started. But what if we wanted to change the story to be about a sad bear? It's easy! \n\nIn line 1, change `\"cat\"` to `\"bear\"`, and in line 2, change `\"happy\"` to `\"sad\"`.",
              "Hint": "##STEP FIVE HINT \n\nWe want to change the values in `animal` and `adjective` to `\"bear\"` and `\"sad\"`. \n\nIf you've done this correctly, your first two lines should now look like this: \n\n`var animal = \"bear\"` \n\n`var adjective = \"sad\"`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"cat\";\nvar adjective = \"happy\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective;"}
        }, {
          "playspace": {
            "level": 6,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["bear", "sad", "a house", "cat food"],
              "showValues":["bear", "sad", "a house", "cat food", "Once there was a bear who was sad"],
              "answer": "Once there was a bear^ who was sad^ because it lived in a house^^", 
              "drawings": ["sadbear", "ahouse"]
            }, 
            "help": {
              "Directions": "##STEP SIX DIRECTIONS \n\nOK! Time to give our story a setting. \n\nYou will need to create a new line in your code panel after `adjective` for this. \n\nBefore the semicolon ( ; ), use the `+` to add the string `\" because it lived in \"` and another `+` to add `place`. Don't forget the spaces in that string!",
              "Hint": "##STEP SIX HINT \n\nIn line 6, before the semicolon ( ; ), press ENTER to create a new line with the semicolon on it. \n\nNow before the semicolon on line 7, type `+ \" because it lived in \" + place`. Lines 5-7 should look like this: \n\n`var story = \"Once there was a \" + `\n\n`animal + \" who was \" + adjective`\n\n` + \" because it lived in \" + place;`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"bear\";\nvar adjective = \"sad\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective;"}
        }, {
          "playspace": {
            "level": 7,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["bear", "sad", "a house", "cat food"],
              "showValues":["bear", "sad", "a house", "cat food", "Once there was a bear who was sad because it lived in a house"],
              "answer": "Once there was a bear^ who was sad^ because it lived in a house^ and only ate cat food^^", 
              "drawings": ["sadbear", "ahouse", "catfood"]
            }, 
            "help": {
              "Directions": "##STEP SEVEN DIRECTIONS \n\nGreat! Now we know where the bear lives! Let's say what he eats.\n\nOnce again, you will need to create a new line in your code panel after `place`. \n\nBefore the semicolon ( ; ), on line 8, use `+` to add the string `\" and only ate \"` and another `+` to add `food`. Don't forget the spaces in that string!",
              "Hint": "##STEP SEVEN HINT \n\nIn line 7, before the semicolon ( ; ), press ENTER to create a new line with the semicolon on it. \n\nNow before the semicolon on line 8, type `+ \" and only ate \" + food`. Lines 5-8 should look like this: \n\n`var story = \"Once there was a \" + `\n\n`animal + \" who was \" + adjective`\n\n` + \" because it lived in \" + place`\n\n`+ \" and only ate \" + food;`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"bear\";\nvar adjective = \"sad\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective \n+ \" because it lived in \" + place;"}
        }, {
          "playspace": {
            "level": 8,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["bird", "angry", "New York", "hot dogs"],
              "showValues":["bear", "sad", "a house", "cat food", "Once there was a bear who was sad because it lived in a house and only ate cat food"],
              "answer": "Once there was a bird^ who was angry^ because it lived in New York^ and only ate hot dogs^^", 
              "drawings": ["angrybird", "hotdogs", "NewYork"]
            }, 
            "help": {
              "Directions": "##STEP EIGHT DIRECTIONS \n\nWell, now we know why the bear is so sad! Let's change this story! \n\nChange the strings in the first four variables, to `\"bird\"`, `\"angry\"`, `\"New York\"`, and `\"hot dogs\"`.",
              "Hint": "##STEP EIGHT HINT \n\n To change the story, we will change the words stored in our first four variables. Change `\"bear\"` to `\"bird\"`, `\"sad\"` to `\"angry\"`, `\"a house\"` to `\"New York\"`, and `\"cat food\"` to `\"hot dogs\"`. \n\nWhen you are finished, your first four lines should look like this: \n\n`var animal = \"bird\";`\n\n`\nvar adjective = \"angry\";`\n\n`\nvar place = \"New York\";`\n\n`\nvar food = \"hot dogs\";`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"bear\";\nvar adjective = \"sad\";\nvar place = \"a house\";\nvar food = \"cat food\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective \n+ \" because it lived in \" + place \n+ \" and only ate \" + food;"}
        }, {
          "playspace": {
            "level": 9,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["bird", "angry", "New York", "hot dogs"],
              "showValues":["bird", "angry", "New York", "hot dogs", "Once there was a bird who was angry because it lived in New York and only ate hot dogs"],
              "answer": "Once there was a bird^ who was angry^ because it lived in New York^ and only ate hot dogs^.^", 
              "drawings": ["angrybird", "hotdogs", "NewYork"]
            }, 
            "help": {
              "Directions": "##STEP NINE DIRECTIONS \n\nWe're almost done! There's only one thing this story needs. What do all sentences end with? \n\nLet's add a period. In line 8, between `food` and `;`use `+` to add `\".\"` to the end of our story.",
              "Hint": "##STEP NINE HINT \n\nThis step is pretty easy. On line 8, after `food`, just type `+ \".\"` \n\n You're finshed code should look like this: \n\n`var story = \"Once there was a \" + `\n\n`animal + \" who was \" + adjective`\n\n` + \" because it lived in \" + place`\n\n`+ \" and only ate \" + food + \".\";`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"bird\";\nvar adjective = \"angry\";\nvar place = \"New York\";\nvar food = \"hot dogs\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective \n+ \" because it lived in \" + place \n+ \" and only ate \" + food;"}
        }, {
          "playspace": {
            "level": 10,
            "board": {
              "variables": ["animal", "adjective", "place", "food", "story"],
              "values": ["cat", "happy", "space", "cake"],
              "showValues":["bird", "angry", "New York", "hot dogs", "Once there was a bird who was angry because it lived in New York and only ate hot dogs."],
              "answer": "Once there was a cat^ who was happy^ because it lived in space^ and only ate cake^.^", 
              "drawings": ["happycat", "happybird", "happybear", "sadcat", "sadbird", "sadbear", "angrycat", "angrybird", "angrybear", "space", "NewYork", "ahouse", "cake", "hotdogs", "catfood"]
            }, 
            "help": {
              "Directions": "##STEP TEN DIRECTIONS \n\nYou did it! You've created a Mad Lib! To show you the possibilities, let's make our story a little weirder! \n\nMake the story about a `\"happy\"` `\"cat\"`, who lives in `\"space\"` and eats `\"cake\"`! \n\nAfter you've done that, you can customize your story by setting the variables to any of the values we've used so far. ",
              "Hint": "##STEP TEN HINT \n\nTo change the story, we will change the words stored in our first four variables. Change `\"bird\"` to `\"cat\"`, `\"angry\"` to `\"happy\"`, `\"New York\"` to `\"space\"`, and `\"hot dogs\"` to `\"cake\"`. \n\nWhen you are finished, your first four lines should look like this: \n\n`var animal = \"cat\";`\n\n`\nvar adjective = \"happy\";`\n\n`\nvar place = \"space\";`\n\n`\nvar food = \"cake\";`",
            }
          },
          "workspace": {
            "codeSpace":"var animal = \"bird\";\nvar adjective = \"angry\";\nvar place = \"New York\";\nvar food = \"hot dogs\";\nvar story = \"Once there was a \" + \nanimal + \" who was \" + adjective \n+ \" because it lived in \" + place \n+ \" and only ate \" + food + \".\";"}
        }
    ] // specify levels here
  });
}]);
