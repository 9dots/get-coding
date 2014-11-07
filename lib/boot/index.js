require('/lib/main');


angular.element(document).ready(function() {
  var modules = ['main', require('/lib/html5mode')];
  angular.bootstrap(document, modules);
});