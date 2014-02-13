//Idea from http://nadeemkhedr.wordpress.com/2013/11/25/how-to-do-authorization-and-role-based-permissions-in-angularjs/
define([], function () {
    'use strict';
    return ['base.services.user', function (UserService) {
        return {
            link: function (scope, element, attrs) {
                var value = attrs.hasAuthority.trim();
                var notAuthorityFlag = value[0] === '!';
                if (notAuthorityFlag) {
                    value = value.slice(1).trim();
                }

                function toggleVisibilityBasedOnAuthority() {
                    var hasAuthority = UserService.userHasAuthority(value);

                    if (hasAuthority && !notAuthorityFlag || !hasAuthority && notAuthorityFlag) {
                        element.show();
                    }
                    else {
                        element.hide();
                    }
                }
                toggleVisibilityBasedOnAuthority();
            }
        };
    }];
});