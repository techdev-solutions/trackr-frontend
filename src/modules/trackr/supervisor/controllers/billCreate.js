define(['lodash'], function(_) {
    'use strict';
    return ['$scope', function($scope) {
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
            $scope.sumBillableHours = sumUpFieldOfWorkTimes('billable');
        };

        $scope.setBillableHoursAll = function(value) {
            $scope.employee.workTimes.forEach(function(workTime) {
                workTime.billable = value;
            });
            $scope.recalculateBillableSum();
        };

        $scope.createBill = function() {
            var post = [];
            $scope.employee.workTimes.forEach(function(workTime) {
                var obj = {
                    date: workTime.date,
                    billable: workTime.billable,
                    employee: $scope.employee.id,
                    project: $scope.project.id
                };
                post.push(obj);
            });
            $scope.fake = 'Saved ' + $scope.sumBillableHours + ' hours for ' + $scope.employee.name + '.';
        };
    }];
});