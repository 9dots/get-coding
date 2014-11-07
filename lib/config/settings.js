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
  scripts: ['/build.js'],
  styles: ['/build.css'],
};