trackr.controller('WelcomeController', ['$scope', 'UserService', function ($scope, UserService) {
    'use strict';
    $scope.user = UserService.getUser();
}]);