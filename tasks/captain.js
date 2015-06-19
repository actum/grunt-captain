/*
 * grunt-captain
 *
 * Copyright (c) 2015 Actum
 * Licensed under the MIT license.
 */

'use strict';

var swig = require('swig');

module.exports = function(grunt) {

    grunt.registerMultiTask('captain', 'Static site generator for prototyping front-end projects.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            data: {}
        });

        var collectUtilData = function(files) {
            var pages = [];
            files.forEach(function(file) {
                pages.push(file.dest.replace(file.orig.dest, ''));
            });
            return {
                $: {
                    pages: pages
                }
            };
        };

        var utilData = collectUtilData(this.files);

        this.files.forEach(function(file) {
            var filePath = file.src[0];
            var template = grunt.file.read(filePath);
            options.data.$ = utilData.$;

            var tpl = swig.render(template, {
                filename: filePath,
                locals: options.data,
                cache: false
            });

            grunt.file.write(file.dest, tpl);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};
