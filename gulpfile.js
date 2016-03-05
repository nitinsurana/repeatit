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
    gulp.src(['src/dist/common.js', 'src/recipes/*Recipe.js', 'src/child_recipes/*Recipe.js', 'src/dist/recorder.js'])
        .pipe(concat('src/inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watchjs', function () {
    gulp.watch(['./src/**/*.js', '!./src/inject.js', '!./src/options/*.js'], ['scripts']);
    gulp.watch(['src/background.js', 'src/contentscript.js', 'src/common.js', 'src/recorder.js'], ['urls-dev', 'scripts']);
});

gulp.task('urls-dev', ['lint'], function () {
    gulp.src(['./src/background.js', './src/contentscript.js', './src/common.js', './src/recorder.js'])
        .pipe(preprocess({context: {DEBUG: true}}))
        .pipe(gulp.dest('./src/dist/'));
});

gulp.task('dev', ['lint', 'scripts', 'urls-dev', 'watchjs']);

gulp.task('urls-prod', function () {
    gulp.src(['./src/background.js', './src/contentscript.js', './src/common.js', './src/recorder.js'])
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

gulp.task('prod', ['lint', 'urls-prod', 'scripts', 'crx']);

/* jshint ignore:end*/


