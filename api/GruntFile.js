'use strict';

module.exports = function (grunt) {
    //grunt.file.setBase('../');

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {config: 'package.json'});

    /**
     * configurable paths
     */
    var app_config = {
        app  : './system',
        svn  : {repo: '', username: '', password: ''},
        php  : {},
        /**
         * rsync host is defined in ~/.ssh/config
         */
        rsync: {
            local: {
                dest: '/Users/stephenhamilton/Sites/imac.api'
            },
            mini: {
                host: 'mini',
                dest: '~/Sites/mini.api'
            },
            stage: {
                host: 'ds1512_stephen',
                dest: '/volume1/web/api.stephenhamilton.co.uk'
            },
            nas       : {
                host: 'ds918_stephen',
                dest: '/volume1/web/api.stephenhamilton.co.uk'
            }
        }
    };

    grunt.initConfig({
        pkg            : grunt.file.readJSON('package.json'),
        cfg            : app_config,
        project_svninfo: {'rev': 'null', 'last': {'author': 'null', 'date': 'null'}},
        rsync          : {
            options    : {
                ssh      : true,
                recursive: true,
                args     : ['--verbose', '--compress', '--archive']
                //exclude: ['.DS_Store', '.svn', '*.txt','vendor']
            },
            local: {
                options: {
                    src    : '<%= cfg.app %>/',
                    dest   : '<%= cfg.rsync.local.dest %>',
                    exclude: ['.DS_Store', '.svn', '*.txt', '.env', 'storage', 'bootstrap/cache']
                }
            },
            mini: {
                options: {
                    src    : '<%= cfg.app %>/',
                    host   : '<%= cfg.rsync.mini.host %>',
                    dest   : '<%= cfg.rsync.mini.dest %>',
                    exclude: ['.DS_Store', '.svn', '*.txt', '.env', 'storage', 'bootstrap/cache']
                }
            },
            mini_server: {
                options: {
                    src    : '<%= cfg.app %>/',
                    host   : '<%= cfg.rsync.stage.host %>',
                    dest   : '<%= cfg.rsync.stage.dest %>',
                    exclude: ['.DS_Store', '.svn', '*.txt', '.env', 'storage', 'bootstrap/cache']
                }
            },
            nas        : {
                options: {
                    src    : '<%= cfg.app %>/',
                    host   : '<%= cfg.rsync.nas.host %>',
                    dest   : '<%= cfg.rsync.nas.dest %>',
                    exclude: ['.DS_Store', '.svn', '*.txt', '.env', 'storage', 'bootstrap/cache']
                }
            }
        }
    });

    grunt.registerTask('0.deploy_local', [
        'rsync:local'
    ]);

    grunt.registerTask('1.deploy_mini', [
        'rsync:mini'
    ]);

    grunt.registerTask('2.deploy_stage', [
        'rsync:mini_server'
    ]);

    grunt.registerTask('3.deploy_nas', [
        'rsync:nas'
    ]);
};
