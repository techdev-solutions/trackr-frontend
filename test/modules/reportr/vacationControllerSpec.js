define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('reportr.controllers.vacation', function() {
        var VacationController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            VacationController = $controller('reportr.controllers.vacation', {
                $scope: scope
            });
        }));

        beforeEach(inject(function($httpBackend) {
            // Flush initial load of vacation requests
            $httpBackend.expectGET(/^api\/vacationRequests\/daysPerEmployeeBetween\?end=\d+&projection=withEmployeeAndApprover&start=\d+$/);
            $httpBackend.flush();
        }));

        it('generate bar chart data', function() {
            var invoicesArray = [ ['employee1', 3], ['employee2', 5] ];
            var barData = VacationController.generateBarChartData(invoicesArray);
            expect(barData.series.length).toEqual(2);
            expect(barData.series).toContain('employee1');
            expect(barData.series).toContain('employee2');
            expect(barData.data[0].x).toBeDefined();
            expect(barData.data[0].y.length).toBe(2);
            expect(barData.data[0].y).toContain(3);
            expect(barData.data[0].y).toContain(5);
        });

        it('when a date is selected loadInvoices must be triggered', function() {
            spyOn(VacationController, 'loadVacationRequests');
            scope.dateSelected(new Date(), new Date());
            expect(VacationController.loadVacationRequests).toHaveBeenCalled();
        });
    });
});