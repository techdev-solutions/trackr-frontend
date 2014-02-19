'use strict';
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/i.test(file) && ! /src\/vendor/i.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    baseUrl: '/base/src',
    paths: {
        'jQuery': 'vendor/jquery/dist/jquery',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        'angular-mocks': 'vendor/angular-mocks/angular-mocks',
        'restangular':'vendor/restangular/dist/restangular',
        'lodash': 'vendor/lodash/dist/lodash',
        'fixtures': '../test/fixtures',
        'angular-translate': 'vendor/angular-translate/angular-translate'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] },
        'restangular': {deps: ['angular', 'lodash']},
        'angular-mocks': { deps: ['angular']},
        'angular-translate': { deps: ['angular'] }
    },
    deps: tests,

    callback: window.__karma__.start
});