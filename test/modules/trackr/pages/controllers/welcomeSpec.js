define(['app', 'angular-mocks'], function() {
    'use strict';
    describe('trackr.pages.controllers.welcome', function () {
        var WelcomeController, scope;

        beforeEach(module('app'));

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            WelcomeController = $controller('trackr.pages.controllers.welcome', {
                $scope: scope
            });
        }));
    });
});
