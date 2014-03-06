define(['angular',
    'modules/trackr/i18n',
    'modules/trackr/administration/administration',
    'modules/trackr/employee/employee',
    'modules/trackr/supervisor/supervisor',
    'angular-translate'],
    function(angular, i18n) {
        'use strict';
        var configFn = ['trackr.administration', 'trackr.employee', 'trackr.supervisor', 'pascalprecht.translate'];
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
        i18n.init(trackr);
        return trackr;
    });