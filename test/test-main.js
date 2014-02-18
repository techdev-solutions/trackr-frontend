'use strict';
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/i.test(file) && ! /bower_components/i.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    baseUrl: '/base/src',
    paths: {
        'jQuery': 'bower_components/jquery/dist/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'angular': 'bower_components/angular/angular',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'restangular':'bower_components/restangular/dist/restangular',
        'lodash': 'bower_components/lodash/dist/lodash',
        'fixtures': '../test/fixtures'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] },
        'restangular': {deps: ['angular', 'lodash']},
        'angular-mocks': { deps: ['angular']}
    },
    deps: tests,

    callback: window.__karma__.start
});