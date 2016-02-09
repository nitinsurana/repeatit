var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    gulp.src(['common.js', 'PassageRecipe.js'])
        .pipe(concat('inject.js'))
        .pipe(uglify())
        //.pipe(gulp.dest('inject_uglified.js'))
        .pipe(gulp.dest('./'));
});