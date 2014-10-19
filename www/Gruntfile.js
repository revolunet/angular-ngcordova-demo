/* global require, module, process, __dirname */

'use strict';

var path = require('path');

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        autoprefixer: {
            'style-min.css': 'style.css'
        },
        cssmin: {
            'style-min.css': 'style-min.css'
        }
    });

    grunt.registerTask('default', ['autoprefixer', 'cssmin']);

};
