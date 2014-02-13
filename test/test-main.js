'use strict';
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/i.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    baseUrl: '/base/src',
    paths: {
        'jQuery': 'bower_components/jquery/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'angular': 'bower_components/angular/angular',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'fixtures': '../test/fixtures'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-route': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] },
        'angular-mocks': { deps: ['angular']}
    },
    deps: tests,

    callback: window.__karma__.start
});