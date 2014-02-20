define([], function () {
    'use strict';
    return ['$scope', '$translate', 'base.services.user', function ($scope, $translate, UserService) {
        $scope.user = UserService.getUser();

        $scope.changeLanguage = function (languageCode) {
            $translate.use(languageCode);
        };
    }];
});
