---
title: node-模板引擎
date: 2017-11-02 21:54:39
tags: [javascript,前端,模块化，node]
categories: node
---

## 1. 模板引擎简单了解

### 1.1 jade
破坏式，入侵式，强依赖

#### 1.1.1 renderFile
jade.renderFile('view/1.jade',{pretty:true})

返回字符串结果
pretty:true：用于格式化，默认是压缩的

#### 1.1.2 demo
```
const jade=require('jade')

var str=jade.renderFile('view/1.jade',{pretty:true})

console.log(str)
```
j模板文件：1.jade
```
html
	head
		style
		script
	body
		div
			ul
				il
				il
```
结果
```
<html>
  <head>
    <style></style>
    <script></script>
  </head>
  <body>
    <div>
      <ul>
        <il></il>
        <il></il>
      </ul>
    </div>
  </body>
</html>
```


### 1.2 ejs
温和，非侵入式，弱依赖

#### 1.2.1 renderFile
```
ejs.renderFile('view/1.ejs',{a:5},function(err,data){
	if(err){
		console.log('error')
	}else {
		console.log(data)
	}
})
```
第二个参数用于模板引擎中的数据。

#### 1.2.2 demo
demo:
```
const ejs=require('ejs')

ejs.renderFile('view/1.ejs',{a:5},function(err,data){
	if(err){
		console.log('error')
	}else {
		console.log(data)
	}
})
```

j模板文件：1.ejs
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
</head>
<body>
	name: <%=a %>
</body>
</html>
```
结果
```
<!DOCTYPE html>
<html>
<head>
        <title></title>
        <meta charset="utf-8">
</head>
<body>
        name: 5
</body>
</html>
```

## 2. jade

### 2.1 语法

+	1.层级关系  
用缩进表示

+	2.属性     
放在()里，逗号分隔

style属性可以用字符串，也可以用json
```
div(style="width:10px;height:10px")
div(style={width:'10px',height:'10px'})
```

class属性可以用字符串，也可以用数组
多个class会自动融合成一个
```
div(class="aaa bbb ccc")
div(class=['aaa','bbb','ccc'])
```

+	3.内容     
加在标签后，空一个格

+	4.类和id	
```
div.a
div#a
```

+	5json写法
`div&attributes({class:'a',name:'a'})`

+	6.原样输出
`|fade`

标签后加点`.`，代表标签内容原样输出。

+	7.引入文件
`include xxx`

+	8.js代码


标签不允许添加标签，自定义标签默认为双标签

### 2.2 变量

server.js中,通过配置参数，引入变量
```
var str=jade.renderFile('view/demo.jade',{pretty:true,
	age:19,
	name:'G',
	json:{width:'100px',height:'100px'},
	attr:['aaa','bbb','ccc']
})
```

模板文件中
```
span #{name}
span=age

div(style=json)
div(class=attr)
```
变量可以用=输出
属性中可以直接写变量

#### 2.2.1 非转义
非转义，变量中html标签不转义
`!=content`

#### 2.2.2 模板中定义变量

使用`-`识别代码
```
- var a=5
- var b=10
```


### 2.3 条件判断,循环
+	1.if
```
- var i=5
	- if(a%2==0)
		div
	- else
		span
```


+	2.for
```
- for( var i= 0 ; i<attr.length; i++)
	div=attr[i]
```

+	3.switch
```
-var i=2
	case i
		when 0
			div 0
		when 1
			div 1
		when 2
			div 2
		default
			div default
```
加一个-，默认后面都识别代码，但是，var还是会变成标签。

### 2.4 综合小demo
```
doctype
html
	head
		meat(charset='utf-8')
		title jade-demo
		style.
			div {
				width:100px;
				height: 100px;
				background-color: #ccc;
				line-height: 100px;
				float: left;
				margin: 10px auto;
				text-align: center;
			}
			div.last {
				clear: both;
			}
		body
			-var a=0
			while a<12
				if a%4==0 && a!=0
					div.last #{a++}
				else 
					div #{a++}
```

## 3. ejs

使用html格式，所以不需要学习很多东西

```
const ejs=require('ejs')

ejs.renderFile('view/1.ejs',{a:5},function(err,data){
	if(err){
		console.log('error')
	}else {
		console.log(data)
	}
})
```


### 3.1 模板中语法

+	1.变量
`<%=var %>`
支持多种数据类型，和js中一样操作即可。

+	2.非转义输出
`<%-var %>`

+	3.js
`<% js语句 %>`

+	4.引入：
`<% include xxx %>`
不是js中有的，不能和js混写在一个`<%  %>`里面
include中不能写变量

