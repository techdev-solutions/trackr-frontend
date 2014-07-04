'use strict';
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file) && /spec\.js$/i.test(file) && ! /src\/vendor/i.test(file)) {
        tests.push(file);
    }
}

require.config({
    baseUrl: '/base/src',
    paths: {
        'jQuery': 'vendor/jquery/dist/jquery',
        'twitter-bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        'angular-mocks': 'vendor/angular-mocks/angular-mocks',
        'restangular':'vendor/restangular/dist/restangular',
        'lodash': 'vendor/lodash/dist/lodash',
        'fixtures': '../test/fixtures',
        'baseTestSetup': '../test/baseTestSetup',
        'backendMock': '../test/backendMock',
        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-translate-loader-url': 'vendor/angular-translate-loader-url/angular-translate-loader-url',
        'angular-ui': 'vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
        'angular-charts': 'vendor/angular-charts/dist/angular-charts',
        'moment': 'vendor/moment/moment',
        'd3': 'vendor/d3/d3',
        'confirmationServiceMock': '../test/modules/base/services/confirmationServiceMock'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'twitter-bootstrap': { deps: ['jQuery'] },
        'restangular': {deps: ['angular', 'lodash']},
        'angular-mocks': { deps: ['angular']},
        'angular-translate': { deps: ['angular'] },
        'angular-translate-loader-url': { deps: ['angular-translate'] },
        'angular-ui': { deps: ['angular'] },
        'angular-charts': { deps: ['d3', 'angular'] }
    },
    deps: tests,

    callback: window.__karma__.start
});