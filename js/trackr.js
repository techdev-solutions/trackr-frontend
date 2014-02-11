/* jshint unused: false */
var trackr = angular.module('trackr', ['ngRoute']);

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