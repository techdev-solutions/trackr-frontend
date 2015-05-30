define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('reportr.controllers.travel-expense', function() {
        var TravelExpenseController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            TravelExpenseController = $controller('reportr.controllers.travel-expense', {
                $scope: scope
            });
        }));

        beforeEach(inject(function($httpBackend) {
            // Flush initial load of vacation requests
            $httpBackend.expectGET(/^api\/travelExpenseReports\/search\/findBySubmissionDateBetween\?end=\d+&projection=withEmployeeAndExpenses&start=\d+$/);
            $httpBackend.flush();
        }));

        it('generate bar chart data', function() {
            var travelExpenseArray = [ ['employee1', 1000], ['employee2', 900] ];
            var barData = TravelExpenseController.calculateBarChartData(travelExpenseArray);
            expect(barData.labels.length).toEqual(2);
            expect(barData.labels).toContain('employee1');
            expect(barData.labels).toContain('employee2');
            expect(barData.datasets[0].label).toBeDefined();
            expect(barData.datasets[0].data.length).toBe(2);
            expect(barData.datasets[0].data).toContain(1000);
            expect(barData.datasets[0].data).toContain(900);
        });

        it('when a date is selected loadTravelExpenseReports must be triggered', function() {
            spyOn(TravelExpenseController, 'loadTravelExpenseReports');
            scope.dateSelected(new Date(), new Date());
            expect(TravelExpenseController.loadTravelExpenseReports).toHaveBeenCalled();
        });
    });
});