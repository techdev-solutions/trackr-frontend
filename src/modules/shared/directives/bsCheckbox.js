define([], function() {
    'use strict';
    return ['base.services.user', function(UserService) {
        return {
            restrict: 'E',
            templateUrl: 'src/modules/shared/partials/bsCheckbox.tpl.html',
            scope: {'checked': '=', 'change': '&', role: '@'},
            controller: ['$scope', function($scope) {
                $scope.editable = !$scope.role || UserService.userHasAuthority($scope.role);
            }]
        };
    }];
});