define([], function() {
    'use strict';
    /**
     * Sets up a scope from an angular.js controller to have a start and end date, selectable by the angular-ui-bootstrap datepicker widget.
     *
     * The start date will be the first day of the month, the end date the last.
     *
     * If one of the dates changes a callback will be called.
     *
     * Usage: open the widgets with "openDate($event, 'start/end')". Access the dates with "$scope.start" and "scope.end".
     */
    return function($scope, callback) {
        /**
         * Open a date selector (startDate or endDate)
         * @param $event The button click event
         * @param whichDate either 'start' or 'end'
         */
        $scope.openDate = function($event, whichDate) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope[whichDate] = true;
        };

        var today = new Date();
        today.setDate(1);
        $scope.start = today;
        $scope.end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); //last day of current month

        $scope.$watch('start', callback);
        $scope.$watch('end', callback);
    };
});