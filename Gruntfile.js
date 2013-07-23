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
        "assets/css/style.css": "assets/less/style.less"
      }
    }
    // ,production: {
    //   options: {
    //     paths: ["assets/less"],
    //     yuicompress: true
    //   },
    //   files: {
    //   }
    // }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-jekyll");

  grunt.registerTask('default', ["less:development", "jekyll:serve"]);

};
