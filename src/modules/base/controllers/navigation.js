/* global localStorage */
define([], function () {
    'use strict';
    return ['$scope', '$translate', 'base.services.user', '$http', '$state', function ($scope, $translate, UserService, $http, $state) {
        $scope.user = UserService.getUser();

        $scope.logout = function() {
            $http.defaults.headers.common.Authorization = null;
            localStorage.removeItem('oauthToken');
            $state.go('authorize');
        };

        $scope.changeLanguage = function (languageCode) {
            $http.put('api/translations', {}, {params: {locale: languageCode}}).then(function() {
                $translate.use(languageCode);
            });
        };
    }];
});
