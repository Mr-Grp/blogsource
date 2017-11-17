---
title: HTML基础(1)
date: 2017-10-02 12:44:16
tags: [HTML5,前端]
categories: HTML5
---

##	1.简介
Html（hypertext mark-up language）超文本标记（标签）语言。
超文本：在文本的基础上添加了更加丰富的信息（图片 动画 视频 音乐）
标记 ： 标志，一个符号
标记的写法 皆有 < 标记  >
标签有两层含义：表型 表意 <b></b>
语言 : 直接被浏览器解析 

##	2.标签介绍和常用一些标签
###	2.1语法
HTML标签的语法，大致分两类：
双标签：开始标签和结束标签构成 ，内容的开始和结束标签之间 
单标签：只有开始标签，结束用在开始标签的末尾加  / 符号
###	2.2主体标签
html head title body 
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
</body>
</html>
```
html告诉浏览器如何解析网页的内容
head告诉浏览器网页的汉字设置什么样的字符集，如果使用字符集不正确，出现乱码，gb_2312简体中文，utf-8多国语言，在汉字操作 ，默认的字符集是gb_2312  
title  优化
body 99% 写在该body中

###	2.3字体标签
```
1.	<font>
	color 文本的颜色
	size =”大小”
	face=”字体”
	建议使用css
	<font color="red" size="20px" face="宋体">字体font</font>
2.	<b>加粗</b>
	<strong>建议使用</strong>
3.	<i>斜体</i>
	<em>建议使用</em>
4.	<u>下划线</u>
	<ins>建议使用</ins>				
5.	<sup>上标</sup>		
6.	<sub>下标</sub>			
7.	<big>大一号</big>			
8.	<small>小一号</small>
9.	<s>删除</s>
	<del>建议使用</del> 		
```

###	2.4排版标签
```
1.	<p>段落 
	属性：align=”left  // center  //right”  
2.	<br /> 换行 单标签  
3.	<hr /> 水平线 
	属性：
	color =”颜色值 ” 『只适用于IE』
	size 粗细
	width 宽度  width=”70%”  width=”600”固定 
	align=“left//center//right”
	noshade 去掉阴影
4.	<pre> html使用的不多，PHP里面使用的多，把内容在浏览器中原样输出 空	格和换行
5.	<h1>...<h6> 六级标题
6.	<div> 上网站上使用的最多的标签之一，本身没有意义，自己独占一行，结合css样式构成功能div+css
7.	<span> 网上用的最多的标签之一，本身没有意义，不是自己独占一行，结合css样式构成功能
```

###	2.5XHTML标签的书写规则
+	Html标记不区分大小写,w3c规定使用小写 
+	标记可以拥有若干个属性(包括0个)，是由w3c标准制定的
+	属性值用双引号引起 “ ” 
+	单标记 一定要闭合，单标签一般没有内容 <br />
+	双标记的内容放到开始标记和结束标记之间 
+	html的标记可以相互嵌套，但是一定要注意是顺序嵌套，不能交叉嵌套

###	2.6超链接
```
<a >链接的内容</a>
属性：
href =”链接的地址”
target=”_blank”  新的窗口打开目标文件
target=”_self” 默认的打开方式，在原来的窗口打开（原有的窗口覆盖）
name 链接的名称
title 说明（鼠标放上时显示）
```
1.	绝对地址：完整地址
2.	相对地址：从自身地址出发，./ 表示当前目录，../ 表示上级目录，
3.	特殊链接
	1.下载链接：浏览器打不开的就会下载
	2.邮件链接	`<a href=”mailto:邮箱的地址”>邮箱</a>`
	3.空链接：#
	4.js链接：javascript:void(0)
4.	锚点链接	`<a name=”top”></a>  	<a href=”#top” >跳转</a>`
5.	`<base target="_blank">`   让所有的超链接都在新窗口打开

###	2.7图像标签
```
<img>
属性：
src =“图片的路径”
width=”宽度”
height=”高度值”
alt=“说明”  图片不存在时显示，也用于搜索引擎
```

###	2.8列表标签
1.	无序列表
```
<ul>
   <li></li>
   <li></li>
   <li></li>
</ul>
属性：
type
```
2.	有序列表
```
<ol>
   <li></li>
   <li></li>
   <li></li>
</ol>
属性：
type
start
```
3.	自定义列表
```
<dl>
  <dt>标题1</dt>
  <dd>内容</dd>
  <dt>标题2</dt>
  <dd>内容</dd>
</dl>
```
###	2.9表格
```
<table>
  <tr>
     <th>内容</th>
     <th>内容</th>
     <th>内容</th>
</tr>
  <tr>
     <td>内容</td>
     <td>内容</td>
     <td>内容</td>
</tr>
</table>

```
`<thead> <tbody> <tfoot>`
talbe属性：
表格的边框border=”数值”  默认是0
表格的边框颜色 bordercolor=”颜色值”
表格的宽度 width=”数值”
表格水平对齐方式 align=”left/center/right”
表格背景色bgcolor=”颜色”
表格的背景图片  background=”图片的地址”
单元格边框和内容之间的距离  cellpadding=”数值” 默认是2  
单元格和单元格之间的距离 cellspacing=”数值” 默认是2  
合并单元格边框线rules=”all” 细线  css来设置

tr属性：
行的高度  height=”数值” 
行的背景色 bgcolor=”颜色值”
行的背景图片 background=”图片的地址”
行水平居中 align=”left//center//right”  左中 右
行的垂直居中 valign=”top//middle//bottom” 上  中  下 

td属性
单元格的宽度width=”数值”
单元格的高度 height=”高度值”
单元格的背景色 bgcolor=”颜色值”
单元格的背景图片 background=”图片的地址”
单元格左右合并 colspan=”合并的单元格数”
单元格上下合并 rowspan=”合并的单元格数”

### 2.10 marquee ###
滚动
```
<marquee></marquee>
wdith
height
behavior: slide/scroll/alternate
direction: left/right/up/down
```

### 2.11 embed ###
音乐播放器
```
<embed>
src
hidden
```