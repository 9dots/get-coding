var Blockly = require('castlejs/blockly');


Blockly.Blocks['spaceman_move'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField('move');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('move spaceman forward');
  }
};

Blockly.JavaScript['spaceman_move'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'move();\n';
};

Blockly.Blocks['spaceman_rotate'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField('rotate');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('rotate spaceman');
  }
};

Blockly.JavaScript['spaceman_rotate'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'rotate();\n';
};

Blockly.Blocks['spaceman_get'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField('getPart');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('spaceman picks up part');
  }
};

Blockly.JavaScript['spaceman_get'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'get();\n';
};