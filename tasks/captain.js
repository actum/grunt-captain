/*
 * grunt-captain
 *
 * Copyright (c) 2015 Jan Panschab
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var swig = require('swig');
var JSON5 = require('json5');
var merge = require('lodash.merge');

module.exports = function(grunt) {

    grunt.registerMultiTask('captain', 'Static site generator for prototyping front-end projects.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            data: {}
        });

        var parseRequiredData = function(template, basedir) {
            var regex = /^(\s*require\(\'([\s\S]+?)\'\)\;\s*)/i;
            var match = regex.exec(template);
            var data = {};
            var body = '';

            if (match && match.length) {
                var dataPath = match[match.length - 1];
                var normalizedDataPath = path.normalize(path.join(basedir, dataPath));
                var dataString = grunt.file.read(normalizedDataPath);

                data = JSON5.parse(dataString);
                body = template.replace(match[0], '');
            } else {
                body = template;
            }

            return {
                data: data,
                body: body
            };
        };

        var parseJsonFrontMatter = function(template) {
            var regex = /^(\s*\{\{\{([\s\S]+?)\}\}\}\s*)/i;
            var match = regex.exec(template);
            var data = {};
            var body = '';

            if (match && match.length) {
                var data = JSON5.parse('{' + match[match.length - 1].replace(/^\s+|\s+$/g, '') + '}'); // TODO remove replace

                body = template.replace(match[0], '');
            } else {
                body = template;
            }

            return {
                data: data,
                body: body
            };
        };

        this.files.forEach(function(file) {
            var filePath = file.src[0];
            var template = grunt.file.read(filePath);
            var basedir = path.dirname(filePath);
            var out = parseRequiredData(template, basedir);
            var out2 = parseJsonFrontMatter(out.body);
            var data = merge({}, options.data, out.data, out2.data);

            var tpl = swig.render(out2.body, {
                filename: filePath,
                locals: data
            });

            grunt.file.write(file.dest, tpl);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};
