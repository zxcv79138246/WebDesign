'use strict';

describe('Component: RegistComponent', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var RegistComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RegistComponent = $componentController('RegistComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
