'use strict';

describe('Filter: dateOnly', function () {

  // load the filter's module
  beforeEach(module('finalProjectApp'));

  // initialize a new instance of the filter before each test
  var dateOnly;
  beforeEach(inject(function ($filter) {
    dateOnly = $filter('dateOnly');
  }));

  it('should return the input prefixed with "dateOnly filter:"', function () {
    var text = 'angularjs';
    expect(dateOnly(text)).toBe('dateOnly filter: ' + text);
  });

});
