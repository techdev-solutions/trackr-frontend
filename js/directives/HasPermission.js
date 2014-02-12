//Idea from http://nadeemkhedr.wordpress.com/2013/11/25/how-to-do-authorization-and-role-based-permissions-in-angularjs/
trackr.directive('userHasAuthority', ['UserService', function(UserService) {
    'use strict';
    return {
        link: function(scope, element, attrs) {
            var value = attrs.hasPermission.trim();
            var notAuthorityFlag = value[0] === '!';
            if(notAuthorityFlag) {
                value = value.slice(1).trim();
            }

            function toggleVisibilityBasedOnPermission() {
                var hasAuthority = UserService.userHasAuthority(value);

                if(hasAuthority && !notAuthorityFlag || !hasAuthority && notAuthorityFlag) {
                    element.show();
                }
                else {
                    element.hide();
                }
            }
            toggleVisibilityBasedOnPermission();
        }
    };
}]);