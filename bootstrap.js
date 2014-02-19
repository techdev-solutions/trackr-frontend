require.config({
    baseUrl: 'src',
    paths: {
        'jQuery': 'vendor/jquery/dist/jquery',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
        'restangular':'vendor/restangular/dist/restangular',
        'lodash': 'vendor/lodash/dist/lodash'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-ui-router': { deps: ['angular']},
        'jQuery': { exports: '$' },
        'bootstrap': { deps: ['jQuery'] },
        'restangular': { deps: ['angular', 'lodash']},
        'lodash' : { exports: '_'}
    }
});

var dependencies = ['require', 'app'];
require(dependencies, function() {

});
