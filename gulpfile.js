const gulp = require('gulp')
const concat = require('gulp-concat')
const clean = require('gulp-clean')

gulp.task('polyfill', () => {
  return gulp.src(['./dist/olasearch.polyfill.min.js', './dist/olasearch.core.latest.js'])
    .pipe(concat('olasearch.core.min.latest.js'))
    .pipe(gulp.dest('./dist'))    
})

gulp.task('clean', ['polyfill'], () => {
  return gulp.src(
      ['./dist/olasearch.polyfill.min.js', './dist/olasearch.core.latest.js'],
      { read: false }
    )
    .pipe(clean())
})

gulp.task('styles', () => {
  return gulp.src(['./src/style/**/*'])
    .pipe(gulp.dest('./lib/style'))
})

gulp.task('default', [ 'styles', 'polyfill', 'clean'])
