define(['baseTestSetup', 'angular'], function(baseTestSetup, angular) {
    'use strict';
    describe('trackr.employee.expenses.expenseEditController', function() {
        var EditController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EditController = $controller('trackr.employee.expenses.expenseEditController', {
                $scope: scope,
                'createOrUpdateModal.userdata': {
                    expense: {},
                    expenseTypes: []
                }
            });
        }));

        it('Must put the expense in the scope', function() {
            expect(scope.expense).toBeDefined();
        });

        it('Must put the expense types in the scope', function() {
            expect(scope.expenseTypes).toBeDefined();
        });

        it('Must patch the expense when updating', inject(function($httpBackend) {
            scope.closeModal = angular.noop;
            scope.expense = {id: 0, type: 'TAXI'};
            scope.saveEntity();
            $httpBackend.expectPATCH('api/travelExpenses/0');
            $httpBackend.flush();
        }));

        it('puts the errors in the scope when the response with the failure method', function() {
            var response = {data: {errors: []}};
            EditController.onFail(response);
            expect(scope.errors).toBeDefined();
            expect(scope.errors.length).toBe(0);
        });
    });
});