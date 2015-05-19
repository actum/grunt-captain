/*
 * grunt-captain
 *
 * Copyright (c) 2015 Actum
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

        var parseRequiredJson = function(template, basedir) {
            var regex = /^(\s*require\(\'([\s\S]+?)\'\)\;\s*)/i;
            var match = regex.exec(template);
            var model = {};
            var body = '';

            if (match && match.length) {
                var jsonPath = match[match.length - 1];
                var normalizedJsonPath = path.normalize(path.join(basedir, jsonPath));
                var modelString = grunt.file.read(normalizedJsonPath);

                model = JSON5.parse(modelString);
                body = template.replace(match[0], '');
            } else {
                body = template;
            }

            return {
                model: model,
                body: body
            };
        };

        var parseJsonFrontMatter = function(template) {
            var regex = /^(\s*\{\{\{([\s\S]+?)\}\}\}\s*)/i;
            var match = regex.exec(template);
            var model = {};
            var body = '';

            if (match && match.length) {
                var model = JSON5.parse('{' + match[match.length - 1] + '}');

                body = template.replace(match[0], '');
            } else {
                body = template;
            }

            return {
                model: model,
                body: body
            };
        };

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
            var basedir = path.dirname(filePath);
            var requiredOut = parseRequiredJson(template, basedir);
            var jfmOut = parseJsonFrontMatter(requiredOut.body);
            var model = merge({}, options.data, utilData, requiredOut.model, jfmOut.model);

            var tpl = swig.render(jfmOut.body, {
                filename: filePath,
                locals: model,
                cache: false
            });

            grunt.file.write(file.dest, tpl);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};
