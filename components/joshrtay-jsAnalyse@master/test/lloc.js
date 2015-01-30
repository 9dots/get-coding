/**
 * Module dependencies
 */
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;


/**
 * Analysis Lib
 */
var Analysis = require('../');


describe('Logical line count', function() {
  var code;
  before(function() {
    code = fs.readFileSync('./test/files/code.js').toString('utf8');
  })

  it ('should count expressions, variable declartions function declarations and while statements', function() {
    var a = new Analysis(code);
    expect(a.lloc()).to.equal(9);
  })
});