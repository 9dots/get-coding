var esprima = require('esprima');
var walker = require('escomplex-ast-moz');
var escomplex = require('escomplex');

function analyse(code) {
  var ast = esprima.parse(code, {loc: true});
  return escomplex.analyse(ast, walker);
}

module.exports = analyse;