//переменные
const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
// const del = require('del');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const flatten = require('gulp-flatten');




//НАСТРОЙКА БИЛДА - Start
const gulp = require('gulp');
const clean = require('gulp-clean');
const path = require('path');
const htmlreplace = require('gulp-html-replace');
const replace = require('gulp-replace');
//Очищаем папку build перед копированием файлов
gulp.task('clean', () => {
    return gulp.src('build', { read: false, allowEmpty: true })
        .pipe(clean());
});
//Копируем папки images, css, js без изменений
gulp.task('copy', () => {
    return gulp.src(['app/images/**/*', 'app/css/**/*', 'app/js/**/*'], { base: 'app' })
    .pipe(gulp.dest('build'));
});
gulp.task('html', () => {
    return gulp.src('app/**/*.html')
        .pipe(replace('.html"', '"')) // Заменяем .html в атрибутах href на ""
        .pipe(htmlreplace({
        'removeHtmlExtension': {
            src: '',
            tpl: '<link rel="stylesheet" href="%s.css"><script src="%s.js"></script>'
        }
    }))
    .pipe(gulp.dest('build'));
});
//Запускаем задачи по очистке, копированию файлов и обработке html
gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'html')));
// Задача по умолчанию
gulp.task('default', gulp.series('build'));

//НАСТРОЙКА БИЛДА - end






function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles() {
    return src('app/scss/*.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(rename({
        suffix: '.min',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.min.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function htmlInclude() {
    return src('app/html/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch('app/html/**/*.html', htmlInclude);
    // watch(['app/*.html']).on('change', browserSync.reload);
}

//вызовы функций
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.htmlInclude = htmlInclude;

// exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching, htmlInclude);











// ======================================ПОЛНЫЙ текст старого галпа по лекциям Вадима 2020 года
// let gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     rename = require('gulp-rename'),
//     browserSync = require('browser-sync'),
//     autoprefixer = require('gulp-autoprefixer'),
//     concat = require('gulp-concat'),
//     uglify = require('gulp-uglify'),
//     cssmin = require('gulp-cssmin');
// gulp.task('sass', function(){
//     return gulp.src('app/scss/**/*.scss')
//         .pipe(sass({outputStyle: 'compressed'}))
//         .pipe(rename({suffix: ".min"}))
//         .pipe(autoprefixer({
//             overrideBrowserslist: ['last 8 version']
//         }))
//         .pipe(gulp.dest('app/css'))
//         .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('style', function(){
//     return gulp.src([
//         'node_modules/normalize.css/normalize.css',
//         'node_modules/slick-carousel/slick/slick.css',
//         // 'node_modules/magnific-popup/dist/magnific-popup.css',
//         // 'node_modules/rateyo/src/jquery.rateyo.css',
//         // 'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
//         // magnific-popup - всплывающие окна, rateyo - звезды рейтинга, rangeSlider - регулятор цены == плагины отключены, если надо - включить, новые подключаются по аналогии.
//     ])
//         .pipe(concat('libs.min.css'))
//         .pipe(cssmin())
//         .pipe(gulp.dest('app/css'))
// });
// gulp.task('script', function(){
//     return gulp.src([
//         'node_modules/slick-carousel/slick/slick.js',
//         // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
//         // 'node_modules/mixitup/dist/mixitup.js',
//         // 'node_modules/rateyo/src/jquery.rateyo.js',
//         // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
//     ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'))
// });
// gulp.task('html', function(){
//     return gulp.src('app/*.html')
//     .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('js', function(){
//     return gulp.src('app/js/*.js')
//     .pipe(browserSync.reload({stream: true}))
// });
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "app/"
//         }
//     });
// });
// gulp.task('watch', function(){
//     gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // указываем, за кем следим. Если тот, за кем следим, меняется, то выполняется таск sass.
//     gulp.watch('app/*.html', gulp.parallel('html'));   //
//     gulp.watch('app/js/*.js', gulp.parallel('js'));  // чтобы за файлами хтмл и джс было слежение.
// });

// gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))
