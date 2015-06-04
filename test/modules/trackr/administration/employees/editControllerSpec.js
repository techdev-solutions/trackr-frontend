define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.administration.employees.editController', function () {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.closeModal = angular.noop;
            EditController = $controller('trackr.administration.employees.editController', {
                $scope: scope,
                'createOrUpdateModal.userdata': {
                    employee: {
                        id: 0,
                        federalState: {name: 'BERLIN'}
                    },
                    states: []
                }
            });
        }));

        it('must have an employee in scope', function() {
            expect(scope.employee).toBeDefined();
        });

        it('must have the federal states in scope', function() {
            expect(scope.states).toBeDefined();
        });

        it('must PATCH the employee when updating', inject(function($httpBackend) {
            scope.saveEntity();
            $httpBackend.expectPATCH('api/employees/0');
            $httpBackend.flush();
        }));
    });
});