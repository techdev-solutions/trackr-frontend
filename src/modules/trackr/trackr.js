define(['angular', 'modules/trackr/administration/administration'], function(angular) {
    'use strict';
    var configFn = ['trackr.administration'];
    var trackr = angular.module('trackr', configFn);
    trackr.config(['$stateProvider', function($stateProvider) {
        $stateProvider.
            state('trackr', {
                url: '/trackr',
                abstract: true,
                views: {
                    'top-menu@': {
                        templateUrl: 'src/modules/trackr/partials/top-menu.tpl.html',
                        controller: 'base.controllers.navigation'
                    }
                }
            }).
            state('trackr.home', {
                url: '',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/trackr/partials/welcome.tpl.html'
                    }
                }
            });
    }]);
    return trackr;
});