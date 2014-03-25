define([
    'angular',
    'modules/base/controllers/controllers',
    'modules/base/services/services',
    'modules/base/directives/directives'
], function (angular, controllers, services, directives) {
    'use strict';
    var base = angular.module('base', []);
    controllers.init(base);
    services.init(base);
    directives.init(base);

    base.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                center: {
                    templateUrl: 'src/modules/base/partials/modules.tpl.html'
                }
            }
        });
    }]);
    return base;
});