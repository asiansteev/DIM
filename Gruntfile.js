// Generated on 2015-06-22 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    build: 'build',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        //tasks: ['newer:jshint:all', 'copy:build']
        tasks: ['copy:watch']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:build', 'autoprefixer:build', 'copy:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.build %>/{,*/}*',
            '!<%= yeoman.build %>/.git{,*/}*'
          ]
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      build: {
        options: {
          sourceMap: true,
          includePaths: ['bower_components']
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourceMap: true,
          includePaths: ['bower_components']
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      build: {
        src: [
          '<%= yeoman.build %>/scripts/{,*/}*.js',
          '<%= yeoman.build %>/styles/{,*/}*.css',
          '<%= yeoman.build %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.build %>/styles/fonts/*'
        ]
      },
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    useminPrepareBuild: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.build %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    useminBuild: {
      html: ['<%= yeoman.build %>/{,*/}*.html'],
      css: ['<%= yeoman.build %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.build %>',
          '<%= yeoman.build %>/images',
          '<%= yeoman.build %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.build %>/images'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.build %>/images'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      build: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.build %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.build %>'
        }]
      },
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      build: {
        html: ['<%= yeoman.build %>/*.html']
      },
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/*.gif',
            '**/*.json',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.build %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.tmp/styles',
          dest: '<%= yeoman.build %>/styles',
          src: ['{,*/}*.css']
        }, {
          expand: true,
          cwd: 'app',
          dest: '<%= yeoman.build %>',
          src: ['**/*.js']
        }, {
          expand: true,
          cwd: 'app/common',
          dest: '<%= yeoman.build %>/common',
          src: ['**/*.jpg', '**/*.png']
        }, {
          expand: true,
          cwd: 'app/img',
          dest: '<%= yeoman.build %>/img',
          src: ['**/*.jpg', '**/*.png', '**/*.gif']
        }]
      },
      watch: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '**/*.json',
            'images/*.gif',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.build %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.tmp/styles',
          dest: '<%= yeoman.build %>/styles',
          src: ['{,*/}*.css']
        }, {
          expand: true,
          cwd: 'app',
          dest: '<%= yeoman.build %>',
          src: ['**/*.js']
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '**/*.json',
            'images/*.gif',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'app/extension-scripts',
          dest: '<%= yeoman.build %>/extension-scripts',
          src: ['*.js']
        }, {
          expand: true,
          cwd: 'app/common',
          dest: '<%= yeoman.build %>/common',
          src: ['**/*.jpg', '**/*.png']
        }, {
          expand: true,
          cwd: 'app/img',
          dest: '<%= yeoman.build %>/img',
          src: ['**/*.jpg', '**/*.png', '**/*.gif']
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'sass:server'
      ],
      test: [
        'compass'
      ],
      build: [
        'sass:build',
        'copy:styles',
        'imagemin:build',
        'svgmin:build'
      ],
      dist: [
        'sass:dist',
        'copy:styles',
        'imagemin:dist',
        'svgmin:dist'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('useminPrepareBuild', function() {
    var useminPrepareBuildConfig = grunt.config('useminPrepareBuild');
    grunt.config.set('useminPrepare', useminPrepareBuildConfig);
    grunt.task.run('useminPrepare');
  });

  grunt.registerTask('useminBuild', function() {
    var useminBuildConfig = grunt.config('useminBuild');
    grunt.config.set('usemin', useminBuildConfig);
    grunt.task.run('usemin');
  });

  grunt.registerTask('useminBuild', function() {
    var useminBuildConfig = grunt.config('useminBuild');
    grunt.config.set('usemin', useminBuildConfig);
    grunt.task.run('usemin');
  });

  grunt.registerTask('copyBuild', function() {
    var concatConfig = grunt.config('concat');
    var copyConfig = grunt.config('copy');
    copyConfig.build.files.push({
      expand: true,
      src: concatConfig.generated.files[0].src,
      dot: true,
      cwd: '.',
      dest: '<%= yeoman.build %>'
    });
    grunt.config.set('copy', copyConfig);
    copyConfig = grunt.config('copy');
  });

  grunt.registerTask('copyWatch', function() {
    var concatConfig = grunt.config('concat');
    var copyConfig = grunt.config('copy');
    copyConfig.watch.files.push({
      expand: true,
      src: concatConfig.generated.files[0].src,
      dot: true,
      cwd: '.',
      dest: '<%= yeoman.build %>'
    });
    grunt.config.set('copy', copyConfig);
    copyConfig = grunt.config('copy');
  });

  // grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
  //   if (target === 'dist') {
  //     return grunt.task.run(['build', 'connect:dist:keepalive']);
  //   }
  //
  //   grunt.task.run([
  //     'clean:server',
  //     'wiredep',
  //     'concurrent:server',
  //     'autoprefixer:server',
  //     'watch'
  //   ]);
  // });

  // grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
  //   grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
  //   grunt.task.run(['serve:' + target]);
  // });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer:build',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('watch-build', '', function(target) {
      grunt.task.run([
        'build',
        'watch'
      ]);
  });

  grunt.registerTask('build', '', function(target) {
    if (target === 'dist') {
      grunt.task.run([
        'newer:jshint',
        // 'test',
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer:dist',
        'concat:generated',
        'ngAnnotate:dist',
        'copy:dist',
        // 'cdnify:dist',
        'cssmin:generated',
        'uglify:generated',
        'filerev:dist',
        'usemin',
        'htmlmin:dist',
      ]);
    } else {
      grunt.task.run([
        'clean:build',
        'wiredep',
        'useminPrepareBuild',
        'concurrent:build',
        'copyBuild',
        'autoprefixer:build',
        // 'concat:generated',
        // 'ngAnnotate:build',
        ((target === 'watch') ? 'copy:watch': 'copy:build')
        // 'cdnify:build',
        // 'cssmin:generated',
        // 'uglify:generated',
        // 'filerev:build',
        // 'useminBuild',
        // 'htmlmin:build'
      ]);
    }
  });

  grunt.registerTask('default', [
    'newer:jshint',
    // 'test',
    'build'
  ]);
};
