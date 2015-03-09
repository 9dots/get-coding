
/**
 * Modules
 */


var gulp = require('gulp');

var browserifyTask = require('gulp-browserify-bundle-task');
var bowerCssTask = require('gulp-bower-css-task');
var serverTask = require('gulp-server-task');
var linkTasks = require('gulp-link-tasks');
var link = linkTasks.link;
var unlink = linkTasks.unlink;
var rmdir = linkTasks.rmdir;
var mkdir = linkTasks.mkdir;


var PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Tasks
 */

//enables lib and pages shortcuts
gulp.task('unlink', unlink('lib', 'apps').from('node_modules'));
gulp.task('link', link('lib', 'apps').to('node_modules'));

// create public dir
gulp.task('rimraf-public', rmdir('public'));
gulp.task('public', ['rimraf-public'], mkdir('public'));

gulp.task('assets', ['public'], link('assets', 'bower_components').watch(!PRODUCTION).to('public'));

gulp.task('bower-css', ['public'], bowerCssTask({devMode: !PRODUCTION}));

// Dev

gulp.task('browserify', ['public', 'link'], browserifyTask({devMode: !PRODUCTION, entry: './apps/main'}));

gulp.task('build', ['browserify', 'bower-css', 'assets']);
gulp.task('dev', ['build'], serverTask('app.js'));




/////////////////
// Generators  //
/////////////////

var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inquirer = require('inquirer');
var _ = require('lodash');
var colors = require('colors');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

gulp.task('create-app', function(done) {
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'name:'}, // Get app name from arguments by default
    {type: 'input', name: 'playspace', message: 'playspace:'},
    {type: 'input', name: 'workspace', message: 'workspace:'},
    {type: 'input', name: 'title', message: 'title:'},
    {type: 'input', name: 'description', message: 'description:'},
    {type: 'input', name: 'author', message: 'author:'}

  ],
  function (answers) {
    console.log(template(answers));
    gulp.src(__dirname + '/.templates/app/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict('./apps/'  + answers.name))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./apps/' + answers.name))                   // Without __dirname here = relative to cwd
      .on('finish', function () {
        console.log('[' + 'getCoding'.green + ']', 'Add `require(\'apps/' + answers.name + '\')` to apps/main/index.js and you are good to go.')
        done();                                // Finished!
      });
  });
});

gulp.task('create-playspace', function(done) {
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'name:'}
  ],
  function (answers) {
    answers.upperName = answers.name[0].toUpperCase() + answers.name.slice(1);
    var dest = './lib/playspace-' + answers.name
    gulp.src(__dirname + '/.templates/playspace/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict(dest))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest(dest))                   // Without __dirname here = relative to cwd
      .on('finish', function () {
        console.log('[' + 'getCoding'.green + ']', 'Your new playspace can be found at', dest);
        done();                                // Finished!
      });
  });
});

gulp.task('create-workspace', function(done) {
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'name:'}
  ],
  function (answers) {
    answers.upperName = answers.name[0].toUpperCase() + answers.name.slice(1);
    var dest = './lib/workspace-' + answers.name
    gulp.src(__dirname + '/.templates/workspace/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict(dest))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest(dest))                   // Without __dirname here = relative to cwd
      .on('finish', function () {
        console.log('[' + 'getCoding'.green + ']', 'Your new workspacespace can be found at', dest);
        done();                                // Finished!
      });
  });
});