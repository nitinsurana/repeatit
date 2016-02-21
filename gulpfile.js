/* jshint ignore:start */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var crx = require('gulp-crx-pack');
var manifest = require('./src/manifest');
var fs = require('fs');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
    return gulp.src(['./src/**/*.js', '!./src/dist/*.js', '!./src/inject.js', '!./src/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'], function () {
    gulp.src(['src/common.js', 'src/recipes/*Recipe.js', 'src/child_recipes/*Recipe.js', 'src/recorder.js'])
        .pipe(concat('src/inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watchjs', ['lint'], function () {
    gulp.watch(['**/*.js', '!inject.js', '!options/*.js'], ['scripts']);
    gulp.watch(['src/background.js', 'src/contentscript.js'], ['urls-dev']);
});

gulp.task('urls-dev', ['lint'], function () {
    gulp.src(['./src/background.js', './src/contentscript.js'])
        .pipe(preprocess({context: {DEBUG: true}}))
        .pipe(gulp.dest('./src/dist/'));
});

gulp.task('dev', ['lint', 'scripts', 'urls-dev', 'watchjs']);

gulp.task('urls-prod', function () {
    gulp.src(['./src/background.js', './src/contentscript.js'])
        .pipe(preprocess())
        .pipe(gulp.dest('./src/dist/'));
});

gulp.task('crx', function () {
    return gulp.src('./src')
        .pipe(crx({
            privateKey: fs.readFileSync('./repeatit.pem', 'utf8'),
            filename: manifest.name + '-' + manifest.version + '.crx'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('prod', ['lint', 'scripts', 'urls-prod', 'crx']);

/* jshint ignore:end*/


