(function () {
  'use strict';

  angular.module('dimApp')
    .directive('dimStores', Stores);

  Stores.$inject = ['ngDialog'];

  function Stores(ngDialog) {
    return {
      controller: StoresCtrl,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      template: [
        '<div ng-repeat="store in vm.stores" class="{{ :: vm.getClassName(store) }}">',
        '  <div dim-store-heading store-data="store"></div>',
        '  <div dim-store-items store-data="store"></div>',
        '</div>'
      ].join('')
    };
  }

  StoresCtrl.$inject = ['$scope', 'dimStoreService', '$rootScope', '$q'];

  function StoresCtrl($scope, dimStoreService, $rootScope, $q) {
    var vm = this;

    vm.stores = null;
    vm.getClassName = function (store) {
      return 'storage ' + ((store.id !== 'vault') ? 'guardian' : 'vault');
    };

    $scope.$on('dim-active-platform-updated', function(e, args) {
      var promise = $q.when(dimStoreService.getStores(true))
        .then(function(stores) {
          vm.stores = stores;
        });

      $rootScope.loadingTracker.addPromise(promise);
    });
  }
})();
