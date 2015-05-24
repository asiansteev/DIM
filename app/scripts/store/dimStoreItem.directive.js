/*jshint -W027*/

(function() {
  'use strict';

  angular.module('dimApp')
    .directive('dimStoreItem', StoreItem);

  StoreItem.$inject = ['dimStoreService', 'ngDialog', 'dimLoadoutService'];

  function StoreItem(dimStoreService, ngDialog, dimLoadoutService) {
    return {
      bindToController: true,
      controller: StoreItemCtrl,
      controllerAs: 'vm',
      link: Link,
      replace: true,
      scope: {
        'store': '=storeData',
        'item': '=itemData'
      },
      template: [
        '<div ui-draggable="{{ (vm.item.type !== \'Lost Items\') && (vm.item.type !== \'Messages\')  }}" id="item-{{ :: $id }}" drag-channel="{{ :: vm.item.type }}" title="{{ ::  vm.item.primStat.value }} {{ vm.item.name }}" alt="{{ vm.item.primStat.value }} {{ vm.item.name }}" drag="\'item-\' + $id" class="item" ng-class="{ \'search-hidden\': !vm.item.visible, \'complete\': vm.item.complete}">',
        '  <div ui-draggable="false" class="img" ng-class="::vm.imageClassName" style="background-size: 44px 44px; background-image: url({{ ::vm.imageSrc }})" ng-click="vm.clicked(vm.item, $event)"></div>',
        '  <div ui-draggable="false" class="counter" ng-if="vm.item.amount > 1">{{ vm.item.amount }}</div>',
        '  <div ui-draggable="false" class="damage-type" ng-if="::vm.showDamageType" ng-class="::vm.damageClassName"></div>',
        '</div>'
      ].join('')
    };

    function Link(scope, element, attrs) {
      var vm = scope.vm;
      var dialogResult = null;

      vm.imageSrc = vm.item.icon.slice(1);
      vm.imageClassName = (vm.item.inHoW) ? 'how' : '';
      vm.showDamageType = (vm.item.sort === 'Weapons');
      vm.damageClassName = 'damage-' + vm.item.dmg;

      vm.clicked = function openPopup(item, e) {
        e.stopPropagation();

        if (!_.isNull(dialogResult)) {
          dialogResult.close();
        } else {
          ngDialog.closeAll();

          if (!dimLoadoutService.dialogOpen) {
            dialogResult = ngDialog.open({
              template: '<div ng-click="$event.stopPropagation();" dim-click-anywhere-but-here="vm.closePopup()" dim-move-popup dim-store="vm.store" dim-item="vm.item"></div>',
              plain: true,
              appendTo: 'div[id="item-' + scope.$id + '"]',
              overlay: false,
              className: 'move-popup' + ((($('body').width() - $(element).offset().left - 320) < 0) ? ' move-popup-right' : ''),
              showClose: false,
              scope: scope
            });

            // if (($('body').width() - $(element).offset().left - 320) < 0) {
            //   $('.ngdialog.move-popup').css('left', $('body').width() - $(element).offset().left - 340);
            // }

            dialogResult.closePromise.then(function(data) {
              dialogResult = null;
            });
          } else {
            dimLoadoutService.addItemToLoadout(item);
          }
        }
      };

      vm.closePopup = function closePopup() {
        if (!_.isNull(dialogResult)) {
          dialogResult.close();
        }
      };
    }
  }

  StoreItemCtrl.$inject = ['$rootScope'];

  function StoreItemCtrl($rootScope) {
    var vm = this;

    vm.itemClicked = function clicked(item) {
      $rootScope.$broadcast('dim-store-item-clicked', {
        item: item
      });
    };
  }
})();
