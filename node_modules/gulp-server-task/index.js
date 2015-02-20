/**
 * Modules
 */
var livereload = require('gulp-livereload');
var child_process = require('child_process');
var errorHandler = require('gulp-error-handler')('Uncaught Exception');

var app;

/**
 * Exports
 */
module.exports = startApp;


/**
 * Start up file server and livereload server
 */
function startApp(entry) {
  return function(cb) {
    livereload.listen();

    app = child_process.fork(entry);

    app.on('message', function(msg) {
      if(msg === 'listening')
        cb && cb();
    });

    process.on('uncaughtException', function(errs) {
      app && app.kill();
      // Sometimes we throw an arary of errors,
      // so normalize that case
      [].concat(errs).forEach(function(err) {
        // Don't print out jshint error stacks
        errorHandler(err);
      });
      process.exit(-1);
    });
  }
}




