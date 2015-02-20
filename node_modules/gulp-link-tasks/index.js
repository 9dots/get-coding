/**
 * Modules
 */
var fs = require('fs');
var rimraf = require('rimraf');
var _ = require('lodash');
var path = require('path');
var livereload = require('gulp-livereload');

/**
 * Exports
 */

exports.link = link;
exports.unlink = unlink;
exports.mkdir = mkdir;
exports.rmdir = rmdir;

function link() {
  var watch = false;
  var sources = _.toArray(arguments);
  return {
    watch: function(bool) {
      watch = bool;
      return this;
    },
    to: function(dest) {
      return function() {
        sources.forEach(function(source) {
          fs.symlinkSync(path.resolve(source), dest + '/' + source, 'dir');
        });
      }
    }
  }
}

function unlink() {
  var links = _.toArray(arguments);
  return {
    from: function(dir) {
      links.forEach(function(link) {
        try {
          fs.unlinkSync(dir + '/' + link);
        } catch(e) {
          if(e.code !== 'ENOENT')
            throw e;
        }
      });
    }
  }
}

function mkdir(dir) {
  return function() {
    try {
      fs.mkdirSync(dir);
    } catch(e) {

    }
  }
}

function rmdir(dir) {
  return function(cb) {
    rimraf('./' + dir, cb);
  }
}



