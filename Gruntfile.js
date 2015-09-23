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
      lib: {
        files: [
          'node_modules/bosonic/dist/bosonic-runtime.js'
        ],
        tasks: ['copy:lib']
      },
      elements: {
        files: [
          'src/*.html'
        ],
        tasks: ['copy:elements']
      }
    }

  });

  grunt.registerTask('demo', ['copy', 'connect', 'watch']);

  require('load-grunt-tasks')(grunt);
};