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

  var customLaunchers = {
    desktop: {
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '35'
      },
      sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '30'
      }
    },
    android: {
      sl_android_44: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.4'
      }
    },
    safari: {
      sl_osx_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      sl_ios_safari: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '7.1'
      }
    },
    ie: {
      sl_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
      },
      sl_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
      },
      sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      }
    }
  };

  grunt.initConfig({

    connect: {
      test: {
        options: {
          port: 8020,
          base: ['.', 'demo'],
          hostname: '*'
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        environment: 'saucelabs',
        sauceLabs: {
            testName: 'Bosonic Core Elements Unit Tests',
            recordScreenshots: true
        },
        reporters: ['dots', 'saucelabs'],
        singleRun: true,
        files: [
          'node_modules/native-promise-only/npo.js',

          'node_modules/bosonic/dist/bosonic-platform.js',
          'dist/b-selectable.js',
          'dist/*.js',
          'test/**/*.js'
        ],
      },
      local: {
        environment: 'local',
        browsers: ['Chrome', 'Firefox'],
        reporters: ['progress'],
        singleRun: false
      },
      ie: {
        customLaunchers: customLaunchers.ie,
        browsers: Object.keys(customLaunchers.ie),
      },
      safari: {
        customLaunchers: customLaunchers.safari,
        browsers: Object.keys(customLaunchers.safari),
      },
      android: {
        customLaunchers: customLaunchers.android,
        browsers: Object.keys(customLaunchers.android),
      }
    },

    bosonic: {
      elements: {
        src: ['src/*.html'],
        dest: 'dist/'
      }
    },

    htmlbuild: {
      bosonic: {
        src: 'demo/src/demo_page.html',
        dest: 'demo/bosonic_platform.html',
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
        src: 'demo/src/demo_page.html',
        dest: 'demo/polymer_platform.html',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            platform: 'demo/polymer_platform.js',
            elements: []
          },
          styles: {
            elements: []
          },
          sections: {
            imports: 'demo/src/polymer_imports.html'
          },
          data: {
            platform: 'Polymer platform'
          },
        }
      },
      runtime: {
        src: 'demo/src/demo_page.html',
        dest: 'demo/bosonic_runtime.html',
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
            imports: 'demo/src/bosonic_runtime_imports.html'
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