define(['lodash'], function(_) {
    'use strict';
    return ['$scope', 'Restangular', '$filter', 'base.services.user', 'base.services.confirmation-dialog',
        function($scope, Restangular, $filter, UserService, ConfirmationDialogService) {
            var controller = this;
            $scope.month = new Date();
            $scope.month.setDate(1);
            //This needs to be a scope variable because the datepicker changes it, so a constant is not useable in the template.
            $scope.datepickerMode = 'month';

            $scope.monthChange = function() {
                controller.showMonth($scope.month);
            };

            controller.showMonth = function(date) {
                var end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59); //last day of month
                Restangular.allUrl('workTimes', 'api/workTimes/search/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc')
                    .getList({
                        employee: UserService.getUser().id,
                        start: $filter('date')(date, 'yyyy-MM-dd'),
                        end: $filter('date')(end, 'yyyy-MM-dd'),
                        projection: 'withProject'
                    }).then(function(workTimes) {
                        $scope.workTimes = workTimes;
                    });
            };

            $scope.remove = function(workTime) {
                function deleteWorkTime() {
                    workTime.remove().then(function() {
                        _.remove($scope.workTimes, function(wT) {
                            return wT.id === workTime.id;
                        });
                    });
                }

                ConfirmationDialogService.openConfirmationDialog('ACTIONS.REALLY_DELETE').result.then(deleteWorkTime);
            };

            controller.showMonth($scope.month);
        }];
});