'use strict';
var LIVERELOAD_PORT = 35725;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // angular html5 routing with rewrite
  var modRewrite = require('connect-modrewrite');

  grunt.initConfig({
    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'app/**/*.*'
        ]
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || 9000,
        hostname: grunt.option('host') || 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [
              modRewrite([
                '!\\.\\w+(\\?.*)?$ /'
              ]),
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app'),
              connect.static(options.base)
            ];
          }
        }
      },
      test: {
        options: {
          port: grunt.option('port') || 9001,
          middleware: function(connect) {
            return [
              modRewrite([
                '!\\.\\w+(\\?.*)?$ /'
              ]),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/js/{,*/}*.js'
      ]
    },
    rev: {
      dist: {
        files: {
          src: [
            'dist/scripts/{,*/}*.js',
            'dist/styles/{,*/}*.css',
            'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '!dist/images/norev/*',
            'dist/styles/fonts/*'
          ]
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
  });

  // stylus task declaration
  //grunt.loadNpmTasks('grunt-contrib-stylus');

  // overidding compass task if necessary
  // grunt.registerTask('compass', ['stylus']);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'connect:test',
    'karma'
  ]);



  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);
};
