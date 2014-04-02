define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.controllers.employees.list', function() {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            state = {
                go: angular.noop
            };
            spyOn(state, 'go');
            ListController = $controller('trackr.administration.controllers.employees.list', {
                $scope: scope,
                $state: state
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must load companies at the start', function() {
            expect(scope.employees).toBeDefined();
            expect(scope.employees.length).toBeGreaterThan(0);
        });

        it('must open the modal dialog on addNew and reload the companies if the modal is closed and go to the new employee', inject(function($httpBackend) {
            var modalInstance = scope.addNew();
            expect(modalInstance).toBeDefined();
            $httpBackend.flush();
            modalInstance.close({id: 0});
            $httpBackend.expectGET(/^\api\/employees\?.*$/);
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalled();
        }));
    });
});