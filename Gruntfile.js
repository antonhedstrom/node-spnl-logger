module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      libs: 'public/assets/js/libs',
      src: 'src',
      dest: 'public/assets',
    },
    vars: {
      name: '<%=pkg.name.toLowerCase()%>',
      dateFormatted: grunt.template.today("yyyy-mm-dd")
    },
    concat: {
      options: {
        separator: ';'
      },
      jslibs: {
        src: [
          '<%=dirs.libs%>/jquery-2.1.1.min.js',
          '<%=dirs.libs%>/underscore.js',
          '<%=dirs.libs%>/backbone.js',
          '<%=dirs.libs%>/backbone.marionette.js'
        ],
        dest: '<%=dirs.libs%>/_libs.combined.js'
      }
    },
    uglify: {
      options: {
        banner: '/*!\n<%= pkg.name %> libraries, <%= vars.dateFormatted %> \n*/\n\n'
      },
      dist: {
        src: ['<%= concat.jslibs.dest %>'],
        dest: '<%=dirs.dest%>/js/libs.min.js'
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
        lineNumbers: true
      },
      dev: {
        src: ['<%=dirs.src%>/sass/app.scss'],
        dest: '<%=dirs.dest%>/css/app.css'
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'qunit']
      },
      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['sass:dev']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('style', ['sass:dev']);

  grunt.registerTask('default', ['jshint', 'concat:jslibs', 'uglify', 'sass']);

};
