const gulp = require('gulp')
const less = require('gulp-less')
const ejs = require('gulp-ejs')
const autoprefixer = require('gulp-autoprefixer');


let browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('less', function(){
	gulp.src('views/less/*.less')
	.pipe(less())
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(gulp.dest('dist/css/'))
})

gulp.task('auto',function(){
	gulp.watch(['views/less/*.less','views/less/include/*.less'],['less'])
})
gulp.task('autoejs',function(){
	gulp.watch(['views/ejs/*.ejs','views/ejs/include/*.ejs'],['ejs'])
})

gulp.task('ejs',function(){
	gulp.src('views/ejs/*.ejs')
	.pipe(ejs({},{},{ext: '.html'}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
})



gulp.task('app', () =>
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);


gulp.task('default',['browser-sync','auto','less','autoejs','ejs'])
