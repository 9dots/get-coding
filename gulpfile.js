
var fs = require('fs');
var path = require('path');
var join = path.join;
var extname = path.extname;
var child_process = require('child_process');

var Batch = require('batch');


var gulp = require('gulp');
var symlink = require('gulp-symlink');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inquirer = require('inquirer');
var _ = require('lodash');
var colors = require('colors');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var Duo = require('duo');
var Watcher = require('duo-watch');

var lr = require('tiny-lr');

var build = write();
var buildAndRestart = write(function(entries) {
  setTimeout(function() {
    console.log('reload');
    reload(entries);
  }, 500);
});

Error.stackTraceLimit = Infinity;

var outRelative = 'public';

var options = {
  watch: false,
  dev: process.env.NODE_ENV === 'production' ? false : true,
  outRelative: outRelative,
  out: join(__dirname, outRelative),
  root: __dirname,
  entries: ['index.js', 'index.css']
}

console.log('options dev', options.dev);

gulp.task('unlink-lib', unlink);

gulp.task('public', makePublic);

  /**
 * enable `lib/...` requires shortcut
 */
gulp.task('link-lib', ['unlink-lib'], link);


gulp.task('app', function(fn) {
  options.watch = true;
  buildAndStartApp(options.entries);
});


gulp.task('build', ['public', 'assets'], function() {
  build(options.entries);
});

gulp.task('dev', ['public', 'assets', 'link-lib'], function() {
  startApp();
  startReloadServer();
  options.watch = true;
  buildAndRestart(options.entries);
});

gulp.task('assets', ['public'], function() {
  return gulp.src(['assets/**'])
    .pipe(gulp.dest('public'));
});

/////////////////
// Generators  //
/////////////////

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

/////////
// Duo //
/////////


function create(entry, cb) {
  return Duo(options.root)
    .entry(entry)
    .development(options.dev)
    .copy(!options.dev)
    .buildTo(options.outRelative)
}

function write(onWrite) {
  function _write(entries) {
    entries = [].concat(entries);

    var batch = new Batch;
    var push = batch.push.bind(batch);

    var duos = entries
      .map(multiple)
      .map(push);

    batch.end(function(err) {
      if (err) return error(err);

      options.watch && watch(write)
      onWrite && onWrite(entries);
    });

    function multiple(entry) {
      return function(done) {
        create(entry).run(function(err, src) {
          if (err) {
            console.log('build error', err);
            return done();
          }
          var out = join(options.out, 'build' + extname(entry));
          fs.writeFileSync(out, src);
          var len = Buffer.byteLength(src);
          console.log('wrote %dkb to %s', len / 1024 | 0, path.basename(out));
          done();
        });
      };
    }
  }

  var watching = false;
  function watch(action) {
    if (watching) return;
    watching = true;
    Watcher(options.root, 'lib/boot/index.js').watch(_write)
  }

  return _write;
}




////////////
// Reload //
////////////


var server = null;

function startReloadServer() {
  server = lr();
  server.listen(35729);
}

function reload() {
  server.changed({
    body: {
      files: ['/build.js', '/build.css']
    }
  });
}


//////////
// App  //
//////////

var app = null;
function startApp(cb) {
  if(app) {
    app.kill();
    setTimeout(function() {
      reload('server');
    }, 500);
  }

  app = child_process.fork('app.js');

  app.on('message', function(msg) {
    if(msg === 'listening')
      cb && cb();
  });
}


//////////////////
// Folder setup //
//////////////////

function makePublic() {
  try {
    fs.mkdirSync('public');
  } catch(e) {

  }
}

function link() {
  return gulp.src('lib')
    .pipe(symlink('node_modules'));
}

function unlink() {
  try {
    fs.unlinkSync('node_modules/lib');
  } catch(e) {
    if(e.code !== 'ENOENT')
      throw e;
  }
}



process.on('uncaughtException', function(err) {
  app && app.kill();
  // Don't print out jshint error stacks
  if(err.stack.indexOf('JSHint') === -1)
    console.error(err.stack);
  process.exit(-1);
});