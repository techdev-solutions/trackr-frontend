define([], function() {
    'use strict';
    return ['$http', function($http) {
        var expenseTypes;
        return {
            loadTypes: function() {
                return $http.get('api/travelExpenses/types').then(function(response) {
                    expenseTypes = response.data;
                    return expenseTypes;
                });
            },
            getTypes: function() {
                return expenseTypes;
            }
        };
    }];
});