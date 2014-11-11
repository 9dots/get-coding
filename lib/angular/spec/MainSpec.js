var main = require('lib/main');

describe('test test', function() {
  it('is a test of tests', function() {
    main;
    throw new Error('this is an error');
  });
});