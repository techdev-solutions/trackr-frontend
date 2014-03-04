define([], function() {
    'use strict';
    return ['$scope', 'Restangular', '$filter', 'base.services.user', function($scope, Restangular, $filter, UserService) {
        //TODO: remove this as soon as datepicker supports a month-only selection
        var months = [];
        for (var month = 0; month < 12; month++) {
            months.push(new Date(2014, month, 1));
        }
        $scope.months = months;

        var today = new Date();
        today.setDate(1);

        $scope.showMonth = function(date) {
            var end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59); //last day of month
            Restangular.allUrl('workTimes', '/api/workTimes/search/findByEmployeeAndDateBetweenOrderByDateAscStartTimeAsc')
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

        $scope.showMonth(today);
    }];
});