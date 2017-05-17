const gulp = require('gulp');
const uglify = require('gulp-uglify'); // 压缩文件
const concat = require('gulp-concat'); // 合并文件
const cleanCSS = require('gulp-clean-css'); // css 的压缩
const rename = require('gulp-rename'); // 重命名文件
const imagemin = require('gulp-imagemin'); // 图片的压缩
const sass = require('gulp-sass'); // sass 的编译
const browserify = require('gulp-browserify'); // 模块化的打包
const rev = require('gulp-rev'); // md5加密
const revCollector = require('gulp-rev-collector'); // 路径替换
const webserver = require('gulp-webserver'); // 热启动
const url = require('url'); // url

//var datajson = require('./data/datajson.js');
var orderBy = require('./data/orderBy.js');

// js 的打包并合并
gulp.task('js', function () {	// js 为压缩的命令  用gulp + 命令执行
    gulp.src('src/js/*.js')	// 路径
        .pipe(uglify())	   // 压缩
        .pipe(concat('main.js'))	// 文件合并
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))					// 模块化的打包
        .pipe(rename({suffix: '.min'}))	// 重命名
        .pipe(rev())
        .pipe(gulp.dest('./build/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( './rev/js' ) )

});

// 压缩images
gulp.task('iamges', function () {
    gulp.src('./src/images/!*.png')
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"));
});

// sass 编译及加密
gulp.task('css', function () {
     gulp.src('src/css/*.sass')
        .pipe(sass())
         .pipe(rev())
        .pipe(gulp.dest('./build/css'))
        //.pipe(cleanCSS())
        .pipe(rev.manifest())
        .pipe( gulp.dest( './rev/css' ) );
});

gulp.task('rev',["css","js"], function () {
  gulp.src(['rev/**/*.json', 'src/html/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/html'));
});

gulp.task('webserver',function(){
    //gulp.watch('./src/html/*.html', ['html']);
    //gulp.src('./build')
    gulp.src('./src')
        .pipe(webserver({
            port: 90,
            livereload: true,
            directoryListing: true,
            middleware: function (res, req, next) {
                const reqPath = url.parse(res.url).pathname;
                const routes = orderBy.data();
                console.log(routes)
                routes.forEach(function (i) {
                    console.log(i.route);
                    console.log(reqPath);
                    if (i.route == reqPath) {
                        i.handle(res, req, next)
                    }
                });
                next()
            },
            open: 'html/orderBy.html'
        }))
});

// 默认
gulp.task('default', [
    'js',
    'iamges',
    'css',
    'rev',
    'webserver'
],function(){

});


