'use strict';

(function () {

  class NavbarController {
    constructor($http, localStorageService, $state) {
      this.isCollapsed = false;
      this.$http = $http;
      this.localStorageService = localStorageService;
      this.$state = $state;
      this.navClass = "nav-collapse";
      this.hamburgerClass = "navbar-toggle nav-hamburger";
    }

    $onInit() {
      this.api_token = this.localStorageService.get('api_token');
    }

    logout() {
      swal({
        title: "確定登出",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "登出",
        cancelButtonText: "取消"
      },
        isConfirm => {
          if (isConfirm) {
            this.localStorageService.set('api_token',null);
            this.api_token = this.localStorageService.get('api_token');
            this.$state.reload();
          }
        });

    }

    clickHamburger() {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
        this.navClass = "nav-collapse nav-collapse-appear";
        this.hamburgerClass = "navbar-toggle nav-hamburger nav-hamburger-active";
      }
      else {
        this.navClass = "nav-collapse";
        this.hamburgerClass = "navbar-toggle nav-hamburger";
      }
    }
  }

//end-non-standard

  angular.module('finalProjectApp')
    .controller('NavbarController', NavbarController);
})();

