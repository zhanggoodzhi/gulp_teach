const gulp = require('gulp');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");
const es2015 = require("babel-preset-es2015");
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util')

const autoprefix = new LessAutoprefix({
    browsers: ['last 100 versions']
});

gulp.task('less', () => {
    gulp.src('kaola-dev/**/*.less')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('kaola'));
});

gulp.task('js', () => {
    gulp.src("kaola-dev/starter.js")
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(uglify({
            ie8: true,
            mangle: false
        }).on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("kaola"));
})

gulp.task('default', ['less', 'js']);
