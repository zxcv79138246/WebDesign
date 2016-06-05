'use strict';

angular.module('finalProjectApp', [
  'finalProjectApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'wu.masonry',
  'LocalStorageModule'
  ])
  .config(function($urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    localStorageServiceProvider
      .setPrefix('finalProjectApp')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
  });
