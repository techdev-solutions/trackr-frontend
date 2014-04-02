define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.employees.new', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            NewController = $controller('trackr.administration.controllers.employees.new', {
                $scope: scope,
                //for now mocked here
                //TODO: find out why the provider is not available
                $modalInstance: {
                    dismiss: angular.noop,
                    close: angular.noop
                }
            });
        }));

        it('must load the federal states on load', inject(function($httpBackend) {
            $httpBackend.expectGET('api/federalStates');
            $httpBackend.flush();
            expect(scope.states).toBeDefined();
        }));

        it('must have an errors object', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.errors).toBeDefined();
        }));

        it('must have a new employee object', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.employee).toBeDefined();
        }));

        it('must have a new credential object', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.credential).toBeDefined();
        }));

        it('must save the emplyoee and credential', inject(function($httpBackend) {
            $httpBackend.flush();
            scope.saveEmployee();
            $httpBackend.expectPOST('api/employees/createWithCredential');
            $httpBackend.flush();
        }));
    });
});