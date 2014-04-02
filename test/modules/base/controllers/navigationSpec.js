define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('base.controllers.navigation', function () {
        var NavigationController, scope, UserService;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            UserService = $injector.get('base.services.user');
            spyOn(UserService, 'getUser').andCallThrough();
            NavigationController = $controller('base.controllers.navigation', {
                $scope: scope
            });
        }));

        it('should put the active user into scope', function() {
            expect(UserService.getUser).toHaveBeenCalled();
            expect(scope.user).toBeDefined();
        });

        it('changeLanguage should perform a put request on the API', inject(function($httpBackend) {
            scope.changeLanguage('en');
            $httpBackend.expectPUT(/^api\/translations\?.*/);
            $httpBackend.flush();
        }));
    });
});
