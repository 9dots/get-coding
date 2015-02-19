/**
 * Modules
 */
require('lib/angular');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Exports
 */
var name = module.exports = 'div-resize';



angular.module(name, [])
.directive('divResize', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, element) {
      var engaged = false;
      var priorCursor = null;
      element.on('mousedown', function(e) {
        engaged = true;
        priorCursor = $('body').css('cursor');
        $('body').css('cursor', 'ew-resize');
      });
      $(document).on('mousemove', function(e) {
        var next = element.next();
        //next = $(next);
        if(engaged) {
          var begin = next.offset().left;
          var end = begin + next.width();
          next.css('width', end - e.pageX);
          next.attr('flex', null);
          $rootScope.$broadcast('resize');
        }
      });
      $(document).on('mouseup', function() {
        engaged = false;
        $('body').css('cursor', priorCursor);
      });
    }
  };
}]);