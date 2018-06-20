module.exports = function(grunt) {
  var config = {};

  config.jekyll = {
    options: {
      bundleExec: true,
      src: "<%= app %>"
    },
    serve: {
      options: {
        dest: "_site",
        drafts: true,
        watch: true,
        serve: true,
        host: "0.0.0.0",
        port: 4000
      }
    }
  };

  config.clean = ["assets/css/", "assets/js/"];

  config.cssmin = {
    combine: {
      files: {
        "_assets/css/app.css": [
          "_assets/css/style.css",
          "_assets/css/syntax.css",
          "_assets/css/font-awesome.css"
        ]
      }
    },
    minify: {
      expand: true,
      cwd: "_assets/css/",
      src: ["app.css", "!*.min.css"],
      dest: "assets/css/",
      ext: ".min.css"
    }
  };

  config.uglify = {
    options: {
      banner: '/* version-<%= grunt.option("versionNumber") %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    dist: {
      files: {
        "assets/js/app.min.js": ["_assets/js/app.js"]
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("build", ["clean", "cssmin", "uglify"]);
  grunt.registerTask("default", ["build", "jekyll:serve"]);
};
