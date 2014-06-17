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
            spyOn(TimesheetController, 'convertToGroupedWorktimes').andReturn({});
        }));

        it('Must load the current worktimes on start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.workTimes).toBeDefined();
        }));

        it('Must convert the worktimes to the grouped worktimes on start', inject(function($httpBackend) {
            $httpBackend.flush();
            expect(scope.groupedWorkTimes).toBeDefined();
            expect(TimesheetController.convertToGroupedWorktimes).toHaveBeenCalled();
        }));

        it('totalHours must calculate the total hours with floating point', inject(function($httpBackend) {
            $httpBackend.flush();
            var totalHours = TimesheetController.totalHours('17:30:00', '08:00:00');
            expect(totalHours).toBe(9.5);
        }));
    });
});