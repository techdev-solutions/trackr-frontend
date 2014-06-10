define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', 'base.services.user', function($scope, Restangular, $filter, UserService) {
        $scope.month = new Date();
        //This needs to be a scope variable because the datepicker changes it, so a constant is not useable in the template.
        $scope.datepickerMode = 'month';
        $scope.$watch('month', function(newMonth) {
            if (newMonth) {
                $scope.showMonth(newMonth);
            }
        });

        $scope.showMonth = function(date) {
            var end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59); //last day of month
            Restangular.allUrl('workTimes', 'api/workTimes/search/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc')
                .getList({
                    employee: UserService.getUser().id,
                    start: $filter('date')(date, 'yyyy-MM-dd'),
                    end: $filter('date')(end, 'yyyy-MM-dd')
                }).then(function(workTimes) {
                    //Load projects
                    workTimes.forEach(function(workTime) {
                        workTime.project = workTime.one('project').get().$object;
                    });
                    $scope.workTimes = workTimes;
                });
        };

        $scope.showMonth($scope.month);
    }];
});