define(['baseTestSetup'], function(baseTestSetup) {
    'use strict';
    describe('trackr.supervisor.controllers.bill-create', function() {
        var BillCreateController, scope;

        baseTestSetup();
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.employee = {
                workTimes: [{minutes: 10}, {minutes: 20}]
            };
            BillCreateController = $controller('trackr.supervisor.controllers.bill-create', {
                $scope: scope
            });
        }));

        it('should calculate the sum of all minutes on entry', function() {
            scope.$digest();
            expect(scope.sumMinutes).toBe(30);
        });

        it('sumUpFieldsOfArray sums up fields of objects in an array', function() {
            var collection = [
                {a: 1}, {a: 2}
            ];
            var sum = BillCreateController.sumUpFieldsOfArray('a', collection);
            expect(sum).toBe(3);

        });

        it('setBillableHoursAll should set the hours property on all workTimes', function() {
            scope.setBillableHoursAll(3);
            scope.employee.workTimes.forEach(function(workTime) {
                expect(workTime.hours).toBe(3);
            });
        });

        it('setBillableHoursAll should refresh the sum of billable hours', function() {
            scope.setBillableHoursAll(3);
            expect(scope.sumBillableHours).toBe(6);
        });

        it('recalculateBillableSum should recalculate the sum of billable hours', function() {
            scope.employee.workTimes.forEach(function(workTime) {
                workTime.hours = 1;
            });
            scope.recalculateBillableSum();
            expect(scope.sumBillableHours).toBe(2);
        });

        it('createBill should POST to the server', inject(function($httpBackend) {
            scope.employee.links = [{href: 'employee'}];
            scope.project = { _links: { self: { href: 'project'}}};
            scope.employee.workTimes.forEach(function(workTime) {
                workTime.hours = 1;
            });
            scope.createBill();
            $httpBackend.expectPOST('/api/billableTimes');
            $httpBackend.flush();
            scope.employee.workTimes.forEach(function(workTime) {
                expect(workTime.posted).toBe(true);
                expect(workTime.error).toBe(false);
            });
        }));
    });
});