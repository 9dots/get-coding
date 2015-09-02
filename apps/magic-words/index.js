/**
 * Exports
 */
var name = module.exports = 'magic-words';

/**
 * Angular Module
 */
var module = angular.module(name, [
  'ui.router', 
  require('lib/code-app'), 
  require('lib/workspace-ace'), 
  require('lib/playspace-magic-words')
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
      {
        "level": 1,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["goo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["loo"],
            "position": "down"
          }
        ], 
        "workspace": {
          "codeSpace": ""
        }, 
        "directions": {
          "dialogText": "Say the magic words in the right order to get all the gates open."
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      }, 
      {
        "level": 2,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      },
      {
        "level": 3,
        "obstacles": [
          {
            "type": "gate",
            "words": ["goo", "loo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["foo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },
      {
        "level": 4,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },
      {
        "level": 5,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo", "loo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo", "loo", "boo"],
            "position": "up"

          }
        ],
        "workspace": {
          "codeSpace": ""
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way.",
        "quiz": [
          {
            "database": "https://getcoding1a2.firebaseio.com/",
            "questionId": "1a2a",
            "text": "Which answer is the correct answer?", 
            "a": "This one!", 
            "b": "No this one!", 
            "c": "You know it's actually this one.", 
            "d": "It's me!"
          }
        ]
      },
      {
        "level": 6,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["boo", "loo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["foo", "goo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },
      {
        "level": 7,
        "obstacles": [
          {
            "type": "gate",
            "words": ["doo", "foo", "loo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "goo", "moo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo", "loo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["doo", "koo", "moo"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": "", 
          "loc": 2
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },
      {
        "level": 8,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo", "koo", "goo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["goo", "loo", "moo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["doo", "foo", "moo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["boo", "foo", "goo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": "", 
          "loc": 2
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },
      {
        "level": 9,
        "obstacles": [
          {
            "type": "gate",
            "words": ["boo", "doo", "foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["doo", "foo", "goo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["boo", "doo", "foo", "goo", "koo", "moo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["foo", "goo", "koo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["goo", "koo", "moo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": "", 
          "loc": 2
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      },


      {
        "level": 10,
        "obstacles": [
          {
            "type": "gate",
            "words": ["koo", "moo", "boo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["moo", "boo", "foo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["boo", "foo", "doo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "doo", "goo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["doo", "goo", "koo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["goo", "koo", "moo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": "", 
          "loc": 3
        },
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. Have the wizard say the magic words in the right order to get all the gates open.", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way."
      
      }
    ] // specify levels here
  });
}]);
