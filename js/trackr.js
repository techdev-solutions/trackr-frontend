/* jshint unused: false */
/* global document */
/* global $ */
var trackr = angular.module('trackr', ['ngRoute']);
var trackrUser;

trackr.run(['UserService', function (UserService) {
    'use strict';
    UserService.setUser(trackrUser);
}]);

/*
    Load the current user and its authorities before the app starts.
    After the user is loaded the trackr app gets bootstrapped manually.
*/
angular.element(document).ready(function () {
    'use strict';
    $.get('/api/users/current', function (data) {
        trackrUser = data;
        angular.bootstrap(document, ['trackr']);
    });
});

trackr.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.
        when('/', {
            templateUrl: 'views/welcome.html',
            controller: 'WelcomeController'
        }).
        when('/zeiten', {
            templateUrl: 'views/zeiten.html'
        });
}]);