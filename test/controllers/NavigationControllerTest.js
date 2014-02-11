describe('NavigationController', function () {
    'use strict';
    var NavigationController, scope;
    beforeEach(module('trackr'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        NavigationController = $controller('NavigationController', {
            $scope: scope
        });
    }));

    it('should have the isActive function in scope', function() {
        expect(scope.isActive).toBeDefined();
    });
});