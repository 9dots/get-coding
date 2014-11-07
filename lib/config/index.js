var _ = require('lodash')
  , config = require('./settings.js')
  , modes = ['development', 'production', 'ci', 'staging'];

function getEnv() {
  if(typeof window === 'undefined') {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'test') {
      return 'development';
    } else
      return process.env.NODE_ENV;
  }
  return typeof SETTINGS === 'undefined'
    ? 'development'
    : SETTINGS.env;
}

_.merge(config, config[getEnv()], function(a, b) {
  return _.isArray(a) ? a.concat(b) : undefined;
});
_.each(modes, function(mode) {
  delete config[mode];
});

module.exports = config;