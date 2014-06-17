define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.employee.controllers.timesheet-overview', function() {
        var TimesheetController, scope;
        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            TimesheetController = $controller('trackr.employee.controllers.timesheet-overview', {
                $scope: scope
            });
        }));

        it('Must load the current worktimes on start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.workTimes).toBeDefined();
        }));

        it('totalHours must calculate the total hours with floating point', inject(function($httpBackend) {
            $httpBackend.flush();
            var totalHours = scope.totalHours('17:30:00', '08:00:00');
            expect(totalHours).toBe(9.5);
        }));
    });
});