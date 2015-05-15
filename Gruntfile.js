/*
 * grunt-captain
 *
 * Copyright (c) 2015 Jan Panschab
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        captain: {
            options: {
                data: {
                    env: {
                        dev: true
                    }
                }
            },
            compile: {
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: 'tpl/page/', // Src matches are relative to this path.
                    src: ['*.swig'], // Actual pattern(s) to match.
                    dest: 'www/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }, ]
            }
        }

    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['captain']);

};
