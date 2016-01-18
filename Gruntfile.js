/*
 * css-spliter
 *
 *
 * Copyright (c) 2016 xiaoweili@tencent.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    css_media_spliter: {
      default: {
        options: {
          dist: 'test/css/build/'
        },
        files: [{src: 'test/css/g.css'}]
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'css_spliter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
