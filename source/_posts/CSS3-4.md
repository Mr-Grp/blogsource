---
title: CSS3(4)
date: 2017-10-18 11:47:02
tags: [CSS3,前端]
categories: CSS3
---
## 1.伸缩布局 ##

CSS3在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。

主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向
侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的s

指定一个盒子为伸缩盒子 display: flex

### 1.1 主轴方向 ###
flex-direction

row 水平方向
reverse-row 反转
column 垂直方向
reverse-column 反转列

### 1.2 主轴对齐方式 ###
justify-content

flex-start、 起点对齐
flex-end、  终点对齐
center    中间对齐
space-around、 环绕
space-between  两端对齐

### 1.3 侧轴对齐方式 ###
align-items

flex-start、 起点对齐
flex-end、  终点对齐
center    中间对齐
stretch  拉伸
baseline 基线 默认同flex-start

### 1.4 拉伸 ###
flex：份数

指定所占份数（用比例的方式分配）

不指定flex 属性，则不参与分配

## 2.字体图标 ##

开发人员可以为自已的网页指定特殊的字体，无需考虑用户电脑上是否安装了此特殊字体，从此把特殊字体处理成图片的时代便成为了过去。
支持程度比较好，甚至IE低版本浏览器也能支持。

### 2.1 字体格式 ###
+	1.TureTpe(.ttf)格式
.ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；

+	2.OpenType(.otf)格式
.otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；

+	3.Web Open Font Format(.woff)格式
woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；

+	4.Embedded Open Type(.eot)格式
.eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；

+	5.SVG(.svg)格式
.svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+；

### 2.2 字体图标 ###
常见的是把网页常用的一些小的图标，借助工具帮我们生成一个字体包，然后就可以像使用文字一样使用图标了。
优点：
1、将所有图标打包成字体库，减少请求；
2、具有矢量性，可保证清晰度；
3、使用灵活，便于维护；

如京东小米等小图标。

## 3.兼容性问题 ##
[](http://caniuse.com)
可查询CSS3各特性的支持程度，一般兼容性处理的常见方法是为属性添加私有前缀，如不能解决，应避免使用，无需刻意去处理CSS3的兼容性问题。

