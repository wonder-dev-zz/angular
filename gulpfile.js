var     gulp        = require('gulp'),
        useref      = require('gulp-useref');
        gulpif      = require('gulp-if'),
        uglify      = require('gulp-uglify'),
        minifyCss   = require('gulp-minify-css');
        clean       = require('gulp-clean');

var assets = useref.assets();

gulp.task('clean', function(){
    return gulp.src('./dist', {read: false}).pipe(clean());
});


gulp.task('minify',['clean'], function(){
    return gulp.src('./*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['minify'], function(){
    gulp.src('./assets/font/*')
        .pipe(gulp.dest('./dist/assets/font'));

    return gulp.src('./views/*.html')
        .pipe(gulp.dest('./dist/views'));
});