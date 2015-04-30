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
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "words": ["goo"],
            "position": "up"
          }, 
          {
            "words": ["loo"],
            "position": "up"
          }
        ], 
        "workspace": {
          "codeSpace": ""
        }
      }, 
      {
        "level": 2,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["goo"],
            "position": "up"
          }, 
          {
            "words": ["loo"],
            "position": "down"
          }
        ], 
        "workspace": {
          "codeSpace": ""
        }
      }, 
      {
        "level": 3,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["foo"],
            "position": "down"
          }, 
          {
            "words": ["foo", "goo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 4,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "words": ["loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 5,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
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
        "gates": [
          {
            "words": ["foo", "goo"],
            "position": "up"
          },
          {
            "words": ["foo", "loo"],
            "position": "down"
          }, 
          {
            "words": ["goo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 7,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
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
        "gates": [
          {
            "words": ["foo", "loo"],
            "position": "up"
          },
          {
            "words": ["foo", "goo"],
            "position": "up"
          }, 
          {
            "words": ["foo", "goo", "loo"],
            "position": "down"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 9,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["goo", "loo"],
            "position": "down"
          }, 
          {
            "words": ["foo", "goo"],
            "position": "up"
          },
          {
            "words": ["boo", "foo", "goo"],
            "position": "up"
          }
        ],
        "workspace": {
          "codeSpace": ""
        }
      },
      {
        "level": 10,
        "gates": [
          {
            "words": ["foo"],
            "position": "down"
          },
          {
            "words": ["foo", "loo"],
            "position": "up"
          }, 
          {
            "words": ["foo", "goo"],
            "position": "up"
          },
          {
            "words": ["foo", "goo", "loo"],
            "position": "down"
          },
          {
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
