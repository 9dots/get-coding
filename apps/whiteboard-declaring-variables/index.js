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
        "board": {
          "directions": "In the code panel to the left, create two variables called animal and toy. Give them the correct values based on the sentence on the board. Press the run button when you are ready to check your code.",
          "drawing": "drawn_dog",
          "paragraph": "The dog plays with the ball.",
          "variables": ["animal", "toy"], 
          "values": ["dog", "ball"], 
          "help": "In the white space on the left, type the black text from the board. Instead of question marks, type the word from the sentence that matches the name of the variable. Make sure you put quotation marks (\" \") around this word."
        }
      }, 
      {
        "board": {
          "directions": "In the code panel to the left, create a variable called action. Give them the correct values based on the sentence on the board. Press the run button when you are ready to check your code.",
          "drawing": "drawn_dog",
          "paragraph": "The dog chases the ball.",
          "variables": ["action"], 
          "values": ["chases"], 
          "help": "In the white space on the left, type the black text from the board. Instead of question marks, type the word from the sentence that matches the name of the variable. Make sure you put quotation marks (\" \") around this word."
        }
      }



    ] // specify levels here
  });
}]);
