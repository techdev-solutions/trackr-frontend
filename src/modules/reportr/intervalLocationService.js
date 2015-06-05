define(['moment', 'angular'], function(moment, angular) {
    'use strict';
    var intervalLocationService = function($location) {

        /**
         * Loads a time interval from the URL search from the parameters 'start' and 'end'. If not found
         * the first day of month resp. last day of month is returned.
         *
         * @returns {{start: *, end: *}}
         */
        this.loadIntervalFromLocation = function() {
            var interval = {
                start: moment().startOf('month').toDate(),
                end: moment().endOf('month').toDate()
            };
            var search = $location.search();
            if(angular.isString(search.start)) {
                interval.start = moment(search.start).toDate();
            }
            if(angular.isString(search.end)) {
                interval.end = moment(search.end).toDate();
            }
            return interval;
        };

        /**
         * Save an interval into the URL search (format YYYY-MM-DD) in the parameters 'start' and 'end'.
         * @param start {Date} The start for the interval.
         * @param end {Date} The end for the interval.
         */
        this.saveIntervalToLocation = function(start, end) {
            $location.search('start', moment(start).format('YYYY-MM-DD'));
            $location.search('end', moment(end).format('YYYY-MM-DD'));
        };
    };
    intervalLocationService.$inject = ['$location'];
    return intervalLocationService;
});