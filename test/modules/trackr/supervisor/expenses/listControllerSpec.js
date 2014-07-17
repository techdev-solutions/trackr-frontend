define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.supervisor.controllers.expenseReport-list', function() {
        var ListController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ListController = $controller('trackr.supervisor.controllers.expenseReport-list', {
                $scope: scope
            });
        }));

        it('must put the reports in the scope', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.reports.SUBMITTED).toBeDefined();
        }));

        it('must put the approved reports in the scope', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.reports.APPROVED).toBeDefined();
        }));
    });
});