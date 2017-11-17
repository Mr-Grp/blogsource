---
title: js基础语法(3)
date: 2017-10-03 18:37:06
tags: [javascript,前端]
categories: javascript
---
## 1.DOM ##
DOM就是把HTML视为一个层次结构(树形结构)的文档

### 1.1 获取元素节点 ###
document.getElementById(“id名”)
document.getElementsByTagName(“标签名”)//是一个集合
document.getElementsByName(“name名称”)//是一个集合
HTML5中新增
getElementsByClassName()

### 1.2 节点属性 ###
nodeType		节点的类型
1 元素节点
2 属性节点
3 文本节点 
nodeName		节点的名称(标签名称)
nodeValue		节点值
元素节点的nodeValue始终是null

### 1.3 节点层次 ###
1.父节点 
parentNode
2.子节点
childNodes	//IE8中会忽略空白节点
children		//返回元素节点集合 	
3.兄弟节点
nextSibling
previousSibling
4.第一个和最后一个子节点
firstChild
lastChild

childElementCount
firstElementChild
lastElementChild
previousElementSibling
nextElementSibling
### 1.4 DOM对象的属性 ###

1.获取对象的属性值
语法  对象.属性;

2.设置对象的属性值
语法: 对象.属性=新的属性值;
class要用className


3.直接使用.属性的方式不可以获取设置自定义属性
getAttribute()
setAttribute()
removeAttribute()
hasAttribute()

### 1.5 文本操作 ###
属性：innerHTML  
innerText  输出是 纯文本

### 1.6 css操作 ###
bj.style.css属性名
只能操作行内样式
命名规则，驼峰命名

常用css属性：
display
元素隐藏后，不占位置，页面上的元素会重新排列
visibility
元素隐藏后，占位置
hidden
visible

opacity、position
### 1.7创建元素 ###
document.createElement(标签名)
父级.appendChild(子元素)
父级.removeChild(要删除的节点)
父级.insertBefore(新元素,当前元素)
父级.replaceChild(替换的元素,被替换的元素)

表格：
rows                          (只读，table和textarea能用)
insertRow(index)              (只有table能调用)
deleteRow(index)	          (只有table能调用)
cells		          (只读，table)
insertCell(index)               (只有tr能调用)
deleteCell(index)              (只有tr能调用)

克隆
node.cloneNode([true])		

## 2.事件编程 ##
### 2.1 什么是事件 ###
通过鼠标、键盘对浏览器页面所做的动作就是事件。
事件一旦发生需要有事件处理，该处理称为“事件驱动”，事件驱动通常由函数担任 on事件 =”函数”

### 2.2 事件列表 ###
1引入事件的方法
`<标签  on事件 =”函数名()”>`
语法：`<input type=”button” onclick=”fun()”>`

2引入方法
语法：对象.on事件=函数名; 
obj.onclick=fun;

3.常用鼠标事件
onclick, 单击
onmouseover,  鼠标移上
onmouseout  鼠标移走

4.网页加载事件：onload  重点
`<body onload=”init()”>`
或者 
window.onload=init;
注意： body 才有 onload事件

5.常用表单事件：
onfocus,  获取焦点
onblur,  失去焦点
onchange, 当焦点发生改变的时候  通常 <select >
onsubmit 表单`<form   onsubmit=”函数名()”>`

### 2.3 this对象数组 ###
fun(this)
this代表当前对象