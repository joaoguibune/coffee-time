'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var config = {
        app: 'app/'
    };

    grunt.initConfig({
        config: config,

        watch: {
            options: {
                livereload: true
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wireUp'],
                options: {
                  spawn: false,
                },
            },
            sass: {
                files: ['<%= config.app %>styles/*.scss'],
                tasks: ['sass'],
                options: {
                    interrupt: true
                }
            },
            html: {
                files: ['<%= config.app %>*.html'],
            },
            css: {
                files: ['<%= config.app %>css/**/*.css'],
            },
            js: {
                files: ['<%= config.app %>scripts/**/*.js'],
                tasks: ['jshint'],
            },
            img: {
                files: ['<%= config.app %>img/**/*.{jpg,png,gif,ico}'],
            },
            fonts: {
                options: {
                    cwd: '<%= config.app %>'
                },
                files: ['*.zip'],
                tasks: ['iconfonts']
            }
        },

        exec: {
            installDependencies: {
                command: 'bower install',
                stdout: true
            }
        },

        bowerRequirejs: {
            target: {
                rjsConfig: 'Assets/js/common.js'
            }
        },

        wiredep: {
            task: {
                src: ['<%= config.app %>*.html']
            }
        },

        sass: {
            server: {
                options: {
                    sourcemap: 'auto',
                    trace: true,
                    style: 'expanded',
                    lineNumbers: true,
                    includePaths: [
                        'bower_components/bourbon/app/assets/stylesheets/',
                        'bower_components/neat/app/assets/stylesheets/',
                        'bower_components/normalize-scss/'
                    ],
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>styles',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: ['bower_components/**/*.js']
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>scripts/**/*.js'
            ]
        },

        iconfonts: {
            icomoon: {
                options: {
                    src: './icomoon.zip',
                    cssDest: '<%= config.app %>styles/_icons.scss',
                    fontsDest: '<%= config.app %>fonts/icomoon',
                    fontsUrl: '../fonts/icomoon'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= config.app %>'
                }
            }
        }
    });


    // ================ Grunt Register Tasks ==============//
    grunt.registerTask('wireUp', ['exec:installDependencies', 'bowerRequirejs', 'wiredep']);
    grunt.registerTask('default', ['connect', 'watch']);
};
