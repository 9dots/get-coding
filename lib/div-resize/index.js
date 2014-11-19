var name = module.exports = 'div-resize';

require('/lib/angular');
var _ = require('lodash/lodash');
var $ = require('components/jquery@1.11');

angular.module(name, [])
.directive('divResize', function() {
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
        }
      });
      $(document).on('mouseup', function() {
        engaged = false;
        $('body').css('cursor', priorCursor);
      });
    }
  };
});