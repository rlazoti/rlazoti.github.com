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

  config.less = {
    options: {
      paths: ["assets/less"]
    },
    development: {
      files: {
        "assets/css/site.css": "assets/less/site.less"
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-jekyll");

  grunt.registerTask('default', ["less:development", "jekyll:serve"]);

};
