trackr.service('UserRestService', ['$http', function($http) {
    'use strict';
    return {
        getActiveUser: function() {
            return $http.get('/api/user').then(function(result) {
                return result.data;
            });
        }
    };
}]);