define([], function() {
    'use strict';
    return ['$http', 'Restangular', function($http, Restangular) {
        return {
            approve: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/approve');
            },

            reject: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/reject');
            },

            submit: function(travelExpenseReport) {
                return $http.put('api/travelExpenseReports/' + travelExpenseReport.id + '/submit');
            },

            /**
             * Return all travel expense reports with their employee loaded.
             * @param status The status to search for (SUBMITTED, PENDING, REJECTED, APPROVED)
             */
            findByStatusWithEmployee: function(status) {
                return Restangular.allUrl('travelExpenseReports', 'api/travelExpenseReports/search/findByStatusOrderByEmployee_LastNameAsc').getList({
                    status: status,
                    projection: 'overview'
                }).then(function(reports) {
                    return reports;
                });
            }
        };
    }];
});