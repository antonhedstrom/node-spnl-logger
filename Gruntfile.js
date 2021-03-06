module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      libs: __dirname + '/public/assets/js/libs',
      src: __dirname + '/src',
      dest: __dirname + '/public/assets',
      drunkenparrot: __dirname + '/src/style/vendor/drunken-parrot',
      node_modules: __dirname + '/node_modules/'
    },
    vars: {
      name: '<%=pkg.name.toLowerCase()%>',
      dateFormatted: grunt.template.today("yyyy-mm-dd")
    },
    concat: {
      drunkenjs: {
        src: [
          '<%=dirs.drunkenparrot%>/js/checkbox.js',
          '<%=dirs.drunkenparrot%>/js/radio.js',
          '<%=dirs.drunkenparrot%>/js/bootstrap-switch.js',
          '<%=dirs.drunkenparrot%>/js/toolbar.js',
        ],
        dest: '<%=dirs.dest%>/js/local_libs/drunkenparrot.combined.js'
      },
      css_external_libs: {
        src: [
          '<%=dirs.node_modules%>/bootstrap/dist/css/bootstrap.min.css',
          '<%=dirs.drunkenparrot%>/css/font-awesome.min.css',
          '<%=dirs.drunkenparrot%>/css/drunken-parrot.css',
          '<%=dirs.node_modules%>/jquery-datetimepicker/jquery.datetimepicker.css',
          '<%=dirs.node_modules%>/alertify/themes/alertify.core.css',
          '<%=dirs.node_modules%>/alertify/themes/alertify.default.css'
        ],
        dest: '<%=dirs.dest%>/css/libs.css'
      },
    },
    uglify: {
      options: {
        banner: '/*!\n<%= pkg.name %> libraries, <%= vars.dateFormatted %> \n*/\n\n'
      },
      dist: {
        src: ['<%= concat.drunkenjs.dest %>'],
        dest: '<%=dirs.dest%>/js/local_libs/drunkenparrot.combined.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    sass: {
      options: {
        style: 'compressed',
        lineNumbers: true,
        sourcemap: 'none'
      },
      dev: {
        src: '<%=dirs.src%>/style/sass/main.scss',
        dest: '<%=dirs.dest%>/css/app.css'
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: '<%=dirs.drunkenparrot%>/fonts/',
            src: ['**'],
            dest: '<%=dirs.dest%>/fonts/'
          },
          {
            expand: true,
            cwd: '<%=dirs.node_modules%>/bootstrap/dist/fonts/',
            src: ['**'],
            dest: '<%=dirs.dest%>/fonts/'
          }
        ]
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'qunit']
      },
      sass: {
        files: ['<%=dirs.src%>/style/sass/**/*.scss'],
        tasks: ['style']
      }
    },
    clean: {
      css: [
        '<%=dirs.src%>/style/css_built',
        '<%=dirs.dest%>/css'
      ],
      js: [
        '<%=dirs.dest%>/js/local_libs/drunkenparrot.combined.js',
        '<%=dirs.dest%>/js/local_libs/drunkenparrot.combined.min.js'
      ],
      fonts: [
        '<%=dirs.dest%>/fonts'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('style', ['sass:dev']);
  grunt.registerTask('deploy', ['concat', 'uglify', 'copy']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'copy']);

};
