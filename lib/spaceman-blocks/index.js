var Blockly = require('castle-blockly');


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
        .appendField("If");
    this.appendStatementInput("statement");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
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
    this.setColour(135);
    this.appendDummyInput()
      .appendField("While")
      .appendField(new Blockly.FieldDropdown([["notOnPart()", "notOnPart()"], ["moreParts()", "moreParts()"]]), "conditon");
    this.appendStatementInput("statement");
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
  }
};

Blockly.JavaScript['spaceman_while'] = function(block) {
  var statements_statement = Blockly.JavaScript.statementToCode(block, 'statement');
  var dropdown_condition = block.getFieldValue('conditon');
  console.log(dropdown_condition);
  // TODO: Assemble JavaScript into code variable.
  var code = 'while (' + dropdown_condition + ') {\n' + statements_statement + '}';
  return code;
};


Blockly.Blocks['spaceman_pathRight'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("pathRight");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_pathRight'] = function(block) {
  return 'pathRight()';
};

Blockly.Blocks['spaceman_pathLeft'] = {
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendField("pathLeft");
    this.setOutput(true);
  }
};

Blockly.JavaScript['spaceman_pathLeft'] = function(block) {
  return 'pathLeft()';
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