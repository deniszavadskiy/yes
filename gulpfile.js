var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    purge = require('gulp-css-purge');

gulp.task('sass', function () {
    return gulp.src('app/styles/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('css-min', function () {
    return gulp.src(['!app/styles/css/all.min.css', 'app/styles/css/*.css'])
        .pipe(concat('all.css'))
        .pipe(purge())
        .pipe(cssnano())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('build', ['sass', 'css-min'], function () {
    gulp.src('app/styles/css/all.min.css')
        .pipe(gulp.dest('dist/styles'));

    gulp.src('app/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});