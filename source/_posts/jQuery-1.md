---
title: jQuery基础(1)
date: 2017-10-05 14:39:55
tags: [javascript,前端,jQuery]
categories: jQuery
---

## 1.介绍 ##
jQuery是js的一个库，封装了我们开发过程中常用的一些功能，方便我们来调用，提高了我们的开发效率。

### 1.2 与js区别 ###
1.书写个数不同
Js入口函数只能出现一次，出现多次会存在事件覆盖的问题。
jQuery的入口函数，可以出现任意多次，并不会存在事件覆盖问题。

2.执行时机不同
Js入口函数是在所有的文件资源加载完成后，才执行。这些文件资源包括：页面文档、外部的js文件、外部的css文件、图片等。
jQuery的入口函数，是在文档加载完成后，就执行。文档加载完成指的是：DOM树加载完成后，就可以操作DOM了，不用等到所有的外部资源都加载完成。

### 1.3 引入 ###
`<script src="jquery-3.2.1.min.js"></script>`
最先引入

### 1.4 入口函数 ###
```
$()
$(doucment).ready(function(){})
```

### 1.5 解决冲突的办法 ###
```
var $s=jQuery.noConflict();
$s(function(){
	alert(1)
})
```
这样可以使用$s代替$

jQuery这个js库，除了$之外，还提供了另外一个函数：jQuery
jQuery函数跟$函数的关系：jQuery ===$;


### 1.6 jQuery隐式迭代 ###
隐式对应的是显示，隐式迭代的意思是：在方法的内部进行循环遍历，而不用我们自己再进行循环，简化我们的操作，方便我们调用。 



## 2.选择器 ##
考虑兼容性js只提供了两个选择器（id和标签）

### 2.1 基本选择器 ###
$(“#ID”) => 			document.getElementById()
$(“TagName”) =>  	document.getElementsByTagName();
$(“Name”) =>			document.getElementsByName();		
$(“.ClassName”)	=>	document.getElementsByClassName(); 	

### 2.2 层次选择器 ###
$(“div span”)		后代选择器		选择div的后代span
$(“div > span”)		子元素选择器	选择作为div子节点的span
$(“div + div”)		相邻兄弟选择器	选择div的相邻兄弟div
$(“p , span”)		并列选择器		选择p和span元素

### 2.3过滤选择器 ###
:first			$("ul li:first")				选中ul中第一个li
:last			$("ul li:last")				选中ul中最后一个li
:eq			$("ul li:eq(1)")				定位ul中第二个li
:even		$(“ul li:even”)				定位下标为偶数的li
:odd			$(“ul li:odd”)				定位下标是奇数行
:not			$("ul li:not('.no')")			过滤出类名不为no的li
:contains		$("ul li:contains('txt')")		过滤出内容中包含txt的li
:empty		$("ul li:empty")			找出空的li

使用jquery选择器 获取到的dom一般都是集合 可以通过数字下标取某一个 可以通过length查个数。

### 2.4 属性选择器 ###
[name]	
获取所有含有name属性的节点
[name=value]
所有name属性等于value的节点
[name^=value]
所有name属性值以value开头的节点
[name$=value]
所有name属性值以value结尾的节点
[name*=value]
所有name属性包含value值的节点

### 2.5链式操作 ###
$("ul li").first()				获取ul 后代li中的第一个
$("ul li").last()				获取ul 后代li中的最后一个
$("ul li").eq(1)				定位ul 后代li中第二个
$("ul li").not($("#first"))		获取所有id不为first的li
$("div").contents();			获取div的所有子节点（包括文本节点）
$("div").find("span");		查找div后代中的span标签
$("ul").has($(".menu"))		选中有某个后代元素的元素
$("ul li").hasClass("menu")	判断选中元素中是否有某个类名，布尔
.next() 下一个元素
.prev()
.parents('')
.siblings()   所有兄弟元素

### 2.6 表单 ###
1.复选框、单选按钮、下拉列表
$(':checked')	复选框、单选按钮 选中选择器
$(':selected') 下拉列表 选中选择器
$('input:radio')	所有的单选框
$('input:checkbox')	所有的多选框

$().attr(‘checked’,true);		
$().attr(‘checked’,false);		



### 2.5 jQ dom和 js dom互换 ###
JQ获取的是经过包装（jquery处理）后的对象，不能使用js DOM的方法去操作，同样js DOM 也不能调用jquery中的方法。

1.使用[0]或者.get(0)方法，将jq dom转化成 js dom

2.使用$()方法，将js dom转化成jq dom

```
<input type="text" name="" value="a" id="a">
<script type="text/javascript">
	console.log( $(document.getElementById('a')).val() )
	console.log($("#a")[0].value )
</script>
```



## 3. JQ属性访问	 ##

### 3.1 attr ###

#### 3.1.1 attr
$dom.attr("属性名") 
读取属性值  如果$dom的集合中 包含有多个dom节点 那么返回第一个节点的属性值

$dom.attr("属性名", "属性值")  	
设置属性值，如果$dom集合中包含多个元素 那么会统一给他们都设置该属性

$dom.attr({"属性1": "值1"， "属性2":"值2"});	
同时设置多个属性，给所有选中的节点 同时设置多个属性

$dom.attr("属性名", function (当前元素索引, 原值) {}) 

移除属性：
$dom.removeAttr(“title”)

#### 3.1.2 index
index() 获取元素索引

#### 3.1.3 prop 

prop方法通常用来影响DOM元素的动态状态，而不是改变的HTML属性。例如：input和button的disabled特性，以及checkbox的checked特性，设置(true,false)。

prop(属性)：返回值只有true和fasle,其他基本一样

### 3.2 val ###
val方法 就是对attr的再封装 就是 $dom.attr(“value”)

$dom.val()									
读取该属性

$dom.val("属性值")							
设置属性值

$dom.val(function (idx, val) {})
使用匿名函数设置vlaue属性值

$dom.val(["值1", "值2"]);    			
同时设置多个选中项 它支持checkbox多选框和select下拉框
```
<select id="multiple" multiple="multiple">
  <option>Multiple</option>
  <option>Multiple2</option>
  <option>Multiple3</option>
</select>
```
`$("#multiple").val(["Multiple2", "Multiple3"]);`

```
<input type="checkbox" value="check1"/> check1
<input type="checkbox" value="check2"/> check2
<input type="radio" value="radio1"/> radio1
<input type="radio" value="radio2"/> radio2
```
`$("input").val(["check2", "radio1"]);`

### 3.3文本操作 ###
$dom.html()									
获取元素节点的内容（包含html内容）
$dom.text()									
获取元素节点的文本信息（去除了html标签）
$dom.html("值")  								
重置节点的内容
$dom.html(function (idx, html) {})

### 3.4 css ###
$dom.css("样式")								
读取一个的样式
$dom.css("样式", "值")							
设置一个样式 样式的写法 既可以是驼峰 也可以是css写法
$dom.css({样式1:"值1", 样式2:"值2"})			
同时设置多个样式
$dom.css("样式"， function (idx,val) {})					
函数参数设置值

### 3.5 绑定类 ###
$dom.addClass()								
给元素绑定样式

$dom.removeClass()							
给元素移除样式

$dom.hasClass()							
返回布尔

$dom.toggleClass(className) 
切换类

