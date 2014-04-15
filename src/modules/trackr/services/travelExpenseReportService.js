define([], function() {
    'use strict';
    return ['$http', function($http) {
        return {
            approve: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/approve');
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