var Blockly = require('castle-blockly');


Blockly.Blocks['frogjump_jump'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("jump(");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]), "ITEM");
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Pick up the item from the dropdown menu');
  }
};

Blockly.JavaScript['frogjump_jump'] = function(block) {
  var dropdown_item = block.getFieldValue('ITEM');
  var code = 'jump("' + dropdown_item + '");\n';
  return code;
};