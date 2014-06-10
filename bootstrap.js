require.config({
    baseUrl: 'src',
    paths: {
        'jQuery': 'vendor/jquery/dist/jquery',
        'twitter-bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        'restangular': 'vendor/restangular/dist/restangular',
        'lodash': 'vendor/lodash/dist/lodash',
        'angular-translate': 'vendor/angular-translate/angular-translate',
        'angular-translate-loader-url': 'vendor/angular-translate-loader-url/angular-translate-loader-url',
        'angular-ui': 'vendor/angular-ui-bootstrap-bower/ui-bootstrap-tpls',
        'flatify': 'flatify/scripts/app'
    },
    shim: {
        'angular': { exports: 'angular', deps: ['jQuery'] },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'twitter-bootstrap': { deps: ['jQuery'] },
        'restangular': { deps: ['angular', 'lodash']},
        'lodash': { exports: '_'},
        'angular-translate': { deps: ['angular'] },
        'angular-translate-loader-url': { deps: ['angular-translate'] },
        'angular-ui': { deps: ['angular'] },
		'flatify': { deps: ['angular'] }
    }
});

var dependencies = ['angular', 'require', 'app'];
require(dependencies, function() {
    'use strict';
});
