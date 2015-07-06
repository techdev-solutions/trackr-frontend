define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.employees.listController', function() {
        var NewController, scope;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            NewController = $controller('trackr.administration.employees.newController', {
                $scope: scope
            });
        }));

        it('must load the federal states on load', inject(function($httpBackend) {
            $httpBackend.expectGET('api/federalStates');
            $httpBackend.flush();
            expect(scope.states).toBeDefined();
        }));

        it('must have a new employee object', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.employee).toBeDefined();
        }));

        it('must save the emplyoee and credential', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPOST('api/employees');
            $httpBackend.flush();
        }));
    });
});