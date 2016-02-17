var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var crx = require('gulp-crx-pack');
var manifest = require('./src/manifest');
var fs = require('fs');


gulp.task('scripts', function () {
    gulp.src(['src/common.js', 'src/recipes/*Recipe.js', 'src/child_recipes/*Recipe.js', 'src/recorder.js'])
        .pipe(concat('src/inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watchjs', function () {
    gulp.watch(['**/*.js', '!inject.js', '!options/*.js'], ['scripts']);
    gulp.watch(['src/background.js','src/contentscript.js'],['urls-dev']);
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


