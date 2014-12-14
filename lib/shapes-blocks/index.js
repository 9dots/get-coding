var Blockly = require('castlejs/blockly');

Blockly.Blocks['shapes_circle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("CIRCLE");
    this.appendDummyInput()
        .appendField("      left")
        .appendField(new Blockly.FieldTextInput("100"), "left")
        .appendField("    width")
        .appendField(new Blockly.FieldTextInput("100"), "width");
    this.appendDummyInput()
        .appendField("      top")
        .appendField(new Blockly.FieldTextInput("100"), "top")
        .appendField("  height")
        .appendField(new Blockly.FieldTextInput("100"), "height");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['shapes_circle'] = function(block) {
  var text_left = block.getFieldValue('left');
  var text_top = block.getFieldValue('top');
  var text_width = block.getFieldValue('width');
  var text_height = block.getFieldValue('height');
  // TODO: Assemble JavaScript into code variable.
  var code = "circle(" + text_left + ", " + text_top + ", " + text_width + ", " + text_height + ");\n";
  return code;
};

Blockly.Blocks['shapes_rectangle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("RECTANGLE");
    this.appendDummyInput()
        .appendField("      left")
        .appendField(new Blockly.FieldTextInput("100"), "left")
        .appendField("    width")
        .appendField(new Blockly.FieldTextInput("100"), "width");
    this.appendDummyInput()
        .appendField("      top")
        .appendField(new Blockly.FieldTextInput("100"), "top")
        .appendField("  height")
        .appendField(new Blockly.FieldTextInput("100"), "height");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['shapes_rectangle'] = function(block) {
  var text_left = block.getFieldValue('left');
  var text_top = block.getFieldValue('top');
  var text_width = block.getFieldValue('width');
  var text_height = block.getFieldValue('height');
  // TODO: Assemble JavaScript into code variable.
  var code = "rectangle(" + text_left + ", " + text_top + ", " + text_width + ", " + text_height + ");\n";
  return code;
};

Blockly.Blocks['shapes_triangle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("TRIANGLE");
    this.appendDummyInput()
        .appendField("      left")
        .appendField(new Blockly.FieldTextInput("100"), "left")
        .appendField("    width")
        .appendField(new Blockly.FieldTextInput("100"), "width");
    this.appendDummyInput()
        .appendField("      top")
        .appendField(new Blockly.FieldTextInput("100"), "top")
        .appendField("  height")
        .appendField(new Blockly.FieldTextInput("100"), "height");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['shapes_triangle'] = function(block) {
  var text_left = block.getFieldValue('left');
  var text_top = block.getFieldValue('top');
  var text_width = block.getFieldValue('width');
  var text_height = block.getFieldValue('height');
  // TODO: Assemble JavaScript into code variable.
  var code = "triangle(" + text_left + ", " + text_top + ", " + text_width + ", " + text_height + ");\n";
  return code;
};
