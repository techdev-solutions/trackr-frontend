define(['moment'], function(moment) {
    'use strict';
    /**
     * Sets up a scope from an angular.js controller to have a start and end date.
     *
     * The start date will be the first day of the month, the end date the last.
     *
     * If one of the dates changes a callback will be called.
     *
     * Usage: Access the dates with "$scope.start" and "scope.end".
     */
    return function($scope, callback) {
        $scope.start = moment().startOf('month').toDate();
        $scope.end = moment().endOf('month').toDate();

        $scope.$watch('start', callback);
        $scope.$watch('end', callback);
    };
});