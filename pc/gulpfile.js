/**
 * gulp 自动化构建工具
 * gulpfile.js 配置文件
 *
 */
var fs, path, gulp, sass, browserify, source, minifycss, uglify, notify, clean, fileinclude, imagemin, pngquant, cache,
    htmlmin, mergeStream, gutil, plumber, babel, gulpif, minimist, gulpSequence, eslint, del;

fs = require('fs');
path = require('path');
gulp = require('gulp');
sass = require('gulp-sass'); // sass的编译
minifycss = require('gulp-minify-css'); // 压缩css一行
uglify = require('gulp-uglify'); // 压缩js代码
clean = require('gulp-clean'); // 清理文件
fileinclude = require('gulp-file-include'); // include 文件用
imagemin = require('gulp-imagemin'); // 图片压缩
htmlmin = require('gulp-htmlmin'); // 压缩html
mergeStream = require('merge-stream'); // 合并多个 stream
gutil = require('gulp-util'); // 打印日志 log
plumber = require('gulp-plumber'); // 监控错误
babel = require('gulp-babel'); // 编译ES6
gulpif = require('gulp-if'); // 条件判断
minimist = require('minimist');
gulpSequence = require('gulp-sequence'); // 顺序执行
eslint = require('gulp-eslint'); // 代码风格检测工具
del = require('del'); // 删除文件
browserify = require('browserify');
source = require('vinyl-source-stream');


// 静态服务器和代理请求
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 代理请求 / 端口设置 / 编译路径
var config = require('./config.js');

// 区分开发和生产环境
var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'development'
    }
};
var options = minimist(process.argv.slice(2), knownOptions);

var sourcemaps;

gulpif(options.env === 'development', sourcemaps = require('gulp-sourcemaps'));

/**
 * 开发环境和生产环境
 * 先清空原先文件夹，在执行编译或者打包
 *
 * @param {any} cb 回调
 */
var cnEnvironment = function (cb) {

    // 先执行清空文件夹内容
    del([config.rootDist]).then(function (paths) {
        // 通知信息
        gutil.log(gutil.colors.green('Message：Delete complete!'));
        gutil.log(gutil.colors.green('Message：Deleted files and folders:', paths.join('\n')));

        // 执行项目打包
        gulpSequence( [
            'scssmin', 'cssmin', 'images', 'jsmin', 'es6min',
            'publicPluginsMin','publicPluginsMinCss',
            'htmlmin', 'json', 'fonts'], function () {

            gutil.log(gutil.colors.green('Message：Compile finished!'));
            // 执行回调
            cb && cb();

        });
    });
}

/**
 * 错误输出
 *
 * @param {any} error
 */
var onError = function (error) {
    var title = error.plugin + ' ' + error.name;
    var msg = error.message;
    var errContent = msg.replace(/\n/g, '\\A '); // replace to `\A`, `\n` is not allowed in css content


    // prevent gulp process exit
    this.emit('end');
};

/* eslint 语法检查 */
gulp.task('eslint', function () {
    return gulp
        .src([config.dev.js, '!node_modules/**', '!src/js/user/vue-waterfall.min.js'])
        .pipe(plumber(onError))
        .pipe(eslint({configFle: './.eslintrc'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/* 字体 */
gulp.task('fonts', function () {
    return gulp
        .src(config.dev.fonts)
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.fonts))
});

/* json */
gulp.task('json', function () {
    return gulp
        .src(config.dev.json)
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.json))
});


/* html 打包*/
gulp.task('htmlmin', function () {
    var optionsSet = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };

    return gulp
        .src(config.dev.html)
        .pipe(plumber(onError))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpif(options.env === 'production', htmlmin(optionsSet)))
        .pipe(gulp.dest(config.dist.html))
        .pipe(reload({stream: true}));
});

/* scss 压缩 */
gulp.task('scssmin', function () {
    return gulp
        .src(config.dev.scss)
        .pipe(plumber(onError))
        .pipe(sass())
        .pipe(gulpif(options.env === 'production', minifycss()))
        .pipe(gulp.dest(config.dist.css))
        .pipe(reload({stream: true}));
});

/* css 压缩 */
gulp.task('cssmin', function () {
    return gulp
        .src(config.dev.css)
        .pipe(plumber(onError))
        .pipe(gulpif(options.env === 'production', minifycss()))
        .pipe(gulp.dest(config.dist.css))
        .pipe(reload({stream: true}));
});


