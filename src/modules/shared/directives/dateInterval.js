define(['moment'], function(moment) {
    'use strict';
    /**
     * A directive for two date inputs representing a time interval.
     */
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/shared/partials/dateInterval.tpl.html',
            scope: { callback: '=' },
            controller: ['$scope', function($scope) {
                $scope.dateIntervalStartOpened = false;
                $scope.dateIntervalEndOpened = false;

                $scope.dateIntervalStart = moment().startOf('month').toDate();
                $scope.dateIntervalEnd = moment().endOf('month').toDate();

                $scope.dateIntervalDateChange = function() {
                    $scope.callback($scope.dateIntervalStart, $scope.dateIntervalEnd);
                };

                $scope.dateIntervalOpenDate = function($event, name) {
                    $event.stopPropagation();
                    $event.preventDefault();
                    $scope[name] = true;
                };

                $scope.dateIntervalOptions = {
                    'year-format': '\'yyyy\'',
                    'starting-day': 1
                };
            }]
        };
    }];
});