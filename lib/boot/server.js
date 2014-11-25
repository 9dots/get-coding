/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express()
  , path = require('path')
  , fs = require('fs')
  , _ = require('lodash')
  , path = require('path');

app.configure(function() {
  app.set('view engine', 'ejs');
});

app.use(require('lib/error'));

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.use(express.favicon(path.resolve(__dirname + '/../favicon/favicon.ico')));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('*', function(req, res, next) {
  if(req.url === '/' || _.find(req.accepted, {value: 'text/html'})) {
    res.render('index', {
      title: 'getCoding',
      config: require('lib/config')
    });
  } else
    next();
});

fs.readdirSync('lib').forEach(function(file) {
  var module = path.join('lib', file);
  if(module !== 'lib/boot' && fs.statSync(module).isDirectory() && fs.existsSync(path.join(module, 'package.json'))) {
    var json = require(path.join(module, 'package.json'));
    if(json.main) require(module);
  }
});


