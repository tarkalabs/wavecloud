var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var paths = {
  alljs: [
    'app/assets/js/**/*.js',
    'server/**/*.js',
    'test/**/*.js'
  ],
  appjs: 'app/assets/js/**/*.js',
  testsjs: 'test/**/*.js',
  serverjs: 'server/**/*.js',
  assets: {
    less: 'app/assets/less/**/*.less'
  }
};

gulp.task('test', function () {
  return gulp.src(paths.testsjs)
             .pipe(mocha());
});

gulp.task('lint', function () {
  return gulp.src(paths.alljs)
             .pipe(jshint());
});

gulp.task('scripts', function () {
  return gulp.src(paths.appjs)
             // .pipe(uglify())
             .pipe(concat('app.min.js'))
             .pipe(gulp.dest('public/js'));
});

gulp.task('less', function () {
  return gulp.src(paths.assets.less)
             .pipe(less())
             .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
  gulp.watch(paths.alljs, ['lint']);
  gulp.watch(paths.appjs, ['scripts']);
  gulp.watch(paths.assets.less, ['less']);
});

gulp.task('default', ['less',  'scripts',  'watch']);
