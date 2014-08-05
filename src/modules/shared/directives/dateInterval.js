define(['moment'], function(moment) {
    'use strict';
    /**
     * A directive for two date inputs representing a time interval.
     *
     * startDate and endDate attributes are optional. They take Dates as parameters and can be set to -1 to indicate the
     * datepicker should be empty.
     */
    return [function() {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/shared/partials/dateInterval.tpl.html',
            scope: { callback: '=', endDate: '=?', startDate: '=?' },
            controller: ['$scope', function($scope) {
                $scope.dateIntervalStartOpened = false;
                $scope.dateIntervalEndOpened = false;

                if($scope.startDate) {
                    //If the user set -1 the date should be empty
                    if($scope.startDate === -1) {
                        $scope.startDate = undefined;
                    }
                    $scope.dateIntervalStart = $scope.startDate;
                } else {
                    $scope.dateIntervalStart = moment().startOf('month').toDate();
                }

                if($scope.endDate) {
                    //If the user set -1 the date should be empty
                    if($scope.endDate === -1) {
                        $scope.endDate = undefined;
                    }
                    $scope.dateIntervalEnd = $scope.endDate;
                } else {
                    $scope.dateIntervalEnd = moment().endOf('month').toDate();
                }


                $scope.dateIntervalDateChange = function() {
                    if($scope.callback) {
                        $scope.callback($scope.dateIntervalStart, $scope.dateIntervalEnd);
                    }
                    $scope.startDate = $scope.dateIntervalStart;
                    $scope.endDate = $scope.dateIntervalEnd;
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