define(['baseTestSetup', 'fixtures', 'angular'], function(baseTestSetup, fixtures, angular) {
    'use strict';
    describe('trackr.supervisor.expenses.EditController', function() {
        var EditController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var report = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports[0];
            report.expenses = fixtures['api/travelExpenses']._embedded.travelExpenses;
            state = {
                go: angular.noop
            };
            EditController = $controller('trackr.supervisor.expenses.EditController', {
                $scope: scope,
                expenses: report.expenses,
                report: report,
                $state: state,
                $stateParams: {
                    id: 0
                }
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('must decorate the expenses array', function() {
            expect(scope.report.expenses.totalCost).toBeDefined();
            expect(scope.report.expenses.totalReimbursement).toBeDefined();
        });

        it('must call approve on the server when approving', inject(function($httpBackend) {
            spyOn(state, 'go');
            scope.accept(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/approve');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('app.trackr.supervisor.expenses', null, {reload: true});
        }));

        it('must call reject on the server when rejecting', inject(function($httpBackend) {
            spyOn(state, 'go');
            scope.reject(scope.report);
            $httpBackend.expectPUT('api/travelExpenseReports/' + scope.report.id + '/reject');
            $httpBackend.flush();
            expect(state.go).toHaveBeenCalledWith('app.trackr.supervisor.expenses', null, {reload: true});
        }));
    });
});