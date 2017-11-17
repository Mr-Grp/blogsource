---
title: gulp
date: 2017-10-29 12:17:34
tags: [gulp,前端,工具]
categories: gulp
---

## 1. 介绍
自动化构建工具

预处理语言的编译
js css html 压缩混淆
图片体积优化


npm3以前是层级依赖，3以后是平行依赖（windows上路劲过长）

### 1.1 引入

全局安装
npm i gulp -g

局部安装
demo中
npm init
npm i gulp -D

创建gulpfile.js
```
//载入核心包
const gulp = require('gulp');

//帮我们执行一些重复操作，
//划分为不同的热舞

//任务名
//任务执行体
gulp.task('hello',function(){
	console.log('hello world')
});
```
结果：
```
C:\Users\G\Desktop\前端项目\gulp-demo>gulp hello
[11:30:22] Using gulpfile ~\Desktop\前端项目\gulp-demo\gulpfile.js
[11:30:22] Starting 'hello'...
hello world
[11:30:22] Finished 'hello' after 3.63 ms
```


### 1.2 文件拷贝

```
//拷贝文件
gulp.task('dest',function(){
	//获取文件
	gulp.src('src/**/*.*').pipe(gulp.dest('dist/'))
})
```
`gulp.src('src/**/*.*')`：获取文件，可以是数组
`src/**/*.*`:递归
`!src`：排除某个目录
`pipe(gulp.dest('dist/'))`：文件流
`gulp.dest('dist/')`：输出路径

### 1.3 default
```
gulp.task('default',function(){
	console.log('default')
});
```
不打任务名执行default

### 1.4 gulp.watch
```
gulp.task('default',function(){
	console.log('default')
	gulp.watch('src/*',[dest])
});
```
当文件发生变化时，默认执行任务。

以上为原生API，gulp不支持任何功能，提供最基础API。
watch
src
dest
pipe


## 2. gulp插件

### 2.1 gulp-less
处理less
npm i gulp-less

```
const less=require('gulp-less')

gulp.task('style',function(){
	gulp.src('src/**/*.less')
	//转换为css
	.pipe(less())
	.pipe(gulp.dest('dist/'))
})
```
具体查看npm官网文档。

### 2.2 gulp-connect
```

//定义一个HTTP服务器,默认8080

const connect=require('gulp-connect')

gulp.task('server',function(){
	connect.server({
		root:'public',   //根目录
		livereload:true  //实时刷新
	});

	gulp.watch('public/**/*.*',['reload'])
})

gulp.task('reload',function(){
	gulp.src('public/**/*.*').pipe(connect.reload())
})
```





其他插件
gulp-concat
gulp-uglify 最小化js
gulp-rename 重命名
gulp-minify-css 最小化css
gulp-minify-html
gulp-imagemin