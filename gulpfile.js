const gulp = require('gulp')

// gulp.task('polyfill', () => {
//   return gulp.src(['./src/polyfill.js'])
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist'))
// })

gulp.task('styles', () => {
  return gulp.src(['./src/style/**/*'])
    .pipe(gulp.dest('./lib/style'))
})

// gulp.task('build', ['polyfill'], () => {
//   gulp.src(['./dist/polyfill.js', './dist/olasearch.core.latest.js'])
//     .pipe(concat('olasearch.core.min.latest.js'))
//     .pipe(gulp.dest('./dist'))
// })
