var Blockly = require('castlejs/blockly');

Blockly.Blocks['start'] = {
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Start")
    this.setNextStatement(true);
    this.setMovable(false);
    this.setDeletable(false);
    this.setEditable(false);
  }
};

Blockly.JavaScript['start'] = function(block) {
  return '\n';
};

Blockly.Blocks['spaceman_move'] = {
  // Block for moving forward.
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField('move();');
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
        .appendField('rotate();');
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
        .appendField('getPart();');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('spaceman picks up part');
  }
};

Blockly.JavaScript['spaceman_get'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'getPart();\n';
};

Blockly.Blocks['spaceman_if'] = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("conditional")
        .setCheck("Null")
        .appendField("If (");
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("statement");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.appendDummyInput()
        .appendField("}")
  }
};

Blockly.JavaScript['spaceman_if'] = function(block) {
  var value_conditional = Blockly.JavaScript.statementToCode(block, 'conditional');
  var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');

  var code = 'if (' + value_conditional + ') {\n' + statements_statement + '}';
  return code;
};

Blockly.Blocks['spaceman_while'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
      .appendField("While (")
    this.appendValueInput("condition")
      .setCheck("Null")
    this.appendDummyInput()
        .appendField(") {");
    this.appendStatementInput("statement");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.appendDummyInput()
      .appendField("}");
  }
};

Blockly.JavaScript['spaceman_while'] = function(block) {
  var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');
  var value_conditional = Blockly.JavaScript.statementToCode(block, 'condition');

  var code = 'while (' + value_conditional + ') {\n' + statements_statement + '}';
  return code;
};


Blockly.Blocks['spaceman_pathRight'] = {
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField("pathRight()");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_pathRight'] = function(block) {
  return 'pathRight()';
};

Blockly.Blocks['spaceman_pathLeft'] = {
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField("pathLeft()");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_pathLeft'] = function(block) {
  return 'pathLeft()';
};

Blockly.Blocks['spaceman_notOnPart'] = {
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField("notOnPart()");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_notOnPart'] = function(block) {
  return 'notOnPart()';
};

Blockly.Blocks['spaceman_moreParts'] = {
  init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField("moreParts()");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_moreParts'] = function(block) {
  return 'moreParts()';
};

Blockly.Blocks['define_function'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("function")
        .appendField(new Blockly.FieldTextInput("functionName"), "functionName")
        .appendField("()");
    this.appendStatementInput("toExecute");
  }
};

Blockly.JavaScript['define_function'] = function(block) {
  var text_functionname = block.getFieldValue('functionName');
  var statements_toexecute = Blockly.JavaScript.statementToCode(block, 'toExecute');
  var code = 'function ' + text_functionname + '(){\n ' + statements_toexecute + '}';
  return code;
};

Blockly.Blocks['call_function'] = {
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("functionName"), "functionName")
        .appendField("();");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['call_function'] = function(block) {
  var text_functionname = block.getFieldValue('functionName');
  var code = text_functionname + '();';
  return code;
};