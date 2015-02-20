/**
 * Modules
 */
var esprima = require('esprima');
var _ = require('lodash');

/**
 * Locals
 */
var nonLogicalNodes = ['Program', 'BlockStatement'];

/**
 * Exports
 */
module.exports = Analysis;

/**
 * Analysis
 */
function Analysis(code) {

  this.types = {};
  this.code = code;

  this.run();
}

Analysis.prototype.run = function() {
  var self = this;
  traverse(esprima.parse(this.code), function(node) {
    var type = node.type || node;
    if (!self.types[type])
      self.types[type] = 0;
    self.types[type] ++;
    if (type === 'VariableDeclaration')
      self.types[type] += node.declarations.length - 1;
  });
};

Analysis.prototype.lloc = function() {
  var count = 0;
  _.each(this.types, function(val, type) {
    if (nonLogicalNodes.indexOf(type) === -1) {
      count += val;
    }
  });
  return count;
};

function traverse(tree, nodeFn) {
  nodeFn(tree);
  if (_.isArray(tree.body)) {
    _.each(tree.body, function(node) {
      traverse(node, nodeFn);
    });
  } else if (tree.body) {
    traverse(tree.body, nodeFn);
  }

};






