module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      libs: __dirname + '/public/assets/js/libs',
      src: __dirname + '/src',
      dest: __dirname + '/public/assets',
      drunkenparrot: __dirname + '/src/style/vendor/drunken-parrot',
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
        dest: '<%=dirs.dest%>/js/libs/drunkenparrot.combined.js'
      },
      css: {
        src: [
          '<%=dirs.drunkenparrot%>/bootstrap/css/bootstrap.css',
          '<%=dirs.drunkenparrot%>/css/font-awesome.min.css',
          '<%=dirs.drunkenparrot%>/css/drunken-parrot.css',
        ],
        dest: '<%=dirs.dest%>/css/drunkenparrot.combined.css'
      },
    },
    uglify: {
      options: {
        banner: '/*!\n<%= pkg.name %> libraries, <%= vars.dateFormatted %> \n*/\n\n'
      },
      dist: {
        src: ['<%= concat.drunkenjs.dest %>'],
        dest: '<%=dirs.dest%>/js/libs/drunkenparrot.combined.min.js'
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
        dest: '<%=dirs.dest%>/css/main.css'
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
            cwd: '<%=dirs.drunkenparrot%>/bootstrap/fonts/',
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
        '<%=dirs.dest%>/js/libs/drunkenparrot.combined.js',
        '<%=dirs.dest%>/js/libs/drunkenparrot.combined.min.js'
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
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'copy']);

};
