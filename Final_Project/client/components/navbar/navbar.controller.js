'use strict';

(function () {

  class NavbarController {
    constructor($http, localStorageService) {
      this.$http = $http;
      this.localStorageService = localStorageService;
      this.api_token = this.localStorageService.get('api_token');
      this.menu = [
        {
          title: '為什麼？',
          state:  "main"
        }
      ];
    }

    $onInit() {

    }

    logout() {
      this.localStorageService.set('api_token',null);
      this.api_token = this.localStorageService.get('api_token');
    }
  }

//end-non-standard

  angular.module('finalProjectApp')
    .controller('NavbarController', NavbarController);
})();

