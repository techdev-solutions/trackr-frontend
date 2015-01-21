/* global localStorage */
define([], function () {
    'use strict';
    return ['$scope', '$translate', 'base.services.user', '$http', '$state', '$log', function ($scope, $translate, UserService, $http, $state, $log) {
        $scope.user = UserService.getUser();

        $scope.logout = function() {
            $log.debug('User pressed logout, deleting token and transition to authorize state');
            $http.defaults.headers.common.Authorization = null;
            localStorage.removeItem('oauthToken');
            $http.get('/api/logout').success(function() {
                $state.go('authorize');
            });
        };

        $scope.changeLanguage = function (languageCode) {
            $http.put('api/translations', {}, {params: {locale: languageCode}}).then(function() {
                $translate.use(languageCode);
            });
        };
    }];
});
