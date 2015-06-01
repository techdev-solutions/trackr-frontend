define(['baseTestSetup', 'fixtures', 'angular'], function(baseTestSetup, fixtures, angular) {
    'use strict';
    describe('trackr.employee.expenses.expenseReportListController', function() {
        var ListController, scope, state;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var employee = {
                _links: { self: {href: ''}}
            };
            state = {
                go: angular.noop
            };
            var reports = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports;
            ListController = $controller('trackr.employee.expenses.expenseReportListController', {
                $scope: scope,
                reports: reports,
                $state: state,
                employee: employee
            });
        }));

        beforeEach(inject(function($httpBackend) {
            $httpBackend.flush();
        }));

        it('calculateReportTotal must sum up all costs.', function() {
            var report = {expenses: [{cost: 10}, {cost: 13}]};
            var totalCost = ListController.calculateReportTotal(report);
            expect(totalCost).toBe(23);
        });
    });
});