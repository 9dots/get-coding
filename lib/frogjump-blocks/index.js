var Blockly = require('castle-blockly');


Blockly.Blocks['crossriver_pickup'] = {
  init: function() {
    this.setColour(180);
    this.appendDummyInput()
        .appendField("jump(");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["0", 0], ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5]]), "ITEM");
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Jump the frog with the specified number');
  }
};

Blockly.JavaScript['crossriver_pickup'] = function(block) {
  var dropdown_item = block.getFieldValue('ITEM');
  var code = 'jump("' + dropdown_item + '");\n';
  return code;
};