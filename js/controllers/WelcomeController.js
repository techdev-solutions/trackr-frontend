trackr.controller('WelcomeController', ['$scope', 'UserRestService', function ($scope, UserRestService) {
    'use strict';
    UserRestService.getActiveUser().then(function (user) {
        $scope.user = user;
    });
}]);