/* js 压缩 */
gulp.task('jsmin', ['eslint','browserify'], function () {
    var jsmin = gulp
        .src([config.dev.js, '!node_modules/**'])
        .pipe(gulpif(options.env === 'development', sourcemaps.init()))
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.js))
        .pipe(reload({stream: true}));

    return mergeStream(jsmin);
});

gulp.task('es6min', ['eslint','browserify'], function () {
    var es6min = gulp
        .src([config.dev.es6, '!node_modules/**'])
        .pipe(gulpif(options.env === 'development', sourcemaps.init()))
        .pipe(plumber(onError))
        .pipe(
            babel({presets: ['es2015']})
        )
        .pipe(gulp.dest(config.dist.js))
        .pipe(reload({stream: true}));

    return mergeStream(es6min);
});

// browserify
gulp.task("browserify", function () {
    //var b = browserify({
    //    entries: "src/js/app/app.es6"
    //});
    //
    //return b.bundle()
    //    .pipe(source("bundle.js"))
    //    .pipe(gulp.dest("src/js/app/"));
});

/* publicPlugins JS */
gulp.task('publicPluginsMin', function () {
    return gulp
        .src(config.dev.publicJS)
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.publicJS))
});
/* publicPlugins CSS*/
gulp.task('publicPluginsMinCss', function () {
    return gulp
        .src(config.dev.publicCss)
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.publicCss))
});

/* images 压缩 */
gulp.task('images', function () {
    return gulp
        .src(config.dev.images)
        .pipe(plumber(onError))
        .pipe(gulp.dest(config.dist.images))
        .pipe(reload({stream: true}));
});


/* clean 清除*/
gulp.task('clean', function () {
    del(config.rootDist).then(function (paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

/* 监控html */
gulp.task('updateHtml', function () {
    gulpSequence('html', 'webHtml', function () {
        gutil.log(gutil.colors.green('Message：Html compile finished!'));
    });
});

/* watch 文件 */
gulp.task('watch', function () {
    // 看守所有.css文件
    gulp.watch(config.dev.css, ['cssmin']);
    // 看守所有.scss文件
    gulp.watch(config.dev.scss, ['scssmin']);
    // 看守所有图片文件
    gulp.watch(config.dev.images, ['images']);
    // 看守所有js文件
    gulp.watch(config.dev.js, ['jsmin']);
    // 看守所有es6文件
    gulp.watch(config.dev.es6, ['es6min']);
    //看守所有plugins JS文件
    gulp.watch(config.dev.publicJS, ['publicPluginsMin']);
    //看守所有plugins CSS文件
    gulp.watch(config.dev.publicCss, ['publicPluginsMinCss']);

    // 看守所有.html文件
    gulp.watch(config.dev.html, ['htmlmin']);
    // 看守所有.json文件
    gulp.watch(config.dev.json, ['json']);
    // 看守所有fonts文件
    gulp.watch(config.dev.fonts, ['fonts'])
});

/* 开发环境 */
gulp.task('dev', function () {
    cnEnvironment(function () {
        // 监听watch
        gulp.start('watch');
    });

});

/* 生产打包项目 */
gulp.task('build', function () {
    cnEnvironment(function () {
        gutil.log(gutil.colors.green('Message：Project package is complete'));
    })
});


//js压缩任务
gulp.task('minjs', function () {
    gulp.src(config.distmin.js)
        .pipe(uglify())    //压缩
        .pipe(gulp.dest(config.dist.js));  //输出
});
//css压缩任务
gulp.task('mincss', function () {
    gulp.src(config.distmin.css)
        .pipe(minifycss())    //压缩
        .pipe(gulp.dest(config.dist.css));  //输出
});
//图片压缩任务
gulp.task('minimg', function () {
    return gulp.src(config.distmin.images)
        .pipe(imagemin())    //压缩
        .pipe(gulp.dest(config.dist.images));
});
//压缩任务(操作执行任务)
gulp.task('min', function () {
    gulp.run('minjs','mincss','minimg');
});


/* 任务命令 */
gulp.task('default', function () {
    gutil.log(gutil.colors.green('开发环境：      npm run dev 或者 gulp dev'));
    gutil.log(gutil.colors.green('打包项目：      npm run build 或者 gulp build --env production'));
    gutil.log(gutil.colors.green('删除文件夹：    gulp clean'));
    gutil.log(gutil.colors.green('监听所有文件：  gulp watch'));
    gutil.log(gutil.colors.green('压缩img/css/js：gulp min'));
});

