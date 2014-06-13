define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', function($scope, Restangular) {
        var controller = this;

        /**
         * Sums up a specific field of objects in a collection
         * @param fieldName The name of the field
         * @param collection The collection containing the objects
         * @returns {*} The sum of the field values
         */
        controller.sumUpFieldsOfArray = function (fieldName, collection) {
            return _.reduce(collection, function(sum, element) {
                return sum + (parseFloat(element[fieldName]) || 0);
            }, 0);
        };

        //When the user selects the date employee will get updated and we to have recalculate.
        $scope.$watch('employee', function() {
            $scope.sumMinutes = controller.sumUpFieldsOfArray('enteredMinutes', $scope.employee.workTimes);
        });

        $scope.recalculateBillableSum = function() {
            $scope.sumBillableHours = controller.sumUpFieldsOfArray('hours', $scope.employee.workTimes);
        };

        $scope.recalculateBillableSum();

        $scope.setBillableHoursAll = function(value) {
            $scope.employee.workTimes.forEach(function(workTime) {
                workTime.hours = value;
            });
            $scope.recalculateBillableSum();
        };

        $scope.resetHours = function() {
            $scope.setBillableHoursAll(undefined);
        };

        $scope.createBill = function() {
            function createNewBillableTime(billableTime) {
                return Restangular.all('billableTimes').post(billableTime);
            }

            function updateBillableTime(billedTimeId, patchObject) {
                return Restangular.one('billableTimes', billedTimeId).patch(patchObject);
            }

            $scope.employee.workTimes.forEach(function(workTime) {
                //Hours were entered so we have to create/update a billable time
                if(workTime.hours) {
                    var project = $scope.project._links.self.href;
                    //This is due to an error in Spring-Data-Rest 2.1 where the self href contains an {?projection}
                    //if projections are used.
                    project = project.substr(0, project.indexOf('{'));
                    var billableTime = {
                        date: workTime.date,
                        minutes: isNaN(workTime.hours) ? workTime.hours : workTime.hours * 60,
                        employee: $scope.employee.links[0].href,
                        project: project
                    };
                    //If the work time has a billed time id attached we can update
                    if(workTime.billedTimeId) {
                        updateBillableTime(workTime.billedTimeId, {minutes: billableTime.minutes}).then(function() {
                            workTime.error = false;
                            workTime.posted = true;
                        }, function() {
                            workTime.error = true;
                            workTime.posted = true;
                        });
                    }
                    //otherwise we create a new worktime
                    else {
                        createNewBillableTime(billableTime).then(function(data) {
                            workTime.error = false;
                            workTime.posted = true;
                            workTime.billedTimeId = data.id;
                            workTime.billedMinutes = data.minutes;
                        }, function() {
                            workTime.error = true;
                            workTime.posted = true;
                        });
                    }
                }
                //No hours were entered. If the worktime has a billed time id we have to delete that billed time.
                else if(workTime.billedTimeId) {
                    Restangular.one('billableTimes', workTime.billedTimeId).remove().then(function() {
                        workTime.billedTimeId = undefined;
                        workTime.billedMinutes = undefined;
                        workTime.error = false;
                        workTime.posted = false;
                    });
                }
            });
        };
    }];
});