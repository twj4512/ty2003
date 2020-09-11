//导入依赖包
const   gulp = require('gulp'),
        //加载js相关的依赖包
        // 打包压缩ES5规范的的依赖包
        uglify = require('gulp-uglify'),
        babel = require('gulp-babel'),
        //html压缩依赖包
        htmlmin = require('gulp-htmlmin'),
        //编译sass依赖包
        sass = require('gulp-sass'),
        //cssmin依赖包
        cssmin = require('gulp-cssnano'),
        autoprefixer = require('gulp-autoprefixer'),
        //重命名依赖包
        rename = require('gulp-rename'),
        //del删除依赖包
        del = require('del'),

//创建任务
// 匿名函数形式声明

//编译sass转成css且压缩
const sassHandler = function(){
    return gulp.src('./src/sass/*.scss')//先找到要编译的scss文件
    .pipe(sass({outputStyle: 'expanded'}))//进行编译 成css文件
    .pipe(autoprefixer())// 添加前缀
    .pipe(cssmin())//压缩css文件
    .pipe(rename({suffix : '.min'}))//重命名
    .pipe(gulp.dest('./dist/css'))
    // 将压缩后的css文件 
    //通过gulp的dest()方法导入到dist的css中
}

//压缩js
const jsHandler = function(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({presets:['@babel/env']}))//固定语法
    //压缩js文件
    .pipe(uglify)
    //将打包压缩好的程序,存储在指定位置上
    .pipe(gulp.dest('./dist/js'))

}

//html压缩规范
const htmlHandler = function(){
    //设定打包的html文件位置
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        removeAttributeQuotes : true , 
        //  打包时删除属性上的双引号
        removeComments : true ,              
        //  删除程序中的注释内容
        collapseBooleanAttributes : true ,   
        //  删除布尔属性中定义的属性值
        collapseWhitespace : true ,          
        //  删除程序中多余的空格,只删除标签之前的空格,标签内部和内容的空格不会删除
        minifyCSS : true ,                   
        //  压缩HTML标签中的css程序代码
        minifyJS : true ,                    
        //  压缩html标签中的js代码
    }))
    //将压缩好的程序,存储在指定位置上
    .pipe(gulp.dest('./dist/pages'))
}

//音频,视频,图片等,不打压缩,直接移动到指定的文件夹位置
const imgHandler = function(){
    //指定要移动的图片所在的文件夹位置
    return gulp.src('./src/images/*.*')
    //指定要移动的文件位置
    .pepe(gulp.dest('./dist/images'))
}

//创建删除程序
const delHandler = function(){
    return del(['./dist']);
}


///制定监听程序
const watchHandler = function(){
    //监听sass文件
    gulp.watch('./src/sass/*.scss', sassHandler);
    //监听 js 文件
    gulp.watch('./src/js/*.js', jsHandler);
    //监听 html 文件
    gulp.watch('./src/pages/*.html', htmlHandler);
    //监听 图片 文件
    gulp.watch('./src/images/*.*', imgHandler);
}

//定义gulp的默认执行程序
module.exports.default = gulp.series(
    delHandler,
    
)