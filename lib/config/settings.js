module.exports = {
  shared: true,
  dev: false,
  prod: false,
  development: {
    dev: true,
    logger: true,
    scripts: ['http://localhost:35729/livereload.js']
  },
  ci: {
    dev: true,
  },
  staging: {
    dev: true,
  },
  production: {
    prod: true,
  },
  scripts: ['/build.js', '//cdnjs.cloudflare.com/ajax/libs/p5.js/0.3.13/p5.min.js', '/bower_components/ace-builds/src-min-noconflict/ace.js', '/bower_components/ace-builds/src-min-noconflict/mode-javascript.js'],
  styles: ['/bower.css'],
};