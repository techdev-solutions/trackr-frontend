define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('reportr.controllers.employee-hours', function() {
        var EmployeeHoursController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            EmployeeHoursController = $controller('reportr.controllers.employee-hours', {
                $scope: scope
            });
        }));

        beforeEach(inject(function($httpBackend) {
            // Flush initial load of vacation requests
            $httpBackend.expectGET(/^api\/workTimes\/search\/findByDateBetween\?end=\d+&projection=withEmployee&start=\d+$/);
            $httpBackend.flush();
        }));

        it('generate bar chart data', function() {
            var employeeHoursArray = [ ['employee1', 120], ['employee2', 130] ];
            var barData = EmployeeHoursController.calculateBarChartData(employeeHoursArray);
            expect(barData.labels.length).toEqual(2);
            expect(barData.labels).toContain('employee1');
            expect(barData.labels).toContain('employee2');
            expect(barData.datasets[0].label).toBeDefined();
            expect(barData.datasets[0].data.length).toBe(2);
            expect(barData.datasets[0].data).toContain(120);
            expect(barData.datasets[0].data).toContain(130);
        });

        it('when a date is selected loadWorkTimes must be triggered', function() {
            spyOn(EmployeeHoursController, 'loadWorkTimes');
            scope.dateSelected(new Date(), new Date());
            expect(EmployeeHoursController.loadWorkTimes).toHaveBeenCalled();
        });
    });
});