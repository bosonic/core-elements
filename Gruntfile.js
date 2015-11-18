'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('bosonic', 'Elements build task', function(target) {      
    var path = require('path'),
        posthtml = require('posthtml'),
        postcss = require('postcss');

    var done = this.async();

    var variablesFile = this.data.theme + '/variables.css';
    if (!grunt.file.exists(variablesFile)) {
      grunt.fatal('A theme must have a `variables.css` file (' + variablesFile + ' not found)');
    }

    var themeFile = this.data.theme + '/theme.css';
    if (!grunt.file.exists(themeFile)) {
      grunt.fatal('A theme must have a `theme.css` file (' + themeFile + ' not found)');
    }

    var cssVariables = grunt.file.read(variablesFile),
        themeCss = grunt.file.read(themeFile),
        themeDest = this.data.dest + '/theme.css';

    var processStyleTag = function pluginName(options) {
      options = options || {};

      return function(tree) {
        return new Promise(function(resolve) {
          var tasks = [];
          tree.walk(function(node) {
            if (node.tag && node.tag === 'style') {
              tasks.push(
                postcss([ require('postcss-custom-properties'),
                          require('postcss-color-function') ])
                  .process(cssVariables + node.content[0])
                  .then(function(result) {
                    node.content[0] = result.css;
                  })
              );
            }
            return node;
          });
          Promise.all(tasks).then(function() {
            resolve(tree);
          }).catch(function(error) {
              grunt.fatal(error);
          });
        });
      };
    };

    var tasks = [];

    this.files.forEach(function(f) {
      Array.prototype.push.apply(tasks, f.src.map(function(filepath) {
        var html = grunt.file.read(filepath);

        return posthtml()
          .use(processStyleTag())
          //.use(require('posthtml-custom-elements')())
          .process(html)
          .then(function(result) {
            var dest = f.dest + '/' + path.basename(filepath);
            grunt.file.write(dest, result.html);
            grunt.log.writeln('File ' + dest + ' created.');
          });
      }));
    });

    tasks.push(
      postcss([ require('postcss-import'),
                require('postcss-custom-properties'),
                require('postcss-color-function') ])
        .process(themeCss, { from: themeFile })
        .then(function(result) {
          grunt.file.write(themeDest, result.css);
          grunt.log.writeln('File ' + themeDest + ' created.');
        })
    );

    Promise.all(tasks).then(function() {
      done();
    }).catch(function(error) {
      if (error.name === 'CssSyntaxError') {
        grunt.fatal(error.message + error.showSourceCode());
      } else {
        grunt.fatal(error);
      }
      done(error);
    });

  });

  grunt.initConfig({

    bosonic: {
      defaultTheme: {
        src: ['src/*.html'],
        theme: 'src/themes/default',
        dest: 'dist/default'
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
      runtime: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        dest: 'dist',
        src: [
          'webcomponents.js/webcomponents.js',
          'bosonic/dist/bosonic-runtime.js'
        ]
      }
    },

    watch: {
      runtime: {
        files: [
          'node_modules/bosonic/dist/bosonic-runtime.js'
        ],
        tasks: ['copy:runtime']
      },
      elements: {
        files: [
          'src/*.html'
        ],
        tasks: ['bosonic']
      },
      themes: {
        files: ['src/**/*.css'],
        tasks: ['bosonic']
      }
    }

  });

  grunt.registerTask('dist', ['copy:runtime', 'bosonic']);
  grunt.registerTask('dev', ['dist', 'connect', 'watch']);

  require('load-grunt-tasks')(grunt);
};