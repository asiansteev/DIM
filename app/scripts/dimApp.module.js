(function() {
  'use strict';

  angular.module('dimApp', [
    'ui.router',
    'ngAnimate',
    'ngDialog',
    'ngMessages',
    'ang-drag-drop',
    'chromeStorage',
    'angularUUID2',
    'toaster',
    'ajoslin.promise-tracker'
  ]);
})();

function checkWatchers(query) {
  var scope;
  var watchers = 0;
  var aoEl = document.querySelector(query);
  if (!aoEl) {
    return;
  }
  var elementsWithScope = aoEl.querySelectorAll('.ng-scope');
  for (var i = 0; i < elementsWithScope.length; i++) {
    scope = angular.element(elementsWithScope[i]).scope();
    if (scope.$$watchers !== null) {
      if (scope.$$watchers.length > 0) console.log(angular.element(elementsWithScope[i]));
      watchers += scope.$$watchers.length;
    }
  }
  return watchers;
}
