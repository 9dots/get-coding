
/**
 * Modules
 */
var marked = require('chjj/marked');

require('/lib/angular');


/**
 * Exports
 */
var name = module.exports = 'marked';

angular.module(name, ['ngSanitize'])
.directive('marked', ['$sanitize', function($sanitize) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs, ctrl, transclude) {
      element.addClass('markdown-body');
      transclude(scope, function(clone){
        scope.$watch(function() {return clone.text()}, function(text) {
          element.html($sanitize(marked(text)));
        });
      })
    }
  }
}]);

