var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var runSequence = require("run-sequence");
var shell = require('gulp-shell');
var env = require('gulp-dev');

gulp.task("serve", shell.task([
  "npm start"
]));

// Test
gulp.task('webdriver_update', plugins.protractor.webdriver_update);

gulp.task("protractor", function(cb) {
  setTimeout(function() {
    gulp.src(["./test/spec/**/*.js"])
      .pipe(plugins.protractor.protractor({
          configFile: "test/protractor.config.js",
          args: [
            '--baseUrl', 'http://127.0.0.1:8080',
          ]
      }))
      .on('error', function(e) { throw e })
      .on('end', function() {
        cb();
      });
  }, 250);
});

gulp.task('set-env', function () {
    env({
        vars: {
            NODE_ENV: 'test'
        }
    });
});

gulp.task("test", function(cb) {
  runSequence('set-env', "webdriver_update", "protractor", cb);
});

gulp.task("default", function(cb) {
  runSequence("serve", cb);
});
