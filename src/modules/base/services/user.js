define([], function () {
    'use strict';
    return [function () {
        var user;
        var permissionLevels = {//TODO load this from the server
            ROLE_ADMIN: 0,
            ROLE_SUPERVISOR: 1,
            ROLE_EMPLOYEE: 2
        };
        return {
            setUser: function (_user) {
                user = _user;
                if(user) {
                    user.highestAuthority = user.authorities.sort( function(a1, a2) {
                        return a1.order > a2.order;
                    })[0];
                }
            },

            getUser: function () {
                return user;
            },

            /**
             * Check if the current user has a higher or equal authority than the argument
             * @param authority The authority to check for
             * @returns {boolean} True if the user authority is higher, e.g. the user is ROLE_SUPERVISOR and the argument is ROLE_EMPLOYEE.
             */
            userHasAuthority: function (authority) {
                if (user.authorities.length === 0) {
                    return false;
                }
                var userAuthority = user.highestAuthority.authority;
                return permissionLevels[userAuthority] <= permissionLevels[authority];
            }
        };
    }];
});