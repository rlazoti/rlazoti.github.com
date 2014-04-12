module.exports = function(grunt) {
  var config = {};

  config.jekyll = {
    options: {
      bundleExec: true,
      src: '<%= app %>'
    },
    serve: {
      options: {
        dest: '_site',
        drafts: true,
        watch: true,
        server: true
      }
    }
  };

  config.clean = ["assets/css/", "assets/js/"];

  config.cssmin = {
    minify: {
      expand: true,
      cwd: '_assets/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'assets/css/',
      ext: '.min.css'
    }
  };

  config.uglify = {
    production: {
      files: {
        'assets/js/app.min.js': ['_assets/js/app.js']
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ["jekyll:serve"]);
  grunt.registerTask('build', ['clean', 'cssmin', 'uglify']);
};
