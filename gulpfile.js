var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    gulp.src(['common.js', '*Recipe.js'])
        .pipe(concat('inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});