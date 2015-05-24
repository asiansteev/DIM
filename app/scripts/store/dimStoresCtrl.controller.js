(function() {
  'use strict';

  angular.module('dimApp').controller('dimStoresCtrl', StoresCtrl);

  StoresCtrl.$inject = ['$scope', 'dimStoreService', '$rootScope', '$q'];

  function StoresCtrl($scope, dimStoreService, $rootScope, $q) {
    var vm = this;
    var model = vm.model = {};
    var index = 0;

    model.stores = [];
    model.items = [];

    vm.stores = [];
    vm.items = [];
    vm.organizedItems = [];

    vm.stores = [];
    vm.getClassName = function (store) {
      return 'storage ' + ((store.id !== 'vault') ? 'guardian' : 'vault');
    };

    $scope.$on('dim-active-platform-updated', function(e, args) {
      var start = new Date();
      var storesDate;
      var promise = $q.when(dimStoreService.getStores(true))
        .then(function(stores) {
          storesDate = new Date();
          console.log("Downloaded Stores: " + (storesDate - start));
          model.stores = stores;
          vm.stores.splice(0);

          _.each(model.stores, function(store) {
            _.each(store.items, function(item) {
              model.items.push(item);
              vm.items.push(createItemVM(item));
            });

            vm.stores.push(createStoreVM(store));
          });

          vm.organizedItems = _.chain(model.items)
            .sortBy('name')
            .sortBy('itemType')
            .value();

          console.log("Organized Stores: " + (new Date() - storesDate));
        });

      $rootScope.loadingTracker.addPromise(promise);
    });

    function getNextIndex() {
      index = index + 1;
      return index;
    }

    function createStoreVM(store) {
      return {
        id: store.id,
        isCharacter: (store.id !== 'vault'),
        name: (store.class || 'Vault'),
        race: store.race,
        gender: store.gender,
        level: store.level,
        hasPrestiged: store.level > 20,
        maxLevel: store.maxLevel,
        percentToNextLevel: store.percentToNextLevel,
        characterBoxUrl: 'http://bungie.net' + store.background,
        emblemUrl: 'http://bungie.net' + store.icon
      };
    }

    function createItemVM(item) {
      return {
        index: getNextIndex().toString(),
        id: item.id,
        hash: item.hash
      };
    }
  }
})();
