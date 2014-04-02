// Karma configuration
// Generated on Thu Feb 13 2014 16:29:52 GMT+0100 (CET)

module.exports = function (config) {
    'use strict';
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        preprocessors: {
            'src/modules/**/*.js': 'coverage'
        },

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src/modules/**/*.js', included: false},
            {pattern: 'test/**/*Spec.js', included: false}, //I don't have any clue why it must be *Spec. TODO: find out.
            {pattern: 'test/fixtures.js', included: false},
            {pattern: 'test/backendMock.js', included: false},
            {pattern: 'test/baseTestSetup.js', included: false},
            {pattern: 'src/i18n.js', included: false},
            {pattern: 'src/app.js', included: false},
            {pattern: 'src/vendor/**/*.js', included: false},
            'test/test-main.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'teamcity'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome', 'Firefox'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        coverageReporter: {
            type : 'html',
            dir : '../../../../../build/coverage'
        }
    });
};
