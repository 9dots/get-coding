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
        }
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
        }
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
        }
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
            "words": ["foo", "goo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 5,
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
        }
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
        }
      },
      {
        "level": 7,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo", "loo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["foo", "goo"],
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
        }
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
            "words": ["boo", "foo", "goo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 9,
        "obstacles": [
          {
            "type": "gate",
            "words": ["boo", "goo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "loo"],
            "position": "down"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["boo", "foo", "goo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 10,
        "obstacles": [
          {
            "type": "gate",
            "words": ["foo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["foo", "loo"],
            "position": "up"
          }, 
          {
            "type": "gate",
            "words": ["foo", "goo"],
            "position": "up"
          },
          {
            "type": "gate",
            "words": ["foo", "goo", "loo"],
            "position": "down"
          },
          {
            "type": "gate",
            "words": ["boo", "foo", "loo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      }
    ] // specify levels here
  });
}]);
