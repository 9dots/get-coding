/**
 * Exports
 */
var name = module.exports = 'fire-and-ice';

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
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["goo"],
            "position": "down"
          }
        ], 
        "workspace": {
          "codeSpace": ""
        }, 
        "directions": {
          "dialogText": "Say the magic words in the right order to get all the gates open and destroy the obstacles with fire and ice spells."
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      }, 
      {
        "level": 2,
        "obstacles": [
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["goo"],
            "position": "down"
          }, 
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }
        ], 
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      }, 
      {
        "level": 3,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type":"obstacle", 
            "words": ["ice"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 4,
        "obstacles": [
          {
            "type": "gate",
            "words": ["boo", "foo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 5,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo", "loo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          }, 
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["foo", "goo", "loo"], 
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right.",
        "quiz": [
          {
            "database": "https://getcoding1a2.firebaseio.com/", 
            "questionId": "", 
            "text": "", 
            "a": "",
            "b": "",
            "c": "",
            "d": ""
          }
        ]
      
      },
      {
        "level": 6,
        "obstacles": [
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo", "loo"],
            "position": "up"
          }, 
          {
            "type":"gate", 
            "words": ["loo"], 
            "position": "down"
          },
          {
            "type":"obstacle", 
            "words": ["ice"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 7,
        "obstacles": [
          {
            "type": "gate",
            "words": ["boo", "foo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["boo", "goo"],
            "position": "down"
          }, 
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["boo", "foo", "goo"], 
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 8,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type":"obstacle", 
            "words": ["ice"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["foo"], 
            "position": "down"
          },
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 9,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["goo", "loo"], 
            "position": "up"
          },
          {
            "type":"obstacle", 
            "words": ["ice"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 10,
        "obstacles": [
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type":"gate", 
            "words": ["goo"], 
            "position": "down"
          },
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["boo", "foo", "goo"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 11,
        "obstacles": [
          {
            "type": "obstacle",
            "words": ["fire"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["boo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "type":"gate", 
            "words": ["goo"], 
            "position": "down"
          },
          {
            "type":"gate", 
            "words": ["boo", "foo", "goo"], 
            "position": "down"
          },
          {
            "type":"obstacle", 
            "words": ["ice"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      },
      {
        "level": 12,
        "obstacles": [
          {
            "type": "gate",
            "words": ["boo", "goo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["boo", "foo", "loo"],
            "position": "up"
          }, 
          {
            "type": "obstacle",
            "words": ["ice"],
            "position": "down"
          }, 
          {
            "type":"gate", 
            "words": ["foo", "goo", "loo"], 
            "position": "up"
          },
          {
            "type":"gate", 
            "words": ["boo", "foo", "goo"], 
            "position": "down"
          },
          {
            "type":"obstacle", 
            "words": ["fire"], 
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }, 
        "mission":"When the wizard says a word, all gates with that word written on them will open or close. The wizard can also destroy any unblocked obstacles by using fire(); and ice();", 
        "tools": "You can call any function that appears on a gate- like foo, goo, etc- but make sure to add parentheses and a semicolon- foo();  Fire can be destroyed with ice(); and ice can be destroyed with fire();",
        "tips": "Try one gate at a time. Type the function in the code panel and press the step forward button. Then add another line of code and test it in the same way. Once the gates are open, destroy the fire and ice obstacles in order from left to right."
      
      }
    ] // specify levels here
  });
}]);
