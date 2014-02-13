define([], function () {
    'use strict';
    return ['$http', function ($http) {
        var user;
        var permissionLevels = {//TODO load this from the server
            ROLE_ADMIN: 0,
            ROLE_STAFF: 1,
            ROLE_EMPLOYEE: 2
        };
        return {
            setUser: function (_user) {
                user = _user;
            },

            getUser: function () {
                return user;
            },

            allUsers: function () {
                return $http.get('/api/users/').then(function (result) {
                    return result.data;
                });
            },

            /**
             * Check if the current user has a higher or equal authority than the argument
             * @param authority The authority to check for
             * @returns {boolean} True if the user authority is higher, e.g. the user is ROLE_STAFF and the argument is ROLE_EMPLOYEE.
             */
            userHasAuthority: function (authority) {
                if (user.credentials.authorities.length === 0) {
                    return false;
                }
                var userAuthority = user.credentials.authorities[0].authority;
                return permissionLevels[userAuthority] <= permissionLevels[authority];
            }
        };
    }];
});