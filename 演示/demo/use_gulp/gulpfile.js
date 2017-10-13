var gulp = require('gulp');

var uglify = require('gulp-uglify');  //加载js压缩

var minify = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');

var concat = require("gulp-concat");

var watch = require('gulp-watch');

var debug = require('gulp-debug');

var clean = require('gulp-clean');
// 任务
gulp.task('default', ['js', 'image', 'css']);

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean())
});

gulp.task('js', function () {
    gulp.src('src/js/**/*')
        .pipe(watch('src/js/**/*'))
        .pipe(debug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    // 将你的默认的任务代码放在这
});

// gulp.task('css', function () {
//     gulp.src('src/css/**/*')  //要压缩的css
//         .pipe(minify())
//         .pipe(gulp.dest('dist/css'));
// });

gulp.task('image', function () {
    gulp.src('src/images/**/*')  //要压缩的image
        .pipe(watch('src/images/**/*'))
        .pipe(debug())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('css', function () {
    gulp.src('src/css/**/*')  //要合并的文件
        // .pipe(watch('src/css/**/*'))
        .pipe(concat('min.css'))  // 合并匹配到的js文件并命名为 "min.css"
        .pipe(debug())
        // .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/js/**/*', ['js']);
    // gulp.watch('src/css/**/*', ['css']);
    // gulp.watch('src/images/**/*', ['image']);
})



