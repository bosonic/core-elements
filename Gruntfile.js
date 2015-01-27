'use strict';

module.exports = function(grunt) {
  
  var path = require('path'),
      transpiler = require('bosonic');

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
                      native: f.dest + basename + '.native.html',
                      html: f.dest + basename + '.html',
                      js: f.dest + basename + '.js',
                      css: f.dest + basename + '.css'
                  },
                  nativeElement = transpiler.transpileToNativeElement(src),
                  polymer = transpiler.transpileForPolymerPlatform(src),
                  transpiled = transpiler.transpileForBosonicPlatform(src);

              grunt.file.write(dest.native, nativeElement);
              grunt.log.writeln('File ' + dest.native + ' created.');

              grunt.file.write(dest.html, polymer);
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
      test_platforms: {
        options: {
          port: 8020,
          base: ['.', 'test/platforms'],
          hostname: '*'
        }
      },
      demos: {
        options: {
          port: 8021,
          base: ['.', 'demo'],
          hostname: '*'
        }
      }
    },

    karma: require('bosonic-tools/test/config/grunt-karma')({
      options: {
        sauceLabs: {
          testName: 'Bosonic Core Elements Unit Tests',
          recordScreenshots: true
        },
        files: [
          'node_modules/bosonic-tools/test/helpers/npo.js',
          'node_modules/bosonic-tools/test/helpers/karma.js',
          'node_modules/bosonic/dist/bosonic-platform.js',
          'dist/b-selectable.js',
          'dist/*.js',
          'test/**/*.js'
        ]
      }
    }),

    bosonic: {
      elements: {
        src: ['src/*.html'],
        dest: 'dist/'
      }
    },

    htmlbuild: {
      bosonic: {
        src: 'test/platforms/src/demo_page.html',
        dest: 'test/platforms/bosonic_platform.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            platform: 'node_modules/bosonic/dist/bosonic-platform.js',
            elements: ['dist/b-selectable.js', 'dist/*.js']
          },
          styles: {
            elements: ['dist/*.css']
          },
          sections: {
            imports: []
          },
          data: {
            platform: 'Bosonic platform'
          },
        }
      },
      polymer: {
        src: 'test/platforms/src/demo_page.html',
        dest: 'test/platforms/polymer_platform.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            platform: 'test/platforms/polymer_platform.js',
            elements: []
          },
          styles: {
            elements: []
          },
          sections: {
            imports: 'test/platforms/src/polymer_imports.html'
          },
          data: {
            platform: 'Polymer platform'
          },
        }
      },
      runtime: {
        src: 'test/platforms/src/demo_page.html',
        dest: 'test/platforms/bosonic_runtime.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            platform: [
              'node_modules/bosonic/dist/bosonic-platform.js', 
              'node_modules/bosonic/dist/bosonic-runtime.js'
            ],
            elements: []
          },
          styles: {
            elements: []
          },
          sections: {
            imports: 'test/platforms/src/bosonic_runtime_imports.html'
          },
          data: {
            platform: 'Bosonic runtime'
          },
        }
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
  grunt.loadNpmTasks('grunt-html-build');
  //grunt.loadNpmTasks('grunt-bosonic');

  grunt.registerTask('demo', ['bosonic', 'htmlbuild', 'connect', 'watch']);
  grunt.registerTask('test', ['bosonic', 'karma:local']);
  grunt.registerTask('default', ['demo']);

};