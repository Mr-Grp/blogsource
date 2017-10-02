---
title: ajax1
date: 2017-10-01 18:43:42
tags: [blog,ajax,javascript,前端,php,后端,JSON]
categories: ajax
---

##	**1.简介**
ajax全称 Async Javascript And XML（异步的JavaScript和XML），它是一种“称谓” 并不指代某个特定的技术，包含以下：
+	Async ：指AJAX能够创建异步进程的请求
+	Javascript：AJAX实现的主体（就是用JS来实现的AJAX）
+	XML：一种数据格式 用户AJAX请求中 客户端和服务器交换数据（除此以外还有JSON）。

现在所有无刷新操作 都叫“ajax”，它是使得JS能够像浏览器一样 请求服务器数据 并且获取返回结果，更直白的说 ajax就是JS代码级的浏览器。例如（表单中对用户名等信息的验证，分页）

##	**2.使用过程(基于javascript)**
###	**2.1创建**
实例化XMLHttpRequest();

###	**2.2open方法**
对服务器建立链接
req.Open(方法，url地址，[是否异步,默认true])

###	**2.3.send方法**
发送请求
req.send();

###	**2.4.接收**

####	**2.4.1可以接收的格式：**

字符串，XML，JSON

####	**2.4.2接收文本的方法**
req.responseText，获取接收文本
PHP中使用 echo 等进行输出都会被接收

####	**2.4.3状态码**
req.readyState   状态码
req.Onreadystatechange   状态码改变，在这里定义函数，规则

Status   返回状态：
200   成功（常用）
404   没有找到
500   服务器错误

规则建议定义到发送上面，否则可能浏览器执行太快，规则没定义已经执行完。
一个例子：
```
var req=new XMLHttpRequest();
req.open('get', 'ajax.php?a=5');
req.send(null);
req.onreadystatechange=function (){

	if(req.status==200&&req.readyState==4){
		var str=req.responseText;
		alert(str);
	}
}
```
```
<?php 
$a=$_GET['a'];
echo $a;
?>
```

##	**3.open方法**
###	**3.1.GET请求**
```
open（'get','url？参数=参数值'）
Send(null)
```
编程习惯，没有数据写null
GET请求发生的问题:
Ie不支持中文
=，&与关键字混淆
解决：
`encodeURIcomponent()`
在PHP中 可以使用urlencode和urldecode来解析编码的URL参数值。

###	**3.2.post请求**

Post发送数据会转成xml格式
```
open（'post','url'）
req.setrequestHeader('Content-Type','application/x-www-form-urlencoded')
Send（'a=b&c=d……'）
```
注意加上头信息。
post请求也会和url中的&,=相混淆，建议编码encodeURIcomponent()。
在PHP中 可以使用urlencode和urldecode来解析编码的URL参数值。
post请求同时也可以进行get请求open（'post','url？……'）

##	**4.同步和异步**
如果使用同步，则会等待接收返回的结果才会继续执行后面内容，不建议同步，没有意义。

##	**5.清除缓存**

方法一：
地址url?+math.random()  添加随机数

方法二：
PHP中
header("Cache-Control", "no-cache");
header("Pragma", "no-cache");
header("Expires", -1);

建议方法一

##	**6.分页例子**
```
<div id='result'></div>
<script type="text/javascript">
	var req=new XMLHttpRequest();
	function showlist(pageno){
		req.open('get', 'ajax.php?pageno='+pageno);
		req.send(null);
		req.onreadystatechange=function(){
			if(req.readyState==4 && req.status==200){
				document.getElementById('result').innerHTML=req.responseText;
			}
		}
	}
	window.onload=function(){
		showlist(1);
	}
</script>
```
```
<?php 
echo $_GET['pageno'];
echo "<a href='javascript:void(0)' onclick='showlist(1)'>1</a>";
echo "<a href='javascript:void(0)' onclick='showlist(2)'>2</a>";
echo "<a href='javascript:void(0)' onclick='showlist(3)'>3</a>";
echo "<a href='javascript:void(0)' onclick='showlist(4)'>4</a>";
echo "<a href='javascript:void(0)' onclick='showlist(5)'>5</a>";
?>
```

##	**7.返回XML格式**
PHP中要加上：
`header('content-type:text/xml');`



```
<?php 
header('content-type:text/xml');
$obj=file_get_contents('ajax.xml');
echo $obj
?>
```
输出的xml字符串

```
<script type="text/javascript">
	var req=new XMLHttpRequest();
	req.open('get', 'ajax.php');
	req.send(null);
		req.onreadystatechange=function(){
			if(req.readyState==4 && req.status==200){
				var obj=req.responseXML;
				alert(obj.getElementById('0').firstChild.nodeValue)
			}
		}
</script> 
```
也可以通过TagName等进行查找，注意得.firstChild.nodeValue获取节点内容（js方式）

```
<?xml version="1.0" encoding="utf-8"?>
<info>
	<person id='0'>dasdas</person>
	<person id="1">
		<name>李白</name>
		<age>30</age>
		<gender>男</gender>
	<content>111</content></person>
	<person id="2">
		<name>杜甫</name>
		<age>36</age>
		<gender>男</gender>
	</person>
	<person id="3">
		<name>李清照</name>
		<age>22</age>
		<gender>女</gender>
		<content><![CDATA[<<>???///]]></content>
	</person>
</info>
```