define([], function() {
    'use strict';
    return ['$http', function($http) {
        return {
            accept: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/accept');
            },

            reject: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/reject');
            },

            submit: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/submit');
            }
        };
    }];
});