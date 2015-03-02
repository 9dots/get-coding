var Blockly = require('castle-blockly');

Blockly.Blocks['crossriver_crossriver'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField('crossRiver();');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Cross to the other side of the river');
  }
};

Blockly.JavaScript['crossriver_crossriver'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'crossRiver();\n';
};

Blockly.Blocks['crossriver_dropoff'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField('dropOff();');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Drop off items in your boat');
  }
};

Blockly.JavaScript['crossriver_dropoff'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'dropOff();\n';
};

Blockly.Blocks['crossriver_pickup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("pickUp(");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["\"chicken\"", "chicken"], ["\"grain\"", "grain"], ["\"fox\"", "fox"]]), "ITEM");
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Pick up the item from the dropdown menu');
  }
};

Blockly.JavaScript['crossriver_pickup'] = function(block) {
  var dropdown_item = block.getFieldValue('ITEM');
  var code = 'pickUp("' + dropdown_item + '");\n';
  return code;
};