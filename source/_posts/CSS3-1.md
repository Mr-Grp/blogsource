---
title: CSS3(1)
date: 2017-10-12 10:53:41
tags: [CSS3,前端]
categories: CSS3
---
## 1.简介 ##
如同人类的的进化一样，CSS3是CSS2的“进化”版本，在CSS2基础上，增强或新增了许多特性， 弥补了CSS2的众多不足之处，使得Web开发变得更为高效和便捷。

### 1.1 现状 ###
+	浏览器支持程度差，需要添加私有前缀
+	移动端支持优于PC端
+	不断改进中
+	应用相对广泛
坚持渐进增强原则

## 2.属性选择器 ##
id选择器    #     通过id 来选择
类名选择器  .     通过类名来选择
属性选择器  []    通过标签属性来选择器
^: 开头  $:结尾  *：包含
E[title]  : 选中页面的E元素，并且E需要带有title属性
E[title="a"] :选中页面的E元素，并且E需要带有title属性,属性值为a
E[title^="a"] :选中页面的E元素，并且E需要带有title属性,属性值以a开头
E[title$="a"] :选中页面的E元素，并且E需要带有title属性,属性值以a结尾
E[title*="a"] :选中页面的E元素，并且E需要带有title属性,属性值包含a

## 3.结构伪类选择器 ##
E：first-child　选中父元素中的第一个子元素
E：last-child　选中父元素中的最后一个子元素
E：nth-child(1)　选中父元素中的第5个子元素
n: 0,1,2,3,4。。。
偶数： 2n  even
奇数：2n-1 odd
前5个： -n+5
E：nth-last-child(3): 从后向前选择， 选中倒数第3个

div:nth-child(9)

注意：所选到的元素的类型,必须是指定的类型E,否则选择无效；

E：empty 表示元素为空的状态
E:target: 表示元素被激活的状态,要配合锚点使用

## 4.伪元素选择器 ##
通过css模拟出html效果
E::before
E::after 
必须有content 属性，是一个行内元素，需要转换成块元素
E::first-letter　选中第一个字母
首字下沉 float: left;
E::first-line选中第一行
E::selection: 表示选择的区域 通过设置 color  background

## 5.新增了两种颜色模式 ##
传统父盒子透明opacity，子盒子也透明，transparent无法调节透明度。
RGBA:     red  green blue (0-255)   alpha: 透明度 （0-1）

HSLA:
H:色调  0-360
S:饱和度 0%-100%
L:亮度    0%-100%
A：alpha 透明度 0-1

## 6.阴影 ##
text-shadow，可分别设置偏移量、模糊度、颜色（可设透明度）。
可添加多个阴影，逗号隔开，左上亮，右下暗为突起效果，反之凹陷。


## 7.盒子模型 ##
三个盒子： content-box   padding-box  border-box
box-sizing: border-box(内减模式)padding-box(内减模式) /content-box（外加模式）(默认值)

box-sizing: border-box   盒模型
可做鼠标放上图片缩小加边框效果。

## 8.私有化前缀 ##
-webkit-: 谷歌 苹果
-moz-:火狐
-ms-：ie
-o-：欧朋
```
background:-webkit-linear-gradient(left,red,blue);
            background:-moz-linear-gradient(left,red,blue);
background:-ms-linear-gradient(left,red,blue);
background:-o-linear-gradient(left,red,blue);
background:linear-gradient(left,red,blue);
```