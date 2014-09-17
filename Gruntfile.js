'use strict';

module.exports = function(grunt) {
  
  var path = require('path'),
      transpiler = require('bosonic-transpiler');

  grunt.registerMultiTask('bosonic', 'A Grunt task that transpiles to-the-spec Web Components into polyfilled JavaScript', function() {
        
      this.files.forEach(function(f) {
          f.src.filter(function(filepath) {
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file "' + filepath + '" not found.');
                  return false;
              } else {
                  return true;
              }
          }).map(function(filepath) {
              if (grunt.file.isDir(filepath)) {
                  return;
              }
              var basename = path.basename(filepath, '.html'),
                  src = grunt.file.read(filepath),
                  dest = {
                      html: f.dest + basename + '.html',
                      js: f.dest + basename + '.js',
                      css: f.dest + basename + '.css'
                  },
                  transpiled = transpiler.transpile(src, { automaticTemplating: true, wrap: true });

              grunt.file.write(dest.html, transpiled.html);
              grunt.log.writeln('File ' + dest.html + ' created.');

              grunt.file.write(dest.js, transpiled.js);
              grunt.log.writeln('File ' + dest.js + ' created.');

              grunt.file.write(dest.css, transpiled.css);
              grunt.log.writeln('File ' + dest.css + ' created.');
          });
      });
  });

  grunt.initConfig({

    connect: {
      test: {
        options: {
          port: 8020,
          base: ['dist', 'node_modules', 'demo'],
          hostname: '*'
        }
      }
    },

    karma: {
      local: {
        configFile: 'karma.conf.js'
      },
      saucelabs: {
        configFile: 'karma.conf.sauce.js'
      }
    },

    bosonic: {
      elements: {
        src: ['src/*.html'],
        dest: 'dist/'
      }
    },

    watch: {
      elements: {
        files: ['src/*.html'],
        tasks: ['bosonic']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  //grunt.loadNpmTasks('grunt-bosonic');

  grunt.registerTask('default', ['bosonic', 'connect', 'watch']);
  grunt.registerTask('test', ['bosonic', 'karma:local']);

};