define(['baseTestSetup', 'fixtures', 'angular'], function(baseTestSetup, fixtures, angular) {
    'use strict';
    describe('trackr.employee.controllers.expenseReport-list', function() {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var EmployeeService = {
                getEmployeeHref: function() { return ''; }
            };
            state = {
                go: angular.noop
            };
            var reports = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports;
            ListController = $controller('trackr.employee.controllers.expenseReport-list', {
                $scope: scope,
                reports: reports,
                $state: state,
                'trackr.services.employee': EmployeeService
            });
        }));

        it('acceptedSubmittedAndRejected must return false if status is PENDING', function() {
            expect(scope.acceptedSubmittedAndRejected({status: 'PENDING'})).toBe(false);
        });

        it('acceptedSubmittedAndRejected must return true if status is REJECTED', function() {
            expect(scope.acceptedSubmittedAndRejected({status: 'REJECTED'})).toBe(true);
        });

        it('acceptedSubmittedAndRejected must return true if status is APPROVED', function() {
            expect(scope.acceptedSubmittedAndRejected({status: 'APPROVED'})).toBe(true);
        });

        it('acceptedSubmittedAndRejected must return true if status is SUBMITTED', function() {
            expect(scope.acceptedSubmittedAndRejected({status: 'SUBMITTED'})).toBe(true);
        });

        it('must add a new report on addNew and transition to its edit state', inject(function($httpBackend) {
            spyOn(state, 'go');
            scope.addNew();
            $httpBackend.expectPOST('api/travelExpenseReports');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('trackr.employee.expenses.edit', { id : undefined });
        }));
    });
});