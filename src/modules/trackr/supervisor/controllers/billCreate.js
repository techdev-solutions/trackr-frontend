define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', function($scope, Restangular) {
        function sumUpFieldOfWorkTimes(fieldName) {
            return _.reduce($scope.employee.workTimes, function(sum, workTime) {
                return sum + (parseFloat(workTime[fieldName]) || 0);
            }, 0);
        }

        //When the user selects the date employee will get updated and we have recalculate.
        $scope.$watch('employee', function() {
            $scope.sumMinutes = sumUpFieldOfWorkTimes('minutes');
        });

        $scope.recalculateBillableSum = function() {
            $scope.sumBillableHours = sumUpFieldOfWorkTimes('hours');
        };

        $scope.setBillableHoursAll = function(value) {
            $scope.employee.workTimes.forEach(function(workTime) {
                workTime.hours = value;
            });
            $scope.recalculateBillableSum();
        };

        $scope.createBill = function() {
            var billableTimesBase = Restangular.all('billableTimes');
            $scope.employee.workTimes.forEach(function(workTime) {
                //Try to post if the hours are entered and the workTime has not been posted OR if there was an error
                if(workTime.hours && !workTime.posted || (workTime.hours && workTime.error)) {
                    var billableTime = {
                        date: workTime.date,
                        hours: workTime.hours,
                        employee: $scope.employee.links[0].href,
                        project: $scope.project._links.self.href
                    };
                    billableTimesBase.post(billableTime).then(function() {
                        workTime.posted = true;
                        workTime.error = false;
                    }, function() {
                        workTime.posted = true;
                        workTime.error = true;
                    });
                }
            });
        };
    }];
});