'use strict';

angular.module('finalProjectApp')
  .filter('dateOnly',['$filter', function ($filter) {
    return function (input) {
      return $filter('date')(new Date(input), 'yyyy-MM-dd');
    };
  }]);
