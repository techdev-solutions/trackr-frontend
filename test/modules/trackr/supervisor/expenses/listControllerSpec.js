define(['baseTestSetup', 'fixtures'], function(baseTestSetup, fixtures) {
    'use strict';
    describe('trackr.supervisor.controllers.expenseReport-list', function() {
        var ListController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            var reports = fixtures['api/travelExpenseReports']._embedded.travelExpenseReports;
            ListController = $controller('trackr.supervisor.controllers.expenseReport-list', {
                $scope: scope,
                reports: reports
            });
        }));

        it('must put the reports in the scope', function() {
            expect(scope.reports).toBeDefined();
        });
    });
});