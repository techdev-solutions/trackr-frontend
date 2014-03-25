define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.controllers.self', function() {
        var UserService, SelfController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            UserService = $injector.get('base.services.user');
            spyOn(UserService, 'getUser').andReturn({
                id: 1
            });
            SelfController = $controller('trackr.employee.controllers.self', {
                $scope: scope,
                'base.services.user': UserService
            });
        }));

        it('should get the active user on start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(UserService.getUser).toHaveBeenCalled();
        }));

        it('should load the employee from via the API', inject(function($httpBackend) {
            $httpBackend.expectGET('api/employees/1');
            $httpBackend.flush();
            expect(scope.employee).toBeDefined();
        }));

        it('updateEmployee should patch the employee via the self API method', inject(function($httpBackend) {
            scope.updateEmployee({});
            $httpBackend.expectPATCH('api/employees/1/self');
            $httpBackend.flush();
        }));
    });
});