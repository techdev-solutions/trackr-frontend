module.exports = function (grunt) {
    'use strict';
    var config = {
        distFolder: 'dist',
        name: 'trackr'
    };

    grunt.initConfig({
        config: config,

        jshint: {
            dev: {
                files: [{
                    src: ['src/modules/**/*.js', 'Gruntfile.js']
                }],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                files: [{
                    src: ['test/**/*.js', '!test/test-main.js']
                }]
            }
        },

        usemin: { /* The html file in which to do the actual replacement */
            html: ['<%= config.distFolder %>/index.html']
        },

        useminPrepare: { /* Read what to minimize from the dev html file */
            html: 'index.html',
            options: {
                dest: '<%= config.distFolder %>' /* the concatenated files should be placed in "dist" */
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        dest: '<%= config.distFolder %>',
                        src: [
                            'index.html',
                            'src/views/**',
                            'src/bower_components/**'
                        ]
                    }
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    mainConfigFile: 'bootstrap.js',
                    name: 'bower_components/almond/almond',
                    include: ['app'],
                    insertRequire: ['app'],
                    out: '<%= config.distFolder %>/trackr.js',
                    paths: {
                        'jQuery': 'bower_components/jQuery/dist/jquery.min',
                        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
                        'angular': 'bower_components/angular/angular.min',
                        'angular-route': 'bower_components/angular-route/angular-route.min',
                        'restangular':'bower_components/restangular/dist/restangular.min',
                        'lodash': 'bower_components/lodash/dist/lodash.min'
                    }
                }
            }
        },

        /* Compress Javascript */
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: 'min'
            }
        },

        clean: ['<%= config.distFolder %>'],

        /* Replace JS vendor libs with minified versions */
        processhtml: {
            options: {
                commentMarker: 'process'
            },
            dist: {
                files: {
                    '<%= config.distFolder %>/index.html': '<%= config.distFolder %>/index.html'
                }
            }
        },

        karma: {
            dev: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            test: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', ['jshint:dev', 'karma:dev']);
    grunt.registerTask('test', ['jshint', 'karma:test']);
    grunt.registerTask('dist', ['clean', 'useminPrepare', 'concat', 'copy', 'requirejs', 'uglify', 'cssmin', 'usemin', 'processhtml']);
};