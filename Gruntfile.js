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
        serve: true
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
    dist: {
      files: {
        "assets/js/app.min.js": ["_assets/js/app.js"]
      }
    }
  };

  config.release = {
    options: {
      push: true,
      pushTags: true,
      npm: false,
      tagName: 'version-<%= version %>',
      commitMessage: '[BUILD] New release <%= version %>'
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-git");
  grunt.loadNpmTasks("grunt-release");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("defineNextVersion", "Define next release version", function() {
    var regex = new RegExp("^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$"),
        pkg   = grunt.file.readJSON("package.json");

    grunt.option("versionNumber",
                 regex.exec(pkg.version)[1] +
                 regex.exec(pkg.version)[2] +
                 (1 + parseInt(regex.exec(pkg.version)[3], 10)));

    grunt.log.writeln("Next version defined: " + grunt.option("versionNumber"));
  });

  grunt.registerTask("build", ["clean", "cssmin", "uglify"]);
  grunt.registerTask("default", ["build", "jekyll:serve"]);
  grunt.registerTask("release", ["build", "defineNextVersion", "release"]);
};
