var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var crx = require('gulp-crx-pack');
var manifest = require('./src/manifest');
var fs = require('fs');


gulp.task('scripts', function () {
    gulp.src(['common.js', 'recipes/*Recipe.js', 'child_recipes/*Recipe.js', 'recorder.js'])
        .pipe(concat('inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watchjs', function () {
    gulp.watch(['**/*.js', '!inject.js', '!options/*.js'], ['scripts']);
});

gulp.task('urls-dev', function () {
    gulp.src(['./src/background.js', './src/contentscript.js'])
        .pipe(preprocess({context: {DEBUG: true}}))
        .pipe(gulp.dest('./src/dist/'))
});

gulp.task('dev', ['scripts', 'urls-dev', 'watchjs']);

gulp.task('urls-prod', function () {
    gulp.src(['./src/background.js', './src/contentscript.js'])
        .pipe(preprocess())
        .pipe(gulp.dest('./src/dist/'))
});

gulp.task('crx', function () {
    return gulp.src('./src')
        .pipe(crx({
            privateKey: fs.readFileSync('./repeatit.pem', 'utf8'),
            filename: manifest.name + '-' + manifest.version + '.crx'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('prod', ['scripts', 'urls-prod', 'crx']);


