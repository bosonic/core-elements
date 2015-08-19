'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    connect: {
      doc: {
        options: {
          port: 8020,
          base: ['.', 'demo'],
          hostname: '*'
        }
      }
    },

    copy: {
      lib: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        dest: 'demo/lib',
        src: [
          'webcomponents.js/webcomponents.js',
          'bosonic/dist/bosonic-runtime.js'
        ]
      },
      elements: {
        expand: true,
        flatten: true,
        cwd: 'src',
        dest: 'demo/lib',
        src: '*.html'
      }
    },

    watch: {
      elements: {
        files: [
          'src/*.html'
        ],
        tasks: ['copy:elements']
      }
    }

    // karma: require('bosonic-tools/test/config/grunt-karma')({
    //   options: {
    //     sauceLabs: {
    //       testName: 'Bosonic Core Elements Unit Tests',
    //       recordScreenshots: true
    //     },
    //     files: [
    //       'node_modules/bosonic-tools/test/helpers/npo.js',
    //       'node_modules/bosonic-tools/test/helpers/karma.js',
    //       'node_modules/bosonic/dist/bosonic-platform.js',
    //       'dist/b-selectable.js',
    //       'dist/*.js',
    //       'test/**/*.js'
    //     ]
    //   }
    // }),

  });

  grunt.registerTask('demo', ['copy', 'connect', 'watch']);

  require('load-grunt-tasks')(grunt);
};