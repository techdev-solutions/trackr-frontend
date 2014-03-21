define([], function () {
    'use strict';
    return ['$scope', '$translate', 'base.services.user', '$http', function ($scope, $translate, UserService, $http) {
        $scope.user = UserService.getUser();

        $scope.changeLanguage = function (languageCode) {
            $http.put('/api/translations', {}, {params: {locale: languageCode}}).then(function() {
                $translate.use(languageCode);
            });
        };
    }];
});
