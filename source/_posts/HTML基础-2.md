---
title: HTML基础(2)
date: 2017-10-02 12:44:37
tags: [HTML5,前端]
categories: HTML5
---

##	1.HTML常用标签
###	1.1框架标签
1. 框架集 : frameset
框架集的属性
HTML 文档可包含 FRAMESET 元素或 BODY 元素之一，而不能同时包含两者。
cols  左右划分
cols=”200,*” 左边的是200px,剩下的给右边
cols=”*,200” 右边是200px, 剩下的给左边
cols=”200,200,*” 最左边的是200px,中间200px.剩下的给右边
rows  上下划分
frameborder 是否显示框架的边框 yes  no  1  0 
border 框架的宽度 border=”2”
bordercolor 边框的颜色
框架页:  在框架页中可以放网页文件  
框架页的属性
src 每个小窗口中显示的文件 src=”xx.html” 
name 给小窗口命名,给链接用 target用
noresize  禁止退拽，不允许改变小窗口的大小
scrolling =”auto ///no” auto 如果内容不溢出，不出现滚动条，溢出的情况出现滚动条

2. 浮动框架: 可在body中写
格式 `<iframe></iframe>`
浮动框架的属性
src 在浮动框架中显示的内容 
width 浮动框架的宽度 
height 浮动高度
frameborder  是否显示框架的边框
Scrolling  是否有滚动条  ，存在兼容问题
name  给链接中target用 

###	1.2表单标签

表单主要是获取客户端数据（信息） ，通常就是用于让用户可以输入（选择）信息以提交到服务器端进行数据处理的html标签。
表单的功能：具有交互能力
1.表单标签form  
2.表单的属性 
action 提交到的页面
method=”post/get” 
+	post数据提交到 文件处理程序，传送的数据量大
+	get 通过地址栏传递提交的数据  安全性差，传递的数据小
name 给表单命名

3.格式：
```
<form  action=”xx.php” method=”post/get”  name=”hf”></form>
```
###	1.3表单项

1.文本框 text
`<input type="text" /> `
常用的属性：  
type=”text”
name 把输入框命名
value 输入框中显示的内容 ，
size  输入框的宽度，显示的字符
maxlength 限制你输入的最多字符数，如果超出不允许输入
readonly 只能读，不能改 
disabled 禁止属性 不能选择也不能改

2.密码框 password
`<input type=”password”>  `
常用的属
type =”password”
name 把输入框命名
value 输入框中显示的内容 ，
size  输入框的宽度，显示的字符
maxlength 限制你输入的最多字符数，如果超出不允许输入
readonly 只能读，不能改 
disabled 禁止属性 不能选择也不能改

3.单选按钮 radio
`<input type=”radio”> `
常用属性:
name  代表组名
value 每一项的值
checked 默认被选中

4.复选框  checkbox
`<input type=”checkbox”>`
常用属性:
name  代表组名
value 每一项的值
checked 默认被选中
效果
 
5.文件域 file 
只读的,鼠标去选择某个文件
常用属性:
name   文件域名

6.隐藏域  hidden
`<input type=”hidden” name=”名称”>`
常用属性 
name
注意: 给程序员用的  

7.多行文本框 
`<textarea> </textarea>`
常用的属性 
cols   一行显示多少个字符
rows   行数 显示多少行
name 名称

8.下拉列表 
```
<select  name=””>
<optgroup label='颜色'/>
<option>红色</option>
<option>绿色</option>
</select>
```
常用的属性name 
selected
mutiple

9.提交按钮 
`<input type=”submit” value=”提交” />`

10.重置按钮  
`<input type=”reset” value=”重写” />`

11.普通按钮
`<input type=”button” value=”修改” /> `

12.图片按钮，可以提交表单
`<input type="image" src="1.jpg">`

13.表单分组
```
<fieldset>
	<legend>111</legend>
	content
</fieldset>
```
###	1.4标签的通用属性
body的属性
background=”背景图片”
bgcolor=”背景颜色”
text=”文本的颜色 ”

##	2.字符编码
1.gb_2312   gbk  国内的网站
2.utf-8  多国语言 
3.ASCII编码：用1个字节(8位二进制)来表示所有字符，共可以表示 2^8 = 256 。

ANSI编码：其它国家，都对ASCII编码进行扩展，用于显示本国的语言。
ANSI在中文操作系统下，代表gb2312
ANSI在繁体操作系统下，代表big5
ANSI在日文操作系统下，代表JIS
……  

用2个字节(16位二进制)(来表示，共可以表示 2^16 = 65536个字符。

1.GB2312中共收录了6763个汉字。
2.GBK编码：对GB2312进行扩充，收录了一些冷门字、罕见字、古汉语等。共收录2.1万个汉字。
3.Unicode编码：计划将世界上所有字符统一编码，用4个字节(32位二进制)来表示一个字符。
它的缺点：编码表文件太大了，不方便使用。用32位二进制表示一个字符，造成空间极大浪费。
4.UTF-8： (多国语言编码)
不同的字符，它会选择合适编码来进行翻译。

##	3.header中的一些标签
```
	<meta name="keywords" content="">
	<meta name='description' content="">
	<meta http-equiv="refresh" content="number;url">
	<link rel='icon' href="">
	<link rel="stylesheet" href="">
```

##	4.Html5新特性与常用标签
###	4.1文档类型设定
1.xhtml （html4.0）文档类型的设置 
+	过渡型 --宽松型(最常用)
```
允许使用表现的标签 <font >  <b>  <em>  <i> 允许使用 表现型属性能使用 <table border=”” bgcolor=””
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```
+	严格型
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
不允许使用表现的标签 <font >  <b>  <em>  <i> 
不允许使用 表现型属性不能使用 <table border=”” bgcolor=””
```
+	框架型
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
做框架用的
```
2.html5文档类型的设置
`<!DOCTYPE html> `

3.html5和xhtml之间的区别
html5 只有一个
xhtml三个  过渡型  框架型 严格型

###	4.2字符设定
1.html5
```
<meta charset=”UTF-8” ></meta>
```
html5可以省略主体标签，浏览器会自动补全
2.xhtml

`<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />`

###	4.3常用新标签
header   网站的头部
nav  网站的导航
section  主体内容
article  文章 
aside  侧边栏
footer  版权

###	4.4表单的新增的三个
required 必填项 
autofocus
placeholder

###	4.5新增的type属性
html5的写法
email  限制用户输入的是邮箱类型
url    限制用户输入的是url类型
date  限制用户输入的是日期类型
Week  限制用户输入的是周类型
time  限制用户输入的是时间类型
month 限制用户输入的是月类型
Number 限制用户输入的是数字类型
Search 搜索  
tel   限制用户输入的是电话类型
color 颜色
range 一个滑块程序

###	4.6多媒体标签
1.video
```
<video autoplay="autoplay" controls="controls" src=""></video>
<video autoplay="autoplay" controls="controls" >
	<source src=""/>
</video>
```
2.audio 
```
<audio autoplay="autoplay" controls="controls" src=""></audio>
<audio autoplay="autoplay" controls="controls" >
	<source src=""/>
</audio>
```
3.embed 
`<embed src="" width="" />`