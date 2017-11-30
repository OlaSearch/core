const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

gulp.task('polyfill', () => {
  gulp.src(['./src/polyfill.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['polyfill'], () => {
  gulp.src(['./dist/polyfill.js', './dist/olasearch.core.latest.js'])
    .pipe(concat('olasearch.core.min.latest.js'))
    .pipe(gulp.dest('./dist'))
})
