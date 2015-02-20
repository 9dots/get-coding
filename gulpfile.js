
/**
 * Modules
 */


var gulp = require('gulp');


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

gulp.task('browserify', ['public', 'link'], browserifyTask({devMode: !PRODUCTION, entry: 'index.js'}));

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
    gulp.src(__dirname + '/.templates/app/**')  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict('./apps/'  + answers.name))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest('./apps/' + answers.name))                   // Without __dirname here = relative to cwd
      .on('finish', function () {
        console.log('[' + 'getCoding'.green + ']', 'Add `require(\'/apps/' + answers.name + '\')` to apps/main/index.js and you are good to go.')
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




/**
 * Moudles
 */

var browserify = require('browserify');
var watchify = require('watchify');

//transforms
var debowerify = require('debowerify');
var dehtmlify = require('dehtmlify');
var sassify = require('desassify');

//helpers
var _ = require('lodash');


// gulp
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var errorHandler = require('gulp-error-handler')('Browserify Error');

// gulp helpers
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var prettyHrtime = require('pretty-hrtime');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var lodash = require('lodash');

/**
 * Exports
 */

module.exports = browserifyTask;


/**
 * Browserify components task
 * 
 * @return {function} gulp task 
 */
function browserifyTask(options) {

  options = lodash.defaults(options || {}, {
    entry: './client.js', 
    outFile: 'build.js',
    outDir: './public',
    devMode: true
  });


  console.log('cwd', process.cwd(), options.entry, watchify.args);
  var bundler = browserify(options.entry, watchify.args)
    .transform(sassify, {global: true, minify: options.devMode ? false : (options.minifyCSS || {}), rewriteUrl: rewriteUrl})
    .transform(debowerify, {global: true})
    .transform(dehtmlify, {global: true});

  if (options.devMode) {
    gutil.log('Watching files required by', gutil.colors.yellow(options.entry))
    bundler = watchify(bundler)
    .on('update', bundle);
  }

  var startTime
  function bundle() {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(options.entry) + '...');
    var bundleStream = bundler.bundle()
      .on('error', function(err) {
        console.log('err', err.stack);
      })
      .pipe(source(options.outFile))
      .pipe(buffer());

    if (options.devMode) {
      bundleStream
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(options.outDir))
        .on('end', end)
        .pipe(livereload());
        
    } else {
      bundleStream
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(options.outDir))
        .on('end', end);
    }


    return bundleStream;
  }

  function end() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled',gutil.colors.green(options.entry), 'to', gutil.colors.green(options.outFile), 'in', gutil.colors.magenta(prettyTime));
  }

  function rewriteUrl(url, filePath) {
    if (url.indexOf('http://') == 0)
      return url;
    else if(url[0] !== '/') {
      url = path.relative(process.cwd(), path.join(path.dirname(filePath), url));
      if (url.indexOf('node_modules') === 0)
        url = url.slice('node_modules'.length);
    }
    url = url.slice(1);
    var data = fs.readFileSync(url);
    mkdirp.sync(options.outDir + '/' + path.dirname(url));
    fs.writeFileSync(options.outDir + '/' + url, data);
    return url;

  }

  return bundle;
}

