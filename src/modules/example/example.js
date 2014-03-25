define(['angular', 'modules/example/controllers/controllers'], function(angular, controllers) {
    'use strict';
    var configFn = [];
    var example = angular.module('example', configFn);
    controllers.init(example);
    example.config(['$stateProvider', function($stateProvider) {
        $stateProvider.
            state('example', {
                url: '/example',
                abstract: true,
                views: {
                    'top-menu@': {
                        templateUrl: 'src/modules/example/partials/top-menu.tpl.html',
                        controller: 'base.controllers.navigation'
                    }
                }
            }).
            state('example.home', {
                url: '',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/example/partials/welcome.tpl.html'
                    }
                }
            }).
            state('example.page1', {
                url: '/page1',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/example/partials/page1.tpl.html',
                        controller: 'example.controllers.example'
                    }
                }
            }).
            state('example.page2', {
                url: '/page2',
                views: {
                    'center@': {
                        templateUrl: 'src/modules/example/partials/page2.tpl.html',
                        controller: 'example.controllers.example'
                    }
                }
            });
    }]);
    return example;
});