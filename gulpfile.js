const gulp = require('gulp')
const concat = require('gulp-concat')
const jsmin = require('gulp-jsmin')

gulp.task('polyfill', () => {
  gulp.src(['./src/polyfill.js'])
    .pipe(jsmin())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['polyfill'], () => {
  gulp.src(['./dist/polyfill.js', './dist/olasearch.core.latest.js'])
    .pipe(concat('olasearch.core.min.latest.js'))
    .pipe(gulp.dest('./dist'))
})
