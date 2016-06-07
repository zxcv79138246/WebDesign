'use strict';

angular.module('finalProjectApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('regist', {
        url: '/regist',
        template: '<regist></regist>'
      });
  });
