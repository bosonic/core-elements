'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('bosonic', 'A Grunt task', function() {      
    var path = require('path'),
        posthtml = require('posthtml'),
        postcss = require('postcss');

    var rootStyles = grunt.file.read('src/b-variables.css');

    var processStyleTag = function pluginName(options) {
      options = options || {};

      return function(tree) {
        return new Promise(function(resolve) {
          tree.match({ tag: 'style' }, function(node) {
            postcss([ require('postcss-custom-properties'),
                      require('postcss-color-function') ])
              .process(rootStyles + node.content[0] /*, { from: 'src/app.css', to: 'app.css' }*/)
              .then(function(result) {
                node.content[0] = result.css;
                resolve(tree);
              });
            
            return node;
          });
        });
      };
    };

    this.files.forEach(function(f) {
      f.src.forEach(function(filepath) {
        var html = grunt.file.read(filepath);

        posthtml()
          .use(processStyleTag())
          //.use(require('posthtml-custom-elements')())
          .process(html/*, options */)
          .then(function(result) {
            var dest = f.dest + '/' + path.basename(filepath);
            grunt.file.write(dest, result.html);
            grunt.log.writeln('File ' + dest + ' created.');
          });
      });
    });
  });

  grunt.initConfig({

    bosonic: {
      files: {
        src: ['src/*.html'],
        dest: 'dist'
      }
    },

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
        cwd: 'dist',
        dest: 'demo/lib',
        src: '*.html'
      }
    },

    postcss: {
      options: {
        processors: [
          require('postcss-import')(),
          require('postcss-custom-properties')(),
          require('postcss-color-function')()
        ]
      },
      dist: {
        files: [{
            /*expand: true,
            cwd: 'web/css/',*/
            src: ['src/b-styles.css'],
            dest: 'demo/styles.css'
        }]
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
        tasks: ['bosonic']
      },
      dist: {
        files: [
          'dist/*.html'
        ],
        tasks: ['copy:elements']
      },
      globalCss: {
        files: ['src/b-styles.css'],
        tasks: ['postcss']
      },
      varCss: {
        files: ['src/b-variables.css'],
        tasks: ['bosonic', 'postcss']
      }
    }

  });

  grunt.registerTask('demo', ['bosonic', 'postcss', 'copy', 'connect', 'watch']);

  require('load-grunt-tasks')(grunt);
};