define([], function() {
    'use strict';
    return ['$http', function($http) {
        return {
            getTypes: function() {
                return $http.get('api/travelExpenses/types').then(function(response) {
                    return response.data;
                });
            }
        };
    }];
});